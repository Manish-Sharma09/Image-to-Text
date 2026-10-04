// On-device OCR with Tesseract (WebAssembly). Images never leave the browser;
// only the engine and language models are downloaded (then cached).

import type { Worker, LoggerMessage } from 'tesseract.js';
import type { OcrPage, OcrProgress, OcrProvider, RecognizeRequest } from './types';
import { normalizeTesseract } from './normalize';

const ENGINE_PATH = '/vendor/tesseract';
const LSTM_ONLY = 1;
const LEGACY = 0;
/** Engine and language downloads; Tesseract never settles if one fails. */
const LOAD_TIMEOUT_MS = 120_000;

interface Slot {
  worker: Worker;
  langs: string;
  busy: boolean;
  listener: ((m: LoggerMessage) => void) | null;
}

export class AbortError extends Error {
  constructor() {
    super('Cancelled');
    this.name = 'AbortError';
  }
}

export class EngineLoadError extends Error {
  constructor() {
    super('The text engine or language data could not be loaded.');
    this.name = 'EngineLoadError';
  }
}

function poolSize(): number {
  if (typeof navigator === 'undefined') return 1;
  const cores = navigator.hardwareConcurrency || 2;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const mobile = /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
  return !mobile && cores >= 6 && mem >= 4 ? 2 : 1;
}

function stageFor(status: string): OcrProgress['stage'] {
  if (status.includes('core')) return 'loading-engine';
  if (status.includes('traineddata') || status.includes('initializ')) return 'loading-language';
  return 'recognizing';
}

/** Rejects when the signal aborts or the time runs out, whichever comes first. */
function guard<T>(p: Promise<T>, signal?: AbortSignal, ms?: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    if (signal?.aborted) return reject(new AbortError());
    const onAbort = () => finish(() => reject(new AbortError()));
    const timer = ms ? setTimeout(() => finish(() => reject(new EngineLoadError())), ms) : undefined;
    const finish = (fn: () => void) => {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
      fn();
    };
    signal?.addEventListener('abort', onAbort, { once: true });
    p.then(
      (v) => finish(() => resolve(v)),
      (e) => finish(() => reject(e)),
    );
  });
}

export class LocalProvider implements OcrProvider {
  id = 'local' as const;
  label = 'On this device';
  remote = false;

  private slots: Slot[] = [];
  private waiters: (() => void)[] = [];
  private max = poolSize();
  private osd: Promise<Worker> | null = null;

  /** How many pages can be read at the same time on this device. */
  get concurrency(): number {
    return this.max;
  }

  private async spawn(langs: string): Promise<Slot> {
    const slot: Slot = { worker: null as unknown as Worker, langs, busy: true, listener: null };
    const { createWorker } = await import('tesseract.js');
    slot.worker = await createWorker(langs, LSTM_ONLY, {
      workerPath: `${ENGINE_PATH}/worker.min.js`,
      corePath: ENGINE_PATH,
      workerBlobURL: false,
      logger: (m) => slot.listener?.(m),
    });
    await slot.worker.setParameters({
      tessedit_pageseg_mode: '3' as never,
      user_defined_dpi: '300',
    });
    return slot;
  }

  private wake(): void {
    this.waiters.shift()?.();
  }

