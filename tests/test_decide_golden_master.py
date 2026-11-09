"""Golden-master snapshots for ``decide()`` — regression net before engine changes."""
from __future__ import annotations

import math
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import Any

import pytest

from custom_components.e3dc_maestro.const import PHASE_FEED_IN_LIMIT
from custom_components.e3dc_maestro.control_engine import (
    MaestroDecision,
    MaestroParams,
    MaestroState,
    PricePlanAction,
    TariffSchedule,
    TariffSlot,
    TARIFF_LOW,
    decide,
)

from test_control_engine import (  # noqa: PLC2701 — shared fixtures
    DEFAULT_PARAMS,
    _F0_BASE,
    _G0_BASE,
    _coverage_gate_params,
    _now,
    _params_with_forecast,
)


def _norm_power(value: float | None) -> float | None:
    if value is None:
        return None
    if math.isinf(value):
        return value
  # Whole watts are stable in decide(); sub-watt noise rounded away.
    return round(float(value), 0)


def _norm_soc(value: float | None) -> float | None:
    if value is None:
        return None
    return round(float(value), 2)


Snapshot = tuple[
    str,
    str | None,
    float | None,
    float | None,
    float | None,
    float | None,
    bool,
]


def decision_snapshot(decision: MaestroDecision) -> Snapshot:
    """Frozen tuple of decide() outputs (coordinator post-processing excluded)."""
    return (
        decision.phase,
        decision.power_mode,
        _norm_power(decision.charge_power_limit),
        _norm_power(decision.discharge_power_limit),
        _norm_soc(decision.target_soc),
        _norm_power(decision.target_charge_power),
        bool(decision.battery_priority),
    )


@dataclass(frozen=True)
class DecideGoldenCase:
    """One decide() invocation and its expected snapshot."""

    case_id: str
    state: MaestroState
    params: MaestroParams
    now: datetime
    kwargs: dict[str, Any] = field(default_factory=dict)
    expected: Snapshot = field(default_factory=tuple)  # type: ignore[arg-type]


def _low_slot_params(**overrides) -> MaestroParams:
    low_slot = TariffSlot(
        weekdays=frozenset(range(7)), start_h=0, end_h=2.2, class_=TARIFF_LOW,
    )
    base = {
        **DEFAULT_PARAMS.__dict__,
        "ht_enabled": False,
        "seasonal_reserve_enabled": False,
        "tariff_schedule": TariffSchedule(slots=[low_slot]),
        "low_slot_grid_charge_enabled": True,
        "low_slot_target_soc": 60.0,
        "max_grid_charge_kwh": 3.0,
        "tariff_mode": "fixed",
    }
    base.update(overrides)
    return MaestroParams(**base)


def _spreading_params(**kwargs) -> MaestroParams:
    base = {
        **DEFAULT_PARAMS.__dict__,
        "spreading_enabled": True,
        "spreading_target_soc": 100.0,
        "battery_capacity_kwh": 19.5,
        "ht_enabled": False,
        "charge_target": 90,
    }
    base.update(kwargs)
    return MaestroParams(**base)


def _cg_params(**kwargs) -> MaestroParams:
    base = {
        **DEFAULT_PARAMS.__dict__,
        "ht_enabled": False,
        "spreading_enabled": False,
        "curtailment_guard_enabled": True,
        "curtailment_activation_w": 1500,
        "curtailment_release_w": 500,
        "installed_kwp": 10.0,
        "feed_in_limit_percent": 70.0,
        "inverter_power": 12000,
        "max_charge_power": 6000,
        "charge_target": 85,
    }
    base.update(kwargs)
    return MaestroParams(**base)


def _reserve_params() -> MaestroParams:
    return MaestroParams(
        **{
            **DEFAULT_PARAMS.__dict__,
            "seasonal_reserve_enabled": True,
            "reserve_winter_percent": 30,
            "reserve_equinox_percent": 15,
            "ht_enabled": False,
        }
    )


