---
title: "OCR online é seguro? O que acontece com as suas imagens"
description: "O que costuma acontecer com uma imagem enviada para OCR, o que procurar numa política de privacidade e como conferir se uma ferramenta mantém tudo local."
summary: "Para onde vai a sua imagem quando você usa um OCR online, as perguntas que vale fazer à política de privacidade e um jeito simples de confirmar você mesmo o processamento no dispositivo."
published: 2026-10-03
tool: pdf-to-text
order: 9
---

As imagens que as pessoas passam por OCR muitas vezes são privadas: documentos de identidade, extratos bancários, documentos médicos, contratos, prints de conversas pessoais. Saber se uma ferramenta online é “privada” se resume a duas perguntas. Onde a imagem é lida? E o que acontece com ela, e com o texto, depois?

Este guia não é um veredito sobre nenhum serviço específico. Muitos tratam os arquivos com cuidado. É um jeito de você mesmo descobrir, para escolher a ferramenta certa para cada documento.

## O que costuma acontecer quando você envia uma imagem

As ferramentas de OCR online funcionam de um destes dois jeitos, e algumas misturam os dois.

### Processamento no servidor

A maioria das ferramentas online envia a sua imagem para os servidores delas para ser lida. O navegador faz o upload do arquivo, normalmente por uma conexão HTTPS criptografada, o servidor roda o OCR e o texto volta para a página. No meio do caminho:

- O arquivo existe em pelo menos um servidor e pode ser gravado em armazenamento enquanto espera numa fila de processamento.
- Os registros (logs) do servidor costumam guardar detalhes de cada solicitação, como horário, endereço IP e tamanho do arquivo, e às vezes mais.
- Os backups podem guardar cópias por um tempo, mesmo depois que a cópia principal é apagada.
- O serviço pode repassar a imagem a outras empresas de que depende, como um provedor de hospedagem em nuvem ou um serviço terceirizado de OCR ou de IA, cada um com seus próprios termos.
- A equipe pode ter acesso aos arquivos para suporte ou depuração.
- Dependendo da política, os arquivos ou o texto extraído podem ser usados para melhorar o serviço, o que pode incluir o treinamento de modelos.

Nada disso é automaticamente um problema. Um serviço pode apagar os arquivos logo, restringir o acesso e nunca treinar modelos com eles. A questão é que você está confiando na política dele e em que as práticas correspondam a essa política.

### Processamento no dispositivo

Algumas ferramentas baixam o motor de OCR para o seu navegador e leem a imagem no seu próprio dispositivo. A imagem nunca é enviada ao serviço, então perguntas sobre retenção, registros e treinamento simplesmente não se aplicam a ela.

### Os recursos nativos também variam

Os recursos de OCR dos sistemas operacionais são diferentes entre si. A Apple descreve o Texto ao Vivo como um recurso que funciona no dispositivo, e a Microsoft diz que o reconhecimento de texto da Ferramenta de Captura roda localmente. A página de ajuda do Google sobre a captura de texto do Chromebook Plus diz que a área selecionada é enviada para os servidores do Google. A documentação de cada recurso é o lugar para conferir. O [guia sobre prints](/pt/guides/how-to-extract-text-from-a-screenshot) explica como usá-los.

## O que verificar numa política de privacidade

Leia a política com estas perguntas em mente.

- **Onde a imagem é processada?** Procure frases como “enviado para os nossos servidores”, “processado no seu navegador” ou “no seu dispositivo”. Uma redação vaga aqui já é, por si só, uma resposta.
- **Por quanto tempo ela fica guardada?** Um prazo específico, como “apagado após uma hora”, diz mais do que “pelo tempo necessário”. Veja se o prazo também vale para backups e registros.
- **Ela é usada para treinamento ou para “melhorar nossos serviços”?** Se for, descubra se você pode recusar e se isso vale para arquivos que você já enviou.
- **Quem mais tem acesso a ela?** Procure uma lista de suboperadores ou terceiros, como provedores de hospedagem, OCR ou IA e ferramentas de análise.
- **E o texto extraído?** Algumas políticas falam dos arquivos enviados, mas não dizem nada sobre o texto gerado a partir deles.
- **Onde ficam os servidores?** O país onde os dados são processados define quais leis se aplicam a eles.
- **O histórico fica guardado numa conta?** Resultados salvos e ligados a uma conta ficam num servidor até você apagá-los.
- **Quem mais está na página?** Redes de anúncios e scripts de análise numa página recebem informações sobre a sua visita. Normalmente eles não recebem a sua imagem, mas vale saber que estão ali.
- **A política é específica e atual?** Uma política datada e detalhada é um sinal melhor que um modelo genérico.

