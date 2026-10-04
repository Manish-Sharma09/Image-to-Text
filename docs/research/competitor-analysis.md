# Image to Text: Competitor Analysis

Internal research note. Researched 2026-10-03. We look at competitors only to learn what users expect and where the gaps are. **Do not reuse their UI, copy, branding, colors or layout.** Everything below is our own summary.

Legend used throughout: ✓ = seen on the page or in its markup · ✗ = not offered / not visible · ? = unclear · (c) = claimed in page copy but not visible in the tool UI · (u) = unverified (page could not be fetched; taken from search results or third-party text).

---

## 1. Summary

- **Five of the eleven "competitors" share one template.** imagetotext.info, imagetotext.io, jpgtotext.com, imagetotext.cc and ocr.best use the same front-end asset paths (`/web_assets/frontend/script/emd/…`), the same mode names (Simple / Formatted), the same privacy line and the same ad loader. They also link to each other. So the first page of results for "image to text" is mostly one product sold under several domains. That leaves room for a site that is actually distinct and trustworthy.
- **The basics are the same everywhere.** Every site has drag & drop or browse upload, JPG/PNG/WEBP/HEIC/PDF input, copy plus a TXT download, and some kind of batch upload. Camera capture and paste are common on the template sites.
- **The free tiers are made worse on purpose so people pay.** Captchas (Cloudflare Turnstile or reCAPTCHA), ads beside the tool, daily caps (5–50/day), 1–5 images per job, and paywalls on formatted mode, history and most export formats. The main things the paid plans sell are "No ads & captcha".
- **Privacy claims are often contradicted by the same site.** The template sites say nothing is "transmitted or stored", yet the OCR runs on their servers. imagetotext.info's own policy says uploads are deleted after 5 minutes. onlineocr.net calls itself "fully browser-based" but keeps registered users' files for a month. Only Transkribus (EU servers, no training without consent, delete anytime) and TinyWow (deleted after 1 hour) make claims that are concrete and consistent.
- **Many quality features are claimed but not visible.** Handwriting, "math detection" and "50–100+ languages" are mentioned in copy, but no site shows a language picker (except onlineocr), confidence scores, LaTeX output or a code mode. Transkribus is the only one where handwriting is the core of the product.
- **Nobody offers a proper result editor.** Results are a plain text box or a download. No site shows the image and text side by side, highlights low-confidence words, fixes broken lines or lets you reorder and merge pages.
- **SEO is done with volume, not depth.** The pattern is a flat `/x-to-y` tool farm (15–30 tools), 20–30 machine-localized copies, about 1,100–1,900 words of generic copy under the tool, and almost no structured data. Klippa is the only site with full schema (FAQPage, HowTo, SoftwareApplication, BreadcrumbList).
- **Our opening:** a fast, ad-light tool where you paste first, with honest privacy (on-device OCR where possible), no forced sign-up or captcha for normal use, a real review/edit view, and structured outputs (table → CSV/XLSX, code, Markdown). Pair it with a small set of distinct landing pages instead of a tool farm.

---

## 2. Feature comparison matrix

### 2a. Input and recognition

