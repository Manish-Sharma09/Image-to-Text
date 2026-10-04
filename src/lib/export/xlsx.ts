// Excel (.xlsx) export: hand-written SpreadsheetML with shared strings,
// bold frozen header rows and numbers stored as numbers.

import { ITEM_HEADER, hasReceipt, pageTable, pageTitle, receiptItemRows } from './blocks';
import { parseNumericCell } from './numbers';
import { APP_TYPE, CORE_TYPE, REL, appProps, contentTypes, coreProps, relationships, zipParts } from './ooxml';
import { pageLines } from './text';
import type { ExportDoc, ExportPage } from './types';
import { XML_HEADER, cleanText, escapeXml } from './xml';

const NS = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
const R_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
const MAIN = 'application/vnd.openxmlformats-officedocument.spreadsheetml';
const MAX_CELL = 32767;

interface Sheet {
  name: string;
  rows: string[][];
  /** Row indexes drawn bold (headings and header rows). */
  bold: Set<number>;
  /** Rows kept visible while scrolling. */
  freeze: number;
}

const BUILTIN_FORMATS: Record<string, number> = { General: 0, '0': 1, '0.00': 2, '#,##0': 3, '#,##0.00': 4, '0%': 9, '0.00%': 10 };

/** Cell formats (xf records), created on demand and shared by every sheet. */
class Styles {
  private custom = new Map<string, number>();
  private xfs = new Map<string, number>([['0|0|0', 0]]);

  index(format: string, bold: boolean, wrap: boolean): number {
    const fmtId = BUILTIN_FORMATS[format] ?? this.customId(format);
    const key = `${fmtId}|${+bold}|${+wrap}`;
    let i = this.xfs.get(key);
    if (i === undefined) {
      i = this.xfs.size;
      this.xfs.set(key, i);
    }
    return i;
  }

  private customId(format: string): number {
    let id = this.custom.get(format);
    if (id === undefined) {
      id = 164 + this.custom.size;
      this.custom.set(format, id);
    }
    return id;
  }

  xml(): string {
    const numFmts = [...this.custom].map(([code, id]) => `<numFmt numFmtId="${id}" formatCode="${escapeXml(code)}"/>`);
    const xfs = [...this.xfs.keys()].map((key) => {
      const [fmt, bold, wrap] = key.split('|').map(Number);
      const attrs = `numFmtId="${fmt}" fontId="${bold}" fillId="0" borderId="0" xfId="0"`;
      const apply = (fmt ? ' applyNumberFormat="1"' : '') + (bold ? ' applyFont="1"' : '') + (wrap ? ' applyAlignment="1"' : '');
      return wrap ? `<xf ${attrs}${apply}><alignment vertical="top" wrapText="1"/></xf>` : `<xf ${attrs}${apply}/>`;
    });
    const font = (bold: boolean) => `<font>${bold ? '<b/>' : ''}<sz val="11"/><name val="Calibri"/><family val="2"/></font>`;
    return (
      XML_HEADER +
      `<styleSheet xmlns="${NS}">` +
      (numFmts.length ? `<numFmts count="${numFmts.length}">${numFmts.join('')}</numFmts>` : '') +
      `<fonts count="2">${font(false)}${font(true)}</fonts>` +
      '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>' +
      '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>' +
      '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
      `<cellXfs count="${xfs.length}">${xfs.join('')}</cellXfs>` +
      '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>' +
      '</styleSheet>'
    );
  }
}

class SharedStrings {
  private map = new Map<string, number>();
  private count = 0;

  index(s: string): number {
    this.count++;
    let i = this.map.get(s);
    if (i === undefined) {
      i = this.map.size;
      this.map.set(s, i);
    }
    return i;
  }

  xml(): string {
    const items = [...this.map.keys()].map((s) => `<si><t xml:space="preserve">${escapeXml(s)}</t></si>`);
    return XML_HEADER + `<sst xmlns="${NS}" count="${this.count}" uniqueCount="${items.length}">${items.join('')}</sst>`;
  }
}

