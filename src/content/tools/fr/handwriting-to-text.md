---
title: "Écriture manuscrite en texte : convertir vos notes"
description: "Transformez des notes manuscrites soignées en texte modifiable dans votre navigateur. Mode Écriture manuscrite, mots à vérifier et conseils honnêtes sur ce qui se lit bien."
h1: "Écriture manuscrite en texte"
intro: "Photographiez ou scannez vos notes manuscrites et obtenez un texte tapé à modifier. Les meilleurs résultats viennent d'une écriture soignée en lettres détachées ; la cursive est plus difficile, et les mots incertains sont soulignés."
navLabel: "Écriture manuscrite en texte"
order: 5
preset:
  mode: handwriting
  export: docx
  sample: handwriting
steps:
  - "Photographiez la page sous une bonne lumière uniforme, ou déposez un scan, avec une page par image."
  - "Gardez le mode Écriture manuscrite sélectionné, puis recadrez ou redressez la page pour ne garder que l'écriture."
  - "Utilisez le bouton de saut pour passer d'un mot souligné au suivant, en comparant chacun avec l'image et en le corrigeant."
  - "Copiez le texte corrigé ou téléchargez-le en document Word."
faq:
  - q: "Peut-il lire l'écriture cursive ?"
    a: "Parfois, mais la cursive liée est l'écriture la plus difficile à lire : attendez-vous à beaucoup de mots à vérifier. Une écriture soignée, en lettres détachées, donne de bien meilleurs résultats."
  - q: "Que change le mode Écriture manuscrite ?"
    a: "Il prépare l'image d'une manière adaptée aux notes manuscrites avant la lecture. Vous pouvez passer à un autre mode à tout moment sans ajouter l'image une nouvelle fois."
  - q: "Comment obtenir de meilleurs résultats avec mes notes ?"
    a: "Écrivez avec un stylo foncé sur du papier uni ou légèrement ligné, photographiez la page à plat et bien de face sous une lumière uniforme, puis recadrez sur l'écriture. Des lettres détachées et des espaces nets entre les mots aident le plus."
  - q: "Peut-il lire des maths écrites à la main ?"
    a: "Le mode Maths est conçu pour des équations simples imprimées : les équations manuscrites doivent en général être saisies à la main."
  - q: "Mes notes sont-elles envoyées sur un serveur ?"
    a: "Non. Vos notes sont lues dans votre navigateur, sur votre appareil. L'historique est désactivé par défaut, et si vous l'activez, il reste dans ce navigateur uniquement."
  - q: "Puis-je convertir un carnet entier ?"
    a: "Oui. Ajoutez jusqu'à 50 images dans un espace de travail, une par page. Faites-les glisser dans l'ordre et utilisez la vue Document complet pour tout exporter dans un seul fichier."
  - q: "Est-ce que ça marche pour l'écriture manuscrite dans d'autres langues ?"
    a: "Vous pouvez choisir la langue de vos notes parmi 47 langues, ou plusieurs à la fois. Quelle que soit la langue, les résultats dépendent beaucoup du soin et de l'espacement de l'écriture."
related:
  - photo-to-text
  - image-to-word
  - pdf-to-text
---

L'écriture manuscrite est ce qu'il y a de plus difficile à transformer en texte, et mieux vaut le dire d'emblée. Les lettres imprimées se ressemblent à chaque fois ; les lettres manuscrites, non, et la cursive liée enchaîne les lettres les unes aux autres sans frontière nette entre elles. Le moteur open source Tesseract qu'utilise Image to Text App a été conçu avant tout pour le texte imprimé. Le mode Écriture manuscrite ajoute un prétraitement adapté aux notes manuscrites, ce qui aide, mais il ne peut pas rendre soignée une écriture brouillonne.

Concrètement : une écriture soignée en lettres détachées donne souvent un premier jet utile qui ne demande que quelques corrections. Une écriture rapide ou liée peut nécessiter tant de corrections qu'il est plus rapide de tout taper vous-même. L'outil vous montre dans quel cas vous êtes.

