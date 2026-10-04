# Product decisions

How the competitor research (`docs/research/competitor-analysis.md`) shaped
what was built. The short answer to "why use this instead of the ten others":
**it reads on your device, it understands what it's reading, and it gives you
a real place to check and finish the work.**

## What the market looks like

- Five of the eleven sites researched appear to be one product under several
  domains (same template, modes and ad stack).
- Free tiers are made worse on purpose: captchas, ads beside the tool,
  1–5 images per job, paywalled formatted output, history and exports.
- Privacy claims often contradict the same site's policy.
- Nobody offers side-by-side review, confidence highlighting, a code mode,
  real table editing, or combined multi-page output for free.
- SEO is a flat tool farm of near-identical pages with little structured data.

## Decisions

| Finding | What we did |
|---|---|
| Uploads + vague retention | OCR runs in the browser; the privacy page states exactly what is downloaded, uploaded (nothing) and kept (nothing unless History is on), and how to verify it (Network tab, offline). |
| Captchas, ads, daily caps | None. On-device reading costs almost nothing to serve, so the free experience is the full product. |
| "Simple / Formatted" modes, formatted paywalled | Automatic detection with a visible label, seven reading modes, switchable instantly without re-reading. |
| Plain textarea results | CodeMirror editor with word-to-image linking, words-to-check underlines and stepper, find/replace, undo; editable table grid; editable receipt fields with a totals check. |
| Language picker missing or manual-only | Auto (English + browser languages, then script detection on doubtful lines) plus a searchable multi-select of 47 languages. |
| Paste mentioned but not first-class | Ctrl/⌘+V anywhere on the page starts reading; shortcuts documented per OS on the home page. |
| Batch output scattered or paywalled | Pages in one workspace, reorderable, whole-document view with search, one export or a ZIP. |
| Exports paywalled | Nine formats free, including searchable PDF and Excel with real numbers. |
| PDF/HEIC/TIFF support uneven | All decoded in the browser; digital PDF pages skip OCR entirely. |
| Tool farm SEO | 14 landing pages, each presetting the workspace (mode, export, sample, camera) and carrying unique, task-specific content; 10 genuinely useful guides; WebApplication, FAQPage, BreadcrumbList and Article schema; no fake ratings. |

## Deliberately left out (for now)

- **Accounts, cloud sync, API.** Not needed for the core job, and every one
  of them weakens the privacy story. History lives in the browser.
- **Translation.** Useful, but a separate product; quality would depend on a
  cloud service.
- **Ads.** They were the most common UX complaint in the research.

## Localization

The whole site — pages, tool pages, guides and the workspace app — is
published in Spanish, Japanese, French, German, Portuguese (Brazil), Korean
and Italian, with search phrasing chosen per market rather than translated
word for word. The translations were produced with AI and have not yet had a
native-speaker review; have each language checked before relying on it for
anything legal (the privacy page in particular).

## Next candidates

1. More languages for the site (Hindi, Indonesian), using the same setup.
2. A Pro tier funded by server-side features only (higher Enhanced limits,
   API, team history sync) — keeping on-device reading free and unlimited.
3. Smarter table recognition using ruling lines when present; better math
   (fractions/matrices) via Enhanced.
4. A browser extension for "select an area of the screen → text".
5. Self-hosting language data (set `langPath`) to remove the last third-party
   request.

## Known limitations

- On-device handwriting recognition is good for print-style writing and weak
  for cursive; Enhanced reading (when enabled) covers this.
- Math mode handles simple inline expressions; fractions and matrices need
  manual fixes or Enhanced reading.
- The readable-text PDF export covers Western European characters; other
  scripts use the browser's print-to-PDF (the searchable PDF supports all
  scripts).
- The Enhanced reading endpoint is implemented and type-checked but has not
  been exercised against the live API in this repo (it needs a key and costs
  money per call).
