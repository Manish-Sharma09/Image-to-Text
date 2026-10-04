---
title: "Come estrarre tabelle da immagini in Excel o Google Sheets"
description: "Da immagine a Excel: trasforma la foto o lo screenshot di una tabella in celle, con consigli su ritaglio, celle unite, controllo dei numeri e CSV o XLSX."
summary: "Come il riconoscimento delle tabelle ricostruisce righe e colonne da un'immagine, come aiutarlo e come controllare i numeri prima che finiscano in Excel o Google Sheets."
published: 2026-10-03
tool: image-to-excel
order: 5
---

Se passi un normale OCR sulla foto di una tabella, ottieni righe di testo con le colonne separate da qualche spazio, se ti va bene. Incolla quel testo in Excel e finisce tutto nella colonna A. Per avere celle vere, lo strumento deve ricostruire la struttura della tabella, non solo leggerne le parole.

Questa guida spiega come funziona, cosa lo manda in difficoltà e come controllare il risultato prima di fidarti.

## Come funziona il riconoscimento delle tabelle

Un motore OCR restituisce ogni parola insieme alla sua posizione nell'immagine. Il riconoscimento delle tabelle usa queste posizioni per capire dove sono le righe e le colonne.

- **Le righe** si ricavano dalla sovrapposizione verticale. Le parole i cui bordi superiore e inferiore sono allineati appartengono alla stessa riga. Un buono strumento tollera una leggera inclinazione, così una riga che sale o scende un po' attraverso la pagina resta unita.
- **Le colonne** si ricavano dallo spazio vuoto. Lo strumento cerca dei canali verticali di spazio bianco che attraversano la maggior parte delle righe. Ogni striscia tra due canali diventa una colonna.
- **Le righe che occupano tutta la larghezza della tabella**, come un titolo o una nota sotto, vengono messe da parte quando si decide dove sono le colonne, così non uniscono due colonne tra loro.
- **La riga di intestazione** spesso si riconosce perché è fatta di parole poste sopra colonne di numeri.

Il punto chiave è che l'allineamento conta più dei bordi. Una tabella ben allineata senza nessuna linea può uscire perfetta, mentre una tabella fitta con tutta la griglia disegnata può comunque andare storta se le colonne sono troppo vicine.

## Ritaglia attorno alla tabella

Tutto ciò che si trova nell'immagine partecipa al rilevamento delle colonne, quindi la cosa più utile che puoi fare è ritagliare strettamente attorno alla tabella.

- **Togli quello che c'è intorno.** Paragrafi sopra, note sotto, numeri di pagina, riquadri laterali e una colonna di testo vicina aggiungono parole in punti che confondono il conteggio delle colonne.
- **Una tabella per immagine.** Se una pagina contiene due tabelle, ritagliale e leggile separatamente.
- **Dividi le tabelle molto larghe.** Se devi rimpicciolire una tabella larga per farla stare in una sola foto, il testo potrebbe diventare troppo piccolo da leggere. Acquisiscila invece in due metà e tieni in entrambe una colonna di riferimento, come i nomi o le date, così potrai riallinearle nel foglio di calcolo.
- **Tabelle lunghe su più pagine.** Leggi ogni pagina, incolla i risultati uno sotto l'altro ed elimina le righe di intestazione ripetute.

Se la tabella è in una foto scattata di sbieco con il telefono, raddrizzala prima. Le colonne inclinate o convergenti sono molto più difficili da trovare di quelle che scendono dritte lungo la pagina.

## Tabelle senza bordi

Molte relazioni ed estratti conto non usano alcuna linea di griglia. Funzionano bene quando c'è uno spazio netto tra le colonne. I problemi nascono quando manca:

- Una colonna di testo allineata a sinistra accanto a una colonna di numeri allineata a destra può lasciare solo un filo di spazio tra le due, che vengono così lette come una sola.
- Le linee guida punteggiate, come i «........» di un indice, vengono lette come file di punti.
- Le righe a sfondo alternato riducono il contrasto una riga sì e una no. Convertire in scala di grigi e alzare il contrasto aiuta.

Se due colonne si fondono, di solito puoi separarle nel risultato invece di ricominciare da capo. Nella griglia della tabella di Image to Text App puoi modificare le celle e aggiungere o togliere righe e colonne prima di copiare.

## Celle unite e celle su più righe

Le tabelle reali raramente hanno una griglia perfetta, e alcune strutture vanno sistemate a mano.

