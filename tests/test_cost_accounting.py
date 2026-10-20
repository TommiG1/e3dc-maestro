"""Buy-price selection for cost / PV-savings counters."""
from __future__ import annotations

from custom_components.e3dc_maestro.cost_accounting import buy_prices_for_stats, simulation_comparable


def test_fixed_contract_without_dynamic_price():
    bill, sim = buy_prices_for_stats(
        tariff_mode="fixed",
        dynamic_tariff_enabled=False,
        fixed_buy_price=0.32,
        current_price=None,
    )
    assert (bill, sim) == (0.32, None)


def test_fixed_contract_simulates_dynamic_price():
    bill, sim = buy_prices_for_stats(
        tariff_mode="fixed",
        dynamic_tariff_enabled=True,
        fixed_buy_price=0.32,
        current_price=0.41,
    )
    assert (bill, sim) == (0.32, 0.41)


def test_true_dynamic_bills_at_sensor_price():
    bill, sim = buy_prices_for_stats(
        tariff_mode="dynamic",
        dynamic_tariff_enabled=True,
        fixed_buy_price=0.32,
        current_price=0.41,
    )
    assert (bill, sim) == (0.41, None)


def test_dynamic_mode_without_live_price_falls_back_to_fixed():
    bill, sim = buy_prices_for_stats(
        tariff_mode="dynamic",
        dynamic_tariff_enabled=True,
        fixed_buy_price=0.32,
        current_price=None,
    )
    assert (bill, sim) == (0.32, None)


def test_dynamic_mode_without_switch_stays_on_fixed_with_sim():
    """Strategy may leave the price sensor on while tariff_mode stays fixed."""
    bill, sim = buy_prices_for_stats(
        tariff_mode="fixed",
        dynamic_tariff_enabled=True,
        fixed_buy_price=0.28,
        current_price=0.5,
    )
    assert bill == 0.28
    assert sim == 0.5


def test_simulation_comparable_rejects_mid_day_restart_gap():
    assert simulation_comparable(3.89, 0.0) is False
    assert simulation_comparable(27.9, 0.01) is False
    assert simulation_comparable(3.89, 3.5) is True
    assert simulation_comparable(0.0, 0.0) is True
