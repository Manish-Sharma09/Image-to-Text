---
title: "Como extrair texto de um print em qualquer aparelho"
description: "Copie o texto de um print no Windows, Mac, iPhone, Android ou Chromebook com as ferramentas do sistema e saiba quando um OCR dedicado poupa tempo."
summary: "Os jeitos nativos de copiar texto de um print em cada plataforma, e o que fazer com vários prints, tabelas, código e capturas de sites."
published: 2026-10-03
tool: screenshot-to-text
order: 1
---

Um print transforma texto numa imagem de texto. A mensagem do chat, a janela de erro ou o slide que você capturou estava legível um instante atrás, mas agora são pixels, e tirar as palavras de volta exige OCR (reconhecimento óptico de caracteres). A boa notícia é que todos os principais sistemas operacionais já trazem algum tipo de OCR embutido.

Este guia mostra primeiro o caminho nativo em cada plataforma e depois as situações em que uma ferramenta dedicada é mais rápida.

Antes de começar, veja se você precisa mesmo de um print. Se o texto está numa página da web ou num documento, tente selecioná-lo, ou pressione Ctrl+F (⌘F no Mac) e procure uma palavra que você está vendo. Se a busca encontrar, o texto é de verdade, e o bom e velho copiar e colar vai ser mais preciso que qualquer OCR.

## Windows

### O extrator de texto da Ferramenta de Captura

As versões recentes da Ferramenta de Captura no Windows 11 conseguem copiar texto de qualquer parte da tela sem salvar uma imagem.

1. Pressione Windows+Shift+S para abrir a barra de captura.
2. Escolha a opção de extrator de texto na barra.
3. Arraste um retângulo em volta do texto.
4. Selecione as linhas que você quer e copie, ou escolha Copiar todo o texto.

O menu Mais opções pode remover as quebras de linha do que você copia, ou copiar tudo automaticamente assim que você termina a seleção. Se a opção não aparecer, atualize a Ferramenta de Captura pela Microsoft Store.

### Ações de texto num print que você já tirou

Para um print que já existe, abra-o na Ferramenta de Captura (logo depois de uma captura nova, clique na notificação que aparece). Selecione Ações de texto na barra de ferramentas e a ferramenta destaca todo o texto que encontrou. Selecione uma parte e copie, ou use Copiar todo o texto.

As Ações de texto também oferecem a ocultação rápida (Quick redact), que cobre endereços de e-mail e números de telefone. Isso é útil quando você vai compartilhar a própria imagem, e não o texto. A Microsoft diz que esse reconhecimento de texto roda localmente, no seu dispositivo.

### Extrator de Texto do PowerToys

O PowerToys é um conjunto gratuito de utilitários da Microsoft para Windows 10 e 11. Depois de instalado, pressione Windows+Shift+T em qualquer lugar, arraste sobre o texto e ele vai direto para a área de transferência. Você pode mudar o atalho nas configurações do PowerToys.

O Extrator de Texto (Text Extractor) depende dos idiomas de OCR instalados no Windows. Para ler, por exemplo, hindi ou japonês, adicione antes esse idioma nas configurações de idioma do Windows, incluindo o componente de reconhecimento de texto, e depois escolha-o na lista quando o extrator abrir.

## Mac

O Texto ao Vivo, presente no macOS desde o Monterey, lê o texto de imagens na Pré-Visualização, no Fotos, na Visualização Rápida e no Safari. O caminho mais rápido dispensa salvar arquivo:

1. Pressione Command+Control+Shift+4 e arraste sobre o texto. Segurar Control copia o print para a área de transferência em vez de salvá-lo na mesa.
2. Abra a Pré-Visualização e escolha Arquivo > Novo da Área de Transferência.
3. Passe o ponteiro sobre o texto até ele virar um cursor de texto, arraste para selecionar e pressione Command+C.

Se o print já estiver salvo, selecione-o no Finder e pressione a barra de espaço para abrir a Visualização Rápida. Você pode selecionar e copiar o texto ali mesmo, sem abrir outro aplicativo.

## iPhone e iPad

O Texto ao Vivo funciona tanto em prints quanto em fotos da câmera, no iPhone XS e posteriores e em iPads recentes.

- Abra o print no app Fotos, ou toque na miniatura logo depois de tirá-lo.
- Toque e segure uma palavra, arraste os pontos de seleção sobre o texto que você quer e toque em Copiar.
- Para pegar tudo de uma vez, toque no botão Texto ao Vivo no canto da imagem e depois em Copiar Tudo.

## Android

