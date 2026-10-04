import type { BBox, ReadMode } from '../ocr/types';

/** Links a span of output text back to the image region it came from. */
export interface Segment {
  from: number;
  to: number;
  bbox: BBox;
  conf: number;
}

export interface TableCell {
  text: string;
  bbox: BBox | null;
  conf: number;
}

export interface TableData {
  rows: TableCell[][];
  /** First row looks like column headings. */
  header: boolean;
  /** Title text found above the table. */
  caption?: string;
}

export interface ReceiptField {
  key: string;
  label: string;
  value: string;
  bbox: BBox | null;
  conf: number;
}

export interface ReceiptItem {
  description: string;
  qty: string;
  unitPrice: string;
  amount: string;
  bbox: BBox | null;
  conf: number;
}

export interface ReceiptData {
  kind: 'receipt' | 'invoice';
  currency: string | null;
  fields: ReceiptField[];
  items: ReceiptItem[];
}

export interface Formatted {
  mode: ReadMode;
  text: string;
  segments: Segment[];
  table?: TableData;
  receipt?: ReceiptData;
  code?: { language: string | null };
  /** Honest caveats about this result, shown above the text. */
  notes: string[];
}

export interface FormatOptions {
  /** Join wrapped lines into paragraphs. */
  joinLines: boolean;
  /** Re-join words split with a hyphen at the end of a line. */
  dehyphenate: boolean;
}

export const DEFAULT_FORMAT_OPTIONS: Record<ReadMode, FormatOptions> = {
  plain: { joinLines: false, dehyphenate: true },
  document: { joinLines: true, dehyphenate: true },
  handwriting: { joinLines: true, dehyphenate: true },
  table: { joinLines: false, dehyphenate: false },
  receipt: { joinLines: false, dehyphenate: false },
  code: { joinLines: false, dehyphenate: false },
  math: { joinLines: false, dehyphenate: false },
};
