---
title: "Como melhorar a precisão do OCR em fotos, digitalizações e prints"
description: "Soluções práticas para um OCR ruim: tamanho do texto e resolução, iluminação, ângulo, contraste, foco, recorte, idioma e modo certos, e revisão."
summary: "A maioria dos erros de OCR começa na imagem. O que mudar antes da leitura, quais configurações importam, o que a Melhoria automática faz e como revisar o resultado rápido."
published: 2026-10-03
tool: photo-to-text
order: 8
---

Quando o OCR erra o texto, raramente o motor é o principal culpado. Quase sempre a imagem deu pouco material para ele trabalhar: letras pequenas demais, uma sombra sobre a página, um ângulo inclinado ou um leve desfoque. Um minuto gasto na imagem poupa muito mais tempo corrigindo o texto.

As dicas abaixo estão, mais ou menos, em ordem de impacto. Para entender por que cada uma importa, [como funciona o OCR](/pt/guides/how-ocr-works) explica o que o motor faz com a sua imagem.

## Deixe o texto grande o bastante

O que conta é quantos pixels cada letra recebe, não quantos megapixels tem a sua câmera. Uma foto de alta resolução de uma mesa inteira ainda pode deixar o texto de uma folha com só alguns pixels de altura.

- **Preencha o quadro com o texto.** Aproxime a câmera até que a área de que você precisa ocupe a maior parte da foto.
- **Aumente o zoom da tela antes do print.** Amplie a página ou o documento primeiro e só depois capture. Prints de uma tela de alta resolução também são lidos melhor que o mesmo conteúdo numa tela de baixa resolução.
- **Não deixe as imagens encolherem no caminho.** Alguns aplicativos de mensagens e programas de e-mail comprimem ou redimensionam as fotos. Envie o arquivo original ou transfira-o diretamente.
- **Digitalize a 300 dpi.** Para letras muito pequenas, 400 a 600 dpi ajudam. As configurações estão em [como extrair texto de documentos digitalizados](/pt/guides/how-to-extract-text-from-scanned-documents).

Ampliar uma imagem pequena depois ajuda um pouco, porque os motores de OCR funcionam melhor quando as letras não são minúsculas. Mas isso não acrescenta detalhes que a câmera nunca captou.

## Ilumine a página por igual

- **Use luz suave.** A luz do dia vinda de uma janela ou a luz do teto do cômodo funcionam bem. Sol direto cria sombras duras e pontos estourados.
- **Tire a sua sombra de cima da página.** O celular e as mãos bloqueiam a luz que vem de cima. Posicione-se de modo que a luz venha de lado, e não de trás de você.
- **Evite o flash em papel brilhante.** Ele cria um ponto branco que apaga o texto embaixo. Se precisar do flash, incline um pouco o celular para o reflexo sair de cima do texto e depois endireite a foto.

Iluminação irregular é um dos principais motivos para uma parte da página sair certa e outra sair sem sentido: a área mais escura é tratada como tinta.

## Fotografe de frente

Segure o celular paralelo à página. Quando ele fica inclinado, o lado mais distante da página encolhe, as linhas convergem e as letras de uma borda ficam menores que as da outra.

Se não der para evitar o ângulo, uma ferramenta de endireitar pelos quatro cantos (correção de perspectiva) puxa a página de volta para um retângulo: você arrasta uma alça até cada canto da página. Uma imagem de lado ou de cabeça para baixo só precisa ser girada. Páginas de livro que se curvam em direção à lombada são mais difíceis, porque endireitar não aplana uma curva, então deixe o livro o mais plano possível antes de fotografar.

## Acerte o contraste

Os motores de OCR leem melhor texto escuro sobre fundo claro.

- **Texto claro em fundo escuro**, como prints em modo escuro, slides e placas, deve ser invertido antes da leitura.
- **Texto e fundos coloridos** muitas vezes são lidos melhor em tons de cinza, principalmente combinações como vermelho sobre rosa ou azul sobre cinza.
- **Impressão apagada ou clara** se beneficia de mais contraste, ou de preto e branco se o fundo for irregular.
- **Fundos com padrões**, como os padrões de segurança de cheques e certificados, às vezes podem ser removidos com preto e branco, que elimina padrões claros e mantém o texto escuro.

## Mantenha a nitidez

