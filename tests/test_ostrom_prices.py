"""Ostrom-Attributformen → Maestro-Preiskurve (€/kWh)."""
from __future__ import annotations

import datetime as dt

from custom_components.e3dc_maestro.ostrom_prices import normalize_ostrom_curve_attrs
from custom_components.e3dc_maestro.price_curve import read_price_horizon

TZ = dt.timezone(dt.timedelta(hours=2))
NOW = dt.datetime(2026, 10, 9, 18, 20, tzinfo=TZ)


def test_melmager_data_list_cent_to_eur():
    attrs = {
        "data": [
            {"date": "2026-10-09T18:00:00+02:00", "price": 31.0},
            {"date": "2026-10-09T19:00:00+02:00", "price": 35.0},
            {"date": "2026-10-09T20:00:00+02:00", "price": 28.5},
        ],
        "average": 31.5,
        "low": {"price": 28.5, "date": "2026-10-09T20:00:00+02:00"},
    }
    normalized = normalize_ostrom_curve_attrs(attrs)
    assert normalized is not None
    horizon = read_price_horizon(normalized, NOW)
    assert horizon is not None
    assert horizon.prices[0] == 0.31
    assert abs(horizon.prices[1] - 0.35) < 1e-9


def test_melmager_leaves_eur_data_alone_when_below_heuristic():
    """Falls ein Sensor schon €/kWh in data.date speichert (Werte ≤ 2)."""
    attrs = {
        "data": [
            {"date": "2026-10-09T18:00:00+02:00", "price": 0.31},
            {"date": "2026-10-09T19:00:00+02:00", "price": 0.35},
        ],
    }
    normalized = normalize_ostrom_curve_attrs(attrs)
    assert normalized is not None
    assert normalized["prices"][0]["price"] == 0.31


def test_oliverwehrens_prices_dict():
    attrs = {
        "average_price": 0.30,
        "min_price": 0.28,
        "max_price": 0.40,
        "prices": {
            "2026-10-09T18:00:00+02:00": 0.31,
            "2026-10-09T19:00:00+02:00": 0.35,
            "2026-10-09T20:00:00+02:00": 0.28,
        },
    }
    normalized = normalize_ostrom_curve_attrs(attrs)
    assert normalized is not None
    horizon = read_price_horizon(normalized, NOW)
    assert horizon is not None
    assert horizon.prices[0] == 0.31
    assert horizon.prices[1] == 0.35


def test_generic_list_prices_are_not_rewritten():
    """Tibber-/Nordpool-Listen mit start bleiben dem generischen Parser überlassen."""
    attrs = {
        "prices": [
            {"start_time": "2026-10-09T18:00:00+02:00", "price": 0.31},
        ],
    }
    assert normalize_ostrom_curve_attrs(attrs) is None


def test_data_with_start_key_is_not_ostrom():
    attrs = {
        "data": [
            {"start": "2026-10-09T18:00:00+02:00", "price": 0.31},
        ],
    }
    assert normalize_ostrom_curve_attrs(attrs) is None


def test_empty_and_garbage():
    assert normalize_ostrom_curve_attrs({}) is None
    assert normalize_ostrom_curve_attrs({"data": "x"}) is None
    assert normalize_ostrom_curve_attrs({"prices": {}}) is None
    assert normalize_ostrom_curve_attrs({"data": [{"date": "bad"}]}) is None
