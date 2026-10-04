// Pixel operations on plain typed arrays. No DOM access, so they run inside the
// image worker and in Node tests alike.

export type Gray = Uint8ClampedArray;

export function toGray(rgba: Uint8ClampedArray, w: number, h: number): Gray {
  const n = w * h;
  const g = new Uint8ClampedArray(n);
  for (let i = 0, j = 0; i < n; i++, j += 4) {
    // Rec. 601 luma, integer maths
    g[i] = (rgba[j] * 77 + rgba[j + 1] * 150 + rgba[j + 2] * 29) >> 8;
  }
  return g;
}

export function grayToRgba(g: Gray, rgba: Uint8ClampedArray): void {
  for (let i = 0, j = 0; i < g.length; i++, j += 4) {
    const v = g[i];
    rgba[j] = v;
    rgba[j + 1] = v;
    rgba[j + 2] = v;
    rgba[j + 3] = 255;
  }
}

export function histogram(g: Gray): Uint32Array {
  const h = new Uint32Array(256);
  for (let i = 0; i < g.length; i++) h[g[i]]++;
  return h;
}

export function percentile(hist: Uint32Array, total: number, p: number): number {
  const target = total * p;
  let acc = 0;
  for (let v = 0; v < 256; v++) {
    acc += hist[v];
    if (acc >= target) return v;
  }
  return 255;
}

export function otsu(hist: Uint32Array, total: number): number {
  let sum = 0;
  for (let i = 0; i < 256; i++) sum += i * hist[i];
  let sumB = 0, wB = 0, best = 0, threshold = 127;
  for (let t = 0; t < 256; t++) {
    wB += hist[t];
    if (!wB) continue;
    const wF = total - wB;
    if (!wF) break;
    sumB += t * hist[t];
    const mB = sumB / wB;
    const mF = (sum - sumB) / wF;
    const between = wB * wF * (mB - mF) * (mB - mF);
    if (between > best) {
      best = between;
      threshold = t;
    }
  }
  return threshold;
}

export function applyLut(data: Uint8ClampedArray, lut: Uint8ClampedArray, rgba: boolean): void {
  if (rgba) {
    for (let j = 0; j < data.length; j += 4) {
      data[j] = lut[data[j]];
      data[j + 1] = lut[data[j + 1]];
      data[j + 2] = lut[data[j + 2]];
    }
  } else {
    for (let i = 0; i < data.length; i++) data[i] = lut[data[i]];
  }
}

/** Builds a lookup table for brightness/contrast/levels/invert in one pass. */
export function toneLut(opts: {
  brightness?: number;
  contrast?: number;
  lo?: number;
  hi?: number;
  invert?: boolean;
}): Uint8ClampedArray {
  const { brightness = 0, contrast = 0, lo = 0, hi = 255, invert = false } = opts;
  const lut = new Uint8ClampedArray(256);
  const c = Math.max(-254, Math.min(254, contrast * 2));
  const cf = (259 * (c + 255)) / (255 * (259 - c));
  const range = Math.max(1, hi - lo);
  for (let v = 0; v < 256; v++) {
    let x = invert ? 255 - v : v;
    x = ((x - lo) * 255) / range;
    x = cf * (x - 128) + 128 + brightness * 1.2;
    lut[v] = x;
  }
  return lut;
}

/** Separable running-sum box blur on a single channel. */
export function boxBlur(src: ArrayLike<number>, w: number, h: number, r: number): Float32Array {
  const tmp = new Float32Array(w * h);
  const out = new Float32Array(w * h);
  const d = 2 * r + 1;
  for (let y = 0; y < h; y++) {
    const row = y * w;
    let acc = 0;
    for (let x = -r; x <= r; x++) acc += src[row + Math.min(w - 1, Math.max(0, x))];
    for (let x = 0; x < w; x++) {
      tmp[row + x] = acc / d;
      acc += src[row + Math.min(w - 1, x + r + 1)] - src[row + Math.max(0, x - r)];
    }
  }
  for (let x = 0; x < w; x++) {
    let acc = 0;
    for (let y = -r; y <= r; y++) acc += tmp[Math.min(h - 1, Math.max(0, y)) * w + x];
    for (let y = 0; y < h; y++) {
      out[y * w + x] = acc / d;
      acc += tmp[Math.min(h - 1, y + r + 1) * w + x] - tmp[Math.max(0, y - r) * w + x];
    }
  }
  return out;
}

/** Unsharp mask; amount 0–2. Works on gray or RGBA. */
export function sharpen(data: Uint8ClampedArray, w: number, h: number, amount: number, rgba: boolean): void {
  if (amount <= 0) return;
  if (!rgba) {
    const blur = boxBlur(data, w, h, 1);
    for (let i = 0; i < data.length; i++) data[i] = data[i] + amount * (data[i] - blur[i]);
    return;
  }
  // Sharpen luminance only so colours don't fringe.
  const g = toGray(data, w, h);
  const blur = boxBlur(g, w, h, 1);
  for (let i = 0, j = 0; i < g.length; i++, j += 4) {
    const delta = amount * (g[i] - blur[i]);
    data[j] = data[j] + delta;
    data[j + 1] = data[j + 1] + delta;
    data[j + 2] = data[j + 2] + delta;
  }
}

