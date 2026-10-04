// The workspace: pages, the reading queue and everything the UI binds to.
// Reading a page runs: prepare image → OCR → script check → layout second
// pass → detect content → format. Each step is replaceable.

import { SITE } from '../../config/site';
import { decodeFile, fetchImage, type DecodedPage } from '../input/decode';
import { InputError, READ_MESSAGES } from '../input/errors';
import { imageClient, SupersededError } from '../image/client';
import { DEFAULT_ADJUSTMENTS, geometryKey, type Adjustments, type ImageAnalysis, type ResolvedSteps } from '../image/types';
import type { LayoutHint, OcrPage, ProviderId, ReadMode } from '../ocr/types';
import { allLines, allWords, bboxUnion, type BBox } from '../ocr/types';
import { getProvider, localProvider } from '../ocr/registry';
import { AbortError } from '../ocr/local';
import { autoLanguages, languageForScript } from '../ocr/languages';
import { fmt, i18n, langName, pl, scriptName } from '../i18n.svelte';
import {
  detect,
  format,
  DEFAULT_FORMAT_OPTIONS,
  type Detection,
  type FormatOptions,
  type Formatted,
  type ReceiptData,
  type TableData,
} from '../layout';
import { settings } from './settings.svelte';
import { history, thumbnail, type SavedDoc, type SavedPage } from './history';

export type PageStatus = 'ready' | 'queued' | 'preparing' | 'reading' | 'done' | 'error';

export interface PageNotice {
  kind: 'info' | 'warn' | 'error';
  title: string;
  hint?: string;
  action?: { label: string; run: () => void };
}

export interface Preview {
  bitmap: ImageBitmap;
  width: number;
  height: number;
  baseWidth: number;
  baseHeight: number;
}

let counter = 0;
const uid = () => `p${Date.now().toString(36)}${(counter++).toString(36)}`;

/** Modes whose layout reads better as one block of lines. */
const BLOCK_MODES: ReadMode[] = ['table', 'receipt', 'code'];

export class Page {
  readonly id = uid();
  name = $state('');
  readonly blob: Blob;
  readonly kind: string;
  readonly thumb: string;
  width = $state(0);
  height = $state(0);
  /** Text layer from a digital PDF; skips OCR while geometry is untouched. */
  textLayer: OcrPage | null;

  adjust = $state<Adjustments>({ ...DEFAULT_ADJUSTMENTS });
  analysis = $state.raw<ImageAnalysis | null>(null);
  steps = $state.raw<ResolvedSteps | null>(null);
  preview = $state.raw<Preview | null>(null);
  original = $state.raw<Preview | null>(null);

  status = $state<PageStatus>('ready');
  stage = $state('');
  progress = $state(0);
  notices = $state.raw<PageNotice[]>([]);
  provider = $state<ProviderId>('local');

  result = $state.raw<OcrPage | null>(null);
  /** Inputs the current result was produced from. */
  resultKey = $state('');
  detection = $state.raw<Detection | null>(null);
  mode = $state<ReadMode>('plain');
  modeLocked = $state(false);
  options = $state<FormatOptions>({ ...DEFAULT_FORMAT_OPTIONS.plain });

  formatted = $state.raw<Formatted | null>(null);
  text = $state('');
  edited = $state(false);
  table = $state.raw<TableData | null>(null);
  receipt = $state.raw<ReceiptData | null>(null);
  /** Set when a re-read should keep edits made in other modes. */
  keepEditsOnRead = false;
  /** Edits kept per mode so switching modes never loses work. */
  private edits = new Map<string, { text: string; table: TableData | null; receipt: ReceiptData | null }>();
  abort: AbortController | null = null;
  /** Adjustments the latest preview request was made with. */
  previewKey = '';

  constructor(d: DecodedPage) {
    this.name = d.name;
    this.blob = d.blob;
    this.kind = d.kind;
    this.width = d.width;
    this.height = d.height;
    this.thumb = URL.createObjectURL(d.blob);
    this.textLayer = d.textLayer ?? null;
  }

  get key(): string {
    return `${this.mode}|${this.options.joinLines}|${this.options.dehyphenate}`;
  }

