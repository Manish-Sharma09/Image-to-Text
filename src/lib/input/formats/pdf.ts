// PDF pages become page images. Digital pages also carry their real text, so
// they don't need OCR at all.

import * as pdfjs from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import type { TextItem } from 'pdfjs-dist/types/src/display/api';
import type { OcrLine, OcrPage, OcrWord } from '../../ocr/types';
import { bboxUnion } from '../../ocr/types';
import { InputError } from '../errors';
import { canvasToBlob, type DecodedPage } from '../decode';
import { fmt, i18n } from '../../i18n.svelte';

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

/** Render size: about 220 dpi for a letter/A4 page. */
const TARGET_LONG_SIDE = 2400;

export async function decodePdf(blob: Blob, name: string, room: number): Promise<DecodedPage[]> {
  const task = pdfjs.getDocument({ data: new Uint8Array(await blob.arrayBuffer()) });
  let doc: pdfjs.PDFDocumentProxy;
  try {
    doc = await task.promise;
  } catch (e) {
    if ((e as Error)?.name === 'PasswordException') throw new InputError('pdf-locked', name);
    console.warn('pdf open failed', e);
    throw new InputError('decode', name);
  }
  const pages: DecodedPage[] = [];
  const count = Math.min(doc.numPages, room);
  for (let n = 1; n <= count; n++) {
    const page = await doc.getPage(n);
    const base = page.getViewport({ scale: 1 });
    const scale = TARGET_LONG_SIDE / Math.max(base.width, base.height);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);
    await page.render({ canvas, viewport, background: '#ffffff' }).promise;
    const out = await canvasToBlob(canvas, 'image/jpeg', 0.9);
    const content = await page.getTextContent();
    const textLayer = toOcrPage(content.items.filter((i): i is TextItem => 'str' in i), viewport, canvas.width, canvas.height);
    pages.push({
      name: doc.numPages > 1 ? fmt(i18n.t.names.filePage, { name, n }) : name,
      kind: 'pdf',
      blob: out,
      width: canvas.width,
      height: canvas.height,
      textLayer: textLayer ?? undefined,
    });
    page.cleanup();
  }
  await task.destroy();
  return pages;
}

/** Builds lines and paragraphs from PDF text runs, positioned in image pixels. */
function toOcrPage(items: TextItem[], viewport: pdfjs.PageViewport, width: number, height: number): OcrPage | null {
  const words: (OcrWord & { base: number; size: number })[] = [];
  for (const it of items) {
    if (!it.str.trim()) continue;
    const tx = pdfjs.Util.transform(viewport.transform, it.transform);
    const size = Math.hypot(tx[2], tx[3]);
    const x = tx[4];
    const base = tx[5];
    const total = it.width * viewport.scale;
    const chars = [...it.str];
    // Split the run into words, spacing them proportionally to character count.
    for (const m of it.str.matchAll(/\S+/g)) {
      const startChar = [...it.str.slice(0, m.index)].length;
      const len = [...m[0]].length;
      const x0 = x + (total * startChar) / chars.length;
      const x1 = x + (total * (startChar + len)) / chars.length;
      words.push({ text: m[0], conf: 100, bbox: { x0, y0: base - size * 0.85, x1, y1: base + size * 0.2 }, base, size });
    }
  }
  const letters = words.reduce((a, w) => a + w.text.length, 0);
  if (letters < 20) return null;

  // Lines: same baseline (within a fraction of the font size), left to right.
  words.sort((a, b) => a.base - b.base || a.bbox.x0 - b.bbox.x0);
  const lines: (OcrLine & { base: number; size: number })[] = [];
  for (const w of words) {
    const last = lines[lines.length - 1];
    if (last && Math.abs(w.base - last.base) < last.size * 0.4 && w.bbox.x0 >= last.bbox.x1 - last.size) {
      last.words.push(w);
      last.bbox = bboxUnion([last.bbox, w.bbox]);
    } else {
      lines.push({ words: [w], bbox: { ...w.bbox }, conf: 100, base: w.base, size: w.size, slope: 0 });
    }
  }
  // Paragraphs: break on a gap larger than ~1.6 line heights or a size change.
  const paragraphs: OcrPage['blocks'][number]['paragraphs'] = [];
  for (const l of lines) {
    const prev = paragraphs[paragraphs.length - 1];
    const prevLine = prev?.lines[prev.lines.length - 1] as (typeof lines)[number] | undefined;
    if (prev && prevLine && l.base - prevLine.base < prevLine.size * 1.6 && Math.abs(l.size - prevLine.size) < prevLine.size * 0.15) {
      prev.lines.push(l);
      prev.bbox = bboxUnion([prev.bbox, l.bbox]);
    } else {
      paragraphs.push({ lines: [l], bbox: { ...l.bbox } });
    }
  }
  const strip = ({ words: ws, bbox, conf, slope }: OcrLine) => ({
    words: ws.map(({ text, conf: c, bbox: b }) => ({ text, conf: c, bbox: b })),
    bbox,
    conf,
    slope,
  });
  const blocks = [{ paragraphs: paragraphs.map((p) => ({ lines: p.lines.map(strip), bbox: p.bbox })), bbox: bboxUnion(paragraphs.map((p) => p.bbox)) }];
  return {
    width,
    height,
    blocks,
    text: paragraphs.map((p) => p.lines.map((l) => l.words.map((w) => w.text).join(' ')).join('\n')).join('\n\n'),
    conf: 100,
    languages: [],
    provider: 'local',
    hasGeometry: true,
    layout: 'auto',
    durationMs: 0,
  };
}
