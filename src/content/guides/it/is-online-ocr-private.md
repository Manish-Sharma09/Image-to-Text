---
title: "L'OCR online è privato? Cosa succede alle tue immagini"
description: "Cosa succede di solito a un'immagine caricata per l'OCR, cosa cercare nell'informativa privacy e come verificare da solo che uno strumento lavori in locale."
summary: "Dove finisce la tua immagine quando usi un OCR online, le domande da porsi leggendo l'informativa privacy e un modo semplice per verificare da solo l'elaborazione sul dispositivo."
published: 2026-10-03
tool: pdf-to-text
order: 9
---

Le immagini che passiamo all'OCR sono spesso private: carte d'identità, estratti conto, referti medici, contratti, screenshot di chat personali. Capire se uno strumento online è «privato» si riduce a due domande. Dove viene letta l'immagine? E che fine fanno l'immagine e il testo dopo?

Questa guida non è un giudizio su un servizio in particolare. Molti trattano i file con cura. È un modo per scoprirlo da solo, così puoi scegliere lo strumento giusto per ogni documento.

## Cosa succede di solito quando carichi un'immagine

Gli strumenti OCR online funzionano in uno di due modi, e alcuni li combinano.

### Elaborazione sul server

La maggior parte degli strumenti online invia la tua immagine ai propri server per leggerla. Il browser carica il file, di solito tramite una connessione HTTPS cifrata, il server esegue l'OCR e il testo torna alla pagina. Lungo il percorso:

- Il file esiste su almeno un server, e può essere scritto su disco mentre aspetta in una coda di elaborazione.
- I log del server registrano di solito i dettagli di ogni richiesta, come ora, indirizzo IP e dimensione del file, e a volte altro.
- I backup possono conservarne copie per un certo periodo, anche dopo che la copia principale è stata eliminata.
- Il servizio può passare l'immagine ad altre aziende di cui si serve, come un fornitore di hosting cloud o un servizio esterno di OCR o di intelligenza artificiale, ciascuno con le proprie condizioni.
- Il personale potrebbe poter accedere ai file per assistenza o per il debug.
- A seconda dell'informativa, i file o il testo estratto possono essere usati per migliorare il servizio, il che può includere l'addestramento di modelli.

Niente di tutto questo è per forza un problema. Un servizio può eliminare i file rapidamente, limitarne l'accesso e non usarli mai per l'addestramento. Il punto è che ti stai affidando alla sua informativa, e al fatto che le sue pratiche la rispettino.

### Elaborazione sul dispositivo

Alcuni strumenti scaricano il motore OCR nel browser e leggono l'immagine sul tuo dispositivo. L'immagine non viene mai inviata al servizio, quindi le domande su conservazione, log e addestramento per lei semplicemente non si pongono.

### Anche le funzioni integrate sono diverse

Le funzioni OCR dei sistemi operativi non sono tutte uguali. Apple descrive Testo live come una funzione che lavora sul dispositivo, e Microsoft dichiara che il riconoscimento del testo dello Strumento di cattura avviene in locale. La pagina di assistenza di Google su Text capture dei Chromebook Plus dice invece che l'area selezionata viene inviata ai server di Google. Il posto giusto per verificare è la documentazione di ciascuna funzione. La [guida agli screenshot](/it/guides/how-to-extract-text-from-a-screenshot) spiega come usarle.

## Cosa controllare nell'informativa privacy

Leggi l'informativa tenendo a mente queste domande.

- **Dove viene elaborata l'immagine?** Cerca formule come «caricata sui nostri server», «elaborata nel tuo browser» o «sul tuo dispositivo». Una formulazione vaga qui è già una risposta.
- **Per quanto tempo viene conservata?** Un periodo preciso, come «eliminata dopo un'ora», vale più di «per il tempo necessario». Controlla se quel periodo vale anche per backup e log.
- **Viene usata per l'addestramento o per «migliorare i nostri servizi»?** Se sì, scopri se puoi opporti e se l'opposizione vale anche per i file che hai già caricato.
- **Chi altro la tratta?** Cerca un elenco di sub-responsabili o terze parti, come fornitori di hosting, OCR o intelligenza artificiale e servizi di analisi.
- **E il testo estratto?** Alcune informative parlano dei file caricati ma non dicono nulla del testo che se ne ricava.
- **Dove si trovano i server?** Il Paese in cui i dati vengono elaborati determina quali leggi si applicano.
- **La cronologia viene salvata in un account?** I risultati salvati e legati a un account restano su un server finché non li elimini.
- **Chi altro è presente sulla pagina?** Le reti pubblicitarie e gli script di analisi presenti su una pagina ricevono informazioni sulla tua visita. Di norma non ricevono la tua immagine, ma è bene saperlo.
- **L'informativa è specifica e aggiornata?** Un'informativa datata e dettagliata è un segnale migliore di un modello generico.