- **Toque no texto para focar** antes de tirar a foto, principalmente quando a página está perto da lente.
- **Fique parado.** Apoie os cotovelos na mesa. Com pouca luz a câmera usa um obturador mais lento, então mais luz também significa menos tremido.
- **Confira antes de sair.** Dê zoom na foto no celular. Se as letras estiverem borradas no tamanho real, tire outra enquanto a página ainda está na sua frente.

Aumentar a nitidez ajuda numa imagem levemente borrada, e a redução de ruído ajuda em fotos granuladas tiradas com pouca luz. Nenhuma das duas salva um tremido de movimento de verdade.

## Recorte só o que você precisa

Tudo o que está na imagem é algo que o motor precisa entender.

- **Tire o que atrapalha.** Bordas da mesa, outras páginas, logotipos, fotos e bordas escuras podem ser confundidos com texto ou bagunçar o layout.
- **Recorte regiões diferentes separadamente.** Se você só precisa de uma coluna, um parágrafo ou uma tabela, recorte só essa parte.
- **Deixe uma pequena margem.** Não recorte tão justo a ponto de as letras encostarem na borda da imagem. A documentação do Tesseract observa que uma pequena borda em volta do texto ajuda.

## Escolha o idioma certo

O OCR lê cada idioma com um modelo próprio. Leia um texto em francês como inglês e as letras acentuadas saem erradas, ou nem saem. Leia hindi como inglês e o resultado não faz sentido.

Selecione todos os idiomas que aparecem na página, como inglês mais hindi num formulário bilíngue, e só esses. Idiomas a mais deixam a leitura mais lenta e dão ao motor mais opções erradas para escolher.

No Image to Text App, a configuração Automático começa com inglês mais os idiomas do seu navegador. Se o texto parecer de outra escrita, ele detecta a escrita e lê a imagem de novo no idioma certo.

## Escolha o modo de leitura certo

Na maioria dos modos, a escolha afeta mais o formato do resultado do que as letras reconhecidas. Texto simples mantém cada linha como ela aparece. Documento junta as linhas em parágrafos e mantém títulos e listas. Tabela, Recibo ou nota fiscal, Código, Letra à mão e Matemática estruturam o resultado cada um para a sua tarefa. O Image to Text App escolhe um modo automaticamente e mostra o palpite numa etiqueta, como “Parece uma tabela”, e você pode trocar sem precisar adicionar a imagem de novo.

## O que a Melhoria automática faz

A Melhoria automática do Image to Text App vem ligada por padrão. Dependendo da imagem, ela inverte texto claro em fundo escuro, amplia texto pequeno, corrige uma leve inclinação, uniformiza a iluminação e as sombras de fotos de celular e reforça o contraste. Os ajustes que ela fez aparecem listados no aplicativo, então você vê o que mudou.

Se um resultado parecer pior do que você esperava, mantenha pressionado o botão Comparar para ver o original e depois experimente as ferramentas manuais: girar, recortar, endireitar pelos quatro cantos, brilho, contraste, nitidez, tons de cinza, inverter, preto e branco, uniformizar a iluminação e reduzir ruído. Depois de alterar a imagem, pressione Ctrl+Enter (⌘+Enter no Mac) para ler de novo.

## Revise o resultado com eficiência

Mesmo um bom resultado merece uma conferência se você vai depender dele.

- **Comece pela confiança geral.** Alta, razoável ou baixa é uma indicação de quanto cuidado ter na leitura, não uma garantia.
- **Pule de uma palavra sinalizada para a outra.** As palavras sobre as quais o motor ficou em dúvida aparecem sublinhadas, e você pode passar de uma para a seguinte.
- **Use a ligação entre texto e imagem.** Clique numa linha do texto para ver onde ela está na imagem, ou clique na imagem para pular até o texto correspondente.
- **Priorize o que não tem contexto.** Nomes, números, endereços de e-mail, endereços da web e códigos não podem ser deduzidos pelas palavras ao redor, então é neles que os erros mais pesam.
- **Corrija erros repetidos com localizar e substituir,** conferindo cada ocorrência em vez de substituir tudo de uma vez.

A letra à mão pede um jeito próprio de fotografar e revisar; veja [como converter anotações à mão em texto](/pt/guides/how-to-convert-handwritten-notes-to-text). Para fotos de páginas impressas, a página [foto para texto](/pt/photo-to-text) reúne tudo isso num só lugar, e no celular você pode tirar a foto direto por ela.
