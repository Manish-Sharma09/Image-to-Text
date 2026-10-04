---
title: "Imagem para JSON: extrair texto, tabelas e campos de recibos"
description: "Converta imagem em JSON com o texto reconhecido, as células de tabela ou os campos e itens de recibos de cada página. Útil para scripts, cadastros e dados de teste."
h1: "Converter imagem em JSON"
intro: "Receba o texto de uma imagem como JSON estruturado: uma entrada por página com o modo de leitura e o texto, além das células da tabela ou dos campos e itens do recibo quando a página tiver. Tudo é lido no seu navegador."
navLabel: "Imagem para JSON"
order: 14
preset:
  mode: auto
  export: json
  sample: receipt
  camera: false
steps:
  - "Adicione uma ou mais imagens; “Ler como” começa no Automático e escolhe um modo para cada imagem, que você pode trocar."
  - "Mude uma página para Tabela ou para Recibo ou nota fiscal se quiser células ou campos nomeados no JSON em vez de texto simples."
  - "Corrija no editor qualquer texto, célula ou campo lido errado antes de exportar."
  - "Baixe o JSON de uma única página, ou a partir da visualização Documento inteiro para ter todas as páginas num só arquivo."
faq:
  - q: "Posso converter muitas imagens em JSON de uma vez?"
    a: "Sim. Um espaço de trabalho comporta até 50 imagens, com até 25 MB por arquivo. Baixe a partir da visualização Documento inteiro para ter um único arquivo JSON com todas as páginas, ou um ZIP com arquivos separados."
  - q: "Quais campos de recibo podem aparecer no JSON?"
    a: "Nome do estabelecimento, endereço, telefone, e-mail, site, número do recibo ou da nota fiscal, data, hora, vencimento, destinatário da cobrança, identificação fiscal, subtotal, desconto, imposto, gorjeta, total, valor pago e troco. Os itens têm quantidade, descrição, preço unitário e valor."
  - q: "O texto mantém títulos e listas?"
    a: "Sim. Nas páginas lidas no modo Documento ou Letra à mão, o texto usa um Markdown leve: # para títulos, - para marcadores e 1. para itens numerados. Páginas de código mantêm o código-fonte como foi lido."
  - q: "O modo Automático sempre escolhe a estrutura certa?"
    a: "Nem sempre. Ele mostra o que acha que a imagem é, como uma tabela ou um recibo, e você pode trocar de modo sem adicionar a imagem de novo. O JSON segue o modo que você escolher."
  - q: "Posso receber CSV ou Excel em vez de JSON?"
    a: "Sim. O mesmo resultado pode ser baixado como CSV ou Excel (.xlsx), o que é mais simples se você só precisa de uma tabela ou de um recibo numa planilha."
related:
  - receipt-ocr
  - invoice-ocr
  - image-to-excel
  - image-to-markdown
---

## O que o arquivo JSON contém

O arquivo descreve um documento formado por páginas, uma para cada imagem que você adicionou, na ordem em que você as colocou. Toda página traz as mesmas informações básicas, e os detalhes extras dependem do modo em que ela foi lida:

- **Todas as páginas:** o título (tirado do nome do arquivo), o modo em que foi lida e o texto.
- **Páginas de tabela:** as linhas da tabela, cada uma como uma lista de células, igual à grade que você vê no editor.
- **Páginas de recibo e nota fiscal:** uma lista de campos, cada um com uma chave, um rótulo legível e um valor, além de uma lista de itens.
- **Páginas de código:** o nome da linguagem de programação, como Python ou SQL, quando ela é reconhecida.

A exportação usa o resultado do jeito que você deixou no editor, então as correções que você faz antes de baixar vão para o arquivo.

## Um exemplo resumido de um recibo

Veja como fica uma página lida no modo Recibo, reduzida a alguns campos e itens:

```json
{
  "title": "lunch-receipt",
  "createdAt": "2026-10-03T12:30:00.000Z",
  "pages": [
    {
      "title": "lunch-receipt",
      "mode": "receipt",
      "text": "Corner Cafe\n2 Flat white 3.50 7.00\n...",
      "receipt": {
        "kind": "receipt",
        "currency": "USD",
        "fields": [
          { "key": "merchant", "label": "Business", "value": "Corner Cafe" },
          { "key": "date", "label": "Date", "value": "03/14/2026" },
          { "key": "tax", "label": "Tax", "value": "1.12" },
          { "key": "total", "label": "Total", "value": "15.12" }
        ],
        "items": [
          { "description": "Flat white", "qty": "2", "unitPrice": "3.50", "amount": "7.00" },
          { "description": "Chicken wrap", "qty": "1", "unitPrice": "7.00", "amount": "7.00" }
        ]
      }
    }
  ]
}
```

O jeito mais rápido de ver a estrutura completa é ler o recibo de exemplo desta página e baixar o resultado em JSON.

## Onde imagem para JSON é útil

- **Fluxos de despesas.** Leia um lote de recibos, revise, exporte um único arquivo JSON e deixe seu próprio script levar datas e totais para um livro-caixa ou uma planilha. A [página de OCR de recibos](/pt/receipt-ocr) tem dicas para conseguir fotos de recibos bem limpas.
- **Digitação de dados.** Quando valores de formulários impressos, listas de preços ou notas fiscais precisam entrar em outro sistema, campos nomeados são mais fáceis de mapear do que um bloco de texto.
- **Dados de teste.** Desenvolvedores que criam um recurso que lida com recibos, tabelas ou texto digitalizado podem usar a saída real do OCR, com seus erros realistas, como fixtures para parsers e código de validação.
- **Arquivamento com estrutura.** Guardar o modo e os campos junto com o texto facilita processar digitalizações antigas de novo mais tarde.

Se o que você precisa são linhas e colunas numa planilha, [imagem para Excel](/pt/image-to-excel) leva você até lá com menos passos.

## Como tratar os valores no seu código

Os valores são mantidos como o texto que foi lido, exatamente como estão impressos, em vez de convertidos em números ou datas. Uma data pode vir como `03/14/2026` ou `14.03.2026`, e um valor pode vir como `1,250.00` ou `1.250,00`, dependendo de onde o recibo veio. Converta esses valores com os formatos que você espera e marque o que não se encaixar para uma pessoa conferir.

Também não conte com a presença de todos os campos. Um recibo sem linha de gorjeta não tem gorjeta, e um recibo desbotado pode estar sem data. Usar a `key` em vez da posição na lista mantém seu código funcionando quando faltam campos.

Vale também conferir os totais no código: os valores dos itens devem somar o subtotal, e o subtotal mais o imposto, menos qualquer desconto, deve bater com o total. Uma diferença é um bom sinal de que algo foi lido errado.

## Processado no seu navegador, sem API

A leitura acontece no seu navegador, no seu próprio dispositivo, com o motor de código aberto Tesseract. As imagens não são enviadas, e o arquivo JSON também é criado no seu dispositivo.

Isso também significa que não há API para chamar nem endpoint de servidor para onde enviar imagens. O Imagem para JSON é uma etapa manual: você adiciona as imagens, confere os resultados e baixa o arquivo. Ele serve para tarefas em que uma pessoa revisa os dados de qualquer forma, e não é um jeito de processar imagens automaticamente em segundo plano. Se você tem curiosidade sobre o que acontece entre a imagem e o texto, [como funciona o OCR](/pt/guides/how-ocr-works) explica.