  /** Signature of everything that affects recognition. */
  inputKey(languages: string[]): string {
    const a = this.adjust;
    return JSON.stringify([geometryKey(a), a.auto, a.brightness, a.contrast, a.sharpen, a.grayscale, a.invert, a.stretch, a.bw, a.flatten, a.denoise, languages, this.provider]);
  }

  get outdated(): boolean {
    return !!this.result && this.status === 'done' && this.resultKey !== this.inputKey(workspace.languages);
  }

  /** Re-formats the current result, restoring any edits made in that mode. */
  reformat(): void {
    if (!this.result) return;
    const f = format(this.result, this.mode, this.options);
    this.formatted = f;
    const saved = this.edits.get(this.key);
    this.text = saved?.text ?? f.text;
    this.table = saved?.table ?? f.table ?? null;
    this.receipt = saved?.receipt ?? f.receipt ?? null;
    this.edited = !!saved;
  }

  rememberEdits(): void {
    if (this.edited) this.edits.set(this.key, { text: this.text, table: this.table, receipt: this.receipt });
  }

  forgetEdits(): void {
    this.edits.clear();
    this.edited = false;
  }

  setText(text: string): void {
    this.text = text;
    this.edited = true;
    this.rememberEdits();
  }

  setTable(table: TableData): void {
    this.table = table;
    this.edited = true;
    this.rememberEdits();
  }

  setReceipt(receipt: ReceiptData): void {
    this.receipt = receipt;
    this.edited = true;
    this.rememberEdits();
  }

  dispose(): void {
    this.abort?.abort();
    URL.revokeObjectURL(this.thumb);
    this.preview?.bitmap.close();
    this.original?.bitmap.close();
    imageClient.forget(this.id);
  }
}

/** Cuts a region (in base coordinates) out of the prepared image. */
async function cropBlob(blob: Blob, b: BBox, scale: number): Promise<Blob> {
  const pad = 12;
  const bmp = await createImageBitmap(blob);
  const x = Math.max(0, Math.floor(b.x0 * scale - pad)), y = Math.max(0, Math.floor(b.y0 * scale - pad));
  const w = Math.min(bmp.width - x, Math.ceil((b.x1 - b.x0) * scale + pad * 2));
  const h = Math.min(bmp.height - y, Math.ceil((b.y1 - b.y0) * scale + pad * 2));
  const c = new OffscreenCanvas(Math.max(1, w), Math.max(1, h));
  c.getContext('2d')!.drawImage(bmp, x, y, w, h, 0, 0, w, h);
  bmp.close();
  return c.convertToBlob({ type: 'image/png' });
}

function goodWords(p: OcrPage): number {
  return allWords(p).filter((w) => w.conf >= 75).length;
}

/** Share of text-like ink cells that no recognised word covers. */
function missedInk(result: OcrPage, analysis: ImageAnalysis, angle: number): number {
  if (Math.abs(angle) > 0.5 || !result.hasGeometry) return 0;
  const { cols, rows, cells, width, height } = analysis.ink;
  const covered = new Uint8Array(cols * rows);
  const cw = width / cols, ch = height / rows;
  for (const w of allWords(result)) {
    const c0 = Math.max(0, Math.floor(w.bbox.x0 / cw) - 1), c1 = Math.min(cols - 1, Math.floor(w.bbox.x1 / cw) + 1);
    const r0 = Math.max(0, Math.floor(w.bbox.y0 / ch) - 1), r1 = Math.min(rows - 1, Math.floor(w.bbox.y1 / ch) + 1);
    for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) covered[r * cols + c] = 1;
  }
  let ink = 0, missed = 0;
  for (let i = 0; i < cells.length; i++) {
    if (!cells[i]) continue;
    ink++;
    if (!covered[i]) missed++;
  }
  return ink ? missed / ink : 0;
}

export type View = 'page' | 'document';

interface ClosedDoc {
  pages: Page[];
  interrupted: Page[];
  activeId: string | null;
  title: string;
  view: View;
  docId: string;
  createdAt: number;
  toastId: number;
  timer: ReturnType<typeof setTimeout> | undefined;
}

export interface Toast {
  id: number;
  text: string;
  kind: 'info' | 'error' | 'success';
  action?: { label: string; run: () => void };
}

