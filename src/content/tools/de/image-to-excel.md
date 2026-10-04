---
title: "Bild in Excel umwandeln: Tabelle aus Foto oder Screenshot"
description: "Screenshot oder Foto einer Tabelle in bearbeitbare Zeilen und Spalten umwandeln: Zellen korrigieren, in Excel oder Google Sheets einfügen oder XLSX/CSV laden."
h1: "Bild in Excel umwandeln"
intro: "Zieh einen Screenshot oder ein Foto einer Tabelle hierher und erhalte Zeilen und Spalten, die du bearbeiten, in Excel oder Google Sheets einfügen oder als XLSX oder CSV herunterladen kannst. Das Bild wird auf deinem Gerät gelesen, nie hochgeladen."
navLabel: "Bild in Excel"
order: 6
preset:
  mode: table
  export: xlsx
  sample: table
steps:
  - "Füge ein Bild der Tabelle hinzu und schneide es so zu, dass nur die Tabelle mit ihrer Kopfzeile übrig bleibt."
  - "Vergleiche das bearbeitbare Raster mit dem Bild, korrigiere Zellen und füge bei Bedarf Zeilen und Spalten hinzu oder entferne sie."
  - "Kopiere die Tabelle und füge sie in Excel oder Google Sheets ein – dort landet sie in Zeilen und Spalten."
  - "Oder lade die Tabelle als Excel- (.xlsx) oder CSV-Datei herunter."
faq:
  - q: "Lässt sich das Ergebnis als echte Tabelle in Excel oder Google Sheets einfügen?"
    a: "Ja. Wenn du aus dem Raster kopierst und in Excel oder Google Sheets einfügst, landet jeder Wert in einer eigenen Zelle statt in einem langen Textblock."
  - q: "Kann ich Fehler vor dem Export korrigieren?"
    a: "Ja. Du kannst jede Zelle bearbeiten und im Raster Zeilen und Spalten hinzufügen oder entfernen und die korrigierte Tabelle dann kopieren oder herunterladen."
  - q: "Funktioniert das auch bei Tabellen ohne Rahmenlinien?"
    a: "Ja. Spalten werden anhand der Lücken zwischen ihnen erkannt, Rahmen sind also nicht nötig. Spalten, die sehr eng beieinanderstehen, musst du am ehesten von Hand trennen."
  - q: "Was passiert mit verbundenen Zellen?"
    a: "Ein Wert aus einer verbundenen Zelle, etwa eine Überschrift über mehrere Spalten, landet in einer einzelnen Zelle. Verbinde die Zellen in deiner Tabellenkalkulation erneut, wenn du dasselbe Layout brauchst."
  - q: "Bleiben Formeln erhalten?"
    a: "Nein. Ein Bild zeigt nur die Ergebnisse von Formeln, Summen kommen also als einfache Zahlen an. Füge Formeln bei Bedarf in deiner Tabellenkalkulation wieder ein."
  - q: "Kann ich eine Tabelle aus einem PDF extrahieren?"
    a: "Ja. Füge das PDF hinzu, öffne die Seite mit der Tabelle und stell sie auf den Tabellenmodus um. Seiten mit echtem Text werden direkt übernommen, gescannte Seiten per OCR gelesen."
  - q: "Werden meine Daten hochgeladen?"
    a: "Nein. Die Tabelle wird in deinem Browser gelesen, auf deinem Gerät – wichtig bei Kontoauszügen, Preislisten und anderen Zahlen, die du lieber für dich behältst."
related:
  - pdf-to-text
  - screenshot-to-text
  - invoice-ocr
  - image-to-json
---

Eine Tabelle abzutippen dauert lange, und schnell ist eine Ziffer vertauscht. „Bild in Excel“ liest die Tabelle aus einem Bild und liefert dir ein bearbeitbares Raster aus Zeilen und Spalten, bereit zum Einfügen in eine Tabellenkalkulation oder zum Herunterladen als Datei.

## Tabellen, bei denen sich das Umwandeln lohnt

- **Tabellen in PDFs und Berichten**, die sich nicht sauber kopieren lassen und beim Versuch als eine durcheinandergewürfelte Spalte herauskommen
- **Dashboards und Webseiten**, die Daten anzeigen, aber keinen Export anbieten
- **Preislisten, Tarifübersichten, Fahrpläne und Zeitpläne**, gedruckt oder auf dem Bildschirm
- **Sporttabellen, Ergebnisse und Ligatabellen**
- **Gedruckte Tabellen** in Büchern, Handouts und Handbüchern, mit dem Handy fotografiert
- **Kontoauszüge und Umsatzlisten**, die du in einer Tabellenkalkulation brauchst, ohne sie an eine Website zu schicken

## Wie der Tabellenmodus Zeilen und Spalten findet

