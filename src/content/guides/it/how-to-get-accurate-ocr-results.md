---
title: "Come ottenere un OCR preciso da foto, scansioni e screenshot"
description: "Rimedi pratici a un OCR impreciso: testo e risoluzione, luce, angolazione, contrasto, messa a fuoco, ritaglio, lingua e modalità giuste, revisione."
summary: "La maggior parte degli errori OCR nasce dall'immagine. Cosa cambiare prima della lettura, quali impostazioni contano, cosa fa il Miglioramento automatico e come rivedere in fretta il risultato."
published: 2026-10-03
tool: photo-to-text
order: 8
---

Quando l'OCR sbaglia il testo, il motore raramente è il problema principale. Di solito è l'immagine a dargli troppo poco su cui lavorare: lettere troppo piccole, un'ombra sulla pagina, un'angolazione storta o una leggera sfocatura. Un minuto dedicato all'immagine ti fa risparmiare molto più tempo di quanto ne perderesti a correggere il testo.

I consigli qui sotto sono più o meno in ordine di impatto. Per capire perché ognuno conta, [come funziona l'OCR](/it/guides/how-ocr-works) spiega che cosa fa il motore con la tua immagine.

## Fai in modo che il testo sia abbastanza grande

Conta quanti pixel ha ogni lettera, non quanti megapixel ha la fotocamera. Una foto ad alta risoluzione di un'intera scrivania può comunque lasciare il testo di un singolo foglio alto pochi pixel.

- **Riempi l'inquadratura con il testo.** Avvicina la fotocamera finché l'area che ti serve occupa quasi tutta l'immagine.
- **Ingrandisci lo schermo prima dello screenshot.** Ingrandisci prima la pagina o il documento, poi cattura. Anche gli screenshot fatti su un display ad alta risoluzione si leggono meglio dello stesso contenuto su uno a bassa risoluzione.
- **Non rimpicciolire le immagini strada facendo.** Alcune app di messaggistica e programmi di posta comprimono o ridimensionano le immagini. Invia il file originale, oppure trasferiscilo direttamente.
- **Scansiona a 300 dpi.** Per caratteri molto piccoli aiutano 400–600 dpi. Le impostazioni sono spiegate in [come estrarre il testo da documenti scansionati](/it/guides/how-to-extract-text-from-scanned-documents).

Ingrandire dopo un'immagine piccola aiuta un po', perché i motori OCR lavorano meglio quando le lettere non sono minuscole. Ma non può aggiungere dettagli che la fotocamera non ha mai catturato.

## Illumina la pagina in modo uniforme

- **Usa una luce morbida.** La luce del giorno da una finestra o la lampada del soffitto vanno bene. Il sole diretto crea ombre nette e zone troppo chiare.
- **Tieni la tua ombra fuori dalla pagina.** Telefono e mani bloccano la luce dall'alto. Mettiti in modo che la luce arrivi di lato e non da dietro di te.
- **Evita il flash sulla carta lucida.** Crea una macchia bianca che cancella il testo sottostante. Se il flash ti serve, inclina leggermente il telefono in modo che il riflesso si sposti dal testo, poi raddrizza la foto.

L'illuminazione non uniforme è uno dei motivi principali per cui una parte della pagina viene letta bene e un'altra esce senza senso: la zona più scura viene scambiata per inchiostro.

## Scatta in posizione frontale

Tieni il telefono parallelo alla pagina. Quando è inclinato, il lato lontano della pagina si rimpicciolisce, le righe convergono e le lettere su un bordo diventano più piccole che sull'altro.

Se non puoi evitare un'angolazione, uno strumento di raddrizzamento con i quattro angoli (correzione della prospettiva) riporta la pagina a un rettangolo: trascini una maniglia su ogni angolo della pagina. Un'immagine di lato o capovolta va solo ruotata. Le pagine dei libri che si incurvano verso il dorso sono più difficili, perché il raddrizzamento non può appiattire una curva, quindi premi il libro più piatto che puoi prima di scattare.

## Regola bene il contrasto

I motori OCR leggono meglio il testo scuro su sfondo chiaro.

- **Il testo chiaro su sfondo scuro**, come negli screenshot in modalità scura, nelle slide e nelle insegne, va invertito prima della lettura.
- **Il testo e gli sfondi colorati** spesso si leggono meglio in scala di grigi, soprattutto con combinazioni come rosso su rosa o blu su grigio.
- **La stampa sbiadita o chiara** migliora con più contrasto, oppure con il bianco e nero se lo sfondo è irregolare.
- **Gli sfondi con motivi**, come le trame di sicurezza di assegni e certificati, a volte si possono eliminare con il bianco e nero, che toglie i motivi chiari e mantiene il testo scuro.

## Mantieni l'immagine nitida

- **Tocca il testo per metterlo a fuoco** prima di scattare, soprattutto quando la pagina è vicina all'obiettivo.
- **Stai fermo.** Appoggia i gomiti sul tavolo. Con poca luce la fotocamera usa un tempo di scatto più lento, quindi più luce significa anche meno mosso.
- **Controlla prima di andartene.** Ingrandisci la foto sul telefono. Se le lettere sono morbide a grandezza piena, scattane un'altra finché hai ancora la pagina davanti.

La nitidezza aiuta con un'immagine leggermente morbida, e la riduzione del rumore con le foto granulose scattate con poca luce. Nessuna delle due può salvare un vero mosso.

## Ritaglia ciò che ti serve

Tutto quello che c'è nell'immagine è qualcosa che il motore deve interpretare.

- **Elimina il superfluo.** Bordi della scrivania, altre pagine, loghi, foto e cornici scure possono essere scambiati per testo o confondere l'impaginazione.
- **Ritaglia separatamente le zone separate.** Se ti serve solo una colonna, un paragrafo o una tabella, ritaglia solo quella.
- **Lascia un piccolo margine.** Non ritagliare così stretto che le lettere tocchino il bordo dell'immagine. La documentazione di Tesseract segnala che un piccolo bordo attorno al testo aiuta.

## Scegli la lingua giusta

L'OCR legge ogni lingua con un modello dedicato. Se leggi un testo francese come inglese, le lettere accentate escono sbagliate o non escono affatto. Se leggi l'hindi come inglese, ottieni frasi senza senso.

Seleziona ogni lingua presente sulla pagina, per esempio inglese più hindi su un modulo bilingue, e solo quelle. Le lingue in più rallentano la lettura e danno al motore più opzioni sbagliate tra cui scegliere.

In Image to Text App l'impostazione Auto parte dall'inglese più le lingue del tuo browser. Se il testo sembra scritto in un altro alfabeto, rileva l'alfabeto e rilegge l'immagine con la lingua giusta.

## Scegli la modalità di lettura giusta

Per la maggior parte delle modalità, la scelta incide più sulla forma del risultato che su quali lettere vengono riconosciute. Testo semplice mantiene ogni riga così com'è. Documento unisce le righe in paragrafi e mantiene titoli ed elenchi. Tabella, Scontrino o fattura, Codice, Scrittura a mano e Matematica strutturano ciascuna il risultato per il proprio scopo. Image to Text App sceglie una modalità in automatico e ne indica l'ipotesi con un'etichetta, come «Sembra una tabella», e puoi cambiarla senza caricare di nuovo l'immagine.

## Cosa fa il Miglioramento automatico

Il Miglioramento automatico di Image to Text App è attivo per impostazione predefinita. A seconda dell'immagine, inverte il testo chiaro su sfondo scuro, ingrandisce il testo piccolo, raddrizza una leggera inclinazione, uniforma luce e ombre nelle foto del telefono e aumenta il contrasto. I passaggi eseguiti sono elencati nell'app, così vedi cosa è cambiato.

Se un risultato sembra peggiore del previsto, tieni premuto Confronta per vedere l'originale, poi prova gli strumenti manuali: ruota, ritaglia, raddrizza con i quattro angoli, luminosità, contrasto, nitidezza, scala di grigi, inverti colori, bianco e nero, uniforma illuminazione e riduci rumore. Dopo aver modificato l'immagine, premi Ctrl+Enter (⌘+Enter su Mac) per rileggerla.

## Rivedi il risultato in modo efficiente

Anche un buon risultato merita un controllo se dovrai farci affidamento.

- **Parti dal livello di affidabilità complessivo.** Alta, discreta o bassa: è un'indicazione di quanto leggere con attenzione, non una garanzia.
- **Passa da una parola segnalata all'altra.** Le parole incerte sono sottolineate, e puoi spostarti dall'una all'altra.
- **Sfrutta il collegamento tra testo e immagine.** Clicca una riga di testo per vedere dov'è nell'immagine, oppure clicca l'immagine per saltare al testo corrispondente.
- **Dai la precedenza a ciò che non ha contesto.** Nomi, numeri, indirizzi email, indirizzi web e codici non si possono indovinare dalle parole attorno, quindi è lì che gli errori fanno più danni.
- **Correggi gli errori ripetuti con Trova e sostituisci,** controllando ogni corrispondenza invece di sostituire tutto in una volta.

La scrittura a mano richiede un approccio a parte, sia nello scatto sia nella revisione; vedi [come convertire gli appunti scritti a mano in testo](/it/guides/how-to-convert-handwritten-notes-to-text). Per le foto di pagine stampate, la pagina [foto in testo](/it/photo-to-text) mette insieme tutto quanto visto sopra, e dal telefono puoi scattare la foto direttamente.