class Workspace {
  /** History id of this document; a new one starts when the workspace is cleared. */
  docId = uid();
  createdAt = Date.now();
  title = $state('');
  pages = $state<Page[]>([]);
  activeId = $state<string | null>(null);
  view = $state<View>('page');
  /** Mode chosen by a landing page; 'auto' lets detection decide. */
  presetMode = $state<ReadMode | 'auto'>('auto');
  toasts = $state<Toast[]>([]);
  /** Image regions to highlight, set by the editors. */
  focus = $state.raw<{ line: import('../ocr/types').BBox | null; word: import('../ocr/types').BBox | null }>({ line: null, word: null });
  /** A point clicked on the image that the editor should reveal. */
  reveal = $state.raw<{ x: number; y: number; n: number } | null>(null);
  adding = $state(false);

  private queue: Page[] = [];
  private running = 0;
  private toastSeq = 0;
  /** The last closed document, kept briefly so Undo can bring it back. */
  private closed: ClosedDoc | null = null;

  get active(): Page | null {
    return this.pages.find((p) => p.id === this.activeId) ?? this.pages[0] ?? null;
  }

  get languages(): string[] {
    const l = settings.languages;
    if (l.auto || !l.codes.length) {
      return autoLanguages(typeof navigator === 'undefined' ? [] : navigator.languages);
    }
    return l.codes;
  }

  get counts() {
    const c = { total: this.pages.length, done: 0, busy: 0, errors: 0 };
    for (const p of this.pages) {
      if (p.status === 'done') c.done++;
      else if (p.status === 'error') c.errors++;
      else if (p.status !== 'ready') c.busy++;
    }
    return c;
  }

  get busy(): boolean {
    return this.pages.some((p) => p.status === 'queued' || p.status === 'preparing' || p.status === 'reading');
  }

  toast(text: string, kind: Toast['kind'] = 'info', action?: Toast['action']): number {
    const t = { id: ++this.toastSeq, text, kind, action };
    this.toasts = [...this.toasts, t];
    setTimeout(() => this.dismiss(t.id), action ? 8000 : 4000);
    return t.id;
  }

  dismiss(id: number): void {
    this.toasts = this.toasts.filter((t) => t.id !== id);
  }

  select(id: string): void {
    this.activeId = id;
    this.view = 'page';
    this.focus = { line: null, word: null };
    this.reveal = null;
  }

  // ——— Adding images ———

  async addFiles(files: Iterable<File | Blob>, opts: { names?: string[] } = {}): Promise<void> {
    const list = [...files];
    if (!list.length) return;
    this.adding = true;
    let firstNew: string | null = null;
    try {
      for (const [i, file] of list.entries()) {
        const room = SITE.maxPages - this.pages.length;
        const name = opts.names?.[i] ?? (file instanceof File ? file.name : i18n.t.names.pastedImage);
        if (room <= 0) {
          this.toast(new InputError('too-many').title, 'error');
          break;
        }
        try {
          const decoded = await decodeFile(file, stripExt(name), room);
          for (const d of decoded) {
            const page = new Page(d);
            if (this.presetMode !== 'auto') {
              page.mode = this.presetMode;
              page.modeLocked = true;
              page.options = { ...DEFAULT_FORMAT_OPTIONS[page.mode] };
            }
            page.adjust.auto = settings.autoImprove;
            this.pages.push(page);
            firstNew ??= page.id;
            void this.renderPreview(page);
            this.enqueue(page);
          }
        } catch (e) {
          if (!(e instanceof InputError)) console.warn('decode failed', e);
          const err = e instanceof InputError ? e : new InputError('decode', name);
          this.toast(`${name}: ${err.title} ${err.hint}`, 'error');
        }
      }
      if (!this.title && this.pages.length) this.title = this.pages[0].name;
      if (firstNew && (this.view === 'page' || this.pages.length === 1)) this.activeId = firstNew;
    } finally {
      this.adding = false;
    }
  }

  async addUrl(url: string): Promise<boolean> {
    this.adding = true;
    try {
      const { blob, name } = await fetchImage(url);
      this.adding = false;
      await this.addFiles([blob], { names: [name] });
      return true;
    } catch (e) {
      const err = e instanceof InputError ? e : new InputError('url');
      this.toast(`${err.title} ${err.hint}`, 'error');
      return false;
    } finally {
      this.adding = false;
    }
  }

