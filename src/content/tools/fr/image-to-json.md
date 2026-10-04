---
title: "Image en JSON : extraire texte, tableaux et champs de tickets"
description: "Convertissez une image en JSON avec le texte reconnu, les cellules de tableau ou les champs et articles d'un ticket, page par page. Utile pour scripts et saisie de données."
h1: "Convertir une image en JSON"
intro: "Obtenez le texte d'une image en JSON structuré : une entrée par page avec son mode de lecture et son texte, plus les cellules de tableau ou les champs et articles d'un ticket le cas échéant. Tout est lu dans votre navigateur."
navLabel: "Image en JSON"
order: 14
preset:
  mode: auto
  export: json
  sample: receipt
  camera: false
steps:
  - "Ajoutez une ou plusieurs images ; « Lire comme » démarre sur Auto et choisit un mode pour chaque image, que vous pouvez changer."
  - "Passez une page en Tableau ou en Ticket ou facture si vous voulez des cellules ou des champs nommés dans le JSON plutôt que du texte brut."
  - "Corrigez dans l'éditeur le texte, les cellules ou les champs mal lus avant d'exporter."
  - "Téléchargez le JSON d'une seule page, ou passez par la vue Document complet pour obtenir toutes les pages dans un seul fichier."
faq:
  - q: "Puis-je convertir de nombreuses images en JSON à la fois ?"
    a: "Oui. Un espace de travail contient jusqu'à 50 images, de 25 Mo maximum par fichier. Téléchargez depuis la vue Document complet pour obtenir un seul fichier JSON avec toutes les pages, ou un ZIP de fichiers séparés."
  - q: "Quels champs de ticket peuvent apparaître dans le JSON ?"
    a: "Nom du commerce, adresse, téléphone, e-mail, site web, numéro de ticket ou de facture, date, heure, date d'échéance, destinataire de la facture, identifiant fiscal, sous-total, remise, taxe, pourboire, total, montant payé et monnaie rendue. Chaque ligne d'article a une quantité, une description, un prix unitaire et un montant."
  - q: "Le texte conserve-t-il les titres et les listes ?"
    a: "Oui. Pour les pages lues en mode Document ou Écriture manuscrite, le texte utilise un Markdown léger : # pour les titres, - pour les puces et 1. pour les éléments numérotés. Les pages de code gardent le code source tel qu'il a été lu."
  - q: "Le mode Auto choisit-il toujours la bonne structure ?"
    a: "Pas toujours. Il indique ce qu'il pense que l'image contient, comme un tableau ou un ticket de caisse, et vous pouvez changer de mode sans renvoyer l'image. Le JSON suit le mode que vous choisissez."
  - q: "Puis-je obtenir du CSV ou de l'Excel à la place ?"
    a: "Oui. Le même résultat se télécharge en CSV ou en Excel (.xlsx), plus simple si vous n'avez besoin que d'un tableau ou d'un ticket dans un tableur."
related:
  - receipt-ocr
  - invoice-ocr
  - image-to-excel
  - image-to-markdown
---

## Ce que contient le fichier JSON

Le fichier décrit un document composé de pages, une pour chaque image ajoutée, dans l'ordre où vous les avez placées. Chaque page contient les mêmes informations de base, et des détails supplémentaires selon le mode de lecture utilisé :

- **Chaque page :** son titre (tiré du nom du fichier), le mode dans lequel elle a été lue, et son texte.
- **Pages de tableau :** les lignes du tableau, chacune sous forme de liste de cellules, conformes à la grille affichée dans l'éditeur.
- **Pages de ticket et de facture :** une liste de champs, chacun avec une clé, un libellé lisible et une valeur, plus une liste de lignes d'articles.
- **Pages de code :** le nom du langage de programmation, comme Python ou SQL, lorsqu'il a été reconnu.

L'export reprend le résultat tel que vous l'avez laissé dans l'éditeur : les corrections faites avant le téléchargement se retrouvent dans le fichier.

## Un exemple abrégé à partir d'un ticket de caisse

