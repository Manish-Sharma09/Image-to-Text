---
title: "Como copiar texto de uma imagem"
description: "Os jeitos mais rápidos de copiar texto de uma foto ou arquivo de imagem em qualquer aparelho, qual método serve para cada caso e como limpar o texto colado."
summary: "Um guia para qualquer aparelho sobre como copiar texto de imagens: confira se é mesmo uma imagem, escolha o método certo e corrija as quebras de linha depois de colar."
published: 2026-10-03
tool: jpg-to-text
order: 2
---

O texto dentro de uma imagem não pode ser selecionado porque, para o computador, ele não é texto. É uma grade de pontinhos coloridos que, por acaso, formam letras. Para copiá-lo, alguma coisa precisa ler esses pontinhos e descobrir quais caracteres eles mostram. Esse processo é o OCR (reconhecimento óptico de caracteres), e você tem mais jeitos de usá-lo do que imagina.

Este guia ajuda você a escolher o método certo para a imagem que tem na frente e depois mostra como sair com um texto limpo do outro lado.

## Primeiro, confira se é mesmo uma imagem

Uma quantidade surpreendente de “texto em imagem” na verdade pode ser selecionada. Gaste dez segundos verificando antes de partir para o OCR, porque copiar texto de verdade é sempre exato.

- **PDFs.** Muitos PDFs contêm texto de verdade. Tente arrastar o cursor sobre uma frase ou pesquisar uma palavra. Se o PDF for uma digitalização, nada vai acontecer, e o OCR é a solução.
- **Páginas da web.** Títulos e botões estilizados podem parecer imagens, mas muitas vezes são texto comum. Tente selecioná-los, ou pressione Ctrl+F (⌘F no Mac) e pesquise uma palavra.
- **Documentos e slides.** Uma imagem colada num arquivo do Word ou numa apresentação é uma imagem, mesmo que o texto em volta não seja.
- **O print de outra pessoa.** Se um colega mandou um print de uma planilha ou de um relatório, pedir o arquivo original muitas vezes é mais rápido do que qualquer conversão.

## Um guia rápido de decisão

Combine a tarefa com o método:

- **Um telefone, endereço ou frase de uma foto no celular.** Use o que já vem no aparelho: o Texto ao Vivo no iPhone, ou o Google Lens e o Circule para Pesquisar no Android.
- **Texto de algo que está na tela do computador.** A Ferramenta de Captura ou o PowerToys no Windows, o Texto ao Vivo na Pré-Visualização do Mac. O [guia de prints](/pt/guides/how-to-extract-text-from-a-screenshot) tem o passo a passo para cada plataforma.
- **Uma página inteira que você quer editar.** Use uma ferramenta de OCR que mantenha parágrafos, títulos e listas, e exporte para Word.
- **Uma tabela.** Use uma ferramenta com reconhecimento de tabelas, para que as colunas sobrevivam.
- **Um recibo ou nota fiscal.** Um modo de recibos separa o total, a data e os itens, em vez de entregar um paredão de texto.
- **Uma pilha de imagens.** Use uma ferramenta que leia um lote e junte os resultados em ordem.
- **Letra à mão.** Conte com revisar e corrigir mais do que com texto impresso.
- **Qualquer coisa confidencial.** Prefira um método que leia a imagem no seu próprio dispositivo.

## Ferramentas nativas: em que elas são boas

Recursos do celular e do computador como o Texto ao Vivo, o Google Lens e a Ferramenta de Captura têm algumas coisas em comum. Eles funcionam exatamente onde a imagem está, então não há nada para abrir ou enviar. São rápidos para pequenas quantidades de texto.

As limitações também são parecidas. Eles copiam só texto simples, então as tabelas viram linhas soltas e os títulos viram frases comuns. Os idiomas compatíveis dependem do seu sistema operacional. E não existe uma etapa de revisão, então você não sabe sobre quais palavras o motor ficou em dúvida até encontrar os erros por conta própria.

## Como usar uma ferramenta de OCR no navegador

Uma ferramenta no navegador dá um pouco mais de trabalho e oferece mais controle. Os passos são parecidos na maioria delas.