- **Intestazioni che coprono più colonne.** Un'intestazione come «2026» posta sopra quattro colonne trimestrali finisce in una sola cella. Decidi se ripeterla in ogni colonna o trasformarla in un'intestazione su due righe nel foglio di calcolo.
- **Testo che va a capo.** Quando il testo di una cella va a capo su una seconda riga, può uscire come una riga in più con quasi tutte le celle vuote. Sposta il testo nella riga sopra ed elimina quella in più.
- **Celle vuote.** Le celle vuote sono la cosa più difficile per un rilevamento basato sulle posizioni, perché non c'è nessuna parola da misurare. Controlla le righe con dei vuoti per assicurarti che i valori successivi non siano scivolati di una colonna a sinistra.
- **Intestazioni ruotate** e **tabelle dentro altre tabelle** di solito vanno ricostruite a mano.

## Controlla i numeri

Spesso una tabella è piena di cifre che qualcuno sommerà o su cui prenderà decisioni, quindi qualche minuto di controllo vale la pena.

- **Sfrutta i totali.** Se la tabella ha una riga dei totali, somma la colonna nel foglio di calcolo e confronta. Una differenza ti dice di guardare meglio, ed è molto più rapido che controllare ogni cella.
- **Conta le righe.** Assicurati che il risultato abbia lo stesso numero di righe dell'originale.
- **Cerca le cifre che si somigliano.** 0 e O, 1 e l e 7, 5 e S, 8 e B. Una lettera in una colonna di numeri si scova facilmente, perché il foglio di calcolo tratterà quella cella come testo.
- **Fai attenzione ai separatori decimali.** Un separatore sbiadito può sparire e trasformare 12,50 in 1250. Virgola e punto possono anche scambiarsi di posto.
- **Controlla i numeri negativi.** I segni meno sono piccoli e si perdono facilmente. I numeri tra parentesi, come (1.200), vengono letti da Excel come negativi, che di solito è proprio quello che intendeva l'originale.
- **Occhio al formato dei numeri.** In molti paesi, Italia compresa, 1.234,56 indica lo stesso valore di 1,234.56. Se il tuo foglio di calcolo usa impostazioni internazionali diverse da quelle del documento, i numeri possono diventare testo o assumere un valore sbagliato.

## Portare la tabella in Excel o Google Sheets

La strada più semplice è copiare e incollare. Le tabelle copiate come dati formattati, come la copia dalla vista tabella di Image to Text App, si incollano in Excel e Google Sheets come celle separate. Fai clic sulla cella in alto a sinistra in cui vuoi la tabella e incolla.

Prima di incollare, proteggi le colonne che i fogli di calcolo amano «correggere»:

- **Gli zeri iniziali** di CAP, numeri di telefono e codici cliente vengono eliminati quando un valore viene trattato come numero.
- **I numeri lunghi** vengono trasformati in notazione scientifica, ed Excel conserva solo 15 cifre significative, quindi un codice di 16 cifre viene modificato senza avvisarti.
- **I codici brevi** come 3-4 o 1/2 possono essere convertiti in date.

Imposta quelle colonne come Testo prima di incollare, oppure incolla i valori e correggi il formato dopo. In Google Sheets, Ctrl+Shift+V (⌘+Shift+V su Mac) incolla i valori senza formattazione.

## CSV o XLSX?

Se scarichi un file invece di copiare, il formato conta.

**CSV** è testo semplice: una riga per ogni riga della tabella, con le virgole tra le celle. Quasi tutti i programmi riescono a importarlo, il che lo rende la scelta giusta per passare dati a un software di contabilità, a un database o a uno script. Però non conserva nessuna formattazione e contiene un solo foglio, e il programma che lo apre deve indovinare cos'è ogni valore: è proprio lì che zeri iniziali e date vanno storti. Anche i caratteri che non fanno parte dell'inglese di base, come le lettere accentate, possono uscire illeggibili se il programma presume la codifica del testo sbagliata. In Excel, importare tramite Dati > Da testo/CSV ti permette di scegliere UTF-8 e impostare i tipi di colonna invece di lasciare che Excel tiri a indovinare.

**XLSX** è il formato nativo di Excel, e si apre direttamente in Excel, Google Sheets e altre app per fogli di calcolo. Usalo quando la tabella verrà aperta e usata da persone.

Una regola semplice: XLSX per le persone, CSV per gli altri programmi. Lo strumento [immagine in Excel](/it/image-to-excel) offre entrambi, insieme a una copia che si incolla direttamente in un foglio.

## Prima di iniziare, cerca la fonte

Se la tabella viene da una relazione in PDF o da una pagina web, l'originale potrebbe contenere dati veri. Prova a selezionare il testo nel PDF, oppure controlla se il sito offre un download. Se la tabella esiste davvero solo come immagine, rendi l'immagine il più nitida e dritta possibile: [come ottenere risultati OCR precisi](/it/guides/how-to-get-accurate-ocr-results) spiega i dettagli. E se ti incuriosiscono le posizioni delle parole che rendono possibile tutto questo, [come funziona l'OCR](/it/guides/how-ocr-works) spiega da dove arrivano.
