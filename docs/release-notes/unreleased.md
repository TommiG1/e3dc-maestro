# Entwurf – CSV-Historie aus dem my.e3dc-Portal (geplant als 0.5.5-beta.1)

> **Beta.** Enthält 0.5.4. In HACS Beta-Versionen anzeigen.

## Wozu der Import?

Bei einer frischen Maestro-Installation oder nach einem Wechsel der Energiesensoren fehlen oft die vergangenen Jahre im Energy Dashboard und in den Auswertungen. Der Import füllt genau diese Lücke aus dem my.e3dc-Portal.

Die Daten landen in eigenen Langzeitstatistiken (`e3dc_maestro:history_…`). Deine Live-Sensoren und deren Statistik bleiben unberührt. Sizing Advisor und Verbrauchsprofil nutzen die importierte Historie automatisch, sobald sie vorhanden ist. Optional kannst du dieselben Reihen im Energy Dashboard als zusätzliche Quellen eintragen. Dann siehst du auch ältere Jahre dort.

## CSV im my.e3dc-Portal exportieren

1. Im Portal unter **Leistungswerte** den gewünschten Zeitraum öffnen.
2. **Genau ein Kalenderjahr** wählen. Exporte über mehrere Jahre scheitern im Portal oft und liefern dann keine CSV.
3. Unter **Datenauflösung wählen** **15 Minuten** einstellen.
4. Über das Download-Symbol die CSV speichern und den Schritt für jedes weitere Jahr wiederholen.

![my.e3dc Leistungswerte: ein Jahr, Datenauflösung 15 Minuten, Download](https://raw.githubusercontent.com/TommiG1/e3dc-maestro/main/Screenshots/portal_csv_leistungswerte_15min.png)

## In Maestro importieren

1. HACS: E3DC Maestro auf die Beta aktualisieren (Beta-Versionen anzeigen), danach Home Assistant neu starten und das Panel hart neu laden.
2. Im Maestro-Panel unter den Energy- bzw. Historie-Einstellungen die CSV-Datei wählen. Du kannst **eine Datei** oder **mehrere Jahresdateien auf einmal** auswählen.
3. Die Vorschau prüfen: Zeitraum, Stunden neu bzw. vorhanden, Cutoff vor dem ersten Live-Wert.
4. Mit **Erweitern** übernehmen. Neue Stunden kommen dazu, bereits importierte bleiben erhalten. **Ersetzen** nur, wenn du die importierte Historie bewusst neu aufbauen willst.
5. Optional: Energy Dashboard um die Maestro-Verlaufsquellen ergänzen (Solar, Netz, Batterie). Bestehende Dashboard-Einträge bleiben unverändert. Das lässt sich später wieder entfernen.

Weitere Jahre kannst du später nachziehen, einzeln oder mehrere CSVs zusammen. Die Dashboard-Quellen musst du dafür nicht erneut anlegen.

## Hinweise

- Importiert werden nur Stunden **vor** dem ersten Live-Wert der jeweiligen Rolle.
- Summe Produktion im CSV ist die Summe aller Erzeuger. Wenn im Dashboard zusätzlich ein Fremd-WR mit eigener Altstatistik liegt, kann es in den Überschneidungsjahren zu Doppelzählung kommen.
- Wallbox und Wärmepumpe erscheinen nur, wenn die Spalten im CSV vorhanden sind.
- Neustart von Home Assistant und hartes Neuladen des Browsers nach dem Update.