  async addSample(name: string): Promise<void> {
    const res = await fetch(`/samples/${name}.png`);
    if (!res.ok) return;
    const label = (i18n.t.names.samples as Record<string, string>)[name] ?? fmt(i18n.t.names.sample, { name: name.replace('-', ' ') });
    await this.addFiles([await res.blob()], { names: [label] });
  }

  remove(id: string): void {
    const i = this.pages.findIndex((p) => p.id === id);
    if (i < 0) return;
    const [page] = this.pages.splice(i, 1);
    this.queue = this.queue.filter((p) => p !== page);
    page.dispose();
    if (this.activeId === id) this.activeId = this.pages[Math.min(i, this.pages.length - 1)]?.id ?? null;
    if (!this.pages.length) this.title = '';
  }

  clear(): void {
    this.forgetClosed();
    for (const p of this.pages) p.dispose();
    this.reset();
  }

  /**
   * Back to the start screen. The document is kept for as long as the Undo
   * toast shows; pages that were still being read are read again if it's
   * brought back.
   */
  close(): void {
    if (!this.pages.length) return;
    this.forgetClosed();
    const interrupted = this.pages.filter((p) => p.status === 'queued' || p.status === 'preparing' || p.status === 'reading');
    for (const p of interrupted) this.cancel(p);
    const doc: ClosedDoc = {
      pages: this.pages,
      interrupted,
      activeId: this.activeId,
      title: this.title,
      view: this.view,
      docId: this.docId,
      createdAt: this.createdAt,
      toastId: 0,
      timer: undefined,
    };
    this.reset();
    const name = doc.title || (doc.pages.length > 1 ? pl(doc.pages.length, i18n.t.common.pages) : doc.pages[0].name);
    doc.toastId = this.toast(fmt(i18n.t.workspace.closed, { name }), 'info', { label: i18n.t.common.undo, run: () => this.reopen(doc) });
    doc.timer = setTimeout(() => this.closed === doc && this.forgetClosed(), 8500);
    this.closed = doc;
  }

  private reopen(doc: ClosedDoc): void {
    if (this.closed !== doc) return;
    clearTimeout(doc.timer);
    this.closed = null;
    if (this.pages.length) {
      // New images were added meanwhile: keep them and put the old pages first.
      this.pages = [...doc.pages, ...this.pages];
    } else {
      this.pages = doc.pages;
      this.activeId = doc.activeId;
      this.title = doc.title;
      this.view = doc.view;
      this.docId = doc.docId;
      this.createdAt = doc.createdAt;
    }
    for (const p of doc.interrupted) this.enqueue(p);
  }

  private forgetClosed(): void {
    const doc = this.closed;
    if (!doc) return;
    this.closed = null;
    clearTimeout(doc.timer);
    this.dismiss(doc.toastId);
    for (const p of doc.pages) p.dispose();
  }

  private reset(): void {
    this.pages = [];
    this.queue = [];
    this.activeId = null;
    this.title = '';
    this.view = 'page';
    this.docId = uid();
    this.createdAt = Date.now();
  }

  // ——— History ———

  /** Saves the whole document to this browser's history (when history is on). */
  async saveHistory(): Promise<void> {
    if (!settings.history) return;
    const done = this.pages.filter((p) => p.result);
    if (!done.length) return;
    const pages: SavedPage[] = done.map((p) => ({
      name: p.name,
      blob: p.blob,
      kind: p.kind,
      width: p.width,
      height: p.height,
      adjust: $state.snapshot(p.adjust),
      result: p.result,
      resultKey: p.resultKey,
      detection: p.detection,
      mode: p.mode,
      modeLocked: p.modeLocked,
      options: $state.snapshot(p.options),
      provider: p.provider,
      text: p.text,
      edited: p.edited,
      table: p.table,
      receipt: p.receipt,
    }));
    const doc: SavedDoc = {
      id: this.docId,
      title: this.title || done[0].name,
      createdAt: this.createdAt,
      updatedAt: Date.now(),
      pages,
      thumb: await thumbnail(done[0].blob),
      words: done.reduce((a, p) => a + (p.text.trim() ? p.text.trim().split(/\s+/).length : 0), 0),
      modes: [...new Set(done.map((p) => p.mode))],
      languages: [...new Set(done.flatMap((p) => p.result?.languages ?? []))],
    };
    try {
      await history.put(doc);
    } catch (e) {
      console.warn('history save failed', e);
    }
  }