/**
 * Estimates the paper brightness at every pixel and divides it out, removing
 * shadows and uneven lighting from phone photos. Expects dark text on light.
 */
export function flatten(g: Gray, w: number, h: number): Gray {
  const block = Math.max(12, Math.round(Math.min(w, h) / 28));
  const gw = Math.ceil(w / block);
  const gh = Math.ceil(h / block);
  const grid = new Float32Array(gw * gh);
  const hist = new Uint32Array(256);
  for (let by = 0; by < gh; by++) {
    for (let bx = 0; bx < gw; bx++) {
      hist.fill(0);
      const x0 = bx * block, y0 = by * block;
      const x1 = Math.min(w, x0 + block), y1 = Math.min(h, y0 + block);
      let n = 0;
      for (let y = y0; y < y1; y += 2) {
        for (let x = x0; x < x1; x += 2) {
          hist[g[y * w + x]]++;
          n++;
        }
      }
      grid[by * gw + bx] = percentile(hist, n, 0.9);
    }
  }
  // Smooth the background grid so text-heavy blocks don't create blotches.
  const smooth = boxBlur(boxBlur(grid, gw, gh, 1), gw, gh, 1);
  const out = new Uint8ClampedArray(w * h);
  for (let y = 0; y < h; y++) {
    const gy = Math.min(gh - 1.001, Math.max(0, y / block - 0.5));
    const iy = Math.floor(gy), fy = gy - iy;
    for (let x = 0; x < w; x++) {
      const gx = Math.min(gw - 1.001, Math.max(0, x / block - 0.5));
      const ix = Math.floor(gx), fx = gx - ix;
      const i00 = iy * gw + ix;
      const i10 = i00 + (ix + 1 < gw ? 1 : 0);
      const i01 = i00 + (iy + 1 < gh ? gw : 0);
      const i11 = i01 + (ix + 1 < gw ? 1 : 0);
      const bg =
        smooth[i00] * (1 - fx) * (1 - fy) +
        smooth[i10] * fx * (1 - fy) +
        smooth[i01] * (1 - fx) * fy +
        smooth[i11] * fx * fy;
      const i = y * w + x;
      out[i] = (g[i] * 245) / Math.max(bg, 24);
    }
  }
  return out;
}

/** 3×3 median filter for speckle noise. */
export function median3(g: Gray, w: number, h: number): Gray {
  const out = new Uint8ClampedArray(g);
  const v = new Uint8Array(9);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      let k = 0;
      for (let dy = -1; dy <= 1; dy++) {
        const row = (y + dy) * w + x;
        v[k++] = g[row - 1];
        v[k++] = g[row];
        v[k++] = g[row + 1];
      }
      // Insertion sort is fastest for 9 values.
      for (let a = 1; a < 9; a++) {
        const t = v[a];
        let b = a - 1;
        while (b >= 0 && v[b] > t) {
          v[b + 1] = v[b];
          b--;
        }
        v[b + 1] = t;
      }
      out[y * w + x] = v[4];
    }
  }
  return out;
}

export function threshold(g: Gray): void {
  const t = otsu(histogram(g), g.length);
  for (let i = 0; i < g.length; i++) g[i] = g[i] > t ? 255 : 0;
}

/**
 * Keeps only glyph-like connected components of a binary ink mask (1 = ink):
 * letters and digits, not table edges, photos or dark surroundings. Returns
 * the filtered mask and the median glyph height (null when there are too few).
 */
export function glyphs(mask: Uint8Array, w: number, h: number): { mask: Uint8Array; median: number | null } {
  const label = new Int32Array(w * h);
  const stack = new Int32Array(w * h);
  const out = new Uint8Array(w * h);
  const heights: number[] = [];
  const maxH = h * 0.25;
  let next = 0;
  for (let start = 0; start < mask.length; start++) {
    if (!mask[start] || label[start]) continue;
    next++;
    let sp = 0;
    stack[sp++] = start;
    label[start] = next;
    let minX = w, maxX = 0, minY = h, maxY = 0, area = 0;
    const members: number[] = [];
    while (sp) {
      const p = stack[--sp];
      members.push(p);
      const x = p % w, y = (p - x) / w;
      area++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      if (x > 0 && mask[p - 1] && !label[p - 1]) { label[p - 1] = next; stack[sp++] = p - 1; }
      if (x < w - 1 && mask[p + 1] && !label[p + 1]) { label[p + 1] = next; stack[sp++] = p + 1; }
      if (y > 0 && mask[p - w] && !label[p - w]) { label[p - w] = next; stack[sp++] = p - w; }
      if (y < h - 1 && mask[p + w] && !label[p + w]) { label[p + w] = next; stack[sp++] = p + w; }
    }
    const bw = maxX - minX + 1, bh = maxY - minY + 1;
    if (bh < 3 || bh > maxH || bw > w * 0.3) continue;
    const aspect = bw / bh;
    if (aspect < 0.08 || aspect > 6) continue;
    const fill = area / (bw * bh);
    if (fill < 0.06 || fill > 0.95) continue;
    for (const m of members) out[m] = 1;
    if (bh >= 4 && aspect >= 0.12 && aspect <= 4 && heights.length < 4000) heights.push(bh);
  }
  if (heights.length < 12) return { mask: out, median: null };
  heights.sort((a, b) => a - b);
  return { mask: out, median: heights[Math.floor(heights.length / 2)] };
}

