// Word (.docx) export: a minimal, hand-written WordprocessingML package.
// Element order inside w:pPr, w:rPr, w:tblPr etc. follows the schema
// sequence; Word refuses files that get it wrong.

import { getLanguage } from '../ocr/languages';
import { pageBlocks, pageTitle, type Block, type ListBlock, type ListStyle, type TableBlock } from './blocks';
import { parseNumericCell } from './numbers';
import { APP_TYPE, CORE_TYPE, REL, appProps, contentTypes, coreProps, relationships, zipParts } from './ooxml';
import type { ExportDoc, ExportPage } from './types';
import { XML_HEADER, cleanText, escapeXml } from './xml';

const W_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
const R_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
const MAIN = 'application/vnd.openxmlformats-officedocument.wordprocessingml';

// A4 with 1" margins, in twentieths of a point.
const PAGE = { w: 11906, h: 16838, margin: 1440 };
const TEXT_WIDTH = PAGE.w - 2 * PAGE.margin;
const BORDER = 'w:val="single" w:sz="4" w:space="0" w:color="A6A6A6"';

interface ParaProps {
  style?: string;
  keepNext?: boolean;
  pageBreakBefore?: boolean;
  numId?: number;
  bidi?: boolean;
  spacingAfter?: number;
  noSpacing?: boolean;
  right?: boolean;
}

/** w:pPr children in schema order. */
function pPr(p: ParaProps): string {
  let x = '';
  if (p.style) x += `<w:pStyle w:val="${p.style}"/>`;
  if (p.keepNext) x += '<w:keepNext/>';
  if (p.pageBreakBefore) x += '<w:pageBreakBefore/>';
  if (p.numId) x += `<w:numPr><w:ilvl w:val="0"/><w:numId w:val="${p.numId}"/></w:numPr>`;
  if (p.bidi) x += '<w:bidi/>';
  if (p.noSpacing) x += '<w:spacing w:before="0" w:after="0"/>';
  else if (p.spacingAfter !== undefined) x += `<w:spacing w:after="${p.spacingAfter}"/>`;
  if (p.right) x += '<w:jc w:val="right"/>';
  return x ? `<w:pPr>${x}</w:pPr>` : '';
}

/** A run; tabs and newlines become w:tab and w:br so they survive. */
function run(text: string, bold = false): string {
  const parts: string[] = [];
  for (const piece of cleanText(text).split(/(\t|\n)/)) {
    if (piece === '\t') parts.push('<w:tab/>');
    else if (piece === '\n') parts.push('<w:br/>');
    else if (piece) parts.push(`<w:t xml:space="preserve">${escapeXml(piece)}</w:t>`);
  }
  if (!parts.length) return '';
  return `<w:r>${bold ? '<w:rPr><w:b/><w:bCs/></w:rPr>' : ''}${parts.join('')}</w:r>`;
}

function para(text: string, props: ParaProps = {}, bold = false): string {
  return `<w:p>${pPr(props)}${run(text, bold)}</w:p>`;
}

/** Numbering definitions: one abstract list per style, one w:num per list so each restarts. */
class Numbering {
  private abstracts = new Map<string, { id: number; style: ListStyle; delimiter: string }>();
  private nums: { abstractId: number; start: number | null }[] = [];

  constructor() {
    this.abstractFor('bullet', '.');
    this.abstractFor('decimal', '.');
  }

  private abstractFor(style: ListStyle, delimiter: string): number {
    const key = `${style}${delimiter}`;
    let a = this.abstracts.get(key);
    if (!a) {
      a = { id: this.abstracts.size, style, delimiter };
      this.abstracts.set(key, a);
    }
    return a.id;
  }

  numFor(list: ListBlock): number {
    const abstractId = this.abstractFor(list.style, list.style === 'bullet' ? '.' : list.delimiter);
    this.nums.push({ abstractId, start: list.style === 'bullet' ? null : list.start });
    return this.nums.length;
  }