| Site | Drag/drop | Paste | URL | Camera | Formats | Max size (free / paid) | Batch limit (free / paid) | Languages | Auto-detect | Handwriting | Table → Excel |
|---|---|---|---|---|---|---|---|---|---|---|---|
| imagetotext.info | ✓ | ✓ | ✓ | ✓ mobile | JPG PNG GIF WEBP HEIC TIFF BMP PDF | 7 MB / 10–30 MB | 1 / 25–150; bulk page 1,000 (paid, login) | ~23 listed | implicit (no picker) | (c) | separate tool; "Formatted" mode paid |
| imagetotext.io | ✓ | (c) | (c) | ✓ | JPG PNG GIF JFIF WEBP HEIC/HEIF TIFF PDF | 7 MB / 30 MB | ? / 50 | ~19 listed | implicit | (c) | separate tool |
| Klippa (Doxis) | ? | ✗ | ✗ | ✗ | PDF JPG PNG (demo) | ? | 1 (demo) / bulk on paid platform | 150+ (c) | ? | ✗ | demo "Table" field view; XLSX on platform |
| jpgtotext.com | ✓ | ? | ✓ | ✓ | JPG PNG JFIF WEBP HEIC BMP TIFF GIF PDF | 7 MB / 30 MB | 3 or 5 (page contradicts itself) / 50 | "50+" (c) | (c) | (c) | separate tool |
| onlineocr.net | ✓ | ✗ | ✗ | ✗ | PDF TIFF JPG BMP PCX PNG GIF ZIP | 15 MB / 200 MB | 1 file, 5/hour / ZIP + multipage | 46 (manual dropdown) | ✗ | ✗ | ✓ XLSX output |
| Transkribus | ✓ | ? | ✗ | ✗ | PNG JPG (markup also HEIC, PDF) | 10 MB / platform | 1 (demo) / hundreds (platform) | 100+ (model-based) | ? | ✓ core strength | table models (paid tiers) |
| imagetotext.cc | ✓ | (c) | ✗ | ✓ | JPG PNG WEBP GIF BMP HEIC PDF TIFF | 7 MB / 5–30 MB | 1–5, 5/day (inconsistent) / 3–50 | ~24 listed | implicit | (c) | separate tool |
| ocr.best | ✓ | (c) | (c) | ✓ | JPG PNG GIF JFIF BMP HEIC WEBP TIFF PDF | ? / 10 MB | 3 / 50 | "multiple" (4 named) | ? | (c) | separate tool |
| QuillBot (u) | ✓ (u) | ? | ? | ? | JPG PNG WEBP, read-only PDF | 5 MB (u) | ? | ? | ? | (c) | ✗ |
| TinyWow | ? | ? | ✗ | ? | not shown | not shown | not shown | not shown | ? | ? | ✗ |
| imgtotext.net | ✓ | (c) | ✓ | ✓ mobile | PNG JPG GIF JFIF WEBP BMP HEIF HEIC PDF | ? / 30 MB | 5 per job, 15/day / 50 | ~17 listed; translation to 100+ | ? | (c) | separate tool |

### 2b. Output, access and business model

| Site | Math | Code | Preprocessing | Editor | Exports | History | Login required | Ads / captcha | Free limits | Privacy claim |
|---|---|---|---|---|---|---|---|---|---|---|
| imagetotext.info | ✗ | ✗ | crop, rotate | plain box | copy, TXT, DOCX, HTML, MD (bulk: PDF/DOCX/XLSX) | paid only | no (bulk: yes) | ✓ / Turnstile | 30/day guest, 50/day registered; Formatted mode paid | "nothing stored"; policy says deleted after 5 min |
| imagetotext.io | (c) | ✗ | crop (markup) | plain box | copy, TXT, HTML, MD | paid only | no | ✓ / Turnstile | daily cap (size not stated) | "nothing stored" (vague) |
| Klippa (Doxis) | ✗ | ✗ | auto-enhance (c) | read-only views (text/JSON/table) | copy, TXT; platform 20+ formats | platform | demo no; platform yes | ✗ / invisible reCAPTCHA | unclear | GDPR, ISO 27001, EU-hosted, not stored by default |
| jpgtotext.com | (c) | ✗ | crop, rotate | plain box | copy, TXT, HTML, MD | ? | no | ✓ / reCAPTCHA + Turnstile | daily cap, 3–5 per job | "nothing stored" (vague) |
| onlineocr.net | ✗ | ✗ | auto-rotate, deskew | none (copy) | TXT, DOCX, XLSX (+PDF, RTF registered) | registered (1 month) | no | ✓ / ? | 5 files/hour; 50 pages after sign-up | contradictory (see notes) |
| Transkribus | ✗ | ✗ | ✗ | demo: copy; platform: full editor | platform: TXT, DOCX, PDF, XML | platform | demo no; platform yes | ✗ / ✗ | 50 credits/month (≈50 handwritten pages) | EU (Austria), GDPR, no training without consent, delete anytime |
| imagetotext.cc | (c) | ✗ | crop (markup) | plain box | copy, TXT, Word, HTML, MD | ? | no | ✓ / Turnstile | 1–5 per job, 5/day | "nothing stored" (vague) |
| ocr.best | ✗ | ✗ | crop, rotate (c) | plain box | copy, TXT, DOC, ZIP | ? | no | ✓ / reCAPTCHA + Turnstile | 3 per job; formatted mode paid | "not stored" yet "deleted right after conversion" |
| QuillBot (u) | ✗ | ✗ | ? | ? | copy, TXT | ? | no (u) | ? | ? | ? |
| TinyWow | ✗ | ✗ | ✗ | text box | copy, download, save to Dropbox | "My Files" (1 h) | no | ✓ / reCAPTCHA | implied daily cap | files deleted after 1 hour |
| imgtotext.net | (c) | ✗ | crop | ? | free: TXT only; paid: PDF, DOC/DOCX, XLS/XLSX, CSV, RTF, ODT, HTML | ? | no | ✓ / Turnstile + reCAPTCHA | 5 per job, 15/day | "never sell or share"; no retention stated |

