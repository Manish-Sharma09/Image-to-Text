// Builds export documents from workspace pages.
import type { ExportDoc, ExportPage } from '../export/types';
import { allWords } from '../ocr/types';
import { imageClient } from '../image/client';
import type { Page } from './workspace.svelte';
import { i18n } from '../i18n.svelte';

export function toExportPage(page: Page): ExportPage {
  return {
    title: page.name,
    mode: page.mode,
    text: page.text,
    table: page.mode === 'table' ? (page.table ?? undefined) : undefined,
    receipt: page.mode === 'receipt' ? (page.receipt ?? undefined) : undefined,
    codeLanguage: page.formatted?.code?.language ?? null,
    languages: page.result?.languages,
  };
}

export function toExportDoc(title: string, pages: Page[]): ExportDoc {
  return { title: title || pages[0]?.name || i18n.t.names.extractedText, pages: pages.map(toExportPage), createdAt: new Date() };
}

/** Adds the page image and word boxes, needed for searchable PDFs. */
export async function withImages(doc: ExportDoc, pages: Page[]): Promise<ExportDoc> {
  const out: ExportPage[] = [];
  for (const [i, page] of pages.entries()) {
    const ep = doc.pages[i];
    if (!page.result?.hasGeometry) {
      out.push(ep);
      continue;
    }
    const r = await imageClient.process({
      pageId: page.id,
      blob: page.blob,
      adjust: $state.snapshot(page.adjust),
      mode: page.mode,
      target: 'preview',
      maxSide: Math.max(page.result.width, page.result.height),
      tone: false,
      purpose: 'export',
    });
    const c = new OffscreenCanvas(r.width, r.height);
    c.getContext('2d')!.drawImage(r.bitmap!, 0, 0);
    r.bitmap!.close();
    const blob = await c.convertToBlob({ type: 'image/jpeg', quality: 0.9 });
    const sx = r.width / page.result.width, sy = r.height / page.result.height;
    out.push({
      ...ep,
      image: { blob, width: r.width, height: r.height },
      words: allWords(page.result).map((w) => ({
        text: w.text,
        bbox: { x0: w.bbox.x0 * sx, y0: w.bbox.y0 * sy, x1: w.bbox.x1 * sx, y1: w.bbox.y1 * sy },
      })),
    });
  }
  return { ...doc, pages: out };
}
