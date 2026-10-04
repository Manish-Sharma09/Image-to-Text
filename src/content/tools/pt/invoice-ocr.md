---
title: "OCR de nota fiscal: extrair dados de faturas para o Excel"
description: "Extraia número, datas, destinatário, identificação fiscal, totais e itens de notas fiscais e faturas de fornecedores para Excel ou JSON. Nada é enviado."
h1: "OCR de nota fiscal: dados de fornecedores direto para as suas contas"
intro: "Leia uma nota fiscal de fornecedor digitalizada, fotografada ou em PDF e separe número, datas de emissão e vencimento, destinatário, identificação fiscal, totais e itens. Confira tudo ao lado da imagem e baixe uma planilha Excel ou JSON."
navLabel: "OCR de nota fiscal"
order: 8
preset:
  mode: receipt
  export: xlsx
  sample: receipt
  camera: false
steps:
  - "Solte a nota fiscal em PDF, digitalizada ou fotografada; todas as páginas de um PDF com várias páginas são lidas."
  - "Mantenha o seletor Ler como em Recibo ou nota fiscal, para que os dados do cabeçalho, os totais e os itens fiquem em campos separados."
  - "Confira o número da nota, o vencimento e o total com a imagem e corrija o que tiver sido lido errado."
  - "Baixe um arquivo Excel (.xlsx) para o seu controle de contas a pagar, ou JSON se você processa notas fiscais com seus próprios scripts."
faq:
  - q: "Ele lê notas fiscais que chegam como anexo em PDF?"
    a: "Sim. Se a página do PDF já tem texto selecionável, esse texto é aproveitado diretamente, sem OCR, o que evita erros de leitura. PDFs digitalizados são lidos com OCR, página por página."
  - q: "Ele se conecta ao meu software de contabilidade?"
    a: "Não. Não há conexão direta nem sincronização com nenhum sistema contábil. Você baixa um arquivo Excel, CSV ou JSON, ou copia os campos, e leva os dados para o seu software por conta própria."
  - q: "Quantas notas fiscais posso processar de uma vez?"
    a: "Um espaço de trabalho comporta até 50 imagens, com até 25 MB por arquivo, e não há limite diário. Para um lote maior, trabalhe em rodadas."
  - q: "Ele lê notas fiscais preenchidas à mão?"
    a: "Notas impressas são lidas melhor. A letra à mão é mais difícil, principalmente a cursiva, então conte com conferir e redigitar os valores escritos à mão."
  - q: "Funciona no celular?"
    a: "Sim. Abra no navegador do celular e use a câmera para fotografar uma nota fiscal em papel. Deixe-a bem plana e faça a página ocupar todo o enquadramento."
  - q: "O mesmo modo funciona para cupons e recibos de caixa?"
    a: "Sim. O modo Recibo ou nota fiscal também lê recibos e comprovantes de cartão, incluindo gorjeta, valor pago e troco."
related:
  - receipt-ocr
  - image-to-excel
  - pdf-to-text
  - image-to-json
---

## Para as contas que chegam à sua mesa

O contas a pagar começa com digitação. Uma nota fiscal de fornecedor chega como anexo em PDF, digitalizada ou numa folha de papel, e antes de ser aprovada e paga os dados dela precisam ir para uma planilha ou para o sistema contábil. O OCR de nota fiscal lê o documento e organiza esses dados em campos ao lado da imagem, então o seu trabalho passa a ser revisar, e não redigitar.

Esta página é para donos de pequenas empresas, profissionais de contabilidade e qualquer pessoa que processa notas fiscais de fornecedores. Se você está pedindo reembolso dos seus próprios gastos ao empregador, o [OCR de recibos](/pt/receipt-ocr) é mais adequado.

## Os dados da nota que são capturados, e por que eles importam

O modo Recibo ou nota fiscal procura os dados de que um processo de contas a pagar depende:

- **Número da nota.** Sua principal defesa contra pagar a mesma conta duas vezes. Confira com cuidado, porque uma letra O lida como zero, ou o contrário, pode deixar passar uma duplicata.
- **Data de emissão e data de vencimento.** O vencimento define quando a conta é paga. Algumas notas só informam as condições de pagamento, como “30 dias” (ou “Net 30”), sem data de vencimento impressa. Nesse caso, calcule você mesmo a partir da data de emissão.
- **Destinatário.** Confirma que a nota foi emitida para a empresa certa, o que importa se você administra mais de uma empresa ou se um fornecedor ainda tem um endereço antigo cadastrado.
- **Identificação fiscal.** O número fiscal do fornecedor, como VAT, GST ou outro registro, que você pode precisar ter em arquivo para recuperar impostos.
- **Subtotal, desconto, impostos e total**, além de qualquer valor já pago.
- **Dados do fornecedor**: nome da empresa, endereço, telefone, e-mail e site.

Os itens vêm com quantidade, descrição, preço unitário e valor de cada linha. É disso que você precisa para conferir uma conta com o pedido de compra ou dividi-la entre centros de custo. A classificação em si continua sendo decisão sua: o app lê o que está impresso e não atribui contas nem categorias.

## Verificações antes de lançar uma conta

Notas fiscais impressas com nitidez costumam ser bem lidas. Uma nota também é um conjunto de números que precisam bater entre si, o que facilita encontrar erros se você procurar por eles:

- **Cada linha:** quantidade × preço unitário deve ser igual ao valor da linha.
- **As linhas somadas:** os valores das linhas devem somar o subtotal.
- **O bloco final:** subtotal menos desconto mais impostos deve ser igual ao total.
- **Formato dos números:** muitos fornecedores estrangeiros escrevem 1,250.00 onde você escreveria 1.250,00. Verifique se o separador decimal está no lugar certo antes de o valor entrar nas suas contas.
- **Datas:** 04/05 significa 4 de maio em alguns países e 5 de abril em outros. Leia a data no formato do fornecedor, não no seu.

A imagem fica ao lado dos campos, então quando algo não bate você vê o que foi realmente impresso. Também aparece um nível de confiança geral (alto, razoável ou baixo). Uma avaliação alta não é garantia, então confira o total e o vencimento de todas as notas mesmo assim.

## Excel ou JSON para as suas contas

O download em Excel (.xlsx) abre direto numa planilha, o que combina com um controle de contas a pagar ou uma pasta de trabalho que você depois importa no sistema contábil. O JSON serve se você processa notas fiscais com seus próprios scripts; a página [imagem para JSON](/pt/image-to-json) descreve o que o arquivo contém. Você também pode copiar campos individuais e colar onde precisar.

Para o lote do mês, adicione as notas num único espaço de trabalho e revise cada página. Depois exporte pela visualização Documento inteiro, como um único arquivo ou como um ZIP com um arquivo por nota.

Algumas notas trazem os itens numa tabela densa, com colunas extras como código do produto (SKU), alíquota de imposto ou desconto em cada linha. Nesses casos, mude o seletor Ler como para Tabela. Você recebe a grade inteira em linhas e colunas editáveis, sem precisar adicionar a nota de novo, do mesmo jeito que funciona a ferramenta [imagem para Excel](/pt/image-to-excel).

## Notas fiscais de fornecedores no seu próprio dispositivo

Notas fiscais trazem dados bancários, números fiscais, preços e nomes de clientes, então importa onde elas são processadas. O Image to Text App lê tudo no seu navegador, no seu próprio dispositivo, usando o motor de código aberto Tesseract. Os arquivos não são enviados para nenhum servidor.

O Histórico vem desligado. Se você ativá-lo, os resultados ficam só neste navegador, e você pode excluir um ou apagar todos. Um cuidado: “Copiar link” coloca o texto extraído dentro do próprio link, então qualquer pessoa para quem você mandar esse link consegue ler os dados da nota. Para saber o que observar em qualquer serviço de OCR online, veja [o OCR online é privado?](/pt/guides/is-online-ocr-private)
