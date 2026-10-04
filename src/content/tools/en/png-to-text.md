---
title: "PNG to text: extract text from PNG images and screenshots"
description: "Turn PNG images and screenshots into editable text. Lossless PNGs read cleanly, dark mode is handled for you, and everything stays in your browser."
h1: "PNG to text"
intro: "Drop in a PNG, or paste one straight from your clipboard, and copy the text out. Screenshots, dark-mode captures and exported graphics are read on your device, with nothing uploaded."
navLabel: "PNG to text"
order: 11
preset:
  mode: auto
  export: txt
  sample: chat
steps:
  - "Drag a PNG onto the page, open it with Ctrl+O (⌘O on a Mac), or paste a copied image with Ctrl+V or ⌘V."
  - "Crop away toolbars, icons and avatars so only the text you want is left in the image."
  - "If the PNG shows code, a table or a formatted document, switch the reading mode to match."
  - "Press Ctrl+Shift+C (⌘+Shift+C on a Mac) to copy all the text, or download it as a .txt file."
faq:
  - q: "Why do PNG screenshots usually read well?"
    a: "PNG is lossless, so the edges of letters stay sharp instead of picking up the blotchy artifacts JPEG compression adds. A PNG screenshot of clear text is one of the easiest things to read."
  - q: "What happens to a transparent background?"
    a: "Transparent areas are flattened onto white before reading. Dark text reads normally, but white or very light text on a transparent background disappears, so place it on a dark background in an image editor first."
  - q: "Can it read dark-mode screenshots?"
    a: "Yes. Auto improve inverts light-on-dark text before reading and lists that step. You can also turn on Invert yourself from the manual tools."
  - q: "Why do icons turn into random letters or symbols?"
    a: "Icons, emoji and interface symbols can look like letters or punctuation to an OCR engine. Crop them out before reading, or delete the stray characters in the editor afterwards."
  - q: "Is my PNG uploaded anywhere?"
    a: "No. Image to Text App reads the image with an OCR engine running in your browser, so the file stays on your device."
  - q: "Can I convert several PNG files at once?"
    a: "Yes. Add up to 50 images per workspace, 25 MB each. Each one becomes a page, and you can copy or download them separately or as one combined document."
related:
  - screenshot-to-text
  - jpg-to-text
  - code-screenshot-to-text
  - image-to-markdown
---

PNG is the format most screenshot tools on Windows and Mac save by default, and it's what most apps export when you save a slide, chart, diagram or design as an image. That makes PNGs the most common source of text that's stuck in a picture: a settings screen, a chat, a slide from a presentation, a labeled chart, or a page of a report someone exported for you.

## Why PNG is the friendliest format for OCR

PNG is lossless. Every pixel is stored exactly, so the sharp edges of letters survive, unlike JPEG, which smudges them a little each time it saves. For text, that difference is real: a PNG of small print often reads cleanly where a JPEG of the same picture produces several words to check.

The weak point of a screenshot isn't the format, it's size. Interface text is often small on screen, so each letter is only a handful of pixels tall. Auto improve enlarges small text before reading, but if you're about to take the screenshot, zooming in first (Ctrl and + in most browsers and apps, ⌘ and + on a Mac) gives the engine more to work with.

On some screens, text is drawn with faint colored fringes to make it look smoother. You won't notice them unless you zoom right in, and they rarely cause trouble. If a screenshot reads oddly, try Grayscale from the manual tools.

## Transparent backgrounds

PNGs can have transparent areas, which is common for logos, stickers, icons and graphics exported from design tools. Before reading, Image to Text App flattens transparency onto white, the same way most image viewers show it.

That's fine for dark text. It's a problem for artwork made to sit on a dark background: white text on a transparent background becomes white on white, and there's nothing left to read. Inverting the image afterwards won't bring it back, because the letters and the background are now the same color. Open the PNG in an image editor and add a dark background, or take a screenshot of it while it's shown on a dark page, then read that.

## Dark mode and colored interfaces

Dark-mode screenshots are handled automatically. Auto improve spots light text on a dark background, inverts it, and lists the step so you know what happened. Press and hold Compare to see the original.

Colored buttons, gray placeholder text and text over gradients are harder, because there's less contrast between letters and background. If a label is missing from the result, raise the Contrast or try Black & white, then read again with Ctrl+Enter (⌘+Enter on a Mac).

## Cut out the interface clutter

Screenshots usually contain more than text: icons, profile pictures, toolbars, scroll bars and emoji. An OCR engine tries to read everything, so a magnifying glass can come out as a "Q" and a check mark as a "v". Cropping to the part you need is the single most useful thing you can do with a PNG screenshot.

Chat screenshots also mix names, timestamps and read receipts in with the messages. Each of these comes through as its own line, which makes them easy to spot and delete.

## Pick the right mode for what's in the PNG

Image to Text App looks at the image and picks a reading mode, with a label such as "Looks like a table". You can switch at any time without adding the image again.

- **Code from an editor or terminal:** Code mode keeps indentation and spacing and straightens curly quotes. See [code screenshot to text](/code-screenshot-to-text).
- **A table or spreadsheet:** Table mode gives you an editable grid that pastes into Excel or Google Sheets. See [image to Excel](/image-to-excel).
- **A slide or document:** Document mode joins lines into paragraphs and keeps headings and bullet lists, which suits a [Markdown](/image-to-markdown) or Word download.

## Limits worth knowing

Text set over photos or busy patterns, stylized lettering in graphics, and labels that run at an angle (such as on a chart axis) are the usual sources of errors in PNGs. Words the engine was unsure about are underlined so you can check them against the image. Click any line and its place lights up on the picture.

If what you have is a fresh screenshot rather than a saved file, you can skip saving it altogether. The [screenshot to text](/screenshot-to-text) page shows how to send a capture straight to the clipboard and paste it here.
