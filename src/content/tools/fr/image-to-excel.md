---
title: "Image en Excel : transformer un tableau en feuille de calcul"
description: "Transformez la capture ou la photo d'un tableau en feuille de calcul modifiable. Corrigez les cellules, collez dans Excel ou Google Sheets, ou téléchargez XLSX ou CSV."
h1: "Image en Excel"
intro: "Déposez une capture d'écran ou une photo de tableau et obtenez des lignes et des colonnes à modifier, à coller dans Excel ou Google Sheets ou à télécharger en XLSX ou CSV. L'image est lue sur votre appareil, jamais envoyée."
navLabel: "Image en Excel"
order: 6
preset:
  mode: table
  export: xlsx
  sample: table
steps:
  - "Ajoutez une image du tableau, puis recadrez-la pour ne garder que le tableau et sa ligne d'en-tête."
  - "Comparez la grille modifiable avec l'image, en corrigeant les cellules et en ajoutant ou supprimant des lignes et des colonnes si besoin."
  - "Copiez le tableau et collez-le dans Excel ou Google Sheets, où il arrive en lignes et en colonnes."
  - "Ou téléchargez le tableau en fichier Excel (.xlsx) ou CSV."
faq:
  - q: "Le tableau se colle-t-il dans Excel ou Google Sheets comme un vrai tableau ?"
    a: "Oui. Copier depuis la grille place chaque valeur dans sa propre cellule quand vous collez dans Excel ou Google Sheets, au lieu d'un long bloc de texte."
  - q: "Puis-je corriger les erreurs avant l'export ?"
    a: "Oui. Vous pouvez modifier n'importe quelle cellule et ajouter ou supprimer des lignes et des colonnes dans la grille, puis copier ou télécharger le tableau corrigé."
  - q: "Est-ce que ça marche avec les tableaux sans bordures ?"
    a: "Oui. Les colonnes sont déduites des espaces qui les séparent, les bordures ne sont donc pas nécessaires. Les colonnes très rapprochées sont celles qui risquent le plus de devoir être séparées à la main."
  - q: "Que deviennent les cellules fusionnées ?"
    a: "La valeur d'une cellule fusionnée, comme un titre qui couvre plusieurs colonnes, arrive dans une seule cellule. Fusionnez à nouveau les cellules dans votre tableur si vous voulez retrouver la même mise en page."
  - q: "Les formules sont-elles conservées ?"
    a: "Non. Une image ne montre que le résultat des formules, les totaux arrivent donc sous forme de simples nombres. Rajoutez les formules dans votre tableur si vous en avez besoin."
  - q: "Puis-je extraire un tableau d'un PDF ?"
    a: "Oui. Ajoutez le PDF, ouvrez la page qui contient le tableau et passez-la en mode Tableau. Les pages qui contiennent du vrai texte sont reprises directement, et les pages scannées sont lues par OCR."
  - q: "Mes données sont-elles envoyées sur un serveur ?"
    a: "Non. Le tableau est lu dans votre navigateur, sur votre appareil, ce qui compte pour les relevés, les grilles tarifaires et tous les chiffres que vous préférez garder pour vous."
related:
  - pdf-to-text
  - screenshot-to-text
  - invoice-ocr
  - image-to-json
---

Ressaisir un tableau prend du temps, et il est facile de se tromper d'un chiffre. Image en Excel lit le tableau à partir d'une image et vous donne une grille modifiable de lignes et de colonnes, prête à être collée dans un tableur ou téléchargée en fichier.

## Les tableaux qui valent la peine d'être convertis

- **Les tableaux de PDF et de rapports** qui ne se copient pas proprement et ressortent en une seule colonne en vrac quand vous essayez
- **Les tableaux de bord et les pages web** qui affichent des données sans proposer d'export
- **Les grilles tarifaires, barèmes, horaires et plannings**, imprimés ou à l'écran
- **Les classements, résultats et tableaux de championnat sportifs**
- **Les tableaux imprimés** dans des livres, des polycopiés et des manuels, photographiés avec votre téléphone
- **Les relevés de compte et listes de transactions** dont vous avez besoin dans un tableur, sans les envoyer à un site web

## Comment le mode Tableau trouve les lignes et les colonnes

