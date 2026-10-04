// Export harness: builds sample documents, checks a few behaviours with
// assertions, and writes every export format to node_modules/.cache/export-out/
// for tests/export/validate.py to inspect.
//
// node_modules/.bin/esbuild tests/export/run.ts --bundle --platform=node --format=esm \
//   --outfile=node_modules/.cache/export-run.mjs && node node_modules/.cache/export-run.mjs

import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { format } from '../../src/lib/layout/index';
import type { ReceiptData, TableData } from '../../src/lib/layout/types';
import { allWords, type OcrPage } from '../../src/lib/ocr/types';
import {
  buildSearchablePdf,
  exportDoc,
  formatsFor,
  pageToHtml,
  pageToPlainText,
  parseLightMarkdown,
  safeFilename,
  type ExportDoc,
  type ExportFormat,
  type ExportPage,
} from '../../src/lib/export/index';
import { parseNumericCell } from '../../src/lib/export/numbers';

const OUT = 'node_modules/.cache/export-out';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const created = new Date('2026-10-03T09:30:00Z');
const cell = (text: string) => ({ text, bbox: null, conf: 95 });
const table = (rows: string[][], header: boolean, caption?: string): TableData => ({ rows: rows.map((r) => r.map(cell)), header, caption });

// ---------------------------------------------------------------- samples

const documentPage: ExportPage = {
  title: 'Meeting notes',
  mode: 'document',
  text: [
    '# Project kickoff & next steps',
    '',
    'This paragraph is long enough to wrap across several lines in every format, so we can check that word wrapping, justification and escaping of <angle brackets>, "quotes", \'apostrophes\' and ampersands (R&D) all behave. Café — naïve — “smart quotes” — €42.',
    'A single newline here is a line break,',
    'and this is the line after it.',
    '',
    '## Decisions',
    '',
    '- Ship the beta on 14 October',
    '- Keep the export bundle small',
    'continued on a second line',
    '- Use (parentheses) and back\\slashes safely',
    '',
    '### Action items',
    '',
    '1. Write the export layer',
    '2. Validate every format',
    '3. Celebrate',
    '',
    'a) First lettered point',
    'b) Second lettered point',
    '',
    'Closing remarks with a tab\there.',
  ].join('\n'),
  languages: ['eng'],
};

const tablePage: ExportPage = {
  title: 'Quarterly revenue',
  mode: 'table',
  text: '',
  table: table(
    [
      ['Region', 'Revenue', 'Orders', 'Growth', 'Notes'],
      ['North', '$96,300', '1,284', '12.4%', 'Smith, J. said "fine"'],
      ['South', '€1,050.00', '967', '-3%', 'EU format 1.234,56 stays text'],
      ['East', '£7,000', '1,502', '0.5%', 'ID 007 keeps its zeros'],
      ['West', '¥1,234,567', '(1,118)', '8%', 'Multi-line\ncell text'],
    ],
    true,
    'Regional orders, Q1 2026',
  ),
  languages: ['eng'],
};

const receipt: ReceiptData = {
  kind: 'receipt',
  currency: 'USD',
  fields: [
    { key: 'merchant', label: 'Business', value: 'Harbor Light Café', bbox: null, conf: 90 },
    { key: 'date', label: 'Date', value: '03/14/2026', bbox: null, conf: 90 },
    { key: 'subtotal', label: 'Subtotal', value: '$37.75', bbox: null, conf: 90 },
    { key: 'tax', label: 'Tax', value: '$2.64', bbox: null, conf: 90 },
    { key: 'total', label: 'Total', value: '$40.39', bbox: null, conf: 90 },
  ],
  items: [
    { description: 'Oat Latte', qty: '2', unitPrice: '5.50', amount: '11.00', bbox: null, conf: 90 },
    { description: 'Blueberry Scone', qty: '1', unitPrice: '4.25', amount: '4.25', bbox: null, conf: 90 },
    { description: 'Avocado Toast, extra "chili"', qty: '1', unitPrice: '', amount: '9.50', bbox: null, conf: 90 },
  ],
};
const receiptPage: ExportPage = { title: 'Harbor Light receipt', mode: 'receipt', text: 'HARBOR LIGHT CAFE\nTotal $40.39', receipt, languages: ['eng'] };

const codePage: ExportPage = {
  title: 'parser.py',
  mode: 'code',
  codeLanguage: 'Python',
  text: [
    'def parse(text: str) -> list[str]:',
    '    """Split on ``` fences & keep <tags>."""',
    '    out = []',
    '    for line in text.splitlines():',
    '        if line.startswith("#"):',
    '\t\tout.append(line)  # tab-indented',
    '    return out  # (done) \\ backslash',
    '',
  ].join('\n'),
};

const hindiPage: ExportPage = {
  title: 'Community library',
  mode: 'document',
  text: '# Welcome to the community library\n\nसामुदायिक पुस्तकालय में आपका स्वागत है\n\n- Opening hours: 9 am to 7 pm\n- खुलने का समय: सुबह 9 बजे से शाम 7 बजे तक',
  languages: ['hin', 'eng'],
};

