// One block model for every rich exporter (HTML, Word, PDF): each page is
// turned into headings, paragraphs, lists, code and tables once, and each
// exporter only decides how to draw them.

import type { ReceiptData, TableData } from '../layout/types';
import type { ExportPage } from './types';

export type ListStyle = 'bullet' | 'decimal' | 'lower-alpha' | 'upper-alpha';

export interface ListBlock {
  type: 'list';
  style: ListStyle;
  /** Text after the number or letter: "1." vs "1)". */
  delimiter: '.' | ')';
  /** Number of the first item (letters count from 1). */
  start: number;
  /** Each item's lines; lines after the first are line breaks inside the item. */
  items: string[][];
}

export interface TableBlock {
  type: 'table';
  /** Rectangular: every row has the same number of cells. */
  rows: string[][];
  header: boolean;
  caption?: string;
}

export type Block =
  | { type: 'heading'; level: number; text: string }
  | { type: 'paragraph'; lines: string[] }
  | ListBlock
  | { type: 'code'; text: string; language: string | null }
  | TableBlock;

const HEADING = /^(#{1,6})\s+(.+)$/;
const BULLET = /^\s{0,3}[-*•]\s+(.*)$/;
const NUMBERED = /^\s{0,3}\(?(\d{1,3}|[a-zA-Z])([.)])\s+(.*)$/;

function listItem(line: string): { style: ListStyle; delimiter: '.' | ')'; start: number; text: string } | null {
  const b = BULLET.exec(line);
  if (b) return { style: 'bullet', delimiter: '.', start: 1, text: b[1].trim() };
  const n = NUMBERED.exec(line);
  if (!n) return null;
  const label = n[1];
  const delimiter = n[2] === ')' ? ')' : '.';
  if (/\d/.test(label)) return { style: 'decimal', delimiter, start: Number(label), text: n[3].trim() };
  const lower = label.toLowerCase();
  return {
    style: label === lower ? 'lower-alpha' : 'upper-alpha',
    delimiter,
    start: lower.charCodeAt(0) - 96,
    text: n[3].trim(),
  };
}

/**
 * Parses the light Markdown used by document and handwriting modes:
 * `#`–`###` headings, `- ` bullets, `1. ` / `a) ` numbered items, blank lines
 * between paragraphs, and single newlines as line breaks. A line right after a
 * list item continues that item, as in Markdown.
 */
export function parseLightMarkdown(text: string): Block[] {
  const blocks: Block[] = [];
  let para: string[] | null = null;
  let list: ListBlock | null = null;
  const flush = () => {
    if (para) blocks.push({ type: 'paragraph', lines: para });
    para = null;
    list = null;
  };

  for (const raw of text.replace(/\r\n?/g, '\n').split('\n')) {
    const line = raw.replace(/\s+$/, '');
    if (!line.trim()) {
      flush();
      continue;
    }
    const heading = HEADING.exec(line);
    if (heading) {
      flush();
      blocks.push({ type: 'heading', level: Math.min(3, heading[1].length), text: heading[2].trim() });
      continue;
    }
    const item = listItem(line);
    if (item) {
      if (para) flush();
      if (list && list.style === item.style && list.delimiter === item.delimiter) {
        list.items.push([item.text]);
      } else {
        list = { type: 'list', style: item.style, delimiter: item.delimiter, start: item.start, items: [[item.text]] };
        blocks.push(list);
      }
      continue;
    }
    if (list) list.items[list.items.length - 1].push(line.trim());
    else (para ??= []).push(line.trimStart());
  }
  flush();
  return blocks;
}

/** Plain text: blank lines separate paragraphs, other newlines are line breaks. */
export function parsePlainText(text: string): Block[] {
  return text
    .replace(/\r\n?/g, '\n')
    .split(/\n[ \t]*\n/)
    .map((p) => p.split('\n').map((l) => l.replace(/\s+$/, '')))
    .filter((lines) => lines.some((l) => l.trim()))
    .map((lines) => ({ type: 'paragraph', lines }));
}

/** Pads every row to the widest row so exporters can index cells freely. */
export function rectangular(rows: string[][]): string[][] {
  const cols = Math.max(0, ...rows.map((r) => r.length));
  return rows.map((r) => Array.from({ length: cols }, (_, i) => r[i] ?? ''));
}

export function tableRows(t: TableData): string[][] {
  return rectangular(t.rows.map((r) => r.map((c) => c.text)));
}

/** The page's table: the edited one, or the TSV text when none was attached. */
export function pageTable(page: ExportPage): TableBlock | null {
  if (page.table?.rows.length) {
    return { type: 'table', rows: tableRows(page.table), header: page.table.header, caption: page.table.caption?.trim() || undefined };
  }
  if (!page.text.includes('\t')) return null;
  const rows = page.text.replace(/\r\n?/g, '\n').split('\n').filter((l) => l.trim()).map((l) => l.split('\t'));
  return rows.length ? { type: 'table', rows: rectangular(rows), header: false } : null;
}

export const ITEM_HEADER = ['Description', 'Qty', 'Unit price', 'Amount'];

/** Receipt line items as rows (without the header row). */
export function receiptItemRows(r: ReceiptData): string[][] {
  return r.items.map((it) => [it.description, it.qty, it.unitPrice, it.amount]);
}

/** True when the receipt has anything to show beyond the raw text. */
export function hasReceipt(page: ExportPage): page is ExportPage & { receipt: ReceiptData } {
  return !!page.receipt && (page.receipt.fields.length > 0 || page.receipt.items.length > 0);
}

function receiptBlocks(r: ReceiptData): Block[] {
  const blocks: Block[] = [];
  if (r.fields.length) {
    blocks.push({ type: 'table', rows: r.fields.map((f) => [f.label, f.value]), header: false });
  }
  if (r.items.length) {
    // Drop the quantity and unit price columns when no item has them.
    const rows = [ITEM_HEADER, ...receiptItemRows(r)];
    const keep = ITEM_HEADER.map((_, c) => c === 0 || c === 3 || rows.slice(1).some((row) => row[c].trim()));
    blocks.push({ type: 'table', rows: rows.map((row) => row.filter((_, c) => keep[c])), header: true, caption: 'Items' });
  }
  return blocks;
}

export function pageBlocks(page: ExportPage): Block[] {
  switch (page.mode) {
    case 'document':
    case 'handwriting':
      return parseLightMarkdown(page.text);
    case 'code':
      return page.text.trim() ? [{ type: 'code', text: page.text.replace(/\r\n?/g, '\n').replace(/\n+$/, ''), language: page.codeLanguage ?? null }] : [];
    case 'math':
      return page.text.trim() ? [{ type: 'code', text: page.text.trim(), language: 'latex' }] : [];
    case 'table': {
      const t = pageTable(page);
      return t ? [t] : parsePlainText(page.text);
    }
    case 'receipt':
      return hasReceipt(page) ? receiptBlocks(page.receipt) : parsePlainText(page.text);
    default:
      return parsePlainText(page.text);
  }
}

/** The label a list item shows, e.g. "3." or "c)". */
export function listMarker(list: ListBlock, index: number): string {
  if (list.style === 'bullet') return '•';
  const n = list.start + index;
  if (list.style === 'decimal') return `${n}${list.delimiter}`;
  const letter = alphaLabel(n);
  return `${list.style === 'upper-alpha' ? letter.toUpperCase() : letter}${list.delimiter}`;
}

/** 1 → a, 26 → z, 27 → aa (the scheme Word and browsers use). */
function alphaLabel(n: number): string {
  let s = '';
  for (let k = Math.max(1, n); k > 0; k = Math.floor((k - 1) / 26)) s = String.fromCharCode(97 + ((k - 1) % 26)) + s;
  return s;
}

/** Every piece of text a block list will draw, for character-set checks. */
export function* blockStrings(blocks: Block[]): Generator<string> {
  for (const b of blocks) {
    if (b.type === 'heading') yield b.text;
    else if (b.type === 'paragraph') yield* b.lines;
    else if (b.type === 'list') for (const item of b.items) yield* item;
    else if (b.type === 'code') yield b.text;
    else {
      if (b.caption) yield b.caption;
      for (const row of b.rows) yield* row;
    }
  }
}

/** Page title with a fallback for untitled pages. */
export function pageTitle(page: ExportPage, index: number): string {
  return page.title.trim() || `Page ${index + 1}`;
}
