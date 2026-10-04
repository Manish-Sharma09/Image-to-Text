---
title: "Receipt OCR: scan receipts to CSV or JSON, free"
description: "Turn a receipt photo into the store name, date, tax, total and line items for your expense report. Runs in your browser, so receipts stay on your device."
h1: "Receipt OCR: turn receipt photos into expense data"
intro: "Photograph or drop in a receipt and get the business name, date, tax, total and every line item as fields you can check and edit. Download CSV for a spreadsheet or JSON for your own tools."
navLabel: "Receipt OCR"
order: 7
preset:
  mode: receipt
  export: csv
  sample: receipt
  camera: false
steps:
  - "Take a photo of the receipt on a dark, flat surface, or drop in a scan or a screenshot of an emailed receipt."
  - "Leave Read as set to Receipt or invoice so the business name, date, totals and line items land in separate fields."
  - "Compare the date, tax and total with the image beside them and correct any value that was misread."
  - "Download CSV for a spreadsheet or expense template, or JSON if you keep your own records in code."
faq:
  - q: "Are my receipts uploaded anywhere?"
    a: "No. The receipt is read on your device, in the browser, and the image isn't sent to a server. History is off by default, and if you turn it on, results are kept only in this browser."
  - q: "Can I scan a whole month of receipts at once?"
    a: "Yes. Add up to 50 images to one workspace and each receipt becomes its own page. You can review and download them one at a time, or together as one file or a ZIP."
  - q: "Does it sort receipts into expense categories?"
    a: "No. It reads what's printed on the receipt and leaves categories, cost codes and policy checks to you or your spreadsheet."
  - q: "What about a long receipt that doesn't fit in one photo?"
    a: "Take two overlapping photos rather than one where the text is tiny. Each photo becomes its own page, so check that items in the overlap aren't counted twice."
  - q: "Can I use it for emailed receipts and order confirmations?"
    a: "Yes. A screenshot works, and so does a PDF. If the PDF already contains selectable text, that text is used directly without OCR."
  - q: "Does it work on a phone?"
    a: "Yes. You can use your phone's camera straight from the browser, and iPhone HEIC photos are opened without converting them first."
  - q: "Do I need an account or an app?"
    a: "No account, sign-up or install is needed, and there's no daily limit for on-device reading."
related:
  - invoice-ocr
  - image-to-excel
  - image-to-json
  - photo-to-text
---

## From a wallet full of receipts to an expense report

Most expense forms ask for the same few details from every receipt: where you spent the money, when, how much tax was included, and the total. Copying those by hand from crumpled paper is slow and easy to get wrong, especially after a trip that left you with a dozen taxi, hotel and meal receipts.

Receipt mode reads the photo and sorts what it finds into labeled fields and line items, so you check each value against the image instead of typing it. It's built for personal spending: claiming work expenses back from an employer, tracking costs as a freelancer, or keeping a household budget. If you process supplier bills for a business, the [invoice OCR page](/invoice-ocr) covers due dates, tax IDs and bookkeeping exports.

## What a scanned receipt turns into

A receipt comes out in two parts. The fields hold the summary:

- **Business**, address and contact details from the top of the receipt
- **Date** and **time** of purchase, and the receipt number if one is printed
- **Subtotal**, **discount**, **tax**, **tip** and **total**
- **Amount paid** and **change**, from the card or cash lines at the bottom

The line items hold what you bought, each with a quantity, description, unit price and amount. For example, a line printed as `2 Flat white 3.50 7.00` is split into a quantity of 2, the description "Flat white", a unit price of 3.50 and an amount of 7.00.

You can edit every field and every item before you export, so a wrong digit is a quick fix rather than a reason to start over.

## Photographing faded thermal paper

Most till receipts are printed on thermal paper, which fades with heat, sunlight and time. Faint gray print is the most common reason receipt text gets misread, so a few habits help:

- **Capture receipts early.** A photo taken on the day of purchase beats one taken at the end of the quarter.
- **Use a dark, plain background.** White paper on a dark table stands out clearly and is easy to crop.
- **Flatten curls and folds.** Hold the ends down, or press the receipt under a book for a minute. A crease running through a row of numbers is a common cause of wrong digits.
- **Avoid glare and shadows.** Light from the side rather than straight above stops the paper from reflecting a bright spot and keeps your phone's shadow off the text.
- **Fill the frame.** Get close enough that the smallest print is easy to read on your screen.

Auto improve evens out lighting and boosts contrast on its own, and lists the steps it took. If a receipt is still faint, raise the contrast or try black & white, then switch to the cleaned-up view to make sure lighter digits haven't disappeared. A receipt photographed at an angle can be squared up with the four-corner straighten tool. There's more general advice in [how to get accurate OCR results](/guides/how-to-get-accurate-ocr-results).

## Check these numbers before you submit

Clear printed receipts usually read well, but a misread digit in a total is the mistake that matters most on an expense claim. A short check against the photo catches it:

1. **Does the total match the paper?** Compare it digit by digit with the total on the image.
2. **Do the items add up?** Line item amounts should add up to the subtotal. If they don't, an item is probably missing or misread.
3. **Is the decimal point there?** A faint or missing dot can turn 12.50 into 1250.
4. **Is the tip right?** On restaurant card slips the tip and final total are often handwritten, and handwriting is harder to read than print. Type them in if they look wrong.
5. **Is it the purchase date?** Some receipts print a second date, such as a return-by date. Make sure the date field holds the day you paid.

Words the engine was unsure about are underlined, and an overall confidence level (high, fair or low) is shown. Treat a low rating as a reason to compare every number, not just the total.

## CSV or JSON for your records

CSV opens in any spreadsheet app, so it's the easiest way to get receipt data into an expense template or a budget sheet. Excel (.xlsx) is there too if your template is a workbook. JSON suits people who keep their own scripts or tools; the [image to JSON page](/image-to-json) shows what's inside the file.

Once you've added several receipts, the Whole document view collects them in the order you choose and exports them as one file or as a ZIP of separate files. For a walkthrough from start to finish, see [how to extract text from a receipt](/guides/how-to-extract-text-from-a-receipt).