  /** Replaces the workspace with a saved document. */
  async openHistory(id: string): Promise<void> {
    const doc = await history.get(id);
    if (!doc) return;
    this.clear();
    this.docId = doc.id;
    this.createdAt = doc.createdAt;
    this.title = doc.title;
    for (const sp of doc.pages) {
      const page = new Page({ name: sp.name, blob: sp.blob, kind: sp.kind as DecodedPage['kind'], width: sp.width, height: sp.height });
      Object.assign(page.adjust, sp.adjust);
      page.result = sp.result;
      page.resultKey = sp.resultKey;
      page.detection = sp.detection;
      page.mode = sp.mode;
      page.modeLocked = sp.modeLocked;
      page.options = sp.options;
      page.provider = sp.provider;
      page.reformat();
      if (sp.edited) {
        page.text = sp.text;
        page.table = sp.table;
        page.receipt = sp.receipt;
        page.edited = true;
        page.rememberEdits();
      }
      page.status = sp.result ? 'done' : 'ready';
      this.pages.push(page);
      void this.renderPreview(page);
    }
    this.activeId = this.pages[0]?.id ?? null;
  }

  move(id: string, to: number): void {
    const from = this.pages.findIndex((p) => p.id === id);
    if (from < 0 || to < 0 || to >= this.pages.length || from === to) return;
    const [p] = this.pages.splice(from, 1);
    this.pages.splice(to, 0, p);
  }

  // ——— Image preview ———

  previewKeyOf(page: Page): string {
    return JSON.stringify(page.adjust) + page.mode;
  }

  /** Renders the processed preview and the plain (geometry-only) view. */
  async renderPreview(page: Page): Promise<void> {
    page.previewKey = this.previewKeyOf(page);
    const job = { pageId: page.id, blob: page.blob, adjust: $state.snapshot(page.adjust), mode: page.mode, target: 'preview' as const, maxSide: 1800 };
    const [rs, os] = await Promise.allSettled([imageClient.process({ ...job, purpose: 'preview' }), imageClient.process({ ...job, tone: false, purpose: 'original' })]);
    if (rs.status === 'fulfilled' && os.status === 'fulfilled') {
      const r = rs.value, o = os.value;
      page.preview?.bitmap.close();
      page.original?.bitmap.close();
      page.preview = { bitmap: r.bitmap!, width: r.width, height: r.height, baseWidth: r.baseWidth, baseHeight: r.baseHeight };
      page.original = { bitmap: o.bitmap!, width: o.width, height: o.height, baseWidth: o.baseWidth, baseHeight: o.baseHeight };
      page.analysis = r.analysis;
      page.steps = r.steps;
      return;
    }
    // One half failed or was replaced by a newer request: free what arrived.
    for (const s of [rs, os]) {
      if (s.status === 'fulfilled') s.value.bitmap?.close();
      else if (!(s.reason instanceof SupersededError)) console.warn('preview failed', s.reason);
    }
  }

  // ——— Reading ———

  enqueue(page: Page): void {
    if (this.queue.includes(page)) return;
    page.abort?.abort();
    page.status = 'queued';
    page.stage = i18n.t.stages.waiting;
    page.progress = 0;
    this.queue.push(page);
    this.pump();
  }

  /** Reads a page again, e.g. after changing settings. */
  reread(page: Page, opts: { keepEdits?: boolean } = {}): void {
    page.keepEditsOnRead = !!opts.keepEdits;
    if (!opts.keepEdits) page.forgetEdits();
    this.enqueue(page);
  }

  /** Reads every page again, except ones with edits (they keep their text). */
  rereadAll(): void {
    for (const p of this.pages) if (p.status !== 'queued' && !p.edited) this.reread(p);
  }

  cancel(page: Page): void {
    this.queue = this.queue.filter((p) => p !== page);
    page.abort?.abort();
    page.status = page.result ? 'done' : 'ready';
    page.stage = '';
  }

  private pump(): void {
    const limit = localProvider().concurrency;
    while (this.running < limit && this.queue.length) {
      const page = this.queue.shift()!;
      this.running++;
      void this.read(page).finally(() => {
        this.running--;
        this.pump();
      });
    }
  }

