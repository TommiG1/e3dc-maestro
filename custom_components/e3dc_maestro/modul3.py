"""§14a Modul 3 – zeitvariable Netzentgelte (NT / ST / HT).

Reine Logik ohne Home Assistant: Zone für einen Zeitpunkt, Schicht auf die
Preiskurve, optionale Tarif-Slots aus den Fenstern.
"""
from __future__ import annotations

import datetime as _dt
from dataclasses import dataclass, field
from typing import Any, Mapping

from .control_tariff import TARIFF_HIGH, TARIFF_LOW, TariffSlot, quarter_of
from .price_curve import PriceHorizon

ZONE_NT = "nt"
ZONE_ST = "st"
ZONE_HT = "ht"
ZONES = (ZONE_NT, ZONE_ST, ZONE_HT)
ALL_QUARTERS: frozenset[int] = frozenset({1, 2, 3, 4})
# Stored options written by the v6 migration (copied "fill" slots → live slots).
TARIFF_SLOTS_BACKUP_KEY = "tariff_slots_backup_modul3"
SLOTS_MIGRATED_KEY = "modul3_slots_migrated"

# Preset VAT rates (%) for Modul-3 ct from the DE DSO price sheet (net → gross).
# §14a Modul 3 is Germany-only; AT/CH have no equivalent NT/ST/HT sheet.
VAT_OFF = "off"
VAT_DE = "de"
VAT_CUSTOM = "custom"
VAT_CHOICES = (VAT_OFF, VAT_DE, VAT_CUSTOM)
VAT_PRESET_PERCENT = {
    VAT_OFF: 0.0,
    VAT_DE: 19.0,
}
# Brief AT/CH presets from an earlier UI — map to custom if still stored.
_LEGACY_VAT_PERCENT = {"at": 20.0, "ch": 8.1}


@dataclass(frozen=True)
class Modul3Window:
    start_h: float  # [0, 24)
    end_h: float    # (0, 24], may be < start_h over midnight


@dataclass(frozen=True)
class Modul3Zone:
    price_ct_kwh: float
    windows: tuple[Modul3Window, ...] = ()


@dataclass(frozen=True)
class Modul3Profile:
    """Aktives Modul-3-Profil. ``enabled`` schaltet alles; ``add_to_curve`` die €-Schicht."""

    enabled: bool = False
    add_to_curve: bool = True
    vat: str = VAT_OFF
    vat_percent: float = 0.0  # used when vat == custom
    zones: Mapping[str, Modul3Zone] = field(default_factory=dict)
    # Quartale, in denen NT/HT gelten; sonst überall ST (BNetzA: max. zwei ohne).
    quarters: frozenset[int] = ALL_QUARTERS
    # NT/HT live als Tarif-Slots (low/high) in den Zeitplan einspeisen.
    tariff_slots: bool = False

    def active_in(self, when: _dt.datetime) -> bool:
        """True wenn NT/HT zum Zeitpunkt gelten (Modul 3 an und Quartal gewählt)."""
        return self.enabled and quarter_of(when) in self.quarters

    def vat_rate_percent(self) -> float:
        if self.vat == VAT_CUSTOM:
            return max(0.0, float(self.vat_percent))
        return float(VAT_PRESET_PERCENT.get(self.vat, 0.0))

    def fee_eur(self, zone: str) -> float:
        z = self.zones.get(zone)
        if z is None:
            return 0.0
        eur = max(0.0, float(z.price_ct_kwh)) / 100.0
        return eur * (1.0 + self.vat_rate_percent() / 100.0)


def _window_active(window: Modul3Window, hour: float) -> bool:
    if window.start_h <= window.end_h:
        return window.start_h <= hour < window.end_h
    return hour >= window.start_h or hour < window.end_h


def zone_at(now: _dt.datetime, profile: Modul3Profile) -> str:
    """Aktive Zone: HT vor NT vor ST (Rest).

    Maßgeblich ist das Quartal von ``now`` selbst, nicht das des Fensterbeginns:
    Ein NT-Fenster 22:15–06:15 am 31.3. ist am 1.4. um 03:00 schon ST, wenn Q2
    nicht gewählt ist – so rechnet der Netzbetreiber ab.
    """
    if not profile.active_in(now):
        return ZONE_ST
    hour = now.hour + now.minute / 60.0 + now.second / 3600.0
    for zone in (ZONE_HT, ZONE_NT):
        z = profile.zones.get(zone)
        if z is None:
            continue
        for window in z.windows:
            if _window_active(window, hour):
                return zone
    return ZONE_ST


