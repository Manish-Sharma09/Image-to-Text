// JSON export: the document's text and structure, never image data.

import type { ReadMode } from '../ocr/types';
import { hasReceipt, pageTable } from './blocks';
import type { ExportDoc, ExportPage } from './types';

interface JsonPage {
  title: string;
  mode: ReadMode;
  text: string;
  table?: string[][];
  tableHeader?: boolean;
  tableCaption?: string;
  receipt?: {
    kind: 'receipt' | 'invoice';
    currency: string | null;
    fields: { key: string; label: string; value: string }[];
    items: { description: string; qty: string; unitPrice: string; amount: string }[];
  };
  codeLanguage?: string;
  languages?: string[];
}

function jsonPage(page: ExportPage): JsonPage {
  const out: JsonPage = { title: page.title, mode: page.mode, text: page.text };
  if (page.mode === 'table') {
    const t = pageTable(page);
    if (t) {
      out.table = t.rows;
      out.tableHeader = t.header;
      if (t.caption) out.tableCaption = t.caption;
    }
  }
  if (hasReceipt(page)) {
    const r = page.receipt;
    out.receipt = {
      kind: r.kind,
      currency: r.currency,
      fields: r.fields.map(({ key, label, value }) => ({ key, label, value })),
      items: r.items.map(({ description, qty, unitPrice, amount }) => ({ description, qty, unitPrice, amount })),
    };
  }
  if (page.mode === 'code' && page.codeLanguage) out.codeLanguage = page.codeLanguage;
  if (page.languages?.length) out.languages = [...page.languages];
  return out;
}

export function docToJson(doc: ExportDoc): string {
  const createdAt = Number.isFinite(doc.createdAt.getTime()) ? doc.createdAt.toISOString() : new Date().toISOString();
  return JSON.stringify({ title: doc.title, createdAt, pages: doc.pages.map(jsonPage) }, null, 2) + '\n';
}
