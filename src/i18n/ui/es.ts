// Spanish site text. Translated from en.ts — see the conventions there.
import type { UI } from './en';

const es = {
  meta: {
    homeTitle: 'Convertir imagen a texto online gratis | Image to Text App',
    homeDescription:
      'Convierte imágenes a texto gratis con OCR online. Extrae texto de JPG, PNG, capturas, PDF y letra a mano en 47 idiomas. Sin registro: tus imágenes no se suben.',
    siteDescription:
      'Convertidor de imagen a texto gratis que funciona en tu navegador. Extrae texto editable de JPG, PNG, capturas de pantalla, PDF, tablas, recibos y letra a mano, sin registro y sin que tus imágenes salgan de tu dispositivo.',
    ogImageAlt: 'Image to Text App: copia el texto de cualquier imagen, gratis y en tu navegador',
    toolsTitle: 'Herramientas para pasar imagen a texto',
    toolsDescription:
      'Todas las herramientas de imagen a texto en un solo lugar: capturas, fotos, PDF, letra a mano, tablas a Excel, recibos, facturas y código.',
    guidesTitle: 'Guías para extraer texto de imágenes',
    guidesDescription:
      'Guías prácticas para copiar texto de capturas, fotos, escaneos, recibos, tablas y letra a mano, en cualquier dispositivo y con o sin una herramienta específica.',
    privacyTitle: 'Política de privacidad: qué pasa con tus imágenes',
    privacyDescription:
      'Cómo trata {site} tus imágenes y tu texto: se leen en tu dispositivo por defecto, no se sube nada y el historial está desactivado salvo que lo actives.',
    aboutTitle: 'Sobre nosotros: imagen a texto gratis en tu dispositivo',
    aboutDescription:
      'Por qué existe {site}: imagen a texto gratis en el navegador, sin registro ni subidas. Nuestros principios y el código abierto que lo hace posible.',
    contactTitle: 'Contacto',
    contactDescription:
      'Contacta con {site} por correo para informar de un problema, sugerir una función, consultar sobre privacidad o hablar de prensa y colaboraciones.',
    termsTitle: 'Términos y condiciones',
    termsDescription:
      'Términos de uso de {site}: tus imágenes y tu texto siguen siendo tuyos, uso responsable, precisión de los resultados y límites de responsabilidad.',
    notFoundTitle: 'Página no encontrada',
    notFoundDescription: 'Esta página no existe. La herramienta de imagen a texto, una página para cada tarea y nuestras guías están a un solo clic de distancia.',
    serverErrorTitle: 'Algo salió mal',
    serverErrorDescription: 'El servidor tuvo un error. Vuelve a intentarlo en un momento.',
    shareTitle: 'Texto compartido',
    shareDescription: 'Texto compartido desde {site}. El texto va guardado dentro del propio enlace.',
  },

  nav: {
    main: 'Principal',
    homeLabel: 'Inicio de {site}',
    tools: 'Herramientas',
    guides: 'Guías',
    privacy: 'Privacidad',
    openTool: 'Abrir la herramienta',
    history: 'Historial',
    skip: 'Saltar al contenido',
    breadcrumb: 'Ruta de navegación',
  },

  theme: {
    menu: 'Tema',
    current: 'Tema: {name}',
    system: 'Sistema',
    light: 'Claro',
    dark: 'Oscuro',
    systemTheme: 'Tema del sistema',
    lightTheme: 'Tema claro',
    darkTheme: 'Tema oscuro',
  },

  language: {
    menu: 'Idioma',
    current: 'Idioma: {name}',
  },

  footer: {
    about: 'Imagen a texto directamente en tu navegador. Sin registro, sin anuncios y sin que tus imágenes salgan de tu dispositivo.',
    tools: 'Herramientas',
    imageToText: 'Imagen a texto',
    guides: 'Guías',
    allGuides: 'Todas las guías',
    privacy: 'Política de privacidad',
    terms: 'Términos y condiciones',
    aboutUs: 'Sobre nosotros',
    contact: 'Contacto',
    allTools: 'Todas las herramientas',
    howOcrWorks: 'Cómo funciona el OCR',
    copyright: '© {year} {site}. Reconocimiento de texto con el motor de código abierto Tesseract.',
    languages: 'Idiomas',
  },

  hero: {
    crumbHome: 'Imagen a texto',
    homeH1: 'Convertir imagen a texto gratis',
    homeIntro:
      'Copia el texto de cualquier imagen. Pega una captura de pantalla o suelta un JPG, PNG, foto, escaneo o PDF y obtén texto que puedes editar, revisar y exportar, incluidas tablas, recibos y código. OCR online gratis que funciona en tu navegador: tus imágenes no salen de tu dispositivo.',
  },

  schema: {
    operatingSystem: 'Cualquiera (funciona en el navegador)',
    browserRequirements: 'Requiere un navegador moderno con WebAssembly',
    appAlternateNames: ['Convertidor de imagen a texto', 'OCR de imagen a texto'],
    featureList: [
      'Convertidor de imagen a texto gratis, sin registro y sin límite diario',
      'Imagen a texto en el navegador, sin subir las imágenes',
      'JPG, PNG, WebP, HEIC, TIFF, GIF, BMP y PDF',
      'Detección automática de tablas, recibos, código, documentos y letra a mano',
      'Tablas a Excel y CSV',
      'Campos de recibos y facturas',
      '47 idiomas, incluidos hindi, bengalí, urdu, nepalí, tamil y canarés',
      'Imagen a texto por lotes: hasta 50 imágenes a la vez',
      'Exporta a Word, PDF, PDF con texto buscable, Markdown, JSON, CSV, Excel, HTML y texto',
    ],
    howToName: 'Cómo convertir una imagen a texto',
    howToDescription: 'Extrae texto editable de una captura de pantalla, foto, escaneo o PDF en tu navegador.',
  },

  home: {
    howTo: [
      { name: 'Añade tu imagen', text: 'Pega una captura de pantalla con Ctrl+V (⌘V en Mac), arrastra y suelta un archivo, elige imágenes, pega el enlace de una imagen o toma una foto con el teléfono.' },
      { name: 'Deja que la lea', text: 'La lectura empieza sola y suele tardar unos segundos por página. Una etiqueta breve indica qué ha encontrado, como una tabla, un recibo o código.' },
      { name: 'Revisa el texto', text: 'Haz clic en cualquier línea para ver de qué parte de la imagen sale. Las palabras de las que el motor no estaba seguro aparecen subrayadas para que las corrijas.' },
      { name: 'Copia o descarga', text: 'Copia el texto con un clic o descárgalo como Word, Excel, PDF, Markdown, JSON, CSV, HTML o texto sin formato.' },
    ],

    readas: {
      eyebrow: 'Detección',
      title: 'Un convertidor de imagen a texto que sabe lo que está leyendo',
      lede: 'Cada imagen se analiza en busca de tablas, recibos, código, documentos y letra a mano, y se lee de la forma que mejor le va. Verás una etiqueta breve como «Parece una tabla». Puedes cambiar a otro modo cuando quieras sin volver a subir nada.',
      tabsLabel: 'Ejemplos',
      tabs: {
        table: 'Tablas',
        receipt: 'Recibos',
        code: 'Código',
        document: 'Documentos',
        notes: 'Letra a mano',
        langs: 'Varios idiomas',
      },
      alts: {
        table: 'Captura de una tabla de hoja de cálculo con pedidos por región, antes de convertir la imagen a texto',
        receipt: 'Foto de un recibo de cafetería tomada en ángulo sobre una mesa oscura',
        code: 'Captura de código Python en un editor con tema oscuro',
        document: 'Página escaneada de un artículo sobre cómo cuidar la masa madre',
        notes: 'Notas de reunión escritas a mano en papel rayado',
        langs: 'Aviso de una biblioteca escrito en inglés y en hindi',
      },
      caption: 'La imagen',
      table: {
        label: 'Parece una tabla de 5 columnas',
        note: 'Edita cualquier celda y cópiala directamente en Excel o Google Sheets, o descarga CSV o .xlsx. Los números siguen siendo números.',
      },
      receipt: {
        label: 'Parece un recibo',
        business: 'Comercio',
        date: 'Fecha',
        subtotal: 'Subtotal',
        tax: 'Impuestos',
        total: 'Total',
        check: 'Los cuatro artículos suman 29.50, igual que el subtotal.',
        note: 'Esta foto se hizo en ángulo sobre una mesa oscura. Antes de leerla se enderezó 2,2° y se igualó la iluminación.',
      },
      code: {
        label: 'Parece una captura de código Python',
        note: 'La sangría se reconstruye a partir de la posición de cada palabra, las comillas tipográficas se convierten en rectas y el tema oscuro se invierte antes de leer.',
      },
      document: {
        label: 'Parece un artículo o documento',
        note: 'Las líneas cortadas se unen en párrafos, y los títulos y las listas se conservan, incluso las viñetas que el motor no ve. Descárgalo como Word o Markdown.',
      },
      notes: {
        label: 'Leído como letra a mano',
        note: 'La letra clara, tipo imprenta, se lee bien. La cursiva ligada cuesta más, así que las palabras dudosas se subrayan para que las revises.',
      },
      langs: {
        label: 'Se encontró texto en devanagari: leído como hindi + inglés',
        note: 'No hay que configurar nada: las líneas en otra escritura se detectan y la página se vuelve a leer con el idioma correcto. 47 idiomas, varios a la vez.',
      },
    },

    shortcut: {
      eyebrow: 'Teclado',
      title: 'Captura de pantalla a texto sin guardar ningún archivo',
      lede: 'Casi todo el texto que necesitamos está en una pantalla: un mensaje de error, un chat, una diapositiva en una videollamada. Copia la captura, pégala aquí y el texto estará listo un momento después. En el teléfono, comparte o sube la captura.',
      computer: 'Tu equipo',
      showWindows: 'Mostrar ventanas',
      shotNotes: {
        mac: 'selecciona el texto arrastrando; va directo al portapapeles',
        win: 'selecciona el texto arrastrando; Recortes lo copia',
        cros: 'elige una zona; la captura se copia',
      },
      step1: 'Haz una captura al portapapeles: {note}.',
      step2: 'Pégala en cualquier parte de esta página. La lectura empieza sola.',
      step3: 'Copia todo el texto, listo para pegarlo donde lo necesites.',
    },

    after: {
      eyebrow: 'Revisar y exportar',
      title: 'Pensado para lo que pasa después de que aparece el texto',
      reviewTitle: 'Revisa las palabras importantes',
      reviewText:
        'Haz clic en una línea del texto y su lugar se ilumina en la imagen; haz clic en la imagen y el cursor salta a ese texto. Las palabras de las que el motor no estaba seguro aparecen subrayadas, y un botón te lleva de una a otra. Además, ves un nivel de confianza honesto, nunca una promesa de perfección.',
      pagesTitle: 'Muchas imágenes, un solo documento',
      pagesText:
        'Suelta un montón de capturas o páginas escaneadas. Cada una se convierte en una página que puedes reordenar, volver a leer o quitar. La vista de documento completo las une en tu orden, busca en todas las páginas y exporta un único archivo Word, PDF o Markdown, o un ZIP con archivos separados.',
      pagesMeta: 'Leyendo {n} de 20',
      outTitle: 'Llévalo a donde quieras',
      outText:
        'Al copiar se conservan títulos, listas y tablas cuando pegas en Google Docs, Word o Sheets. Descarga en cualquiera de ocho formatos, incluido un PDF con texto buscable que coloca texto seleccionable detrás de la imagen original. Comparte un enlace que lleva el propio texto, así no se sube nada.',
    },

    privacy: {
      eyebrow: 'Privacidad',
      title: 'Tus imágenes no salen de tu dispositivo',
      lede: 'El motor de texto funciona dentro de tu navegador, así que las fotos de recibos, contratos, informes médicos y chats privados nunca llegan a un servidor. No hay cuenta, ni anuncios, ni captcha.',
      more: 'Lee exactamente qué ocurre',
      uploadTitle: 'Nada que subir.',
      uploadText: 'La lectura se hace en tu dispositivo. Solo se descargan el motor y los archivos de idioma, una única vez.',
      keptTitle: 'Nada guardado.',
      keptText: 'Cierra la pestaña y todo desaparece. El historial está desactivado salvo que lo actives, y entonces se queda en este navegador.',
      checkTitle: 'Compruébalo tú mismo.',
      checkText: 'El panel Red de tu navegador muestra que no sale ninguna imagen, y después de leer una imagen la herramienta sigue funcionando sin conexión.',
      cloudTitle: 'Nube solo si la pides.',
      cloudText: 'Para la letra a mano difícil hay una Lectura mejorada opcional que envía una página a nuestro servidor, solo cuando presionas el botón.',
    },

    formats: {
      eyebrow: 'Especificaciones',
      title: 'Formatos e idiomas compatibles',
      filesTerm: 'Archivos',
      filesText:
        'JPG y JPEG, PNG, WebP, GIF, BMP, TIFF (todas las páginas), HEIC y HEIF de iPhone, y PDF (todas las páginas: los PDF digitales se copian directamente y los escaneados se leen). Hasta 25 MB cada uno, 50 páginas a la vez.',
      waysTerm: 'Formas de añadir',
      waysText: 'Arrastra y suelta, elige archivos, pega con Ctrl o ⌘ + V en cualquier parte de la página, pega el enlace de una imagen o usa la cámara del teléfono.',
      contentTerm: 'Contenido',
      contentText:
        'Capturas de pantalla, documentos escaneados y fotografiados, recibos y facturas, tablas, formularios, libros y periódicos, apuntes y letra a mano, carteles y etiquetas, código y ecuaciones sencillas.',
      languagesTerm: 'Idiomas',
      languagesText: '{popular}, además de {others}. Varios a la vez en la misma imagen.',
      fixesTerm: 'Correcciones',
      fixesText:
        'Mejora automática (inversión del modo oscuro, eliminación de sombras, enderezado, contraste), recorte, corrección de perspectiva con cuatro esquinas, rotación, brillo, contraste, nitidez, escala de grises, blanco y negro y reducción de ruido.',
    },

    about: {
      eyebrow: 'Sobre la herramienta',
      title: 'Convertir imagen a texto online, gratis y en privado',
      lede: 'Cómo funciona el convertidor de imagen a texto, qué puede leer y cómo obtener un texto limpio y preciso de cualquier imagen.',
      toc: 'En esta página',
      sections: [
        {
          id: 'what-is-image-to-text',
          label: '¿Qué es un convertidor de imagen a texto?',
          heading: '¿Qué es un convertidor de imagen a texto?',
          html: '<p>Un convertidor de imagen a texto toma una imagen que contiene texto escrito (una captura de pantalla, una foto del teléfono, una página escaneada o un PDF) y lo convierte en texto real que puedes seleccionar, editar, buscar y pegar. La tecnología que hay detrás es el OCR, siglas en inglés de reconocimiento óptico de caracteres. Image to Text App usa Tesseract, un motor de OCR de código abierto basado en una red neuronal, y lo ejecuta directamente en tu navegador. No se limita a devolver un bloque de caracteres: detecta si le has dado una tabla, un recibo, código, un artículo o notas escritas a mano, y organiza el texto en consecuencia.</p>',
        },
        {
          id: 'how-to-convert-image-to-text',
          label: 'Cómo convertir una imagen a texto',
          heading: 'Cómo convertir una imagen a texto',
          html: '<ol><li><strong>Añade tu imagen.</strong> Pega una captura de pantalla con Ctrl+V (⌘V en Mac), arrastra y suelta un archivo, elige imágenes de tu dispositivo, pega el enlace de una imagen o toma una foto con el teléfono.</li><li><strong>Deja que la lea.</strong> La lectura empieza sola y suele tardar unos segundos por página. Una etiqueta breve te dice qué ha encontrado, por ejemplo «Parece una tabla de 5 columnas».</li><li><strong>Revisa el texto.</strong> Haz clic en cualquier línea para ver de qué parte de la imagen sale. Las palabras de las que el motor no estaba seguro aparecen subrayadas para que las corrijas rápido.</li><li><strong>Copia o descarga.</strong> Copia todo con un clic o descárgalo como archivo de Word, Excel, PDF o texto sin formato.</li></ol>',
        },
        {
          id: 'free-image-to-text',
          label: 'Gratis y sin límites',
          heading: 'Un convertidor de imagen a texto gratis y sin límites',
          html: '<p>No hay registro, ni límite diario, ni marca de agua, ni captcha. Como el texto se reconoce en tu propio dispositivo y no en un servidor de pago, la herramienta completa es gratis y puedes usarla tantas veces como quieras, con todos los modos de lectura, todos los idiomas y todos los formatos de descarga incluidos. Convierte una captura rápida o un montón de cincuenta páginas escaneadas: nada queda reservado para un plan de pago.</p>',
        },
        {
          id: 'jpg-png-pdf-handwriting',
          label: 'JPG, PNG, PDF y letra a mano',
          heading: 'JPG, PNG, PDF, capturas de pantalla y letra a mano',
          html: '<p>Lee JPG y JPEG, PNG, WebP, GIF, BMP, TIFF y fotos HEIC de iPhone, de hasta 25 MB cada una. En un PDF, las páginas digitales se copian tal cual y las escaneadas se leen con OCR, así que pasar un PDF a texto es rápido y preciso. Las capturas de chats, mensajes de error y diapositivas se leen especialmente bien, y las capturas en modo oscuro se procesan automáticamente. La letra a mano clara, tipo imprenta, también funciona bien; la cursiva ligada es más difícil para cualquier motor que funcione en el dispositivo, así que las palabras dudosas se marcan para ti. Cada formato tiene su propia página con consejos: <a href="/jpg-to-text">JPG a texto</a>, <a href="/png-to-text">PNG a texto</a>, <a href="/pdf-to-text">PDF a texto</a>, <a href="/screenshot-to-text">captura de pantalla a texto</a> y <a href="/handwriting-to-text">letra a mano a texto</a>.</p>',
        },
        {
          id: 'image-to-word-excel',
          label: 'Word, Excel y Google Docs',
          heading: 'Imagen a texto en Word, Excel y Google Docs',
          html: '<p>Al copiar se conservan los títulos, las listas y las tablas, así que el texto se pega limpio en Google Docs, Microsoft Word o Google Sheets. Para convertir una imagen a texto en Word, descarga un .docx con sus párrafos y títulos intactos. Las imágenes de tablas se convierten en una cuadrícula editable: corrige cualquier celda y pégala en Excel, o descarga XLSX o CSV con los números como números. También puedes guardar un PDF con texto buscable, Markdown, JSON o HTML. Consulta <a href="/image-to-word">imagen a Word</a>, <a href="/image-to-excel">imagen a Excel</a> e <a href="/image-to-pdf">imagen a PDF</a>.</p>',
        },
        {
          id: 'image-to-text-languages',
          label: '47 idiomas',
          heading: '47 idiomas, incluidos hindi, bengalí y urdu',
          html: '<p>El convertidor lee 47 idiomas, desde inglés, español, francés, alemán y portugués hasta árabe, chino, japonés, coreano y ruso. También cubre las principales escrituras del sur de Asia: hindi, bengalí (bangla), urdu, nepalí, maratí, tamil, telugu, canarés, malayalam, guyaratí y panyabí. Déjalo en Automático y detectará las líneas en otra escritura para volver a leerlas con el idioma correcto, o elige tú mismo varios idiomas para una imagen con texto en varios idiomas.</p>',
        },
        {
          id: 'bulk-image-to-text',
          label: 'Muchas imágenes a la vez',
          heading: 'Imagen a texto por lotes: muchas imágenes a la vez',
          html: '<p>Añade hasta 50 imágenes o páginas de PDF de una vez. Cada una se convierte en una página con su propio resultado, que puedes reordenar, volver a leer o quitar. La vista de documento completo une todas las páginas en tu orden, busca en todas ellas y exporta un único archivo combinado o un ZIP con archivos separados: muy práctico para un lote de recibos, diapositivas de clase o un informe escaneado.</p>',
        },
        {
          id: 'private-ocr',
          label: 'OCR privado en tu navegador',
          heading: 'OCR privado que funciona en tu navegador',
          html: '<p>Muchas herramientas de OCR online suben tus imágenes a un servidor. Esta no: el motor de texto funciona dentro de tu navegador, así que los recibos, contratos, documentos de identidad y chats privados nunca salen de tu dispositivo. Solo se descargan el motor y los archivos de idioma la primera vez, y a partir de ahí sigue funcionando sin conexión. El historial está desactivado salvo que lo actives. Lee <a href="/privacy">exactamente qué pasa con tus imágenes</a>.</p>',
        },
        {
          id: 'accuracy-tips',
          label: 'Consejos para un resultado preciso',
          heading: 'Consejos para obtener resultados más precisos',
          html: '<p>Empieza con la imagen más nítida que tengas: una foto de frente con luz uniforme, o una captura de pantalla en lugar de una foto de la pantalla. Recorta todo lo que no necesites y elige el idioma si el modo Automático no lo tiene claro. Con imágenes difíciles, el panel Ajustar puede enderezar, dar nitidez y subir el contraste antes de leer. Encontrarás más en la guía para <a href="/guides/how-to-get-accurate-ocr-results">obtener resultados de OCR precisos</a>.</p>',
        },
      ],
    },

    faqHeading: 'Imagen a texto: preguntas frecuentes',
    faq: [
      { q: '¿Cómo convierto una imagen a texto?', a: 'Pega una captura de pantalla con Ctrl+V (⌘V en Mac) o suelta un JPG, PNG o PDF. La lectura empieza sola; revisa las palabras subrayadas y luego copia el texto o descárgalo como Word, Excel, PDF o texto sin formato.' },
      { q: '¿Este convertidor de imagen a texto es realmente gratis?', a: 'Sí. La lectura se hace en tu propio dispositivo, así que mantenerlo no nos cuesta casi nada: sin registro, sin límite diario, sin marca de agua y con todos los formatos de descarga incluidos.' },
      { q: '¿Se suben mis imágenes?', a: 'No. El motor de texto funciona dentro de tu navegador y tus imágenes nunca salen de tu dispositivo. Solo se descargan el motor y los archivos de idioma la primera vez, y después quedan en caché.' },
      { q: '¿Qué precisión tiene?', a: 'El texto impreso claro suele leerse con mucha precisión. El texto pequeño, las fotos oscuras, las fuentes decorativas y la letra a mano son más difíciles; por eso las palabras dudosas aparecen subrayadas y, al hacer clic en una línea, se ilumina su lugar en la imagen, así que revisar lleva segundos.' },
      { q: '¿Puede leer letra a mano?', a: 'La letra a mano clara, tipo imprenta, suele leerse bien. La cursiva ligada es mucho más difícil para cualquier motor que funcione en el dispositivo; cuenta con corregir algunas palabras. Lo que más ayuda es buena luz y una foto tomada de frente.' },
      { q: '¿Puedo pasar la foto de una tabla a Excel?', a: 'Sí. Las tablas se detectan automáticamente y se muestran como una cuadrícula editable. Cópiala directamente en Excel o Google Sheets, o descarga CSV o .xlsx con los números como números.' },
      { q: '¿Qué idiomas admite?', a: '47, entre ellos inglés, hindi, bengalí (bangla), urdu, nepalí, tamil, canarés, español, francés, alemán, portugués, árabe, chino, japonés, coreano y ruso. Elige varios a la vez para imágenes con varios idiomas, o déjalo en Automático.' },
      { q: '¿Puedo convertir un PDF de imágenes a texto?', a: 'Sí. Suelta un PDF y se leen todas sus páginas. Las páginas que ya contienen texto se copian tal cual y las escaneadas se leen con OCR. Descarga el resultado como Word, texto sin formato o PDF con texto buscable.' },
      { q: '¿Puedo convertir una imagen a texto en Word?', a: 'Sí. Descarga un .docx con los títulos, párrafos y listas conservados, o copia el texto y pégalo en Word o Google Docs con su formato intacto.' },
      { q: '¿Es un convertidor de imagen a texto con IA?', a: 'El texto lo reconoce Tesseract, un motor de OCR basado en una red neuronal entrenada para leer texto impreso. A diferencia de la mayoría de las herramientas de IA, funciona en tu dispositivo, así que tus imágenes nunca se envían a un servidor.' },
      { q: '¿Funciona en el teléfono?', a: 'Sí. Toma una foto con el botón de la cámara o elige una captura de tu galería, y luego copia, descarga o comparte el texto. Las fotos HEIC de iPhone se abren sin convertirlas.' },
      { q: '¿Puedo convertir varias imágenes a texto a la vez?', a: 'Sí, hasta 50. Cada imagen se convierte en una página con su propio resultado, y la vista de documento completo las combina en el orden que elijas, con búsqueda en todas las páginas y una sola exportación.' },
    ],
    relatedHeading: 'Más herramientas de imagen a texto',

    cta: {
      title: 'Pega una captura. Copia el texto.',
      lede: 'Gratis, privado y ya funcionando en esta pestaña.',
      choose: 'Elegir imágenes',
      allTools: 'Ver todas las herramientas',
    },
  },

  tool: {
    howToUse: 'Cómo usarlo',
    faqHeading: 'Preguntas frecuentes',
    relatedHeading: 'Herramientas relacionadas',
  },

  toolsPage: {
    count: { one: '{n} herramienta', other: '{n} herramientas' },
    title: 'Herramientas',
    lede: 'Todo es un mismo espacio de trabajo. Cada página de abajo lo abre con la configuración adecuada para una tarea concreta y explica cómo conseguir el mejor resultado.',
    open: 'Abrir la herramienta principal',
    groupHave: 'Empieza por lo que tienes',
    groupFormat: 'Consigue el formato que necesitas',
    groupSpecial: 'Lee contenido especial',
  },

  guidesPage: {
    count: { one: '{n} guía', other: '{n} guías' },
    title: 'Guías',
    lede: 'Cómo obtener texto limpio y editable de capturas de pantalla, fotos, escaneos y letra a mano, y cómo funciona el OCR por dentro.',
    crumb: 'Guías',
    updated: 'Actualizado',
    onThisPage: 'En esta página',
    tryIt: 'Pruébalo',
    open: 'Abrir {name}',
    more: 'Más guías',
  },

  privacyPage: {
    eyebrow: 'Política de privacidad',
    title: 'Qué pasa con tus imágenes',
    lede: 'En resumen: se leen en tu dispositivo y nunca se nos envían.',
    ledeEnhanced: 'En resumen: se leen en tu dispositivo y nunca se nos envían, salvo que elijas la Lectura mejorada para una página.',
    deviceTitle: 'En tu dispositivo',
    deviceTag: 'Predeterminado',
    whereTerm: 'Dónde se lee el texto',
    whereText: 'En tu navegador, con el motor de código abierto Tesseract compilado a WebAssembly.',
    uploadTerm: 'Qué se sube',
    uploadText: 'Nada. Tus imágenes y tu texto se quedan en tu dispositivo.',
    downloadTerm: 'Qué se descarga',
    downloadText: 'La página, el motor de texto y los modelos de idioma que uses (el de inglés ocupa unos pocos megabytes). Tu navegador los guarda en caché, así que no se repite la descarga.',
    keptTerm: 'Qué se guarda',
    keptText: 'Nada, salvo que actives el Historial. Cierra la pestaña y las imágenes y el texto desaparecen.',
    trainingTerm: 'Entrenamiento',
    trainingText: 'Nunca. No vemos tus imágenes, así que no podemos usarlas para nada.',
    enhTitle: 'Lectura mejorada',
    enhTag: 'Solo si la eliges',
    enhWhenTerm: 'Cuándo se usa',
    enhWhenText: 'Solo después de que presiones «Probar la Lectura mejorada» en una página y lo confirmes. Nunca se usa automáticamente.',
    enhUploadText: 'La imagen de esa única página, reducida a un máximo de 2000 píxeles, junto con el modo de lectura y el idioma que hayas elegido.',
    enhWhoTerm: 'Quién la lee',
    enhWhoText: 'Nuestro servidor la envía al modelo Claude de Anthropic a través de la API comercial de Anthropic y te devuelve el texto.',
    enhKeptHtml:
      'Nuestro servidor no guarda la imagen ni el texto. Para aplicar el límite diario cuenta las solicitudes por visitante usando un hash de la dirección IP que se descarta al cabo de un día. La <a href="https://www.anthropic.com/legal/privacy" rel="noopener">política de privacidad</a> de Anthropic explica cuánto tiempo conserva los datos de la API.',
    enhTrainingText: 'No la usamos para entrenar. Las condiciones comerciales de Anthropic indican que, por defecto, no entrena sus modelos con datos de la API.',
    historyTitle: 'Historial',
    historyText:
      'El historial está desactivado por defecto. Si lo activas, tus documentos (imágenes, texto y cambios) se guardan en el almacenamiento propio de este navegador, en este dispositivo. Nunca se suben. Puedes borrar un documento o vaciarlo todo desde el panel Historial, y al borrar los datos del sitio en tu navegador también se elimina.',
    linksTitle: 'Enlaces que compartes',
    linksHtml:
      '«Copiar enlace» guarda el texto dentro del propio enlace, después del <code>#</code>. Los navegadores no envían esa parte a ningún servidor, así que compartir un enlace no sube nada. Cualquiera que tenga el enlace puede leer el texto, así que trátalo como si fuera el propio texto.',
    fromLinkTitle: 'Imágenes desde un enlace',
    fromLinkText:
      'Cuando pegas el enlace de una imagen, tu navegador intenta primero cargarla directamente. Si el otro sitio no lo permite, nuestro servidor obtiene esa imagen por ti y te la devuelve de inmediato, sin guardarla.',
    checkTitle: 'Compruébalo tú mismo',
    checkText:
      'No tienes que creernos sin más. Abre las herramientas para desarrolladores de tu navegador, elige la pestaña Red y lee una imagen: verás llegar el motor y los archivos de idioma, y ninguna solicitud que se lleve tu imagen. Después de leer una imagen, la herramienta sigue funcionando con la conexión desactivada.',
    analyticsTitle: 'Analítica y cookies',
    analyticsText:
      'Este sitio no usa publicidad, cookies de seguimiento ni analítica de terceros. Guarda algunas preferencias (tus idiomas, si el Historial está activado) en el almacenamiento local de tu navegador.',
  },

  legalPage: {
    updated: 'Última actualización',
    onThisPage: 'En esta página',
    translationNoteHtml: 'Esta es una traducción. Si difiere de la <a href="{href}" hreflang="en">versión en inglés</a>, prevalece la versión en inglés.',
  },

  aboutPage: {
    eyebrow: 'Sobre nosotros',
    title: 'El texto de las imágenes debería ser fácil de copiar',
    lede: '{site} es un convertidor de imagen a texto gratis que funciona en tu navegador. Pega una captura de pantalla o suelta una foto, un escaneo o un PDF, y obtén texto que puedes editar, revisar y exportar, sin registrarte y sin subir tus imágenes.',
    whyTitle: 'Por qué lo creamos',
    whyHtml:
      '<p>Casi todo el texto que necesitamos ya lo tenemos delante: un mensaje de error, un recibo, una diapositiva, una página de apuntes. Sacarlo debería llevar segundos. Demasiadas veces implica subir una imagen privada a un servidor del que no sabes nada, aguantar anuncios o toparte con un límite diario.</p><p>Así que creamos lo contrario. {site} lee la imagen donde ya está, en tu dispositivo, con el motor de código abierto Tesseract. No hay que crear ninguna cuenta ni instalar nada, y una vez cargado el motor, sigue funcionando sin conexión.</p>',
    principlesTitle: 'Lo que nos importa',
    principles: [
      {
        title: 'Privado desde el diseño',
        text: 'Las imágenes se leen en tu navegador, no en nuestros servidores. El historial está desactivado salvo que lo actives, y no hay seguimiento ni publicidad.',
      },
      {
        title: 'Gratis y sin letra pequeña',
        text: 'Sin registro, sin anuncios, sin captcha y sin límite diario para la lectura en tu dispositivo. Hasta {pages} imágenes a la vez, de {mb} MB cada una.',
      },
      {
        title: 'Honestos con los límites',
        text: 'El OCR comete errores, así que la herramienta te muestra dónde. Las palabras de las que no estaba seguro aparecen subrayadas y se muestra el nivel de confianza, nunca una promesa de perfección.',
      },
      {
        title: 'Hecho para documentos reales',
        text: 'Las tablas se convierten en cuadrículas editables, los recibos en campos, el código conserva su sangría y los documentos mantienen sus títulos y listas.',
      },
    ],
    factsTitle: 'De un vistazo',
    factLanguages: 'idiomas, varios en una misma página',
    factPages: 'imágenes en un solo lote',
    factFormats: 'formatos de descarga',
    factSignups: 'cuentas necesarias',
    howTitle: 'Cómo funciona',
    howHtml:
      '<ol><li><strong>Añade una imagen.</strong> Pega, suelta, elige un archivo, toma una foto o pega un enlace. Funcionan JPG, PNG, WebP, HEIC, TIFF, GIF, BMP y PDF.</li><li><strong>Se lee en tu dispositivo.</strong> La Mejora automática limpia la imagen, se detecta el tipo de página y Tesseract lee el texto directamente en tu navegador.</li><li><strong>Revisa, edita y exporta.</strong> Corrige las palabras subrayadas y luego copia el texto o descárgalo como Word, Excel, PDF, Markdown, JSON y más.</li></ol><p>¿Quieres más detalles? Lee <a href="/guides/how-ocr-works">cómo funciona el OCR</a> o consulta <a href="/privacy">qué pasa con tus imágenes</a>.</p>',
    creditsTitle: 'Hecho con código abierto',
    creditsText: 'La herramienta se apoya en el trabajo de estos proyectos de código abierto. Gracias a todas las personas que los crean y los mantienen.',
    creditRoles: {
      tesseract: 'Motor de reconocimiento de texto',
      tesseractjs: 'Tesseract en el navegador',
      pdfjs: 'Lectura de archivos PDF',
      libheif: 'Apertura de fotos HEIC de iPhone',
      codemirror: 'Editor de texto',
      utif: 'Lectura de imágenes TIFF',
      fflate: 'Archivos ZIP',
      svelte: 'Interfaz del espacio de trabajo',
      astro: 'Framework del sitio web',
      geist: 'Tipografía',
    },
    ctaTitle: '¿Preguntas, ideas o un archivo que no se lee?',
    ctaText: 'Nos encantaría saber de ti.',
    ctaContact: 'Contacta con nosotros',
    ctaTool: 'Abrir la herramienta',
  },

  contactPage: {
    eyebrow: 'Contacto',
    title: 'Ponte en contacto',
    lede: '¿Has encontrado un error, tienes una idea o una pregunta sobre privacidad? El correo electrónico es la mejor forma de contactarnos.',
    emailLabel: 'Correo electrónico',
    write: 'Escribir un correo',
    copy: 'Copiar dirección',
    copied: 'Copiado',
    topicsTitle: '¿En qué podemos ayudarte?',
    topicLink: 'Escríbenos',
    topicLinkLabel: 'Escríbenos: {topic}',
    topics: [
      {
        title: 'Informar de un problema',
        text: 'Un archivo que no se abre, un texto que sale mal o un botón que no funciona. Dinos qué navegador y dispositivo usas.',
        subject: 'Informe de un problema',
        body: 'Qué pasó:\n\nQué esperaba:\n\nNavegador y dispositivo:\n',
      },
      {
        title: 'Sugerir una función',
        text: 'Un formato que necesitas, un idioma que falta o una forma de hacer que la herramienta sea más rápida de usar.',
        subject: 'Idea de función',
        body: '',
      },
      {
        title: 'Privacidad y aspectos legales',
        text: 'Preguntas sobre cómo se tratan tus datos, solicitudes en virtud del RGPD o la CCPA, o cualquier duda sobre nuestros términos.',
        subject: 'Solicitud de privacidad',
        body: '',
      },
      {
        title: 'Prensa y colaboraciones',
        text: 'Si escribes sobre la herramienta, quieres enlazarla desde tu sitio o te interesa colaborar con nosotros.',
        subject: 'Prensa y colaboraciones',
        body: '',
      },
    ],
    sensitiveNote:
      'Por favor, no envíes por correo imágenes que contengan información personal o sensible. Si un archivo se lee mal, un ejemplo parecido sin datos privados nos ayuda igual.',
    privacyHtml: 'Solo usamos tu mensaje para responderte. Consulta la <a href="/privacy">política de privacidad</a>.',
    faqTitle: 'Antes de escribir',
    faq: [
      {
        q: '¿La herramienta es realmente gratis?',
        aHtml: 'Sí. No hay registro, ni anuncios, ni límite diario para la lectura en tu dispositivo. <a href="/">Abre la herramienta</a> y pega una imagen.',
      },
      {
        q: '¿Pueden ver las imágenes que leo?',
        aHtml: 'No. Las imágenes se leen en tu navegador y no se nos envían. La <a href="/privacy">política de privacidad</a> lo explica todo con detalle.',
      },
      {
        q: 'Parte del texto salió mal. ¿Qué puedo hacer?',
        aHtml: 'Recorta la imagen para dejar solo el texto, comprueba que esté seleccionado el idioma correcto y prueba con una foto más nítida y bien iluminada. La guía para <a href="/guides/how-to-get-accurate-ocr-results">obtener resultados de OCR precisos</a> tiene más consejos.',
      },
      {
        q: '¿Funciona sin conexión?',
        aHtml: 'Sí, después de la primera lectura. Tu navegador guarda el motor y los archivos de idioma, así que la herramienta sigue funcionando sin conexión.',
      },
    ],
  },

  errorPage: {
    notFound: {
      eyebrow: 'Error 404',
      title: 'Esta página no existe',
      lede: 'Puede que el enlace sea antiguo o esté mal escrito. Todo lo demás sigue aquí: la herramienta de imagen a texto, una página para cada tarea y las guías.',
      badge: 'No encontrada',
      report: '¿Crees que aquí debería haber algo? {link}.',
      reportLink: 'Avísanos',
      reportSubject: 'Enlace roto',
    },
    serverError: {
      eyebrow: 'Error 500',
      title: 'Algo salió mal por nuestra parte',
      lede: 'No es culpa tuya: el servidor tuvo un error. Las imágenes que lees en tu dispositivo no se ven afectadas. Vuelve a intentarlo en un momento.',
      badge: 'Error del servidor',
      retry: 'Volver a intentarlo',
      report: 'Si sigue ocurriendo, por favor, {link}.',
      reportLink: 'avísanos',
      reportSubject: 'Error del servidor',
    },
    home: 'Abrir la herramienta de imagen a texto',
    tools: 'Ver todas las herramientas',
    popular: 'Páginas populares',
    guides: 'Todas las guías',
    contact: 'Contacta con nosotros',
  },

  sharePage: {
    eyebrow: 'Texto compartido',
    fallbackTitle: 'Texto compartido',
    copy: 'Copiar texto',
    copied: 'Copiado',
    download: 'Descargar .txt',
    readOwn: 'Lee tu propia imagen',
    note: 'Este texto viajó dentro del enlace, así que nunca se subió a un servidor.',
    brokenTitle: 'Este enlace no contiene texto',
    brokenHtml: 'Puede que se cortara al copiarlo. Pide el enlace de nuevo o <a href="/">lee una imagen tú mismo</a>.',
  },
} satisfies UI;

export default es;
