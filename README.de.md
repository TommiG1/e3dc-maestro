[🇬🇧 English](README.md) | 🇩🇪 Deutsch

<p align="center">
  <img src="brand/maestro-logo.png" alt="E3DC Maestro" width="88" height="88">
</p>

<h1 align="center">E3DC Maestro</h1>

<p align="center">
  <strong>Dein E3DC. Verständlich gesteuert — in Home Assistant.</strong><br>
  Lokal · erklärbar · ohne Cloud-Zwang<br>
  <sub>Ein Produkt von GlowDash</sub>
</p>

<p align="center">
  <a href="https://glowdash.de/maestro/docs/"><img src="https://img.shields.io/badge/Handbuch-glowdash.de%2Fmaestro%2Fdocs-D1A85C?style=for-the-badge" alt="Handbuch"></a>
  <a href="https://github.com/TommiG1/hacs-e3dc-maestro/discussions"><img src="https://img.shields.io/badge/GitHub-Discussions-238636?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Discussions"></a>
  <a href="https://www.paypal.com/paypalme/tommigraf"><img src="https://img.shields.io/badge/Spenden-PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white" alt="Spenden via PayPal"></a>
  <br>
  <a href="https://glowdash.de/maestro/"><img src="https://img.shields.io/badge/Website-glowdash.de%2Fmaestro-101214?style=for-the-badge" alt="Website"></a>
  <a href="https://github.com/TommiG1/hacs-e3dc-maestro/releases"><img src="https://img.shields.io/github/v/release/TommiG1/hacs-e3dc-maestro?style=for-the-badge&label=Release&color=101214" alt="Release"></a>
</p>

![Maestro-Cockpit — Live](Screenshots/cockpit_01_live.png)

<p align="center">
  <img src="Screenshots/cockpit_06_mobil.png" alt="Maestro mobil" width="260">
</p>

<p align="center"><em>Alles in der Sidebar. Ohne Custom Cards — Desktop und Handy.</em></p>

**E3DC Maestro** bringt Regelung, Prognose und Tarif unter ein Dach: das Maestro-Cockpit. Du siehst, was passiert — und warum.

> **📖 Handbuch** — Einrichtung, Cockpit, Regellogik und FAQ:  
> **[glowdash.de/maestro/docs](https://glowdash.de/maestro/docs/)**  
> (gleiche Kapitelstruktur wie die Hilfe `?` im Panel)

> **Dieses Projekt lebt von Spenden.** Maestro bleibt kostenlos und Open Source.  
> Wenn es dir zu Hause hilft: [Spenden via PayPal](https://www.paypal.com/paypalme/tommigraf) — danke.

---

## Was du bekommst

| | |
|---|---|
| **Live-Energiefluss** | PV, Netz, Haus, Akku und Verbraucher — plus Tagesbilanz |
| **48h-Prognose** | Vorausschauendes Laden und SoC-Trajektorie |
| **Preisplan & Tarife** | Dynamische Tarife, Zeitfenster, Netzladung — nachvollziehbar |
| **Entscheidung erklären** | Warum gerade diese Phase aktiv ist |
| **Schnellsteuerung** | Reserve, Pause, Overrides direkt im Panel |
| **Lokal** | Priorisierte Phasen, Abregelschutz, Wallbox- und WP-Logik |

---

## In drei Schritten startklar

Maestro setzt **[E3DC RSCP](https://github.com/torbennehmer/hacs-e3dc)** voraus. Ohne sie keine Steuerung.

### 1. E3DC RSCP einrichten

[torbennehmer/hacs-e3dc](https://github.com/torbennehmer/hacs-e3dc) installieren und verbinden.

> **AI360 muss aus sein.** Sonst überschreibt E3DC externe Ladebefehle.

### 2. Maestro installieren

**HACS (bis HA 2026.10):** Custom Repository `https://github.com/TommiG1/hacs-e3dc-maestro` → Integration → Download → Neustart.

**Marketplace (ab HA 2026.11):** Einstellungen → Marketplace → Maestro.

### 3. Cockpit öffnen

Integration hinzufügen → **Maestro** in der Seitenleiste. Onboarding inklusive.

---

## Einblicke

| Prognose | Preisplan | Entscheidung |
|:---:|:---:|:---:|
| ![Prognose](Screenshots/cockpit_02_prognose.png) | ![Preisplan](Screenshots/cockpit_03_preisplan.png) | ![Entscheidung](Screenshots/cockpit_04_entscheidung.png) |

---

## Voraussetzungen

Home Assistant ≥ 2024.1 · E3DC RSCP aktiv · getestet u. a. mit S10E / S10E Pro · PV-Prognose optional.

**Handbuch:** [glowdash.de/maestro/docs](https://glowdash.de/maestro/docs/) · Website: [glowdash.de/maestro](https://glowdash.de/maestro/) · [Discussions](https://github.com/TommiG1/hacs-e3dc-maestro/discussions) · [Issues](https://github.com/TommiG1/hacs-e3dc-maestro/issues) · [Releases](https://github.com/TommiG1/hacs-e3dc-maestro/releases)

**E3DC Maestro** von Thomas Graf / GlowDash · Open Source ([AGPL-3.0](LICENSE)) · Basis: [E3DC RSCP](https://github.com/torbennehmer/hacs-e3dc) von Torben Nehmer