def _md_params(**kwargs):
    base = {
        **DEFAULT_PARAMS.__dict__,
        "morning_discharge_mode": "active_house",
        "morning_unload_soc": 40.0,
        "morning_unload_start_soc": 60.0,
        "pre_discharge_offset_h": 4.0,
        "pre_discharge_max_power_w": 2000.0,
        "battery_capacity_kwh": 10.0,
        "charge_target": 85.0,
        "summer_charge_end": 16.0,
        "ht_enabled": False,
        "lower_corridor_pause_enabled": False,
    }
    base.update(kwargs)
    return MaestroParams(**base)


def _astro_params(**kwargs):
    base = {
        **DEFAULT_PARAMS.__dict__,
        "astro_enabled": True,
        "astro_latitude": 48.15,
        "astro_longitude": 11.58,
        "charge_end_sunset_offset_h": -2.0,
        "charge_start_sunrise_offset_h": 2.0,
        "charge_target": 85.0,
        "ht_enabled": False,
        "lower_corridor_pause_enabled": False,
        "morning_discharge_mode": "off",
    }
    base.update(kwargs)
    return MaestroParams(**base)


def _price_plan_params(**kw):
    base = {
        **DEFAULT_PARAMS.__dict__,
        "ht_enabled": False,
        "seasonal_reserve_enabled": False,
        "price_plan_enabled": True,
        "price_plan_active": True,
        "max_grid_charge_kwh": 10.0,
    }
    base.update(kw)
    return MaestroParams(**base)


