---
title: "Como extrair tabela de imagem para o Excel ou Google Sheets"
description: "Transforme a foto ou o print de uma tabela em células de planilha: como funciona o OCR de tabelas, recorte, células mescladas, conferência e CSV ou XLSX."
summary: "Como o reconhecimento de tabelas reconstrói linhas e colunas a partir de uma imagem, como ajudar nesse processo e como conferir os números antes de levá-los ao Excel ou Google Sheets."
published: 2026-10-03
tool: image-to-excel
order: 5
---

Passe um OCR comum na foto de uma tabela e você recebe linhas de texto, com as colunas separadas por alguns espaços, se tiver sorte. Cole isso no Excel e tudo vai parar na coluna A. Para ter células de verdade, a ferramenta precisa reconstruir a estrutura da tabela, e não apenas ler as palavras.

Este guia explica como isso funciona, o que atrapalha o processo e como conferir o resultado antes de confiar nele.

## Como funciona o reconhecimento de tabelas

Um motor de OCR informa cada palavra junto com a posição dela na imagem. O reconhecimento de tabelas usa essas posições para descobrir onde estão as linhas e as colunas.

- **As linhas** vêm da sobreposição vertical. Palavras cujas bordas de cima e de baixo se alinham pertencem à mesma linha. Uma boa ferramenta tolera uma leve inclinação, então uma linha que desce um pouco ao longo da página continua inteira.
- **As colunas** vêm dos espaços vazios. A ferramenta procura faixas verticais de espaço em branco que atravessam a maioria das linhas. Cada faixa entre dois desses corredores vira uma coluna.
- **Linhas que ocupam a largura da tabela**, como um título ou uma observação logo abaixo dela, ficam de fora na hora de decidir onde estão as colunas, para não unirem duas colunas.
- **A linha de cabeçalho** geralmente é reconhecível como palavras posicionadas acima de colunas de números.

O principal é que o alinhamento importa mais do que as bordas. Uma tabela bem alinhada, sem nenhuma linha de grade, pode sair perfeita, enquanto uma tabela apertada, com grade completa, ainda pode dar errado se as colunas estiverem muito próximas.

## Recorte só a tabela

Tudo o que está na imagem entra na detecção das colunas, então a coisa mais útil que você pode fazer é recortar bem justo em volta da tabela.

- **Tire o que está em volta.** Parágrafos acima, notas de rodapé abaixo, números de página, barras laterais e uma coluna de texto vizinha acrescentam palavras em lugares que confundem a contagem de colunas.
- **Uma tabela por imagem.** Se uma página tem duas tabelas, recorte e leia cada uma separadamente.
- **Divida tabelas muito largas.** Se você precisar diminuir uma tabela larga para que ela caiba numa única foto, o texto pode ficar pequeno demais para ser lido. Fotografe em duas metades e mantenha uma coluna de identificação, como nomes ou datas, nas duas, para conseguir alinhá-las de novo na planilha.
- **Tabelas longas, em várias páginas.** Leia cada página, cole os resultados um embaixo do outro e apague as linhas de cabeçalho repetidas.

Se a tabela estiver numa foto de celular tirada em ângulo, endireite-a primeiro. Colunas inclinadas ou que convergem são muito mais difíceis de encontrar do que colunas que descem retas pela página.

## Tabelas sem bordas

Muitos relatórios e extratos não usam nenhuma linha de grade. Eles funcionam quando há um espaço claro entre as colunas. Os problemas aparecem quando não há:

- Uma coluna de texto alinhada à esquerda ao lado de uma coluna de números alinhada à direita pode deixar só um fiapo de espaço entre elas, e as duas acabam lidas como uma só.
- Pontilhados de preenchimento, como o “........” de um sumário, são lidos como fileiras de pontos.
- Linhas com sombreamento alternado reduzem o contraste em linha sim, linha não. Converter para tons de cinza e aumentar o contraste ajuda.

Se duas colunas se juntarem, normalmente dá para separá-las no resultado em vez de começar de novo. Na grade de tabela do Image to Text App, você pode editar células e adicionar ou remover linhas e colunas antes de copiar.

## Células mescladas e com várias linhas

Tabelas da vida real raramente têm uma grade perfeita, e algumas estruturas precisam ser corrigidas à mão.

