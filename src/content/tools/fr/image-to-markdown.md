---
title: "Image en Markdown : convertir des captures en .md, gratuit"
description: "Convertissez une image ou une capture d'écran en Markdown avec titres, listes, tableaux et blocs de code pour vos notes, docs, wikis ou prompts d'IA. Dans votre navigateur."
h1: "Convertir une image en Markdown"
intro: "Obtenez du Markdown à partir d'une capture, d'une diapo ou d'une photo de page : les titres deviennent des lignes #, les listes restent des listes, les tableaux deviennent des tableaux Markdown et le code va dans des blocs délimités."
navLabel: "Image en Markdown"
order: 13
preset:
  mode: document
  export: md
  sample: document
  camera: false
steps:
  - "Collez une capture d'écran avec Ctrl+V ou ⌘V, ou déposez une photo ou un scan de la page."
  - "Utilisez le mode Document pour la prose, ou passez « Lire comme » sur Tableau ou Code si l'image contient surtout un tableau ou du code."
  - "Comparez les titres, les éléments de liste et les cellules avec l'image, et corrigez les mots soulignés à vérifier."
  - "Téléchargez un fichier Markdown (.md), ou copiez le texte et collez-le dans vos notes, vos docs ou votre prompt."
faq:
  - q: "Quel type de Markdown est produit ?"
    a: "Du Markdown standard pour les titres et les listes, plus des tableaux à barres verticales et des blocs de code délimités. Ils sont largement pris en charge par les applis de notes, les wikis et les outils de documentation qui utilisent Markdown."
  - q: "Le gras, l'italique et les liens sont-ils repris ?"
    a: "Non. Le résultat marque la structure, c'est-à-dire les titres, les listes, les tableaux et le code, et non le style du texte. Ajoutez l'emphase et les adresses des liens à la main si vous en avez besoin."
  - q: "Puis-je convertir une diapositive ou la photo d'un tableau blanc ?"
    a: "Les diapositives au texte imprimé net fonctionnent bien. L'écriture sur un tableau blanc est manuscrite, donc plus difficile à lire, surtout en cursive liée ; des lettres détachées et soignées donnent le meilleur résultat."
  - q: "Mon texte est-il envoyé quelque part ?"
    a: "Non. L'image est lue sur votre appareil, dans le navigateur, et n'est pas envoyée. L'endroit où vous collez ensuite le Markdown, comme un outil d'IA en ligne, ne dépend que de vous."
  - q: "Peut-il convertir des équations ?"
    a: "Les équations simples imprimées peuvent être lues en mode Maths, qui produit du LaTeX. Les fractions, les matrices et les mises en page complexes demandent généralement des corrections à la main."
related:
  - image-to-word
  - code-screenshot-to-text
  - image-to-excel
  - screenshot-to-text
---

## Pourquoi le Markdown plutôt que du texte brut

Le texte brut perd la structure. Un titre ressemble à n'importe quelle autre ligne, une liste se transforme en phrases détachées, et un tableau devient un fouillis de mots dans le désordre. Le Markdown conserve cette structure avec des caractères ordinaires, si bien qu'elle survit à un collage presque n'importe où.

Le même résultat fonctionne dans les applis de notes qui stockent du Markdown, les sites de documentation, les wikis, les fichiers README et les conversations avec des assistants d'IA. Il reste lisible en texte brut, se modifie facilement à la main, et les changements apparaissent clairement dans un système de gestion de versions.

## Comment chaque partie de la page est écrite

Chaque type de contenu a sa propre forme en Markdown :

| Sur l'image | Dans le Markdown |
| --- | --- |
| Un titre | Une ligne qui commence par un ou plusieurs `#` |
| Des puces | Des lignes qui commencent par `- ` |
| Une liste numérotée | Des lignes qui commencent par `1.`, `2.` et ainsi de suite |
| Un tableau, lu en mode Tableau | Un tableau Markdown avec des barres verticales entre les colonnes |
| Du code, lu en mode Code | Un bloc de code délimité |

La capture d'une courte liste de contrôle en mode Document pourrait donner ceci :

```markdown
# Release checklist

Run these before tagging a new version.

- Freeze the main branch
- Update the changelog

1. Build the package
2. Run the full test suite
```

Les lignes coupées à l'intérieur d'un paragraphe sont jointes, et les mots coupés par un trait d'union en fin de ligne sont recollés : le paragraphe tient sur une seule ligne de Markdown au lieu de plusieurs lignes cassées.

## Les pages qui mélangent prose, tableaux et code

Chaque image est lue dans un seul mode à la fois, choisi séparément pour chaque image. C'est important pour les captures qui placent un paragraphe à côté d'un tableau, ou pour une page de tutoriel avec un exemple de code au milieu. Le mode Document est conçu pour la prose : un tableau lu de cette façon ressort généralement en lignes de texte plutôt qu'en grille.

La solution consiste à découper la page. Faites une capture du texte et une autre du tableau ou du code, réglez chacune sur le bon mode, puis faites-les glisser dans l'ordre. La vue Document complet réunit ensuite toutes les pages dans un seul fichier Markdown, ou dans un ZIP avec un fichier par page.

Pour les images riches en tableaux, [comment extraire un tableau d'une image](/fr/guides/how-to-extract-tables-from-images) explique comment obtenir des lignes et des colonnes justes. Pour les exemples de code, [capture de code en texte](/fr/code-screenshot-to-text) indique ce qu'il faut revérifier, comme les parenthèses et les caractères qui se ressemblent.

## Utiliser le Markdown dans un prompt d'IA

Coller du texte dans une conversation avec un assistant d'IA, plutôt que l'image, vous permet de contrôler ce qu'il voit. Vous pouvez d'abord lire le texte, corriger les mots mal lus, retirer tout ce qui est privé ou hors sujet, et garder les titres, les listes et les tableaux clairement balisés.

Un tableau collé en Markdown conserve ses lignes et ses colonnes sous forme de texte : vous pouvez donc y faire référence directement dans votre question, par exemple « compare la colonne de mars avec celle d'avril ». Une liste numérotée garde ses numéros, si bien que « réécris l'étape 3 » veut dire la même chose pour vous et pour l'assistant.

## Mettre au propre avant de coller

Quelques vérifications rapides rendent le Markdown plus propre :

- **Les niveaux de titre.** Vérifiez que le titre de la page et les titres de section sont aux niveaux voulus. Ajouter ou retirer un `#` ne prend qu'un instant.
- **Les listes numérotées sur plusieurs captures.** Une liste qui continue d'une capture à l'autre peut recommencer à 1 : vérifiez les numéros après avoir combiné les pages.
- **Les retours à la ligne à conserver.** Pour un poème, une adresse ou des paroles de chanson, désactivez la jonction des lignes pour que chaque ligne reste telle quelle.
- **Les erreurs répétées.** Si un mot est mal lu de la même façon partout, « Rechercher et remplacer » le corrige en une fois.

Si vous préférez finir dans un traitement de texte, [image en Word](/fr/image-to-word) vous donne un .docx avec les mêmes titres et listes.