def _build_golden_cases() -> list[DecideGoldenCase]:
    """Minimal fixtures per ladder rung; expected snapshots filled below."""
    basic = MaestroState(soc=50, pv_power=0, house_power=1000, grid_power=0, battery_power=0)

    cases: list[DecideGoldenCase] = []

    def add(case_id: str, state, params, now, /, **kwargs):
        cases.append(
            DecideGoldenCase(case_id, state, params, now, dict(kwargs), expected=()),
        )

    # ── Master off ──
    add("off_regelung_inactive", basic, DEFAULT_PARAMS, _now(6, 15, 12), regelung_aktiv=False)

    # ── Emergency ──
    add(
        "emergency_below_threshold",
        MaestroState(soc=10, pv_power=0, house_power=1000, grid_power=0, battery_power=0),
        DEFAULT_PARAMS,
        _now(6, 15, 12),
    )

    # ── Force discharge / lock ──
    fd_params = MaestroParams(
        **{
            **DEFAULT_PARAMS.__dict__,
            "force_discharge_power_w": 3000.0,
            "ht_enabled": False,
            "seasonal_reserve_enabled": False,
        }
    )
    add(
        "force_discharge_active",
        MaestroState(soc=70, pv_power=0, house_power=1500, grid_power=1500, battery_power=0),
        fd_params,
        _now(6, 15, 12),
        force_discharge=True,
    )
    dl_params = MaestroParams(
        **{
            **DEFAULT_PARAMS.__dict__,
            "discharge_lock_power_w": 0.0,
            "ht_enabled": False,
            "seasonal_reserve_enabled": False,
        }
    )
    add(
        "discharge_lock_full",
        MaestroState(soc=70, pv_power=2000, house_power=500, grid_power=-1500, battery_power=0),
        dl_params,
        _now(6, 15, 12),
        discharge_lock=True,
    )

    # ── Feed-in limit + hysteresis ──
    fi_params = MaestroParams(**{**DEFAULT_PARAMS.__dict__, "ht_enabled": False})
    fi_state_trigger = MaestroState(
        soc=50, pv_power=9000, house_power=1000, grid_power=7150, battery_power=0,
    )
    add("feed_in_trigger_at_threshold", fi_state_trigger, fi_params, _now(7, 15, 13))
    fi_state_hold = MaestroState(
        soc=50, pv_power=9000, house_power=1000, grid_power=7050, battery_power=0,
    )
    add(
        "feed_in_hold_in_band",
        fi_state_hold,
        fi_params,
        _now(7, 15, 13),
        previous_phase=PHASE_FEED_IN_LIMIT,
    )
    fi_state_release = MaestroState(
        soc=50, pv_power=7500, house_power=600, grid_power=6500, battery_power=400,
    )
    add(
        "feed_in_release_surplus_dropped",
        fi_state_release,
        fi_params,
        _now(7, 15, 11),
        previous_phase=PHASE_FEED_IN_LIMIT,
    )

    # ── Reserve / HT / EVCC ──
    add(
        "reserve_protection_winter",
        MaestroState(soc=28, pv_power=0, house_power=500, grid_power=0, battery_power=0),
        _reserve_params(),
        _now(12, 21, 14),
    )
    add(
        "ht_protection_in_window",
        MaestroState(soc=30, pv_power=0, house_power=1000, grid_power=0, battery_power=0),
        MaestroParams(**{**DEFAULT_PARAMS.__dict__, "ht_min": 50, "ht_sockel": 10}),
        _now(1, 15, 10),
    )
    evcc_p = MaestroParams(**{**DEFAULT_PARAMS.__dict__, "evcc_enabled": True, "ht_enabled": False})
    add(
        "evcc_pause_now_charging",
        MaestroState(
            soc=50, pv_power=3000, house_power=500, grid_power=0, battery_power=0,
            evcc_charging=True, evcc_mode="now",
        ),
        evcc_p,
        _now(6, 15, 10),
    )

    # ── Morning discharge / astro / morning cap ──
    add(
        "morning_discharge_active_house",
        MaestroState(soc=75, pv_power=3000, house_power=1000, grid_power=0, battery_power=0),
        _md_params(),
        _now(6, 15, 8),
    )
    add(
        "astro_wait_before_sunrise",
        MaestroState(soc=50, pv_power=3000, house_power=1000, grid_power=0, battery_power=0),
        _astro_params(),
        _now(6, 21, 4),
    )
    add(
        "morning_cap_blocks_charge",
        MaestroState(soc=50, pv_power=0, house_power=300, grid_power=0, battery_power=0),
        _F0_BASE,
        _now(6, 1, 7, 0),
    )

    # ── Hard SoC / fast floor / grid slots ──
    add(
        "hard_soc_limit_at_cap",
        MaestroState(soc=80, pv_power=4000, house_power=300, grid_power=0, battery_power=0),
        _G0_BASE,
        _now(6, 15, 12),
    )
    lsg = _low_slot_params(fast_charge_floor_enabled=True, fast_charge_floor_soc=50.0)
    add(
        "grid_charge_low_slot",
        MaestroState(soc=30, pv_power=0, house_power=1000, grid_power=0, battery_power=0),
        lsg,
        _now(1, 15, 2),
    )
    add(
        "fast_floor_budget_exhausted",
        MaestroState(soc=30, pv_power=0, house_power=1000, grid_power=0, battery_power=0),
        lsg,
        _now(1, 15, 2),
        grid_charged_today_kwh=3.0,
    )
    add(
        "grid_hold_target_reached",
        MaestroState(soc=90, pv_power=0, house_power=1000, grid_power=0, battery_power=0),
        _low_slot_params(low_slot_target_soc=90.0),
        _now(1, 15, 2),
    )

    # ── Price plan ──
    add(
        "price_plan_charge",
        MaestroState(soc=40, pv_power=0, house_power=800, grid_power=0, battery_power=0),
        _price_plan_params(),
        _now(1, 15, 2),
        price_plan=PricePlanAction(charge_now=True, target_soc=70.0),
    )
    add(
        "price_plan_hold",
        MaestroState(soc=60, pv_power=0, house_power=800, grid_power=0, battery_power=0),
        _price_plan_params(),
        _now(1, 15, 2),
        price_plan=PricePlanAction(hold_now=True),
    )

    # ── Curtailment / corridor / spreading / idle ──
    add(
        "curtailment_guard_active",
        MaestroState(soc=86, pv_power=10000, house_power=1000, grid_power=0, battery_power=0),
        _cg_params(),
        _now(6, 15, 12),
        curtailment_guard_active=True,
    )
    add(
        "corridor_charging_night",
        MaestroState(soc=50, pv_power=3000, house_power=800, grid_power=0, battery_power=0),
        MaestroParams(**{**DEFAULT_PARAMS.__dict__, "ht_enabled": False}),
        _now(6, 15, 23),
    )
    add(
        "spreading_midday",
        MaestroState(soc=55, pv_power=8000, house_power=2000, grid_power=0, battery_power=8000),
        _spreading_params(),
        _now(6, 15, 10, 30),
    )
    add(
        "idle_at_charge_target",
        MaestroState(soc=90, pv_power=1000, house_power=800, grid_power=0, battery_power=0),
        MaestroParams(**{**DEFAULT_PARAMS.__dict__, "ht_enabled": False, "charge_target": 85}),
        _now(6, 15, 23),
    )

    # ── PV delay + feed-in cooldown ──
    pvd = _params_with_forecast(threshold=5.0, capacity=10.0, factor=1.2)
    pvd_state = MaestroState(
        soc=30, pv_power=0, house_power=500, grid_power=0, battery_power=0,
        pv_forecast_remaining_kwh=8.0,
    )
    add("pv_delay_forecast_sufficient", pvd_state, pvd, _now(6, 15, 9))
    now9 = _now(6, 15, 9)
    add(
        "pv_delay_cooldown_after_feed_in",
        pvd_state,
        pvd,
        now9,
        previous_phase=PHASE_FEED_IN_LIMIT,
        previous_phase_since=now9 - timedelta(seconds=30),
    )
    add(
        "pv_delay_after_cooldown",
        pvd_state,
        pvd,
        now9,
        previous_phase=PHASE_FEED_IN_LIMIT,
        previous_phase_since=now9 - timedelta(seconds=90),
    )

    # ── Battery priority latch (low-yield gate) ──
    ly_p = _coverage_gate_params()
    ly_state_insuf = MaestroState(
        soc=90, pv_power=3000, house_power=600, grid_power=0, battery_power=0,
        pv_forecast_today_kwh=50.0,
        pv_forecast_remaining_p10_kwh=0.5,
    )
    add("battery_priority_insufficient_forecast", ly_state_insuf, ly_p, _now(6, 15, 11))
    ly_state_release = MaestroState(
        soc=90, pv_power=3000, house_power=600, grid_power=0, battery_power=0,
        pv_forecast_today_kwh=50.0,
        pv_forecast_remaining_p10_kwh=1.0,
    )
    add(
        "battery_priority_hysteresis_release",
        ly_state_release,
        ly_p,
        _now(6, 15, 11),
        previous_battery_priority=True,
    )
    ly_state_hold = MaestroState(
        soc=90, pv_power=3000, house_power=600, grid_power=0, battery_power=0,
        pv_forecast_today_kwh=50.0,
        pv_forecast_remaining_p10_kwh=0.95,
    )
    add(
        "battery_priority_hysteresis_hold",
        ly_state_hold,
        ly_p,
        _now(6, 15, 11),
        previous_battery_priority=True,
    )
    ly_state_reengage = MaestroState(
        soc=90, pv_power=3000, house_power=600, grid_power=0, battery_power=0,
        pv_forecast_today_kwh=50.0,
        pv_forecast_remaining_p10_kwh=0.8,
    )
    add(
        "battery_priority_hysteresis_reengage",
        ly_state_reengage,
        ly_p,
        _now(6, 15, 11),
        previous_battery_priority=False,
    )

    return cases


