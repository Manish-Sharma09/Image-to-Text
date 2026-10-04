---
title: "Como extrair texto de recibos para despesas e registros"
description: "Fotografe recibos térmicos antes que apaguem, extraia totais, datas e itens com OCR, confira os campos importantes e guarde registros confiáveis."
summary: "Por que recibos são difíceis de ler, como fotografá-los antes que apaguem, quais campos conferir duas vezes e como encaixar o OCR de recibos na sua rotina de despesas."
published: 2026-10-03
tool: receipt-ocr
order: 7
---

Recibos parecem simples, mas estão entre as coisas mais chatas de passar por um OCR. A impressão é pequena e muitas vezes fraca, o layout mistura colunas e rótulos, e o único número que interessa fica no meio de meia dúzia de outros. Com bons hábitos na hora de fotografar e uma conferência rápida dos campos principais, dá para transformar uma pilha de recibos e cupons fiscais em dados de despesas organizados.

## Por que recibos são difíceis de ler

### O papel térmico apaga

A maioria dos recibos de lojas e restaurantes é impressa em papel térmico, que escurece onde a cabeça de impressão aquecida encosta. Essa mesma química deixa o papel frágil. Calor, sol, atrito e contato com alguns plásticos e óleos fazem a impressão apagar ou escurecer. Um recibo esquecido na carteira ou num carro quente pode ficar difícil de ler em poucos meses, e alguns apagam bastante antes disso.

### O layout é apertado

Os nomes dos itens ficam à esquerda e os preços à direita, ligados apenas por espaços. Os nomes são abreviados para caber (“BAN PRATA ORG 1KG”). E a parte de baixo do recibo traz vários valores parecidos: subtotal, impostos, total, valor pago, troco e, às vezes, uma linha de gorjeta. Ler as palavras é só metade do trabalho; saber qual número é o total é a outra metade.

### O papel não fica reto

Recibos enrolam, dobram e amassam, e cada dobra projeta uma sombra sobre uma linha da impressão.

## Fotografe os recibos cedo e bem esticados

- **Fotografe no mesmo dia.** A melhor hora para fotografar um recibo é antes de ele ir para o bolso. Impressão apagada é o único problema que a edição de imagem só consegue resolver em parte.
- **Estique antes.** Deixe um recibo enrolado embaixo de um livro por um minuto ou prenda as pontas com dois objetos pequenos. Evite segurá-lo com os dedos, que fazem sombra e cobrem as bordas.
- **Use um fundo escuro.** Um recibo branco sobre uma mesa escura tem bordas bem definidas, o que facilita recortar e endireitar e evita que o fundo se misture ao texto.
- **Divida recibos compridos.** Um cupom de supermercado comprido, encolhido para caber numa só foto, fica com o texto minúsculo. Tire duas ou três fotos que se sobreponham ou, se você só precisa dos totais, fotografe de perto apenas a parte de baixo.
- **Recupere a impressão apagada com contraste.** Aumentar o contraste ou mudar para preto e branco pode trazer de volta uma impressão cinza e fraca. Compare com o original para garantir que números fracos não sumiram de vez.

Conselhos gerais sobre iluminação, foco e ângulo estão em [como obter resultados de OCR precisos](/pt/guides/how-to-get-accurate-ocr-results).

## O que o OCR de recibos extrai

Um leitor de recibos vai além do texto simples e tenta identificar cada informação. O modo Recibo ou nota fiscal do Image to Text App, usado pela página de [OCR de recibos](/pt/receipt-ocr), procura o nome do estabelecimento, endereço, telefone, e-mail, site, número do recibo, data, hora, identificação fiscal, subtotal, desconto, impostos, gorjeta, total, valor pago e troco, além dos itens com quantidade, descrição, preço unitário e valor. Todos os campos e itens podem ser editados antes de você copiar ou baixar.

## Os campos que você sempre deve conferir

Por melhor que seja a extração, alguns campos merecem uma segunda olhada sempre.

