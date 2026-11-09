"""Tests for the gate trace helpers and their wiring in the decision cascade."""
from dataclasses import replace
from datetime import datetime, timezone

import pytest

from custom_components.e3dc_maestro.const import (
    PHASE_DISCHARGE_LOCK,
    PHASE_EMERGENCY,
    PHASE_EVCC_PAUSE,
    PHASE_FORCE_DISCHARGE,
    PHASE_HARD_SOC_LIMIT,
    PHASE_IDLE,
    PHASE_OFF,
)
from custom_components.e3dc_maestro.control_engine import (
    MaestroParams,
    MaestroState,
    PricePlanAction,
    decide,
)
from test_control_engine import (  # noqa: PLC2701
    DEFAULT_PARAMS,
    _G0_BASE,
    _now,
)
from custom_components.e3dc_maestro.gate_trace import (
    GateTrace,
    eval_gate,
    eq,
    gt,
    is_false,
    is_true,
    lt,
    term,
)

NOW = datetime(2026, 6, 15, 12, 0, tzinfo=timezone.utc)
DEFAULT_PARAMS = MaestroParams()
PARAMS_15 = replace(DEFAULT_PARAMS, charge_threshold=15)


def _state(soc: float = 50.0) -> MaestroState:
    return MaestroState(soc=soc, pv_power=0, house_power=0, grid_power=0, battery_power=0)


def test_term_binary_and_unary():
    t = term("soc", 10.0, op=lt, expected=20.0, setting_key="charge_threshold")
    assert (t.name, t.actual, t.expected, t.setting_key, t.passed) == (
        "soc", 10.0, 20.0, "charge_threshold", True,
    )
    assert term("soc", 30.0, op=lt, expected=20.0).passed is False
    u = term("flag", False, op=is_false)
    assert u.passed is True and u.expected is None
    assert term("flag", False, op=is_true).passed is False
    # expected=None is a real value for binary ops, not "unary"
    assert term("x", None, op=eq, expected=None).passed is True


def test_eval_gate_all_terms_must_pass():
    ok = eval_gate("g", term("a", 5, op=gt, expected=1), term("b", True, op=is_true))
    assert ok.result is True
    bad = eval_gate("g", term("a", 5, op=gt, expected=1), term("b", False, op=is_true))
    assert bad.result is False
    assert [t.passed for t in bad.terms] == [True, False]


def test_trace_record_sets_winning_gate_only_on_result():
    trace = GateTrace()
    trace.record(eval_gate("lost", term("a", False, op=is_true)))
    assert trace.winning_gate is None
    trace.record(eval_gate("won", term("a", True, op=is_true)))
    assert trace.winning_gate == "won"
    assert [g.name for g in trace.gates] == ["lost", "won"]


def test_off_decision_has_trace():
    d = decide(_state(), DEFAULT_PARAMS, NOW, regelung_aktiv=False)
    assert d.phase == PHASE_OFF
    assert d.trace is not None
    assert d.trace.winning_gate == "1.off"
    (gate,) = d.trace.gates
    assert gate.result is True
    assert gate.terms[0].name == "regelung_aktiv"
    assert gate.terms[0].actual is False and gate.terms[0].passed is True


def test_force_discharge_active_and_pause_traces():
    p = DEFAULT_PARAMS
    active = decide(_state(100.0), p, NOW, force_discharge=True)
    assert active.phase == PHASE_FORCE_DISCHARGE
    assert active.trace.winning_gate == "1.5.force_discharge.active"
    assert [g.name for g in active.trace.gates] == [
        "1.off", "1.5.force_discharge", "1.5.force_discharge.active",
    ]
    paused = decide(_state(0.0), PARAMS_15, NOW, force_discharge=True)
    assert paused.phase == PHASE_FORCE_DISCHARGE
    assert paused.trace.winning_gate == "1.5.force_discharge.pause"
    assert paused.trace.gates[-2].result is False


