---
title: "Come estrarre il testo da uno scontrino per le note spese"
description: "Fotografa gli scontrini termici prima che sbiadiscano, estrai con l'OCR totali, date e righe, verifica i campi chiave e conserva un archivio affidabile."
summary: "Perché gli scontrini sono difficili da leggere, come fotografarli prima che sbiadiscano, quali campi ricontrollare e come inserire l'OCR degli scontrini nella gestione delle spese."
published: 2026-10-03
tool: receipt-ocr
order: 7
---

Gli scontrini sembrano semplici, ma sono tra le cose più difficili da passare all'OCR. La stampa è piccola e spesso sbiadita, l'impaginazione mescola colonne ed etichette, e l'unico numero che ti interessa è in mezzo a una mezza dozzina di altri. Con le giuste abitudini quando li fotografi e un rapido controllo dei campi chiave, puoi trasformare una pila di scontrini in dati di spesa puliti.

## Perché gli scontrini sono difficili da leggere

### La carta termica sbiadisce

La maggior parte degli scontrini di negozi e ristoranti è stampata su carta termica, che si scurisce dove la tocca una testina riscaldata. La stessa chimica la rende fragile: calore, luce del sole, sfregamento e contatto con alcune plastiche e sostanze oleose fanno sbiadire o annerire la stampa. Uno scontrino dimenticato nel portafoglio o in un'auto sotto il sole può diventare difficile da leggere nel giro di qualche mese, e alcuni sbiadiscono parecchio anche prima.

### L'impaginazione è affollata

I nomi degli articoli stanno a sinistra e i prezzi a destra, collegati soltanto da spazi. I nomi sono abbreviati per starci («BNN BIO 1KG»). E in fondo allo scontrino ci sono diversi importi che si somigliano: subtotale, IVA, totale, contante versato, resto e a volte una riga per la mancia. Leggere le parole è solo metà del lavoro; l'altra metà è capire quale numero è il totale.

### La carta non sta piatta

Gli scontrini si arricciano, si piegano e si stropicciano, e ogni piega proietta un'ombra su una riga di stampa.

## Fotografa gli scontrini presto, e ben distesi

- **Fotografali il giorno stesso.** Il momento migliore per fotografare uno scontrino è prima che finisca in tasca. La stampa sbiadita è l'unico problema che il fotoritocco può risolvere solo in parte.
- **Prima distendilo.** Lascia uno scontrino arricciato sotto un libro per un minuto, oppure tieni fermi i bordi con due piccoli oggetti. Evita di tenerlo con le dita: fanno ombra e coprono i bordi.
- **Usa uno sfondo scuro.** Uno scontrino bianco su un tavolo scuro ha bordi netti, il che rende più facili il ritaglio e il raddrizzamento ed evita che lo sfondo si mescoli al testo.
- **Dividi gli scontrini lunghi.** Uno scontrino lungo della spesa rimpicciolito per entrare in una sola foto ha un testo minuscolo. Scatta invece due o tre foto che si sovrappongono oppure, se ti servono solo i totali, fotografa da vicino solo la parte in fondo.
- **Recupera la stampa sbiadita con il contrasto.** Alzare il contrasto o passare al bianco e nero può far riemergere una stampa grigia e debole. Confronta con l'originale per assicurarti che le cifre più chiare non siano sparite del tutto.

I consigli generali su luce, messa a fuoco e angolazione sono in [come ottenere risultati OCR precisi](/it/guides/how-to-get-accurate-ocr-results).

## Cosa estrae l'OCR degli scontrini

Un lettore di scontrini va oltre il testo semplice e prova a dare un'etichetta a ogni informazione. La modalità Scontrino o fattura di Image to Text App, usata dalla pagina [OCR scontrini](/it/receipt-ocr), cerca nome dell'esercente, indirizzo, telefono, email, sito web, numero dello scontrino, data, ora, partita IVA, subtotale, sconto, IVA, mancia, totale, importo pagato e resto, oltre alle righe degli articoli con quantità, descrizione, prezzo unitario e importo. Puoi modificare ogni campo e ogni riga prima di copiare o scaricare.

## I campi da verificare sempre

Per quanto sia buona l'estrazione, alcuni campi meritano ogni volta un secondo sguardo.