Lembre-se de que uma política de privacidade é uma declaração de intenção, não uma prova. Com ferramentas que funcionam no dispositivo, você mesmo pode conferir a promessa.

## Como o processamento no dispositivo é diferente

Quando o OCR roda no seu navegador, a confidencialidade da imagem não depende dos servidores, da equipe nem da política de retenção de mais ninguém. Há contrapartidas: a primeira visita baixa o motor e os dados de idioma, e a velocidade de leitura depende do seu aparelho, então um celular mais antigo demora mais.

O seu dispositivo continua importando. Os resultados podem ir parar em lugares que você controla, mas pode esquecer: o armazenamento do navegador, se você ativar um recurso de histórico, a pasta de downloads e a área de transferência. O histórico da área de transferência do Windows (Windows+V) e a sincronização da área de transferência entre dispositivos podem guardar cópias do que você copiou.

## Como conferir você mesmo

### Observe a aba Rede (Network)

Os navegadores trazem ferramentas de desenvolvedor que mostram cada solicitação que uma página faz. Você não precisa ser desenvolvedor para usá-las.

1. Abra a ferramenta num navegador de computador. No Safari, ative antes os recursos para desenvolvedores nos ajustes Avançados do Safari.
2. Abra as ferramentas de desenvolvedor: F12 ou Ctrl+Shift+I no Windows e no Linux, ⌘+Option+I no Mac.
3. Selecione a aba Rede (Network), limpe a lista e ative a opção de preservar o registro, se houver.
4. Adicione uma imagem e deixe a ferramenta lê-la.
5. Observe as solicitações que aparecem. Um upload normalmente aparece como uma solicitação POST ou PUT com tamanho próximo ao do arquivo da sua imagem. Ordenar por tamanho facilita encontrar solicitações grandes saindo.

Com uma ferramenta que funciona no dispositivo, você pode ver o motor e os arquivos de idioma sendo baixados no primeiro uso, e talvez pequenas solicitações de análise, mas nada do tamanho da sua imagem saindo. Deixe o painel aberto por um minuto depois da leitura e confira todos os tipos de solicitação, já que os dados também podem ser enviados em pedaços ou por uma conexão WebSocket.

### Teste offline

Carregue a página e leia uma imagem, para que o motor e os dados de idioma fiquem em cache. Depois desligue o Wi-Fi ou ative o modo avião e leia outra. Se ainda funcionar, a leitura está acontecendo no seu dispositivo.

O teste offline é rápido, mas sozinho não é conclusivo, porque uma página poderia guardar a imagem e enviá-la depois. A aba Rede é a verificação mais forte.

O [Image to Text App](/pt) roda o OCR no seu dispositivo exatamente assim, e você pode conferir isso com os dois testes. Os detalhes estão na [página de privacidade](/pt/privacy).

## Conselhos para documentos sensíveis

- **Prefira o processamento no dispositivo** para documentos de identidade, prontuários médicos, extratos financeiros e documentos jurídicos.
- **Tire o que você não precisa.** Se você só precisa do endereço de uma carta, recorte fora o número da conta. Com uma ferramenta baseada em servidor, recorte antes de enviar, porque o recorte feito dentro da ferramenta acontece depois do upload.
- **Evite computadores compartilhados e públicos.** Se precisar usar um, deixe qualquer recurso de histórico desligado, feche a aba quando terminar e apague os arquivos baixados.
- **Limpe o histórico da área de transferência** depois de copiar um texto sensível, principalmente se ele sincroniza entre dispositivos.
- **Pense antes de compartilhar os resultados.** Um link que guarda o texto na parte do endereço depois do # não é enviado ao servidor do site quando alguém o abre. Mas qualquer pessoa com o link consegue ler o texto, e os aplicativos de conversa guardam os links que você envia. Trate o link como o próprio documento.
- **Confira as extensões do navegador.** Extensões com acesso a todos os sites conseguem ler o conteúdo das páginas que você visita. Para documentos muito sensíveis, use um perfil do navegador sem extensões ou uma janela anônima, onde a maioria dos navegadores desativa as extensões, a menos que você as tenha permitido.

Papéis digitalizados são onde essas perguntas mais aparecem. Para lidar com digitalizações e PDFs, veja a página [PDF para texto](/pt/pdf-to-text).