/** 0 → A, 25 → Z, 26 → AA. */
function column(i: number): string {
  let s = '';
  for (let n = i + 1; n > 0; n = Math.floor((n - 1) / 26)) s = String.fromCharCode(65 + ((n - 1) % 26)) + s;
  return s;
}

/** Display width in Excel character units; East Asian wide characters count double. */
function textWidth(s: string): number {
  let w = 0;
  for (const ch of s) w += /[ᄀ-ᅟ⺀-꓏가-힣豈-﫿︰-﹏＀-｠￠-￦]/.test(ch) ? 2 : 1;
  return w;
}

function columnWidths(rows: string[][]): number[] {
  const cols = Math.max(0, ...rows.map((r) => r.length));
  // A one-cell title row above a wider table may overflow; it shouldn't widen column A.
  const measured = cols > 1 ? rows.filter((r) => r.length > 1) : rows;
  return Array.from({ length: cols }, (_, c) => {
    const longest = Math.max(0, ...measured.map((r) => Math.max(0, ...(r[c] ?? '').split('\n').map(textWidth))));
    return Math.min(60, Math.max(8, longest + 2));
  });
}

function cellXml(ref: string, text: string, bold: boolean, styles: Styles, sst: SharedStrings): string {
  const value = cleanText(text).slice(0, MAX_CELL);
  if (!value.trim()) return '';
  const num = bold ? null : parseNumericCell(value);
  if (num) {
    const s = styles.index(num.format, false, false);
    return `<c r="${ref}"${s ? ` s="${s}"` : ''}><v>${num.value}</v></c>`;
  }
  const s = styles.index('General', bold, value.includes('\n'));
  return `<c r="${ref}"${s ? ` s="${s}"` : ''} t="s"><v>${sst.index(value)}</v></c>`;
}

function sheetXml(sheet: Sheet, first: boolean, styles: Styles, sst: SharedStrings): string {
  const rows = sheet.rows
    .map((row, r) => {
      const cells = row.map((text, c) => cellXml(`${column(c)}${r + 1}`, text, sheet.bold.has(r), styles, sst)).join('');
      return cells ? `<row r="${r + 1}">${cells}</row>` : '';
    })
    .join('');
  const widths = columnWidths(sheet.rows);
  const cols = widths.length
    ? `<cols>${widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('')}</cols>`
    : '';
  const lastRef = `${column(Math.max(0, widths.length - 1))}${Math.max(1, sheet.rows.length)}`;
  const top = `A${sheet.freeze + 1}`;
  const view = sheet.freeze
    ? `<sheetView${first ? ' tabSelected="1"' : ''} workbookViewId="0"><pane ySplit="${sheet.freeze}" topLeftCell="${top}" activePane="bottomLeft" state="frozen"/>` +
      `<selection pane="bottomLeft" activeCell="${top}" sqref="${top}"/></sheetView>`
    : `<sheetView${first ? ' tabSelected="1"' : ''} workbookViewId="0"/>`;
  return (
    XML_HEADER +
    `<worksheet xmlns="${NS}" xmlns:r="${R_NS}">` +
    `<dimension ref="A1:${lastRef}"/>` +
    `<sheetViews>${view}</sheetViews>` +
    '<sheetFormatPr defaultRowHeight="15"/>' +
    cols +
    (rows ? `<sheetData>${rows}</sheetData>` : '<sheetData/>') +
    '<pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>' +
    '</worksheet>'
  );
}

/** Excel sheet names: ≤31 chars, none of []:*?/\, not quoted, unique ignoring case. */
function sheetName(raw: string, used: Set<string>, fallback: string): string {
  let base = cleanText(raw).replace(/[[\]:*?/\\\n\t]+/g, ' ').replace(/\s+/g, ' ').trim().replace(/^'+|'+$/g, '');
  if (!base || base.toLowerCase() === 'history') base = base ? `${base} 1` : fallback;
  const fit = (s: string, suffix = '') => Array.from(s).slice(0, 31 - suffix.length).join('').trim() + suffix;
  let name = fit(base);
  for (let n = 2; used.has(name.toLowerCase()); n++) name = fit(base, ` (${n})`);
  used.add(name.toLowerCase());
  return name;
}

