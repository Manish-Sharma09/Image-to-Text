// Searchable PDF: each page is the original image with an invisible text
// layer on top (text render mode 3), the way OCR tools such as Tesseract do
// it. The layer uses a Type0 font with Identity-H encoding over the
// "glyphless" TrueType font: every CID maps to one empty glyph, text is
// written as UTF-16BE code units, and a ToUnicode CMap maps each code back
// to itself, so any script can be selected, searched and copied.

import type { BBox } from '../ocr/types';
import { glyphlessFont } from './glyphless-font';
import { readJpegInfo } from './jpeg';
import { PdfWriter, latin1, num, pdfDate, pdfHexUtf16, pdfTextString } from './pdf-writer';

export interface SearchablePage {
  /** JPEG bytes of the page image. */
  jpeg: Uint8Array;
  /** Size, in pixels, that the word boxes refer to. */
  width: number;
  height: number;
  words: { text: string; bbox: BBox }[];
}

const MAX_SIDE = 842; // pt: the long side of A4
const GLYPH_WIDTH = 0.5; // em: /DW 500 in the CIDFont

/** Every CID (0–65535) → glyph 1, as 2-byte big-endian GIDs. */
function cidToGidMap(): Uint8Array {
  const map = new Uint8Array(2 * 65536);
  for (let i = 1; i < map.length; i += 2) map[i] = 1;
  return map;
}

/** ToUnicode CMap mapping each 2-byte code to the same UTF-16 code unit. */
function toUnicodeCMap(): string {
  // A bfrange may only vary in its last byte, so the identity map takes 256
  // ranges, written in blocks of at most 100.
  const ranges: string[] = [];
  for (let hi = 0; hi < 256; hi++) {
    const h = hi.toString(16).padStart(2, '0').toUpperCase();
    ranges.push(`<${h}00> <${h}FF> <${h}00>`);
  }
  const blocks: string[] = [];
  for (let i = 0; i < ranges.length; i += 100) {
    const chunk = ranges.slice(i, i + 100);
    blocks.push(`${chunk.length} beginbfrange\n${chunk.join('\n')}\nendbfrange`);
  }
  return [
    '/CIDInit /ProcSet findresource begin',
    '12 dict begin',
    'begincmap',
    '/CIDSystemInfo << /Registry (Adobe) /Ordering (UCS) /Supplement 0 >> def',
    '/CMapName /Adobe-Identity-UCS def',
    '/CMapType 2 def',
    '1 begincodespacerange',
    '<0000> <FFFF>',
    'endcodespacerange',
    ...blocks,
    'endcmap',
    'CMapName currentdict /CMap defineresource pop',
    'end',
    'end',
  ].join('\n');
}

/** Invisible text operators for one page; `s` converts image pixels to points. */
function textLayer(page: SearchablePage, s: number, pageH: number): string {
  const ops: string[] = ['BT', '3 Tr'];
  let lastSize = -1;
  const words = page.words
    .map((w) => ({ text: w.text.normalize('NFC').replace(/[\u0000-\u001F\u007F]/g, '').trim(), bbox: w.bbox }))
    .filter((w) => w.text && w.bbox.x1 > w.bbox.x0 && w.bbox.y1 > w.bbox.y0);
  words.forEach((word, i) => {
    const { x0, y0, x1, y1 } = word.bbox;
    // The glyph box spans baseline to 1 em up, so a font as tall as the word
    // box with its baseline at the box bottom makes selection match the image.
    const size = Math.max(1, (y1 - y0) * s);
    const width = (x1 - x0) * s;
    const tz = (100 * width) / (word.text.length * GLYPH_WIDTH * size);
    if (Math.abs(size - lastSize) > 0.01) {
      ops.push(`/F0 ${num(size)} Tf`);
      lastSize = size;
    }
    // A trailing space keeps words apart when the text is copied.
    const text = i < words.length - 1 ? word.text + ' ' : word.text;
    ops.push(`${num(tz)} Tz 1 0 0 1 ${num(x0 * s)} ${num(pageH - y1 * s)} Tm ${pdfHexUtf16(text)} Tj`);
  });
  ops.push('ET');
  return ops.join('\n');
}

