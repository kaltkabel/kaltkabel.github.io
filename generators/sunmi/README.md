# Sunmi MSN Generator – README

Diese Webapp erfasst eine Sunmi ID und zugehörige Seriennummern (MSN) und
exportiert sie als XLSX-Datei.

## Nutzung

1. Sunmi ID eintragen.
2. Seriennummern eintragen (siehe Format unten).
3. Auf **„XLSX erstellen"** klicken.
4. Bei bestandener Prüfung wird die XLSX-Datei automatisch heruntergeladen,
   zusätzlich erscheinen eine Warnungs-Box und eine farbige Vorschau-Tabelle.

## Formularfelder

| Feld | Pflicht | Mehrzeilig |
|---|---|---|
| Sunmi ID | ja | nein |
| Seriennummern (MSN) | ja – mind. 1 | ja |

### Format der Seriennummern
Die Seriennummern können **per Leerzeichen getrennt**, **untereinander
(1 pro Zeile)**, oder in beliebiger Mischung aus beidem eingegeben werden.
Die Eingabe wird an jeder Folge von Leerzeichen, Tabs und Zeilenumbrüchen
gesplittet; leere Einträge werden verworfen.

Beispiel (alle drei Varianten sind gleichwertig):
```
MSN12345 MSN12346 MSN12347
```
```
MSN12345
MSN12346
MSN12347
```
```
MSN12345 MSN12346
MSN12347
```

## Pflichtfeld-Logik (blockiert die Erstellung, wenn verletzt)

1. **Sunmi ID ist Pflicht.**
2. **Mindestens eine Seriennummer ist Pflicht.**

Wird eine dieser Regeln verletzt, wird **keine Datei erzeugt** und eine
Fehlermeldung angezeigt.

## Datenprüfung / Warnungen (nicht blockierend)

Nach bestandener Pflichtfeld-Validierung wird die Datei erzeugt, aber
zusätzlich folgender Hinweis angezeigt:

| Prüfung | Bedingung | Schweregrad |
|---|---|---|
| Doppelte Seriennummer | gleicher MSN-Wert kommt mehrfach vor | Warnung |

Betroffene Zeilen werden in der Vorschau-Tabelle lila markiert und mit dem
Badge „Dup" gekennzeichnet.

## XLSX-Format

Eine Zeile pro Seriennummer, Sunmi ID wird in jeder Zeile wiederholt.

Spalten (feste Reihenfolge):
```
MSN, ID
```

| Spalte | Wert | Regel |
|---|---|---|
| `MSN` | Seriennummer | 1 Zeile pro Seriennummer |
| `ID` | Sunmi ID | für alle Zeilen identisch |

### Beispiel

Eingabe:
- Sunmi ID: `123456789`
- Seriennummern: `MSN12345`, `MSN12346`, `MSN12347`

Ausgabe (Sheet „MSN"):

| MSN | ID |
|---|---|
| MSN12345 | 123456789 |
| MSN12346 | 123456789 |
| MSN12347 | 123456789 |

### Dateiname
`sunmi_<Sunmi-ID>.xlsx` (Sonderzeichen werden durch `_` ersetzt).

## Technische Details

- Reines Frontend, kein Server nötig – Verarbeitung und Download laufen
  vollständig im Browser.
- XLSX-Erstellung über die Bibliothek **SheetJS** (`xlsx.full.min.js`, per
  CDN eingebunden).
- Spaltenbreiten sind für die Lesbarkeit vordefiniert (`MSN`: 22, `ID`: 18).
- Zeilenzähler unter dem Seriennummern-Feld zeigt die Anzahl erkannter
  Seriennummern live an.
- Dark/Light-Umschalter oben rechts, Standard ist Dark Mode (nicht dauerhaft
  gespeichert).