### Circule para Pesquisar

Em muitos celulares Android recentes, incluindo modelos Pixel e Samsung Galaxy, toque e segure o botão início ou a barra de navegação na parte de baixo da tela para abrir o Circule para Pesquisar. Toque numa palavra ou arraste sobre o texto para destacá-lo e depois toque em Copiar. Como ele lê o que estiver na tela, muitas vezes nem é preciso tirar um print antes. Ele não funciona em aplicativos que bloqueiam a captura de tela, o que inclui muitos aplicativos de banco.

### Google Lens no Google Fotos

Para um print que você já salvou, abra-o no Google Fotos e toque em Lens. Quando a análise terminar, selecione o texto que você quer, ou selecione tudo, e toque em Copiar texto. Nos celulares Samsung Galaxy recentes, o app Galeria também mostra um ícone de texto quando encontra texto numa imagem.

## Chromebook

Pressione Ctrl+Shift+Mostrar janelas para fazer uma captura parcial da tela. Nos modelos Chromebook Plus, o recurso de captura de texto acrescenta um botão Mais ações depois que você seleciona uma área, com Copiar texto e opções como enviar uma tabela detectada para o Google Sheets. A página de ajuda do Google informa que a captura de texto envia a área selecionada para os servidores do Google para processamento.

Em qualquer Chromebook, você também pode clicar com o botão direito numa imagem no Chrome, escolher Pesquisar com o Google Lens e selecionar o texto no resultado.

## Como copiar texto de um print de site

Prints de páginas da web têm suas próprias manias, e um pouco de preparo faz muita diferença.

- **Aumente o zoom antes de capturar.** O zoom do navegador (Ctrl e + ou ⌘ e +) deixa as letras maiores no print. Isso ajuda o OCR muito mais do que ampliar a imagem depois, o que não acrescenta detalhes que não foram capturados.
- **Copie as imagens diretamente.** Banners, infográficos e gráficos são imagens na página. Clique com o botão direito, escolha Copiar imagem e cole na sua ferramenta de OCR, em vez de tirar um print da página inteira em volta.
- **Cuidado com o modo escuro.** Texto claro em fundo escuro confunde muitos motores de OCR. Mude o site para o tema claro antes de capturar ou use uma ferramenta que inverta a imagem para você.
- **Evite um único print gigante com rolagem.** Uma captura da página inteira de um artigo longo é reduzida, e o texto encolhe junto. Vários prints do tamanho da tela são lidos melhor.
- **Não use aplicativos de mensagens para transferir prints.** Esses aplicativos costumam comprimir as imagens, o que deixa texto pequeno borrado. Transfira o arquivo diretamente.

## Quando uma ferramenta dedicada é melhor

Os recursos nativos são ótimos para pegar uma frase ou um número de telefone. Eles ajudam menos quando o trabalho é maior.

- **Você tem vários prints.** Uma conversa longa ou um documento capturado tela por tela significa copiar e emendar vários resultados separados. Uma ferramenta que lê um lote de imagens em ordem e junta tudo poupa esse passo.
- **O print é uma tabela.** As ferramentas nativas entregam linhas de texto, então as colunas se desmancham quando você cola. O reconhecimento de tabelas mantém linhas e colunas, e o resultado cola no Excel ou no Google Sheets como células de verdade. Veja [como extrair tabelas de imagens](/pt/guides/how-to-extract-tables-from-images).
- **É código.** O recuo tem significado em Python e YAML, e aspas curvas quebram a maior parte do código. Um [leitor de prints de código](/pt/code-screenshot-to-text) mantém os espaços e endireita as aspas.
- **Você precisa conferir o resultado.** Para qualquer coisa em que você vai confiar, ajuda ver a imagem e o texto lado a lado, com as palavras duvidosas marcadas.
- **Você quer um arquivo.** Exportar para Word, Markdown ou CSV é mais rápido do que colar e reformatar.

O Image to Text App cobre esses casos no navegador, sem enviar a imagem. Tire um print para a área de transferência e pressione Ctrl+V (⌘V no Mac) em qualquer lugar da página [print para texto](/pt/screenshot-to-text). Capturas em modo escuro são invertidas automaticamente, e você pode adicionar até 50 prints de uma vez, arrastá-los para pôr em ordem e exportar o conjunto todo como um único documento.

Se o texto sair embaralhado em qualquer ferramenta que você use, a causa geralmente é a imagem. [Como obter resultados de OCR precisos](/pt/guides/how-to-get-accurate-ocr-results) mostra as soluções passo a passo.