  xml(): string {
    const fmt: Record<ListStyle, string> = { bullet: 'bullet', decimal: 'decimal', 'lower-alpha': 'lowerLetter', 'upper-alpha': 'upperLetter' };
    const abstracts = [...this.abstracts.values()].map(
      (a) =>
        `<w:abstractNum w:abstractNumId="${a.id}"><w:multiLevelType w:val="singleLevel"/>` +
        `<w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="${fmt[a.style]}"/>` +
        `<w:lvlText w:val="${a.style === 'bullet' ? '•' : `%1${a.delimiter}`}"/><w:lvlJc w:val="left"/>` +
        '<w:pPr><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum>',
    );
    const nums = this.nums.map(
      (n, i) =>
        `<w:num w:numId="${i + 1}"><w:abstractNumId w:val="${n.abstractId}"/>` +
        (n.start !== null ? `<w:lvlOverride w:ilvl="0"><w:startOverride w:val="${n.start}"/></w:lvlOverride>` : '') +
        '</w:num>',
    );
    return XML_HEADER + `<w:numbering xmlns:w="${W_NS}">${abstracts.join('')}${nums.join('')}</w:numbering>`;
  }
}

/** Column widths proportional to the longest line in each column. */
function columnWidths(rows: string[][]): number[] {
  const cols = rows[0]?.length ?? 0;
  const weight = Array.from({ length: cols }, (_, c) =>
    Math.min(40, Math.max(4, ...rows.map((r) => Math.max(0, ...r[c].split('\n').map((l) => [...l].length))))),
  );
  const sum = weight.reduce((a, b) => a + b, 0) || 1;
  return weight.map((w) => Math.floor((TEXT_WIDTH * w) / sum));
}

function tableXml(t: TableBlock, bidi: boolean): string {
  if (!t.rows.length || !t.rows[0].length) return '';
  const widths = columnWidths(t.rows);
  const borders = ['top', 'left', 'bottom', 'right', 'insideH', 'insideV'].map((side) => `<w:${side} ${BORDER}/>`).join('');
  const tblPr =
    '<w:tblPr><w:tblStyle w:val="TableGrid"/>' +
    (bidi ? '<w:bidiVisual/>' : '') +
    `<w:tblW w:w="${widths.reduce((a, b) => a + b, 0)}" w:type="dxa"/>` +
    `<w:tblBorders>${borders}</w:tblBorders><w:tblLayout w:type="fixed"/><w:tblLook w:val="04A0"/></w:tblPr>`;
  const grid = `<w:tblGrid>${widths.map((w) => `<w:gridCol w:w="${w}"/>`).join('')}</w:tblGrid>`;
  const rows = t.rows.map((row, r) => {
    const head = t.header && r === 0;
    const cells = row.map((text, c) => {
      const shade = head ? '<w:shd w:val="clear" w:color="auto" w:fill="F2F2F2"/>' : '';
      const props: ParaProps = { noSpacing: true, bidi, right: !head && !bidi && !!parseNumericCell(text) };
      return `<w:tc><w:tcPr><w:tcW w:w="${widths[c]}" w:type="dxa"/>${shade}</w:tcPr>${para(text, props, head)}</w:tc>`;
    });
    // Header rows repeat on every page and never split.
    const trPr = head ? '<w:trPr><w:cantSplit/><w:tblHeader/></w:trPr>' : '';
    return `<w:tr>${trPr}${cells.join('')}</w:tr>`;
  });
  const caption = t.caption ? para(t.caption, { style: 'Caption', keepNext: true, bidi }) : '';
  // A paragraph after every table keeps adjacent tables from merging.
  return `${caption}<w:tbl>${tblPr}${grid}${rows.join('')}</w:tbl><w:p/>`;
}

function blockXml(b: Block, numbering: Numbering, shift: number, bidi: boolean): string {
  switch (b.type) {
    case 'heading':
      return para(b.text, { style: `Heading${Math.min(4, b.level + shift)}`, bidi });
    case 'paragraph':
      return para(b.lines.join('\n'), { bidi });
    case 'list': {
      const numId = numbering.numFor(b);
      return b.items.map((item) => para(item.join('\n'), { style: 'ListParagraph', numId, bidi })).join('');
    }
    case 'code': {
      const lines = b.text.split('\n');
      return lines.map((line, i) => para(line, { style: 'Code', spacingAfter: i === lines.length - 1 ? 200 : undefined })).join('');
    }
    case 'table':
      return tableXml(b, bidi);
  }
}

