// Plain text and document formatting: paragraphs, wrapped-line joining,
// hyphenation repair, headings and lists.

import type { OcrLine, OcrPage, OcrParagraph, OcrWord, ReadMode } from '../ocr/types';
import { allLines } from '../ocr/types';
import type { FormatOptions, Formatted } from './types';
import { TextBuilder, cleanWord, h, median, w } from './geometry';

const SENTENCE_END = /[.!?:;"'”’)\]]$/;
const BULLET_CHARS = '•·▪◦●○■□►▸‣⁃∙*';
const BULLET_ONLY = new RegExp(`^[${BULLET_CHARS}\\-–—]$`);
const BULLET_PREFIX = new RegExp(`^[${BULLET_CHARS}](?=\\S)`);
const NUMBER_MARKER = /^\(?(\d{1,3}|[a-zA-Z]|[ivxIVX]{1,4})[.)]$/;
// Characters OCR commonly returns for a round bullet.
const MISREAD_BULLET = /^[eo©«°+»®]$/;

interface Marker {
  kind: 'bullet' | 'number';
  label: string;
  /** Words consumed by the marker. */
  skip: number;
  /** Remaining text of the first word when the bullet was glued to it. */
  rest?: string;
}

function markerOf(line: OcrLine, allowMisread: boolean): Marker | null {
  const first = line.words[0];
  if (!first || line.words.length < 2) {
    if (first && BULLET_PREFIX.test(first.text) && first.text.length > 1) {
      return { kind: 'bullet', label: '-', skip: 0, rest: first.text.slice(1) };
    }
    return null;
  }
  const t = first.text;
  if (BULLET_ONLY.test(t)) return { kind: 'bullet', label: '-', skip: 1 };
  if (BULLET_PREFIX.test(t)) return { kind: 'bullet', label: '-', skip: 0, rest: t.slice(1) };
  if (NUMBER_MARKER.test(t) && /\d|^[a-zA-Z][.)]$/.test(t)) return { kind: 'number', label: t, skip: 1 };
  if (allowMisread && MISREAD_BULLET.test(t) && w(first.bbox) < 0.8 * h(line.bbox)) {
    return { kind: 'bullet', label: '-', skip: 1 };
  }
  return null;
}

function lineWidth(l: OcrLine) {
  return l.bbox.x1 - l.bbox.x0;
}

/** True when a line runs to (nearly) the paragraph's right edge, i.e. it wrapped. */
function wrapped(line: OcrLine, para: OcrParagraph): boolean {
  const pw = para.bbox.x1 - para.bbox.x0;
  if (pw <= 0) return false;
  return line.bbox.x1 >= para.bbox.x1 - pw * 0.18 && lineWidth(line) > pw * 0.6;
}

function emitWords(b: TextBuilder, words: OcrWord[], firstOverride?: string) {
  words.forEach((word, i) => {
    if (i > 0) b.push(' ');
    b.word(word, cleanWord(i === 0 && firstOverride !== undefined ? firstOverride : word.text));
  });
}

/**
 * Emits a run of lines. Wrapped lines are joined with a space when `join` is
 * on; a trailing hyphen is removed when the next line continues the word.
 */
function emitLines(b: TextBuilder, lines: OcrLine[], para: OcrParagraph, opts: FormatOptions) {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const next = lines[i + 1];
    const words = line.words;
    const last = words[words.length - 1];
    const join = opts.joinLines && next && wrapped(line, para);
    const hyphenated =
      join && opts.dehyphenate && /[A-Za-zÀ-ɏ]-$/.test(last.text) && /^[a-zà-ɏ]/.test(next.words[0]?.text ?? '');
    words.forEach((word, j) => {
      if (j > 0) b.push(' ');
      const t = cleanWord(word.text);
      b.word(word, hyphenated && j === words.length - 1 ? t.slice(0, -1) : t);
    });
    if (!next) break;
    if (hyphenated) continue;
    b.push(join ? ' ' : '\n');
  }
}

export function formatPlain(page: OcrPage, opts: FormatOptions, mode: ReadMode = 'plain'): Formatted {
  const b = new TextBuilder();
  for (const block of page.blocks) {
    for (const para of block.paragraphs) {
      if (b.text) b.push('\n\n');
      emitLines(b, para.lines, para, opts);
    }
  }
  b.trimEnd();
  return { mode, text: b.text, segments: b.segments, notes: [] };
}

interface Unit {
  kind: 'heading' | 'para' | 'item';
  lines: OcrLine[];
  para: OcrParagraph;
  ratio?: number;
  marker?: Marker;
}

const lineStr = (l: OcrLine) => l.words.map((x) => x.text).join(' ');

