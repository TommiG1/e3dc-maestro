# Entwurf – noch kein Release

Neue Punkte hier sammeln und beim nächsten Release in eine Versionsdatei verschieben.

## Neu

- **Reserve in der Akku-Kachel.** Der gelbe Sockel und die Reserve-Zeile erscheinen jetzt auch bei saisonaler und verbrauchsadaptiver Notstromreserve, nicht nur bei der festen. Die Zeile nennt dazu die Quelle: manuell, saisonal oder adaptiv. Es gilt dieselbe Reihenfolge wie in der Regelung ([Discussion #42](https://github.com/TommiG1/e3dc-maestro/discussions/42)).
- **Saisonale und adaptive Reserve im Schnellzugriff.** Im Dialog „Akku-Steuerung“ lassen sich beide Reserven jetzt direkt ein- und ausschalten. Darunter steht, welche Reserve gerade gilt. Die Schalter sind nur für Admins bedienbar und brauchen keinen Neustart der Integration.

## Fixes

- **Schonladung bremst die Akku-Priorität nicht mehr.** Am schwachen PV-Tag oder bei zu knapper Restprognose sollte der Akku den vollen Überschuss nehmen. Eine eingeschaltete Schonladung kürzte das Ladelimit trotzdem auf den eingestellten Faktor, der Rest ging ins Netz. Jetzt bleibt das Limit bei Akku-Priorität unangetastet ([Discussion #42](https://github.com/TommiG1/e3dc-maestro/discussions/42)).
- **Prognose-Felder eindeutig benannt.** Das Feld „Prognose übermorgen“ im Panel war im HA-Dialog als „Prognose morgen (Stundenprofil)“ beschriftet und wird auch so verwendet. Das Panel nennt es jetzt genauso, daneben steht „Prognose morgen (Tagessumme)“. Die Kopfzeile auf Live zeigt nur noch Rest heute und morgen. Das Feld Stundenprofil ist als optional gekennzeichnet. Bei Solcast bleibt es leer, weil der Sensor „Prognose morgen“ das Stundenprofil gleich mitliefert. Wer dort einen Solcast-Tag-3-Sensor eingetragen hatte, nimmt ihn heraus.
- **Reserve „Äquinoktium“ heißt jetzt Sommer.** Die Regelung rechnet nach der Tageslänge zwischen dem Wintersockel am kürzesten Tag und diesem Wert am längsten Tag. Er gilt also im Sommer. Zur Tag-und-Nacht-Gleiche liegt der Sockel etwa in der Mitte. Das betrifft die Notstromreserve und die Speicherreserve. Die Entity-IDs bleiben unverändert, nur Namen und Erklärungen sind korrigiert.
- **Adaptive Reserve ehrlich erklärt.** Sie ersetzt den saisonalen Wert durch einen aus dem Hausverbrauch berechneten, höchstens bis zur Obergrenze. Sie kann den Sockel also auch senken, nicht nur anheben, und wirkt nur zusammen mit der saisonalen Reserve.
- **Ladeende Sommermaximum.** Das Feld wird von der Regelung nicht gelesen. Der Hinweis „derzeit ungenutzt“ stand nur im Ersteinrichtungsdialog und steht jetzt auch in den Einstellungen unter Geräte und Dienste, mit Erklärung.
