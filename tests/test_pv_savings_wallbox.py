"""PV savings / self-consumption include wallbox load (coordinator tick formula)."""
from __future__ import annotations

from custom_components.e3dc_maestro.control_engine import MaestroState


def _self_supplied_w(state: MaestroState) -> float:
    """Mirror coordinator energy tick (house + wallbox + battery charge − grid import)."""
    house_load_w = state.house_power + max(0.0, state.wallbox_power)
    battery_charge_w = max(0.0, state.battery_power)
    grid_draw_w = max(0.0, -state.grid_power)
    return max(0.0, house_load_w + battery_charge_w - grid_draw_w)


def _pv_self_w(state: MaestroState) -> float:
    pv_w = (
        state.pv_power_instant
        if state.pv_power_instant is not None
        else state.pv_power
    )
    house_load_w = state.house_power + max(0.0, state.wallbox_power)
    return min(pv_w, house_load_w)


def test_self_supplied_counts_wallbox_without_grid_import():
    with_wb = MaestroState(
        soc=50,
        house_power=1000,
        wallbox_power=7000,
        grid_power=0,
        battery_power=0,
        pv_power=9000,
    )
    without_wb = MaestroState(
        soc=50,
        house_power=1000,
        wallbox_power=0,
        grid_power=0,
        battery_power=0,
        pv_power=9000,
    )
    assert _self_supplied_w(with_wb) == 8000
    assert _self_supplied_w(without_wb) == 1000


def test_pv_self_consumption_includes_wallbox_draw():
    state = MaestroState(
        soc=50,
        house_power=500,
        wallbox_power=3000,
        pv_power=2500,
        grid_power=1000,
        battery_power=0,
    )
    assert _pv_self_w(state) == 2500