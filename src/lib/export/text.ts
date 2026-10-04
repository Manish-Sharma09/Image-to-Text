// Plain text: what "Copy" puts on the clipboard and what the .txt export holds.

import { stripMarkdown } from '../layout/prose';
import { receiptToText } from '../layout/receipt';
import { tableToTsv } from '../layout/table';
import { hasReceipt } from './blocks';
import type { ExportDoc, ExportPage } from './types';

/** Table pages copy as TSV so they paste into spreadsheets as cells. */
export function pageToPlainText(page: ExportPage): string {
  switch (page.mode) {
    case 'document':
    case 'handwriting':
      return stripMarkdown(page.text);
    case 'table':
      return page.table?.rows.length ? tableToTsv(page.table) : page.text;
    case 'receipt':
      return hasReceipt(page) ? receiptToText(page.receipt) : page.text;
    default:
      return page.text;
  }
}

/** The page as it reads in a .txt file: like the clipboard, plus the table caption. */
function pageToTextFile(page: ExportPage): string {
  const text = pageToPlainText(page).replace(/\s+$/, '');
  const caption = page.mode === 'table' ? page.table?.caption?.trim() : undefined;
  return caption ? `${caption}\n\n${text}` : text;
}

export function docToText(doc: ExportDoc): string {
  if (doc.pages.length === 1) return pageToTextFile(doc.pages[0]) + '\n';
  return (
    doc.pages
      .map((page, i) => {
        const title = page.title.trim();
        const divider = `----- Page ${i + 1}${title ? `: ${title}` : ''} -----`;
        return `${divider}\n\n${pageToTextFile(page)}`;
      })
      .join('\n\n') + '\n'
  );
}

/** Every page's text lines, for spreadsheet exports of pages without tables. */
export function pageLines(page: ExportPage): string[] {
  return pageToPlainText(page).replace(/\r\n?/g, '\n').split('\n').map((l) => l.replace(/\s+$/, ''));
}
