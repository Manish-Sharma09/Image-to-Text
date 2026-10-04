// Markdown export. Document text already is light Markdown; other modes are
// converted to their natural Markdown form.

import { tableToMarkdown } from '../layout/table';
import type { ReceiptData, TableCell, TableData } from '../layout/types';
import { ITEM_HEADER, hasReceipt, pageTable, pageTitle, receiptItemRows } from './blocks';
import type { ExportDoc, ExportPage } from './types';

const LANGUAGE_IDS: Record<string, string> = {
  'c/c++': 'cpp',
  'c++': 'cpp',
  'c#': 'csharp',
  'f#': 'fsharp',
  'objective-c': 'objectivec',
};

/** Fence language tag from a label like "Python" or "C/C++". */
export function codeLanguageId(label: string | null | undefined): string {
  const l = (label ?? '').trim().toLowerCase();
  if (!l) return '';
  return LANGUAGE_IDS[l] ?? l.replace(/\s+/g, '-').replace(/[^a-z0-9_+.-]/g, '');
}

/** A fence longer than any backtick run inside the code, so the code can't close it. */
function fenced(code: string, lang: string): string {
  const longest = Math.max(0, ...(code.match(/`+/g) ?? []).map((m) => m.length));
  const fence = '`'.repeat(Math.max(3, longest + 1));
  return `${fence}${lang}\n${code.replace(/\n+$/, '')}\n${fence}`;
}

function cells(row: string[]): TableCell[] {
  return row.map((text) => ({ text, bbox: null, conf: 100 }));
}

function tableMarkdown(rows: string[][], header: boolean): string {
  const t: TableData = { rows: rows.map(cells), header };
  return tableToMarkdown(t);
}

function receiptMarkdown(r: ReceiptData): string {
  const parts: string[] = [];
  if (r.fields.length) {
    parts.push(r.fields.map((f) => `- **${f.label}:** ${f.value.replace(/\n/g, ' ')}`).join('\n'));
  }
  if (r.items.length) parts.push(tableMarkdown([ITEM_HEADER, ...receiptItemRows(r)], true));
  return parts.join('\n\n');
}

export function pageToMarkdown(page: ExportPage): string {
  switch (page.mode) {
    case 'table': {
      const t = pageTable(page);
      if (!t) return page.text;
      const md = tableMarkdown(t.rows, t.header);
      return t.caption ? `${t.caption}\n\n${md}` : md;
    }
    case 'code':
      return page.text.trim() ? fenced(page.text.replace(/\r\n?/g, '\n'), codeLanguageId(page.codeLanguage)) : '';
    case 'math':
      return page.text.trim() ? `$$\n${page.text.trim()}\n$$` : '';
    case 'receipt':
      return hasReceipt(page) ? receiptMarkdown(page.receipt) : page.text;
    default:
      return page.text;
  }
}

export function docToMarkdown(doc: ExportDoc): string {
  if (doc.pages.length === 1) return pageToMarkdown(doc.pages[0]).replace(/\s+$/, '') + '\n';
  const parts = doc.pages.map((page, i) => `## ${pageTitle(page, i)}\n\n${pageToMarkdown(page).replace(/\s+$/, '')}`);
  const title = doc.title.trim();
  return (title ? [`# ${title}`, ...parts] : parts).join('\n\n') + '\n';
}
