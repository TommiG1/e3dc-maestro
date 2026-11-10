"""Midnight PV hold and wallbox jump guards."""
from __future__ import annotations

from datetime import datetime, timedelta, timezone

import pytest

from custom_components.e3dc_maestro.coordinator import E3DCMaestroCoordinator
from custom_components.e3dc_maestro.energy_day_guard import (
    PV_NATIVE_RESET_GRACE,
    WALLBOX_ENERGY_JUMP_KWH,
    clamp_wallbox_today_kwh,
    pv_main_has_reset,
)


def test_pv_main_has_reset_when_no_yesterday():
    assert pv_main_has_reset(None, None) is True
    assert pv_main_has_reset(0.0, 0.0) is True
    assert pv_main_has_reset(1.2, 0.0) is True


def test_pv_main_has_reset_waits_for_drop():
    assert pv_main_has_reset(4.144, 4.144) is False
    assert pv_main_has_reset(4.100, 4.144) is False  # within eps
    assert pv_main_has_reset(0.0, 4.144) is True
    assert pv_main_has_reset(1.0, 4.144) is True
    assert pv_main_has_reset(None, 4.144) is False


def test_clamp_wallbox_rejects_impossible_jump():
    assert clamp_wallbox_today_kwh(12.0, 12.5) == 12.5
    assert clamp_wallbox_today_kwh(12.0, 12.0 + WALLBOX_ENERGY_JUMP_KWH + 1) == 12.0
    assert clamp_wallbox_today_kwh(0.0, 80.0) == 80.0  # first reading of the day OK
    assert clamp_wallbox_today_kwh(12.0, 3147.0) == 12.0


def _coord() -> E3DCMaestroCoordinator:
    c = object.__new__(E3DCMaestroCoordinator)
    c._pv_hold_deadline = None
    c._pv_main_end_kwh = None
    c._pv_main_last_kwh = None
    return c


def test_should_hold_until_main_resets():
    c = _coord()
    now = datetime(2026, 11, 9, 0, 0, 10, tzinfo=timezone.utc)
    c._pv_main_end_kwh = 4.144
    c._pv_hold_deadline = now + PV_NATIVE_RESET_GRACE

    assert c._should_hold_pv_zero(now, 4.144) is True
    assert c._pv_hold_deadline is not None

    assert c._should_hold_pv_zero(now + timedelta(seconds=50), 0.0) is False
    assert c._pv_hold_deadline is None
    assert c._pv_main_end_kwh is None


def test_should_hold_times_out():
    c = _coord()
    now = datetime(2026, 11, 9, 0, 0, 0, tzinfo=timezone.utc)
    c._pv_main_end_kwh = 4.144
    c._pv_hold_deadline = now + PV_NATIVE_RESET_GRACE

    assert c._should_hold_pv_zero(now + PV_NATIVE_RESET_GRACE, 4.144) is False
    assert c._pv_hold_deadline is None


def test_should_not_hold_without_deadline():
    c = _coord()
    now = datetime(2026, 11, 9, 12, 0, 0, tzinfo=timezone.utc)
    assert c._should_hold_pv_zero(now, 10.0) is False


def test_midnight_arms_hold_from_last_main():
    c = _coord()
    c.stats = {"pv_production_today_kwh": 5.857}
    c._additional_bases = {"sensor.x": 1.0}
    c._wallbox_energy_last_power = 100.0
    c._wallbox_energy_power_changed_at = datetime.now(timezone.utc)
    c._pv_main_last_kwh = 4.144
    c._last_stats_date = "2026-11-08"
    c._watchdog_notified = True
    c._stats_dirty = False

    now = datetime(2026, 11, 9, 0, 0, 8, tzinfo=timezone.utc)
    c._reset_daily_stats(now, "2026-11-09")

    assert c._pv_main_end_kwh == 4.144
    assert c._pv_hold_deadline == now + PV_NATIVE_RESET_GRACE
    assert c._should_hold_pv_zero(now, 4.144) is True
    assert c.stats["pv_production_today_kwh"] == 0.0
    assert c._additional_bases == {}


def test_midnight_skips_hold_when_yesterday_was_zero():
    c = _coord()
    c.stats = {"pv_production_today_kwh": 0.0}
    c._additional_bases = {}
    c._wallbox_energy_last_power = None
    c._wallbox_energy_power_changed_at = None
    c._pv_main_last_kwh = 0.0
    c._last_stats_date = "2026-11-08"

    now = datetime(2026, 11, 9, 0, 0, 8, tzinfo=timezone.utc)
    c._reset_daily_stats(now, "2026-11-09")

    assert c._pv_hold_deadline is None
    assert c._should_hold_pv_zero(now, 0.0) is False


def test_ha_sequence_with_hold_matches_real_day():
    """Reproduce 8→9 Nov: without hold HA would add yesterday's main again."""
    def ha_sum(states: list[float]) -> float:
        total = 0.0
        last: float | None = None
        for value in states:
            if last is None:
                last = value
                continue
            total += value if value < last else value - last
            last = value
        return total

    main_end, extra = 4.144, 1.713
    evening = main_end + extra
    # Without hold: evening → main_end → 0 → day
    assert ha_sum([evening, main_end, 0.0, 3.184]) == pytest.approx(7.328)
    # With hold: evening → 0 → 0 → day
    assert ha_sum([evening, 0.0, 0.0, 3.184]) == pytest.approx(3.184)
