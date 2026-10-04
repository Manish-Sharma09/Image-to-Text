---
title: "Come funziona l'OCR, spiegato in modo semplice"
description: "Come l'OCR trasforma un'immagine in testo: pulizia dell'immagine, analisi del layout, righe e parole, rete neurale, dizionari e punteggi di confidenza."
summary: "Un giro in parole semplici dentro un motore OCR, dalla pulizia dell'immagine al riconoscimento con le reti neurali, e il motivo per cui confonde lo 0 con la O."
published: 2026-10-03
tool: photo-to-text
order: 4
---

L'OCR, sigla di *optical character recognition* (riconoscimento ottico dei caratteri), è un software che guarda un'immagine e capisce quali caratteri contiene. Sembra semplice, finché non ricordi cos'è un'immagine: una griglia di puntini colorati. Nel file non c'è scritto da nessuna parte «questa è la lettera A» o «questa riga viene prima di quella». Ogni cosa va dedotta.

Questa guida ti mostra cosa fa un motore OCR moderno, prendendo come esempio Tesseract. Tesseract è un motore open source molto diffuso, sviluppato in origine da Hewlett-Packard e poi mantenuto con il supporto di Google, ed è il motore che [Image to Text App](/it) usa nel tuo browser. Gli altri motori cambiano nei dettagli, ma le fasi sono più o meno le stesse.

## Le fasi in sintesi

1. Pulire l'immagine perché il testo risalti.
2. Analizzare il layout per trovare i blocchi di testo e il loro ordine.
3. Dividere i blocchi in righe e le righe in parole.
4. Riconoscere i caratteri di ogni riga.
5. Usare la conoscenza della lingua per scegliere tra le letture più probabili.
6. Assegnare a ogni parola un punteggio di confidenza e restituire il risultato.

## Pulire l'immagine

Il riconoscimento funziona meglio con lettere nitide e scure su uno sfondo chiaro e uniforme, quindi il primo compito è avvicinarsi il più possibile a questa situazione.

La **binarizzazione** decide, per ogni pixel, se è inchiostro o carta, e trasforma l'immagine in bianco e nero puro. L'approccio classico, il metodo di Otsu, osserva la distribuzione della luminosità nell'intera immagine e sceglie l'unica soglia che separa meglio i due gruppi. Sulle scansioni pulite funziona bene. Su una foto fatta col telefono, con un'ombra su un angolo, una soglia unica non basta: la parte in ombra diventa tutta nera, oppure quella più chiara perde le lettere più tenui. I metodi adattivi risolvono il problema confrontando ogni pixel con l'area circostante invece che con l'intera pagina.

Il **raddrizzamento** (*deskewing*) rileva se le righe di testo sono inclinate e ruota l'immagine finché non scorrono in orizzontale. Bastano pochi gradi di inclinazione perché una riga sconfini in quella sopra, rovinando le fasi successive.

Altri passaggi di pulizia eliminano puntini e polvere dello scanner, ingrandiscono il testo molto piccolo perché le lettere abbiano abbastanza pixel e invertono il testo chiaro su fondo scuro. La documentazione di Tesseract consiglia, per le versioni attuali, testo scuro su sfondo chiaro: per questo molti strumenti invertono gli screenshot in modalità scura prima di leggerli.

## Analizzare il layout

Poi il motore capisce cosa c'è nella pagina: blocchi di testo, immagini, linee, colonne separate. Deve anche decidere l'ordine di lettura.

È la fase che produce alcuni degli errori più disorientanti. Se il motore non vede lo spazio tra due colonne, le legge di fila come se fossero una, mescolando mezze frasi dell'una e dell'altra. Una didascalia può fondersi con il paragrafo sottostante. Una tabella può uscire come un miscuglio di parole in un ordine solo approssimativamente giusto.

Di solito i motori permettono al software che li usa di indicare che tipo di contenuto aspettarsi: una pagina intera, un singolo blocco, una sola riga o testo sparso. Scegliere l'aspettativa giusta conta: leggere uno scontrino come se fosse la pagina di un libro può dare risultati peggiori che leggerlo come testo sparso.

## Trovare righe e parole

All'interno di ogni blocco, il motore individua le righe di testo. Cerca file di inchiostro allineate su una linea di base comune e misura le proporzioni della riga: l'altezza delle minuscole come la x e fin dove arrivano le aste ascendenti (b, d, h) e discendenti (g, p, q).

Le parole si ricavano dalla spaziatura. Lo spazio tra due parole di solito è più ampio di quello tra due lettere. Una spaziatura molto stretta può fondere due parole in una, mentre quella dilatata del testo giustificato può spezzare una parola in due.

## Riconoscere i caratteri

I motori OCR più vecchi, compreso Tesseract fino alla versione 3, tagliavano ogni parola in singoli caratteri e confrontavano ogni forma con quelle imparate. Il metodo va in crisi quando le lettere si toccano, come in una «rn» sbavata, o quando una stampa sbiadita spezza una lettera in più frammenti.

