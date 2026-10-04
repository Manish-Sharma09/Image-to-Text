// Smart detection: decides what the image contains so the right reading mode
// is picked automatically. Every rule is a cheap heuristic over geometry and
// text; the user can always override the result.

import type { OcrPage, ReadMode } from '../ocr/types';
import { allLines, allWords } from '../ocr/types';
import type { ImageAnalysis } from '../image/types';
import { analyzeTable } from './table';
import { codeScore, guessLanguage } from './code';
import { receiptScore } from './receipt';
import { mathScore } from './math';
import { pageRows, rowText } from './geometry';

export type Source = 'screenshot' | 'photo' | 'scan';

export interface Detection {
  mode: ReadMode;
  source: Source;
  /** Short sentence shown to the user, e.g. "Looks like a table" (English). */
  label: string;
  /** Key of the label in the app dictionary (detection.*) and its placeholders, so it can be shown in any language. */
  key?: string;
  params?: Record<string, string | number>;
  /** 0–1 */
  confidence: number;
  scores: Partial<Record<ReadMode, number>>;
}

export function detectSource(a: ImageAnalysis | null): Source {
  if (!a) return 'scan';
  if (a.likelyScreenshot) return 'screenshot';
  if (a.likelyPhoto) return 'photo';
  return 'scan';
}

export function detect(page: OcrPage, analysis: ImageAnalysis | null): Detection {
  const source = detectSource(analysis);
  const words = allWords(page);
  if (!words.length) {
    return { mode: 'plain', source, label: 'No readable text found', key: 'none', confidence: 0, scores: {} };
  }

  const rows = pageRows(page);
  const rowTexts = rows.map(rowText);
  const scores: Partial<Record<ReadMode, number>> = {};
  const receipt = receiptScore(page);
  scores.receipt = receipt.score;
  scores.code = codeScore(rowTexts);
  const table = analyzeTable(page);
  scores.table = table.cols >= 3 ? table.score : table.cols === 2 ? table.score * 0.8 : 0;
  scores.math = mathScore(page);

  const lines = allLines(page);
  const wordsPerLine = words.length / Math.max(1, lines.length);
  const multiLineParas = page.blocks.flatMap((b) => b.paragraphs).filter((p) => p.lines.length >= 2).length;
  scores.document = words.length >= 40 && wordsPerLine >= 6 && multiLineParas >= 1 ? Math.min(1, wordsPerLine / 10) : 0;
  scores.handwriting = source === 'screenshot' ? 0 : Math.max(0, Math.min(1, (70 - page.conf) / 35));

  const pick = (mode: ReadMode, label: string, confidence: number, key: string, params?: Record<string, string | number>): Detection => ({
    mode,
    source,
    label,
    key,
    params,
    confidence: Math.min(1, confidence),
    scores,
  });

  if (receipt.score >= 0.6) {
    return receipt.invoice ? pick('receipt', 'Looks like an invoice', receipt.score, 'invoice') : pick('receipt', 'Looks like a receipt', receipt.score, 'receipt');
  }
  if (scores.code >= 0.5) {
    const lang = guessLanguage(rowTexts.join('\n'));
    const what = lang ? `${lang.label} code` : 'code';
    const shot = source === 'screenshot';
    const key = shot ? (lang ? 'codeScreenshotLang' : 'codeScreenshot') : lang ? 'codeLang' : 'code';
    return pick('code', shot ? `Looks like a screenshot of ${what}` : `Looks like ${what}`, scores.code, key, lang ? { lang: lang.label } : undefined);
  }
  if (scores.table >= 0.6) return pick('table', `Looks like a table with ${table.cols} columns`, scores.table, 'table', { n: table.cols });
  if (scores.math >= 0.5) return pick('math', 'Looks like an equation', scores.math, 'math');
  if (scores.handwriting >= 0.5 && source !== 'screenshot') {
    return pick('handwriting', 'Looks like handwriting', scores.handwriting * 0.8, 'handwriting');
  }
  if (scores.document >= 0.6) {
    return source === 'screenshot'
      ? pick('document', 'Looks like an article or document', scores.document, 'article')
      : pick('document', 'Looks like a document', scores.document, 'document');
  }
  if (source === 'screenshot') return pick('plain', 'Looks like a screenshot', 0.6, 'screenshot');
  if (source === 'photo') return pick('plain', 'Looks like a photo with text', 0.6, 'photo');
  return pick('plain', 'Looks like text', 0.6, 'text');
}
