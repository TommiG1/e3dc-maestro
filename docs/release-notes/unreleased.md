# Entwurf – noch kein Release

Neue Punkte hier sammeln und beim nächsten Release in eine Versionsdatei verschieben.

## Neu

- **Wärmepumpe: Verlauf der letzten Ereignisse.** Auf der Seite Entscheidung zeigt eine neue Karte die letzten 20 Wärmepumpen-Ereignisse mit Uhrzeit und Grund: Schalten durch Maestro, „würde einschalten“ im Schattenmodus und Schalten von außen (zum Beispiel durch die E3DC-Steuerung am Shelly). Der Verlauf steht auch als Attribut `hp_history` am Sensor der Entscheidungserklärung und im Support-Dump ([Discussion #41](https://github.com/TommiG1/e3dc-maestro/discussions/41)).

## Geändert

- **Debug-Log hält 200 statt 50 Zeilen.** Bei aktivem Debug-Log gingen ältere Einträge bisher nach wenigen Minuten verloren.

## Gut zu wissen

- Der Verlauf liegt im Speicher und ist nach einem Neustart von Home Assistant leer.