/** Pure PDF builder (no browser APIs), so it can be tested with JPEG bytes directly. */
export function buildSearchablePdf(pages: SearchablePage[], meta: { title: string; createdAt: Date }): Uint8Array {
  const w = new PdfWriter();
  const catalog = w.ref();
  const pagesId = w.ref();
  const info = w.ref();
  const font = w.ref();
  const cidFont = w.ref();
  const cidMap = w.ref();
  const toUnicode = w.ref();
  const descriptor = w.ref();
  const fontFile = w.ref();
  const refs = pages.map(() => ({ page: w.ref(), content: w.ref(), image: w.ref() }));

  w.obj(catalog, `<< /Type /Catalog /Pages ${pagesId} 0 R /ViewerPreferences << /DisplayDocTitle true >> >>`);
  w.obj(pagesId, `<< /Type /Pages /Kids [${refs.map((r) => `${r.page} 0 R`).join(' ')}] /Count ${refs.length} >>`);
  const title = meta.title.trim() || 'Extracted text';
  w.obj(info, `<< /Title ${pdfTextString(title)} /Producer (Image to Text App) /Creator (Image to Text App) /CreationDate ${pdfDate(meta.createdAt)} >>`);

  w.obj(font, `<< /Type /Font /Subtype /Type0 /BaseFont /GlyphLessFont /Encoding /Identity-H /DescendantFonts [${cidFont} 0 R] /ToUnicode ${toUnicode} 0 R >>`);
  w.obj(
    cidFont,
    `<< /Type /Font /Subtype /CIDFontType2 /BaseFont /GlyphLessFont /CIDSystemInfo << /Registry (Adobe) /Ordering (Identity) /Supplement 0 >> ` +
      `/FontDescriptor ${descriptor} 0 R /CIDToGIDMap ${cidMap} 0 R /DW ${GLYPH_WIDTH * 1000} >>`,
  );
  w.stream(cidMap, '', cidToGidMap());
  w.stream(toUnicode, '', latin1(toUnicodeCMap()));
  w.obj(
    descriptor,
    `<< /Type /FontDescriptor /FontName /GlyphLessFont /Flags 5 /FontBBox [0 0 ${GLYPH_WIDTH * 1000} 1000] ` +
      `/ItalicAngle 0 /Ascent 1000 /Descent -1 /CapHeight 1000 /StemV 80 /FontFile2 ${fontFile} 0 R >>`,
  );
  const ttf = glyphlessFont();
  w.stream(fontFile, `/Length1 ${ttf.length}`, ttf, false);

  pages.forEach((p, i) => {
    const jpeg = readJpegInfo(p.jpeg);
    if (!jpeg) throw new Error(`Page ${i + 1}: the image is not a JPEG`);
    const s = Math.min(1, MAX_SIDE / Math.max(p.width, p.height));
    const pageW = p.width * s;
    const pageH = p.height * s;
    const { page, content, image } = refs[i];
    const colorSpace =
      jpeg.components === 1 ? '/DeviceGray' : jpeg.components === 4 ? `/DeviceCMYK${jpeg.adobe ? ' /Decode [1 0 1 0 1 0 1 0]' : ''}` : '/DeviceRGB';
    w.stream(
      image,
      `/Type /XObject /Subtype /Image /Width ${jpeg.width} /Height ${jpeg.height} /ColorSpace ${colorSpace} /BitsPerComponent 8 /Filter /DCTDecode`,
      p.jpeg,
      false,
    );
    const ops = `q ${num(pageW)} 0 0 ${num(pageH)} 0 0 cm /Im0 Do Q\n${textLayer(p, s, pageH)}`;
    w.stream(content, '', latin1(ops));
    w.obj(
      page,
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${num(pageW)} ${num(pageH)}] ` +
        `/Resources << /Font << /F0 ${font} 0 R >> /XObject << /Im0 ${image} 0 R >> /ProcSet [/PDF /Text /ImageB /ImageC] >> ` +
        `/Contents ${content} 0 R >>`,
    );
  });
  return w.finish(catalog, info);
}
