---
title: "Como funciona o OCR, explicado em linguagem simples"
description: "Como o OCR transforma imagem em texto: limpeza da imagem, análise de layout, linhas e palavras, reconhecimento por rede neural, dicionários e confiança."
summary: "Um passeio em linguagem simples pelo que acontece dentro de um motor de OCR, da limpeza da imagem ao reconhecimento por rede neural, e por que ele confunde 0 com O."
published: 2026-10-03
tool: photo-to-text
order: 4
---

OCR, sigla em inglês para reconhecimento óptico de caracteres, é um software que olha para uma imagem e descobre quais caracteres estão nela. Parece simples até você lembrar o que é uma imagem: uma grade de pontinhos coloridos. Nada no arquivo diz “esta é a letra A” ou “esta linha vem antes daquela”. Tudo isso precisa ser deduzido.

Este guia mostra o que um motor de OCR moderno faz, usando o Tesseract como exemplo. O Tesseract é um motor de código aberto muito usado, desenvolvido originalmente na Hewlett-Packard e mantido depois com o apoio do Google, e é o motor que o [Image to Text App](/pt) roda no seu navegador. Outros motores mudam nos detalhes, mas as etapas são praticamente as mesmas.

## As etapas em resumo

1. Limpar a imagem para o texto se destacar.
2. Analisar o layout para encontrar os blocos de texto e a ordem deles.
3. Dividir os blocos em linhas, e as linhas em palavras.
4. Reconhecer os caracteres de cada linha.
5. Usar o conhecimento do idioma para escolher entre as leituras prováveis.
6. Dar uma nota de confiança a cada palavra e entregar o resultado.

## Limpeza da imagem

O reconhecimento funciona melhor com letras escuras e nítidas sobre um fundo claro e liso, então a primeira tarefa é chegar o mais perto possível disso.

A **binarização** decide, para cada pixel, se ele é tinta ou papel, transformando a imagem em preto e branco puro. A abordagem clássica, o método de Otsu, observa a distribuição de brilho na imagem inteira e escolhe um único limiar que separe melhor os dois grupos. Isso funciona bem em digitalizações limpas. Numa foto de celular com uma sombra num dos cantos, um limiar único falha: a parte sombreada vira um bloco preto ou a parte clara perde as letras mais fracas. Os métodos adaptativos resolvem isso comparando cada pixel com a vizinhança dele, e não com a página inteira.

A **correção de inclinação** detecta se as linhas de texto estão tortas e gira a imagem para que fiquem na horizontal. Mesmo poucos graus de inclinação podem fazer uma linha invadir a de cima, o que estraga as etapas seguintes.

Outras etapas de limpeza removem pontinhos e poeira do scanner, ampliam texto muito pequeno para que as letras tenham pixels suficientes e invertem texto claro sobre fundo escuro. A documentação do Tesseract recomenda texto escuro sobre fundo claro nas versões atuais, e é por isso que as ferramentas costumam inverter prints em modo escuro antes de lê-los.

## Análise do layout

Em seguida, o motor descobre o que há na página: blocos de texto, imagens, linhas de grade, colunas separadas. Ele também precisa decidir a ordem de leitura.

Essa etapa causa alguns dos erros mais confusos. Se o motor não percebe o espaço entre duas colunas, ele lê direto atravessando as duas, misturando meias frases de cada uma. Uma legenda pode se fundir ao parágrafo de baixo. Uma tabela pode sair como um amontoado de palavras mais ou menos na ordem certa.

Os motores geralmente deixam o software que os usa dizer que tipo de entrada esperar, como uma página inteira, um único bloco, uma única linha ou texto espalhado. Escolher a expectativa certa faz diferença: ler um recibo como se fosse a página de um livro pode dar resultados piores do que lê-lo como texto espalhado.

## Como as linhas e palavras são encontradas

Dentro de cada bloco, o motor encontra as linhas de texto. Ele procura fileiras de tinta apoiadas numa mesma linha de base e mede as proporções da linha: a altura das letras minúsculas, como o x, e até onde vão as hastes que sobem (b, d, h) e as que descem (g, p, y).

As palavras vêm do espaçamento. O espaço entre palavras normalmente é maior que o espaço entre letras. Um espaçamento apertado pode juntar duas palavras numa só, e o espaçamento esticado de um texto justificado pode dividir uma palavra em duas.

## Reconhecimento dos caracteres

Os motores de OCR mais antigos, incluindo o Tesseract até a versão 3, cortavam cada palavra em caracteres individuais e comparavam cada forma com as formas que tinham aprendido. Isso falha quando as letras se encostam, como num “rn” borrado, ou quando uma letra fica partida em pedaços por causa de uma impressão fraca.

