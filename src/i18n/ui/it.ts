// Italian site text. Source and conventions: ./en.ts

import type { UI } from './en';

const it = {
  meta: {
    homeTitle: 'Convertire immagine in testo – OCR gratis | Image to Text App',
    homeDescription:
      'Converti immagini in testo online gratis: estrai testo da JPG, PNG, screenshot, PDF e scritte a mano in 47 lingue. Senza registrazione e senza caricare nulla.',
    siteDescription:
      'Convertitore da immagine a testo gratuito che funziona nel browser. Estrai testo modificabile da JPG, PNG, screenshot, PDF, tabelle, scontrini e scrittura a mano, senza registrazione: le tue immagini restano sul tuo dispositivo.',
    ogImageAlt: 'Image to Text App: copia il testo da qualsiasi immagine, gratis e nel browser',
    toolsTitle: 'Strumenti per convertire immagini in testo',
    toolsDescription:
      'Tutti gli strumenti da immagine a testo: screenshot, foto, PDF, scrittura a mano, tabelle in Excel, scontrini, fatture e codice. Un solo spazio di lavoro.',
    guidesTitle: 'Guide per estrarre il testo dalle immagini',
    guidesDescription:
      'Guide pratiche per copiare il testo da screenshot, foto, scansioni, scontrini, tabelle e scrittura a mano su qualsiasi dispositivo, anche senza app dedicate.',
    privacyTitle: 'Informativa sulla privacy: cosa succede alle tue immagini',
    privacyDescription:
      'Come {site} gestisce le tue immagini e il tuo testo: lettura sul tuo dispositivo, nessun caricamento e cronologia disattivata finché non la attivi tu.',
    aboutTitle: 'Chi siamo: da immagine a testo gratis, sul tuo dispositivo',
    aboutDescription:
      'Perché esiste {site}: da immagine a testo gratis nel browser, senza account né caricamenti. I nostri principi e il software open source che usiamo.',
    contactTitle: 'Contatti',
    contactDescription:
      'Contatta {site} via email per segnalare un problema, suggerire una funzione, fare domande sulla privacy o proporre articoli e collaborazioni.',
    termsTitle: 'Termini e condizioni',
    termsDescription:
      'Termini e condizioni di {site}: immagini e testo restano tuoi, uso corretto del servizio, precisione dei risultati e limitazione di responsabilità.',
    notFoundTitle: 'Pagina non trovata',
    notFoundDescription:
      'Questa pagina non esiste. Lo strumento per convertire immagini in testo, una pagina per ogni esigenza e le nostre guide sono a un clic di distanza.',
    serverErrorTitle: 'Qualcosa è andato storto',
    serverErrorDescription: 'Il server ha riscontrato un errore. Riprova tra qualche istante.',
    shareTitle: 'Testo condiviso',
    shareDescription: 'Testo condiviso da {site}. Il testo è contenuto nel link stesso.',
  },

  nav: {
    main: 'Principale',
    homeLabel: 'Home di {site}',
    tools: 'Strumenti',
    guides: 'Guide',
    privacy: 'Privacy',
    openTool: 'Apri lo strumento',
    history: 'Cronologia',
    skip: 'Vai al contenuto',
    breadcrumb: 'Percorso di navigazione',
  },

  theme: {
    menu: 'Tema',
    current: 'Tema: {name}',
    system: 'Sistema',
    light: 'Chiaro',
    dark: 'Scuro',
    systemTheme: 'Tema di sistema',
    lightTheme: 'Tema chiaro',
    darkTheme: 'Tema scuro',
  },

  language: {
    menu: 'Lingua',
    current: 'Lingua: {name}',
  },

  footer: {
    about: 'Da immagine a testo direttamente nel browser. Niente registrazione, niente pubblicità, e le tue immagini restano sul tuo dispositivo.',
    tools: 'Strumenti',
    imageToText: 'Immagine in testo',
    guides: 'Guide',
    allGuides: 'Tutte le guide',
    privacy: 'Informativa sulla privacy',
    terms: 'Termini e condizioni',
    aboutUs: 'Chi siamo',
    contact: 'Contatti',
    allTools: 'Tutti gli strumenti',
    howOcrWorks: "Come funziona l'OCR",
    copyright: '© {year} {site}. Riconoscimento del testo con il motore open source Tesseract.',
    languages: 'Lingue',
  },

  hero: {
    crumbHome: 'Immagine in testo',
    homeH1: 'Convertire immagine in testo gratis',
    homeIntro:
      'Copia il testo da qualsiasi immagine. Incolla uno screenshot o trascina un JPG, un PNG, una foto, una scansione o un PDF e ottieni testo da modificare, controllare ed esportare, tabelle, scontrini e codice compresi. OCR online gratis che funziona nel browser: le tue immagini restano sul tuo dispositivo.',
  },

  schema: {
    operatingSystem: 'Qualsiasi (funziona nel browser)',
    browserRequirements: 'Richiede un browser moderno con WebAssembly',
    appAlternateNames: ['Convertitore da immagine a testo', 'OCR da immagine a testo'],
    featureList: [
      'Convertitore da immagine a testo gratuito, senza registrazione e senza limiti giornalieri',
      'Da immagine a testo nel browser, senza caricare le immagini',
      'JPG, PNG, WebP, HEIC, TIFF, GIF, BMP e PDF',
      'Riconoscimento automatico di tabelle, scontrini, codice, documenti e scrittura a mano',
      'Da tabella a Excel e CSV',
      'Campi di scontrini e fatture',
      '47 lingue, tra cui hindi, bengalese, urdu, nepalese, tamil e kannada',
      'Conversione in blocco: fino a 50 immagini alla volta',
      'Esportazione in Word, PDF, PDF ricercabile, Markdown, JSON, CSV, Excel, HTML e testo',
    ],
    howToName: "Come convertire un'immagine in testo",
    howToDescription: 'Estrai testo modificabile da uno screenshot, una foto, una scansione o un PDF direttamente nel browser.',
  },

  home: {
    howTo: [
      { name: "Aggiungi l'immagine", text: "Incolla uno screenshot con Ctrl+V (⌘V su Mac), trascina un file, scegli le immagini, incolla il link di un'immagine o scatta una foto con il telefono." },
      { name: 'Attendi la lettura', text: 'La lettura parte da sola e di solito richiede pochi secondi per pagina. Una breve etichetta indica cosa è stato trovato, ad esempio una tabella, uno scontrino o del codice.' },
      { name: 'Controlla il testo', text: "Fai clic su una riga per vedere da quale punto dell'immagine proviene. Le parole su cui il motore aveva dubbi sono sottolineate, così puoi correggerle." },
      { name: 'Copia o scarica', text: 'Copia il testo con un clic oppure scaricalo in formato Word, Excel, PDF, Markdown, JSON, CSV, HTML o testo semplice.' },
    ],

    readas: {
      eyebrow: 'Riconoscimento',
      title: 'Un convertitore da immagine a testo che sa cosa sta leggendo',
      lede: "Ogni immagine viene analizzata per riconoscere tabelle, scontrini, codice, documenti e scrittura a mano, e poi letta nel modo più adatto. Vedrai una breve etichetta come «Sembra una tabella». Puoi passare a un'altra modalità in qualsiasi momento, senza dover caricare di nuovo l'immagine.",
      tabsLabel: 'Esempi',
      tabs: {
        table: 'Tabelle',
        receipt: 'Scontrini',
        code: 'Codice',
        document: 'Documenti',
        notes: 'Scrittura a mano',
        langs: 'Lingue miste',
      },
      alts: {
        table: "Screenshot di una tabella di un foglio di calcolo con gli ordini per regione, prima di convertire l'immagine in testo",
        receipt: 'Foto di uno scontrino di un bar scattata di sbieco su un tavolo scuro',
        code: 'Screenshot di codice Python in un editor con tema scuro',
        document: 'Pagina scansionata di un articolo su come curare il lievito madre',
        notes: 'Appunti di una riunione scritti a mano su un foglio a righe',
        langs: 'Avviso di una biblioteca scritto in inglese e in hindi',
      },
      caption: "L'immagine",
      table: {
        label: 'Sembra una tabella con 5 colonne',
        note: 'Modifica qualsiasi cella, poi copiala direttamente in Excel o Google Sheets, oppure scarica il file CSV o .xlsx. I numeri restano numeri.',
      },
      receipt: {
        label: 'Sembra uno scontrino',
        business: 'Esercente',
        date: 'Data',
        subtotal: 'Subtotale',
        tax: 'Imposte',
        total: 'Totale',
        check: 'I quattro articoli sommati danno 29.50, come il subtotale.',
        note: "Questa foto è stata scattata di sbieco su un tavolo scuro. Prima della lettura è stata raddrizzata di 2,2° e l'illuminazione è stata uniformata.",
      },
      code: {
        label: 'Sembra uno screenshot di codice Python',
        note: "L'indentazione viene ricostruita in base alla posizione di ogni parola, le virgolette curve vengono raddrizzate e il tema scuro viene invertito prima della lettura.",
      },
      document: {
        label: 'Sembra un articolo o un documento',
        note: 'Le righe spezzate diventano paragrafi, e titoli ed elenchi vengono mantenuti, compresi i punti elenco che il motore non riesce a vedere. Scaricalo in formato Word o Markdown.',
      },
      notes: {
        label: 'Letto come scrittura a mano',
        note: 'La scrittura ordinata in stampatello si legge bene. Il corsivo è più difficile, quindi le parole dubbie vengono sottolineate perché tu possa controllarle.',
      },
      langs: {
        label: 'Trovato testo in devanagari: letto come hindi + inglese',
        note: "Non c'è niente da impostare: le righe scritte in un altro alfabeto vengono individuate e la pagina viene riletta con la lingua giusta. 47 lingue, anche più di una alla volta.",
      },
    },

    shortcut: {
      eyebrow: 'Tastiera',
      title: 'Da screenshot a testo senza salvare file',
      lede: 'Gran parte del testo che ci serve è su uno schermo: un messaggio di errore, una chat, una slide durante una videochiamata. Copia lo screenshot, incollalo qui e un attimo dopo il testo è pronto. Sul telefono, invece, condividi o carica lo screenshot.',
      computer: 'Il tuo computer',
      showWindows: 'Mostra finestre',
      shotNotes: {
        mac: 'trascina sopra il testo: finisce direttamente negli appunti',
        win: 'trascina sopra il testo: lo Strumento di cattura lo copia',
        cros: "scegli un'area: lo screenshot viene copiato",
      },
      step1: 'Fai uno screenshot negli appunti: {note}.',
      step2: 'Incolla in un punto qualsiasi di questa pagina. La lettura parte da sola.',
      step3: 'Copia tutto il testo, pronto da incollare dove ti serve.',
    },

    after: {
      eyebrow: 'Revisione ed esportazione',
      title: 'Pensato per quello che fai quando il testo è pronto',
      reviewTitle: 'Controlla le parole che contano',
      reviewText:
        "Fai clic su una riga di testo e il punto corrispondente si illumina sull'immagine; fai clic sull'immagine e il cursore salta a quel testo. Le parole su cui il motore aveva dubbi sono sottolineate e un pulsante ti porta dall'una all'altra. Ottieni anche un livello di affidabilità onesto, mai una promessa di perfezione.",
      pagesTitle: 'Tante immagini, un solo documento',
      pagesText:
        "Trascina una serie di screenshot o di pagine scansionate. Ognuno diventa una pagina che puoi riordinare, rileggere o rimuovere. La vista Documento intero le unisce nell'ordine che scegli, cerca in tutte le pagine ed esporta un unico file Word, PDF o Markdown, oppure uno ZIP di file separati.",
      pagesMeta: 'Lettura {n} di 20',
      outTitle: 'Portalo ovunque',
      outText:
        "La copia mantiene titoli, elenchi e tabelle quando incolli in Google Docs, Word o Sheets. Scarica in uno degli otto formati, tra cui un PDF ricercabile che mette il testo selezionabile dietro l'immagine originale. Condividi un link che contiene il testo stesso, così non viene caricato nulla.",
    },

    privacy: {
      eyebrow: 'Privacy',
      title: 'Le tue immagini restano sul tuo dispositivo',
      lede: 'Il motore di riconoscimento funziona dentro il tuo browser, quindi le foto di scontrini, contratti, referti medici e chat private non arrivano mai a un server. Niente account, niente pubblicità e nessun captcha.',
      more: 'Leggi cosa succede esattamente',
      uploadTitle: 'Niente da caricare.',
      uploadText: 'La lettura avviene sul tuo dispositivo. Vengono scaricati solo il motore e i file delle lingue, una volta sola.',
      keptTitle: 'Niente viene conservato.',
      keptText: 'Chiudi la scheda e non resta nulla. La cronologia è disattivata finché non la attivi, e anche allora resta in questo browser.',
      checkTitle: 'Verificalo tu stesso.',
      checkText: "Il pannello Rete del browser mostra che nessuna immagine esce dal dispositivo, e dopo aver letto un'immagine lo strumento funziona anche offline.",
      cloudTitle: 'Cloud solo se lo chiedi.',
      cloudText: "Per la scrittura a mano più difficile c'è una Lettura avanzata facoltativa che invia una pagina al nostro server, solo quando premi il pulsante.",
    },

    formats: {
      eyebrow: 'Specifiche',
      title: 'Formati e lingue supportati',
      filesTerm: 'File',
      filesText:
        'JPG e JPEG, PNG, WebP, GIF, BMP, TIFF (tutte le pagine), HEIC e HEIF da iPhone e PDF (tutte le pagine: i PDF digitali vengono copiati direttamente, quelli scansionati vengono letti). Fino a 25 MB ciascuno, 50 pagine alla volta.',
      waysTerm: 'Come aggiungerli',
      waysText: "Trascina e rilascia, scegli i file, incolla con Ctrl o ⌘ + V in un punto qualsiasi della pagina, incolla il link di un'immagine o usa la fotocamera del telefono.",
      contentTerm: 'Contenuti',
      contentText:
        'Screenshot, documenti scansionati e fotografati, scontrini e fatture, tabelle, moduli, libri e giornali, appunti e scrittura a mano, poster ed etichette, codice ed equazioni semplici.',
      languagesTerm: 'Lingue',
      languagesText: '{popular}, oltre a {others}. Anche più lingue insieme sulla stessa immagine.',
      fixesTerm: 'Correzioni',
      fixesText:
        'Miglioramento automatico (inversione della modalità scura, rimozione delle ombre, raddrizzamento, contrasto), ritaglio, correzione della prospettiva con i quattro angoli, rotazione, luminosità, contrasto, nitidezza, scala di grigi, bianco e nero, riduzione del rumore.',
    },

    about: {
      eyebrow: 'Lo strumento',
      title: 'Convertire immagini in testo online, gratis e in privato',
      lede: 'Come funziona il convertitore da immagine a testo, cosa riesce a leggere e come ottenere un testo pulito e preciso da qualsiasi immagine.',
      toc: 'In questa pagina',
      sections: [
        {
          id: 'what-is-image-to-text',
          label: "Cos'è un convertitore da immagine a testo?",
          heading: "Cos'è un convertitore da immagine a testo?",
          html: `<p>Un convertitore da immagine a testo prende un'immagine che contiene delle scritte (uno screenshot, una foto fatta con il telefono, una pagina scansionata o un PDF) e trasforma quelle scritte in testo vero, che puoi selezionare, modificare, cercare e incollare. La tecnologia alla base è l'OCR, sigla inglese di optical character recognition, cioè riconoscimento ottico dei caratteri. Image to Text App usa Tesseract, un motore OCR open source basato su una rete neurale, e lo esegue direttamente nel tuo browser. Non si limita a restituire un blocco di caratteri: capisce se gli hai dato una tabella, uno scontrino, del codice, un articolo o degli appunti scritti a mano, e impagina il testo di conseguenza.</p>`,
        },
        {
          id: 'how-to-convert-image-to-text',
          label: "Come convertire un'immagine in testo",
          heading: "Come convertire un'immagine in testo",
          html: `<ol><li><strong>Aggiungi l'immagine.</strong> Incolla uno screenshot con Ctrl+V (⌘V su Mac), trascina un file, scegli le immagini dal tuo dispositivo, incolla il link di un'immagine o scatta una foto con il telefono.</li><li><strong>Attendi la lettura.</strong> La lettura parte da sola e di solito richiede pochi secondi per pagina. Una breve etichetta ti dice cosa ha trovato, ad esempio «Sembra una tabella con 5 colonne».</li><li><strong>Controlla il testo.</strong> Fai clic su una riga per vedere da quale punto dell'immagine proviene. Le parole su cui il motore aveva dubbi sono sottolineate, così puoi correggerle in fretta.</li><li><strong>Copia o scarica.</strong> Copia tutto con un clic oppure scaricalo come file Word, Excel, PDF o di testo semplice.</li></ol>`,
        },
        {
          id: 'free-image-to-text',
          label: 'Gratis e senza limiti',
          heading: 'Un convertitore da immagine a testo gratis e senza limiti',
          html: `<p>Niente registrazione, nessun limite giornaliero, nessuna filigrana e nessun captcha. Visto che il testo viene riconosciuto sul tuo dispositivo e non su un server a pagamento, lo strumento è completamente gratuito e puoi usarlo tutte le volte che vuoi, con tutte le modalità di lettura, tutte le lingue e tutti i formati di download inclusi. Converti un veloce screenshot o una pila di cinquanta pagine scansionate: niente è riservato a un piano a pagamento.</p>`,
        },
        {
          id: 'jpg-png-pdf-handwriting',
          label: 'JPG, PNG, PDF e scrittura a mano',
          heading: 'JPG, PNG, PDF, screenshot e scrittura a mano',
          html: `<p>Legge JPG e JPEG, PNG, WebP, GIF, BMP, TIFF e le foto HEIC dell'iPhone, fino a 25 MB ciascuna. Nei PDF, le pagine digitali vengono copiate così come sono e quelle scansionate vengono lette con l'OCR, quindi convertire un PDF in testo è rapido e preciso. Gli screenshot di chat, messaggi di errore e slide vengono letti particolarmente bene, e le catture in modalità scura sono gestite in automatico. Anche la scrittura a mano ordinata, in stampatello, funziona bene; il corsivo è più difficile per qualsiasi motore che lavora sul dispositivo, quindi le parole dubbie vengono segnalate. Ogni formato ha una pagina dedicata con i relativi consigli: <a href="/jpg-to-text">JPG in testo</a>, <a href="/png-to-text">PNG in testo</a>, <a href="/pdf-to-text">PDF in testo</a>, <a href="/screenshot-to-text">screenshot in testo</a> e <a href="/handwriting-to-text">scrittura a mano in testo</a>.</p>`,
        },
        {
          id: 'image-to-word-excel',
          label: 'Word, Excel e Google Docs',
          heading: 'Da immagine a testo in Word, Excel e Google Docs',
          html: `<p>La copia mantiene titoli, elenchi e tabelle, quindi il testo si incolla in modo ordinato in Google Docs, Microsoft Word o Google Sheets. Per convertire un'immagine in un testo Word, scarica un file .docx con paragrafi e titoli intatti. Le foto di tabelle diventano una griglia modificabile: correggi qualsiasi cella, poi incollala in Excel o scarica un file XLSX o CSV in cui i numeri restano numeri. Puoi anche salvare un PDF ricercabile, un file Markdown, JSON o HTML. Vedi <a href="/image-to-word">immagine in Word</a>, <a href="/image-to-excel">immagine in Excel</a> e <a href="/image-to-pdf">immagine in PDF</a>.</p>`,
        },
        {
          id: 'image-to-text-languages',
          label: '47 lingue',
          heading: '47 lingue, tra cui italiano, hindi e urdu',
          html: `<p>Il convertitore legge 47 lingue: dall'italiano, l'inglese, lo spagnolo, il francese, il tedesco e il portoghese fino all'arabo, al cinese, al giapponese, al coreano e al russo. Copre anche le principali scritture dell'Asia meridionale: hindi, bengalese (bangla), urdu, nepalese, marathi, tamil, telugu, kannada, malayalam, gujarati e punjabi. Lascia l'opzione Auto e lo strumento individua le righe scritte in un altro alfabeto e le rilegge con la lingua giusta, oppure scegli tu più lingue per un'immagine che ne contiene diverse.</p>`,
        },
        {
          id: 'bulk-image-to-text',
          label: 'Tante immagini insieme',
          heading: 'Da immagine a testo in blocco: tante immagini insieme',
          html: `<p>Aggiungi fino a 50 immagini o pagine PDF in una volta sola. Ognuna diventa una pagina con il proprio risultato, che puoi riordinare, rileggere o rimuovere. La vista Documento intero unisce tutte le pagine nell'ordine che scegli, cerca in tutte ed esporta un unico file combinato o uno ZIP di file separati: comodo per una serie di scontrini, le slide di una lezione o un report scansionato.</p>`,
        },
        {
          id: 'private-ocr',
          label: 'OCR privato nel browser',
          heading: 'OCR privato che funziona nel tuo browser',
          html: `<p>Molti strumenti OCR online caricano le tue immagini su un server. Questo no: il motore di riconoscimento funziona dentro il tuo browser, quindi scontrini, contratti, documenti d'identità e chat private non lasciano mai il tuo dispositivo. La prima volta vengono scaricati solo il motore e i file delle lingue, e da quel momento lo strumento funziona anche offline. La cronologia resta disattivata finché non la attivi tu. Leggi <a href="/privacy">cosa succede esattamente alle tue immagini</a>.</p>`,
        },
        {
          id: 'accuracy-tips',
          label: 'Consigli per risultati precisi',
          heading: 'Consigli per risultati più precisi',
          html: `<p>Parti dall'immagine più nitida che hai: una foto scattata frontalmente con una luce uniforme, oppure uno screenshot invece di una foto dello schermo. Ritaglia tutto ciò che non ti serve e scegli la lingua se l'opzione Auto non è sicura. Per le immagini difficili, il pannello Regola può raddrizzare l'immagine, aumentarne la nitidezza e il contrasto prima della lettura. Trovi altri consigli nella guida per <a href="/guides/how-to-get-accurate-ocr-results">ottenere risultati OCR precisi</a>.</p>`,
        },
      ],
    },

    faqHeading: 'Da immagine a testo: le domande più frequenti',
    faq: [
      { q: "Come si converte un'immagine in testo?", a: 'Incolla uno screenshot con Ctrl+V (⌘V su Mac) o trascina un JPG, un PNG o un PDF. La lettura parte da sola: controlla le parole sottolineate, poi copia il testo o scaricalo in formato Word, Excel, PDF o testo semplice.' },
      { q: 'Questo convertitore da immagine a testo è davvero gratis?', a: 'Sì. La lettura avviene sul tuo dispositivo, quindi a noi non costa quasi nulla: niente registrazione, nessun limite giornaliero, nessuna filigrana e tutti i formati di download inclusi.' },
      { q: 'Le mie immagini vengono caricate online?', a: 'No. Il motore di riconoscimento funziona nel tuo browser e le immagini non lasciano mai il tuo dispositivo. Solo il motore e i file delle lingue vengono scaricati la prima volta, poi restano nella cache.' },
      { q: 'Quanto è preciso?', a: "Il testo stampato e chiaro di solito viene letto con grande precisione. Testo piccolo, foto poco illuminate, caratteri decorativi e scrittura a mano sono più difficili: per questo le parole dubbie sono sottolineate e, quando fai clic su una riga, il punto corrispondente dell'immagine si illumina. Così il controllo richiede pochi secondi." },
      { q: 'Riesce a leggere la scrittura a mano?', a: "La scrittura a mano ordinata, in stampatello, di solito si legge bene. Il corsivo è molto più difficile per qualsiasi motore che lavora sul dispositivo: mettiti in conto di dover correggere qualche parola. Una buona luce e una foto scattata frontalmente sono l'aiuto più grande." },
      { q: 'Posso trasformare la foto di una tabella in un file Excel?', a: 'Sì. Le tabelle vengono rilevate automaticamente e mostrate come una griglia modificabile. Copiala direttamente in Excel o Google Sheets, oppure scarica un file CSV o .xlsx in cui i numeri restano numeri.' },
      { q: 'Quali lingue sono supportate?', a: "47, tra cui italiano, inglese, hindi, bengalese (bangla), urdu, nepalese, tamil, kannada, spagnolo, francese, tedesco, portoghese, arabo, cinese, giapponese, coreano e russo. Per le immagini in più lingue scegline più di una, oppure lascia l'opzione Auto." },
      { q: 'Posso convertire un PDF in testo?', a: "Sì. Trascina un PDF e ogni pagina viene letta. Le pagine che contengono già del testo vengono copiate esattamente, quelle scansionate vengono lette con l'OCR. Scarica il risultato in formato Word, testo semplice o PDF ricercabile." },
      { q: "Posso convertire un'immagine in testo Word?", a: 'Sì. Scarica un file .docx con titoli, paragrafi ed elenchi mantenuti, oppure copia il testo e incollalo in Word o Google Docs con la formattazione intatta.' },
      { q: "È un convertitore da immagine a testo con intelligenza artificiale?", a: 'Il testo viene riconosciuto da Tesseract, un motore OCR basato su una rete neurale addestrata a leggere il testo stampato. A differenza della maggior parte degli strumenti di IA, funziona sul tuo dispositivo, quindi le tue immagini non vengono mai inviate a un server.' },
      { q: 'Funziona sul telefono?', a: "Sì. Scatta una foto con il pulsante della fotocamera o scegli uno screenshot dalla galleria, poi copia, scarica o condividi il testo. Le foto HEIC dell'iPhone si aprono senza bisogno di convertirle." },
      { q: 'Posso convertire più immagini in testo contemporaneamente?', a: "Sì, fino a 50. Ogni immagine diventa una pagina con il proprio risultato, e la vista Documento intero le combina nell'ordine che scegli, con la ricerca in tutte le pagine e un'unica esportazione." },
    ],
    relatedHeading: 'Altri strumenti da immagine a testo',

    cta: {
      title: 'Incolla uno screenshot. Copia il testo.',
      lede: 'Gratis, privato e già pronto in questa scheda.',
      choose: 'Scegli le immagini',
      allTools: 'Vedi tutti gli strumenti',
    },
  },

  tool: {
    howToUse: 'Come si usa',
    faqHeading: 'Domande frequenti',
    relatedHeading: 'Strumenti correlati',
  },

  toolsPage: {
    count: { one: '{n} strumento', other: '{n} strumenti' },
    title: 'Strumenti',
    lede: 'È tutto un unico spazio di lavoro. Ogni pagina qui sotto lo apre con le impostazioni giuste per un compito preciso e spiega come ottenere il risultato migliore.',
    open: 'Apri lo strumento principale',
    groupHave: 'Parti da ciò che hai',
    groupFormat: 'Ottieni il formato che ti serve',
    groupSpecial: 'Leggi contenuti particolari',
  },

  guidesPage: {
    count: { one: '{n} guida', other: '{n} guide' },
    title: 'Guide',
    lede: "Come ottenere testo pulito e modificabile da screenshot, foto, scansioni e scrittura a mano, e come funziona l'OCR dietro le quinte.",
    crumb: 'Guide',
    updated: 'Aggiornata il',
    onThisPage: 'In questa pagina',
    tryIt: 'Provalo',
    open: 'Apri {name}',
    more: 'Altre guide',
  },

  privacyPage: {
    eyebrow: 'Informativa sulla privacy',
    title: 'Cosa succede alle tue immagini',
    lede: 'In breve: vengono lette sul tuo dispositivo e non ci vengono mai inviate.',
    ledeEnhanced: 'In breve: vengono lette sul tuo dispositivo e non ci vengono mai inviate, a meno che tu non scelga la Lettura avanzata per una pagina.',
    deviceTitle: 'Sul tuo dispositivo',
    deviceTag: 'Predefinito',
    whereTerm: 'Dove viene letto il testo',
    whereText: 'Nel tuo browser, dal motore open source Tesseract compilato in WebAssembly.',
    uploadTerm: 'Cosa viene caricato',
    uploadText: 'Niente. Le tue immagini e il tuo testo restano sul tuo dispositivo.',
    downloadTerm: 'Cosa viene scaricato',
    downloadText: "La pagina, il motore di riconoscimento e i modelli delle lingue che usi (l'inglese pesa pochi megabyte). Il browser li salva nella cache, quindi il download non si ripete.",
    keptTerm: 'Cosa viene conservato',
    keptText: 'Niente, a meno che tu non attivi la Cronologia. Chiudi la scheda e immagini e testo spariscono.',
    trainingTerm: 'Addestramento',
    trainingText: 'Mai. Non vediamo le tue immagini, quindi non possiamo usarle per nessuno scopo.',
    enhTitle: 'Lettura avanzata',
    enhTag: 'Solo se la scegli tu',
    enhWhenTerm: 'Quando viene usata',
    enhWhenText: 'Solo dopo che hai premuto «Prova la Lettura avanzata» per una pagina e hai confermato. Non viene mai usata in automatico.',
    enhUploadText: "Solo l'immagine di quella pagina, ridimensionata a un massimo di 2.000 pixel, insieme alla modalità di lettura e alla lingua che hai scelto.",
    enhWhoTerm: 'Chi la legge',
    enhWhoText: "Il nostro server la passa al modello Claude di Anthropic tramite l'API commerciale di Anthropic e ti restituisce il testo.",
    enhKeptHtml: `Il nostro server non salva né l'immagine né il testo. Per applicare il limite giornaliero conta le richieste di ogni visitatore usando un hash dell'indirizzo IP, che viene eliminato dopo un giorno. L'<a href="https://www.anthropic.com/legal/privacy" rel="noopener">informativa sulla privacy</a> di Anthropic indica per quanto tempo vengono conservati i dati delle API.`,
    enhTrainingText: "Non la usiamo per l'addestramento. Le condizioni commerciali di Anthropic stabiliscono che, per impostazione predefinita, i suoi modelli non vengono addestrati con i dati delle API.",
    historyTitle: 'Cronologia',
    historyText:
      "La cronologia è disattivata per impostazione predefinita. Se la attivi, i tuoi documenti (immagini, testo e modifiche) vengono salvati nello spazio di archiviazione di questo browser, su questo dispositivo. Non vengono mai caricati. Puoi eliminare un singolo documento o cancellare tutto dal pannello Cronologia; anche cancellare i dati del sito dal browser li rimuove.",
    linksTitle: 'Link che condividi',
    linksHtml:
      '«Copia link» inserisce il testo nel link stesso, dopo il simbolo <code>#</code>. I browser non inviano quella parte a nessun server, quindi condividere un link non carica nulla. Chiunque abbia il link può leggere il testo, perciò trattalo con la stessa cura del testo.',
    fromLinkTitle: 'Immagini da un link',
    fromLinkText:
      "Quando incolli il link di un'immagine, il browser prova prima a caricarla direttamente. Se l'altro sito non lo consente, il nostro server recupera per te quella singola immagine e te la restituisce subito, senza salvarla.",
    checkTitle: 'Verificalo tu stesso',
    checkText:
      "Non devi crederci sulla parola. Apri gli strumenti per sviluppatori del browser, scegli la scheda Rete e leggi un'immagine: vedrai arrivare il motore e i file delle lingue, e nessuna richiesta che porta fuori la tua immagine. Dopo aver letto un'immagine, lo strumento continua a funzionare anche con la rete disattivata.",
    analyticsTitle: 'Statistiche e cookie',
    analyticsText:
      'Questo sito non usa pubblicità, cookie di tracciamento o strumenti di analisi di terze parti. Salva alcune preferenze (le tue lingue, se la Cronologia è attiva) nello spazio di archiviazione locale del browser.',
  },

  legalPage: {
    updated: 'Ultimo aggiornamento:',
    onThisPage: 'In questa pagina',
    translationNoteHtml: 'Questa è una traduzione. In caso di differenze rispetto alla <a href="{href}" hreflang="en">versione inglese</a>, prevale la versione inglese.',
  },

  aboutPage: {
    eyebrow: 'Chi siamo',
    title: 'Il testo nelle immagini dovrebbe essere facile da copiare',
    lede: '{site} è un convertitore da immagine a testo gratuito che funziona nel browser. Incolla uno screenshot o trascina una foto, una scansione o un PDF e ottieni testo da modificare, controllare ed esportare, senza registrarti e senza caricare le tue immagini.',
    whyTitle: 'Perché lo abbiamo creato',
    whyHtml: `<p>Gran parte del testo che ci serve ce l'abbiamo già davanti: un messaggio di errore, uno scontrino, una slide, una pagina di appunti. Estrarlo dovrebbe richiedere pochi secondi. Troppo spesso, invece, bisogna caricare un'immagine privata su un server di cui non si sa nulla, sorbirsi la pubblicità o scontrarsi con un limite giornaliero.</p><p>Così abbiamo fatto l'opposto. {site} legge l'immagine dove si trova già, sul tuo dispositivo, con il motore open source Tesseract. Non c'è nessun account da creare e niente da installare, e una volta caricato il motore funziona anche offline.</p>`,
    principlesTitle: 'Ciò che ci sta a cuore',
    principles: [
      {
        title: 'Privato fin dalla progettazione',
        text: 'Le immagini vengono lette nel tuo browser, non sui nostri server. La Cronologia è disattivata finché non la attivi tu, e non ci sono né tracciamento né pubblicità.',
      },
      {
        title: 'Gratis, senza trucchi',
        text: 'Niente registrazione, niente pubblicità, nessun captcha e nessun limite giornaliero per la lettura sul tuo dispositivo. Fino a {pages} immagini alla volta, {mb} MB ciascuna.',
      },
      {
        title: 'Onesti sui limiti',
        text: "L'OCR commette errori, quindi lo strumento ti mostra dove. Le parole su cui aveva dubbi sono sottolineate e viene indicato il livello di affidabilità, mai una promessa di perfezione.",
      },
      {
        title: 'Pensato per documenti veri',
        text: "Le tabelle diventano griglie modificabili, gli scontrini diventano campi, il codice mantiene l'indentazione e i documenti conservano titoli ed elenchi.",
      },
    ],
    factsTitle: 'In sintesi',
    factLanguages: 'lingue, anche più di una per pagina',
    factPages: 'immagini alla volta',
    factFormats: 'formati di download',
    factSignups: 'account necessari',
    howTitle: 'Come funziona',
    howHtml: `<ol><li><strong>Aggiungi un'immagine.</strong> Incolla, trascina, scegli un file, scatta una foto o incolla un link. Funzionano JPG, PNG, WebP, HEIC, TIFF, GIF, BMP e PDF.</li><li><strong>Viene letta sul tuo dispositivo.</strong> Il Miglioramento automatico pulisce l'immagine, viene riconosciuto il tipo di pagina e Tesseract legge il testo direttamente nel tuo browser.</li><li><strong>Controlla, modifica ed esporta.</strong> Correggi le parole sottolineate, poi copia il testo o scaricalo in formato Word, Excel, PDF, Markdown, JSON e altri ancora.</li></ol><p>Vuoi saperne di più? Leggi <a href="/guides/how-ocr-works">come funziona l'OCR</a> oppure scopri <a href="/privacy">cosa succede alle tue immagini</a>.</p>`,
    creditsTitle: "Basato sull'open source",
    creditsText: 'Lo strumento si regge sul lavoro di questi progetti open source. Grazie a tutte le persone che li sviluppano e li mantengono.',
    creditRoles: {
      tesseract: 'Motore di riconoscimento del testo',
      tesseractjs: 'Tesseract nel browser',
      pdfjs: 'Lettura dei file PDF',
      libheif: "Apertura delle foto HEIC dell'iPhone",
      codemirror: 'Editor di testo',
      utif: 'Lettura delle immagini TIFF',
      fflate: 'File ZIP',
      svelte: 'Interfaccia dello spazio di lavoro',
      astro: 'Framework del sito',
      geist: 'Carattere tipografico',
    },
    ctaTitle: 'Domande, idee o un file che non viene letto?',
    ctaText: 'Ci farebbe piacere sentirti.',
    ctaContact: 'Contattaci',
    ctaTool: 'Apri lo strumento',
  },

  contactPage: {
    eyebrow: 'Contatti',
    title: 'Scrivici',
    lede: "Hai trovato un bug, hai un'idea o una domanda sulla privacy? L'email è il modo migliore per contattarci.",
    emailLabel: 'Email',
    write: "Scrivi un'email",
    copy: 'Copia indirizzo',
    copied: 'Copiato',
    topicsTitle: 'Come possiamo aiutarti?',
    topicLink: 'Scrivici',
    topicLinkLabel: 'Scrivici: {topic}',
    topics: [
      {
        title: 'Segnala un problema',
        text: 'Un file che non si apre, un testo che esce sbagliato o un pulsante che non funziona. Indicaci il browser e il dispositivo che usi.',
        subject: 'Segnalazione di un problema',
        body: 'Cosa è successo:\n\nCosa mi aspettavo:\n\nBrowser e dispositivo:\n',
      },
      {
        title: 'Suggerisci una funzione',
        text: 'Un formato che ti serve, una lingua che manca o un modo per rendere lo strumento più rapido da usare.',
        subject: 'Idea per una funzione',
        body: '',
      },
      {
        title: 'Privacy e questioni legali',
        text: 'Domande su come vengono trattati i tuoi dati, richieste ai sensi del GDPR o del CCPA, o qualsiasi cosa riguardi i nostri termini.',
        subject: 'Richiesta privacy',
        body: '',
      },
      {
        title: 'Stampa e collaborazioni',
        text: 'Vuoi scrivere dello strumento, inserire un link dal tuo sito o collaborare con noi.',
        subject: 'Stampa e collaborazioni',
        body: '',
      },
    ],
    sensitiveNote:
      'Non inviarci via email immagini che contengono informazioni personali o sensibili. Se un file viene letto male, un esempio simile senza dati privati ci è altrettanto utile.',
    privacyHtml: `Usiamo il tuo messaggio solo per risponderti. Consulta l'<a href="/privacy">informativa sulla privacy</a>.`,
    faqTitle: 'Prima di scriverci',
    faq: [
      {
        q: 'Lo strumento è davvero gratis?',
        aHtml: `Sì. Niente registrazione, niente pubblicità e nessun limite giornaliero per la lettura sul tuo dispositivo. <a href="/">Apri lo strumento</a> e incolla un'immagine.`,
      },
      {
        q: 'Potete vedere le immagini che leggo?',
        aHtml: `No. Le immagini vengono lette nel tuo browser e non ci vengono inviate. L'<a href="/privacy">informativa sulla privacy</a> spiega ogni dettaglio.`,
      },
      {
        q: 'Una parte del testo è uscita sbagliata. Cosa posso fare?',
        aHtml: `Ritaglia l'immagine attorno al testo, controlla che sia selezionata la lingua giusta e prova con una foto più nitida e ben illuminata. La guida per <a href="/guides/how-to-get-accurate-ocr-results">ottenere risultati OCR precisi</a> contiene altri consigli.`,
      },
      {
        q: 'Funziona offline?',
        aHtml: 'Sì, dopo la prima lettura. Il browser conserva il motore e i file delle lingue, quindi lo strumento continua a funzionare anche senza connessione.',
      },
    ],
  },

  errorPage: {
    notFound: {
      eyebrow: 'Errore 404',
      title: 'Questa pagina non esiste',
      lede: 'Il link potrebbe essere vecchio o contenere un errore di battitura. Tutto il resto è ancora qui: lo strumento per convertire immagini in testo, una pagina per ogni esigenza e le guide.',
      badge: 'Non trovata',
      report: 'Pensi che qui dovrebbe esserci qualcosa? {link}.',
      reportLink: 'Faccelo sapere',
      reportSubject: 'Link non funzionante',
    },
    serverError: {
      eyebrow: 'Errore 500',
      title: 'Qualcosa è andato storto da parte nostra',
      lede: 'Non dipende da te: il server ha riscontrato un errore. Le immagini che leggi sul tuo dispositivo non ne risentono. Riprova tra qualche istante.',
      badge: 'Errore del server',
      retry: 'Riprova',
      report: 'Se il problema persiste, {link}.',
      reportLink: 'avvisaci',
      reportSubject: 'Errore del server',
    },
    home: 'Apri lo strumento da immagine a testo',
    tools: 'Vedi tutti gli strumenti',
    popular: 'Pagine più visitate',
    guides: 'Tutte le guide',
    contact: 'Contattaci',
  },

  sharePage: {
    eyebrow: 'Testo condiviso',
    fallbackTitle: 'Testo condiviso',
    copy: 'Copia testo',
    copied: 'Copiato',
    download: 'Scarica .txt',
    readOwn: 'Leggi una tua immagine',
    note: 'Questo testo ha viaggiato dentro il link, quindi non è mai stato caricato su un server.',
    brokenTitle: 'Questo link non contiene testo',
    brokenHtml: `Potrebbe essere stato troncato durante la copia. Chiedi di nuovo il link, oppure <a href="/">leggi tu un'immagine</a>.`,
  },
} satisfies UI;

export default it;
