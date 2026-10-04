---
title: "Come estrarre il testo da documenti scansionati e PDF"
description: "Impostazioni dello scanner utili all'OCR, scansioni di più pagine, PDF scansionati e digitali a confronto, PDF ricercabili e archivio dei documenti cartacei."
summary: "Estrai il testo dalle scansioni: le impostazioni che contano, consigli per più pagine, come riconoscere un PDF di sole immagini e come creare un archivio ricercabile dei tuoi documenti."
published: 2026-10-03
tool: pdf-to-text
order: 6
---

Uno scanner scatta una foto della pagina. Anche quando salva quella foto come PDF, la pagina resta un'immagine, spesso chiamata PDF immagine, e non puoi selezionarne, cercarne o copiarne il testo finché l'OCR non l'ha letto. Ottenere un buon testo da una scansione comincia dallo scanner, e le scelte che fai lì sono difficili da correggere dopo.

Questa guida parla delle impostazioni dello scanner, dei documenti di più pagine, di come capire che tipo di PDF hai e di come tenere un archivio ricercabile.

## PDF scansionato o PDF digitale?

Non tutti i PDF hanno bisogno dell'OCR. Un PDF esportato da Word o da una pagina web contiene vero testo, e copiarlo dà un risultato esatto. Qualche controllo veloce ti dice quale tipo hai:

- **Prova a selezionare una parola.** Se riesci a evidenziare le singole parole, la pagina ha un livello di testo. Se l'intera pagina si evidenzia come un unico blocco, o non succede niente, è un'immagine.
- **Cerca una parola che vedi.** Se Ctrl+F (⌘F su Mac) non trova nulla, non c'è testo utilizzabile.
- **Ingrandisci molto.** Il testo digitale resta nitido a qualsiasi zoom. Il testo scansionato diventa sfocato o a quadretti.

Fai attenzione anche ai PDF misti. Un contratto può avere pagine scritte al computer seguite da una pagina firmata e scansionata, oppure una relazione può avere allegati scansionati.

Anche un livello di testo può essere difettoso. Alcuni PDF sono passati dall'OCR anni fa e hanno un livello di testo invisibile impreciso, quindi copiando ottieni parole storpiate. Altri usano font che, copiati, diventano caratteri senza senso. In questi casi tratta la pagina come un'immagine: esportala come immagine dal tuo lettore PDF e leggi quella.

Image to Text App legge tutte le pagine di un PDF. Le pagine che hanno già testo selezionabile vengono prese direttamente senza OCR e si leggono solo le pagine immagine, così un documento misto esce il più preciso possibile. La pagina [PDF in testo](/it/pdf-to-text) è impostata proprio per questo.

## Impostazioni dello scanner che aiutano l'OCR

### Risoluzione

300 dpi è lo standard abituale per il testo, ed è il minimo raccomandato dalla documentazione di Tesseract. Per caratteri molto piccoli, come note a piè di pagina, clausole legali scritte in piccolo o bugiardini dei farmaci, scansiona tra 400 e 600 dpi. Andare oltre per un testo di dimensioni normali rende soprattutto i file più pesanti, senza migliorare il risultato.

### Modalità colore

Scegli la scala di grigi e non il bianco e nero. La modalità bianco e nero di uno scanner applica una soglia fissa al momento della scansione: le lettere deboli si spezzano, quelle in grassetto si riempiono, e i dettagli persi non si recuperano più. La scala di grigi conserva quelle informazioni, così il software OCR può decidere che cosa è inchiostro e che cosa è carta.

Usa il colore quando il colore ha un significato: passaggi evidenziati, timbri colorati, moduli con campi colorati o pagine con foto che vuoi conservare. L'evidenziatore in particolare può diventare un blocco grigio scuro in una scansione in bianco e nero, nascondendo proprio il testo che segnalava.

### Formato del file

PDF e TIFF sono buone scelte per i documenti di più pagine, PNG per le pagine singole. Evita di salvare in JPEG molto compresso, che alcuni scanner usano per le impostazioni «file piccolo». La compressione JPEG lascia sbavature attorno ai bordi delle lettere, e chi ne soffre di più è il testo piccolo.

### La parte fisica

Pulisci il vetro dello scanner, perché un singolo granello si ripete su ogni pagina. Per la carta sottile stampata su entrambi i lati, metti un foglio di carta nera dietro la pagina per evitare che il retro traspaia.

