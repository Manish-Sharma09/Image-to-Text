---
title: "Como extrair texto de documentos digitalizados e PDFs"
description: "Configurações de scanner que ajudam o OCR, digitalização de várias páginas, como diferenciar PDF digitalizado de digital, PDFs pesquisáveis e arquivo."
summary: "Tire o texto de digitalizações: as configurações que importam, dicas para várias páginas, como reconhecer um PDF só de imagem e como montar um arquivo pesquisável de documentos em papel."
published: 2026-10-03
tool: pdf-to-text
order: 6
---

Um scanner tira uma foto da página. Mesmo quando ele salva essa foto como PDF, a página continua sendo uma imagem (o chamado PDF de imagem), e você não consegue selecionar, pesquisar nem copiar o texto até que um OCR o leia. Conseguir um bom texto de uma digitalização começa no scanner, e as escolhas feitas ali são difíceis de desfazer depois.

Este guia fala das configurações do scanner, de documentos com várias páginas, de como saber que tipo de PDF você tem e de como manter um arquivo pesquisável.

## PDF digitalizado ou PDF digital?

Nem todo PDF precisa de OCR. Um PDF exportado do Word ou de uma página da web contém texto de verdade, e copiá-lo é exato. Algumas verificações rápidas mostram que tipo você tem:

- **Tente selecionar uma palavra.** Se você consegue destacar palavras individuais, a página tem uma camada de texto. Se a página inteira é destacada como um bloco só, ou nada acontece, é uma imagem.
- **Pesquise uma palavra que você está vendo.** Se o Ctrl+F (⌘F no Mac) não encontrar nada, não há texto utilizável.
- **Aumente bem o zoom.** Texto digital continua nítido em qualquer zoom. Texto digitalizado fica borrado ou quadriculado.

Fique de olho também nos PDFs mistos. Um contrato pode ter páginas digitadas seguidas de uma página de assinatura digitalizada, ou um relatório pode ter anexos digitalizados.

A camada de texto também pode ser ruim. Alguns PDFs passaram por OCR anos atrás e carregam uma camada de texto invisível imprecisa, então copiar devolve palavras embaralhadas. Outros usam fontes que viram caracteres sem sentido quando copiadas. Nesses casos, trate a página como imagem: exporte-a como figura no seu leitor de PDF e leia essa imagem.

O Image to Text App lê todas as páginas de um PDF. Páginas que já têm texto selecionável são aproveitadas diretamente, sem OCR, e só as páginas de imagem são lidas, então um documento misto sai com a maior precisão possível. A página [PDF para texto](/pt/pdf-to-text) está configurada para isso.

## Configurações de scanner que ajudam o OCR

### Resolução

300 dpi é o padrão habitual para texto, e é o mínimo que a documentação do Tesseract recomenda. Para letras muito pequenas, como notas de rodapé, letras miúdas de contratos ou bulas de remédio, digitalize entre 400 e 600 dpi. Passar disso para texto de tamanho normal quase sempre só aumenta os arquivos, sem melhorar o resultado.

### Modo de cor

Escolha tons de cinza em vez de preto e branco. O modo preto e branco do scanner aplica um único corte fixo no momento da digitalização: letras fracas se partem, letras em negrito ficam empastadas, e não há como recuperar o detalhe perdido. Os tons de cinza guardam essa informação, e o software de OCR pode decidir o que é tinta e o que é papel.

Use colorido quando a cor tiver significado: trechos marcados com marca-texto, carimbos coloridos, formulários com campos coloridos ou páginas com fotos que você quer manter. O marca-texto, em especial, pode virar blocos cinza-escuros numa digitalização em preto e branco, escondendo justamente o texto que ele destacava.

### Formato do arquivo

PDF e TIFF são boas escolhas para documentos com várias páginas, e PNG para páginas avulsas. Evite salvar como JPEG muito comprimido, que alguns scanners usam nas predefinições de “arquivo pequeno”. A compressão JPEG deixa manchas em volta das bordas das letras, e o texto pequeno é o que mais sofre.

### O lado físico

Limpe o vidro do scanner, porque um único cisco se repete em todas as páginas. Para papel fino impresso dos dois lados, coloque uma folha de papel preto atrás da página para que o verso não apareça por transparência.

## Usando o celular como scanner