Tesseract 4, uscito nel 2018, ha introdotto un riconoscitore basato su una rete neurale LSTM (*long short-term memory*). Invece di ritagliare le lettere, legge un'intera riga come una sequenza: la percorre e a ogni passo stima quanto è probabile ciascun carattere possibile. Siccome la rete si porta dietro le informazioni lungo la riga, può usare le forme che precedono e seguono un carattere per capire cos'è, un po' come fai tu quando decifri una lettera sbavata guardando quelle vicine.

La rete impara dagli esempi. I modelli ufficiali di Tesseract sono stati addestrati su grandi quantità di testo riprodotto in molti caratteri tipografici, con un modello distinto per ogni lingua o sistema di scrittura. Ecco perché scegliere la lingua giusta è importante: un modello addestrato sull'inglese non ha idea di che aspetto abbia una lettera devanagari e potrebbe non aspettarsi lettere accentate come é o ñ.

## Conoscenza della lingua e dizionari

Il riconoscitore non produce un'unica risposta. Produce molte letture possibili di ogni riga, ciascuna con la sua probabilità. Una ricerca sceglie poi la migliore, aiutata da un elenco di parole e dalla conoscenza delle combinazioni di lettere più comuni in quella lingua.

Questa spinta corregge molto. Un «cbe» sfocato diventa «che» perché «che» è una parola e «cbe» no. Ma può anche giocarti contro. Codici prodotto, cognomi, abbreviazioni e parole di un'altra lingua non compaiono nell'elenco, quindi il motore ha meno aiuto e sbaglia più facilmente.

## I punteggi di confidenza

Per ogni parola, il motore indica anche quanto è sicuro, in base a quanto nettamente la lettura preferita ha battuto le alternative. Gli strumenti usano questo dato per segnalarti le parole da controllare.

Considera la confidenza un indizio, non una garanzia. Un punteggio basso di solito significa che qualcosa non va. Un punteggio alto di solito significa che è tutto giusto, ma un motore può sbagliare con grande sicurezza. Una «O» nitida dentro un numero di serie, dove doveva esserci uno zero, a lui sembra perfettamente a posto.

## Perché si verificano gli errori

La maggior parte degli errori OCR rientra in pochi schemi:

- **Caratteri simili.** 0 e O, 1 e l e I, 5 e S, 8 e B. In molti caratteri senza grazie, la I maiuscola e la l minuscola sono identiche, tanto che anche a una persona serve il contesto.
- **Coppie di lettere simili.** «rn» letto come «m», «cl» come «d», «vv» come «w», e viceversa.
- **Punteggiatura.** Virgole e punti sono minuscoli: un granello di polvere diventa un punto e una virgola decimale sbiadita sparisce.
- **Nessun contesto su cui contare.** Codici, ID, numeri di telefono e indirizzi email non hanno parole del dizionario intorno, quindi ogni carattere è a sé.
- **Errori di layout.** Colonne lette di traverso, didascalie fuse con il testo, righe di una tabella rimescolate.
- **Testo che il modello non ha mai imparato.** Caratteri decorativi, loghi stilizzati, testo verticale e soprattutto la scrittura a mano.

Quasi tutti questi errori diventano molto più rari con un'immagine più nitida, più grande e più dritta. La guida [come ottenere risultati OCR precisi](/it/guides/how-to-get-accurate-ocr-results) spiega cosa cambiare.

## Cosa succede dopo il riconoscimento

L'output grezzo di un motore è un elenco di parole, ognuna con la sua posizione nell'immagine e un punteggio di confidenza. Le app ricostruiscono la struttura a partire da quelle posizioni. Le parole allineate in colonne verticali diventano una tabella, come spiegato in [come estrarre tabelle dalle immagini](/it/guides/how-to-extract-tables-from-images). Le righe con una data o un totale dopo un'etichetta diventano i campi di uno scontrino. La distanza di ogni riga dal margine sinistro diventa l'indentazione nel codice.

## OCR, ICR, HTR e modelli di IA

Potresti imbatterti in alcuni termini affini. Tradizionalmente, **OCR** indica il testo stampato. **ICR** (*intelligent character recognition*) indica la lettura di caratteri scritti a mano in stampatello, di solito uno per casella in un modulo. **HTR** (*handwritten text recognition*) indica la lettura della scrittura a mano continua, in genere con reti neurali addestrate su campioni di scrittura. Le differenze pratiche sono spiegate in [come convertire appunti scritti a mano in testo](/it/guides/how-to-convert-handwritten-notes-to-text).

Alcuni sistemi di IA più recenti leggono il testo generandolo a partire dall'immagine con un modello linguistico di grandi dimensioni. Se la cavano bene con materiale disordinato, ma siccome generano testo scorrevole, un errore può avere l'aspetto di una parola perfettamente plausibile che nell'immagine non c'è. Qualunque sistema usi, confronta con l'originale le parti che contano.
