---
title: "How to copy text from an image"
description: "The quickest ways to copy text from a photo, picture or image file on any device, which method fits which job, and how to clean up the pasted text."
summary: "A device-agnostic guide to copying text out of images: check if it's really an image, pick the right method, and fix line breaks after pasting."
published: 2026-10-03
tool: jpg-to-text
order: 2
---

Text inside an image can't be selected because, to a computer, it isn't text. It's a grid of colored dots that happen to form letters. To copy it, something has to read those dots and work out which characters they show. That process is OCR (optical character recognition), and you have more ways to run it than you might think.

This guide helps you pick the right method for the image in front of you, then shows how to get clean text out the other end.

## First, check that it's really an image

A surprising amount of "image text" is actually selectable. Spend ten seconds checking before reaching for OCR, because copying real text is always exact.

- **PDFs.** Many PDFs contain real text. Try dragging across a sentence or searching for a word. If the PDF is a scan, you'll get nothing, and OCR is the answer.
- **Web pages.** Styled headings and buttons can look like graphics but are often ordinary text. Try selecting it, or press Ctrl+F (⌘F on a Mac) and search for a word.
- **Documents and slides.** A picture pasted into a Word file or a presentation is an image, even if the text around it isn't.
- **Someone else's screenshot.** If a colleague sent a screenshot of a spreadsheet or report, asking for the original file is often faster than any conversion.

## A quick decision guide

Match the job to the method:

- **A phone number, address or sentence from a photo on your phone.** Use what's built in: Live Text on iPhone, or Google Lens and Circle to Search on Android.
- **Text from something on your computer screen.** The Snipping Tool or PowerToys on Windows, Live Text in Preview on a Mac. The [screenshot guide](/guides/how-to-extract-text-from-a-screenshot) has the steps for every platform.
- **A full page you want to edit.** Use an OCR tool that keeps paragraphs, headings and lists, and export to Word.
- **A table.** Use a tool with table recognition so the columns survive.
- **A receipt or invoice.** A receipt mode pulls out the total, date and line items instead of a wall of text.
- **A stack of images.** Use a tool that reads a batch and combines the results in order.
- **Handwriting.** Expect to review and correct more than you would with print.
- **Anything confidential.** Prefer a method that reads the image on your own device.

## Built-in tools: what they're good at

Phone and computer features like Live Text, Google Lens and the Snipping Tool share a few traits. They work right where the image is, so there's nothing to open or upload. They're fast for small amounts of text.

Their limits are just as consistent. They copy plain text only, so tables flatten into lines and headings become ordinary sentences. Language support depends on your operating system. And there's no review step, so you won't know which words the engine was unsure of until you spot the mistakes yourself.

## Using a browser-based OCR tool

A browser tool takes a bit more effort and gives you more control. The steps are much the same in most tools.

1. **Get the image in.** Drag in the file, use the file picker, or paste an image you've copied. On a phone, you can usually take a photo directly.
2. **Set the language.** OCR reads each language with its own model. If the text is in Spanish, or mixes English and Hindi, tell the tool.
3. **Choose how to read it.** Plain lines, a formatted document, a table or a receipt each produce a different result from the same image.
4. **Review the result next to the image.** Check names, numbers and anything you'll rely on.
5. **Copy or download.** Copy for a quick paste, or download a file if the text is going into a document or spreadsheet.

[Image to Text App](/) works this way without sending the image anywhere: the reading happens in your browser, it picks a reading mode for you, and it flags the words it's least sure about so you know where to look.

## Getting images out of awkward places

Sometimes the hard part is getting the picture into a tool at all.

- **An image on a web page.** Right-click it and choose Copy image, then paste. Some tools also accept the image's link: right-click, choose Copy image address, and paste that instead.
- **A picture inside a Word document or presentation.** In Microsoft Word and PowerPoint, right-click the picture and choose Save as Picture to get a separate file.
- **An iPhone photo.** iPhones save photos as HEIC by default, and some websites can't open that format. Use a tool that reads HEIC, or change the camera format in Settings.
- **An inline image in an email.** Save or download it first. Copying straight from an email client sometimes gives you a link to the image rather than the picture itself.
- **A frame from a video.** Pause on the frame, switch to full screen so the text is as large as possible, then take a screenshot.

## Cleaning up the pasted text

OCR reproduces text line by line, the way it appears in the image. That's faithful, but it often isn't what you want once the text is somewhere else.

### Broken lines

A paragraph that wrapped across five lines in the image pastes as five separate lines. Some tools can join wrapped lines into paragraphs before you copy. If yours can't, and you're working in Microsoft Word, Find and Replace can do it while keeping real paragraph breaks:

1. Replace `^p^p` (two paragraph marks) with a placeholder that doesn't appear in the text, such as `###`.
2. Replace `^p` with a single space.
3. Replace `###` with `^p`.

### Split words

A word broken by a hyphen at the end of a line in the original ("infor- mation") stays broken in the output. Search for a hyphen followed by a space and fix each one by hand, because some hyphens, like those in "well-known", are meant to stay.

### Unwanted formatting

Pasting into a document can bring along fonts and spacing from wherever you copied. Most apps have a paste-as-plain-text option, often Ctrl+Shift+V, that drops it. Use it when you only want the words.

## How much to trust the result

Clear printed text in a reasonably sharp image usually comes out very accurately. Trouble spots are predictable: numbers, names, email addresses, product codes and anything in a small or decorative font. Those are exactly the things a dictionary can't help with, and they're where a single misread character matters most.

If you're curious why OCR mixes up 0 and O, or "rn" and "m", [how OCR works](/guides/how-ocr-works) explains it in plain language. If the text you're copying is going to become a document you'll keep editing, see [how to convert images to editable documents](/guides/how-to-convert-images-to-editable-documents). And for ID cards, bank letters or anything else sensitive, it's worth reading [whether online OCR is private](/guides/is-online-ocr-private) before you choose a tool.