---

## 3. Per-site notes

**imagetotext.info**: Template family, the most complete one.
- States that it uses Tesseract (server-side). Two modes: Simple and Formatted (tables/lists/headings). Formatted is paid.
- Upload by drop, browse, paste, URL or mobile camera. Has crop, rotate and reset before converting.
- Pricing is confusing: Basic $6, Standard $9 and Business $40 per month, yearly plans, a $90 lifetime plan, plus separate API plans. Plans are measured in credits and images per submission.
- Has a bulk page (`/bulk-image-to-text`, up to 1,000 images, login and paid plan required) with combined vs. separate-file layout options and PDF/DOCX/XLSX output. This combined-output idea is worth noting.
- Native apps (iOS, Android, Windows, macOS, Snap) and a Google Workspace add-on.
- Tool farm of about 28 tools (PDF, Word, Excel, QR, barcode) and 22 localized copies with translated slugs (`/es/imagen-a-texto`).
- Web push prompt (Firebase messaging), chat widget, Snigel ad engine.

**imagetotext.io**: Template family; links to imagetotext.info.
- Says it uses Tesseract and Python libraries. Has a camera button. History is paid only.
- Plans: $6 for 10K credits, $9 for 22K, $20 for 100K per month. 50 images and 30 MB on paid plans.
- Loads extra ad-tech scripts (html-load.com, error-report.com) and web push. 17 other tools; 19 locales.

**Klippa (now Doxis)**: Enterprise lead-generation page with a small embedded demo.
- The demo is an iframe widget: one file (PDF/JPG/PNG), invisible reCAPTCHA, results shown as plain text, JSON or extracted fields. Copy and .txt download only.
- The page is mostly sales: "Book a demo" appears several times, plus claims of 99% accuracy, 150+ languages, 50+ document types, API/SDK, and GDPR/ISO 27001/EU hosting.
- Best SEO hygiene in the set: hierarchical URLs (`/en/ocr/{financial|identity|legal…}-documents/`) and full JSON-LD.
- Brand change in progress (the page header says Klippa is now Doxis), so messaging is mixed.

**jpgtotext.com**: Template family.
- Buttons for file, CAM and URL. Simple and Formatted OCR modes. Crop and rotate.
- Free tier: 7 MB, reCAPTCHA, ads. The page gives both 3 and 5 as the free batch size.
- Paid: $4.50/month (10K credits) or $43/year. Claims "50+ languages" with detection but has no picker.
- Tool farm focused on image format conversion (JPG↔PNG/SVG, HEIC to JPG). Chrome/Edge extensions mentioned (u).

**onlineocr.net**: The oldest product in the set.
- Manual language dropdown with 46 options written in upper case. Major scripts are missing (no Arabic, Hindi, Thai or Hebrew). No auto-detect.
- Output format is chosen before converting: TXT, DOCX or XLSX for guests; PDF and RTF once registered. Auto-rotate and deskew.
- Guests: 15 MB, 5 files per hour. Registered: 200 MB, ZIP, multipage, 50 free pages. Paid: $9.95/week, $29.95/month, $79.95 lifetime (page-based).
- Contradiction: it describes itself as "fully browser-based" and says nothing is stored, but also says guest files are deleted after conversion and registered output is kept for a month.
- Has an SOAP/REST API, zonal OCR and OCR by email. 14 locales.

