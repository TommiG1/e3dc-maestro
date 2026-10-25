# Entwurf – noch kein Release

## Cockpit
- **Debug herunterladen** unter Entscheidung → Debug-Log: JSON-Support-Dump (Version, Entscheidung, Debug-Puffer, redacted Options) für GitHub-Issues. Nach Update Home Assistant neu starten, damit der Websocket `e3dc_maestro/debug_dump` registriert ist. Hilfe (Entscheidung / System) beschreibt den Button.
- Debug-Ringpuffer: bei aktivem Debug-Schalter schreibt Maestro **jeden Regelungstakt** eine Zeile (nicht nur bei Limit-Änderungen); Einschalten loggt sofort „Debug-Logging aktiviert“.