def add_modul3_to_horizon(
    horizon: PriceHorizon | None,
    profile: Modul3Profile,
    now: _dt.datetime | None = None,
) -> PriceHorizon | None:
    """Addiert Modul-3-Arbeitspreis je Slot-Mitte. Ohne Schicht unverändert."""
    if horizon is None or not profile.enabled or not profile.add_to_curve:
        return horizon
    if not horizon.prices:
        return horizon
    # Aware datetimes add wall-clock time; across a DST switch that shifts
    # the slot mid by an hour. Step in UTC and convert back to local.
    tz = horizon.start.tzinfo
    cursor = horizon.start.astimezone(_dt.timezone.utc) if tz is not None else horizon.start
    prices: list[float] = []
    for hours, price in zip(horizon.slot_hours, horizon.prices):
        mid = cursor + _dt.timedelta(hours=hours / 2.0)
        if tz is not None:
            mid = mid.astimezone(tz)
        prices.append(price + profile.fee_eur(zone_at(mid, profile)))
        cursor += _dt.timedelta(hours=hours)
    return PriceHorizon(
        start=horizon.start,
        slot_hours=list(horizon.slot_hours),
        prices=prices,
        known_until=horizon.known_until,
    )


def tariff_slots_from_modul3(profile: Modul3Profile) -> list[dict[str, Any]]:
    """NT→low, HT→high, alle Wochentage. ST bleibt Rest (kein Slot nötig)."""
    if not profile.enabled:
        return []
    weekdays = list(range(7))
    slots: list[dict[str, Any]] = []
    mapping = ((ZONE_NT, "low"), (ZONE_HT, "high"))
    for zone, class_ in mapping:
        z = profile.zones.get(zone)
        if z is None:
            continue
        for window in z.windows:
            slots.append(
                {
                    "weekdays": list(weekdays),
                    "start_h": float(window.start_h),
                    "end_h": float(window.end_h),
                    "class_": class_,
                }
            )
    return slots


def derived_tariff_slots(profile: Modul3Profile) -> tuple[TariffSlot, ...]:
    """NT→low, HT→high als Laufzeit-Slots, nur in ``profile.quarters`` aktiv.

    Leer, solange Modul 3 oder der Slot-Schalter aus ist. Die Slots werden nie
    gespeichert; sie entstehen bei jedem Options-Rebuild neu aus Modul 3.
    """
    if not (profile.enabled and profile.tariff_slots):
        return ()
    weekdays = frozenset(range(7))
    out: list[TariffSlot] = []
    for zone, class_ in ((ZONE_NT, TARIFF_LOW), (ZONE_HT, TARIFF_HIGH)):
        z = profile.zones.get(zone)
        if z is None:
            continue
        for window in z.windows:
            out.append(
                TariffSlot(
                    weekdays=weekdays,
                    start_h=float(window.start_h),
                    end_h=float(window.end_h),
                    class_=class_,
                    quarters=profile.quarters,
                )
            )
    return tuple(out)


def modul3_runtime_status(profile: Modul3Profile, now: _dt.datetime) -> dict[str, Any]:
    """Zustand für Panel, Support-Dump und Warum?."""
    return {
        "enabled": profile.enabled,
        "quarter": quarter_of(now),
        "quarters": sorted(profile.quarters),
        "active": profile.active_in(now),
        "zone": zone_at(now, profile),
        "tariff_slots": profile.tariff_slots,
        "derived_slots": [
            {"start_h": s.start_h, "end_h": s.end_h, "class_": s.class_}
            for s in derived_tariff_slots(profile)
        ],
    }


def _parse_window(raw: Any) -> Modul3Window | None:
    if not isinstance(raw, Mapping):
        return None
    try:
        start = float(raw.get("start_h"))
        end = float(raw.get("end_h"))
    except (TypeError, ValueError):
        return None
    if not (0.0 <= start < 24.0 and 0.0 < end <= 24.0):
        return None
    if abs(start - end) < 1e-9:
        return None
    return Modul3Window(start_h=start, end_h=end)


