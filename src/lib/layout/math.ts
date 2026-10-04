// Printed equations to LaTeX. On-device OCR only sees characters on a line,
// so this covers inline expressions; fractions and matrices need Enhanced.

import type { OcrPage, OcrWord } from '../ocr/types';
import { allWords } from '../ocr/types';
import type { Formatted } from './types';
import { TextBuilder, pageRows } from './geometry';

const LATEX: Record<string, string> = {
  '×': '\\times ', '÷': '\\div ', '·': '\\cdot ', '−': '-', '–': '-', '±': '\\pm ', '∓': '\\mp ',
  '≤': '\\leq ', '≥': '\\geq ', '≠': '\\neq ', '≈': '\\approx ', '≡': '\\equiv ', '∝': '\\propto ',
  '∞': '\\infty ', '√': '\\sqrt ', '∑': '\\sum ', '∏': '\\prod ', '∫': '\\int ', '∂': '\\partial ',
  '∆': '\\Delta ', 'Δ': '\\Delta ', '∇': '\\nabla ', '∈': '\\in ', '∉': '\\notin ', '⊂': '\\subset ',
  '∪': '\\cup ', '∩': '\\cap ', '→': '\\to ', '⇒': '\\Rightarrow ', '⇔': '\\Leftrightarrow ', '∀': '\\forall ', '∃': '\\exists ',
  'α': '\\alpha ', 'β': '\\beta ', 'γ': '\\gamma ', 'δ': '\\delta ', 'ε': '\\epsilon ', 'θ': '\\theta ',
  'λ': '\\lambda ', 'μ': '\\mu ', 'π': '\\pi ', 'ρ': '\\rho ', 'σ': '\\sigma ', 'τ': '\\tau ', 'φ': '\\phi ',
  'ω': '\\omega ', 'Ω': '\\Omega ', 'Σ': '\\Sigma ', 'Π': '\\Pi ', '°': '^{\\circ}',
  '²': '^{2}', '³': '^{3}', '¹': '^{1}', '⁰': '^{0}', '⁴': '^{4}', '⁵': '^{5}', '⁶': '^{6}', '⁷': '^{7}', '⁸': '^{8}', '⁹': '^{9}', 'ⁿ': '^{n}',
  '½': '\\frac{1}{2}', '¼': '\\frac{1}{4}', '¾': '\\frac{3}{4}',
};

function toLatex(word: OcrWord): string {
  const chars = [...word.text];
  const sup = new Set(word.sup ?? []);
  let out = '';
  let inSup = false;
  chars.forEach((c, i) => {
    const s = sup.has(i);
    if (s && !inSup) out += '^{';
    if (!s && inSup) out += '}';
    inSup = s;
    out += LATEX[c] ?? c;
  });
  if (inSup) out += '}';
  return out.replace(/\s+$/, '');
}

const MATH_CHARS = /[=+\-−×÷^√∑∫π≤≥≠≈±∞∂∆θαβλμσ²³]/g;

/** 0–1 likelihood that the page is mostly equations. */
export function mathScore(page: OcrPage): number {
  const words = allWords(page);
  if (!words.length) return 0;
  const text = words.map((w) => w.text).join(' ');
  const symbols = text.match(MATH_CHARS)?.length ?? 0;
  const longWords = words.filter((w) => /^\p{L}{4,}$/u.test(w.text)).length / words.length;
  const hasEq = /=|≤|≥|≈/.test(text);
  const density = symbols / Math.max(1, text.replace(/\s/g, '').length);
  if (!hasEq || longWords > 0.35) return 0;
  return Math.min(1, density / 0.12) * (1 - longWords);
}

export function formatMath(page: OcrPage): Formatted {
  const rows = pageRows(page);
  const b = new TextBuilder();
  rows.forEach((row, i) => {
    if (i > 0) b.push('\n');
    row.words.forEach((word, j) => {
      if (j > 0) b.push(' ');
      b.word(word, toLatex(word));
    });
  });
  return {
    mode: 'math',
    text: b.text,
    segments: b.segments,
    notes: ['Simple printed expressions only. Check fractions, roots and subscripts — they often need fixing by hand.'],
  };
}
