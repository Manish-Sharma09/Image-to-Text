// Turns whatever the user drops into one or more page images the rest of the
// app can handle. Exotic formats load their decoder only when needed.

import { SITE } from '../../config/site';
import type { OcrPage } from '../ocr/types';
import { InputError } from './errors';
import { sniff, type Kind } from './sniff';

export interface DecodedPage {
  name: string;
  /** An image every browser can decode (original bytes when possible). */
  blob: Blob;
  width: number;
  height: number;
  kind: Kind;
  /** Text already present in a digital PDF page, positioned on `blob`. */
  textLayer?: OcrPage;
}

const MAX_PIXELS = 40_000_000;
const NATIVE: Kind[] = ['jpeg', 'png', 'gif', 'webp', 'bmp', 'avif'];

export async function canvasToBlob(c: HTMLCanvasElement | OffscreenCanvas, type = 'image/png', quality = 0.92): Promise<Blob> {
  if ('convertToBlob' in c) return c.convertToBlob({ type, quality });
  return new Promise((resolve, reject) =>
    (c as HTMLCanvasElement).toBlob((b) => (b ? resolve(b) : reject(new InputError('decode'))), type, quality),
  );
}

/** Re-encodes a bitmap, shrinking it if it is absurdly large. */
async function fromBitmap(bmp: ImageBitmap | HTMLImageElement, type: string): Promise<{ blob: Blob; width: number; height: number }> {
  let w = bmp.width, h = bmp.height;
  const s = Math.min(1, Math.sqrt(MAX_PIXELS / (w * h)));
  w = Math.round(w * s);
  h = Math.round(h * s);
  const c = new OffscreenCanvas(w, h);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(bmp, 0, 0, w, h);
  return { blob: await canvasToBlob(c, type), width: w, height: h };
}

async function decodeNative(blob: Blob, kind: Kind, name: string): Promise<DecodedPage> {
  let bmp: ImageBitmap;
  try {
    bmp = await createImageBitmap(blob, { imageOrientation: 'from-image' });
  } catch {
    throw new InputError('decode', name);
  }
  try {
    // Transparent PNG/WebP/GIF would turn black in some pipelines; flatten
    // onto white. Oversized images are reduced.
    const needsFlatten = kind === 'png' || kind === 'webp' || kind === 'gif' || kind === 'avif';
    if (needsFlatten || bmp.width * bmp.height > MAX_PIXELS || kind === 'bmp') {
      const out = await fromBitmap(bmp, 'image/png');
      return { name, kind, ...out };
    }
    return { name, kind, blob, width: bmp.width, height: bmp.height };
  } finally {
    bmp.close();
  }
}

async function decodeSvg(blob: Blob, name: string): Promise<DecodedPage> {
  const url = URL.createObjectURL(blob);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const w = img.naturalWidth || 1200, h = img.naturalHeight || 800;
    // Render vector art large enough for OCR.
    const scale = Math.max(1, 2000 / Math.max(w, h));
    const c = new OffscreenCanvas(Math.round(w * scale), Math.round(h * scale));
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    return { name, kind: 'svg', blob: await canvasToBlob(c), width: c.width, height: c.height };
  } catch {
    throw new InputError('decode', name);
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function decodeHeic(blob: Blob, name: string): Promise<DecodedPage> {
  // Safari decodes HEIC natively; everyone else gets libheif (WebAssembly).
  try {
    const bmp = await createImageBitmap(blob, { imageOrientation: 'from-image' });
    const out = await fromBitmap(bmp, 'image/jpeg');
    bmp.close();
    return { name, kind: 'heic', ...out };
  } catch {
    const { decodeHeicFile } = await import('./formats/heic');
    return { name, kind: 'heic', ...(await decodeHeicFile(blob)) };
  }
}

export async function decodeFile(file: Blob, name: string, room = SITE.maxPages): Promise<DecodedPage[]> {
  if (!file.size) throw new InputError('empty', name);
  if (file.size > SITE.maxFileMB * 1024 * 1024) throw new InputError('too-large', name);
  const kind = await sniff(file);
  if (NATIVE.includes(kind)) return [await decodeNative(file, kind, name)];
  if (kind === 'svg') return [await decodeSvg(file, name)];
  if (kind === 'heic') return [await decodeHeic(file, name)];
  if (kind === 'tiff') {
    const { decodeTiff } = await import('./formats/tiff');
    return decodeTiff(file, name, room);
  }
  if (kind === 'pdf') {
    const { decodePdf } = await import('./formats/pdf');
    return decodePdf(file, name, room);
  }
  throw new InputError('unsupported', name);
}

/** Loads an image from a link: directly when the site allows it, else via our proxy. */
export async function fetchImage(url: string): Promise<{ blob: Blob; name: string }> {
  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    throw new InputError('url');
  }
  if (!/^https?:$/.test(parsed.protocol)) throw new InputError('url');
  const name = decodeURIComponent(parsed.pathname.split('/').pop() || 'image') || 'image';
  try {
    const res = await fetch(parsed, { mode: 'cors', credentials: 'omit' });
    if (res.ok) return { blob: await res.blob(), name };
  } catch {
    // Most sites don't send CORS headers; fall through to the proxy.
  }
  let res: Response;
  try {
    res = await fetch(`/api/fetch-image?url=${encodeURIComponent(parsed.href)}`);
  } catch {
    throw new InputError('url-blocked');
  }
  if (res.status === 404 && !res.headers.get('x-copyable')) throw new InputError('url-blocked');
  if (res.status === 413) throw new InputError('too-large', name);
  if (res.status === 415) throw new InputError('unsupported', name);
  if (!res.ok) throw new InputError('url');
  return { blob: await res.blob(), name };
}
