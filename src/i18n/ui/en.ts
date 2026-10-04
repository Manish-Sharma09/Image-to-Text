// Site text (pages, header, footer, home sections) — the source for every
// translation. Each locale file next to this one exports the same shape:
//   export default { … } satisfies UI;
//
// Conventions for translators:
// - {name} is a placeholder filled in by the page; keep it, move it freely.
// - { one, other } objects are plural forms ({n} is the number). Languages
//   without plurals (ja, ko) can give `other` only.
// - Strings ending in "Html" may contain simple HTML (<a>, <strong>, <code>,
//   <ol>/<li>). Keep the tags; translate the text. Link hrefs stay as the
//   English root paths (href="/jpg-to-text") — they are localized
//   automatically.
// - Product names stay as-is: Image to Text App, Tesseract, Excel, Word,
//   Google Docs, Google Sheets, Markdown, JSON, CSV, PDF, HEIC, Ctrl, ⌘.
// - Titles and descriptions are search-engine copy: use the phrases people
//   actually search for in your language ("convertir imagen a texto",
//   "画像 文字起こし", "image en texte"…), not word-for-word translations.

/** Plural forms; languages without plurals (ja, ko) give `other` only. */
type Plural = { one?: string; other: string };

const en = {
  meta: {
    /** Home <title>, ~60 characters, main keyword first. */
    homeTitle: 'Image to Text Converter – Free Online OCR | Image to Text App',
    /** Home meta description, 140–160 characters. */
    homeDescription:
      'Convert image to text online for free. Extract text from JPG, PNG, screenshots, PDFs and handwriting in 47 languages. No sign-up, images stay on your device.',
    /** Used in structured data and the share image description. */
    siteDescription:
      'Free image to text converter that runs in your browser. Extract editable text from JPG, PNG, screenshots, PDFs, tables, receipts and handwriting — no sign-up, and your images stay on your device.',
    ogImageAlt: 'Image to Text App: copy text from any image, free and in your browser',
    toolsTitle: 'Image to text tools',
    toolsDescription:
      'Every image to text tool in one place: screenshots, photos, PDFs, handwriting, tables to Excel, receipts, invoices and code. One workspace, many ways in.',
    guidesTitle: 'Guides to getting text out of images',
    guidesDescription:
      'Practical guides to copying text from screenshots, photos, scans, receipts, tables and handwriting — on any device, with or without a dedicated tool.',
    privacyTitle: 'Privacy policy: what happens to your images',
    privacyDescription:
      'How {site} handles your images and text: read on your device by default, nothing uploaded, history off unless you turn it on.',
    aboutTitle: 'About us: free image to text that stays on your device',
    aboutDescription:
      'Why {site} exists: free image to text that runs in your browser, with no sign-up and no uploads. Our principles, and the open-source software behind it.',
    contactTitle: 'Contact us',
    contactDescription:
      'Contact {site} by email to report a problem, suggest a feature, ask about privacy, or get in touch about press and partnerships.',
    termsTitle: 'Terms and conditions',
    termsDescription:
      'The terms for using {site}: your images and text stay yours, how to use the service fairly, the accuracy of results and the limits of our liability.',
    notFoundTitle: 'Page not found',
    notFoundDescription: "This page doesn't exist. The image to text tool, a page for every task and our guides are a click away.",
    serverErrorTitle: 'Something went wrong',
    serverErrorDescription: 'The server hit an error. Try again in a moment.',
    shareTitle: 'Shared text',
    shareDescription: 'Text shared from {site}. The text is stored inside the link itself.',
  },

  nav: {
    main: 'Main',
    homeLabel: '{site} home',
    tools: 'Tools',
    guides: 'Guides',
    privacy: 'Privacy',
    openTool: 'Open the tool',
    history: 'History',
    skip: 'Skip to content',
    breadcrumb: 'Breadcrumb',
  },

  theme: {
    menu: 'Theme',
    /** Button label once a theme is chosen, e.g. "Theme: Dark". */
    current: 'Theme: {name}',
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    /** Footer switch tooltips. */
    systemTheme: 'System theme',
    lightTheme: 'Light theme',
    darkTheme: 'Dark theme',
  },

  language: {
    menu: 'Language',
    current: 'Language: {name}',
  },

  footer: {
    about: 'Image to text that runs in your browser. No sign-up, no ads, and your images stay on your device.',
    tools: 'Tools',
    imageToText: 'Image to text',
    guides: 'Guides',
    allGuides: 'All guides',
    privacy: 'Privacy policy',
    terms: 'Terms and conditions',
    aboutUs: 'About us',
    contact: 'Contact',
    allTools: 'All tools',
    howOcrWorks: 'How OCR works',
    copyright: '© {year} {site}. Text recognition by the open-source Tesseract engine.',
    languages: 'Languages',
  },

  /** Breadcrumb root and the hero on the home page. */
  hero: {
    crumbHome: 'Image to text',
    /** Home H1 — the main keyword. Use non-breaking spaces ( ) to keep the keyword phrase on one line if needed. */
    homeH1: 'Free Image to Text Converter',
    homeIntro:
      'Copy text from any image. Paste a screenshot or drop a JPG, PNG, photo, scan or PDF and get text you can edit, check and export — tables, receipts and code included. Free online OCR that runs in your browser, so your images stay on your device.',
  },

  schema: {
    operatingSystem: 'Any (runs in the browser)',
    browserRequirements: 'Requires a modern browser with WebAssembly',
    appAlternateNames: ['Image to Text Converter', 'Image to Text OCR'],
    featureList: [
      'Free image to text converter with no sign-up and no daily limit',
      'Image to text in the browser, images not uploaded',
      'JPG, PNG, WebP, HEIC, TIFF, GIF, BMP and PDF',
      'Automatic detection of tables, receipts, code, documents and handwriting',
      'Table to Excel and CSV',
      'Receipt and invoice fields',
      '47 languages, including Hindi, Bengali, Urdu, Nepali, Tamil and Kannada',
      'Bulk image to text: up to 50 images at once',
      'Export to Word, PDF, searchable PDF, Markdown, JSON, CSV, Excel, HTML and text',
    ],
    howToName: 'How to convert an image to text',
    howToDescription: 'Extract editable text from a screenshot, photo, scan or PDF in your browser.',
  },

  home: {
    howTo: [
      { name: 'Add your image', text: 'Paste a screenshot with Ctrl+V (⌘V on a Mac), drag and drop a file, choose images, paste an image link or take a photo on your phone.' },
      { name: 'Let it read', text: 'Reading starts on its own and usually takes a few seconds per page. A short label shows what was found, such as a table, receipt or code.' },
      { name: 'Check the text', text: 'Click any line to see where it came from on the image. Words the engine was unsure about are underlined so you can fix them.' },
      { name: 'Copy or download', text: 'Copy the text with one click, or download it as Word, Excel, PDF, Markdown, JSON, CSV, HTML or plain text.' },
    ],

    readas: {
      eyebrow: 'Detection',
      title: "An image to text converter that knows what it's reading",
      lede: 'Every image is checked for tables, receipts, code, documents and handwriting, and read in the way that suits it. You\'ll see a short label like "Looks like a table". Switch to another mode at any time without uploading again.',
      tabsLabel: 'Examples',
      tabs: {
        table: 'Tables',
        receipt: 'Receipts',
        code: 'Code',
        document: 'Documents',
        notes: 'Handwriting',
        langs: 'Mixed languages',
      },
      alts: {
        table: 'Screenshot of a spreadsheet table of regional orders, before converting the image to text',
        receipt: 'Photo of a cafe receipt taken at an angle on a dark table',
        code: 'Screenshot of Python code in a dark editor theme',
        document: 'Scanned article page about caring for a sourdough starter',
        notes: 'Handwritten meeting notes on lined paper',
        langs: 'Library notice written in English and Hindi',
      },
      caption: 'The image',
      table: {
        label: 'Looks like a table with 5 columns',
        note: 'Edit any cell, then copy it straight into Excel or Google Sheets, or download CSV or .xlsx. Numbers stay numbers.',
      },
      receipt: {
        label: 'Looks like a receipt',
        business: 'Business',
        date: 'Date',
        subtotal: 'Subtotal',
        tax: 'Tax',
        total: 'Total',
        check: 'Four items add up to 29.50, matching the subtotal.',
        note: 'This photo was taken at an angle on a dark table. It was straightened by 2.2° and the lighting evened out before reading.',
      },
      code: {
        label: 'Looks like a screenshot of Python code',
        note: 'Indentation is rebuilt from where each word sits, curly quotes are straightened, and the dark theme is inverted before reading.',
      },
      document: {
        label: 'Looks like an article or document',
        note: "Wrapped lines become paragraphs, and headings and lists come through — including bullets the engine can't see. Download as Word or Markdown.",
      },
      notes: {
        label: 'Read as handwriting',
        note: 'Neat, print-style writing reads well. Joined-up cursive is harder, so doubtful words are underlined for you to check.',
      },
      langs: {
        label: 'Found Devanagari text — read as Hindi + English',
        note: 'Nothing to set up: lines in another script are spotted and the page is read again with the right language. 47 languages, several at once.',
      },
    },

    shortcut: {
      eyebrow: 'Keyboard',
      title: 'Screenshot to text without saving a file',
      lede: 'Most text people need is on a screen: an error message, a chat, a slide in a video call. Copy the screenshot, paste it here, and the text is ready a moment later. On a phone, share or upload the screenshot instead.',
      computer: 'Your computer',
      /** Chromebook key label. */
      showWindows: 'Show windows',
      shotNotes: {
        mac: 'drag over the text; it goes straight to the clipboard',
        win: 'drag over the text; Snipping Tool copies it',
        cros: 'choose an area; the screenshot is copied',
      },
      step1: 'Take a screenshot to the clipboard — {note}.',
      step2: 'Paste anywhere on this page. Reading starts by itself.',
      step3: 'Copy all the text, ready to paste where you need it.',
    },

    after: {
      eyebrow: 'Review and export',
      title: 'Built for what happens after the text appears',
      reviewTitle: 'Check the words that matter',
      reviewText:
        'Click a line of text and its spot lights up on the image; click the image and the cursor jumps to that text. Words the engine was unsure about are underlined, and one button walks you through them. You also get an honest confidence level, never a promise of perfection.',
      pagesTitle: 'Many images, one document',
      pagesText:
        'Drop a stack of screenshots or scanned pages. Each becomes a page you can reorder, read again or remove. The whole-document view joins them in your order, searches across every page and exports one Word, PDF or Markdown file — or a ZIP of separate files.',
      /** Shown under the progress bar in the illustration; {n} counts up. */
      pagesMeta: 'Reading {n} of 20',
      outTitle: 'Take it anywhere',
      outText:
        'Copy keeps headings, lists and tables when you paste into Google Docs, Word or Sheets. Download any of eight formats, including a searchable PDF that puts selectable text behind the original image. Share a link that carries the text itself, so nothing is uploaded.',
    },

    privacy: {
      eyebrow: 'Privacy',
      title: 'Your images stay on your device',
      lede: "The text engine runs inside your browser, so pictures of receipts, contracts, medical letters and private chats never reach a server. There's no account, no ads and no captcha.",
      more: 'Read exactly what happens',
      uploadTitle: 'Nothing to upload.',
      uploadText: 'Reading happens on your device. Only the engine and language files are downloaded, once.',
      keptTitle: 'Nothing kept.',
      keptText: "Close the tab and it's gone. History is off unless you switch it on, and then it stays in this browser.",
      checkTitle: 'Check it yourself.',
      checkText: "Your browser's Network panel shows no image leaving, and once you've read one image the tool keeps working offline.",
      cloudTitle: 'Cloud only if you ask.',
      cloudText: "For hard handwriting there's an optional Enhanced reading that sends one page to our server — only when you press it.",
    },

    formats: {
      eyebrow: 'Specification',
      title: 'Supported formats and languages',
      filesTerm: 'Files',
      filesText:
        'JPG and JPEG, PNG, WebP, GIF, BMP, TIFF (every page), HEIC and HEIF from iPhones, and PDF (every page — digital PDFs are copied directly, scanned ones are read). Up to 25 MB each, 50 pages at a time.',
      waysTerm: 'Ways in',
      waysText: 'Drag and drop, choose files, paste with Ctrl or ⌘ + V anywhere on the page, paste an image link, or use the camera on a phone.',
      contentTerm: 'Content',
      contentText:
        'Screenshots, scanned and photographed documents, receipts and invoices, tables, forms, books and newspapers, notes and handwriting, posters and labels, code, and simple equations.',
      languagesTerm: 'Languages',
      /** {popular} and {others} are lists of language names. */
      languagesText: '{popular}, plus {others}. Several at once on the same image.',
      fixesTerm: 'Fixes',
      fixesText:
        'Auto improve (dark-mode inversion, shadow removal, straightening, contrast), crop, four-corner perspective correction, rotate, brightness, contrast, sharpen, grayscale, black and white, noise reduction.',
    },

    about: {
      eyebrow: 'About the tool',
      title: 'Convert image to text online, free and private',
      lede: 'How the image to text converter works, what it can read, and how to get clean, accurate text from any picture.',
      toc: 'On this page',
      /** The long-form article. `id` is the jump-link anchor: keep it unchanged. */
      sections: [
        {
          id: 'what-is-image-to-text',
          label: 'What is an image to text converter?',
          heading: 'What is an image to text converter?',
          html: "<p>An image to text converter takes a picture that contains writing — a screenshot, a phone photo, a scanned page or a PDF — and turns that writing into real text you can select, edit, search and paste. The technology behind it is OCR, short for optical character recognition. Image to Text App uses Tesseract, an open-source OCR engine built on a neural network, and runs it directly in your browser. It doesn't just return a block of characters: it works out whether you've given it a table, a receipt, code, an article or handwritten notes, and lays the text out to match.</p>",
        },
        {
          id: 'how-to-convert-image-to-text',
          label: 'How to convert an image to text',
          heading: 'How to convert an image to text',
          html: '<ol><li><strong>Add your image.</strong> Paste a screenshot with Ctrl+V (⌘V on a Mac), drag and drop a file, choose images from your device, paste an image link, or take a photo on your phone.</li><li><strong>Let it read.</strong> Reading starts on its own and usually takes a few seconds per page. A short label tells you what it found, such as “Looks like a table with 5 columns”.</li><li><strong>Check the text.</strong> Click any line to see where it came from on the image. Words the engine was unsure about are underlined, so you can fix them quickly.</li><li><strong>Copy or download.</strong> Copy everything with one click, or download it as a Word, Excel, PDF or plain text file.</li></ol>',
        },
        {
          id: 'free-image-to-text',
          label: 'Free, with no limits',
          heading: 'A free image to text converter with no limits',
          html: "<p>There's no sign-up, no daily cap, no watermark and no captcha. Because the text is recognised on your own device rather than on a paid server, the whole tool is free to use as often as you like, with every reading mode, every language and every download format included. Convert one quick screenshot or a stack of fifty scanned pages; nothing is held back for a paid plan.</p>",
        },
        {
          id: 'jpg-png-pdf-handwriting',
          label: 'JPG, PNG, PDF and handwriting',
          heading: 'JPG, PNG, PDF, screenshots and handwriting',
          html: '<p>It reads JPG and JPEG, PNG, WebP, GIF, BMP, TIFF and iPhone HEIC photos, up to 25 MB each. In a PDF, digital pages are copied exactly as they are and scanned pages are read with OCR, so turning a PDF image to text is quick and accurate. Screenshots of chats, error messages and slides read especially cleanly, and dark-mode captures are handled automatically. Neat, print-style handwriting works well too; joined-up cursive is harder for any on-device engine, so doubtful words are flagged for you. Each format has its own page with tips: <a href="/jpg-to-text">JPG to text</a>, <a href="/png-to-text">PNG to text</a>, <a href="/pdf-to-text">PDF to text</a>, <a href="/screenshot-to-text">screenshot to text</a> and <a href="/handwriting-to-text">handwriting to text</a>.</p>',
        },
        {
          id: 'image-to-word-excel',
          label: 'Word, Excel and Google Docs',
          heading: 'Image to text in Word, Excel and Google Docs',
          html: '<p>Copying keeps headings, lists and tables, so the text pastes neatly into Google Docs, Microsoft Word or Google Sheets. To convert an image to text in Word, download a .docx with its paragraphs and headings intact. Pictures of tables become an editable grid: fix any cell, then paste it into Excel or download XLSX or CSV with numbers kept as numbers. You can also save a searchable PDF, Markdown, JSON or HTML. See <a href="/image-to-word">image to Word</a>, <a href="/image-to-excel">image to Excel</a> and <a href="/image-to-pdf">image to PDF</a>.</p>',
        },
        {
          id: 'image-to-text-languages',
          label: '47 languages',
          heading: '47 languages, including Hindi, Bangla and Urdu',
          html: '<p>The converter reads 47 languages, from English, Spanish, French, German and Portuguese to Arabic, Chinese, Japanese, Korean and Russian. It also covers the major South Asian scripts: Hindi, Bengali (Bangla), Urdu, Nepali, Marathi, Tamil, Telugu, Kannada, Malayalam, Gujarati and Punjabi. Leave it on Auto and it spots lines in another script and reads them again with the right language, or choose several languages yourself for a mixed-language image.</p>',
        },
        {
          id: 'bulk-image-to-text',
          label: 'Many images at once',
          heading: 'Bulk image to text: many images at once',
          html: '<p>Add up to 50 images or PDF pages in one go. Each becomes a page with its own result that you can reorder, read again or remove. The whole-document view joins every page in your order, searches across all of them, and exports one combined file or a ZIP of separate files — handy for a batch of receipts, lecture slides or a scanned report.</p>',
        },
        {
          id: 'private-ocr',
          label: 'Private OCR in your browser',
          heading: 'Private OCR that runs in your browser',
          html: '<p>Many online OCR tools upload your pictures to a server. This one doesn\'t: the text engine runs inside your browser, so receipts, contracts, ID documents and private chats never leave your device. Only the engine and language files are downloaded the first time, and after that it keeps working offline. History stays off unless you switch it on. Read <a href="/privacy">exactly what happens to your images</a>.</p>',
        },
        {
          id: 'accuracy-tips',
          label: 'Tips for accurate results',
          heading: 'Tips for more accurate results',
          html: '<p>Start with the sharpest image you have: a straight-on photo in even light, or a screenshot rather than a photo of a screen. Crop away anything you don\'t need, and pick the language if Auto isn\'t sure. For difficult images, the Adjust panel can straighten, sharpen and boost contrast before reading. There\'s more in the guide to <a href="/guides/how-to-get-accurate-ocr-results">getting accurate OCR results</a>.</p>',
        },
      ],
    },

    faqHeading: 'Image to text: questions people ask',
    /** Shown on the page and sent to search engines as FAQPage structured data. Plain text only. */
    faq: [
      { q: 'How do I convert an image to text?', a: 'Paste a screenshot with Ctrl+V (⌘V on a Mac), or drag in a JPG, PNG, photo or PDF. Reading starts by itself and takes a few seconds per page. Check any underlined words, then copy the text or download it as Word, Excel, PDF or plain text.' },
      { q: 'How do I extract text from an image?', a: "Add the image and the text is extracted automatically. The tool works out whether it's a document, table, receipt, code or handwriting and lays the text out to match. To extract text from just one part of the image, crop it first; click any line to see exactly where it came from." },
      { q: 'How do I copy text from an image?', a: 'Paste or drop the image, wait a few seconds, then press Copy to put all the text on your clipboard, or select just the lines you need. Headings, lists and tables stay intact when you paste into Google Docs, Word or Google Sheets.' },
      { q: 'Is this image to text converter free?', a: "Yes, completely. There's no sign-up, no daily limit, no watermark and no paid plan: every reading mode, all 47 languages and every download format are included. Because the text is read on your own device, it costs almost nothing to run." },
      { q: 'Is image to text AI free to use?', a: 'Yes. The text is recognised by Tesseract, an open-source OCR engine built on a neural network, and it runs in your browser rather than on a paid AI server. That means no credits, no free trial that runs out and no limit on how often you use it.' },
      { q: 'Are my images uploaded to a server?', a: 'No. The text engine runs inside your browser, so your images never leave your device. Only the engine and language files are downloaded the first time and then cached, after which the tool keeps working offline. History stays off unless you switch it on.' },
      { q: 'How accurate is the image to text converter?', a: 'Clear printed text, such as screenshots and scanned documents, is usually read very accurately. Small text, blurry or dim photos, decorative fonts and handwriting are harder, so words the engine is unsure about are underlined, and clicking a line highlights its spot on the image so checking takes seconds.' },
      { q: 'Can I convert handwriting to text?', a: 'Yes. Neat, print-style handwriting usually converts well. Joined-up cursive is much harder for any on-device engine, so expect to correct some words; doubtful ones are underlined for you. A sharp, straight-on photo in good light makes the biggest difference.' },
      { q: 'Can I convert an image to Word?', a: 'Yes. Add the image, then download a .docx file with headings, paragraphs and lists kept, ready to edit in Microsoft Word. You can also copy the text and paste it into Word or Google Docs with its formatting intact, or combine several images into one Word document.' },
      { q: 'Can I convert a PDF image to text?', a: 'Yes. Drop in a PDF and every page is read, up to 50 at a time. Pages that already contain digital text are copied exactly, and scanned or image-only pages are read with OCR. Copy the result, or download it as plain text, Word or a searchable PDF.' },
      { q: 'Can I convert a PDF image to Word?', a: 'Yes. Add a scanned or image-based PDF and every page is read with OCR. Then download a single .docx with the pages in order and headings, paragraphs and lists preserved, ready to edit in Word or Google Docs.' },
      { q: 'Can I convert a picture of a table to Excel?', a: 'Yes. Tables are detected automatically and shown as an editable grid. Fix any cell, then paste it straight into Excel or Google Sheets, or download .xlsx or CSV with numbers kept as numbers.' },
      { q: 'Can I convert multiple images to text at once?', a: 'Yes, up to 50 images or PDF pages in one go. Each becomes a page you can reorder, read again or remove. The whole-document view joins them in your order, searches across every page and exports one combined file or a ZIP of separate files.' },
      { q: 'Which languages are supported?', a: '47 languages, including English, Spanish, French, German, Portuguese, Arabic, Chinese, Japanese, Korean, Russian, Hindi, Bengali (Bangla), Urdu, Nepali, Tamil and Kannada. Leave it on Auto to spot other scripts automatically, or choose several languages for a mixed-language image.' },
      { q: 'Does image to text work on mobile phones?', a: "Yes, on iPhone and Android in any modern browser, with no app to install. Take a photo with the camera button or pick a screenshot from your gallery, then copy, download or share the text. iPhone HEIC photos open without converting." },
      { q: 'Can I use image to text without signing up?', a: "Yes. There's no account, no email address and no captcha. Open the page, paste or drop an image, and the text is ready in seconds. Nothing is saved unless you switch on History, and then it stays in your own browser." },
      { q: 'Can I convert JPG and PNG images to text?', a: 'Yes. JPG, JPEG and PNG all work, along with WebP, GIF, BMP, TIFF and iPhone HEIC photos, up to 25 MB each. Drag the file in, choose it from your device or paste it, and the text is extracted automatically.' },
      { q: 'Can I convert screenshots to text?', a: "Yes, and screenshots usually give the cleanest results. Copy a screenshot to your clipboard and press Ctrl+V (⌘V on a Mac) anywhere on the page; there's no need to save a file first. Dark-mode screenshots are inverted automatically, and code keeps its indentation." },
      { q: 'Can I remove text from an image online for free?', a: "Not with this tool. Image to Text App reads the text out of an image; it doesn't erase it from the picture. To remove text, use a photo editor with an object-removal, healing or magic-eraser tool, many of which are free online." },
      { q: 'Can I remove text from an image?', a: "If you mean taking the text out of an image so you can edit or reuse it, yes: that's exactly what this tool does, and you can copy or download the result. If you mean erasing the text so the picture looks clean, you'll need an image editor with an inpainting or object-removal tool instead." },
    ],
    relatedHeading: 'More image to text tools',

    cta: {
      title: 'Paste a screenshot. Copy the text.',
      lede: 'Free, private and already running in this tab.',
      choose: 'Choose images',
      allTools: 'See all tools',
    },
  },

  /** Shared by tool pages. */
  tool: {
    howToUse: 'How to use it',
    faqHeading: 'Questions people ask',
    relatedHeading: 'Related tools',
  },

  toolsPage: {
    count: { one: '{n} tool', other: '{n} tools' } as Plural,
    title: 'Tools',
    lede: "It's all one workspace. Each page below starts it with the right settings for a particular job, and explains how to get the best result.",
    open: 'Open the main tool',
    groupHave: 'Start from what you have',
    groupFormat: 'Get the format you need',
    groupSpecial: 'Read special content',
  },

  guidesPage: {
    count: { one: '{n} guide', other: '{n} guides' } as Plural,
    title: 'Guides',
    lede: 'How to get clean, editable text out of screenshots, photos, scans and handwriting, and how OCR works behind the scenes.',
    crumb: 'Guides',
    updated: 'Updated',
    onThisPage: 'On this page',
    tryIt: 'Try it',
    open: 'Open {name}',
    more: 'More guides',
  },

  privacyPage: {
    eyebrow: 'Privacy policy',
    title: 'What happens to your images',
    lede: 'Short version: they are read on your device and never sent to us.',
    ledeEnhanced: 'Short version: they are read on your device and never sent to us, unless you choose Enhanced reading for a page.',
    deviceTitle: 'On your device',
    deviceTag: 'Default',
    whereTerm: 'Where the text is read',
    whereText: 'In your browser, by the open-source Tesseract engine compiled to WebAssembly.',
    uploadTerm: 'What is uploaded',
    uploadText: 'Nothing. Your images and text stay on your device.',
    downloadTerm: 'What is downloaded',
    downloadText: "The page, the text engine and the language models you use (English is a few megabytes). Your browser caches them, so it isn't repeated.",
    keptTerm: 'What is kept',
    keptText: 'Nothing, unless you turn on History. Close the tab and the images and text are gone.',
    trainingTerm: 'Training',
    trainingText: "Never. We don't see your images, so we can't use them for anything.",
    enhTitle: 'Enhanced reading',
    enhTag: 'Only when you choose it',
    enhWhenTerm: "When it's used",
    enhWhenText: 'Only after you press "Try Enhanced reading" for a page and confirm. It is never used automatically.',
    enhUploadText: 'That one page image, resized to at most 2,000 pixels, plus the reading mode and language you picked.',
    enhWhoTerm: 'Who reads it',
    enhWhoText: "Our server passes it to Anthropic's Claude model through Anthropic's commercial API, and returns the text to you.",
    enhKeptHtml:
      'Our server doesn\'t save the image or the text. To enforce the daily limit it counts requests per visitor, using a hash of the IP address that is discarded after a day. Anthropic\'s <a href="https://www.anthropic.com/legal/privacy" rel="noopener">privacy policy</a> describes how long it keeps API data.',
    enhTrainingText: "We don't use it for training. Anthropic's commercial terms say it doesn't train its models on API data by default.",
    historyTitle: 'History',
    historyText:
      "History is off by default. If you turn it on, your documents (images, text and edits) are saved in this browser's own storage on this device. They are never uploaded. You can delete one document or clear everything from the History panel, and clearing your browser's site data removes it too.",
    linksTitle: 'Links you share',
    linksHtml:
      '"Copy link" puts the text inside the link itself, after the <code>#</code>. Browsers don\'t send that part to any server, so sharing a link uploads nothing. Anyone who has the link can read the text, so treat it like the text itself.',
    fromLinkTitle: 'Images from a link',
    fromLinkText:
      "When you paste an image link, your browser first tries to load the image directly. If the other site doesn't allow that, our server fetches that one image for you and passes it straight back, without storing it.",
    checkTitle: 'Check it yourself',
    checkText:
      "You don't have to take our word for it. Open your browser's developer tools, choose the Network tab and read an image: you'll see the engine and language files arrive, and no request carrying your image leave. Once you've read one image, the tool keeps working with your network switched off.",
    analyticsTitle: 'Analytics and cookies',
    analyticsText:
      "This site doesn't use advertising, tracking cookies or third-party analytics. It stores a few preferences (your languages, whether History is on) in your browser's local storage.",
  },

  /** Shared by the Privacy policy and Terms pages. */
  legalPage: {
    updated: 'Last updated',
    onThisPage: 'On this page',
    /** Shown on translated legal pages only. {href} is the English page. */
    translationNoteHtml: 'This is a translation. Where it differs from the <a href="{href}" hreflang="en">English version</a>, the English version applies.',
  },

  aboutPage: {
    eyebrow: 'About us',
    title: 'Text in images should be easy to copy',
    lede: '{site} is a free image to text converter that runs in your browser. Paste a screenshot or drop a photo, scan or PDF, and get text you can edit, check and export, without signing up and without uploading your images.',
    whyTitle: 'Why we built it',
    whyHtml:
      '<p>Most of the text people need is already in front of them: an error message, a receipt, a slide, a page of notes. Getting it out should take seconds. Too often it means uploading a private image to a server you know nothing about, sitting through ads or running into a daily limit.</p><p>So we built the opposite. {site} reads the image where it already is, on your device, with the open-source Tesseract engine. There is no account to create and nothing to install, and once the engine has loaded it keeps working offline.</p>',
    principlesTitle: 'What we care about',
    principles: [
      {
        title: 'Private by design',
        text: 'Images are read in your browser, not on our servers. History is off unless you turn it on, and there is no tracking or advertising.',
      },
      {
        title: 'Free, with no catch',
        text: 'No sign-up, no ads, no captcha and no daily limit for reading on your device. Up to {pages} images at a time, {mb} MB each.',
      },
      {
        title: 'Honest about limits',
        text: 'OCR makes mistakes, so the tool shows you where. Words it was unsure about are underlined and the confidence level is shown, never a promise of perfection.',
      },
      {
        title: 'Made for real documents',
        text: 'Tables become editable grids, receipts become fields, code keeps its indentation and documents keep their headings and lists.',
      },
    ],
    factsTitle: 'At a glance',
    factLanguages: 'languages, several on one page',
    factPages: 'images in one batch',
    factFormats: 'download formats',
    factSignups: 'accounts needed',
    howTitle: 'How it works',
    howHtml:
      '<ol><li><strong>Add an image.</strong> Paste, drop, pick a file, take a photo or paste a link. JPG, PNG, WebP, HEIC, TIFF, GIF, BMP and PDF all work.</li><li><strong>It is read on your device.</strong> Auto improve cleans up the image, the type of page is detected, and Tesseract reads the text right in your browser.</li><li><strong>Check, edit and export.</strong> Fix any underlined words, then copy the text or download it as Word, Excel, PDF, Markdown, JSON and more.</li></ol><p>Want the details? Read <a href="/guides/how-ocr-works">how OCR works</a>, or see <a href="/privacy">what happens to your images</a>.</p>',
    creditsTitle: 'Built on open source',
    creditsText: 'The tool stands on the work of these open-source projects. Thank you to everyone who builds and maintains them.',
    /** What each project does here (project names and licenses aren't translated). */
    creditRoles: {
      tesseract: 'Text recognition engine',
      tesseractjs: 'Tesseract in the browser',
      pdfjs: 'Reading PDF files',
      libheif: 'Opening iPhone HEIC photos',
      codemirror: 'Text editor',
      utif: 'Reading TIFF images',
      fflate: 'ZIP files',
      svelte: 'Workspace interface',
      astro: 'Website framework',
      geist: 'Typeface',
    },
    ctaTitle: "Questions, ideas or a file that won't read?",
    ctaText: "We'd like to hear from you.",
    ctaContact: 'Contact us',
    ctaTool: 'Open the tool',
  },

  contactPage: {
    eyebrow: 'Contact',
    title: 'Get in touch',
    lede: 'Found a bug, have an idea or a question about privacy? Email is the best way to reach us.',
    emailLabel: 'Email',
    write: 'Write an email',
    copy: 'Copy address',
    copied: 'Copied',
    topicsTitle: 'What can we help with?',
    /** {topic} is the card title, for screen readers. */
    topicLink: 'Email us',
    topicLinkLabel: 'Email us: {topic}',
    topics: [
      {
        title: 'Report a problem',
        text: "A file that won't open, text that comes out wrong or a button that doesn't work. Tell us your browser and device.",
        subject: 'Problem report',
        body: 'What happened:\n\nWhat I expected:\n\nBrowser and device:\n',
      },
      {
        title: 'Suggest a feature',
        text: "A format you need, a language that's missing or a way to make the tool quicker to use.",
        subject: 'Feature idea',
        body: '',
      },
      {
        title: 'Privacy and legal',
        text: 'Questions about how your data is handled, requests under the GDPR or CCPA, or anything about our terms.',
        subject: 'Privacy request',
        body: '',
      },
      {
        title: 'Press and partnerships',
        text: 'Writing about the tool, linking to it from your site, or interested in working together.',
        subject: 'Press and partnerships',
        body: '',
      },
    ],
    sensitiveNote:
      "Please don't email images that contain personal or sensitive information. If a file reads badly, a similar example without private details helps us just as much.",
    privacyHtml: 'We use your message only to reply to you. See the <a href="/privacy">privacy policy</a>.',
    faqTitle: 'Before you write',
    faq: [
      {
        q: 'Is the tool really free?',
        aHtml: "Yes. There's no sign-up, no ads and no daily limit for reading on your device. <a href=\"/\">Open the tool</a> and paste an image.",
      },
      {
        q: 'Can you see the images I read?',
        aHtml: 'No. Images are read in your browser and are not uploaded to us. The <a href="/privacy">privacy policy</a> explains every detail.',
      },
      {
        q: 'Some text came out wrong. What can I do?',
        aHtml: 'Crop to the text, check that the right language is selected and try a sharper, well-lit photo. The guide to <a href="/guides/how-to-get-accurate-ocr-results">getting accurate OCR results</a> has more tips.',
      },
      {
        q: 'Does it work offline?',
        aHtml: 'Yes, after the first read. Your browser keeps the engine and language files, so the tool keeps working without a connection.',
      },
    ],
  },

  /** 404 and 500 pages. In `report`, {link} becomes a link with `reportLink` as its text. */
  errorPage: {
    notFound: {
      eyebrow: 'Error 404',
      title: "This page doesn't exist",
      lede: 'The link may be old or mistyped. Everything else is still here: the image to text tool, a page for every task, and guides.',
      /** Label on the illustration, styled like the tool's "words to check". */
      badge: 'Not found',
      report: 'Think something should be here? {link}.',
      reportLink: 'Let us know',
      reportSubject: 'Broken link',
    },
    serverError: {
      eyebrow: 'Error 500',
      title: 'Something went wrong on our side',
      lede: "It's not you: the server hit an error. Images you read on your device aren't affected. Please try again in a moment.",
      badge: 'Server error',
      retry: 'Try again',
      report: 'If it keeps happening, {link}.',
      reportLink: 'please tell us',
      reportSubject: 'Server error',
    },
    home: 'Open the image to text tool',
    tools: 'Browse all tools',
    popular: 'Popular pages',
    guides: 'All guides',
    contact: 'Contact us',
  },

  sharePage: {
    eyebrow: 'Shared text',
    fallbackTitle: 'Shared text',
    copy: 'Copy text',
    copied: 'Copied',
    download: 'Download .txt',
    readOwn: 'Read your own image',
    note: 'This text travelled inside the link, so it was never uploaded to a server.',
    brokenTitle: "This link doesn't contain any text",
    brokenHtml: 'It may have been cut off when it was copied. Ask for the link again, or <a href="/">read an image yourself</a>.',
  },
};

export default en;
export type UI = typeof en;
