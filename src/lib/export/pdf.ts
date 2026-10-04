// Readable PDF export: A4 pages laid out with the standard Helvetica and
// Courier fonts (WinAnsiEncoding), so no font data has to be embedded.
// Text those fonts can't draw is detected up front by `docFitsWinAnsi`.

import { blockStrings, listMarker, pageBlocks, pageTitle, type Block, type ListBlock, type TableBlock } from './blocks';
import { parseNumericCell } from './numbers';
import { PdfWriter, latin1, num, pdfDate, pdfLiteral, pdfTextString } from './pdf-writer';
import type { ExportDoc } from './types';
import { encodeWinAnsi, fitsWinAnsi, normalizeWinAnsi, textWidth, type PdfFont } from './winansi';

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN_X = 56.69; // 20 mm
const MARGIN_TOP = 56.69;
const MARGIN_BOTTOM = 62; // leaves room for the page number
const CONTENT_W = PAGE_W - 2 * MARGIN_X;
const TOP = PAGE_H - MARGIN_TOP;

const FONT_RES: Record<PdfFont, string> = { regular: 'F1', bold: 'F2', mono: 'F3' };
const BODY = { size: 10.5, leading: 15 };
const HEADING_SIZE = [17, 14.5, 12.5, 11.5];
const CODE = { size: 9, leading: 12, pad: 6 };
const TABLE = { size: 9.5, leading: 12.5, pad: 4 };
const TEXT_GRAY = 0.1;

/** True when the whole document can be drawn with the built-in WinAnsi fonts. */
export function docFitsWinAnsi(doc: ExportDoc): boolean {
  if (!fitsWinAnsi(doc.title)) return false;
  return doc.pages.every((p, i) => fitsWinAnsi(pageTitle(p, i)) && [...blockStrings(pageBlocks(p))].every(fitsWinAnsi));
}

/** Splits one line of text into lines no wider than `width`, breaking long words by character. */
function wrap(text: string, font: PdfFont, size: number, width: number): string[] {
  const words = normalizeWinAnsi(text).replace(/\s+/g, ' ').trim().split(' ');
  const space = textWidth(' ', font, size);
  const out: string[] = [];
  let line = '';
  let lineW = 0;
  for (const word of words) {
    const w = textWidth(word, font, size);
    if (line && lineW + space + w <= width) {
      line += ' ' + word;
      lineW += space + w;
      continue;
    }
    if (line) out.push(line);
    line = word;
    lineW = w;
    while (lineW > width) {
      const [head, rest] = splitToWidth(line, font, size, width);
      out.push(head);
      line = rest;
      lineW = textWidth(rest, font, size);
    }
  }
  out.push(line);
  return out;
}

function splitToWidth(s: string, font: PdfFont, size: number, width: number): [string, string] {
  const chars = Array.from(s);
  let w = 0;
  let i = 0;
  for (; i < chars.length; i++) {
    w += textWidth(chars[i], font, size);
    if (w > width) break;
  }
  const cut = Math.max(1, i);
  return [chars.slice(0, cut).join(''), chars.slice(cut).join('')];
}

function expandTabs(line: string, tab = 4): string {
  let out = '';
  for (const ch of line) out += ch === '\t' ? ' '.repeat(tab - (out.length % tab)) : ch;
  return out;
}

/** Baseline of a line whose box starts at `top`, centring the glyphs in the leading. */
const baseline = (top: number, size: number, leading: number) => top - (leading - size) / 2 - size * 0.78;

class Layout {
  readonly pages: string[][] = [];
  private ops: string[] = [];
  y = TOP;

  constructor() {
    this.newPage();
  }

  newPage(): void {
    this.ops = [];
    this.pages.push(this.ops);
    this.y = TOP;
  }

  private get atTop(): boolean {
    return this.y >= TOP - 0.01;
  }

  /** Moves to a new page unless `h` more points fit on this one. */
  ensure(h: number): void {
    if (this.y - h < MARGIN_BOTTOM && !this.atTop) this.newPage();
  }

  /** Vertical space, dropped at the top of a page. */
  space(h: number): void {
    if (!this.atTop) this.y -= h;
  }

  text(x: number, y: number, s: string, font: PdfFont, size: number, gray = TEXT_GRAY): void {
    const codes = encodeWinAnsi(s);
    if (codes.length) this.ops.push(`BT ${num(gray)} g /${FONT_RES[font]} ${num(size)} Tf ${num(x)} ${num(y)} Td ${pdfLiteral(codes)} Tj ET`);
  }

  fill(x: number, y: number, w: number, h: number, gray: number): void {
    this.ops.push(`${num(gray)} g ${num(x)} ${num(y)} ${num(w)} ${num(h)} re f`);
  }

  stroke(x: number, y: number, w: number, h: number, gray: number): void {
    this.ops.push(`${num(gray)} G 0.5 w ${num(x)} ${num(y)} ${num(w)} ${num(h)} re S`);
  }

