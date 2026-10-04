---
title: "Come convertire un'immagine in Word o Google Docs"
description: "Trasforma foto, scansioni e screenshot in documenti Word o Google Docs modificabili: cosa resta della formattazione, cosa no e come rifinire il testo."
summary: "Cosa sopravvive quando un'immagine diventa un file Word o Google Docs, cosa dovrai ricostruire a mano e una procedura di pulizia per arrivare in fretta al documento finito."
published: 2026-10-03
tool: image-to-word
order: 10
---

Per trasformare la foto di una pagina in un documento modificabile servono due cose: l'OCR, che legge le parole, e un lavoro di ricostruzione che rimetta quelle parole in paragrafi, titoli, elenchi e tabelle. Le parole di solito arrivano bene. L'aspetto grafico della pagina, quasi mai.

Sapere in anticipo cosa si conserva e cosa dovrai rifare ti permette di scegliere la strada più rapida e di non dover lottare con la formattazione dopo.

## Cosa si conserva

Una buona conversione mantiene la struttura del documento, cioè le parti che gli danno significato:

- **Paragrafi.** Le righe che nell'immagine andavano a capo vengono riunite in paragrafi continui, così il testo si riadatta quando lo modifichi.
- **Titoli.** Le righe che si distinguono come titoli possono diventare veri stili di titolo invece di semplice testo in grassetto.
- **Elenchi.** Le voci puntate e numerate diventano veri elenchi, che si rinumerano da soli quando aggiungi una voce.
- **Tabelle.** Righe e colonne possono arrivare come una vera tabella invece che come testo separato da spazi.
- **Ordine di lettura.** Nelle pagine a una sola colonna, l'ordine del testo corrisponde a quello della pagina.

In Image to Text App, la modalità Documento riunisce i paragrafi e mantiene i titoli e gli elenchi puntati e numerati. Le tabelle arrivano come tali quando usi la modalità Tabella per quella parte della pagina.

## Cosa non si conserva

L'OCR riconosce i caratteri, non il design. Mettiti nell'ottica di perdere o rifare quanto segue:

- **Caratteri tipografici e dimensioni.** Il testo prende lo stile predefinito del documento in cui lo incolli.
- **Enfasi all'interno del testo.** Le parole in grassetto, corsivo o sottolineato dentro una frase di solito si perdono.
- **Colori** del testo, delle evidenziazioni e degli sfondi.
- **Layout a più colonne, caselle di testo e riquadri laterali.** Diventano un unico flusso di paragrafi, e il testo nei riquadri può finire in un punto poco felice.
- **Immagini, loghi, grafici e firme.** Non sono testo, quindi vengono scartati, oppure un logo si trasforma in qualche carattere casuale.
- **Intestazioni, piè di pagina e numeri di pagina.** Arrivano come normali righe di testo, ripetute su ogni pagina.
- **Note a piè di pagina.** Il testo della nota compare come un paragrafo qualsiasi e i piccoli numeri di richiamo diventano cifre normali attaccate alla fine di una parola.
- **Campi dei moduli.** Le righe vuote e le caselle di controllo di un modulo non diventano campi compilabili.
- **Spaziature, rientri e a capo esatti**, tranne che nel codice, dove una modalità pensata per il codice mantiene l'indentazione.

## Copia formattata, .docx o altro?

Ci sono diversi modi per portare il risultato in un documento, e ognuno si adatta a una situazione diversa.

La **copia formattata** è la scelta migliore quando il testo deve finire in un documento che esiste già. Copia e incolla in Word o Google Docs: titoli, elenchi e tabelle arrivano come vera formattazione. Siccome il testo non ha un carattere tipografico suo, prende gli stili del documento di destinazione, quindi se lo incolli in un modello aziendale i titoli si adeguano a quel modello.

Un **file .docx** è la scelta migliore quando ti serve un documento a sé da inviare, modificare o conservare. Si apre in Microsoft Word e nella maggior parte degli altri programmi di videoscrittura. Per lavorarci in Google Docs, caricalo su Google Drive e aprilo da lì.

