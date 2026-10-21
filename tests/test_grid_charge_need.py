"""Bedarf bis zum nächsten günstigen Fenster (Issue #26)."""
from __future__ import annotations

import datetime as dt

import pytest

from custom_components.e3dc_maestro.control_tariff import (
    TARIFF_LOW,
    TariffSchedule,
    TariffSlot,
)
from custom_components.e3dc_maestro.grid_charge_need import (
    bridge_need_kwh,
    bridge_window,
    horizon_price_fn,
    load_fn,
    low_fn,
    need_fn,
    pv_fn,
)
from custom_components.e3dc_maestro.price_curve import read_price_horizon
from custom_components.e3dc_maestro.price_plan_runner import PV_HISTORIC_FACTOR, PV_SAFETY_FACTOR

TZ = dt.timezone(dt.timedelta(hours=2))
ALL_DAYS = frozenset(range(7))
# Teimue-Tarif: günstig 02–06 und 12–15 Uhr.
SCHEDULE = TariffSchedule(slots=[
    TariffSlot(weekdays=ALL_DAYS, start_h=2, end_h=6, class_=TARIFF_LOW),
    TariffSlot(weekdays=ALL_DAYS, start_h=12, end_h=15, class_=TARIFF_LOW),
])
IS_LOW = low_fn(SCHEDULE, None)


def _at(day, hour, minute=0):
    return dt.datetime(2026, 10, day, hour, minute, tzinfo=TZ)


def _const(w):
    return lambda _t: float(w)


class TestWindow:
    def test_night_slot_bridges_to_midday_slot(self):
        assert bridge_window(_at(21, 2, 7), IS_LOW) == (_at(21, 6), _at(21, 12))

    def test_midday_slot_bridges_over_midnight(self):
        assert bridge_window(_at(21, 12), IS_LOW) == (_at(21, 15), _at(22, 2))

    def test_outside_slot_starts_now(self):
        assert bridge_window(_at(21, 8, 20), IS_LOW) == (_at(21, 8, 15), _at(21, 12))

    def test_no_next_window_caps_at_one_day(self):
        never = low_fn(TariffSchedule(slots=[]), None)
        start, end = bridge_window(_at(21, 8), never)
        assert end - start == dt.timedelta(hours=24)

    def test_slot_over_midnight(self):
        night = low_fn(TariffSchedule(slots=[
            TariffSlot(weekdays=ALL_DAYS, start_h=22, end_h=6, class_=TARIFF_LOW),
        ]), None)
        assert bridge_window(_at(21, 23), night) == (_at(22, 6), _at(22, 22))
        assert bridge_window(_at(22, 1), night) == (_at(22, 6), _at(22, 22))


class TestNeed:
    def test_constant_load_without_pv(self):
        # 06–12 Uhr bei 1 kW → 6 kWh.
        need = bridge_need_kwh(_at(21, 2), is_low=IS_LOW, load_w=_const(1000), pv_w=_const(0))
        assert need == pytest.approx(6.0)

    def test_afternoon_surplus_reduces_evening_need(self):
        # Fenster 15–02: 2 kW Überschuss 15–18 Uhr, danach 1 kW Defizit (8 kWh).
        def pv(t):
            return 3000.0 if 15 <= t.hour < 18 else 0.0
        need = bridge_need_kwh(_at(21, 12), is_low=IS_LOW, load_w=_const(1000), pv_w=pv)
        assert need == pytest.approx(2.0)

    def test_surplus_before_deficit_is_not_counted_twice(self):
        # Morgens Defizit, mittags Überschuss: Bedarf = Morgendefizit.
        def pv(t):
            return 0.0 if t.hour < 9 else 5000.0
        need = bridge_need_kwh(_at(21, 2), is_low=IS_LOW, load_w=_const(1000), pv_w=pv)
        assert need == pytest.approx(3.0)

    def test_sunny_afternoon_needs_nothing_for_daytime(self):
        need = bridge_need_kwh(_at(21, 2), is_low=IS_LOW, load_w=_const(500), pv_w=_const(2000))
        assert need == 0.0

    def test_need_fn_caches_per_window(self):
        calls = []

        def load(t):
            calls.append(t)
            return 1000.0
        fn = need_fn(IS_LOW, load, _const(0))
        first = fn(_at(21, 2))
        count = len(calls)
        assert fn(_at(21, 4, 30)) == first
        assert len(calls) == count


