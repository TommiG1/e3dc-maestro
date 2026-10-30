# Entwurf – noch kein Release

## Korrekturen

### Schwacher PV / Restprognose erkennt Solcast-Abwertungen

**Verhaltensändernd.** An Tagen wie dem 30.10.2026 (Solcast Tagesprognose
65 → 43 kWh, Rest P10 ~3,4 kWh) blieb Maestro auf dem Mitternachts-Latch und
ohne Restprognose – obwohl der Tag klar schwach und der Restbedarf ungedeckt war.

1. **Tagesprognose-Latch nur nach unten:** Erster Wert pro lokalem Tag setzt den
   Latch; spätere Solcast-Updates dürfen nur abwerten. Ein Tag kann so im Laufe
   des Tages zum Schwacher-PV-Tag werden, aber nicht wieder zu „gut“ zurückkippen.
2. **Restprognose immer lesen:** P50/P10 aus dem konfigurierten Sensor, unabhängig
   vom Schalter „PV-Prognose-Verzögerung“ (der nur noch `pv_delay` steuert).
3. **Restprognose-Gate unabhängig:** Akku-Priorität bei unzureichender P10-Restprognose
   greift auch wenn Verzögerung und Spreading aus sind.
4. **PV-Tag-Quote aus erwartet = erzeugt + Rest-P50:** Robusteste Tagesgröße
   (Realität + Rest). Fehlt Rest oder Ertrag, Fallback auf gelatchte Tagesprognose.
   Liegen beide Quellen vor, gilt das Minimum gegen Aufwärts-Flackern.

## Hinweise

- Home Assistant neu starten.
- Keine Config-Änderung nötig.
