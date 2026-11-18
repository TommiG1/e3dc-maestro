"""Wallbox-Regelung: Start-Schwelle, Netzschutz-Ausnahmen und Ansteuerung."""
from __future__ import annotations

import asyncio
from collections import deque
from dataclasses import replace
from datetime import timedelta
from types import SimpleNamespace
from unittest.mock import patch

from custom_components.e3dc_maestro import coordinator_act
from custom_components.e3dc_maestro.const import (
    CONF_WALLBOX_CURRENT_ENTITY,
    CONF_WALLBOX_SERVICE_OFF,
    CONF_WALLBOX_SERVICE_ON,
    CONF_WALLBOX_TYPE,
    E3DC_RSCP_DOMAIN,
    PHASE_GRID_CHARGE,
    PHASE_GRID_HOLD,
    PHASE_HT_PROTECTION,
    PHASE_IDLE,
    SERVICE_SET_WALLBOX_CURRENT,
    WALLBOX_TYPE_E3DC,
    WALLBOX_TYPE_GENERIC,
)
from custom_components.e3dc_maestro.control_engine import (
    MaestroDecision,
    MaestroParams,
    MaestroState,
    _apply_wallbox_discharge_guard,
    wallbox_desired_current,
    wallbox_start_surplus_w,
    wallbox_status,
)
from custom_components.e3dc_maestro.coordinator_act import CoordinatorActMixin, dt_util


def _params(**kw) -> MaestroParams:
    base = dict(wallbox_enabled=True, wallbox_phases=3, wallbox_min_current=6,
                wallbox_max_current=16, wallbox_min_surplus=1400)
    base.update(kw)
    return MaestroParams(**base)


def _state(pv: float, house: float = 500.0, **kw) -> MaestroState:
    return MaestroState(soc=60, pv_power=pv, house_power=house, grid_power=0,
                        battery_power=0, **kw)


# ── Start-Schwelle ────────────────────────────────────────────────────────

def test_start_surplus_covers_min_current_power():
    assert wallbox_start_surplus_w(_params()) == 6 * 230 * 3
    assert wallbox_start_surplus_w(_params(wallbox_phases=1)) == 1400
    assert wallbox_start_surplus_w(_params(wallbox_min_surplus=5000)) == 5000


def test_three_phase_stays_off_below_min_current_power():
    # 2 kW Überschuss reichen nicht für 6 A × 3 Phasen (~4,1 kW).
    assert wallbox_desired_current(_state(2500), _params()) == (None, True)
    current, off = wallbox_desired_current(_state(4700), _params())
    assert not off and int(current) == 6


# ── Status fürs Panel ─────────────────────────────────────────────────────

def test_status_modes():
    p = _params()
    mode = lambda s, plugged: wallbox_status(s, p, plugged=plugged, set_current=None)["mode"]
    assert mode(_state(6000, wallbox_power=4000), None) == "charging"
    assert mode(_state(6000), False) == "unplugged"
    assert mode(_state(2000, wallbox_waiting=True), True) == "waiting"
    assert mode(_state(6000, wallbox_waiting=True), True) == "ready"
    assert mode(_state(6000, wallbox_waiting=False), True) == "full"
    assert mode(_state(2000), None) == "idle"


def test_status_numbers():
    st = wallbox_status(_state(6000, wallbox_waiting=True), _params(), plugged=True, set_current=7)
    assert st["surplus_w"] == 5500
    assert st["start_w"] == 4140
    assert st["max_w"] == 16 * 230 * 3
    assert st["target_current"] == 7 and st["set_current"] == 7
    off = wallbox_status(_state(6000), replace(_params(), wallbox_enabled=False), plugged=None, set_current=None)
    assert off["control_enabled"] is False and off["target_current"] is None


# ── Netzschutz ────────────────────────────────────────────────────────────

def test_discharge_guard_keeps_tariff_phases():
    p = _params(wallbox_discharge_guard_enabled=True, wallbox_discharge_guard_threshold_w=1000)
    s = _state(0, wallbox_power=11000)
    for phase in (PHASE_GRID_HOLD, PHASE_HT_PROTECTION, PHASE_GRID_CHARGE):
        d = MaestroDecision(phase=phase, reason="t", discharge_power_limit=0.0)
        assert _apply_wallbox_discharge_guard(d, s, p) is d
    idle = MaestroDecision(phase=PHASE_IDLE, reason="t", discharge_power_limit=0.0)
    assert _apply_wallbox_discharge_guard(idle, s, p).discharge_power_limit == p.max_charge_power