export function formatDocument(page: OcrPage, opts: FormatOptions, mode: ReadMode = 'document'): Formatted {
  const b = new TextBuilder();
  const lines = allLines(page);
  const H = median(lines.map((l) => h(l.bbox))) || 1;

  // Misread bullets ("e", "©") only count when several lines start that way.
  const misreadCount = lines.filter((l) => l.words.length > 1 && MISREAD_BULLET.test(l.words[0].text) && w(l.words[0].bbox) < 0.8 * h(l.bbox)).length;
  const allowMisread = misreadCount >= 2;

  const units: Unit[] = [];
  for (const block of page.blocks) {
    for (const para of block.paragraphs) {
      let ls = para.lines;
      const text = ls.map(lineStr).join(' ');
      const lh = median(ls.map((l) => h(l.bbox)));
      // Whole paragraph is a heading: short and larger than body text.
      if (ls.length <= 2 && lh / H >= 1.25 && text.length <= 100 && !/[.,;]$/.test(text)) {
        units.push({ kind: 'heading', lines: ls, para, ratio: lh / H });
        continue;
      }
      // A heading the engine glued onto the paragraph below it.
      if (ls.length >= 2) {
        const first = ls[0];
        const rest = median(ls.slice(1).map((l) => h(l.bbox)));
        const t = lineStr(first);
        if (h(first.bbox) >= 1.2 * rest && t.length <= 80 && !/[.,;]$/.test(t) && !wrapped(first, para)) {
          units.push({ kind: 'heading', lines: [first], para, ratio: h(first.bbox) / H });
          ls = ls.slice(1);
        }
      }
      const markers = ls.map((l) => markerOf(l, allowMisread));
      if (markers.some(Boolean)) {
        ls.forEach((line, i) => {
          const m = markers[i];
          const cur = units[units.length - 1];
          if (m || !cur || cur.kind !== 'item' || cur.para !== para) units.push({ kind: m ? 'item' : 'para', lines: [line], para, marker: m ?? undefined });
          else cur.lines.push(line);
        });
        continue;
      }
      units.push({ kind: 'para', lines: ls, para });
    }
  }

  // Bullets the engine dropped: a run of short, indented paragraphs. The body
  // margin is where multi-line paragraphs start.
  const bodyStarts = units.filter((u) => u.kind === 'para' && u.lines.length >= 2).map((u) => u.lines[0].bbox.x0);
  const margin = bodyStarts.length ? Math.min(...bodyStarts) : Math.min(...units.map((u) => u.lines[0].bbox.x0));

  // One indented paragraph of short lines is a list the engine grouped
  // together; split it into one item per line (dropping a misread bullet).
  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    if (u.kind !== 'para' || u.lines.length < 2) continue;
    // Where the words start, ignoring a misread bullet glyph.
    const textStart = (l: OcrLine) => (l.words.length > 1 && MISREAD_BULLET.test(l.words[0].text) ? l.words[1].bbox.x0 : l.bbox.x0);
    const indented = u.lines.every((l) => textStart(l) >= margin + H * 0.8);
    const short = u.lines.every((l) => !wrapped(l, u.para) || SENTENCE_END.test(l.words[l.words.length - 1].text));
    const starts = u.lines.every((l) => /^[\p{Lu}\p{N}]/u.test(l.words[0].text) || MISREAD_BULLET.test(l.words[0].text));
    if (!indented || !short || !starts) continue;
    const items: Unit[] = u.lines.map((l) => ({
      kind: 'item',
      lines: [l],
      para: u.para,
      marker: l.words.length > 1 && MISREAD_BULLET.test(l.words[0].text) ? { kind: 'bullet', label: '-', skip: 1 } : undefined,
    }));
    units.splice(i, 1, ...items);
    i += items.length - 1;
  }
  for (let i = 0; i < units.length; ) {
    let j = i;
    while (
      j < units.length &&
      units[j].kind === 'para' &&
      units[j].lines.length <= 2 &&
      units[j].lines[0].bbox.x0 >= margin + H &&
      /^[\p{Lu}\p{N}]/u.test(units[j].lines[0].words[0].text)
    ) j++;
    if (j - i >= 2) {
      for (let k = i; k < j; k++) units[k].kind = 'item';
      i = j;
    } else {
      i = Math.max(i + 1, j);
    }
  }

  // Heading levels by size rank: the largest style is level 1.
  const sizes: number[] = [];
  for (const u of units) {
    if (u.kind !== 'heading') continue;
    if (!sizes.some((s) => Math.abs(s - u.ratio!) / s < 0.12)) sizes.push(u.ratio!);
  }
  sizes.sort((a, c) => c - a);
  const level = (r: number) => Math.min(3, sizes.findIndex((s) => Math.abs(s - r) / s < 0.12) + 1 || 3);

  units.forEach((u, i) => {
    const prev = units[i - 1];
    if (prev) b.push(u.kind === 'item' && prev.kind === 'item' ? '\n' : '\n\n');
    if (u.kind === 'heading') {
      b.push('#'.repeat(level(u.ratio!)) + ' ');
      emitLines(b, u.lines, u.para, { ...opts, joinLines: true });
    } else if (u.kind === 'item') {
      const m = u.marker;
      b.push(m?.kind === 'number' ? `${m.label} ` : '- ');
      const [first, ...rest] = u.lines;
      emitWords(b, first.words.slice(m?.skip ?? 0), m?.rest);
      for (const l of rest) {
        b.push(' ');
        emitWords(b, l.words);
      }
    } else {
      // A paragraph of short lines (addresses, poems, chat) keeps its breaks.
      const shortLines = u.lines.length > 1 && u.lines.every((l) => !wrapped(l, u.para) || SENTENCE_END.test(l.words[l.words.length - 1].text));
      emitLines(b, u.lines, u.para, shortLines ? { ...opts, joinLines: false } : opts);
    }
  });
  b.trimEnd();
  return { mode, text: b.text, segments: b.segments, notes: [] };
}

/** Strips the light Markdown used by document mode, for plain-text copies. */
export function stripMarkdown(md: string): string {
  return md
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^- /gm, '• ');
}
