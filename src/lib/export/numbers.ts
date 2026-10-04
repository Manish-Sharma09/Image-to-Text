// Recognises cells that are clearly numbers ("1,284", "$96,300", "12.4%",
// "(5.00)") so spreadsheets get real numbers, with a number format that keeps
// the cell looking like the original. Anything ambiguous stays text.

export interface ParsedNumber {
  value: number;
  /** Excel number format code; 'General' when the plain value reads the same. */
  format: string;
}

const NUMBER = new RegExp(
  '^(\\()?' + // accounting negative: (1,234.00)
    '([-+−])?\\s?' +
    '([$€£₹¥])?\\s?' +
    '([-+−])?' +
    // 1,234,567 | 12,34,567 (Indian grouping) | 1234567
    '(\\d{1,3}(?:,\\d{3})+|\\d{1,2}(?:,\\d{2})+,\\d{3}|\\d+)' +
    '(?:\\.(\\d+))?' +
    '\\s?(%)?' +
    '(\\))?$',
);

export function parseNumericCell(text: string): ParsedNumber | null {
  const s = text.trim();
  if (!s || s.length > 32) return null;
  const m = NUMBER.exec(s);
  if (!m) return null;
  const [, open, sign1, currency, sign2, int, frac = '', percent, close] = m;
  if (!!open !== !!close) return null;
  if (sign1 && sign2) return null;
  if (currency && percent) return null;
  if ((open && (sign1 || sign2)) || (sign2 && !currency)) return null;

  const digits = int.replace(/,/g, '');
  // Leading zeros (IDs, postcodes) and long digit runs (card or account
  // numbers) would be damaged as numbers.
  if (digits.length > 1 && digits.startsWith('0')) return null;
  if (digits.length + frac.length > 15) return null;

  const negative = !!open || sign1 === '-' || sign1 === '−' || sign2 === '-' || sign2 === '−';
  let value = Number(`${digits}.${frac || '0'}`) * (negative ? -1 : 1);
  if (percent) value = Number((value / 100).toPrecision(15));
  if (!Number.isFinite(value)) return null;

  const grouped = int.includes(',');
  const trailingZero = frac.endsWith('0');
  if (!grouped && !currency && !percent && !open && !trailingZero) return { value, format: 'General' };

  let code = (grouped ? '#,##0' : '0') + (frac ? '.' + '0'.repeat(frac.length) : '');
  if (currency) code = `"${currency}"${code}`;
  if (percent) code += '%';
  if (open) code = `${code};(${code})`;
  return { value, format: code };
}