/**
 * Estimates text skew in degrees using projection profiles of ink pixels.
 * Positive means lines descend to the right (a clockwise tilt on screen);
 * rotating the image by −skew straightens it.
 */
export function estimateSkew(mask: Uint8Array, w: number, h: number): number {
  const xs: number[] = [];
  const ys: number[] = [];
  const total = mask.reduce((a, b) => a + b, 0);
  const stride = Math.max(1, Math.floor(total / 40000));
  let k = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (mask[y * w + x] && k++ % stride === 0) {
        xs.push(x - w / 2);
        ys.push(y - h / 2);
      }
    }
  }
  if (xs.length < 200) return 0;
  const diag = Math.ceil(Math.hypot(w, h));
  const bins = new Float64Array(diag + 2);
  const energy = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    const s = Math.sin(a), c = Math.cos(a);
    bins.fill(0);
    for (let i = 0; i < xs.length; i++) {
      const r = Math.round(ys[i] * c - xs[i] * s + diag / 2);
      if (r >= 0 && r < bins.length) bins[r]++;
    }
    let e = 0;
    for (let i = 0; i < bins.length; i++) e += bins[i] * bins[i];
    return e;
  };
  let best = 0, bestE = energy(0);
  const base = bestE;
  for (let d = -12; d <= 12; d += 0.5) {
    const e = energy(d);
    if (e > bestE) { bestE = e; best = d; }
  }
  const coarse = best;
  for (let d = coarse - 0.5; d <= coarse + 0.5; d += 0.1) {
    const e = energy(d);
    if (e > bestE) { bestE = e; best = d; }
  }
  // Ignore weak evidence (photos, sparse text): require a clear improvement.
  if (bestE < base * 1.08) return 0;
  return Math.round(best * 10) / 10;
}

/** Solves the 3×3 homography mapping the unit rectangle (w×h) onto `quad`. */
export function homography(w: number, h: number, quad: [number, number][]): number[] {
  const src: [number, number][] = [[0, 0], [w, 0], [w, h], [0, h]];
  const A: number[][] = [];
  const b: number[] = [];
  for (let i = 0; i < 4; i++) {
    const [u, v] = src[i];
    const [x, y] = quad[i];
    A.push([u, v, 1, 0, 0, 0, -u * x, -v * x]);
    b.push(x);
    A.push([0, 0, 0, u, v, 1, -u * y, -v * y]);
    b.push(y);
  }
  const s = solve(A, b);
  return [...s, 1];
}

function solve(A: number[][], b: number[]): number[] {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]]);
  for (let col = 0; col < n; col++) {
    let piv = col;
    for (let r = col + 1; r < n; r++) if (Math.abs(M[r][col]) > Math.abs(M[piv][col])) piv = r;
    [M[col], M[piv]] = [M[piv], M[col]];
    const d = M[col][col] || 1e-12;
    for (let c = col; c <= n; c++) M[col][c] /= d;
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = M[r][col];
      if (!f) continue;
      for (let c = col; c <= n; c++) M[r][c] -= f * M[col][c];
    }
  }
  return M.map((row) => row[n]);
}

/** Bilinear perspective warp of RGBA data. */
export function warp(
  src: Uint8ClampedArray,
  sw: number,
  sh: number,
  H: number[],
  ow: number,
  oh: number,
): Uint8ClampedArray {
  const out = new Uint8ClampedArray(ow * oh * 4);
  const [a, b, c, d, e, f, g, hh] = H;
  for (let v = 0; v < oh; v++) {
    for (let u = 0; u < ow; u++) {
      const den = g * u + hh * v + 1;
      const x = (a * u + b * v + c) / den;
      const y = (d * u + e * v + f) / den;
      const o = (v * ow + u) * 4;
      if (x < 0 || y < 0 || x > sw - 1 || y > sh - 1) {
        out[o] = out[o + 1] = out[o + 2] = 255;
        out[o + 3] = 255;
        continue;
      }
      const x0 = x | 0, y0 = y | 0;
      const x1 = Math.min(sw - 1, x0 + 1), y1 = Math.min(sh - 1, y0 + 1);
      const fx = x - x0, fy = y - y0;
      const i00 = (y0 * sw + x0) * 4, i10 = (y0 * sw + x1) * 4;
      const i01 = (y1 * sw + x0) * 4, i11 = (y1 * sw + x1) * 4;
      for (let ch = 0; ch < 4; ch++) {
        out[o + ch] =
          src[i00 + ch] * (1 - fx) * (1 - fy) +
          src[i10 + ch] * fx * (1 - fy) +
          src[i01 + ch] * (1 - fx) * fy +
          src[i11 + ch] * fx * fy;
      }
    }
  }
  return out;
}