O Tesseract 4, lançado em 2018, ganhou um reconhecedor baseado numa rede neural LSTM (memória de longo e curto prazo, na sigla em inglês). Em vez de recortar as letras, ele lê uma linha inteira como uma sequência, percorrendo-a e estimando a cada passo a probabilidade de cada caractere possível. Como a rede carrega informação ao longo da linha, ela pode usar as formas antes e depois de um caractere para decidir qual é, do mesmo jeito que você lê uma letra borrada olhando as vizinhas.

A rede aprende com exemplos. Os modelos oficiais do Tesseract foram treinados com grandes quantidades de texto renderizado em várias fontes, com um modelo separado para cada idioma ou escrita. Por isso escolher o idioma certo importa: um modelo treinado em inglês não faz ideia de como é uma letra em devanágari e pode não esperar letras acentuadas como é ou ñ.

## Conhecimento do idioma e dicionários

O reconhecedor não produz uma única resposta. Ele produz várias leituras possíveis de cada linha, com suas probabilidades. Uma busca então escolhe a melhor, com um empurrãozinho de uma lista de palavras e do conhecimento de quais combinações de letras são comuns no idioma.

Esse empurrãozinho corrige muita coisa. Um “qve” borrado vira “que” porque “que” é uma palavra e “qve” não é. Mas ele também pode jogar contra você. Códigos de produto, sobrenomes, abreviações e palavras de outro idioma não estão na lista de palavras, então o motor tem menos ajuda com eles e erra com mais facilidade.

## Níveis de confiança

Para cada palavra, o motor também informa o quanto tem certeza, com base em quanto a leitura preferida ganhou das alternativas. As ferramentas usam isso para marcar palavras para você conferir.

Trate a confiança como uma pista, não como garantia. Uma nota baixa geralmente indica que algo está errado. Uma nota alta geralmente indica que está certo, mas um motor pode errar com toda a confiança. Um “O” bem nítido no meio de um número de série, que deveria ser um zero, parece perfeitamente normal para ele.

## Por que os erros acontecem

A maioria dos erros de OCR segue alguns padrões:

- **Caracteres parecidos.** 0 e O, 1 e l e I, 5 e S, 8 e B. Em muitas fontes sem serifa, o I maiúsculo e o l minúsculo são idênticos, então até uma pessoa precisa do contexto.
- **Pares de letras parecidos.** “rn” lido como “m”, “cl” como “d”, “vv” como “w”, e vice-versa.
- **Pontuação.** Vírgulas e pontos são minúsculos, então uma sujeira vira ponto e uma vírgula decimal fraca desaparece.
- **Nenhum contexto para ajudar.** Códigos, números de identificação, telefones e endereços de e-mail não têm palavras do dicionário em volta, então cada caractere fica sozinho.
- **Erros de layout.** Colunas lidas de um lado a outro, legendas misturadas ao texto, linhas de uma tabela embaralhadas.
- **Texto que o modelo nunca aprendeu.** Fontes decorativas, logotipos estilizados, texto na vertical e, principalmente, letra à mão.

A maioria desses erros fica bem mais rara com uma imagem mais nítida, maior e mais reta. O guia [como obter resultados de OCR precisos](/pt/guides/how-to-get-accurate-ocr-results) mostra o que mudar.

## O que acontece depois do reconhecimento

A saída bruta de um motor é uma lista de palavras, cada uma com sua posição na imagem e uma nota de confiança. Os aplicativos montam a estrutura a partir dessas posições. Palavras alinhadas em colunas verticais viram uma tabela, como explica o guia [como extrair tabelas de imagens](/pt/guides/how-to-extract-tables-from-images). Linhas com uma data ou um total depois de um rótulo viram campos de recibo. A distância de cada linha até a margem esquerda vira recuo no código.

## OCR, ICR, HTR e modelos de IA

Você pode encontrar alguns termos relacionados. Tradicionalmente, **OCR** se refere a texto impresso. **ICR** (reconhecimento inteligente de caracteres) é a leitura de caracteres escritos à mão em letra de forma, geralmente um por quadradinho num formulário. **HTR** (reconhecimento de texto manuscrito) é a leitura de letra à mão contínua, normalmente com redes neurais treinadas com amostras de escrita à mão. As diferenças na prática estão no guia [como transformar anotações à mão em texto](/pt/guides/how-to-convert-handwritten-notes-to-text).

Alguns sistemas de IA mais recentes leem o texto gerando-o a partir da imagem com um grande modelo de linguagem. Eles lidam bem com imagens bagunçadas, mas, como geram um texto fluente, um erro pode parecer uma palavra perfeitamente plausível que não está na imagem. Seja qual for o tipo de sistema que você usar, confira as partes importantes com o original.