**Transkribus**: Specialist in handwriting and historical documents, run by a European cooperative.
- Simple demo: drop one PNG/JPG up to 10 MB, no sign-up. A free account gets 50 credits a month (1 credit is about 1 handwritten page).
- Paid: Scholar €99/year, Team €449/year, Organisation custom. The full platform adds batch processing, an editor, full-text search, and TXT/DOCX/PDF/XML export.
- The clearest privacy story in the set: processed in Austria, GDPR, no training without consent, delete anytime.
- Landing pages built around user intent: `/cursive-converter`, `/kurrent-transcription`, `/suetterlin-transcription-software`, `/handwriting-to-text`, `/handwriting-ocr`. Localized image-to-text pages exist (de/es/fr/it/nl) but there are **no hreflang tags** and **no JSON-LD**.
- Minor inconsistency: the copy says "unlimited documents" but the plans are credit-capped.

**imagetotext.cc**: Template family; links to jpgtotext.com.
- The free limits contradict each other on the same page: "5 images at once, 7 MB" in the uploader, "1 image per task & 5 daily" in the pricing modal. Some paid plans cap images at 5 MB, which is below the free 7 MB.
- Plans from $4.99/week to a $49.99 "lifetime (1000 days)" plan. Shows a "Loved by 1+ million users" rating badge with no evidence. Chat widget.

**ocr.best**: Template family.
- Free: 3 images. Paid: $5, $8 and $18 per month; formatted text only on paid plans. Download as ZIP.
- Its own privacy wording contradicts itself: it says it does not store data, then says images are deleted from its database right after conversion.
- Expanding into business documents (`/invoice-ocr`, `/bank-statement-converter`). Android app.

**QuillBot** (both fetches returned 403; data from search results and one QuillBot blog post)
- Formats JPG/PNG/WEBP plus read-only PDF; claims handwriting; copy and .txt output (from the blog post). Free with no sign-up and 5 MB max (u).
- Strategic difference: OCR is a way into their writing tools (paraphraser, grammar checker) (u).
- URL patterns: `/image-tools/{tool}` and programmatic `/converter-tools/{a}-to-{b}-converter` (claims 262 formats). Snippets suggest templated text that doesn't make sense for the format (e.g., image "resolution" kept in a TXT file) (u).

**TinyWow**: A large tool farm owned by Jenni AI (250+ tools; another string says 270+).
- The OCR page is almost empty: one line of description and no FAQ. The upload widget is rendered by JavaScript, so formats, size limits and languages are not visible.
- Upload from device or Dropbox (Google Drive/OneDrive are set up in the code). reCAPTCHA and ads on the free tier. 7-day trial that asks for a credit card; price shown in INR.
- Clear retention: files are deleted after 1 hour, and a "My Files" panel has a delete-all button.
- `Product` + `AggregateRating` schema (4.5 from 3,678 reviews) on a tool page that shows no reviews. The viewport blocks pinch-zoom (`maximum-scale=1`). The HTML document alone is about 1 MB.

**imgtotext.net**
- The most upload options: drop, browse, URL, Dropbox, mobile camera, plus a crop step. Free: 5 files per job, 15 per day.
- **Only TXT is free.** PDF, Word, Excel, CSV, RTF, ODT and HTML are paid ($4.49/month, $22.49/year, $45 lifetime). Yet the same page says the tool is "completely free".
- One FAQ answer sends users to another domain (picturetotext.io) to get around the daily limit, which suggests a network of sister sites. Showed an Easter promotion banner in October. Microsoft Clarity session recording.
- Offers translation of the output (100+ languages), which is separate from the OCR languages (~17 listed).

---

## 4. Common features (table stakes we must match)