- **Cabeçalhos que ocupam várias colunas.** Um cabeçalho como “2026” posicionado acima de quatro colunas trimestrais acaba numa única célula. Decida se vai repeti-lo em cada coluna ou transformá-lo num cabeçalho de duas linhas na planilha.
- **Texto com quebra de linha.** Quando o texto de uma célula continua numa segunda linha, ele pode sair como uma linha extra com a maioria das células vazias. Suba o texto para a linha de cima e apague a linha extra.
- **Células vazias.** Células em branco são o mais difícil para a detecção baseada em posição, porque não há palavra para medir. Confira as linhas com lacunas para ter certeza de que os valores seguintes não foram deslocados uma coluna para a esquerda.
- **Cabeçalhos com texto girado** e **tabelas dentro de tabelas** geralmente precisam ser refeitos à mão.

## Confira os números

Uma tabela costuma estar cheia de valores que alguém vai somar ou usar para tomar decisões, então vale gastar alguns minutos conferindo.

- **Use os totais.** Se a tabela tem uma linha de total, some a coluna na planilha e compare. Uma diferença indica que você precisa olhar com mais atenção, e isso é muito mais rápido do que conferir célula por célula.
- **Conte as linhas.** Verifique se o resultado tem o mesmo número de linhas do original.
- **Procure dígitos parecidos.** 0 e O, 1, l e 7, 5 e S, 8 e B. Uma letra numa coluna de números é fácil de pegar, porque a planilha vai tratar aquela célula como texto.
- **Fique de olho nas vírgulas decimais.** Uma vírgula fraca pode sumir, transformando 12,50 em 1250. A vírgula e o ponto também podem trocar de lugar.
- **Confira os números negativos.** O sinal de menos é pequeno e se perde fácil. Números entre parênteses, como (1.200), são lidos pelo Excel como negativos, que geralmente é o que o original queria dizer.
- **Atenção ao formato dos números.** Em muitos países, 1.234,56 significa o mesmo que 1,234.56. Se a sua planilha estiver configurada para uma região diferente da do documento, os números podem virar texto ou um valor errado.

## Como levar a tabela para o Excel ou Google Sheets

O caminho mais simples é copiar e colar. Tabelas copiadas como dados formatados, como a cópia da visualização de tabela do Image to Text App, são coladas no Excel e no Google Sheets em células separadas. Clique na célula do canto superior esquerdo onde você quer a tabela e cole.

Antes de colar, proteja as colunas que as planilhas adoram “corrigir”:

- **Zeros à esquerda** em CEPs, telefones e números de conta são descartados quando o valor é tratado como número.
- **Números longos** viram notação científica, e o Excel guarda só 15 dígitos significativos, então um código de 16 dígitos é alterado sem aviso.
- **Códigos curtos**, como 3-4 ou 1/2, podem ser convertidos em datas.

Formate essas colunas como Texto antes de colar, ou cole os valores e corrija o formato depois. No Google Sheets, Ctrl+Shift+V (⌘+Shift+V no Mac) cola os valores sem formatação.

## CSV ou XLSX?

Se você baixar um arquivo em vez de copiar, o formato faz diferença.

**CSV** é texto simples: uma linha da tabela por linha do arquivo, com vírgulas entre as células. Quase todo programa consegue importá-lo, o que faz dele a escolha certa para alimentar um software de contabilidade, um banco de dados ou um script. Mas ele não guarda formatação e tem uma só planilha, e o programa que o abre tenta adivinhar o que é cada valor, e é aí que os zeros à esquerda e as datas dão problema. Caracteres fora do inglês básico, como os acentos do português, também podem sair embaralhados se o programa presumir a codificação de texto errada. No Excel, importar por Dados > De Texto/CSV permite escolher UTF-8 e definir o tipo de cada coluna, em vez de deixar o Excel adivinhar.

**XLSX** é o formato do próprio Excel e abre direto no Excel, no Google Sheets e em outros aplicativos de planilha. Use quando pessoas forem abrir a tabela e trabalhar nela.

Uma regra simples: XLSX para pessoas, CSV para outros programas. A ferramenta [imagem para Excel](/pt/image-to-excel) oferece os dois, além de uma cópia que você cola direto numa planilha.

## Antes de começar, procure a fonte

Se a tabela veio de um relatório em PDF ou de uma página da web, o original pode conter dados de verdade. Tente selecionar o texto no PDF ou veja se o site oferece um download. Se a tabela realmente só existe como imagem, deixe a imagem o mais nítida e reta possível; o guia [como obter resultados de OCR precisos](/pt/guides/how-to-get-accurate-ocr-results) traz os detalhes. E se você tem curiosidade sobre as posições das palavras que tornam tudo isso possível, [como funciona o OCR](/pt/guides/how-ocr-works) explica de onde elas vêm.
