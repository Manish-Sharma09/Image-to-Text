---
title: "Image to Excel: turn a picture of a table into a spreadsheet"
description: "Turn a screenshot or photo of a table into an editable spreadsheet. Fix cells in a grid, paste into Excel or Google Sheets, or download XLSX or CSV."
h1: "Image to Excel"
intro: "Drop in a screenshot or photo of a table and get rows and columns you can edit, paste into Excel or Google Sheets, or download as XLSX or CSV. The image is read on your device and never uploaded."
navLabel: "Image to Excel"
order: 6
preset:
  mode: table
  export: xlsx
  sample: table
steps:
  - "Add an image of the table, then crop it so only the table and its header row are left."
  - "Compare the editable grid with the image, fixing cells and adding or removing rows and columns where needed."
  - "Copy the table and paste it into Excel or Google Sheets, where it lands in rows and columns."
  - "Or download the table as an Excel (.xlsx) or CSV file."
faq:
  - q: "Will it paste into Excel or Google Sheets as a real table?"
    a: "Yes. Copying from the grid puts each value in its own cell when you paste into Excel or Google Sheets, rather than one long block of text."
  - q: "Can I fix mistakes before exporting?"
    a: "Yes. You can edit any cell and add or remove rows and columns in the grid, then copy or download the corrected table."
  - q: "Does it work on tables without borders?"
    a: "Yes. Columns are worked out from the gaps between them, so borders aren't needed. Columns that sit very close together are the ones most likely to need splitting by hand."
  - q: "What happens to merged cells?"
    a: "A value from a merged cell, such as a heading that spans several columns, comes through in a single cell. Merge the cells again in your spreadsheet if you need the same layout."
  - q: "Are formulas kept?"
    a: "No. A picture only shows the results of formulas, so totals come through as plain numbers. Add formulas back in your spreadsheet if you need them."
  - q: "Can I extract a table from a PDF?"
    a: "Yes. Add the PDF, open the page with the table, and switch it to Table mode. Pages with real text are taken directly, and scanned pages are read with OCR."
  - q: "Is my data uploaded?"
    a: "No. The table is read in your browser, on your device, which matters for statements, price lists and other figures you'd rather keep to yourself."
related:
  - pdf-to-text
  - screenshot-to-text
  - invoice-ocr
  - image-to-json
---

Retyping a table is slow and it's easy to slip a digit. Image to Excel reads the table from a picture and gives you an editable grid of rows and columns, ready to paste into a spreadsheet or download as a file.

## Tables worth converting

- **Tables in PDFs and reports** that won't copy cleanly and come out as one jumbled column when you try
- **Dashboards and web pages** that show data but don't offer an export
- **Price lists, rate cards, timetables and schedules**, printed or on screen
- **Sports standings, results and league tables**
- **Printed tables** in books, handouts and manuals, photographed with your phone
- **Account statements and transaction lists** you need in a spreadsheet, without sending them to a website

## How Table mode finds rows and columns

Table mode lines words up into rows and finds columns from the empty space that runs down between them. That means a table doesn't need borders or grid lines to be read correctly; clean alignment matters much more than lines.

When you add an image, Image to Text App often recognizes a table on its own and shows a label such as "Looks like a table". On this page Table mode is already selected. If what you added turns out to be ordinary text, switch modes without adding the image again.

## Preparing the image

- **Crop to the table.** Titles, notes and footnotes above or below a table can confuse the column layout. Keep the header row, and leave out the rest.
- **Straighten photos of printed tables.** Columns need to run straight down the page. For a table photographed at an angle, use four-corner straightening so the rows run level and the columns run straight. Auto improve fixes a slight tilt by itself.
- **Split very large tables.** If a table is wide or long and the text is tiny, take two or three screenshots of sections at a readable size, convert each one, and stack them in your spreadsheet.

## Tables that need extra care

**Merged cells.** A heading that spans several columns, or a label that covers several rows, comes through in a single cell, often the column where it starts. After pasting, merge the cells again in Excel or Sheets if you need the original layout.

**Borderless tables with narrow gaps.** When two columns sit very close together, they can be read as one. Add a column in the grid and move the values across, or split them in your spreadsheet afterwards.

**Text that wraps inside a cell.** A long description on two lines can look like two rows. Image to Text App tries to join wrapped text back into its row. If a row still looks split, move the text up and delete the extra row.

**Invoices and receipts.** If your image is an invoice rather than a plain table, Receipt or invoice mode is usually the better choice. It reads the business name, dates and totals as well as the line items. See [invoice OCR](/invoice-ocr).

## Check the numbers before you rely on them

Values the engine was unsure about are underlined. In tables, the usual suspects are 0 and O, 1 and l, 5 and S, and 8 and B, along with decimal points and commas, which are tiny and easy to lose in a blurry image. Minus signs, and negative numbers written in brackets, are worth a second look too.

A quick check after pasting: add up a column in your spreadsheet and compare it with the total row in the original. If they match, the column is very likely right.

## XLSX, CSV, or copy and paste

- **Copy and paste** is fastest when you're adding the table to a sheet you already have open.
- **Excel (.xlsx)** is the default here, a file that opens directly in Excel.
- **CSV** is a plain format that almost anything can import, including Google Sheets and databases.

One thing to know about CSV: when Excel opens a CSV file by double-clicking, it guesses each column's type. It drops leading zeros from things like ZIP codes and account numbers and can turn some values into dates. Use Excel's From Text/CSV import to set those columns as text, or use the XLSX download instead.

The same table can also be downloaded as JSON for use in code; see [image to JSON](/image-to-json). For more depth on difficult tables, read [how to extract tables from images](/guides/how-to-extract-tables-from-images).
