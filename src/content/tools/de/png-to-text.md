---
title: "PNG in Text umwandeln: Text aus PNG-Bildern extrahieren"
description: "PNG-Bilder und Screenshots in bearbeitbaren Text umwandeln. Verlustfreie PNGs lassen sich sauber lesen, Dark Mode wird automatisch erkannt – alles im Browser."
h1: "PNG in Text umwandeln"
intro: "Zieh ein PNG hierher oder füge es direkt aus der Zwischenablage ein und kopiere den Text heraus. Screenshots, Dark-Mode-Aufnahmen und exportierte Grafiken werden auf deinem Gerät gelesen, ohne Upload."
navLabel: "PNG in Text"
order: 11
preset:
  mode: auto
  export: txt
  sample: chat
steps:
  - "Zieh ein PNG auf die Seite, öffne es mit Strg+O (⌘O auf dem Mac) oder füge ein kopiertes Bild mit Strg+V bzw. ⌘V ein."
  - "Schneide Symbolleisten, Icons und Profilbilder weg, sodass nur der gewünschte Text im Bild bleibt."
  - "Zeigt das PNG Code, eine Tabelle oder ein formatiertes Dokument, wechsle in den passenden Lesemodus."
  - "Drück Strg+Shift+C (⌘+Shift+C auf dem Mac), um den gesamten Text zu kopieren, oder lade ihn als .txt-Datei herunter."
faq:
  - q: "Warum lassen sich PNG-Screenshots meist gut lesen?"
    a: "PNG ist verlustfrei, die Kanten der Buchstaben bleiben also scharf, statt die fleckigen Artefakte der JPEG-Kompression abzubekommen. Ein PNG-Screenshot mit klarem Text gehört zum Einfachsten, was sich lesen lässt."
  - q: "Was passiert mit einem transparenten Hintergrund?"
    a: "Transparente Bereiche werden vor dem Lesen auf Weiß gesetzt. Dunkler Text wird normal gelesen, aber weißer oder sehr heller Text auf transparentem Hintergrund verschwindet. Leg ihn deshalb vorher in einem Bildbearbeitungsprogramm auf einen dunklen Hintergrund."
  - q: "Kann das Tool Screenshots im Dark Mode lesen?"
    a: "Ja. „Automatisch verbessern“ kehrt hellen Text auf dunklem Grund vor dem Lesen um und listet diesen Schritt auf. Du kannst „Farben umkehren“ auch selbst in den manuellen Werkzeugen einschalten."
  - q: "Warum werden Icons zu zufälligen Buchstaben oder Symbolen?"
    a: "Icons, Emojis und Bedienelemente können für eine OCR-Engine wie Buchstaben oder Satzzeichen aussehen. Schneide sie vor dem Lesen weg oder lösche die verirrten Zeichen danach im Editor."
  - q: "Wird mein PNG irgendwo hochgeladen?"
    a: "Nein. Image to Text App liest das Bild mit einer OCR-Engine, die in deinem Browser läuft, die Datei bleibt also auf deinem Gerät."
  - q: "Kann ich mehrere PNG-Dateien auf einmal umwandeln?"
    a: "Ja. Füge bis zu 50 Bilder pro Arbeitsbereich hinzu, jeweils bis zu 25 MB. Jedes wird zu einer Seite, und du kannst sie einzeln oder als ein gemeinsames Dokument kopieren oder herunterladen."
related:
  - screenshot-to-text
  - jpg-to-text
  - code-screenshot-to-text
  - image-to-markdown
---

PNG ist das Format, in dem die meisten Screenshot-Tools unter Windows und auf dem Mac standardmäßig speichern, und das, was die meisten Apps exportieren, wenn du eine Folie, ein Diagramm, eine Grafik oder ein Design als Bild sicherst. Deshalb sind PNGs die häufigste Quelle für Text, der in einem Bild festsitzt: ein Einstellungsbildschirm, ein Chat, eine Folie aus einer Präsentation, ein beschriftetes Diagramm oder eine Seite aus einem Bericht, die dir jemand exportiert hat.

## Warum PNG das freundlichste Format für OCR ist

PNG ist verlustfrei. Jedes Pixel wird exakt gespeichert, die scharfen Kanten der Buchstaben bleiben also erhalten – anders als bei JPEG, das sie bei jedem Speichern ein wenig verwischt. Bei Text ist der Unterschied spürbar: Ein PNG mit kleiner Schrift lässt sich oft sauber lesen, wo ein JPEG desselben Bildes mehrere Wörter zum Prüfen liefert.

