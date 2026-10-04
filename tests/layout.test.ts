// Layout and detection tests over real OCR output of the sample images
// (tests/fixtures, regenerate with: node scripts/dev-samples.mjs).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import type { OcrPage } from '../src/lib/ocr/types';
import { format, detect } from '../src/lib/layout/index';
import { analyzeTable, tableToMarkdown } from '../src/lib/layout/table';
import { guessLanguage } from '../src/lib/layout/code';

const load = (name: string): OcrPage => JSON.parse(readFileSync(`tests/fixtures/${name}.json`, 'utf8'));

test('table: five columns, header row, caption, cells in reading order', () => {
  const page = load('table');
  const det = detect(page, null);
  assert.equal(det.mode, 'table');
  const { table, cols } = analyzeTable(page);
  assert.equal(cols, 5);
  assert.equal(table.header, true);
  assert.equal(table.caption, 'Regional orders, Q1 2026');
  assert.deepEqual(table.rows[0].map((c) => c.text), ['Region', 'Manager', 'Orders', 'Revenue', 'Growth']);
  assert.deepEqual(table.rows[2].map((c) => c.text), ['South', 'Daniel Okafor', '967', '$71,850', '8.1%']);
  assert.match(tableToMarkdown(table), /^\| Region \| Manager \|/);
});

test('receipt: fields, totals and line items from a tilted photo', () => {
  const page = load('receipt');
  assert.equal(detect(page, null).mode, 'receipt');
  const r = format(page, 'receipt').receipt!;
  const f = Object.fromEntries(r.fields.map((x) => [x.key, x.value]));
  assert.equal(f.merchant, 'HARBOR LIGHT CAFE');
  assert.equal(f.date, '03/14/2026');
  assert.equal(f.number, '20481');
  assert.equal(f.subtotal, '29.50');
  assert.equal(f.total, '$31.12');
  assert.equal(r.currency, 'USD');
  assert.deepEqual(
    r.items.map((i) => [i.qty, i.description, i.amount]),
    [['2', 'Oat Latte', '11.00'], ['1', 'Blueberry Scone', '4.25'], ['1', 'Avocado Toast', '9.50'], ['1', 'Orange Juice', '4.75']],
  );
});

test('document: headings, joined paragraphs and recovered bullets', () => {
  const page = load('document');
  assert.equal(detect(page, null).mode, 'document');
  const text = format(page, 'document').text;
  assert.match(text, /^# Caring for a Sourdough Starter\n\n/);
  assert.match(text, /\n## Daily feeding\n/);
  assert.match(text, /\n- Use unbleached flour whenever possible\.\n- Filtered water/);
  assert.ok(!/bread for\nyears/.test(text), 'wrapped lines are joined');
});

test('code: language, indentation and straight quotes', () => {
  const page = load('code');
  const det = detect(page, null);
  assert.equal(det.mode, 'code');
  const out = format(page, 'code');
  assert.equal(out.code?.language, 'Python');
  assert.equal(guessLanguage(out.text)?.id, 'python');
  assert.match(out.text, /\ndef invoice_total\(items, tax_rate=0\.055\):\n {4}# items/);
  assert.match(out.text, /\n {8}raise ValueError\("invoice has no billable items"\)/);
});

test('mixed scripts keep both languages', () => {
  const text = format(load('mixed-hindi'), 'plain').text;
  assert.match(text, /Welcome to the community library/);
  assert.match(text, /सामुदायिक पुस्तकालय/);
});

test('every segment points at the right text', () => {
  for (const name of ['table', 'receipt', 'document', 'code', 'chat']) {
    const page = load(name);
    for (const mode of ['plain', 'document', 'code'] as const) {
      const out = format(page, mode);
      for (const s of out.segments) {
        assert.ok(s.from >= 0 && s.to <= out.text.length && s.from < s.to, `${name}/${mode} segment in range`);
      }
    }
  }
});

test('plain mode keeps line breaks; join-lines option merges wrapped lines', () => {
  const page = load('chat');
  const kept = format(page, 'plain', { joinLines: false }).text;
  const joined = format(page, 'plain', { joinLines: true }).text;
  assert.match(kept, /address for\nSaturday\?/);
  assert.ok(joined.split('\n').length < kept.split('\n').length);
});
