# Entwurf – noch kein Release

> Stand auf `feat/help`, 19. Oktober 2026. Die Versionsnummer bleibt **0.5.1-beta.1**. Nicht taggen und nicht in HACS veröffentlichen. Enthält 0.5.1-beta.1.

## Ladeschwelle

Neue Einrichtungen starten mit **Ladeschwelle 0 %**. Die Notladung (`emergency`) lädt dann nicht aus dem Netz, auch bei leerem Akku. Wer das will, setzt die Schwelle selbst, zum Beispiel auf 15 %. Bestehende Installationen behalten den gespeicherten Wert.

## Hilfe im Panel

Die Navigation hat einen Punkt **Hilfe**. Auf schmalen Bildschirmen liegt zusätzlich ein Fragezeichen in der Kopfzeile. Die Taste `?` öffnet dieselbe Ansicht, solange der Fokus nicht in einem Eingabefeld steht. Escape schließt sie.

Die Hilfe liegt über der Seite, die gerade offen ist. Sie springt zum Kapitel dieser Seite, bei einer Einstellungsgruppe zum passenden Abschnitt. Inhalt links, auf dem Handy als Liste zum Aufklappen. Die Suche filtert Abschnitte. In der Regellogik ist die gerade aktive Stufe markiert. „In den Einstellungen öffnen“ schließt die Hilfe und wechselt dorthin.

Jede Einstellung beschreibt, was sie tut und was sich am Akku, am Netz oder an der PV ändert. Die Kapitel:

- **Schnellstart** und die Seiten Live, Vorausschau, Plan, Entscheidung, Anlage.
- **Einstellungen** nach Aufgabe: Einrichtung, Anlage, Schutz, Netz und Tarif, PV-Laden, Verbraucher, Automatik, System, Darstellung.
- **Regelung:** jede Stufe der Leiter, plus warum gerade Netzbezug da ist.
- **Begriffe** zu Preisplan, PV, schwachem Tag, Einspeisung und Verbrauchern.
- **Wenn etwas nicht passt:** keine Netzladung, Takten, Hochtarif mit Netzbezug, Überschuss trotz leerem Akku, Mindest-Ladeleistung, Hauptschalter nach dem Neustart, Tibber ohne Preise, feste Schwelle oder Preisplan, alte Ansicht nach dem Update.
- Ein **Glossar**.

## PV-Laden

Die Seite **Einstellungen › PV-Laden** ist nach der Aufgabe sortiert. Schalter und die Werte, die nur für sie gelten, stehen in einer Karte.

- **Tagesziel** nennt den Ladestand bis zum Ladeende. Das spätere Ziel steht nur, wenn der Schalter an ist. Darunter ein Satz mit dem aktuellen Ziel.
- **Zeitfenster** trennt Astro von den festen Uhrzeiten. Mit Astro folgen Start und Ende der Sonne. Sonst liegen Winter- und Sommer-Ladeende fest. Die Morning-Cap steht in demselben Block. Ladeende ist eine Frist: danach lädt Überschuss weiter.
- **Ladeleistung** und **Wenn der Tag anders läuft** starten zugeklappt. Zugeklappt steht, was gerade gilt. Werte, deren Schalter aus ist, sind ausgegraut. Schwellen und Referenzen für Prognose, schwachen Tag und Abregelung liegen in der Expertenansicht.
- **Prognose-Sensoren** stehen zusammen: Rest heute, Tagessumme, morgen und übermorgen.

## Netzladung-Strategie

Die Netzladung hat eine Auswahl, `select.e3dc_maestro_netzladung_strategie`. Sie setzt die bisherigen Schalter selbst. Tarifmodus, dynamischer Tarif, Laden im günstigen Fenster und Preisplan laufen nicht mehr nebeneinander.

| Strategie | Was Maestro macht |
|---|---|
| Aus | Lädt den Akku nie aus dem Netz, nur aus PV. |
| Zeitfenster (HT/NT) | Lädt in den Tarif-Slots der Klasse „Niedrig“, bis zum Ziel-SoC, höchstens das Tagesbudget. |
| Dynamisch: unter Preisschwelle | Lädt, sobald der Preis höchstens die Günstig-Schwelle beträgt, bis zum Ziel-SoC, höchstens das Tagesbudget. |
| Dynamisch: automatisch | Der Preisplan sucht die günstigsten Stunden. Wirkungsgrad 0,90, Mindestspanne 0,03 €/kWh und Sicherheitsfaktor 1,15 sind fest. Der Akku-Verschleiß zählt nicht. |
| Dynamisch: Experte | Wie automatisch, mit den eigenen Werten für Wirkungsgrad, Mindestspanne, Sicherheitsfaktor und Verschleiß. |

Der Plan rechnet mit der Prognose für Verbrauch und PV und lädt nur so viel, wie bis zur nächsten günstigen Phase fehlt.