  private async read(page: Page): Promise<void> {
    const ctrl = new AbortController();
    page.abort = ctrl;
    const languages = this.languages;
    const key = page.inputKey(languages);
    page.notices = [];
    try {
      // Digital PDF pages already contain their text.
      if (page.textLayer && geometryKey(page.adjust) === geometryKey(DEFAULT_ADJUSTMENTS) && page.provider === 'local') {
        this.finish(page, page.textLayer, null, key);
        page.notices = [{ kind: 'info', title: i18n.t.notices.pdfText }];
        return;
      }

      page.status = 'preparing';
      page.stage = i18n.t.stages.preparing;
      page.progress = 0;
      const prep = await imageClient.process({
        pageId: page.id,
        blob: page.blob,
        adjust: $state.snapshot(page.adjust),
        mode: page.mode,
        target: 'ocr',
        purpose: 'read',
      });
      if (ctrl.signal.aborted) throw new AbortError();
      page.analysis = prep.analysis;
      page.steps = prep.steps;

      page.status = 'reading';
      const provider = getProvider(page.provider);
      const layout: LayoutHint = page.modeLocked && BLOCK_MODES.includes(page.mode) ? 'block' : 'auto';
      const run = (langs: string[], hint: LayoutHint) =>
        provider.recognize({
          image: prep.blob!,
          width: prep.baseWidth,
          height: prep.baseHeight,
          scale: prep.scale,
          languages: langs,
          mode: page.mode,
          layout: hint,
          signal: ctrl.signal,
          onProgress: (p) => {
            const t = i18n.t.stages;
            page.stage =
              p.stage === 'loading-engine'
                ? t.loadingEngine
                : p.stage === 'loading-language'
                  ? fmt(t.loadingLanguage, { langs: langs.map(langName).join(' + ') })
                  : p.stage === 'uploading'
                    ? t.uploading
                    : t.reading;
            page.progress = p.progress;
          },
        });

      let result = await run(languages, layout);
      let langs = languages;

      // Auto languages: if some lines look like another script, find it and re-read.
      if (page.provider === 'local' && settings.languages.auto && result.hasGeometry) {
        const lines = allLines(result);
        const weakLines = lines.filter((l) => l.conf < 62 && l.words.map((w) => w.text).join('').length >= 4);
        const words = allWords(result);
        const weakShare = weakLines.reduce((a, l) => a + l.words.length, 0) / Math.max(1, words.length);
        const weak = !words.length || result.conf < 62 || weakShare >= 0.15;
        if (weak) {
          page.stage = i18n.t.stages.checkingScript;
          // Look only at the doubtful lines, so English around them doesn't win.
          const region = weakLines.length && weakShare < 0.9 ? bboxUnion(weakLines.map((l) => l.bbox)) : null;
          const sample = region ? await cropBlob(prep.blob!, region, prep.scale) : prep.blob!;
          const osd = await localProvider().detectScript(sample);
          if (osd?.script && osd.script !== 'Latin') {
            const lang = languageForScript(osd.script, languages);
            if (lang && !languages.includes(lang)) {
              langs = [lang, ...languages];
              const second = await run(langs, layout);
              if (goodWords(second) >= goodWords(result)) {
                result = second;
                page.notices = [{ kind: 'info', title: fmt(i18n.t.notices.foundScript, { script: scriptName(osd.script), langs: langs.map(langName).join(' + ') }) }];
              }
            }
          } else if (weakShare >= 0.15) {
            page.notices = [{ kind: 'info', title: i18n.t.notices.hardLines, hint: i18n.t.notices.hardLinesHint }];
          }
          if (!region && osd && osd.orientation && osd.orientationConfidence > 3) {
            const turn = (360 - osd.orientation) % 360;
            page.notices = [
              ...page.notices,
              {
                kind: 'warn',
                title: i18n.t.notices.rotated,
                hint: fmt(i18n.t.notices.rotatedHint, {
                  turn: turn === 180 ? i18n.t.notices.turnUpsideDown : turn === 90 ? i18n.t.notices.turnRight : i18n.t.notices.turnLeft,
                }),
                action: {
                  label: i18n.t.notices.rotateAndRead,
                  run: () => {
                    page.adjust.rotate = (page.adjust.rotate + turn) % 360;
                    void this.renderPreview(page);
                    this.reread(page);
                  },
                },
              },
            ];
          }
        }
      }

      // Second pass: the automatic layout can skip right-aligned columns.
      if (result.hasGeometry && layout === 'auto' && page.analysis) {
        const det = detect(result, page.analysis);
        const formLike = BLOCK_MODES.includes(det.mode) || (det.scores.receipt ?? 0) >= 0.3 || (det.scores.table ?? 0) >= 0.3;
        const missed = missedInk(result, page.analysis, page.steps?.angle ?? 0);
        if ((!page.modeLocked && formLike) || missed > 0.15) {
          page.stage = i18n.t.stages.checkingLayout;
          const block = await run(langs, 'block');
          const g1 = goodWords(result), g2 = goodWords(block);
          if (g2 > g1 * 1.03 || (formLike && g2 >= g1 * 0.97)) result = block;
        }
      }
      if (ctrl.signal.aborted) throw new AbortError();
      this.finish(page, result, page.analysis, key);
    } catch (e) {
      if (e instanceof AbortError || ctrl.signal.aborted || e instanceof SupersededError) return;
      console.error(e);
      page.stage = '';
      if ((e as Error)?.name === 'EnhancedError') {
        // Keep the on-device result the visitor already had.
        page.provider = 'local';
        page.status = page.result ? 'done' : 'error';
        page.notices = [
          {
            kind: 'error',
            title: (i18n.t.notices.enhancedErrors as Record<string, string>)[(e as { code?: string }).code ?? ''] ?? (e as Error).message,
            hint: page.result ? i18n.t.notices.enhancedFallback : '',
            action: {
              label: page.result ? i18n.t.notices.tryEnhancedAgain : i18n.t.notices.readOnThisDevice,
              run: () => {
                if (page.result) page.provider = 'enhanced';
                this.reread(page);
              },
            },
          },
        ];
        return;
      }
      page.status = 'error';
      page.notices = [{ kind: 'error', ...READ_MESSAGES.engine, action: { label: i18n.t.notices.tryAgain, run: () => this.reread(page) } }];
    } finally {
      if (page.abort === ctrl) page.abort = null;
    }
  }

