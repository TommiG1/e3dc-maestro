"""Octopus Energy day-rate attributes → Maestro-Preiskurve."""
from __future__ import annotations

import datetime as dt

from custom_components.e3dc_maestro.octopus_prices import (
    is_octopus_price_entity,
    merge_octopus_rate_attrs,
    related_octopus_rate_entity_ids,
)
from custom_components.e3dc_maestro.price_curve import price_at, read_price_horizon

TZ = dt.timezone(dt.timedelta(hours=1))
NOW = dt.datetime(2026, 10, 29, 18, 20, tzinfo=TZ)

CURRENT_EVENT = "event.octopus_energy_electricity_ABC_123_current_day_rates"
NEXT_EVENT = "event.octopus_energy_electricity_ABC_123_next_day_rates"
CURRENT_SENSOR = "sensor.octopus_energy_electricity_ABC_123_current_rate"


def _slot(day: int, hour: int, minute: int, price: float, hours: float = 0.5) -> dict:
    start = dt.datetime(2026, 10, day, hour, minute, tzinfo=TZ)
    end = start + dt.timedelta(hours=hours)
    return {
        "start": start.isoformat(),
        "end": end.isoformat(),
        "value_inc_vat": price,
        "is_capped": False,
    }


def test_related_ids_from_current_day_event():
    assert related_octopus_rate_entity_ids(CURRENT_EVENT) == [CURRENT_EVENT, NEXT_EVENT]


def test_related_ids_from_current_rate_sensor():
    assert related_octopus_rate_entity_ids(CURRENT_SENSOR) == [CURRENT_EVENT, NEXT_EVENT]


def test_related_ids_ignore_foreign_entities():
    assert related_octopus_rate_entity_ids("sensor.tibber_price") == []
    assert not is_octopus_price_entity("sensor.tibber_price")


def test_merge_current_and_next_day_rates():
    today = [_slot(29, h, m, 0.20 + h * 0.01) for h in range(18, 24) for m in (0, 30)]
    tomorrow = [_slot(30, h, m, 0.10) for h in range(0, 4) for m in (0, 30)]
    merged = merge_octopus_rate_attrs({"rates": today}, {"rates": tomorrow})
    assert merged is not None
    horizon = read_price_horizon(merged, NOW)
    assert horizon is not None
    assert abs(horizon.prices[0] - 0.38) < 1e-9  # 18:00–18:30 → 0.20 + 18×0.01
    assert abs(horizon.slot_hours[0] - 10 / 60) < 1e-9  # truncated from 18:20
    # Contiguous into tomorrow (last slot 03:30–04:00)
    assert horizon.known_until == dt.datetime(2026, 10, 30, 4, 0, tzinfo=TZ)


def test_price_at_from_rates():
    attrs = {
        "rates": [
            _slot(29, 18, 0, 0.31),
            _slot(29, 18, 30, 0.28),
        ]
    }
    assert price_at(attrs, NOW) == 0.31
    assert price_at(attrs, dt.datetime(2026, 10, 29, 18, 35, tzinfo=TZ)) == 0.28


def test_rates_without_merge_helper():
    """Generic parser accepts ``rates`` + ``value_inc_vat`` directly."""
    attrs = {"rates": [_slot(29, 18, 0, 0.22), _slot(29, 18, 30, 0.19)]}
    horizon = read_price_horizon(attrs, NOW)
    assert horizon is not None
    assert horizon.prices[0] == 0.22