1. **Coloque a imagem na ferramenta.** Arraste o arquivo, use o seletor de arquivos ou cole uma imagem que você copiou. No celular, normalmente dá para tirar uma foto direto.
2. **Defina o idioma.** O OCR lê cada idioma com um modelo próprio. Se o texto estiver em espanhol, ou misturar inglês e hindi, informe isso à ferramenta.
3. **Escolha como ler.** Linhas simples, um documento formatado, uma tabela ou um recibo produzem resultados diferentes a partir da mesma imagem.
4. **Revise o resultado ao lado da imagem.** Confira nomes, números e tudo aquilo em que você vai confiar.
5. **Copie ou baixe.** Copie para colar rapidinho, ou baixe um arquivo se o texto for para um documento ou uma planilha.

O [Image to Text App](/pt) funciona assim sem enviar a imagem para lugar nenhum: a leitura acontece no seu navegador, ele escolhe um modo de leitura para você e sinaliza as palavras sobre as quais tem menos certeza, para você saber onde olhar.

## Como tirar imagens de lugares complicados

Às vezes, a parte difícil é simplesmente colocar a imagem na ferramenta.

- **Uma imagem numa página da web.** Clique nela com o botão direito, escolha Copiar imagem e cole. Algumas ferramentas também aceitam o link da imagem: clique com o botão direito, escolha Copiar endereço da imagem e cole esse endereço.
- **Uma imagem dentro de um documento do Word ou de uma apresentação.** No Microsoft Word e no PowerPoint, clique com o botão direito na imagem e escolha Salvar como Imagem para ter um arquivo separado.
- **Uma foto do iPhone.** O iPhone salva fotos em HEIC por padrão, e alguns sites não conseguem abrir esse formato. Use uma ferramenta que leia HEIC ou mude o formato da câmera nos Ajustes.
- **Uma imagem no corpo de um e-mail.** Salve ou baixe a imagem primeiro. Copiar direto do aplicativo de e-mail às vezes dá um link para a imagem, e não a imagem em si.
- **Um quadro de um vídeo.** Pause no quadro, mude para tela cheia para que o texto fique o maior possível e tire um print.

## Como limpar o texto colado

O OCR reproduz o texto linha por linha, do jeito que ele aparece na imagem. Isso é fiel, mas muitas vezes não é o que você quer quando o texto vai para outro lugar.

### Linhas quebradas

Um parágrafo que ocupava cinco linhas na imagem é colado como cinco linhas separadas. Algumas ferramentas conseguem juntar as linhas quebradas em parágrafos antes de você copiar. Se a sua não consegue e você está usando o Microsoft Word, o Localizar e Substituir resolve isso mantendo as quebras de parágrafo de verdade:

1. Substitua `^p^p` (duas marcas de parágrafo) por um marcador que não aparece no texto, como `###`.
2. Substitua `^p` por um único espaço.
3. Substitua `###` por `^p`.

### Palavras divididas

Uma palavra separada por hífen no fim da linha no original (“infor- mação”) continua dividida no resultado. Pesquise por um hífen seguido de espaço e corrija cada caso à mão, porque alguns hífens, como o de “guarda-chuva”, devem ficar.

### Formatação indesejada

Colar num documento pode trazer junto as fontes e o espaçamento de onde você copiou. A maioria dos aplicativos tem uma opção de colar como texto simples, muitas vezes Ctrl+Shift+V, que descarta tudo isso. Use quando quiser só as palavras.

## Quanto confiar no resultado

Texto impresso nítido numa imagem razoavelmente definida costuma sair com muita precisão. Os pontos problemáticos são previsíveis: números, nomes, endereços de e-mail, códigos de produto e qualquer coisa em fonte pequena ou decorativa. São justamente as coisas em que um dicionário não ajuda, e é onde um único caractere lido errado faz mais diferença.

Se você tem curiosidade sobre por que o OCR confunde 0 com O, ou “rn” com “m”, o guia [como funciona o OCR](/pt/guides/how-ocr-works) explica em linguagem simples. Se o texto que você está copiando vai virar um documento que você vai continuar editando, veja [como converter imagens em documentos editáveis](/pt/guides/how-to-convert-images-to-editable-documents). E para documentos de identidade, cartas do banco ou qualquer outra coisa sensível, vale ler [se o OCR online é privado](/pt/guides/is-online-ocr-private) antes de escolher uma ferramenta.
