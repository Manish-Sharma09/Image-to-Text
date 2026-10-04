// The preprocessing pipeline: geometry (rotate, crop, perspective, deskew)
// then tone (invert, even lighting, levels, sharpen, threshold). Runs inside
// the image worker on OffscreenCanvas.

import type { ReadMode } from '../ocr/types';
import type { Adjustments, ImageAnalysis, Quad, ResolvedSteps } from './types';
import { geometryKey } from './types';
import { analyze } from './analyze';
import {
  toGray,
  grayToRgba,
  histogram,
  percentile,
  toneLut,
  applyLut,
  flatten as flattenOp,
  median3,
  sharpen as sharpenOp,
  threshold,
  homography,
  warp,
} from './ops';

type Canvas2D = OffscreenCanvas;

export interface ProcessJob {
  pageId: string;
  blob: Blob;
  adjust: Adjustments;
  mode: ReadMode;
  target: 'preview' | 'ocr';
  /** Longest side for previews. */
  maxSide?: number;
  /** False renders geometry only (for before/after comparison). */
  tone?: boolean;
  /** Forces the OCR scale (diagnostics). */
  scale?: number;
  /**
   * What the request is for. Newer requests replace older ones only with the
   * same page, target and purpose (a slider drag replaces the previous drag,
   * but never the crop tool's image).
   */
  purpose?: string;
}

export interface ProcessResult {
  width: number;
  height: number;
  /** Size of the geometry-corrected page that OCR coordinates refer to. */
  baseWidth: number;
  baseHeight: number;
  /** Output pixels per base pixel. */
  scale: number;
  analysis: ImageAnalysis;
  steps: ResolvedSteps;
  bitmap?: ImageBitmap;
  blob?: Blob;
}

const MAX_OCR_PIXELS = 18_000_000;
const MAX_OCR_SIDE = 6000;
const ANALYSIS_SIDE = 1600;

interface Base {
  key: string;
  canvas: Canvas2D;
  analysis: ImageAnalysis;
  angle: number;
  previews: Map<number, Canvas2D>;
}

const sources = new Map<string, ImageBitmap>();
const bases = new Map<string, Base>();

function touch<K, V>(map: Map<K, V>, key: K, value: V, limit: number, drop?: (v: V) => void) {
  map.delete(key);
  map.set(key, value);
  while (map.size > limit) {
    const [k, v] = map.entries().next().value as [K, V];
    map.delete(k);
    drop?.(v);
  }
}

export function forget(pageId: string): void {
  sources.get(pageId)?.close();
  sources.delete(pageId);
  bases.delete(pageId);
}

async function getSource(pageId: string, blob: Blob): Promise<ImageBitmap> {
  const cached = sources.get(pageId);
  if (cached) {
    touch(sources, pageId, cached, 4);
    return cached;
  }
  const bmp = await createImageBitmap(blob, { imageOrientation: 'from-image' });
  touch(sources, pageId, bmp, 4, (b) => b.close());
  return bmp;
}

function canvas(w: number, h: number): [Canvas2D, OffscreenCanvasRenderingContext2D] {
  const c = new OffscreenCanvas(Math.max(1, Math.round(w)), Math.max(1, Math.round(h)));
  const ctx = c.getContext('2d', { willReadFrequently: true })!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  return [c, ctx];
}

function quarterRotate(src: CanvasImageSource & { width: number; height: number }, deg: number): Canvas2D {
  const turns = (((deg / 90) % 4) + 4) % 4;
  const swap = turns % 2 === 1;
  const [c, ctx] = canvas(swap ? src.height : src.width, swap ? src.width : src.height);
  ctx.translate(c.width / 2, c.height / 2);
  ctx.rotate((turns * Math.PI) / 2);
  ctx.drawImage(src, -src.width / 2, -src.height / 2);
  return c;
}

function isAxisAligned(q: Quad): boolean {
  const eps = 0.002;
  return (
    Math.abs(q[0].y - q[1].y) < eps &&
    Math.abs(q[2].y - q[3].y) < eps &&
    Math.abs(q[0].x - q[3].x) < eps &&
    Math.abs(q[1].x - q[2].x) < eps
  );
}

function cropRect(src: Canvas2D, x: number, y: number, w: number, h: number): Canvas2D {
  const [c, ctx] = canvas(w, h);
  ctx.drawImage(src, x, y, w, h, 0, 0, c.width, c.height);
  return c;
}

