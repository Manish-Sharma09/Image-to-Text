# Content brief

Shared reference for everyone writing site copy (tool landing pages, guides,
FAQ). Product facts here are the source of truth: never claim a feature that
isn't listed, and never invent numbers.

## Product

**Image to Text App** (imagetotextapp.com) — a free image-to-text (OCR) workspace that runs in
the browser.

### How it works (facts)

- OCR runs **on the visitor's device**, in the browser, using the open-source
  Tesseract engine compiled to WebAssembly. Images are **not uploaded** to a
  server. The engine and the language model are downloaded the first time
  (English is a few megabytes) and cached by the browser.
- No account, no sign-up, no ads, no captcha, no daily limit for on-device
  reading. Up to 50 images per workspace, 25 MB per file.
- Accuracy: clear printed text is usually read very accurately. Handwriting
  (especially joined-up cursive), blurry or dim photos, very small text and
  decorative fonts are harder. **Never** give accuracy percentages or say
  "100% accurate".

### Getting images in

- Drag and drop, file picker, **paste with Ctrl+V / ⌘V anywhere on the page**,
  paste an image link (URL), and the camera on phones.
- Formats: JPG/JPEG, PNG, WebP, GIF (first frame), BMP, TIFF (every page of a
  multi-page TIFF), HEIC/HEIF (iPhone photos), and PDF (every page; if a PDF
  page already contains selectable text, that text is taken directly without
  OCR).

### Fixing the image before reading

- **Auto improve** is on by default: it inverts light-on-dark text (dark-mode
  screenshots), enlarges small text, straightens a slight tilt, evens out
  lighting and shadows in phone photos, and boosts contrast. The steps it took
  are listed in the app.
- Manual tools: rotate, crop, straighten with four corners (perspective
  correction for photos of pages taken at an angle), brightness, contrast,
  sharpen, grayscale, invert, black & white, even out lighting, reduce noise.
- The image is shown as taken; "Show cleaned-up" switches to the processed
  image the text was read from.

### Reading modes ("Read as")

The app looks at the image and picks a mode automatically, showing a label
such as "Looks like a table" or "Looks like a screenshot of Python code". The
user can switch at any time without re-uploading.

- **Plain text** — every line as it appears.
- **Document** — paragraphs joined, headings and bullet/numbered lists kept.
- **Table** — rows and columns in an editable grid.
- **Receipt or invoice** — fields: business name, address, phone, email,
  website, receipt/invoice number, date, time, due date, bill-to, tax ID,
  subtotal, discount, tax, tip, total, amount paid, change; plus line items
  (quantity, description, unit price, amount).
- **Code** — keeps indentation and spacing, straightens curly quotes, names
  the language it recognises (Python, JavaScript, TypeScript, Java, C#, C/C++,
  Go, Rust, PHP, Ruby, SQL, HTML, CSS, JSON, shell, YAML).
- **Handwriting** — tuned preprocessing for handwritten notes; works best on
  neat print-style handwriting.
- **Math** — simple printed equations to LaTeX; fractions, matrices and
  complex layouts usually need fixing by hand.

Text cleanup options: join wrapped lines into paragraphs, re-join words split
by a hyphen at a line end.

### Languages

47 languages including English, Hindi, Spanish, French, German, Portuguese,
Italian, Dutch, Russian, Arabic, Chinese (Simplified and Traditional),
Japanese, Korean, Turkish, Vietnamese, Indonesian, Polish, Romanian, Thai,
Bengali, Marathi, Tamil, Telugu, Gujarati, Punjabi, Kannada, Malayalam, Urdu,
Persian, Hebrew, Ukrainian, Greek and more. Several languages can be read at
once (for example English + Hindi on the same image). "Auto" starts with
English plus the browser's languages and, if the text looks like a different
script, detects the script and reads it again with the right language.

### Reviewing and editing

- Image and text side by side (stacked on phones).
- Click a line of text and its spot lights up on the image; click the image
  and the cursor jumps to that text.
- Words the engine was unsure about are underlined ("words to check"), with a
  button to jump from one to the next. An overall confidence level is shown
  (high / fair / low) — never as a guarantee.
- Editor: undo/redo, find and replace, word, character and line counts.
- Tables: edit cells, add/remove rows and columns, copy (pastes into Excel or
  Google Sheets as a real table). Receipts: edit every field and item.

### Output

- Copy (rich copy keeps headings, lists and tables when pasted into Google
  Docs, Word or Sheets).
- Download as TXT, Markdown, Word (.docx), PDF, HTML, JSON, CSV, Excel (.xlsx),
  and searchable PDF (the image with an invisible, selectable text layer).
- Share: the phone share sheet, or "Copy link", which packs the text into the
  link itself (after the #) so nothing is uploaded.

### Many images

- Add many images at once; progress shows "Reading 12 of 20".
- Each image becomes a page; drag to reorder; read again, remove, copy or
  download any page.
- "Whole document" view combines every page in your order, with search across
  all pages, and exports as one file or a ZIP of separate files.

### History

- Optional and **off by default**. When switched on, results are kept only in
  this browser (on this device), never on a server. Rename, reopen, download,
  delete one or clear all.

### Keyboard

Ctrl/⌘+V paste an image · Ctrl/⌘+O open files · Ctrl/⌘+Shift+C copy all
text · Ctrl/⌘+F find · Ctrl/⌘+Enter read again · ? show all shortcuts.

## Voice and style

- Plain, specific, friendly, confident without hype. Write for a busy person
  with a screenshot, not for a search engine.
- Sentence case for headings. Active voice. Short paragraphs.
- No keyword stuffing; use the page's main phrase naturally a few times.
- No "In today's digital world", no "Look no further", no "revolutionary",
  no exclamation marks, no emoji.
- Don't invent statistics, testimonials, user counts or awards.
- Don't name or criticise competitor websites. It's fine to mention built-in
  operating system features (Live Text on iPhone/Mac, Google Lens, the Windows
  Snipping Tool's Text Actions, PowerToys Text Extractor) honestly — helping
  people is the point.
- Be honest about limits (handwriting, tiny text, low light, complex math).
- British vs American: use American English.
- Internal links use root-relative paths such as `/image-to-excel` or
  `/guides/how-ocr-works`. Only link to pages listed in the site map below.

## Site map

Tool pages (`/slug`):
`/` (image to text, home) · `/jpg-to-text` · `/png-to-text` ·
`/screenshot-to-text` · `/photo-to-text` · `/pdf-to-text` ·
`/handwriting-to-text` · `/image-to-excel` · `/receipt-ocr` · `/invoice-ocr` ·
`/image-to-word` · `/image-to-pdf` · `/image-to-markdown` · `/image-to-json` ·
`/code-screenshot-to-text`

Guides (`/guides/slug`):
`how-to-extract-text-from-a-screenshot` · `how-to-copy-text-from-an-image` ·
`how-to-convert-handwritten-notes-to-text` · `how-ocr-works` ·
`how-to-extract-tables-from-images` ·
`how-to-extract-text-from-scanned-documents` ·
`how-to-extract-text-from-a-receipt` · `how-to-get-accurate-ocr-results` ·
`is-online-ocr-private` · `how-to-convert-images-to-editable-documents`

Other: `/privacy`, `/terms`, `/about`, `/contact`, `/tools`, `/guides`.
