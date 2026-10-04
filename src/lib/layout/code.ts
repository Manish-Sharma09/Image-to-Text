// Code screenshots: rebuild indentation and spacing from word positions and
// undo typographic substitutions that break code.

import type { OcrPage } from '../ocr/types';
import { allWords } from '../ocr/types';
import type { Formatted } from './types';
import { TextBuilder, charWidth, cleanWord, h, median, pageSlope, straightQuotes, visualRows, type Row } from './geometry';

const LANGS: { id: string; label: string; tests: RegExp[] }[] = [
  { id: 'python', label: 'Python', tests: [/^\s*def \w+\(.*\):/m, /^\s*(from \w[\w.]* )?import \w/m, /\bself\b/, /^\s*(elif|except|with)\b.*:$/m, /\bprint\(/, /^\s*class \w+(\(.*\))?:/m] },
  { id: 'javascript', label: 'JavaScript', tests: [/\b(const|let|var) \w+\s*=/, /=>/, /\bfunction\b\s*\w*\(/, /console\.log\(/, /===|!==/, /\bimport .* from ['"]/, /\bexport (default )?(function|const|class)/] },
  { id: 'typescript', label: 'TypeScript', tests: [/:\s*(string|number|boolean|void)\b/, /\binterface \w+\s*{/, /\btype \w+\s*=/, /<\w+>\(/] },
  { id: 'java', label: 'Java', tests: [/\bpublic (static )?(class|void|int|String)\b/, /System\.out\.println/, /\bprivate final\b/, /@Override/] },
  { id: 'csharp', label: 'C#', tests: [/^\s*using System/m, /\bnamespace \w/, /Console\.WriteLine/, /\bpublic (async )?Task\b/] },
  { id: 'cpp', label: 'C/C++', tests: [/#include\s*[<"]/, /\bstd::/, /\bint main\s*\(/, /\bprintf\(/, /->\w+/] },
  { id: 'go', label: 'Go', tests: [/^package \w+/m, /\bfunc (\(\w+ \*?\w+\) )?\w+\(/, /:=/, /\bfmt\.\w+\(/] },
  { id: 'rust', label: 'Rust', tests: [/\bfn \w+\(/, /\blet mut\b/, /\w+!\(/, /\bimpl\b/, /::\w+/] },
  { id: 'php', label: 'PHP', tests: [/<\?php/, /\$\w+\s*=/, /\becho\b/, /->\w+\(/] },
  { id: 'ruby', label: 'Ruby', tests: [/^\s*def \w+[^:]*$/m, /^\s*end$/m, /\bputs\b/, /\.each do\b/] },
  { id: 'sql', label: 'SQL', tests: [/\bSELECT\b.+\bFROM\b/i, /\bWHERE\b/i, /\bINSERT INTO\b/i, /\bJOIN\b/i, /\bCREATE TABLE\b/i] },
  { id: 'html', label: 'HTML', tests: [/<\/?(div|span|html|body|head|p|a|ul|li|section|button)\b/i, /<!DOCTYPE/i, /\bclass="/] },
  { id: 'css', label: 'CSS', tests: [/^[.#]?[\w-]+\s*{/m, /^\s*[\w-]+:\s*[^;]+;$/m, /@media\b/] },
  { id: 'json', label: 'JSON', tests: [/^\s*[{[]\s*$/m, /^\s*"[\w-]+":\s/m] },
  { id: 'shell', label: 'Shell', tests: [/^\s*\$ \w/m, /\b(sudo|npm|pip|git|cd|ls|echo|curl|brew|apt)\b /, /\s\|\s*(grep|awk|sed)\b/] },
  { id: 'yaml', label: 'YAML', tests: [/^\s*[\w-]+:\s*$/m, /^\s*- [\w"']/m, /^\s*[\w-]+: [\w"']/m] },
];

export function guessLanguage(text: string): { id: string; label: string } | null {
  let best: { id: string; label: string } | null = null;
  let bestScore = 1;
  for (const l of LANGS) {
    const score = l.tests.filter((t) => t.test(text)).length;
    if (score > bestScore) {
      best = { id: l.id, label: l.label };
      bestScore = score;
    }
  }
  return best;
}

const CODE_LINE = /[{};]\s*$|^\s*(def|class|import|from|return|if|elif|else|for|while|const|let|var|function|public|private|protected|static|#include|package|func|fn|SELECT|INSERT|UPDATE|try|catch|except|switch|case|echo|print)\b|=>|::|\(\)|<\/?\w+[\s>]|^\s*[\w.$]+\(.*\);?$|^\s*\$ /;
const SYMBOLS = /[{}()[\];=<>]/g;

/** 0–1 likelihood that the text is source code or terminal output. */
export function codeScore(lines: string[]): number {
  const nonEmpty = lines.filter((l) => l.trim());
  if (nonEmpty.length < 2) return 0;
  const lineRatio = nonEmpty.filter((l) => CODE_LINE.test(l)).length / nonEmpty.length;
  const text = nonEmpty.join('\n');
  const density = (text.match(SYMBOLS)?.length ?? 0) / Math.max(1, text.replace(/\s/g, '').length);
  return Math.min(1, 0.65 * lineRatio + 0.35 * Math.min(1, density / 0.07));
}

/**
 * Character advance for monospaced text: in "word next", next.x0 − word.x0
 * spans len(word)+1 cells. The median over word pairs ignores multi-space gaps.
 */
function advance(rows: Row[]): number {
  const v: number[] = [];
  for (const r of rows) {
    for (let i = 1; i < r.words.length; i++) {
      const a = r.words[i - 1];
      v.push((r.words[i].bbox.x0 - a.bbox.x0) / ([...a.text].length + 1));
    }
  }
  return v.length >= 3 ? median(v) : charWidth(rows.flatMap((r) => r.words));
}

export function formatCode(page: OcrPage): Formatted {
  const words = allWords(page);
  const rows = visualRows(words, pageSlope(page));
  const cw = advance(rows);
  // Left margin: the smallest x shared by at least two rows, so a stray icon
  // or line number column doesn't shift everything right.
  const xs = rows.map((r) => r.bbox.x0).sort((a, b) => a - b);
  const left = xs.find((x, i) => xs.some((y, j) => j !== i && Math.abs(y - x) < cw * 0.5)) ?? xs[0] ?? 0;
  const pitch = median(rows.slice(1).map((r, i) => r.bbox.y0 - rows[i].bbox.y0)) || median(rows.map((r) => h(r.bbox))) * 1.4;

  // Snap indents to the most common step (2 or 4 spaces, usually).
  const raw = rows.map((r) => Math.max(0, Math.round((r.bbox.x0 - left) / cw)));
  const steps = raw.filter((x) => x > 0);
  const unit = steps.length ? [4, 2, 3].find((u) => steps.filter((s) => Math.abs(s - Math.round(s / u) * u) <= 1).length >= steps.length * 0.8) ?? 1 : 1;
  const indents = raw.map((x) => (unit > 1 ? Math.round(x / unit) * unit : x));

  const b = new TextBuilder();
  rows.forEach((row, i) => {
    if (i > 0) {
      const gap = row.bbox.y0 - rows[i - 1].bbox.y0;
      const blank = Math.min(2, Math.max(0, Math.round(gap / pitch) - 1));
      b.push('\n' + '\n'.repeat(blank));
    }
    b.push(' '.repeat(indents[i]));
    row.words.forEach((word, j) => {
      if (j > 0) {
        const prev = row.words[j - 1];
        const cells = Math.round((word.bbox.x0 - prev.bbox.x0) / cw) - [...prev.text].length;
        b.push(' '.repeat(Math.max(1, Math.min(40, cells))));
      }
      b.word(word, straightQuotes(cleanWord(word.text)));
    });
  });
  b.trimEnd();
  const lang = guessLanguage(b.text);
  return {
    mode: 'code',
    text: b.text,
    segments: b.segments,
    code: { language: lang?.label ?? null },
    notes: [],
  };
}
