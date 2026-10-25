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

VAT_FACTOR = 1.19


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
    apply_vat: bool = False
    zones: Mapping[str, Modul3Zone] = field(default_factory=dict)

    def fee_eur(self, zone: str) -> float:
        z = self.zones.get(zone)
        if z is None:
            return 0.0
        eur = max(0.0, float(z.price_ct_kwh)) / 100.0
        return eur * VAT_FACTOR if self.apply_vat else eur


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


def parse_modul3_profile(options: Mapping[str, Any]) -> Modul3Profile:
    """Options-Dict → Profil. Unbekannte/leere Werte → aus / Defaults."""
    enabled = bool(options.get("modul3_enabled", False))
    add_to_curve = bool(options.get("modul3_add_to_curve", True))
    apply_vat = bool(options.get("modul3_apply_vat", False))
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
        apply_vat=apply_vat,
        zones=zones,
    )


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
