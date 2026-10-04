---
title: "PNG in testo: estrarre testo da immagini PNG e screenshot"
description: "Converti immagini PNG e screenshot in testo modificabile. I PNG si leggono in modo pulito, la modalità scura è gestita da sola e tutto resta nel tuo browser."
h1: "PNG in testo"
intro: "Trascina un PNG, o incollalo direttamente dagli appunti, e copia il testo. Screenshot, catture in modalità scura e grafiche esportate vengono letti sul tuo dispositivo, senza caricare nulla."
navLabel: "PNG in testo"
order: 11
preset:
  mode: auto
  export: txt
  sample: chat
steps:
  - "Trascina un PNG sulla pagina, aprilo con Ctrl+O (⌘O su Mac) oppure incolla un'immagine copiata con Ctrl+V o ⌘V."
  - "Ritaglia barre degli strumenti, icone e avatar, così nell'immagine resta solo il testo che ti serve."
  - "Se il PNG mostra codice, una tabella o un documento formattato, cambia la modalità di lettura di conseguenza."
  - "Premi Ctrl+Shift+C (⌘+Shift+C su Mac) per copiare tutto il testo, oppure scaricalo come file .txt."
faq:
  - q: "Perché gli screenshot PNG di solito si leggono bene?"
    a: "Il PNG è un formato senza perdita, quindi i contorni delle lettere restano netti invece di riempirsi delle chiazze che aggiunge la compressione JPEG. Uno screenshot PNG di testo chiaro è tra le cose più facili da leggere."
  - q: "Cosa succede a uno sfondo trasparente?"
    a: "Le aree trasparenti vengono appiattite su bianco prima della lettura. Il testo scuro si legge normalmente, ma il testo bianco o molto chiaro su sfondo trasparente scompare: mettilo prima su uno sfondo scuro con un editor di immagini."
  - q: "Legge gli screenshot in modalità scura?"
    a: "Sì. Il Miglioramento automatico inverte il testo chiaro su sfondo scuro prima della lettura e indica quel passaggio. Puoi anche attivare tu Inverti colori dagli strumenti manuali."
  - q: "Perché le icone diventano lettere o simboli a caso?"
    a: "Icone, emoji e simboli dell'interfaccia possono sembrare lettere o segni di punteggiatura a un motore OCR. Ritagliali prima della lettura, oppure elimina i caratteri spuri nell'editor in un secondo momento."
  - q: "Il mio PNG viene caricato da qualche parte?"
    a: "No. Image to Text App legge l'immagine con un motore OCR che funziona nel tuo browser, quindi il file resta sul tuo dispositivo."
  - q: "Posso convertire più file PNG insieme?"
    a: "Sì. Aggiungi fino a 50 immagini per spazio di lavoro, da 25 MB ciascuna. Ognuna diventa una pagina, e puoi copiarle o scaricarle separatamente o come un unico documento."
related:
  - screenshot-to-text
  - jpg-to-text
  - code-screenshot-to-text
  - image-to-markdown
---

Il PNG è il formato in cui la maggior parte degli strumenti di cattura di Windows e Mac salva gli screenshot per impostazione predefinita, ed è quello che quasi tutte le app usano quando esporti come immagine una slide, un grafico, un diagramma o un progetto grafico. Per questo i PNG sono la fonte più comune di testo «intrappolato» in un'immagine: una schermata di impostazioni, una chat, la slide di una presentazione, un grafico con le etichette o la pagina di un report che qualcuno ha esportato per te.

## Perché il PNG è il formato più adatto all'OCR

Il PNG è senza perdita. Ogni pixel viene salvato esattamente com'è, quindi i contorni netti delle lettere sopravvivono, a differenza del JPEG, che li sbava un po' a ogni salvataggio. Per il testo la differenza è concreta: un PNG con caratteri piccoli spesso si legge in modo pulito, mentre un JPEG della stessa immagine produce diverse parole da controllare.