function perspective(src: Canvas2D, q: Quad): Canvas2D {
  const W = src.width, H = src.height;
  const pts = q.map((p) => [p.x * W, p.y * H] as [number, number]);
  const dist = (a: [number, number], b: [number, number]) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const ow = Math.round(Math.max(dist(pts[0], pts[1]), dist(pts[3], pts[2])));
  const oh = Math.round(Math.max(dist(pts[0], pts[3]), dist(pts[1], pts[2])));
  const Hm = homography(ow, oh, pts);
  const data = src.getContext('2d', { willReadFrequently: true })!.getImageData(0, 0, W, H).data;
  const out = warp(data, W, H, Hm, ow, oh);
  const [c, ctx] = canvas(ow, oh);
  ctx.putImageData(new ImageData(out as Uint8ClampedArray<ArrayBuffer>, ow, oh), 0, 0);
  return c;
}

function fineRotate(src: Canvas2D, deg: number, fill: number): Canvas2D {
  const a = (deg * Math.PI) / 180;
  const w = src.width, h = src.height;
  const cw = Math.abs(w * Math.cos(a)) + Math.abs(h * Math.sin(a));
  const ch = Math.abs(w * Math.sin(a)) + Math.abs(h * Math.cos(a));
  const [c, ctx] = canvas(cw, ch);
  ctx.fillStyle = `rgb(${fill},${fill},${fill})`;
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.translate(c.width / 2, c.height / 2);
  ctx.rotate(a);
  ctx.drawImage(src, -w / 2, -h / 2);
  return c;
}

function scaled(src: Canvas2D, s: number): Canvas2D {
  if (Math.abs(s - 1) < 0.01) return src;
  let cur = src;
  // Step down in halves for smoother downscaling.
  while (s < 0.5 && cur.width > 2) {
    const [c, ctx] = canvas(cur.width / 2, cur.height / 2);
    ctx.drawImage(cur, 0, 0, c.width, c.height);
    s *= (cur.width / c.width);
    cur = c;
  }
  const [c, ctx] = canvas(cur.width * s, cur.height * s);
  ctx.drawImage(cur, 0, 0, c.width, c.height);
  return c;
}

async function getBase(job: ProcessJob): Promise<Base> {
  const key = geometryKey(job.adjust) + '|' + job.adjust.auto;
  const cached = bases.get(job.pageId);
  if (cached && cached.key === key) {
    touch(bases, job.pageId, cached, 3);
    return cached;
  }
  const src = await getSource(job.pageId, job.blob);
  const a = job.adjust;
  let c = quarterRotate(src, a.rotate);
  if (a.quad) {
    if (isAxisAligned(a.quad)) {
      const W = c.width, H = c.height;
      const x = a.quad[0].x * W, y = a.quad[0].y * H;
      c = cropRect(c, x, y, a.quad[1].x * W - x, a.quad[3].y * H - y);
    } else {
      c = perspective(c, a.quad);
    }
  } else if (a.crop) {
    const W = c.width, H = c.height;
    c = cropRect(c, a.crop.x * W, a.crop.y * H, a.crop.w * W, a.crop.h * H);
  }

  const s = Math.min(1, ANALYSIS_SIDE / Math.max(c.width, c.height));
  const small = scaled(c, s);
  const data = small.getContext('2d', { willReadFrequently: true })!.getImageData(0, 0, small.width, small.height).data;
  const analysis = analyze(data, small.width, small.height, c.width / small.width);

  let angle = a.angle;
  if (a.auto && angle === 0 && Math.abs(analysis.skew) >= 0.3 && Math.abs(analysis.skew) <= 10) {
    angle = -analysis.skew;
  }
  if (angle) {
    const fill = analysis.darkBackground ? analysis.p2 : analysis.p98;
    c = fineRotate(c, angle, fill);
    analysis.width = c.width;
    analysis.height = c.height;
  }
  const base: Base = { key, canvas: c, analysis, angle, previews: new Map() };
  touch(bases, job.pageId, base, 3);
  return base;
}

/** Resolves "auto" into concrete steps for this image and reading mode. */
export function resolveSteps(a: Adjustments, an: ImageAnalysis, mode: ReadMode, angle: number): ResolvedSteps {
  if (!a.auto) {
    return {
      angle,
      grayscale: a.grayscale || a.bw || a.flatten || a.denoise,
      invert: a.invert,
      flatten: a.flatten,
      stretch: a.stretch,
      bw: a.bw,
      denoise: a.denoise,
      sharpen: a.sharpen,
      brightness: a.brightness,
      contrast: a.contrast,
      scale: 1,
    };
  }
  const photo = an.likelyPhoto;
  const flatten = an.uneven || (mode === 'handwriting' && photo);
  return {
    angle,
    grayscale: true,
    invert: an.darkBackground,
    flatten,
    stretch: an.lowContrast || photo,
    bw: false,
    denoise: false,
    sharpen: photo && mode !== 'handwriting' ? 25 : 0,
    brightness: 0,
    contrast: 0,
    scale: 1,
  };
}

