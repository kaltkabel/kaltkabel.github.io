# Sunmi MSN Generator – README

Diese Webapp erfasst eine Sunmi ID und zugehörige Seriennummern (MSN) und
exportiert sie als XLSX-Datei.

## Nutzung

1. Sunmi ID eintragen.
2. Seriennummern eintragen (siehe Format unten).
3. Auf **„XLSX erstellen"** klicken.
4. Bei bestandener Prüfung wird die XLSX-Datei automatisch heruntergeladen,
   zusätzlich erscheinen eine Warnungs-Box und eine farbige Vorschau-Tabelle.
5. Über **„← Zurück zum Hauptmenü"** oben links gelangt man zurück zur
   Generatoren-Übersicht (`/generators/index.html`).

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

## Datenprüfung / Duplikat-Bereinigung

Nach bestandener Pflichtfeld-Validierung wird die Eingabe auf doppelte
Seriennummern geprüft:

| Prüfung | Verhalten | Schweregrad |
|---|---|---|
| Doppelte Seriennummer | wird **automatisch entfernt** – das **erste Vorkommen bleibt erhalten**, alle weiteren Vorkommen werden **nicht** exportiert | Warnung |

Im Gegensatz zu den anderen beiden Generatoren (Eloview, Zero-Touch), bei
denen Duplikate nur markiert, aber nicht entfernt werden, werden hier
doppelte Seriennummern **aus dem Export gestrichen**, um Mehrfach-Import
derselben Seriennummer zu verhindern.

Die Vorschau-Tabelle zeigt weiterhin **alle** eingegebenen Zeilen (auch die
entfernten), damit nachvollziehbar bleibt, was gestrichen wurde:

- **Lila markiert, Badge „Dup"** – erstes Vorkommen einer doppelten
  Seriennummer; bleibt im Export enthalten.
- **Durchgestrichen/abgeblendet, Badge „Entfernt"** – weiteres Vorkommen
  derselben Seriennummer; wird **nicht** in die XLSX-Datei übernommen.

Die Statusmeldung und Warnungs-Box zeigen an, wie viele Duplikate entfernt
wurden und wie viele Zeilen tatsächlich exportiert wurden.

## XLSX-Format

Eine Zeile pro **exportierter** Seriennummer (Duplikate ab dem zweiten
Vorkommen ausgeschlossen), Sunmi ID wird in jeder Zeile wiederholt.

Spalten (feste Reihenfolge):
```
MSN, ID
```

| Spalte | Wert | Regel |
|---|---|---|
| `MSN` | Seriennummer | 1 Zeile pro exportierter (nicht entfernter) Seriennummer |
| `ID` | Sunmi ID | für alle Zeilen identisch |

### Beispiel

Eingabe:
- Sunmi ID: `123456789`
- Seriennummern: `MSN12345`, `MSN12346`, `MSN12345`, `MSN12347`

`MSN12345` kommt zweimal vor – das zweite Vorkommen wird entfernt.

Ausgabe (Sheet „MSN"):

| MSN | ID |
|---|---|
| MSN12345 | 123456789 |
| MSN12346 | 123456789 |
| MSN12347 | 123456789 |

### Dateiname
`sunmi_<Sunmi-ID>_<Zeitstempel>.xlsx` (Sonderzeichen im Sunmi-ID-Teil werden
durch `_` ersetzt). Der Zeitstempel hat das Format `JJJJMMTT_HHMMSS` (lokale
Zeit des Browsers), z. B. `20260917_143022` für den 17.09.2026, 14:30:22 Uhr.
Dadurch überschreibt ein erneuter Export dieselbe Datei nicht.

## Technische Details

- Reines Frontend, kein Server nötig – Verarbeitung und Download laufen
  vollständig im Browser.
- XLSX-Erstellung über die Bibliothek **SheetJS** (`xlsx.full.min.js`, per
  CDN eingebunden).
- Spaltenbreiten sind für die Lesbarkeit vordefiniert (`MSN`: 22, `ID`: 18).
- Zeilenzähler unter dem Seriennummern-Feld zeigt die Anzahl erkannter
  Seriennummern (vor Duplikat-Bereinigung) live an.
- Dark/Light-Umschalter oben rechts, Standard ist Dark Mode (nicht dauerhaft
  gespeichert).
- Oben links führt ein „← Zurück zum Hauptmenü"-Link zurück zur
  Generatoren-Übersicht.