Ricorda che un'informativa privacy è una dichiarazione di intenti, non una prova. Con gli strumenti che lavorano sul dispositivo, puoi verificare l'affermazione da solo.

## In cosa è diversa l'elaborazione sul dispositivo

Quando l'OCR gira nel browser, la riservatezza dell'immagine non dipende dai server, dal personale o dai tempi di conservazione di qualcun altro. Ci sono dei compromessi: alla prima visita si scaricano il motore e i dati della lingua, e la velocità di lettura dipende dal tuo dispositivo, quindi un telefono datato ci mette di più.

Il tuo dispositivo conta comunque. I risultati possono finire in posti che controlli tu ma che potresti dimenticare: lo spazio di archiviazione del browser se attivi una funzione di cronologia, la cartella dei download e gli appunti. La cronologia degli appunti di Windows (Windows+V) e la sincronizzazione degli appunti tra dispositivi possono conservare copie di ciò che hai copiato.

## Come verificare da solo

### Osserva la scheda Rete

I browser includono strumenti per sviluppatori che mostrano ogni richiesta fatta da una pagina. Non serve essere sviluppatori per usarli.

1. Apri lo strumento in un browser desktop. In Safari, attiva prima le funzioni per sviluppatori nelle impostazioni Avanzate di Safari.
2. Apri gli strumenti per sviluppatori: F12 o Ctrl+Shift+I su Windows e Linux, ⌘+Option+I su Mac.
3. Seleziona la scheda Rete (Network), svuota l'elenco e, se c'è, attiva l'opzione per conservare il log.
4. Aggiungi un'immagine e lascia che lo strumento la legga.
5. Guarda le richieste che compaiono. Un caricamento di solito appare come una richiesta POST o PUT di dimensioni vicine a quelle del file immagine. Ordinare per dimensione rende facile individuare le richieste in uscita più pesanti.

Con uno strumento che lavora sul dispositivo potresti vedere il download del motore e dei file della lingua al primo utilizzo, e forse qualche piccola richiesta di analisi, ma niente in uscita delle dimensioni della tua immagine. Tieni il pannello aperto per un minuto dopo la lettura e controlla tutti i tipi di richiesta, perché i dati possono essere inviati anche a pezzi o tramite una connessione WebSocket.

### Prova offline

Carica la pagina e leggi un'immagine, così il motore e i dati della lingua finiscono nella cache. Poi spegni il Wi-Fi o attiva la modalità aereo e leggine un'altra. Se funziona ancora, la lettura avviene sul tuo dispositivo.

La prova offline è veloce ma da sola non è decisiva, perché una pagina potrebbe conservare un'immagine e inviarla più tardi. La scheda Rete è il controllo più affidabile.

[Image to Text App](/it) esegue l'OCR sul tuo dispositivo proprio in questo modo, e puoi verificarlo con entrambe le prove. I dettagli sono nella sua [pagina sulla privacy](/it/privacy).

## Consigli per i documenti riservati

- **Preferisci l'elaborazione sul dispositivo** per documenti d'identità, cartelle cliniche, estratti finanziari e documenti legali.
- **Togli ciò che non ti serve.** Se di una lettera ti serve solo l'indirizzo, ritaglia via il numero di conto. Con uno strumento basato su server, ritaglia prima di caricare, perché il ritaglio dentro lo strumento avviene dopo il caricamento.
- **Evita computer condivisi e pubblici.** Se devi usarne uno, lascia disattivata qualsiasi funzione di cronologia, chiudi la scheda quando hai finito ed elimina i file scaricati.
- **Svuota la cronologia degli appunti** dopo aver copiato testo riservato, soprattutto se si sincronizza tra dispositivi.
- **Pensaci prima di condividere i risultati.** Un link che racchiude il testo nella parte dell'indirizzo dopo il # non viene inviato al server del sito quando qualcuno lo apre. Ma chiunque abbia il link può leggere il testo, e le app di chat conservano i link che invii. Tratta il link come il documento stesso.
- **Controlla le estensioni del browser.** Le estensioni con accesso a tutti i siti possono leggere il contenuto delle pagine che visiti. Per i documenti molto riservati usa un profilo del browser senza estensioni, oppure una finestra privata, in cui la maggior parte dei browser disattiva le estensioni a meno che tu non le abbia autorizzate.

Le pratiche scansionate sono il caso in cui queste domande emergono più spesso. Per gestire scansioni e PDF, vedi la pagina [PDF in testo](/it/pdf-to-text).
