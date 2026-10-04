---
title: "How to extract text from a receipt for expenses and records"
description: "Capture fading thermal receipts, pull out totals, dates and line items with OCR, verify the fields that matter, and keep records that hold up later."
summary: "Why receipts are hard to read, how to capture them before they fade, which fields to double-check, and how to fit receipt OCR into an expense routine."
published: 2026-10-03
tool: receipt-ocr
order: 7
---

Receipts look simple, but they're one of the trickier things to run through OCR. The print is small and often faint, the layout is a mix of columns and labels, and the one number you care about sits among half a dozen others. With the right capture habits and a quick check of the key fields, you can turn a pile of receipts into clean expense data.

## Why receipts are hard to read

### Thermal paper fades

Most shop and restaurant receipts are printed on thermal paper, which darkens where a heated print head touches it. The same chemistry makes it fragile. Heat, sunlight, friction and contact with some plastics and oils make the print fade or darken. A receipt left in a wallet or a hot car can become hard to read within months, and some fade badly even sooner.

### The layout is crowded

Item names sit on the left and prices on the right, joined by nothing but spaces. Names are abbreviated to fit ("ORG BNNA 2LB"). And the bottom of the receipt holds several amounts that look alike: subtotal, tax, total, amount tendered, change, and sometimes a tip line. Reading the words is only half the job; knowing which number is the total is the other half.

### The paper won't lie flat

Receipts curl, crease and crumple, and each fold casts a shadow across a line of print.

## Capture receipts early, and flat

- **Capture on the day.** The best time to photograph a receipt is before it goes in your pocket. Faded print is the one problem image editing can only partly fix.
- **Flatten it first.** Press a curled receipt under a book for a minute, or hold the ends down with two small objects. Avoid holding it with your fingers, which casts shadows and covers the edges.
- **Use a dark background.** A white receipt on a dark table has clear edges, which makes cropping and straightening easier and keeps the background from bleeding into the text.
- **Split long receipts.** A long grocery receipt shrunk to fit one photo has tiny text. Take two or three overlapping photos instead, or, if you only need the totals, photograph just the bottom section close up.
- **Rescue faded print with contrast.** Raising the contrast or switching to black and white can bring back faint gray print. Compare with the original to make sure faint digits haven't disappeared entirely.

General photo advice about lighting, focus and angle is in [how to get accurate OCR results](/guides/how-to-get-accurate-ocr-results).

## What receipt OCR extracts

A receipt reader goes beyond plain text and tries to label each piece of information. Image to Text App's Receipt or invoice mode, which the [receipt OCR](/receipt-ocr) page uses, looks for the business name, address, phone, email, website, receipt number, date, time, tax ID, subtotal, discount, tax, tip, total, amount paid and change, plus the line items with quantity, description, unit price and amount. Every field and item can be edited before you copy or download.

## The fields to always verify

However good the extraction, a few fields deserve a second look every time.

- **Total.** Confirm it picked the total rather than the subtotal, the amount tendered or the change. The quickest check is arithmetic: subtotal, minus any discount, plus tax and tip, should equal the total.
- **Date.** 03/04/2026 is March 4 in the US and 3 April in much of the world. Receipts from trips abroad are the usual culprit. Two-digit years can also be misread.
- **Tax.** Receipts may show more than one tax line, or the tax rate next to the tax amount. Make sure the amount, not the rate, ended up in the tax field.
- **Business name.** Many receipts print the shop name as a logo, which is an image rather than text. OCR may pick up a legal company name further down, or nothing at all. Type it in if needed.
- **Currency.** Symbols are small and sometimes misread: € can come out as C or E. On foreign receipts, note the currency explicitly.
- **Decimal points.** A faint point can vanish and turn 12.50 into 1250. The arithmetic check above usually catches it.
- **Handwritten amounts.** Restaurant card slips often have a handwritten tip and total. Handwriting reads less reliably than print, so check those by eye.

## Fitting receipts into an expense routine

A little structure makes receipt OCR much faster at the end of the month.

- **One receipt per image.** Several receipts in one photo get read as one, with fields mixed together.
- **Batch your receipts.** Photograph a week's receipts, add them all at once, and review them in one sitting. In Image to Text App each image becomes its own page, so you can step through them one at a time.
- **Pick the export that suits your system.** A spreadsheet with one row per receipt suits most personal and small-business tracking; download CSV or Excel. If you need to split a receipt between personal and business items, keep the line items too. JSON suits developers importing into another app.
- **Name files consistently.** Something like `2026-05-12 Hardware store 48.20.jpg` makes a receipt easy to find again without opening it.
- **Reconcile against your statement.** Matching receipts against your card or bank statement catches both OCR errors and missing receipts.

Invoices follow a similar routine with a few extra fields, such as invoice number, due date and bill-to details; the [invoice OCR](/invoice-ocr) page is set up for them. For a running spreadsheet of many receipts, [image to Excel](/image-to-excel) covers the table side.

## Keep the original image

The extracted text is a convenience, not the record. Keep the photo or scan alongside the data, because the image is what shows the receipt was real and what it said.

Rules on whether digital copies are acceptable, and how long records must be kept, vary by country and sometimes by type of expense. Many tax authorities accept clear electronic copies, but some situations call for the paper original. Check your tax authority's guidance or ask an accountant; this guide isn't tax or legal advice. Employers often have their own rules too, such as requiring the image to be attached to each claim.

If you must keep paper receipts, store them flat in an envelope away from light and heat. Don't laminate them: the heat of a laminator can turn thermal paper dark and make the print unreadable.

## Receipts and privacy

Receipts carry more personal information than they seem to: the last digits of your card, sometimes your name, a delivery address, a loyalty number. If that matters to you, choose a tool that reads the image on your own device, and crop or cover those details before sharing an image with anyone. [Is online OCR private](/guides/is-online-ocr-private) explains what to look for.
