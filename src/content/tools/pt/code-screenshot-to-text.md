---
title: "Print de código para texto: copiar código de uma imagem"
description: "Transforme o print de um código em texto para colar e executar. O modo Código mantém o recuo, corrige aspas curvas e identifica a linguagem. Tema escuro também."
h1: "Copie o código de um print"
intro: "Cole o print de um código tirado de um vídeo, slide, conversa ou editor e receba o código-fonte em texto simples, com o recuo intacto, as aspas curvas corrigidas e a linguagem identificada. Temas escuros são tratados automaticamente."
navLabel: "Print de código para texto"
order: 15
preset:
  mode: code
  export: md
  sample: code
  camera: false
steps:
  - "Copie o print para a área de transferência e pressione Ctrl+V ou ⌘V em qualquer lugar da página."
  - "Confira se “Ler como” mostra Código; a etiqueta acima do resultado informa a linguagem reconhecida."
  - "Revise as palavras sublinhadas, com atenção especial a colchetes, zeros e uns."
  - "Copie o código com Ctrl+Shift+C ou ⌘+Shift+C, ou baixe como arquivo Markdown."
faq:
  - q: "Quais linguagens de programação ele reconhece?"
    a: "Python, JavaScript, TypeScript, Java, C#, C/C++, Go, Rust, PHP, Ruby, SQL, HTML, CSS, JSON, shell e YAML. Código em outras linguagens também é lido com o recuo preservado; só não recebe a etiqueta com o nome da linguagem."
  - q: "O destaque de sintaxe é mantido?"
    a: "Não, o resultado é texto simples. Código colorido é lido normalmente e, quando você cola no seu editor, o destaque do próprio editor entra em ação."
  - q: "Ele lê os números de linha da margem?"
    a: "Os números de linha na margem do editor podem ser lidos como parte do código. Recorte essa área antes da leitura ou apague os números depois."
  - q: "Dá para ler código de um vídeo pausado?"
    a: "Sim, se o quadro estiver nítido. Pause num quadro em tela cheia, na maior qualidade possível, porque o desfoque e a compressão apagam detalhes pequenos, como a diferença entre um ponto e uma vírgula."
  - q: "Meu código é enviado para algum servidor?"
    a: "Não. O print é lido no seu dispositivo, dentro do navegador, então código privado, e qualquer chave ou token visível na imagem, não é enviado a um servidor."
related:
  - screenshot-to-text
  - image-to-markdown
  - png-to-text
---

## Por que o OCR comum estraga o código

O reconhecimento de texto comum foi feito para prosa. Ele trata espaços no início da linha como ruído, junta linhas que parecem fazer parte da mesma frase e repassa as aspas do jeito que as vê. Isso funciona bem para um parágrafo, mas quebra o código: o Python para de rodar quando perde o recuo, o YAML muda de sentido, e uma única aspa curva copiada de um slide transforma uma string em erro de sintaxe.

O modo Código lê a imagem de outro jeito:

- **O recuo e o espaçamento são mantidos**, linha por linha, então blocos aninhados continuam aninhados.
- **As aspas curvas são corrigidas**, então `“hello”` e `‘a’` voltam como `"hello"` e `'a'`.
- **A linguagem é identificada** quando reconhecida, por exemplo “Parece um print de código Python”, um sinal rápido de que o modo combina com a imagem.

Quando você baixa um arquivo Markdown, o código vem dentro de um bloco cercado, pronto para ir para um README, uma página de wiki ou suas anotações.

## Temas escuros e sintaxe colorida

Hoje a maioria dos editores e terminais usa tema escuro, e os motores de OCR leem melhor texto escuro sobre fundo claro. A Melhoria automática detecta texto claro sobre fundo escuro e inverte as cores antes da leitura, então prints em modo escuro não precisam de nenhuma preparação.

A sintaxe colorida também costuma funcionar bem. Os pontos mais fracos são as partes de baixo contraste do tema: comentários cinza sobre fundo cinza-escuro ou marcadores de espaço em branco bem apagados. Se esses trechos saírem embaralhados, experimente Tons de cinza e um pouco mais de contraste, depois passe para a visualização tratada para confirmar que nada se perdeu.

## Caracteres que merecem uma segunda olhada

Alguns caracteres são quase idênticos em muitas fontes de programação, e um print pequeno piora a situação. Os suspeitos de sempre são:

- **0 e O**, principalmente em nomes de variáveis e valores hexadecimais
- **1, l e I**, que em algumas fontes diferem por um único pixel
- **Colchetes e parênteses**: `{` e `(`, `]` e `)`, além dos sinais de menor e maior em genéricos e tags HTML
- **Pontuação**: `;` e `:`, `,` e `.`, e uma crase lida como aspa reta
- **Letras grudadas**: `rn` lido como `m`, ou `cl` lido como `d`
- **Sublinhados** que somem ou viram espaços em nomes como `user_id`

Fontes de editor com ligaduras desenham `!=`, `=>` ou `>=` como um único símbolo, que pode não ser lido de volta como os caracteres que você digitou. Se o print vier do seu próprio editor, desative as ligaduras antes de capturar a tela.

A conferência mais rápida é colar o código num editor com linter ou compilador. Colchetes sem par e caracteres perdidos aparecem em segundos.

## Como conferir o recuo em Python e YAML

Em linguagens em que o recuo tem significado, uma linha com um nível a mais ou a menos pode continuar rodando, mas fazer outra coisa. Nem sempre o linter percebe isso, então compare o aninhamento com o print em qualquer bloco importante, como o corpo de um loop ou uma chave aninhada num arquivo de configuração.

Clicar numa linha do resultado destaca o lugar dela na imagem, o que torna rápido ver onde a linha realmente começava. Se um bloco inteiro estiver deslocado, geralmente é mais rápido corrigir no editor, recuando o bloco todo de uma vez, do que linha por linha.

## Como tirar um print mais limpo

Muitas vezes você consegue um resultado melhor tirando o print de novo do que corrigindo caracteres à mão depois:

- **Aumente o zoom antes de capturar.** Texto maior tem mais pixels por caractere, o que ajuda principalmente na pontuação.
- **Capture só o código.** Deixe de fora barras laterais, abas e minimapas para que nada se misture às suas linhas.
- **Desative a quebra automática de linha.** Uma linha longa quebrada em duas no editor será lida como duas linhas.
- **Atenção a tabulações e espaços.** Uma imagem não mostra qual dos dois o original usava, então, se o seu projeto usa tabulações, rode o formatador depois de colar.

Para prints em geral, incluindo conversas e janelas de erro, a página [print para texto](/pt/screenshot-to-text) e o guia [como extrair texto de um print](/pt/guides/how-to-extract-text-from-a-screenshot) cobrem o básico. Se o código faz parte de uma página de documento maior, [imagem para Markdown](/pt/image-to-markdown) explica como separar o texto corrido e o código em prints diferentes.
