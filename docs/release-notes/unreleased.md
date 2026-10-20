# Entwurf – noch kein Release

## Debug-Log

Lange Debug-Zeilen haben den Sensor-State über 255 Zeichen gebracht. Home Assistant setzt ihn dann auf `unknown` und loggt einen Core-Fehler. Der State bleibt jetzt unter dem Limit; die vollständigen letzten Zeilen stehen im Attribut `lines`, das Panel zeigt sie dort.

## Preisplan-Seite

Wenn kein Chart da ist, erklärt die Seite warum: bei Zeitfenster oder Preisschwelle, dass die Ladung ohne Plan-Kurve läuft; nach Wechsel auf automatisch/Experte einen kurzen „wird berechnet…“-Zustand mit Spinner; bei fehlenden Preisen, ohne Verbrauchsprofil oder ohne Spielraum den konkreten Grund.

Die Plan-Kachel zeigt die Rechenwerte: Restbudget, Boden, Obergrenze, Wirkungsgrad, Mindestspanne, Verschleiß und Verbrauchs-Sicherheitsfaktor.
