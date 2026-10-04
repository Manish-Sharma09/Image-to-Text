# Architecture

## Reading pipeline

```
input → decode → preprocess (worker) → OCR provider → script check → layout pass → detect → format → editor / grid / fields → export
```

| Stage | Where | Notes |
|---|---|---|
| Decode | `lib/input/decode.ts` | Sniffs magic bytes. Native formats via `createImageBitmap`; HEIC via libheif (loaded from a pinned CDN build only when needed); TIFF via UTIF (every page); PDF via pdf.js (every page, plus its text layer if it has one). Transparent images are flattened onto white. |
| Preprocess | `lib/image/process.ts` in `image.worker.ts` | Geometry (quarter turns, crop or four-corner perspective warp, deskew) then tone (invert, flatten lighting, levels, brightness/contrast, denoise, sharpen, threshold). `analyze.ts` measures the image once per geometry: dark background, unevenness, screenshot vs photo, glyph height and skew (from glyph-sized connected components only), and a coarse ink grid. Auto improve turns these measurements into steps. |
| OCR | `lib/ocr/*` | `OcrProvider` interface. `LocalProvider` = Tesseract.js workers (pool of 1–2), self-hosted core. `EnhancedProvider` = POST `/api/ocr` (Claude). All providers return an `OcrPage` (blocks → paragraphs → lines → words with boxes and confidence, in page coordinates). |
| Script check | `store/workspace.svelte.ts` | In Auto language mode, low-confidence lines are cropped and passed to Tesseract's OSD; a non-Latin script triggers a re-read with that language added. |
| Layout pass | same | Tesseract's automatic layout can skip right-aligned columns. If the page looks like a form/table/receipt, or recognised words leave ≥15% of the ink grid uncovered, the page is read again as one block and the better result (by confident-word count) wins. |
| Detect | `lib/layout/classify.ts` | Scores for receipt, code, table, math, document and handwriting from geometry and text; picks a mode and a label ("Looks like a table with 5 columns"). |
| Format | `lib/layout/*` | Pure functions over `OcrPage`. Every emitted word carries its box (`Segment`), which is how the editor links text to the image. Visual rows are skew-corrected using the engine's fitted baselines. |
| Edit | `lib/editor/cm.ts`, `TableEditor`, `ReceiptView` | Word boxes are CodeMirror decorations, so they map through edits. Edits are kept per mode; switching modes never loses work. |
| Export | `lib/export/*` | Hand-written OOXML (docx, xlsx), PDF writer (Helvetica/WinAnsi text PDF; searchable PDF with Tesseract's glyphless font for any script), CSV, JSON, HTML, Markdown, ZIP (fflate). |

## Extending

- **Add a language:** append to `LANGUAGES` in `lib/ocr/languages.ts`
  (`code` is the Tesseract traineddata name). Language data is fetched from
  the `@tesseract.js-data` packages on jsDelivr and cached in IndexedDB; set
  `langPath` in `lib/ocr/local.ts` to self-host it.
- **Add an OCR provider:** implement `OcrProvider` (`lib/ocr/types.ts`),
  return an `OcrPage` (set `hasGeometry: false` if you have no word boxes and
  put structured output in `structure`), and register it in
  `lib/ocr/registry.ts`.
- **Add a reading mode:** add it to `ReadMode`, write a formatter in
  `lib/layout/`, wire it into `format()` and `MODES`, and give it a score in
  `classify.ts` if it should be auto-detected.
- **Add an export format:** add a module in `lib/export/`, list it in
  `formats.ts`, and handle it in `exportDoc()`.

## Server

Only three routes run on the server (everything else is prerendered):

- `GET/POST /api/ocr` — Enhanced reading. Disabled unless
  `ANTHROPIC_API_KEY` is set. Validates type/size, applies a per-visitor
  daily limit (salted, daily-rotated IP hash held in memory), calls Claude
  with structured JSON output and server-side refusal fallbacks, stores
  nothing.
- `GET /api/fetch-image?url=` — fetches an image link for browsers blocked by
  CORS. Public http(s) only; private, loopback, link-local and metadata
  addresses are refused at DNS-resolution time (so redirects and DNS
  rebinding are covered); 25 MB / 10 s limits.
- `POST /share-target` — fallback for the PWA share target when the service
  worker isn't installed yet.

The in-memory rate limiter is per process. If you run several instances,
move it to a shared store (Redis, KV) before relying on the limit.

## Performance

- Initial JS on the home page ≈ 70 KB gzipped (Svelte runtime + workspace).
- Lazy: CodeMirror (~97 KB gz, after the first result), pdf.js, UTIF,
  libheif, exporters, Tesseract.js, fflate.
- The OCR engine (≈4 MB core + language data) starts downloading on the
  first interaction with the workspace, not on page load.
- Image processing runs in a worker; previews are capped at 1800 px.
- Motion: GSAP with ScrollTrigger and SplitText (≈47 KB gz) ships in the
  deferred page scripts; Three.js (≈130 KB gz) is imported only when the
  browser is idle, for the hero gradient, and never on pages without a hero.

## Languages

The site is published in English (default, at the root) and Spanish, Japanese,
French, German, Portuguese, Korean and Italian under `/es`, `/ja`, `/fr`, `/de`,
`/pt`, `/ko` and `/it`, following the Astro i18n recipe.

| Piece | Where |
|---|---|
| Locales, paths, `fmt`, `plural` | `src/i18n/config.ts` |
| Site text (pages, header, footer, home) | `src/i18n/ui/<locale>.ts`, typed against `en.ts` |
| App text (the workspace) | `src/i18n/app/<locale>.ts`, passed to `Workspace` as a prop |
| Tool pages and guides | `src/content/{tools,guides}/<locale>/*.md` |
| Page bodies | `src/views/*.astro`; `src/pages/*` (English) and `src/pages/[lang]/*` render them |

- A locale is published when `src/i18n/ui/<locale>.ts` exists; a tool or guide
  page exists in a locale only when its translation exists (no English
  duplicates under a locale prefix). Missing dictionary keys fall back to English.
- Every indexable page has a self-referencing canonical, reciprocal
  `hreflang` links for the languages it exists in plus `x-default` (English),
  `og:locale` with `og:locale:alternate`, and `inLanguage` in its structured
  data. The sitemap carries the same alternates.
- Internal links in translated markdown use the locale prefix (`/es/jpg-to-text`);
  links inside dictionary HTML stay as English paths and are localized when rendered.
- Check a locale with `node scripts/check-i18n.mjs <locale>`.