Die Schwachstelle eines Screenshots ist nicht das Format, sondern die Größe. Text in Benutzeroberflächen ist auf dem Bildschirm oft klein, jeder Buchstabe also nur eine Handvoll Pixel hoch. „Automatisch verbessern“ vergrößert kleine Schrift vor dem Lesen. Wenn du den Screenshot aber gerade erst machst, gibt Hineinzoomen (Strg und + in den meisten Browsern und Apps, ⌘ und + auf dem Mac) der Engine mehr Material.

Auf manchen Bildschirmen wird Text mit leichten farbigen Rändern dargestellt, damit er glatter wirkt. Du bemerkst sie erst, wenn du ganz nah heranzoomst, und sie machen selten Probleme. Liest sich ein Screenshot seltsam, probier „Graustufen“ in den manuellen Werkzeugen.

## Transparente Hintergründe

PNGs können transparente Bereiche haben – typisch für Logos, Sticker, Icons und Grafiken aus Designprogrammen. Vor dem Lesen setzt Image to Text App die Transparenz auf Weiß, so wie die meisten Bildbetrachter sie auch anzeigen.

Für dunklen Text ist das kein Problem. Schwierig wird es bei Grafiken, die für einen dunklen Hintergrund gemacht sind: Weißer Text auf transparentem Grund wird zu Weiß auf Weiß, und es bleibt nichts zu lesen. Das Bild danach umzukehren hilft nicht, weil Buchstaben und Hintergrund jetzt dieselbe Farbe haben. Öffne das PNG in einem Bildbearbeitungsprogramm und füge einen dunklen Hintergrund hinzu, oder mach einen Screenshot davon, während es auf einer dunklen Seite angezeigt wird, und lies dann diesen.

## Dark Mode und farbige Oberflächen

Screenshots im Dark Mode werden automatisch verarbeitet. „Automatisch verbessern“ erkennt hellen Text auf dunklem Grund, kehrt ihn um und listet den Schritt auf, damit du weißt, was passiert ist. Halte „Vergleichen“ gedrückt, um das Original zu sehen.

Farbige Buttons, grauer Platzhaltertext und Text auf Farbverläufen sind schwieriger, weil Buchstaben und Hintergrund weniger Kontrast haben. Fehlt eine Beschriftung im Ergebnis, erhöhe den Kontrast oder probier „Schwarzweiß“ und lies dann mit Strg+Enter (⌘+Enter auf dem Mac) erneut.

## Störende Oberflächenelemente wegschneiden

Screenshots enthalten meist mehr als Text: Icons, Profilbilder, Symbolleisten, Scrollbalken und Emojis. Eine OCR-Engine versucht, alles zu lesen, also kann aus einer Lupe ein „Q“ werden und aus einem Häkchen ein „v“. Das Bild auf den benötigten Teil zuzuschneiden ist das Nützlichste, was du mit einem PNG-Screenshot tun kannst.

Chat-Screenshots mischen außerdem Namen, Uhrzeiten und Lesebestätigungen unter die Nachrichten. Jedes davon erscheint als eigene Zeile und lässt sich so leicht erkennen und löschen.

## Den passenden Modus für den PNG-Inhalt wählen

Image to Text App sieht sich das Bild an und wählt einen Lesemodus, mit einem Hinweis wie „Sieht nach einer Tabelle aus“. Du kannst jederzeit wechseln, ohne das Bild erneut hinzuzufügen.

- **Code aus einem Editor oder Terminal:** Der Codemodus behält Einrückung und Abstände bei und begradigt typografische Anführungszeichen. Siehe [Code-Screenshot in Text](/de/code-screenshot-to-text).
- **Eine Tabelle oder Kalkulation:** Der Tabellenmodus liefert ein bearbeitbares Raster, das sich in Excel oder Google Sheets einfügen lässt. Siehe [Bild in Excel](/de/image-to-excel).
- **Eine Folie oder ein Dokument:** Der Dokumentmodus fügt Zeilen zu Absätzen zusammen und behält Überschriften und Aufzählungen bei – passend für einen Download als [Markdown](/de/image-to-markdown) oder Word.

## Grenzen, die du kennen solltest

Text über Fotos oder unruhigen Mustern, stilisierte Schrift in Grafiken und schräg verlaufende Beschriftungen (etwa an einer Diagrammachse) sind die üblichen Fehlerquellen bei PNGs. Wörter, bei denen sich die Engine unsicher war, sind unterstrichen, damit du sie mit dem Bild abgleichen kannst. Klick auf eine beliebige Zeile, und ihre Stelle im Bild leuchtet auf.

Wenn du statt einer gespeicherten Datei einen frischen Screenshot hast, kannst du das Speichern ganz überspringen. Die Seite [Screenshot in Text](/de/screenshot-to-text) zeigt, wie du eine Aufnahme direkt in die Zwischenablage legst und hier einfügst.
