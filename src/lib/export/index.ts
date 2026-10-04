// Export layer: turns the edited document into files, clipboard text and HTML.

import { docToCsv } from './csv';
import { docToDocx } from './docx';
import { safeFilename } from './filename';
import { isSearchable } from './formats';
import { docToHtml } from './html';
import { pageImageJpeg } from './jpeg';
import { docToJson } from './json';
import { docToMarkdown } from './markdown';
import { docFitsWinAnsi, docToPdf } from './pdf';
import { buildSearchablePdf } from './searchable-pdf';
import { docToText } from './text';
import type { ExportDoc, ExportFormat, ExportResult } from './types';
import { docToXlsx } from './xlsx';
import { docToZip, type ZipInner } from './zip';

export type { ExportDoc, ExportFormat, ExportPage, ExportResult } from './types';
export { formatsFor, type FormatEntry } from './formats';
export { pageToHtml } from './html';
export { pageToPlainText } from './text';
export { parseLightMarkdown, type Block } from './blocks';
export { buildSearchablePdf, type SearchablePage } from './searchable-pdf';
export { safeFilename };

const MIME = {
  txt: 'text/plain;charset=utf-8',
  md: 'text/markdown;charset=utf-8',
  html: 'text/html;charset=utf-8',
  json: 'application/json',
  csv: 'text/csv;charset=utf-8',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  pdf: 'application/pdf',
  zip: 'application/zip',
};

type Ext = keyof typeof MIME;

export async function exportDoc(doc: ExportDoc, format: ExportFormat, opts: { zipInner?: ZipInner } = {}): Promise<ExportResult> {
  const base = safeFilename(doc.title || 'extracted-text');
  const file = (data: string | Uint8Array<ArrayBuffer>, ext: Ext): ExportResult => ({
    kind: 'file',
    blob: new Blob([data], { type: MIME[ext] }),
    filename: `${base}.${ext}`,
  });

  switch (format) {
    case 'txt':
      return file(docToText(doc), 'txt');
    case 'md':
      return file(docToMarkdown(doc), 'md');
    case 'html':
      return file(docToHtml(doc), 'html');
    case 'json':
      return file(docToJson(doc), 'json');
    case 'csv':
      return file(docToCsv(doc), 'csv');
    case 'docx':
      return file(owned(docToDocx(doc)), 'docx');
    case 'xlsx':
      return file(owned(docToXlsx(doc)), 'xlsx');
    case 'pdf':
      // The built-in PDF fonts only cover Western European text; anything else
      // goes through the browser's print dialog, which has every system font.
      if (!docFitsWinAnsi(doc)) return { kind: 'print', html: docToHtml(doc), filename: `${base}.pdf` };
      return file(owned(docToPdf(doc)), 'pdf');
    case 'searchable-pdf': {
      const pages = doc.pages.filter(isSearchable);
      if (!pages.length) return exportDoc(doc, 'pdf');
      const input = await Promise.all(
        pages.map(async (p) => ({ jpeg: await pageImageJpeg(p.image), width: p.image.width, height: p.image.height, words: p.words })),
      );
      return file(owned(buildSearchablePdf(input, doc)), 'pdf');
    }
    case 'zip':
      return file(owned(await docToZip(doc, opts.zipInner ?? 'txt', exportDoc)), 'zip');
  }
}

/** Narrows fflate's and our byte arrays to ArrayBuffer-backed ones, which Blob requires. */
function owned(bytes: Uint8Array): Uint8Array<ArrayBuffer> {
  return bytes.buffer instanceof ArrayBuffer ? (bytes as Uint8Array<ArrayBuffer>) : new Uint8Array(bytes);
}
