---
title: "OCR de factures : extraire les données fournisseurs vers Excel"
description: "Extrayez numéro de facture, dates, destinataire, n° de TVA, totaux et lignes d'articles de vos factures fournisseurs vers Excel ou JSON. Lues sur votre appareil, sans envoi."
h1: "OCR de factures : intégrez vos factures fournisseurs à votre comptabilité"
intro: "Lisez une facture fournisseur scannée, photographiée ou en PDF : numéro, dates d'émission et d'échéance, destinataire, n° de TVA, totaux et lignes d'articles. Vérifiez-les à côté de l'image, puis téléchargez un fichier Excel ou JSON."
navLabel: "OCR de factures"
order: 8
preset:
  mode: receipt
  export: xlsx
  sample: receipt
  camera: false
steps:
  - "Déposez la facture en PDF, en scan ou en photo ; toutes les pages d'un PDF multipage sont lues."
  - "Laissez « Lire comme » sur Ticket ou facture pour que l'en-tête, les totaux et les lignes d'articles soient répartis dans des champs distincts."
  - "Comparez le numéro de facture, la date d'échéance et le total avec l'image, et corrigez ce qui a été mal lu."
  - "Téléchargez un fichier Excel (.xlsx) pour votre registre des factures, ou du JSON si vous traitez vos factures avec vos propres scripts."
faq:
  - q: "Peut-il lire les factures reçues en pièce jointe PDF ?"
    a: "Oui. Si une page du PDF contient déjà du texte sélectionnable, ce texte est repris directement, sans OCR, ce qui évite les erreurs de lecture. Les PDF scannés sont lus par OCR, page par page."
  - q: "Se connecte-t-il à mon logiciel de comptabilité ?"
    a: "Non. Il n'y a aucune connexion directe ni synchronisation avec un logiciel comptable. Vous téléchargez un fichier Excel, CSV ou JSON, ou copiez les champs, et les importez vous-même dans votre logiciel."
  - q: "Combien de factures puis-je traiter à la fois ?"
    a: "Un espace de travail contient jusqu'à 50 images, avec 25 Mo maximum par fichier, et il n'y a pas de limite quotidienne. Pour un lot plus important, procédez en plusieurs fois."
  - q: "Peut-il lire les factures manuscrites ?"
    a: "Les factures imprimées se lisent le mieux. L'écriture manuscrite est plus difficile, surtout liée : attendez-vous à vérifier et à ressaisir les montants écrits à la main."
  - q: "Est-ce que ça marche sur un téléphone ?"
    a: "Oui. Ouvrez la page dans le navigateur de votre téléphone et utilisez l'appareil photo pour photographier une facture papier. Posez-la à plat et cadrez la page en entier."
  - q: "Le même mode fonctionne-t-il pour les tickets de caisse ?"
    a: "Oui. Le mode Ticket ou facture lit aussi les tickets de caisse et les tickets de carte bancaire, y compris le pourboire, le montant payé et la monnaie rendue."
related:
  - receipt-ocr
  - image-to-excel
  - pdf-to-text
  - image-to-json
---

## Pour les factures qui atterrissent sur votre bureau

La comptabilité fournisseurs commence par de la saisie. Une facture fournisseur arrive en pièce jointe PDF, en scan ou sur papier, et avant de pouvoir être validée et payée, ses informations doivent être reportées dans un tableur ou un logiciel comptable. L'OCR de factures lit le document et présente ces informations sous forme de champs à côté de l'image : votre travail consiste alors à vérifier plutôt qu'à ressaisir.

Cette page s'adresse aux dirigeants de petites entreprises, aux comptables et à toute personne qui traite des factures fournisseurs. Si vous vous faites rembourser vos propres dépenses par votre employeur, l'[OCR de tickets de caisse](/fr/receipt-ocr) est plus adapté.

## Les informations relevées sur la facture, et pourquoi elles comptent

Le mode Ticket ou facture recherche les informations dont dépend le traitement des factures fournisseurs :

