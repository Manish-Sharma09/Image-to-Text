// WinAnsiEncoding (Windows-1252) for the PDF standard fonts, plus Helvetica
// advance widths from Adobe's Core 14 AFM files (Helvetica.afm and
// Helvetica-Bold.afm, © Adobe, freely redistributable metrics).

// Unicode → byte for the 0x80–0x9F range, where WinAnsi differs from Latin-1.
const HIGH: Record<number, number> = {
  0x20ac: 0x80, 0x201a: 0x82, 0x0192: 0x83, 0x201e: 0x84, 0x2026: 0x85, 0x2020: 0x86, 0x2021: 0x87,
  0x02c6: 0x88, 0x2030: 0x89, 0x0160: 0x8a, 0x2039: 0x8b, 0x0152: 0x8c, 0x017d: 0x8e, 0x2018: 0x91,
  0x2019: 0x92, 0x201c: 0x93, 0x201d: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97, 0x02dc: 0x98,
  0x2122: 0x99, 0x0161: 0x9a, 0x203a: 0x9b, 0x0153: 0x9c, 0x017e: 0x9e, 0x0178: 0x9f,
};

// Characters with a look-alike in WinAnsi, swapped before encoding.
const LOOKALIKE: Record<string, string> = {
  '‐': '-', '‑': '-', '‒': '-', '⁃': '-', '−': '-',
  ' ': ' ', ' ': ' ', ' ': ' ', ' ': ' ', ' ': ' ', ' ': ' ', ' ': ' ',
  ' ': ' ', ' ': ' ', ' ': ' ', ' ': ' ', '　': ' ',
  '​': '', '‌': '', '‍': '', '⁠': '', '﻿': '',
  'ﬀ': 'ff', 'ﬁ': 'fi', 'ﬂ': 'fl', 'ﬃ': 'ffi', 'ﬄ': 'ffl',
  '′': "'", '″': '"', '⁄': '/', '∕': '/', '∙': '·', 'μ': 'µ',
};

/** Byte for a code point, or null when WinAnsi has no such character. */
export function winAnsiCode(cp: number): number | null {
  if ((cp >= 0x20 && cp <= 0x7e) || (cp >= 0xa0 && cp <= 0xff)) return cp;
  return HIGH[cp] ?? null;
}

/** NFC plus look-alike substitution; control characters other than tab and newline are dropped. */
export function normalizeWinAnsi(s: string): string {
  return s
    .normalize('NFC')
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g, '')
    .replace(/[‐-‒⁃− -‍  ⁠　﻿ﬀ-ﬄ′″⁄∕∙μ]/g, (c) => LOOKALIKE[c] ?? c);
}

/** True when every character (after normalisation) can be drawn with WinAnsi fonts. */
export function fitsWinAnsi(s: string): boolean {
  for (const ch of normalizeWinAnsi(s)) {
    if (ch === '\n' || ch === '\t') continue;
    if (winAnsiCode(ch.codePointAt(0)!) === null) return false;
  }
  return true;
}

/** Encodes normalised text; characters outside WinAnsi become '?'. */
export function encodeWinAnsi(s: string): number[] {
  const out: number[] = [];
  for (const ch of s) out.push(winAnsiCode(ch.codePointAt(0)!) ?? 0x3f);
  return out;
}

// Advance widths (1/1000 em) for codes 32–255; 0 marks codes WinAnsi leaves undefined.
// prettier-ignore
const HELVETICA = [
  278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,
  1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,
  333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584,0,
  556,0,222,556,333,1000,556,556,333,1000,667,333,1000,0,611,0,0,222,222,333,333,350,556,1000,333,1000,500,333,944,0,500,667,
  278,333,556,556,556,556,260,556,333,737,370,556,584,333,737,333,400,584,333,333,333,556,537,278,333,333,365,556,834,834,834,611,
  667,667,667,667,667,667,1000,722,667,667,667,667,278,278,278,278,722,722,778,778,778,778,778,584,778,722,722,722,722,667,667,611,
  556,556,556,556,556,556,889,500,556,556,556,556,278,278,278,278,556,556,556,556,556,556,556,584,611,556,556,556,556,500,556,500,
];

// prettier-ignore
const HELVETICA_BOLD = [
  278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,
  975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,
  333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584,0,
  556,0,278,556,500,1000,556,556,333,1000,667,333,1000,0,611,0,0,278,278,500,500,350,556,1000,333,1000,556,333,944,0,500,667,
  278,333,556,556,556,556,280,556,333,737,370,556,584,333,737,333,400,584,333,333,333,611,556,278,333,333,365,556,834,834,834,611,
  722,722,722,722,722,722,1000,722,667,667,667,667,278,278,278,278,722,722,778,778,778,778,778,584,778,722,722,722,722,667,667,611,
  556,556,556,556,556,556,889,556,556,556,556,556,278,278,278,278,611,611,611,611,611,611,611,584,611,611,611,611,611,556,611,556,
];

export type PdfFont = 'regular' | 'bold' | 'mono';

/** Width in points of WinAnsi codes set in the given font and size. */
export function codesWidth(codes: number[], font: PdfFont, size: number): number {
  if (font === 'mono') return codes.length * 0.6 * size;
  const table = font === 'bold' ? HELVETICA_BOLD : HELVETICA;
  let w = 0;
  for (const c of codes) w += c >= 32 ? table[c - 32] || 500 : 0;
  return (w * size) / 1000;
}

export function textWidth(s: string, font: PdfFont, size: number): number {
  return codesWidth(encodeWinAnsi(s), font, size);
}
