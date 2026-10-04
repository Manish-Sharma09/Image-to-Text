// Opens every exported PDF with pdf.js (as a viewer would) and checks that it
// parses without warnings and that its text can be extracted.
// Run after tests/export/run.ts: node tests/export/pdfjs-check.mjs

import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const OUT = 'node_modules/.cache/export-out';
const EXPECT = {
  'document.pdf.pdf': ['Project kickoff & next steps', 'Café — naïve — “smart quotes” — €42.', '3. Celebrate', 'Page 1 of 1'],
  'table.pdf.pdf': ['Regional orders, Q1 2026', '$96,300', '(1,118)'],
  'long.pdf.pdf': ['Page 6 of 6', 'SKU-1069'],
  'scans.searchable-pdf.pdf': ['$118,400', 'सामुदायिक पुस्तकालय में आपका स्वागत है'],
};

for (const f of readdirSync(OUT).filter((f) => f.endsWith('.pdf')).sort()) {
  const warnings = [];
  const warn = console.warn;
  console.warn = (...args) => warnings.push(args.join(' '));
  const data = new Uint8Array(readFileSync(`${OUT}/${f}`));
  const doc = await getDocument({ data, verbosity: 1, standardFontDataUrl: 'node_modules/pdfjs-dist/standard_fonts/' }).promise;
  let text = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const content = await (await doc.getPage(i)).getTextContent();
    text += content.items.map((it) => ('str' in it ? it.str + (it.hasEOL ? '\n' : ' ') : '')).join('');
  }
  console.warn = warn;
  assert.deepEqual(warnings, [], `${f}: pdf.js warnings`);
  const flat = text.replace(/\s+/g, ' ');
  for (const phrase of EXPECT[f] ?? []) assert.ok(flat.includes(phrase), `${f}: missing ${phrase}`);
  console.log(`${f}: ${doc.numPages} page(s), ${flat.length} chars, no warnings`);
}
