// ZIP export: one file per page plus the whole document combined.

import { zipSync, type Zippable } from 'fflate';
import { safeFilename, uniqueFilename } from './filename';
import { pageTable, pageTitle } from './blocks';
import { zipDate } from './ooxml';
import type { ExportDoc, ExportFormat, ExportResult } from './types';

export type ZipInner = 'txt' | 'md' | 'docx';

type Exporter = (doc: ExportDoc, format: ExportFormat) => Promise<ExportResult>;

async function fileBytes(result: ExportResult): Promise<Uint8Array> {
  if (result.kind !== 'file') throw new Error('Expected a file export');
  return new Uint8Array(await result.blob.arrayBuffer());
}

/** `exporter` is passed in to avoid a circular import with index.ts. */
export async function docToZip(doc: ExportDoc, inner: ZipInner, exporter: Exporter): Promise<Uint8Array> {
  const mtime = zipDate(doc.createdAt);
  const used = new Set<string>();
  const files: Zippable = {};
  // Already-compressed formats are stored rather than deflated again.
  const add = (name: string, data: Uint8Array, ext: string) => {
    files[name] = [data, { mtime, level: ext === 'docx' ? 0 : 6 }];
  };

  const allName = uniqueFilename('all-pages', inner, used);
  for (const [i, page] of doc.pages.entries()) {
    // Tables read best as CSV next to plain-text pages.
    const format: ExportFormat = inner === 'txt' && page.mode === 'table' && pageTable(page) ? 'csv' : inner;
    const title = pageTitle(page, i);
    const single: ExportDoc = { title, pages: [page], createdAt: doc.createdAt };
    const name = uniqueFilename(safeFilename(title), format, used);
    add(name, await fileBytes(await exporter(single, format)), format);
  }
  add(allName, await fileBytes(await exporter(doc, inner)), inner);
  return zipSync(files);
}