# Expected snapshots (generated from current decide() — do not edit casually).
_EXPECTED: dict[str, Snapshot] = {
    "off_regelung_inactive": ("off", "normal", None, None, 51.28, None, False),
    "emergency_below_threshold": ("emergency", "charge", 3000.0, None, 51.28, 3000.0, False),
    "force_discharge_active": ("force_discharge", "discharge", None, 3000.0, 51.28, None, False),
    "discharge_lock_full": ("discharge_lock", "normal", None, 0.0, 51.28, None, False),
    "feed_in_trigger_at_threshold": ("feed_in_limit", "charge", 150.0, None, 57.45, 150.0, False),
    "feed_in_hold_in_band": ("feed_in_limit", "charge", 50.0, None, 57.45, 50.0, False),
    "feed_in_release_surplus_dropped": ("spreading", "normal", 699.0, None, 46.75, 699.0, False),
    "reserve_protection_winter": ("reserve_protection", "normal", None, 0.0, 85.0, None, False),
    "ht_protection_in_window": ("ht_protection", "normal", None, 0.0, 68.15, None, False),
    "evcc_pause_now_charging": ("evcc_pause", "normal", None, 0.0, 40.86, None, False),
    "morning_discharge_active_house": ("morning_discharge", "discharge", None, 880.0, 33.03, None, False),
    "astro_wait_before_sunrise": ("astro_wait", "normal", 1.0, None, 20.0, None, False),
    "morning_cap_blocks_charge": ("morning_cap", "normal", 1.0, None, 25.33, None, False),
    "hard_soc_limit_at_cap": ("hard_soc_limit", "normal", 1.0, None, 51.28, None, False),
    "grid_charge_low_slot": ("grid_charge", "charge", 3000.0, None, 60.0, 3000.0, False),
    "fast_floor_budget_exhausted": ("fast_floor", "normal", 3000.0, None, 50.0, None, False),
    "grid_hold_target_reached": ("grid_hold", "normal", None, 0.0, 90.0, None, False),
    "price_plan_charge": ("grid_charge", "charge", 3000.0, None, 70.0, 3000.0, False),
    "price_plan_hold": ("grid_hold", "normal", None, 0.0, 20.0, None, False),
    "curtailment_guard_active": ("curtailment_guard", "charge", 2000.0, None, 51.28, 2000.0, False),
    "corridor_charging_night": ("corridor", "normal", 3000.0, None, 85.0, 3000.0, False),
    "spreading_midday": ("spreading", "normal", 1101.0, None, 45.27, 1101.0, False),
    "idle_at_charge_target": ("idle", "normal", 1.0, None, 85.0, None, False),
    "pv_delay_forecast_sufficient": ("pv_delay", "normal", 0.0, None, 35.64, None, False),
    "pv_delay_cooldown_after_feed_in": ("corridor", "normal", None, None, 35.64, 0.0, False),
    "pv_delay_after_cooldown": ("pv_delay", "normal", 0.0, None, 35.64, None, False),
    "battery_priority_insufficient_forecast": ("corridor", "normal", 9000.0, None, 100.0, 9000.0, True),
    "battery_priority_hysteresis_release": ("spreading", "normal", 200.0, None, 52.09, 200.0, False),
    "battery_priority_hysteresis_hold": ("corridor", "normal", 9000.0, None, 100.0, 9000.0, True),
    "battery_priority_hysteresis_reengage": ("corridor", "normal", 9000.0, None, 100.0, 9000.0, True),
}


def _golden_cases() -> list[DecideGoldenCase]:
    cases: list[DecideGoldenCase] = []
    for raw in _build_golden_cases():
        exp = _EXPECTED[raw.case_id]
        cases.append(
            DecideGoldenCase(
                raw.case_id, raw.state, raw.params, raw.now, raw.kwargs, expected=exp,
            )
        )
    return cases


@pytest.mark.parametrize("case", _golden_cases(), ids=lambda c: c.case_id)
def test_decide_golden_master(case: DecideGoldenCase):
    decision = decide(case.state, case.params, case.now, **case.kwargs)
    assert decision_snapshot(decision) == case.expected
