---
title: "How OCR works, explained in plain language"
description: "How OCR turns an image into text: image cleanup, layout analysis, finding lines and words, neural network recognition, dictionaries and confidence scores."
summary: "A plain-language tour of what happens inside an OCR engine, from cleaning up the image to neural network recognition, and why it confuses 0 with O."
published: 2026-10-03
tool: photo-to-text
order: 4
---

OCR, short for optical character recognition, is software that looks at an image and works out which characters are in it. That sounds simple until you remember what an image is: a grid of colored dots. Nothing in the file says "this is the letter A" or "this line comes before that one". Every bit of that has to be inferred.

This guide walks through what a modern OCR engine does, using Tesseract as the example. Tesseract is a widely used open-source engine, originally developed at Hewlett-Packard and later maintained with Google's support, and it's the engine [Image to Text App](/) runs in your browser. Other engines differ in the details, but the stages are much the same.

## The stages at a glance

1. Clean up the image so the text stands out.
2. Analyze the layout to find blocks of text and their order.
3. Split blocks into lines, and lines into words.
4. Recognize the characters in each line.
5. Use language knowledge to choose between likely readings.
6. Score each word's confidence and output the result.

## Cleaning up the image

Recognition works best on crisp dark letters on a plain light background, so the first job is to get as close to that as possible.

**Binarization** decides, for every pixel, whether it's ink or paper, turning the image into pure black and white. The classic approach, Otsu's method, looks at the spread of brightness across the whole image and picks the single threshold that best separates the two groups. That works well on clean scans. On a phone photo with a shadow across one corner, a single threshold fails: the shadowed part turns solid black or the bright part loses its faint letters. Adaptive methods solve this by comparing each pixel with its neighborhood rather than with the whole page.

**Deskewing** detects whether the text lines slope and rotates the image so they run horizontally. Even a few degrees of tilt can make a line drift into the one above it, which ruins the next stages.

Other cleanup steps remove specks and scanner dust, enlarge very small text so letters have enough pixels to work with, and invert light-on-dark text. Tesseract's documentation recommends dark text on a light background for current versions, which is why tools often invert dark-mode screenshots before reading them.

## Analyzing the layout

Next the engine works out what's on the page: blocks of text, pictures, ruled lines, separate columns. It also has to decide the reading order.

This step causes some of the most confusing mistakes. If the engine misses the gap between two columns, it reads straight across both, mixing half-sentences from each. A caption can merge into the paragraph below it. A table can come out as a jumble of words in roughly the right order.

Engines usually let the calling software say what kind of input to expect, such as a full page, a single block, a single line or scattered text. Choosing the right expectation matters: reading a receipt as if it were a book page can give worse results than reading it as scattered text.

## Finding lines and words

Within each block, the engine finds the text lines. It looks for rows of ink sitting along a common baseline, and it measures the line's proportions: the height of lowercase letters like x, and how far ascenders (b, d, h) and descenders (g, p, y) reach.

Words come from spacing. Gaps between words are normally wider than gaps between letters. Tight letter spacing can merge two words into one, and stretched spacing in justified text can split one word in two.

## Recognizing the characters

Older OCR engines, including Tesseract up to version 3, cut each word into individual characters and compared each shape with the shapes they'd learned. That breaks down when letters touch, as in a smudged "rn", or when a letter is broken into pieces by faint printing.

Tesseract 4, released in 2018, added a recognizer based on an LSTM (long short-term memory) neural network. Instead of cutting out letters, it reads a whole text line as a sequence, scanning along it and estimating at each step how likely every possible character is. Because the network carries information along the line, it can use the shapes before and after a character to decide what it is, much as you read a smudged letter by looking at its neighbors.

The network learns by example. Tesseract's official models were trained on large amounts of text rendered in many fonts, with a separate model for each language or script. That's why picking the right language matters: a model trained on English has no idea what a Devanagari letter looks like, and it may not expect accented letters like é or ñ.

## Language knowledge and dictionaries

The recognizer doesn't produce one answer. It produces many possible readings of each line with their likelihoods. A search then picks the best one, nudged by a word list and by knowledge of which letter combinations are common in the language.

That nudge fixes a lot. A blurry "tbe" becomes "the" because "the" is a word and "tbe" isn't. But it can also work against you. Product codes, surnames, abbreviations and words from another language don't appear in the word list, so the engine has less help with them and is more likely to get them wrong.

## Confidence scores

For each word, the engine also reports how sure it is, based on how strongly its preferred reading beat the alternatives. Tools use this to flag words for you to check.

Treat confidence as a hint, not a guarantee. A low score usually means something is wrong. A high score usually means it's right, but an engine can be confidently wrong. A crisp "O" inside a serial number that should have been a zero looks perfectly fine to it.

## Why mistakes happen

Most OCR errors fall into a few patterns:

- **Look-alike characters.** 0 and O, 1 and l and I, 5 and S, 8 and B. In many sans-serif fonts, a capital I and a lowercase l are identical, so even a person needs context.
- **Look-alike letter pairs.** "rn" read as "m", "cl" as "d", "vv" as "w", and the reverse.
- **Punctuation.** Commas and periods are tiny, so dust becomes a period and a faint decimal point disappears.
- **No context to lean on.** Codes, IDs, phone numbers and email addresses have no dictionary words around them, so every character stands alone.
- **Layout mistakes.** Columns read across, captions merged with text, rows of a table shuffled.
- **Text the model never learned.** Decorative fonts, stylized logos, vertical text, and especially handwriting.

Most of these get much rarer with a sharper, larger, straighter image. [How to get accurate OCR results](/guides/how-to-get-accurate-ocr-results) covers what to change.

## What happens after recognition

The raw output of an engine is a list of words, each with its position on the image and a confidence score. Apps build structure from those positions. Words lined up in vertical columns become a table, as explained in [how to extract tables from images](/guides/how-to-extract-tables-from-images). Lines with a date or a total after a label become receipt fields. The distance of each line from the left margin becomes indentation in code.

## OCR, ICR, HTR and AI models

You may come across a few related terms. Traditionally, **OCR** means printed text. **ICR** (intelligent character recognition) refers to reading hand-printed characters, typically one per box on a form. **HTR** (handwritten text recognition) refers to reading continuous handwriting, usually with neural networks trained on handwriting samples. The practical differences are covered in [how to convert handwritten notes to text](/guides/how-to-convert-handwritten-notes-to-text).

Some newer AI systems read text by generating it from the image with a large language model. They can cope well with messy input, but because they generate fluent text, a mistake can look like a perfectly plausible word that isn't in the image. Whichever kind of system you use, check the parts that matter against the original.