class TestIssue26:
    """Live-Ziel folgt nicht mehr dem Kalender-Morgen."""

    def _pv(self):
        # 21.10. schwach, 22.10. sonnig (Profile in UTC-Stunden).
        weak = [0.0] * 6 + [300.0] * 10 + [0.0] * 8
        sunny = [0.0] * 6 + [4000.0] * 10 + [0.0] * 8
        return pv_fn(dt.date(2026, 10, 21), weak, sunny, None)

    def test_night_slot_on_weak_day_charges(self):
        load = load_fn(None, [800.0] * 24, 1.0)
        need = bridge_need_kwh(_at(21, 2), is_low=IS_LOW, load_w=load, pv_w=self._pv())
        assert need > 3.0

    def test_midday_slot_on_weak_day_covers_evening_and_night(self):
        load = load_fn(None, [800.0] * 24, 1.0)
        need = bridge_need_kwh(_at(21, 12), is_low=IS_LOW, load_w=load, pv_w=self._pv())
        assert need > 7.0


class TestProfiles:
    def test_load_uses_weekday_profile_by_utc_weekday(self):
        weekday = [[0.0] * 24 for _ in range(7)]
        weekday[2] = [900.0] * 24  # Mittwoch UTC
        load = load_fn(weekday, [100.0] * 24, 1.0)
        assert load(_at(21, 12)) == 900.0  # 21.10.2026 ist ein Mittwoch
        assert load(_at(22, 12)) == 100.0  # Donnerstag ohne Profil → 24-h-Mittel

    def test_load_applies_safety_factor(self):
        assert load_fn(None, [1000.0] * 24, 1.2)(_at(21, 12)) == pytest.approx(1200.0)

    def test_load_none_without_profiles(self):
        assert load_fn(None, None, 1.0) is None
        assert load_fn([[0.0] * 24] * 7, [0.0] * 24, 1.0) is None

    def test_pv_today_tomorrow_and_history(self):
        pv = pv_fn(dt.date(2026, 10, 21), [1000.0] * 24, [2000.0] * 24, [500.0] * 24)
        assert pv(_at(21, 12)) == pytest.approx(1000.0 * PV_SAFETY_FACTOR)
        assert pv(_at(22, 12)) == pytest.approx(2000.0 * PV_SAFETY_FACTOR)
        assert pv(_at(23, 12)) == pytest.approx(500.0 * PV_SAFETY_FACTOR * PV_HISTORIC_FACTOR)

    def test_pv_without_any_profile_is_zero(self):
        assert pv_fn(dt.date(2026, 10, 21), None, None, None)(_at(21, 12)) == 0.0


class TestPriceThreshold:
    def test_low_from_price_curve(self):
        base = dt.datetime(2026, 10, 21, tzinfo=TZ)
        prices = [0.30] * 24
        prices[13] = prices[14] = 0.10
        raw = [
            {"start": (base + dt.timedelta(hours=h)).isoformat(),
             "end": (base + dt.timedelta(hours=h + 1)).isoformat(), "value": p}
            for h, p in enumerate(prices)
        ]
        price_at = horizon_price_fn(read_price_horizon({"raw_today": raw}, _at(21, 8)))
        is_low = low_fn(TariffSchedule(slots=[], cheap_threshold=0.15), price_at)
        assert bridge_window(_at(21, 8), is_low) == (_at(21, 8), _at(21, 13))
        assert bridge_window(_at(21, 13), is_low)[0] == _at(21, 15)

    def test_no_curve_gives_no_price(self):
        assert horizon_price_fn(None) is None


class TestCoordinatorWiring:
    """Der Koordinator baut die Bedarfsfunktion aus Profilen und Slot-Plan."""

    def _fake(self, **params):
        from types import SimpleNamespace

        from custom_components.e3dc_maestro.control_engine import MaestroParams
        from custom_components.e3dc_maestro.coordinator_forecast import CoordinatorForecastMixin

        class _Fake(CoordinatorForecastMixin):
            def _read_pv_forecast_profile(self, now, days_ahead=0, ignore_enabled=False):
                return None

        f = _Fake()
        p = MaestroParams(
            low_slot_grid_charge_enabled=True,
            low_slot_forecast_based=True,
            price_plan_safety_factor=1.0,
            tariff_schedule=SCHEDULE,
        )
        for key, value in params.items():
            setattr(p, key, value)
        f._active_params = p
        f._consumption_stats = SimpleNamespace(
            weekday_profile_w=[[0.0] * 24 for _ in range(7)], hourly_profile_w=[1000.0] * 24,
        )
        f._pv_stats = None
        return f

    def test_need_from_profiles(self):
        fn = self._fake()._bridge_need_fn(_at(21, 2), None)
        assert fn is not None
        assert fn(_at(21, 2)) == pytest.approx(6.0)

    def test_off_without_forecast_option(self):
        assert self._fake(low_slot_forecast_based=False)._bridge_need_fn(_at(21, 2), None) is None

    def test_off_without_consumption_profile(self):
        f = self._fake()
        f._consumption_stats = None
        assert f._bridge_need_fn(_at(21, 2), None) is None