def test_discharge_guard_uses_discharge_ceiling():
    p = _params(wallbox_discharge_guard_enabled=True, wallbox_discharge_guard_threshold_w=1000,
                max_charge_power=500, max_discharge_power=3000)
    idle = MaestroDecision(phase=PHASE_IDLE, reason="t", discharge_power_limit=0.0)
    assert _apply_wallbox_discharge_guard(idle, _state(0, wallbox_power=11000), p).discharge_power_limit == 3000


# ── Ansteuerung ───────────────────────────────────────────────────────────

class _Fake(CoordinatorActMixin):
    def __init__(self, states: dict[str, str] | None = None, fail: bool = False):
        self._params = _params()
        self._last_wallbox_current = None
        self._e3dc_wallbox = None
        self._wallbox_toggled_at = None
        self._wallbox_retry_after = None
        self._wallbox_below_since = None
        self._wallbox_history = deque(maxlen=30)
        self._e3dc_device_id = "hub"
        self._consecutive_rscp_failures = 0
        self._rscp_watchdog_notified = False
        self.calls: list[tuple[str, str, dict]] = []
        self.logs: list[str] = []
        st = {k: SimpleNamespace(state=v) for k, v in (states or {}).items()}

        async def _call(domain, service, data, blocking=False):
            if fail:
                raise asyncio.TimeoutError
            self.calls.append((domain, service, data))

        self.hass = SimpleNamespace(
            states=SimpleNamespace(get=st.get),
            services=SimpleNamespace(async_call=_call),
        )

    def _log(self, msg: str) -> None:
        self.logs.append(msg)


def _registry():
    def ent(entity_id, key, device="wb1"):
        return SimpleNamespace(entity_id=entity_id, platform=E3DC_RSCP_DOMAIN, disabled_by=None,
                               device_id=device, translation_key=key)
    entities = {
        "a": ent("sensor.soc", "battery-soc", device="hub"),
        "b": ent("button.wb_toggle", "wallbox-toggle-wallbox-charging"),
        "c": ent("binary_sensor.wb_canceled", "wallbox-charging-canceled"),
    }
    return SimpleNamespace(entities=entities)


def _run(c: _Fake, state: MaestroState, opts: dict) -> None:
    with patch.object(coordinator_act.er, "async_get", return_value=_registry(), create=True):
        asyncio.run(c._async_act_wallbox(state, opts))


E3DC = {CONF_WALLBOX_TYPE: WALLBOX_TYPE_E3DC}


def test_e3dc_sets_current_on_wallbox_device():
    c = _Fake({"binary_sensor.wb_canceled": "off"})
    _run(c, _state(6000), E3DC)
    assert c.calls == [(E3DC_RSCP_DOMAIN, SERVICE_SET_WALLBOX_CURRENT,
                        {"device_id": "wb1", "max_charge_current": 7})]
    assert c._last_wallbox_current is not None


def test_e3dc_resumes_canceled_charging():
    c = _Fake({"binary_sensor.wb_canceled": "on"})
    _run(c, _state(6000), E3DC)
    assert c.calls[-1] == ("button", "press", {"entity_id": "button.wb_toggle"})


def test_e3dc_stop_uses_toggle_once():
    c = _Fake({"binary_sensor.wb_canceled": "off"})
    _run(c, _state(1000), E3DC)
    assert c.calls == [("button", "press", {"entity_id": "button.wb_toggle"})]
    assert c._last_wallbox_current == 0
    _run(c, _state(1000), E3DC)
    assert len(c.calls) == 1
    assert [e["kind"] for e in c._wallbox_history] == ["stop"]


def test_stop_waits_for_hysteresis_while_on():
    c = _Fake({"binary_sensor.wb_canceled": "off"})
    c._last_wallbox_current = 7
    _run(c, _state(1000), E3DC)  # erster Tick unter Schwelle: nur Zeit merken
    assert c.calls == [] and c._last_wallbox_current == 7
    assert c._wallbox_below_since is not None
    c._wallbox_below_since = dt_util.utcnow() - timedelta(seconds=30)
    _run(c, _state(1000), E3DC)
    assert c.calls == [] and c._last_wallbox_current == 7
    c._wallbox_below_since = dt_util.utcnow() - timedelta(seconds=120)
    _run(c, _state(1000), E3DC)
    assert c.calls == [("button", "press", {"entity_id": "button.wb_toggle"})]
    assert c._last_wallbox_current == 0 and c._wallbox_below_since is None