Il punto debole di uno screenshot non è il formato, ma la dimensione. Il testo delle interfacce spesso è piccolo sullo schermo, quindi ogni lettera è alta solo pochi pixel. Il Miglioramento automatico ingrandisce il testo piccolo prima della lettura, ma se stai per fare lo screenshot, ingrandire prima (Ctrl e + nella maggior parte dei browser e delle app, ⌘ e + su Mac) dà al motore più materiale su cui lavorare.

Su alcuni schermi il testo viene disegnato con leggere frange colorate per renderlo più morbido. Non le noti se non ingrandisci molto, e raramente creano problemi. Se uno screenshot viene letto in modo strano, prova Scala di grigi dagli strumenti manuali.

## Sfondi trasparenti

I PNG possono avere aree trasparenti, cosa frequente in loghi, sticker, icone e grafiche esportate da programmi di design. Prima della lettura, Image to Text App appiattisce la trasparenza su bianco, come fa la maggior parte dei visualizzatori di immagini.

Per il testo scuro va benissimo. È un problema per le grafiche pensate per stare su uno sfondo scuro: il testo bianco su sfondo trasparente diventa bianco su bianco, e non resta niente da leggere. Invertire l'immagine dopo non lo recupera, perché ormai lettere e sfondo hanno lo stesso colore. Apri il PNG in un editor di immagini e aggiungi uno sfondo scuro, oppure fanne uno screenshot mentre è visualizzato su una pagina scura, e leggi quello.

## Modalità scura e interfacce colorate

Gli screenshot in modalità scura vengono gestiti in automatico. Il Miglioramento automatico riconosce il testo chiaro su sfondo scuro, lo inverte e indica il passaggio, così sai cosa è successo. Tieni premuto Confronta per vedere l'originale.

Pulsanti colorati, testo segnaposto grigio e testo sopra le sfumature sono più difficili, perché c'è meno contrasto tra lettere e sfondo. Se un'etichetta manca nel risultato, aumenta il Contrasto o prova Bianco e nero, poi leggi di nuovo con Ctrl+Enter (⌘+Enter su Mac).

## Elimina il disordine dell'interfaccia

Gli screenshot di solito contengono più del solo testo: icone, foto profilo, barre degli strumenti, barre di scorrimento ed emoji. Un motore OCR cerca di leggere tutto, quindi una lente di ingrandimento può diventare una «Q» e un segno di spunta una «v». Ritagliare la parte che ti serve è la cosa più utile che puoi fare con uno screenshot PNG.

Gli screenshot delle chat mescolano ai messaggi anche nomi, orari e conferme di lettura. Ognuno di questi elementi finisce su una riga a sé, quindi è facile individuarli ed eliminarli.

## Scegli la modalità giusta per il contenuto del PNG

Image to Text App analizza l'immagine e sceglie una modalità di lettura, con un'etichetta come «Sembra una tabella». Puoi cambiarla in qualsiasi momento senza aggiungere di nuovo l'immagine.

- **Codice da un editor o da un terminale:** la modalità Codice mantiene indentazione e spaziatura e raddrizza le virgolette curve. Vedi [screenshot di codice in testo](/it/code-screenshot-to-text).
- **Una tabella o un foglio di calcolo:** la modalità Tabella ti dà una griglia modificabile da incollare in Excel o Google Sheets. Vedi [immagine in Excel](/it/image-to-excel).
- **Una slide o un documento:** la modalità Documento unisce le righe in paragrafi e mantiene titoli ed elenchi puntati, ideale per scaricare il risultato in [Markdown](/it/image-to-markdown) o Word.

## Limiti da conoscere

Il testo sopra foto o motivi complessi, le scritte stilizzate nelle grafiche e le etichette inclinate (come quelle sull'asse di un grafico) sono le fonti di errore più comuni nei PNG. Le parole su cui il motore aveva dubbi sono sottolineate, così puoi confrontarle con l'immagine. Fai clic su una riga e il punto corrispondente si illumina sull'immagine.

Se hai uno screenshot appena fatto e non un file salvato, puoi saltare del tutto il salvataggio. La pagina [screenshot in testo](/it/screenshot-to-text) spiega come mandare una cattura direttamente negli appunti e incollarla qui.
