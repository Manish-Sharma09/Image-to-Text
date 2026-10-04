---
title: "Immagine in Excel: da foto di una tabella a foglio di calcolo"
description: "Trasforma lo screenshot o la foto di una tabella in un foglio di calcolo modificabile. Correggi le celle, incolla in Excel o Google Sheets o scarica XLSX o CSV."
h1: "Immagine in Excel"
intro: "Trascina lo screenshot o la foto di una tabella e ottieni righe e colonne da modificare, incollare in Excel o Google Sheets o scaricare in formato XLSX o CSV. L'immagine viene letta sul tuo dispositivo e mai caricata."
navLabel: "Immagine in Excel"
order: 6
preset:
  mode: table
  export: xlsx
  sample: table
steps:
  - "Aggiungi un'immagine della tabella, poi ritagliala in modo che restino solo la tabella e la riga di intestazione."
  - "Confronta la griglia modificabile con l'immagine, correggendo le celle e aggiungendo o rimuovendo righe e colonne dove serve."
  - "Copia la tabella e incollala in Excel o Google Sheets, dove finisce divisa in righe e colonne."
  - "Oppure scarica la tabella come file Excel (.xlsx) o CSV."
faq:
  - q: "In Excel o Google Sheets si incolla come una vera tabella?"
    a: "Sì. Copiando dalla griglia, ogni valore finisce nella sua cella quando incolli in Excel o Google Sheets, invece di un unico lungo blocco di testo."
  - q: "Posso correggere gli errori prima di esportare?"
    a: "Sì. Puoi modificare qualsiasi cella e aggiungere o rimuovere righe e colonne nella griglia, poi copiare o scaricare la tabella corretta."
  - q: "Funziona con le tabelle senza bordi?"
    a: "Sì. Le colonne vengono individuate dagli spazi vuoti tra l'una e l'altra, quindi i bordi non servono. Le colonne molto vicine sono quelle che più probabilmente andranno separate a mano."
  - q: "Cosa succede alle celle unite?"
    a: "Il valore di una cella unita, come un titolo che occupa più colonne, finisce in una sola cella. Unisci di nuovo le celle nel tuo foglio di calcolo se ti serve lo stesso layout."
  - q: "Le formule vengono mantenute?"
    a: "No. Un'immagine mostra solo i risultati delle formule, quindi i totali arrivano come semplici numeri. Aggiungi di nuovo le formule nel tuo foglio di calcolo se ti servono."
  - q: "Posso estrarre una tabella da un PDF?"
    a: "Sì. Aggiungi il PDF, apri la pagina con la tabella e passala alla modalità Tabella. Le pagine con testo vero vengono prese direttamente, quelle scansionate vengono lette con l'OCR."
  - q: "I miei dati vengono caricati?"
    a: "No. La tabella viene letta nel tuo browser, sul tuo dispositivo: importante per estratti conto, listini prezzi e altre cifre che preferisci tenere per te."
related:
  - pdf-to-text
  - screenshot-to-text
  - invoice-ocr
  - image-to-json
---

Ribattere una tabella è lento ed è facile sbagliare una cifra. Immagine in Excel legge la tabella da un'immagine e ti dà una griglia modificabile di righe e colonne, pronta da incollare in un foglio di calcolo o da scaricare come file.

## Tabelle che vale la pena convertire

- **Tabelle in PDF e report** che non si copiano bene e, quando ci provi, escono come un'unica colonna confusa
- **Dashboard e pagine web** che mostrano dati ma non offrono un'esportazione
- **Listini prezzi, tariffari, orari e calendari**, stampati o sullo schermo
- **Classifiche sportive, risultati e tabelle di campionato**
- **Tabelle stampate** in libri, dispense e manuali, fotografate con il telefono
- **Estratti conto ed elenchi di movimenti** che ti servono in un foglio di calcolo, senza inviarli a un sito web

## Come la modalità Tabella trova righe e colonne

