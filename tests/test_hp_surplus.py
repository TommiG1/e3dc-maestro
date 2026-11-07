"""Wärmepumpe: Überschuss, Mindestdauer, Aus-Schwelle, Zeitfenster, Schattenmodus."""
from __future__ import annotations

import asyncio
from collections import deque
from datetime import datetime, timedelta
from types import SimpleNamespace
from unittest.mock import patch

from custom_components.e3dc_maestro.const import (
    CONF_HP_SERVICE_ON,
    CONF_HP_SWITCH_ENTITY,
)
from custom_components.e3dc_maestro.control_engine import (
    MaestroParams,
    MaestroState,
    hp_action_explanation,
    hp_desired_state,
    hp_in_window,
    hp_surplus_w,
)
from custom_components.e3dc_maestro.coordinator_act import CoordinatorActMixin, dt_util

NOON = datetime(2026, 6, 1, 12, 0)


def _state(battery_power: float = 0.0, house: float = 1000.0) -> MaestroState:
    return MaestroState(
        soc=50, pv_power=4000, house_power=house, grid_power=0, battery_power=battery_power
    )


def _params(**kw) -> MaestroParams:
    kw.setdefault("hp_surplus_delay_minutes", 0)
    return MaestroParams(hp_enabled=True, hp_min_surplus=2000, **kw)


# ── Überschuss ────────────────────────────────────────────────────────────

def test_default_ignores_battery_charge():
    p = _params()
    assert hp_surplus_w(_state(2500), p) == 3000
    assert hp_desired_state(_state(2500), p, NOON, None, False, 999) is True


def test_opt_in_subtracts_battery_charge():
    p = _params(hp_subtract_battery=True)
    assert hp_surplus_w(_state(2500), p) == 500
    assert hp_desired_state(_state(2500), p, NOON, None, False, 999) is None


def test_opt_in_ignores_battery_discharge():
    assert hp_surplus_w(_state(-1500), _params(hp_subtract_battery=True)) == 3000


# ── Mindestdauer ──────────────────────────────────────────────────────────

def test_surplus_must_hold_for_delay():
    p = _params(hp_surplus_delay_minutes=5)
    assert hp_desired_state(_state(), p, NOON, None, False, 999, surplus_for_minutes=2) is None
    assert hp_desired_state(_state(), p, NOON, None, False, 999, surplus_for_minutes=5) is True


def test_cheap_price_ignores_delay():
    p = _params(hp_surplus_delay_minutes=5)
    assert hp_desired_state(_state(), p, NOON, 0.10, False, 999, surplus_for_minutes=0) is True


# ── Aus-Schwelle (WP-Last steckt im Hausverbrauch) ────────────────────────

def test_running_hp_stays_on_above_off_threshold():
    p = _params(hp_off_surplus=0)
    running = _state(house=3500)  # 500 W Überschuss, WP läuft
    assert hp_desired_state(running, p, NOON, None, True, 999) is None


def test_running_hp_switches_off_below_off_threshold():
    p = _params(hp_off_surplus=0)
    assert hp_desired_state(_state(house=4500), p, NOON, None, True, 999) is False


def test_min_run_time_still_protects():
    p = _params(hp_off_surplus=0)
    assert hp_desired_state(_state(house=4500), p, NOON, None, True, 5) is None


# ── Zeitfenster ───────────────────────────────────────────────────────────

def test_window_across_midnight():
    p = _params(hp_time_start="22:00", hp_time_end="06:00")
    assert hp_in_window(p, datetime(2026, 6, 1, 23, 0))
    assert hp_in_window(p, datetime(2026, 6, 1, 5, 0))
    assert not hp_in_window(p, NOON)


def test_outside_window_switches_off():
    p = _params(hp_time_start="06:00", hp_time_end="10:00")
    assert hp_desired_state(_state(), p, NOON, None, True, 999) is False


# ── Erklärung ─────────────────────────────────────────────────────────────

def test_explanation_on_names_surplus_duration():
    text = hp_action_explanation(True, _state(), _params(), None, NOON, 6)
    assert text.startswith("12:00 Wärmepumpe eingeschaltet:")
    assert "3000 W ≥ 2000 W seit 6 min" in text


