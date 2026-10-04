---
title: "PNG para texto: extrair texto de imagens PNG e prints"
description: "Transforme imagens PNG e prints em texto editável. PNGs sem perdas são lidos com nitidez, o modo escuro é tratado para você e tudo fica no seu navegador."
h1: "PNG para texto"
intro: "Solte um PNG, ou cole um direto da área de transferência, e copie o texto dele. Prints, capturas em modo escuro e gráficos exportados são lidos no seu dispositivo, sem enviar nada."
navLabel: "PNG para texto"
order: 11
preset:
  mode: auto
  export: txt
  sample: chat
steps:
  - "Arraste um PNG para a página, abra com Ctrl+O (⌘O no Mac) ou cole uma imagem copiada com Ctrl+V ou ⌘V."
  - "Recorte barras de ferramentas, ícones e fotos de perfil para que só o texto que você quer fique na imagem."
  - "Se o PNG mostrar código, uma tabela ou um documento formatado, troque o modo de leitura para combinar."
  - "Pressione Ctrl+Shift+C (⌘+Shift+C no Mac) para copiar todo o texto ou baixe como arquivo .txt."
faq:
  - q: "Por que prints em PNG costumam ser bem lidos?"
    a: "O PNG não tem perdas, então as bordas das letras continuam nítidas, sem as manchas que a compressão do JPEG acrescenta. Um print em PNG com texto nítido é uma das coisas mais fáceis de ler."
  - q: "O que acontece com um fundo transparente?"
    a: "As áreas transparentes são preenchidas com branco antes da leitura. Texto escuro é lido normalmente, mas texto branco ou muito claro sobre fundo transparente desaparece; nesse caso, coloque um fundo escuro num editor de imagens antes."
  - q: "Ele lê prints em modo escuro?"
    a: "Sim. A Melhoria automática inverte texto claro sobre fundo escuro antes da leitura e mostra esse ajuste na lista. Você também pode ativar Inverter por conta própria nas ferramentas manuais."
  - q: "Por que os ícones viram letras ou símbolos aleatórios?"
    a: "Ícones, emojis e símbolos da interface podem parecer letras ou pontuação para um motor de OCR. Recorte esses elementos antes da leitura ou apague os caracteres soltos no editor depois."
  - q: "Meu PNG é enviado para algum lugar?"
    a: "Não. O Image to Text App lê a imagem com um motor de OCR que roda no seu navegador, então o arquivo fica no seu dispositivo."
  - q: "Posso converter vários arquivos PNG de uma vez?"
    a: "Sim. Adicione até 50 imagens por espaço de trabalho, com até 25 MB cada. Cada uma vira uma página, e você pode copiar ou baixar as páginas separadamente ou como um único documento combinado."
related:
  - screenshot-to-text
  - jpg-to-text
  - code-screenshot-to-text
  - image-to-markdown
---

PNG é o formato que a maioria das ferramentas de captura de tela no Windows e no Mac usa por padrão, e é o que a maioria dos aplicativos exporta quando você salva um slide, gráfico, diagrama ou design como imagem. Por isso o PNG é a fonte mais comum de texto preso numa imagem: uma tela de configurações, uma conversa, um slide de apresentação, um gráfico com legendas ou uma página de relatório que alguém exportou para você.

## Por que o PNG é o formato mais amigável para OCR

O PNG não tem perdas. Cada pixel é guardado exatamente como é, então as bordas nítidas das letras sobrevivem, ao contrário do JPEG, que as borra um pouco cada vez que salva o arquivo. Para texto, a diferença é real: um PNG com letras pequenas muitas vezes é lido sem problemas, enquanto um JPEG da mesma imagem gera várias palavras para conferir.

O ponto fraco de um print não é o formato, é o tamanho. O texto da interface costuma ser pequeno na tela, então cada letra tem só alguns pixels de altura. A Melhoria automática amplia texto pequeno antes da leitura, mas, se você ainda vai tirar o print, aumentar o zoom antes (Ctrl e + na maioria dos navegadores e aplicativos, ⌘ e + no Mac) dá ao motor mais detalhe para trabalhar.

Em algumas telas, o texto é desenhado com leves franjas coloridas para parecer mais suave. Você não as percebe a menos que amplie bastante, e elas raramente causam problemas. Se um print for lido de um jeito estranho, experimente Tons de cinza nas ferramentas manuais.

## Fundos transparentes

PNGs podem ter áreas transparentes, algo comum em logotipos, figurinhas, ícones e gráficos exportados de ferramentas de design. Antes da leitura, o Image to Text App preenche a transparência com branco, do mesmo jeito que a maioria dos visualizadores de imagem mostra.

Isso não atrapalha texto escuro. O problema é a arte feita para ficar sobre um fundo escuro: texto branco sobre fundo transparente vira branco sobre branco, e não sobra nada para ler. Inverter a imagem depois não traz o texto de volta, porque as letras e o fundo agora têm a mesma cor. Abra o PNG num editor de imagens e acrescente um fundo escuro, ou tire um print dele enquanto aparece numa página escura, e leia esse print.

## Modo escuro e interfaces coloridas

Prints em modo escuro são tratados automaticamente. A Melhoria automática identifica texto claro sobre fundo escuro, inverte a imagem e mostra esse ajuste na lista, para você saber o que aconteceu. Mantenha pressionado o botão Comparar para ver o original.

Botões coloridos, texto de exemplo em cinza e texto sobre degradês são mais difíceis, porque há menos contraste entre as letras e o fundo. Se um rótulo não aparecer no resultado, aumente o Contraste ou experimente Preto e branco e depois leia de novo com Ctrl+Enter (⌘+Enter no Mac).

## Tire o excesso da interface

Prints costumam ter mais do que texto: ícones, fotos de perfil, barras de ferramentas, barras de rolagem e emojis. Um motor de OCR tenta ler tudo, então uma lupa pode virar um “Q” e um sinal de visto pode virar um “v”. Recortar só a parte de que você precisa é a coisa mais útil que você pode fazer com um print em PNG.

Prints de conversas também misturam nomes, horários e confirmações de leitura com as mensagens. Cada um desses itens aparece numa linha própria, o que facilita encontrá-los e apagá-los.

## Escolha o modo certo para o conteúdo do PNG

O Image to Text App analisa a imagem e escolhe um modo de leitura, com uma etiqueta como “Parece uma tabela”. Você pode trocar quando quiser, sem adicionar a imagem de novo.

- **Código de um editor ou terminal:** o modo Código mantém o recuo e o espaçamento e endireita as aspas curvas. Veja [print de código para texto](/pt/code-screenshot-to-text).
- **Uma tabela ou planilha:** o modo Tabela entrega uma grade editável que você cola no Excel ou no Google Sheets. Veja [imagem para Excel](/pt/image-to-excel).
- **Um slide ou documento:** o modo Documento junta as linhas em parágrafos e mantém títulos e listas com marcadores, ideal para baixar em [Markdown](/pt/image-to-markdown) ou Word.

## Limites que vale conhecer

Texto sobre fotos ou padrões carregados, letras estilizadas em gráficos e rótulos inclinados (como no eixo de um gráfico) são as fontes de erro mais comuns em PNGs. As palavras sobre as quais o motor ficou em dúvida aparecem sublinhadas para você conferir com a imagem. Clique em qualquer linha e o lugar dela se destaca na imagem.

Se o que você tem é um print recém-tirado, e não um arquivo salvo, dá para nem salvar. A página [print para texto](/pt/screenshot-to-text) mostra como mandar uma captura direto para a área de transferência e colar aqui.
