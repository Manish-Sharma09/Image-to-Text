---
title: "OCR de recibos: extraia dados de recibos para CSV ou JSON"
description: "Transforme a foto de um recibo em nome da loja, data, imposto, total e itens para seu relatório de despesas. Roda no navegador, e o recibo fica no seu aparelho."
h1: "OCR de recibos: transforme fotos de recibos em dados de despesas"
intro: "Fotografe ou solte um recibo e receba o nome do estabelecimento, a data, o imposto, o total e cada item como campos que você pode conferir e editar. Baixe CSV para planilhas ou JSON para suas ferramentas."
navLabel: "OCR de recibos"
order: 7
preset:
  mode: receipt
  export: csv
  sample: receipt
  camera: false
steps:
  - "Tire uma foto do recibo sobre uma superfície escura e plana, ou solte uma digitalização ou um print de um recibo recebido por e-mail."
  - "Deixe “Ler como” em Recibo ou nota fiscal para que o nome do estabelecimento, a data, os totais e os itens fiquem em campos separados."
  - "Compare a data, o imposto e o total com a imagem ao lado e corrija qualquer valor lido errado."
  - "Baixe CSV para uma planilha ou modelo de despesas, ou JSON se você mantém seus próprios registros em código."
faq:
  - q: "Meus recibos são enviados para algum lugar?"
    a: "Não. O recibo é lido no seu dispositivo, no navegador, e a imagem não é enviada a nenhum servidor. O histórico vem desligado e, se você ativá-lo, os resultados ficam guardados só neste navegador."
  - q: "Posso ler os recibos de um mês inteiro de uma vez?"
    a: "Sim. Adicione até 50 imagens a um espaço de trabalho, e cada recibo vira uma página. Você pode revisar e baixar um de cada vez ou todos juntos, como um único arquivo ou um ZIP."
  - q: "Ele separa os recibos em categorias de despesa?"
    a: "Não. Ele lê o que está impresso no recibo e deixa as categorias, os centros de custo e as regras da empresa para você ou para a sua planilha."
  - q: "E um recibo comprido que não cabe numa foto só?"
    a: "Tire duas fotos que se sobreponham em vez de uma em que o texto fica minúsculo. Cada foto vira uma página, então confira se os itens da parte repetida não foram contados duas vezes."
  - q: "Posso usar com recibos recebidos por e-mail e confirmações de pedido?"
    a: "Sim. Um print funciona, e um PDF também. Se o PDF já tiver texto selecionável, esse texto é usado diretamente, sem OCR."
  - q: "Funciona no celular?"
    a: "Sim. Você pode usar a câmera do celular direto do navegador, e as fotos HEIC do iPhone abrem sem precisar converter antes."
  - q: "Preciso de conta ou de aplicativo?"
    a: "Não é preciso criar conta, se cadastrar nem instalar nada, e não há limite diário para a leitura no dispositivo."
related:
  - invoice-ocr
  - image-to-excel
  - image-to-json
  - photo-to-text
---

## De uma carteira cheia de recibos a um relatório de despesas

A maioria dos formulários de despesas pede os mesmos poucos dados de cada recibo: onde você gastou, quando, quanto de imposto estava incluído e o total. Copiar isso à mão de papéis amassados é lento e fácil de errar, principalmente depois de uma viagem que deixou você com uma dúzia de recibos de táxi, hotel e refeições.

O modo Recibo ou nota fiscal lê a foto e organiza o que encontra em campos com nome e em itens, para você conferir cada valor com a imagem em vez de digitar. Ele foi pensado para gastos pessoais: pedir reembolso de despesas de trabalho ao empregador, acompanhar custos como freelancer ou controlar o orçamento da casa. Se você processa contas de fornecedores para uma empresa, a [página de OCR de notas fiscais](/pt/invoice-ocr) trata de datas de vencimento, números de identificação fiscal e exportações para a contabilidade.

## No que um recibo lido se transforma

O recibo sai em duas partes. Os campos guardam o resumo:

- **Estabelecimento**, endereço e contatos do topo do recibo
- **Data** e **hora** da compra, e o número do recibo, se estiver impresso
- **Subtotal**, **desconto**, **imposto**, **gorjeta** e **total**
- **Valor pago** e **troco**, das linhas de cartão ou dinheiro no final

Os itens guardam o que você comprou, cada um com quantidade, descrição, preço unitário e valor. Por exemplo, uma linha impressa como `2 Flat white 3.50 7.00` é separada em quantidade 2, descrição “Flat white”, preço unitário 3.50 e valor 7.00.

Você pode editar cada campo e cada item antes de exportar, então um dígito errado se resolve rapidinho, sem precisar começar de novo.

## Como fotografar papel térmico desbotado

A maioria dos recibos de caixa, como o cupom fiscal, é impressa em papel térmico, que desbota com calor, luz do sol e tempo. Impressão cinza e fraca é o motivo mais comum para o texto de um recibo ser lido errado, então alguns hábitos ajudam:

- **Registre os recibos cedo.** Uma foto tirada no dia da compra é melhor do que uma tirada no fim do trimestre.
- **Use um fundo escuro e liso.** Papel branco sobre uma mesa escura se destaca bem e é fácil de recortar.
- **Desfaça curvas e dobras.** Segure as pontas ou deixe o recibo debaixo de um livro por um minuto. Um vinco atravessando uma linha de números é uma causa comum de dígitos errados.
- **Evite reflexos e sombras.** Luz vinda de lado, e não de cima, impede que o papel reflita um ponto claro e mantém a sombra do celular longe do texto.
- **Preencha o enquadramento.** Chegue perto o bastante para que a letra menor fique fácil de ler na tela.

A Melhoria automática uniformiza a iluminação e reforça o contraste sozinha, e lista cada ajuste que fez. Se o recibo continuar fraco, aumente o contraste ou experimente preto e branco e depois mude para a versão tratada para garantir que dígitos mais claros não sumiram. Um recibo fotografado em ângulo pode ser endireitado com a ferramenta de correção pelos quatro cantos. Há mais conselhos gerais em [como obter resultados de OCR precisos](/pt/guides/how-to-get-accurate-ocr-results).

## Confira estes números antes de enviar

Recibos impressos com nitidez costumam ser bem lidos, mas um dígito errado no total é o erro que mais pesa num pedido de reembolso. Uma conferência rápida com a foto resolve:

1. **O total bate com o papel?** Compare dígito por dígito com o total na imagem.
2. **Os itens somam certo?** Os valores dos itens devem somar o subtotal. Se não somarem, provavelmente algum item está faltando ou foi lido errado.
3. **O separador decimal está lá?** Uma vírgula ou um ponto fraco ou ausente pode transformar 12,50 em 1250.
4. **A gorjeta está certa?** Nos comprovantes de cartão de restaurante, a gorjeta e o total final muitas vezes são escritos à mão, e letra à mão é mais difícil de ler do que impressão. Digite esses valores se parecerem errados.
5. **É a data da compra?** Alguns recibos imprimem uma segunda data, como o prazo para troca. Confira se o campo de data tem o dia em que você pagou.

As palavras sobre as quais o motor ficou em dúvida aparecem sublinhadas, e um nível de confiança geral (alto, razoável ou baixo) é exibido. Trate uma avaliação baixa como motivo para comparar todos os números, não só o total.

## CSV ou JSON para seus registros

O CSV abre em qualquer aplicativo de planilhas, então é o jeito mais fácil de levar os dados do recibo para um modelo de despesas ou uma planilha de orçamento. O Excel (.xlsx) também está disponível se o seu modelo for uma pasta de trabalho. O JSON é ideal para quem tem seus próprios scripts ou ferramentas; a [página de imagem para JSON](/pt/image-to-json) mostra o que vem dentro do arquivo.

Depois de adicionar vários recibos, a visualização Documento inteiro reúne todos na ordem que você escolher e exporta tudo como um único arquivo ou como um ZIP com arquivos separados. Para um passo a passo do início ao fim, veja [como extrair texto de um recibo](/pt/guides/how-to-extract-text-from-a-receipt).