## Usare il telefono come scanner

Per le scansioni occasionali il telefono va benissimo. L'iPhone ha uno scanner di documenti integrato nelle app Note e File, e molti telefoni Android ne offrono uno nella fotocamera o in un'app per documenti. Queste modalità trovano i bordi della pagina, correggono la prospettiva e salvano un PDF, che di solito è meglio di una semplice foto. Per la parte fotografica, cioè luce, angolazione e messa a fuoco, vedi [come ottenere risultati OCR precisi](/it/guides/how-to-get-accurate-ocr-results).

## Scansionare documenti di più pagine

- **Usa l'alimentatore automatico per i fogli sciolti.** Togli punti metallici e graffette, sfoglia la pila perché le pagine non restino attaccate e attiva la scansione fronte-retro (duplex) per gli originali stampati su due lati.
- **Conta le pagine.** Ogni tanto l'alimentatore salta una pagina o ne prende due insieme. Confronta il numero di pagine della scansione con l'originale prima di mettere via la carta.
- **Scansiona i libri sul piano di vetro.** Premi sul dorso perché le righe vicino alla rilegatura non si incurvino, e aspettati un'ombra nel margine interno. La correzione dell'illuminazione può uniformare l'ombra, ma non può raddrizzare le righe curve.
- **Dai ai file nomi che si ordinano bene.** Se scansioni le pagine come immagini separate, numerale 001, 002, 003 e non 1, 2, 3. Altrimenti la pagina 10 finisce prima della pagina 2.

In Image to Text App ogni pagina di un PDF o di un TIFF multipagina diventa una pagina dell'area di lavoro. Puoi trascinare le pagine nell'ordine giusto, rileggere qualsiasi pagina e usare la vista Documento intero per cercare in tutte le pagine ed esportare il risultato in un unico file.

## Creare un PDF ricercabile

Un PDF ricercabile è la scansione originale con un livello di testo invisibile posato esattamente sopra le parole. All'aspetto è identico alla scansione, ma puoi cercarci dentro, selezionare il testo e copiarlo. Anche la ricerca file del computer e molti servizi cloud riescono a trovarlo in base al contenuto.

Spesso è il formato migliore per conservare un documento, perché mantiene tutto ciò che mostrava la carta, comprese firme, timbri e impaginazione, e ti permette comunque di ritrovarlo cercando una parola al suo interno. Se devi modificare il testo, esporta invece in Word o in testo semplice. Lo strumento [immagine in PDF](/it/image-to-pdf) crea PDF ricercabili a partire dalle immagini.

Un'avvertenza: gli errori dell'OCR nel livello nascosto non si vedono. Se un nome è stato letto male, cercandolo non troverai quella pagina. Per le ricerche importanti prova un termine più corto, come le prime lettere di un cognome, che ha più probabilità di sopravvivere a un singolo carattere sbagliato.

## Archiviare i documenti cartacei

Qualche abitudine mantiene utile per anni un archivio di scansioni:

- **Fai iniziare i nomi dei file con la data.** Un nome come `2026-03-14 Bolletta luce marzo.pdf` si ordina automaticamente per data in qualsiasi cartella.
- **Tieni le cartelle poco profonde.** Poche cartelle generiche, come Casa, Tasse, Salute e Lavoro, si consultano meglio di un albero profondo.
- **Valuta il PDF/A per la conservazione a lungo termine.** Il PDF/A è una versione del PDF standardizzata ISO e pensata per l'archiviazione. Incorpora tutto ciò che serve a visualizzare il file, come i font, così il documento dovrebbe aprirsi correttamente anche tra molti anni. Molti programmi di scansione e strumenti PDF possono salvare in questo formato.
- **Fai il backup.** Una regola pratica diffusa è tenere tre copie, su due tipi diversi di supporto, di cui una conservata altrove.
- **Conserva la carta quando la carta conta.** Testamenti, atti di proprietà, documenti notarili e alcuni documenti fiscali e legali potrebbero dover essere conservati in originale. Le regole cambiano da Paese a Paese e da documento a documento, quindi informati prima di distruggere qualcosa di importante.

I documenti scansionati sono spesso anche i file più delicati che si possiedono: documenti d'identità, estratti conto, referti medici. Prima di passarli in un qualsiasi strumento online, leggi [l'OCR online è privato?](/it/guides/is-online-ocr-private) per sapere cosa controllare.