def test_discharge_lock_and_emergency_traces():
    lock = decide(_state(), DEFAULT_PARAMS, NOW, discharge_lock=True)
    assert lock.phase == PHASE_DISCHARGE_LOCK
    assert lock.trace.winning_gate == "1.6.discharge_lock"

    emergency = decide(_state(0.0), PARAMS_15, NOW)
    assert emergency.phase == PHASE_EMERGENCY
    assert emergency.trace.winning_gate == "2.emergency"
    soc_term = emergency.trace.gates[-1].terms[0]
    assert soc_term.setting_key == "charge_threshold"
    assert soc_term.expected == PARAMS_15.charge_threshold


def test_evcc_pause_winning_gate():
    p = MaestroParams(**{**DEFAULT_PARAMS.__dict__, "evcc_enabled": True, "ht_enabled": False})
    state = MaestroState(
        soc=50, pv_power=3000, house_power=500, grid_power=0, battery_power=0,
        evcc_charging=True, evcc_mode="now",
    )
    d = decide(state, p, NOW)
    assert d.phase == PHASE_EVCC_PAUSE
    assert d.trace.winning_gate == "5.evcc_pause.lock"
    assert d.trace.gates[-2].name == "5.evcc_pause"
    assert d.trace.gates[-2].result is True


def test_hard_soc_limit_winning_gate():
    state = MaestroState(soc=80.0, pv_power=4000, house_power=300, grid_power=0, battery_power=0)
    d = decide(state, _G0_BASE, NOW)
    assert d.phase == PHASE_HARD_SOC_LIMIT
    assert d.trace.winning_gate == "6.9.hard_soc_limit"


def test_idle_winning_gate():
    p = MaestroParams(**{**DEFAULT_PARAMS.__dict__, "ht_enabled": False, "charge_target": 85})
    state = MaestroState(soc=90, pv_power=1000, house_power=800, grid_power=0, battery_power=0)
    d = decide(state, p, _now(6, 15, 23))
    assert d.phase == PHASE_IDLE
    assert d.trace.winning_gate == "10.idle"


def test_price_plan_charge_winning_gate():
    p = MaestroParams(
        **{
            **DEFAULT_PARAMS.__dict__,
            "ht_enabled": False,
            "price_plan_enabled": True,
            "price_plan_active": True,
        }
    )
    state = MaestroState(soc=40, pv_power=0, house_power=800, grid_power=0, battery_power=0)
    d = decide(
        state, p, NOW,
        price_plan=PricePlanAction(charge_now=True, target_soc=70.0),
    )
    assert d.trace.winning_gate == "5.5.price_plan_charge"


# ── Stufe 3: every golden-master case carries a trace with a winning gate ──

from test_decide_golden_master import _golden_cases  # noqa: E402,PLC2701

# Every gate that may legitimately win for a given phase (exact names, so an
# entry gate like "7.corridor.entry" that fired but fell through is caught).
PHASE_WINNING_GATES = {
    "off": {"1.off"},
    "force_discharge": {"1.5.force_discharge.active", "1.5.force_discharge.pause"},
    "discharge_lock": {"1.6.discharge_lock"},
    "emergency": {"2.emergency"},
    "feed_in_limit": {"3.feed_in.trigger", "3.feed_in.hold"},
    "reserve_protection": {"4.reserve.manual_charge", "4.reserve.protection"},
    "evcc_pause": {"5.evcc_pause.lock", "5.evcc_pause.limit"},
    "grid_charge": {"5.5.price_plan_charge", "6.97.grid_charge"},
    "grid_hold": {"5.5.price_plan_hold", "6.4.low_slot_hold"},
    "ht_protection": {"6.ht_protection"},
    "morning_discharge": {"6.5.morning_discharge"},
    "morning_cap": {"6.7.morning_cap.active"},
    "astro_wait": {"6.75.astro_wait.active"},
    "hard_soc_limit": {"6.9.hard_soc_limit"},
    "fast_floor": {"6.95.fast_floor"},
    "corridor": {"6.96.battery_priority", "7d.post_charge_end", "7.corridor"},
    "pv_delay": {"7a.pv_delay"},
    "spreading": {"8.spreading"},
    "curtailment_guard": {"9.curtailment"},
    "idle": {
        "3.feed_in.battery_full",
        "7b.lower_corridor_pause",
        "7e.post_ceiling_pause",
        "8.spreading.pause",
        "8b.spreading_target_reached",
        "9.curtailment.battery_full",
        "10.idle",
    },
}


