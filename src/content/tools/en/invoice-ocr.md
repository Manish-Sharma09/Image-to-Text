---
title: "Invoice OCR: extract supplier invoice data to Excel"
description: "Pull the invoice number, dates, bill-to, tax ID, totals and line items from supplier invoices into Excel or JSON. Read on your device; invoices aren't uploaded."
h1: "Invoice OCR: get supplier invoice data into your books"
intro: "Read a scanned, photographed or PDF supplier invoice into invoice number, issue and due dates, bill-to, tax ID, totals and line items. Check them next to the image, then download an Excel sheet or JSON."
navLabel: "Invoice OCR"
order: 8
preset:
  mode: receipt
  export: xlsx
  sample: receipt
  camera: false
steps:
  - "Drop in the invoice as a PDF, scan or photo; every page of a multi-page PDF is read."
  - "Keep Read as on Receipt or invoice so the header details, totals and line items are split into separate fields."
  - "Check the invoice number, due date and total against the image, and correct anything that was misread."
  - "Download an Excel (.xlsx) file for your bills register, or JSON if you process invoices with your own scripts."
faq:
  - q: "Can it read invoices that arrive as PDF attachments?"
    a: "Yes. If a PDF page already contains selectable text, that text is taken directly without OCR, which avoids misreads. Scanned PDFs are read with OCR, page by page."
  - q: "Does it connect to my accounting software?"
    a: "No. There's no direct connection or sync with any accounting system. You download an Excel, CSV or JSON file, or copy the fields, and bring them into your software yourself."
  - q: "How many invoices can I process at once?"
    a: "A workspace holds up to 50 images, with up to 25 MB per file, and there's no daily limit. For a bigger batch, work through it in rounds."
  - q: "Can it read handwritten invoices?"
    a: "Printed invoices read best. Handwriting is harder, especially joined-up writing, so expect to check and retype handwritten amounts."
  - q: "Does it work on a phone?"
    a: "Yes. Open it in your phone's browser and use the camera to photograph a paper invoice. Lay it flat and fill the frame with the page."
  - q: "Does the same mode work for till receipts?"
    a: "Yes. Receipt or invoice mode also reads receipts and card slips, including tip, amount paid and change."
related:
  - receipt-ocr
  - image-to-excel
  - pdf-to-text
  - image-to-json
---

## For the bills that land on your desk

Accounts payable starts with typing. A supplier invoice arrives as a PDF attachment, a scan or a sheet of paper, and before it can be approved and paid, its details have to go into a spreadsheet or accounting system. Invoice OCR reads the document and lays those details out as fields next to the image, so your job becomes reviewing rather than retyping.

This page is for small business owners, bookkeepers and anyone processing supplier invoices. If you're claiming back your own spending from an employer, [receipt OCR](/receipt-ocr) is the better fit.

## The invoice details that are captured, and why they matter

Receipt or invoice mode looks for the details a payables process depends on:

- **Invoice number.** Your main defense against paying the same bill twice. Check it carefully, because a letter O read as a zero, or the other way round, can let a duplicate slip through.
- **Invoice date and due date.** The due date decides when the bill gets paid. Some invoices only state payment terms, such as "Net 30", with no due date printed. In that case, work it out from the invoice date yourself.
- **Bill-to.** Confirms the invoice is addressed to the right company, which matters if you run more than one entity or a supplier still has an old address on file.
- **Tax ID.** The supplier's VAT, GST or other tax number, which you may need on record to claim back tax.
- **Subtotal, discount, tax and total**, plus any amount already paid.
- **Supplier details**: business name, address, phone, email and website.

Line items come through with a quantity, description, unit price and amount for each line. That's what you need to match a bill against a purchase order or split it across cost codes. The coding itself is still your call: the app reads what's printed and doesn't assign accounts or categories.

## Checks to run before you enter a bill

Clear printed invoices usually read well. An invoice is also a set of numbers that have to agree with each other, which makes errors easy to spot if you look for them:

- **Each line:** quantity × unit price should equal the line amount.
- **The lines together:** line amounts should add up to the subtotal.
- **The bottom block:** subtotal minus discount plus tax should equal the total.
- **Number format:** many suppliers write 1.250,00 where you might write 1,250.00. Make sure the decimal mark is in the right place before the figure goes into your books.
- **Dates:** 04/05 means April 5 in some countries and May 4 in others. Read the date in the supplier's format, not yours.

The image sits beside the fields, so when something doesn't add up you can see what was actually printed. An overall confidence level (high, fair or low) is shown too. A high rating isn't a guarantee, so check the total and the due date on every invoice anyway.

## Excel or JSON for your books

An Excel (.xlsx) download opens straight into a spreadsheet, which suits a bills register or a workbook you later import into your accounting system. JSON fits if you process invoices with your own scripts; [image to JSON](/image-to-json) describes what the file contains. You can also copy single fields and paste them wherever they're needed.

For a month's batch, add the invoices to one workspace and review each page. Then export from the Whole document view as one file or as a ZIP with a file per invoice.

Some invoices put their line items in a dense table with extra columns, such as SKU, tax rate or a discount on each line. For those, switch Read as to Table. You get the whole grid as editable rows and columns without uploading the invoice again, the same way the [image to Excel](/image-to-excel) tool works.

## Keeping supplier invoices on your device

Invoices carry bank details, tax numbers, prices and customer names, so it matters where they're processed. Image to Text App reads them in your browser, on your own device, using the open-source Tesseract engine. The files aren't uploaded to a server.

History is off by default. If you turn it on, results stay in this browser only, and you can delete one or clear them all. One thing to watch: "Copy link" packs the extracted text into the link itself, so anyone you send that link to can read the invoice details. For what to look for in any online OCR service, see [is online OCR private?](/guides/is-online-ocr-private)
