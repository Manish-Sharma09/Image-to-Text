---
title: "Image to Markdown: convert screenshots to .md, free"
description: "Convert an image or screenshot to Markdown with headings, lists, tables and fenced code blocks for notes, docs, wikis or AI prompts. Runs in your browser."
h1: "Convert an image to Markdown"
intro: "Get Markdown from a screenshot, slide or photo of a page: headings become # lines, lists stay lists, tables become Markdown tables and code lands in fenced blocks. Copy it or download a .md file."
navLabel: "Image to Markdown"
order: 13
preset:
  mode: document
  export: md
  sample: document
  camera: false
steps:
  - "Paste a screenshot with Ctrl+V or ⌘V, or drop in a photo or scan of the page."
  - "Use Document mode for prose, or switch Read as to Table or Code if the image is mostly a table or code."
  - "Check headings, list items and table cells against the image, and fix any words underlined for checking."
  - "Download a Markdown (.md) file, or copy the text and paste it into your notes, docs or prompt."
faq:
  - q: "Which kind of Markdown does it produce?"
    a: "Standard Markdown for headings and lists, plus pipe tables and fenced code blocks. Those are widely supported by notes apps, wikis and documentation tools that use Markdown."
  - q: "Will bold, italics and links come through?"
    a: "No. The output marks structure, meaning headings, lists, tables and code, rather than text styling. Add emphasis and link targets by hand if you need them."
  - q: "Can I convert a slide or a whiteboard photo?"
    a: "Slides with clear printed text work well. Whiteboard writing is handwriting, which is harder to read, especially when it's joined up; neat print-style letters give the best result."
  - q: "Is my text sent anywhere?"
    a: "No. The image is read on your device, in the browser, and isn't uploaded. Where you paste the Markdown afterwards, such as an online AI tool, is up to you."
  - q: "Can it convert equations?"
    a: "Simple printed equations can be read in Math mode, which gives you LaTeX. Fractions, matrices and complex layouts usually need fixing by hand."
related:
  - image-to-word
  - code-screenshot-to-text
  - image-to-excel
  - screenshot-to-text
---

## Why Markdown instead of plain text

Plain text loses structure. A heading looks like any other line, a list turns into loose sentences, and a table becomes a jumble of words in the wrong order. Markdown keeps that structure using ordinary characters, so it survives being pasted almost anywhere.

The same output works in notes apps that store Markdown, documentation sites, wikis, README files and chats with AI assistants. It stays readable as raw text, it's easy to edit by hand, and changes show up clearly in version control.

## How each part of the page is written

Each kind of content has its own Markdown form:

| On the image | In the Markdown |
| --- | --- |
| A heading | A line starting with one or more `#` |
| Bullet points | Lines starting with `- ` |
| A numbered list | Lines starting with `1.`, `2.` and so on |
| A table, read in Table mode | A Markdown table with pipes between columns |
| Code, read in Code mode | A fenced code block |

A screenshot of a short checklist in Document mode might come out like this:

```markdown
# Release checklist

Run these before tagging a new version.

- Freeze the main branch
- Update the changelog

1. Build the package
2. Run the full test suite
```

Wrapped lines inside a paragraph are joined, and words split by a hyphen at a line end are put back together, so the paragraph is one line of Markdown rather than several broken ones.

## Pages that mix prose, tables and code

Each image is read in one mode at a time, chosen separately for every image. That matters for screenshots that put a paragraph next to a table, or a tutorial page with a code sample in the middle. Document mode is built for prose, so a table read that way usually comes out as lines of text instead of a grid.

The fix is to split the page. Take one screenshot of the text and another of the table or code, set each one to the right mode, and drag them into order. The Whole document view then combines every page into one Markdown file, or a ZIP with a file per page.

For table-heavy images, [how to extract tables from images](/guides/how-to-extract-tables-from-images) covers getting rows and columns right. For code samples, [code screenshot to text](/code-screenshot-to-text) explains what to double-check, such as brackets and look-alike characters.

## Using the Markdown in an AI prompt

Pasting text into a chat with an AI assistant, instead of the image, gives you control over what it sees. You can read the text first, fix misread words, cut anything private or irrelevant, and keep headings, lists and tables clearly marked.

A table pasted as Markdown keeps its rows and columns as text, so you can refer to them directly in your question, for example "compare the March column with April". A numbered list keeps its numbers, so "rewrite step 3" means the same thing to you and the assistant.

## Tidying the output before you paste

A few quick checks make the Markdown cleaner:

- **Heading levels.** Make sure the page title and section headings came out at the levels you want. Adding or removing a `#` is quick.
- **Numbered lists across screenshots.** A list that continues from one screenshot to the next may start again at 1, so check the numbers after combining pages.
- **Line breaks you want to keep.** For a poem, an address or song lyrics, turn off joining wrapped lines so every line stays as it was.
- **Repeated mistakes.** If one word is misread the same way throughout, find and replace fixes it in one go.

If you'd rather finish in a word processor, [image to Word](/image-to-word) gives you a .docx with the same headings and lists.
