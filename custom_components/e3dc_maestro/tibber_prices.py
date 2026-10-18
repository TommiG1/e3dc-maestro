"""Tibber-Preiskurve aus der Antwort von ``tibber.get_prices``.

Die offizielle Tibber-Integration legt nur den aktuellen Preis in den
Strompreis-Sensor. Die Stunden- bzw. Viertelstundenkurve kommt über die
Aktion und ist nach Wohnung benannt.
"""
from __future__ import annotations

from typing import Any, Mapping

_TIBBER_PLATFORM = "tibber"


def _norm(value: str) -> str:
    return " ".join(value.casefold().split())


def is_tibber_electricity_price(platform: str | None, attributes: Mapping[str, Any]) -> bool:
    """Der Strompreis-Sensor der Tibber-Integration, nicht Verbrauch oder Kosten."""
    return platform == _TIBBER_PLATFORM and "app_nickname" in attributes and "max_price" in attributes


def price_slots_for_home(response: Any, nickname: str | None) -> list[dict] | None:
    """Liste ``{start_time, price}`` der passenden Wohnung, sonst ``None``.

    Eine einzelne Wohnung wird auch ohne Spitznamen genommen. Bei mehreren
    Wohnungen muss ``nickname`` (Attribut ``app_nickname``) passen.
    """
    if not isinstance(response, dict):
        return None
    homes = response.get("prices")
    if not isinstance(homes, dict) or not homes:
        return None

    chosen: Any = None
    if isinstance(nickname, str) and nickname.strip():
        wanted = _norm(nickname)
        for key, slots in homes.items():
            if isinstance(key, str) and _norm(key) == wanted:
                chosen = slots
                break
    if chosen is None and len(homes) == 1:
        chosen = next(iter(homes.values()))
    if not isinstance(chosen, list) or not chosen or not isinstance(chosen[0], dict):
        return None
    return chosen