def _parse_zone(raw: Any) -> Modul3Zone:
    if not isinstance(raw, Mapping):
        return Modul3Zone(price_ct_kwh=0.0)
    try:
        price = float(raw.get("price_ct_kwh", 0.0))
    except (TypeError, ValueError):
        price = 0.0
    if price != price or price < 0:
        price = 0.0
    windows: list[Modul3Window] = []
    raw_windows = raw.get("windows")
    if isinstance(raw_windows, list):
        for item in raw_windows:
            window = _parse_window(item)
            if window is not None:
                windows.append(window)
    return Modul3Zone(price_ct_kwh=price, windows=tuple(windows))


def empty_zones_dict() -> dict[str, dict[str, Any]]:
    return {
        ZONE_NT: {"price_ct_kwh": 0.0, "windows": [{"start_h": 0.0, "end_h": 5.0}]},
        ZONE_ST: {"price_ct_kwh": 0.0, "windows": []},
        ZONE_HT: {"price_ct_kwh": 0.0, "windows": [{"start_h": 17.0, "end_h": 21.0}]},
    }


def _parse_vat(options: Mapping[str, Any]) -> tuple[str, float]:
    """Return (vat choice, custom percent). Migrates legacy bool / AT·CH presets."""
    try:
        percent = float(options.get("modul3_vat_percent", 0.0) or 0.0)
    except (TypeError, ValueError):
        percent = 0.0
    if percent != percent or percent < 0:
        percent = 0.0
    if percent > 100:
        percent = 100.0
    raw = options.get("modul3_vat")
    if isinstance(raw, str) and raw in VAT_CHOICES:
        vat = raw
    elif isinstance(raw, str) and raw in _LEGACY_VAT_PERCENT:
        vat = VAT_CUSTOM
        if not percent:
            percent = _LEGACY_VAT_PERCENT[raw]
    elif options.get("modul3_apply_vat") is True:
        vat = VAT_DE
    else:
        vat = VAT_OFF
    return vat, percent


def parse_modul3_profile(options: Mapping[str, Any]) -> Modul3Profile:
    """Options-Dict → Profil. Unbekannte/leere Werte → aus / Defaults."""
    enabled = bool(options.get("modul3_enabled", False))
    add_to_curve = bool(options.get("modul3_add_to_curve", True))
    vat, vat_percent = _parse_vat(options)
    raw_zones = options.get("modul3_zones")
    zones: dict[str, Modul3Zone] = {}
    if isinstance(raw_zones, Mapping):
        for key in ZONES:
            zones[key] = _parse_zone(raw_zones.get(key))
    else:
        for key in ZONES:
            zones[key] = Modul3Zone(price_ct_kwh=0.0)
    return Modul3Profile(
        enabled=enabled,
        add_to_curve=add_to_curve,
        vat=vat,
        vat_percent=vat_percent,
        zones=zones,
        quarters=_parse_quarters(options.get("modul3_quarters")),
        tariff_slots=options.get("modul3_tariff_slots") is True,
    )


def _parse_quarters(raw: Any) -> frozenset[int]:
    """Gespeicherte Quartale. Fehlend oder unbrauchbar → alle vier (bisheriges Verhalten).

    Eine einzelne gültige Angabe wird übernommen statt aufgefüllt: weniger
    Quartale heißt weniger NT-Zeit, also nie zusätzliche Netzladung.
    """
    if not isinstance(raw, (list, tuple)):
        return ALL_QUARTERS
    quarters: set[int] = set()
    for item in raw:
        try:
            quarter = int(item)
        except (TypeError, ValueError):
            continue
        if quarter in ALL_QUARTERS:
            quarters.add(quarter)
    return frozenset(quarters) if quarters else ALL_QUARTERS


def normalize_modul3_vat_options(options: dict[str, Any]) -> dict[str, Any]:
    """Ensure cockpit always sees ``modul3_vat`` (migrates legacy bool)."""
    out = dict(options)
    vat, percent = _parse_vat(out)
    out["modul3_vat"] = vat
    out["modul3_vat_percent"] = percent
    out.pop("modul3_apply_vat", None)
    return out


