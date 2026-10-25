"""§14a Modul 3 – zeitvariable Netzentgelte (NT / ST / HT).

Reine Logik ohne Home Assistant: Zone für einen Zeitpunkt, Schicht auf die
Preiskurve, optionale Tarif-Slots aus den Fenstern.
"""
from __future__ import annotations

import datetime as _dt
from dataclasses import dataclass, field
from typing import Any, Mapping

from .price_curve import PriceHorizon

ZONE_NT = "nt"
ZONE_ST = "st"
ZONE_HT = "ht"
ZONES = (ZONE_NT, ZONE_ST, ZONE_HT)

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
    """Aktive Zone: HT vor NT vor ST (Rest)."""
    if not profile.enabled:
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
    cursor = horizon.start
    prices: list[float] = []
    for hours, price in zip(horizon.slot_hours, horizon.prices):
        mid = cursor + _dt.timedelta(hours=hours / 2.0)
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
    )


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
