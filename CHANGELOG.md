# Changelog

Alle nennenswerten Änderungen an **E3DC Maestro** — aus Nutzersicht.

Neue Punkte bitte oben unter **[Unreleased]** ergänzen und beim Release in
einen eigenen Versionsabschnitt verschieben.

---

## [Unreleased]

### Geändert
- **Preisplan fährt den Akku am Ende der Preiskurve nicht mehr leer.** Bisher war Energie, die nach dem letzten bekannten Preis noch im Akku steckt, für den Plan wertlos. Endete die Kurve um Mitternacht, weil die Preise für morgen noch fehlten, lud er nur bis zum Abend. Jetzt zählt der Nachtbedarf bis zur ersten PV-Deckung (höchstens 24 h) zum günstigsten Preis der letzten vier Stunden der Kurve. Ist dieser Restpreis höher als die Ladekosten nach Wirkungsgrad und Mindestspanne, lädt der Plan den Nachtbedarf im günstigen Fenster mit. Der Sensor zeigt beide Werte als `terminal_need_kwh` und `terminal_price`.

---

## [0.5.1-beta.7] – Cockpit: Fluss, Entscheidung und Energie-Dashboard (2026-10-21)

> **Beta.** Enthält 0.5.1-beta.6. In HACS Beta-Versionen anzeigen. Ausführlich: [docs/release-notes/v0.5.1-beta.7.md](docs/release-notes/v0.5.1-beta.7.md).

### Neu
- **Handy-Aufteilung und Anordnen** am Energiefluss (Knoten, Blob, Haus) ohne Überlapp; Positionen speicherbar.
- **Zusatz-PV-Knoten** (Fremd-WR / Additional) mit getrennten Tageschips und History aus Quellsensoren; Sensoren `additional_pv_power` und `pv_zusatz_heute`.
- **Strategie-Vorschau** auf Prognose (Schattenmodus-SoC, Eingriffs-Strip, klickbare Legende).
- **Phasen-Gantt** und **Regelungsleiter** auf Entscheidung.
- **Bilanzpuls Jahr**, **Einstellungs-Suche**, **Theme-Vorschau** und Hell/Dunkel in der Kopfzeile.
- **Energie-Dashboard-Assistent** mit Hinweisen zu Fremd-WR und Wallbox.

### Geändert
- Kompaktere **Prognose- und Preisplan-Charts** auf dem Handy.
- Hilfe: FAQ Netzladung trotz guter PV-Prognose; Prognose-Hilfe an Strategie-Vorschau.

### Korrekturen
- Prognose-Chart zeichnet Linien nach Serienwechsel wieder durchgehend.

### Hinweise
- Neustart der Integration und hartes Neuladen des Browsers, damit Sensoren und Panel ankommen.

---

## [0.5.1-beta.6] – Netzladung bis zum nächsten günstigen Fenster (2026-10-21)

> **Beta.** Enthält 0.5.1-beta.5. In HACS Beta-Versionen anzeigen. Ausführlich: [docs/release-notes/v0.5.1-beta.6.md](docs/release-notes/v0.5.1-beta.6.md).

