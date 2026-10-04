import type { ImageAnalysis } from './types';
import {
  toGray,
  histogram,
  percentile,
  otsu,
  flatten,
  glyphs,
  estimateSkew,
  type Gray,
} from './ops';

/**
 * Looks at an RGBA image (already downscaled to a working size) and decides
 * what kind of picture it is and what would help OCR. `scaleToSource`
 * converts working-size pixel measurements back to the source image.
 */
export function analyze(
  rgba: Uint8ClampedArray,
  w: number,
  h: number,
  scaleToSource: number,
): ImageAnalysis {
  const n = w * h;
  const g = toGray(rgba, w, h);
  const hist = histogram(g);
  let sum = 0;
  for (let v = 0; v < 256; v++) sum += v * hist[v];
  const mean = sum / n;
  const p2 = percentile(hist, n, 0.02);
  const p98 = percentile(hist, n, 0.98);

  const flatRatio = measureFlatRatio(rgba, n);
  const likelyScreenshot = flatRatio > 0.35;
  const likelyPhoto = flatRatio < 0.12;

  const t = otsu(hist, n);
  let darkCount = 0;
  for (let v = 0; v <= t; v++) darkCount += hist[v];
  const darkShare = darkCount / n;
  const darkBackground = darkShare > 0.62 && (likelyScreenshot || mean < 115);

  const lowContrast = p98 - p2 < 110;
  const uneven = !likelyScreenshot && measureUnevenness(g, w, h, darkBackground) > 0.22;

  // Build an ink mask with dark text on light paper.
  let work: Gray = g;
  if (darkBackground) {
    work = new Uint8ClampedArray(g.length);
    for (let i = 0; i < g.length; i++) work[i] = 255 - g[i];
  }
  if (uneven) work = flatten(work, w, h);
  const wh = histogram(work);
  const wt = otsu(wh, n);
  const mask = new Uint8Array(n);
  for (let i = 0; i < n; i++) mask[i] = work[i] <= wt ? 1 : 0;

  // Measure only letter-sized marks, so dark surroundings and photos don't
  // distort the tilt or text-size estimates.
  const g2 = glyphs(mask, w, h);
  const glyph = g2.median;
  const skew = estimateSkew(g2.mask, w, h);
  const ink = inkGrid(g2.mask, w, h);

  return {
    width: Math.round(w * scaleToSource),
    height: Math.round(h * scaleToSource),
    mean,
    p2,
    p98,
    darkBackground,
    lowContrast,
    uneven,
    flatRatio,
    likelyScreenshot,
    likelyPhoto,
    textHeight: glyph ? glyph * scaleToSource : null,
    skew,
    ink: { ...ink, width: Math.round(w * scaleToSource), height: Math.round(h * scaleToSource) },
  };
}

/** Marks grid cells whose ink density looks like text (not blank, not solid). */
function inkGrid(mask: Uint8Array, w: number, h: number) {
  const cols = 40;
  const rows = Math.max(1, Math.round((cols * h) / w));
  const cells = new Uint8Array(cols * rows);
  const cw = w / cols, ch = h / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x0 = Math.floor(c * cw), x1 = Math.floor((c + 1) * cw);
      const y0 = Math.floor(r * ch), y1 = Math.floor((r + 1) * ch);
      let ink = 0, n = 0;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          ink += mask[y * w + x];
          n++;
        }
      }
      const d = n ? ink / n : 0;
      cells[r * cols + c] = d > 0.02 && d < 0.45 ? 1 : 0;
    }
  }
  return { cols, rows, cells };
}

function measureFlatRatio(rgba: Uint8ClampedArray, n: number): number {
  const stride = Math.max(1, Math.floor(n / 40000));
  const counts = new Map<number, number>();
  let samples = 0;
  for (let i = 0; i < n; i += stride) {
    const j = i * 4;
    const key = (rgba[j] << 16) | (rgba[j + 1] << 8) | rgba[j + 2];
    counts.set(key, (counts.get(key) ?? 0) + 1);
    samples++;
  }
  const top = [...counts.values()].sort((a, b) => b - a).slice(0, 8);
  return top.reduce((a, b) => a + b, 0) / samples;
}

/** Spread of local paper brightness across a 6×6 grid, 0–1. */
function measureUnevenness(g: Gray, w: number, h: number, dark: boolean): number {
  const cells = 6;
  const cw = Math.floor(w / cells), ch = Math.floor(h / cells);
  if (cw < 8 || ch < 8) return 0;
  const vals: number[] = [];
  const hist = new Uint32Array(256);
  for (let cy = 0; cy < cells; cy++) {
    for (let cx = 0; cx < cells; cx++) {
      hist.fill(0);
      let k = 0;
      for (let y = cy * ch; y < (cy + 1) * ch; y += 2) {
        for (let x = cx * cw; x < (cx + 1) * cw; x += 2) {
          const v = g[y * w + x];
          hist[dark ? 255 - v : v]++;
          k++;
        }
      }
      vals.push(percentile(hist, k, 0.9));
    }
  }
  const max = Math.max(...vals), min = Math.min(...vals);
  return max ? (max - min) / max : 0;
}
