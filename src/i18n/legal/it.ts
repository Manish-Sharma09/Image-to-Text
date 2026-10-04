// Italian legal documents. Translated from en.ts — see the conventions there.
import type { Legal } from './en';

const it = {
  privacy: {
    title: 'Informativa sulla privacy',
    intro: `L'informativa completa, sezione per sezione. Il riepilogo qui sopra ne è una versione breve e fedele; in caso di differenze, prevale questa informativa.`,
    sections: [
      {
        id: 'who-we-are',
        title: 'Chi siamo',
        html: `<p>La presente informativa si applica a {site}, disponibile all'indirizzo {url}, e al suo strumento per convertire immagini in testo, gestiti da {operator} («noi»). Spiega quali informazioni vengono trattate quando usi il sito, per quali motivi e quali scelte hai a disposizione. Ai sensi delle normative sulla protezione dei dati, come il GDPR dell'Unione europea e quello del Regno Unito, siamo il titolare del trattamento delle informazioni qui descritte.</p><p>Domande o richieste: <a href="mailto:{email}">{email}</a>.</p>`,
      },
      {
        id: 'information-we-process',
        title: 'Informazioni che trattiamo',
        html: `<p>Lo strumento è progettato per richiedere il minor numero possibile di informazioni. Di seguito trovi tutto ciò che viene trattato, e dove.</p><ul><li><strong>Immagini e testo letti sul tuo dispositivo.</strong> La lettura avviene nel tuo browser. Le tue immagini, il testo e le tue modifiche non ci vengono inviati e non possiamo vederli.</li><li><strong>Lettura avanzata, solo se la scegli.</strong> Dove questa opzione è disponibile, l'immagine della singola pagina che confermi, ridimensionata a un massimo di 2.000 pixel, viene inviata al nostro server insieme alla modalità di lettura e alle lingue che hai scelto, e trasmessa ad Anthropic per essere letta. Il testo ti viene restituito. Non conserviamo né l'immagine né il testo.</li><li><strong>Immagini da un link.</strong> Se il tuo browser non riesce a caricare direttamente il link di un'immagine, il nostro server recupera l'immagine per te e te la restituisce subito, senza conservarla. Per farlo, il server riceve il link che hai incollato.</li><li><strong>Dati tecnici delle richieste.</strong> Come per qualsiasi sito web, il nostro server e il nostro fornitore di hosting ricevono le informazioni che il tuo browser invia con ogni richiesta: il tuo indirizzo IP, il tipo di browser, la pagina richiesta e l'orario. Per applicare i limiti giornalieri alla Lettura avanzata e al recupero delle immagini da link, contiamo le richieste di ciascun visitatore usando un hash dell'indirizzo IP generato con una chiave che cambia ogni giorno. I conteggi vengono eliminati ogni giorno.</li><li><strong>Messaggi che ci invii.</strong> Se ci scrivi via email, riceviamo il tuo indirizzo email e tutto ciò che includi nel messaggio.</li><li><strong>Dati salvati sul tuo dispositivo.</strong> Le tue preferenze (come il tema e le lingue), la Cronologia, se la attivi, e i file dell'app e del motore salvati nella cache vengono conservati nello spazio di archiviazione del browser. Restano sul tuo dispositivo e non ci vengono mai inviati.</li></ul><p>Non ci sono account, non ti chiediamo mai il nome e non usiamo pubblicità, cookie di tracciamento o strumenti di analisi di terze parti.</p>`,
      },
      {
        id: 'service-providers',
        title: 'Servizi coinvolti nel funzionamento del sito',
        html: `<p>Alcuni servizi esterni contribuiscono a fornire il sito. Nessuno di essi riceve le tue immagini, tranne Anthropic quando scegli la Lettura avanzata.</p><ul><li><strong>Il nostro fornitore di hosting</strong> gestisce il nostro server e tratta i dati delle richieste per nostro conto per fornire il sito.</li><li><strong>jsDelivr.</strong> I file delle lingue del motore di riconoscimento e il decodificatore usato per le foto HEIC dell'iPhone nei browser che non riescono ad aprirle in modo nativo vengono scaricati dalla rete di distribuzione di contenuti (CDN) jsDelivr. jsDelivr vede il tuo indirizzo IP e quale file è stato richiesto, mai le tue immagini. Consulta l'<a href="https://www.jsdelivr.com/terms/privacy-policy" rel="noopener">informativa sulla privacy di jsDelivr</a>.</li><li><strong>Anthropic</strong>, solo per la Lettura avanzata e solo per la pagina che confermi. Il trattamento avviene tramite l'API commerciale di Anthropic; le condizioni commerciali di Anthropic stabiliscono che, per impostazione predefinita, i suoi modelli non vengono addestrati con i dati delle API. Consulta l'<a href="https://www.anthropic.com/legal/privacy" rel="noopener">informativa sulla privacy di Anthropic</a>.</li></ul><p>Le pagine, i font, gli script e il motore di riconoscimento stesso vengono serviti dal nostro dominio.</p>`,
      },
      {
        id: 'why-we-process-it',
        title: 'Perché le trattiamo',
        html: `<p>Trattiamo le informazioni solo per le seguenti finalità e sulle seguenti basi giuridiche previste dal GDPR:</p><ul><li><strong>Per fornirti le funzioni che richiedi</strong>, come la Lettura avanzata e il recupero di un'immagine da un link (esecuzione di un contratto, art. 6, par. 1, lett. b) GDPR).</li><li><strong>Per mantenere il sito sicuro e funzionante</strong>, anche prevenendo gli abusi e applicando i limiti giornalieri (nostri legittimi interessi, art. 6, par. 1, lett. f) GDPR).</li><li><strong>Per rispondere ai tuoi messaggi</strong> (nostro legittimo interesse a risponderti, art. 6, par. 1, lett. f) GDPR).</li><li><strong>Per adempiere a obblighi legali</strong>, quando una legge lo richiede (art. 6, par. 1, lett. c) GDPR).</li></ul><p>Non vendiamo mai le tue informazioni, non le usiamo per la pubblicità e non usiamo le tue immagini o il tuo testo per addestrare modelli di intelligenza artificiale.</p>`,
      },
      {
        id: 'how-long-we-keep-it',
        title: 'Per quanto tempo le conserviamo',
        html: `<ul><li><strong>Immagini e testo letti sul tuo dispositivo:</strong> non vengono mai conservati da noi. Con la Cronologia attiva, restano nel tuo browser finché non li elimini.</li><li><strong>Lettura avanzata e immagini da un link:</strong> non vengono conservati dal nostro server; esistono solo mentre la richiesta viene gestita. La conservazione da parte di Anthropic è descritta nella sua informativa sulla privacy.</li><li><strong>Contatori dei limiti giornalieri:</strong> eliminati ogni giorno.</li><li><strong>Dati tecnici delle richieste:</strong> conservati dal nostro server e dal nostro fornitore di hosting solo per il tempo necessario a fini di sicurezza e di risoluzione dei problemi, poi eliminati.</li><li><strong>Email:</strong> conservate per il tempo necessario a gestire il tuo messaggio ed eventuali seguiti, poi eliminate.</li></ul>`,
      },
      {
        id: 'sharing',
        title: 'Con chi le condividiamo',
        html: `<p>Non vendiamo né affittiamo informazioni personali e non le condividiamo per finalità di pubblicità comportamentale basata su più contesti (cross-context behavioral advertising). Le condividiamo solo con i fornitori di servizi descritti sopra, che le trattano per nostro conto, oppure quando lo richiede la legge: ad esempio, per ottemperare a una richiesta legale valida o per tutelare i diritti e la sicurezza dei nostri utenti e del sito.</p>`,
      },
      {
        id: 'international-transfers',
        title: 'Trasferimenti internazionali',
        html: `<p>I nostri fornitori di servizi possono trattare le informazioni in paesi diversi dal tuo, compresi gli Stati Uniti. Dove la legge lo richiede, questi trasferimenti si basano su garanzie adeguate, come le clausole contrattuali tipo della Commissione europea.</p>`,
      },
      {
        id: 'cookies',
        title: 'Cookie e archiviazione locale',
        html: `<p>Non impostiamo cookie. Il sito usa lo spazio di archiviazione locale (local storage), IndexedDB e la cache del browser solo per le funzioni che usi: ricordare il tema, le lingue e le impostazioni, conservare la Cronologia se la attivi e permettere allo strumento di funzionare offline. Niente di tutto ciò viene usato per il tracciamento o la pubblicità, e puoi cancellare questi dati in qualsiasi momento dalle impostazioni del browser.</p>`,
      },
      {
        id: 'your-rights',
        title: 'I tuoi diritti',
        html: `<p>A seconda di dove vivi, potresti avere il diritto di accedere alle tue informazioni personali, di rettificarle o cancellarle, di opporti al loro utilizzo o di chiederne la limitazione, di riceverle in un formato portabile e di revocare il consenso eventualmente prestato. Nell'UE, nel Regno Unito e in giurisdizioni analoghe, puoi anche proporre reclamo all'autorità di controllo per la protezione dei dati competente.</p><p>Se vivi in California, hai il diritto di sapere quali informazioni personali raccogliamo e come le usiamo, di chiederci di cancellarle o correggerle e di non essere discriminato per aver esercitato questi diritti. Non vendiamo né condividiamo informazioni personali secondo la definizione di questi termini nel CCPA.</p><p>Per presentare una richiesta, scrivi a <a href="mailto:{email}">{email}</a>. Poiché lo strumento non raccoglie le tue immagini né il tuo testo e non prevede account, di solito non conserviamo nulla che ti identifichi, ma risponderemo a ogni richiesta entro i termini previsti dalla legge. I dati sul tuo dispositivo sono sotto il tuo controllo: elimina i documenti dal pannello Cronologia o cancella i dati di questo sito dal browser.</p>`,
      },
      {
        id: 'children',
        title: 'Minori',
        html: `<p>Il sito non è rivolto ai minori di 13 anni, o di 16 anni nello Spazio economico europeo, e non raccogliamo consapevolmente le loro informazioni personali. Se ritieni che un minore ci abbia inviato informazioni personali, contattaci e le elimineremo.</p>`,
      },
      {
        id: 'security',
        title: 'Sicurezza',
        html: `<p>Il sito viene servito tramite HTTPS, per impostazione predefinita le immagini vengono lette sul tuo dispositivo e il nostro server non conserva né immagini né testo. La funzione di recupero delle immagini da link si collega solo a indirizzi web pubblici, con limiti di dimensione e di tempo. Nessun metodo di trasmissione o di archiviazione è completamente sicuro, ma tenere i tuoi dati lontani dai nostri server è la protezione più efficace che possiamo offrire.</p>`,
      },
      {
        id: 'changes',
        title: 'Modifiche alla presente informativa',
        html: `<p>Se modifichiamo la presente informativa, aggiorneremo la data in cima a questa pagina. Se una modifica incide in modo sostanziale sul trattamento delle tue informazioni, la segnaleremo anche sul sito prima che entri in vigore.</p>`,
      },
      {
        id: 'contact',
        title: 'Contatti',
        html: `<p>Per qualsiasi questione relativa alla privacy, scrivi a <a href="mailto:{email}">{email}</a> o usa la <a href="/contact">pagina dei contatti</a>.</p>`,
      },
    ],
  },

  terms: {
    eyebrow: 'Note legali',
    title: 'Termini e condizioni',
    lede: `L'accordo tra te e noi quando usi {site}. Abbiamo cercato di renderlo il più breve e chiaro possibile.`,
    sections: [
      {
        id: 'agreement',
        title: 'Accettazione dei termini',
        html: `<p>I presenti termini si applicano quando usi {site}, disponibile all'indirizzo {url} (il «sito»), compreso il suo strumento per convertire immagini in testo (il «servizio»). Il sito è gestito da {operator} («noi»). Usando il sito accetti i presenti termini. La nostra <a href="/privacy">informativa sulla privacy</a> spiega come trattiamo le tue informazioni. Se non accetti i presenti termini, ti chiediamo di non usare il sito.</p>`,
      },
      {
        id: 'the-service',
        title: 'Il servizio',
        html: `<p>{site} trasforma immagini e PDF in testo modificabile. Per impostazione predefinita la lettura avviene nel tuo browser, e il servizio è gratuito e utilizzabile senza account. Possiamo aggiungere, modificare o rimuovere funzioni in qualsiasi momento e non garantiamo che il servizio sia sempre disponibile, ininterrotto o privo di errori.</p>`,
      },
      {
        id: 'your-content',
        title: 'Le tue immagini e il tuo testo',
        html: `<ul><li><strong>Restano tuoi.</strong> Conservi tutti i diritti che hai sulle immagini che leggi e sul testo che ne ottieni. Non rivendichiamo alcun diritto di proprietà né sulle immagini né sul testo.</li><li><strong>Non li riceviamo</strong> quando vengono letti sul tuo dispositivo. Se usi la Lettura avanzata o recuperi un'immagine da un link, autorizzi noi e i nostri fornitori di servizi a trattare quell'immagine solo nella misura necessaria a restituirti il risultato.</li><li><strong>Devi avere il diritto di usarli.</strong> Leggi solo immagini di tua proprietà o che sei autorizzato a usare, e rispetta il diritto d'autore, la privacy e la riservatezza altrui quando usi il testo.</li></ul>`,
      },
      {
        id: 'acceptable-use',
        title: 'Uso consentito',
        html: `<p>Ti chiediamo di usare il sito in modo corretto. Ti impegni a non:</p><ul><li>usare il servizio per violare qualsiasi legge o i diritti di chiunque;</li><li>trattare materiale illecito o che non hai il diritto di trattare;</li><li>inviare richieste automatizzate o massive ai nostri server, o tentare di aggirare i limiti giornalieri o altre misure di protezione;</li><li>interferire con il sito, comprometterne il funzionamento per altre persone o analizzarlo alla ricerca di vulnerabilità senza la nostra autorizzazione (se trovi un problema di sicurezza, segnalalo a <a href="mailto:{email}">{email}</a>);</li><li>usare la funzione di recupero da link per raggiungere indirizzi a cui non sei autorizzato ad accedere;</li><li>presentare il sito o i suoi risultati come un servizio tuo, o lasciare intendere di avere il nostro avallo.</li></ul><p>I componenti open source dello strumento possono essere usati secondo le rispettive licenze; queste regole riguardano il nostro sito e i nostri server.</p>`,
      },
      {
        id: 'accuracy',
        title: 'Precisione dei risultati',
        html: `<p>Il riconoscimento del testo non è mai perfetto. I risultati possono contenere errori, soprattutto con la scrittura a mano, le foto di bassa qualità, il testo piccolo e le impaginazioni complesse. Le parole da controllare e il livello di affidabilità sono indicazioni, non garanzie. Rivedi sempre il testo prima di farvi affidamento e presta particolare attenzione a numeri, nomi, importi e a tutto ciò che ha conseguenze legali, mediche o finanziarie. Sei responsabile dell'uso che fai dei risultati.</p>`,
      },
      {
        id: 'enhanced-reading',
        title: 'Lettura avanzata',
        html: `<p>Dove è disponibile, la Lettura avanzata invia la pagina che confermi, tramite il nostro server, al modello Claude di Anthropic. È facoltativa, limitata a un certo numero di pagine per visitatore al giorno e può essere modificata, limitata o ritirata in qualsiasi momento. Quando la usi, ti impegni anche a non inviare contenuti che violano le <a href="https://www.anthropic.com/legal/aup" rel="noopener">norme di utilizzo di Anthropic</a>.</p>`,
      },
      {
        id: 'our-content',
        title: 'I nostri contenuti e il software open source',
        html: `<p>Il design, i testi e la grafica del sito, nonché il nome e il logo {site}, appartengono a noi o ai nostri licenzianti. Puoi inserire liberamente link a qualsiasi pagina. Il motore di riconoscimento del testo e gli altri componenti sono software open source distribuiti con le rispettive licenze, che si applicano a tali componenti; i principali sono elencati nella pagina <a href="/about">Chi siamo</a>.</p>`,
      },
      {
        id: 'third-parties',
        title: 'Link e altri servizi',
        html: `<p>Il sito contiene link ad altri siti web e si affida a servizi esterni, come jsDelivr e, per la Lettura avanzata, Anthropic. Non li controlliamo e non siamo responsabili dei loro contenuti o delle loro pratiche; si applicano i loro termini e le loro informative.</p>`,
      },
      {
        id: 'no-warranty',
        title: 'Esclusione di garanzie',
        html: `<p>Il servizio è gratuito e viene fornito «così com'è» e «secondo disponibilità». Nella misura massima consentita dalla legge, non forniamo garanzie di alcun tipo, espresse o implicite, comprese le garanzie di commerciabilità, idoneità a uno scopo specifico, accuratezza e non violazione di diritti di terzi.</p>`,
      },
      {
        id: 'liability',
        title: 'Limitazione di responsabilità',
        html: `<p>Nella misura massima consentita dalla legge, non siamo responsabili di alcun danno indiretto, incidentale, speciale, consequenziale o punitivo, né di alcuna perdita di dati, profitti, ricavi o opportunità commerciali, derivanti dal tuo uso del sito o dall'impossibilità di usarlo. La nostra responsabilità complessiva per qualsiasi pretesa relativa al sito è limitata a 50 dollari statunitensi o all'importo equivalente nella tua valuta.</p><p>Nulla nei presenti termini limita o esclude la responsabilità che non può essere limitata o esclusa per legge, come la responsabilità per frode, per colpa grave o dolo, o per morte o lesioni personali causate da negligenza.</p>`,
      },
      {
        id: 'suspension',
        title: `Sospensione dell'accesso`,
        html: `<p>Possiamo limitare, sospendere o bloccare l'accesso al sito o a funzioni lato server come la Lettura avanzata, ad esempio per fermare abusi o per proteggere il servizio. Puoi smettere di usare il sito in qualsiasi momento.</p>`,
      },
      {
        id: 'changes',
        title: 'Modifiche ai presenti termini',
        html: `<p>Possiamo aggiornare periodicamente i presenti termini. In tal caso, cambieremo la data in cima a questa pagina e, se una modifica è significativa, la segnaleremo sul sito prima che entri in vigore. Se continui a usare il sito dopo una modifica, accetti i termini aggiornati.</p>`,
      },
      {
        id: 'governing-law',
        title: 'Legge applicabile',
        html: `<p>I presenti termini sono regolati dalle leggi del paese in cui {operator} ha sede, senza tener conto delle norme sul conflitto di leggi di tale paese. Se sei un consumatore, mantieni la tutela delle norme imperative del paese in cui vivi e puoi agire in giudizio davanti ai tribunali del luogo in cui risiedi.</p>`,
      },
      {
        id: 'general',
        title: 'Disposizioni generali',
        html: `<p>Se una parte dei presenti termini risulta inapplicabile, le restanti parti rimangono in vigore. Il mancato esercizio di un diritto da parte nostra non costituisce rinuncia allo stesso. I presenti termini costituiscono l'intero accordo tra te e noi in merito al sito. In caso di differenze tra una traduzione dei presenti termini e la versione inglese, prevale la versione inglese.</p>`,
      },
      {
        id: 'contact',
        title: 'Contatti',
        html: `<p>Domande su questi termini? Scrivi a <a href="mailto:{email}">{email}</a> o usa la <a href="/contact">pagina dei contatti</a>.</p>`,
      },
    ],
  },
} satisfies Legal;

export default it;
