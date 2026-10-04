// UI text for the image-to-text app (the workspace). English is the source.
//
// Translators: copy this file to <locale>.ts (es.ts, ja.ts, …), keep every key,
// translate only the values, and end it with `export default xx satisfies AppText;`.
//
// Conventions
// - {name} is a placeholder filled in at runtime. Keep it exactly, move it
//   wherever the sentence needs it, and don't translate the word inside braces.
// - Objects with `one` and `other` are plural forms chosen by count ({n}).
//   Languages without plural forms (ja, ko) can repeat the same text in both.
// - Keep keyboard keys (Ctrl, ⌘, Shift, Alt, Enter), file extensions (.docx)
//   and format names (PDF, CSV, JSON, Markdown) as they are.
// - "Read"/"reading" means OCR: recognising the text in an image.
// - "Enhanced reading" is the name of an optional cloud AI feature.

const en = {
  common: {
    pages: { one: '{n} page', other: '{n} pages' },
    cancel: 'Cancel',
    reset: 'Reset',
    close: 'Close',
    dismiss: 'Dismiss',
    undo: 'Undo',
    error: 'Error',
    /** Status shown while a page is being read; an ellipsis is added after it. */
    working: 'Working',
    /** Spoken/visual label for word counts (always plural in English). */
    words: '{n} words',
  },

  workspace: {
    regionLabel: 'Image to text workspace',
    back: 'Back',
    backLabel: 'Back to start',
    documentName: 'Document name',
    untitled: 'Untitled document',
    statusReadingOf: 'Reading {n} of {total}',
    statusReading: 'Reading…',
    statusErrors: '{done} of {total} read, {errors} with errors',
    viewLabel: 'View',
    viewPage: 'Page',
    viewDocument: 'Whole document',
    addImages: 'Add images',
    menuLabel: 'Workspace menu',
    menuAria: 'Workspace',
    newDocument: 'New document',
    newDocumentHint: 'Back to start; you can undo',
    readAllAgain: 'Read all pages again',
    history: 'History',
    shortcuts: 'Keyboard shortcuts',
    imageRegion: 'Image',
    textRegion: 'Extracted text',
    showImage: 'Show image',
    hideImage: 'Hide image',
    dropToAdd: 'Drop to add images',
    /** Screen-reader announcement after reading finishes. {mod} is Ctrl or ⌘. */
    announceDone: { one: '{n} page read. Press {mod} Shift C to copy.', other: '{n} pages read. Press {mod} Shift C to copy.' },
    confirmReread: 'Read this page again? Your edits will be replaced.',
    /** Toast after "Back"; {name} is the document name. */
    closed: 'Closed “{name}”',
  },

  /** Default names given to pages and documents. */
  names: {
    pastedImage: 'Pasted image',
    sharedImage: 'Shared image',
    photo: 'Photo',
    /** Default title for downloads when the document has no name. */
    extractedText: 'Extracted text',
    /** Page names inside a multi-page PDF or TIFF: "Report — page 2". */
    filePage: '{name} — page {n}',
    sample: 'Sample {name}',
    samples: {
      receipt: 'Sample receipt',
      table: 'Sample table',
      code: 'Sample code',
      handwriting: 'Sample handwriting',
      document: 'Sample document',
      chat: 'Sample chat',
      'mixed-hindi': 'Sample mixed hindi',
    },
  },

  empty: {
    /** {keys} is replaced by the keyboard keys ⌘ V or Ctrl V. */
    title: 'Drop images here, or paste with {keys}',
    takePhoto: 'Take a photo',
    chooseImages: 'Choose images',
    paste: 'Paste',
    useLink: 'Use a link',
    pasteHint: 'Your browser needs the keyboard for this: press {keys} anywhere on the page.',
    imageLink: 'Image link',
    urlPlaceholder: 'https://example.com/photo.jpg',
    loading: 'Loading…',
    readImage: 'Read image',
    meta: 'JPG, PNG, WebP, HEIC, GIF, BMP, TIFF or PDF, up to {mb} MB each. Add up to {max} at once.',
    private: "Read on your device. Your images aren't uploaded.",
    howItWorks: 'How this works',
    samplesLabel: 'No image to hand? Try a sample:',
    samples: {
      receipt: 'Receipt photo',
      table: 'Table',
      code: 'Code screenshot',
      handwriting: 'Handwritten note',
      document: 'Article',
      'mixed-hindi': 'English + Hindi',
    },
    noClipboardImage: 'No image on the clipboard. Copy an image or take a screenshot first.',
  },

  image: {
    viewerLabel: 'Image preview. Click a line to find its text. Plus and minus keys zoom.',
    opening: 'Opening image…',
    /** Badge on the processed (cleaned-up) image that OCR actually reads. */
    readerSees: 'What the reader sees',
    toolsLabel: 'Image tools',
    rotateLeft: 'Rotate left',
    rotateRight: 'Rotate right',
    crop: 'Crop',
    adjust: 'Adjust',
    adjustLabel: 'Adjust image',
    autoOn: 'Auto improve is on',
    cleanedTitle: 'Show the cleaned-up image the text was read from',
    showPhoto: 'Show photo',
    showCleaned: 'Show cleaned-up',
    zoomOut: 'Zoom out',
    zoomIn: 'Zoom in',
    fitLabel: 'Fit image',
    fitTitle: 'Fit',
    cropFailed: "Couldn't open the crop tool for this image.",
  },

  adjust: {
    auto: 'Auto improve',
    autoHint: 'Picks the fixes that help OCR',
    /** What Auto improve did, listed under the switch. */
    steps: {
      inverted: 'Inverted light text on a dark background',
      flattened: 'Evened out lighting and shadows',
      contrast: 'Boosted contrast',
      straightened: 'Straightened by {deg}°',
      sharpened: 'Sharpened',
      enlarged: 'Enlarged {x}× for small text',
      grayscale: 'Converted to grayscale — the image was already clear',
    },
    brightness: 'Brightness',
    contrast: 'Contrast',
    sharpen: 'Sharpen',
    straighten: 'Straighten',
    toggles: {
      grayscale: 'Grayscale',
      invert: 'Invert colors',
      stretch: 'Normalize contrast',
      flatten: 'Even out lighting',
      bw: 'Black & white',
      denoise: 'Reduce noise',
    },
  },

  crop: {
    corners: {
      topLeft: 'Move top-left corner',
      topRight: 'Move top-right corner',
      bottomRight: 'Move bottom-right corner',
      bottomLeft: 'Move bottom-left corner',
    },
    shape: 'Crop shape',
    rectangle: 'Rectangle',
    fourCorners: 'Four corners',
    tipFree: 'Drag each corner onto a corner of the page to straighten a photo taken at an angle.',
    tipRect: 'Drag the corners to keep only the text you need.',
    apply: 'Apply',
  },

  text: {
    detectedTitle: 'What the image appears to contain',
    enhanced: 'Enhanced reading',
    readOnDevice: 'Read on device instead',
    fromPdf: 'Text copied from the PDF',
    confidence: { high: 'High confidence', fair: 'Fair confidence', low: 'Low confidence' },
    /** Words the OCR engine was unsure about. */
    toCheck: { one: '{n} word to check', other: '{n} words to check' },
    prevCheck: 'Previous word to check',
    nextCheck: 'Next word to check',
    joinLines: 'Join lines',
    viewLabel: 'View',
    tabTable: 'Table',
    tabFields: 'Fields',
    tabText: 'Text',
    suggest: {
      handwriting: 'Handwriting is hard to read on a device.',
      math: 'Equations are hard to read on a device.',
      other: 'This one is hard to read on a device.',
      body: 'Enhanced reading uses an AI model on our server and usually does much better.',
      try: 'Try Enhanced reading',
      tryLeft: 'Try Enhanced reading ({n} left today)',
    },
    stopped: 'Reading stopped. See the message above.',
    waiting: 'Waiting to read this image.',
    readNow: 'Read now',
    copied: 'Copied',
    copyTable: 'Copy table',
    copyCode: 'Copy code',
    copyText: 'Copy text',
    stats: '{words} words, {chars} characters',
    statsLong: '{words} words, {chars} characters, {paragraphs} paragraphs',
    moreActions: 'More actions',
    find: 'Find and replace',
    redo: 'Redo',
    dehyphenate: 'Re-join hyphenated words',
    readAgain: 'Read again',
    readAgainEdits: 'Read again (replaces edits)',
    useEnhanced: 'Use Enhanced reading',
    useEnhancedHint: 'AI on our server',
    remove: 'Remove this page',
    copyBlocked: 'Copying was blocked by the browser. Select the text and copy it manually.',
    consent: {
      title: 'Send this image for Enhanced reading?',
      intro: 'On-device reading keeps images on your device. Enhanced reading is different:',
      p1: "This image is sent to our server, which asks Anthropic's Claude model to read it.",
      p2: "Our server doesn't save the image or the text, and we don't use them to train anything.",
      /** {link} becomes a link whose text is `privacyLink`. */
      p3: 'Anthropic handles the request under its commercial API terms. Its {link} explains how long it keeps API data.',
      privacyLink: 'privacy policy',
      p4: 'Only this page is sent, and only when you choose it.',
      outro: "Don't use it for documents you wouldn't email.",
      keep: 'Keep on device',
      send: 'Send and read',
    },
    /** Hints the layout step adds under the text. */
    notes: {
      math: 'Simple printed expressions only. Check fractions, roots and subscripts — they often need fixing by hand.',
      oneColumn: 'Only one column was found. If this is a table, try cropping to just the table.',
      noTotal: 'No total was found. Check the fields below against the receipt.',
    },
  },

  /** Reading modes: how the recognised text is laid out. */
  modes: {
    readAs: 'Read as',
    triggerLabel: 'Read as: {mode}. Change how the text is read',
    detected: '{mode} (detected)',
    suggested: '{mode} (suggested)',
    plain: { label: 'Plain text', hint: 'Every line as it appears' },
    document: { label: 'Document', hint: 'Paragraphs, headings and lists' },
    table: { label: 'Table', hint: 'Rows and columns you can edit' },
    receipt: { label: 'Receipt or invoice', hint: 'Totals, dates and line items' },
    code: { label: 'Code', hint: 'Keeps indentation and symbols' },
    handwriting: { label: 'Handwriting', hint: 'Tuned for handwritten notes' },
    math: { label: 'Math', hint: 'Equations as LaTeX' },
  },

  /** Short label saying what the image seems to contain. {lang} is a programming language (Python…). */
  detection: {
    none: 'No readable text found',
    invoice: 'Looks like an invoice',
    receipt: 'Looks like a receipt',
    codeScreenshotLang: 'Looks like a screenshot of {lang} code',
    codeScreenshot: 'Looks like a screenshot of code',
    codeLang: 'Looks like {lang} code',
    code: 'Looks like code',
    table: 'Looks like a table with {n} columns',
    math: 'Looks like an equation',
    handwriting: 'Looks like handwriting',
    article: 'Looks like an article or document',
    document: 'Looks like a document',
    screenshot: 'Looks like a screenshot',
    photo: 'Looks like a photo with text',
    text: 'Looks like text',
  },

  /** Progress messages while a page is read; an ellipsis is added after them. */
  stages: {
    waiting: 'Waiting',
    preparing: 'Preparing image',
    loadingEngine: 'Loading the text engine (first time only)',
    /** {langs}: language names joined with " + ". */
    loadingLanguage: 'Loading {langs}',
    uploading: 'Sending to Enhanced reading',
    reading: 'Reading text',
    checkingScript: 'Checking the script',
    checkingLayout: 'Checking the layout',
  },

  notices: {
    pdfText: 'This page already had selectable text, so it was copied directly — no OCR needed.',
    /** {script}: a writing system such as Devanagari; {langs}: language names. */
    foundScript: 'Found {script} text, so this page was read as {langs}.',
    hardLines: 'Some lines were hard to read.',
    hardLinesHint: 'If they are in another language, choose it from the language menu (the globe) and the page is read again.',
    rotated: 'This page looks rotated.',
    /** {turn} is one of the three phrases below. */
    rotatedHint: 'Turning it {turn} should read better.',
    turnUpsideDown: 'upside down',
    turnRight: 'a quarter turn right',
    turnLeft: 'a quarter turn left',
    rotateAndRead: 'Rotate and read again',
    enhancedFallback: 'Showing the on-device reading instead.',
    tryEnhancedAgain: 'Try Enhanced again',
    readOnThisDevice: 'Read on this device',
    tryAgain: 'Try again',
    /** Problems with the optional cloud reading. */
    enhancedErrors: {
      limit: "You've used today's Enhanced reads. On-device reading is still unlimited.",
      'too-large': 'This image is too large for Enhanced reading.',
      unavailable: 'Enhanced reading is not available right now.',
      failed: 'Enhanced reading failed. Try again, or use on-device reading.',
    },
  },

  /** Errors: each says what happened, then what to try. */
  errors: {
    unsupported: {
      title: "That format isn't supported yet.",
      hint: 'Use JPG, PNG, WebP, GIF, BMP, TIFF, HEIC or PDF. Taking a screenshot of it works too.',
    },
    'too-large': {
      title: 'This file is larger than the current limit.',
      hint: 'Files can be up to 25 MB. Crop or resize the image, or export a smaller version.',
    },
    empty: { title: 'That file is empty.', hint: 'Check that it finished downloading and try again.' },
    decode: {
      title: "This image couldn't be opened.",
      hint: 'It may be damaged or use an unusual encoding. Try saving it as PNG or JPG first.',
    },
    url: {
      title: "We couldn't load an image from that link.",
      hint: 'Check that the link opens an image directly, or save the image and drop it here.',
    },
    'url-blocked': {
      title: "That site doesn't allow its images to be loaded here.",
      hint: 'Save the image to your device (or copy it) and then drop or paste it.',
    },
    'too-many': {
      title: 'That would go over 50 pages.',
      hint: 'Finish or remove some pages first, or start a new document.',
    },
    'pdf-locked': {
      title: 'This PDF is password-protected.',
      hint: 'Open it, remove the password (or print it to a new PDF) and try again.',
    },
    read: {
      failed: {
        title: "We couldn't read enough text from this image.",
        hint: 'Try Auto improve, crop to the text, or pick the language of the text.',
      },
      noText: {
        title: "We couldn't detect readable text in this image.",
        hint: 'If there is text, try cropping closer, rotating it upright, or raising the contrast.',
      },
      lowQuality: {
        title: 'This image may be difficult to read.',
        hint: 'Try increasing brightness or sharpening it, or take the photo again in better light.',
      },
      engine: {
        title: "The text engine didn't load.",
        hint: 'Check your connection and try again. After the first load it is cached on this device.',
      },
    },
  },

  rail: {
    label: 'Pages',
    hint: 'Alt plus arrow keys reorder pages. Delete removes a page.',
    /** e.g. "Page 2: Receipt. Read" */
    pageLabel: 'Page {n}: {name}. {status}',
    statusRead: 'Read',
    statusNotRead: 'Not read yet',
    statusReading: 'Reading',
    add: 'Add',
  },

  document: {
    search: 'Search all pages',
    matches: { one: '{n} match', other: '{n} matches' },
    /** {matches} and {pages} are the two plural phrases, e.g. "3 matches in 2 pages". */
    matchesIn: '{matches} in {pages}',
    inPages: { one: '{n} page', other: '{n} pages' },
    copyAll: 'Copy all',
    downloadAll: 'Download all',
    reading: 'Reading…',
    openEdit: 'Open and edit',
    noMatches: 'No matches for “{query}”.',
    copied: { one: 'Copied {n} page', other: 'Copied {n} pages' },
  },

  history: {
    title: 'History',
    keep: 'Keep history on this device',
    keepHint: 'Saves your documents, images and edits in this browser only. Nothing is uploaded. Off by default.',
    unavailable: "History isn't available in this browser window (private browsing can block it).",
    emptyOn: 'Documents you read will appear here.',
    emptyOff: 'History is off, so nothing is saved after you close the page.',
    open: 'Open',
    rename: 'Rename',
    download: 'Download',
    deleteDoc: 'Delete {title}',
    clearAll: 'Clear all history',
    confirmClear: 'Delete all saved history on this device?',
  },

  shortcuts: {
    title: 'Keyboard shortcuts',
    paste: 'Paste an image from the clipboard',
    choose: 'Choose images',
    copy: 'Copy all text of the current page',
    find: 'Find and replace in the text',
    undo: 'Undo an edit',
    reread: 'Read the current page again',
    move: 'Move the selected page in the page list',
    zoom: 'Zoom the image in, out, or fit (when the image has focus)',
    help: 'Show these shortcuts',
  },

  /** The OCR language picker (the language of the text in the image, not the site). */
  languages: {
    label: 'Text language: {summary}',
    auto: 'Auto',
    autoHint: "English and your browser's languages; other scripts are detected",
    choose: 'Choose languages',
    chooseHint: 'Up to {max} at once, for mixed-language images',
    search: 'Search {n} languages',
    searchLabel: 'Search languages',
    note: 'Each language downloads once (a few MB), then works offline.',
  },

  export: {
    download: 'Download',
    preparing: 'Preparing…',
    menuLabel: 'Download as',
    loading: 'Loading formats…',
    downloaded: 'Downloaded {file}',
    printing: 'Opening the print dialog — choose "Save as PDF". This keeps every script readable.',
    failed: "That download didn't work. Try another format or copy the text instead.",
    formats: {
      txt: { label: 'Text (.txt)', hint: 'Plain text that opens anywhere' },
      docx: { label: 'Word (.docx)', hint: 'Editable, with headings, lists and tables' },
      pdf: { label: 'PDF', hint: 'Formatted and ready to share or print', hintPrint: 'Opens the print dialog — choose “Save as PDF”' },
      'searchable-pdf': { label: 'Searchable PDF', hint: 'The original image with selectable, searchable text' },
      xlsx: { label: 'Excel (.xlsx)', hint: 'One sheet per table, numbers kept as numbers' },
      csv: { label: 'CSV', hint: 'Rows and columns for any spreadsheet app' },
      md: { label: 'Markdown (.md)', hint: 'For notes apps, wikis and GitHub' },
      html: { label: 'Web page (.html)', hint: 'A standalone page that keeps the formatting' },
      json: { label: 'JSON', hint: 'Text and structure for developers' },
      zip: { label: 'ZIP of pages', hint: 'One file per page, plus all pages combined' },
    },
  },

  share: {
    label: 'Share',
    system: 'Share…',
    systemHint: 'Send to an app on this device',
    copyLink: 'Copy link',
    copyLinkHint: 'The text is packed into the link itself',
    tooLong: 'This text is too long for a link. Download it as a file instead.',
    linkCopied: 'Link copied. The text travels inside the link, so nothing was uploaded.',
  },

  receipt: {
    invoiceDetails: 'Invoice details',
    receiptDetails: 'Receipt details',
    fieldPrompt: 'Field name',
    removeField: 'Remove {label}',
    noFields: 'No fields recognised yet.',
    addField: 'Add a field',
    items: 'Items',
    description: 'Description',
    qty: 'Qty',
    unitPrice: 'Unit price',
    amount: 'Amount',
    remove: 'Remove',
    itemDescription: 'Item {n} description',
    itemQty: 'Item {n} quantity',
    itemUnitPrice: 'Item {n} unit price',
    itemAmount: 'Item {n} amount',
    removeItem: 'Remove item {n}',
    noItems: 'No line items found.',
    addItem: 'Add an item',
    /** {against} is a field name such as "subtotal" or "total". */
    checkOk: 'Items add up to {sum}, matching the {against}.',
    checkBad: 'Items add up to {sum}, but the {against} says {value}. Check the amounts.',
    checkSum: 'Items add up to {sum}.',
    /** Names of the fields read from a receipt or invoice. */
    fields: {
      merchant: 'Business',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      website: 'Website',
      taxId: 'Tax ID',
      receiptNumber: 'Receipt number',
      invoiceNumber: 'Invoice number',
      date: 'Date',
      time: 'Time',
      due: 'Due date',
      billTo: 'Bill to',
      subtotal: 'Subtotal',
      discount: 'Discount',
      tax: 'Tax',
      tip: 'Tip',
      total: 'Total',
      paid: 'Paid',
      change: 'Change',
    },
  },

  table: {
    titleLabel: 'Table title',
    titlePlaceholder: 'Table title (optional)',
    header: 'First row is a header',
    opsLabel: 'Rows and columns',
    /** Buttons: insert a row below / delete the row / insert a column to the right / delete the column. */
    rowBelow: 'Row below',
    row: 'Row',
    columnRight: 'Column right',
    column: 'Column',
    cell: 'Row {r}, column {c}',
    checkCell: 'Check this cell',
    none: 'No table found. Try cropping to just the table, or read it as plain text.',
  },

  editor: {
    label: 'Extracted text',
    loading: 'Loading editor…',
    placeholder: 'No text yet. Edit freely once it appears.',
    checkWord: 'Check this word',
    /** Labels of the find-and-replace bar. Keys are the English originals; translate the values. */
    phrases: {
      Find: 'Find',
      Replace: 'Replace',
      next: 'next',
      previous: 'previous',
      all: 'all',
      'match case': 'match case',
      'by word': 'by word',
      regexp: 'regexp',
      replace: 'replace',
      'replace all': 'replace all',
      close: 'close',
      'current match': 'current match',
      'on line': 'on line',
      'Go to line': 'Go to line',
      go: 'go',
      /** $ is a number. */
      'replaced $ matches': 'replaced $ matches',
      'replaced match on line $': 'replaced match on line $',
    },
  },
};

export default en;
export type AppText = typeof en;
