"""Netzladung-Strategie: Auswahl ↔ Schalter und feste Werte im Auto-Modus."""
from __future__ import annotations

import dataclasses

from custom_components.e3dc_maestro.control_engine import MaestroParams
from custom_components.e3dc_maestro.grid_charge_strategy import (
    AUTO_EFFICIENCY,
    AUTO_MIN_SPREAD,
    AUTO_SAFETY_FACTOR,
    current_strategy,
    plan_tuning,
    strategy_updates,
)


def _apply(params: MaestroParams, strategy: str) -> MaestroParams:
    return dataclasses.replace(params, **strategy_updates(strategy, params))


def test_legacy_switches_map_to_a_strategy():
    assert current_strategy(MaestroParams()) == "off"
    assert current_strategy(MaestroParams(low_slot_grid_charge_enabled=True)) == "slots"
    assert (
        current_strategy(MaestroParams(low_slot_grid_charge_enabled=True, dynamic_tariff_enabled=True))
        == "threshold"
    )
    # Bestehende Preisplan-Nutzer behalten ihre eigenen Werte.
    assert current_strategy(MaestroParams(price_plan_enabled=True)) == "dynamic_expert"
    assert (
        current_strategy(MaestroParams(price_plan_enabled=True, low_slot_grid_charge_enabled=True))
        == "dynamic_expert"
    )


def test_every_strategy_round_trips():
    for strategy in ("off", "slots", "threshold", "dynamic_auto", "dynamic_expert"):
        assert current_strategy(_apply(MaestroParams(), strategy)) == strategy


def test_strategies_never_run_both_grid_charge_paths():
    for strategy in ("slots", "threshold", "dynamic_auto", "dynamic_expert"):
        p = _apply(MaestroParams(low_slot_grid_charge_enabled=True, price_plan_enabled=True), strategy)
        assert not (p.low_slot_grid_charge_enabled and p.price_plan_enabled)
    off = _apply(MaestroParams(price_plan_enabled=True, price_plan_active=True), "off")
    assert (off.low_slot_grid_charge_enabled, off.price_plan_enabled, off.price_plan_active) == (False, False, False)


def test_strategies_leave_tariff_mode_alone():
    """tariff_mode is the real contract and must not flip with the charge strategy."""
    for strategy in ("off", "slots", "threshold", "dynamic_auto", "dynamic_expert"):
        assert _apply(MaestroParams(tariff_mode="fixed"), strategy).tariff_mode == "fixed"
        assert _apply(MaestroParams(tariff_mode="dynamic"), strategy).tariff_mode == "dynamic"


def test_entering_the_plan_starts_in_shadow_mode_and_switching_keeps_control():
    entered = _apply(MaestroParams(low_slot_grid_charge_enabled=True, price_plan_active=True), "dynamic_auto")
    assert entered.price_plan_active is False
    controlling = MaestroParams(price_plan_enabled=True, price_plan_active=True)
    assert _apply(controlling, "dynamic_auto").price_plan_active is True


def test_unknown_strategy_changes_nothing():
    assert strategy_updates("bogus", MaestroParams()) == {}


def test_auto_ignores_user_tuning_and_wear():
    params = MaestroParams(
        price_plan_enabled=True,
        grid_charge_strategy="dynamic_auto",
        price_plan_efficiency=0.6,
        price_plan_min_spread=0.4,
        price_plan_safety_factor=2.0,
    )
    tuning = plan_tuning(params)
    assert (tuning.efficiency, tuning.min_spread, tuning.safety_factor, tuning.wear_eur_per_kwh) == (
        AUTO_EFFICIENCY,
        AUTO_MIN_SPREAD,
        AUTO_SAFETY_FACTOR,
        0.0,
    )
    expert = plan_tuning(dataclasses.replace(params, grid_charge_strategy="dynamic_expert"))
    assert (expert.efficiency, expert.min_spread, expert.safety_factor, expert.wear_eur_per_kwh) == (0.6, 0.4, 2.0, None)
