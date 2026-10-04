// Converts Tesseract's block tree into our OcrPage model. Pure function so it
// can be reused by tests and by any other engine that emits the same shape.

import type { BBox, OcrBlock, OcrLine, OcrPage, OcrParagraph, OcrWord } from './types';
import { bboxUnion } from './types';

interface TBox { x0: number; y0: number; x1: number; y1: number }
interface TSymbol { text: string; is_superscript?: boolean }
interface TWord { text: string; confidence: number; bbox: TBox; symbols?: TSymbol[] }
interface TLine { words: TWord[]; bbox: TBox; confidence: number; baseline?: TBox }
interface TPara { lines: TLine[]; bbox: TBox }
interface TBlock { paragraphs: TPara[]; bbox: TBox }
export interface TesseractPageLike {
  blocks: TBlock[] | null;
  text: string;
  confidence: number;
}

const PUNCT_ONLY = /^[^\p{L}\p{N}]+$/u;

function scaleBox(b: TBox, s: number): BBox {
  return { x0: b.x0 / s, y0: b.y0 / s, x1: b.x1 / s, y1: b.y1 / s };
}

/**
 * @param scale output pixels per base pixel used when the image was prepared;
 *   coordinates are divided by it so they match the page preview.
 */
export function normalizeTesseract(
  data: TesseractPageLike,
  opts: { scale: number; width: number; height: number; languages: string[]; durationMs: number },
): OcrPage {
  const blocks: OcrBlock[] = [];
  let confSum = 0;
  let confN = 0;

  for (const b of data.blocks ?? []) {
    const paragraphs: OcrParagraph[] = [];
    for (const p of b.paragraphs ?? []) {
      const lines: OcrLine[] = [];
      for (const l of p.lines ?? []) {
        const words: OcrWord[] = [];
        for (const w of l.words ?? []) {
          const text = (w.text ?? '').replace(/\s+/g, '');
          if (!text) continue;
          // Stray marks the engine reads from lines, icons and photo texture.
          if (w.confidence < 35 && PUNCT_ONLY.test(text)) continue;
          if (w.confidence < 15 && text.length <= 2) continue;
          const word: OcrWord = { text, conf: Math.round(w.confidence), bbox: scaleBox(w.bbox, opts.scale) };
          const sup: number[] = [];
          w.symbols?.forEach((s, i) => s.is_superscript && sup.push(i));
          if (sup.length && sup.length < text.length) word.sup = sup;
          words.push(word);
          confSum += w.confidence;
          confN++;
        }
        if (!words.length) continue;
        const bl = l.baseline;
        lines.push({
          words,
          bbox: bboxUnion(words.map((w) => w.bbox)),
          conf: words.reduce((a, w) => a + w.conf, 0) / words.length,
          slope: bl && bl.x1 - bl.x0 > 20 ? (bl.y1 - bl.y0) / (bl.x1 - bl.x0) : undefined,
        });
      }
      if (lines.length) paragraphs.push({ lines, bbox: bboxUnion(lines.map((l) => l.bbox)) });
    }
    if (paragraphs.length) blocks.push({ paragraphs, bbox: bboxUnion(paragraphs.map((p) => p.bbox)) });
  }

  const text = blocks
    .map((b) => b.paragraphs.map((p) => p.lines.map((l) => l.words.map((w) => w.text).join(' ')).join('\n')).join('\n\n'))
    .join('\n\n');

  return {
    width: opts.width,
    height: opts.height,
    blocks,
    text,
    conf: confN ? confSum / confN : 0,
    languages: opts.languages,
    provider: 'local',
    hasGeometry: true,
    durationMs: opts.durationMs,
  };
}