def clean_modul3_zones(value: Any) -> tuple[dict[str, Any] | None, str | None]:
    """Validiert und normalisiert ``modul3_zones`` für panel_options."""
    if not isinstance(value, Mapping):
        return None, "modul3_zones"
    cleaned: dict[str, Any] = {}
    for key in ZONES:
        zone = _parse_zone(value.get(key))
        cleaned[key] = {
            "price_ct_kwh": round(zone.price_ct_kwh, 4),
            "windows": [
                {"start_h": round(w.start_h, 4), "end_h": round(w.end_h, 4)}
                for w in zone.windows
            ],
        }
    return cleaned, None


def clean_modul3_quarters(value: Any) -> tuple[list[int] | None, str | None]:
    """Validiert ``modul3_quarters``: Liste aus 1–4, mind. zwei, sortiert und dedupliziert.

    BNetzA: Modul 3 muss in mindestens zwei Quartalen eines Jahres gelten.
    Fehlende Option (nicht gesetzt) bedeutet später in ``parse_modul3_profile``
    alle vier Quartale; hier wird nur ein gelieferter Wert geprüft.
    """
    if not isinstance(value, list):
        return None, "modul3_quarters"
    cleaned: list[int] = []
    for item in value:
        try:
            quarter = int(item)
        except (TypeError, ValueError):
            return None, "modul3_quarters"
        if quarter not in (1, 2, 3, 4):
            return None, "modul3_quarters"
        if quarter not in cleaned:
            cleaned.append(quarter)
    cleaned.sort()
    if len(cleaned) < 2:
        return None, "modul3_quarters_min2"
    return cleaned, None


def _is_copied_slot(stored: Any, derived: Mapping[str, Any]) -> bool:
    """Gespeicherter Slot ist eine unveränderte Kopie aus „Slots füllen“."""
    if not isinstance(stored, Mapping):
        return False
    if stored.get("min_reserve_soc") is not None:
        return False
    try:
        weekdays = sorted(int(d) for d in stored.get("weekdays", []))
        start_h = float(stored["start_h"])
        end_h = float(stored["end_h"])
    except (KeyError, TypeError, ValueError):
        return False
    cls = stored.get("class_") or stored.get("class")
    return (
        weekdays == list(range(7))
        and cls == derived["class_"]
        and abs(start_h - derived["start_h"]) < 1e-6
        and abs(end_h - derived["end_h"]) < 1e-6
    )


def migrate_copied_modul3_slots(options: Mapping[str, Any]) -> dict[str, Any] | None:
    """Kopierte Modul-3-Slots durch Live-Slots ersetzen (Config-Entry v6).

    Greift nur, wenn Modul 3 an ist und **jeder** NT/HT-Slot genau einmal als
    unveränderte Kopie gespeichert ist. Dann sind alte und neue Konfiguration
    gleichwertig: Quartale stehen auf allen vier, die Live-Slots liegen vorn im
    Zeitplan wie die Kopien nach „Slots füllen“. Teilweise kopierte oder
    bearbeitete Slots bleiben unangetastet. ``None`` = nichts zu tun.
    """
    if not options.get("modul3_enabled"):
        return None
    if options.get("modul3_tariff_slots") is True:
        return None
    stored = options.get("tariff_slots")
    if not isinstance(stored, list) or not stored:
        return None
    profile = parse_modul3_profile(options)
    if profile.quarters != ALL_QUARTERS:
        return None
    derived = tariff_slots_from_modul3(profile)
    if not derived or len(stored) < len(derived):
        return None
    # "Fill" wrote NT then HT at the head of the list. Only that exact head
    # is migrated, so the live slots take the same place in the schedule and
    # overlapping slots resolve to the same winner as before.
    if not all(_is_copied_slot(stored[i], slot) for i, slot in enumerate(derived)):
        return None
    remaining = list(stored[len(derived):])
    out = dict(options)
    out[TARIFF_SLOTS_BACKUP_KEY] = list(stored)
    out["tariff_slots"] = remaining
    out["modul3_tariff_slots"] = True
    out[SLOTS_MIGRATED_KEY] = True
    return out
