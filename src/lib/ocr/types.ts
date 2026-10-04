// Shared OCR data model. Every provider normalises its output to OcrPage so the
// layout formatters, editor and exporters never depend on a specific engine.

export interface BBox {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export interface OcrWord {
  text: string;
  /** 0–100 */
  conf: number;
  bbox: BBox;
  /** Indices of characters the engine flagged as superscript (used by Math). */
  sup?: number[];
}

export interface OcrLine {
  words: OcrWord[];
  bbox: BBox;
  conf: number;
  /** Baseline slope (dy/dx) fitted by the engine, when available. */
  slope?: number;
}

export interface OcrParagraph {
  lines: OcrLine[];
  bbox: BBox;
}

export interface OcrBlock {
  paragraphs: OcrParagraph[];
  bbox: BBox;
}

/** Structured output a provider can return directly (cloud models do this). */
export interface ProviderStructure {
  table?: string[][];
  markdown?: string;
  fields?: Record<string, string>;
}

export interface OcrPage {
  /** Size of the image the coordinates refer to (the prepared page, unscaled). */
  width: number;
  height: number;
  blocks: OcrBlock[];
  /** The engine's own plain-text rendering. */
  text: string;
  /** Mean word confidence, 0–100. */
  conf: number;
  languages: string[];
  provider: ProviderId;
  /** False when the provider cannot return word positions. */
  hasGeometry: boolean;
  structure?: ProviderStructure;
  /** Page layout analysis the engine used. */
  layout?: LayoutHint;
  durationMs: number;
}

/**
 * `auto` lets the engine find columns and blocks (best for articles);
 * `block` reads the page as one block of lines (best for receipts, tables,
 * code and forms, where `auto` can skip right-aligned text).
 */
export type LayoutHint = 'auto' | 'block';

export type ProviderId = 'local' | 'enhanced';

/** What the user asks the text to be read as. */
export type ReadMode =
  | 'plain'
  | 'document'
  | 'table'
  | 'receipt'
  | 'code'
  | 'handwriting'
  | 'math';

export interface RecognizeRequest {
  /** The prepared page image (PNG). */
  image: Blob;
  /** Base page size that returned coordinates should refer to. */
  width: number;
  height: number;
  /** Image pixels per base pixel (the image may be enlarged for small text). */
  scale: number;
  languages: string[];
  mode: ReadMode;
  layout: LayoutHint;
  signal?: AbortSignal;
  onProgress?: (p: OcrProgress) => void;
}

export interface OcrProgress {
  stage: 'loading-engine' | 'loading-language' | 'recognizing' | 'uploading';
  /** 0–1 */
  progress: number;
}

export interface OcrProvider {
  id: ProviderId;
  label: string;
  /** True when images leave the device. Drives consent UI. */
  remote: boolean;
  recognize(req: RecognizeRequest): Promise<OcrPage>;
  /** Optional warm-up so the first recognition feels instant. */
  prepare?(languages: string[]): Promise<void>;
  dispose?(): Promise<void>;
}

export function bboxUnion(boxes: BBox[]): BBox {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const b of boxes) {
    if (b.x0 < x0) x0 = b.x0;
    if (b.y0 < y0) y0 = b.y0;
    if (b.x1 > x1) x1 = b.x1;
    if (b.y1 > y1) y1 = b.y1;
  }
  if (x0 === Infinity) return { x0: 0, y0: 0, x1: 0, y1: 0 };
  return { x0, y0, x1, y1 };
}

export function lineText(line: OcrLine): string {
  return line.words.map((w) => w.text).join(' ');
}

export function allWords(page: OcrPage): OcrWord[] {
  const out: OcrWord[] = [];
  for (const b of page.blocks) for (const p of b.paragraphs) for (const l of p.lines) out.push(...l.words);
  return out;
}

export function allLines(page: OcrPage): OcrLine[] {
  const out: OcrLine[] = [];
  for (const b of page.blocks) for (const p of b.paragraphs) out.push(...p.lines);
  return out;
}
