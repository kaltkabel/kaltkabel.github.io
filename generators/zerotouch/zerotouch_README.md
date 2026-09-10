# Zero-Touch CSV Generator – README

Diese Webapp erfasst Geräte-Metadaten und exportiert sie als CSV im
Android-Zero-Touch-Enrollment-Format.

## Nutzung

1. Formularfelder ausfüllen (siehe Pflichtfeld-Logik unten).
2. Auf **„CSV erstellen"** klicken.
3. Bei bestandener Prüfung wird die CSV automatisch heruntergeladen,
   zusätzlich erscheinen eine Warnungs-Box und eine farbige Vorschau-Tabelle.

## Formularfelder

| Feld | Mehrzeilig |
|---|---|
| Hersteller | nein |
| Modell | nein |
| Zero-Touch ID | nein |
| Seriennummer | ja – 1 SN pro Zeile |
| IMEI | ja – 1 IMEI pro Zeile |

Seriennummer und IMEI werden **zeilenweise anhand ihres Index gepaart**
(Zeile 1 der SN-Liste gehört zu Zeile 1 der IMEI-Liste, usw.). Ist eine Liste
kürzer als die andere, bleibt das fehlende Feld in den überzähligen Zeilen
leer.

## Pflichtfeld-Logik (blockiert die CSV-Erstellung, wenn verletzt)

1. **Zero-Touch ID ist immer Pflicht.**
2. **Mindestens einer der folgenden zwei Wege muss erfüllt sein:**
   - **Weg A:** Zero-Touch ID + mindestens eine IMEI
   - **Weg B:** Zero-Touch ID + Hersteller + Modell + mindestens eine Seriennummer
3. **Sobald mindestens eine Seriennummer eingetragen ist, sind Hersteller
   UND Modell zwingend Pflicht** – unabhängig davon, ob zusätzlich IMEIs
   eingetragen wurden.

Kurz: IMEI-only ist ohne Hersteller/Modell erlaubt. Sobald aber irgendeine
Seriennummer im Spiel ist, müssen Hersteller und Modell gesetzt sein. Wird
eine dieser Regeln verletzt, wird **keine CSV erzeugt**.

## Datenprüfung / Warnungen (nicht blockierend)

Nach bestandener Pflichtfeld-Validierung wird die CSV erzeugt, aber
zusätzlich werden folgende Hinweise angezeigt:

| Prüfung | Bedingung | Schweregrad |
|---|---|---|
| Ungleiche Anzahl SN/IMEI | nur wenn **beide** Listen ≥ 1 Eintrag haben und sich ihre Länge unterscheidet | Warnung |
| Unvollständige Zeile | nur relevant, wenn beide Listen gefüllt sind: Zeile, in der SN oder IMEI fehlt | Warnung |
| IMEI-Format ungültig | IMEI ist nicht exakt 15 Ziffern | Fehler (visuell rot) |
| IMEI-Prüfsumme ungültig | 15-stellig, aber Luhn-Prüfsumme stimmt nicht | Warnung |
| Doppelte Seriennummer | gleicher SN-Wert kommt mehrfach vor | Warnung |
| Doppelte IMEI | gleicher IMEI-Wert kommt mehrfach vor | Warnung |

Die „Ungleiche Anzahl"-Warnung erscheint **nur**, wenn sowohl bei
Seriennummer als auch bei IMEI mindestens ein Eintrag vorhanden ist.

### IMEI-Validierung im Detail
- **Format:** genau 15 Ziffern, keine Buchstaben/Sonderzeichen.
- **Prüfsumme (Luhn-Algorithmus):** von rechts nach links, jede zweite Ziffer
  verdoppeln (bei Ergebnis > 9 davon 9 abziehen), alle Ziffern aufsummieren –
  gültig, wenn Summe durch 10 teilbar ist.

## CSV-Format

Spalten (feste Reihenfolge):
```
modemtype,modemid,serial,model,manufacturer,profiletype,owner
```

| CSV-Spalte | Wert | Regel |
|---|---|---|
| `modemtype` | `IMEI` oder leer | `IMEI`, wenn in dieser Zeile eine IMEI vorhanden ist, sonst leer |
| `modemid` | IMEI-Wert dieser Zeile | leer, falls keine IMEI in dieser Zeile |
| `serial` | Seriennummer dieser Zeile | leer, falls keine SN in dieser Zeile |
| `model` | Formularfeld „Modell" | für alle Zeilen identisch |
| `manufacturer` | Formularfeld „Hersteller" | für alle Zeilen identisch |
| `profiletype` | immer `ZERO_TOUCH` | fixer Wert |
| `owner` | Formularfeld „Zero-Touch ID" | für alle Zeilen identisch |

### Beispiel

Eingabe:
- Hersteller: `Samsung`, Modell: `Galaxy Tab Active4 Pro`, Zero-Touch ID: `123456789012`
- Seriennummer: `SN12345`, `SN12346`
- IMEI: `356938035643809`, `356938035643810`

Ausgabe:
```
modemtype,modemid,serial,model,manufacturer,profiletype,owner
IMEI,356938035643809,SN12345,Galaxy Tab Active4 Pro,Samsung,ZERO_TOUCH,123456789012
IMEI,356938035643810,SN12346,Galaxy Tab Active4 Pro,Samsung,ZERO_TOUCH,123456789012
```

### Dateiname
`zerotouch_<Hersteller>_<Modell>.csv` (Sonderzeichen werden durch `_` ersetzt).
Ohne Hersteller/Modell (reiner IMEI-Weg): `zerotouch_export.csv`.

## Technische Details

- Encoding: UTF-8 mit BOM (Byte Order Mark), damit Excel Sonderzeichen
  korrekt anzeigt statt als `Ã¤`/`Ã¶`/`Ã¥` etc.
- Zeilenumbruch: CRLF (`\r\n`)
- CSV-Escaping nach RFC 4180 (Werte mit Komma/Anführungszeichen/Zeilenumbruch
  werden in `"..."` gesetzt)
- Reines Frontend, kein Server nötig – Verarbeitung und Download laufen
  vollständig im Browser.
- Zwei Textfelder (Seriennummer/IMEI) passen ihre Höhe beim Ziehen mit der
  Maus automatisch aneinander an.
- Dark/Light-Umschalter oben rechts, Standard ist Dark Mode (nicht dauerhaft
  gespeichert).
