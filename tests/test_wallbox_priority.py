"""Wallbox-Vorrang: Überschuss zuerst ans wartende Auto, Rest in den Akku."""
from datetime import datetime, timedelta, timezone

from custom_components.e3dc_maestro.const import PHASE_CORRIDOR, PHASE_EMERGENCY, PHASE_GRID_CHARGE
from custom_components.e3dc_maestro.control_engine import (
    MaestroDecision,
    MaestroParams,
    MaestroState,
    _apply_wallbox_priority,
    decide,
    wallbox_waiting_state,
)

NOW = datetime(2026, 11, 15, 9, 51, tzinfo=timezone.utc)


def _params(**kw) -> MaestroParams:
    base = dict(
        wallbox_enabled=True,
        wallbox_priority_enabled=True,
        wallbox_phases=1,
        wallbox_max_current=16,
        min_charge_power=300,
    )
    base.update(kw)
    return MaestroParams(**base)


def _state(**kw) -> MaestroState:
    base = dict(
        soc=36, pv_power=4500, house_power=2300, grid_power=350,
        battery_power=1850, wallbox_waiting=True,
    )
    base.update(kw)
    return MaestroState(**base)


def _dec(phase=PHASE_CORRIDOR, limit=1881.0) -> MaestroDecision:
    return MaestroDecision(phase=phase, reason="Test", charge_power_limit=limit)


def test_caps_battery_so_car_gets_surplus():
    out = _apply_wallbox_priority(_dec(), _state(), _params())
    # 4500 - 2300 - 3680 < 0 → Akku bekommt nichts, Auto den ganzen Überschuss
    assert out.charge_power_limit == 0.0
    assert "Wallbox-Vorrang" in out.reason
    assert any(g.name == "post.wallbox_priority" for g in out.trace.gates)


def test_battery_keeps_surplus_above_wallbox_max():
    out = _apply_wallbox_priority(_dec(limit=4500), _state(pv_power=8000), _params())
    assert out.charge_power_limit == 8000 - 2300 - 3680


def test_disabled_or_not_waiting_is_noop():
    d = _dec()
    assert _apply_wallbox_priority(d, _state(), _params(wallbox_priority_enabled=False)) is d
    assert _apply_wallbox_priority(d, _state(wallbox_waiting=False), _params()) is d
    assert _apply_wallbox_priority(d, _state(), _params(wallbox_enabled=False)) is d


def test_low_soc_gives_battery_priority():
    d = _dec()
    assert _apply_wallbox_priority(d, _state(soc=15), _params()) is d


def test_safety_and_grid_phases_untouched():
    for phase in (PHASE_EMERGENCY, PHASE_GRID_CHARGE):
        d = _dec(phase=phase)
        assert _apply_wallbox_priority(d, _state(), _params()) is d


def test_existing_lower_limit_is_kept():
    d = _dec(limit=0.0)
    assert _apply_wallbox_priority(d, _state(), _params()) is d


def test_decide_applies_priority_in_corridor():
    s = _state()
    off = decide(s, _params(wallbox_priority_enabled=False), NOW)
    on = decide(s, _params(), NOW)
    if off.phase == PHASE_CORRIDOR and (off.charge_power_limit or 0) > 0:
        assert on.charge_power_limit == 0.0


def test_waiting_state():
    p = _params()
    # lädt → wartend/aktiv
    assert wallbox_waiting_state(
        plugged=True, wallbox_power=1500, free_surplus_w=0, params=p, idle_since=None, now=NOW
    ) == (True, None)
    # nicht angesteckt → nein
    assert wallbox_waiting_state(
        plugged=False, wallbox_power=0, free_surplus_w=3000, params=p, idle_since=None, now=NOW
    ) == (False, None)
    # keine Steckererkennung → nur beim Laden
    assert wallbox_waiting_state(
        plugged=None, wallbox_power=0, free_surplus_w=0, params=p, idle_since=None, now=NOW
    ) == (False, None)
    # angesteckt, zu wenig Überschuss → wartet
    assert wallbox_waiting_state(
        plugged=True, wallbox_power=0, free_surplus_w=500, params=p, idle_since=None, now=NOW
    ) == (True, None)
    # Überschuss da, Auto zieht nichts: erst Timer, dann aufgeben
    waiting, since = wallbox_waiting_state(
        plugged=True, wallbox_power=0, free_surplus_w=2000, params=p, idle_since=None, now=NOW
    )
    assert waiting and since == NOW
    waiting, since2 = wallbox_waiting_state(
        plugged=True, wallbox_power=0, free_surplus_w=2000, params=p,
        idle_since=since, now=NOW + timedelta(minutes=11),
    )
    assert not waiting and since2 == since
