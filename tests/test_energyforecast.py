"""Tests für Energyforecast-Parsing und Horizont-Erweiterung."""
from __future__ import annotations

import datetime as dt

from custom_components.e3dc_maestro.energyforecast import (
    extend_horizon,
    slots_from_payload,
)
from custom_components.e3dc_maestro.price_curve import PriceSlot, build_horizon

TZ = dt.timezone(dt.timedelta(hours=2))
NOW = dt.datetime(2026, 10, 22, 12, 0, tzinfo=TZ)


def _slot(hour: int, price: float, day: int = 22) -> PriceSlot:
    start = dt.datetime(2026, 10, day, hour, tzinfo=TZ)
    return PriceSlot(start=start, end=start + dt.timedelta(hours=1), price=price)


class TestSlotsFromPayload:
    def test_total_ct_preferred(self):
        payload = {
            "data": [
                {
                    "start": "2026-10-22T23:00:00+02:00",
                    "end": "2026-10-22T23:15:00+02:00",
                    "price_ct_kwh": 10.0,
                    "total_ct_kwh": 27.5,
                }
            ]
        }
        slots = slots_from_payload(payload)
        assert len(slots) == 1
        assert slots[0].price == 0.275
        assert slots[0].hours == 0.25

    def test_falls_back_to_exchange_price(self):
        payload = {
            "data": [
                {
                    "start": "2026-10-22T23:00:00+02:00",
                    "end": "2026-10-22T23:15:00+02:00",
                    "price_ct_kwh": 12.0,
                }
            ]
        }
        assert slots_from_payload(payload)[0].price == 0.12

    def test_garbage_ignored(self):
        assert slots_from_payload(None) == []
        assert slots_from_payload({}) == []
        assert slots_from_payload({"data": [{"start": "bad"}]}) == []


class TestExtendHorizon:
    def test_appends_after_provider(self):
        provider = [_slot(h, 0.30) for h in range(12, 24)]
        horizon = build_horizon(provider, NOW)
        assert horizon is not None
        assert horizon.known_until.hour == 0 or horizon.known_until.day == 23

        forecast = [_slot(h, 0.40, day=23) for h in range(0, 8)]
        extended, seam = extend_horizon(horizon, forecast, NOW)
        assert seam == horizon.known_until
        assert extended is not None
        assert extended.known_until > horizon.known_until
        # Erste Forecast-Stunde: Preis 0.40
        assert abs(extended.prices[-1] - 0.40) < 1e-9

    def test_provider_wins_on_overlap(self):
        provider = [_slot(h, 0.30) for h in range(12, 24)]
        horizon = build_horizon(provider, NOW)
        assert horizon is not None
        # Forecast startet schon um 20 Uhr mit anderem Preis → wird abgeschnitten
        forecast = [_slot(h, 0.99) for h in range(20, 24)] + [
            _slot(h, 0.45, day=23) for h in range(0, 4)
        ]
        extended, seam = extend_horizon(horizon, forecast, NOW)
        assert seam == horizon.known_until
        assert extended is not None
        n_provider = len(horizon.prices)
        assert all(abs(p - 0.30) < 1e-9 for p in extended.prices[:n_provider])
        assert any(abs(p - 0.45) < 1e-9 for p in extended.prices[n_provider:])

    def test_gap_stops_extension(self):
        provider = [_slot(h, 0.30) for h in range(12, 24)]
        horizon = build_horizon(provider, NOW)
        # Lücke: Forecast erst ab 02:00
        forecast = [_slot(h, 0.40, day=23) for h in range(2, 8)]
        extended, seam = extend_horizon(horizon, forecast, NOW)
        assert seam is None
        assert extended is horizon

    def test_empty_forecast(self):
        provider = [_slot(h, 0.30) for h in range(12, 18)]
        horizon = build_horizon(provider, NOW)
        extended, seam = extend_horizon(horizon, [], NOW)
        assert seam is None
        assert extended is horizon