Wer in eine Preisplan-Strategie wechselt, landet zuerst im Schattenmodus. „Preisplan steuert Akku“ schaltet die Steuerung ein. Ein Wechsel zwischen automatisch und Experte behält die Steuerung bei.

Bestehende Installationen leitet Maestro aus den vorhandenen Schaltern ab. Wer den Preisplan schon nutzt, erscheint als **Experte** und behält seine Werte. Die Einrichtung über die Integration ist unverändert.

Die normalen HT-Einstellungen legen nur Hochtarif-Fenster an. Niedertarif-Fenster entstehen nicht von selbst. Wer **Zeitfenster (HT/NT)** wählt, trägt die NT-Zeiten unter Tarif-Slots mit der Klasse „Niedrig“ ein. Fehlt so ein Fenster, sagt das Cockpit das.

## Einstellungen › Netz und Tarif

Die Seite ist nach der Strategie sortiert.

- **Netzladung** enthält die Strategie und, bei einem Preisplan, „Preisplan steuert Akku“. Darunter steht ein Satz mit den aktuellen Grenzen, zum Beispiel bis welcher Ladestand und wie viele kWh am Tag. Er sagt auch, ob der Plan nur rechnet oder den Akku steuert. Fehlt der Preis-Sensor bei einer dynamischen Strategie, steht das dort.
- **Grenzen** zeigt nur Werte, die die gewählte Strategie liest. Die Preisschwelle nur bei „unter Preisschwelle“, das Slot-Ziel nur bei Zeitfenster und Schwelle, die SoC-Obergrenze nur beim Preisplan.
- **Feinabstimmung Preisplan** gibt es nur bei **Dynamisch: Experte**.
- **Hochtarif** bleibt die Mindestreserve im HT-Fenster.
- **Kosten & Auswertung** steuert nicht, wann geladen wird. Die Werte fließen in Kosten, Erlös und Verschleiß der Statistik. Der Preisplan nutzt zusätzlich den Einspeisepreis, im Modus Experte auch den Verschleiß.
- **Einzelschalter** liegen hinter der Strategie. Wer einen einzeln ändert, ändert damit auch die angezeigte Strategie.

**Expertenansicht** gilt nur für diesen Browser. Sie zeigt die Einzelschalter und, bei Zeitfenster oder Schwelle, „prognosebasiert“ und „Entladung halten“.

Dieselben Blöcke stehen auf der Seite **Preisplan** unter **Netzladung einstellen**. Der Block startet zugeklappt. Zugeklappt steht rechts der Name der Strategie. Aufgeklappt sind die Einstellungen.

In der Kachel **Plan** ist die aktive Strategie die erste Zeile.

Im Steuerungsblatt ersetzt **Netzladung** die alte Tarif-Auswahl.

## Live

**Auto-Strategie** ist eine eigene Zeile unter Entladung & Reserve. Der Schalter ist immer da. Zugeklappt stehen Ziel und, nach einem Lauf, die geschätzte Ersparnis. Aufgeklappt kommen die Zielwahl, die Euro-Zahl und die Anpassung in Klartext, zum Beispiel „Morgenkappe an, bis 40 %, bis 10 Uhr“. Ändert Auto nichts, steht „Keine Anpassung. Die bisherige Einstellung war bereits die beste.“ Bei zu wenig Verlauf oder vor dem ersten Lauf gibt es keine Euro-Zahl.

Die Zahl ist die prognostizierte Ersparnis der nächsten 24 Stunden, bei vorhandener Prognose für morgen 48 Stunden, gegenüber der Einstellung ohne Auto. Sie ist kein bereits gespartes Geld. Auto stellt nur die Morgenkappe: ob sie an ist, bis zu welchem Ladestand (20–80 % in Zehnerschritten) und bis zu welcher Stunde (7–12 Uhr). Ziele bleiben Eigenverbrauch, Kosten und CO₂. Kosten rechnen mit Festpreis, Einspeisevergütung und Verschleiß, nicht mit dem dynamischen Tarif. Ein Lauf am Tag, mindestens sieben Tage Verlauf. Eine manuelle Änderung setzt die Anpassung außer Kraft.

**Entladung & Reserve** trägt den Titel in der kräftigen Schrift. Die Pillen erscheinen nur, wenn Entladung oder Reserve an ist. „Aus“ steht nicht mehr dauerhaft da.

**Heute** und **Tagesbilanz** starten zugeklappt. In der Zeile steht die Summe. Danach merkt sich der Browser, was aufgeklappt bleibt. **Heute, Woche und Monat** sitzen in der Zeile von „Heute“ und schalten beide Zahlengruppen.

Unter „Jetzt · aktualisiert live“ steht ein Punkt. Grün und leicht leuchtend, solange die Anlage erreichbar ist. Rot, wenn nicht. Dann erscheint der Chip **E3DC nicht erreichbar**.

