// Table reconstruction from word geometry: rows from vertical overlap,
// columns from vertical whitespace channels shared by most rows.

import type { BBox, OcrPage, OcrWord } from '../ocr/types';
import { allWords, bboxUnion } from '../ocr/types';
import type { Formatted, TableCell, TableData } from './types';
import { cleanWord, h, median, pageSlope, visualRows, type Row } from './geometry';

interface Phrase {
  words: OcrWord[];
  bbox: BBox;
}

function phrases(row: Row, maxGap: number): Phrase[] {
  const out: Phrase[] = [];
  for (const word of row.words) {
    const last = out[out.length - 1];
    if (last && word.bbox.x0 - last.bbox.x1 <= maxGap) {
      last.words.push(word);
      last.bbox = bboxUnion([last.bbox, word.bbox]);
    } else {
      out.push({ words: [word], bbox: { ...word.bbox } });
    }
  }
  return out;
}

export interface TableAnalysis {
  table: TableData;
  /** 0–1, how table-like the page is. */
  score: number;
  cols: number;
}

const NUMERIC = /^[-+(]?[$€£₹¥]?\s?\d[\d.,:/%\s]*\)?$/;

export function analyzeTable(page: OcrPage): TableAnalysis {
  const words = allWords(page).filter((x) => x.conf > 20 || /[\p{L}\p{N}]/u.test(x.text));
  const empty: TableAnalysis = { table: { rows: [], header: false }, score: 0, cols: 0 };
  if (words.length < 4) return empty;

  const rows = visualRows(words, pageSlope(page));
  const charH = median(words.map((x) => h(x.bbox))) || 10;
  const maxGap = charH * 0.95;
  const rowPhrases = rows.map((r) => phrases(r, maxGap));

  const minX = Math.floor(Math.min(...words.map((x) => x.bbox.x0)));
  const maxX = Math.ceil(Math.max(...words.map((x) => x.bbox.x1)));
  const span = maxX - minX + 1;

  // Rows holding a single phrase (titles, notes, section labels) can bridge
  // column gaps, so they don't vote on where columns are.
  const spanning = rowPhrases.map((ps) => ps.length === 1);
  const voters = rowPhrases.filter((_, i) => !spanning[i]);
  const diff = new Int32Array(span + 1);
  for (const ps of voters) {
    for (const p of ps) {
      diff[Math.max(0, Math.floor(p.bbox.x0) - minX)]++;
      diff[Math.min(span, Math.ceil(p.bbox.x1) - minX + 1)]--;
    }
  }
  const occ = new Int32Array(span);
  let acc = 0;
  for (let i = 0; i < span; i++) {
    acc += diff[i];
    occ[i] = acc;
  }

  // Whitespace channels: runs where (almost) no row has ink.
  const tol = voters.length >= 6 ? Math.floor(voters.length * 0.1) : 0;
  const minGap = charH * 0.8;
  const cuts: number[] = [];
  let runStart = -1;
  for (let i = 0; i <= span; i++) {
    const free = i < span && occ[i] <= tol;
    if (free && runStart < 0) runStart = i;
    if (!free && runStart >= 0) {
      if (i - runStart >= minGap && runStart > 0 && i < span) cuts.push(minX + (runStart + i) / 2);
      runStart = -1;
    }
  }

  const colOf = (b: BBox) => {
    const x = (b.x0 + b.x1) / 2;
    let c = 0;
    while (c < cuts.length && x > cuts[c]) c++;
    return c;
  };

  type Cell = { words: OcrWord[] };
  let ncols = cuts.length + 1;
  let grid: Cell[][] = rowPhrases.map(() => Array.from({ length: ncols }, () => ({ words: [] as OcrWord[] })));
  rowPhrases.forEach((ps, r) => {
    for (const p of ps) grid[r][spanning[r] ? colOf({ ...p.bbox, x1: p.bbox.x0 + charH }) : colOf(p.bbox)].words.push(...p.words);
  });

  // Mixed alignment (left-aligned heading over right-aligned numbers) opens a
  // gap inside one column. Neighbouring columns that are never filled in the
  // same row are one column.
  for (let c = 0; c < ncols - 1; ) {
    const clash = grid.some((row, r) => !spanning[r] && row[c].words.length && row[c + 1].words.length);
    if (!clash) {
      grid.forEach((row) => {
        row[c].words.push(...row[c + 1].words);
        row.splice(c + 1, 1);
      });
      ncols--;
    } else {
      c++;
    }
  }

  // Merge wrapped cell text: a row that leaves the first column empty, fills
  // few cells and sits tight under the previous row continues that row.
  const merged: Cell[][] = [];
  grid.forEach((cells, r) => {
    const prev = merged[merged.length - 1];
    const filled = cells.filter((c) => c.words.length).length;
    const gap = r > 0 ? rows[r].bbox.y0 - rows[r - 1].bbox.y1 : Infinity;
    if (prev && ncols > 2 && !cells[0].words.length && filled < Math.ceil(ncols / 2) && gap < charH * 0.45) {
      cells.forEach((c, i) => prev[i].words.push(...c.words));
      return;
    }
    merged.push(cells);
  });
  grid = merged;

  const toCell = (cell: Cell): TableCell => {
    if (!cell.words.length) return { text: '', bbox: null, conf: 100 };
    // Reading order inside a cell: same visual line left to right, then down.
    const ws = cell.words.sort((a, b) => {
      const dy = (a.bbox.y0 + a.bbox.y1 - b.bbox.y0 - b.bbox.y1) / 2;
      return Math.abs(dy) < Math.min(h(a.bbox), h(b.bbox)) * 0.5 ? a.bbox.x0 - b.bbox.x0 : dy;
    });
    return {
      text: ws.map((x) => cleanWord(x.text)).join(' '),
      bbox: bboxUnion(ws.map((x) => x.bbox)),
      conf: ws.reduce((a, x) => a + x.conf, 0) / ws.length,
    };
  };
  let table: TableCell[][] = grid.map((row) => row.map(toCell));

  // Leading one-cell rows above a multi-column table are its title.
  let caption: string | undefined;
  const firstMulti = table.findIndex((r) => r.filter((c) => c.text).length >= 2);
  if (firstMulti > 0 && firstMulti <= 2 && ncols > 1) {
    caption = table.slice(0, firstMulti).map((r) => r.filter((c) => c.text).map((c) => c.text).join(' ')).join(' ');
    table = table.slice(firstMulti);
  }
  const cols = ncols;

  const filledRows = table.filter((r) => r.filter((c) => c.text).length >= 2).length;
  const filledCells = table.flat().filter((c) => c.text);
  const avgLen = filledCells.reduce((a, c) => a + c.text.length, 0) / Math.max(1, filledCells.length);
  const numeric = filledCells.filter((c) => NUMERIC.test(c.text)).length / Math.max(1, filledCells.length);
  let score = (filledRows / Math.max(1, table.length)) * Math.min(1, (cols - 1) / 2);
  if (avgLen > 32) score *= 0.35;
  if (table.length < 3) score *= 0.5;
  if (numeric > 0.25) score = Math.min(1, score * 1.15);

  const first = table[0] ?? [];
  const firstFilled = first.filter((c) => c.text);
  const bodyNumeric = table.slice(1).some((r) => r.some((c) => NUMERIC.test(c.text)));
  const header =
    table.length > 2 &&
    firstFilled.length >= Math.max(2, Math.ceil(cols / 2)) &&
    firstFilled.every((c) => !NUMERIC.test(c.text)) &&
    (bodyNumeric || first.every((c) => c.text.length < 24));

  return { table: { rows: table, header, caption }, score, cols };
}

