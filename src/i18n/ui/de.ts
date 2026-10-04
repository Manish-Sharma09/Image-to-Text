// Seitentexte auf Deutsch (Seiten, Header, Footer, Startseite).
// Übersetzt aus en.ts – siehe die Hinweise dort.
import type { UI } from './en';

const de = {
  meta: {
    homeTitle: 'Bild in Text umwandeln – OCR kostenlos | Image to Text App',
    homeDescription:
      'Bild in Text umwandeln, kostenlos und online: Text aus JPG, PNG, Screenshots, PDFs und Handschrift extrahieren, in 47 Sprachen. Ohne Anmeldung, ohne Upload.',
    siteDescription:
      'Kostenloser Bild-zu-Text-Konverter, der in deinem Browser läuft. Extrahiere bearbeitbaren Text aus JPG, PNG, Screenshots, PDFs, Tabellen, Belegen und Handschrift – ohne Anmeldung, und deine Bilder bleiben auf deinem Gerät.',
    ogImageAlt: 'Image to Text App: Text aus jedem Bild kopieren, kostenlos und im Browser',
    toolsTitle: 'Bild-zu-Text-Tools',
    toolsDescription:
      'Alle Bild-zu-Text-Tools an einem Ort: Screenshots, Fotos, PDFs, Handschrift, Tabellen nach Excel, Belege, Rechnungen und Code. Ein Arbeitsbereich, viele Wege.',
    guidesTitle: 'Anleitungen: Text aus Bildern extrahieren',
    guidesDescription:
      'Praktische Anleitungen, um Text aus Screenshots, Fotos, Scans, Belegen, Tabellen und Handschrift zu kopieren – auf jedem Gerät, mit oder ohne spezielles Tool.',
    privacyTitle: 'Datenschutzerklärung: Was mit deinen Bildern passiert',
    privacyDescription:
      'Wie {site} mit deinen Bildern und Texten umgeht: standardmäßig auf deinem Gerät gelesen, kein Upload, Verlauf aus, solange du ihn nicht einschaltest.',
    aboutTitle: 'Über uns: Bild in Text – kostenlos und auf deinem Gerät',
    aboutDescription:
      'Warum es {site} gibt: Bild in Text, kostenlos im Browser, ohne Anmeldung und ohne Upload. Unsere Prinzipien und die Open-Source-Software dahinter.',
    contactTitle: 'Kontakt',
    contactDescription:
      'Kontakt zu {site} per E-Mail: Problem melden, Funktion vorschlagen, Fragen zum Datenschutz stellen oder Anfragen zu Presse und Partnerschaften.',
    termsTitle: 'Nutzungsbedingungen (AGB)',
    termsDescription:
      'Die Nutzungsbedingungen von {site}: Deine Bilder und Texte gehören dir, faire Nutzung, Genauigkeit der Ergebnisse und Grenzen unserer Haftung.',
    notFoundTitle: 'Seite nicht gefunden',
    notFoundDescription:
      'Diese Seite gibt es nicht. Das Bild-zu-Text-Tool, eine Seite für jede Aufgabe und unsere Anleitungen sind nur einen Klick entfernt.',
    serverErrorTitle: 'Etwas ist schiefgelaufen',
    serverErrorDescription: 'Auf dem Server ist ein Fehler aufgetreten. Versuch es gleich noch einmal.',
    shareTitle: 'Geteilter Text',
    shareDescription: 'Mit {site} geteilter Text. Der Text steckt direkt im Link.',
  },

  nav: {
    main: 'Hauptmenü',
    homeLabel: '{site} – Startseite',
    tools: 'Tools',
    guides: 'Anleitungen',
    privacy: 'Datenschutz',
    openTool: 'Tool öffnen',
    history: 'Verlauf',
    skip: 'Zum Inhalt springen',
    breadcrumb: 'Brotkrumennavigation',
  },

  theme: {
    menu: 'Design',
    current: 'Design: {name}',
    system: 'System',
    light: 'Hell',
    dark: 'Dunkel',
    systemTheme: 'Systemdesign',
    lightTheme: 'Helles Design',
    darkTheme: 'Dunkles Design',
  },

  language: {
    menu: 'Sprache',
    current: 'Sprache: {name}',
  },

  footer: {
    about: 'Bild zu Text direkt im Browser. Ohne Anmeldung, ohne Werbung, und deine Bilder bleiben auf deinem Gerät.',
    tools: 'Tools',
    imageToText: 'Bild in Text',
    guides: 'Anleitungen',
    allGuides: 'Alle Anleitungen',
    privacy: 'Datenschutzerklärung',
    terms: 'Nutzungsbedingungen',
    aboutUs: 'Über uns',
    contact: 'Kontakt',
    allTools: 'Alle Tools',
    howOcrWorks: 'So funktioniert OCR',
    copyright: '© {year} {site}. Texterkennung mit der Open-Source-Engine Tesseract.',
    languages: 'Sprachen',
  },

  hero: {
    crumbHome: 'Bild in Text',
    homeH1: 'Bild in Text umwandeln – kostenlos',
    homeIntro:
      'Kopiere Text aus jedem Bild. Füge einen Screenshot ein oder zieh ein JPG, PNG, Foto, einen Scan oder ein PDF hierher und erhalte Text, den du bearbeiten, prüfen und exportieren kannst – Tabellen, Belege und Code inklusive. Kostenlose OCR online, die in deinem Browser läuft, damit deine Bilder auf deinem Gerät bleiben.',
  },

  schema: {
    operatingSystem: 'Alle (läuft im Browser)',
    browserRequirements: 'Erfordert einen modernen Browser mit WebAssembly',
    appAlternateNames: ['Bild-zu-Text-Konverter', 'Texterkennung online (OCR)'],
    featureList: [
      'Kostenloser Bild-zu-Text-Konverter ohne Anmeldung und ohne Tageslimit',
      'Bild in Text direkt im Browser, Bilder werden nicht hochgeladen',
      'JPG, PNG, WebP, HEIC, TIFF, GIF, BMP und PDF',
      'Automatische Erkennung von Tabellen, Belegen, Code, Dokumenten und Handschrift',
      'Tabelle nach Excel und CSV',
      'Felder aus Belegen und Rechnungen',
      '47 Sprachen, darunter Hindi, Bengalisch, Urdu, Nepali, Tamil und Kannada',
      'Viele Bilder auf einmal in Text umwandeln: bis zu 50 Bilder gleichzeitig',
      'Export als Word, PDF, durchsuchbares PDF, Markdown, JSON, CSV, Excel, HTML und Text',
    ],
    howToName: 'So wandelst du ein Bild in Text um',
    howToDescription: 'Extrahiere bearbeitbaren Text aus einem Screenshot, Foto, Scan oder PDF direkt in deinem Browser.',
  },

  home: {
    howTo: [
      { name: 'Bild hinzufügen', text: 'Füge einen Screenshot mit Strg+V ein (⌘V auf dem Mac), zieh eine Datei hierher, wähle Bilder aus, füge einen Bildlink ein oder mach mit dem Handy ein Foto.' },
      { name: 'Lesen lassen', text: 'Das Lesen startet von selbst und dauert meist nur wenige Sekunden pro Seite. Ein kurzer Hinweis zeigt, was erkannt wurde, etwa eine Tabelle, ein Beleg oder Code.' },
      { name: 'Text prüfen', text: 'Klick auf eine Zeile, um zu sehen, woher sie im Bild stammt. Wörter, bei denen sich die Engine unsicher war, sind unterstrichen, damit du sie korrigieren kannst.' },
      { name: 'Kopieren oder herunterladen', text: 'Kopiere den Text mit einem Klick oder lade ihn als Word, Excel, PDF, Markdown, JSON, CSV, HTML oder reinen Text herunter.' },
    ],

    readas: {
      eyebrow: 'Erkennung',
      title: 'Ein Bild-zu-Text-Konverter, der weiß, was er liest',
      lede: 'Jedes Bild wird auf Tabellen, Belege, Code, Dokumente und Handschrift geprüft und so gelesen, wie es am besten passt. Du siehst einen kurzen Hinweis wie „Sieht nach einer Tabelle aus“. Du kannst jederzeit in einen anderen Modus wechseln, ohne das Bild erneut hinzuzufügen.',
      tabsLabel: 'Beispiele',
      tabs: {
        table: 'Tabellen',
        receipt: 'Belege',
        code: 'Code',
        document: 'Dokumente',
        notes: 'Handschrift',
        langs: 'Mehrsprachig',
      },
      alts: {
        table: 'Screenshot einer Tabelle mit Bestellungen nach Regionen, bevor das Bild in Text umgewandelt wird',
        receipt: 'Schräg aufgenommenes Foto eines Café-Kassenbons auf einem dunklen Tisch',
        code: 'Screenshot von Python-Code in einem dunklen Editor-Theme',
        document: 'Gescannte Artikelseite über die Pflege eines Sauerteigansatzes',
        notes: 'Handschriftliche Besprechungsnotizen auf liniertem Papier',
        langs: 'Aushang einer Bibliothek auf Englisch und Hindi',
      },
      caption: 'Das Bild',
      table: {
        label: 'Sieht nach einer Tabelle mit 5 Spalten aus',
        note: 'Bearbeite beliebige Zellen und kopiere die Tabelle direkt nach Excel oder Google Sheets, oder lade CSV oder .xlsx herunter. Zahlen bleiben Zahlen.',
      },
      receipt: {
        label: 'Sieht nach einem Beleg aus',
        business: 'Geschäft',
        date: 'Datum',
        subtotal: 'Zwischensumme',
        tax: 'Steuer',
        total: 'Gesamt',
        check: 'Vier Positionen ergeben zusammen 29.50 – passend zur Zwischensumme.',
        note: 'Dieses Foto wurde schräg auf einem dunklen Tisch aufgenommen. Vor dem Lesen wurde es um 2,2° begradigt und die Beleuchtung ausgeglichen.',
      },
      code: {
        label: 'Sieht nach einem Screenshot mit Python-Code aus',
        note: 'Die Einrückung wird anhand der Position jedes Worts wiederhergestellt, typografische Anführungszeichen werden begradigt, und das dunkle Theme wird vor dem Lesen invertiert.',
      },
      document: {
        label: 'Sieht nach einem Artikel oder Dokument aus',
        note: 'Umbrochene Zeilen werden zu Absätzen, Überschriften und Listen bleiben erhalten – auch Aufzählungszeichen, die die Engine nicht sehen kann. Download als Word oder Markdown.',
      },
      notes: {
        label: 'Als Handschrift gelesen',
        note: 'Saubere Druckschrift lässt sich gut lesen. Verbundene Schreibschrift ist schwieriger, deshalb werden unsichere Wörter zum Prüfen unterstrichen.',
      },
      langs: {
        label: 'Devanagari-Schrift gefunden – gelesen als Hindi + Englisch',
        note: 'Nichts einzustellen: Zeilen in einer anderen Schrift werden erkannt, und die Seite wird mit der passenden Sprache erneut gelesen. 47 Sprachen, auch mehrere gleichzeitig.',
      },
    },

    shortcut: {
      eyebrow: 'Tastatur',
      title: 'Screenshot in Text – ohne Datei zu speichern',
      lede: 'Der meiste Text, den man braucht, steht auf dem Bildschirm: eine Fehlermeldung, ein Chat, eine Folie im Videocall. Kopiere den Screenshot, füge ihn hier ein, und einen Moment später ist der Text da. Am Handy teilst du den Screenshot stattdessen oder fügst ihn als Datei hinzu.',
      computer: 'Dein Computer',
      showWindows: 'Fenster anzeigen',
      shotNotes: {
        mac: 'zieh über den Text; er landet direkt in der Zwischenablage',
        win: 'zieh über den Text; das Snipping Tool kopiert ihn',
        cros: 'wähle einen Bereich; der Screenshot wird kopiert',
      },
      step1: 'Mach einen Screenshot in die Zwischenablage – {note}.',
      step2: 'Füge ihn irgendwo auf dieser Seite ein. Das Lesen startet von selbst.',
      step3: 'Kopiere den gesamten Text und füge ihn ein, wo du ihn brauchst.',
    },

    after: {
      eyebrow: 'Prüfen und exportieren',
      title: 'Gemacht für alles, was nach der Texterkennung kommt',
      reviewTitle: 'Prüfe die Wörter, auf die es ankommt',
      reviewText:
        'Klick auf eine Textzeile, und ihre Stelle im Bild leuchtet auf; klick ins Bild, und der Cursor springt zum passenden Text. Wörter, bei denen sich die Engine unsicher war, sind unterstrichen, und ein Button führt dich nacheinander durch sie. Dazu bekommst du eine ehrliche Angabe zur Erkennungssicherheit – nie ein Versprechen von Perfektion.',
      pagesTitle: 'Viele Bilder, ein Dokument',
      pagesText:
        'Zieh einen ganzen Stapel Screenshots oder gescannter Seiten hierher. Jedes Bild wird zu einer Seite, die du verschieben, erneut lesen oder entfernen kannst. Die Gesamtansicht fügt sie in deiner Reihenfolge zusammen, durchsucht alle Seiten und exportiert eine einzige Word-, PDF- oder Markdown-Datei – oder ein ZIP mit einzelnen Dateien.',
      pagesMeta: 'Lese {n} von 20',
      outTitle: 'Überall weiterverwenden',
      outText:
        'Beim Kopieren bleiben Überschriften, Listen und Tabellen erhalten, wenn du in Google Docs, Word oder Sheets einfügst. Lade eines von acht Formaten herunter, darunter ein durchsuchbares PDF, das auswählbaren Text hinter das Originalbild legt. Teile einen Link, der den Text selbst enthält – so wird nichts hochgeladen.',
    },

    privacy: {
      eyebrow: 'Datenschutz',
      title: 'Deine Bilder bleiben auf deinem Gerät',
      lede: 'Die Texterkennung läuft in deinem Browser, deshalb landen Fotos von Belegen, Verträgen, Arztbriefen und privaten Chats nie auf einem Server. Kein Konto, keine Werbung, kein Captcha.',
      more: 'Genau nachlesen, was passiert',
      uploadTitle: 'Kein Upload.',
      uploadText: 'Gelesen wird auf deinem Gerät. Nur die Engine und die Sprachdateien werden heruntergeladen, und zwar einmalig.',
      keptTitle: 'Nichts wird gespeichert.',
      keptText: 'Schließ den Tab, und alles ist weg. Der Verlauf ist aus, solange du ihn nicht einschaltest – und dann bleibt er in diesem Browser.',
      checkTitle: 'Prüf es selbst.',
      checkText: 'Im Netzwerk-Tab deines Browsers siehst du, dass kein Bild dein Gerät verlässt, und nach dem ersten gelesenen Bild funktioniert das Tool auch offline.',
      cloudTitle: 'Cloud nur auf Wunsch.',
      cloudText: 'Für schwierige Handschrift gibt es die optionale Erweiterte Erkennung, die eine Seite an unseren Server schickt – nur, wenn du darauf klickst.',
    },

    formats: {
      eyebrow: 'Technische Daten',
      title: 'Unterstützte Formate und Sprachen',
      filesTerm: 'Dateien',
      filesText:
        'JPG und JPEG, PNG, WebP, GIF, BMP, TIFF (alle Seiten), HEIC und HEIF vom iPhone sowie PDF (alle Seiten – digitale PDFs werden direkt kopiert, gescannte gelesen). Bis zu 25 MB pro Datei, 50 Seiten auf einmal.',
      waysTerm: 'Eingabe',
      waysText: 'Per Drag-and-drop, über die Dateiauswahl, mit Strg bzw. ⌘ + V überall auf der Seite, per Bildlink oder mit der Kamera am Handy.',
      contentTerm: 'Inhalte',
      contentText:
        'Screenshots, gescannte und fotografierte Dokumente, Belege und Rechnungen, Tabellen, Formulare, Bücher und Zeitungen, Notizen und Handschrift, Plakate und Etiketten, Code und einfache Formeln.',
      languagesTerm: 'Sprachen',
      languagesText: '{popular} sowie {others}. Auch mehrere gleichzeitig im selben Bild.',
      fixesTerm: 'Korrekturen',
      fixesText:
        'Automatisch verbessern (Umkehrung bei Dark Mode, Schatten entfernen, Begradigen, Kontrast), Zuschneiden, Perspektivkorrektur über vier Ecken, Drehen, Helligkeit, Kontrast, Schärfen, Graustufen, Schwarzweiß, Rauschreduzierung.',
    },

    about: {
      eyebrow: 'Über das Tool',
      title: 'Bild in Text umwandeln – online, kostenlos und privat',
      lede: 'Wie der Bild-zu-Text-Konverter funktioniert, was er lesen kann und wie du aus jedem Bild sauberen, genauen Text bekommst.',
      toc: 'Auf dieser Seite',
      sections: [
        {
          id: 'what-is-image-to-text',
          label: 'Was ist ein Bild-zu-Text-Konverter?',
          heading: 'Was ist ein Bild-zu-Text-Konverter?',
          html: '<p>Ein Bild-zu-Text-Konverter nimmt ein Bild mit Schrift – einen Screenshot, ein Handyfoto, eine gescannte Seite oder ein PDF – und macht daraus echten Text, den du markieren, bearbeiten, durchsuchen und einfügen kannst. Die Technik dahinter heißt OCR, kurz für Optical Character Recognition (optische Zeichenerkennung). Image to Text App nutzt Tesseract, eine Open-Source-OCR-Engine auf Basis eines neuronalen Netzes, und führt sie direkt in deinem Browser aus. Dabei kommt nicht einfach ein Block aus Zeichen heraus: Das Tool erkennt, ob du ihm eine Tabelle, einen Beleg, Code, einen Artikel oder handschriftliche Notizen gegeben hast, und ordnet den Text passend an.</p>',
        },
        {
          id: 'how-to-convert-image-to-text',
          label: 'So wandelst du ein Bild in Text um',
          heading: 'So wandelst du ein Bild in Text um',
          html: '<ol><li><strong>Bild hinzufügen.</strong> Füge einen Screenshot mit Strg+V ein (⌘V auf dem Mac), zieh eine Datei hierher, wähle Bilder von deinem Gerät aus, füge einen Bildlink ein oder mach mit dem Handy ein Foto.</li><li><strong>Lesen lassen.</strong> Das Lesen startet von selbst und dauert meist nur wenige Sekunden pro Seite. Ein kurzer Hinweis zeigt dir, was erkannt wurde, zum Beispiel „Sieht nach einer Tabelle mit 5 Spalten aus“.</li><li><strong>Text prüfen.</strong> Klick auf eine Zeile, um zu sehen, woher sie im Bild stammt. Wörter, bei denen sich die Engine unsicher war, sind unterstrichen, damit du sie schnell korrigieren kannst.</li><li><strong>Kopieren oder herunterladen.</strong> Kopiere alles mit einem Klick oder lade es als Word-, Excel-, PDF- oder Textdatei herunter.</li></ol>',
        },
        {
          id: 'free-image-to-text',
          label: 'Kostenlos und ohne Limits',
          heading: 'Bild in Text umwandeln – kostenlos und ohne Limits',
          html: '<p>Keine Anmeldung, kein Tageslimit, kein Wasserzeichen und kein Captcha. Weil der Text auf deinem eigenen Gerät erkannt wird und nicht auf einem kostenpflichtigen Server, kannst du das ganze Tool so oft nutzen, wie du willst – mit allen Lesemodi, allen Sprachen und allen Download-Formaten. Wandle einen schnellen Screenshot um oder einen Stapel von fünfzig gescannten Seiten; nichts ist einem Bezahltarif vorbehalten.</p>',
        },
        {
          id: 'jpg-png-pdf-handwriting',
          label: 'JPG, PNG, PDF und Handschrift',
          heading: 'JPG, PNG, PDF, Screenshots und Handschrift',
          html: '<p>Das Tool liest JPG und JPEG, PNG, WebP, GIF, BMP, TIFF und HEIC-Fotos vom iPhone, jeweils bis zu 25 MB. In einem PDF werden digitale Seiten genau so kopiert, wie sie sind, und gescannte Seiten per OCR gelesen – so wandelst du ein PDF-Bild schnell und genau in Text um. Screenshots von Chats, Fehlermeldungen und Folien lassen sich besonders sauber lesen, und Aufnahmen im Dark Mode werden automatisch verarbeitet. Saubere Druckschrift funktioniert ebenfalls gut; verbundene Schreibschrift ist für jede Engine auf dem Gerät schwieriger, deshalb werden unsichere Wörter für dich markiert. Für jedes Format gibt es eine eigene Seite mit Tipps: <a href="/jpg-to-text">JPG in Text</a>, <a href="/png-to-text">PNG in Text</a>, <a href="/pdf-to-text">PDF in Text</a>, <a href="/screenshot-to-text">Screenshot in Text</a> und <a href="/handwriting-to-text">Handschrift in Text</a>.</p>',
        },
        {
          id: 'image-to-word-excel',
          label: 'Word, Excel und Google Docs',
          heading: 'Bild in Text für Word, Excel und Google Docs',
          html: '<p>Beim Kopieren bleiben Überschriften, Listen und Tabellen erhalten, sodass sich der Text sauber in Google Docs, Microsoft Word oder Google Sheets einfügen lässt. Um ein Bild in Word umzuwandeln, lädst du eine .docx-Datei herunter, in der Absätze und Überschriften erhalten bleiben. Fotos von Tabellen werden zu einem bearbeitbaren Raster: Korrigiere einzelne Zellen und füge die Tabelle dann in Excel ein, oder lade XLSX oder CSV herunter – Zahlen bleiben dabei Zahlen. Du kannst auch ein durchsuchbares PDF, Markdown, JSON oder HTML speichern. Mehr dazu unter <a href="/image-to-word">Bild in Word</a>, <a href="/image-to-excel">Bild in Excel</a> und <a href="/image-to-pdf">Bild in PDF</a>.</p>',
        },
        {
          id: 'image-to-text-languages',
          label: '47 Sprachen',
          heading: '47 Sprachen, darunter Hindi, Bengalisch und Urdu',
          html: '<p>Der Konverter liest 47 Sprachen, von Englisch, Spanisch, Französisch, Deutsch und Portugiesisch bis zu Arabisch, Chinesisch, Japanisch, Koreanisch und Russisch. Auch die wichtigsten südasiatischen Schriften sind dabei: Hindi, Bengalisch (Bangla), Urdu, Nepali, Marathi, Tamil, Telugu, Kannada, Malayalam, Gujarati und Panjabi. Lass die Einstellung auf „Auto“, dann erkennt das Tool Zeilen in einer anderen Schrift und liest sie mit der richtigen Sprache erneut – oder wähle für ein mehrsprachiges Bild selbst mehrere Sprachen aus.</p>',
        },
        {
          id: 'bulk-image-to-text',
          label: 'Viele Bilder auf einmal',
          heading: 'Mehrere Bilder auf einmal in Text umwandeln',
          html: '<p>Füge bis zu 50 Bilder oder PDF-Seiten in einem Rutsch hinzu. Jedes wird zu einer Seite mit eigenem Ergebnis, die du verschieben, erneut lesen oder entfernen kannst. Die Gesamtansicht fügt alle Seiten in deiner Reihenfolge zusammen, durchsucht sie alle und exportiert eine kombinierte Datei oder ein ZIP mit einzelnen Dateien – praktisch für einen Stapel Belege, Vorlesungsfolien oder einen gescannten Bericht.</p>',
        },
        {
          id: 'private-ocr',
          label: 'Private OCR im Browser',
          heading: 'Private OCR, die in deinem Browser läuft',
          html: '<p>Viele Online-OCR-Tools laden deine Bilder auf einen Server hoch. Dieses nicht: Die Texterkennung läuft in deinem Browser, deshalb verlassen Belege, Verträge, Ausweisdokumente und private Chats nie dein Gerät. Nur die Engine und die Sprachdateien werden beim ersten Mal heruntergeladen, danach funktioniert das Tool auch offline. Der Verlauf bleibt aus, solange du ihn nicht einschaltest. Lies nach, <a href="/privacy">was genau mit deinen Bildern passiert</a>.</p>',
        },
        {
          id: 'accuracy-tips',
          label: 'Tipps für genaue Ergebnisse',
          heading: 'Tipps für genauere Ergebnisse',
          html: '<p>Beginne mit dem schärfsten Bild, das du hast: einem frontal aufgenommenen Foto bei gleichmäßigem Licht oder einem Screenshot statt eines Fotos vom Bildschirm. Schneide alles weg, was du nicht brauchst, und wähle die Sprache aus, wenn „Auto“ unsicher ist. Bei schwierigen Bildern kann der Bereich „Anpassen“ das Bild vor dem Lesen begradigen, schärfen und den Kontrast erhöhen. Mehr dazu in der Anleitung für <a href="/guides/how-to-get-accurate-ocr-results">genaue OCR-Ergebnisse</a>.</p>',
        },
      ],
    },

    faqHeading: 'Bild in Text: häufige Fragen',
    faq: [
      { q: 'Wie wandle ich ein Bild in Text um?', a: 'Füge einen Screenshot mit Strg+V ein (⌘V auf dem Mac) oder zieh ein JPG, PNG oder PDF hierher. Das Lesen startet von selbst; prüfe die unterstrichenen Wörter und kopiere dann den Text oder lade ihn als Word, Excel, PDF oder reinen Text herunter.' },
      { q: 'Ist dieser Bild-zu-Text-Konverter wirklich kostenlos?', a: 'Ja. Gelesen wird auf deinem eigenen Gerät, deshalb kostet uns der Betrieb fast nichts: keine Anmeldung, kein Tageslimit, kein Wasserzeichen, und alle Download-Formate sind enthalten.' },
      { q: 'Werden meine Bilder hochgeladen?', a: 'Nein. Die Texterkennung läuft in deinem Browser, und deine Bilder verlassen nie dein Gerät. Nur die Engine und die Sprachdateien werden beim ersten Mal heruntergeladen und dann zwischengespeichert.' },
      { q: 'Wie genau ist die Texterkennung?', a: 'Klarer gedruckter Text wird meist sehr genau gelesen. Kleine Schrift, dunkle Fotos, dekorative Schriftarten und Handschrift sind schwieriger. Deshalb sind unsichere Wörter unterstrichen, und beim Klick auf eine Zeile leuchtet die passende Stelle im Bild auf – so dauert das Prüfen nur Sekunden.' },
      { q: 'Kann das Tool Handschrift lesen?', a: 'Saubere Druckschrift wird meist gut gelesen. Verbundene Schreibschrift ist für jede Engine auf dem Gerät deutlich schwieriger; rechne damit, einige Wörter zu korrigieren. Gutes Licht und ein frontal aufgenommenes Foto helfen am meisten.' },
      { q: 'Kann ich ein Foto einer Tabelle in Excel umwandeln?', a: 'Ja. Tabellen werden automatisch erkannt und als bearbeitbares Raster angezeigt. Kopiere sie direkt nach Excel oder Google Sheets oder lade CSV oder .xlsx herunter – Zahlen bleiben Zahlen.' },
      { q: 'Welche Sprachen werden unterstützt?', a: '47, darunter Englisch, Hindi, Bengalisch (Bangla), Urdu, Nepali, Tamil, Kannada, Spanisch, Französisch, Deutsch, Portugiesisch, Arabisch, Chinesisch, Japanisch, Koreanisch und Russisch. Wähle für mehrsprachige Bilder mehrere gleichzeitig aus oder lass die Einstellung auf „Auto“.' },
      { q: 'Kann ich ein PDF-Bild in Text umwandeln?', a: 'Ja. Zieh ein PDF hierher, und jede Seite wird gelesen. Seiten, die bereits Text enthalten, werden exakt kopiert, gescannte Seiten per OCR gelesen. Lade das Ergebnis als Word, reinen Text oder durchsuchbares PDF herunter.' },
      { q: 'Kann ich ein Bild in Word umwandeln?', a: 'Ja. Lade eine .docx-Datei herunter, in der Überschriften, Absätze und Listen erhalten bleiben, oder kopiere den Text und füge ihn samt Formatierung in Word oder Google Docs ein.' },
      { q: 'Ist das ein KI-Konverter für Bild zu Text?', a: 'Der Text wird von Tesseract erkannt, einer OCR-Engine auf Basis eines neuronalen Netzes, das darauf trainiert ist, gedruckten Text zu lesen. Anders als die meisten KI-Tools läuft sie auf deinem Gerät, deine Bilder werden also nie an einen Server gesendet.' },
      { q: 'Funktioniert das auch auf dem Handy?', a: 'Ja. Mach mit dem Kamera-Button ein Foto oder wähle einen Screenshot aus deiner Galerie, und kopiere, lade oder teile dann den Text. HEIC-Fotos vom iPhone öffnen sich ohne Umwandlung.' },
      { q: 'Kann ich mehrere Bilder gleichzeitig in Text umwandeln?', a: 'Ja, bis zu 50. Jedes Bild wird zu einer Seite mit eigenem Ergebnis, und die Gesamtansicht fügt sie in der von dir gewählten Reihenfolge zusammen – mit Suche über alle Seiten und einem gemeinsamen Export.' },
    ],
    relatedHeading: 'Weitere Bild-zu-Text-Tools',

    cta: {
      title: 'Screenshot einfügen. Text kopieren.',
      lede: 'Kostenlos, privat und läuft schon in diesem Tab.',
      choose: 'Bilder auswählen',
      allTools: 'Alle Tools ansehen',
    },
  },

  tool: {
    howToUse: 'So geht’s',
    faqHeading: 'Häufige Fragen',
    relatedHeading: 'Ähnliche Tools',
  },

  toolsPage: {
    count: { one: '{n} Tool', other: '{n} Tools' },
    title: 'Tools',
    lede: 'Alles läuft in einem einzigen Arbeitsbereich. Jede Seite unten startet ihn mit den passenden Einstellungen für eine bestimmte Aufgabe und erklärt, wie du das beste Ergebnis bekommst.',
    open: 'Haupttool öffnen',
    groupHave: 'Starte mit dem, was du hast',
    groupFormat: 'Hol dir das passende Format',
    groupSpecial: 'Besondere Inhalte lesen',
  },

  guidesPage: {
    count: { one: '{n} Anleitung', other: '{n} Anleitungen' },
    title: 'Anleitungen',
    lede: 'So bekommst du sauberen, bearbeitbaren Text aus Screenshots, Fotos, Scans und Handschrift – und so funktioniert OCR hinter den Kulissen.',
    crumb: 'Anleitungen',
    updated: 'Aktualisiert',
    onThisPage: 'Auf dieser Seite',
    tryIt: 'Ausprobieren',
    open: '{name} öffnen',
    more: 'Weitere Anleitungen',
  },

  privacyPage: {
    eyebrow: 'Datenschutzerklärung',
    title: 'Was mit deinen Bildern passiert',
    lede: 'Kurz gesagt: Sie werden auf deinem Gerät gelesen und nie an uns gesendet.',
    ledeEnhanced: 'Kurz gesagt: Sie werden auf deinem Gerät gelesen und nie an uns gesendet – außer du wählst für eine Seite die Erweiterte Erkennung.',
    deviceTitle: 'Auf deinem Gerät',
    deviceTag: 'Standard',
    whereTerm: 'Wo der Text gelesen wird',
    whereText: 'In deinem Browser, von der Open-Source-Engine Tesseract, kompiliert zu WebAssembly.',
    uploadTerm: 'Was hochgeladen wird',
    uploadText: 'Nichts. Deine Bilder und Texte bleiben auf deinem Gerät.',
    downloadTerm: 'Was heruntergeladen wird',
    downloadText: 'Die Seite, die Texterkennungs-Engine und die Sprachmodelle, die du nutzt (Englisch hat ein paar Megabyte). Dein Browser speichert sie zwischen, sodass der Download nicht wiederholt wird.',
    keptTerm: 'Was gespeichert wird',
    keptText: 'Nichts, außer du schaltest den Verlauf ein. Schließ den Tab, und Bilder und Text sind weg.',
    trainingTerm: 'Training',
    trainingText: 'Niemals. Wir sehen deine Bilder nicht, also können wir sie auch für nichts verwenden.',
    enhTitle: 'Erweiterte Erkennung',
    enhTag: 'Nur auf deinen Wunsch',
    enhWhenTerm: 'Wann sie genutzt wird',
    enhWhenText: 'Erst nachdem du für eine Seite auf „Erweiterte Erkennung testen“ geklickt und bestätigt hast. Sie wird nie automatisch genutzt.',
    enhUploadText: 'Genau dieses eine Seitenbild, auf höchstens 2.000 Pixel verkleinert, sowie der Lesemodus und die Sprache, die du gewählt hast.',
    enhWhoTerm: 'Wer es liest',
    enhWhoText: 'Unser Server gibt es über die kommerzielle API von Anthropic an das Modell Claude von Anthropic weiter und schickt dir den Text zurück.',
    enhKeptHtml:
      'Unser Server speichert weder das Bild noch den Text. Um das Tageslimit durchzusetzen, zählt er Anfragen pro Besucher anhand eines Hashwerts der IP-Adresse, der nach einem Tag verworfen wird. Wie lange Anthropic API-Daten aufbewahrt, steht in der <a href="https://www.anthropic.com/legal/privacy" rel="noopener">Datenschutzerklärung</a> von Anthropic.',
    enhTrainingText: 'Wir nutzen es nicht für Training. Laut den kommerziellen Bedingungen von Anthropic trainiert Anthropic seine Modelle standardmäßig nicht mit API-Daten.',
    historyTitle: 'Verlauf',
    historyText:
      'Der Verlauf ist standardmäßig aus. Wenn du ihn einschaltest, werden deine Dokumente (Bilder, Text und Änderungen) im browsereigenen Speicher auf diesem Gerät gesichert. Sie werden nie hochgeladen. Im Verlauf kannst du einzelne Dokumente löschen oder alles leeren, und wenn du die Websitedaten deines Browsers löschst, wird er ebenfalls entfernt.',
    linksTitle: 'Links, die du teilst',
    linksHtml:
      '„Link kopieren“ packt den Text direkt in den Link, hinter das <code>#</code>. Browser senden diesen Teil an keinen Server, beim Teilen eines Links wird also nichts hochgeladen. Jeder, der den Link hat, kann den Text lesen – behandle ihn also wie den Text selbst.',
    fromLinkTitle: 'Bilder aus einem Link',
    fromLinkText:
      'Wenn du einen Bildlink einfügst, versucht dein Browser zuerst, das Bild direkt zu laden. Erlaubt die andere Website das nicht, holt unser Server genau dieses eine Bild für dich ab und reicht es direkt weiter, ohne es zu speichern.',
    checkTitle: 'Prüf es selbst',
    checkText:
      'Du musst uns nicht einfach glauben. Öffne die Entwicklertools deines Browsers, wähle den Tab „Netzwerk“ und lies ein Bild: Du siehst, wie die Engine und die Sprachdateien ankommen – aber keine Anfrage, die dein Bild verschickt. Nach dem ersten gelesenen Bild funktioniert das Tool auch bei ausgeschaltetem Netzwerk.',
    analyticsTitle: 'Analyse und Cookies',
    analyticsText:
      'Diese Website nutzt keine Werbung, keine Tracking-Cookies und keine Analysedienste von Drittanbietern. Sie speichert ein paar Einstellungen (deine Sprachen, ob der Verlauf an ist) im lokalen Speicher deines Browsers.',
  },

  legalPage: {
    updated: 'Zuletzt aktualisiert',
    onThisPage: 'Auf dieser Seite',
    translationNoteHtml: 'Dies ist eine Übersetzung. Wo sie von der <a href="{href}" hreflang="en">englischen Fassung</a> abweicht, gilt die englische Fassung.',
  },

  aboutPage: {
    eyebrow: 'Über uns',
    title: 'Text in Bildern sollte sich leicht kopieren lassen',
    lede: '{site} ist ein kostenloser Bild-zu-Text-Konverter, der in deinem Browser läuft. Füge einen Screenshot ein oder zieh ein Foto, einen Scan oder ein PDF hierher und erhalte Text, den du bearbeiten, prüfen und exportieren kannst – ohne Anmeldung und ohne deine Bilder hochzuladen.',
    whyTitle: 'Warum wir es gebaut haben',
    whyHtml:
      '<p>Der meiste Text, den man braucht, liegt schon vor einem: eine Fehlermeldung, ein Beleg, eine Folie, eine Seite Notizen. Ihn herauszuholen sollte nur Sekunden dauern. Zu oft heißt das aber, ein privates Bild auf einen Server hochzuladen, über den man nichts weiß, Werbung über sich ergehen zu lassen oder an ein Tageslimit zu stoßen.</p><p>Also haben wir das Gegenteil gebaut. {site} liest das Bild dort, wo es schon ist: auf deinem Gerät, mit der Open-Source-Engine Tesseract. Du musst kein Konto anlegen und nichts installieren, und sobald die Engine geladen ist, funktioniert das Tool auch offline.</p>',
    principlesTitle: 'Was uns wichtig ist',
    principles: [
      {
        title: 'Von Grund auf privat',
        text: 'Bilder werden in deinem Browser gelesen, nicht auf unseren Servern. Der Verlauf ist aus, solange du ihn nicht einschaltest, und es gibt weder Tracking noch Werbung.',
      },
      {
        title: 'Kostenlos, ohne Haken',
        text: 'Keine Anmeldung, keine Werbung, kein Captcha und kein Tageslimit für das Lesen auf deinem Gerät. Bis zu {pages} Bilder auf einmal, jeweils bis zu {mb} MB.',
      },
      {
        title: 'Ehrlich, was die Grenzen angeht',
        text: 'OCR macht Fehler, deshalb zeigt dir das Tool, wo. Wörter, bei denen es unsicher war, sind unterstrichen, und die Erkennungssicherheit wird angezeigt – nie ein Versprechen von Perfektion.',
      },
      {
        title: 'Gemacht für echte Dokumente',
        text: 'Tabellen werden zu bearbeitbaren Rastern, Belege zu Feldern, Code behält seine Einrückung, und Dokumente behalten ihre Überschriften und Listen.',
      },
    ],
    factsTitle: 'Auf einen Blick',
    factLanguages: 'Sprachen, auch mehrere auf einer Seite',
    factPages: 'Bilder in einem Durchgang',
    factFormats: 'Download-Formate',
    factSignups: 'Konten nötig',
    howTitle: 'So funktioniert es',
    howHtml:
      '<ol><li><strong>Bild hinzufügen.</strong> Einfügen, hierherziehen, eine Datei auswählen, ein Foto machen oder einen Link einfügen. JPG, PNG, WebP, HEIC, TIFF, GIF, BMP und PDF funktionieren alle.</li><li><strong>Gelesen wird auf deinem Gerät.</strong> „Automatisch verbessern“ bereinigt das Bild, die Art der Seite wird erkannt, und Tesseract liest den Text direkt in deinem Browser.</li><li><strong>Prüfen, bearbeiten und exportieren.</strong> Korrigiere unterstrichene Wörter und kopiere dann den Text oder lade ihn als Word, Excel, PDF, Markdown, JSON und mehr herunter.</li></ol><p>Du willst es genauer wissen? Lies, <a href="/guides/how-ocr-works">wie OCR funktioniert</a>, oder sieh dir an, <a href="/privacy">was mit deinen Bildern passiert</a>.</p>',
    creditsTitle: 'Basiert auf Open Source',
    creditsText: 'Das Tool baut auf der Arbeit dieser Open-Source-Projekte auf. Danke an alle, die sie entwickeln und pflegen.',
    creditRoles: {
      tesseract: 'Texterkennungs-Engine',
      tesseractjs: 'Tesseract im Browser',
      pdfjs: 'PDF-Dateien lesen',
      libheif: 'HEIC-Fotos vom iPhone öffnen',
      codemirror: 'Texteditor',
      utif: 'TIFF-Bilder lesen',
      fflate: 'ZIP-Dateien',
      svelte: 'Oberfläche des Arbeitsbereichs',
      astro: 'Website-Framework',
      geist: 'Schriftart',
    },
    ctaTitle: 'Fragen, Ideen oder eine Datei, die sich nicht lesen lässt?',
    ctaText: 'Wir freuen uns, von dir zu hören.',
    ctaContact: 'Kontakt aufnehmen',
    ctaTool: 'Tool öffnen',
  },

  contactPage: {
    eyebrow: 'Kontakt',
    title: 'Schreib uns',
    lede: 'Einen Fehler gefunden, eine Idee oder eine Frage zum Datenschutz? Am besten erreichst du uns per E-Mail.',
    emailLabel: 'E-Mail',
    write: 'E-Mail schreiben',
    copy: 'Adresse kopieren',
    copied: 'Kopiert',
    topicsTitle: 'Wobei können wir helfen?',
    topicLink: 'Schreib uns',
    topicLinkLabel: 'Schreib uns: {topic}',
    topics: [
      {
        title: 'Problem melden',
        text: 'Eine Datei, die sich nicht öffnen lässt, Text, der falsch herauskommt, oder ein Button, der nicht funktioniert. Nenn uns deinen Browser und dein Gerät.',
        subject: 'Problembericht',
        body: 'Was passiert ist:\n\nWas ich erwartet habe:\n\nBrowser und Gerät:\n',
      },
      {
        title: 'Funktion vorschlagen',
        text: 'Ein Format, das du brauchst, eine Sprache, die fehlt, oder eine Idee, wie sich das Tool schneller bedienen lässt.',
        subject: 'Idee für eine Funktion',
        body: '',
      },
      {
        title: 'Datenschutz und Rechtliches',
        text: 'Fragen dazu, wie deine Daten verarbeitet werden, Anfragen nach DSGVO oder CCPA oder alles rund um unsere Nutzungsbedingungen.',
        subject: 'Datenschutzanfrage',
        body: '',
      },
      {
        title: 'Presse und Partnerschaften',
        text: 'Du schreibst über das Tool, möchtest von deiner Website darauf verlinken oder hast Interesse an einer Zusammenarbeit.',
        subject: 'Presse und Partnerschaften',
        body: '',
      },
    ],
    sensitiveNote:
      'Bitte schick uns keine Bilder mit persönlichen oder sensiblen Informationen per E-Mail. Wenn eine Datei schlecht gelesen wird, hilft uns ein ähnliches Beispiel ohne private Details genauso.',
    privacyHtml: 'Wir nutzen deine Nachricht nur, um dir zu antworten. Mehr dazu in der <a href="/privacy">Datenschutzerklärung</a>.',
    faqTitle: 'Bevor du schreibst',
    faq: [
      {
        q: 'Ist das Tool wirklich kostenlos?',
        aHtml: 'Ja. Keine Anmeldung, keine Werbung und kein Tageslimit für das Lesen auf deinem Gerät. <a href="/">Öffne das Tool</a> und füge ein Bild ein.',
      },
      {
        q: 'Könnt ihr die Bilder sehen, die ich lese?',
        aHtml: 'Nein. Bilder werden in deinem Browser gelesen und nicht zu uns hochgeladen. Die <a href="/privacy">Datenschutzerklärung</a> erklärt alle Details.',
      },
      {
        q: 'Ein Teil des Texts ist falsch. Was kann ich tun?',
        aHtml: 'Schneide das Bild auf den Text zu, prüfe, ob die richtige Sprache ausgewählt ist, und versuch es mit einem schärferen, gut beleuchteten Foto. Weitere Tipps findest du in der Anleitung für <a href="/guides/how-to-get-accurate-ocr-results">genaue OCR-Ergebnisse</a>.',
      },
      {
        q: 'Funktioniert es auch offline?',
        aHtml: 'Ja, nach dem ersten Lesen. Dein Browser behält die Engine und die Sprachdateien, sodass das Tool auch ohne Internetverbindung weiter funktioniert.',
      },
    ],
  },

  errorPage: {
    notFound: {
      eyebrow: 'Fehler 404',
      title: 'Diese Seite gibt es nicht',
      lede: 'Vielleicht ist der Link veraltet oder falsch geschrieben. Alles andere ist noch da: das Bild-zu-Text-Tool, eine Seite für jede Aufgabe und die Anleitungen.',
      badge: 'Nicht gefunden',
      report: 'Glaubst du, hier sollte etwas sein? {link}.',
      reportLink: 'Sag uns Bescheid',
      reportSubject: 'Defekter Link',
    },
    serverError: {
      eyebrow: 'Fehler 500',
      title: 'Bei uns ist etwas schiefgelaufen',
      lede: 'Es liegt nicht an dir: Auf dem Server ist ein Fehler aufgetreten. Bilder, die du auf deinem Gerät liest, sind nicht betroffen. Bitte versuch es gleich noch einmal.',
      badge: 'Serverfehler',
      retry: 'Erneut versuchen',
      report: 'Wenn das immer wieder passiert, {link}.',
      reportLink: 'sag uns bitte Bescheid',
      reportSubject: 'Serverfehler',
    },
    home: 'Bild-zu-Text-Tool öffnen',
    tools: 'Alle Tools ansehen',
    popular: 'Beliebte Seiten',
    guides: 'Alle Anleitungen',
    contact: 'Kontakt aufnehmen',
  },

  sharePage: {
    eyebrow: 'Geteilter Text',
    fallbackTitle: 'Geteilter Text',
    copy: 'Text kopieren',
    copied: 'Kopiert',
    download: '.txt herunterladen',
    readOwn: 'Eigenes Bild lesen',
    note: 'Dieser Text ist im Link selbst mitgereist und wurde daher nie auf einen Server hochgeladen.',
    brokenTitle: 'Dieser Link enthält keinen Text',
    brokenHtml: 'Vielleicht wurde er beim Kopieren abgeschnitten. Lass dir den Link noch einmal schicken oder <a href="/">lies selbst ein Bild</a>.',
  },
} satisfies UI;

export default de;
