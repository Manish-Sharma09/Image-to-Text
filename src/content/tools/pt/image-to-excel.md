---
title: "Imagem para Excel: converter foto de tabela em planilha"
description: "Converta imagem em Excel: transforme o print ou a foto de uma tabela em planilha editável. Corrija células, cole no Excel ou Google Sheets ou baixe XLSX e CSV."
h1: "Imagem para Excel"
intro: "Solte o print ou a foto de uma tabela e receba linhas e colunas que você pode editar, colar no Excel ou no Google Sheets, ou baixar como XLSX ou CSV. A imagem é lida no seu dispositivo e nunca é enviada."
navLabel: "Imagem para Excel"
order: 6
preset:
  mode: table
  export: xlsx
  sample: table
steps:
  - "Adicione a imagem da tabela e recorte para que sobrem só a tabela e a linha de cabeçalho."
  - "Compare a grade editável com a imagem, corrigindo células e adicionando ou removendo linhas e colunas quando necessário."
  - "Copie a tabela e cole no Excel ou no Google Sheets, onde ela entra já dividida em linhas e colunas."
  - "Ou baixe a tabela como arquivo Excel (.xlsx) ou CSV."
faq:
  - q: "Ela cola no Excel ou no Google Sheets como uma tabela de verdade?"
    a: "Sim. Ao copiar da grade, cada valor vai para sua própria célula quando você cola no Excel ou no Google Sheets, em vez de virar um bloco longo de texto."
  - q: "Posso corrigir erros antes de exportar?"
    a: "Sim. Você pode editar qualquer célula e adicionar ou remover linhas e colunas na grade, e depois copiar ou baixar a tabela corrigida."
  - q: "Funciona com tabelas sem bordas?"
    a: "Sim. As colunas são identificadas pelos espaços entre elas, então as bordas não são necessárias. Colunas muito próximas umas das outras são as que mais podem precisar ser separadas à mão."
  - q: "O que acontece com células mescladas?"
    a: "O valor de uma célula mesclada, como um título que ocupa várias colunas, aparece numa única célula. Mescle as células de novo na sua planilha se precisar do mesmo layout."
  - q: "As fórmulas são mantidas?"
    a: "Não. Uma imagem só mostra o resultado das fórmulas, então os totais aparecem como números simples. Adicione as fórmulas de novo na sua planilha se precisar delas."
  - q: "Posso extrair uma tabela de um PDF?"
    a: "Sim. Adicione o PDF, abra a página com a tabela e mude para o modo Tabela. Páginas com texto de verdade são aproveitadas diretamente, e as páginas digitalizadas são lidas com OCR."
  - q: "Meus dados são enviados para algum servidor?"
    a: "Não. A tabela é lida no navegador, no seu dispositivo, o que faz diferença para extratos, listas de preços e outros números que você prefere manter só com você."
related:
  - pdf-to-text
  - screenshot-to-text
  - invoice-ocr
  - image-to-json
---

Redigitar uma tabela é lento, e é fácil errar um dígito. O Imagem para Excel lê a tabela a partir de uma imagem e entrega uma grade editável de linhas e colunas, pronta para colar numa planilha ou baixar como arquivo.

## Tabelas que vale a pena converter

- **Tabelas em PDFs e relatórios** que não copiam direito e viram uma única coluna embaralhada quando você tenta
- **Dashboards e páginas da web** que mostram dados, mas não oferecem exportação
- **Listas de preços, tabelas de tarifas, horários e cronogramas**, impressos ou na tela
- **Classificações, resultados e tabelas de campeonatos**
- **Tabelas impressas** em livros, apostilas e manuais, fotografadas com o celular
- **Extratos bancários e listas de transações** que você precisa numa planilha, sem enviá-los para nenhum site

## Como o modo Tabela encontra linhas e colunas