## Ce qui convient, et ce qui convient moins

La conversion d'écriture manuscrite en texte fonctionne le mieux pour :

- Les notes de cours écrites en lettres détachées
- Les listes de tâches, listes de courses et notes de réunion
- Les fiches recettes et les étiquettes sur des dossiers, des boîtes et des bocaux
- Les formulaires remplis en majuscules d'imprimerie
- Les post-it portant quelques mots bien lisibles

Elle a du mal avec :

- La cursive fluide, comme dans les vieilles lettres, les journaux intimes et les cartes de vœux
- Les notes prises à la hâte, aux lettres serrées
- Les signatures, qui ne sont pas faites pour être lues comme des mots
- Les pages qui mêlent écriture, flèches, schémas et gribouillis
- Les équations, puisque le mode Maths est prévu pour des équations simples imprimées

## Obtenir un meilleur résultat

L'essentiel se joue avant la prise de vue. Si vous écrivez des notes que vous comptez convertir, écrivez en lettres détachées plutôt qu'en attaché, laissez des espaces nets entre les mots et de la place entre les lignes.

- **Utilisez un stylo foncé.** Une encre noire ou bleu foncé sur papier blanc offre le meilleur contraste. Le crayon à papier et les encres claires sont pâles ; augmentez le Contraste ou essayez Noir et blanc si les traits paraissent délavés.
- **Préférez un papier uni ou légèrement ligné.** Le papier quadrillé et les lignes de couleur marquées peuvent s'emmêler avec les lettres.
- **Éclairez la page uniformément.** Évitez que votre propre ombre ne tombe sur la page. L'Amélioration auto uniformise l'éclairage et les ombres, mais elle fonctionne mieux quand la photo est déjà raisonnablement éclairée.
- **Photographiez à plat et bien de face.** Si le carnet était en biais, redressez-le avec les quatre coins avant la lecture. La page [photo en texte](/fr/photo-to-text) donne d'autres conseils pour bien photographier une page.
- **Recadrez sur un seul bloc d'écriture.** Les notes dans la marge, écrites de travers ou glissées entre les lignes, se lisent mieux dans un recadrage séparé.

## Relire ce qui a été lu

Chaque mot dont le moteur n'était pas sûr est souligné, et un bouton passe de l'un à l'autre : inutile de relire toute la page à la chasse aux erreurs. Cliquez sur une ligne de texte et son emplacement s'illumine sur votre photo, ce qui permet de comparer facilement un mot douteux avec ce que vous avez écrit.

Si le même mot est mal lu de la même façon partout, comme un nom ou un terme que vous employez souvent, « Rechercher et remplacer » les corrige tous d'un coup. Le niveau de confiance global (élevé, moyen ou faible) donne une indication rapide. S'il est faible et que la plupart des mots sont soulignés, retaper la page peut être plus rapide que la corriger, et c'est un choix tout à fait raisonnable.

Les options de nettoyage sont utiles pour les notes aussi. « Joindre les lignes » transforme les lignes qui vont jusqu'au bord de la page en vrais paragraphes, et l'option de césure recolle les mots coupés en fin de ligne.

## Et ensuite ?

Sur cette page, les résultats se téléchargent par défaut en document Word, prêts à être mis au propre et complétés. Vous pouvez aussi copier le texte directement dans Google Docs, Word ou une appli de notes, ou le télécharger en texte brut, Markdown ou PDF. Voir [image en Word](/fr/image-to-word) pour en savoir plus sur les documents modifiables.

Pour un carnet ou une pile de pages, photographiez chaque page, faites-les glisser dans l'ordre et utilisez la vue Document complet pour chercher dans l'ensemble et exporter un seul fichier.

Les notes sont souvent personnelles. Image to Text App les lit dans votre navigateur, sur votre appareil, et rien n'est envoyé. Pour un guide plus complet, y compris sur la façon de prévoir des notes destinées à être numérisées, lisez [comment convertir des notes manuscrites en texte](/fr/guides/how-to-convert-handwritten-notes-to-text).
