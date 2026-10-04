---
title: "Handwriting to text: convert handwritten notes to typed text"
description: "Turn neat handwritten notes into editable text in your browser. Handwriting mode, words to check, and honest tips on what reads well and what doesn't."
h1: "Handwriting to text"
intro: "Photograph or scan your handwritten notes and get typed text you can edit. It works best on neat, print-style writing; joined-up cursive is harder, and the words Image to Text App is unsure of are underlined."
navLabel: "Handwriting to text"
order: 5
preset:
  mode: handwriting
  export: docx
  sample: handwriting
steps:
  - "Photograph the page in good, even light, or drop in a scan, with one page per image."
  - "Keep Handwriting mode selected, and crop or straighten the page so only the writing is left."
  - "Use the jump button to move from one underlined word to the next, comparing each with the image and correcting it."
  - "Copy the corrected text or download it as a Word document."
faq:
  - q: "Can it read cursive handwriting?"
    a: "Sometimes, but joined-up cursive is the hardest kind of writing to read, so expect a lot of words to check. Neat print-style handwriting gives much better results."
  - q: "What does Handwriting mode change?"
    a: "It prepares the image in a way tuned for handwritten notes before reading. You can switch to another mode at any time without adding the image again."
  - q: "How can I get better results from my notes?"
    a: "Write with a dark pen on plain or lightly ruled paper, photograph the page flat and square-on in even light, and crop to the writing. Separate letters and clear gaps between words help most."
  - q: "Can it read handwritten math?"
    a: "Math mode is designed for simple printed equations, so handwritten equations usually need typing by hand."
  - q: "Are my notes uploaded?"
    a: "No. Your notes are read in your browser, on your device. History is off by default, and when you turn it on it stays in this browser only."
  - q: "Can I convert a whole notebook?"
    a: "Yes. Add up to 50 images to a workspace, one per page. Drag them into order and use Whole document view to export everything as one file."
  - q: "Does it work for handwriting in other languages?"
    a: "You can choose the language of your notes from 47 languages, or several at once. Whatever the language, results depend heavily on how neat and separated the writing is."
related:
  - photo-to-text
  - image-to-word
  - pdf-to-text
---

Handwriting is the hardest thing to turn into text, and it's better to say so up front. Printed letters look the same every time; handwritten ones don't, and joined-up cursive runs letters into each other so there's no clean edge between them. The open-source Tesseract engine Image to Text App uses was built mainly for printed text. Handwriting mode adds preprocessing tuned for handwritten notes, which helps, but it can't make messy writing neat.

What that means in practice: neat, print-style handwriting often comes out as a useful first draft that needs a handful of fixes. Fast or joined-up writing may need so many corrections that typing it yourself is quicker. The tool shows you which situation you're in.

## Good fits and poor fits

Handwriting to text works best for:

- Class and lecture notes written in print-style letters
- To-do lists, shopping lists and meeting notes
- Recipe cards and labels on folders, boxes and jars
- Forms filled in with block capitals
- Sticky notes with a few clear words

It struggles with:

- Flowing cursive, such as old letters, diaries and greeting cards
- Rushed notes with letters squeezed together
- Signatures, which aren't meant to be read as words
- Pages that mix writing with arrows, diagrams and doodles
- Equations, since Math mode is meant for simple printed ones

## Getting a better result

Most of what helps happens before you take the photo. If you're writing notes you plan to convert, print rather than join letters, leave clear spaces between words, and leave room between lines.

- **Use a dark pen.** Black or dark blue ink on white paper gives the strongest contrast. Pencil and light-colored ink are faint; raise Contrast or try Black & white if the strokes look washed out.
- **Prefer plain or lightly ruled paper.** Graph paper and strong colored lines can get tangled up with the letters.
- **Light the page evenly.** Avoid your own shadow across the page. Auto improve evens out lighting and shadows, but it works best when the photo is reasonably lit to begin with.
- **Photograph it flat and square-on.** If the notebook was at an angle, straighten it with four corners before reading. The [photo to text](/photo-to-text) page has more on taking good pictures of pages.
- **Crop to one block of writing.** Notes in the margin, written sideways or squeezed between lines, read better as a separate crop.

## Reviewing what it read

Every word the engine was unsure about is underlined, and a button jumps from one to the next, so you don't have to read the whole page hunting for mistakes. Click any line of text and its place lights up on your photo, which makes it easy to compare a doubtful word with what you wrote.

If the same word is misread the same way throughout, such as a name or a subject term you use a lot, find and replace fixes all of them at once. The overall confidence level (high, fair or low) is a quick guide. If it's low and most words are underlined, retyping that page may be faster than correcting it, and that's a fair call to make.

The cleanup options help with notes too. Join wrapped lines turns lines that run to the edge of the page into proper paragraphs, and the hyphen option re-joins words you split at the end of a line.

## Where the text goes next

On this page, results download as a Word document by default, ready to tidy up and add to. You can also copy the text straight into Google Docs, Word or a notes app, or download it as plain text, Markdown or PDF. See [image to Word](/image-to-word) for more on editable documents.

For a notebook or a stack of pages, photograph each page, drag them into order, and use Whole document view to search across all of them and export one file.

Notes are often personal. Image to Text App reads them in your browser, on your device, and nothing is uploaded. For a fuller walkthrough, including how to plan notes you intend to digitize, read [how to convert handwritten notes to text](/guides/how-to-convert-handwritten-notes-to-text).
