"""Octopus Energy (BottlecapDave) → Maestro-Preiskurve.

Die HACS-Integration legt die Halbstundenkurve auf Event-Entitäten:

* ``event.…_current_day_rates`` / ``…_next_day_rates`` – Attribut ``rates``
  mit ``start`` / ``end`` / ``value_inc_vat`` (€/kWh inkl. MwSt.)
* ``sensor.…_current_rate`` – nur der aktuelle Slot (State); Kurve über die
  Schwester-Events

Kein API-Aufruf: Entity-IDs auflösen und Attribute mergen für
``price_curve.read_price_horizon``.
"""
from __future__ import annotations

from typing import Any, Mapping

_OCTOPUS_MARK = "octopus_energy"
_CURRENT_DAY = "_current_day_rates"
_NEXT_DAY = "_next_day_rates"
_CURRENT_RATE = "_current_rate"


def is_octopus_price_entity(entity_id: str) -> bool:
    """True for BottlecapDave electricity/gas rate sensors or day-rate events."""
    if not isinstance(entity_id, str) or not entity_id:
        return False
    return _OCTOPUS_MARK in entity_id and (
        entity_id.endswith(_CURRENT_DAY)
        or entity_id.endswith(_NEXT_DAY)
        or entity_id.endswith(_CURRENT_RATE)
    )


def related_octopus_rate_entity_ids(entity_id: str) -> list[str]:
    """``current_day_rates`` + ``next_day_rates`` for the chosen Octopus entity.

    Empty when the entity is not an Octopus rate source. Missing siblings are
    still listed; the caller skips unavailable states.
    """
    if not is_octopus_price_entity(entity_id):
        return []

    if entity_id.startswith("event.") and entity_id.endswith(_CURRENT_DAY):
        base = entity_id[: -len(_CURRENT_DAY)]
        return [entity_id, base + _NEXT_DAY]
    if entity_id.startswith("event.") and entity_id.endswith(_NEXT_DAY):
        base = entity_id[: -len(_NEXT_DAY)]
        return [base + _CURRENT_DAY, entity_id]
    if entity_id.startswith("sensor.") and entity_id.endswith(_CURRENT_RATE):
        base = "event." + entity_id[len("sensor.") : -len(_CURRENT_RATE)]
        return [base + _CURRENT_DAY, base + _NEXT_DAY]
    return []


def merge_octopus_rate_attrs(*attr_maps: Mapping[str, Any]) -> dict[str, Any] | None:
    """Merge ``rates`` lists from day-rate events into one ``{\"rates\": […]}``.

    Returns ``None`` when no usable rates are found.
    """
    rates: list[Any] = []
    for attrs in attr_maps:
        raw = attrs.get("rates")
        if isinstance(raw, list) and raw:
            rates.extend(item for item in raw if isinstance(item, dict))
    if not rates:
        return None
    return {"rates": rates}
