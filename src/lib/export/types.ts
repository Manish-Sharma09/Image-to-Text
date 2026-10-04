import type { BBox, ReadMode } from '../ocr/types';
import type { ReceiptData, TableData } from '../layout/types';

/** One page of a document, in the final (user-edited) state. */
export interface ExportPage {
  /** File name or user-given page name, without extension. */
  title: string;
  mode: ReadMode;
  /**
   * The page's text. In `document` and `handwriting` modes it uses light
   * Markdown: `#`/`##`/`###` headings, `- ` bullets, `1. ` numbered items.
   * In `code` mode it is verbatim source code.
   */
  text: string;
  /** Present in `table` mode (edited cells). */
  table?: TableData;
  /** Present in `receipt` mode (edited fields and items). */
  receipt?: ReceiptData;
  /** Programming language label in `code` mode, e.g. "Python". */
  codeLanguage?: string | null;
  /** The page image as shown to the user (for searchable PDF). */
  image?: { blob: Blob; width: number; height: number };
  /** Word boxes in `image` pixel coordinates (for searchable PDF). */
  words?: { text: string; bbox: BBox }[];
  languages?: string[];
}

export interface ExportDoc {
  title: string;
  pages: ExportPage[];
  createdAt: Date;
}

export type ExportFormat =
  | 'txt'
  | 'md'
  | 'docx'
  | 'pdf'
  | 'searchable-pdf'
  | 'html'
  | 'json'
  | 'csv'
  | 'xlsx'
  | 'zip';

export type ExportResult =
  | { kind: 'file'; blob: Blob; filename: string }
  /** The browser's print dialog is needed (e.g. PDF with scripts the built-in fonts can't draw). */
  | { kind: 'print'; html: string; filename: string };