O modo Tabela alinha as palavras em linhas e encontra as colunas pelo espaço vazio que corre entre elas de cima a baixo. Isso significa que uma tabela não precisa de bordas nem de linhas de grade para ser lida corretamente: um bom alinhamento importa muito mais do que as linhas.

Quando você adiciona uma imagem, o Image to Text App muitas vezes reconhece a tabela sozinho e mostra uma etiqueta como “Parece uma tabela”. Nesta página o modo Tabela já vem selecionado. Se o que você adicionou for texto comum, troque de modo sem precisar adicionar a imagem de novo.

## Como preparar a imagem

- **Recorte só a tabela.** Títulos, observações e notas de rodapé acima ou abaixo da tabela podem confundir a divisão das colunas. Mantenha a linha de cabeçalho e deixe o resto de fora.
- **Endireite fotos de tabelas impressas.** As colunas precisam correr retas pela página. Para uma tabela fotografada em ângulo, use a correção pelos quatro cantos para que as linhas fiquem niveladas e as colunas, retas. A Melhoria automática corrige sozinha uma leve inclinação.
- **Divida tabelas muito grandes.** Se a tabela for larga ou comprida e o texto for minúsculo, tire dois ou três prints de partes dela num tamanho legível, converta cada um e empilhe os resultados na planilha.

## Tabelas que pedem cuidado extra

**Células mescladas.** Um título que ocupa várias colunas, ou um rótulo que cobre várias linhas, aparece numa única célula, geralmente na coluna onde começa. Depois de colar, mescle as células de novo no Excel ou no Sheets se precisar do layout original.

**Tabelas sem bordas com espaços estreitos.** Quando duas colunas ficam muito próximas, elas podem ser lidas como uma só. Adicione uma coluna na grade e mova os valores para ela, ou separe as colunas na planilha depois.

**Texto que quebra dentro da célula.** Uma descrição longa em duas linhas pode parecer duas linhas da tabela. O Image to Text App tenta juntar o texto quebrado de volta na sua linha. Se uma linha ainda parecer dividida, suba o texto e apague a linha extra.

**Notas fiscais e recibos.** Se a sua imagem for uma nota fiscal e não uma tabela simples, o modo Recibo ou nota fiscal costuma ser a melhor escolha. Ele lê o nome do estabelecimento, as datas e os totais, além dos itens. Veja [OCR de notas fiscais](/pt/invoice-ocr).

## Confira os números antes de confiar neles

Os valores sobre os quais o motor ficou em dúvida aparecem sublinhados. Em tabelas, os suspeitos de sempre são 0 e O, 1 e l, 5 e S, e 8 e B, além de pontos e vírgulas decimais, que são minúsculos e se perdem fácil numa imagem borrada. Sinais de menos, e números negativos escritos entre parênteses, também merecem uma segunda olhada.

Uma conferência rápida depois de colar: some uma coluna na planilha e compare com a linha de total do original. Se bater, é muito provável que a coluna esteja certa.

## XLSX, CSV ou copiar e colar

- **Copiar e colar** é o mais rápido quando você está acrescentando a tabela a uma planilha que já está aberta.
- **Excel (.xlsx)** é o padrão aqui, um arquivo que abre direto no Excel.
- **CSV** é um formato simples que quase tudo consegue importar, incluindo o Google Sheets e bancos de dados.

Uma coisa que vale saber sobre o CSV: quando o Excel abre um arquivo CSV com um clique duplo, ele tenta adivinhar o tipo de cada coluna. Ele tira os zeros à esquerda de coisas como CEPs e números de conta e pode transformar alguns valores em datas. Use a importação De Texto/CSV do Excel para definir essas colunas como texto, ou use o download em XLSX.

A mesma tabela também pode ser baixada em JSON para usar em código; veja [imagem para JSON](/pt/image-to-json). Para se aprofundar em tabelas difíceis, leia [como extrair tabelas de imagens](/pt/guides/how-to-extract-tables-from-images).