### Geändert
- **Prognosebasierte Netzlademenge** rechnet den Bedarf vom Ende des aktuellen günstigen Fensters bis zum nächsten ([#26](https://github.com/TommiG1/hacs-e3dc-maestro/issues/26)), nicht mehr das Defizit des Kalendertags „morgen“. Live-Steuerung und Prognosekurve nutzen dieselbe Logik.
- **Max. Netzladung/Tag** ist nur noch eine Sicherheitsgrenze (**0 = keine**); Default und alter 3‑kWh-Standard werden auf 0 migriert. Der Preisplan plant ohne Tagesbudget.
- **Sicherheitsfaktor Verbrauch** gilt auch für prognosebasierte Netzladung bei Zeitfenster und Preisschwelle.

### Korrekturen
- **Saisonale Mindestreserve** wird nur noch übersprungen, wenn tatsächlich Netzladung ansteht.

### Hinweise
- Neustart oder Reload der Integration und hartes Neuladen des Browsers, damit das neue Panel ankommt.

---

## [0.5.1-beta.5] – Live-Fluss, Zeitraum und Akku-Overlay (2026-10-21)

> **Beta.** Enthält 0.5.1-beta.4. In HACS Beta-Versionen anzeigen. Ausführlich: [docs/release-notes/v0.5.1-beta.5.md](docs/release-notes/v0.5.1-beta.5.md).

### Neu
- **Blob- und Haus-Energiefluss.** Neben den Knoten wählbar; Last-Balken an der WR-Leistung, Mobile-Layout und mehr Bewegung im Blob.
- **Tageswerte und mehrere Zusatz-Erzeuger am Live-Fluss.** PV und Haus heute aus RSCP-Zählern plus Zusatz-PV – dieselbe Summe wie in der Tagesbilanz.
- **Globaler Kalender** für Tag, Woche, Monat und Jahr; Heute- und Bilanz-KPIs folgen dem Zeitraum.
- **Bilanzpuls** mit Tagesbilanzen für Woche und Monat (divergierende Balken, kumulative Linie).
- **Akku-Pack-Ansicht** und Forecast-Kachel für Peak, Sockel und Netzbezug als Uhrzeiten.
- **Akku-Steuerung im Overlay** (Entladung, Reserve, Auto) auf der Akku-Karte.
- **Kosten-Simulation** Fixpreis und dynamisch parallel; Alarm-Banner bestätigbar und unter Darstellung abschaltbar.

### Geändert
- **Notstromreserve** zählt nicht mehr als ungerechtfertigte Netzladung.
- **Forecast Idle-0 W** nach Ladestopp erzeugt keine Phantom-Ladeleistung mehr in der SoC-Trajektorie.
- **Zusatzverbraucher im Haus-Fluss** überdecken auf dem iPhone nicht mehr die Tageswerte.

### Hinweise
- Neustart oder Reload der Integration und hartes Neuladen des Browsers, damit das neue Panel ankommt.

---

## [0.5.1-beta.4] – Prognose-SoC und Preisplan-FAQ (2026-10-20)

> **Beta.** Enthält 0.5.1-beta.3. In HACS Beta-Versionen anzeigen. Ausführlich: [docs/release-notes/v0.5.1-beta.4.md](docs/release-notes/v0.5.1-beta.4.md).

### Geändert
- **Prognose zeigt Plan-SoC, wenn der Preisplan steuert.** Steuert der Preisplan den Akku, ersetzt die Kurve „SoC geplant“ die generische Trajektorie – dieselbe Rechnung wie auf der Preisplan-Seite.
- **Hilfe-FAQ zum Preisplan ergänzt.** Automatik-Defaults (Wirkungsgrad, Mindestspanne, kein Verschleiß), Halten ohne Netzladung und der Hinweis zur Prognose-Kurve stehen in der Hilfe.

### Hinweise
- Neustart oder Reload der Integration und hartes Neuladen des Browsers, damit das neue Panel ankommt.

---

## [0.5.1-beta.3] – Debug-Log und Preisplan-Diagnose (2026-10-20)

> **Beta.** Enthält 0.5.1-beta.2. In HACS Beta-Versionen anzeigen. Ausführlich: [docs/release-notes/v0.5.1-beta.3.md](docs/release-notes/v0.5.1-beta.3.md).

### Geändert
- **Debug-Log bleibt unter 255 Zeichen.** Lange Regelzeilen haben den Sensor-State gesprengt; Home Assistant hat ihn auf `unknown` gesetzt und Core-Fehler geloggt. Der State kürzt auf das Limit, die vollständigen letzten Zeilen stehen im Attribut `lines` (Panel liest die).
- **Preisplan-Seite ohne Chart erklärt sich.** Bei Zeitfenster oder Preisschwelle steht, dass es keinen Plan-Chart gibt, die Ladung aber trotzdem läuft. Nach Wechsel auf automatisch/Experte zeigt ein Spinner „wird berechnet…“; fehlen Preise, Profil oder Spielraum, steht der konkrete Grund.
- **Preisplan zeigt Rechenwerte.** Restbudget, Boden, Obergrenze, Wirkungsgrad, Mindestspanne, Verschleiß und Sicherheitsfaktor stehen in der Plan-Kachel, damit leere Charts und fehlende Nachtladung nachvollziehbar sind.

### Hinweise
- Neustart oder Reload der Integration und hartes Neuladen des Browsers, damit Panel und Sensor ankommen.

---

## [0.5.1-beta.2] – Hilfe, Netzladung und Pause (2026-10-19)

> **Beta.** Enthält 0.5.1-beta.1. In HACS Beta-Versionen anzeigen. Ausführlich: [docs/release-notes/v0.5.1-beta.2.md](docs/release-notes/v0.5.1-beta.2.md).

### Neu
- **Hilfe ausführlicher.** Jede Einstellung beschreibt, was sie tut und was sich am Akku, am Netz oder an der PV ändert. Fragen und Antworten sammeln die wiederkehrenden Fälle: keine Netzladung, Takten, Hochtarif mit Netzbezug, Überschuss trotz leerem Akku, Tibber, Neustart.
- **Hilfe im Panel.** Eigener Punkt in der Navigation und, auf schmalen Bildschirmen, ein Fragezeichen in der Kopfzeile. Die Anleitung liegt über der offenen Seite, mit Inhalt, Suche und Sprung zur passenden Stelle. Sie erklärt die Seiten, die Einstellungen und jede Stufe der Regelung.
- **PV-Laden nach Aufgabe.** Tagesziel, Zeitfenster, Ladeleistung und Sonderfälle stehen in eigenen Karten. Ladeende ist eine Frist, danach lädt Überschuss weiter. Die Prognose-Sensoren liegen zusammen.
- **Netzladung-Strategie.** Eine Auswahl ersetzt die verstreuten Schalter: Aus, Zeitfenster (HT/NT), Dynamisch unter Preisschwelle, Dynamisch automatisch, Dynamisch Experte. Automatisch rechnet fest mit Wirkungsgrad 0,90, Mindestspanne 0,03 €/kWh und Sicherheitsfaktor 1,15, ohne Verschleiß. Experte behält die eigenen Werte. Bestehende Preisplan-Nutzer erscheinen als Experte. Der erste Wechsel in den Plan startet im Schattenmodus.
- **Einstellungen folgen der Strategie.** Sichtbar sind nur Werte, die die Strategie liest, plus ein Satz mit den aktuellen Grenzen. Kosten & Auswertung steuern nicht, wann geladen wird. Die Expertenansicht gilt nur für diesen Browser.
- **Dieselben Blöcke auf der Preisplan-Seite**, zugeklappt, mit dem Strategienamen. Die Kachel Plan nennt die aktive Strategie.
- **Auto-Strategie auf Live.** Schalter, Ziel, prognostizierte Ersparnis und die Morgenkappe in Klartext. Die Zahl ist kein bereits gespartes Geld.
- **Live ohne Dauerlärm.** Entladung & Reserve zeigt Pillen nur, wenn etwas an ist. Heute und Tagesbilanz starten zugeklappt, der Zeitraum sitzt in der Heute-Zeile. Chips nur bei aktivem Zustand. Erreichbarkeit ist ein grüner oder roter Punkt hinter „Jetzt · aktualisiert live“. Vorausschau und Schattenmodus stehen als Satz unter dem Energiefluss.

### Geändert
- **Hauptschalter bleibt nach dem Neustart.** War die Regelung aus, geht sie nicht von allein wieder an. Beim Ausschalten gibt es 1, 3, 6, 12 oder 24 Stunden oder dauerhaft. Die Ablaufzeit übersteht einen Neustart. Die Pille **Regelung aktiv** / **Regelung aus** in der Kopfzeile öffnet dieselbe Auswahl, bei ausgeschalteter Regelung mit **Wieder einschalten**.
- **Ladeschwelle startet bei 0 %.** Eine neue Einrichtung lädt den Akku nicht aus dem Netz, nur weil der Ladestand unter 15 % liegt. Die Notladung bleibt aus, bis die Schwelle selbst gesetzt wird. Bestehende Installationen behalten ihren gespeicherten Wert.
- **Start.** Die Dashboard-Strategie nutzt wieder die vorhandene Cache-Adresse. Eine zweite Kopie ohne `hashlib` hat den Komponentenstart mit `NameError` abgebrochen.
- **Autonomie am Akku** erscheint nach etwa einer Minute, nicht erst nach 60 Messungen. Der Wert wird danach mit dem laufenden Verbrauchsfenster nachgeführt.
- **PV morgen** steht in der Kopfzeile und unter Statistik, sobald der Sensor gewählt ist. Vorausschauende Ladung und prognosebasierte Netzladung müssen dafür nicht an sein.
- **Aktualisierungsintervall.** `number/set_value` rief eine nicht vorhandene Methode auf. Der Takt wird jetzt über das vorhandene Intervall umgestellt.
- **Tageszähler in Euro** haben keine Geräteklasse `monetary` mehr. Die passt nicht zu `total_increasing`. Einheit und Zähler bleiben.
- **Panel- und Strategie-URL hängen am Dateiinhalt.** Nach Neustart oder Reload lädt Maestro das neue Skript ohne geleerten Browser- oder iPad-Cache.

### Hinweise
- NT-Fenster für „Zeitfenster (HT/NT)“ unter Tarif-Slots mit der Klasse „Niedrig“ anlegen. Die HT-Einstellungen erzeugen sie nicht.
- Neustart oder Reload der Integration, damit die neue Auswahl und die neue Skript-Adresse ankommen.

---

## [0.5.1-beta.1] – Tibber-Kurve und Prozent-Regler (2026-10-18)

> **Beta.** Enthält 0.5.0. In HACS Beta-Versionen anzeigen.

### Neu
- **Tibber-Preiskurve ohne Template.** Ist der Strompreis-Sensor der Tibber-Integration gewählt, holt Maestro die Stundenkurve selbst über `tibber.get_prices`. Der aktuelle Preis bleibt der Sensorstatus. Bei mehreren Wohnungen gilt `app_nickname`. Ein Abruf höchstens alle 15 Minuten; schlägt er fehl, bleibt die letzte Kurve liegen.
- **Prozentwerte: Regler und Eingabe.** Jede Einstellung in Prozent hat einen Schieberegler und daneben ein Zahlenfeld. Die Skala zeigt ganze Zahlen, Anfang und Ende liegen auf dem Raster. Das Zahlenfeld behält die feine Schrittweite.
- **Entladung und Reserve klappen zu.** Auf Live sind Erzwungene Entladung und Notstromreserve ein Paar, starten zugeklappt und nennen den vollen Namen plus Zustand. Die Regler bleiben einen Tipp entfernt.
- **Notstrom-Sockel im Akku-Ring.** Ist die Reserve an, ist der Sockel gelb, der Ladestand darüber in der gewohnten Farbe. Unter dem Ring steht der eingestellte Wert.

### Geändert
- **Aktualisierungsintervall lässt sich schreiben.** Der Wert kam nicht aus den Regelparametern, der Status blieb `unknown` und jede Eingabe verschwand. Er zeigt jetzt die Sekunden des Coordinators (Standard 30 s, 10–120 s) und stellt den Takt sofort um.
- **Sensorfelder nutzen die ganze Zeile.** Gewählte Entity-IDs werden nicht mehr auf einen kurzen Rest abgeschnitten. Lange IDs in der Trefferliste und in den Chips brechen um.
- **Heute, Woche und Monat** stehen kompakt unter dem Regler-Paar und gehören zu den Kacheln darunter. Die letzte Kachel lässt sich auf dem Handy vollständig hochschieben.

### Hinweise
- **Neustart nötig.** In der Home-Assistant-App den Frontend-Cache zurücksetzen und die App vollständig schließen.
- Der Preisplan braucht die Kurve. Ohne Tibber-Integration oder ohne passenden Strompreis-Sensor bleibt es bei Sensoren, die `raw_today` / `raw_tomorrow`, `today` / `tomorrow` oder `prices` schon mitbringen.

---

## [0.5.0] – Erstes stabiles Cockpit (2026-10-18)

> Stabiles Release. Enthält das Cockpit aus 0.4.0-beta.15 und die Punkte unten. Die Regelung ist unverändert.

### Neu
- **Das Cockpit reicht.** Onboarding, alle Einstellungen und der Betrieb laufen im Panel **Maestro**. Classic-Dashboard und Modernes Dashboard sind optional.
- **Das Cockpit ist kein Beta mehr.** Es erscheint nach dem Update als **Maestro** in der Seitenleiste. In HACS musst du dafür keine Beta-Versionen anzeigen.
- **Drei Looks:** Dunkel, Classic und myE3DC, unter Einstellungen → Darstellung. Die Wahl gilt in diesem Browser.
- **Maestro-Logo** in der Mitte des Energieflusses, in der Navigation und als Icon in HACS und Home Assistant.
- **Akku im Energiefluss** zeigt den Füllstand.
- **Zusätzliche Verbraucher gelten für die ganze Installation**, auf jedem Gerät, das das Cockpit öffnet. Auf dem Handy stehen sie als Liste unter dem Haus.

### Geändert
- **Hinweis zur Hausleistung wartet 10 Sekunden.** Er erscheint erst, wenn die enthaltenen Verbraucher mindestens 10 Sekunden um mehr als 50 W über der Hausleistung liegen, und verschwindet, sobald die Werte wieder passen.

### Hinweise
- **Neustart nötig**, wenn du von einer Version vor 0.5.0 kommst. Danach das Cockpit einmal hart neu laden.
- Wer 0.4.0-beta.15 schon laufen hat, bekommt mit diesem Release den neuen Look, das Logo, die gemeinsame Verbraucherliste und den verzögerten Hinweis.
- Der Preisplan, der den Akku steuert, bleibt als eigene Funktion gekennzeichnet. Das betrifft nicht das Cockpit.

---

## [0.4.0-beta.15] – Einrichtung im Cockpit (2026-10-18)

> **Beta.** Inhalt von beta.14 plus die Punkte unten. Die Regelung ändert sich beim Sperren der Entladung.

### Neu
- **Erste Schritte** stehen auf Live, solange etwas Pflichtiges fehlt: Anlage, Tarif, eingeschaltete Regelung und eine erste Entscheidung. Prognose, Notstromreserve und Verbraucher sind Hinweise. **Verstanden** blendet den fertigen Hinweis aus. Die Liste bleibt unter Einstellungen → Einrichtung.
- **Optionen ohne eigene Entität** lassen sich im Cockpit setzen: Quellen, Preis-Sensor, Prognose, Tarif-Slots und die Anbindung von Wallbox, EVCC und Wärmepumpe.
- **Zubau:** Schieber für zusätzlichen Akku und zusätzliche PV, dazu ein Jahres-Chart mit vermiedenem und bisherigem Netzbezug.

### Behoben
- **Entladesperre hebt das Ladelimit auf.** Beim Schutz der Reserve blieb ein altes Ladelimit auf der E3DC stehen, und PV-Überschuss ging ins Netz statt in den Akku.
- **Maestro startet wieder**, wenn beim Einrichten der Anlage der RSCP-Eintrag neu geladen wird.
- Der Zubau-Chart zeichnet sich neu, wenn du den Schieber bewegst.

### Hinweise
- **Neustart nötig.** Die neuen Panel-Befehle registriert Home Assistant beim Start.
- Aktualisieren über HACS (Beta-Versionen anzeigen aktivieren), danach Home Assistant neu starten.

---

## [0.4.0-beta.14] – Anlagen-Sensoren werden eingeschaltet (2026-10-18)

> **Beta.** Inhalt von beta.13 plus der Punkt unten. Die Regelung ist unverändert.

### Geändert
- **Sieben RSCP-Entitäten der Anlage schaltet Maestro beim Start ein**, wenn hacs-e3dc sie nur wegen des Standards deaktiviert hat: `system-derate-power`, `system-ac-maxpower`, `system-pv-derated`, `pset-limit-discharge-minimum`, `battery-module-soh-reported`, `system-rescue-battery-enabled`, `pset-powersaving-enabled`. Danach wird der RSCP-Eintrag einmal neu geladen, damit die Entitäten Zustände liefern. Eine Abschaltung, die du selbst gesetzt hast, bleibt aus. Fehlt eine Entität in der Registry, passiert nichts.

### Hinweise
- **Neustart nötig.** Die Aktivierung läuft im Setup der Integration.
- `additional-production` legt hacs-e3dc nur an, wenn eine externe Quelle vorhanden ist. `system-saved-errors` (Fehlermeldung in der Hero) ist [hacs-e3dc#373](https://github.com/torbennehmer/hacs-e3dc/pull/373) und noch nicht im Release von hacs-e3dc.
- Phasen L1–L3 liefert hacs-e3dc weiterhin nicht. Offen ist [hacs-e3dc#401](https://github.com/torbennehmer/hacs-e3dc/pull/401).
- Aktualisieren über HACS (Beta-Versionen anzeigen aktivieren), danach Home Assistant neu starten.

---

## [0.4.0-beta.13] – Anlage im Cockpit, Netzladung endet im Normalmodus (2026-10-18)

> **Beta.** Inhalt von beta.12 plus die Punkte unten. Die Regelung ändert sich beim Beenden einer Netzladung.

### Neu
- **Anlage im Cockpit:** eigene Kategorie in der Seitenleiste. Übersicht mit Hero-Karte, darunter Räume wie bei den Einstellungen: Netz, Akku, PV, Wallbox (nur wenn eine Wallbox existiert) und Einstellungen.
- **Hero:** Modus, Autarkie und Eigenverbrauch in einer Karte, dazu Modell, Seriennummer und Firmware. Eine Fehlermeldung erscheint nur, wenn der letzte gespeicherte RSCP-Eintrag jünger als 24 Stunden ist.
- **Phasen:** Haus, Netz und Wechselrichter als Gauge je Phase (L1–L3), darunter der Verlauf der letzten 24 Stunden. Negative Leistung ist grün. Fehlt eine Gruppe oder ist sie deaktiviert, fällt nur diese Karte weg. Es gibt keine Fehlermeldung.
- **Akku:** Packs mit Füllstand gegen den Kapazitätsanteil, Modul-Zustand aus dem vom Gerät gemeldeten State of Health, Lade- und Entladegrenzen.
- **Einstellungen der Anlage:** Powersave und Wetterregelung, sofern die Schalter existieren. Modus, Leistungsgrenzen und manuelles Laden setzt Maestro selbst und sind hier nicht noch einmal schaltbar.

### Geändert
- **Netzladung endet im Normalmodus.** `clear_power_limits` hebt einen aktiven Lade- oder Entlademodus der E3DC nicht auf. Wechselt die Regelung zurück auf Normal, setzt Maestro den Modus jetzt ausdrücklich auf Normal. Eine noch gesendete Ladegrenze wird abgeräumt, bevor nur noch die Entladung begrenzt wird.

### Hinweise
- **Neustart nötig.** Der Anlagen-Tab und die Modus-Korrektur stecken in der Integration. Ohne Neustart bleibt der Websocket-Handler und die Regelung auf dem alten Stand. Danach das Cockpit neu laden. Zeigt die Companion App noch die drei einzelnen Kacheln: Frontend-Cache zurücksetzen.
- **Phasen L1–L3 liefert hacs-e3dc (torbennehmer) nicht**, weder in `v4.0.0` noch in `v4.0.0-beta.2`. Offen ist [hacs-e3dc#401](https://github.com/torbennehmer/hacs-e3dc/pull/401). Ohne diese Sensoren zeigt Netz den übrigen Verbrauch und PV die übrigen Kennzahlen. Gauges und Verlauf fehlen dann still.
- **Diese RSCP-Entitäten sind in hacs-e3dc standardmäßig aus** und fehlen in der Anlage, bis sie aktiviert sind: `system-derate-power`, `system-ac-maxpower`, `system-pv-derated`, `pset-limit-discharge-minimum`, `battery-module-soh-reported`, `system-rescue-battery-enabled`, `pset-powersaving-enabled`. `additional-production` nur, wenn eine externe Quelle vorhanden ist. `system-saved-errors` (Fehlermeldung in der Hero) ist [hacs-e3dc#373](https://github.com/torbennehmer/hacs-e3dc/pull/373) und noch nicht im Release. E3DC liefert aktuelle Diagnosen mit normalem Zugang nicht. Ältere Einträge bleiben von der Karte weg.
- Aktualisieren über HACS (Beta-Versionen anzeigen aktivieren), danach Home Assistant neu starten.

---

## [0.4.0-beta.12] – Classic-Dashboard-Anmeldung nach dem Start (2026-10-17)

> **Beta.** Inhalt von beta.11 plus der Punkt unten. Die Regelung ist unverändert.

### Behoben
- **Classic-Dashboard: Timeout trotz geladenem Strategy-Modul.** Das Modul registrierte sich, bevor Home Assistant seine eigene Element-Registrierung einsetzt. Lovelace hat die Anmeldung dort nicht gesehen und nach 5 Sekunden aufgegeben. Die Anmeldung wird jetzt wiederholt, bis sie in der aktiven Registrierung steht.

### Hinweise
- Wie in beta.11: Das Strategy-Modul wird nach `config/www/e3dc_maestro/` kopiert und unter `/local/e3dc_maestro/` geladen. Die Kopie stimmt erst nach einem Neustart. Gab es `config/www` noch nicht, ist ein zweiter Neustart nötig.

---

## [0.4.0-beta.11] – Einstellungen im Cockpit, Classic-Dashboard ohne Timeout (2026-10-17)

> **Beta.** Inhalt von beta.10 plus die Punkte unten. Die Regelung ist unverändert.

### Neu
- **Einstellungen im Cockpit:** eigene Kategorie in der Seitenleiste des Panels. Kacheln wie eine Raumübersicht mit Symbol und Kurzbeschreibung, Tippen öffnet die Gruppe, Zurück führt zur Übersicht (auch per Browser-Zurück). Neun Gruppen in aufbauender Reihenfolge: Anlage; Ziel-SoC und Ladekorridor; Vorausschau und Zeitfenster; Wenig PV und Abregelung; Netz und Tarif; Hochtarif und Reserve; Wallbox, Wärmepumpe, Vorentladung; Steuerverhalten; Diagnose und Aktionen. Schalter, Zahlenfelder, Auswahllisten und Tasten direkt bedienbar; Statistik zurücksetzen fragt nach. Deaktivierte Entitäten werden markiert.
- **Schwellwerte im Preisplan:** Tarif, Netzladung im günstigen Fenster und Preisplan (Günstig-Schwelle, Ziel-SoC, Tagesbudget, Mindest-Preisspanne, SoC-Obergrenze, Wirkungsgrad, Verschleiß) lassen sich direkt unter Preisplan ändern. Dieselben Entitäten bleiben unter Einstellungen → Netz und Tarif.
- **Auto-Optimierung im Cockpit:** Schalter und Ziel stehen unter Einstellungen → Steuerverhalten.
- **Classic-Dashboard direkt aus dem Cockpit anlegen:** Kachel unter Einstellungen. Sie zeigt, ob Mushroom Cards und ApexCharts Card installiert sind, und legt das Dashboard per Klick unter dem Pfad `e3dc-maestro` an (nur Administratoren). Ein leeres Dashboard unter diesem Pfad wird eingerichtet, eines mit anderem Inhalt nie überschrieben. Die manuelle Anleitung über *Community dashboards* steht aufklappbar darunter.

### Geändert
- **Alle Einstellungen öffnen** im Steuerungs-Sheet führt zu den Einstellungen im Cockpit statt ins Classic-Dashboard.
- **Hilfetext korrigiert:** Das Classic-Dashboard baut sich bei jedem Öffnen aus der aktuellen Vorlage auf. Maestro-Updates kommen damit automatisch an; Löschen und neu anlegen ist nicht nötig, solange es nicht im Editor übernommen wurde.

### Behoben
- **Nettokosten für Woche und Monat:** Der nächtliche Rücksprung des Tageswerts zählte als Minusbetrag, angezeigt wurde praktisch nur ein Tag. Das Cockpit rechnet jetzt Bruttokosten minus Einspeiseerlös.
- **Fehlermeldungen sichtbar:** Lehnt Home Assistant eine Änderung unter Einstellungen oder Preisplan ab (z. B. Wert außerhalb des Bereichs), erscheint die Meldung oben im Cockpit. Bisher sprang das Feld kommentarlos zurück.
- **Zurück aus einer Einstellungsgruppe** nach direktem Aufruf per Link verlässt das Cockpit nicht mehr.
- Escape schließt das Steuerungs-Sheet. Gesperrter Browser-Speicher blockiert die Verbraucherliste nicht mehr.
- **Classic-Dashboard: Timeout beim ersten Laden** (`Timeout waiting for strategy element ll-strategy-dashboard-e3dc-maestro`): Lovelace wartet nur 5 Sekunden auf das Strategy-Modul. Das stand bisher als letzte Dashboard-Ressource in der Warteschlange und war über den Integrationspfad erst nach dem Start der Integration erreichbar. Maestro kopiert das Modul jetzt nach `config/www/e3dc_maestro/` (ausgeliefert unter `/local/…`, sobald Home Assistant läuft) und setzt die Ressource an die erste Stelle. Gibt es `config/www` noch nicht, bleibt bis zum nächsten Neustart der bisherige Pfad aktiv.

### Hinweise
- **Neustart nötig.** Das Strategy-Modul für das Classic-Dashboard wird nach `config/www/e3dc_maestro/` kopiert und unter `/local/e3dc_maestro/` ausgeliefert. Die Dateien liegen erst nach dem Neustart korrekt in `www`. Gab es `config/www` noch nicht, ist ein zweiter Neustart nötig, damit `/local` greift.
- `config/www/e3dc_maestro/` enthält nur Code und Dashboard-Layout und wird bei jedem Start überschrieben. Bitte dort nichts selbst ablegen.
- Aus beta.10 weiterhin gültig: Statistik zurücksetzen ist eine Entität (jetzt auch unter Einstellungen → Diagnose und Aktionen). Zeigt die Companion App den alten Stand, Frontend-Cache zurücksetzen.

---

## [0.4.0-beta.10] – Cockpit-Ausbau und feste Notstromreserve (2026-10-17)

> **Beta.** Inhalt von beta.9 plus die Punkte unten. Die feste Notstromreserve im Cockpit ändert die Regelung.

### Neu
- **Cockpit Live:** Gruppen Heute und Tagesbilanz, einklappbar, mit Kurzsumme. Zeitraum Heute, Woche, Monat über die Home-Assistant-Statistik. Erzwungene Entladung und feste Notstromreserve direkt auf dem Screen.
- **Prognose:** Phasenbeschriftung oben im Chart, Kennzahlen zur Datenqualität, CSV der Trajektorie.
- **Entscheidung:** Reserven, Ladefenster und Auto-Strategie, CSV der Timeline, einklappbares Debug-Log.
- **Schnellsteuerung:** Limits freigeben ganz oben. Wallbox-Typ, Vorentladung, Auto-Ziel und Tarif als Auswahl. Manuelles Laden mit Rückfrage.
- **Hinweis-Banner** oben, wenn der Wechselrichter nicht erreichbar ist, eine Sperre aktiv ist oder Netzladung ohne Rechtfertigung läuft.
- **Feste Notstromreserve:** Schalter plus Prozentwert. Solange er an ist, ersetzt er die saisonale und die verbrauchsadaptive Reserve. Liegt der SoC darunter, lädt Maestro mit maximaler Ladeleistung aus dem Netz bis zu diesem Wert und sperrt die Entladung. Ab dem Wert bleibt nur die Entladesperre. Der Preisplan nutzt denselben Boden. *Notstromreserve (aktuell)* zeigt den festen Wert.

### Behoben
- **Pendeln an der festen Notstromreserve:** Die SoC-Hysterese gilt in der Nähe der festen Reserve nicht mehr. Sonst sieht die Regelung den SoC in Sprüngen und wechselt zwischen Netzladung und freier Entladung.
- **Sägezahn in der Prognose:** Die 24-Stunden-Prognose rechnet in 15-Minuten-Schritten. An der festen Reserve lud sie dadurch eine ganze Viertelstunde mit voller Leistung und entlud danach wieder. Jetzt stoppt die simulierte Ladung und Entladung genau an der Reserve. Die echte Regelung war davon nicht betroffen.

### Hinweise
- Nach dem Update Home Assistant neu starten, damit Schalter und Prozentwert der festen Reserve angelegt werden.
- Statistik zurücksetzen bleibt eine Entität und ist nicht im Cockpit.

---

## [0.4.0-beta.9] – Verbraucher im Energiefluss, 24-h-Verlauf (2026-10-17)

> **Beta.** Inhalt von beta.8 plus die Panel-Erweiterungen unten. Die Regelung ist unverändert.

### Neu
- **Verbraucher im Energiefluss:** unter Steuerung → Anzeige bis zu sechs
  Leistungssensoren (Name, Symbol: Wallbox, Heizstab, Klimaanlage, Wärmepumpe
  oder Leistungsmesser). *Im Hausverbrauch* hängt am Hausknoten, *Separat
  gemessen* bekommt eine eigene Kante. Die vorkonfigurierte Wallbox kann
  übernommen werden. Die Liste liegt nur in diesem Browser.
- **Teilchen statt Striche:** aktive Kanten zeigen einen feinen Leuchtschimmer,
  Tempo und Anzahl folgen der Leistung.
- **24-Stunden-Verlauf:** Klick auf ein Symbol (PV, Netz, Haus, Akku oder
  Verbraucher) öffnet den Leistungsverlauf als Fenster.

### Hinweise
- Ein Sensor mit Zustand `unknown` zählt als vorhanden ohne Messwert (0 W).
  *Sensor nicht verfügbar* nur, wenn die Entity fehlt oder `unavailable` ist.

---

## [0.4.0-beta.8] – Maestro-Cockpit als Sidebar-Panel (2026-10-16)

> **Beta.** Inhalt von beta.7 plus das neue Panel. Die Regelung ist unverändert.

### Neu
- **Maestro-Cockpit:** eigenes Panel in der Seitenleiste (`/maestro-cockpit`),
  ohne Custom Cards. Vier Ansichten – **Live** (Energiefluss, Akku, Status,
  Tageswerte), **Prognose** (24-h-SoC-Trajektorie mit Phasen, Zoom und
  Ist-Verlauf), **Preisplan** (Preis je Slot nach Aktion, geplanter SoC) und
  **Entscheidung** (Phase mit Begründung, Limits Soll vs. gesendet,
  Phasenverlauf) – plus **Schnellsteuerung** für die wichtigsten Schalter und
  die erzwungene Entladung. Für alle Nutzer sichtbar, Deutsch/Englisch,
  Handy-Layout mit unterer Navigation. Anleitung im README.
- Das Panel findet seine Entitäten über die eindeutige ID (neuer
  WebSocket-Befehl `e3dc_maestro/panel_entities`); umbenannte Entitäten
  funktionieren weiter, fehlende oder deaktivierte werden im Panel benannt.

### Hinweise
- Classic- und Modernes Dashboard bleiben unverändert erhalten.
- Das Panel verträgt sich mit `apexcharts-card` auf anderen Dashboards
  (getrennte Chart-Bibliotheken).

---

## [0.4.0-beta.7] – Feste Entity-IDs, Einspeisebegrenzung stabil (2026-10-16)

> **Beta.** Inhalt von beta.6 plus die Fixes unten.

### Behoben
- **Entity-IDs mit Bereichs-Präfix** (z. B. `sensor.keller_e3dc_maestro_…`,
  wenn das Gerät in einem Bereich liegt): Dashboards verweisen fest auf
  `…e3dc_maestro_…` und zeigten „Entität nicht gefunden“. Alle Entitäten
  bekommen ihre ID jetzt fest als `<domain>.e3dc_maestro_<name>` (auch
  `sensor.e3dc_maestro_aktueller_soc`). Bestehende Installationen werden beim
  Start automatisch zurückbenannt, sofern die Ziel-ID frei ist.
- **Dashboard-Timeout nach Neustart** (`Timeout waiting for strategy element
  ll-strategy-dashboard-e3dc-maestro`): Das Strategy-JS war erst erreichbar,
  wenn `e3dc_rscp` verbunden war – auf einem Testsystem ~24 s, in denen die
  Oberfläche schon lud und das Modul mit 404 scheiterte. `e3dc_rscp` ist keine
  Manifest-Abhängigkeit mehr; der Config-Entry wartet stattdessen selbst darauf.
  **Teil-Fix:** Auf einem Live-System sank das 404-Fenster nach Frontend-Start
  von ~58 s auf ~33–50 s; das Lovelace-Limit liegt bei 5 s. Siehe PR #19.
- **Einspeisebegrenzung pendelte im Regeltakt** zwischen `feed_in_limit` und
  der Folgephase (Korridor/Spreading): Die Phase regelt die Einspeisung genau
  auf das Limit und wurde dann mangels Überschuss sofort beendet, die
  Folgephase lud weniger, die Einspeisung stieg wieder über das Limit.
  Gehalten wird jetzt über den Überschuss ohne Akkuladung und nur, solange die
  übrige Kaskade ihn nicht selbst aufnimmt.

---

## [0.4.0-beta.6] – Netzladung im Tiefpreis ohne künstliche Bremse (2026-10-10)

> **Beta.** Inhalt von beta.5 plus Follow-up zu
> [#15](https://github.com/TommiG1/hacs-e3dc-maestro/issues/15):
> Schnelllade-Boden, Morning-Cap, Astro-Wait, Schonladung und Anlauf-Rampe
> blockieren eine bewusst angeforderte Netzladung nicht mehr. Entspricht dem
> Stable-Fix 0.3.30; gilt zusätzlich für die Preisplan-Netzladung.

### Behoben
- **Schnelllade-Boden blockierte NT-Netzladung**
  ([#15](https://github.com/TommiG1/hacs-e3dc-maestro/issues/15) Follow-up):
  Unter dem Floor-SoC endete die Entscheidung in `fast_floor`
  (`POWER_MODE_NORMAL`, nur PV) und verhinderte `grid_charge`. Morgen-Cap und
  Astro-Wait hatten denselben Effekt. Jetzt weichen alle drei, solange
  Netzlade-Ziel und Tagesbudget offen sind.
- **Schonladung und Anlauf-Rampe** drosselten `grid_charge` (NT-Slot und
  Preisplan). Beide greifen für diese Phase nicht mehr – volle Leistung im
  Tiefpreis-Fenster.

### Geändert
- Gemeinsame Phasenliste `_FULL_POWER_PHASES` für Rampe und Schonladung
  (inkl. `grid_charge`).
- Dashboard-Hilfe: Schnelllade-Boden, Morning-Cap, Astro-Wait und Schonladung
  beschreiben den Vorrang der Netzladung.

---

## [0.3.30] – Fix: Netzladung im low-Slot ohne künstliche Bremse (Issue #15) (2026-10-10)

### Behoben
- **Schnelllade-Boden / Morning-Cap / Astro-Wait blockierten die aktive
  Netzladung im low-Slot**
  ([#15](https://github.com/TommiG1/hacs-e3dc-maestro/issues/15) Follow-up):
  Solange Ziel und Tagesbudget offen sind, weichen diese Phasen. Schonladung
  und Anlauf-Rampe greifen für `grid_charge` nicht mehr.

---

## [0.4.0-beta.5] – Preisplan steuert + stabile Dashboard-Charts (2026-10-10)

> **Beta mit echter Steuerung** (Inhalt von beta.4) **plus** stabiler Apex-Chart.
> Standardmäßig ist die Preisplan-Steuerung **aus** – wer nichts einschaltet,
> merkt keinen Unterschied außer dem Dashboard-Fix. Enthält außerdem den Fix
> aus 0.3.29.

### Behoben
- **Apex-Chart im Dashboard:** Der Verlaufs-Chart (PV/Haus/Netz/Akku/SoC) nutzte
  installationsabhängige Platzhalter-Entity-IDs (`sensor.e3dc_pv_power`,
  `sensor.e3dc_house_power`, `sensor.e3dc_grid_power`,
  `sensor.e3dc_battery_power`, `sensor.e3dc_soc`), die nach jedem
  Dashboard-Update wieder auf "Entity not available" zurückfielen. Neue
  stabile Maestro-Mirror-Sensoren (`sensor.e3dc_maestro_pv_power`,
  `_house_power`, `_grid_power`, `_battery_power`, analog zum bestehenden
  `sensor.e3dc_maestro_aktueller_soc`) spiegeln die in der Konfiguration
  hinterlegten Quell-Sensoren — beide Dashboards (Classic und Modern)
  funktionieren jetzt ohne manuelle Anpassung, installationsunabhängig.
- Lade-/Entlade-Schwingen im günstigen Slot
  ([#15](https://github.com/TommiG1/hacs-e3dc-maestro/issues/15)) – siehe
  0.3.29 unten (neue Option „Entladung im low-Slot nach Ziel sperren“).

### Neu
- **Preisplan steuert den Akku** (neuer Schalter
  `switch.e3dc_maestro_preisplan_steuert_akku`, auch im Dashboard Tab „Netz &
  Tarif“ und in den Einstellungen unter Tarif & Kosten). Setzt „Preisplan
  berechnen“ voraus (bisher „Preisplan (Schattenmodus)“, Entity-ID
  `switch.e3dc_maestro_preisplan_schattenmodus` bleibt unverändert).
  - **Netzladung jetzt:** Phase `grid_charge` (Grund „Preisplan: …“), maximale
    Ladeleistung bis zum geplanten Ziel-SoC, begrenzt durch **Max.
    Netzladung/Tag**, die **Ziel-SoC-Obergrenze** und einen aktiven
    Max-SoC-Deckel.
  - **Entladung halten:** neue Phase `grid_hold`. Die Entladung wird gesperrt,
    das Haus läuft aus dem Netz, um Akku-Energie für teurere Slots zu sparen.
    PV-Überschuss lädt weiter.
  - **Vorrang:** Notfallladung, Einspeisebegrenzung, EVCC-Sperre und
    Abregelschutz stehen vor dem Plan. Der Plan darf unter die Notstromreserve
    laden, sperrt aber nie die Ladung.
  - **Fail-safe:** Ist der Plan älter als 20 Minuten (Preis-Sensor ausgefallen,
    keine Preise mehr), regelt Maestro wie gewohnt ohne Plan.
  - Sensor `sensor.e3dc_maestro_preisplan`: Attribut `controlling` zeigt, ob der
    Plan gerade steuern darf (`shadow_mode` = Gegenteil).
- Neue Phase `grid_hold` in Dashboard (Classic + Modern), Phasen-Glossar und
  Erklärungs-Sensor.
- Stabile Power-Mirror-Sensoren für Dashboards (siehe oben unter Behoben).

### Geändert
- Hilfeseite „Preisplan“, README und Dashboard-Texte beschreiben jetzt
  Einrichtung, Reihenfolge der Prioritäten und Fehlersuche für den steuernden
  Betrieb.
- Schalter „Preisplan berechnen“ (vorher „Preisplan (Schattenmodus)“).
- Classic- und Modern-Dashboard: Apex-/Power-Karten nutzen die Maestro-Mirror-
  Entity-IDs statt roher E3DC-Platzhalter.

---

## [0.4.0-beta.4] – Preisplan steuert jetzt echt (dynamisches Laden) (2026-10-10)

> **Beta mit echter Steuerung.** Anders als beta.1–3 kann der Preisplan den Akku
> jetzt tatsächlich laden und sperren. Standardmäßig **aus** – wer nichts
> einschaltet, merkt keinen Unterschied. Enthält außerdem den Fix aus 0.3.29.

### Neu
- **Preisplan steuert den Akku** (neuer Schalter
  `switch.e3dc_maestro_preisplan_steuert_akku`, auch im Dashboard Tab „Netz &
  Tarif“ und in den Einstellungen unter Tarif & Kosten). Setzt „Preisplan
  berechnen“ voraus (bisher „Preisplan (Schattenmodus)“, Entity-ID
  `switch.e3dc_maestro_preisplan_schattenmodus` bleibt unverändert).
  - **Netzladung jetzt:** Phase `grid_charge` (Grund „Preisplan: …“), maximale
    Ladeleistung bis zum geplanten Ziel-SoC, begrenzt durch **Max.
    Netzladung/Tag**, die **Ziel-SoC-Obergrenze** und einen aktiven
    Max-SoC-Deckel.
  - **Entladung halten:** neue Phase `grid_hold`. Die Entladung wird gesperrt,
    das Haus läuft aus dem Netz, um Akku-Energie für teurere Slots zu sparen.
    PV-Überschuss lädt weiter.
  - **Vorrang:** Notfallladung, Einspeisebegrenzung, EVCC-Sperre und
    Abregelschutz stehen vor dem Plan. Der Plan darf unter die Notstromreserve
    laden, sperrt aber nie die Ladung.
  - **Fail-safe:** Ist der Plan älter als 20 Minuten (Preis-Sensor ausgefallen,
    keine Preise mehr), regelt Maestro wie gewohnt ohne Plan.
  - Sensor `sensor.e3dc_maestro_preisplan`: Attribut `controlling` zeigt, ob der
    Plan gerade steuern darf (`shadow_mode` = Gegenteil).
- Neue Phase `grid_hold` in Dashboard (Classic + Modern), Phasen-Glossar und
  Erklärungs-Sensor.

### Geändert
- Hilfeseite „Preisplan“, README und Dashboard-Texte beschreiben jetzt
  Einrichtung, Reihenfolge der Prioritäten und Fehlersuche für den steuernden
  Betrieb.
- Schalter „Preisplan berechnen“ (vorher „Preisplan (Schattenmodus)“).

### Behoben
- Lade-/Entlade-Schwingen im günstigen Slot
  ([#15](https://github.com/TommiG1/hacs-e3dc-maestro/issues/15)) – siehe
  0.3.29 unten (neue Option „Entladung im low-Slot nach Ziel sperren“).

---

## [0.3.29] – Fix: Lade-/Entlade-Schwingen im günstigen Slot (Issue #15) (2026-10-10)

### Behoben
- **Lade-/Entlade-Schwingen bei aktiver Netzladung im low-Slot**
  ([#15](https://github.com/TommiG1/hacs-e3dc-maestro/issues/15)): War das
  Netzlade-Ziel (z. B. 90 %) erreicht, hörte Maestro nur mit dem Laden auf. Das
  Haus entlud den Akku sofort wieder unter das Ziel, einige Minuten später lud
  Maestro erneut aus dem Netz nach – im Dauertakt. Jetzt sperrt Maestro nach
  Erreichen des Ziels im `low`-Slot die **Entladung** (neue Phase `grid_hold`,
  „Ziel erreicht (halten)“). Das Haus läuft aus dem günstigen Netz, der Akku
  bleibt auf Ziel-SoC. PV-Überschuss darf weiter laden; ein aktiver
  **Max-SoC-Deckel** (Hard-SoC-Limit) blockiert die Ladung weiterhin.

### Neu
- Option **Entladung im low-Slot nach Ziel sperren** (Einstellungen → Tarif &
  Kosten, Standard **an**). Ausschalten stellt das alte Verhalten wieder her.
  Bei prognosebasierter Netzlade-Menge ohne Bedarf (Ziel 0 %) wird nichts
  gesperrt.

---

## [0.4.0-beta.3] – Korridor-Pause & Akku-Vorrang ohne P10 (2026-10-10)

### Behoben
- **Korridor-Pause schickte PV-Überschuss ins Netz statt in den Akku**
  ([#16](https://github.com/TommiG1/hacs-e3dc-maestro/issues/16)):
  - Mit ausgeschaltetem Spreading sperrt die Korridor-Pause die Ladung nicht
    mehr auf 0 W, sondern gibt die maximale Ladeleistung frei. Der E3DC lädt
    weiterhin nur aus PV-Überschuss, nimmt ihn aber sofort mit. Mit aktivem
    Spreading bleibt die Sperre (Glättung).
  - An einem Schwacher-PV-Tag greift auch die Korridor-Pause nach dem
    Überschuss-Deckel nicht mehr (die erste Korridor-Pause war hier schon
    ausgenommen).
  - Liefert der Prognose-Anbieter kein P10 (z. B. Forecast.Solar), wird die
    P50-Restprognose mit Abschlag (× 0,7) bewertet. Die Akku-Priorität wird
    dadurch nicht mehr bei knapp ausreichender Prognose freigegeben.

### Geändert
- Modern-Dashboard: Badge-Hinweis trennt Heute (Schwacher-PV-Tag / niedriger
  SoC) und Morgen (Energiedefizit) klarer; Forecast-Max/Netzbezug sind keine
  Badge-Trigger mehr.

---

## [0.4.0-beta.2] – Preisplan-Karte & Einstellungen im Dashboard (2026-10-09)

### Neu
- Classic-Dashboard (Tab „Netz & Tarif“): Karte „Preisplan“ mit Schalter,
  Empfehlung, Begründung und Diagramm (Preiskurve, Netzladung/Halten, SoC).
  Beta.1 enthielt die Karte nur im Modern-Dashboard.

### Geändert
- Preisplan: Standard-Wirkungsgrad 0,85 → **0,90**, Mindest-Preisspanne 8 ct →
  **3 ct** (Verluste und Verschleiß werden separat eingerechnet). Bereits
  gespeicherte Werte bleiben unverändert.

### Neu
- **Dynamisches Laden im Dashboard einstellbar** (Tab „Netz & Tarif“, Classic und
  Modern): Tarif-Modus (Select), Dynamische Tarife, Strompreis Bezug,
  Einspeisevergütung, Akku-Anschaffungskosten, Akku-Lebensdauer, Günstig-Schwelle,
  Max. Netzladung/Tag, aktive Netzladung im low-Slot (+ Ziel-SoC,
  prognosebasierte Menge) sowie alle Preisplan-Werte (Ziel-SoC-Obergrenze,
  Mindest-Preisspanne, Wirkungsgrad, Sicherheitsfaktor) als Entitäten. Nur der
  Preis-Sensor bleibt in den Einstellungen.
- **Anleitung zum Preisplan:** Hilfeseite „Preisplan“ (Button „Hilfe zum Preisplan“
  unter dem Preisplan-Abschnitt, Classic und Modern) mit Voraussetzungen im Config
  Flow, Einstellungen, Diagramm-Erklärung und FAQ; README-Abschnitt; Hinweis in der
  Preisplan-Option des Config Flows.
- Preisplan-Chart in zwei Karten geteilt (Preise/Halten/Laden und geplanter SoC),
  weil die SoC-Linie sonst gegen die Preis-Achse gezeichnet wurde.
- Live-Änderung von „Dynamische Tarife“ und „Günstig-Schwelle“ wirkt jetzt auch
  mit gespeicherten Tarif-Slots sofort (ohne Neuladen).

---

## [0.4.0-beta.1] – Preisplan im Schattenmodus (Issue #14) (2026-10-09)

> **Beta / nur Anzeige:** Der Preisplan berechnet und zeigt, was sich anhand der
> Preiskurve lohnen würde – er **steuert nichts**. Standardmäßig aus.

### Neu
- **Preisplan (Schattenmodus):** Neuer Sensor `sensor.e3dc_maestro_preisplan`
  und Schalter `switch.e3dc_maestro_preisplan_schattenmodus`. Aus der Preiskurve
  des Preis-Sensors (`raw_today`/`raw_tomorrow`, Float-Listen `today`/`tomorrow`
  oder Tibber-Format `prices`, jeweils 1 h oder 15 min), der PV-Prognose und dem
  Verbrauchsprofil plant ein Optimierer (dynamische Programmierung) je Preis-Slot
  **Netzladung** und **Entladung halten** (Energie für teurere Slots sparen).
  Berücksichtigt Wirkungsgrad, Akku-Verschleiß, Einspeisevergütung,
  Mindest-Preisspanne, Boden (max. aus Ladeschwelle und Notstromreserve),
  Obergrenze, Ladeleistung und Tagesbudget. Der Plan reicht bis zum Ende der
  bekannten Preise (max. 48 h).
- Sensor-Attribute: `message`, `charge_now`, `hold_now`, `target_soc_pct`,
  `total_grid_charge_kwh`, `expected_saving_eur`, `known_until`, `plan_slots`
  (je Slot Preis, Netzladung, Halten, SoC, Bezug mit/ohne Plan).
- Neue Optionen (Tarif-Schritt): Preisplan aktivieren, Ziel-SoC-Obergrenze,
  Mindest-Preisspanne, Wirkungsgrad, Verbrauchs-Sicherheitsfaktor. Preisquelle
  ist der bestehende „Preis-Sensor“.
- Dashboard (Modern, Tab „Netz & Tarif“): Karte „Preisplan“ mit Preiskurve,
  Netzladung/Halten-Fenstern und geplantem SoC.

### Geändert
- **Max. Netzladung/Tag:** Die Obergrenze der Number-Entity
  `number.e3dc_maestro_max_netzladung_tag` ist nicht mehr fest 20 kWh, sondern
  mindestens das Doppelte der konfigurierten Akkukapazität (nie unter 20 kWh).

---

## [0.3.28] – Fix: Notstromreserve blockierte Laden & externe Steuerung (Issue #13) (2026-10-09)

### Behoben
- **Notstromreserve (§4) sperrte mehr als nur die Entladung:** Unterhalb der
  (saisonalen oder verbrauchsadaptiven) Notstromreserve setzte Maestro
  `power_mode=IDLE` — das ist beim E3DC ein harter manueller Modus, der
  zusätzlich zur eigentlich gewollten Entlade-Sperre auch jede Ladung und
  das E3DC-Eigenmanagement (inkl. externer Steuerungen wie EVCC) blockierte.
  Jetzt wird wie bei der EVCC-Now-Pause nur noch die Entladung über
  `discharge_power_limit=0` gesperrt (`power_mode=NORMAL`), PV- und
  Netzladung bleiben frei.
- **Aktive Netzladung im low-Slot unterhalb der Reserve:** Ist
  **Aktive Netzladung im low-Slot** eingeschaltet und läuft gerade ein
  `low`-Slot, darf die Notstromreserve das gezielte Nachladen aus dem Netz
  nicht mehr verhindern — die Reserve-Schutzphase (§4) weicht jetzt vor der
  Netzladung (§6.97), analog zum Schwacher-PV-Tag-Fix in 0.3.27.
- **Prognose-Simulation:** Die SoC-Vorhersage (`forecast.py`) respektiert in
  der Simulation jetzt `discharge_power_limit` (z. B. aus Notstromreserve
  oder EVCC-Now-Pause), statt die Entladung bei einem Hausdefizit immer frei
  zu rechnen.

---

## [0.3.27] – Fix: Schwacher-PV-Tag blockierte aktive Netzladung im low-Slot (2026-10-09)

### Behoben
- **Akku-Priorität vs. Netzladung:** An einem Schwacher-PV-Tag griff die
  PV-Überschuss-Priorität (§6.96) schon bei minimaler Resteinstrahlung
  (`pv_power > 0`, z. B. ein paar Watt an einem bewölkten Tag) und verließ
  `decide()` vor §6.97 — dadurch wurde die bewusst vom Nutzer eingeschaltete
  **Aktive Netzladung im low-Slot** tagsüber dauerhaft übersprungen, obwohl
  genau dafür gedacht (Zeit bis zur PV-Deckung an schwachen Tagen aus einem
  günstigen Tarif-Fenster überbrücken). Die Akku-Priorität weicht jetzt der
  aktiven Netzladung, wenn `low_slot_grid_charge_enabled` an ist und gerade
  ein `low`-Tarif-Slot läuft.

---

## [0.3.26] – Modern-Dashboard: Corner-Glow & SoC-Hero (2026-10-07)

### Changed
- **Corner-Glow global:** `base_card`, KPI, Power/PV/Haus, Money, Status-Chips und
  Action-Tiles nutzen `variables.accent` für Glow- und Icon-Farbe (Room-Card-Stil).
- **SoC-Hero:** Akkustand mit großem Prozentwert, Meta-Zeile (Ziel · Autonomie) und
  Progress-Ring ums Batterie-Icon statt zentriertem Donut.
- **Phase-Hero:** Live-Badge oben rechts, Phasen-Icon im Glow unten links — ohne Überlappung.
- **SoC-Sensor:** Dashboard-Platzhalter `sensor.e3dc_soc` →
  `sensor.e3dc_maestro_aktueller_soc` (Maestro-Sensor, unabhängig vom e3dc_rscp-Namen).
- Modern-Dashboard (#11): Schnellsteuerungs-Icons vergrößert (`size` / `--mdc-icon-size`
  56 px, inkl. `img_cell`). Reine CSS-`width` wirkte in button-card nicht zuverlässig.
- Prognose-Chart (#11): Netz-Prognose zeigt Einspeisung nach unten (−) und Bezug nach oben,
  analog zum Leistungs-Chart und typischen E3DC-Sensoren. Die Sensor-Attribute bleiben
  bei der Maestro-Konvention (+ = Einspeisung); nur die Chart-Anzeige wird gespiegelt.

### Behoben
- SoC-Karte: kaputtes Layout (Ring rechts, Text über dem Kreis) durch ein einziges
  HTML-`custom_field`.
- Corner-Glow: abgeschnittene Icons (SoC-Ring, Aktive Eingriffe) durch sanftere Positionierung.
- Phase-Hero: Symbol und „Live“-Badge überlappten sich nicht mehr.
- Phase-Hero / Cockpit: fehlende Phasen-Labels ergänzt (`fast_floor` → „Schnelllade-Boden“,
  `hard_soc_limit`, `morning_discharge`, `curtailment_guard`, …); Untertitel fällt auf
  die lesbare `reason` zurück statt auf den Enum-Rohwert.

---

## [0.3.25] – Akku-Prognose ohne Sprung bei „Jetzt“ (#9) (2026-10-05)

### Behoben
- Prognose-Chart (Issue #9): Die Akku-Prognose setzt die aktuell laufende Ladung/Entladung
  fort und klingt nach ca. 1 h auf den simulierten Wert ab, statt bei „Jetzt“ zu springen
  (`battery_anchor_w`).
- Prognose-Simulation: Vorzeichen von `grid_power` an die Maestro-Konvention angepasst
  (+ = Einspeisung, − = Bezug); ein Defizit wurde zuvor als Einspeisung gewertet.

---

## [0.3.24] – Prognose-Chart: ±24 h, Legende, Skala (#9) (2026-10-03)

### Changed
- Prognose-Chart (Issue #9): letzte plus nächste 24 h statt Kalendertag,
  Ist-Linien bis „Jetzt", Prognose-Serien nicht in der Legende (Klick blendet
  Ist und Prognose gemeinsam aus), Haus wieder braun, feste Leistungsskala
  (−4…16 kW) mit gemeinsamer Nulllinie zu 0 % SoC (YAML anpassbar).
  Der Chart bleibt bei den fünf Größen aus Issue #9 (PV, Haus, Netz, Akku, SoC).
  Extra-Verbraucher (Wallbox, Heizstab, …) bleiben in den bestehenden Karten;
  sie würden die Hauskurve überlagern und die Legende unbrauchbar machen.

---

## [0.3.23] – Prognose-Chart bis Tagesende (Issue #9) (2026-10-03)

### Added
- Classic- und Modern-Dashboard: neue Karte „Leistungen & SoC – Verlauf und Prognose" (Issue #9).
  Zeigt Ist-Verlauf (durchgezogen) und Maestro-Prognose (gepunktet) für PV, Haus,
  Netz, Akku und SoC. Der Sensor `forecast_trajectory` liefert dafür die neuen
  Attribute `pv_points`, `house_points`, `grid_points`, `battery_points`.

### Changed
- 24-h-Prognose nutzt jetzt die konfigurierte Solcast-/Forecast.Solar-Tagesprognose
  (heute und morgen) auch dann, wenn der Schalter „PV-Prognose-Verzögerung" aus ist.
  Die Regelung ist davon nicht betroffen (nur Anzeige-Prognose).
- Der aktuell gemessene Hausverbrauch wird in die Prognose eingeblendet und klingt
  innerhalb von ca. 2 h auf das Durchschnittsprofil ab (`consumption_anchor_w`).
- Die Prognose wechselt zum Folgetag-Profil bei lokaler Mitternacht
  (`day2_from_calendar`).
- Der Prognose-Chart zeigt einen Hinweis, auf welcher Datenbasis die Prognose beruht.

---

## [0.3.22] – Schwacher PV-Tag: keine Lade-Verzögerung mehr (2026-09-30)

### Behoben
- **Schwacher PV-Tag: Ladung wurde morgens weiter verzögert.** Nach v0.3.19
  wich nur der Morning-Cap dem gelatchten schwachen PV-Tag. `pv_delay`
  („Ladung verzögert, Sonne kommt noch“) und die Korridor-Pause hingen weiter
  an der Restprognose-Freigabe der Akku-Priorität. Beide weichen jetzt ebenfalls
  am gelatchten schwachen PV-Tag; sonnige Tage bleiben unverändert.
- **Englische Oberfläche (#5, #6, #8):** Config-Flow und Optionen haben
  vollständige englische Übersetzungen (`strings.json`, `translations/en.json`).
- **Modern-Dashboard (#5, #6, #8):** Power-Flow-Card-Plus-Felder auf das
  aktuelle Schema migriert; Überlappung und Umbruch im Phase-Hero behoben.

---

## [0.3.19] – Morning-Cap weicht auch am gelatchten schwachen PV-Tag (2026-09-23)

### Behoben
- **Morning-Cap vs. schwacher PV-Tag (Restlücke):** In v0.3.18 weicht der
  Morning-Cap der *aktuellen* Akku-Priorität. Die Priorität wird aber
  freigegeben, sobald die Restprognose den Bedarf rechnerisch deckt – typisch
  an Tagen mit sonnigem Vormittag und bewölktem Nachmittag. Dann blockiert der
  Cap wieder (1 W), der Vormittags-Überschuss geht ins Netz, und der Akku wird
  nachmittags nicht mehr voll. Morning-Cap weicht jetzt am **gelatchten**
  schwachen PV-Tag (Tagesprognose), unabhängig vom Restprognose-Release.
  Sonnige Tage behalten den Cap unverändert.

### Nach dem Update
HA neu starten. Auf schwachen PV-Tagen sollte die Phase morgens nicht mehr auf
`morning_cap` hängen bleiben, solange der Tag als schwacher PV-Tag erkannt ist.

---

## [0.3.18] – Morning-Cap weicht Akku-Priorität; Dashboard-Strategy; Wallbox-Netzschutz (2026-09-17)

### Behoben
- **Morning-Cap vs. Schwacher-PV-Tag:** An Tagen mit Akku-Priorität (schwache
  Tagesprognose bzw. unzureichende Restprognose) blockierte der Morning-Cap das
  Laden trotzdem (1 W-Limit), obwohl das Dashboard bereits „Akku-Ladung
  priorisiert“ anzeigte. Folge: Vormittags-Überschuss ging ins Netz, der Akku
  blieb niedrig und konnte nachmittags bei Bewölkung nicht mehr voll werden.
  Morning-Cap weicht jetzt der Akku-Priorität – analog zum Abregelschutz.
- **Timeout beim Öffnen des Community-Dashboards:** Lovelace wartet nur 5 Sekunden
  auf `ll-strategy-dashboard-e3dc-maestro`. Das Strategy-Modul wurde bisher nur
  als Extra-JS im Frontend-HTML geladen – bei gecachtem Frontend oft zu spät oder
  gar nicht. Es wird jetzt zusätzlich als Lovelace-Dashboard-Resource
  (JavaScript-Modul) registriert.

### Neu
- **Wallbox-Netzschutz:** Solange die Wallbox über der Schwelle lädt, hält Maestro
  die Akku-Entladung offen (kein künstliches Entlade-Limit), damit Defizite aus
  dem Hausakku gedeckt werden statt aus dem Netz. Schalter + Schwellenwert als
  Entities.

### Nach dem Update
HA neu starten, danach Browser hart neu laden (Cmd/Ctrl+Shift+R). Unter
Einstellungen → Dashboards → Ressourcen sollte
`/e3dc_maestro/frontend/e3dc-maestro-strategy.js` als JavaScript-Modul stehen.
Bei Lovelace im YAML-Modus den Eintrag dort manuell ergänzen (`type: module`).

---

## [0.3.17] – Dashboard: Akku-Priorität korrekt vom Ganztags-Flag getrennt (2026-08-28)

### Behoben
- **Irreführende Status-Meldungen im Dashboard:** Nach der v0.3.16-Bedarfsprüfung
  konnte das Dashboard weiterhin "Akku-Ladung priorisiert" anzeigen, obwohl das
  neue Gate (`battery_priority`) die Priorität bereits freigegeben hatte – die
  Status-Chips, die Warnzeile unter der Entscheidungserklärung und der
  "Eingriffe aktiv"-Zähler hingen alle am alten Ganztags-Flag
  `binary_sensor.e3dc_maestro_schwacher_pv_tag`, das nur die Tagesprognose
  widerspiegelt und nie mehr gegen den tatsächlichen Bedarf geprüft wird.
- **Neuer Binärsensor `binary_sensor.e3dc_maestro_akku_prioritat_aktiv`**
  (gebunden an `last_decision.battery_priority`) zeigt den tatsächlich aktiven
  Priorität-Status. Beide Dashboards (Classic & Modern) verwenden ihn jetzt für
  alle Live-Status-Anzeigen; `schwacher_pv_tag` bleibt als reiner
  Tages-Kontext-Sensor ("heute als PV-schwach erkannt") in den
  Diagnose-/Einstellungslisten erhalten und ist dort entsprechend beschriftet.

### Nach dem Update
HA neu starten oder Integration neu laden, danach Browser hart neu laden
(Cmd/Ctrl+Shift+R). Das Community-Dashboard ist eine Lovelace-Strategy und
übernimmt die Änderung automatisch.

---

## [0.3.16] – Schwacher-PV-Tag-Logik: Bedarfsprüfung statt Ganztags-Flag (2026-08-28)

### Geändert – Schwacher-PV-Tag-Logik: Bedarfsprüfung statt Ganztags-Flag

**Verhaltensändernd.** Die Schwacher-PV-Tag-Priorität (voller PV-Überschuss in
den Akku statt Spreading/Korridor-Pause) wurde bisher als Ganztags-Flag aus
dem Verhältnis Tagesprognose/Referenz-Sommertag abgeleitet und danach nie mehr
gegen den tatsächlichen Restbedarf geprüft. Das führte dazu, dass der Akku an
einem als "schwach" markierten Tag auch dann noch mit voller Leistung
weitergeladen wurde, wenn die Restprognose den Bedarf bis zum Ladeende-SoC
längst um ein Vielfaches deckte (Feldfall 28.08.2026: SoC 85 %, Restbedarf
2,7 kWh, P10-Restprognose 21,9 kWh, trotzdem 9000 W Ladeleistung).

- **Bedarfsprüfung als Gate:** Neue Kennzahl `low_yield_coverage_ratio()`
  (Restprognose ÷ Restbedarf bis Ladeende-SoC × Sicherheitsfaktor) deaktiviert
  die Priorität, sobald die Deckung ausreicht. Hysterese (Freigabe ab
  Deckungsgrad 1,0, Wiedereinstieg erst unter 0,85) verhindert Phasen-Pendeln.
  Ohne jede Restprognose bleibt das Altverhalten unverändert (Gate schließt,
  keine Regression für Installationen ohne PV-Prognose-Sensor).
- **Ziel-Konsistenz:** Im Prioritäts-Zweig zeigen `target_soc` und der
  Reason-Text jetzt das tatsächlich verfolgte Ladeende-SoC statt des an
  diesem Tick übersteuerten Tages-Rampenziels – behebt den Widerspruch
  "Ziel 67 %" bei einer Ladung, die tatsächlich bis 100 % läuft.
- **Diagnose:** Neues Attribut `low_yield_coverage` am
  `sensor.e3dc_maestro_decision_explanation` sowie im Reason-Text der
  Priorität.
- **Saisonal normierte Referenz (opt-in):** Neuer Parameter
  `low_yield_reference_seasonal` skaliert die kWp-Baseline-Referenz über die
  Tageslänge (Faktor 0,3–1,0 zwischen Winter- und Sommersonnenwende), damit
  `binary_sensor.e3dc_maestro_schwacher_pv_tag` im Winter nicht praktisch
  jeden Tag als "schwach" markiert. Standardmäßig aus – bestehende
  Installationen ändern sich nicht ohne explizite Aktivierung.
- **Ramp-Bypass entkoppelt:** Der sanfte Leistungsanlauf (A2) wird jetzt nur
  noch übersprungen, wenn die Priorität in diesem Tick tatsächlich aktiv war
  (`decision.battery_priority`), nicht mehr für den ganzen Tag über das
  Ganztags-Flag `low_yield_day_active`.
- **Zurückgestellt:** Eine zeitbasierte Dosierung im Übergangsband
  (Deckungsgrad 0,85–1,0) wurde bewusst nicht umgesetzt – `max_charge_power`
  ist an einem echt trüben Tag richtig, weil kurze Wolkenlücken sofort
  mitgenommen werden. Erst bei beobachteter Oszillation im Feld nachrüsten.

---

## [0.3.15] – Aktive Netzladung im low-Slot (NT-Fenster) (2026-08-28)

**Feature.** Follow-up zu [#2](https://github.com/TommiG1/hacs-e3dc-maestro/issues/2):
Ein `low`-Slot kann den Akku jetzt aktiv aus dem Netz nachladen — für klassische
NT-Verträge, um die Zeit bis zur PV-Deckung zu überbrücken.

### Neu
- **Aktive Netzladung im `low`-Slot (NT-Fenster):** Neue Phase `grid_charge`.
  Ist die Option **Aktive Netzladung im low-Slot** aktiviert, lädt Maestro in
  einem `low`-Tarif-Fenster **aktiv aus dem Netz** bis zum eingestellten
  **Netzlade-Ziel (% SoC)** — unabhängig vom Tarif-Modus. Damit überbrückt ein
  klassischer NT-Vertrag die Zeit bis zur PV-Deckung, statt später im teureren
  Normaltarif nachladen zu müssen (Follow-up zu
  [#2](https://github.com/TommiG1/hacs-e3dc-maestro/issues/2)). Die aus dem
  Netz geladene Energie ist durch das Tagesbudget **Max. Netzladung/Tag (kWh)**
  begrenzt (dieses wird jetzt erstmals in der Engine ausgewertet).
- **Prognosebasierte Netzlade-Menge (Option):** Mit **Netzlade-Menge
  prognosebasiert** lädt Maestro im `low`-Slot nur so viel nach, wie laut
  morgiger PV-/Verbrauchsprognose nötig ist (Defizit = Verbrauch − PV), statt
  stur bis zum festen Ziel-SoC. Der Ziel-SoC wirkt dann als Obergrenze; ohne
  Prognosedaten gilt weiterhin der feste Ziel-SoC.
- Neuer Binärsensor **Netzladung aktiv** (`binary_sensor.e3dc_maestro_netzladung_aktiv`).
- **Dashboard:** Neue Phase `grid_charge` in Classic- und Modern-Dashboard
  (Status-Chip „Netzladung", Phasen-Label/Farbe, Glossar) sowie im Tarif-Slots-
  Block. Das Community-Dashboard ist eine Lovelace-Strategy und aktualisiert
  sich automatisch – nach dem Update genügt **HA-Neustart + Browser-Hard-Refresh**
  (Cmd/Ctrl+Shift+R), kein Neu-Anlegen nötig.

### Doku
- Tarif-Slot-Beschreibung korrigiert: `low` ist ein günstiges Fenster mit
  optionaler aktiver Netzladung; `high` = Akku deckt Haus bis zur Reserve,
  darunter Entladesperre (die alte Formulierung „high = entladen sperren" war
  seit dem HT-Floor-Fix in v0.3.14 irreführend).

### Hinweis
Bislang war die `low`-Klasse rein passiv (sie hob nur das PV-Überschuss-Ceiling
auf, und das auch nur bei `tariff_mode=dynamic`). Nachts wurde daher gar keine
Netzladung ausgelöst. Wer das bisherige Verhalten will, lässt die neue Option
einfach deaktiviert (Standard).

---

## [0.3.14] – HT-Schutz Entladelogik korrigiert (2026-08-25)

**Bugfix.** Der HT-Schutz hat die Akku-Entladung im Hochtarif genau verkehrt
herum geregelt. Die Entladung wurde gesperrt, solange der SoC **über** der
HT-Reserve lag — also gerade dann, wenn der Akku das Haus versorgen sollte.
Erst wenn der Akku fast leer war, wurde entladen. Folge: voller Akku und
teurer Netzbezug im Hochtarif-Fenster (siehe [#2](https://github.com/TommiG1/hacs-e3dc-maestro/issues/2)).

### Behoben
- **Floor-Semantik wie bei der Notstromreserve:** Im `high`-Slot versorgt der
  Akku jetzt das Haus und entlädt bis zur HT-Reserve. Erst wenn der SoC die
  Reserve erreicht, stoppt die Entladung, damit für den Rest des teuren
  Fensters genug Kapazität bleibt. Netzladung findet im `high`-Slot weiterhin
  nicht statt.

### Doku
- README, Erklärungssensor und Dashboard-Hilfetexte auf die korrigierte
  Floor-Semantik angepasst (`high` = Entladung nur bis zur Reserve).

### Nach dem Update
HA neu starten oder Integration neu laden. Bestehende Konfiguration bleibt
unverändert; die HT-Reserve-Parameter wirken jetzt wie beschrieben als Floor.

---

## [0.3.13] – Dynamisches P10-Prognose-Gate für Spreading (2026-08-21)

**Feature / Bugfix.** Spreading darf nicht mehr drosseln, wenn die konservative
PV-Restprognose den Ladebedarf nicht deckt — sonst speist die Anlage ein,
während der Akku leer bleibt.

### Neu
- **Prognose-Gate (P10):** Vergleicht die pessimistische Rest-PV-Prognose
  (`estimate10` am konfigurierten Solcast-/Forecast-Sensor) mit dem
  Restbedarf × Sicherheitsfaktor. Ist P10 unzureichend, pausiert Spreading
  und Maestro priorisiert den Akku (voller PV-Überschuss statt Einspeisung)
- Gemeinsame **Akku-Priorität** aus Schwacher-PV-Tag **oder** unzureichender
  P10-Prognose
- Neuer Sensor **PV-Restprognose (P10)** inkl. Attributen P50-Rest und
  Sicherheitsfaktor
- Dashboard: P10/P50 in „Ladeverteilung“, Hilfetext zum Prognose-Gate

### Verhalten
- Fehlt P10 an der Prognosequelle → Fallback auf P50
- Ohne Forecast-Daten oder bei deaktiviertem Forecast/Spreading → Gate inaktiv
  (bisheriges Spreading bleibt unverändert)

### Nach dem Update
HA neu starten oder Integration neu laden, Browser hard-refreshen. Bestehende
Classic-Dashboards werden **nicht** überschrieben — zum Erneuern: Dashboard
löschen und über Community dashboards neu anlegen (oder YAML neu importieren).

---

## [0.3.12] – Community-Dashboard & Forecast-Härten (2026-07-18)

**Feature / Qualität.** Classic-Dashboard ohne YAML-Copy-Paste; 48‑h-Forecast
korrekt; Aktorik und HA-Integration robuster.

### Dashboard neu hinzufügen (Classic)

Voraussetzungen: **Home Assistant ≥ 2026.5**, HACS-Frontend
[Mushroom Cards](https://github.com/piitaya/lovelace-mushroom) und
[ApexCharts Card](https://github.com/RomRider/apexcharts-card).

1. Integration auf **v0.3.12** aktualisieren (HACS) und **HA neu starten**
   (oder Integration neu laden)
2. Browser **hart neu laden** (damit das Strategy-Modul geladen wird)
3. **Einstellungen → Dashboards → Dashboard hinzufügen**
4. Unter **Community dashboards** **E3DC Maestro** wählen
5. Vorgeschlagenen Titel **E3DC Maestro** und Icon bestätigen → Anlegen

Der URL-Pfad muss **`e3dc-maestro`** lauten (Hilfe-Links). Den Titel im Dialog
nicht umbenennen, bevor der Slug gesetzt ist.

Bereits angelegte Dashboards werden durch Updates **nicht** überschrieben.
Zum Erneuern: altes Dashboard löschen und wie oben neu anlegen.

**Fallback** (ältere HA-Version ohne Community-Picker): YAML manuell aus
[`dashboards/maestro_dashboard.yaml`](dashboards/maestro_dashboard.yaml)
importieren, Titel **E3DC Maestro**.

**Modern-Dashboard** bleibt manueller Import
([`dashboards/maestro_dashboard_modern.yaml`](dashboards/maestro_dashboard_modern.yaml))
wegen installationsabhängiger Roh-Entity-IDs.

### Weitere Änderungen
- **Bugfix Auto-Optimizer 48 h:** Tag-2 = Kalender-**morgen**; Fallback auf
  Morgen-Sensor; `ignore_date` nur noch bei eintägigen Sensoren
- Forecast mit aktiven Auto-Parametern, Solcast-Tagesprofil, Executor; Retry
  nach Optimizer-Fehlern
- RSCP-/Aktor-Aufrufe serialisiert im Hintergrund (Polling blockiert nicht)
- Diagnose-Entitäten als `EntityCategory.DIAGNOSTIC`; Geräte-`sw_version` aus
  Manifest; HA Diagnostics-Plattform
- CI (pytest/ruff/hassfest), Dashboard-Validator, Glossar an `decide()`-Priorität
- Auto-Optimierung: realistischerer Akku-Verschleiß über Durchsatz
- interne Modularisierung (Tarif, Selectors, PV-Parser)

### Nach dem Update
HA neu starten oder Integration neu laden, Browser hard-refreshen, dann
Dashboard wie oben anlegen bzw. prüfen.

---

## [0.3.11] – Lade-Cap blieb hängen (2026-06-21)

**Bugfix.** An sonnigen Tagen konnte der Akku stundenlang nur mit einem
winzigen Limit (z. B. 51 W) laden, obwohl Maestro intern schon ~2 kW
wollte — der Überschuss ging ins Netz.

### Behoben
- Maestro vergleicht Soll-Werte jetzt mit dem **zuletzt an die E3DC
  gesendeten** Cap (vorher konnte der Debounce Updates blockieren)
- Kein „Mini-Cap-Snapshot“ mehr im erweiterten Korridor, der die echte
  Spreading-Rate überdeckt
- Nach Phasenwechseln holt das Cap schneller zum echten Bedarf auf
- Beim Laden wird die Entladung für den Hausverbrauch explizit freigegeben

### Neu / sichtbarer
- Sensoren **Gesendetes Lade-/Entlade-Limit** (Soll vs. tatsächlich gesendet)
- Anzeigenamen: „Aktives …-Limit“ → **Soll-…-Limit** (Entity-IDs unverändert)
- Dashboard: Soll/Gesendet-Kacheln, orange Markierung bei Drift

### Nach dem Update
Integration neu laden oder HA neu starten, Dashboard im Browser hard-refreshen.

---

## [0.3.10] – Falscher SoC auf der Geräte-Seite (2026-06-12)

**Bugfix.** Auf der HA-Geräte-Seite von Maestro konnte das Batterie-Icon
**100 %** zeigen, obwohl der echte SoC z. B. 87 % war.

### Ursache & Fix
Forecast-Sensoren (Min/Max-SoC) hatten fälschlich `device_class: battery`.
Neu: **`sensor.e3dc_maestro_aktueller_soc`** ist der einzige Maestro-Sensor
mit Batterie-Klasse und zeigt den echten SoC.

Danke an **Florian** für den Hinweis.

### Nach dem Update
Integration neu laden oder HA neu starten.

---

## [0.3.9] – Schwacher-PV-Tag: Akku zuerst (2026-06-09)

**Feature.** An bewölkten Tagen (Tagesprognose deutlich unter dem
Referenz-Ertrag) priorisiert Maestro die **Akku-Ladung vor Einspeisung**:
kein Spreading/Korridor-Drosseln — der E3DC nutzt den PV-Überschuss selbst
(`NORMAL` + festes Lade-Cap).

### Einrichtung
In den Integrations-Optionen unter **PV-Prognose** den Sensor
„Prognose heute – Tagessumme kWh“ setzen (z. B. Solcast). Ohne Sensor
greift die Erkennung nicht.

### Neu (Auszug)
- Schalter / Binärsensor „Schwacher-PV-Tag“
- Sensoren für Tagesprognose, Referenz-Ertrag und Quote
- Schwelle und Referenz-Parameter als Number-Entities

Feature ist standardmäßig **an**; ohne Prognose-Sensor passiert nichts.

---

## [0.3.8] – Ungewolltes Vollladen in der Pause (2026-05-28)

**Bugfix.** In der Korridor-Pause konnten Limits freigegeben werden —
manche E3DC-Setups luden dann mit **vollem PV-Überschuss**, obwohl Maestro
pausieren wollte. Die Pause blockiert die Ladung jetzt aktiv (Entladung
bleibt frei).

---

## [0.3.7] – Battery & PV Sizing Advisor (2026-05-14)

**Feature.** Neuer **Sizing Advisor**: aus deinen HA-Historiedaten
abschätzen, was zusätzliche Batteriekapazität und/oder mehr PV bringen
würde (Einsparung, Amortisation).

Zusätzlich: **Navigationsmenü** im Options-Dialog — Bereiche direkt
anwählen statt 14 Schritte hintereinander.

### Nach dem Update
Energie-Sensoren für den Advisor in den Optionen prüfen (Auto-Detect
hilft). Analyse im Dashboard-Tab starten.

---

## [0.3.6] – Adaptive Reserve & Korridor-Pause (2026-05-13)

**Bugfix.**
- Adaptive Reserve konnte Entladung ab ~90 % SoC sperren — Max-Deckel
  jetzt sinnvoller (Standard 35 %) und im UI einstellbar
- Korridor-Pause greift auch mit erweitertem Korridor bei kleinem
  Überschuss korrekt
- Dashboard: tote/falsche Entity-Verweise bereinigt

Danke an **@roedi02** im HA-Community-Forum.

---

## [0.3.5] – Schnelllade-Boden & erweiterter Korridor

**Feature** (beide optional, standardmäßig aus):

- **Schnelllade-Boden:** Unter einem SoC-Boden (z. B. 40 %) mit vollem
  PV-Überschuss laden, danach normale Tagesrampe
- **Erweiterter Ladekorridor:** Ladeleistung proportional zum Abstand
  zum Tagesziel (unten/oben konfigurierbar)

Keine Migration nötig — neue Entities erscheinen automatisch.

---

## [0.3.4] – Korridor-Bypass & Auto-Tuning

- Nach Erreichen des Ladeende-Ziels unnötige Netzeinspeisung vermeiden
  (Korridor-Bypass / Phase 7d)
- Auto-Optimizer feiner abgestimmt
- Hard-SoC-Limit und PV-Verzögerung klarer im Dashboard getrennt

---

## [0.3.3] – Forecast bei leerem Akku

**Bugfix.** Die 24‑h-SoC-Prognose verbuchte Netzbezug falsch, wenn der
Akku leer war — Forecast und Auto-Optimierung sind dadurch stimmiger.

---

## [0.3.2] – Pause lud trotzdem voll

**Bugfix.** In PV-Verzögerung, Korridor-Pause und Spreading-Pause wurden
Limits freigegeben → E3DC lud mit vollem Überschuss. Diese Phasen setzen
jetzt aktiv `max_charge = 0` (Hausversorgung aus dem Akku bleibt möglich).

---

## [0.3.1] – Wallbox, Auto-Detect & Spreading-Schutz

**Qualitäts-Release.**

- Wallbox-Verbrauch vom Hausverbrauch trennbar (openWB/EVCC/E3DC)
- Auto-Erkennung für RSCP-Sensoren, Systemparameter, openWB und EVCC
- Option „Vorzeichen Netzleistung invertieren“ (fix für `Netzbezug heute = 0`)
- Spreading wird per Migration standardmäßig aktiviert (weniger
  0/max-Lade-Bursts) — jederzeit wieder abschaltbar

### Nach dem Update
Einmal den Konfigurations-Wizard durchlaufen lassen. Wenn Netzbezug
weiterhin 0 ist: Quell-Sensor auf `*_transfer_to_from_grid` und Invert
aktivieren (Auto-Detect schlägt das vor).

---

## [0.3.0] – Vorausschauende Auto-Optimierung

**Feature.**
- Auto-Optimierung mit bis zu **48 h** Horizont und echten PV-Prognosen
  (Solcast / Forecast.Solar)
- feinere Prognose-Auflösung (15/30 min) — wichtig für 70 %-Einspeisegrenzen
- Kosten/Erlöse bleiben über HA-Neustarts erhalten
- Lizenz: **MIT → AGPL-3.0**

In vielen Setups reicht die Auto-Optimierung allein; Extra-Features
(Vorentladung, Spreading, Morning-Cap, …) nur bei Bedarf zuschalten.