  private finish(page: Page, result: OcrPage, analysis: ImageAnalysis | null, key: string): void {
    page.result = result;
    page.resultKey = key;
    if (!page.keepEditsOnRead) page.forgetEdits();
    page.keepEditsOnRead = false;
    const det = detect(result, analysis);
    page.detection = det;
    if (!page.modeLocked) {
      page.mode = det.mode;
      page.options = { ...DEFAULT_FORMAT_OPTIONS[det.mode] };
    }
    page.reformat();
    page.status = 'done';
    page.stage = '';
    page.progress = 1;

    const words = allWords(result);
    const notices = [...page.notices];
    if (result.hasGeometry && !words.length) {
      notices.push({ kind: 'warn', ...READ_MESSAGES.noText });
    } else if (result.hasGeometry && result.conf < 55) {
      notices.push({ kind: 'warn', ...READ_MESSAGES.lowQuality });
    }
    page.notices = notices;
    this.onDone?.(page);
  }

  /** Switches how a page is read. Table/receipt/code may trigger a block-layout re-read. */
  setMode(page: Page, mode: ReadMode): void {
    if (page.mode === mode) return;
    page.rememberEdits();
    page.mode = mode;
    page.modeLocked = true;
    page.options = { ...DEFAULT_FORMAT_OPTIONS[mode] };
    if (page.result?.hasGeometry && page.result.layout === 'auto' && BLOCK_MODES.includes(mode) && page.provider === 'local' && !page.textLayer) {
      page.reformat();
      this.reread(page, { keepEdits: true });
      return;
    }
    page.reformat();
  }

  setOptions(page: Page, opts: Partial<FormatOptions>): void {
    page.rememberEdits();
    page.options = { ...page.options, ...opts };
    page.reformat();
  }

  onDone: ((page: Page) => void) | null = null;
  /** Actions the active text panel registers for keyboard shortcuts. */
  actions: { copy?: () => void; find?: () => void } = {};
}

function stripExt(name: string): string {
  return name.replace(/\.[a-z0-9]{2,5}$/i, '') || name;
}

export const workspace = new Workspace();
