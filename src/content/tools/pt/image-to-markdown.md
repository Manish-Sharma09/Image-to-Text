---
title: "Imagem para Markdown: converter print em .md grátis"
description: "Converta imagem ou print em Markdown com títulos, listas, tabelas e blocos de código para notas, documentação, wikis ou prompts de IA. Roda no navegador."
h1: "Converter imagem em Markdown"
intro: "Gere Markdown a partir de um print, slide ou foto de uma página: títulos viram linhas com #, listas continuam listas, tabelas viram tabelas Markdown e o código vai para blocos delimitados. Copie ou baixe um arquivo .md."
navLabel: "Imagem para Markdown"
order: 13
preset:
  mode: document
  export: md
  sample: document
  camera: false
steps:
  - "Cole um print com Ctrl+V ou ⌘V, ou solte uma foto ou digitalização da página."
  - "Use o modo Documento para texto corrido, ou mude o seletor Ler como para Tabela ou Código se a imagem for principalmente uma tabela ou código."
  - "Confira títulos, itens de lista e células de tabela com a imagem e corrija as palavras sublinhadas para revisão."
  - "Baixe um arquivo Markdown (.md) ou copie o texto e cole nas suas notas, na documentação ou no seu prompt."
faq:
  - q: "Que tipo de Markdown ele gera?"
    a: "Markdown padrão para títulos e listas, além de tabelas com barras verticais e blocos de código delimitados. Esses recursos são amplamente compatíveis com apps de notas, wikis e ferramentas de documentação que usam Markdown."
  - q: "Negrito, itálico e links são mantidos?"
    a: "Não. O resultado marca a estrutura, ou seja, títulos, listas, tabelas e código, e não o estilo do texto. Acrescente ênfase e destinos de links à mão, se precisar."
  - q: "Posso converter um slide ou a foto de um quadro branco?"
    a: "Slides com texto impresso nítido funcionam bem. O que está escrito no quadro branco é letra à mão, que é mais difícil de ler, principalmente quando é cursiva; letras de forma bem traçadas dão o melhor resultado."
  - q: "Meu texto é enviado para algum lugar?"
    a: "Não. A imagem é lida no seu dispositivo, no navegador, e não é enviada. Onde você vai colar o Markdown depois, como numa ferramenta de IA online, fica a seu critério."
  - q: "Ele converte equações?"
    a: "Equações impressas simples podem ser lidas no modo Matemática, que gera LaTeX. Frações, matrizes e diagramações complexas costumam precisar de ajustes à mão."
related:
  - image-to-word
  - code-screenshot-to-text
  - image-to-excel
  - screenshot-to-text
---

## Por que Markdown em vez de texto simples

O texto simples perde a estrutura. Um título fica igual a qualquer outra linha, uma lista vira um monte de frases soltas e uma tabela se transforma num amontoado de palavras na ordem errada. O Markdown mantém essa estrutura usando caracteres comuns, por isso ela sobrevive a ser colada em quase qualquer lugar.

O mesmo resultado funciona em apps de notas que guardam Markdown, sites de documentação, wikis, arquivos README e conversas com assistentes de IA. Ele continua legível como texto puro, é fácil de editar à mão e as alterações aparecem com clareza no controle de versão.

## Como cada parte da página é escrita

Cada tipo de conteúdo tem sua própria forma em Markdown:

| Na imagem | No Markdown |
| --- | --- |
| Um título | Uma linha começando com um ou mais `#` |
| Marcadores | Linhas começando com `- ` |
| Uma lista numerada | Linhas começando com `1.`, `2.` e assim por diante |
| Uma tabela, lida no modo Tabela | Uma tabela Markdown com barras verticais entre as colunas |
| Código, lido no modo Código | Um bloco de código delimitado |

O print de um checklist curto no modo Documento pode sair assim:

```markdown
# Release checklist

Run these before tagging a new version.

- Freeze the main branch
- Update the changelog

1. Build the package
2. Run the full test suite
```

As linhas quebradas dentro de um parágrafo são unidas, e as palavras separadas por hífen no fim da linha são juntadas de novo, então o parágrafo vira uma única linha de Markdown em vez de vários pedaços quebrados.

## Páginas que misturam texto, tabelas e código

Cada imagem é lida em um modo por vez, escolhido separadamente para cada imagem. Isso faz diferença em prints que trazem um parágrafo ao lado de uma tabela, ou numa página de tutorial com um exemplo de código no meio. O modo Documento foi feito para texto corrido, então uma tabela lida desse jeito geralmente sai como linhas de texto em vez de uma grade.

A solução é dividir a página. Tire um print do texto e outro da tabela ou do código, coloque cada um no modo certo e arraste-os para a ordem desejada. A visualização Documento inteiro então junta todas as páginas num único arquivo Markdown, ou num ZIP com um arquivo por página.

Para imagens cheias de tabelas, [como extrair tabelas de imagens](/pt/guides/how-to-extract-tables-from-images) explica como acertar linhas e colunas. Para exemplos de código, [print de código para texto](/pt/code-screenshot-to-text) mostra o que vale conferir duas vezes, como colchetes e caracteres parecidos.

## Como usar o Markdown num prompt de IA

Colar o texto numa conversa com um assistente de IA, em vez da imagem, dá a você controle sobre o que ele vê. Você pode ler o texto antes, corrigir palavras lidas errado, cortar qualquer coisa privada ou irrelevante e manter títulos, listas e tabelas bem marcados.

Uma tabela colada em Markdown mantém as linhas e colunas como texto, então você pode se referir a elas diretamente na pergunta, por exemplo “compare a coluna de março com a de abril”. Uma lista numerada mantém os números, então “reescreva o passo 3” significa a mesma coisa para você e para o assistente.

## Como deixar o resultado em ordem antes de colar

Algumas verificações rápidas deixam o Markdown mais limpo:

- **Níveis de título.** Veja se o título da página e os títulos das seções saíram nos níveis que você quer. Acrescentar ou tirar um `#` é rápido.
- **Listas numeradas em vários prints.** Uma lista que continua de um print para o outro pode recomeçar no 1, então confira os números depois de juntar as páginas.
- **Quebras de linha que você quer manter.** Para um poema, um endereço ou a letra de uma música, desative a união de linhas quebradas para que cada linha fique como estava.
- **Erros repetidos.** Se uma palavra foi lida errado do mesmo jeito em todo o texto, localizar e substituir resolve tudo de uma vez.

Se preferir terminar num processador de texto, [imagem para Word](/pt/image-to-word) entrega um .docx com os mesmos títulos e listas.
