// Site text in Portuguese (Brazilian Portuguese, understandable in Portugal).
// Source and translator notes: ./en.ts
import type { UI } from './en';

const pt = {
  meta: {
    homeTitle: 'Converter imagem em texto – OCR grátis | Image to Text App',
    homeDescription:
      'Converta imagem em texto online e grátis. Extraia texto de JPG, PNG, prints, PDF e letra à mão em 47 idiomas. Sem cadastro, e a imagem fica no seu aparelho.',
    siteDescription:
      'Conversor de imagem em texto grátis que funciona no navegador. Extraia texto editável de JPG, PNG, prints, PDFs, tabelas, recibos e letra à mão — sem cadastro, e suas imagens ficam no seu dispositivo.',
    ogImageAlt: 'Image to Text App: copie o texto de qualquer imagem, grátis e no navegador',
    toolsTitle: 'Ferramentas de imagem para texto',
    toolsDescription:
      'Todas as ferramentas de imagem para texto: prints, fotos, PDFs, letra à mão, tabelas para Excel, recibos, notas fiscais e código, num só espaço de trabalho.',
    guidesTitle: 'Guias para extrair texto de imagens',
    guidesDescription:
      'Guias práticos para copiar texto de prints, fotos, digitalizações, recibos, tabelas e letra à mão — em qualquer aparelho, com ou sem uma ferramenta específica.',
    privacyTitle: 'Política de privacidade: o que acontece com suas imagens',
    privacyDescription:
      'Como o {site} trata suas imagens e textos: tudo é lido no seu dispositivo por padrão, nada é enviado e o histórico fica desligado até você ativá-lo.',
    aboutTitle: 'Sobre nós: imagem em texto grátis, direto no seu aparelho',
    aboutDescription:
      'Por que o {site} existe: imagem em texto grátis no navegador, sem cadastro e sem enviar nada. Nossos princípios e o código aberto por trás dele.',
    contactTitle: 'Fale conosco',
    contactDescription:
      'Fale com o {site} por e-mail para relatar um problema, sugerir um recurso, tirar dúvidas sobre privacidade ou tratar de imprensa e parcerias.',
    termsTitle: 'Termos e condições de uso',
    termsDescription:
      'Os termos de uso do {site}: suas imagens e textos continuam seus, uso justo do serviço, precisão dos resultados e limites da nossa responsabilidade.',
    notFoundTitle: 'Página não encontrada',
    notFoundDescription: 'Esta página não existe. A ferramenta de imagem para texto, uma página para cada tarefa e nossos guias estão a um clique de distância.',
    serverErrorTitle: 'Algo deu errado',
    serverErrorDescription: 'O servidor encontrou um erro. Tente de novo daqui a pouco.',
    shareTitle: 'Texto compartilhado',
    shareDescription: 'Texto compartilhado pelo {site}. O texto fica guardado dentro do próprio link.',
  },

  nav: {
    main: 'Principal',
    homeLabel: 'Página inicial do {site}',
    tools: 'Ferramentas',
    guides: 'Guias',
    privacy: 'Privacidade',
    openTool: 'Abrir a ferramenta',
    history: 'Histórico',
    skip: 'Pular para o conteúdo',
    breadcrumb: 'Trilha de navegação',
  },

  theme: {
    menu: 'Tema',
    current: 'Tema: {name}',
    system: 'Sistema',
    light: 'Claro',
    dark: 'Escuro',
    systemTheme: 'Tema do sistema',
    lightTheme: 'Tema claro',
    darkTheme: 'Tema escuro',
  },

  language: {
    menu: 'Idioma',
    current: 'Idioma: {name}',
  },

  footer: {
    about: 'Imagem para texto direto no navegador. Sem cadastro, sem anúncios, e suas imagens ficam no seu dispositivo.',
    tools: 'Ferramentas',
    imageToText: 'Imagem para texto',
    guides: 'Guias',
    allGuides: 'Todos os guias',
    privacy: 'Política de privacidade',
    terms: 'Termos de uso',
    aboutUs: 'Sobre nós',
    contact: 'Contato',
    allTools: 'Todas as ferramentas',
    howOcrWorks: 'Como funciona o OCR',
    copyright: '© {year} {site}. Reconhecimento de texto feito pelo motor de código aberto Tesseract.',
    languages: 'Idiomas',
  },

  hero: {
    crumbHome: 'Imagem para texto',
    homeH1: 'Converter imagem em texto grátis',
    homeIntro:
      'Copie o texto de qualquer imagem. Cole um print ou solte um JPG, PNG, foto, digitalização ou PDF e receba um texto que você pode editar, conferir e exportar — inclusive tabelas, recibos e código. OCR online grátis que roda no navegador, então suas imagens ficam no seu dispositivo.',
  },

  schema: {
    operatingSystem: 'Qualquer um (funciona no navegador)',
    browserRequirements: 'Requer um navegador moderno com WebAssembly',
    appAlternateNames: ['Conversor de imagem para texto', 'OCR de imagem para texto'],
    featureList: [
      'Conversor de imagem em texto grátis, sem cadastro e sem limite diário',
      'Imagem para texto no navegador, sem enviar as imagens',
      'JPG, PNG, WebP, HEIC, TIFF, GIF, BMP e PDF',
      'Detecção automática de tabelas, recibos, código, documentos e letra à mão',
      'Tabela para Excel e CSV',
      'Campos de recibos e notas fiscais',
      '47 idiomas, incluindo hindi, bengali, urdu, nepalês, tâmil e canarês',
      'Imagem para texto em lote: até 50 imagens de uma vez',
      'Exportação para Word, PDF, PDF pesquisável, Markdown, JSON, CSV, Excel, HTML e texto',
    ],
    howToName: 'Como converter imagem em texto',
    howToDescription: 'Extraia texto editável de um print, foto, digitalização ou PDF no seu navegador.',
  },

  home: {
    howTo: [
      { name: 'Adicione sua imagem', text: 'Cole um print com Ctrl+V (⌘V no Mac), arraste e solte um arquivo, escolha imagens, cole o link de uma imagem ou tire uma foto com o celular.' },
      { name: 'Aguarde a leitura', text: 'A leitura começa sozinha e costuma levar alguns segundos por página. Uma etiqueta curta mostra o que foi encontrado, como uma tabela, um recibo ou código.' },
      { name: 'Confira o texto', text: 'Clique em qualquer linha para ver de onde ela veio na imagem. As palavras sobre as quais o motor ficou em dúvida aparecem sublinhadas para você corrigir.' },
      { name: 'Copie ou baixe', text: 'Copie o texto com um clique ou baixe como Word, Excel, PDF, Markdown, JSON, CSV, HTML ou texto simples.' },
    ],

    readas: {
      eyebrow: 'Detecção',
      title: 'Um conversor de imagem em texto que sabe o que está lendo',
      lede: 'Cada imagem é analisada em busca de tabelas, recibos, código, documentos e letra à mão, e lida do jeito mais adequado. Você verá uma etiqueta curta como “Parece uma tabela”. Troque de modo quando quiser, sem precisar adicionar a imagem de novo.',
      tabsLabel: 'Exemplos',
      tabs: {
        table: 'Tabelas',
        receipt: 'Recibos',
        code: 'Código',
        document: 'Documentos',
        notes: 'Letra à mão',
        langs: 'Idiomas misturados',
      },
      alts: {
        table: 'Print de uma tabela de planilha com pedidos por região, antes de converter a imagem em texto',
        receipt: 'Foto de um recibo de café tirada em ângulo sobre uma mesa escura',
        code: 'Print de código Python em um editor com tema escuro',
        document: 'Página de artigo digitalizada sobre como cuidar de um fermento natural',
        notes: 'Anotações de reunião escritas à mão em papel pautado',
        langs: 'Aviso de biblioteca escrito em inglês e hindi',
      },
      caption: 'A imagem',
      table: {
        label: 'Parece uma tabela com 5 colunas',
        note: 'Edite qualquer célula e copie direto para o Excel ou o Google Sheets, ou baixe em CSV ou .xlsx. Números continuam sendo números.',
      },
      receipt: {
        label: 'Parece um recibo',
        business: 'Estabelecimento',
        date: 'Data',
        subtotal: 'Subtotal',
        tax: 'Imposto',
        total: 'Total',
        check: 'Os quatro itens somam 29.50, o mesmo valor do subtotal.',
        note: 'Esta foto foi tirada em ângulo sobre uma mesa escura. Antes da leitura, ela foi endireitada em 2,2° e a iluminação foi uniformizada.',
      },
      code: {
        label: 'Parece um print de código Python',
        note: 'O recuo é reconstruído a partir da posição de cada palavra, as aspas curvas são endireitadas e o tema escuro é invertido antes da leitura.',
      },
      document: {
        label: 'Parece um artigo ou documento',
        note: 'Linhas quebradas viram parágrafos, e títulos e listas são mantidos — até os marcadores que o motor não consegue ver. Baixe em Word ou Markdown.',
      },
      notes: {
        label: 'Lido como letra à mão',
        note: 'Letra caprichada, de forma, é bem lida. A cursiva emendada é mais difícil, então as palavras duvidosas ficam sublinhadas para você conferir.',
      },
      langs: {
        label: 'Texto em devanágari encontrado — lido como hindi + inglês',
        note: 'Nada para configurar: linhas em outra escrita são identificadas e a página é lida de novo no idioma certo. São 47 idiomas, vários ao mesmo tempo.',
      },
    },

    shortcut: {
      eyebrow: 'Teclado',
      title: 'Print para texto sem salvar arquivo',
      lede: 'A maior parte do texto de que precisamos está na tela: uma mensagem de erro, uma conversa, um slide numa videochamada. Copie o print, cole aqui e o texto fica pronto logo em seguida. No celular, compartilhe o print ou selecione o arquivo.',
      computer: 'Seu computador',
      showWindows: 'Mostrar janelas',
      shotNotes: {
        mac: 'arraste sobre o texto; ele vai direto para a área de transferência',
        win: 'arraste sobre o texto; a Ferramenta de Captura copia a imagem',
        cros: 'escolha uma área; o print é copiado',
      },
      step1: 'Tire um print para a área de transferência — {note}.',
      step2: 'Cole em qualquer lugar desta página. A leitura começa sozinha.',
      step3: 'Copie todo o texto, pronto para colar onde precisar.',
    },

    after: {
      eyebrow: 'Revisão e exportação',
      title: 'Feito para o que vem depois que o texto aparece',
      reviewTitle: 'Confira as palavras que importam',
      reviewText:
        'Clique numa linha do texto e o trecho correspondente se destaca na imagem; clique na imagem e o cursor pula para aquele texto. As palavras sobre as quais o motor ficou em dúvida aparecem sublinhadas, e um botão leva você de uma a outra. Você também recebe um nível de confiança honesto, nunca uma promessa de perfeição.',
      pagesTitle: 'Muitas imagens, um só documento',
      pagesText:
        'Solte uma pilha de prints ou páginas digitalizadas. Cada uma vira uma página que você pode reordenar, ler de novo ou remover. A visualização do documento inteiro junta tudo na ordem que você escolher, busca em todas as páginas e exporta um único arquivo Word, PDF ou Markdown — ou um ZIP com arquivos separados.',
      pagesMeta: 'Lendo {n} de 20',
      outTitle: 'Leve para onde quiser',
      outText:
        'Ao copiar, títulos, listas e tabelas são mantidos quando você cola no Google Docs, no Word ou no Sheets. Baixe em qualquer um dos oito formatos, inclusive um PDF pesquisável que coloca texto selecionável por trás da imagem original. Compartilhe um link que carrega o próprio texto, sem enviar nada.',
    },

    privacy: {
      eyebrow: 'Privacidade',
      title: 'Suas imagens ficam no seu dispositivo',
      lede: 'O motor de texto roda dentro do navegador, então fotos de recibos, contratos, documentos médicos e conversas privadas nunca chegam a um servidor. Não tem conta, nem anúncios, nem captcha.',
      more: 'Veja exatamente o que acontece',
      uploadTitle: 'Nada é enviado.',
      uploadText: 'A leitura acontece no seu dispositivo. Só o motor e os arquivos de idioma são baixados, uma única vez.',
      keptTitle: 'Nada fica guardado.',
      keptText: 'Feche a aba e tudo some. O histórico fica desligado até você ativá-lo, e mesmo assim fica só neste navegador.',
      checkTitle: 'Confira você mesmo.',
      checkText: 'O painel Rede do navegador mostra que nenhuma imagem sai, e depois que você lê uma imagem a ferramenta continua funcionando offline.',
      cloudTitle: 'Nuvem só se você pedir.',
      cloudText: 'Para letra à mão difícil, existe a Leitura avançada, opcional, que envia uma página para o nosso servidor — só quando você clica nela.',
    },

    formats: {
      eyebrow: 'Especificações',
      title: 'Formatos e idiomas compatíveis',
      filesTerm: 'Arquivos',
      filesText:
        'JPG e JPEG, PNG, WebP, GIF, BMP, TIFF (todas as páginas), HEIC e HEIF do iPhone, e PDF (todas as páginas — PDFs digitais são copiados direto, os digitalizados são lidos). Até 25 MB cada, 50 páginas por vez.',
      waysTerm: 'Como adicionar',
      waysText: 'Arraste e solte, escolha arquivos, cole com Ctrl ou ⌘ + V em qualquer lugar da página, cole o link de uma imagem ou use a câmera do celular.',
      contentTerm: 'Conteúdo',
      contentText:
        'Prints, documentos digitalizados e fotografados, recibos e notas fiscais, tabelas, formulários, livros e jornais, anotações e letra à mão, cartazes e etiquetas, código e equações simples.',
      languagesTerm: 'Idiomas',
      languagesText: '{popular}, além de {others}. Vários ao mesmo tempo na mesma imagem.',
      fixesTerm: 'Correções',
      fixesText:
        'Melhoria automática (inversão do modo escuro, remoção de sombras, endireitamento, contraste), recorte, correção de perspectiva pelos quatro cantos, rotação, brilho, contraste, nitidez, tons de cinza, preto e branco, redução de ruído.',
    },

    about: {
      eyebrow: 'Sobre a ferramenta',
      title: 'Converter imagem em texto online, grátis e com privacidade',
      lede: 'Como o conversor de imagem em texto funciona, o que ele consegue ler e como obter um texto limpo e preciso de qualquer imagem.',
      toc: 'Nesta página',
      sections: [
        {
          id: 'what-is-image-to-text',
          label: 'O que é um conversor de imagem em texto?',
          heading: 'O que é um conversor de imagem em texto?',
          html: '<p>Um conversor de imagem em texto pega uma imagem com algo escrito — um print, uma foto do celular, uma página digitalizada ou um PDF — e transforma o que está escrito em texto de verdade, que você pode selecionar, editar, pesquisar e colar. A tecnologia por trás disso é o OCR, sigla em inglês para reconhecimento óptico de caracteres. O Image to Text App usa o Tesseract, um motor de OCR de código aberto baseado em rede neural, e o executa direto no seu navegador. Ele não devolve só um bloco de caracteres: descobre se a imagem é uma tabela, um recibo, código, um artigo ou anotações à mão, e organiza o texto de acordo.</p>',
        },
        {
          id: 'how-to-convert-image-to-text',
          label: 'Como converter imagem em texto',
          heading: 'Como converter imagem em texto',
          html: '<ol><li><strong>Adicione sua imagem.</strong> Cole um print com Ctrl+V (⌘V no Mac), arraste e solte um arquivo, escolha imagens do seu dispositivo, cole o link de uma imagem ou tire uma foto com o celular.</li><li><strong>Aguarde a leitura.</strong> A leitura começa sozinha e costuma levar alguns segundos por página. Uma etiqueta curta informa o que foi encontrado, como “Parece uma tabela com 5 colunas”.</li><li><strong>Confira o texto.</strong> Clique em qualquer linha para ver de onde ela veio na imagem. As palavras sobre as quais o motor ficou em dúvida aparecem sublinhadas, para você corrigir rapidinho.</li><li><strong>Copie ou baixe.</strong> Copie tudo com um clique ou baixe como arquivo Word, Excel, PDF ou texto simples.</li></ol>',
        },
        {
          id: 'free-image-to-text',
          label: 'Grátis e sem limites',
          heading: 'Um conversor de imagem em texto grátis e sem limites',
          html: '<p>Não tem cadastro, limite diário, marca d’água nem captcha. Como o texto é reconhecido no seu próprio dispositivo, e não num servidor pago, a ferramenta inteira é gratuita para usar quantas vezes quiser, com todos os modos de leitura, todos os idiomas e todos os formatos de download incluídos. Converta um print rápido ou uma pilha de cinquenta páginas digitalizadas: nada fica reservado para um plano pago.</p>',
        },
        {
          id: 'jpg-png-pdf-handwriting',
          label: 'JPG, PNG, PDF e letra à mão',
          heading: 'JPG, PNG, PDF, prints e letra à mão',
          html: '<p>Ele lê JPG e JPEG, PNG, WebP, GIF, BMP, TIFF e fotos HEIC do iPhone, com até 25 MB cada. Num PDF, as páginas digitais são copiadas exatamente como estão e as digitalizadas são lidas com OCR, então transformar a imagem de um PDF em texto é rápido e preciso. Prints de conversas, mensagens de erro e slides saem especialmente limpos, e capturas em modo escuro são tratadas automaticamente. Letra à mão caprichada, no estilo de forma, também funciona bem; a cursiva emendada é mais difícil para qualquer motor que roda no próprio dispositivo, então as palavras duvidosas são sinalizadas para você. Cada formato tem sua própria página com dicas: <a href="/jpg-to-text">JPG para texto</a>, <a href="/png-to-text">PNG para texto</a>, <a href="/pdf-to-text">PDF para texto</a>, <a href="/screenshot-to-text">print para texto</a> e <a href="/handwriting-to-text">letra à mão para texto</a>.</p>',
        },
        {
          id: 'image-to-word-excel',
          label: 'Word, Excel e Google Docs',
          heading: 'Imagem para texto no Word, Excel e Google Docs',
          html: '<p>Ao copiar, títulos, listas e tabelas são mantidos, então o texto cola certinho no Google Docs, no Microsoft Word ou no Google Sheets. Para converter imagem em texto no Word, baixe um .docx com parágrafos e títulos preservados. Imagens de tabelas viram uma grade editável: corrija qualquer célula e cole no Excel, ou baixe em XLSX ou CSV com os números mantidos como números. Você também pode salvar um PDF pesquisável, Markdown, JSON ou HTML. Veja <a href="/image-to-word">imagem para Word</a>, <a href="/image-to-excel">imagem para Excel</a> e <a href="/image-to-pdf">imagem para PDF</a>.</p>',
        },
        {
          id: 'image-to-text-languages',
          label: '47 idiomas',
          heading: '47 idiomas, incluindo português, hindi e urdu',
          html: '<p>O conversor lê 47 idiomas, do inglês, espanhol, francês, alemão e português ao árabe, chinês, japonês, coreano e russo. Ele também cobre as principais escritas do sul da Ásia: hindi, bengali (bangla), urdu, nepalês, marati, tâmil, télugo, canarês, malaiala, guzerate e punjabi. Deixe no modo Automático e ele identifica linhas em outra escrita e as lê de novo no idioma certo, ou escolha você mesmo vários idiomas para uma imagem com idiomas misturados.</p>',
        },
        {
          id: 'bulk-image-to-text',
          label: 'Várias imagens de uma vez',
          heading: 'Imagem para texto em lote: várias imagens de uma vez',
          html: '<p>Adicione até 50 imagens ou páginas de PDF de uma só vez. Cada uma vira uma página com seu próprio resultado, que você pode reordenar, ler de novo ou remover. A visualização do documento inteiro junta todas as páginas na ordem que você escolher, busca em todas elas e exporta um único arquivo combinado ou um ZIP com arquivos separados — prático para um lote de recibos, slides de aula ou um relatório digitalizado.</p>',
        },
        {
          id: 'private-ocr',
          label: 'OCR privado no navegador',
          heading: 'OCR privado que roda no seu navegador',
          html: '<p>Muitas ferramentas de OCR online enviam suas imagens para um servidor. Esta não: o motor de texto roda dentro do navegador, então recibos, contratos, documentos de identidade e conversas privadas nunca saem do seu dispositivo. Só o motor e os arquivos de idioma são baixados na primeira vez, e depois disso tudo continua funcionando offline. O histórico fica desligado até você ativá-lo. Veja <a href="/privacy">exatamente o que acontece com suas imagens</a>.</p>',
        },
        {
          id: 'accuracy-tips',
          label: 'Dicas para resultados precisos',
          heading: 'Dicas para resultados mais precisos',
          html: '<p>Comece com a imagem mais nítida que tiver: uma foto tirada de frente, com luz uniforme, ou um print em vez de uma foto da tela. Recorte o que não for necessário e escolha o idioma se o modo Automático estiver em dúvida. Para imagens difíceis, o painel Ajustar pode endireitar, aumentar a nitidez e reforçar o contraste antes da leitura. Há mais dicas no guia para <a href="/guides/how-to-get-accurate-ocr-results">obter resultados de OCR precisos</a>.</p>',
        },
      ],
    },

    faqHeading: 'Imagem para texto: perguntas frequentes',
    faq: [
      { q: 'Como converter imagem em texto?', a: 'Cole um print com Ctrl+V (⌘V no Mac) ou solte um JPG, PNG ou PDF. A leitura começa sozinha; confira as palavras sublinhadas e depois copie o texto ou baixe como Word, Excel, PDF ou texto simples.' },
      { q: 'Este conversor de imagem em texto é mesmo grátis?', a: 'Sim. A leitura acontece no seu próprio dispositivo, então quase não custa nada para nós: sem cadastro, sem limite diário, sem marca d’água e com todos os formatos de download incluídos.' },
      { q: 'Minhas imagens são enviadas para algum servidor?', a: 'Não. O motor de texto roda dentro do navegador e suas imagens nunca saem do seu dispositivo. Só o motor e os arquivos de idioma são baixados na primeira vez e depois ficam em cache.' },
      { q: 'Qual é a precisão?', a: 'Texto impresso nítido costuma ser lido com muita precisão. Texto pequeno, fotos escuras, fontes decorativas e letra à mão são mais difíceis. Por isso as palavras duvidosas aparecem sublinhadas e o trecho correspondente se destaca na imagem quando você clica numa linha: conferir leva segundos.' },
      { q: 'Ele lê letra à mão?', a: 'Letra à mão caprichada, de forma, costuma ser bem lida. A cursiva emendada é bem mais difícil para qualquer motor que roda no próprio dispositivo, então conte com corrigir algumas palavras. Boa iluminação e uma foto tirada de frente são o que mais ajuda.' },
      { q: 'Dá para transformar a foto de uma tabela em Excel?', a: 'Sim. As tabelas são detectadas automaticamente e aparecem como uma grade editável. Copie direto para o Excel ou o Google Sheets, ou baixe em CSV ou .xlsx com os números mantidos como números.' },
      { q: 'Quais idiomas são compatíveis?', a: '47, incluindo português, inglês, espanhol, francês, alemão, hindi, bengali (bangla), urdu, nepalês, tâmil, canarês, árabe, chinês, japonês, coreano e russo. Escolha vários ao mesmo tempo para imagens com idiomas misturados ou deixe no modo Automático.' },
      { q: 'Posso converter a imagem de um PDF em texto?', a: 'Sim. Solte um PDF e todas as páginas são lidas. Páginas que já contêm texto são copiadas exatamente como estão, e as digitalizadas são lidas com OCR. Baixe o resultado como Word, texto simples ou PDF pesquisável.' },
      { q: 'Posso converter imagem em texto no Word?', a: 'Sim. Baixe um .docx com títulos, parágrafos e listas mantidos, ou copie o texto e cole no Word ou no Google Docs com a formatação intacta.' },
      { q: 'É um conversor de imagem em texto com IA?', a: 'O texto é reconhecido pelo Tesseract, um motor de OCR baseado em uma rede neural treinada para ler texto impresso. Diferente da maioria das ferramentas de IA, ele roda no seu dispositivo, então suas imagens nunca são enviadas a um servidor.' },
      { q: 'Funciona no celular?', a: 'Sim. Tire uma foto com o botão da câmera ou escolha um print da galeria e depois copie, baixe ou compartilhe o texto. Fotos HEIC do iPhone abrem sem precisar converter.' },
      { q: 'Posso converter várias imagens em texto de uma vez?', a: 'Sim, até 50. Cada imagem vira uma página com seu próprio resultado, e a visualização do documento inteiro junta todas na ordem que você escolher, com busca em todas as páginas e uma única exportação.' },
    ],
    relatedHeading: 'Mais ferramentas de imagem para texto',

    cta: {
      title: 'Cole um print. Copie o texto.',
      lede: 'Grátis, privado e já funcionando nesta aba.',
      choose: 'Escolher imagens',
      allTools: 'Ver todas as ferramentas',
    },
  },

  tool: {
    howToUse: 'Como usar',
    faqHeading: 'Perguntas frequentes',
    relatedHeading: 'Ferramentas relacionadas',
  },

  toolsPage: {
    count: { one: '{n} ferramenta', other: '{n} ferramentas' },
    title: 'Ferramentas',
    lede: 'É tudo um único espaço de trabalho. Cada página abaixo abre a ferramenta com as configurações certas para uma tarefa específica e explica como conseguir o melhor resultado.',
    open: 'Abrir a ferramenta principal',
    groupHave: 'Comece pelo que você tem',
    groupFormat: 'Escolha o formato de que precisa',
    groupSpecial: 'Leia conteúdos especiais',
  },

  guidesPage: {
    count: { one: '{n} guia', other: '{n} guias' },
    title: 'Guias',
    lede: 'Como extrair texto limpo e editável de prints, fotos, digitalizações e letra à mão, e como o OCR funciona por trás dos panos.',
    crumb: 'Guias',
    updated: 'Atualizado em',
    onThisPage: 'Nesta página',
    tryIt: 'Experimente',
    open: 'Abrir {name}',
    more: 'Mais guias',
  },

  privacyPage: {
    eyebrow: 'Política de privacidade',
    title: 'O que acontece com suas imagens',
    lede: 'Resumindo: elas são lidas no seu dispositivo e nunca são enviadas para nós.',
    ledeEnhanced: 'Resumindo: elas são lidas no seu dispositivo e nunca são enviadas para nós, a menos que você escolha a Leitura avançada para uma página.',
    deviceTitle: 'No seu dispositivo',
    deviceTag: 'Padrão',
    whereTerm: 'Onde o texto é lido',
    whereText: 'No seu navegador, pelo motor de código aberto Tesseract compilado para WebAssembly.',
    uploadTerm: 'O que é enviado',
    uploadText: 'Nada. Suas imagens e textos ficam no seu dispositivo.',
    downloadTerm: 'O que é baixado',
    downloadText: 'A página, o motor de texto e os modelos dos idiomas que você usa (o inglês tem poucos megabytes). O navegador guarda tudo em cache, então o download não se repete.',
    keptTerm: 'O que fica guardado',
    keptText: 'Nada, a menos que você ative o Histórico. Feche a aba e as imagens e o texto somem.',
    trainingTerm: 'Treinamento',
    trainingText: 'Nunca. Nós não vemos suas imagens, então não temos como usá-las para nada.',
    enhTitle: 'Leitura avançada',
    enhTag: 'Só quando você escolhe',
    enhWhenTerm: 'Quando é usada',
    enhWhenText: 'Só depois que você clica em “Experimentar a Leitura avançada” numa página e confirma. Ela nunca é usada automaticamente.',
    enhUploadText: 'Apenas a imagem daquela página, redimensionada para no máximo 2.000 pixels, junto com o modo de leitura e o idioma que você escolheu.',
    enhWhoTerm: 'Quem lê',
    enhWhoText: 'Nosso servidor repassa a imagem ao modelo Claude, da Anthropic, pela API comercial da Anthropic, e devolve o texto para você.',
    enhKeptHtml:
      'Nosso servidor não salva a imagem nem o texto. Para aplicar o limite diário, ele conta as solicitações por visitante usando um hash do endereço IP, que é descartado depois de um dia. A <a href="https://www.anthropic.com/legal/privacy" rel="noopener">política de privacidade</a> da Anthropic descreve por quanto tempo ela guarda os dados da API.',
    enhTrainingText: 'Não usamos para treinamento. Os termos comerciais da Anthropic dizem que ela não treina seus modelos com dados da API por padrão.',
    historyTitle: 'Histórico',
    historyText:
      'O histórico vem desligado. Se você ativá-lo, seus documentos (imagens, texto e edições) ficam salvos no armazenamento do próprio navegador, neste dispositivo. Eles nunca são enviados. Você pode excluir um documento ou apagar tudo no painel Histórico, e limpar os dados do site no navegador também remove tudo.',
    linksTitle: 'Links que você compartilha',
    linksHtml:
      '“Copiar link” coloca o texto dentro do próprio link, depois do <code>#</code>. Os navegadores não enviam essa parte para nenhum servidor, então compartilhar um link não envia nada. Qualquer pessoa com o link consegue ler o texto, então trate o link com o mesmo cuidado que o próprio texto.',
    fromLinkTitle: 'Imagens a partir de um link',
    fromLinkText:
      'Quando você cola o link de uma imagem, o navegador primeiro tenta carregá-la diretamente. Se o outro site não permitir, nosso servidor busca aquela imagem para você e a devolve na hora, sem armazená-la.',
    checkTitle: 'Confira você mesmo',
    checkText:
      'Você não precisa acreditar só na nossa palavra. Abra as ferramentas de desenvolvedor do navegador, escolha a aba Rede (Network) e leia uma imagem: você verá o motor e os arquivos de idioma chegando e nenhuma solicitação levando sua imagem embora. Depois de ler uma imagem, a ferramenta continua funcionando com a internet desligada.',
    analyticsTitle: 'Análises e cookies',
    analyticsText:
      'Este site não usa publicidade, cookies de rastreamento nem ferramentas de análise de terceiros. Ele guarda algumas preferências (seus idiomas, se o Histórico está ativado) no armazenamento local do navegador.',
  },

  legalPage: {
    updated: 'Última atualização',
    onThisPage: 'Nesta página',
    translationNoteHtml: 'Esta é uma tradução. Se houver divergência em relação à <a href="{href}" hreflang="en">versão em inglês</a>, prevalece a versão em inglês.',
  },

  aboutPage: {
    eyebrow: 'Sobre nós',
    title: 'Texto em imagens deveria ser fácil de copiar',
    lede: 'O {site} é um conversor de imagem em texto grátis que funciona no navegador. Cole um print ou solte uma foto, digitalização ou PDF e receba um texto que você pode editar, conferir e exportar, sem cadastro e sem enviar suas imagens.',
    whyTitle: 'Por que criamos a ferramenta',
    whyHtml:
      '<p>A maior parte do texto de que as pessoas precisam já está bem diante delas: uma mensagem de erro, um recibo, um slide, uma página de anotações. Tirar esse texto de lá deveria levar segundos. Mas, muitas vezes, isso significa enviar uma imagem privada para um servidor sobre o qual você não sabe nada, aguentar anúncios ou esbarrar num limite diário.</p><p>Então fizemos o contrário. O {site} lê a imagem onde ela já está, no seu dispositivo, com o motor de código aberto Tesseract. Não há conta para criar nem nada para instalar, e depois que o motor carrega, a ferramenta continua funcionando offline.</p>',
    principlesTitle: 'O que é importante para nós',
    principles: [
      {
        title: 'Privacidade desde a concepção',
        text: 'As imagens são lidas no seu navegador, não nos nossos servidores. O histórico fica desligado até você ativá-lo, e não há rastreamento nem publicidade.',
      },
      {
        title: 'Grátis, sem pegadinha',
        text: 'Sem cadastro, sem anúncios, sem captcha e sem limite diário para a leitura no seu dispositivo. Até {pages} imagens por vez, com até {mb} MB cada.',
      },
      {
        title: 'Honestidade sobre os limites',
        text: 'O OCR erra, então a ferramenta mostra onde. As palavras sobre as quais ela ficou em dúvida aparecem sublinhadas e o nível de confiança é exibido, nunca uma promessa de perfeição.',
      },
      {
        title: 'Feito para documentos de verdade',
        text: 'Tabelas viram grades editáveis, recibos viram campos, o código mantém o recuo e os documentos mantêm seus títulos e listas.',
      },
    ],
    factsTitle: 'Em resumo',
    factLanguages: 'idiomas, vários na mesma página',
    factPages: 'imagens num só lote',
    factFormats: 'formatos de download',
    factSignups: 'cadastros necessários',
    howTitle: 'Como funciona',
    howHtml:
      '<ol><li><strong>Adicione uma imagem.</strong> Cole, solte, escolha um arquivo, tire uma foto ou cole um link. Funciona com JPG, PNG, WebP, HEIC, TIFF, GIF, BMP e PDF.</li><li><strong>Ela é lida no seu dispositivo.</strong> A Melhoria automática limpa a imagem, o tipo de página é detectado e o Tesseract lê o texto direto no seu navegador.</li><li><strong>Confira, edite e exporte.</strong> Corrija as palavras sublinhadas e depois copie o texto ou baixe como Word, Excel, PDF, Markdown, JSON e outros formatos.</li></ol><p>Quer os detalhes? Leia <a href="/guides/how-ocr-works">como funciona o OCR</a> ou veja <a href="/privacy">o que acontece com suas imagens</a>.</p>',
    creditsTitle: 'Feito com código aberto',
    creditsText: 'A ferramenta se apoia no trabalho destes projetos de código aberto. Obrigado a todas as pessoas que os criam e mantêm.',
    creditRoles: {
      tesseract: 'Motor de reconhecimento de texto',
      tesseractjs: 'Tesseract no navegador',
      pdfjs: 'Leitura de arquivos PDF',
      libheif: 'Abertura de fotos HEIC do iPhone',
      codemirror: 'Editor de texto',
      utif: 'Leitura de imagens TIFF',
      fflate: 'Arquivos ZIP',
      svelte: 'Interface do espaço de trabalho',
      astro: 'Framework do site',
      geist: 'Fonte tipográfica',
    },
    ctaTitle: 'Dúvidas, ideias ou um arquivo que não está sendo lido?',
    ctaText: 'Queremos ouvir você.',
    ctaContact: 'Fale conosco',
    ctaTool: 'Abrir a ferramenta',
  },

  contactPage: {
    eyebrow: 'Contato',
    title: 'Entre em contato',
    lede: 'Encontrou um bug, tem uma ideia ou uma dúvida sobre privacidade? O e-mail é a melhor forma de falar com a gente.',
    emailLabel: 'E-mail',
    write: 'Escrever um e-mail',
    copy: 'Copiar endereço',
    copied: 'Copiado',
    topicsTitle: 'Como podemos ajudar?',
    topicLink: 'Envie um e-mail',
    topicLinkLabel: 'Envie um e-mail: {topic}',
    topics: [
      {
        title: 'Relatar um problema',
        text: 'Um arquivo que não abre, um texto que sai errado ou um botão que não funciona. Conte para a gente qual navegador e dispositivo você usa.',
        subject: 'Relato de problema',
        body: 'O que aconteceu:\n\nO que eu esperava:\n\nNavegador e dispositivo:\n',
      },
      {
        title: 'Sugerir um recurso',
        text: 'Um formato de que você precisa, um idioma que está faltando ou um jeito de deixar a ferramenta mais rápida de usar.',
        subject: 'Ideia de recurso',
        body: '',
      },
      {
        title: 'Privacidade e assuntos jurídicos',
        text: 'Dúvidas sobre como seus dados são tratados, solicitações com base no GDPR ou na CCPA, ou qualquer questão sobre nossos termos.',
        subject: 'Solicitação de privacidade',
        body: '',
      },
      {
        title: 'Imprensa e parcerias',
        text: 'Vai escrever sobre a ferramenta, quer colocar um link para ela no seu site ou tem interesse em trabalhar em conjunto.',
        subject: 'Imprensa e parcerias',
        body: '',
      },
    ],
    sensitiveNote:
      'Por favor, não envie por e-mail imagens que contenham informações pessoais ou sensíveis. Se um arquivo não é bem lido, um exemplo parecido sem dados privados ajuda tanto quanto.',
    privacyHtml: 'Usamos sua mensagem apenas para responder a você. Veja a <a href="/privacy">política de privacidade</a>.',
    faqTitle: 'Antes de escrever',
    faq: [
      {
        q: 'A ferramenta é mesmo grátis?',
        aHtml: 'Sim. Não tem cadastro, anúncios nem limite diário para a leitura no seu dispositivo. <a href="/">Abra a ferramenta</a> e cole uma imagem.',
      },
      {
        q: 'Vocês conseguem ver as imagens que eu leio?',
        aHtml: 'Não. As imagens são lidas no seu navegador e não são enviadas para nós. A <a href="/privacy">política de privacidade</a> explica todos os detalhes.',
      },
      {
        q: 'Parte do texto saiu errada. O que posso fazer?',
        aHtml: 'Recorte a imagem deixando só o texto, confira se o idioma certo está selecionado e tente uma foto mais nítida e bem iluminada. O guia para <a href="/guides/how-to-get-accurate-ocr-results">obter resultados de OCR precisos</a> tem mais dicas.',
      },
      {
        q: 'Funciona offline?',
        aHtml: 'Sim, depois da primeira leitura. O navegador guarda o motor e os arquivos de idioma, então a ferramenta continua funcionando sem conexão.',
      },
    ],
  },

  errorPage: {
    notFound: {
      eyebrow: 'Erro 404',
      title: 'Esta página não existe',
      lede: 'O link pode estar desatualizado ou ter sido digitado errado. Todo o resto continua aqui: a ferramenta de imagem para texto, uma página para cada tarefa e os guias.',
      badge: 'Não encontrada',
      report: 'Acha que deveria haver algo aqui? {link}.',
      reportLink: 'Avise a gente',
      reportSubject: 'Link quebrado',
    },
    serverError: {
      eyebrow: 'Erro 500',
      title: 'Algo deu errado do nosso lado',
      lede: 'O problema não é com você: o servidor encontrou um erro. As imagens que você lê no seu dispositivo não são afetadas. Tente de novo daqui a pouco.',
      badge: 'Erro no servidor',
      retry: 'Tentar de novo',
      report: 'Se continuar acontecendo, {link}.',
      reportLink: 'por favor, avise a gente',
      reportSubject: 'Erro no servidor',
    },
    home: 'Abrir a ferramenta de imagem para texto',
    tools: 'Ver todas as ferramentas',
    popular: 'Páginas populares',
    guides: 'Todos os guias',
    contact: 'Fale conosco',
  },

  sharePage: {
    eyebrow: 'Texto compartilhado',
    fallbackTitle: 'Texto compartilhado',
    copy: 'Copiar texto',
    copied: 'Copiado',
    download: 'Baixar .txt',
    readOwn: 'Ler sua própria imagem',
    note: 'Este texto viajou dentro do link, então nunca foi enviado a um servidor.',
    brokenTitle: 'Este link não contém nenhum texto',
    brokenHtml: 'Talvez ele tenha sido cortado ao ser copiado. Peça o link de novo ou <a href="/">leia uma imagem você mesmo</a>.',
  },
} satisfies UI;

export default pt;