const mathPage: ExportPage = { title: 'Equation', mode: 'math', text: 'x^{2} + y^{2} = r^{2}' };
const plainPage: ExportPage = { title: 'Plain note', mode: 'plain', text: 'Line one\nLine two\n\nSecond paragraph' };

// Real OCR fixtures, with images, for the searchable PDF.
function fixture(name: string): OcrPage {
  return JSON.parse(readFileSync(`tests/fixtures/${name}.json`, 'utf8')) as OcrPage;
}

function jpegOf(name: string): Uint8Array<ArrayBuffer> {
  const out = `${OUT}/${name}.jpg`;
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '85', `public/samples/${name}.png`, '--out', out], { stdio: 'ignore' });
  return new Uint8Array(readFileSync(out));
}

function ocrPage(name: string, title: string, mode: 'table' | 'document'): ExportPage {
  const page = fixture(name);
  const f = format(page, mode);
  const jpeg = jpegOf(name);
  return {
    title,
    mode,
    text: f.text,
    table: f.table,
    languages: page.languages,
    image: { blob: new Blob([jpeg], { type: 'image/jpeg' }), width: page.width, height: page.height },
    words: allWords(page).map((w) => ({ text: w.text, bbox: w.bbox })),
  };
}

const realTable = ocrPage('table', 'Regional orders scan', 'table');
const realHindi = ocrPage('mixed-hindi', 'Library notice scan', 'document');

const docs: Record<string, ExportDoc> = {
  document: { title: 'Meeting notes', pages: [documentPage], createdAt: created },
  table: { title: 'Quarterly revenue', pages: [tablePage], createdAt: created },
  receipt: { title: 'Harbor Light receipt', pages: [receiptPage], createdAt: created },
  code: { title: 'parser.py', pages: [codePage], createdAt: created },
  hindi: { title: 'Community library', pages: [hindiPage], createdAt: created },
  multi: {
    title: 'Scan batch: 3 October',
    pages: [documentPage, tablePage, receiptPage, codePage, mathPage, plainPage, { ...plainPage, title: 'Plain note' }],
    createdAt: created,
  },
  scans: { title: 'Scanned pages', pages: [realTable, realHindi], createdAt: created },
  empty: { title: '', pages: [], createdAt: created },
  // Characters XML forbids, a lone surrogate, emoji, ragged rows, CRLF code, RTL text.
  edge: {
    title: 'Edge cases 😀 <&>',
    pages: [
      { title: 'Controls', mode: 'document', text: 'Bell\u0007 form\u000C feed ￾ lone \uD800 surrogate 😀 emoji\r\n- item\r\n' },
      { title: 'Ragged', mode: 'table', text: '', table: table([['a', 'b', 'c'], ['1'], ['2', '3', '4', '5']], false) },
      { title: 'Arabic', mode: 'document', text: '# مرحبا\n\nهذا نص عربي', languages: ['ara'] },
      { title: 'History', mode: 'receipt', text: 'no structure found', receipt: { kind: 'receipt', currency: null, fields: [], items: [] } },
      { title: 'CRLF code', mode: 'code', text: 'if (a) {\r\n\treturn b;\r\n}\r\n', codeLanguage: 'C/C++' },
    ],
    createdAt: created,
  },
  // Latin-only but long: page breaks, repeated table headers, long words and code lines.
  long: {
    title: 'Long document',
    pages: [
      {
        title: 'Inventory',
        mode: 'table',
        text: '',
        table: table(
          [['SKU', 'Item', 'Qty', 'Price'], ...Array.from({ length: 70 }, (_, i) => [`SKU-${1000 + i}`, `Item number ${i + 1} with a longer description that wraps`, String(i * 3), `$${(i * 1.25).toFixed(2)}`])],
          true,
          'Warehouse stock',
        ),
      },
      {
        title: 'Notes',
        mode: 'document',
        text: `# Links\n\nhttps://example.com/${'very-long-path-segment-'.repeat(12)}end\n\n${Array.from({ length: 40 }, (_, i) => `${i + 1}. Step ${i + 1} of the procedure`).join('\n')}`,
      },
      { title: 'Wide code', mode: 'code', text: `const x = "${'0123456789'.repeat(15)}";\n`, codeLanguage: 'JavaScript' },
    ],
    createdAt: created,
  },
};

// ---------------------------------------------------------------- assertions

assert.deepEqual(parseLightMarkdown('# A\n\npara 1\nline 2\n\n- x\n- y\n  more\n\n1. one\n2. two\n\nb) bee'), [
  { type: 'heading', level: 1, text: 'A' },
  { type: 'paragraph', lines: ['para 1', 'line 2'] },
  { type: 'list', style: 'bullet', delimiter: '.', start: 1, items: [['x'], ['y', 'more']] },
  { type: 'list', style: 'decimal', delimiter: '.', start: 1, items: [['one'], ['two']] },
  { type: 'list', style: 'lower-alpha', delimiter: ')', start: 2, items: [['bee']] },
]);