- **Le numéro de facture.** Votre principale protection contre le double paiement d'une même facture. Vérifiez-le avec soin : un O lu comme un zéro, ou l'inverse, peut laisser passer un doublon.
- **La date de facture et la date d'échéance.** La date d'échéance détermine quand la facture est payée. Certaines factures n'indiquent que les conditions de paiement, comme « 30 jours net », sans date d'échéance imprimée. Dans ce cas, calculez-la vous-même à partir de la date de facture.
- **Le destinataire de la facture.** Il confirme que la facture est adressée à la bonne société, ce qui compte si vous gérez plusieurs entités ou si un fournisseur a encore une ancienne adresse dans ses fichiers.
- **L'identifiant fiscal.** Le numéro de TVA du fournisseur ou un autre numéro fiscal (GST, etc.), que vous devrez peut-être conserver pour récupérer la taxe.
- **Le sous-total, la remise, la taxe et le total**, ainsi que tout montant déjà payé.
- **Les coordonnées du fournisseur** : nom de l'entreprise, adresse, téléphone, e-mail et site web.

Les lignes d'articles arrivent avec une quantité, une description, un prix unitaire et un montant pour chaque ligne. C'est ce qu'il vous faut pour rapprocher une facture d'un bon de commande ou la ventiler entre plusieurs codes analytiques. L'imputation elle-même reste votre décision : l'appli lit ce qui est imprimé et n'attribue ni comptes ni catégories.

## Les contrôles à faire avant d'enregistrer une facture

Les factures imprimées nettes se lisent généralement bien. Une facture est aussi un ensemble de chiffres qui doivent concorder entre eux, ce qui rend les erreurs faciles à repérer si vous les cherchez :

- **Chaque ligne :** quantité × prix unitaire doit être égal au montant de la ligne.
- **L'ensemble des lignes :** la somme des montants doit correspondre au sous-total.
- **Le bloc du bas :** sous-total moins remise plus taxe doit être égal au total.
- **Le format des nombres :** selon le pays, un fournisseur peut écrire 1,250.00 là où vous écririez 1 250,00. Assurez-vous que le séparateur décimal est au bon endroit avant que le montant n'entre dans vos comptes.
- **Les dates :** 04/05 signifie le 4 mai en France, mais le 5 avril aux États-Unis. Lisez la date dans le format du fournisseur, pas dans le vôtre.

L'image s'affiche à côté des champs : quand quelque chose ne colle pas, vous voyez ce qui était réellement imprimé. Un niveau de confiance global (élevé, moyen ou faible) est également indiqué. Un niveau élevé n'est pas une garantie, alors vérifiez quand même le total et la date d'échéance de chaque facture.

## Excel ou JSON pour votre comptabilité

Un fichier Excel (.xlsx) s'ouvre directement dans un tableur, ce qui convient à un registre des factures ou à un classeur que vous importerez ensuite dans votre logiciel comptable. Le JSON convient si vous traitez vos factures avec vos propres scripts ; [image en JSON](/fr/image-to-json) décrit le contenu du fichier. Vous pouvez aussi copier des champs un par un et les coller là où vous en avez besoin.

Pour le lot d'un mois, ajoutez les factures dans un même espace de travail et vérifiez chaque page. Exportez ensuite depuis la vue Document complet, en un seul fichier ou en ZIP avec un fichier par facture.

Certaines factures présentent leurs lignes d'articles dans un tableau dense avec des colonnes supplémentaires, comme la référence, le taux de TVA ou une remise par ligne. Dans ce cas, passez « Lire comme » sur Tableau. Vous obtenez toute la grille en lignes et colonnes modifiables sans renvoyer la facture, comme avec l'outil [image en Excel](/fr/image-to-excel).

## Garder vos factures fournisseurs sur votre appareil

Les factures contiennent des coordonnées bancaires, des numéros fiscaux, des prix et des noms de clients : l'endroit où elles sont traitées compte. Image to Text App les lit dans votre navigateur, sur votre propre appareil, avec le moteur open source Tesseract. Les fichiers ne sont pas envoyés à un serveur.

L'historique est désactivé par défaut. Si vous l'activez, les résultats restent dans ce navigateur uniquement, et vous pouvez en supprimer un ou tout effacer. Un point de vigilance : « Copier le lien » place le texte extrait dans le lien lui-même, donc toute personne à qui vous envoyez ce lien peut lire les informations de la facture. Pour savoir quoi vérifier dans n'importe quel service d'OCR en ligne, consultez [l'OCR en ligne est-il confidentiel ?](/fr/guides/is-online-ocr-private)