Der Tabellenmodus reiht Wörter zu Zeilen auf und findet Spalten anhand der Leerräume, die zwischen ihnen nach unten verlaufen. Eine Tabelle braucht also weder Rahmen noch Gitterlinien, um richtig gelesen zu werden; saubere Ausrichtung ist viel wichtiger als Linien.

Wenn du ein Bild hinzufügst, erkennt Image to Text App eine Tabelle oft von selbst und zeigt einen Hinweis wie „Sieht nach einer Tabelle aus“. Auf dieser Seite ist der Tabellenmodus bereits ausgewählt. Stellt sich heraus, dass du normalen Text hinzugefügt hast, wechsle den Modus, ohne das Bild erneut hinzuzufügen.

## Das Bild vorbereiten

- **Schneide auf die Tabelle zu.** Titel, Anmerkungen und Fußnoten über oder unter einer Tabelle können die Spaltenaufteilung durcheinanderbringen. Behalte die Kopfzeile und lass den Rest weg.
- **Begradige Fotos gedruckter Tabellen.** Spalten müssen gerade nach unten verlaufen. Bei einer schräg fotografierten Tabelle nutzt du das Entzerren mit vier Ecken, damit die Zeilen waagerecht und die Spalten senkrecht laufen. Eine leichte Schräglage korrigiert „Automatisch verbessern“ von selbst.
- **Teile sehr große Tabellen auf.** Ist eine Tabelle breit oder lang und die Schrift winzig, mach zwei oder drei Screenshots von Abschnitten in lesbarer Größe, wandle jeden einzeln um und setze sie in deiner Tabellenkalkulation untereinander.

## Tabellen, die mehr Sorgfalt brauchen

**Verbundene Zellen.** Eine Überschrift über mehrere Spalten oder eine Beschriftung über mehrere Zeilen landet in einer einzelnen Zelle, oft in der Spalte, in der sie beginnt. Verbinde die Zellen nach dem Einfügen in Excel oder Sheets erneut, wenn du das ursprüngliche Layout brauchst.

**Tabellen ohne Rahmen mit schmalen Lücken.** Stehen zwei Spalten sehr eng beieinander, können sie als eine gelesen werden. Füge im Raster eine Spalte hinzu und verschiebe die Werte, oder trenne sie danach in deiner Tabellenkalkulation.

**Text, der in einer Zelle umbricht.** Eine lange Beschreibung auf zwei Zeilen kann wie zwei Tabellenzeilen aussehen. Image to Text App versucht, umbrochenen Text wieder seiner Zeile zuzuordnen. Wirkt eine Zeile trotzdem geteilt, verschieb den Text nach oben und lösche die überzählige Zeile.

**Rechnungen und Belege.** Ist dein Bild eher eine Rechnung als eine reine Tabelle, ist der Modus „Beleg oder Rechnung“ meist die bessere Wahl. Er liest neben den Positionen auch Firmennamen, Datum und Summen. Siehe [Rechnung auslesen](/de/invoice-ocr).

## Prüf die Zahlen, bevor du dich auf sie verlässt

Werte, bei denen sich die Engine unsicher war, sind unterstrichen. In Tabellen sind die üblichen Verdächtigen 0 und O, 1 und l, 5 und S sowie 8 und B, außerdem Dezimalpunkte und Kommas, die winzig sind und in einem unscharfen Bild leicht verloren gehen. Auch Minuszeichen und negative Zahlen in Klammern verdienen einen zweiten Blick.

Ein schneller Test nach dem Einfügen: Addiere eine Spalte in deiner Tabellenkalkulation und vergleiche das Ergebnis mit der Summenzeile im Original. Stimmen beide überein, ist die Spalte sehr wahrscheinlich richtig.

## XLSX, CSV oder Kopieren und Einfügen

- **Kopieren und Einfügen** geht am schnellsten, wenn du die Tabelle in ein Tabellenblatt einfügst, das du schon geöffnet hast.
- **Excel (.xlsx)** ist hier voreingestellt – eine Datei, die sich direkt in Excel öffnet.
- **CSV** ist ein einfaches Format, das fast jedes Programm importieren kann, auch Google Sheets und Datenbanken.

Eine Sache solltest du bei CSV wissen: Wenn Excel eine CSV-Datei per Doppelklick öffnet, rät es den Typ jeder Spalte. Dabei fallen führende Nullen weg, etwa bei Postleitzahlen und Kontonummern, und manche Werte werden zu Datumsangaben. Nutze den Excel-Import „Aus Text/CSV“, um diese Spalten als Text festzulegen, oder lade stattdessen die XLSX-Datei herunter.

Dieselbe Tabelle kannst du auch als JSON für die Verwendung im Code herunterladen; siehe [Bild in JSON](/de/image-to-json). Mehr zu schwierigen Tabellen liest du in [Tabellen aus Bildern extrahieren](/de/guides/how-to-extract-tables-from-images).
