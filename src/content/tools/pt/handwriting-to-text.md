---
title: "Letra à mão para texto: converter manuscrito em texto digitado"
description: "Transforme escrita à mão em texto editável no navegador. Modo Letra à mão, palavras para conferir e dicas sinceras sobre o que é bem lido e o que não é."
h1: "Letra à mão para texto"
intro: "Fotografe ou digitalize suas anotações à mão e receba um texto digitado que você pode editar. Funciona melhor com letra de forma caprichada; a cursiva emendada é mais difícil, e as palavras de que o Image to Text App não tem certeza ficam sublinhadas."
navLabel: "Letra à mão para texto"
order: 5
preset:
  mode: handwriting
  export: docx
  sample: handwriting
steps:
  - "Fotografe a página com luz boa e uniforme, ou solte uma digitalização, com uma página por imagem."
  - "Mantenha o modo Letra à mão selecionado e recorte ou endireite a página para que sobre só a escrita."
  - "Use o botão de pular para ir de uma palavra sublinhada à seguinte, comparando cada uma com a imagem e corrigindo."
  - "Copie o texto corrigido ou baixe como documento Word."
faq:
  - q: "Ele lê letra cursiva?"
    a: "Às vezes, mas a cursiva emendada é o tipo de escrita mais difícil de ler, então conte com muitas palavras para conferir. Letra de forma caprichada dá resultados bem melhores."
  - q: "O que o modo Letra à mão muda?"
    a: "Ele prepara a imagem de um jeito ajustado para anotações escritas à mão antes da leitura. Você pode trocar de modo a qualquer momento sem adicionar a imagem de novo."
  - q: "Como conseguir resultados melhores com minhas anotações?"
    a: "Escreva com caneta escura em papel liso ou com pauta clara, fotografe a página plana e de frente, com luz uniforme, e recorte só a escrita. Letras separadas e espaços claros entre as palavras são o que mais ajuda."
  - q: "Ele lê contas de matemática escritas à mão?"
    a: "O modo Matemática foi feito para equações impressas simples, então equações escritas à mão geralmente precisam ser digitadas manualmente."
  - q: "Minhas anotações são enviadas para algum servidor?"
    a: "Não. Suas anotações são lidas no navegador, no seu dispositivo. O Histórico vem desligado e, quando você o ativa, ele fica só neste navegador."
  - q: "Posso converter um caderno inteiro?"
    a: "Sim. Adicione até 50 imagens a um espaço de trabalho, uma por página. Arraste para colocar na ordem e use a visualização Documento inteiro para exportar tudo num único arquivo."
  - q: "Funciona com letra à mão em outros idiomas?"
    a: "Você pode escolher o idioma das suas anotações entre 47 idiomas, ou vários ao mesmo tempo. Seja qual for o idioma, o resultado depende muito de quão caprichada e separada é a escrita."
related:
  - photo-to-text
  - image-to-word
  - pdf-to-text
---

A letra à mão é o que há de mais difícil para transformar em texto, e é melhor dizer isso logo de cara. Letras impressas são sempre iguais; as escritas à mão, não, e a cursiva emendada liga uma letra à outra, sem uma borda clara entre elas. O motor de código aberto Tesseract, que o Image to Text App usa, foi feito principalmente para texto impresso. O modo Letra à mão acrescenta um pré-processamento ajustado para anotações manuscritas, o que ajuda, mas não transforma uma letra bagunçada em letra caprichada.

Na prática, isso quer dizer o seguinte: letra de forma caprichada costuma virar um bom primeiro rascunho, que precisa de algumas correções. Escrita rápida ou emendada pode exigir tantas correções que digitar você mesmo sai mais rápido. A ferramenta mostra em qual dessas situações você está.

## Quando funciona bem e quando não funciona

Transformar letra à mão em texto funciona melhor com:

- Anotações de aula e palestra escritas em letra de forma
- Listas de tarefas, listas de compras e anotações de reunião
- Fichas de receita e etiquetas em pastas, caixas e potes
- Formulários preenchidos em letra de forma maiúscula
- Post-its com poucas palavras bem claras

Tem dificuldade com:

- Cursiva corrida, como em cartas antigas, diários e cartões
- Anotações apressadas, com as letras espremidas
- Assinaturas, que não foram feitas para ser lidas como palavras
- Páginas que misturam escrita com setas, diagramas e rabiscos
- Equações, já que o modo Matemática foi pensado para equações impressas simples

## Como conseguir um resultado melhor

A maior parte do que ajuda acontece antes de você tirar a foto. Se você está escrevendo anotações que pretende converter, use letra de forma em vez de emendar as letras, deixe espaços claros entre as palavras e deixe espaço entre as linhas.

- **Use caneta escura.** Tinta preta ou azul-escura em papel branco dá o maior contraste. Lápis e tinta clara ficam apagados; aumente o Contraste ou experimente Preto e branco se os traços parecerem desbotados.
- **Prefira papel liso ou com pauta clara.** Papel quadriculado e linhas coloridas fortes podem se misturar com as letras.
- **Ilumine a página por igual.** Evite que a sua própria sombra caia sobre a página. A Melhoria automática uniformiza a iluminação e as sombras, mas funciona melhor quando a foto já está razoavelmente iluminada.
- **Fotografe a página plana e de frente.** Se o caderno estava inclinado, endireite pelos quatro cantos antes da leitura. A página [foto para texto](/pt/photo-to-text) tem mais dicas para fotografar páginas.
- **Recorte um bloco de escrita por vez.** Anotações na margem, escritas de lado ou espremidas entre as linhas, são lidas melhor num recorte separado.

## Revisando o que foi lido

Toda palavra sobre a qual o motor ficou em dúvida aparece sublinhada, e um botão pula de uma para a outra, então você não precisa ler a página inteira caçando erros. Clique em qualquer linha do texto e o lugar dela se destaca na sua foto, o que facilita comparar uma palavra duvidosa com o que você escreveu.

Se a mesma palavra for lida errado do mesmo jeito várias vezes, como um nome ou um termo da matéria que você usa muito, Localizar e substituir corrige todas de uma vez. O nível de confiança geral (alto, razoável ou baixo) é uma indicação rápida. Se ele estiver baixo e a maioria das palavras estiver sublinhada, redigitar a página pode ser mais rápido do que corrigir, e essa é uma decisão perfeitamente razoável.

As opções de limpeza também ajudam com anotações. Juntar linhas transforma linhas que vão até a borda da página em parágrafos de verdade, e a opção de hifenização junta de novo as palavras que você separou no fim de uma linha.

## Para onde o texto vai depois

Nesta página, o resultado é baixado como documento Word por padrão, pronto para você organizar e complementar. Você também pode copiar o texto direto para o Google Docs, o Word ou um aplicativo de notas, ou baixar como texto simples, Markdown ou PDF. Veja [imagem para Word](/pt/image-to-word) para saber mais sobre documentos editáveis.

Para um caderno ou uma pilha de páginas, fotografe cada página, arraste as imagens para colocá-las na ordem e use a visualização Documento inteiro para pesquisar em todas elas e exportar um único arquivo.

Anotações costumam ser pessoais. O Image to Text App lê tudo no seu navegador, no seu dispositivo, e nada é enviado. Para um passo a passo mais completo, inclusive como planejar anotações que você pretende digitalizar, leia [como converter anotações escritas à mão em texto](/pt/guides/how-to-convert-handwritten-notes-to-text).
