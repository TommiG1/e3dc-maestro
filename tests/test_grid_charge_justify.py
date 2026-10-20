"""Justified vs unjustified grid→battery attribution."""
from __future__ import annotations

from custom_components.e3dc_maestro.const import (
    PHASE_CORRIDOR,
    PHASE_EMERGENCY,
    PHASE_RESERVE_PROTECTION,
    TARIFF_MODE_DYNAMIC,
    TARIFF_MODE_FIXED,
)
from custom_components.e3dc_maestro.grid_charge_justify import (
    grid_to_battery_charge_attrs,
    is_unjustified_grid_charge,
    unjustified_grid_charge_kwh,
)


def test_unjustified_kwh_is_remainder() -> None:
    assert unjustified_grid_charge_kwh(total_kwh=5.0, justified_kwh=3.2) == 1.8
    assert unjustified_grid_charge_kwh(total_kwh=2.0, justified_kwh=3.0) == 0.0


def test_reserve_phase_never_alarms() -> None:
    assert not is_unjustified_grid_charge(
        tariff_mode=TARIFF_MODE_FIXED,
        total_kwh=4.0,
        justified_kwh=0.0,
        last_phase=PHASE_RESERVE_PROTECTION,
    )


def test_emergency_phase_never_alarms() -> None:
    assert not is_unjustified_grid_charge(
        tariff_mode=TARIFF_MODE_FIXED,
        total_kwh=4.0,
        justified_kwh=0.0,
        last_phase=PHASE_EMERGENCY,
    )


def test_fully_justified_day_ok() -> None:
    assert not is_unjustified_grid_charge(
        tariff_mode=TARIFF_MODE_FIXED,
        total_kwh=3.0,
        justified_kwh=3.0,
        last_phase=PHASE_CORRIDOR,
    )


def test_leftover_on_fixed_tariff_alarms() -> None:
    assert is_unjustified_grid_charge(
        tariff_mode=TARIFF_MODE_FIXED,
        total_kwh=3.0,
        justified_kwh=1.0,
        last_phase=PHASE_CORRIDOR,
    )


def test_dynamic_tariff_never_alarms() -> None:
    assert not is_unjustified_grid_charge(
        tariff_mode=TARIFF_MODE_DYNAMIC,
        total_kwh=5.0,
        justified_kwh=0.0,
        last_phase=PHASE_CORRIDOR,
    )


def test_attrs_mark_active_reserve() -> None:
    attrs = grid_to_battery_charge_attrs(
        total_kwh=2.5,
        justified_kwh=2.5,
        last_phase=PHASE_RESERVE_PROTECTION,
        tariff_mode=TARIFF_MODE_FIXED,
    )
    assert attrs["charge_reason"] == "reserve"
    assert attrs["justified_kwh"] == 2.5
    assert attrs["unjustified_kwh"] == 0.0


def test_attrs_reserve_switch_labels_justified_day() -> None:
    attrs = grid_to_battery_charge_attrs(
        total_kwh=2.5,
        justified_kwh=2.5,
        last_phase=PHASE_CORRIDOR,
        tariff_mode=TARIFF_MODE_FIXED,
        fixed_reserve_enabled=True,
    )
    assert attrs["charge_reason"] == "reserve"


def test_attrs_mark_unjustified_remainder() -> None:
    attrs = grid_to_battery_charge_attrs(
        total_kwh=2.0,
        justified_kwh=0.0,
        last_phase=PHASE_CORRIDOR,
        tariff_mode=TARIFF_MODE_FIXED,
    )
    assert attrs["charge_reason"] == "unjustified"
    assert attrs["unjustified_kwh"] == 2.0
