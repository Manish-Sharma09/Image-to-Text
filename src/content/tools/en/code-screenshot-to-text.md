---
title: "Code screenshot to text: copy code from an image"
description: "Turn a screenshot of code into text you can paste and run. Code mode keeps indentation, straightens smart quotes and names the language. Dark themes work too."
h1: "Copy code from a screenshot"
intro: "Paste a screenshot of code from a video, slide, chat or editor and get plain source code back, with indentation intact, curly quotes straightened and the language named. Dark editor themes are handled automatically."
navLabel: "Code screenshot to text"
order: 15
preset:
  mode: code
  export: md
  sample: code
  camera: false
steps:
  - "Copy the screenshot to your clipboard and press Ctrl+V or ⌘V anywhere on the page."
  - "Check that Read as shows Code; the label above the result names the language it recognized."
  - "Go through the words underlined for checking, paying close attention to brackets, zeros and ones."
  - "Copy the code with Ctrl+Shift+C or ⌘+Shift+C, or download it as a Markdown file."
faq:
  - q: "Which programming languages does it recognize?"
    a: "Python, JavaScript, TypeScript, Java, C#, C/C++, Go, Rust, PHP, Ruby, SQL, HTML, CSS, JSON, shell and YAML. Code in other languages is still read with its indentation; it just won't get a language label."
  - q: "Does it keep syntax highlighting?"
    a: "No, the result is plain text. Colored code is still read, and once you paste it into your editor, the editor's own highlighting takes over."
  - q: "Will it read the line numbers in the margin?"
    a: "Line numbers in an editor's gutter can be read as part of the code. Crop them out before reading, or delete them afterwards."
  - q: "Can it read code from a paused video?"
    a: "Yes, if the frame is sharp. Pause on a full-screen frame at the highest quality you can, because blur and compression wipe out small details like the difference between a period and a comma."
  - q: "Is my code uploaded?"
    a: "No. The screenshot is read on your device, in the browser, so private code, and any keys or tokens visible in the screenshot, aren't sent to a server."
related:
  - screenshot-to-text
  - image-to-markdown
  - png-to-text
---

## Why ordinary OCR mangles code

General text recognition is built for prose. It treats leading spaces as noise, joins lines that look like they belong together, and passes along whatever quote marks it sees. That's fine for a paragraph, but it breaks code: Python stops running when its indentation goes, YAML changes meaning, and a single curly quote copied from a presentation slide turns a string into a syntax error.

Code mode reads the image differently:

- **Indentation and spacing are kept**, line by line, so nested blocks stay nested.
- **Curly quotes are straightened**, so `“hello”` and `‘a’` come back as `"hello"` and `'a'`.
- **The language is named** when it's recognized, for example "Looks like a screenshot of Python code", which is a quick sign the mode fits the image.

When you download a Markdown file, the code sits inside a fenced block, ready to drop into a README, a wiki page or your notes.

## Dark themes and colored syntax

Most editors and terminals now use dark themes, and OCR engines read dark text on a light background best. Auto improve detects light-on-dark text and inverts it before reading, so dark-mode screenshots don't need any preparation from you.

Colored syntax is usually fine too. The weakest spots are low-contrast parts of a theme: gray comments on a dark gray background, or faint whitespace markers. If those come out garbled, try grayscale and a little more contrast, then switch to the cleaned-up view to check you haven't lost anything.

## Characters to double-check

Some characters look nearly identical in many coding fonts, and a small screenshot makes it worse. These are the usual suspects:

- **0 and O**, especially inside variable names and hex values
- **1, l and I**, which in some fonts differ by a single pixel
- **Brackets**: `{` and `(`, `]` and `)`, plus angle brackets in generics and HTML tags
- **Punctuation**: `;` and `:`, `,` and `.`, and a backtick read as a straight quote
- **Joined letters**: `rn` read as `m`, or `cl` read as `d`
- **Underscores** that disappear or turn into spaces in names like `user_id`

Editor fonts with ligatures draw `!=`, `=>` or `>=` as single symbols, which may not be read back as the characters you typed. If the screenshot comes from your own editor, turn ligatures off before taking it.

The fastest check is to paste the code into an editor with a linter or compiler. Mismatched brackets and stray characters show up within seconds.

## Verifying indentation in Python and YAML

In languages where indentation carries meaning, a line that's off by one level can still run, but do something different. A linter won't always catch that, so compare the nesting with the screenshot for any block that matters, such as the body of a loop or a nested key in a config file.

Clicking a line in the result lights up its spot on the image, which makes it quick to check where a line really started. If a whole block is shifted, it's usually faster to fix it in your editor with a block indent than one line at a time.

## Getting a cleaner screenshot

You'll often get a better result by taking the screenshot again than by fixing characters by hand afterwards:

- **Zoom in before capturing.** Larger text has more pixels per character, which helps most with punctuation.
- **Capture only the code.** Leave out sidebars, tabs and minimaps so nothing else is mixed in with your lines.
- **Turn off word wrap.** A long line wrapped onto two lines in the editor will be read as two lines.
- **Mind tabs versus spaces.** An image can't show which one the original used, so if your project uses tabs, run your formatter after pasting.

For screenshots in general, including chats and error dialogs, [screenshot to text](/screenshot-to-text) and the guide on [how to extract text from a screenshot](/guides/how-to-extract-text-from-a-screenshot) cover the basics. If the code is part of a larger document page, [image to Markdown](/image-to-markdown) explains how to split prose and code into separate screenshots.
