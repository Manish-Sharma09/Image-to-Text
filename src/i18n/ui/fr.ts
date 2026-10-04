// Textes du site en français. Même structure que en.ts (voir les consignes
// en tête de ce fichier). Les liens href restent des chemins anglais racine
// (href="/jpg-to-text") : ils sont localisés automatiquement.
import type { UI } from './en';

const fr = {
  meta: {
    homeTitle: "Convertir une image en texte – OCR gratuit | Image to Text App",
    homeDescription:
      "Convertissez une image en texte gratuitement. Extrayez le texte de JPG, PNG, captures d'écran, PDF et manuscrits en 47 langues, sans inscription ni envoi.",
    siteDescription:
      "Convertisseur image en texte gratuit qui fonctionne dans votre navigateur. Extrayez un texte modifiable de JPG, PNG, captures d'écran, PDF, tableaux, tickets de caisse et écriture manuscrite — sans inscription, et vos images restent sur votre appareil.",
    ogImageAlt: "Image to Text App : copiez le texte de n'importe quelle image, gratuitement et dans votre navigateur",
    toolsTitle: "Outils pour convertir une image en texte",
    toolsDescription:
      "Tous les outils image en texte au même endroit : captures d'écran, photos, PDF, écriture manuscrite, tableaux vers Excel, tickets de caisse, factures et code.",
    guidesTitle: "Guides pour extraire le texte d'une image",
    guidesDescription:
      "Des guides pratiques pour extraire le texte de captures d'écran, photos, scans, tickets de caisse, tableaux et notes manuscrites, avec ou sans outil dédié.",
    privacyTitle: "Politique de confidentialité : ce que deviennent vos images",
    privacyDescription:
      "Comment {site} traite vos images et votre texte : lecture sur votre appareil par défaut, aucun envoi, historique désactivé sauf si vous l'activez.",
    aboutTitle: "À propos : l'OCR gratuit qui reste sur votre appareil",
    aboutDescription:
      "Pourquoi {site} existe : l'image en texte gratuite dans le navigateur, sans inscription ni envoi. Nos principes et l'open source derrière l'outil.",
    contactTitle: "Nous contacter",
    contactDescription:
      "Contactez {site} par e-mail pour signaler un bug, suggérer une fonctionnalité ou poser une question de confidentialité, de presse ou de partenariat.",
    termsTitle: "Conditions générales d'utilisation",
    termsDescription:
      "Conditions d'utilisation de {site} : vos images et textes restent à vous, usage loyal du service, précision des résultats, limites de responsabilité.",
    notFoundTitle: "Page introuvable",
    notFoundDescription: "Cette page n'existe pas. L'outil pour convertir une image en texte, une page pour chaque tâche et nos guides sont à portée de clic.",
    serverErrorTitle: "Une erreur s'est produite",
    serverErrorDescription: "Le serveur a rencontré une erreur. Réessayez dans un instant.",
    shareTitle: "Texte partagé",
    shareDescription: "Texte partagé depuis {site}. Le texte est stocké dans le lien lui-même.",
  },

  nav: {
    main: "Principal",
    homeLabel: "Accueil {site}",
    tools: "Outils",
    guides: "Guides",
    privacy: "Confidentialité",
    openTool: "Ouvrir l'outil",
    history: "Historique",
    skip: "Aller au contenu",
    breadcrumb: "Fil d'Ariane",
  },

  theme: {
    menu: "Thème",
    current: "Thème : {name}",
    system: "Système",
    light: "Clair",
    dark: "Sombre",
    systemTheme: "Thème du système",
    lightTheme: "Thème clair",
    darkTheme: "Thème sombre",
  },

  language: {
    menu: "Langue",
    current: "Langue : {name}",
  },

  footer: {
    about: "L'image en texte, directement dans votre navigateur. Sans inscription, sans publicité, et vos images restent sur votre appareil.",
    tools: "Outils",
    imageToText: "Image en texte",
    guides: "Guides",
    allGuides: "Tous les guides",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    aboutUs: "À propos",
    contact: "Contact",
    allTools: "Tous les outils",
    howOcrWorks: "Comment fonctionne l'OCR",
    copyright: "© {year} {site}. Reconnaissance de texte par le moteur open source Tesseract.",
    languages: "Langues",
  },

  hero: {
    crumbHome: "Image en texte",
    homeH1: "Convertir une image en texte gratuitement",
    homeIntro:
      "Copiez le texte de n'importe quelle image. Collez une capture d'écran ou déposez un JPG, un PNG, une photo, un scan ou un PDF, et obtenez un texte à modifier, vérifier et exporter — tableaux, tickets de caisse et code compris. Un OCR en ligne gratuit qui fonctionne dans votre navigateur : vos images restent sur votre appareil.",
  },

  schema: {
    operatingSystem: "Tous (fonctionne dans le navigateur)",
    browserRequirements: "Nécessite un navigateur récent compatible WebAssembly",
    appAlternateNames: ["Convertisseur image en texte", "OCR image en texte"],
    featureList: [
      "Convertisseur image en texte gratuit, sans inscription ni limite quotidienne",
      "Image en texte dans le navigateur, sans envoi des images",
      "JPG, PNG, WebP, HEIC, TIFF, GIF, BMP et PDF",
      "Détection automatique des tableaux, tickets de caisse, code, documents et écriture manuscrite",
      "Tableaux vers Excel et CSV",
      "Champs des tickets de caisse et des factures",
      "47 langues, dont le hindi, le bengali, l'ourdou, le népalais, le tamoul et le kannada",
      "Image en texte par lots : jusqu'à 50 images à la fois",
      "Export en Word, PDF, PDF interrogeable, Markdown, JSON, CSV, Excel, HTML et texte",
    ],
    howToName: "Comment convertir une image en texte",
    howToDescription: "Extrayez un texte modifiable d'une capture d'écran, d'une photo, d'un scan ou d'un PDF dans votre navigateur.",
  },

  home: {
    howTo: [
      { name: "Ajoutez votre image", text: "Collez une capture d'écran avec Ctrl+V (⌘V sur Mac), glissez-déposez un fichier, choisissez des images, collez le lien d'une image ou prenez une photo avec votre téléphone." },
      { name: "Laissez l'outil lire", text: "La lecture démarre toute seule et ne prend en général que quelques secondes par page. Une courte étiquette indique ce qui a été trouvé : un tableau, un ticket de caisse ou du code, par exemple." },
      { name: "Vérifiez le texte", text: "Cliquez sur une ligne pour voir d'où elle vient sur l'image. Les mots dont le moteur n'était pas sûr sont soulignés pour que vous puissiez les corriger." },
      { name: "Copiez ou téléchargez", text: "Copiez le texte en un clic, ou téléchargez-le en Word, Excel, PDF, Markdown, JSON, CSV, HTML ou texte brut." },
    ],

    readas: {
      eyebrow: "Détection",
      title: "Un convertisseur image en texte qui sait ce qu'il lit",
      lede: "Chaque image est analysée pour repérer tableaux, tickets de caisse, code, documents et écriture manuscrite, puis lue de la façon qui lui convient. Une courte étiquette s'affiche, comme « On dirait un tableau ». Changez de mode à tout moment, sans ajouter l'image une nouvelle fois.",
      tabsLabel: "Exemples",
      tabs: {
        table: "Tableaux",
        receipt: "Tickets de caisse",
        code: "Code",
        document: "Documents",
        notes: "Manuscrit",
        langs: "Plusieurs langues",
      },
      alts: {
        table: "Capture d'écran d'un tableau de commandes par région, avant la conversion de l'image en texte",
        receipt: "Photo d'un ticket de caisse de café prise en biais sur une table sombre",
        code: "Capture d'écran de code Python dans un éditeur au thème sombre",
        document: "Page d'article scannée sur l'entretien d'un levain",
        notes: "Notes de réunion manuscrites sur papier ligné",
        langs: "Avis de bibliothèque rédigé en anglais et en hindi",
      },
      caption: "L'image",
      table: {
        label: "On dirait un tableau de 5 colonnes",
        note: "Modifiez n'importe quelle cellule, puis copiez le tableau directement dans Excel ou Google Sheets, ou téléchargez-le en CSV ou en .xlsx. Les nombres restent des nombres.",
      },
      receipt: {
        label: "On dirait un ticket de caisse",
        business: "Commerce",
        date: "Date",
        subtotal: "Sous-total",
        tax: "Taxe",
        total: "Total",
        check: "Les quatre articles totalisent 29.50, ce qui correspond au sous-total.",
        note: "Cette photo a été prise en biais sur une table sombre. Elle a été redressée de 2,2° et l'éclairage a été uniformisé avant la lecture.",
      },
      code: {
        label: "On dirait une capture d'écran de code Python",
        note: "L'indentation est reconstruite d'après la position de chaque mot, les guillemets typographiques sont redressés et le thème sombre est inversé avant la lecture.",
      },
      document: {
        label: "On dirait un article ou un document",
        note: "Les lignes coupées redeviennent des paragraphes, et les titres et les listes sont conservés — même les puces que le moteur ne voit pas. Téléchargez le résultat en Word ou en Markdown.",
      },
      notes: {
        label: "Lu comme écriture manuscrite",
        note: "Une écriture soignée, en lettres détachées, se lit bien. La cursive liée est plus difficile : les mots douteux sont donc soulignés pour que vous les vérifiiez.",
      },
      langs: {
        label: "Texte en devanagari détecté — lu en hindi + anglais",
        note: "Rien à régler : les lignes écrites dans un autre alphabet sont repérées et la page est relue avec la bonne langue. 47 langues, plusieurs à la fois.",
      },
    },

    shortcut: {
      eyebrow: "Clavier",
      title: "Capture d'écran en texte, sans enregistrer de fichier",
      lede: "La plupart des textes dont on a besoin sont à l'écran : un message d'erreur, une conversation, une diapositive pendant une visio. Copiez la capture d'écran, collez-la ici, et le texte est prêt un instant plus tard. Sur un téléphone, partagez ou importez plutôt la capture.",
      computer: "Votre ordinateur",
      showWindows: "Afficher les fenêtres",
      shotNotes: {
        mac: "sélectionnez le texte ; la capture va directement dans le presse-papiers",
        win: "sélectionnez le texte ; l'Outil Capture d'écran le copie",
        cros: "choisissez une zone ; la capture est copiée",
      },
      step1: "Faites une capture d'écran dans le presse-papiers — {note}.",
      step2: "Collez n'importe où sur cette page. La lecture démarre toute seule.",
      step3: "Copiez tout le texte, prêt à être collé là où vous en avez besoin.",
    },

    after: {
      eyebrow: "Vérifier et exporter",
      title: "Pensé pour la suite, une fois le texte affiché",
      reviewTitle: "Vérifiez les mots qui comptent",
      reviewText:
        "Cliquez sur une ligne de texte et son emplacement s'illumine sur l'image ; cliquez sur l'image et le curseur saute au texte correspondant. Les mots dont le moteur n'était pas sûr sont soulignés, et un bouton vous fait passer de l'un à l'autre. Vous obtenez aussi un niveau de confiance honnête, jamais une promesse de perfection.",
      pagesTitle: "Plusieurs images, un seul document",
      pagesText:
        "Déposez une pile de captures d'écran ou de pages scannées. Chacune devient une page que vous pouvez réordonner, relire ou supprimer. La vue Document complet les assemble dans votre ordre, permet de chercher dans toutes les pages et exporte un seul fichier Word, PDF ou Markdown — ou un ZIP de fichiers séparés.",
      pagesMeta: "Lecture : {n} sur 20",
      outTitle: "Emportez-le partout",
      outText:
        "La copie conserve titres, listes et tableaux quand vous collez dans Google Docs, Word ou Sheets. Téléchargez le résultat dans l'un des huit formats, dont un PDF interrogeable qui place un texte sélectionnable derrière l'image d'origine. Partagez un lien qui contient le texte lui-même : rien n'est envoyé.",
    },

    privacy: {
      eyebrow: "Confidentialité",
      title: "Vos images restent sur votre appareil",
      lede: "Le moteur de texte fonctionne dans votre navigateur : les photos de tickets de caisse, de contrats, de courriers médicaux et de conversations privées n'atteignent jamais un serveur. Pas de compte, pas de publicité, pas de captcha.",
      more: "Voir exactement ce qui se passe",
      uploadTitle: "Rien à envoyer.",
      uploadText: "La lecture se fait sur votre appareil. Seuls le moteur et les fichiers de langue sont téléchargés, une seule fois.",
      keptTitle: "Rien de conservé.",
      keptText: "Fermez l'onglet et tout disparaît. L'historique est désactivé sauf si vous l'activez, et il reste alors dans ce navigateur.",
      checkTitle: "Vérifiez par vous-même.",
      checkText: "Le panneau Réseau de votre navigateur ne montre aucune image qui part, et une fois une première image lue, l'outil fonctionne même hors ligne.",
      cloudTitle: "Le cloud seulement si vous le demandez.",
      cloudText: "Pour l'écriture manuscrite difficile, une Lecture améliorée facultative envoie une page à notre serveur — uniquement quand vous appuyez sur le bouton.",
    },

    formats: {
      eyebrow: "Caractéristiques",
      title: "Formats et langues pris en charge",
      filesTerm: "Fichiers",
      filesText:
        "JPG et JPEG, PNG, WebP, GIF, BMP, TIFF (toutes les pages), HEIC et HEIF des iPhone, et PDF (toutes les pages — les PDF numériques sont copiés directement, les PDF scannés sont lus). Jusqu'à 25 Mo chacun, 50 pages à la fois.",
      waysTerm: "Ajout",
      waysText: "Glisser-déposer, sélection de fichiers, collage avec Ctrl ou ⌘ + V n'importe où sur la page, lien vers une image, ou appareil photo sur téléphone.",
      contentTerm: "Contenu",
      contentText:
        "Captures d'écran, documents scannés ou photographiés, tickets de caisse et factures, tableaux, formulaires, livres et journaux, notes et écriture manuscrite, affiches et étiquettes, code et équations simples.",
      languagesTerm: "Langues",
      languagesText: "{popular}, ainsi que {others}. Plusieurs à la fois sur la même image.",
      fixesTerm: "Corrections",
      fixesText:
        "Amélioration auto (inversion du mode sombre, suppression des ombres, redressement, contraste), recadrage, correction de perspective aux quatre coins, rotation, luminosité, contraste, netteté, niveaux de gris, noir et blanc, réduction du bruit.",
    },

    about: {
      eyebrow: "À propos de l'outil",
      title: "Convertir une image en texte en ligne, gratuitement et en toute confidentialité",
      lede: "Comment fonctionne le convertisseur image en texte, ce qu'il sait lire, et comment obtenir un texte propre et précis à partir de n'importe quelle image.",
      toc: "Sur cette page",
      sections: [
        {
          id: 'what-is-image-to-text',
          label: "Qu'est-ce qu'un convertisseur image en texte ?",
          heading: "Qu'est-ce qu'un convertisseur image en texte ?",
          html: `<p>Un convertisseur image en texte prend une image qui contient de l'écrit — une capture d'écran, une photo prise au téléphone, une page scannée ou un PDF — et transforme cet écrit en véritable texte que vous pouvez sélectionner, modifier, rechercher et coller. La technologie qui le permet s'appelle l'OCR, ou reconnaissance optique de caractères. Image to Text App utilise Tesseract, un moteur d'OCR open source fondé sur un réseau de neurones, et le fait tourner directement dans votre navigateur. Il ne se contente pas de renvoyer un bloc de caractères : il détermine si vous lui avez donné un tableau, un ticket de caisse, du code, un article ou des notes manuscrites, et met le texte en forme en conséquence.</p>`,
        },
        {
          id: 'how-to-convert-image-to-text',
          label: "Comment convertir une image en texte",
          heading: "Comment convertir une image en texte",
          html: `<ol><li><strong>Ajoutez votre image.</strong> Collez une capture d'écran avec Ctrl+V (⌘V sur Mac), glissez-déposez un fichier, choisissez des images sur votre appareil, collez le lien d'une image ou prenez une photo avec votre téléphone.</li><li><strong>Laissez l'outil lire.</strong> La lecture démarre toute seule et ne prend en général que quelques secondes par page. Une courte étiquette indique ce qui a été trouvé, par exemple « On dirait un tableau de 5 colonnes ».</li><li><strong>Vérifiez le texte.</strong> Cliquez sur une ligne pour voir d'où elle vient sur l'image. Les mots dont le moteur n'était pas sûr sont soulignés : vous les corrigez en un instant.</li><li><strong>Copiez ou téléchargez.</strong> Copiez tout en un clic, ou téléchargez un fichier Word, Excel, PDF ou texte brut.</li></ol>`,
        },
        {
          id: 'free-image-to-text',
          label: "Gratuit et sans limite",
          heading: "Un convertisseur image en texte gratuit et sans limite",
          html: `<p>Pas d'inscription, pas de limite quotidienne, pas de filigrane et pas de captcha. Comme le texte est reconnu sur votre propre appareil et non sur un serveur payant, l'outil est entièrement gratuit, aussi souvent que vous le voulez, avec tous les modes de lecture, toutes les langues et tous les formats de téléchargement. Convertissez une simple capture d'écran ou une pile de cinquante pages scannées : rien n'est réservé à une offre payante.</p>`,
        },
        {
          id: 'jpg-png-pdf-handwriting',
          label: "JPG, PNG, PDF et manuscrit",
          heading: "JPG, PNG, PDF, captures d'écran et écriture manuscrite",
          html: `<p>L'outil lit les JPG et JPEG, PNG, WebP, GIF, BMP, TIFF et les photos HEIC d'iPhone, jusqu'à 25 Mo chacun. Dans un PDF, les pages numériques sont copiées telles quelles et les pages scannées sont lues par OCR : convertir un PDF image en texte est donc rapide et précis. Les captures d'écran de conversations, de messages d'erreur et de diapositives se lisent particulièrement bien, et les captures en mode sombre sont gérées automatiquement. Une écriture manuscrite soignée, en lettres détachées, fonctionne bien aussi ; la cursive liée est plus difficile pour tout moteur qui tourne sur l'appareil, alors les mots douteux sont signalés. Chaque format a sa propre page avec des conseils : <a href="/jpg-to-text">JPG en texte</a>, <a href="/png-to-text">PNG en texte</a>, <a href="/pdf-to-text">PDF en texte</a>, <a href="/screenshot-to-text">capture d'écran en texte</a> et <a href="/handwriting-to-text">écriture manuscrite en texte</a>.</p>`,
        },
        {
          id: 'image-to-word-excel',
          label: "Word, Excel et Google Docs",
          heading: "Image en texte dans Word, Excel et Google Docs",
          html: `<p>La copie conserve les titres, les listes et les tableaux : le texte se colle proprement dans Google Docs, Microsoft Word ou Google Sheets. Pour convertir une image en texte dans Word, téléchargez un .docx avec ses paragraphes et ses titres intacts. Les images de tableaux deviennent une grille modifiable : corrigez n'importe quelle cellule, puis collez le tout dans Excel ou téléchargez un fichier XLSX ou CSV où les nombres restent des nombres. Vous pouvez aussi enregistrer un PDF interrogeable, du Markdown, du JSON ou du HTML. Voir <a href="/image-to-word">image en Word</a>, <a href="/image-to-excel">image en Excel</a> et <a href="/image-to-pdf">image en PDF</a>.</p>`,
        },
        {
          id: 'image-to-text-languages',
          label: "47 langues",
          heading: "47 langues, dont le hindi, le bengali et l'ourdou",
          html: `<p>Le convertisseur lit 47 langues, de l'anglais, l'espagnol, le français, l'allemand et le portugais jusqu'à l'arabe, au chinois, au japonais, au coréen et au russe. Il couvre aussi les principales écritures d'Asie du Sud : hindi, bengali (bangla), ourdou, népalais, marathi, tamoul, télougou, kannada, malayalam, gujarati et pendjabi. Laissez-le sur Auto et il repère les lignes écrites dans un autre alphabet pour les relire avec la bonne langue, ou choisissez vous-même plusieurs langues pour une image multilingue.</p>`,
        },
        {
          id: 'bulk-image-to-text',
          label: "Plusieurs images à la fois",
          heading: "Image en texte par lots : plusieurs images à la fois",
          html: `<p>Ajoutez jusqu'à 50 images ou pages de PDF d'un coup. Chacune devient une page avec son propre résultat, que vous pouvez réordonner, relire ou supprimer. La vue Document complet assemble toutes les pages dans votre ordre, permet de chercher dans l'ensemble et exporte un seul fichier combiné ou un ZIP de fichiers séparés — pratique pour une série de tickets de caisse, des diapositives de cours ou un rapport scanné.</p>`,
        },
        {
          id: 'private-ocr',
          label: "OCR privé dans le navigateur",
          heading: "Un OCR confidentiel qui fonctionne dans votre navigateur",
          html: `<p>Beaucoup d'outils d'OCR en ligne envoient vos images sur un serveur. Pas celui-ci : le moteur de texte fonctionne dans votre navigateur, si bien que tickets de caisse, contrats, pièces d'identité et conversations privées ne quittent jamais votre appareil. Seuls le moteur et les fichiers de langue sont téléchargés la première fois, puis l'outil fonctionne même hors ligne. L'historique reste désactivé sauf si vous l'activez. Découvrez <a href="/privacy">exactement ce qu'il advient de vos images</a>.</p>`,
        },
        {
          id: 'accuracy-tips',
          label: "Conseils pour plus de précision",
          heading: "Conseils pour des résultats plus précis",
          html: `<p>Partez de l'image la plus nette possible : une photo prise bien de face sous une lumière uniforme, ou une capture d'écran plutôt qu'une photo de l'écran. Recadrez ce dont vous n'avez pas besoin, et choisissez la langue si le mode Auto hésite. Pour les images difficiles, le panneau Ajuster peut redresser l'image, la rendre plus nette et augmenter le contraste avant la lecture. Plus de détails dans le guide pour <a href="/guides/how-to-get-accurate-ocr-results">obtenir des résultats d'OCR précis</a>.</p>`,
        },
      ],
    },

    faqHeading: "Image en texte : les questions fréquentes",
    faq: [
      { q: "Comment convertir une image en texte ?", a: "Collez une capture d'écran avec Ctrl+V (⌘V sur Mac) ou déposez un JPG, un PNG ou un PDF. La lecture démarre toute seule ; vérifiez les mots soulignés, puis copiez le texte ou téléchargez-le en Word, Excel, PDF ou texte brut." },
      { q: "Ce convertisseur image en texte est-il vraiment gratuit ?", a: "Oui. La lecture se fait sur votre propre appareil, ce qui ne nous coûte presque rien : pas d'inscription, pas de limite quotidienne, pas de filigrane, et tous les formats de téléchargement sont inclus." },
      { q: "Mes images sont-elles envoyées sur un serveur ?", a: "Non. Le moteur de texte fonctionne dans votre navigateur et vos images ne quittent jamais votre appareil. Seuls le moteur et les fichiers de langue sont téléchargés la première fois, puis mis en cache." },
      { q: "Quelle est la précision de la reconnaissance ?", a: "Un texte imprimé net est en général lu avec une grande précision. Les petits caractères, les photos sombres, les polices décoratives et l'écriture manuscrite sont plus difficiles : c'est pourquoi les mots douteux sont soulignés et l'endroit correspondant s'illumine sur l'image quand vous cliquez sur une ligne. La vérification ne prend que quelques secondes." },
      { q: "Peut-il lire l'écriture manuscrite ?", a: "Une écriture soignée, en lettres détachées, se lit généralement bien. La cursive liée est bien plus difficile pour tout moteur qui tourne sur l'appareil : attendez-vous à corriger quelques mots. Une bonne lumière et une photo prise bien de face sont ce qui aide le plus." },
      { q: "Puis-je transformer la photo d'un tableau en fichier Excel ?", a: "Oui. Les tableaux sont détectés automatiquement et affichés sous forme de grille modifiable. Copiez-la directement dans Excel ou Google Sheets, ou téléchargez un CSV ou un .xlsx où les nombres restent des nombres." },
      { q: "Quelles langues sont prises en charge ?", a: "47, dont l'anglais, le hindi, le bengali (bangla), l'ourdou, le népalais, le tamoul, le kannada, l'espagnol, le français, l'allemand, le portugais, l'arabe, le chinois, le japonais, le coréen et le russe. Choisissez-en plusieurs pour les images multilingues, ou laissez le réglage sur Auto." },
      { q: "Puis-je convertir un PDF image en texte ?", a: "Oui. Déposez un PDF et toutes ses pages sont lues. Les pages qui contiennent déjà du texte sont copiées à l'identique, et les pages scannées sont lues par OCR. Téléchargez le résultat en Word, en texte brut ou en PDF interrogeable." },
      { q: "Puis-je convertir une image en texte dans Word ?", a: "Oui. Téléchargez un .docx qui conserve titres, paragraphes et listes, ou copiez le texte et collez-le dans Word ou Google Docs avec sa mise en forme." },
      { q: "Est-ce un convertisseur image en texte à base d'IA ?", a: "Le texte est reconnu par Tesseract, un moteur d'OCR fondé sur un réseau de neurones entraîné à lire le texte imprimé. Contrairement à la plupart des outils d'IA, il fonctionne sur votre appareil : vos images ne sont jamais envoyées à un serveur." },
      { q: "Est-ce que ça fonctionne sur mon téléphone ?", a: "Oui. Prenez une photo avec le bouton appareil photo ou choisissez une capture d'écran dans votre galerie, puis copiez, téléchargez ou partagez le texte. Les photos HEIC d'iPhone s'ouvrent sans conversion." },
      { q: "Puis-je convertir plusieurs images en texte à la fois ?", a: "Oui, jusqu'à 50. Chaque image devient une page avec son propre résultat, et la vue Document complet les réunit dans l'ordre de votre choix, avec une recherche dans toutes les pages et un export unique." },
    ],
    relatedHeading: "Plus d'outils image en texte",

    cta: {
      title: "Collez une capture d'écran. Copiez le texte.",
      lede: "Gratuit, confidentiel et déjà prêt dans cet onglet.",
      choose: "Choisir des images",
      allTools: "Voir tous les outils",
    },
  },

  tool: {
    howToUse: "Mode d'emploi",
    faqHeading: "Questions fréquentes",
    relatedHeading: "Outils associés",
  },

  toolsPage: {
    count: { one: "{n} outil", other: "{n} outils" },
    title: "Outils",
    lede: "Tout se passe dans un seul espace de travail. Chaque page ci-dessous l'ouvre avec les bons réglages pour une tâche précise, et explique comment obtenir le meilleur résultat.",
    open: "Ouvrir l'outil principal",
    groupHave: "Partir de ce que vous avez",
    groupFormat: "Obtenir le format qu'il vous faut",
    groupSpecial: "Lire des contenus particuliers",
  },

  guidesPage: {
    count: { one: "{n} guide", other: "{n} guides" },
    title: "Guides",
    lede: "Comment obtenir un texte propre et modifiable à partir de captures d'écran, de photos, de scans et d'écriture manuscrite, et comment l'OCR fonctionne en coulisses.",
    crumb: "Guides",
    updated: "Mis à jour le",
    onThisPage: "Sur cette page",
    tryIt: "Essayer",
    open: "Ouvrir {name}",
    more: "Plus de guides",
  },

  privacyPage: {
    eyebrow: "Politique de confidentialité",
    title: "Ce qu'il advient de vos images",
    lede: "En bref : elles sont lues sur votre appareil et ne nous sont jamais envoyées.",
    ledeEnhanced: "En bref : elles sont lues sur votre appareil et ne nous sont jamais envoyées, sauf si vous choisissez la Lecture améliorée pour une page.",
    deviceTitle: "Sur votre appareil",
    deviceTag: "Par défaut",
    whereTerm: "Où le texte est lu",
    whereText: "Dans votre navigateur, par le moteur open source Tesseract compilé en WebAssembly.",
    uploadTerm: "Ce qui est envoyé",
    uploadText: "Rien. Vos images et votre texte restent sur votre appareil.",
    downloadTerm: "Ce qui est téléchargé",
    downloadText: "La page, le moteur de texte et les modèles des langues que vous utilisez (l'anglais pèse quelques mégaoctets). Votre navigateur les met en cache : le téléchargement ne se répète pas.",
    keptTerm: "Ce qui est conservé",
    keptText: "Rien, sauf si vous activez l'historique. Fermez l'onglet et les images comme le texte disparaissent.",
    trainingTerm: "Entraînement",
    trainingText: "Jamais. Nous ne voyons pas vos images, nous ne pouvons donc rien en faire.",
    enhTitle: "Lecture améliorée",
    enhTag: "Uniquement si vous la choisissez",
    enhWhenTerm: "Quand elle est utilisée",
    enhWhenText: "Uniquement après que vous avez appuyé sur « Essayer la Lecture améliorée » pour une page et confirmé. Elle n'est jamais utilisée automatiquement.",
    enhUploadText: "L'image de cette seule page, redimensionnée à 2 000 pixels au maximum, ainsi que le mode de lecture et la langue choisis.",
    enhWhoTerm: "Qui la lit",
    enhWhoText: "Notre serveur la transmet au modèle Claude d'Anthropic via l'API commerciale d'Anthropic, puis vous renvoie le texte.",
    enhKeptHtml: `Notre serveur n'enregistre ni l'image ni le texte. Pour appliquer la limite quotidienne, il compte les requêtes par visiteur à l'aide d'une empreinte (hash) de l'adresse IP, supprimée au bout d'une journée. La <a href="https://www.anthropic.com/legal/privacy" rel="noopener">politique de confidentialité</a> d'Anthropic indique combien de temps elle conserve les données de l'API.`,
    enhTrainingText: "Nous ne l'utilisons pas pour l'entraînement. Les conditions commerciales d'Anthropic indiquent qu'elle n'entraîne pas ses modèles sur les données de l'API par défaut.",
    historyTitle: "Historique",
    historyText:
      "L'historique est désactivé par défaut. Si vous l'activez, vos documents (images, texte et modifications) sont enregistrés dans le stockage propre à ce navigateur, sur cet appareil. Ils ne sont jamais envoyés. Vous pouvez supprimer un document ou tout effacer depuis le panneau Historique, et effacer les données de site de votre navigateur les supprime aussi.",
    linksTitle: "Liens que vous partagez",
    linksHtml:
      `« Copier le lien » place le texte dans le lien lui-même, après le <code>#</code>. Les navigateurs n'envoient cette partie à aucun serveur : partager un lien n'envoie donc rien. Toute personne qui a le lien peut lire le texte, alors traitez-le comme le texte lui-même.`,
    fromLinkTitle: "Images depuis un lien",
    fromLinkText:
      "Quand vous collez le lien d'une image, votre navigateur essaie d'abord de charger l'image directement. Si l'autre site ne le permet pas, notre serveur récupère cette seule image pour vous et vous la renvoie aussitôt, sans la stocker.",
    checkTitle: "Vérifiez par vous-même",
    checkText:
      "Inutile de nous croire sur parole. Ouvrez les outils de développement de votre navigateur, choisissez l'onglet Réseau et lisez une image : vous verrez arriver le moteur et les fichiers de langue, et aucune requête contenant votre image ne partir. Une fois une première image lue, l'outil continue de fonctionner avec le réseau coupé.",
    analyticsTitle: "Statistiques et cookies",
    analyticsText:
      "Ce site n'utilise ni publicité, ni cookies de suivi, ni outil de mesure d'audience tiers. Il enregistre quelques préférences (vos langues, l'activation ou non de l'historique) dans le stockage local de votre navigateur.",
  },

  legalPage: {
    updated: "Dernière mise à jour le",
    onThisPage: "Sur cette page",
    translationNoteHtml: `Ceci est une traduction. En cas de divergence avec la <a href="{href}" hreflang="en">version anglaise</a>, c'est la version anglaise qui prévaut.`,
  },

  aboutPage: {
    eyebrow: "À propos",
    title: "Le texte des images devrait être facile à copier",
    lede: "{site} est un convertisseur image en texte gratuit qui fonctionne dans votre navigateur. Collez une capture d'écran ou déposez une photo, un scan ou un PDF, et obtenez un texte à modifier, vérifier et exporter, sans inscription et sans envoyer vos images.",
    whyTitle: "Pourquoi nous l'avons créé",
    whyHtml:
      `<p>La plupart des textes dont on a besoin sont déjà sous nos yeux : un message d'erreur, un ticket de caisse, une diapositive, une page de notes. Les récupérer devrait prendre quelques secondes. Trop souvent, il faut pour cela envoyer une image privée sur un serveur dont on ne sait rien, subir des publicités ou se heurter à une limite quotidienne.</p><p>Nous avons donc fait l'inverse. {site} lit l'image là où elle se trouve déjà, sur votre appareil, avec le moteur open source Tesseract. Aucun compte à créer, rien à installer, et une fois le moteur chargé, l'outil fonctionne même hors ligne.</p>`,
    principlesTitle: "Ce qui compte pour nous",
    principles: [
      {
        title: "Confidentiel dès la conception",
        text: "Les images sont lues dans votre navigateur, pas sur nos serveurs. L'historique est désactivé sauf si vous l'activez, et il n'y a ni suivi ni publicité.",
      },
      {
        title: "Gratuit, sans contrepartie",
        text: "Pas d'inscription, pas de publicité, pas de captcha et pas de limite quotidienne pour la lecture sur votre appareil. Jusqu'à {pages} images à la fois, {mb} Mo chacune.",
      },
      {
        title: "Honnête sur ses limites",
        text: "L'OCR fait des erreurs, alors l'outil vous montre où. Les mots dont il n'était pas sûr sont soulignés et le niveau de confiance est affiché, jamais une promesse de perfection.",
      },
      {
        title: "Pensé pour de vrais documents",
        text: "Les tableaux deviennent des grilles modifiables, les tickets de caisse des champs, le code garde son indentation et les documents leurs titres et leurs listes.",
      },
    ],
    factsTitle: "En un coup d'œil",
    factLanguages: "langues, plusieurs sur une même page",
    factPages: "images en un seul lot",
    factFormats: "formats de téléchargement",
    factSignups: "compte nécessaire",
    howTitle: "Comment ça marche",
    howHtml:
      `<ol><li><strong>Ajoutez une image.</strong> Collez-la, déposez-la, choisissez un fichier, prenez une photo ou collez un lien. JPG, PNG, WebP, HEIC, TIFF, GIF, BMP et PDF sont tous acceptés.</li><li><strong>Elle est lue sur votre appareil.</strong> L'Amélioration auto nettoie l'image, le type de page est détecté, et Tesseract lit le texte directement dans votre navigateur.</li><li><strong>Vérifiez, modifiez et exportez.</strong> Corrigez les mots soulignés, puis copiez le texte ou téléchargez-le en Word, Excel, PDF, Markdown, JSON et plus encore.</li></ol><p>Envie d'en savoir plus ? Découvrez <a href="/guides/how-ocr-works">comment fonctionne l'OCR</a>, ou voyez <a href="/privacy">ce qu'il advient de vos images</a>.</p>`,
    creditsTitle: "Bâti sur l'open source",
    creditsText: "L'outil repose sur le travail de ces projets open source. Merci à toutes les personnes qui les développent et les maintiennent.",
    creditRoles: {
      tesseract: "Moteur de reconnaissance de texte",
      tesseractjs: "Tesseract dans le navigateur",
      pdfjs: "Lecture des fichiers PDF",
      libheif: "Ouverture des photos HEIC d'iPhone",
      codemirror: "Éditeur de texte",
      utif: "Lecture des images TIFF",
      fflate: "Fichiers ZIP",
      svelte: "Interface de l'espace de travail",
      astro: "Framework du site web",
      geist: "Police de caractères",
    },
    ctaTitle: "Une question, une idée ou un fichier qui ne se lit pas ?",
    ctaText: "N'hésitez pas à nous écrire.",
    ctaContact: "Nous contacter",
    ctaTool: "Ouvrir l'outil",
  },

  contactPage: {
    eyebrow: "Contact",
    title: "Contactez-nous",
    lede: "Un bug, une idée ou une question sur la confidentialité ? L'e-mail est le meilleur moyen de nous joindre.",
    emailLabel: "E-mail",
    write: "Écrire un e-mail",
    copy: "Copier l'adresse",
    copied: "Copiée",
    topicsTitle: "Comment pouvons-nous vous aider ?",
    topicLink: "Nous écrire",
    topicLinkLabel: "Nous écrire : {topic}",
    topics: [
      {
        title: "Signaler un problème",
        text: "Un fichier qui ne s'ouvre pas, un texte mal reconnu ou un bouton qui ne fonctionne pas. Indiquez-nous votre navigateur et votre appareil.",
        subject: "Signalement de problème",
        body: "Ce qui s'est passé :\n\nCe que j'attendais :\n\nNavigateur et appareil :\n",
      },
      {
        title: "Suggérer une fonctionnalité",
        text: "Un format dont vous avez besoin, une langue qui manque ou un moyen de rendre l'outil plus rapide à utiliser.",
        subject: "Idée de fonctionnalité",
        body: "",
      },
      {
        title: "Confidentialité et questions juridiques",
        text: "Des questions sur le traitement de vos données, des demandes au titre du RGPD ou du CCPA, ou toute question sur nos conditions.",
        subject: "Demande relative à la confidentialité",
        body: "",
      },
      {
        title: "Presse et partenariats",
        text: "Vous écrivez sur l'outil, souhaitez mettre un lien vers lui sur votre site ou aimeriez travailler avec nous.",
        subject: "Presse et partenariats",
        body: "",
      },
    ],
    sensitiveNote:
      "Merci de ne pas nous envoyer par e-mail d'images contenant des informations personnelles ou sensibles. Si un fichier se lit mal, un exemple similaire sans détails privés nous aide tout autant.",
    privacyHtml: `Nous utilisons votre message uniquement pour vous répondre. Consultez la <a href="/privacy">politique de confidentialité</a>.`,
    faqTitle: "Avant de nous écrire",
    faq: [
      {
        q: "L'outil est-il vraiment gratuit ?",
        aHtml: `Oui. Pas d'inscription, pas de publicité et pas de limite quotidienne pour la lecture sur votre appareil. <a href="/">Ouvrez l'outil</a> et collez une image.`,
      },
      {
        q: "Pouvez-vous voir les images que je lis ?",
        aHtml: `Non. Les images sont lues dans votre navigateur et ne nous sont pas envoyées. La <a href="/privacy">politique de confidentialité</a> explique tout en détail.`,
      },
      {
        q: "Une partie du texte est mal reconnue. Que faire ?",
        aHtml: `Recadrez sur le texte, vérifiez que la bonne langue est sélectionnée et essayez une photo plus nette et bien éclairée. Le guide pour <a href="/guides/how-to-get-accurate-ocr-results">obtenir des résultats d'OCR précis</a> donne d'autres conseils.`,
      },
      {
        q: "Est-ce que ça fonctionne hors ligne ?",
        aHtml: "Oui, après la première lecture. Votre navigateur conserve le moteur et les fichiers de langue, et l'outil continue de fonctionner sans connexion.",
      },
    ],
  },

  errorPage: {
    notFound: {
      eyebrow: "Erreur 404",
      title: "Cette page n'existe pas",
      lede: "Le lien est peut-être ancien ou mal saisi. Tout le reste est toujours là : l'outil image en texte, une page pour chaque tâche et des guides.",
      badge: "Introuvable",
      report: "Il devrait y avoir quelque chose ici ? {link}.",
      reportLink: "Dites-le-nous",
      reportSubject: "Lien cassé",
    },
    serverError: {
      eyebrow: "Erreur 500",
      title: "Un problème est survenu de notre côté",
      lede: "Ce n'est pas vous : le serveur a rencontré une erreur. Les images que vous lisez sur votre appareil ne sont pas concernées. Réessayez dans un instant.",
      badge: "Erreur serveur",
      retry: "Réessayer",
      report: "Si le problème persiste, {link}.",
      reportLink: "merci de nous le signaler",
      reportSubject: "Erreur serveur",
    },
    home: "Ouvrir l'outil image en texte",
    tools: "Parcourir tous les outils",
    popular: "Pages populaires",
    guides: "Tous les guides",
    contact: "Nous contacter",
  },

  sharePage: {
    eyebrow: "Texte partagé",
    fallbackTitle: "Texte partagé",
    copy: "Copier le texte",
    copied: "Copié",
    download: "Télécharger le .txt",
    readOwn: "Lire votre propre image",
    note: "Ce texte a voyagé dans le lien : il n'a jamais été envoyé à un serveur.",
    brokenTitle: "Ce lien ne contient aucun texte",
    brokenHtml: `Il a peut-être été tronqué lors de la copie. Demandez à nouveau le lien, ou <a href="/">lisez une image vous-même</a>.`,
  },
} satisfies UI;

export default fr;