  /** Draws pre-wrapped lines at `x`, breaking pages as needed. */
  lines(lines: string[], x: number, font: PdfFont, size: number, leading: number): void {
    for (const line of lines) {
      this.ensure(leading);
      this.text(x, baseline(this.y, size, leading), line, font, size);
      this.y -= leading;
    }
  }

  title(text: string): void {
    const size = 20;
    this.lines(wrap(text, 'bold', size, CONTENT_W), MARGIN_X, 'bold', size, size * 1.25);
    this.y -= 6;
    this.fill(MARGIN_X, this.y, CONTENT_W, 0.75, 0.75);
    this.y -= 16;
  }

  heading(text: string, level: number): void {
    const size = HEADING_SIZE[Math.min(HEADING_SIZE.length, Math.max(1, level)) - 1];
    const leading = size * 1.3;
    const lines = wrap(text, 'bold', size, CONTENT_W);
    this.space(size * 0.8);
    // Keep the heading with at least two lines of what follows.
    this.ensure(lines.length * leading + 2 * BODY.leading);
    this.lines(lines, MARGIN_X, 'bold', size, leading);
    this.y -= 3;
  }

  paragraph(lines: string[]): void {
    this.lines(lines.flatMap((l) => wrap(l, 'regular', BODY.size, CONTENT_W)), MARGIN_X, 'regular', BODY.size, BODY.leading);
    this.space(BODY.size * 0.7);
  }

  list(b: ListBlock): void {
    const indent = 22;
    b.items.forEach((item, i) => {
      const marker = listMarker(b, i);
      const lines = item.flatMap((l) => wrap(l, 'regular', BODY.size, CONTENT_W - indent));
      lines.forEach((line, k) => {
        this.ensure(BODY.leading);
        const y = baseline(this.y, BODY.size, BODY.leading);
        if (k === 0) {
          const mx = b.style === 'bullet' ? MARGIN_X + 8 : MARGIN_X + indent - 5 - textWidth(marker, 'regular', BODY.size);
          this.text(mx, y, marker, 'regular', BODY.size);
        }
        this.text(MARGIN_X + indent, y, line, 'regular', BODY.size);
        this.y -= BODY.leading;
      });
      this.y -= 2;
    });
    this.space(BODY.size * 0.7);
  }

  code(text: string): void {
    const { size, leading, pad } = CODE;
    const maxChars = Math.floor((CONTENT_W - 2 * pad) / (0.6 * size));
    const lines = normalizeWinAnsi(text)
      .split('\n')
      .flatMap((raw) => {
        const chars = Array.from(expandTabs(raw));
        const out: string[] = [];
        for (let i = 0; i < chars.length; i += maxChars) out.push(chars.slice(i, i + maxChars).join(''));
        return out.length ? out : [''];
      });
    this.space(2);
    this.ensure(pad + leading);
    this.fill(MARGIN_X, this.y - pad, CONTENT_W, pad, 0.95);
    this.y -= pad;
    for (const line of lines) {
      this.ensure(leading + pad);
      // Slight overlap so the band has no hairline seams between lines.
      this.fill(MARGIN_X, this.y - leading - 0.3, CONTENT_W, leading + 0.6, 0.95);
      this.text(MARGIN_X + pad, baseline(this.y, size, leading), line, 'mono', size, 0.15);
      this.y -= leading;
    }
    this.fill(MARGIN_X, this.y - pad, CONTENT_W, pad, 0.95);
    this.y -= pad;
    this.space(BODY.size * 0.9);
  }

  table(b: TableBlock): void {
    if (!b.rows.length || !b.rows[0].length) return;
    const { size, leading, pad } = TABLE;
    const widths = tableWidths(b);
    const totalW = widths.reduce((a, w) => a + w, 0);
    const fontOf = (r: number): PdfFont => (b.header && r === 0 ? 'bold' : 'regular');
    // Rows taller than a page are cut to fit one page.
    const maxLines = Math.max(1, Math.floor((TOP - MARGIN_BOTTOM - 2 * pad) / leading) - 4);
    const cells = b.rows.map((row, r) =>
      row.map((cell, c) => cell.split('\n').flatMap((l) => wrap(l, fontOf(r), size, widths[c] - 2 * pad)).slice(0, maxLines)),
    );
    const height = (r: number) => Math.max(1, ...cells[r].map((c) => c.length)) * leading + 2 * pad;

    const drawRow = (r: number) => {
      const top = this.y;
      const h = height(r);
      if (fontOf(r) === 'bold') this.fill(MARGIN_X, top - h, totalW, h, 0.93);
      let x = MARGIN_X;
      cells[r].forEach((lines, c) => {
        this.stroke(x, top - h, widths[c], h, 0.6);
        const right = fontOf(r) === 'regular' && !!parseNumericCell(b.rows[r][c]);
        lines.forEach((line, k) => {
          const lx = right ? x + widths[c] - pad - textWidth(line, 'regular', size) : x + pad;
          this.text(lx, baseline(top - pad - k * leading, size, leading), line, fontOf(r), size);
        });
        x += widths[c];
      });
      this.y -= h;
    };

    this.space(2);
    if (b.caption) {
      const lines = wrap(b.caption, 'bold', 10, CONTENT_W);
      this.ensure(lines.length * 14 + height(0) + (b.rows.length > 1 ? height(1) : 0));
      this.lines(lines, MARGIN_X, 'bold', 10, 14);
      this.y -= 3;
    }
    for (let r = 0; r < b.rows.length; r++) {
      if (this.y - height(r) < MARGIN_BOTTOM) {
        this.newPage();
        if (b.header && r > 0) drawRow(0);
      }
      drawRow(r);
    }
    this.space(BODY.size * 0.9);
  }