function isRtl(page: ExportPage): boolean {
  const lang = page.languages?.map(getLanguage).find(Boolean);
  return !!lang?.rtl;
}

function documentXml(doc: ExportDoc, numbering: Numbering): string {
  const multi = doc.pages.length > 1;
  const body: string[] = [para(doc.title.trim() || 'Extracted text', { style: 'Title' })];
  doc.pages.forEach((page, i) => {
    const bidi = isRtl(page);
    if (multi) body.push(para(pageTitle(page, i), { style: 'Heading1', pageBreakBefore: i > 0, bidi }));
    for (const b of pageBlocks(page)) body.push(blockXml(b, numbering, multi ? 1 : 0, bidi));
  });
  const sectPr =
    `<w:sectPr><w:pgSz w:w="${PAGE.w}" w:h="${PAGE.h}"/>` +
    `<w:pgMar w:top="${PAGE.margin}" w:right="${PAGE.margin}" w:bottom="${PAGE.margin}" w:left="${PAGE.margin}" w:header="708" w:footer="708" w:gutter="0"/>` +
    '</w:sectPr>';
  return XML_HEADER + `<w:document xmlns:w="${W_NS}" xmlns:r="${R_NS}"><w:body>${body.join('')}${sectPr}</w:body></w:document>`;
}

function style(type: string, id: string, name: string, inner: string, extra = ''): string {
  return `<w:style w:type="${type}" w:styleId="${id}"${extra}><w:name w:val="${name}"/>${inner}</w:style>`;
}

function heading(level: number, size: number, before: number): string {
  return style(
    'paragraph',
    `Heading${level}`,
    `heading ${level}`,
    '<w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:uiPriority w:val="9"/><w:qFormat/>' +
      `<w:pPr><w:keepNext/><w:keepLines/><w:spacing w:before="${before}" w:after="120"/><w:outlineLvl w:val="${level - 1}"/></w:pPr>` +
      `<w:rPr><w:b/><w:bCs/><w:color w:val="1F2937"/><w:sz w:val="${size}"/><w:szCs w:val="${size}"/></w:rPr>`,
  );
}

