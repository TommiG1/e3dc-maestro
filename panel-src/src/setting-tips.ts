/** One short sentence per setting. Shown after a second of hover or press. */
export const SETTING_TIPS: Record<string, { de: string; en: string }> = {
  grid_charge_strategy: {
    de: "Aus: nie aus dem Netz. Zeitfenster: in NT-Fenstern. Preisschwelle: unter einem festen Preis. Automatisch: der Preisplan wählt die günstigsten Stunden. Experte: wie automatisch, mit eigenen Werten.",
    en: "Off: never from the grid. Time windows: in off-peak windows. Price threshold: below a fixed price. Automatic: the price plan picks the cheapest hours. Expert: like automatic, with your own values.",
  },
  inverter_power: {
    de: "Gesamte WR-Leistung der Anlage inkl. zusätzlicher Erzeuger. Begrenzt die Entladung und skaliert die Last-Balken im Haus-Fluss.",
    en: "Total plant inverter power including additional producers. Caps discharge and scales the house-flow load bars.",
  },
  installed_kwp: {
    de: "Installierte PV-Leistung. Daraus vergleicht Maestro den Tagesertrag.",
    en: "Installed PV power. Maestro compares the day's yield against this.",
  },
  max_charge_power: {
    de: "Höchste Ladeleistung, die Maestro anfordern darf.",
    en: "Highest charge power Maestro may request.",
  },
  min_charge_power: {
    de: "Unter dieser Leistung startet Maestro keine Ladung.",
    en: "Maestro does not start charging below this power.",
  },
  feed_in_limit_percent: {
    de: "Anteil der Wechselrichterleistung, der höchstens ins Netz gehen darf.",
    en: "Share of inverter power that may be exported at most.",
  },
  charge_threshold: {
    de: "Unter diesem SoC lädt Maestro sofort aus dem Netz. 0 schaltet die Notladung aus.",
    en: "Below this SoC Maestro charges from the grid at once. 0 turns emergency charging off.",
  },
  advanced_corridor: {
    de: "Übersetzt die fehlende Strecke zum Ziel in eine Ladeleistung zwischen unterem und oberem Korridor, in Watt.",
    en: "Turns the gap to the target into a charge power between the lower and upper corridor, in watts.",
  },
  lower_corridor: {
    de: "Kleinste Ladeleistung im Korridor, in Watt. Darunter pausiert die Ladung, wenn die Pause an ist.",
    en: "Lowest charge power in the corridor, in watts. Charging pauses below it while the pause is on.",
  },
  upper_corridor: {
    de: "Größte Ladeleistung im erweiterten Korridor, in Watt.",
    en: "Highest charge power in the advanced corridor, in watts.",
  },
  charge_target: {
    de: "SoC, den der Akku bis zum Ladeende erreichen soll.",
    en: "SoC the battery should reach by the end of charging.",
  },
  winter_minimum_hour: {
    de: "Frist fürs Tagesziel am kürzesten Tag. Danach lädt Überschuss weiter.",
    en: "Deadline for the daily target on the shortest day. Surplus keeps charging after that.",
  },
  summer_maximum_hour: {
    de: "Wird von der Regelung nicht gelesen. Das Sommer-Ladeende steht im anderen Feld.",
    en: "The control logic does not read this. The summer end of charging is the other field.",
  },
  summer_charge_end: {
    de: "Frist fürs Tagesziel am längsten Tag. Dazwischen nach Tageslänge.",
    en: "Deadline for the daily target on the longest day. Other days fall in between by day length.",
  },
  hard_soc_limit_enabled: {
    de: "Harter Deckel: darüber lädt Maestro den Akku nicht weiter.",
    en: "Hard cap: Maestro will not charge the battery above it.",
  },
  hard_soc_limit: {
    de: "SoC, der mit dem harten Deckel nicht überschritten wird.",
    en: "SoC the hard cap will not go past.",
  },
  fast_charge_floor_enabled: {
    de: "Unter dem Boden lädt Maestro mit voller Leistung, unabhängig vom Korridor.",
    en: "Below the floor Maestro charges at full power, ignoring the corridor.",
  },
  fast_charge_floor_soc: {
    de: "SoC, unter dem die Schnellladung greift.",
    en: "SoC below which fast charging applies.",
  },
  forward_looking_enabled: {
    de: "Plant die Ladung aus dem erwarteten Verbrauch der nächsten Stunden.",
    en: "Plans charging from the expected consumption of the next hours.",
  },
  forward_looking_max_soc: {
    de: "Obergrenze für die vorausschauende Ladung.",
    en: "Cap for look-ahead charging.",
  },
  pv_forecast_enabled: {
    de: "Verschiebt die Ladung, wenn die PV-Prognose den Bedarf deckt.",
    en: "Delays charging when the PV forecast covers the need.",
  },
  delay_min_soc: {
    de: "Unter diesem SoC verzögert weder die Prognose noch das Warten auf die Sonne die Ladung.",
    en: "Below this SoC neither the forecast nor waiting for the sun delays charging.",
  },
  pv_forecast_threshold_kwh: {
    de: "Ab dieser prognostizierten Energiemenge gilt der Tag als ergiebig genug.",
    en: "From this forecast energy the day counts as productive enough.",
  },
  pv_forecast_safety_factor: {
    de: "Die Prognose wird um diesen Faktor vorsichtiger gerechnet.",
    en: "The forecast is treated this much more cautiously.",
  },
  astro_enabled: {
    de: "Richtet Ladestart und Ladeende an Sonnenauf- und Untergang aus.",
    en: "Aligns charge start and end with sunrise and sunset.",
  },
  charge_start_sunrise_offset_h: {
    de: "Stunden nach Sonnenaufgang, ab denen geladen werden darf.",
    en: "Hours after sunrise before charging may start.",
  },
  charge_end_sunset_offset_h: {
    de: "Stunden vor Sonnenuntergang, zu denen das Ladeende liegen soll.",
    en: "Hours before sunset when charging should finish.",
  },
  morning_cap_enabled: {
    de: "Hält den SoC am Morgen unter einer Grenze, damit PV-Ertrag noch hineinpasst.",
    en: "Keeps the morning SoC under a limit so PV yield still fits.",
  },
  morning_cap_soc: {
    de: "SoC, den der Morning-Cap am Morgen nicht überschreitet.",
    en: "SoC the morning cap will not exceed.",
  },
  morning_cap_until_h: {
    de: "Lokale Stunde, bis zu der der Morning-Cap gilt.",
    en: "Local hour until which the morning cap applies.",
  },
  gentle_charge_enabled: {
    de: "Lädt mit einem Bruchteil der möglichen Leistung, schonender für den Akku.",
    en: "Charges at a fraction of the possible power, easier on the battery.",
  },
  gentle_charge_factor: {
    de: "Anteil der Ladeleistung im Schonmodus. 0,5 ist die Hälfte.",
    en: "Share of charge power in gentle mode. 0.5 is half.",
  },
  spreading_enabled: {
    de: "Verteilt die Ladung über das Fenster, statt in einem Rutsch voll zu laden.",
    en: "Spreads charging across the window instead of one full burst.",
  },
  spreading_target_soc: {
    de: "SoC, auf den die verteilte Ladung hinsteuert.",
    en: "SoC the spread charging aims for.",
  },
  low_yield_priority_enabled: {
    de: "An ertragsarmen Tagen wird der Akku früher und höher geladen.",
    en: "On low-yield days the battery is charged earlier and higher.",
  },
  low_yield_threshold: {
    de: "Unter diesem Anteil der Referenz gilt der Tag als ertragsarm.",
    en: "Below this share of the reference the day counts as low yield.",
  },
  low_yield_reference_kwh: {
    de: "Feste Tagesreferenz in kWh. 0 übernimmt den automatischen Wert.",
    en: "Fixed daily reference in kWh. 0 uses the automatic value.",
  },
  low_yield_reference_kwh_per_kwp: {
    de: "Erwartete kWh pro installiertem kWp für die automatische Referenz.",
    en: "Expected kWh per installed kWp for the automatic reference.",
  },
  curtailment_guard_enabled: {
    de: "Lädt den Akku, sobald die Einspeisung an der Abregelgrenze kratzt.",
    en: "Charges the battery once export nears the curtailment limit.",
  },
  curtailment_activation_w: {
    de: "Einspeiseleistung, ab der der Abregelschutz die Ladung startet.",
    en: "Export power at which curtailment protection starts charging.",
  },
  curtailment_release_w: {
    de: "Unter dieser Einspeisung lässt der Abregelschutz wieder los.",
    en: "Below this export, curtailment protection lets go again.",
  },
  two_tier_enabled: {
    de: "Lädt erst auf ein frühes Ziel und hebt es später am Tag an.",
    en: "Charges to an early target first and raises it later in the day.",
  },
  charge_target_late: {
    de: "Höheres SoC-Ziel für den späteren Teil des Tages.",
    en: "Higher SoC target for the later part of the day.",
  },
  late_charge_end_h: {
    de: "Stunde, ab der das spätere Ziel gilt.",
    en: "Hour from which the later target applies.",
  },
  lower_corridor_pause_enabled: {
    de: "Pausiert die Mindestladung, solange der SoC im unteren Korridor liegt.",
    en: "Pauses minimum charging while the SoC sits in the lower corridor.",
  },
  tariff_mode: {
    de: "Dein echter Vertrag. Fest: Kosten und PV-Ersparnis mit dem Bezugspreis; ein dynamischer Preis-Sensor erscheint daneben als Simulation. Dynamisch: Kosten und Ersparnis mit dem Preis-Sensor.",
    en: "Your real contract. Fixed: cost and PV savings use the buy price; a dynamic price sensor shows beside them as a simulation. Dynamic: cost and savings use the price sensor.",
  },
  dynamic_tariff_enabled: {
    de: "Schaltet die Auswertung des dynamischen Preises für Regelung und Simulation ein.",
    en: "Turns evaluation of the dynamic price on for control and simulation.",
  },
  fixed_buy_price: {
    de: "Echter Bezugspreis bei festem Tarif, in Euro pro kWh. Daraus werden die Hauptzahlen für Kosten und Ersparnis gerechnet.",
    en: "Real buy price on a fixed tariff, in euros per kWh. Main cost and savings figures use this.",
  },
  feed_in_price: {
    de: "Vergütung pro eingespeister kWh. Der Preisplan rechnet sie gegen den Bezug.",
    en: "Payment per exported kWh. The price plan weighs it against buying.",
  },
  battery_capex_eur: {
    de: "Anschaffungskosten des Akkus. Daraus rechnet der Preisplan den Verschleiß pro kWh.",
    en: "Battery purchase cost. The price plan turns it into wear per kWh.",
  },
  battery_total_cycles: {
    de: "Erwartete Lebensdauer in Zyklen. Mehr Zyklen bedeuten weniger Verschleiß pro kWh.",
    en: "Expected lifetime in cycles. More cycles mean less wear per kWh.",
  },
  cheap_threshold: {
    de: "Bis zu diesem Preis pro kWh gilt der Strom als günstig.",
    en: "Up to this price per kWh the electricity counts as cheap.",
  },
  max_grid_charge_kwh: {
    de: "Sicherheitsgrenze: Nach so vielen kWh aus dem Netz an einem Tag stoppt die Netzladung. Die Menge selbst bestimmen Ziel und Prognose. 0 = keine Grenze.",
    en: "Safety cap: grid charging stops after this many kWh from the grid in one day. Target and forecast decide the amount. 0 = no cap.",
  },
  low_slot_grid_charge_enabled: {
    de: "Lädt im günstigen Zeitfenster aktiv aus dem Netz, nicht nur per Preisplan.",
    en: "Actively charges from the grid in the cheap window, not only via the price plan.",
  },
  low_slot_target_soc: {
    de: "SoC, bis zu dem im günstigen Fenster aus dem Netz geladen wird.",
    en: "SoC up to which the cheap window charges from the grid.",
  },
  low_slot_forecast_based: {
    de: "Lädt so viel, wie der Akku bis zum nächsten günstigen Fenster braucht (Verbrauchs- und PV-Prognose, plus Reserve). Das Ziel ist dann nur die Obergrenze.",
    en: "Charges what the battery needs until the next cheap window (consumption and PV forecast, plus reserve). The target is then only a cap.",
  },
  low_slot_hold_discharge: {
    de: "Sperrt die Entladung, sobald das Ziel im günstigen Fenster erreicht ist.",
    en: "Blocks discharge once the cheap-window target is reached.",
  },
  price_plan_enabled: {
    de: "Berechnet den Plan und zeigt ihn. Der Akku wird davon noch nicht gesteuert.",
    en: "Calculates the plan and shows it. It does not control the battery yet.",
  },
  price_plan_active: {
    de: "Setzt den Plan um: Netzladung in günstigen Slots und Halten der Entladung.",
    en: "Executes the plan: grid charging in cheap slots and holding discharge.",
  },
  price_plan_max_soc: {
    de: "Der Plan lädt aus dem Netz höchstens bis zu diesem SoC.",
    en: "The plan charges from the grid only up to this SoC.",
  },
  price_plan_min_spread: {
    de: "Mindestabstand zwischen günstigem und teurem Preis, damit sich Netzladung lohnt.",
    en: "Minimum gap between cheap and expensive price for grid charging to pay off.",
  },
  price_plan_efficiency: {
    de: "Wirkungsgrad des Umwegs über den Akku. 0,9 heißt: 10 Prozent gehen verloren.",
    en: "Round-trip efficiency. 0.9 means 10 percent is lost.",
  },
  price_plan_safety_factor: {
    de: "Maestro rechnet den Verbrauch um diesen Faktor höher, damit der Akku nicht leerläuft. Gilt für den Preisplan (Experte) und für die prognosebasierte Netzladung in Zeitfenstern und unter Preisschwelle.",
    en: "Maestro assumes consumption this much higher so the battery does not run empty. Applies to the price plan (expert) and to forecast-based grid charging in time windows and below the price threshold.",
  },
  ht_enabled: {
    de: "Schützt den SoC im Hochtarif-Fenster vor Entladung.",
    en: "Protects the SoC from discharge during the high-tariff window.",
  },
  ht_sat: {
    de: "Der Hochtarif-Schutz gilt auch am Samstag.",
    en: "High-tariff protection also applies on Saturday.",
  },
  ht_sun: {
    de: "Der Hochtarif-Schutz gilt auch am Sonntag.",
    en: "High-tariff protection also applies on Sunday.",
  },
  ht_on: {
    de: "Stunde, ab der das Hochtarif-Fenster gilt.",
    en: "Hour when the high-tariff window starts.",
  },
  ht_off: {
    de: "Stunde, ab der das Hochtarif-Fenster endet.",
    en: "Hour when the high-tariff window ends.",
  },
  ht_min: {
    de: "SoC, der im Hochtarif im Winter nicht unterschritten wird.",
    en: "SoC that winter high-tariff hours will not go below.",
  },
  ht_sockel: {
    de: "SoC-Sockel zur Tag-und-Nacht-Gleiche, zwischen Winter- und Sommerwert.",
    en: "SoC floor at the equinox, between the winter and summer values.",
  },
  seasonal_reserve_enabled: {
    de: "Die Notstromreserve folgt der Jahreszeit, höher im Winter, niedriger im Sommer.",
    en: "The backup reserve follows the season, higher in winter, lower in summer.",
  },
  reserve_winter_percent: {
    de: "Notstromreserve zur Wintersonnenwende.",
    en: "Backup reserve at the winter solstice.",
  },
  reserve_equinox_percent: {
    de: "Notstromreserve zur Tag-und-Nacht-Gleiche.",
    en: "Backup reserve at the equinox.",
  },
  fixed_reserve_enabled: {
    de: "Ersetzt die saisonale Reserve durch einen festen SoC und lädt darunter aus dem Netz.",
    en: "Replaces the seasonal reserve with a fixed SoC and charges from the grid below it.",
  },
  fixed_reserve_soc: {
    de: "Fester SoC der Notstromreserve. Darunter ist die Entladung gesperrt.",
    en: "Fixed backup SoC. Discharge is blocked below it.",
  },
  adaptive_reserve_enabled: {
    de: "Hebt die Reserve anhand des Verbrauchs der letzten Tage an.",
    en: "Raises the reserve from the consumption of recent days.",
  },
  evcc_enabled: {
    de: "Begrenzt die Entladung, während EVCC das Auto im Now-Modus lädt.",
    en: "Limits discharge while EVCC charges the car in now mode.",
  },
  evcc_discharge_limit_w: {
    de: "Höchste Entladung in Watt, solange EVCC im Now-Modus lädt.",
    en: "Highest discharge in watts while EVCC charges in now mode.",
  },
  wallbox_enabled: {
    de: "Maestro steuert den Ladestrom der Wallbox nach Überschuss.",
    en: "Maestro controls the wallbox current from surplus.",
  },
  wallbox_type: {
    de: "Welche Wallbox Maestro anspricht. Die Leistungswerte hängen davon ab.",
    en: "Which wallbox Maestro talks to. The power figures depend on it.",
  },
  wallbox_min_current: {
    de: "Niedrigster Ladestrom. Darunter schaltet Maestro die Wallbox aus.",
    en: "Lowest charge current. Below it Maestro switches the wallbox off.",
  },
  wallbox_max_current: {
    de: "Höchster Ladestrom, den Maestro der Wallbox gibt.",
    en: "Highest charge current Maestro gives the wallbox.",
  },
  wallbox_min_surplus: {
    de: "Überschuss, ab dem die Wallbox laden darf.",
    en: "Surplus from which the wallbox may charge.",
  },
  wallbox_discharge_guard_enabled: {
    de: "Stoppt die Wallbox, wenn der Akku dafür zu stark entladen würde.",
    en: "Stops the wallbox when it would discharge the battery too hard.",
  },
  wallbox_discharge_guard_threshold_w: {
    de: "Ab dieser Akku-Entladung greift der Netzschutz der Wallbox.",
    en: "Wallbox grid protection starts at this battery discharge.",
  },
  hp_enabled: {
    de: "Gibt die Wärmepumpe nur bei Überschuss und passendem Preis frei.",
    en: "Releases the heat pump only with surplus and a suitable price.",
  },
  hp_min_surplus: {
    de: "Überschuss, ab dem die Wärmepumpe laufen darf.",
    en: "Surplus from which the heat pump may run.",
  },
  hp_max_price: {
    de: "Über diesem Strompreis bleibt die Wärmepumpe aus.",
    en: "Above this electricity price the heat pump stays off.",
  },
  hp_min_run_minutes: {
    de: "Mindestlaufzeit, damit die Wärmepumpe nicht taktet.",
    en: "Minimum runtime so the heat pump does not short-cycle.",
  },
  hp_min_pause_minutes: {
    de: "Mindestpause zwischen zwei Läufen der Wärmepumpe.",
    en: "Minimum pause between two heat-pump runs.",
  },
  morning_discharge_mode: {
    de: "Wie der Akku vor dem PV-Tag geleert wird: aus, fest oder nach Preis.",
    en: "How the battery is emptied before the PV day: off, fixed, or by price.",
  },
  morning_unload_soc: {
    de: "SoC, auf den die Vorentladung am Morgen hinuntergeht.",
    en: "SoC the morning pre-discharge goes down to.",
  },
  morning_unload_start_soc: {
    de: "Erst oberhalb dieses SoC startet die Vorentladung.",
    en: "Pre-discharge starts only above this SoC.",
  },
  pre_discharge_offset_h: {
    de: "Stunden vor dem Ladestart, ab denen vorentladen wird.",
    en: "Hours before charge start when pre-discharge may begin.",
  },
  pre_discharge_max_power_w: {
    de: "Höchste Leistung der Vorentladung.",
    en: "Highest power of the pre-discharge.",
  },
  pre_discharge_tibber_auto: {
    de: "Entlädt morgens nur, wenn der Strompreis unter der Tibber-Schwelle liegt.",
    en: "Discharges in the morning only when the price is under the Tibber threshold.",
  },
  morning_grid_export_threshold: {
    de: "Unter diesem Preis darf die Vorentladung ins Netz gehen.",
    en: "Below this price the pre-discharge may export to the grid.",
  },
  regelung_aktiv: {
    de: "Hauptschalter. Aus heißt: Maestro sendet keine Limits mehr. Beim Ausschalten wählst du 1, 3, 6, 12 oder 24 Stunden oder dauerhaft. Die Stellung und die restliche Zeit bleiben nach einem Neustart.",
    en: "Master switch. Off means Maestro stops sending limits. Turning it off offers 1, 3, 6, 12 or 24 hours, or until turned on. The position and the time left survive a restart.",
  },
  auto_mode_enabled: {
    de: "Rechnet einmal täglich passende Regelparameter aus dem Verbrauchs- und PV-Verlauf aus. Braucht mindestens 7 Tage Daten.",
    en: "Works out fitting control parameters once a day from consumption and PV history. Needs at least 7 days of data.",
  },
  auto_mode_objective: {
    de: "Worauf die Auto-Optimierung achtet: Eigenverbrauch, Kosten oder CO₂.",
    en: "What the auto optimisation aims for: self-consumption, cost or CO₂.",
  },
  force_discharge: {
    de: "Entlädt den Akku mit der eingestellten Leistung, unabhängig vom Plan.",
    en: "Discharges the battery at the set power, ignoring the plan.",
  },
  force_discharge_power_w: {
    de: "Leistung der erzwungenen Entladung in Watt.",
    en: "Power of the forced discharge in watts.",
  },
  soc_hysteresis_percent: {
    de: "SoC-Änderung, die Maestro ignoriert, damit die Regelung nicht pendelt.",
    en: "SoC change Maestro ignores so control does not hunt.",
  },
  charge_ramp_w_per_cycle: {
    de: "Wie schnell die Ladeleistung pro Takt ansteigen darf.",
    en: "How fast charge power may rise per cycle.",
  },
  update_interval: {
    de: "Sekunden zwischen zwei Regel-Durchläufen. Standard 30 s, möglich 10–120 s.",
    en: "Seconds between two control cycles. Default 30 s, range 10–120 s.",
  },
  watchdog_timeout: {
    de: "Nach diesen Sekunden ohne Kontakt hebt der Wechselrichter die Limits auf.",
    en: "After these seconds without contact the inverter clears the limits.",
  },
  debug: {
    de: "Schreibt ausführliche Regelentscheidungen ins Log.",
    en: "Writes detailed control decisions to the log.",
  },
  reset_stats: {
    de: "Setzt die Tageszähler zurück. Die Regelung selbst bleibt, wie sie ist.",
    en: "Resets the daily counters. Control itself stays as it is.",
  },
  clear_limits: {
    de: "Hebt die gesetzten Lade- und Entladelimits am Wechselrichter sofort auf.",
    en: "Clears the charge and discharge limits on the inverter immediately.",
  },
};

export const settingTip = (language: string, key: string): string | undefined => {
  const tip = SETTING_TIPS[key];
  if (!tip) return undefined;
  return language.toLowerCase().startsWith("de") ? tip.de : tip.en;
};