  block(b: Block, shift: number): void {
    switch (b.type) {
      case 'heading':
        return this.heading(b.text, b.level + shift);
      case 'paragraph':
        return this.paragraph(b.lines);
      case 'list':
        return this.list(b);
      case 'code':
        return this.code(b.text);
      case 'table':
        return this.table(b);
    }
  }

  /** Adds "Page n of N" to every page once layout is done. */
  footers(): void {
    const total = this.pages.length;
    this.pages.forEach((ops, i) => {
      const label = `Page ${i + 1} of ${total}`;
      const x = (PAGE_W - textWidth(label, 'regular', 8.5)) / 2;
      ops.push(`BT 0.45 g /F1 8.5 Tf ${num(x)} 30 Td ${pdfLiteral(encodeWinAnsi(label))} Tj ET`);
    });
  }
}

/** Natural column widths, squeezed to the text width when the table is too wide. */
function tableWidths(b: TableBlock): number[] {
  const { size, pad } = TABLE;
  const cols = b.rows[0].length;
  const natural = Array.from({ length: cols }, (_, c) => {
    let w = 12;
    b.rows.forEach((row, r) => {
      const font: PdfFont = b.header && r === 0 ? 'bold' : 'regular';
      for (const line of row[c].split('\n')) w = Math.max(w, textWidth(normalizeWinAnsi(line), font, size));
    });
    return w + 2 * pad + 1;
  });
  const total = natural.reduce((a, w) => a + w, 0);
  if (total <= CONTENT_W) return natural;
  // Columns narrower than an equal share keep their width; the others share
  // the rest in proportion to their natural width.
  const fair = CONTENT_W / cols;
  const fixed = natural.filter((w) => w <= fair).reduce((a, w) => a + w, 0);
  const flex = natural.filter((w) => w > fair).reduce((a, w) => a + w, 0);
  return natural.map((w) => (w <= fair ? w : ((CONTENT_W - fixed) * w) / flex));
}

/** Builds the PDF. Call `docFitsWinAnsi` first: unsupported characters would print as "?". */
export function docToPdf(doc: ExportDoc): Uint8Array {
  const layout = new Layout();
  const title = doc.title.trim() || 'Extracted text';
  const multi = doc.pages.length > 1;
  layout.title(title);
  doc.pages.forEach((page, i) => {
    if (multi) {
      if (i > 0) layout.newPage();
      layout.heading(pageTitle(page, i), 1);
    }
    for (const b of pageBlocks(page)) layout.block(b, multi ? 1 : 0);
  });
  layout.footers();

  const w = new PdfWriter();
  const catalog = w.ref();
  const pagesId = w.ref();
  const fonts = { F1: w.ref(), F2: w.ref(), F3: w.ref() };
  const info = w.ref();
  const pageRefs = layout.pages.map(() => ({ page: w.ref(), content: w.ref() }));

  w.obj(catalog, `<< /Type /Catalog /Pages ${pagesId} 0 R /ViewerPreferences << /DisplayDocTitle true >> >>`);
  w.obj(pagesId, `<< /Type /Pages /Kids [${pageRefs.map((p) => `${p.page} 0 R`).join(' ')}] /Count ${pageRefs.length} >>`);
  const baseFonts = { F1: 'Helvetica', F2: 'Helvetica-Bold', F3: 'Courier' };
  for (const key of ['F1', 'F2', 'F3'] as const) {
    w.obj(fonts[key], `<< /Type /Font /Subtype /Type1 /BaseFont /${baseFonts[key]} /Encoding /WinAnsiEncoding >>`);
  }
  w.obj(info, `<< /Title ${pdfTextString(title)} /Producer (Image to Text App) /Creator (Image to Text App) /CreationDate ${pdfDate(doc.createdAt)} >>`);
  const resources = `<< /Font << /F1 ${fonts.F1} 0 R /F2 ${fonts.F2} 0 R /F3 ${fonts.F3} 0 R >> /ProcSet [/PDF /Text] >>`;
  layout.pages.forEach((ops, i) => {
    const { page, content } = pageRefs[i];
    w.obj(page, `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources ${resources} /Contents ${content} 0 R >>`);
    w.stream(content, '', latin1(ops.join('\n')));
  });
  return w.finish(catalog, info);
}
