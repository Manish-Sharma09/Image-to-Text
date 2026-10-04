// Main-thread handle for the image worker. Requests for the same page and
// target supersede older ones, so dragging a slider never queues stale work.
import type { ProcessJob, ProcessResult } from './process';

type Pending = { resolve: (r: ProcessResult) => void; reject: (e: Error) => void; key: string };

export class SupersededError extends Error {
  constructor() {
    super('Superseded');
    this.name = 'SupersededError';
  }
}

class ImageClient {
  private worker: Worker | null = null;
  private seq = 0;
  private pending = new Map<number, Pending>();
  private latest = new Map<string, number>();

  private get w(): Worker {
    if (!this.worker) {
      this.worker = new Worker(new URL('./image.worker.ts', import.meta.url), { type: 'module' });
      this.worker.onmessage = (e: MessageEvent<{ id: number; ok: boolean; result?: ProcessResult; error?: string }>) => {
        const p = this.pending.get(e.data.id);
        if (!p) return;
        this.pending.delete(e.data.id);
        if (this.latest.get(p.key) !== e.data.id) {
          e.data.result?.bitmap?.close();
          p.reject(new SupersededError());
        } else if (e.data.ok) {
          p.resolve(e.data.result!);
        } else {
          p.reject(new Error(e.data.error));
        }
      };
      this.worker.onerror = (e) => {
        for (const p of this.pending.values()) p.reject(new Error(e.message || 'Image worker failed'));
        this.pending.clear();
        this.worker = null;
      };
    }
    return this.worker;
  }

  process(job: ProcessJob): Promise<ProcessResult> {
    const id = ++this.seq;
    const key = `${job.pageId}:${job.target}:${job.tone !== false}:${job.purpose ?? ''}`;
    this.latest.set(key, id);
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject, key });
      this.w.postMessage({ id, type: 'process', job });
    });
  }

  forget(pageId: string): void {
    this.worker?.postMessage({ id: 0, type: 'forget', pageId });
  }
}

export const imageClient = new ImageClient();
