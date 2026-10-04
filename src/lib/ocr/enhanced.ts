// Optional cloud reading for handwriting, equations and messy layouts. The
// image goes to our server, which asks an AI model to transcribe it; nothing
// is stored. Only used when the visitor explicitly chooses it.

import type { OcrPage, OcrProvider, RecognizeRequest } from './types';

export interface EnhancedStatus {
  enabled: boolean;
  /** Reads left today for this visitor, when the server tracks it. */
  remaining?: number;
  limit?: number;
}

let status: Promise<EnhancedStatus> | null = null;

export function enhancedStatus(): Promise<EnhancedStatus> {
  status ??= fetch('/api/ocr', { headers: { accept: 'application/json' } })
    .then((r) => (r.ok ? (r.json() as Promise<EnhancedStatus>) : { enabled: false }))
    .catch(() => ({ enabled: false }));
  return status;
}

/** Shrinks the page to a size the model reads well, as JPEG. */
async function prepare(image: Blob): Promise<Blob> {
  const bmp = await createImageBitmap(image);
  const s = Math.min(1, 2000 / Math.max(bmp.width, bmp.height));
  const c = new OffscreenCanvas(Math.round(bmp.width * s), Math.round(bmp.height * s));
  c.getContext('2d')!.drawImage(bmp, 0, 0, c.width, c.height);
  bmp.close();
  return c.convertToBlob({ type: 'image/jpeg', quality: 0.88 });
}

export class EnhancedError extends Error {
  constructor(message: string, public code: 'limit' | 'unavailable' | 'failed' | 'too-large') {
    super(message);
    this.name = 'EnhancedError';
  }
}

export class EnhancedProvider implements OcrProvider {
  id = 'enhanced' as const;
  label = 'Enhanced (cloud AI)';
  remote = true;

  async recognize(req: RecognizeRequest): Promise<OcrPage> {
    const started = performance.now();
    req.onProgress?.({ stage: 'uploading', progress: 0 });
    const body = new FormData();
    body.append('image', await prepare(req.image), 'page.jpg');
    body.append('mode', req.mode);
    body.append('languages', req.languages.join(','));
    const res = await fetch('/api/ocr', { method: 'POST', body, signal: req.signal });
    if (res.status === 429) throw new EnhancedError("You've used today's Enhanced reads. On-device reading is still unlimited.", 'limit');
    if (res.status === 413) throw new EnhancedError('This image is too large for Enhanced reading.', 'too-large');
    if (res.status === 404 || res.status === 503) throw new EnhancedError('Enhanced reading is not available right now.', 'unavailable');
    if (!res.ok) throw new EnhancedError('Enhanced reading failed. Try again, or use on-device reading.', 'failed');
    const data = (await res.json()) as {
      text: string;
      markdown?: string;
      table?: string[][];
      fields?: Record<string, string>;
      remaining?: number;
    };
    if (status && data.remaining !== undefined) {
      const s = await status;
      status = Promise.resolve({ ...s, remaining: data.remaining });
    }
    return {
      width: req.width,
      height: req.height,
      blocks: [],
      text: data.text ?? '',
      conf: 100,
      languages: req.languages,
      provider: 'enhanced',
      hasGeometry: false,
      structure: { markdown: data.markdown, table: data.table, fields: data.fields },
      durationMs: Math.round(performance.now() - started),
    };
  }
}