O celular funciona bem para digitalizações de vez em quando. O iPhone tem um digitalizador de documentos embutido nos apps Notas e Arquivos, e muitos celulares Android oferecem um na câmera ou num aplicativo de documentos. Esses modos encontram as bordas da página, corrigem a perspectiva e salvam um PDF, o que costuma ser melhor que uma foto comum. Para a parte da foto em si, como luz, ângulo e foco, veja [como obter resultados de OCR precisos](/pt/guides/how-to-get-accurate-ocr-results).

## Digitalizando documentos de várias páginas

- **Use o alimentador automático para folhas soltas.** Tire grampos e clipes, folheie a pilha para as páginas não grudarem e ative a digitalização frente e verso (duplex) para originais impressos dos dois lados.
- **Conte as páginas.** Alimentadores às vezes pulam uma página ou puxam duas de uma vez. Compare o número de páginas da digitalização com o original antes de guardar o papel.
- **Digitalize livros no vidro do scanner.** Pressione a lombada para que as linhas perto da encadernação não fiquem curvas e conte com uma sombra na margem interna. A correção de iluminação pode uniformizar a sombra, mas não consegue endireitar linhas curvas.
- **Dê nomes que fiquem em ordem.** Se você digitalizar as páginas como imagens separadas, numere-as 001, 002, 003 em vez de 1, 2, 3. Caso contrário, a página 10 aparece antes da página 2.

No Image to Text App, cada página de um PDF ou de um TIFF de várias páginas vira uma página no espaço de trabalho. Você pode arrastar as páginas para pôr em ordem, ler qualquer página de novo e usar a visualização Documento inteiro para pesquisar em todas as páginas e exportar o resultado como um único arquivo.

## Como criar um PDF pesquisável

Um PDF pesquisável é a digitalização original com uma camada de texto invisível posicionada exatamente sobre as palavras. Ele parece idêntico à digitalização, mas você pode pesquisar, selecionar e copiar o texto. A busca de arquivos do computador e muitos serviços de armazenamento em nuvem também conseguem encontrá-lo pelo conteúdo.

Muitas vezes esse é o melhor formato para guardar um documento, porque preserva tudo o que o papel mostrava, inclusive assinaturas, carimbos e layout, e ainda permite encontrá-lo por uma palavra que está nele. Se você precisa editar o texto, exporte para Word ou texto simples. A ferramenta [imagem para PDF](/pt/image-to-pdf) cria PDFs pesquisáveis a partir de imagens.

Um porém: os erros de OCR na camada oculta são invisíveis. Se um nome foi lido errado, pesquisar por ele não vai encontrar aquela página. Para buscas importantes, tente um termo mais curto, como as primeiras letras de um sobrenome, que tem mais chance de escapar de um único caractere lido errado.

## Como arquivar documentos em papel

Alguns hábitos mantêm um arquivo de digitalizações útil por anos:

- **Comece o nome do arquivo pela data.** Um nome como `2026-03-14 Conta de luz março.pdf` fica em ordem de data automaticamente em qualquer pasta.
- **Use poucas pastas.** Algumas pastas amplas, como Casa, Impostos, Saúde e Trabalho, são mais fáceis de pesquisar que uma árvore profunda.
- **Considere o PDF/A para guardar por muito tempo.** O PDF/A é uma versão do PDF padronizada pela ISO e pensada para arquivamento. Ele incorpora tudo o que é preciso para exibir o arquivo, como as fontes, então o documento deve continuar abrindo corretamente daqui a muitos anos. Muitos programas de scanner e ferramentas de PDF salvam nesse formato.
- **Faça backup.** Uma regra prática comum é ter três cópias, em dois tipos diferentes de armazenamento, com uma delas guardada em outro lugar.
- **Guarde o papel quando o papel importa.** Testamentos, escrituras, documentos com firma reconhecida e alguns registros fiscais e jurídicos podem precisar ser guardados no original. As regras variam conforme o país e o documento, então verifique antes de triturar qualquer coisa importante.

Documentos digitalizados também costumam ser os arquivos mais sensíveis que as pessoas têm: documentos de identidade, extratos bancários, documentos médicos. Antes de passá-los por qualquer ferramenta online, leia [OCR online é privado?](/pt/guides/is-online-ocr-private) para saber o que verificar.
