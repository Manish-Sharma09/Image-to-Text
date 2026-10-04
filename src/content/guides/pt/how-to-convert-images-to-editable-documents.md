---
title: "Converter imagem em documento editável no Word ou Google Docs"
description: "Transforme foto, digitalização ou print em documento editável no Word ou Google Docs: o que a formatação mantém, o que se perde e um roteiro de limpeza."
summary: "O que sobrevive quando uma imagem vira um arquivo do Word ou do Google Docs, o que você vai refazer à mão e uma rotina de limpeza para chegar rápido ao documento final."
published: 2026-10-03
tool: image-to-word
order: 10
---

Transformar a foto de uma página num documento que você pode editar exige duas coisas: OCR para ler as palavras e alguma reconstrução para transformar essas palavras de volta em parágrafos, títulos, listas e tabelas. As palavras geralmente saem bem. A aparência da página, quase nunca.

Saber de antemão o que é mantido e o que você vai ter de refazer ajuda a escolher o caminho mais rápido e a não brigar com a formatação depois.

## O que é mantido

Uma boa conversão preserva a estrutura do documento, as partes que dão sentido a ele:

- **Parágrafos.** Linhas que quebravam na imagem são reunidas em parágrafos contínuos, então o texto se reorganiza quando você edita.
- **Títulos.** Linhas que se destacam como títulos podem virar estilos de título de verdade, e não apenas texto em negrito.
- **Listas.** Itens com marcadores e numerados viram listas de verdade, que se renumeram sozinhas quando você acrescenta um item.
- **Tabelas.** Linhas e colunas podem sair como uma tabela de verdade, e não como texto separado por espaços.
- **Ordem de leitura.** Em páginas de uma coluna, a ordem do texto acompanha a da página.

No Image to Text App, o modo Documento junta os parágrafos e mantém os títulos e as listas com marcadores e numeradas. As tabelas saem quando você usa o modo Tabela para aquela parte da página.

## O que não é mantido

O OCR identifica caracteres, não design. Conte com perder ou refazer o seguinte:

- **Fontes e tamanhos.** O texto assume o estilo padrão do documento em que você cola.
- **Destaques no meio do texto.** Palavras em negrito, itálico ou sublinhadas dentro de uma frase geralmente se perdem.
- **Cores** do texto, dos realces e dos fundos.
- **Layouts com várias colunas, caixas de texto e barras laterais.** Tudo vira um único fluxo de parágrafos, e o texto que estava numa caixa pode parar num lugar estranho.
- **Imagens, logotipos, gráficos e assinaturas.** Não são texto, então são descartados, ou um logotipo vira alguns caracteres soltos.
- **Cabeçalhos, rodapés e números de página.** Aparecem como linhas de texto comuns, repetidas em todas as páginas.
- **Notas de rodapé.** O texto da nota aparece como um parágrafo normal, e os pequenos números de referência viram dígitos comuns grudados no fim de uma palavra.
- **Campos de formulário.** Linhas em branco e caixas de seleção de um formulário não viram campos preenchíveis.
- **Espaçamento, recuo e quebras de linha exatos**, exceto em código, em que um modo próprio para código mantém o recuo.

## Cópia formatada, .docx ou outra opção?

Há várias formas de levar o resultado para um documento, e cada uma combina com uma situação diferente.

A **cópia formatada** é a melhor opção quando o texto vai para um documento que já existe. Copie e cole no Word ou no Google Docs, e títulos, listas e tabelas chegam com formatação de verdade. Como o texto não tem fonte própria, ele assume os estilos do destino; colando num modelo da empresa, os títulos ficam iguais aos desse modelo.

Um **arquivo .docx** é o melhor quando você quer um documento independente para enviar, editar ou guardar. Ele abre no Microsoft Word e na maioria dos outros editores de texto. Para trabalhar nele no Google Docs, envie o arquivo para o Google Drive e abra por lá.