  private async acquire(langs: string, listener: Slot['listener'], signal?: AbortSignal): Promise<Slot> {
    for (;;) {
      if (signal?.aborted) throw new AbortError();
      // Prefer an idle worker that already has these languages loaded.
      const slot = this.slots.find((s) => !s.busy && s.langs === langs) ?? this.slots.find((s) => !s.busy);
      if (slot) {
        slot.busy = true;
        slot.listener = listener;
        if (slot.langs !== langs) {
          try {
            await guard(slot.worker.reinitialize(langs, LSTM_ONLY), signal, LOAD_TIMEOUT_MS);
            slot.langs = langs;
          } catch (e) {
            // A half-initialised worker can't be trusted; replace it.
            this.kill(slot);
            throw e;
          }
        }
        return slot;
      }
      if (this.slots.length < this.max) {
        const placeholder = { busy: true } as Slot;
        this.slots.push(placeholder);
        const spawning = this.spawn(langs);
        try {
          const created = await guard(spawning, signal, LOAD_TIMEOUT_MS);
          created.listener = listener;
          this.slots[this.slots.indexOf(placeholder)] = created;
          return created;
        } catch (e) {
          this.slots.splice(this.slots.indexOf(placeholder), 1);
          // If the spawn finishes later, don't leak its worker.
          spawning.then((s) => s.worker.terminate()).catch(() => {});
          this.wake();
          throw e;
        }
      }
      // Wait for a worker to free up, or for this request to be cancelled.
      await new Promise<void>((resolve) => {
        const done = () => {
          signal?.removeEventListener('abort', done);
          const i = this.waiters.indexOf(done);
          if (i >= 0) this.waiters.splice(i, 1);
          resolve();
        };
        this.waiters.push(done);
        signal?.addEventListener('abort', done, { once: true });
      });
    }
  }

  private release(slot: Slot) {
    slot.busy = false;
    slot.listener = null;
    this.wake();
  }

  /** Drops a worker (cancelled or broken) and lets a waiting read take its place. */
  private kill(slot: Slot) {
    const i = this.slots.indexOf(slot);
    if (i >= 0) this.slots.splice(i, 1);
    // Terminating doesn't settle an in-flight job, so never await it.
    slot.worker?.terminate().catch(() => {});
    this.wake();
  }

  async prepare(languages: string[]): Promise<void> {
    const slot = await this.acquire(languages.join('+'), null);
    this.release(slot);
  }

  async recognize(req: RecognizeRequest): Promise<OcrPage> {
    const langs = req.languages.join('+');
    const started = performance.now();
    const slot = await this.acquire(
      langs,
      (m) => req.onProgress?.({ stage: stageFor(m.status), progress: m.progress }),
      req.signal,
    );
    try {
      const psm = req.layout === 'block' ? '6' : '3';
      // Tesseract can't cancel mid-page; on abort we stop waiting and replace the worker.
      const { data } = await guard(
        slot.worker.recognize(req.image, { tessedit_pageseg_mode: psm } as never, { blocks: true, text: true }),
        req.signal,
      );
      const page = normalizeTesseract(data as never, {
        scale: req.scale,
        width: req.width,
        height: req.height,
        languages: req.languages,
        durationMs: Math.round(performance.now() - started),
      });
      page.layout = req.layout;
      this.release(slot);
      return page;
    } catch (e) {
      this.kill(slot);
      throw req.signal?.aborted ? new AbortError() : e;
    }
  }

  /**
   * Orientation and script detection. Needs Tesseract's legacy engine, so it
   * is only downloaded when a first read suggests the language is wrong.
   */
  async detectScript(image: Blob): Promise<{ script: string | null; confidence: number; orientation: number; orientationConfidence: number } | null> {
    try {
      this.osd ??= (async () => {
        const { createWorker } = await import('tesseract.js');
        return createWorker('osd', LEGACY, {
          workerPath: `${ENGINE_PATH}/worker.min.js`,
          corePath: ENGINE_PATH,
          workerBlobURL: false,
          legacyCore: true,
          legacyLang: true,
        });
      })();
      const worker = await guard(this.osd, undefined, LOAD_TIMEOUT_MS);
      const { data } = await guard(worker.detect(image), undefined, 30_000);
      return {
        script: data.script,
        confidence: data.script_confidence ?? 0,
        orientation: data.orientation_degrees ?? 0,
        orientationConfidence: data.orientation_confidence ?? 0,
      };
    } catch {
      // Detection is a bonus; a missing download or odd image just skips it.
      const stale = this.osd;
      this.osd = null;
      stale?.then((w) => w.terminate()).catch(() => {});
      return null;
    }
  }

  async dispose(): Promise<void> {
    for (const s of this.slots) s.worker?.terminate().catch(() => {});
    this.slots = [];
    if (this.osd) (await this.osd.catch(() => null))?.terminate();
    this.osd = null;
  }
}