Voici à quoi ressemble une page lue en mode Ticket, réduite à quelques champs et articles :

```json
{
  "title": "lunch-receipt",
  "createdAt": "2026-10-03T12:30:00.000Z",
  "pages": [
    {
      "title": "lunch-receipt",
      "mode": "receipt",
      "text": "Corner Cafe\n2 Flat white 3.50 7.00\n...",
      "receipt": {
        "kind": "receipt",
        "currency": "USD",
        "fields": [
          { "key": "merchant", "label": "Business", "value": "Corner Cafe" },
          { "key": "date", "label": "Date", "value": "03/14/2026" },
          { "key": "tax", "label": "Tax", "value": "1.12" },
          { "key": "total", "label": "Total", "value": "15.12" }
        ],
        "items": [
          { "description": "Flat white", "qty": "2", "unitPrice": "3.50", "amount": "7.00" },
          { "description": "Chicken wrap", "qty": "1", "unitPrice": "7.00", "amount": "7.00" }
        ]
      }
    }
  ]
}
```

Le moyen le plus rapide de voir la structure complète est de lire le ticket d'exemple de cette page et de le télécharger en JSON.

## Quand l'image en JSON est utile

- **Traitement des notes de frais.** Lisez une série de tickets de caisse, vérifiez-les, exportez un seul fichier JSON et laissez votre propre script reporter les dates et les totaux dans un registre ou un tableur. La [page OCR de tickets de caisse](/fr/receipt-ocr) donne des conseils pour obtenir des photos de tickets bien nettes.
- **Saisie de données.** Quand des valeurs issues de formulaires imprimés, de grilles tarifaires ou de factures doivent être reportées dans un autre système, des champs nommés sont plus faciles à mettre en correspondance qu'un bloc de texte.
- **Données de test.** Les développeurs qui créent une fonctionnalité traitant des tickets, des tableaux ou du texte scanné peuvent utiliser une vraie sortie d'OCR, avec ses erreurs réalistes, comme jeu de données pour leurs parseurs et leur code de validation.
- **Archivage structuré.** Conserver le mode et les champs avec le texte rend les anciens scans plus faciles à retraiter plus tard.

Si vous avez besoin de lignes et de colonnes dans un tableur, [image en Excel](/fr/image-to-excel) vous y mène en moins d'étapes.

## Traiter les valeurs dans votre code

Les valeurs sont conservées sous forme du texte lu, exactement tel qu'il est imprimé, et non converties en nombres ou en dates. Une date peut être `03/14/2026` ou `14.03.2026`, et un montant `1,250.00` ou `1.250,00`, selon la provenance du ticket. Analysez-les avec les formats que vous attendez, et signalez tout ce qui ne correspond pas pour qu'une personne le vérifie.

Ne supposez pas non plus que chaque champ est présent. Un ticket sans ligne de pourboire n'a pas de pourboire, et un ticket délavé peut ne pas avoir de date. Utiliser la `key` plutôt que la position dans la liste permet à votre code de continuer à fonctionner quand des champs manquent.

Il est aussi utile de vérifier les totaux dans votre code : les montants des lignes d'articles doivent correspondre au sous-total, et le sous-total plus la taxe, moins une éventuelle remise, doit être égal au total. Un écart est un bon indice qu'un élément a été mal lu.

## Traité dans votre navigateur, sans API

La lecture se fait dans votre navigateur, sur votre propre appareil, avec le moteur open source Tesseract. Les images ne sont pas envoyées, et le fichier JSON est lui aussi créé sur votre appareil.

Cela signifie aussi qu'il n'y a pas d'API à appeler ni de point d'accès serveur auquel envoyer des images. L'image en JSON est une étape manuelle : vous ajoutez des images, vérifiez les résultats et téléchargez le fichier. Elle convient aux tâches où une personne relit de toute façon les données, et ne permet pas de traiter des images automatiquement en arrière-plan. Si vous êtes curieux de savoir ce qui se passe entre l'image et le texte, [comment fonctionne l'OCR](/fr/guides/how-ocr-works) l'explique.