def test_surplus_recovery_resets_stop_hold():
    c = _Fake({"binary_sensor.wb_canceled": "off"})
    c._last_wallbox_current = 7
    c._wallbox_below_since = dt_util.utcnow() - timedelta(seconds=100)
    _run(c, _state(4700), E3DC)  # Überschuss wieder da
    assert c._wallbox_below_since is None


def test_history_records_start_change_and_single_error():
    c = _Fake({"binary_sensor.wb_canceled": "off"})
    _run(c, _state(6000), E3DC)
    _run(c, _state(9000), E3DC)
    assert [(e["kind"], e.get("current")) for e in c._wallbox_history] == [("current", 12), ("start", 7)]
    f = _Fake({"binary_sensor.wb_canceled": "off"}, fail=True)
    _run(f, _state(6000), E3DC)
    f._wallbox_retry_after = dt_util.utcnow() - timedelta(seconds=1)
    _run(f, _state(6000), E3DC)
    assert [e["kind"] for e in f._wallbox_history] == ["error"]


def test_e3dc_stop_skips_toggle_when_already_canceled():
    c = _Fake({"binary_sensor.wb_canceled": "on"})
    _run(c, _state(1000), E3DC)
    assert c.calls == []
    assert c._last_wallbox_current == 0


def test_e3dc_toggle_cooldown_prevents_double_press():
    c = _Fake({"binary_sensor.wb_canceled": "on"})
    c._wallbox_toggled_at = dt_util.utcnow()
    c._last_wallbox_current = 0
    _run(c, _state(6000), E3DC)
    assert ("button", "press", {"entity_id": "button.wb_toggle"}) not in c.calls
    assert c._last_wallbox_current == 0


def test_e3dc_failure_backs_off_without_rscp_watchdog():
    c = _Fake({"binary_sensor.wb_canceled": "off"}, fail=True)
    _run(c, _state(6000), E3DC)
    assert c._consecutive_rscp_failures == 0
    assert c._wallbox_retry_after is not None
    c.hass.services.async_call = None  # würde bei erneutem Aufruf crashen
    _run(c, _state(6000), E3DC)
    assert c._wallbox_retry_after > dt_util.utcnow() + timedelta(seconds=60)


def test_generic_sets_current_entity_and_turns_on_once():
    opts = {
        CONF_WALLBOX_TYPE: WALLBOX_TYPE_GENERIC,
        CONF_WALLBOX_CURRENT_ENTITY: "number.goe_current",
        CONF_WALLBOX_SERVICE_ON: {"action": "switch.turn_on", "target": {"entity_id": "switch.goe"}},
    }
    c = _Fake()
    _run(c, _state(6000), opts)
    assert c.calls == [
        ("number", "set_value", {"entity_id": "number.goe_current", "value": 7}),
        ("switch", "turn_on", {"entity_id": "switch.goe"}),
    ]
    _run(c, _state(9000), opts)
    assert c.calls[-1] == ("number", "set_value", {"entity_id": "number.goe_current", "value": 12})
    assert len(c.calls) == 3


def test_generic_off_runs_action_selector_list():
    opts = {
        CONF_WALLBOX_TYPE: WALLBOX_TYPE_GENERIC,
        CONF_WALLBOX_SERVICE_OFF: [
            {"action": "switch.turn_off", "target": {"entity_id": "switch.goe"}, "data": {}},
        ],
    }
    c = _Fake()
    _run(c, _state(1000), opts)
    assert c.calls == [("switch", "turn_off", {"entity_id": "switch.goe"})]
    assert c._last_wallbox_current == 0


def test_generic_service_formats():
    c = _Fake()
    asyncio.run(c._call_generic_service("switch.turn_on"))
    asyncio.run(c._call_generic_service({"domain": "switch", "service": "turn_off", "data": {"entity_id": "switch.x"}}))
    assert c.calls == [("switch", "turn_on", {}), ("switch", "turn_off", {"entity_id": "switch.x"})]
