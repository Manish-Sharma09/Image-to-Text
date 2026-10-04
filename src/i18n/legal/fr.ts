// French legal documents. Translated from en.ts — see the conventions there.
import type { Legal } from './en';

const fr = {
  privacy: {
    title: "Politique de confidentialité",
    intro: "La politique complète, section par section. Le résumé ci-dessus en est une version courte et fidèle ; en cas de divergence, c'est la présente politique qui s'applique.",
    sections: [
      {
        id: 'who-we-are',
        title: "Qui nous sommes",
        html: `<p>La présente politique s'applique à {site}, accessible à l'adresse {url}, et à son outil de conversion d'image en texte, exploités par {operator} (« nous »). Elle explique quelles informations sont traitées lorsque vous utilisez le site, pourquoi, et les choix dont vous disposez. Au sens des lois sur la protection des données telles que le RGPD de l'UE et du Royaume-Uni, nous sommes le responsable du traitement des informations décrites ici.</p><p>Questions ou demandes : <a href="mailto:{email}">{email}</a>.</p>`,
      },
      {
        id: 'information-we-process',
        title: "Informations que nous traitons",
        html: `<p>L'outil est conçu pour nécessiter le moins d'informations possible. Voici tout ce qui est traité, et où.</p><ul><li><strong>Images et texte lus sur votre appareil.</strong> La lecture a lieu dans votre navigateur. Vos images, le texte et vos modifications ne nous sont pas envoyés, et nous ne pouvons pas les voir.</li><li><strong>Lecture améliorée, uniquement si vous la choisissez.</strong> Lorsque cette option est proposée, seule l'image de la page que vous confirmez, redimensionnée à 2 000 pixels au maximum, est envoyée à notre serveur avec le mode de lecture et les langues que vous avez choisis, puis transmise à Anthropic pour être lue. Le texte vous est renvoyé. Nous ne stockons ni l'image ni le texte.</li><li><strong>Images depuis un lien.</strong> Si votre navigateur ne peut pas charger directement le lien d'une image, notre serveur récupère cette image pour vous et vous la renvoie aussitôt, sans la stocker. Pour cela, le serveur reçoit le lien que vous avez collé.</li><li><strong>Données techniques des requêtes.</strong> Comme pour tout site web, notre serveur et notre hébergeur reçoivent les informations que votre navigateur envoie avec chaque requête : votre adresse IP, le type de navigateur, la page demandée et l'heure. Pour appliquer les limites quotidiennes de la Lecture améliorée et de la récupération d'images depuis un lien, nous comptons les requêtes par visiteur à l'aide d'une empreinte (hash) de l'adresse IP, générée avec une clé qui change chaque jour. Les compteurs sont supprimés chaque jour.</li><li><strong>Messages que vous nous envoyez.</strong> Si vous nous écrivez par e-mail, nous recevons votre adresse e-mail et tout ce que vous incluez dans le message.</li><li><strong>Données stockées sur votre appareil.</strong> Vos préférences (comme le thème et les langues), l'historique si vous l'activez, ainsi que les fichiers de l'application et du moteur mis en cache sont conservés dans le stockage de votre navigateur. Ils restent sur votre appareil et ne nous sont jamais envoyés.</li></ul><p>Il n'y a pas de comptes, nous ne vous demandons jamais votre nom, et nous n'utilisons ni publicité, ni cookies de suivi, ni outil de mesure d'audience tiers.</p>`,
      },
      {
        id: 'service-providers',
        title: "Services utilisés pour faire fonctionner le site",
        html: `<p>Quelques services externes contribuent à fournir le site. Aucun d'eux ne reçoit vos images, à l'exception d'Anthropic lorsque vous choisissez la Lecture améliorée.</p><ul><li><strong>Notre hébergeur</strong> fait fonctionner notre serveur et traite les données des requêtes pour notre compte afin de fournir le site.</li><li><strong>jsDelivr.</strong> Les fichiers de langue du moteur de texte, ainsi que le décodeur utilisé pour les photos HEIC d'iPhone dans les navigateurs qui ne savent pas les ouvrir nativement, sont téléchargés depuis le réseau de diffusion de contenu (CDN) jsDelivr. jsDelivr voit votre adresse IP et le fichier demandé, jamais vos images. Consultez la <a href="https://www.jsdelivr.com/terms/privacy-policy" rel="noopener">politique de confidentialité de jsDelivr</a>.</li><li><strong>Anthropic</strong>, uniquement pour la Lecture améliorée et uniquement pour la page que vous confirmez. Le traitement passe par l'API commerciale d'Anthropic ; les conditions commerciales d'Anthropic indiquent qu'elle n'entraîne pas ses modèles sur les données de l'API par défaut. Consultez la <a href="https://www.anthropic.com/legal/privacy" rel="noopener">politique de confidentialité d'Anthropic</a>.</li></ul><p>Les pages, les polices, les scripts et le moteur de texte lui-même sont servis depuis notre propre domaine.</p>`,
      },
      {
        id: 'why-we-process-it',
        title: "Pourquoi nous les traitons",
        html: `<p>Nous traitons des informations uniquement aux fins suivantes, sur les bases juridiques suivantes prévues par le RGPD :</p><ul><li><strong>Pour fournir les fonctionnalités que vous demandez</strong>, comme la Lecture améliorée et la récupération d'une image depuis un lien (exécution d'un contrat, article 6, paragraphe 1, point b), du RGPD).</li><li><strong>Pour assurer la sécurité et le bon fonctionnement du site</strong>, notamment pour prévenir les abus et appliquer les limites quotidiennes (nos intérêts légitimes, article 6, paragraphe 1, point f), du RGPD).</li><li><strong>Pour répondre à vos messages</strong> (notre intérêt légitime à vous répondre, article 6, paragraphe 1, point f), du RGPD).</li><li><strong>Pour respecter nos obligations légales</strong>, lorsqu'une loi l'exige (article 6, paragraphe 1, point c), du RGPD).</li></ul><p>Nous ne vendons jamais vos informations, nous ne les utilisons jamais à des fins publicitaires, et nous n'utilisons jamais vos images ou votre texte pour entraîner des modèles d'IA.</p>`,
      },
      {
        id: 'how-long-we-keep-it',
        title: "Durée de conservation",
        html: `<ul><li><strong>Images et texte lus sur votre appareil :</strong> jamais conservés par nous. Si l'historique est activé, ils restent dans votre navigateur jusqu'à ce que vous les supprimiez.</li><li><strong>Lecture améliorée et images depuis un lien :</strong> rien n'est stocké par notre serveur ; les données n'existent que le temps de traiter la requête. La durée de conservation appliquée par Anthropic est décrite dans sa politique de confidentialité.</li><li><strong>Compteurs de limite quotidienne :</strong> supprimés chaque jour.</li><li><strong>Données techniques des requêtes :</strong> conservées par notre serveur et notre hébergeur uniquement le temps nécessaire à la sécurité et au dépannage, puis supprimées.</li><li><strong>E-mails :</strong> conservés le temps nécessaire pour traiter votre message et son éventuel suivi, puis supprimés.</li></ul>`,
      },
      {
        id: 'sharing',
        title: "Avec qui nous les partageons",
        html: `<p>Nous ne vendons ni ne louons d'informations personnelles, et nous ne les partageons pas à des fins de publicité comportementale intercontextuelle (cross-context behavioral advertising). Nous les partageons uniquement avec les prestataires de services décrits ci-dessus, qui les traitent pour notre compte, ou lorsque la loi l'exige : par exemple, pour donner suite à une demande légale valable, ou pour protéger les droits et la sécurité de nos utilisateurs et du site.</p>`,
      },
      {
        id: 'international-transfers',
        title: "Transferts internationaux",
        html: `<p>Nos prestataires de services peuvent traiter des informations dans des pays autres que le vôtre, notamment aux États-Unis. Lorsque la loi l'exige, ces transferts reposent sur des garanties appropriées, telles que les clauses contractuelles types de la Commission européenne.</p>`,
      },
      {
        id: 'cookies',
        title: "Cookies et stockage local",
        html: `<p>Nous ne déposons pas de cookies. Le site utilise le stockage local, IndexedDB et le cache de votre navigateur uniquement pour les fonctionnalités que vous utilisez : mémoriser votre thème, vos langues et vos réglages, conserver l'historique si vous l'activez, et permettre à l'outil de fonctionner hors ligne. Rien de tout cela ne sert au suivi ni à la publicité, et vous pouvez tout effacer à tout moment dans les paramètres de votre navigateur.</p>`,
      },
      {
        id: 'your-rights',
        title: "Vos droits",
        html: `<p>Selon votre lieu de résidence, vous pouvez avoir le droit d'accéder à vos informations personnelles, de les rectifier ou de les effacer, de vous opposer à leur utilisation ou d'en demander la limitation, de les recevoir dans un format portable, et de retirer tout consentement que vous avez donné. Dans l'UE, au Royaume-Uni et dans les juridictions comparables, vous pouvez également introduire une réclamation auprès de votre autorité de contrôle en matière de protection des données.</p><p>Si vous résidez en Californie, vous avez le droit de savoir quelles informations personnelles nous collectons et comment nous les utilisons, de nous demander de les supprimer ou de les rectifier, et de ne pas faire l'objet d'une discrimination pour avoir exercé ces droits. Nous ne vendons ni ne partageons d'informations personnelles au sens où ces termes sont définis dans le CCPA.</p><p>Pour faire une demande, écrivez à <a href="mailto:{email}">{email}</a>. Comme l'outil ne collecte ni vos images ni votre texte et ne comporte pas de comptes, nous ne détenons généralement aucune donnée permettant de vous identifier, mais nous répondrons à chaque demande dans le délai prévu par la loi. Les données présentes sur votre appareil restent sous votre contrôle : supprimez des documents depuis le panneau Historique, ou effacez les données de ce site dans votre navigateur.</p>`,
      },
      {
        id: 'children',
        title: "Enfants",
        html: `<p>Le site ne s'adresse pas aux enfants de moins de 13 ans, ou de moins de 16 ans dans l'Espace économique européen, et nous ne collectons pas sciemment d'informations personnelles les concernant. Si vous pensez qu'un enfant nous a transmis des informations personnelles, contactez-nous et nous les supprimerons.</p>`,
      },
      {
        id: 'security',
        title: "Sécurité",
        html: `<p>Le site est servi en HTTPS, les images sont lues sur votre appareil par défaut, et notre serveur ne stocke ni images ni texte. La récupération d'images depuis un lien se connecte uniquement à des adresses web publiques, avec des limites de taille et de durée. Aucune méthode de transmission ou de stockage n'est totalement sûre, mais garder vos données hors de nos serveurs est la protection la plus solide que nous puissions offrir.</p>`,
      },
      {
        id: 'changes',
        title: "Modifications de la présente politique",
        html: `<p>Si nous modifions la présente politique, nous mettrons à jour la date indiquée en haut de cette page. Si une modification a une incidence importante sur la manière dont vos informations sont traitées, nous la signalerons également sur le site avant son entrée en vigueur.</p>`,
      },
      {
        id: 'contact',
        title: "Contact",
        html: `<p>Pour toute question relative à la confidentialité, écrivez à <a href="mailto:{email}">{email}</a> ou utilisez la <a href="/contact">page de contact</a>.</p>`,
      },
    ],
  },

  terms: {
    eyebrow: "Juridique",
    title: "Conditions générales d'utilisation",
    lede: "Le contrat entre vous et nous lorsque vous utilisez {site}. Nous l'avons voulu aussi court et clair que possible.",
    sections: [
      {
        id: 'agreement',
        title: "Acceptation des présentes conditions",
        html: `<p>Les présentes conditions s'appliquent lorsque vous utilisez {site}, accessible à l'adresse {url} (le « site »), y compris son outil de conversion d'image en texte (le « service »). Le site est exploité par {operator} (« nous »). En utilisant le site, vous acceptez les présentes conditions. Notre <a href="/privacy">politique de confidentialité</a> explique comment nous traitons vos informations. Si vous n'acceptez pas les présentes conditions, veuillez ne pas utiliser le site.</p>`,
      },
      {
        id: 'the-service',
        title: "Le service",
        html: `<p>{site} transforme des images et des PDF en texte modifiable. Par défaut, la lecture a lieu dans votre navigateur, et le service est gratuit et utilisable sans compte. Nous pouvons ajouter, modifier ou supprimer des fonctionnalités à tout moment, et nous ne garantissons pas que le service sera toujours disponible, ininterrompu ou exempt d'erreurs.</p>`,
      },
      {
        id: 'your-content',
        title: "Vos images et vos textes",
        html: `<ul><li><strong>Ils restent les vôtres.</strong> Vous conservez tous les droits dont vous disposez sur les images que vous lisez et sur le texte que vous en obtenez. Nous ne revendiquons la propriété ni des unes ni de l'autre.</li><li><strong>Nous ne les recevons pas</strong> lorsque la lecture a lieu sur votre appareil. Si vous utilisez la Lecture améliorée ou récupérez une image depuis un lien, vous nous autorisez, ainsi que nos prestataires de services, à traiter cette image uniquement dans la mesure nécessaire pour vous renvoyer le résultat.</li><li><strong>Vous devez avoir le droit de les utiliser.</strong> Ne lisez que des images qui vous appartiennent ou que vous êtes autorisé à utiliser, et respectez le droit d'auteur, la vie privée et la confidentialité d'autrui lorsque vous utilisez le texte.</li></ul>`,
      },
      {
        id: 'acceptable-use',
        title: "Utilisation acceptable",
        html: `<p>Merci d'utiliser le site de manière loyale. Vous vous engagez à ne pas :</p><ul><li>utiliser le service pour enfreindre la loi ou porter atteinte aux droits d'autrui ;</li><li>traiter des contenus illicites, ou que vous n'avez pas le droit de traiter ;</li><li>envoyer des requêtes automatisées ou en masse à nos serveurs, ni tenter de contourner les limites quotidiennes ou d'autres protections ;</li><li>entraver le fonctionnement du site, le perturber pour d'autres personnes, ou y rechercher des vulnérabilités sans notre autorisation (si vous découvrez un problème de sécurité, merci de le signaler à <a href="mailto:{email}">{email}</a>) ;</li><li>utiliser la récupération d'images depuis un lien pour atteindre des adresses auxquelles vous n'êtes pas autorisé à accéder ;</li><li>présenter le site ou ses résultats comme un service vous appartenant, ou laisser entendre que nous vous cautionnons.</li></ul><p>Les composants open source de l'outil peuvent être utilisés selon leurs propres licences ; ces règles concernent notre site et nos serveurs.</p>`,
      },
      {
        id: 'accuracy',
        title: "Précision des résultats",
        html: `<p>La reconnaissance de texte n'est jamais parfaite. Les résultats peuvent contenir des erreurs, en particulier avec l'écriture manuscrite, les photos de faible qualité, les petits caractères et les mises en page complexes. Les mots à vérifier et le niveau de confiance sont des indications, pas des garanties. Relisez toujours le texte avant de vous y fier, et soyez particulièrement attentif aux nombres, aux noms, aux montants et à tout ce qui a des conséquences juridiques, médicales ou financières. Vous êtes responsable de l'usage que vous faites des résultats.</p>`,
      },
      {
        id: 'enhanced-reading',
        title: "Lecture améliorée",
        html: `<p>Lorsqu'elle est proposée, la Lecture améliorée envoie la page que vous confirmez, via notre serveur, au modèle Claude d'Anthropic. Elle est facultative, limitée à un certain nombre de pages par visiteur et par jour, et peut être modifiée, limitée ou retirée à tout moment. En l'utilisant, vous vous engagez également à ne pas soumettre de contenu contraire à la <a href="https://www.anthropic.com/legal/aup" rel="noopener">politique d'utilisation d'Anthropic</a>.</p>`,
      },
      {
        id: 'our-content',
        title: "Notre contenu et les logiciels open source",
        html: `<p>Le design, les textes et les graphismes du site, ainsi que le nom et le logo {site}, nous appartiennent ou appartiennent à nos concédants de licence. Vous pouvez librement créer un lien vers n'importe quelle page. Le moteur de reconnaissance de texte et les autres composants sont des logiciels open source fournis sous leurs propres licences, qui s'appliquent à ces composants ; les principaux sont répertoriés sur la <a href="/about">page À propos</a>.</p>`,
      },
      {
        id: 'third-parties',
        title: "Liens et autres services",
        html: `<p>Le site contient des liens vers d'autres sites web et s'appuie sur des services externes, comme jsDelivr et, pour la Lecture améliorée, Anthropic. Nous ne les contrôlons pas et ne sommes pas responsables de leur contenu ni de leurs pratiques ; leurs propres conditions et politiques s'appliquent.</p>`,
      },
      {
        id: 'no-warranty',
        title: "Absence de garantie",
        html: `<p>Le service est gratuit et fourni « en l'état » et « selon disponibilité ». Dans toute la mesure permise par la loi, nous n'offrons aucune garantie d'aucune sorte, expresse ou implicite, y compris les garanties de qualité marchande, d'adéquation à un usage particulier, d'exactitude et d'absence de contrefaçon.</p>`,
      },
      {
        id: 'liability',
        title: "Limitation de responsabilité",
        html: `<p>Dans toute la mesure permise par la loi, nous ne saurions être tenus responsables des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, ni de toute perte de données, de bénéfices, de revenus ou d'activité, résultant de votre utilisation du site ou de votre impossibilité de l'utiliser. Notre responsabilité totale pour toute réclamation relative au site est limitée à 50 dollars américains ou à l'équivalent dans votre devise.</p><p>Aucune disposition des présentes conditions ne limite ni n'exclut une responsabilité qui ne peut être limitée ou exclue par la loi, telle que la responsabilité en cas de fraude, de faute lourde ou de faute intentionnelle, ou en cas de décès ou de dommage corporel causé par une négligence.</p>`,
      },
      {
        id: 'suspension',
        title: "Suspension de l'accès",
        html: `<p>Nous pouvons limiter, suspendre ou bloquer l'accès au site ou à des fonctionnalités serveur telles que la Lecture améliorée, par exemple pour mettre fin à des abus ou pour protéger le service. Vous pouvez cesser d'utiliser le site à tout moment.</p>`,
      },
      {
        id: 'changes',
        title: "Modifications des présentes conditions",
        html: `<p>Nous pouvons mettre à jour les présentes conditions de temps à autre. Dans ce cas, nous modifierons la date indiquée en haut de cette page et, si une modification est importante, nous la signalerons sur le site avant son entrée en vigueur. Si vous continuez à utiliser le site après une modification, vous acceptez les conditions mises à jour.</p>`,
      },
      {
        id: 'governing-law',
        title: "Droit applicable",
        html: `<p>Les présentes conditions sont régies par le droit du pays d'établissement de {operator}, sans égard à ses règles de conflit de lois. Si vous êtes un consommateur, vous conservez la protection des dispositions impératives du droit du pays où vous résidez, et vous pouvez saisir les juridictions de votre lieu de résidence.</p>`,
      },
      {
        id: 'general',
        title: "Dispositions générales",
        html: `<p>Si une partie des présentes conditions est jugée inapplicable, le reste demeure en vigueur. Le fait que nous n'exercions pas un droit ne vaut pas renonciation à ce droit. Les présentes conditions constituent l'intégralité de l'accord entre vous et nous concernant le site. En cas de divergence entre une traduction des présentes conditions et la version anglaise, la version anglaise prévaut.</p>`,
      },
      {
        id: 'contact',
        title: "Contact",
        html: `<p>Des questions sur les présentes conditions ? Écrivez à <a href="mailto:{email}">{email}</a> ou utilisez la <a href="/contact">page de contact</a>.</p>`,
      },
    ],
  },
} satisfies Legal;

export default fr;