assert.deepEqual(parseNumericCell('1,284'), { value: 1284, format: '#,##0' });
assert.deepEqual(parseNumericCell('$96,300'), { value: 96300, format: '"$"#,##0' });
assert.deepEqual(parseNumericCell('12.4%'), { value: 0.124, format: '0.0%' });
assert.deepEqual(parseNumericCell('3.50'), { value: 3.5, format: '0.00' });
assert.deepEqual(parseNumericCell('(1,118)'), { value: -1118, format: '#,##0;(#,##0)' });
assert.deepEqual(parseNumericCell('₹12,34,567'), { value: 1234567, format: '"₹"#,##0' });
assert.deepEqual(parseNumericCell('42'), { value: 42, format: 'General' });
for (const text of ['1.234,56', '007', '12/03/2026', '1,23', 'abc', '4111111111111111111', '$5%', '']) {
  assert.equal(parseNumericCell(text), null, text);
}

assert.equal(safeFilename('  Invoice: March/April?  '), 'Invoice- March-April');
assert.equal(safeFilename('CON'), 'CON_');
assert.equal(safeFilename('...'), 'extracted-text');
assert.equal(safeFilename('रसीद 2026'), 'रसीद 2026');

assert.equal(pageToPlainText(tablePage).split('\n')[0], 'Region\tRevenue\tOrders\tGrowth\tNotes');
assert.ok(pageToPlainText(documentPage).startsWith('Project kickoff & next steps'));
assert.ok(pageToHtml(documentPage).startsWith('<h1>Project kickoff &amp; next steps</h1>'));
assert.ok(pageToHtml(tablePage).includes('<caption>Regional orders, Q1 2026</caption><thead><tr><th scope="col"'));

const ids = (d: ExportDoc) => formatsFor(d).filter((f) => f.available).map((f) => f.id);
assert.ok(!ids(docs.document).includes('xlsx') && !ids(docs.document).includes('searchable-pdf') && !ids(docs.document).includes('zip'));
assert.deepEqual(formatsFor(docs.table).slice(0, 2).map((f) => f.id), ['xlsx', 'csv']);
assert.ok(ids(docs.scans).includes('searchable-pdf') && ids(docs.multi).includes('zip'));

// ---------------------------------------------------------------- outputs

const FORMATS: ExportFormat[] = ['txt', 'md', 'html', 'json', 'csv', 'docx', 'xlsx', 'pdf', 'searchable-pdf', 'zip'];
const written: string[] = [];

async function save(name: string, doc: ExportDoc, fmt: ExportFormat, opts?: { zipInner?: 'txt' | 'md' | 'docx' }) {
  const result = await exportDoc(doc, fmt, opts);
  if (result.kind === 'print') {
    const path = `${OUT}/${name}.${fmt}.print.html`;
    writeFileSync(path, result.html);
    written.push(`${path}  (print fallback, filename ${result.filename})`);
    return;
  }
  const ext = result.filename.split('.').pop();
  const path = `${OUT}/${name}.${fmt}.${ext}`;
  writeFileSync(path, new Uint8Array(await result.blob.arrayBuffer()));
  written.push(`${path}  (${result.blob.size} bytes, ${result.blob.type}, ${result.filename})`);
}

for (const [name, doc] of Object.entries(docs)) {
  for (const fmt of FORMATS) await save(name, doc, fmt);
}
await save('multi-md', docs.multi, 'zip', { zipInner: 'md' });
await save('multi-docx', docs.multi, 'zip', { zipInner: 'docx' });

// The pure searchable-PDF builder, fed JPEG bytes directly.
const page = fixture('table');
const pdf = buildSearchablePdf(
  [{ jpeg: jpegOf('table'), width: page.width, height: page.height, words: allWords(page).map((w) => ({ text: w.text, bbox: w.bbox })) }],
  { title: 'Pure builder — table', createdAt: created },
);
writeFileSync(`${OUT}/pure.searchable.pdf`, pdf);
written.push(`${OUT}/pure.searchable.pdf  (${pdf.length} bytes)`);

// Expectations the validator checks against.
writeFileSync(
  `${OUT}/expect.json`,
  JSON.stringify({
    words: {
      'scans.searchable-pdf.pdf': [...new Set(realTable.words!.concat(realHindi.words!).map((w) => w.text))],
      'pure.searchable.pdf': allWords(page).map((w) => w.text),
    },
    printFallback: ['hindi.pdf', 'scans.pdf'],
  }),
);

assert.ok(existsSync(`${OUT}/hindi.pdf.print.html`), 'Hindi PDF should fall back to printing');
console.log(written.join('\n'));
console.log(`\n${written.length} files written to ${OUT}`);
