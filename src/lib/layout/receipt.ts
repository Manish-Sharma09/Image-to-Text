// Receipts and invoices: pull out the fields people actually copy (merchant,
// date, totals, line items) and remember where each came from.

import type { OcrPage, OcrWord } from '../ocr/types';
import { bboxUnion } from '../ocr/types';
import type { Formatted, ReceiptData, ReceiptField, ReceiptItem } from './types';
import { TextBuilder, h, pageRows, type Row } from './geometry';

const CUR = '(?:[$€£₹¥]|Rs\\.?|INR|USD|EUR|GBP|AUD|CAD)';
// An amount at the end of a row, optionally followed by a tax code letter.
const AMOUNT_END = new RegExp(`(-?\\s?${CUR}?\\s?-?\\d{1,3}(?:[,.\\s]\\d{3})*[.,]\\d{2}|-?${CUR}\\s?\\d+)\\s*(?:[A-Z]{1,2}|\\*)?$`);
const DATE = /\b(\d{1,2}[/.-]\d{1,2}[/.-]\d{2,4}|\d{4}[/.-]\d{1,2}[/.-]\d{1,2}|\d{1,2}\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.?,?\s+\d{2,4}|(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.?\s+\d{1,2},?\s+\d{2,4})\b/i;
const TIME = /\b(\d{1,2}:\d{2}(?::\d{2})?\s?(?:[ap]\.?m\.?)?)\b/i;
const EMAIL = /\b[\w.+-]+@[\w-]+\.[\w.-]+\b/;
const PHONE = /(?:tel|phone|ph|mob|mobile)?\.?:?\s*(\+?\(?\d[\d\s().-]{7,}\d)/i;
const WEB = /\b(?:https?:\/\/)?(?:www\.)[\w-]+\.[a-z.]{2,}\b/i;
const NUMBER = /\b(?:invoice|inv|receipt|bill|order|transaction|txn|ref|reference|document|doc)\s*(?:no\.?|number|num|#|id)?\s*[:#.]?\s*([A-Z0-9][A-Z0-9\-/]{2,})/i;
const TAX_ID = /\b(?:GSTIN|GST\s*(?:no|#|reg)|VAT\s*(?:no|reg|#|id)|ABN|TIN|EIN)\.?\s*[:#]?\s*([A-Z0-9 -]{6,20})/i;

const TOTAL_KEYS: [string, string, RegExp][] = [
  ['subtotal', 'Subtotal', /\b(sub\s*-?\s*total|net\s+amount|amount\s+before\s+tax)\b/i],
  ['tax', 'Tax', /\b(tax|vat|gst|cgst|sgst|igst|hst|pst|sales\s+tax)\b/i],
  ['tip', 'Tip', /\b(tip|gratuity|service\s+charge)\b/i],
  ['discount', 'Discount', /\b(discount|savings|coupon|promo)\b/i],
  ['total', 'Total', /\b(grand\s+total|total\s+due|amount\s+due|balance\s+due|total\s+amount|total|amount\s+payable|net\s+payable)\b/i],
  ['paid', 'Paid', /\b(cash|card|visa|mastercard|amex|debit|credit|paid|tender(ed)?|upi)\b/i],
  ['change', 'Change', /\b(change|change\s+due)\b/i],
];

const NOT_ITEM = /\b(total|subtotal|tax|vat|gst|change|cash|card|visa|mastercard|balance|tip|discount|due|paid|tender|payment|rounding|amount)\b/i;

function textOf(words: OcrWord[]) {
  return words.map((w) => w.text).join(' ');
}

function conf(words: OcrWord[]) {
  return words.length ? words.reduce((a, w) => a + w.conf, 0) / words.length : 0;
}

function field(key: string, label: string, value: string, words: OcrWord[]): ReceiptField {
  return { key, label, value: value.trim(), bbox: words.length ? bboxUnion(words.map((w) => w.bbox)) : null, conf: conf(words) };
}

function splitAmount(row: Row): { label: OcrWord[]; amount: string; amountWords: OcrWord[] } | null {
  const text = textOf(row.words);
  const m = text.match(AMOUNT_END);
  if (!m) return null;
  // Walk back over words until their joined text covers the match.
  let k = row.words.length;
  let acc = '';
  while (k > 0 && acc.length < m[0].trim().length) {
    k--;
    acc = (row.words[k].text + (acc ? ' ' + acc : '')).trim();
  }
  return { label: row.words.slice(0, k), amount: m[1].replace(/\s+/g, ''), amountWords: row.words.slice(k) };
}

function detectCurrency(text: string): string | null {
  const counts: Record<string, number> = {};
  for (const m of text.matchAll(/[$€£₹¥]|\bRs\.?|\bINR\b|\bUSD\b|\bEUR\b|\bGBP\b/g)) {
    const k = m[0].replace('.', '');
    counts[k] = (counts[k] ?? 0) + 1;
  }
  const best = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  if (!best) return null;
  const map: Record<string, string> = { $: 'USD', '€': 'EUR', '£': 'GBP', '₹': 'INR', '¥': 'JPY', Rs: 'INR' };
  return map[best[0]] ?? best[0];
}

/** 0–1 likelihood that the page is a receipt or invoice. */
export function receiptScore(page: OcrPage): { score: number; invoice: boolean } {
  const rows = pageRows(page);
  if (rows.length < 4) return { score: 0, invoice: false };
  const text = rows.map((r) => textOf(r.words)).join('\n');
  const keywords = ['total', 'subtotal', 'tax', 'vat', 'gst', 'cash', 'change', 'card', 'receipt', 'invoice', 'qty', 'amount', 'balance', 'due', 'thank you', 'bill to', 'payment']
    .filter((k) => new RegExp(`\\b${k}\\b`, 'i').test(text)).length;
  const priced = rows.filter((r) => AMOUNT_END.test(textOf(r.words))).length / rows.length;
  const invoice = /\binvoice\b/i.test(text);
  const score = Math.min(1, keywords / 3) * 0.55 + Math.min(1, priced / 0.3) * 0.45;
  return { score: /\btotal\b/i.test(text) ? score : score * 0.6, invoice };
}

export function extractReceipt(page: OcrPage): ReceiptData {
  const rows = pageRows(page);
  const texts = rows.map((r) => textOf(r.words));
  const all = texts.join('\n');
  const fields: ReceiptField[] = [];
  const used = new Set<number>();
  const add = (f: ReceiptField, row?: number) => {
    if (!fields.some((x) => x.key === f.key)) fields.push(f);
    if (row !== undefined) used.add(row);
  };

  // Merchant: the most prominent text row near the top.
  const top = rows.slice(0, Math.min(6, rows.length));
  const candidates = top
    .map((r, i) => ({ r, i, t: texts[i] }))
    .filter(({ t }) => /\p{L}{2,}/u.test(t) && !DATE.test(t) && !PHONE.test(t) && !EMAIL.test(t) && !NUMBER.test(t));
  if (candidates.length) {
    const m = candidates.reduce((a, b) => (h(b.r.bbox) > h(a.r.bbox) * 1.15 ? b : a));
    // Drop stray low-confidence marks at the ends (logo specks, borders).
    const ws = m.r.words.filter((w, i, all) => !(w.conf < 60 && w.text.length <= 2 && (i === 0 || i === all.length - 1)));
    add(field('merchant', 'Business', textOf(ws.length ? ws : m.r.words), ws.length ? ws : m.r.words), m.i);
    // Address: up to two rows under the merchant with digits and letters.
    const addr: Row[] = [];
    for (let i = m.i + 1; i < Math.min(rows.length, m.i + 4); i++) {
      const t = texts[i];
      if (PHONE.test(t) && !/\d{3,}\s+\p{L}/u.test(t)) break;
      if (DATE.test(t) || EMAIL.test(t) || NUMBER.test(t) || AMOUNT_END.test(t)) break;
      if (/\d/.test(t) && /\p{L}{3,}/u.test(t)) addr.push(rows[i]);
      else if (addr.length) break;
    }
    if (addr.length) add(field('address', 'Address', addr.map((r) => textOf(r.words)).join(', '), addr.flatMap((r) => r.words)));
  }

  const findRow = (re: RegExp) => texts.findIndex((t) => re.test(t));
  const pick = (key: string, label: string, re: RegExp, group = 1) => {
    const i = findRow(re);
    if (i < 0) return;
    const m = texts[i].match(re)!;
    const value = m[group] ?? m[0];
    const ws = rows[i].words.filter((w) => value.includes(w.text) || w.text.includes(value));
    add(field(key, label, value, ws.length ? ws : rows[i].words));
  };

  pick('number', /\binvoice\b/i.test(all) ? 'Invoice number' : 'Receipt number', NUMBER);
  const dueIdx = findRow(/\bdue\s+date\b/i);
  const dateIdx = texts.findIndex((t, i) => i !== dueIdx && DATE.test(t));
  if (dateIdx >= 0) {
    const v = texts[dateIdx].match(DATE)![1];
    add(field('date', 'Date', v, rows[dateIdx].words.filter((w) => v.includes(w.text))));
  }
  if (dueIdx >= 0 && DATE.test(texts[dueIdx])) {
    const v = texts[dueIdx].match(DATE)![1];
    add(field('due', 'Due date', v, rows[dueIdx].words.filter((w) => v.includes(w.text))));
  }
  pick('time', 'Time', TIME);
  pick('phone', 'Phone', PHONE);
  pick('email', 'Email', EMAIL, 0);
  pick('website', 'Website', WEB, 0);
  pick('taxId', 'Tax ID', TAX_ID);

  const billIdx = findRow(/\b(bill(ed)?\s+to|customer|sold\s+to)\b/i);
  if (billIdx >= 0) {
    const block = [rows[billIdx], ...rows.slice(billIdx + 1, billIdx + 3)].filter((r, k) => k === 0 || !AMOUNT_END.test(textOf(r.words)));
    const v = block.map((r) => textOf(r.words)).join(', ').replace(/^.*?(bill(ed)?\s+to|customer|sold\s+to)\s*:?\s*/i, '');
    if (v) add(field('billTo', 'Bill to', v, block.flatMap((r) => r.words)));
  }

  // Totals and items.
  const items: (ReceiptItem & { row: number })[] = [];
  const totals: Record<string, { value: string; words: OcrWord[]; row: number }[]> = {};
  let firstTotalRow = rows.length;
  rows.forEach((row, i) => {
    const split = splitAmount(row);
    if (!split) return;
    const label = textOf(split.label);
    const key = TOTAL_KEYS.find(([, , re]) => re.test(label));
    if (key) {
      (totals[key[0]] ??= []).push({ value: split.amount, words: row.words, row: i });
      if (key[0] === 'total' || key[0] === 'subtotal') firstTotalRow = Math.min(firstTotalRow, i);
      return;
    }
    if (used.has(i) || NOT_ITEM.test(label) || DATE.test(label) || !/\p{L}{2,}/u.test(label)) return;
    // Quantity: "2 x Latte", "2 @ 3.50", "Latte 2 3.50 7.00"
    let desc = label;
    let qty = '';
    let unit = '';
    const q1 = desc.match(/^(\d+(?:[.,]\d+)?)\s*(?:x|×|@|pcs?|qty)?\s+(.+)$/i);
    if (q1 && Number(q1[1].replace(',', '.')) < 1000) {
      qty = q1[1];
      desc = q1[2];
    }
    const q2 = desc.match(/^(.+?)\s+(\d+(?:[.,]\d+)?)\s*(?:x|×|@)\s*(\d+[.,]\d{2})$/i) ?? desc.match(/^(.+?)\s+(\d{1,3})\s+(\d+[.,]\d{2})$/);
    if (q2) {
      desc = q2[1];
      qty ||= q2[2];
      unit = q2[3];
    }
    items.push({
      description: desc.replace(/\s+[-–.]+$/, '').trim(),
      qty,
      unitPrice: unit,
      amount: split.amount,
      bbox: bboxUnion(row.words.map((w) => w.bbox)),
      conf: conf(row.words),
      row: i,
    });
  });

  // Items only appear before the first total line.
  const realItems: ReceiptItem[] = items.filter((it) => it.row < firstTotalRow).map(({ row: _row, ...it }) => it);

  for (const [key, label] of TOTAL_KEYS) {
    const list = totals[key];
    if (!list?.length) continue;
    // "Total" lines repeat (e.g. "Total items", "Total"); the last usually wins.
    const chosen = key === 'total' ? list[list.length - 1] : list[0];
    add(field(key, label, chosen.value, chosen.words));
  }

  const order = ['merchant', 'address', 'phone', 'email', 'website', 'taxId', 'number', 'date', 'time', 'due', 'billTo', 'subtotal', 'discount', 'tax', 'tip', 'total', 'paid', 'change'];
  fields.sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));

  return {
    kind: /\binvoice\b/i.test(all) ? 'invoice' : 'receipt',
    currency: detectCurrency(all),
    fields,
    items: realItems,
  };
}

export function receiptToText(r: ReceiptData): string {
  const lines: string[] = [];
  for (const f of r.fields) lines.push(`${f.label}: ${f.value}`);
  if (r.items.length) {
    lines.push('', 'Items');
    for (const it of r.items) {
      const qty = it.qty ? `${it.qty} × ` : '';
      lines.push(`${qty}${it.description}\t${it.amount}`);
    }
  }
  return lines.join('\n');
}

export function formatReceipt(page: OcrPage): Formatted {
  const receipt = extractReceipt(page);
  // The text view shows the receipt line by line, as printed.
  const rows = pageRows(page);
  const b = new TextBuilder();
  rows.forEach((row, i) => {
    if (i > 0) b.push('\n');
    row.words.forEach((word, j) => {
      if (j > 0) {
        const gap = word.bbox.x0 - row.words[j - 1].bbox.x1;
        b.push(gap > h(row.bbox) * 1.5 ? '    ' : ' ');
      }
      b.word(word);
    });
  });
  const notes: string[] = [];
  const total = receipt.fields.find((f) => f.key === 'total');
  if (!total) notes.push('No total was found. Check the fields below against the receipt.');
  return { mode: 'receipt', text: b.text, segments: b.segments, receipt, notes };
}
