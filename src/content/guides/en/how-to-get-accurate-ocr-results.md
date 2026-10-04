---
title: "How to get accurate OCR results from photos, scans and screenshots"
description: "Practical fixes for poor OCR: text size and resolution, lighting, angle, contrast, focus, cropping, choosing the right language and mode, and reviewing."
summary: "Most OCR mistakes start with the image. What to change before you read, which settings matter, what Auto improve does, and how to review the result quickly."
published: 2026-10-03
tool: photo-to-text
order: 8
---

When OCR gets text wrong, the engine is rarely the main problem. Usually the image gave it too little to work with: letters that were too small, a shadow across the page, a tilted angle or a slight blur. A minute spent on the image saves far more time spent fixing the text.

The tips below are roughly in order of impact. For why each one matters, [how OCR works](/guides/how-ocr-works) explains what the engine does with your image.

## Make the text big enough

What counts is how many pixels each letter gets, not how many megapixels your camera has. A high-resolution photo of a whole desk can still leave the text on one sheet of paper only a few pixels tall.

- **Fill the frame with the text.** Move the camera closer until the area you need fills most of the picture.
- **Zoom the screen before a screenshot.** Enlarge the page or document first, then capture. Screenshots from a high-resolution display also read better than the same content on a low-resolution one.
- **Don't shrink images on the way.** Some messaging apps and email programs compress or resize pictures. Send the original file, or transfer it directly.
- **Scan at 300 dpi.** For very small print, 400 to 600 dpi helps. The settings are covered in [how to extract text from scanned documents](/guides/how-to-extract-text-from-scanned-documents).

Enlarging a small image afterward helps a little, because OCR engines work better when letters aren't tiny. But it can't add detail the camera never captured.

## Light the page evenly

- **Use soft light.** Daylight from a window or a room's ceiling light works well. Direct sun creates hard shadows and bright spots.
- **Keep your own shadow off the page.** Your phone and hands block overhead light. Position yourself so the light comes from the side rather than from behind you.
- **Avoid the flash on glossy paper.** It creates a white hotspot that wipes out the text underneath. If you need the flash, tilt the phone slightly so the reflection moves off the text, then straighten the photo afterward.

Uneven lighting is one of the main reasons part of a page comes out fine and part comes out as nonsense: the darker area gets treated as ink.

## Shoot straight on

Hold the phone parallel to the page. When it's tilted, the far side of the page shrinks, lines converge and letters at one edge get smaller than at the other.

If you can't avoid an angle, a four-corner straighten tool (perspective correction) pulls the page back into a rectangle: you drag a handle to each corner of the page. A sideways or upside-down image just needs rotating. Book pages that curve toward the spine are harder, because straightening can't flatten a curve, so press the book as flat as you can before shooting.

## Get the contrast right

OCR engines read dark text on a light background best.

- **Light text on dark backgrounds**, such as dark-mode screenshots, slides and signs, should be inverted before reading.
- **Colored text and backgrounds** often read better in grayscale, especially combinations like red on pink or blue on gray.
- **Faded or pale print** benefits from higher contrast, or from black and white if the background is uneven.
- **Patterned backgrounds**, such as the security patterns on checks and certificates, can sometimes be removed with black and white, which drops light patterns and keeps dark text.

## Keep it sharp

- **Tap to focus on the text** before taking the photo, especially when the page is close to the lens.
- **Hold still.** Brace your elbows on the table. In dim light the camera uses a slower shutter, so more light also means less blur.
- **Check before you leave.** Zoom into the photo on your phone. If the letters are soft at full size, take another one while the page is still in front of you.

Sharpening helps a slightly soft image, and noise reduction helps grainy low-light photos. Neither can rescue real motion blur.

## Crop to what you need

Everything in the image is something the engine has to make sense of.

- **Remove clutter.** Desk edges, other pages, logos, photos and dark borders can be mistaken for text or confuse the layout.
- **Crop separate regions separately.** If you only need one column, one paragraph or one table, crop to it.
- **Leave a small margin.** Don't crop so tightly that letters touch the edge of the image. Tesseract's documentation notes that a small border around the text helps.

## Choose the right language

OCR reads each language with its own model. Read French text as English and accented letters come out wrong, or not at all. Read Hindi as English and you'll get nonsense.

Select every language that appears on the page, such as English plus Hindi on a bilingual form, and only those. Extra languages slow the reading down and give the engine more wrong options to choose from.

In Image to Text App, the Auto setting starts with English plus your browser's languages. If the text looks like a different script, it detects the script and reads the image again with the right language.

## Choose the right reading mode

For most modes, the choice affects the shape of the result more than which letters are recognized. Plain text keeps every line as it appears. Document joins lines into paragraphs and keeps headings and lists. Table, Receipt or invoice, Code, Handwriting and Math each structure the output for their job. Image to Text App picks a mode automatically and labels its guess, such as "Looks like a table", and you can switch without uploading the image again.

## What Auto improve does

Image to Text App's Auto improve is on by default. Depending on the image, it inverts light-on-dark text, enlarges small text, straightens a slight tilt, evens out lighting and shadows in phone photos, and boosts contrast. The steps it took are listed in the app, so you can see what changed.

If a result looks worse than you'd expect, press and hold Compare to see the original, then try the manual tools: rotate, crop, four-corner straighten, brightness, contrast, sharpen, grayscale, invert, black and white, even out lighting and reduce noise. After changing the image, press Ctrl+Enter (⌘+Enter on a Mac) to read it again.

## Review the result efficiently

Even a good result deserves a check if you'll rely on it.

- **Start with the overall confidence.** High, fair or low is a guide to how carefully to read, not a guarantee.
- **Jump through the flagged words.** Words the engine was unsure about are underlined, and you can step from one to the next.
- **Use the link between text and image.** Click a line of text to see where it is in the image, or click the image to jump to its text.
- **Prioritize what has no context.** Names, numbers, email addresses, web addresses and codes can't be guessed from the surrounding words, so they're where mistakes hurt most.
- **Fix repeated errors with find and replace,** checking each match rather than replacing all at once.

Handwriting needs its own approach to capture and review; see [how to convert handwritten notes to text](/guides/how-to-convert-handwritten-notes-to-text). For photos of printed pages, the [photo to text](/photo-to-text) page puts all of the above in one place, and on a phone you can take the picture directly.
