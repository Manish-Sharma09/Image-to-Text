// Portuguese legal documents. Translated from en.ts — see the conventions there.
import type { Legal } from './en';

const pt = {
  privacy: {
    title: 'Política de privacidade',
    intro: 'A política completa, seção por seção. O resumo acima é uma versão curta e fiel; se houver divergência, prevalece esta política.',
    sections: [
      {
        id: 'who-we-are',
        title: 'Quem somos',
        html: '<p>Esta política se aplica ao {site}, em {url}, e à sua ferramenta de imagem para texto, operados por {operator} (“nós”). Ela explica quais informações são tratadas quando você usa o site, por que são tratadas e quais escolhas você tem. Nos termos de leis de proteção de dados como o GDPR da UE e do Reino Unido, somos o responsável pelo tratamento das informações descritas aqui.</p><p>Dúvidas ou solicitações: <a href="mailto:{email}">{email}</a>.</p>',
      },
      {
        id: 'information-we-process',
        title: 'Informações que tratamos',
        html: '<p>A ferramenta foi pensada para precisar do mínimo possível de informações. Isto é tudo o que é tratado, e onde.</p><ul><li><strong>Imagens e textos que você lê no seu dispositivo.</strong> A leitura acontece no seu navegador. Suas imagens, o texto e suas edições não são enviados para nós, e não temos como vê-los.</li><li><strong>Leitura avançada, só se você escolher.</strong> Quando essa opção é oferecida, somente a imagem da página que você confirmar, redimensionada para no máximo 2.000 pixels, é enviada ao nosso servidor junto com o modo de leitura e os idiomas que você escolheu, e repassada à Anthropic para ser lida. O texto é devolvido a você. Não armazenamos a imagem nem o texto.</li><li><strong>Imagens a partir de um link.</strong> Se o seu navegador não conseguir carregar o link de uma imagem diretamente, nosso servidor busca essa imagem para você e a devolve na hora, sem armazená-la. Para isso, o servidor recebe o link que você colou.</li><li><strong>Dados técnicos das solicitações.</strong> Como acontece com qualquer site, nosso servidor e nosso provedor de hospedagem recebem as informações que o seu navegador envia em cada solicitação: seu endereço IP, o tipo de navegador, a página solicitada e o horário. Para aplicar os limites diários da Leitura avançada e da busca de imagens por link, contamos as solicitações por visitante usando um hash do endereço IP gerado com uma chave que muda todos os dias. As contagens são descartadas diariamente.</li><li><strong>Mensagens que você nos envia.</strong> Se você nos mandar um e-mail, recebemos seu endereço de e-mail e tudo o que você incluir na mensagem.</li><li><strong>Dados armazenados no seu dispositivo.</strong> Suas preferências (como tema e idiomas), o Histórico, se você ativá-lo, e os arquivos do aplicativo e do motor guardados em cache ficam no armazenamento do seu navegador. Eles permanecem no seu dispositivo e nunca são enviados para nós.</li></ul><p>Não há contas, nunca pedimos seu nome e não usamos publicidade, cookies de rastreamento nem ferramentas de análise de terceiros.</p>',
      },
      {
        id: 'service-providers',
        title: 'Serviços envolvidos no funcionamento do site',
        html: '<p>Alguns serviços externos ajudam a disponibilizar o site. Nenhum deles recebe suas imagens, exceto a Anthropic, quando você escolhe a Leitura avançada.</p><ul><li><strong>Nosso provedor de hospedagem</strong> executa nosso servidor e trata os dados das solicitações em nosso nome para disponibilizar o site.</li><li><strong>jsDelivr.</strong> Os arquivos de idioma do motor de texto, assim como o decodificador usado para fotos HEIC do iPhone em navegadores que não conseguem abri-las nativamente, são baixados da rede de distribuição de conteúdo jsDelivr. O jsDelivr vê seu endereço IP e qual arquivo foi solicitado, nunca suas imagens. Veja a <a href="https://www.jsdelivr.com/terms/privacy-policy" rel="noopener">política de privacidade do jsDelivr</a>.</li><li><strong>Anthropic</strong>, somente para a Leitura avançada e somente para a página que você confirmar. O tratamento é feito pela API comercial da Anthropic; os termos comerciais da Anthropic dizem que ela não treina seus modelos com dados da API por padrão. Veja a <a href="https://www.anthropic.com/legal/privacy" rel="noopener">política de privacidade da Anthropic</a>.</li></ul><p>As páginas, as fontes, os scripts e o próprio motor de texto são servidos a partir do nosso próprio domínio.</p>',
      },
      {
        id: 'why-we-process-it',
        title: 'Por que tratamos essas informações',
        html: '<p>Tratamos informações apenas para as finalidades abaixo, com as seguintes bases legais previstas no GDPR:</p><ul><li><strong>Para oferecer os recursos que você solicita</strong>, como a Leitura avançada e a busca de uma imagem a partir de um link (execução de um contrato, artigo 6(1)(b)).</li><li><strong>Para manter o site seguro e funcionando</strong>, o que inclui prevenir abusos e aplicar os limites diários (nossos interesses legítimos, artigo 6(1)(f)).</li><li><strong>Para responder às suas mensagens</strong> (nosso interesse legítimo em responder a você, artigo 6(1)(f)).</li><li><strong>Para cumprir obrigações legais</strong>, quando uma lei assim exigir (artigo 6(1)(c)).</li></ul><p>Nunca vendemos suas informações, nunca as usamos para publicidade e nunca usamos suas imagens ou textos para treinar modelos de IA.</p>',
      },
      {
        id: 'how-long-we-keep-it',
        title: 'Por quanto tempo guardamos as informações',
        html: '<ul><li><strong>Imagens e textos lidos no seu dispositivo:</strong> nunca são guardados por nós. Com o Histórico ativado, eles ficam no seu navegador até você excluí-los.</li><li><strong>Leitura avançada e imagens a partir de um link:</strong> nada é armazenado pelo nosso servidor; os dados existem apenas enquanto a solicitação é processada. O período de retenção da Anthropic está descrito na política de privacidade dela.</li><li><strong>Contadores do limite diário:</strong> descartados todos os dias.</li><li><strong>Dados técnicos das solicitações:</strong> mantidos pelo nosso servidor e pelo nosso provedor de hospedagem apenas pelo tempo necessário para fins de segurança e solução de problemas, e depois excluídos.</li><li><strong>E-mails:</strong> mantidos pelo tempo necessário para tratar da sua mensagem e de eventuais desdobramentos, e depois excluídos.</li></ul>',
      },
      {
        id: 'sharing',
        title: 'Com quem compartilhamos',
        html: '<p>Não vendemos nem alugamos informações pessoais, e não as compartilhamos para publicidade comportamental entre contextos. Só as compartilhamos com os prestadores de serviços descritos acima, que as tratam em nosso nome, ou quando a lei exigir: por exemplo, para cumprir uma solicitação legal válida ou para proteger os direitos e a segurança dos nossos usuários e do site.</p>',
      },
      {
        id: 'international-transfers',
        title: 'Transferências internacionais',
        html: '<p>Nossos prestadores de serviços podem tratar informações em países diferentes do seu, incluindo os Estados Unidos. Quando a lei exigir, essas transferências se baseiam em garantias adequadas, como as cláusulas contratuais-tipo da Comissão Europeia.</p>',
      },
      {
        id: 'cookies',
        title: 'Cookies e armazenamento local',
        html: '<p>Não gravamos cookies. O site usa o armazenamento local, o IndexedDB e o cache do seu navegador apenas para os recursos que você usa: lembrar seu tema, idiomas e configurações, manter o Histórico, se você ativá-lo, e permitir que a ferramenta funcione offline. Nada disso é usado para rastreamento ou publicidade, e você pode apagar esses dados a qualquer momento nas configurações do navegador.</p>',
      },
      {
        id: 'your-rights',
        title: 'Seus direitos',
        html: '<p>Dependendo de onde você mora, você pode ter o direito de acessar, corrigir ou excluir suas informações pessoais, de se opor ao uso que fazemos delas ou de restringi-lo, de recebê-las em um formato portátil e de retirar qualquer consentimento que tenha dado. Na UE, no Reino Unido e em jurisdições semelhantes, você também pode apresentar uma reclamação à autoridade de controle de proteção de dados do seu país.</p><p>Se você mora na Califórnia, tem o direito de saber quais informações pessoais coletamos e como as usamos, de nos pedir que as excluamos ou corrijamos e de não sofrer discriminação por exercer esses direitos. Não vendemos nem compartilhamos informações pessoais no sentido em que esses termos são definidos na CCPA.</p><p>Para fazer uma solicitação, envie um e-mail para <a href="mailto:{email}">{email}</a>. Como a ferramenta não coleta suas imagens nem seus textos e não tem contas, normalmente não guardamos nada que identifique você, mas responderemos a todas as solicitações dentro do prazo previsto em lei. Os dados no seu dispositivo estão sob o seu controle: exclua documentos no painel Histórico ou apague os dados deste site no seu navegador.</p>',
      },
      {
        id: 'children',
        title: 'Crianças',
        html: '<p>O site não é direcionado a crianças menores de 13 anos, ou menores de 16 anos no Espaço Econômico Europeu, e não coletamos intencionalmente informações pessoais delas. Se você acredita que uma criança nos enviou informações pessoais, entre em contato conosco e nós as excluiremos.</p>',
      },
      {
        id: 'security',
        title: 'Segurança',
        html: '<p>O site é servido por HTTPS, as imagens são lidas no seu dispositivo por padrão e nosso servidor não armazena nem imagens nem textos. O recurso que busca imagens por link só se conecta a endereços públicos da web, com limites de tamanho e de tempo. Nenhum método de transmissão ou armazenamento é totalmente seguro, mas manter seus dados fora dos nossos servidores é a proteção mais forte que podemos oferecer.</p>',
      },
      {
        id: 'changes',
        title: 'Alterações nesta política',
        html: '<p>Se alterarmos esta política, atualizaremos a data no topo desta página. Se uma alteração afetar de forma substancial o modo como suas informações são tratadas, também a indicaremos no site antes que ela entre em vigor.</p>',
      },
      {
        id: 'contact',
        title: 'Contato',
        html: '<p>Para qualquer assunto sobre privacidade, envie um e-mail para <a href="mailto:{email}">{email}</a> ou use a <a href="/contact">página de contato</a>.</p>',
      },
    ],
  },

  terms: {
    eyebrow: 'Informações legais',
    title: 'Termos e condições de uso',
    lede: 'O acordo entre você e nós quando você usa o {site}. Procuramos deixá-lo o mais curto e simples possível.',
    sections: [
      {
        id: 'agreement',
        title: 'Aceitação destes termos',
        html: '<p>Estes termos se aplicam quando você usa o {site}, em {url} (o “site”), incluindo sua ferramenta de imagem para texto (o “serviço”). O site é operado por {operator} (“nós”). Ao usar o site, você concorda com estes termos. A nossa <a href="/privacy">política de privacidade</a> explica como tratamos as suas informações. Se você não concordar com estes termos, por favor, não use o site.</p>',
      },
      {
        id: 'the-service',
        title: 'O serviço',
        html: '<p>O {site} transforma imagens e PDFs em texto editável. Por padrão, a leitura acontece no seu navegador, e o serviço pode ser usado gratuitamente, sem conta. Podemos adicionar, alterar ou remover recursos a qualquer momento, e não garantimos que o serviço estará sempre disponível, sem interrupções ou livre de erros.</p>',
      },
      {
        id: 'your-content',
        title: 'Suas imagens e textos',
        html: '<ul><li><strong>Eles continuam sendo seus.</strong> Você mantém todos os direitos que tem sobre as imagens que lê e sobre o texto obtido a partir delas. Não reivindicamos a propriedade de nenhum dos dois.</li><li><strong>Não os recebemos</strong> quando são lidos no seu dispositivo. Se você usar a Leitura avançada ou buscar uma imagem a partir de um link, você permite que nós e nossos prestadores de serviços tratemos essa imagem somente na medida necessária para devolver o resultado a você.</li><li><strong>Você precisa ter o direito de usá-los.</strong> Leia apenas imagens que sejam suas ou que você tenha permissão para usar, e respeite os direitos autorais, a privacidade e a confidencialidade de outras pessoas ao usar o texto.</li></ul>',
      },
      {
        id: 'acceptable-use',
        title: 'Uso aceitável',
        html: '<p>Por favor, use o site de forma justa. Você concorda em não:</p><ul><li>usar o serviço para violar qualquer lei ou infringir os direitos de qualquer pessoa;</li><li>processar material ilegal ou que você não tenha o direito de processar;</li><li>enviar solicitações automatizadas ou em massa aos nossos servidores, nem tentar contornar os limites diários ou outras proteções;</li><li>interferir no site, prejudicar o funcionamento dele para outras pessoas ou sondá-lo em busca de vulnerabilidades sem a nossa permissão (se você encontrar um problema de segurança, por favor, informe-o pelo e-mail <a href="mailto:{email}">{email}</a>);</li><li>usar o recurso de busca por link para acessar endereços aos quais você não tem permissão de acesso;</li><li>apresentar o site ou os resultados dele como um serviço seu, nem sugerir que nós endossamos você.</li></ul><p>Os componentes de código aberto da ferramenta podem ser usados conforme suas próprias licenças; estas regras se aplicam ao nosso site e aos nossos servidores.</p>',
      },
      {
        id: 'accuracy',
        title: 'Precisão dos resultados',
        html: '<p>O reconhecimento de texto nunca é perfeito. Os resultados podem conter erros, especialmente com letra à mão, fotos de baixa qualidade, texto pequeno e layouts complexos. As palavras para conferir e o nível de confiança são orientações, não garantias. Sempre revise o texto antes de confiar nele, e tome cuidado redobrado com números, nomes, valores e qualquer coisa que tenha consequências jurídicas, médicas ou financeiras. Você é responsável pelo modo como usa os resultados.</p>',
      },
      {
        id: 'enhanced-reading',
        title: 'Leitura avançada',
        html: '<p>Quando oferecida, a Leitura avançada envia a página que você confirmar, por meio do nosso servidor, ao modelo Claude, da Anthropic. Ela é opcional, limitada a um número de páginas por visitante por dia, e pode ser alterada, limitada ou retirada a qualquer momento. Ao usá-la, você também concorda em não enviar conteúdo que viole a <a href="https://www.anthropic.com/legal/aup" rel="noopener">política de uso da Anthropic</a>.</p>',
      },
      {
        id: 'our-content',
        title: 'Nosso conteúdo e o software de código aberto',
        html: '<p>O design, os textos e os gráficos do site, assim como o nome e o logotipo do {site}, pertencem a nós ou aos nossos licenciadores. Fique à vontade para colocar links para qualquer página. O motor de reconhecimento de texto e outros componentes são software de código aberto fornecido sob suas próprias licenças, que se aplicam a esses componentes; os principais estão listados na <a href="/about">página Sobre nós</a>.</p>',
      },
      {
        id: 'third-parties',
        title: 'Links e outros serviços',
        html: '<p>O site contém links para outros sites e depende de serviços externos, como o jsDelivr e, para a Leitura avançada, a Anthropic. Não temos controle sobre eles e não somos responsáveis pelo conteúdo ou pelas práticas deles; aplicam-se os termos e as políticas de cada um.</p>',
      },
      {
        id: 'no-warranty',
        title: 'Isenção de garantias',
        html: '<p>O serviço é gratuito e fornecido “no estado em que se encontra” e “conforme disponibilidade”. Na máxima extensão permitida por lei, não oferecemos garantias de nenhum tipo, expressas ou implícitas, incluindo garantias de comerciabilidade, adequação a uma finalidade específica, precisão e não violação de direitos.</p>',
      },
      {
        id: 'liability',
        title: 'Limitação de responsabilidade',
        html: '<p>Na máxima extensão permitida por lei, não somos responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, nem por qualquer perda de dados, lucros, receitas ou negócios, decorrentes do seu uso do site ou da impossibilidade de usá-lo. Nossa responsabilidade total por qualquer reivindicação relacionada ao site está limitada a 50 dólares americanos ou ao valor equivalente na sua moeda.</p><p>Nada nestes termos limita ou exclui a responsabilidade que não possa ser limitada ou excluída por lei, como a responsabilidade por fraude, por culpa grave ou dolo, ou por morte ou lesão corporal causada por negligência.</p>',
      },
      {
        id: 'suspension',
        title: 'Suspensão do acesso',
        html: '<p>Podemos limitar, suspender ou bloquear o acesso ao site ou a recursos do servidor, como a Leitura avançada, por exemplo para impedir abusos ou proteger o serviço. Você pode deixar de usar o site a qualquer momento.</p>',
      },
      {
        id: 'changes',
        title: 'Alterações nestes termos',
        html: '<p>Podemos atualizar estes termos periodicamente. Quando isso acontecer, mudaremos a data no topo desta página e, se a alteração for significativa, vamos indicá-la no site antes que ela entre em vigor. Se você continuar usando o site depois de uma alteração, estará aceitando os termos atualizados.</p>',
      },
      {
        id: 'governing-law',
        title: 'Lei aplicável',
        html: '<p>Estes termos são regidos pelas leis do país em que {operator} tem seu estabelecimento, sem considerar as normas de conflito de leis desse país. Se você for consumidor, continua protegido pelas leis obrigatórias do seu país de residência e pode entrar com ações nos tribunais locais.</p>',
      },
      {
        id: 'general',
        title: 'Disposições gerais',
        html: '<p>Se qualquer parte destes termos for considerada inexequível, o restante continua em vigor. Se deixarmos de exercer um direito, isso não significa que renunciamos a ele. Estes termos constituem o acordo integral entre você e nós a respeito do site. Se uma tradução destes termos divergir da versão em inglês, prevalece a versão em inglês.</p>',
      },
      {
        id: 'contact',
        title: 'Contato',
        html: '<p>Dúvidas sobre estes termos? Envie um e-mail para <a href="mailto:{email}">{email}</a> ou use a <a href="/contact">página de contato</a>.</p>',
      },
    ],
  },
} satisfies Legal;

export default pt;
