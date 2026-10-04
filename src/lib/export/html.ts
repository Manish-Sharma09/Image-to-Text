// HTML: a fragment for the rich clipboard, and a standalone document for the
// .html export and the print-to-PDF fallback.

import { getLanguage } from '../ocr/languages';
import { listMarker, pageBlocks, pageTitle, type Block, type ListBlock, type TableBlock } from './blocks';
import { codeLanguageId } from './markdown';
import { parseNumericCell } from './numbers';
import type { ExportDoc, ExportPage } from './types';
import { escapeXml as esc } from './xml';

// Inline so tables keep their grid when pasted into Word, Docs or email.
const CELL_STYLE = 'border:1px solid #bbb;padding:4px 8px;vertical-align:top';
const TABLE_STYLE = 'border-collapse:collapse';

const lines = (ls: string[]) => ls.map(esc).join('<br>');

function listHtml(b: ListBlock): string {
  const items = b.items.map((item) => `<li>${lines(item)}</li>`).join('');
  if (b.style === 'bullet') return `<ul>${items}</ul>`;
  const type = b.style === 'lower-alpha' ? ' type="a"' : b.style === 'upper-alpha' ? ' type="A"' : '';
  const start = b.start !== 1 ? ` start="${b.start}"` : '';
  // A ")" delimiter can't be expressed with <ol> attributes; spell it out.
  if (b.delimiter === ')') {
    const marked = b.items.map((item, i) => `<li value="${b.start + i}" data-marker="${esc(listMarker(b, i))}">${lines(item)}</li>`).join('');
    return `<ol class="paren"${type}${start}>${marked}</ol>`;
  }
  return `<ol${type}${start}>${items}</ol>`;
}

function tableHtml(b: TableBlock): string {
  const caption = b.caption ? `<caption>${esc(b.caption)}</caption>` : '';
  const cell = (tag: 'th' | 'td', text: string) => {
    const scope = tag === 'th' ? ' scope="col"' : '';
    const align = tag === 'td' && parseNumericCell(text) ? ';text-align:right' : '';
    return `<${tag}${scope} style="${CELL_STYLE}${align}">${lines(text.split('\n'))}</${tag}>`;
  };
  const row = (r: string[], tag: 'th' | 'td') => `<tr>${r.map((t) => cell(tag, t)).join('')}</tr>`;
  const head = b.header && b.rows.length ? `<thead>${row(b.rows[0], 'th')}</thead>` : '';
  const body = (b.header ? b.rows.slice(1) : b.rows).map((r) => row(r, 'td')).join('');
  return `<table style="${TABLE_STYLE}">${caption}${head}<tbody>${body}</tbody></table>`;
}

/** `offset` shifts heading levels, e.g. 1 when the document title is the h1. */
export function blocksToHtml(blocks: Block[], offset = 0): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case 'heading': {
          const level = Math.min(6, b.level + offset);
          return `<h${level}>${esc(b.text)}</h${level}>`;
        }
        case 'paragraph':
          return `<p>${lines(b.lines)}</p>`;
        case 'list':
          return listHtml(b);
        case 'code': {
          const lang = codeLanguageId(b.language);
          return `<pre><code${lang ? ` class="language-${esc(lang)}"` : ''}>${esc(b.text)}</code></pre>`;
        }
        case 'table':
          return tableHtml(b);
      }
    })
    .join('\n');
}

/** HTML fragment for the clipboard (text/html): headings, paragraphs, lists, tables, code. */
export function pageToHtml(page: ExportPage): string {
  return blocksToHtml(pageBlocks(page));
}

function langAttrs(page: ExportPage): string {
  const lang = page.languages?.map(getLanguage).find(Boolean);
  if (!lang) return '';
  return ` lang="${esc(lang.bcp47[0])}"${lang.rtl ? ' dir="rtl"' : ''}`;
}

const STYLE = `
:root { color-scheme: light; }
body { margin: 0; background: #fff; color: #1a1a1a; font: 16px/1.6 system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", "Noto Sans Devanagari", "Noto Sans Arabic", "Noto Sans CJK SC", sans-serif; }
main { max-width: 46rem; margin: 0 auto; padding: 2.5rem 1.25rem 4rem; }
h1, h2, h3, h4, h5, h6 { line-height: 1.25; margin: 1.6em 0 0.5em; }
h1 { font-size: 2rem; margin-top: 0; }
h2.page-title { font-size: 1.15rem; color: #555; border-bottom: 1px solid #ddd; padding-bottom: 0.3em; }
p, ul, ol, pre, table { margin: 0 0 1em; }
ol.paren { list-style: none; padding-left: 2.5em; }
ol.paren > li::before { content: attr(data-marker); display: inline-block; width: 2em; margin: 0 0.5em 0 -2.5em; text-align: right; }
pre { background: #f5f5f5; border-radius: 6px; padding: 0.9em 1em; overflow-x: auto; font: 0.875rem/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; tab-size: 4; }
table { border-collapse: collapse; font-size: 0.95rem; }
caption { caption-side: top; text-align: left; font-weight: 600; padding-bottom: 0.4em; }
th { background: #f2f2f2; text-align: left; }
section + section { margin-top: 3rem; }
@page { size: A4; margin: 18mm; }
@media print {
  main { max-width: none; padding: 0; }
  section + section { break-before: page; margin-top: 0; }
  pre { white-space: pre-wrap; overflow-wrap: anywhere; }
  thead { display: table-header-group; }
  tr, h1, h2, h3, h4 { break-inside: avoid; }
  h1, h2, h3, h4 { break-after: avoid; }
}
`.trim();

export function docToHtml(doc: ExportDoc): string {
  const title = doc.title.trim() || 'Extracted text';
  const multi = doc.pages.length > 1;
  const sections = doc.pages.map((page, i) => {
    const heading = multi ? `<h2 class="page-title">${esc(pageTitle(page, i))}</h2>\n` : '';
    return `<section${langAttrs(page)}>\n${heading}${blocksToHtml(pageBlocks(page), multi ? 2 : 1)}\n</section>`;
  });
  const docLang = doc.pages.flatMap((p) => p.languages ?? []).map(getLanguage).find(Boolean)?.bcp47[0] ?? 'en';
  return [
    '<!doctype html>',
    `<html lang="${esc(docLang)}">`,
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<meta name="generator" content="Image to Text App">',
    `<title>${esc(title)}</title>`,
    `<style>\n${STYLE}\n</style>`,
    '</head>',
    '<body>',
    '<main>',
    `<h1>${esc(title)}</h1>`,
    ...sections,
    '</main>',
    '</body>',
    '</html>',
    '',
  ].join('\n');
}