/**
 * Picks an OCR scale. Tesseract normalises each line itself, so enlarging
 * only helps genuinely small glyphs (blurry upscales of normal text read
 * worse); very large text is reduced to save time.
 */
export function ocrScale(an: ImageAnalysis, w: number, h: number): number {
  let s = 1;
  if (an.textHeight) {
    if (an.textHeight < 10) s = Math.min(3, 16 / an.textHeight);
    else if (an.textHeight > 64) s = Math.max(0.5, 40 / an.textHeight);
  } else if (Math.max(w, h) < 900) {
    s = 2;
  }
  const maxByPixels = Math.sqrt(MAX_OCR_PIXELS / (w * h));
  const maxBySide = MAX_OCR_SIDE / Math.max(w, h);
  return Math.max(0.25, Math.min(s, maxByPixels, maxBySide));
}

function applyTone(c: Canvas2D, steps: ResolvedSteps): void {
  const ctx = c.getContext('2d', { willReadFrequently: true })!;
  const w = c.width, h = c.height;
  const img = ctx.getImageData(0, 0, w, h);
  const rgba = img.data;
  const amount = (steps.sharpen / 100) * 1.6;

  if (steps.grayscale) {
    let g = toGray(rgba, w, h);
    if (steps.invert) applyLut(g, toneLut({ invert: true }), false);
    if (steps.flatten) g = flattenOp(g, w, h);
    let lo = 0, hi = 255;
    if (steps.stretch) {
      const hist = histogram(g);
      lo = percentile(hist, g.length, 0.01);
      hi = percentile(hist, g.length, 0.99);
      if (hi - lo < 40) { lo = 0; hi = 255; }
    }
    if (lo !== 0 || hi !== 255 || steps.brightness || steps.contrast) {
      applyLut(g, toneLut({ lo, hi, brightness: steps.brightness, contrast: steps.contrast }), false);
    }
    if (steps.denoise) g = median3(g, w, h);
    if (amount) sharpenOp(g, w, h, amount, false);
    if (steps.bw) threshold(g);
    grayToRgba(g, rgba);
  } else {
    let lo = 0, hi = 255;
    if (steps.stretch) {
      const hist = histogram(toGray(rgba, w, h));
      lo = percentile(hist, w * h, 0.01);
      hi = percentile(hist, w * h, 0.99);
      if (hi - lo < 40) { lo = 0; hi = 255; }
    }
    if (steps.invert || lo !== 0 || hi !== 255 || steps.brightness || steps.contrast) {
      applyLut(rgba, toneLut({ invert: steps.invert, lo, hi, brightness: steps.brightness, contrast: steps.contrast }), true);
    }
    if (amount) sharpenOp(rgba, w, h, amount, true);
  }
  ctx.putImageData(img, 0, 0);
}

export async function process(job: ProcessJob): Promise<ProcessResult> {
  const base = await getBase(job);
  const bw = base.canvas.width, bh = base.canvas.height;
  const steps = resolveSteps(job.adjust, base.analysis, job.mode, base.angle);

  let out: Canvas2D;
  let scale: number;
  if (job.target === 'preview') {
    const maxSide = job.maxSide ?? 1600;
    scale = Math.min(1, maxSide / Math.max(bw, bh));
    let pre = base.previews.get(maxSide);
    if (!pre) {
      pre = scaled(base.canvas, scale);
      base.previews.set(maxSide, pre);
    }
    // Copy so tone changes never touch the cached preview base.
    const [c, ctx] = canvas(pre.width, pre.height);
    ctx.drawImage(pre, 0, 0);
    out = c;
  } else {
    scale = job.scale ?? ocrScale(base.analysis, bw, bh);
    const s = scaled(base.canvas, scale);
    if (s === base.canvas) {
      const [c, ctx] = canvas(bw, bh);
      ctx.drawImage(base.canvas, 0, 0);
      out = c;
    } else {
      out = s;
    }
  }
  steps.scale = scale;
  if (job.tone !== false) applyTone(out, steps);

  const result: ProcessResult = {
    width: out.width,
    height: out.height,
    baseWidth: bw,
    baseHeight: bh,
    scale: out.width / bw,
    analysis: base.analysis,
    steps,
  };
  if (job.target === 'preview') result.bitmap = out.transferToImageBitmap();
  else result.blob = await out.convertToBlob({ type: 'image/png' });
  return result;
}
