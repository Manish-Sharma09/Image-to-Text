import type { BBox, OcrWord, OcrPage } from '../ocr/types';
import { allWords, bboxUnion } from '../ocr/types';
import type { Segment } from './types';

export interface Row {
  words: OcrWord[];
  bbox: BBox;
}

export const h = (b: BBox) => b.y1 - b.y0;
export const w = (b: BBox) => b.x1 - b.x0;
export const cy = (b: BBox) => (b.y0 + b.y1) / 2;

export function median(values: number[]): number {
  if (!values.length) return 0;
  const s = [...values].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/**
 * Groups words into visual rows by vertical overlap, ignoring the engine's
 * block structure. Used for tables, receipts and code where columns that the
 * engine split into separate blocks belong on the same line.
 */
export function visualRows(words: OcrWord[], slope = 0): Row[] {
  // Undo residual skew so a price on the right lines up with its item.
  const y0 = (b: BBox) => b.y0 - slope * (b.x0 + b.x1) / 2;
  const y1 = (b: BBox) => b.y1 - slope * (b.x0 + b.x1) / 2;
  const sorted = [...words].sort((a, b) => (y0(a.bbox) + y1(a.bbox)) - (y0(b.bbox) + y1(b.bbox)));
  const rows: { words: OcrWord[]; y0: number; y1: number }[] = [];
  for (const word of sorted) {
    const wy0 = y0(word.bbox), wy1 = y1(word.bbox);
    let best: (typeof rows)[number] | null = null;
    let bestOv = 0;
    for (let i = rows.length - 1; i >= Math.max(0, rows.length - 6); i--) {
      const r = rows[i];
      const ov = Math.min(wy1, r.y1) - Math.max(wy0, r.y0);
      const need = 0.5 * Math.min(wy1 - wy0, r.y1 - r.y0);
      if (ov > need && ov > bestOv) {
        best = r;
        bestOv = ov;
      }
    }
    if (best) {
      best.words.push(word);
      const n = best.words.length;
      // Running mean keeps the band stable when one tall glyph joins.
      best.y0 += (wy0 - best.y0) / n;
      best.y1 += (wy1 - best.y1) / n;
    } else {
      rows.push({ words: [word], y0: wy0, y1: wy1 });
    }
  }
  return rows
    .sort((a, b) => a.y0 + a.y1 - (b.y0 + b.y1))
    .map((r) => {
      const ws = r.words.sort((a, b) => a.bbox.x0 - b.bbox.x0);
      return { words: ws, bbox: bboxUnion(ws.map((x) => x.bbox)) };
    });
}

/**
 * Residual text slope (dy/dx) measured along the engine's own lines, which
 * follow baselines even when the page is slightly rotated.
 */
export function pageSlope(page: OcrPage): number {
  const slopes: number[] = [];
  for (const b of page.blocks) {
    for (const p of b.paragraphs) {
      for (const l of p.lines) {
        if (l.words.length < 2) continue;
        if (l.slope !== undefined) {
          slopes.push(l.slope);
          continue;
        }
        // No fitted baseline: trust a line only when its tops and bottoms
        // tilt the same way (descenders alone shouldn't read as skew).
        if (l.words.length < 3) continue;
        const fit = (pick: (x: OcrWord) => number) => {
          const pts = l.words.map((x) => [(x.bbox.x0 + x.bbox.x1) / 2, pick(x)] as const);
          const mx = pts.reduce((a, q) => a + q[0], 0) / pts.length;
          const my = pts.reduce((a, q) => a + q[1], 0) / pts.length;
          let num = 0, den = 0;
          for (const [x, y] of pts) {
            num += (x - mx) * (y - my);
            den += (x - mx) * (x - mx);
          }
          return den > 0 ? num / den : 0;
        };
        const top = fit((x) => x.bbox.y0);
        const bottom = fit((x) => x.bbox.y1);
        if (Math.abs(top - bottom) < 0.004 + 0.3 * Math.max(Math.abs(top), Math.abs(bottom))) slopes.push((top + bottom) / 2);
      }
    }
  }
  if (slopes.length < 2) return 0;
  const s = median(slopes);
  return Math.abs(s) > 0.003 && Math.abs(s) < 0.2 ? s : 0;
}

export function pageRows(page: OcrPage): Row[] {
  return visualRows(allWords(page), pageSlope(page));
}

/** Median width of one character, estimated from word boxes. */
export function charWidth(words: OcrWord[]): number {
  const v = words.filter((x) => x.text.length >= 2).map((x) => w(x.bbox) / x.text.length);
  return median(v) || 8;
}

export function rowText(row: Row): string {
  return row.words.map((x) => x.text).join(' ');
}

/** Builds output text while recording which image box each word came from. */
export class TextBuilder {
  text = '';
  segments: Segment[] = [];

  push(s: string): void {
    this.text += s;
  }

  word(word: OcrWord, text = word.text): void {
    const from = this.text.length;
    this.text += text;
    this.segments.push({ from, to: this.text.length, bbox: word.bbox, conf: word.conf });
  }

  /** Removes trailing whitespace, keeping segments valid. */
  trimEnd(): void {
    this.text = this.text.replace(/\s+$/, '');
  }
}

const LIGATURES: Record<string, string> = { 'ﬁ': 'fi', 'ﬂ': 'fl', 'ﬀ': 'ff', 'ﬃ': 'ffi', 'ﬄ': 'ffl', 'ﬅ': 'st', 'ﬆ': 'st' };

export function cleanWord(t: string): string {
  return t.replace(/[ﬀ-ﬆ]/g, (c) => LIGATURES[c] ?? c);
}

export function straightQuotes(t: string): string {
  return t
    .replace(/[‘’‚‛′]/g, "'")
    .replace(/[“”„‟″]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/…/g, '...');
}
