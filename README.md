# Image to Text App

A browser-based OCR workspace. Paste a screenshot or drop a photo, scan or PDF
and get editable text — with tables, receipts, code, documents, handwriting
and mixed languages handled properly. Text recognition runs **on the
visitor's device** (Tesseract compiled to WebAssembly), so images are never
uploaded.

Built with Astro 7 (static pages + two small API routes) and Svelte 5 islands.

## What's in it

- **One workspace, many ways in:** drag and drop, file picker, paste anywhere
  (Ctrl/⌘+V), image links, phone camera, and the phone share sheet (PWA).
  JPG, PNG, WebP, GIF, BMP, TIFF (multi-page), HEIC/HEIF and PDF (digital
  pages use their real text layer; scanned pages are OCR'd).
- **Auto improve:** dark-mode inversion, shadow/uneven-light removal, deskew,
  contrast stretch, small-text upscaling — chosen per image and listed in the
  UI. Manual crop, four-corner perspective correction, rotate and tone tools.
- **Smart detection:** the page is classified (table, receipt/invoice, code,
  document, handwriting, math, screenshot/photo) and read in the matching mode;
  the user can switch modes instantly without re-reading.
- **Structured output:** editable table grid (→ Excel/CSV), receipt and
  invoice fields with line items and a totals check, code with rebuilt
  indentation and a language label, documents with headings and lists.
- **Review:** text ↔ image linking (click a line, its region lights up; click
  the image, the cursor jumps to the text), underlined low-confidence words
  with a stepper, honest confidence level.
- **Languages:** 47, several at once. Auto mode detects other scripts on the
  doubtful lines and re-reads with the right language (e.g. English + Hindi).
- **Batch and documents:** up to 50 pages, reorderable, whole-document view
  with cross-page search, one combined export or a ZIP.
- **Exports:** TXT, Markdown, Word (.docx), PDF, searchable PDF (image +
  invisible text layer, any script), HTML, JSON, CSV, Excel (.xlsx). Rich copy
  keeps headings/lists/tables when pasting into Docs, Word or Sheets.
- **Share:** system share sheet, or a link that carries the text in its `#`
  fragment (nothing uploaded).
- **History:** optional, off by default, stored only in IndexedDB.
- **Offline:** after the first read, a service worker keeps the app and engine
  available offline.
- **Optional Enhanced reading:** when `ANTHROPIC_API_KEY` is set, a
  consent-gated cloud mode sends one page to Claude for hard handwriting,
  equations and messy layouts (daily per-visitor limit, nothing stored).

## Getting started

```sh
npm install
npm run dev            # or: npx astro dev --background
```

`npm run dev` / `npm run build` first run `scripts/vendor-ocr.mjs`, which
copies the Tesseract worker and WebAssembly cores into `public/vendor/`
(git-ignored) so the engine is served from this origin. If you start the dev
server with `astro dev --background`, run `npm run vendor` once first.

```sh
npm run build          # static pages + Node server for /api/*
npm start              # serves dist/ (PORT / HOST env vars)
npm run check          # astro check (TypeScript + Svelte)
```

### Environment

See `.env.example`.

| Variable | Purpose |
|---|---|
| `SITE_URL` | Canonical URLs and sitemap. |
| `CONTACT_EMAIL` | Address on Contact, Privacy and Terms (default `hello@imagetotextapp.com`). |
| `LEGAL_NAME` | Legal name of the operator, named in Privacy and Terms (default: the site name). |
| `ANTHROPIC_API_KEY` | Enables Enhanced reading. Leave unset for fully on-device. |
| `ENHANCED_OCR_MODEL` | Model for Enhanced reading (default `claude-opus-5-5`). |
| `ENHANCED_OCR_DAILY_LIMIT` | Enhanced reads per visitor per day (default 20). |

### Legal pages

`/privacy`, `/terms`, `/about` and `/contact` are written in
`src/i18n/ui/en.ts` and `src/i18n/legal/en.ts`, translated next to them.
When the privacy policy or terms change, update `legalUpdated` in
`src/config/site.ts` (shown as "Last updated" on both pages). Have them
reviewed for your jurisdiction before launch.

### Deploying

The Node adapter is configured (`@astrojs/node`, standalone). All pages are
prerendered; only `/api/ocr`, `/api/fetch-image` and `/share-target` run on
the server. To deploy elsewhere, swap the adapter in `astro.config.mjs`. The
site also works as a pure static deploy: link-fetching falls back to "save
the image and drop it", and Enhanced reading simply doesn't appear.

## Project layout

```
src/
  config/site.ts            brand name, URL, limits (rebrand here)
  content/tools/*.md        14 task landing pages (preset the workspace)
  content/guides/*.md       10 guides
  i18n/ui/*.ts              site text per locale (pages, header, footer)
  i18n/legal/*.ts           privacy policy and terms per locale
  components/workspace/     the Svelte app (Workspace.svelte is the root)
  components/home|site/     page sections, header, footer, FAQ
  lib/input/                file sniffing and decoding (HEIC, TIFF, PDF, links)
  lib/image/                preprocessing pipeline (runs in a Web Worker)
  lib/ocr/                  provider interface, Tesseract + Enhanced providers, languages
  lib/layout/               formatters (plain, document, table, receipt, code, math) + detection
  lib/editor/cm.ts          CodeMirror setup with image-linked word decorations
  lib/export/               all export formats (hand-rolled, no heavy deps)
  lib/store/                workspace state, history (IndexedDB), settings
  lib/server/               Enhanced reading (Claude), rate limiting
  pages/                    routes, incl. api/ocr.ts and api/fetch-image.ts
public/sw.js                offline cache + share target
scripts/vendor-ocr.mjs      copies the OCR engine into public/vendor
docs/                       research, architecture, design system, decisions
tests/                      OCR + export harnesses
```

## Testing

- `npm test` — unit tests for the layout formatters and detection, run
  against real OCR output of the sample images (`tests/fixtures/`).
- `node scripts/dev-samples.mjs [names…]` — OCRs the sample images in Node and
  prints each formatter's output and the detected type, and rewrites the
  fixtures (use `PSM=6` for `receipt`, which is read as one block).
- `tests/browser-regression.js` — with the dev server running, runs every
  sample through the real browser pipeline (see the file header).
- Export formats: `node_modules/.bin/esbuild tests/export/run.ts --bundle
  --platform=node --format=esm --outfile=node_modules/.cache/export-run.mjs &&
  node node_modules/.cache/export-run.mjs`, then `python3
  tests/export/validate.py` and `node tests/export/pdfjs-check.mjs`.

## Documentation

- `docs/research/competitor-analysis.md` — the competitor research and
  feature comparison this product was designed from.
- `docs/product-decisions.md` — what we built, what we left out, and why.
- `docs/architecture.md` — the reading pipeline and how to extend it.
- `docs/design-system.md` — visual identity and tokens.
- `docs/content-brief.md` — product facts and voice for content writers.