function stylesXml(): string {
  const font = 'w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri" w:cs="Calibri"';
  const mono = 'w:ascii="Consolas" w:hAnsi="Consolas" w:eastAsia="Consolas" w:cs="Consolas"';
  const cellMar = '<w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar>';
  const borders = ['top', 'left', 'bottom', 'right', 'insideH', 'insideV'].map((side) => `<w:${side} ${BORDER}/>`).join('');
  const styles = [
    style('paragraph', 'Normal', 'Normal', '<w:qFormat/>', ' w:default="1"'),
    style('character', 'DefaultParagraphFont', 'Default Paragraph Font', '<w:uiPriority w:val="1"/><w:semiHidden/><w:unhideWhenUsed/>', ' w:default="1"'),
    style('table', 'TableNormal', 'Normal Table', `<w:uiPriority w:val="99"/><w:semiHidden/><w:unhideWhenUsed/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/>${cellMar}</w:tblPr>`, ' w:default="1"'),
    style('numbering', 'NoList', 'No List', '<w:uiPriority w:val="99"/><w:semiHidden/><w:unhideWhenUsed/>', ' w:default="1"'),
    style(
      'paragraph',
      'Title',
      'Title',
      '<w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:uiPriority w:val="10"/><w:qFormat/>' +
        '<w:pPr><w:spacing w:after="240" w:line="240" w:lineRule="auto"/><w:contextualSpacing/></w:pPr>' +
        '<w:rPr><w:b/><w:bCs/><w:kern w:val="28"/><w:sz w:val="48"/><w:szCs w:val="48"/></w:rPr>',
    ),
    heading(1, 32, 360),
    heading(2, 28, 280),
    heading(3, 24, 240),
    heading(4, 22, 200),
    style(
      'paragraph',
      'ListParagraph',
      'List Paragraph',
      '<w:basedOn w:val="Normal"/><w:uiPriority w:val="34"/><w:qFormat/><w:pPr><w:spacing w:after="60"/><w:ind w:left="720"/></w:pPr>',
    ),
    style(
      'paragraph',
      'Code',
      'Code',
      '<w:basedOn w:val="Normal"/><w:uiPriority w:val="99"/><w:qFormat/>' +
        '<w:pPr><w:shd w:val="clear" w:color="auto" w:fill="F3F4F6"/><w:spacing w:before="0" w:after="0" w:line="240" w:lineRule="auto"/></w:pPr>' +
        `<w:rPr><w:rFonts ${mono}/><w:noProof/><w:sz w:val="19"/><w:szCs w:val="19"/></w:rPr>`,
    ),
    style(
      'paragraph',
      'Caption',
      'caption',
      '<w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:uiPriority w:val="35"/><w:qFormat/>' +
        '<w:pPr><w:spacing w:before="120" w:after="80"/></w:pPr><w:rPr><w:b/><w:bCs/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr>',
    ),
    style(
      'table',
      'TableGrid',
      'Table Grid',
      '<w:basedOn w:val="TableNormal"/><w:uiPriority w:val="39"/>' +
        '<w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr>' +
        `<w:tblPr><w:tblBorders>${borders}</w:tblBorders></w:tblPr>`,
    ),
  ];
  return (
    XML_HEADER +
    `<w:styles xmlns:w="${W_NS}">` +
    '<w:docDefaults>' +
    `<w:rPrDefault><w:rPr><w:rFonts ${font}/><w:sz w:val="22"/><w:szCs w:val="22"/><w:lang w:val="en-US" w:eastAsia="en-US" w:bidi="ar-SA"/></w:rPr></w:rPrDefault>` +
    '<w:pPrDefault><w:pPr><w:spacing w:after="160" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault>' +
    '</w:docDefaults>' +
    styles.join('') +
    '</w:styles>'
  );
}

function settingsXml(): string {
  return (
    XML_HEADER +
    `<w:settings xmlns:w="${W_NS}">` +
    '<w:zoom w:percent="100"/><w:defaultTabStop w:val="720"/><w:characterSpacingControl w:val="doNotCompress"/>' +
    '<w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat>' +
    '</w:settings>'
  );
}

export function docToDocx(doc: ExportDoc): Uint8Array {
  const numbering = new Numbering();
  // The document is built first because it registers the lists numbering.xml describes.
  const document = documentXml(doc, numbering);
  return zipParts(
    [
      [
        '[Content_Types].xml',
        contentTypes([
          ['word/document.xml', `${MAIN}.document.main+xml`],
          ['word/styles.xml', `${MAIN}.styles+xml`],
          ['word/numbering.xml', `${MAIN}.numbering+xml`],
          ['word/settings.xml', `${MAIN}.settings+xml`],
          ['docProps/core.xml', CORE_TYPE],
          ['docProps/app.xml', APP_TYPE],
        ]),
      ],
      [
        '_rels/.rels',
        relationships([
          [REL.officeDocument, 'word/document.xml'],
          [REL.coreProps, 'docProps/core.xml'],
          [REL.appProps, 'docProps/app.xml'],
        ]),
      ],
      ['docProps/core.xml', coreProps(doc.title, doc.createdAt)],
      ['docProps/app.xml', appProps()],
      ['word/document.xml', document],
      ['word/styles.xml', stylesXml()],
      ['word/numbering.xml', numbering.xml()],
      ['word/settings.xml', settingsXml()],
      [
        'word/_rels/document.xml.rels',
        relationships([
          [REL.styles, 'styles.xml'],
          [REL.numbering, 'numbering.xml'],
          [REL.settings, 'settings.xml'],
        ]),
      ],
    ],
    doc.createdAt,
  );
}
