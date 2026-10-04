// The export menu: which formats make sense for a document, in order.

import { hasReceipt, pageTable } from './blocks';
import { docFitsWinAnsi } from './pdf';
import type { ExportDoc, ExportFormat, ExportPage } from './types';

export interface FormatEntry {
  id: ExportFormat;
  label: string;
  hint: string;
  available: boolean;
  /** PDF that opens the print dialog instead of downloading (non-Latin scripts). */
  print?: boolean;
}

export function isStructured(page: ExportPage): boolean {
  return (page.mode === 'table' && !!pageTable(page)) || (page.mode === 'receipt' && hasReceipt(page));
}

export function isSearchable(page: ExportPage): page is ExportPage & Required<Pick<ExportPage, 'image' | 'words'>> {
  return !!page.image && !!page.words?.length && page.image.width > 0 && page.image.height > 0;
}

export function formatsFor(doc: ExportDoc): FormatEntry[] {
  const hasPages = doc.pages.length > 0;
  const structured = doc.pages.filter(isStructured).length;
  const searchable = doc.pages.some(isSearchable);
  const latin = docFitsWinAnsi(doc);
  const entries: FormatEntry[] = [
    { id: 'txt', label: 'Text (.txt)', hint: 'Plain text that opens anywhere', available: hasPages },
    { id: 'docx', label: 'Word (.docx)', hint: 'Editable, with headings, lists and tables', available: hasPages },
    {
      id: 'pdf',
      label: 'PDF',
      hint: latin ? 'Formatted and ready to share or print' : 'Opens the print dialog — choose “Save as PDF”',
      available: hasPages,
      print: !latin,
    },
    { id: 'searchable-pdf', label: 'Searchable PDF', hint: 'The original image with selectable, searchable text', available: searchable },
    { id: 'xlsx', label: 'Excel (.xlsx)', hint: 'One sheet per table, numbers kept as numbers', available: structured > 0 },
    { id: 'csv', label: 'CSV', hint: 'Rows and columns for any spreadsheet app', available: structured > 0 },
    { id: 'md', label: 'Markdown (.md)', hint: 'For notes apps, wikis and GitHub', available: hasPages },
    { id: 'html', label: 'Web page (.html)', hint: 'A standalone page that keeps the formatting', available: hasPages },
    { id: 'json', label: 'JSON', hint: 'Text and structure for developers', available: hasPages },
    { id: 'zip', label: 'ZIP of pages', hint: 'One file per page, plus all pages combined', available: doc.pages.length > 1 },
  ];
  // When every page is a table or receipt, spreadsheets are the likely pick.
  if (hasPages && structured === doc.pages.length) {
    const first = entries.filter((e) => e.id === 'xlsx' || e.id === 'csv');
    return [...first, ...entries.filter((e) => !first.includes(e))];
  }
  return entries;
}
