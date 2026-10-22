# Entwurf – noch kein Release

## Wallbox

- Optionaler **Fahrzeug-SoC-Sensor** (`wallbox_soc_sensor`): erscheint im Energiefluss neben der Wallbox-Leistung (z. B. `4,2 kW · 72 %`). Bei E3DC wird `wallbox-soc` automatisch erkannt; sonst Sensor aus EVCC/openWB/Fahrzeug-Integration wählen. Nur Anzeige — die Regelung bleibt unverändert.
- Optionaler **Stecker-Status** (`wallbox_plug_entity`): Pins/Kabel im Wallbox-Symbol werden grün bei „angesteckt“. openWB `…_ladekabel` und RSCP `wallbox-plug` werden erkannt; ohne Sensor gilt „lädt“ als angesteckt. SoC/Stecker speichern ohne Integrations-Reload.
- Die Wallbox bleibt im Fluss sichtbar, auch ohne Ladeleistung.
