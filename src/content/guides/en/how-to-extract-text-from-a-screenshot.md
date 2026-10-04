---
title: "How to extract text from a screenshot on any device"
description: "Copy text out of a screenshot on Windows, Mac, iPhone, Android or Chromebook with built-in tools, and know when a dedicated OCR tool saves time."
summary: "Built-in ways to copy text from a screenshot on every major platform, plus what to do with several screenshots, tables, code and website captures."
published: 2026-10-03
tool: screenshot-to-text
order: 1
---

A screenshot turns text into a picture of text. The chat message, error dialog or slide you captured was readable a moment ago, but now it's pixels, and getting the words back out takes OCR (optical character recognition). The good news is that every major operating system now has some form of it built in.

This guide covers the built-in route on each platform first, then the situations where a dedicated tool is quicker.

Before you start, check whether you need a screenshot at all. If the text is on a web page or in a document, try selecting it, or press Ctrl+F (⌘F on a Mac) and search for a word you can see. If the search finds it, the text is real and plain copy and paste will be more accurate than any OCR.

## Windows

### Snipping Tool's text extractor

Recent versions of the Snipping Tool on Windows 11 can copy text from any part of the screen without saving an image.

1. Press Windows+Shift+S to open the capture bar.
2. Choose the text extractor option in the bar.
3. Drag a box around the text.
4. Select the lines you want and copy them, or choose Copy all text.

The More options menu can remove line breaks from what you copy, or copy everything automatically as soon as you finish the selection. If the option is missing, update the Snipping Tool from the Microsoft Store.

### Text actions on a screenshot you already took

For a screenshot that already exists, open it in the Snipping Tool (after a fresh capture, click the notification that pops up). Select Text actions in the toolbar and the tool highlights every piece of text it found. Select part of it and copy, or use Copy all text.

Text actions also offers Quick redact, which covers email addresses and phone numbers. That's handy when you're sharing the image itself rather than the text. Microsoft says this text recognition runs locally on your device.

### PowerToys Text Extractor

PowerToys is a free set of utilities from Microsoft for Windows 10 and 11. Once it's installed, press Windows+Shift+T anywhere, drag over the text, and it goes straight to your clipboard. You can change the shortcut in the PowerToys settings.

Text Extractor relies on the OCR languages installed in Windows. To read, say, Hindi or Japanese, add that language in the Windows language settings first, including its text recognition component, then pick it from the dropdown when the extractor opens.

## Mac

Live Text, built into macOS since Monterey, reads text in images in Preview, Photos, Quick Look and Safari. The fastest route skips saving a file:

1. Press Command+Control+Shift+4 and drag over the text. Holding Control copies the screenshot to the clipboard instead of saving it to the desktop.
2. Open Preview and choose File > New from Clipboard.
3. Move the pointer over the text until it becomes a text cursor, drag to select, and press Command+C.

If the screenshot is already saved, select it in Finder and press Space to open Quick Look. You can select and copy text right in the preview without opening another app.

## iPhone and iPad

Live Text works on screenshots as well as camera photos, on iPhone XS and later and on recent iPads.

- Open the screenshot in Photos, or tap the thumbnail right after you take it.
- Touch and hold a word, drag the grab points over the text you want, and tap Copy.
- To take everything at once, tap the Live Text button in the corner of the image, then tap Copy All.

## Android

### Circle to Search

On many recent Android phones, including Pixel and Samsung Galaxy models, long-press the home button or the navigation handle at the bottom of the screen to start Circle to Search. Tap a word or drag across the text to highlight it, then tap Copy. Because it reads whatever is on screen, you often don't need to take a screenshot first. It won't work in apps that block screen capture, which includes many banking apps.

### Google Lens in Google Photos

For a screenshot you've already saved, open it in Google Photos and tap Lens. When the scan finishes, select the text you want, or select all, and tap Copy text. On recent Samsung Galaxy phones, the Gallery app also shows a text icon when it finds text in a picture.

## Chromebook

Press Ctrl+Shift+Show windows to take a partial screenshot. On Chromebook Plus models, the Text capture feature adds a More actions button after you select an area, with Copy text and options such as sending a detected table to Google Sheets. Google's help page notes that Text capture sends the selected area to Google's servers for processing.

On any Chromebook, you can also right-click an image in Chrome, choose Search with Google Lens, and select text from the result.

## Copying text from a website screenshot

Screenshots of web pages have their own quirks, and a little preparation makes a real difference.

- **Zoom in before you capture.** Browser zoom (Ctrl and + or ⌘ and +) makes the letters bigger in the screenshot. That helps OCR far more than enlarging the image afterward, which can't add detail that wasn't captured.
- **Copy images directly.** Banners, infographics and charts are images on the page. Right-click and choose Copy image, then paste it into your OCR tool instead of screenshotting the whole page around it.
- **Watch out for dark mode.** Light text on a dark background trips up many OCR engines. Switch the site to its light theme before capturing, or use a tool that inverts the image for you.
- **Avoid one giant scrolling screenshot.** A full-page capture of a long article gets scaled down, and the text shrinks with it. Several screen-sized captures read better.
- **Don't send screenshots through chat apps to move them.** Messaging apps often compress images, which softens small text. Transfer the file directly instead.

## When a dedicated tool is better

Built-in features are excellent for grabbing a sentence or a phone number. They're less helpful when the job is bigger.

- **You have several screenshots.** A long chat thread or a document captured screen by screen means copying and stitching many separate results. A tool that reads a batch of images in order and combines them saves that step.
- **The screenshot is a table.** Built-in tools give you lines of text, so the columns collapse when you paste. Table recognition keeps rows and columns, so the result pastes into Excel or Google Sheets as real cells. See [how to extract tables from images](/guides/how-to-extract-tables-from-images).
- **It's code.** Indentation carries meaning in Python and YAML, and curly quotes break most code. A [code screenshot reader](/code-screenshot-to-text) keeps the spacing and straightens the quotes.
- **You need to check the result.** For anything you'll rely on, it helps to see the image and the text side by side, with uncertain words marked.
- **You want a file.** Exporting to Word, Markdown or CSV is quicker than pasting and reformatting.

Image to Text App covers these cases in the browser, without uploading the image. Take a screenshot to the clipboard, then press Ctrl+V (⌘V on a Mac) anywhere on the [screenshot to text](/screenshot-to-text) page. Dark-mode captures are inverted automatically, and you can add up to 50 screenshots at once, drag them into order, and export the whole set as one document.

If the text comes out garbled whichever tool you use, the image is usually the cause. [How to get accurate OCR results](/guides/how-to-get-accurate-ocr-results) walks through the fixes.