@pytest.mark.parametrize("case", _golden_cases(), ids=lambda c: c.case_id)
def test_golden_cases_winning_gate_matches_phase(case):
    d = decide(case.state, case.params, case.now, **case.kwargs)
    assert d.trace is not None
    assert d.trace.winning_gate in PHASE_WINNING_GATES[d.phase], (
        d.phase, d.trace.winning_gate,
    )


def _golden(case_id):
    return next(c for c in _golden_cases() if c.case_id == case_id)


def _run(case_id, **param_overrides):
    c = _golden(case_id)
    return c, decide(c.state, replace(c.params, **param_overrides), c.now, **c.kwargs)


def test_feed_in_trigger_winning_gate():
    _, d = _run("feed_in_trigger_at_threshold")
    assert d.phase == "feed_in_limit"
    assert d.trace.winning_gate == "3.feed_in.trigger"


def test_feed_in_hold_records_hold_gate_on_outer_trace():
    _, d = _run("feed_in_hold_in_band")
    assert d.phase == "feed_in_limit"
    names = [g.name for g in d.trace.gates]
    assert "3.feed_in.hold" in names
    assert "3.feed_in.hold.not_absorbed" in names
    assert d.trace.winning_gate == "3.feed_in.hold"


def test_reserve_and_ht_winning_gates():
    _, d = _run("reserve_protection_winter")
    assert d.trace.winning_gate == "4.reserve.protection"
    _, d = _run("ht_protection_in_window")
    assert d.trace.winning_gate == "6.ht_protection"


def test_grid_charge_and_hold_winning_gates():
    _, d = _run("grid_charge_low_slot")
    assert d.trace.winning_gate == "6.97.grid_charge"
    _, d = _run("grid_hold_target_reached")
    assert d.trace.winning_gate == "6.4.low_slot_hold"


def test_battery_priority_winning_gate():
    _, d = _run("battery_priority_insufficient_forecast")
    assert d.trace.winning_gate == "6.96.battery_priority"
    assert d.battery_priority is True


def test_house_ceiling_gate_does_not_steal_winner():
    _, d = _run("pv_delay_cooldown_after_feed_in")
    names = [g.name for g in d.trace.gates]
    assert "house_ceiling.cap" in names
    assert d.trace.winning_gate == "7.corridor"


def test_wallbox_guard_appends_gate_and_keeps_winner():
    c = _golden("pv_delay_cooldown_after_feed_in")
    base = decide(c.state, c.params, c.now, **c.kwargs)
    params = replace(
        c.params,
        wallbox_discharge_guard_enabled=True,
        wallbox_discharge_guard_threshold_w=100.0,
    )
    state = replace(c.state, wallbox_power=3000.0)
    d = decide(state, params, c.now, **c.kwargs)
    assert d.phase == base.phase
    assert d.discharge_power_limit == params.max_charge_power
    assert d.trace.gates[-1].name == "post.wallbox_discharge_guard"
    assert d.trace.winning_gate == base.trace.winning_gate


def test_wallbox_guard_creates_trace_when_missing():
    from custom_components.e3dc_maestro.control_engine import (
        MaestroDecision,
        _apply_wallbox_discharge_guard,
    )

    params = replace(
        DEFAULT_PARAMS,
        wallbox_discharge_guard_enabled=True,
        wallbox_discharge_guard_threshold_w=100.0,
    )
    state = replace(_state(), wallbox_power=3000.0)
    out = _apply_wallbox_discharge_guard(
        MaestroDecision(phase=PHASE_IDLE, reason="x", power_mode="normal"),
        state, params,
    )
    assert out.trace is not None
    assert [g.name for g in out.trace.gates] == ["post.wallbox_discharge_guard"]
    assert out.trace.winning_gate is None


def test_corridor_pause_and_spreading_traces():
    for case_id, expected in (
        ("spreading_midday", "8.spreading"),
        ("curtailment_guard_active", "9.curtailment"),
        ("corridor_charging_night", "7d.post_charge_end"),
        ("pv_delay_forecast_sufficient", "7a.pv_delay"),
    ):
        _, d = _run(case_id)
        assert d.trace.winning_gate == expected
