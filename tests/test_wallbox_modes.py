"""Wallbox-Lademodi: solar, solar_grid, now, off + Akku-Schutz bei Netzladung."""
from datetime import datetime, timezone

from custom_components.e3dc_maestro.const import PHASE_GRID_CHARGE
from custom_components.e3dc_maestro.control_engine import (
    WALLBOX_MODES,
    MaestroDecision,
    MaestroParams,
    MaestroState,
    PricePlanAction,
    _apply_wallbox_grid_battery_cap,
    _apply_wallbox_priority,
    decide,
    price_plan_charge_slot,
    wallbox_desired_current,
    wallbox_grid_cheap,
    wallbox_status,
    wallbox_target,
)

NOW = datetime(2026, 11, 15, 9, 51, tzinfo=timezone.utc)
SLOT = PricePlanAction(charge_now=True, target_soc=80.0)


def _params(**kw) -> MaestroParams:
    base = dict(
        wallbox_enabled=True, wallbox_phases=1, wallbox_max_current=16,
        wallbox_min_current=6, min_charge_power=300, max_charge_power=3000,
    )
    base.update(kw)
    return MaestroParams(**base)


def _state(**kw) -> MaestroState:
    base = dict(soc=50, pv_power=500, house_power=800, grid_power=0, battery_power=0)
    base.update(kw)
    return MaestroState(**base)


def _solar_state(**kw) -> MaestroState:
    return _state(pv_power=6000, house_power=1000, **kw)  # 5000 W Überschuss


def test_modes_constant():
    assert WALLBOX_MODES == ("solar", "solar_grid", "now", "off")


def test_solar_unchanged():
    cur, off = wallbox_desired_current(_solar_state(), _params())
    assert off is False and 13 < cur <= 16
    assert wallbox_desired_current(_state(), _params()) == (None, True)


def test_unknown_mode_is_solar():
    assert wallbox_desired_current(_state(), _params(wallbox_mode="quatsch")) == (None, True)


def test_now_ignores_surplus_and_price():
    t = wallbox_target(_state(), _params(wallbox_mode="now"), current_price=9.0)
    assert (t.current, t.turn_off, t.from_grid) == (16.0, False, True)


def test_off_and_disabled():
    for p in (_params(wallbox_mode="off"), _params(wallbox_enabled=False, wallbox_mode="now")):
        t = wallbox_target(_solar_state(), p, current_price=0.0, plan_charge_now=True)
        assert (t.current, t.turn_off, t.from_grid) == (None, False, False)
        assert t.reason == "Aus: Maestro steuert die Wallbox nicht"


def test_solar_grid_price_equal_limit_is_cheap():
    p = _params(wallbox_mode="solar_grid", wallbox_max_price=0.28)
    assert wallbox_desired_current(_state(), p, current_price=0.28) == (16.0, False)
    assert wallbox_target(_state(), p, current_price=0.28).from_grid


def test_solar_grid_above_limit_behaves_like_solar():
    p = _params(wallbox_mode="solar_grid", wallbox_max_price=0.28)
    assert wallbox_desired_current(_state(), p, current_price=0.29) == (None, True)
    t = wallbox_target(_solar_state(), p, current_price=0.29)
    assert not t.from_grid and t.current < 16.0 + 1e-9


def test_solar_grid_plan_slot_without_price():
    p = _params(wallbox_mode="solar_grid")
    t = wallbox_target(_state(), p, plan_charge_now=True)
    assert (t.current, t.from_grid) == (16.0, True)
    assert t.reason == "Solar + Netz: Preisplan-Slot, 16 A × 1 Phase"


def test_solar_grid_no_price_no_plan_is_solar():
    p = _params(wallbox_mode="solar_grid", wallbox_max_price=0.28)
    assert wallbox_desired_current(_state(), p) == (None, True)
    assert not wallbox_grid_cheap(p, None, False)


def test_price_plan_charge_slot_freshness():
    on = _params(price_plan_enabled=True, price_plan_active=True)
    assert price_plan_charge_slot(on, SLOT)
    assert not price_plan_charge_slot(on, None)  # veraltet/fehlend
    assert not price_plan_charge_slot(_params(price_plan_enabled=True, price_plan_active=False), SLOT)
    assert not price_plan_charge_slot(_params(price_plan_enabled=False, price_plan_active=True), SLOT)
    assert not price_plan_charge_slot(on, SLOT, curtailment_guard_active=True)
    assert not price_plan_charge_slot(on, PricePlanAction(charge_now=False))


def test_explanations():
    p = _params(wallbox_mode="solar_grid", wallbox_max_price=0.28)
    assert wallbox_target(_state(), p, current_price=0.249).reason == (
        "Solar + Netz: Preis 24,9 ct unter Grenze 28 ct, 16 A × 1 Phase"
    )
    assert wallbox_target(_state(pv_power=2000, house_power=900), _params()).reason == (
        "Solar: Überschuss 1,1 kW unter Start 1,4 kW (1 Phase)"
    )
    assert wallbox_target(_state(), _params(wallbox_mode="now", wallbox_phases=3)).reason == (
        "Sofort: 16 A × 3 Phasen"
    )
    assert wallbox_target(_state(), _params(wallbox_mode="off")).reason == (
        "Aus: Maestro steuert die Wallbox nicht"
    )


