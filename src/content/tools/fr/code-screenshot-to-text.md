---
title: "Capture de code en texte : copier du code depuis une image"
description: "Transformez une capture d'écran de code en texte à coller et exécuter. Le mode Code garde l'indentation, redresse les guillemets et nomme le langage. Thèmes sombres compris."
h1: "Copier du code depuis une capture d'écran"
intro: "Collez une capture de code issue d'une vidéo, d'une diapo, d'une conversation ou d'un éditeur et récupérez le code source brut, avec l'indentation intacte, les guillemets redressés et le langage identifié. Les thèmes sombres sont gérés."
navLabel: "Capture de code en texte"
order: 15
preset:
  mode: code
  export: md
  sample: code
  camera: false
steps:
  - "Copiez la capture d'écran dans le presse-papiers et appuyez sur Ctrl+V ou ⌘V n'importe où sur la page."
  - "Vérifiez que « Lire comme » indique Code ; l'étiquette au-dessus du résultat nomme le langage reconnu."
  - "Passez en revue les mots soulignés à vérifier, en surveillant de près les parenthèses, les zéros et les uns."
  - "Copiez le code avec Ctrl+Shift+C ou ⌘+Shift+C, ou téléchargez-le en fichier Markdown."
faq:
  - q: "Quels langages de programmation sont reconnus ?"
    a: "Python, JavaScript, TypeScript, Java, C#, C/C++, Go, Rust, PHP, Ruby, SQL, HTML, CSS, JSON, shell et YAML. Le code dans d'autres langages est tout de même lu avec son indentation ; il n'aura simplement pas d'étiquette de langage."
  - q: "La coloration syntaxique est-elle conservée ?"
    a: "Non, le résultat est du texte brut. Le code coloré est bien lu, et une fois collé dans votre éditeur, c'est la coloration de l'éditeur qui prend le relais."
  - q: "Les numéros de ligne dans la marge seront-ils lus ?"
    a: "Les numéros de ligne affichés dans la marge d'un éditeur peuvent être lus comme faisant partie du code. Recadrez-les avant la lecture, ou supprimez-les ensuite."
  - q: "Peut-il lire du code dans une vidéo mise en pause ?"
    a: "Oui, si l'image est nette. Mettez en pause sur une image en plein écran, dans la meilleure qualité possible : le flou et la compression effacent les petits détails, comme la différence entre un point et une virgule."
  - q: "Mon code est-il envoyé sur un serveur ?"
    a: "Non. La capture est lue sur votre appareil, dans le navigateur : le code privé, ainsi que les clés ou jetons visibles sur la capture, ne sont pas envoyés à un serveur."
related:
  - screenshot-to-text
  - image-to-markdown
  - png-to-text
---

## Pourquoi un OCR classique abîme le code

La reconnaissance de texte généraliste est conçue pour la prose. Elle considère les espaces en début de ligne comme du bruit, fusionne les lignes qui semblent aller ensemble et reproduit les guillemets tels qu'elle les voit. Ça passe pour un paragraphe, mais ça casse le code : Python cesse de fonctionner quand son indentation disparaît, un fichier YAML change de sens, et un seul guillemet typographique copié depuis une diapositive transforme une chaîne en erreur de syntaxe.

Le mode Code lit l'image autrement :

- **L'indentation et les espaces sont conservés**, ligne par ligne, pour que les blocs imbriqués le restent.
- **Les guillemets typographiques sont redressés** : `“hello”` et `‘a’` deviennent `"hello"` et `'a'`.
- **Le langage est nommé** quand il est reconnu, par exemple « On dirait une capture d'écran de code Python », signe rapide que le mode convient à l'image.

Quand vous téléchargez un fichier Markdown, le code est placé dans un bloc délimité, prêt à être déposé dans un README, une page de wiki ou vos notes.

## Thèmes sombres et coloration syntaxique

La plupart des éditeurs et des terminaux utilisent désormais des thèmes sombres, alors que les moteurs d'OCR lisent mieux un texte sombre sur fond clair. L'Amélioration auto détecte le texte clair sur fond sombre et l'inverse avant la lecture : les captures en mode sombre ne demandent aucune préparation de votre part.

La coloration syntaxique ne pose généralement pas de problème non plus. Les points faibles sont les parties peu contrastées d'un thème : des commentaires gris sur fond gris foncé, ou des marqueurs d'espaces très pâles. S'ils ressortent illisibles, essayez les niveaux de gris et un peu plus de contraste, puis passez à la vue nettoyée pour vérifier que rien n'a disparu.

## Les caractères à revérifier

Certains caractères se ressemblent énormément dans de nombreuses polices de code, et une petite capture aggrave les choses. Voici les suspects habituels :

- **0 et O**, surtout dans les noms de variables et les valeurs hexadécimales
- **1, l et I**, qui dans certaines polices ne diffèrent que d'un pixel
- **Les parenthèses et crochets** : `{` et `(`, `]` et `)`, sans oublier les chevrons des génériques et des balises HTML
- **La ponctuation** : `;` et `:`, `,` et `.`, et un accent grave lu comme un guillemet droit
- **Les lettres collées** : `rn` lu comme `m`, ou `cl` lu comme `d`
- **Les tirets bas** qui disparaissent ou deviennent des espaces dans des noms comme `user_id`

Les polices d'éditeur à ligatures dessinent `!=`, `=>` ou `>=` comme un seul symbole, qui risque de ne pas être relu sous la forme des caractères que vous avez tapés. Si la capture vient de votre propre éditeur, désactivez les ligatures avant de la prendre.

La vérification la plus rapide consiste à coller le code dans un éditeur doté d'un linter ou d'un compilateur. Les parenthèses mal appariées et les caractères parasites apparaissent en quelques secondes.

## Vérifier l'indentation en Python et en YAML

Dans les langages où l'indentation a un sens, une ligne décalée d'un niveau peut encore s'exécuter, mais faire autre chose. Un linter ne le détecte pas toujours : comparez donc l'imbrication avec la capture pour chaque bloc important, comme le corps d'une boucle ou une clé imbriquée dans un fichier de configuration.

Cliquer sur une ligne du résultat illumine son emplacement sur l'image, ce qui permet de vérifier rapidement où une ligne commençait vraiment. Si tout un bloc est décalé, il est généralement plus rapide de le corriger dans votre éditeur en indentant le bloc entier plutôt que ligne par ligne.

## Obtenir une capture plus propre

Vous obtiendrez souvent un meilleur résultat en refaisant la capture qu'en corrigeant des caractères à la main ensuite :

- **Zoomez avant de capturer.** Un texte plus grand donne plus de pixels par caractère, ce qui aide surtout pour la ponctuation.
- **Ne capturez que le code.** Laissez de côté les barres latérales, les onglets et les minimaps pour que rien d'autre ne se mélange à vos lignes.
- **Désactivez le retour à la ligne automatique.** Une longue ligne affichée sur deux lignes dans l'éditeur sera lue comme deux lignes.
- **Attention aux tabulations et aux espaces.** Une image ne peut pas montrer lequel des deux l'original utilisait : si votre projet utilise des tabulations, lancez votre formateur après le collage.

Pour les captures d'écran en général, y compris les conversations et les boîtes de dialogue d'erreur, [capture d'écran en texte](/fr/screenshot-to-text) et le guide [comment extraire le texte d'une capture d'écran](/fr/guides/how-to-extract-text-from-a-screenshot) couvrent l'essentiel. Si le code fait partie d'une page de document plus large, [image en Markdown](/fr/image-to-markdown) explique comment séparer la prose et le code en plusieurs captures.
