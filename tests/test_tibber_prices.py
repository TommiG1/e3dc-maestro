"""Tibber-Antwort von get_prices → Preiskurve für den Preisplan."""
from __future__ import annotations

import datetime as dt

from custom_components.e3dc_maestro.price_curve import read_price_horizon
from custom_components.e3dc_maestro.tibber_prices import (
    is_tibber_electricity_price,
    price_slots_for_home,
)

TZ = dt.timezone(dt.timedelta(hours=2))
NOW = dt.datetime(2026, 10, 9, 18, 20, tzinfo=TZ)

RESPONSE = {
    "prices": {
        "Daheim": [
            {"start_time": "2026-10-09 18:00:00+02:00", "price": 0.31},
            {"start_time": "2026-10-09 18:15:00+02:00", "price": 0.35},
            {"start_time": "2026-10-09 18:30:00+02:00", "price": 0.40},
        ],
        "Ferienhaus": [
            {"start_time": "2026-10-09 18:15:00+02:00", "price": 0.99},
        ],
    }
}


def test_picks_home_by_nickname():
    slots = price_slots_for_home(RESPONSE, "daheim")
    horizon = read_price_horizon({"prices": slots}, NOW)
    assert horizon is not None
    assert horizon.prices[0] == 0.35


def test_single_home_without_nickname():
    response = {"prices": {"Daheim": RESPONSE["prices"]["Daheim"]}}
    slots = price_slots_for_home(response, None)
    assert slots is not None
    assert slots[0]["price"] == 0.31


def test_several_homes_without_nickname_are_not_guessed():
    assert price_slots_for_home(RESPONSE, None) is None
    assert price_slots_for_home(RESPONSE, "Unbekannt") is None


def test_only_the_electricity_price_sensor_qualifies():
    attrs = {"app_nickname": "Daheim", "max_price": 0.4}
    assert is_tibber_electricity_price("tibber", attrs)
    assert not is_tibber_electricity_price("template", attrs)
    assert not is_tibber_electricity_price("tibber", {"power": 100})