La modalità Tabella allinea le parole in righe e individua le colonne dallo spazio vuoto che scorre verticalmente tra di esse. Questo significa che una tabella non ha bisogno di bordi o linee della griglia per essere letta correttamente: conta molto più un allineamento pulito che le linee.

Quando aggiungi un'immagine, Image to Text App spesso riconosce da solo una tabella e mostra un'etichetta come «Sembra una tabella». In questa pagina la modalità Tabella è già selezionata. Se quello che hai aggiunto si rivela testo normale, cambia modalità senza aggiungere di nuovo l'immagine.

## Preparare l'immagine

- **Ritaglia la tabella.** Titoli, note e note a piè di pagina sopra o sotto una tabella possono confondere la disposizione delle colonne. Tieni la riga di intestazione e lascia fuori il resto.
- **Raddrizza le foto delle tabelle stampate.** Le colonne devono scendere dritte lungo la pagina. Per una tabella fotografata di sbieco, usa il raddrizzamento con i quattro angoli, così le righe tornano orizzontali e le colonne verticali. Il Miglioramento automatico corregge da solo una leggera inclinazione.
- **Dividi le tabelle molto grandi.** Se una tabella è larga o lunga e il testo è minuscolo, fai due o tre screenshot di sezioni a una dimensione leggibile, convertili uno per uno e mettili uno sotto l'altro nel foglio di calcolo.

## Tabelle che richiedono più attenzione

**Celle unite.** Un titolo che occupa più colonne, o un'etichetta che copre più righe, finisce in una sola cella, spesso nella colonna in cui inizia. Dopo aver incollato, unisci di nuovo le celle in Excel o Sheets se ti serve il layout originale.

**Tabelle senza bordi con spazi stretti.** Quando due colonne sono molto vicine, possono essere lette come una sola. Aggiungi una colonna nella griglia e sposta i valori, oppure dividili in un secondo momento nel foglio di calcolo.

**Testo che va a capo dentro una cella.** Una descrizione lunga su due righe può sembrare due righe della tabella. Image to Text App cerca di riportare il testo a capo nella sua riga. Se una riga sembra ancora divisa, sposta il testo in alto ed elimina la riga in più.

**Fatture e scontrini.** Se la tua immagine è una fattura e non una semplice tabella, di solito la scelta migliore è la modalità Scontrino o fattura. Legge il nome dell'esercente, le date e i totali oltre alle singole voci. Vedi [OCR fatture](/it/invoice-ocr).

## Controlla i numeri prima di fidarti

I valori su cui il motore aveva dubbi sono sottolineati. Nelle tabelle i soliti sospetti sono 0 e O, 1 e l, 5 e S, 8 e B, insieme a punti e virgole decimali, minuscoli e facili da perdere in un'immagine sfocata. Vale la pena ricontrollare anche i segni meno e i numeri negativi scritti tra parentesi.

Un controllo veloce dopo aver incollato: somma una colonna nel foglio di calcolo e confrontala con la riga del totale nell'originale. Se coincidono, la colonna è quasi certamente corretta.

## XLSX, CSV o copia e incolla

- **Copia e incolla** è il metodo più rapido quando aggiungi la tabella a un foglio che hai già aperto.
- **Excel (.xlsx)** è il formato predefinito qui: un file che si apre direttamente in Excel.
- **CSV** è un formato semplice che quasi ogni programma può importare, compresi Google Sheets e i database.

Una cosa da sapere sul CSV: quando Excel apre un file CSV con un doppio clic, prova a indovinare il tipo di ogni colonna. Elimina gli zeri iniziali da dati come CAP e numeri di conto e può trasformare alcuni valori in date. Usa l'importazione «Da testo/CSV» di Excel per impostare quelle colonne come testo, oppure scarica il file XLSX.

La stessa tabella si può scaricare anche in JSON per usarla nel codice; vedi [immagine in JSON](/it/image-to-json). Per approfondire le tabelle difficili, leggi [come estrarre tabelle dalle immagini](/it/guides/how-to-extract-tables-from-images).
