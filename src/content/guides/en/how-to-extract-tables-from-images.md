---
title: "How to extract tables from images into Excel or Google Sheets"
description: "Turn a photo or screenshot of a table into spreadsheet cells: how table OCR works, cropping, borderless and merged cells, checking numbers, CSV vs XLSX."
summary: "How table recognition rebuilds rows and columns from an image, how to help it, and how to check the numbers before they land in Excel or Google Sheets."
published: 2026-10-03
tool: image-to-excel
order: 5
---

Run ordinary OCR on a picture of a table and you get lines of text, with the columns separated by a few spaces if you're lucky. Paste that into Excel and everything lands in column A. To get real cells, the tool has to rebuild the table's structure, not just read its words.

This guide explains how that works, what trips it up, and how to check the result before you rely on it.

## How table recognition works

An OCR engine reports each word along with its position on the image. Table recognition uses those positions to work out where the rows and columns are.

- **Rows** come from vertical overlap. Words whose top and bottom edges line up belong to the same row. A good tool allows for a slight tilt, so a row that drifts a little across the page still holds together.
- **Columns** come from empty space. The tool looks for vertical channels of whitespace that run through most of the rows. Each strip between two channels becomes a column.
- **Lines that span the table**, like a title or a note under it, are set aside when deciding where the columns are, so they don't bridge two columns together.
- **The header row** is often recognizable as words sitting above columns of numbers.

The key point is that alignment matters more than borders. A neatly aligned table with no lines at all can come out perfectly, while a cramped table with full grid lines can still go wrong if the columns are close together.

## Crop to the table

Everything inside the image takes part in the column detection, so the most useful thing you can do is crop tightly around the table.

- **Remove what's around it.** Paragraphs above, footnotes below, page numbers, sidebars and a neighboring column of text all add words in places that confuse the column count.
- **One table per image.** If a page holds two tables, crop and read them separately.
- **Split very wide tables.** If you have to shrink a wide table to fit it in one photo, the text may become too small to read. Capture it in two halves instead, and keep an identifying column, such as names or dates, in both halves so you can line them up again in the spreadsheet.
- **Long tables across pages.** Read each page, paste the results one under another, and delete the repeated header rows.

If the table is in a phone photo taken at an angle, straighten it first. Columns that lean or converge are much harder to find than columns that run straight down the page.

## Borderless tables

Many reports and statements use no grid lines at all. These work when there's a clear gap between columns. Problems appear when there isn't:

- A left-aligned text column next to a right-aligned number column can leave only a sliver of space between them, so the two get read as one.
- Dotted leaders, like the "........" in a table of contents, are read as rows of periods.
- Alternating shaded rows reduce contrast on every other line. Converting to grayscale and raising the contrast helps.

If two columns merge, you can usually split them in the result rather than starting over. In Image to Text App's table grid you can edit cells and add or remove rows and columns before copying.

## Merged and multi-line cells

Real-world tables rarely have a perfect grid, and a few structures need fixing by hand.

- **Spanning headers.** A heading like "2026" sitting above four quarterly columns ends up in a single cell. Decide whether to repeat it in each column or turn it into a two-row header in the spreadsheet.
- **Wrapped text.** When a cell's text wraps onto a second line, it can come out as an extra row with most cells empty. Move the text up into the row above and delete the extra one.
- **Empty cells.** Blank cells are the hardest thing for position-based detection, because there's no word to measure. Check rows with gaps to make sure later values haven't shifted one column left.
- **Rotated header text** and **tables inside tables** usually need rebuilding by hand.

## Check the numbers

A table is often full of figures that someone will add up or act on, so a few minutes of checking is worth it.

- **Use the totals.** If the table has a total row, sum the column in your spreadsheet and compare. A mismatch tells you to look closer, and it's far quicker than checking every cell.
- **Count the rows.** Make sure the result has the same number of rows as the original.
- **Look for look-alike digits.** 0 and O, 1 and l and 7, 5 and S, 8 and B. A letter in a number column is an easy catch, because the spreadsheet will treat that cell as text.
- **Watch decimal points.** A faint point can vanish, turning 12.50 into 1250. A comma and a period can also swap.
- **Check negative numbers.** Minus signs are small and easy to lose. Numbers shown in parentheses, like (1,200), are read by Excel as negative, which is usually what the original meant.
- **Mind your number format.** In many countries 1.234,56 means the same as 1,234.56. If your spreadsheet is set to a different locale than the document, numbers can turn into text or the wrong value.

## Getting the table into Excel or Google Sheets

The simplest route is copy and paste. Tables copied as formatted data, such as the copy from Image to Text App's table view, paste into Excel and Google Sheets as separate cells. Click the top-left cell where you want the table and paste.

Before pasting, protect columns that spreadsheets like to "correct":

- **Leading zeros** in ZIP codes, phone numbers and account IDs are dropped when a value is treated as a number.
- **Long numbers** get turned into scientific notation, and Excel keeps only 15 significant digits, so a 16-digit ID is silently changed.
- **Short codes** like 3-4 or 1/2 can be converted into dates.

Format those columns as Text before you paste, or paste values and fix the format afterward. In Google Sheets, Ctrl+Shift+V (⌘+Shift+V on a Mac) pastes values without formatting.

## CSV or XLSX?

If you download a file rather than copy, the format matters.

**CSV** is plain text: one row per line, with commas between the cells. Almost every program can import it, which makes it the right choice for feeding data into accounting software, a database or a script. But it holds no formatting and only one sheet, and the program that opens it guesses what each value is, which is where leading zeros and dates go wrong. Characters outside basic English can also come out garbled if the program assumes the wrong text encoding. In Excel, importing through Data > From Text/CSV lets you choose UTF-8 and set column types instead of letting Excel guess.

**XLSX** is Excel's own format, and it opens directly in Excel, Google Sheets and other spreadsheet apps. Use it when people will open and work with the table.

A simple rule: XLSX for people, CSV for other programs. The [image to Excel](/image-to-excel) tool offers both, along with a copy that pastes straight into a sheet.

## Before you start, look for the source

If the table came from a PDF report or a web page, the original may contain real data. Try selecting text in the PDF, or check whether the site offers a download. If the table really only exists as an image, make the image as sharp and straight as you can; [how to get accurate OCR results](/guides/how-to-get-accurate-ocr-results) covers the details. And if you're curious about the word positions that make all of this possible, [how OCR works](/guides/how-ocr-works) explains where they come from.