def test_explanation_price_only_when_battery_absorbs():
    p = _params(hp_subtract_battery=True)
    text = hp_action_explanation(True, _state(2500), p, 0.10, NOON)
    assert "Preis 0.100 €/kWh" in text
    assert "≥ 2000 W" not in text


def test_explanation_off_names_off_threshold():
    text = hp_action_explanation(False, _state(house=4500), _params(), 0.20, NOON)
    assert "Aus-Schwelle 0 W" in text


def test_explanation_off_outside_window():
    p = _params(hp_time_start="06:00", hp_time_end="10:00")
    assert "außerhalb des Zeitfensters" in hp_action_explanation(False, _state(), p, None, NOON)


def test_explanation_shadow():
    text = hp_action_explanation(True, _state(), _params(), None, NOON, shadow=True)
    assert "Schattenmodus" in text
    assert "würde einschalten" in text


# ── Ansteuerung ───────────────────────────────────────────────────────────

class _Fake(CoordinatorActMixin):
    def __init__(self, params: MaestroParams, switch_state: str | None = None):
        self._params = params
        self._hp_running = False
        self._hp_last_change = dt_util.utcnow() - timedelta(days=1)
        self._hp_last_explanation = None
        self._hp_history: deque = deque(maxlen=20)
        self._hp_surplus_since = None
        self._hp_no_target_warned = False
        self.service_calls: list[tuple[str, str, dict]] = []
        self.logs: list[str] = []
        states = {"switch.wp": SimpleNamespace(state=switch_state)} if switch_state else {}

        async def _call(domain, service, data, blocking=False):
            self.service_calls.append((domain, service, data))

        self.hass = SimpleNamespace(
            states=SimpleNamespace(get=states.get),
            services=SimpleNamespace(async_call=_call),
        )

    def _log(self, msg: str) -> None:
        self.logs.append(msg)


def test_shadow_mode_does_not_switch():
    # Control uses wall-clock time for the default 06:00–22:00 window; freeze it.
    c = _Fake(_params(hp_shadow=True))
    with patch.object(dt_util, "now", return_value=NOON):
        asyncio.run(c._async_control_hp(_state(), {CONF_HP_SWITCH_ENTITY: "switch.wp"}, None))
    assert c.service_calls == []
    assert c._hp_running is True
    assert "würde einschalten" in c._hp_last_explanation
    assert "würde einschalten" in c._hp_history[0]["text"]


def test_switches_real_entity_domain():
    c = _Fake(_params())
    asyncio.run(c._async_act_hp(True, {CONF_HP_SWITCH_ENTITY: "input_boolean.wp"}, _state()))
    assert c.service_calls == [("input_boolean", "turn_on", {"entity_id": "input_boolean.wp"})]


def test_adopts_real_switch_state():
    c = _Fake(_params(), switch_state="on")
    c._sync_hp_running({CONF_HP_SWITCH_ENTITY: "switch.wp"})
    assert c._hp_running is True
    assert dt_util.utcnow() - c._hp_last_change < timedelta(minutes=1)
    assert "extern an" in c._hp_history[0]["text"]


def test_delay_tracked_across_ticks():
    c = _Fake(_params(hp_surplus_delay_minutes=5))
    opts = {CONF_HP_SERVICE_ON: {"action": "switch.turn_on"}}
    with patch.object(dt_util, "now", return_value=NOON):
        asyncio.run(c._async_control_hp(_state(), opts, None))
        assert c._hp_running is False
        c._hp_surplus_since -= timedelta(minutes=6)

        async def _svc(_service):
            c.service_calls.append(("svc", "on", {}))

        c._call_generic_service = _svc
        asyncio.run(c._async_control_hp(_state(), opts, None))
    assert c._hp_running is True


def test_missing_target_warns_once(caplog):
    c = _Fake(_params())
    asyncio.run(c._async_act_hp(True, {}, _state()))
    asyncio.run(c._async_act_hp(True, {}, _state()))
    assert caplog.text.count("weder Schalter noch Service") == 1
    assert c._hp_running is False