function tableSheet(page: ExportPage): Omit<Sheet, 'name'> | null {
  const t = pageTable(page);
  if (!t) return null;
  const rows = t.caption ? [[t.caption], ...t.rows] : t.rows;
  const offset = t.caption ? 1 : 0;
  const bold = new Set<number>(t.caption ? [0] : []);
  if (t.header) bold.add(offset);
  return { rows, bold, freeze: t.header ? offset + 1 : 0 };
}

function receiptSheet(page: ExportPage): Omit<Sheet, 'name'> | null {
  if (!hasReceipt(page)) return null;
  const r = page.receipt;
  const rows: string[][] = [];
  const bold = new Set<number>();
  if (r.fields.length) {
    bold.add(rows.length);
    rows.push(['Field', 'Value'], ...r.fields.map((f) => [f.label, f.value]));
  }
  if (r.items.length) {
    if (rows.length) rows.push([]);
    bold.add(rows.length);
    rows.push(ITEM_HEADER, ...receiptItemRows(r));
  }
  return { rows, bold, freeze: 1 };
}

function sheetsFor(doc: ExportDoc): Sheet[] {
  const used = new Set<string>();
  const structured = doc.pages
    .map((page, i) => ({ page, i, sheet: page.mode === 'table' ? tableSheet(page) : page.mode === 'receipt' ? receiptSheet(page) : null }))
    .filter((x) => x.sheet);
  if (structured.length) {
    return structured.map(({ page, i, sheet }) => ({ ...sheet!, name: sheetName(pageTitle(page, i), used, `Sheet${i + 1}`) }));
  }
  // No tables: every page's lines go down column A.
  const sheets = doc.pages.map((page, i) => ({
    name: sheetName(pageTitle(page, i), used, `Sheet${i + 1}`),
    rows: pageLines(page).map((l) => [l]),
    bold: new Set<number>(),
    freeze: 0,
  }));
  return sheets.length ? sheets : [{ name: 'Sheet1', rows: [], bold: new Set<number>(), freeze: 0 }];
}

export function docToXlsx(doc: ExportDoc): Uint8Array {
  const sheets = sheetsFor(doc);
  const styles = new Styles();
  const sst = new SharedStrings();
  const sheetParts = sheets.map((s, i): [string, string] => [`xl/worksheets/sheet${i + 1}.xml`, sheetXml(s, i === 0, styles, sst)]);
  const workbook =
    XML_HEADER +
    `<workbook xmlns="${NS}" xmlns:r="${R_NS}">` +
    '<bookViews><workbookView activeTab="0"/></bookViews>' +
    `<sheets>${sheets.map((s, i) => `<sheet name="${escapeXml(s.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets>` +
    '</workbook>';
  const workbookRels = relationships([
    ...sheets.map((_, i): [string, string] => [REL.worksheet, `worksheets/sheet${i + 1}.xml`]),
    [REL.styles, 'styles.xml'],
    [REL.sharedStrings, 'sharedStrings.xml'],
  ]);
  return zipParts(
    [
      [
        '[Content_Types].xml',
        contentTypes([
          ['xl/workbook.xml', `${MAIN}.sheet.main+xml`],
          ...sheetParts.map(([path]): [string, string] => [path, `${MAIN}.worksheet+xml`]),
          ['xl/styles.xml', `${MAIN}.styles+xml`],
          ['xl/sharedStrings.xml', `${MAIN}.sharedStrings+xml`],
          ['docProps/core.xml', CORE_TYPE],
          ['docProps/app.xml', APP_TYPE],
        ]),
      ],
      [
        '_rels/.rels',
        relationships([
          [REL.officeDocument, 'xl/workbook.xml'],
          [REL.coreProps, 'docProps/core.xml'],
          [REL.appProps, 'docProps/app.xml'],
        ]),
      ],
      ['docProps/core.xml', coreProps(doc.title, doc.createdAt)],
      ['docProps/app.xml', appProps()],
      ['xl/workbook.xml', workbook],
      ['xl/_rels/workbook.xml.rels', workbookRels],
      ...sheetParts,
      ['xl/styles.xml', styles.xml()],
      ['xl/sharedStrings.xml', sst.xml()],
    ],
    doc.createdAt,
  );
}