**Markdown** è adatto ad app per appunti, wiki e a tutto ciò che viene pubblicato sul web. Titoli ed elenchi restano sotto forma di semplice marcatura testuale, facile da modificare ovunque. Lo strumento [immagine in Markdown](/it/image-to-markdown) è pensato proprio per questo.

Il **testo semplice** è la scelta giusta quando hai comunque intenzione di riformattare tutto e non vuoi che una struttura indesiderata ti intralci.

## Una procedura di pulizia che fa risparmiare tempo

Qui l'ordine conta. Correggere i problemi subito, mentre hai l'immagine davanti, è molto più veloce che scovarli dopo in un documento lungo.

1. **Prepara l'immagine.** Ritaglia via tutto ciò che non fa parte del documento, come il bordo della pagina successiva, e raddrizza le foto scattate di sbieco. La guida [come ottenere risultati OCR precisi](/it/guides/how-to-get-accurate-ocr-results) lo spiega nel dettaglio.
2. **Leggi con la modalità giusta.** Usa la modalità Documento per il testo continuo. Se in una pagina c'è una tabella, leggi quella parte come tabella.
3. **Correggi le parole prima di esportare.** Controlla le parole segnalate con l'immagine accanto. È molto più rapido farlo qui, dove facendo clic su una riga vedi il punto corrispondente nell'immagine, che in Word con l'immagine aperta in un'altra finestra.
4. **Elimina gli elementi di contorno.** Cancella intestazioni, piè di pagina e numeri di pagina ripetuti. Trova e sostituisci si occupa di un'intestazione che si ripete su ogni pagina.
5. **Incolla o esporta.** Usa la copia formattata o il file .docx, come visto sopra.
6. **Applica gli stili corretti.** Usa gli stili Titolo 1, Titolo 2 e Normale invece del grassetto e delle dimensioni del carattere. Così ottieni il riquadro di spostamento in Word, la struttura del documento in Google Docs e un sommario automatico. Per eliminare prima la formattazione indesiderata, seleziona il testo e premi Ctrl+Spazio in Word, oppure Ctrl+\ in Google Docs (⌘+\ su Mac).
7. **Ricostruisci quello che l'OCR non può fare.** Inserisci immagini e loghi ritagliati dall'originale e ricrea le colonne con Layout > Colonne in Word o Formato > Colonne in Google Docs.
8. **Rileggi.** Il controllo ortografico individua le non-parole come «cbe». Non individua invece una parola vera nel posto sbagliato, come «casa» al posto di «cassa», quindi confronta numeri, nomi e date con l'originale.

## Documenti di più pagine

Per un documento fotografato o scansionato pagina per pagina, aggiungi tutte le pagine insieme e mettile in ordine. In Image to Text App, la vista Documento intero riunisce tutte le pagine, ti permette di cercare in tutte e le esporta in un unico file.

Controlla i punti di giunzione tra le pagine. Un paragrafo che parte in fondo a una pagina e continua nella successiva di solito viene spezzato in due, perché ogni pagina viene letta da sola. Riuniscili a mano.

Se parti da PDF scansionati invece che da foto, la guida [come estrarre il testo da documenti scansionati](/it/guides/how-to-extract-text-from-scanned-documents) spiega le impostazioni dello scanner e i PDF ricercabili, che potrebbero fare al caso tuo più di un file modificabile. Le tabelle hanno una guida tutta loro: [come estrarre tabelle dalle immagini](/it/guides/how-to-extract-tables-from-images).

## Quando conviene ricostruire invece di convertire

La conversione funziona meglio con documenti ricchi di testo, come lettere, relazioni, articoli e appunti. Per pagine molto curate dal punto di vista grafico, come brochure, locandine, menu e attestati, estrai il testo e poi versalo in un modello nuovo. Si fa prima che cercare di ricostruire un layout identico a partire dall'output dell'OCR.

Per i moduli che devi riutilizzare, ricrea il modulo come si deve nel tuo programma di videoscrittura e copia le etichette. E se il documento arriva da qualcuno che ha ancora il file originale, chiederglielo batte qualsiasi conversione.

Quando sei pronto, lo strumento [immagine in Word](/it/image-to-word) è pensato proprio per questo, con la copia formattata da incollare e il download in .docx.
