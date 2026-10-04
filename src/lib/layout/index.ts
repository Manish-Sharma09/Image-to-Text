import type { OcrPage, ReadMode } from '../ocr/types';
import type { FormatOptions, Formatted, TableData } from './types';
import { DEFAULT_FORMAT_OPTIONS } from './types';
import { formatDocument, formatPlain } from './prose';
import { formatTable, tableToTsv } from './table';
import { formatReceipt } from './receipt';
import { formatCode, guessLanguage } from './code';
import { formatMath } from './math';

export * from './types';
export { detect, type Detection, type Source } from './classify';

export const MODES: { id: ReadMode; label: string; hint: string }[] = [
  { id: 'plain', label: 'Plain text', hint: 'Every line as it appears' },
  { id: 'document', label: 'Document', hint: 'Paragraphs, headings and lists' },
  { id: 'table', label: 'Table', hint: 'Rows and columns you can edit' },
  { id: 'receipt', label: 'Receipt or invoice', hint: 'Totals, dates and line items' },
  { id: 'code', label: 'Code', hint: 'Keeps indentation and symbols' },
  { id: 'handwriting', label: 'Handwriting', hint: 'Tuned for handwritten notes' },
  { id: 'math', label: 'Math', hint: 'Equations as LaTeX' },
];

export function modeLabel(mode: ReadMode): string {
  return MODES.find((m) => m.id === mode)?.label ?? mode;
}

/** Formats results from providers that return text without word positions. */
function formatWithoutGeometry(page: OcrPage, mode: ReadMode): Formatted {
  const s = page.structure ?? {};
  if (mode === 'table' && s.table?.length) {
    const table: TableData = {
      rows: s.table.map((r) => r.map((text) => ({ text, bbox: null, conf: 100 }))),
      header: true,
    };
    return { mode, text: tableToTsv(table), segments: [], table, notes: [] };
  }
  if (mode === 'receipt' && s.fields) {
    const fields = Object.entries(s.fields).map(([key, value]) => ({
      key,
      label: key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase()),
      value,
      bbox: null,
      conf: 100,
    }));
    return {
      mode,
      text: page.text,
      segments: [],
      receipt: { kind: /invoice/i.test(page.text) ? 'invoice' : 'receipt', currency: null, fields, items: [] },
      notes: [],
    };
  }
  const text = (mode === 'document' || mode === 'handwriting') && s.markdown ? s.markdown : page.text;
  const out: Formatted = { mode, text, segments: [], notes: [] };
  if (mode === 'code') out.code = { language: guessLanguage(text)?.label ?? null };
  return out;
}

export function format(page: OcrPage, mode: ReadMode, options?: Partial<FormatOptions>): Formatted {
  if (!page.hasGeometry) return formatWithoutGeometry(page, mode);
  const opts = { ...DEFAULT_FORMAT_OPTIONS[mode], ...options };
  switch (mode) {
    case 'plain':
      return formatPlain(page, opts);
    case 'document':
      return formatDocument(page, opts);
    case 'handwriting':
      return formatDocument(page, opts, 'handwriting');
    case 'table':
      return formatTable(page);
    case 'receipt':
      return formatReceipt(page);
    case 'code':
      return formatCode(page);
    case 'math':
      return formatMath(page);
  }
}