Le mode Tableau aligne les mots en lignes et repère les colonnes grâce aux espaces vides qui descendent entre elles. Un tableau n'a donc pas besoin de bordures ni de quadrillage pour être lu correctement : un alignement propre compte bien plus que les traits.

Quand vous ajoutez une image, Image to Text App reconnaît souvent un tableau tout seul et affiche une étiquette comme « On dirait un tableau ». Sur cette page, le mode Tableau est déjà sélectionné. Si l'image ajoutée contient finalement du texte ordinaire, changez de mode sans ajouter l'image une nouvelle fois.

## Préparer l'image

- **Recadrez sur le tableau.** Les titres, remarques et notes de bas de page au-dessus ou en dessous d'un tableau peuvent fausser la disposition des colonnes. Gardez la ligne d'en-tête et laissez le reste de côté.
- **Redressez les photos de tableaux imprimés.** Les colonnes doivent descendre bien droit sur la page. Pour un tableau photographié en biais, utilisez le redressement aux quatre coins afin que les lignes soient horizontales et les colonnes verticales. L'Amélioration auto corrige d'elle-même une légère inclinaison.
- **Découpez les très grands tableaux.** Si un tableau est large ou long et que le texte devient minuscule, faites deux ou trois captures de sections à une taille lisible, convertissez chacune, puis empilez-les dans votre tableur.

## Les tableaux qui demandent plus d'attention

**Les cellules fusionnées.** Un titre qui couvre plusieurs colonnes, ou une étiquette qui s'étend sur plusieurs lignes, arrive dans une seule cellule, souvent celle de la colonne où il commence. Après le collage, fusionnez à nouveau les cellules dans Excel ou Sheets si vous voulez retrouver la mise en page d'origine.

**Les tableaux sans bordures aux colonnes serrées.** Quand deux colonnes sont très proches, elles peuvent être lues comme une seule. Ajoutez une colonne dans la grille et déplacez-y les valeurs, ou séparez-les ensuite dans votre tableur.

**Le texte qui passe à la ligne dans une cellule.** Une longue description sur deux lignes peut ressembler à deux lignes du tableau. Image to Text App essaie de rattacher ce texte à sa ligne. Si une ligne paraît encore coupée en deux, remontez le texte et supprimez la ligne en trop.

**Les factures et les tickets de caisse.** Si votre image est une facture plutôt qu'un simple tableau, le mode Ticket ou facture est généralement plus adapté. Il lit le nom du commerce, les dates et les totaux en plus des lignes d'articles. Voir [OCR de factures](/fr/invoice-ocr).

## Vérifiez les chiffres avant de vous y fier

Les valeurs dont le moteur n'était pas sûr sont soulignées. Dans les tableaux, les suspects habituels sont 0 et O, 1 et l, 5 et S, 8 et B, ainsi que les virgules et les points, minuscules et faciles à perdre dans une image floue. Les signes moins, et les nombres négatifs écrits entre parenthèses, méritent aussi un second coup d'œil.

Une vérification rapide après le collage : additionnez une colonne dans votre tableur et comparez avec la ligne de total de l'original. Si les deux correspondent, la colonne est très probablement juste.

## XLSX, CSV ou copier-coller

- **Le copier-coller** est le plus rapide quand vous ajoutez le tableau à une feuille déjà ouverte.
- **Excel (.xlsx)** est le format par défaut ici : un fichier qui s'ouvre directement dans Excel.
- **CSV** est un format simple que presque tout peut importer, y compris Google Sheets et les bases de données.

Une chose à savoir sur le CSV : quand Excel ouvre un fichier CSV par un double-clic, il devine le type de chaque colonne. Il supprime les zéros en tête des codes postaux ou des numéros de compte, et peut transformer certaines valeurs en dates. Utilisez l'import « À partir d'un fichier texte/CSV » d'Excel pour définir ces colonnes comme du texte, ou téléchargez plutôt le fichier XLSX.

Le même tableau peut aussi être téléchargé en JSON pour être utilisé dans du code : voir [image en JSON](/fr/image-to-json). Pour aller plus loin sur les tableaux difficiles, lisez [comment extraire un tableau d'une image](/fr/guides/how-to-extract-tables-from-images).
