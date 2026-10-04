---
title: "How to convert images into editable Word or Google Docs documents"
description: "Turn a photo, scan or screenshot into an editable Word or Google Docs document: what formatting carries over, what doesn't, and a cleanup workflow."
summary: "What survives when an image becomes a Word or Google Docs file, what you'll rebuild by hand, and a cleanup routine that gets you to a finished document fast."
published: 2026-10-03
tool: image-to-word
order: 10
---

Turning a picture of a page into a document you can edit takes two things: OCR to read the words, and some reconstruction to turn those words back into paragraphs, headings, lists and tables. The words usually come through well. The look of the page mostly doesn't.

Knowing in advance what carries over and what you'll rebuild lets you pick the fastest route and avoid fighting the formatting later.

## What carries over

A good conversion keeps the structure of a document, the parts that give it meaning:

- **Paragraphs.** Lines that wrapped in the image are joined back into flowing paragraphs, so text reflows when you edit it.
- **Headings.** Lines that stand out as headings can become real heading styles rather than bold text.
- **Lists.** Bulleted and numbered items become real lists that renumber themselves when you add an item.
- **Tables.** Rows and columns can come through as an actual table rather than text separated by spaces.
- **Reading order.** For single-column pages, the order of the text matches the page.

In Image to Text App, Document mode joins paragraphs and keeps headings and bullet and numbered lists. Tables come through when you use Table mode for that part of the page.

## What doesn't carry over

OCR identifies characters, not design. Expect to lose or redo the following:

- **Fonts and sizes.** The text takes on the default style of the document you paste it into.
- **Inline emphasis.** Bold, italic and underlined words within a sentence are usually lost.
- **Colors** of text, highlights and backgrounds.
- **Multi-column layouts, text boxes and sidebars.** These become a single stream of paragraphs, and boxed text can end up in an awkward spot.
- **Images, logos, charts and signatures.** They aren't text, so they're dropped, or a logo turns into a few stray characters.
- **Headers, footers and page numbers.** They come through as ordinary lines of text, repeated on every page.
- **Footnotes.** The note text appears as a normal paragraph, and the small reference numbers become ordinary digits stuck to the end of a word.
- **Form fields.** Blank lines and checkboxes on a form don't become fillable fields.
- **Exact spacing, indentation and line breaks**, except in code, where a code-aware mode keeps indentation.

## Rich copy, .docx, or something else?

There are several ways to move the result into a document, and each suits a different situation.

**Rich copy** is best when the text is going into a document that already exists. Copy, then paste into Word or Google Docs, and headings, lists and tables arrive as real formatting. Because the text has no font of its own, it takes on the styles of the destination, so pasting into a company template makes the headings match that template.

**A .docx file** is best when you want a standalone document to send, edit or keep. It opens in Microsoft Word and most other word processors. To work on it in Google Docs, upload it to Google Drive and open it there.

**Markdown** suits notes apps, wikis and anything that publishes to the web. Headings and lists are kept as simple text markup that's easy to edit anywhere. The [image to Markdown](/image-to-markdown) tool is set up for it.

**Plain text** is the right choice when you plan to reformat everything anyway and don't want stray structure getting in the way.

## A cleanup workflow that saves time

The order matters here. Fixing problems early, while the image is in front of you, is much faster than finding them later in a long document.

1. **Prepare the image.** Crop out anything that isn't part of the document, such as the edge of the next page, and straighten photos taken at an angle. [How to get accurate OCR results](/guides/how-to-get-accurate-ocr-results) covers this in detail.
2. **Read in the right mode.** Use Document mode for running text. If a page has a table in it, read that part as a table.
3. **Correct words before exporting.** Check flagged words with the image side by side. It's much quicker here, where clicking a line shows its spot in the image, than in Word with the image in another window.
4. **Remove page furniture.** Delete repeated headers, footers and page numbers. Find and replace handles a header that repeats on every page.
5. **Paste or export.** Use rich copy or the .docx file, as above.
6. **Apply proper styles.** Use the Heading 1, Heading 2 and Normal styles rather than bold and font sizes. That gives you the navigation pane in Word, the document outline in Google Docs, and an automatic table of contents. To clear stray formatting first, select the text and press Ctrl+Space in Word, or Ctrl+\ in Google Docs (⌘+\ on a Mac).
7. **Rebuild what OCR can't.** Insert images and logos cropped from the original, and recreate columns with Layout > Columns in Word or Format > Columns in Google Docs.
8. **Proofread.** Spell check catches non-words like "tbe". It won't catch a real word in the wrong place, such as "form" for "from", so read numbers, names and dates against the original.

## Multi-page documents

For a document photographed or scanned page by page, add all the pages at once and put them in order. In Image to Text App, the Whole document view combines every page, lets you search across them, and exports the lot as one file.

Check the joins between pages. A paragraph that runs from the bottom of one page onto the next will usually be split in two, because each page is read on its own. Join those by hand.

If you're starting from scanned PDFs rather than photos, [how to extract text from scanned documents](/guides/how-to-extract-text-from-scanned-documents) covers scanner settings and searchable PDFs, which may suit you better than an editable file. Tables get their own guide in [how to extract tables from images](/guides/how-to-extract-tables-from-images).

## When to rebuild instead of convert

Conversion works best for text-heavy documents such as letters, reports, articles and notes. For heavily designed pages like brochures, posters, menus and certificates, extract the text, then pour it into a fresh template. That's faster than trying to rebuild an exact layout from OCR output.

For forms you need to reuse, recreate the form properly in your word processor and copy the labels across. And if the document came from someone who still has the original file, asking for it beats any conversion.

When you're ready, the [image to Word](/image-to-word) tool is set up for exactly this, with rich copy for pasting and a .docx download.
