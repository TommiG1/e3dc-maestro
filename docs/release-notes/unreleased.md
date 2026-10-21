# Entwurf – noch kein Release

## Cockpit

- **Strategie-Vorschau auf Prognose.** Preisplan-SoC auch im Schattenmodus (mit Badge), Strip „Preisplan-Eingriff“ unter dem Chart (Netzladung / Halten / kein Plan-Eingriff), klickbare Legende zum Ausblenden von Leistungskurven.
- **Prognose auf dem Handy.** Kompakter Chart (weniger Achsen-Text, keine Phasen-Beschriftung im Plot, kein Brush), Startzoom 12 h, scrollbare Legende.
- **Preisplan auf dem Handy.** Kompakter Chart, scrollbare Legende; Aktions-Strip ausgeblendet (Farbe steckt schon in den Preisbalken).
- **Phasen-Gantt auf Entscheidung.** 24-Stunden-Leiste der Regelphasen über dem Textverlauf; Farblegende und farbige Punkte in der Liste.
- **Einstellungs-Suche.** Auf der Übersicht nach Name, Tipp oder Optionsfeld suchen; Treffer öffnen den Bereich.
- **Bilanzpuls Jahr.** Dritter Zeitraum mit Monatsbalken und laufender Summe; Tippen öffnet den Monat in der Bilanz.
- **Energiefluss Aufteilung auf dem Handy.** Bei separat gemessenen Verbrauchern kein Überlapp mehr; in Knoten-, Blob- und Haus-Ansicht klare Gabelung Verbrauch → Haus (links) und separate Lasten (rechts, Akzentfarbe).
- **Anordnen auf dem Handy.** Verbraucher (und Haus bei Aufteilung) per Finger verschieben; Positionen bleiben gespeichert.
- **Regelungsleiter auf Entscheidung.** Leiter unter der Phase, Link „In der Regelungsleiter zeigen“ scrollt und hebt sie hervor; Klick auf eine Stufe öffnet die Einstellungen.
- **Theme-Vorschau.** Über die Look-Kacheln fahren zeigt den Look sofort; Antippen speichert. Swatches wirken wie Mini-Cockpits.
- **Hell/Dunkel in der Kopfzeile.** Sonnen-/Mond-Taste wechselt direkt zwischen Dunkel und myE3DC, ohne das Einstellungsmenü.
- **Energie-Dashboard-Assistent.** Unter Einstellungen Quellen für PV, Netz und Akku mit einem Klick setzen (RSCP-Lebensdauerzähler bevorzugt, sonst Maestro-Tageszähler); Gas/Wasser bleiben, Wallbox optional als Gerät. Hinweise zu Fremd-WR (Fronius vs. Additional) und zu Geräten/Wallbox (kWh statt W; E3DC-Wallbox oft nur Leistung). Zusätzliche Solar-Quellen und andere Geräte bleiben erhalten.

## Hilfe

- **FAQ: Netzladung trotz guter PV-Prognose.** Erklärt die konservative Rechnung (PV 80 %, Verbrauchs-Sicherheitsfaktor), den Unterschied zur Diagramm-PV und dass der Preisplan sich etwa alle fünf Minuten neu rechnet.
- Prognose-Hilfe an die Strategie-Vorschau angepasst.
