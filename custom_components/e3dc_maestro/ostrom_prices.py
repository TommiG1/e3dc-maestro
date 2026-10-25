"""Ostrom-Preiskurve → Maestro-Format (€/kWh, Liste mit ``start``/``price``).

Zwei gängige HACS-Integrationen (Domain ``ostrom``) liefern Kurven, die der
generische Parser nicht 1:1 liest:

* **melmager/ha_ostrom** – Attribut ``data``: ``[{date, price}, …]`` mit Preis in Cent
* **oliverwehrens/…** – Attribut ``prices``: ``{ISO-Zeit: €/kWh, …}``

Kein API-Aufruf: nur Attribut-Normalisierung für ``price_curve.read_price_horizon``.
"""
from __future__ import annotations

from typing import Any, Mapping


def _to_float(value: Any) -> float | None:
    if isinstance(value, bool):
        return None
    try:
        out = float(value)
    except (TypeError, ValueError):
        return None
    return out if out == out else None


def _looks_like_cent(values: list[float]) -> bool:
    """Spot in €/kWh liegt selten dauerhaft über 2; Cent-Werte typisch 5–80."""
    if not values:
        return False
    return sum(1 for v in values if v > 2.0) >= max(1, len(values) // 2)


def _from_data_list(raw: list[Any]) -> list[dict[str, Any]] | None:
    """melmager: ``data`` mit ``date`` + ``price`` (API: Cent/kWh)."""
    if not raw or not isinstance(raw[0], dict):
        return None
    sample = raw[0]
    if "date" not in sample or "price" not in sample:
        return None
    # Schon Maestro-kompatibel (start/startsAt + €) → nicht anfassen.
    if any(k in sample for k in ("start", "startsAt", "start_time", "datetime")):
        return None

    parsed: list[tuple[Any, float]] = []
    for item in raw:
        if not isinstance(item, dict):
            continue
        start = item.get("date")
        price = _to_float(item.get("price"))
        if start is None or price is None:
            continue
        parsed.append((start, price))
    if not parsed:
        return None

    # Ostrom-Spot-API liefert Cent; Heuristik falls ein Sensor schon € speichert.
    as_cent = _looks_like_cent([p for _, p in parsed])
    return [
        {"start": start, "price": (price / 100.0 if as_cent else price)}
        for start, price in parsed
    ]


def _from_prices_dict(raw: Mapping[str, Any]) -> list[dict[str, Any]] | None:
    """oliverwehrens: ``prices`` als Dict ISO-Zeit → €/kWh."""
    if not raw:
        return None
    # Liste von Dicts ist schon price_curve-tauglich.
    if isinstance(raw, list):
        return None
    if not isinstance(raw, Mapping):
        return None

    slots: list[dict[str, Any]] = []
    for key, value in raw.items():
        if not isinstance(key, str):
            continue
        price = _to_float(value)
        if price is None:
            continue
        slots.append({"start": key, "price": price})
    return slots or None


def normalize_ostrom_curve_attrs(attributes: Mapping[str, Any]) -> dict[str, Any] | None:
    """Liefert ``{\"prices\": […]}`` in €/kWh oder ``None``, wenn kein Ostrom-Format."""
    data = attributes.get("data")
    if isinstance(data, list):
        slots = _from_data_list(data)
        if slots:
            return {"prices": slots}

    prices = attributes.get("prices")
    if isinstance(prices, Mapping):
        slots = _from_prices_dict(prices)
        if slots:
            return {"prices": slots}

    return None
