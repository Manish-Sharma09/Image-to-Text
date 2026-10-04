---
title: "Screenshot to text: paste a screenshot, copy the text"
description: "Paste a screenshot with Ctrl+V or ⌘V and copy the text out of it. Free, no sign-up, and your screenshot is read in your browser, never uploaded."
h1: "Screenshot to text"
intro: "Take a screenshot, press Ctrl+V (⌘V on a Mac) anywhere on this page, and copy the text. Chats, error messages and slides are read on your device, so private screenshots stay private."
navLabel: "Screenshot to text"
order: 2
preset:
  mode: auto
  export: txt
  sample: chat
steps:
  - "Capture the part of the screen you need straight to the clipboard, using the shortcut for your system listed on this page."
  - "Come back to this tab and press Ctrl+V, or ⌘V on a Mac, anywhere on the page."
  - "Look over any underlined words to check, clicking a line to see where it sits in the screenshot."
  - "Press Ctrl+Shift+C (⌘+Shift+C on a Mac) to copy all the text, then paste it wherever you need it."
faq:
  - q: "Do I have to save the screenshot as a file first?"
    a: "No. If the screenshot is on your clipboard, press Ctrl+V or ⌘V anywhere on the page. Saved screenshot files work too: drag them in or open them with Ctrl+O or ⌘O."
  - q: "How do I get text from a screenshot on my phone?"
    a: "Phones save screenshots to Photos or Gallery instead of the clipboard. Open this page on your phone, tap to add an image, and pick the screenshot from your photos."
  - q: "Can I paste several screenshots of one long conversation?"
    a: "Yes. Each screenshot becomes its own page, which you can drag into order. Whole document view joins them so you can copy or download everything at once."
  - q: "Does it work with dark-mode screenshots?"
    a: "Yes. Auto improve inverts light text on a dark background before reading, and lists that step so you can see what it did."
  - q: "Is my screenshot uploaded?"
    a: "No. The OCR engine runs in your browser, so the screenshot stays on your device. History is off by default, so nothing is kept after you close the page unless you switch it on."
  - q: "Why did a username or code come out wrong?"
    a: "Short strings with no surrounding words give the engine no context, and characters like O and 0 or l, I and 1 look alike. Check these against the image before you use them."
  - q: "Can it read code or an error message from a screenshot?"
    a: "Yes. Code mode keeps indentation and spacing, straightens curly quotes and names the language it recognizes, such as Python, JavaScript or SQL."
related:
  - png-to-text
  - code-screenshot-to-text
  - image-to-excel
---

The fastest way to get text out of something on your screen is to skip files entirely. Capture a screenshot to the clipboard, switch to this tab, paste, and copy the result. There's no upload button to find and no download folder to dig through.

## Screenshot shortcuts that copy to the clipboard

Most systems save screenshots as files by default. These shortcuts put the capture on the clipboard instead, ready to paste:

- **Windows:** press Win+Shift+S to open the snipping bar, then drag over the area you want. The snip is copied to the clipboard.
- **Mac:** press ⌘+Shift+Ctrl+4 and drag to select an area. Adding Ctrl to the usual shortcut sends the screenshot to the clipboard instead of the desktop. ⌘+Shift+Ctrl+3 copies the whole screen.
- **Chromebook:** press Ctrl+Shift+Show windows to open screen capture and select an area. If pasting doesn't bring it in, drop the saved screenshot file onto the page instead.
- **iPhone and Android:** there's no shortcut that sends a screenshot straight to the clipboard. Screenshots are saved to Photos or Gallery, and you can add them from there.

Once the screenshot is on the clipboard, press Ctrl+V (⌘V on a Mac). It doesn't matter where on the page you are.

## What people screenshot most

- **Chats and messages.** Quote a conversation, save the details of a plan, or pull an address out of a group chat. Names and timestamps come through as their own lines, so they're easy to delete. For a long conversation, take several screenshots and paste them one after another.
- **Error messages and dialog boxes.** Copy the exact wording so you can search for it or put it in a bug report. For stack traces and code, the [code screenshot page](/code-screenshot-to-text) explains how Code mode keeps indentation intact.
- **Articles and pages that block selecting text.** If you can see it, you can screenshot it and paste it here.
- **Slides from a video call or recorded lecture.** Pause, capture the slide, and paste. Document mode keeps headings and bullet lists, which is handy for notes.
- **Tables in reports and dashboards.** Table mode turns them into a grid you can paste into a spreadsheet. See [image to Excel](/image-to-excel).

## Taking a screenshot that reads well

Capture an area rather than the whole screen. A tight selection leaves out menus, icons and sidebars, which an OCR engine would otherwise try to read as text.

If the text is small, zoom in before you capture. Auto improve enlarges small text, but more pixels per letter always helps. Dark mode doesn't need any special handling, because light-on-dark text is inverted automatically.

Take a real screenshot rather than a phone photo of your monitor. Photos of screens pick up glare, wavy patterns and blur that a screenshot never has.

For codes, order numbers, serial numbers and anything else without surrounding words, compare every character with the original. Click the line and its spot lights up on the image, which makes checking quick.

## Built-in tools, and when this page helps

Your device may already be able to copy text from a screenshot. The Windows Snipping Tool has Text Actions, Mac and iPhone have Live Text, Android has Google Lens, and PowerToys Text Extractor works on Windows. For grabbing a single line, those are often the quickest option.

Image to Text App is useful when you want more than that: reviewing words the engine was unsure about before you copy, combining many screenshots into one document in the right order, keeping a table as a table, or downloading the result as Word, Markdown, CSV or a searchable PDF.

## Screenshots are often private

Screenshots tend to contain names, messages, account details and other things you wouldn't post publicly. Image to Text App reads them in your browser, on your device, so the image isn't sent to a server. History is off unless you turn it on, and even then it stays in your browser. If you share the result with "Copy link", the text is packed into the link itself rather than uploaded. Read more in [is online OCR private?](/guides/is-online-ocr-private)

For a step-by-step walkthrough with more detail for each system, see the guide on [how to extract text from a screenshot](/guides/how-to-extract-text-from-a-screenshot).