def test_status_fields():
    p = _params(wallbox_mode="now")
    st = wallbox_status(_state(), p, plugged=True, set_current=None)
    assert st["wallbox_mode"] == "now" and st["from_grid"] is False  # Auto zieht noch nichts
    st = wallbox_status(_state(wallbox_power=3600), p, plugged=True, set_current=None)
    assert st["from_grid"] is True
    assert st["target_current"] == 16 and st["explanation"].startswith("Sofort")
    plain = wallbox_status(_state(), _params(), plugged=True, set_current=None)
    assert plain["wallbox_mode"] == "solar" and plain["from_grid"] is False
    assert plain["target_current"] is None


def test_priority_only_in_solar_modes():
    st = _state(pv_power=4500, house_power=2300, battery_power=1850, soc=36, wallbox_waiting=True)
    d = MaestroDecision(phase="corridor", reason="T", charge_power_limit=1881.0)
    base = dict(wallbox_priority_enabled=True)
    assert _apply_wallbox_priority(d, st, _params(**base)).charge_power_limit == 0.0
    assert _apply_wallbox_priority(d, st, _params(wallbox_mode="solar_grid", **base)).charge_power_limit == 0.0
    assert _apply_wallbox_priority(d, st, _params(wallbox_mode="now", **base)) is d
    assert _apply_wallbox_priority(d, st, _params(wallbox_mode="off", **base)) is d


# ── Akku-Schutz bei Netzladung ───────────────────────────────────────────────

def _decide(state, params, **kw):
    return decide(state, params, NOW, **kw)


def _charging(**kw) -> MaestroState:
    return _state(soc=60, house_power=800, wallbox_power=3600, **kw)


def test_grid_mode_skips_guard_and_caps_to_house():
    out = _decide(_charging(), _params(wallbox_mode="now"))
    assert out.discharge_power_limit == 800.0
    assert "Wallbox-Netzschutz" not in out.reason
    assert "Wallbox-Netzladung" in out.reason
    assert any(g.name == "post.wallbox_grid_battery_cap" for g in out.trace.gates)


def test_solar_grid_cheap_caps_and_expensive_does_not():
    p = _params(wallbox_mode="solar_grid", wallbox_max_price=0.28)
    cheap = _decide(_charging(), p, current_price=0.20)
    assert cheap.discharge_power_limit == 800.0
    dear = _decide(_charging(), p, current_price=0.40)
    assert dear.discharge_power_limit == 3000.0  # Netzschutz wie bisher
    assert "Wallbox-Netzschutz" in dear.reason


def test_solar_grid_plan_slot_via_decide():
    p = _params(wallbox_mode="solar_grid", price_plan_enabled=True, price_plan_active=True)
    out = _decide(_charging(), p, price_plan=PricePlanAction(charge_now=True))
    assert out.discharge_power_limit == 800.0


def test_battery_to_car_keeps_guard():
    out = _decide(_charging(), _params(wallbox_mode="now", wallbox_battery_to_car=True))
    assert out.discharge_power_limit == 3000.0
    assert "Wallbox-Netzschutz" in out.reason
    assert not any(g.name == "post.wallbox_grid_battery_cap" for g in out.trace.gates)


def test_not_charging_no_cap():
    out = _decide(_state(soc=60, wallbox_power=0), _params(wallbox_mode="now"))
    assert not any(g.name == "post.wallbox_grid_battery_cap" for g in out.trace.gates)


def test_cap_never_raises_lower_limit():
    d = MaestroDecision(phase=PHASE_GRID_CHARGE, reason="T", discharge_power_limit=0.0)
    out = _apply_wallbox_grid_battery_cap(d, _charging(), _params(), grid_mode_active=True)
    assert out is d
    d2 = MaestroDecision(phase="corridor", reason="T", discharge_power_limit=500.0)
    assert _apply_wallbox_grid_battery_cap(d2, _charging(), _params(), grid_mode_active=True) is d2
    d3 = MaestroDecision(phase="corridor", reason="T", discharge_power_limit=None)
    assert _apply_wallbox_grid_battery_cap(
        d3, _charging(), _params(), grid_mode_active=True,
    ).discharge_power_limit == 800.0


def test_cap_keeps_exempt_discharge_phases():
    for phase in ("morning_discharge", "force_discharge"):
        d = MaestroDecision(phase=phase, reason="T", discharge_power_limit=3000.0)
        assert _apply_wallbox_grid_battery_cap(
            d, _charging(), _params(), grid_mode_active=True,
        ) is d