- **Totale.** Controlla che abbia preso il totale e non il subtotale, il contante versato o il resto. Il controllo più rapido è un calcolo: subtotale, meno eventuali sconti, più IVA e mancia, deve dare il totale.
- **Data.** 03/04/2026 è il 4 marzo negli Stati Uniti e il 3 aprile in gran parte del mondo. Di solito il problema nasce con gli scontrini dei viaggi all'estero. Anche gli anni a due cifre possono essere letti male.
- **IVA.** Uno scontrino può avere più righe di imposta, oppure l'aliquota accanto all'importo dell'imposta. Assicurati che nel campo IVA sia finito l'importo e non l'aliquota.
- **Nome dell'esercente.** Molti scontrini stampano il nome del negozio come logo, cioè come immagine e non come testo. L'OCR potrebbe trovare la ragione sociale più in basso, oppure niente del tutto. Se serve, scrivilo a mano.
- **Valuta.** I simboli sono piccoli e a volte vengono letti male: € può diventare C o E. Sugli scontrini esteri annota esplicitamente la valuta.
- **Separatori decimali.** Una virgola o un punto poco visibile può sparire e trasformare 12,50 in 1250. Il calcolo di controllo qui sopra di solito lo scopre.
- **Importi scritti a mano.** Le ricevute della carta al ristorante spesso hanno mancia e totale scritti a mano. La scrittura a mano si legge in modo meno affidabile della stampa, quindi controlla quei numeri a occhio.

## Inserire gli scontrini nella gestione delle spese

Un minimo di metodo rende l'OCR degli scontrini molto più veloce a fine mese.

- **Uno scontrino per immagine.** Più scontrini nella stessa foto vengono letti come uno solo, con i campi mescolati.
- **Raggruppa gli scontrini.** Fotografa gli scontrini di una settimana, aggiungili tutti insieme e controllali in una sola volta. In Image to Text App ogni immagine diventa una pagina a sé, così puoi passarle in rassegna una alla volta.
- **Scegli l'esportazione adatta al tuo sistema.** Un foglio di calcolo con una riga per scontrino va bene per la maggior parte delle contabilità personali e delle piccole attività: scarica CSV o Excel. Se devi dividere uno scontrino tra spese personali e di lavoro, tieni anche le righe degli articoli. JSON è adatto agli sviluppatori che importano i dati in un'altra app.
- **Dai ai file nomi coerenti.** Un nome come `2026-05-12 Ferramenta 48,20.jpg` rende facile ritrovare uno scontrino senza aprirlo.
- **Confrontali con l'estratto conto.** Abbinare gli scontrini all'estratto conto della carta o della banca fa emergere sia gli errori dell'OCR sia gli scontrini mancanti.

Le fatture seguono una routine simile con qualche campo in più, come numero di fattura, scadenza e dati del destinatario; la pagina [OCR fatture](/it/invoice-ocr) è pensata per loro. Per un foglio di calcolo che raccoglie molti scontrini, [immagine in Excel](/it/image-to-excel) si occupa della parte tabellare.

## Conserva l'immagine originale

Il testo estratto è una comodità, non il documento. Conserva la foto o la scansione insieme ai dati, perché è l'immagine a dimostrare che lo scontrino era reale e che cosa riportava.

Le regole sull'accettazione delle copie digitali e su quanto a lungo vanno conservati i documenti cambiano da Paese a Paese, e a volte in base al tipo di spesa. Molte amministrazioni fiscali accettano copie elettroniche leggibili, ma in alcuni casi serve l'originale cartaceo. Controlla le indicazioni dell'autorità fiscale o chiedi a un commercialista: questa guida non è una consulenza fiscale o legale. Anche i datori di lavoro hanno spesso regole proprie, per esempio allegare l'immagine a ogni nota spese.

Se devi conservare gli scontrini cartacei, tienili distesi in una busta, lontano da luce e calore. Non plastificarli: il calore della plastificatrice può annerire la carta termica e rendere la stampa illeggibile.

## Scontrini e privacy

Gli scontrini contengono più dati personali di quanto sembri: le ultime cifre della carta, a volte il tuo nome, un indirizzo di consegna, il numero della carta fedeltà. Se per te è importante, scegli uno strumento che legge l'immagine sul tuo dispositivo, e ritaglia o copri quei dati prima di condividere l'immagine con qualcuno. [L'OCR online è privato?](/it/guides/is-online-ocr-private) spiega a cosa fare attenzione.
