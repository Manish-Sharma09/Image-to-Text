// German legal documents. Translated from en.ts — see the conventions there.
import type { Legal } from './en';

const de = {
  privacy: {
    title: 'Datenschutzerklärung',
    intro: 'Die vollständige Datenschutzerklärung, Abschnitt für Abschnitt. Die Zusammenfassung oben ist eine getreue Kurzfassung; wo die beiden voneinander abweichen, gilt diese Datenschutzerklärung.',
    sections: [
      {
        id: 'who-we-are',
        title: 'Wer wir sind',
        html: '<p>Diese Datenschutzerklärung gilt für {site} unter {url} und das dazugehörige Bild-zu-Text-Tool, betrieben von {operator} („wir“, „uns“). Sie erklärt, welche Informationen verarbeitet werden, wenn du die Website nutzt, warum das geschieht und welche Wahlmöglichkeiten du hast. Nach Datenschutzgesetzen wie der DSGVO der EU und des Vereinigten Königreichs sind wir der Verantwortliche für die hier beschriebenen Informationen.</p><p>Fragen oder Anfragen: <a href="mailto:{email}">{email}</a>.</p>',
      },
      {
        id: 'information-we-process',
        title: 'Welche Informationen wir verarbeiten',
        html: '<p>Das Tool ist so gebaut, dass es so wenige Informationen wie möglich braucht. Hier steht alles, was verarbeitet wird, und wo.</p><ul><li><strong>Bilder und Texte, die du auf deinem Gerät liest.</strong> Gelesen wird in deinem Browser. Deine Bilder, der Text und deine Änderungen werden nicht an uns gesendet, und wir können sie nicht sehen.</li><li><strong>Erweiterte Erkennung, nur wenn du sie wählst.</strong> Wo diese Option angeboten wird, wird das eine Seitenbild, das du bestätigst, auf höchstens 2.000 Pixel verkleinert und zusammen mit dem Lesemodus und den Sprachen, die du gewählt hast, an unseren Server gesendet und zum Lesen an Anthropic weitergegeben. Der Text wird an dich zurückgegeben. Wir speichern weder das Bild noch den Text.</li><li><strong>Bilder aus einem Link.</strong> Wenn dein Browser einen Bildlink nicht direkt laden kann, ruft unser Server dieses Bild für dich ab und reicht es direkt an dich weiter, ohne es zu speichern. Dafür erhält der Server den Link, den du eingefügt hast.</li><li><strong>Technische Anfragedaten.</strong> Wie bei jeder Website erhalten unser Server und unser Hosting-Anbieter die Informationen, die dein Browser mit jeder Anfrage sendet: deine IP-Adresse, den Browsertyp, die aufgerufene Seite und den Zeitpunkt. Um die Tageslimits für die Erweiterte Erkennung und den Abruf von Bildlinks durchzusetzen, zählen wir Anfragen pro Besucher anhand eines Hashwerts der IP-Adresse, der mit einem täglich wechselnden Schlüssel erzeugt wird. Die Zählerstände werden täglich verworfen.</li><li><strong>Nachrichten, die du uns sendest.</strong> Wenn du uns eine E-Mail schreibst, erhalten wir deine E-Mail-Adresse und alles, was deine Nachricht enthält.</li><li><strong>Auf deinem Gerät gespeicherte Daten.</strong> Deine Einstellungen (etwa Design und Sprachen), der Verlauf, wenn du ihn einschaltest, sowie die zwischengespeicherten App- und Engine-Dateien liegen im Speicher deines Browsers. Sie bleiben auf deinem Gerät und werden nie an uns gesendet.</li></ul><p>Es gibt keine Konten, wir fragen nie nach deinem Namen, und wir nutzen keine Werbung, keine Tracking-Cookies und keine Analysedienste von Drittanbietern.</p>',
      },
      {
        id: 'service-providers',
        title: 'Dienste, die am Betrieb der Website beteiligt sind',
        html: '<p>Einige externe Dienste helfen dabei, die Website bereitzustellen. Keiner von ihnen erhält deine Bilder – außer Anthropic, wenn du die Erweiterte Erkennung wählst.</p><ul><li><strong>Unser Hosting-Anbieter</strong> betreibt unseren Server und verarbeitet Anfragedaten in unserem Auftrag, um die Website bereitzustellen.</li><li><strong>jsDelivr.</strong> Die Sprachdateien der Texterkennungs-Engine und der Decoder für HEIC-Fotos vom iPhone in Browsern, die diese nicht selbst öffnen können, werden über das Content Delivery Network jsDelivr heruntergeladen. jsDelivr sieht deine IP-Adresse und welche Datei angefordert wurde, nie deine Bilder. Siehe die <a href="https://www.jsdelivr.com/terms/privacy-policy" rel="noopener">Datenschutzerklärung von jsDelivr</a>.</li><li><strong>Anthropic</strong>, nur für die Erweiterte Erkennung und nur für die Seite, die du bestätigst. Die Verarbeitung erfolgt über die kommerzielle API von Anthropic; laut den kommerziellen Bedingungen von Anthropic trainiert Anthropic seine Modelle standardmäßig nicht mit API-Daten. Siehe die <a href="https://www.anthropic.com/legal/privacy" rel="noopener">Datenschutzerklärung von Anthropic</a>.</li></ul><p>Die Seiten, Schriftarten, Skripte und die Texterkennungs-Engine selbst werden von unserer eigenen Domain ausgeliefert.</p>',
      },
      {
        id: 'why-we-process-it',
        title: 'Warum wir sie verarbeiten',
        html: '<p>Wir verarbeiten Informationen nur zu diesen Zwecken und auf diesen Rechtsgrundlagen nach der DSGVO:</p><ul><li><strong>Um die Funktionen bereitzustellen, die du anforderst</strong>, etwa die Erweiterte Erkennung und das Abrufen eines Bildes aus einem Link (Erfüllung eines Vertrags, Art. 6 Abs. 1 lit. b DSGVO).</li><li><strong>Um die Website sicher und funktionsfähig zu halten</strong>, einschließlich der Verhinderung von Missbrauch und der Durchsetzung von Tageslimits (unsere berechtigten Interessen, Art. 6 Abs. 1 lit. f DSGVO).</li><li><strong>Um deine Nachrichten zu beantworten</strong> (unser berechtigtes Interesse, dir zu antworten, Art. 6 Abs. 1 lit. f DSGVO).</li><li><strong>Um rechtliche Verpflichtungen zu erfüllen</strong>, wo ein Gesetz dies verlangt (Art. 6 Abs. 1 lit. c DSGVO).</li></ul><p>Wir verkaufen deine Informationen nie, nutzen sie nie für Werbung und verwenden deine Bilder oder Texte nie zum Training von KI-Modellen.</p>',
      },
      {
        id: 'how-long-we-keep-it',
        title: 'Wie lange wir sie speichern',
        html: '<ul><li><strong>Auf deinem Gerät gelesene Bilder und Texte:</strong> werden von uns nie gespeichert. Mit eingeschaltetem Verlauf bleiben sie in deinem Browser, bis du sie löschst.</li><li><strong>Erweiterte Erkennung und Bilder aus einem Link:</strong> werden von unserem Server nicht gespeichert; sie existieren nur, solange die Anfrage bearbeitet wird. Wie lange Anthropic Daten aufbewahrt, ist in der Datenschutzerklärung von Anthropic beschrieben.</li><li><strong>Zähler für die Tageslimits:</strong> werden täglich verworfen.</li><li><strong>Technische Anfragedaten:</strong> werden von unserem Server und unserem Hosting-Anbieter nur so lange aufbewahrt, wie es für Sicherheit und Fehlerbehebung nötig ist, und dann gelöscht.</li><li><strong>E-Mails:</strong> werden so lange aufbewahrt, wie es nötig ist, um deine Nachricht und etwaige weitere Korrespondenz dazu zu bearbeiten, und dann gelöscht.</li></ul>',
      },
      {
        id: 'sharing',
        title: 'An wen wir sie weitergeben',
        html: '<p>Wir verkaufen oder vermieten keine personenbezogenen Daten, und wir geben sie nicht für kontextübergreifende verhaltensbasierte Werbung weiter. Wir geben sie nur an die oben beschriebenen Dienstleister weiter, die sie in unserem Auftrag verarbeiten, oder wenn das Gesetz es verlangt: zum Beispiel, um einer gültigen rechtlichen Anfrage nachzukommen oder um die Rechte und die Sicherheit unserer Nutzer und der Website zu schützen.</p>',
      },
      {
        id: 'international-transfers',
        title: 'Internationale Datenübermittlungen',
        html: '<p>Unsere Dienstleister können Informationen in anderen Ländern als deinem verarbeiten, auch in den Vereinigten Staaten. Wo das Gesetz es verlangt, stützen sich diese Übermittlungen auf geeignete Garantien, etwa die Standardvertragsklauseln der Europäischen Kommission.</p>',
      },
      {
        id: 'cookies',
        title: 'Cookies und lokaler Speicher',
        html: '<p>Wir setzen keine Cookies. Die Website nutzt den lokalen Speicher, IndexedDB und den Cache deines Browsers nur für Funktionen, die du verwendest: um sich dein Design, deine Sprachen und Einstellungen zu merken, um den Verlauf aufzubewahren, wenn du ihn einschaltest, und damit das Tool offline funktioniert. Nichts davon wird für Tracking oder Werbung verwendet, und du kannst alles jederzeit in den Einstellungen deines Browsers löschen.</p>',
      },
      {
        id: 'your-rights',
        title: 'Deine Rechte',
        html: '<p>Je nachdem, wo du lebst, hast du möglicherweise das Recht, Auskunft über deine personenbezogenen Daten zu erhalten und sie berichtigen oder löschen zu lassen, der Verwendung durch uns zu widersprechen oder sie einschränken zu lassen, die Daten in einem übertragbaren Format zu erhalten und eine erteilte Einwilligung zu widerrufen. In der EU, im Vereinigten Königreich und in vergleichbaren Rechtsordnungen kannst du dich außerdem bei deiner Datenschutz-Aufsichtsbehörde beschweren.</p><p>Wenn du in Kalifornien lebst, hast du das Recht zu erfahren, welche personenbezogenen Daten wir erheben und wie wir sie verwenden, uns zu bitten, sie zu löschen oder zu berichtigen, und wegen der Ausübung dieser Rechte nicht benachteiligt zu werden. Wir verkaufen oder teilen keine personenbezogenen Daten im Sinne der Begriffsbestimmungen des CCPA.</p><p>Um eine Anfrage zu stellen, schreib an <a href="mailto:{email}">{email}</a>. Da das Tool deine Bilder und Texte nicht erhebt und es keine Konten gibt, haben wir in der Regel keine Daten, die dich identifizieren; wir beantworten aber jede Anfrage innerhalb der gesetzlich vorgesehenen Frist. Die Daten auf deinem Gerät hast du selbst in der Hand: Lösche Dokumente im Verlauf oder lösche die Daten dieser Website in deinem Browser.</p>',
      },
      {
        id: 'children',
        title: 'Kinder',
        html: '<p>Die Website richtet sich nicht an Kinder unter 13 Jahren bzw. im Europäischen Wirtschaftsraum unter 16 Jahren, und wir erheben wissentlich keine personenbezogenen Daten von ihnen. Wenn du glaubst, dass uns ein Kind personenbezogene Daten gesendet hat, kontaktiere uns, und wir löschen sie.</p>',
      },
      {
        id: 'security',
        title: 'Sicherheit',
        html: '<p>Die Website wird über HTTPS ausgeliefert, Bilder werden standardmäßig auf deinem Gerät gelesen, und unser Server speichert weder Bilder noch Texte. Der Abruf von Bildlinks verbindet sich nur mit öffentlichen Webadressen und unterliegt Größen- und Zeitlimits. Keine Methode der Übertragung oder Speicherung ist vollständig sicher, aber deine Daten von unseren Servern fernzuhalten, ist der stärkste Schutz, den wir bieten können.</p>',
      },
      {
        id: 'changes',
        title: 'Änderungen dieser Datenschutzerklärung',
        html: '<p>Wenn wir diese Datenschutzerklärung ändern, aktualisieren wir das Datum oben auf dieser Seite. Wenn sich eine Änderung wesentlich darauf auswirkt, wie mit deinen Informationen umgegangen wird, weisen wir außerdem vor ihrem Inkrafttreten auf der Website darauf hin.</p>',
      },
      {
        id: 'contact',
        title: 'Kontakt',
        html: '<p>Bei allen Fragen zum Datenschutz schreib an <a href="mailto:{email}">{email}</a> oder nutze die <a href="/contact">Kontaktseite</a>.</p>',
      },
    ],
  },

  terms: {
    eyebrow: 'Rechtliches',
    title: 'Nutzungsbedingungen',
    lede: 'Die Vereinbarung zwischen dir und uns, wenn du {site} nutzt. Wir haben sie so kurz und verständlich gehalten, wie wir konnten.',
    sections: [
      {
        id: 'agreement',
        title: 'Zustimmung zu diesen Bedingungen',
        html: '<p>Diese Bedingungen gelten, wenn du {site} unter {url} (die „Website“) nutzt, einschließlich des dazugehörigen Bild-zu-Text-Tools (der „Dienst“). Die Website wird von {operator} („wir“, „uns“) betrieben. Indem du die Website nutzt, stimmst du diesen Bedingungen zu. Wie wir mit deinen Daten umgehen, erklärt unsere <a href="/privacy">Datenschutzerklärung</a>. Wenn du mit diesen Bedingungen nicht einverstanden bist, nutze die Website bitte nicht.</p>',
      },
      {
        id: 'the-service',
        title: 'Der Dienst',
        html: '<p>{site} wandelt Bilder und PDFs in bearbeitbaren Text um. Gelesen wird standardmäßig in deinem Browser, und der Dienst ist kostenlos und ohne Konto nutzbar. Wir können jederzeit Funktionen hinzufügen, ändern oder entfernen, und wir garantieren nicht, dass der Dienst immer verfügbar, unterbrechungsfrei oder fehlerfrei ist.</p>',
      },
      {
        id: 'your-content',
        title: 'Deine Bilder und Texte',
        html: '<ul><li><strong>Sie gehören weiterhin dir.</strong> Du behältst alle Rechte, die du an den Bildern hast, die du liest, und an dem Text, den du daraus erhältst. Wir beanspruchen an beidem kein Eigentum.</li><li><strong>Wir erhalten sie nicht</strong>, wenn sie auf deinem Gerät gelesen werden. Wenn du die Erweiterte Erkennung nutzt oder ein Bild aus einem Link abrufst, erlaubst du uns und unseren Dienstleistern, dieses Bild nur so weit zu verarbeiten, wie es nötig ist, um dir das Ergebnis zurückzugeben.</li><li><strong>Du brauchst das Recht, sie zu nutzen.</strong> Lies nur Bilder, die dir gehören oder die du verwenden darfst, und respektiere bei der Verwendung des Texts das Urheberrecht, die Privatsphäre und die Vertraulichkeit anderer.</li></ul>',
      },
      {
        id: 'acceptable-use',
        title: 'Zulässige Nutzung',
        html: '<p>Bitte nutze die Website fair. Du verpflichtest dich, Folgendes zu unterlassen:</p><ul><li>den Dienst zu nutzen, um gegen Gesetze zu verstoßen oder die Rechte anderer zu verletzen;</li><li>Material zu verarbeiten, das rechtswidrig ist oder zu dessen Verarbeitung du nicht berechtigt bist;</li><li>automatisierte oder massenhafte Anfragen an unsere Server zu senden oder zu versuchen, Tageslimits oder andere Schutzmaßnahmen zu umgehen;</li><li>die Website zu beeinträchtigen, sie für andere zu stören oder sie ohne unsere Erlaubnis auf Sicherheitslücken zu untersuchen (wenn du ein Sicherheitsproblem findest, melde es bitte an <a href="mailto:{email}">{email}</a>);</li><li>den Abruf von Bildlinks zu nutzen, um Adressen zu erreichen, auf die du nicht zugreifen darfst;</li><li>die Website oder ihre Ergebnisse als deinen eigenen Dienst auszugeben oder den Eindruck zu erwecken, dass wir dich befürworten.</li></ul><p>Die Open-Source-Komponenten des Tools können unter ihren eigenen Lizenzen genutzt werden; diese Regeln gelten für unsere Website und unsere Server.</p>',
      },
      {
        id: 'accuracy',
        title: 'Genauigkeit der Ergebnisse',
        html: '<p>Texterkennung ist nie perfekt. Ergebnisse können Fehler enthalten, besonders bei Handschrift, Fotos in schlechter Qualität, kleiner Schrift und komplexen Layouts. Die Wörter zum Prüfen und die Erkennungssicherheit sind Anhaltspunkte, keine Garantien. Prüfe den Text immer, bevor du dich darauf verlässt, und sei besonders sorgfältig bei Zahlen, Namen, Beträgen und allem, was rechtliche, medizinische oder finanzielle Folgen hat. Du bist dafür verantwortlich, wie du die Ergebnisse verwendest.</p>',
      },
      {
        id: 'enhanced-reading',
        title: 'Erweiterte Erkennung',
        html: '<p>Wo sie angeboten wird, sendet die Erweiterte Erkennung die Seite, die du bestätigst, über unseren Server an das Modell Claude von Anthropic. Sie ist optional, auf eine bestimmte Anzahl von Seiten pro Besucher und Tag begrenzt und kann jederzeit geändert, eingeschränkt oder eingestellt werden. Wenn du sie nutzt, verpflichtest du dich außerdem, keine Inhalte einzureichen, die gegen die <a href="https://www.anthropic.com/legal/aup" rel="noopener">Nutzungsrichtlinie von Anthropic</a> verstoßen.</p>',
      },
      {
        id: 'our-content',
        title: 'Unsere Inhalte und Open-Source-Software',
        html: '<p>Das Design, die Texte und die Grafiken der Website sowie der Name und das Logo von {site} gehören uns oder unseren Lizenzgebern. Du darfst gern auf jede Seite verlinken. Die Texterkennungs-Engine und andere Komponenten sind Open-Source-Software, die unter eigenen Lizenzen bereitgestellt wird, die für diese Komponenten gelten; die wichtigsten sind auf der Seite <a href="/about">Über uns</a> aufgeführt.</p>',
      },
      {
        id: 'third-parties',
        title: 'Links und andere Dienste',
        html: '<p>Die Website verlinkt auf andere Websites und greift auf externe Dienste zurück, etwa jsDelivr und, für die Erweiterte Erkennung, Anthropic. Wir haben keine Kontrolle über sie und sind nicht für ihre Inhalte oder Praktiken verantwortlich; es gelten ihre eigenen Bedingungen und Richtlinien.</p>',
      },
      {
        id: 'no-warranty',
        title: 'Keine Gewährleistung',
        html: '<p>Der Dienst ist kostenlos und wird „wie besehen“ und ohne Gewähr für seine Verfügbarkeit bereitgestellt. Soweit gesetzlich zulässig, übernehmen wir keinerlei ausdrückliche oder stillschweigende Gewährleistung, einschließlich der Gewährleistung der Marktgängigkeit, der Eignung für einen bestimmten Zweck, der Richtigkeit und der Nichtverletzung von Rechten Dritter.</p>',
      },
      {
        id: 'liability',
        title: 'Haftungsbeschränkung',
        html: '<p>Soweit gesetzlich zulässig, haften wir nicht für indirekte Schäden, Neben- oder Folgeschäden, besondere Schäden oder Strafschadensersatz und auch nicht für Datenverluste, entgangenen Gewinn, Umsatzeinbußen oder Geschäftsverluste, die sich aus deiner Nutzung der Website oder daraus ergeben, dass du sie nicht nutzen kannst. Unsere Gesamthaftung für alle Ansprüche im Zusammenhang mit der Website ist auf 50 US-Dollar oder den entsprechenden Betrag in deiner Währung begrenzt.</p><p>Nichts in diesen Bedingungen beschränkt oder schließt eine Haftung aus, die gesetzlich nicht beschränkt oder ausgeschlossen werden kann, etwa die Haftung für Betrug, für grobe Fahrlässigkeit oder Vorsatz oder für fahrlässig verursachte Todesfälle oder Körperverletzungen.</p>',
      },
      {
        id: 'suspension',
        title: 'Sperrung des Zugangs',
        html: '<p>Wir können den Zugang zur Website oder zu Serverfunktionen wie der Erweiterten Erkennung einschränken, aussetzen oder sperren, zum Beispiel um Missbrauch zu unterbinden oder den Dienst zu schützen. Du kannst die Nutzung der Website jederzeit beenden.</p>',
      },
      {
        id: 'changes',
        title: 'Änderungen dieser Bedingungen',
        html: '<p>Wir können diese Bedingungen von Zeit zu Zeit aktualisieren. In diesem Fall ändern wir das Datum oben auf dieser Seite, und bei wesentlichen Änderungen weisen wir vor ihrem Inkrafttreten auf der Website darauf hin. Wenn du die Website nach einer Änderung weiter nutzt, akzeptierst du die aktualisierten Bedingungen.</p>',
      },
      {
        id: 'governing-law',
        title: 'Anwendbares Recht',
        html: '<p>Für diese Bedingungen gilt das Recht des Landes, in dem {operator} niedergelassen ist, unter Ausschluss seiner kollisionsrechtlichen Bestimmungen. Wenn du Verbraucher bist, behältst du den Schutz durch die zwingenden Rechtsvorschriften des Landes, in dem du lebst, und kannst ein Verfahren vor den Gerichten an deinem Wohnort einleiten.</p>',
      },
      {
        id: 'general',
        title: 'Allgemeines',
        html: '<p>Sollte sich ein Teil dieser Bedingungen als nicht durchsetzbar erweisen, bleibt der Rest wirksam. Wenn wir ein Recht nicht durchsetzen, verzichten wir damit nicht darauf. Diese Bedingungen bilden die gesamte Vereinbarung zwischen dir und uns in Bezug auf die Website. Wo eine Übersetzung dieser Bedingungen von der englischen Fassung abweicht, gilt die englische Fassung.</p>',
      },
      {
        id: 'contact',
        title: 'Kontakt',
        html: '<p>Fragen zu diesen Bedingungen? Schreib an <a href="mailto:{email}">{email}</a> oder nutze die <a href="/contact">Kontaktseite</a>.</p>',
      },
    ],
  },
} satisfies Legal;

export default de;
