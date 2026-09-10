# Eloview CSV Generator – README

Diese Webapp wandelt Tab-getrennte Rohdaten in eine CSV im Eloview
„Add Device"-Format um (kompatibel mit `AddDeviceTemplate-3.csv`).

## Nutzung

1. Rohdaten in das Textfeld einfügen (z. B. per Copy-Paste aus Excel).
2. Auf **„CSV erstellen"** klicken.
3. Die Datei `AddDeviceTemplate.csv` wird automatisch heruntergeladen,
   zusätzlich erscheint eine Vorschau mit Warnungen im Browser.

## Erwartetes Eingabeformat

Pro Gerät eine Zeile, Spalten durch **Tabulator** getrennt:

```
Franchise	Land	Referenz	Ort	Gerätetyp	Index	Seriennummer
```

Beispiel:
```
Subway	FI	61403	Espoo	POS	1	E265EB1139
Subway	SE	41182	Umeå	KIOSK	2	F243C60401
```

Die Spalte **„Franchise"** ist optional – ohne sie funktioniert die Zeile auch
mit nur 6 Spalten (`Land Referenz Ort Gerätetyp Index Seriennummer`).

## Feldregeln

| Feld | Pflicht | Format |
|---|---|---|
| Franchise | nein | Freitext. Bekannte Werte: `Subway`, `F&B` / `Friends&Burgers` (siehe Tag-Zuordnung unten). Andere Werte werden akzeptiert, aber keinem Tag zugeordnet. |
| Land | ja | genau 2 Buchstaben (z. B. `FI`, `SE`) |
| Referenz | ja | Freitext (z. B. interne Standort-/Filialnummer) |
| Ort | ja | Freitext |
| Gerätetyp | ja | genau `KIOSK`, `KDS` oder `POS` (Groß-/Kleinschreibung wird automatisch normalisiert) |
| Index | ja | reine Zahl (Geräte-Nummer am Standort, z. B. `1`, `2`, `3`) |
| Seriennummer | ja | Freitext |

Zeilen, die eine dieser Regeln verletzen (fehlendes Feld, falsches Land-Format,
ungültiger Gerätetyp, nicht-numerischer Index, falsche Spaltenanzahl), werden
**nicht** in die CSV übernommen. Sie erscheinen stattdessen rot markiert mit
Fehlergrund in der Vorschau.

## Ableitung der CSV-Felder

| CSV-Spalte | Herkunft |
|---|---|
| `Device Mode` | immer `Control` |
| `Device Name` | `LAND REFERENZ ORT TYPINDEX` (z. B. `FI 61403 Espoo POS1`) |
| `Serial Number` | Seriennummer-Spalte |
| `Tags` | siehe Tag-Zuordnung unten |
| alle übrigen Spalten (`Elo Pay`, `Firmware Version`, `Address`, `City`, `State`, `Postal Code`, `Country`, `Site Name`, `Time Zone`, `Group`) | immer leer |

## Tag-Zuordnung (Spalte „Tags")

Abgeleitet aus der Franchise-Spalte (Groß-/Kleinschreibung und
Schreibvarianten werden toleriert):

| Franchise-Wert (Beispiele) | Tag in CSV |
|---|---|
| `Subway`, `subway` | `subway` |
| `F&B`, `Friends&Burgers`, `Friends & Burgers`, `friends and burgers` | `friends&brgrs` |
| andere Werte / Franchise-Spalte fehlt | Tags-Feld bleibt leer |

## Zusätzliche Prüfungen (nicht blockierend)

Diese Hinweise verhindern die Erstellung der CSV nicht, werden aber in der
Warnungs-Box angezeigt:

- **Doppelter Device Name** – derselbe berechnete Name kommt mehrfach vor.
- **Doppelte Seriennummer** – dieselbe Seriennummer kommt mehrfach vor.

## Technische Details

- Encoding: UTF-8 mit BOM (Byte Order Mark), damit Excel Sonderzeichen wie
  `å`, `ä`, `ö` korrekt anzeigt statt als `Ã¥`, `Ã¤`, `Ã¶`.
- Zeilenumbruch: CRLF (`\r\n`)
- CSV-Escaping nach RFC 4180 (Werte mit Komma/Anführungszeichen/Zeilenumbruch
  werden in `"..."` gesetzt)
- Reines Frontend, kein Server nötig – Verarbeitung und Download laufen
  vollständig im Browser.