- **Total.** Confirme se foi pego o total, e não o subtotal, o valor pago ou o troco. A conferência mais rápida é fazer a conta: subtotal, menos o desconto, mais impostos e gorjeta, deve dar o total.
- **Data.** 03/04/2026 é 3 de abril no Brasil e na maior parte do mundo, mas 4 de março nos Estados Unidos. Recibos de viagens ao exterior são os culpados de sempre. Anos com dois dígitos também podem ser lidos errado.
- **Impostos.** O recibo pode mostrar mais de uma linha de imposto, ou a alíquota ao lado do valor do imposto. Verifique se foi o valor, e não a alíquota, que foi parar no campo de imposto.
- **Nome do estabelecimento.** Muitos recibos imprimem o nome da loja como logotipo, que é uma imagem e não texto. O OCR pode pegar a razão social mais abaixo, ou nada. Digite o nome se precisar.
- **Moeda.** Os símbolos são pequenos e às vezes são lidos errado: € pode sair como C ou E. Em recibos do exterior, anote a moeda de forma explícita.
- **Vírgulas e pontos decimais.** Uma vírgula fraca pode sumir e transformar 12,50 em 1250. A conferência pela conta, descrita acima, costuma pegar esse erro.
- **Valores escritos à mão.** Comprovantes de cartão em restaurantes muitas vezes têm a gorjeta e o total escritos à mão. Letra à mão é lida com menos confiabilidade que texto impresso, então confira esses valores com os próprios olhos.

## Como encaixar os recibos numa rotina de despesas

Um pouco de organização deixa o OCR de recibos bem mais rápido no fim do mês.

- **Um recibo por imagem.** Vários recibos na mesma foto são lidos como um só, com os campos misturados.
- **Junte os recibos em lotes.** Fotografe os recibos da semana, adicione todos de uma vez e revise tudo de uma sentada. No Image to Text App cada imagem vira uma página própria, então dá para passar por elas uma a uma.
- **Escolha a exportação que combina com o seu sistema.** Uma planilha com uma linha por recibo atende à maioria dos controles pessoais e de pequenas empresas; baixe em CSV ou Excel. Se você precisa dividir um recibo entre itens pessoais e da empresa, guarde também os itens. JSON é ideal para desenvolvedores que vão importar os dados em outro aplicativo.
- **Dê nomes padronizados aos arquivos.** Algo como `2026-05-12 Loja de ferragens 48,20.jpg` deixa o recibo fácil de achar de novo sem precisar abri-lo.
- **Compare com o extrato.** Conferir os recibos com a fatura do cartão ou o extrato do banco pega tanto erros de OCR quanto recibos que faltam.

Notas fiscais seguem uma rotina parecida, com alguns campos a mais, como número da nota, data de vencimento e dados do destinatário; a página de [OCR de notas fiscais](/pt/invoice-ocr) está configurada para elas. Para uma planilha contínua com muitos recibos, [imagem para Excel](/pt/image-to-excel) cuida da parte das tabelas.

## Guarde a imagem original

O texto extraído é uma conveniência, não o registro. Guarde a foto ou a digitalização junto com os dados, porque é a imagem que comprova que o recibo existiu e o que ele dizia.

As regras sobre a aceitação de cópias digitais, e sobre por quanto tempo os registros precisam ser guardados, variam de país para país e, às vezes, conforme o tipo de despesa. Muitas autoridades fiscais aceitam cópias eletrônicas legíveis, mas algumas situações exigem o papel original. Consulte as orientações da autoridade fiscal do seu país ou fale com um contador; este guia não é orientação fiscal nem jurídica. Empresas também costumam ter regras próprias, como exigir que a imagem seja anexada a cada pedido de reembolso.

Se você precisa guardar os recibos em papel, mantenha-os esticados num envelope, longe da luz e do calor. Não plastifique: o calor da plastificadora pode escurecer o papel térmico e deixar a impressão ilegível.

## Recibos e privacidade

Recibos trazem mais informações pessoais do que parece: os últimos dígitos do cartão, às vezes o seu nome, um endereço de entrega, um número de programa de fidelidade. Se isso importa para você, escolha uma ferramenta que leia a imagem no seu próprio dispositivo e recorte ou cubra esses dados antes de compartilhar a imagem com alguém. [OCR online é privado?](/pt/guides/is-online-ocr-private) explica o que observar.
