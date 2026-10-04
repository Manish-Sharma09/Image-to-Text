---
title: "How to extract text from scanned documents and PDFs"
description: "Scanner settings that help OCR, multi-page scans, telling a scanned PDF from a digital one, making searchable PDFs, and archiving paper documents."
summary: "Get text out of scans: the settings that matter, multi-page tips, how to spot an image-only PDF, and how to build a searchable archive of paper documents."
published: 2026-10-03
tool: pdf-to-text
order: 6
---

A scanner takes a picture of a page. Even when it saves that picture as a PDF, the page is still an image, often called an image PDF, and you can't select, search or copy its text until OCR has read it. Getting good text out of a scan starts at the scanner, and the choices you make there are hard to undo later.

This guide covers scanner settings, multi-page documents, how to tell what kind of PDF you have, and how to keep a searchable archive.

## Scanned PDF or digital PDF?

Not every PDF needs OCR. A PDF exported from Word or a web page contains real text, and copying it is exact. A few quick checks tell you which kind you have:

- **Try to select a word.** If you can highlight individual words, the page has a text layer. If the whole page highlights as one block, or nothing happens, it's an image.
- **Search for a word you can see.** If Ctrl+F (⌘F on a Mac) finds nothing, there's no usable text.
- **Zoom right in.** Digital text stays crisp at any zoom. Scanned text turns fuzzy or blocky.

Watch for mixed PDFs, too. A contract might have typed pages followed by a scanned signature page, or a report might have scanned appendices.

A text layer can also be bad. Some PDFs were run through OCR years ago and carry an inaccurate invisible text layer, so copying gives you garbled words. Others use fonts that copy out as gibberish. In those cases, treat the page as an image: export it as a picture from your PDF viewer and read that.

Image to Text App reads every page of a PDF. Pages that already have selectable text are taken directly without OCR, and only image pages are read, so a mixed document comes out as accurately as possible. The [PDF to text](/pdf-to-text) page is set up for this.

## Scanner settings that help OCR

### Resolution

300 dpi is the usual standard for text, and it's what Tesseract's documentation recommends as a minimum. For very small print, such as footnotes, legal fine print or medicine leaflets, scan at 400 to 600 dpi. Going higher than that for normal-sized text mostly makes files bigger without improving the result.

### Color mode

Choose grayscale rather than black and white. A scanner's black-and-white mode applies one fixed cut-off at the moment of scanning: faint letters break apart, bold letters fill in, and there's no way to get the lost detail back. Grayscale keeps that information, so the OCR software can decide what's ink and what's paper.

Use color when color carries meaning: highlighted passages, colored stamps, forms with colored fields, or pages with photos you want to keep. Highlighter in particular can turn into dark gray blocks in a black-and-white scan, hiding the very text it marked.

### File format

PDF and TIFF are good choices for multi-page documents, and PNG for single pages. Avoid saving as heavily compressed JPEG, which some scanners use for their "small file" presets. JPEG compression leaves smudgy artifacts around the edges of letters, and small text suffers most.

### The physical side

Clean the scanner glass, because a single speck repeats on every page. For thin paper printed on both sides, lay a sheet of black paper behind the page to stop the reverse side showing through.

## Using your phone as a scanner

A phone works well for occasional scanning. iPhone has a document scanner built into the Notes and Files apps, and many Android phones offer one in the camera or in a document app. These modes find the page edges, flatten the perspective and save a PDF, which is usually better than a plain photo. For the photo side of things, such as light, angle and focus, see [how to get accurate OCR results](/guides/how-to-get-accurate-ocr-results).

## Scanning multi-page documents

- **Use the sheet feeder for loose pages.** Remove staples and paper clips, fan the stack so pages don't stick, and turn on two-sided (duplex) scanning for double-sided originals.
- **Count the pages.** Sheet feeders occasionally skip a page or pull two at once. Compare the page count of the scan with the original before you put the paper away.
- **Scan books on a flatbed.** Press the spine down so the lines near the binding don't curve, and expect a shadow in the inner margin. Lighting cleanup can even out the shadow, but it can't straighten curved lines.
- **Name files so they sort.** If you scan pages as separate images, number them 001, 002, 003 rather than 1, 2, 3. Otherwise page 10 sorts before page 2.

In Image to Text App, each page of a PDF or multi-page TIFF becomes a page in the workspace. You can drag pages into order, read any page again, and use the Whole document view to search across every page and export the result as one file.

## Making a searchable PDF

A searchable PDF is the original scan with an invisible text layer placed exactly over the words. It looks identical to the scan, but you can search it, select text and copy it. Your computer's file search and many cloud drives can also find it by its contents.

This is often the best format for keeping a document, because it preserves everything the paper showed, including signatures, stamps and layout, while still letting you find it by a word inside it. If you need to edit the text, export to Word or plain text instead. The [image to PDF](/image-to-pdf) tool creates searchable PDFs from images.

One caveat: OCR errors in the hidden layer are invisible. If a name was misread, searching for it won't find that page. For important lookups, try a shorter search term, like the first few letters of a surname, which is more likely to survive a single misread character.

## Archiving paper documents

A few habits keep a scanned archive useful for years:

- **Start file names with the date.** A name like `2026-03-14 Electricity bill March.pdf` sorts into date order automatically in any folder.
- **Keep folders shallow.** A handful of broad folders, such as Home, Tax, Medical and Work, are easier to search than a deep tree.
- **Consider PDF/A for long-term storage.** PDF/A is an ISO-standardized version of PDF designed for archiving. It embeds everything needed to display the file, such as fonts, so the document should still open correctly years from now. Many scanner programs and PDF tools can save in this format.
- **Back up.** A common rule of thumb is three copies, on two different kinds of storage, with one kept somewhere else.
- **Keep the paper when the paper matters.** Wills, deeds, notarized documents and some tax and legal records may need to be kept as originals. The rules vary by country and by document, so check before shredding anything important.

Scanned documents also tend to be the most sensitive files people own: IDs, bank statements, medical letters. Before you run them through any online tool, read [is online OCR private](/guides/is-online-ocr-private) for what to check.
