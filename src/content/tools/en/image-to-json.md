---
title: "Image to JSON: extract text, tables and receipt fields"
description: "Convert an image to JSON with the recognized text, table cells or receipt fields and line items for each page. Useful for scripts, data entry and test data."
h1: "Convert an image to JSON"
intro: "Get the text from an image as structured JSON: one entry per page with its reading mode and text, plus table cells or receipt fields and line items when the page has them. Everything is read in your browser."
navLabel: "Image to JSON"
order: 14
preset:
  mode: auto
  export: json
  sample: receipt
  camera: false
steps:
  - "Add one or more images; Read as starts on Auto and picks a mode for each image, which you can change."
  - "Switch a page to Table or to Receipt or invoice if you want cells or named fields in the JSON rather than plain text."
  - "Correct any misread text, cells or fields in the editor before you export."
  - "Download JSON for a single page, or from the Whole document view to get every page in one file."
faq:
  - q: "Can I convert many images to JSON at once?"
    a: "Yes. A workspace holds up to 50 images, at up to 25 MB per file. Download from the Whole document view to get one JSON file with every page, or a ZIP of separate files."
  - q: "Which receipt fields can appear in the JSON?"
    a: "Business name, address, phone, email, website, receipt or invoice number, date, time, due date, bill-to, tax ID, subtotal, discount, tax, tip, total, amount paid and change. Line items have a quantity, description, unit price and amount."
  - q: "Does the text keep headings and lists?"
    a: "Yes. For pages read in Document or Handwriting mode, the text uses light Markdown: # for headings, - for bullets and 1. for numbered items. Code pages keep the source code as it was read."
  - q: "Will Auto always pick the right structure?"
    a: "Not always. It shows what it thinks the image is, such as a table or a receipt, and you can switch modes without uploading again. The JSON follows the mode you choose."
  - q: "Can I get CSV or Excel instead?"
    a: "Yes. The same result downloads as CSV or Excel (.xlsx), which is simpler if you only need a table or a receipt in a spreadsheet."
related:
  - receipt-ocr
  - invoice-ocr
  - image-to-excel
  - image-to-markdown
---

## What the JSON file contains

The file describes a document made of pages, one for each image you added, in the order you put them. Every page carries the same basics, and extra detail depends on the mode it was read in:

- **Every page:** its title (taken from the file name), the mode it was read in, and its text.
- **Table pages:** the rows of the table, each a list of cells, matching the grid you see in the editor.
- **Receipt and invoice pages:** a list of fields, each with a key, a readable label and a value, plus a list of line items.
- **Code pages:** the programming language label, such as Python or SQL, when one was recognized.

The export uses the result as you left it in the editor, so corrections you make before downloading end up in the file.

## A trimmed example from a receipt

Here's what a page read in Receipt mode looks like, shortened to a few fields and items:

```json
{
  "title": "lunch-receipt",
  "createdAt": "2026-10-03T12:30:00.000Z",
  "pages": [
    {
      "title": "lunch-receipt",
      "mode": "receipt",
      "text": "Corner Cafe\n2 Flat white 3.50 7.00\n...",
      "receipt": {
        "kind": "receipt",
        "currency": "USD",
        "fields": [
          { "key": "merchant", "label": "Business", "value": "Corner Cafe" },
          { "key": "date", "label": "Date", "value": "03/14/2026" },
          { "key": "tax", "label": "Tax", "value": "1.12" },
          { "key": "total", "label": "Total", "value": "15.12" }
        ],
        "items": [
          { "description": "Flat white", "qty": "2", "unitPrice": "3.50", "amount": "7.00" },
          { "description": "Chicken wrap", "qty": "1", "unitPrice": "7.00", "amount": "7.00" }
        ]
      }
    }
  ]
}
```

The quickest way to see the complete structure is to read the sample receipt on this page and download it as JSON.

## Where image to JSON is useful

- **Expense pipelines.** Read a batch of receipts, review them, export one JSON file, and let your own script move dates and totals into a ledger or spreadsheet. The [receipt OCR page](/receipt-ocr) has tips for getting clean receipt photos.
- **Data entry.** When values from printed forms, price lists or invoices have to go into another system, named fields are easier to map than a block of text.
- **Test data.** Developers building a feature that handles receipts, tables or scanned text can use real OCR output, including its realistic mistakes, as fixtures for parsers and validation code.
- **Archiving with structure.** Keeping the mode and fields alongside the text makes old scans easier to process again later.

If what you need is rows and columns in a spreadsheet, [image to Excel](/image-to-excel) gets you there with fewer steps.

## Handling the values in your code

Values are kept as the text that was read, exactly as printed, rather than converted into numbers or dates. A date might be `03/14/2026` or `14.03.2026`, and an amount might be `1,250.00` or `1.250,00`, depending on where the receipt came from. Parse them with the formats you expect, and flag anything that doesn't fit for a person to check.

Don't assume every field is present either. A receipt without a tip line has no tip, and a faded receipt may be missing a date. Using the `key` rather than the position in the list keeps your code working when fields are absent.

It's also worth checking totals in code: line item amounts should add up to the subtotal, and subtotal plus tax, minus any discount, should match the total. A mismatch is a good sign that something was misread.

## Processed in your browser, with no API

Reading happens in your browser, on your own device, using the open-source Tesseract engine. Images aren't uploaded, and the JSON file is created on your device as well.

That also means there's no API to call and no server endpoint to send images to. Image to JSON is a manual step: you add images, check the results and download the file. It fits jobs where a person reviews the data anyway, and it isn't a way to process images automatically in the background. If you're curious about what happens between the image and the text, [how OCR works](/guides/how-ocr-works) explains it.