export function tableToTsv(t: TableData): string {
  return t.rows.map((r) => r.map((c) => c.text.replace(/[\t\n]+/g, ' ')).join('\t')).join('\n');
}

export function tableToMarkdown(t: TableData): string {
  if (!t.rows.length) return '';
  const cols = Math.max(...t.rows.map((r) => r.length));
  const esc = (s: string) => s.replace(/\|/g, '\\|').replace(/\n/g, ' ');
  const line = (r: TableCell[]) => '| ' + Array.from({ length: cols }, (_, i) => esc(r[i]?.text ?? '')).join(' | ') + ' |';
  const head = t.header ? t.rows[0] : Array.from({ length: cols }, () => ({ text: '', bbox: null, conf: 100 }));
  const body = t.header ? t.rows.slice(1) : t.rows;
  return [line(head), '| ' + Array(cols).fill('---').join(' | ') + ' |', ...body.map(line)].join('\n');
}

export function formatTable(page: OcrPage): Formatted {
  const { table } = analyzeTable(page);
  const notes: string[] = [];
  if (table.rows.length && Math.max(...table.rows.map((r) => r.length)) < 2) {
    notes.push('Only one column was found. If this is a table, try cropping to just the table.');
  }
  return { mode: 'table', text: tableToTsv(table), segments: [], table, notes };
}