- Upload by drag & drop and browse, with a large drop zone; camera capture on mobile.
- Input formats: JPG/JPEG, PNG, WEBP, GIF, BMP, TIFF, **HEIC/HEIF** (iPhone photos) and **PDF** (multipage).
- Copy to clipboard in one click; download as **TXT** and **DOCX**.
- Several images per job, with a "download all" option.
- No account needed for basic use.
- Some layout-preserving option (the template sites' "Formatted" mode outputs HTML/Markdown).
- Works on phones: responsive layout and a camera button.
- A short "how it works" section, an FAQ, and a short privacy statement next to the tool.

---

## 5. Missing features across the market

- **Side-by-side review**: image next to text, with hover/selection linking a line of text to its region in the image. Nobody has this.
- **Confidence highlighting** for uncertain words. Nobody has this.
- **Text cleanup**: join broken lines, remove end-of-line hyphenation, choose to keep or drop line breaks, normalize whitespace and quotes.
- **A proper language control**: auto-detect *plus* a visible override and multiple languages per image. The template sites have no picker at all; onlineocr has only a manual picker.
- **Code mode** (monospace, keeps indentation) for screenshots of code. Not offered anywhere.
- **Math → LaTeX**: several sites claim "math detection" but none shows LaTeX output.
- **Free structured output**: table → CSV/XLSX, JSON, Markdown tables. Usually paid or a separate tool.
- **Combined output across a batch** in a chosen order (only imagetotext.info has it, paid and behind login), and searchable PDF output.
- **Paste as the main input**: several sites mention paste, but none makes "press Ctrl/Cmd+V anywhere" the main flow, even though screenshots are the most common input.
- **History without an account** (stored locally in the browser). History is paid on the template sites.
- **Privacy that can be checked**: no one offers on-device processing that users can confirm, and few give retention windows that match their actual architecture.
- **PWA / share target**: sharing a screenshot from a phone's share sheet straight into the tool. Not offered anywhere.
- **Accessibility statement** and keyboard-first operation. Not offered anywhere.

---

## 6. UX weaknesses observed

- **Ads around the tool**: "Advertisement" slots directly under or beside the uploader on the template sites and imgtotext.net. Ad-tech scripts slow the page (Snigel, pubfig, html-load).
- **Captchas on every free conversion** (Turnstile/reCAPTCHA), then sold back to users as a paid feature ("No ads & captcha").
- **Limits that contradict each other** on the same page (imagetotext.cc, jpgtotext), and paid plans with lower limits than the free tier.
- **Confusing pricing based on credits**: imagetotext.info has about 7 consumer plans plus API plans; credits per image are not intuitive.
- **Paywalls on basic output**: formatted mode, history and DOCX/PDF/XLSX exports are paid.
- **Extra prompts and widgets**: web push permission requests, chat widgets, star-rating/feedback widgets, newsletter modals, stale promotions.
- **Pushing users to sign up or talk to sales**: TinyWow's trial needs a card; Klippa's free demo is buried under "Book a demo" calls to action.
- **Old-fashioned settings**: onlineocr asks you to pick a language (46 options in upper case) and an output format *before* converting.
- **Many disconnected tools**: users have to work out whether they need "Image to Excel", "JPG to Word" or "Image to Text" when it could be one tool with output options.
- **Mobile and accessibility**: TinyWow blocks zoom; camera buttons on some sites are mobile-only and hidden; there is no visible keyboard focus design.
- **Unsupported claims**: "100% accuracy", "99% accuracy", "loved by 1M users", "100+ languages" (which in one case actually means translation languages).

---

## 7. Opportunities for us

1. **Trust as the main selling point.** One clear privacy statement that matches what the code actually does. If OCR runs in the browser (Tesseract.js/WASM or similar), say so and let users check it (for example, it works offline after the first load). If it runs on a server, state the exact retention window and that no data is used for training.
2. **The fastest path from screenshot to text.** Paste anywhere, recognition starts automatically, focus moves to the result, one click copies. Aim for 0–1 clicks after pasting.
3. **Review and edit as a feature.** Side-by-side view, confidence highlighting, and cleanup toggles. No competitor does this.
4. **One tool with output options instead of many tools.** Output as text, Markdown, table (CSV/XLSX), code or DOCX/PDF from the same upload.
5. **A clean free tier.** No captcha unless abuse is detected, no ads near the tool (or none at all), generous and consistent limits shown in one place.
6. **Mobile-native touches**: PWA install, share target, camera with crop and auto-rotate, and HEIC handled automatically.
7. **Performance**: Astro's static output, lazy-loaded OCR engine and language data, and minimal third-party scripts. Competitors carry heavy ad stacks.
8. **Genuine localization and accessibility**: translated UI with correct hreflang, and real keyboard/screen-reader support.

---

## 8. Features worth implementing

### MVP (launch)
1. Single main tool on the home page: drag & drop, browse, **paste (Ctrl/Cmd+V anywhere)**, mobile camera input.
2. Formats: JPG, PNG, WEBP, GIF, BMP, TIFF, HEIC/HEIF, PDF (multipage, with page range).
3. Batch of multiple images (for example 10–20 free) with per-image results **and** a combined result in a user-chosen order.
4. Language: auto-detect plus a visible override; select multiple languages; language data loaded only when needed.
5. Result panel: editable text area, image next to it on desktop and stacked on mobile, copy, download TXT / DOCX / PDF / Markdown.
6. Cleanup toggles: join lines, remove hyphenation, keep/drop line breaks.
7. Basic preprocessing: crop, rotate, automatic orientation from EXIF, optional contrast/grayscale.
8. No login, no captcha by default (rate limiting in the background; Turnstile only when abuse is detected), clear limits.
9. A truthful privacy panel and policy that state processing location, retention and training (none).
10. Accessibility (keyboard, focus, ARIA live region for progress) and performance budgets (fast LCP, no zoom lock).

### Later (phase 2+)
- Table mode → CSV/XLSX and Markdown table; layout-preserving output (headings, lists).
- Confidence highlighting, and linking text lines to their region in the image.
- Code mode (monospace, keeps indentation); math → LaTeX.
- Handwriting via a stronger model, labelled honestly as beta, with tips.
- Searchable PDF output.
- History stored locally in the browser (IndexedDB) with one-click clear; optional account sync later.
- PWA plus share target; browser extension for OCR of a selected screen region.
- Translate the output (only if quality is good); API for developers.
- Localized UI for the top markets.

---

## 9. Features and patterns to avoid

- Captchas on every conversion, and ads placed directly above, beside or below the tool.
- Absolute privacy claims that are false ("nothing is transmitted") when processing happens on a server.
- Unsupported accuracy percentages, made-up user counts, and rating schema without real, visible reviews.
- Paywalling standard exports (DOCX/PDF) or basic history.
- Contradictory or hidden limits; credit systems where the cost per image is unclear.
- A separate tool page for every input/output combination (JPG-to-Word, PNG-to-Word…) that runs the same code.
- Sister domains that copy the same tool, and FAQ answers that send users to another domain.
- Web push prompts, chat widgets, newsletter modals or rating pop-ups on first visit.
- Trials that require a card, and "book a demo" calls to action crowding out the free tool.
- Asking for language and output format *before* recognition (decide afterwards, with sensible defaults).
- Blocking pinch-zoom.

---

## 10. SEO opportunities

**What competitors do**
- URL patterns: flat `/{a}-to-{b}` tool farms (template family, imgtotext.net); `/{category}/{action}` (TinyWow: `/image/to-text`, `/pdf/to-word`); hierarchical topic paths (Klippa: `/en/ocr/{doc-type}-documents/`); programmatic converter pairs (QuillBot: `/converter-tools/{a}-to-{b}-converter`); localized slugs (`/es/imagen-a-texto`, `/de/bild-zu-text`).
- On-page content: about 1,100–1,900 words under the tool (Transkribus about 830, TinyWow almost none). The usual sequence is what it is → how to → features → use cases/personas → FAQ (5–10 questions) → blog teasers. The text is generic and repeated across sister sites.
- Localization: 19–30 hreflang locales on the template sites; Transkribus has localized pages without hreflang.
- Blogs: mostly short how-to and "what is OCR" posts, plus off-topic filler (for example, how to delete a page in Word).
- Structured data (checked in the raw HTML): Klippa has BreadcrumbList, Organization/Corporation, SoftwareApplication + AggregateRating, FAQPage and HowTo. TinyWow has Product + AggregateRating. imgtotext.net has Organization + WebPage. **All other sites have no JSON-LD.**

**Landing pages worth building** (only where the tool really changes: a preset mode, language or output)
- Screenshot to text (paste-first)
- Handwriting to text (once quality justifies it)
- Image/table to Excel/CSV
- Scanned PDF to text and searchable PDF
- Code screenshot to text
- Math to LaTeX (later)
- iPhone photo (HEIC) to text
- Per-script pages (Arabic, Devanagari, Chinese, Japanese, Cyrillic), only for languages we have tested, each with real sample images and script-specific tips.

**Guide topics**
- How to get accurate OCR (resolution, lighting, angle, contrast)
- Copying text from images with built-in tools on iPhone/Android/Windows/Mac. Being honest here builds trust and earns links.
- OCR vs ICR vs HTR
- How OCR handles tables and columns
- Is online OCR private? What to check
- Extracting text from PDFs: digital vs scanned
- OCR for accessibility (and how it differs from alt text)

**Avoiding thin doorway pages**
- Every landing page needs: a tool preset that changes behavior, unique worked examples (sample input image + output), specific tips/limitations, and an FAQ written for that intent.
- Merge format-synonym pages (JPG/JPEG/PNG to text) into one page with a formats section. Don't generate every input/output pair.
- Localize the UI and content properly, with reciprocal hreflang and self-canonicals. Don't publish machine-translated copies at scale.
- Link internally around the user's task (screenshot → table → export) instead of using a 30-link footer of unrelated converters.

**Schema plan**
- `WebApplication`/`SoftwareApplication` (offers: free) on tool pages; add `AggregateRating` only with real ratings shown on the page.
- `BreadcrumbList`, plus `Organization` and `WebSite` site-wide; `Article` on guides.
- `FAQPage`/`HowTo` are fine as semantic markup, but don't count on rich results. Since 2023 Google shows FAQ rich results only for authoritative government/health sites and no longer shows HowTo rich results.

---

## 11. Sources and verification notes

**Fetched successfully (WebFetch, plus raw HTML via curl to check markup, headings, schema, `accept` attributes, scripts):**
- https://www.imagetotext.info/ (also `/privacy-policy.php`, `/bulk-image-to-text`, `/premium`)
- https://www.imagetotext.io/
- https://www.klippa.com/en/ocr/image-to-text/ (also the embedded demo widget at `/ocr-demo-widget/` and its JS bundle)
- https://www.jpgtotext.com/
- https://www.onlineocr.net/ (also `/service/pricing`)
- https://www.transkribus.org/image-to-text (also `/pricing`)
- https://www.imagetotext.cc/
- https://www.ocr.best/image-to-text
- https://tinywow.com/image/to-text (also its tool translation-strings JS). The tool UI is rendered client-side, so formats, size and languages could not be seen.
- https://imgtotext.net/

**Failed:**
- https://quillbot.com/image-tools/image-to-text returned HTTP 403 (WebFetch and curl). The retry at https://quillbot.com/image-tools also returned 403. Fallback: the QuillBot blog post at https://quillbot.com/blog/image-tools/how-an-image-to-text-converter-works/ (fetched OK; source for formats, handwriting claim, copy/.txt) and WebSearch results.

**Unverified or low-confidence facts:**
- QuillBot: 5 MB limit, no registration, link to the paraphraser, the 262-format converter claim, and the templated converter copy (all from search snippets).
- TinyWow: OCR formats, file size, languages and free daily limit are not visible. Card-required trial and limits are inferred from UI strings in the JS. The INR price reflects our location.
- jpgtotext.com Chrome/Edge extensions (from the WebFetch summary, not visible in the raw HTML).
- "(c)" items in the matrix (handwriting, math, paste, URL) are claims in page copy that could not be confirmed in the tool UI without running conversions. **We did not upload any test images**, so accuracy was not benchmarked. Recommended next step: run 10–15 test images (screenshot, receipt, table, handwriting, code, Arabic/Hindi/CJK) on the top 4 sites.
- That the template sites share an operator is an inference from identical asset paths, ad loader, strings and cross-links. It is not confirmed.
- Prices and limits are as displayed on 2026-10-03 and may vary by region or A/B test.