O **Markdown** combina com aplicativos de notas, wikis e qualquer coisa que seja publicada na web. Títulos e listas são mantidos como uma marcação de texto simples, fácil de editar em qualquer lugar. A ferramenta [imagem para Markdown](/pt/image-to-markdown) já vem configurada para isso.

O **texto simples** é a escolha certa quando você pretende reformatar tudo de qualquer jeito e não quer uma estrutura solta atrapalhando.

## Um roteiro de limpeza que poupa tempo

A ordem faz diferença. Corrigir os problemas cedo, com a imagem na sua frente, é muito mais rápido do que encontrá-los depois num documento longo.

1. **Prepare a imagem.** Recorte tudo o que não faz parte do documento, como a borda da página seguinte, e endireite fotos tiradas em ângulo. O guia [como obter resultados de OCR precisos](/pt/guides/how-to-get-accurate-ocr-results) explica isso em detalhes.
2. **Leia no modo certo.** Use o modo Documento para texto corrido. Se a página tiver uma tabela, leia essa parte como tabela.
3. **Corrija as palavras antes de exportar.** Confira as palavras sinalizadas com a imagem ao lado. Aqui, onde clicar numa linha mostra o lugar dela na imagem, isso é muito mais rápido do que no Word com a imagem em outra janela.
4. **Tire os elementos repetidos da página.** Apague cabeçalhos, rodapés e números de página repetidos. A função localizar e substituir resolve um cabeçalho que se repete em todas as páginas.
5. **Cole ou exporte.** Use a cópia formatada ou o arquivo .docx, como descrito acima.
6. **Aplique os estilos corretos.** Use os estilos Título 1, Título 2 e Normal em vez de negrito e tamanhos de fonte. Assim você ganha o painel de navegação no Word, a estrutura do documento no Google Docs e um sumário automático. Para limpar a formatação solta antes, selecione o texto e pressione Ctrl+Space no Word, ou Ctrl+\ no Google Docs (⌘+\ no Mac).
7. **Refaça o que o OCR não consegue.** Insira imagens e logotipos recortados do original e recrie as colunas em Layout > Colunas no Word ou em Formatar > Colunas no Google Docs.
8. **Revise.** O corretor ortográfico pega palavras que não existem, como “tbe”. Ele não pega uma palavra real no lugar errado, como “cela” em vez de “sela”, então confira números, nomes e datas com o original.

## Documentos com várias páginas

Para um documento fotografado ou digitalizado página por página, adicione todas as páginas de uma vez e coloque-as em ordem. No Image to Text App, a visualização Documento inteiro junta todas as páginas, permite pesquisar em todas elas e exporta tudo como um único arquivo.

Confira as emendas entre as páginas. Um parágrafo que começa no fim de uma página e continua na seguinte geralmente fica dividido em dois, porque cada página é lida separadamente. Junte esses trechos à mão.

Se você está começando com PDFs digitalizados, e não com fotos, o guia [como extrair texto de documentos digitalizados](/pt/guides/how-to-extract-text-from-scanned-documents) fala sobre configurações do scanner e PDFs pesquisáveis, que podem atender melhor do que um arquivo editável. As tabelas têm um guia próprio: [como extrair tabelas de imagens](/pt/guides/how-to-extract-tables-from-images).

## Quando recriar em vez de converter

A conversão funciona melhor com documentos cheios de texto, como cartas, relatórios, artigos e anotações. Para páginas com muito design, como folhetos, cartazes, cardápios e certificados, extraia o texto e encaixe-o num modelo novo. Isso é mais rápido do que tentar reconstruir um layout exato a partir do resultado do OCR.

Para formulários que você precisa reutilizar, recrie o formulário direito no seu editor de texto e copie os rótulos. E se o documento veio de alguém que ainda tem o arquivo original, pedir esse arquivo é melhor do que qualquer conversão.

Quando estiver pronto, a ferramenta [imagem para Word](/pt/image-to-word) foi feita exatamente para isso, com cópia formatada para colar e download em .docx.
