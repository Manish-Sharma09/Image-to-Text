// CSV export (RFC 4180): CRLF line endings, quoted fields where needed, and a
// UTF-8 byte order mark so Excel reads accented and non-Latin text correctly.

import { ITEM_HEADER, hasReceipt, pageTable, receiptItemRows } from './blocks';
import { pageLines } from './text';
import type { ExportDoc, ExportPage } from './types';

function field(s: string): string {
  const v = s.replace(/\r\n?/g, '\n');
  return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

export function rowsToCsv(rows: string[][]): string {
  return rows.map((r) => r.map(field).join(',') + '\r\n').join('');
}

/** The rows a page contributes, or null when it has no table or receipt. */
function structuredRows(page: ExportPage): string[][] | null {
  if (page.mode === 'table') return pageTable(page)?.rows ?? null;
  if (page.mode !== 'receipt' || !hasReceipt(page)) return null;
  const r = page.receipt;
  const rows: string[][] = [];
  if (r.items.length) rows.push(ITEM_HEADER, ...receiptItemRows(r));
  if (r.items.length && r.fields.length) rows.push([]);
  if (r.fields.length) rows.push(['Field', 'Value'], ...r.fields.map((f) => [f.label, f.value]));
  return rows;
}

/** One blank row between pages. */
function joinSections(sections: string[][][]): string[][] {
  return sections.flatMap((rows, i) => (i ? [[], ...rows] : rows));
}

export function docToCsvRows(doc: ExportDoc): string[][] {
  const tables = doc.pages.map(structuredRows).filter((r): r is string[][] => !!r);
  if (tables.length) return joinSections(tables);
  // No tables: one line of text per row.
  return joinSections(doc.pages.map((p) => pageLines(p).map((l) => [l])));
}

export function docToCsv(doc: ExportDoc): string {
  return '﻿' + rowsToCsv(docToCsvRows(doc));
}