Chips gibt es nur noch, solange der Zustand aktiv ist: Sperren, HT-Schutz, Abregelschutz, Notladung, Einspeisedrosselung, Netzladung, Akku-Priorität, schwacher PV-Tag. Ist nichts davon aktiv, fällt die Zeile weg.

**Vorausschauend** und **Preisplan im Schatten** stehen als Satz unter dem Energiefluss, nicht als dauerhafte Chips.

In der Akku-Karte bleiben Ziel-SoC und Autonomie. Die Leistung steht im Energiefluss.

Zwischen Energiefluss und Entladung & Reserve sind 18 Pixel Abstand, auch wenn keine Chips dazwischen liegen.

## Aktualisierungsintervall

`number/set_value` suchte `async_set_update_interval`. Die Methode gibt es am Coordinator nicht, die Aktion brach ab. Der Wert geht jetzt über den vorhandenen Takt: Intervall setzen und den nächsten Lauf neu planen.

## Sensoren

Tageszähler in Euro (Kosten, Einspeise-Erlös, PV-Ersparnis, Akku-Verschleiß) hatten `device_class: monetary` zusammen mit `state_class: total_increasing`. Home Assistant erlaubt monetary nur mit `total`. Die Geräteklasse ist leer, der Zähler und die Einheit EUR bleiben. Dieselbe Korrektur gilt für die PV-Restprognose P10 (Energie passt nicht zu `measurement`) und die geschätzte Auto-Einsparung (Punktschätzung, kein monetärer Zähler). Die Langzeitstatistik über `total_increasing` bleibt.

## Cache

Panel und Dashboard-Strategie hängen in der URL am Inhalt der Datei, nicht an der Änderungszeit. Ein stilles Überschreiben, das die Uhrzeit der Datei behält, ergibt trotzdem eine neue Adresse. Home Assistant registriert das Panel neu, sobald sich diese Adresse ändert.

Nach einem Update reicht ein Neustart von Home Assistant oder ein Neuladen der Integration. Danach lädt ein normales Öffnen von Maestro das neue Skript. Den Browser-Cache und den Frontend-Cache der iPad-App muss man dafür nicht leeren.

Die Dashboard-Strategie nutzt dieselbe vorhandene Adresse. Eine zweite Kopie ohne `hashlib` hat den Komponentenstart mit `NameError` abgebrochen.

## Autonomie am Akku

Die Autonomiezeit erscheint, sobald etwa eine Minute Hausverbrauch vorliegt. Bei einem Takt von 60 Sekunden ist das die erste Messung, bei 10 Sekunden sechs Messungen. Vorher blieb die Kachel bis zu 60 Messungen leer, bei langsamem Takt also bis zu einer Stunde. Der angezeigte Wert folgt danach weiter dem Median im rollierenden Fenster.

## PV morgen

Die Kopfzeile und die Statistik zeigen die morgige PV-Prognose, sobald unter den Prognose-Sensoren ein Sensor für morgen gewählt ist. Vorausschauende Ladung und die prognosebasierte Netzlade-Menge bleiben aus, solange ihre Schalter aus sind. Sie lesen denselben Wert nur, wenn sie an sind.

## Hauptschalter

Die Stellung **an** oder **aus** liegt in den Optionen der Integration. Nach einem Neustart von Home Assistant oder einem Reload steht der Schalter wieder so, wie er vorher stand. War er aus, geht Maestro nicht von allein an und schickt keine neuen Limits. Fehlt der gespeicherte Wert, bleibt der Schalter an, wie bisher.

Beim Ausschalten im Cockpit erscheint die Auswahl **1 Stunde, 3 Stunden, 6 Stunden, 12 Stunden, 24 Stunden oder dauerhaft**. Maestro merkt sich die Ablaufzeit als Uhrzeit. Der Zähler in der Kopfzeile, in der Steuerung und unter System läuft nach einem Neustart weiter. Ist die Zeit um, geht die Regelung von allein wieder an, auch wenn Home Assistant in der Zwischenzeit aus war. Dauerhaft bleibt aus, bis jemand den Schalter wieder einschaltet.

Dieselbe Auswahl öffnet ein Klick auf die Pille **Regelung aktiv** oder **Regelung aus** in der Kopfzeile. Ist die Regelung aus, heißt das Blatt **Regelung** und bietet **Wieder einschalten** zusätzlich zu den Zeiten. Ein Tippen auf eine Zeit lässt die Regelung für diese Dauer aus.

## Hinweise

- Nach diesem Stand Home Assistant neu starten oder die Integration neu laden, damit die neue Auswahl und die neue Skript-Adresse ankommen.
- Wer den Preisplan schon steuern lässt, bleibt beim Wechsel zwischen automatisch und Experte in der Steuerung. Der erste Wechsel von einer anderen Strategie in den Preisplan startet im Schattenmodus.
- Die Euro-Zahl der Auto-Strategie und die Ersparnis in der Plan-Kachel sind zwei verschiedene Rechnungen.
