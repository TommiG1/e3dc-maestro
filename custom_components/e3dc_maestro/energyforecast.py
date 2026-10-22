"""Energyforecast.de: Preiskurve hinter dem letzten echten Tarifpreis anhängen.

Pure Python (no Home Assistant imports) so it can be unit-tested.
API v2 liefert Viertelstunden mit ``total_ct_kwh`` (Endkundenpreis inkl.
Netzentgelt/Steuern laut Profil) und ``price_ct_kwh`` (Börse).
"""
from __future__ import annotations

import datetime as _dt
from typing import Any

from .price_curve import PriceHorizon, PriceSlot, build_horizon

API_URL = "https://www.energyforecast.de/api/v2/forecast"
DEFAULT_MARKET_ZONE = "DE-LU"
MARKET_ZONES = (
    "DE-LU",
    "AT",
    "FR",
    "NL",
    "BE",
    "PL",
    "DK1",
    "DK2",
    "CH",
    "CZ",
    "HU",
    "SI",
)
# Freie Pläne decken 2 Tage; Pro bis 6 – genug Spielraum hinter Tibber.
MAX_HORIZON_HOURS = 96.0
_GAP_TOLERANCE_S = 90.0


def slots_from_payload(payload: Any) -> list[PriceSlot]:
    """API-Antwort → Preis-Slots in €/kWh (``total_ct_kwh`` bevorzugt)."""
    if not isinstance(payload, dict):
        return []
    rows = payload.get("data")
    if not isinstance(rows, list):
        return []
    slots: list[PriceSlot] = []
    for row in rows:
        if not isinstance(row, dict):
            continue
        start = _parse_dt(row.get("start"))
        end = _parse_dt(row.get("end"))
        price = _price_eur(row)
        if start is None or price is None:
            continue
        if end is None or end <= start:
            end = start + _dt.timedelta(minutes=15)
        slots.append(PriceSlot(start=start, end=end, price=price))
    slots.sort(key=lambda s: s.start)
    return slots


def extend_horizon(
    horizon: PriceHorizon | None,
    forecast: list[PriceSlot],
    now: _dt.datetime,
) -> tuple[PriceHorizon | None, _dt.datetime | None]:
    """Hängt Forecast-Slots nur hinter ``known_until`` an.

    Überlappende Forecast-Slots werden verworfen – Tibber/aWATTar gewinnen.
    Rückgabe: (erweiterter Horizont, ``provider_until`` oder ``None`` wenn nichts
    angehängt wurde).
    """
    if horizon is None:
        return None, None
    if not forecast:
        return horizon, None

    provider_until = horizon.known_until
    extras: list[PriceSlot] = []
    cursor = provider_until
    for slot in forecast:
        if slot.end <= cursor:
            continue
        start = max(slot.start, cursor)
        if abs((start - cursor).total_seconds()) > _GAP_TOLERANCE_S:
            break
        if start >= slot.end:
            continue
        extras.append(PriceSlot(start=start, end=slot.end, price=slot.price))
        cursor = slot.end

    if not extras:
        return horizon, None

    combined = _horizon_to_slots(horizon) + extras
    extended = build_horizon(combined, now, max_hours=MAX_HORIZON_HOURS)
    if extended is None:
        return horizon, None
    return extended, provider_until


def _horizon_to_slots(horizon: PriceHorizon) -> list[PriceSlot]:
    slots: list[PriceSlot] = []
    cursor = horizon.start
    for hours, price in zip(horizon.slot_hours, horizon.prices):
        end = cursor + _dt.timedelta(hours=hours)
        slots.append(PriceSlot(start=cursor, end=end, price=price))
        cursor = end
    return slots


def _price_eur(row: dict[str, Any]) -> float | None:
    total = row.get("total_ct_kwh")
    if total is None:
        total = row.get("price_ct_kwh")
    try:
        cents = float(total)
    except (TypeError, ValueError):
        return None
    if cents != cents:  # NaN
        return None
    return cents / 100.0


def _parse_dt(value: Any) -> _dt.datetime | None:
    if isinstance(value, _dt.datetime):
        ts = value
    elif isinstance(value, str):
        text = value.strip().replace("Z", "+00:00")
        try:
            ts = _dt.datetime.fromisoformat(text)
        except ValueError:
            return None
    else:
        return None
    if ts.tzinfo is None:
        ts = ts.replace(tzinfo=_dt.timezone.utc)
    return ts
