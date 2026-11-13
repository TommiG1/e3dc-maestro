"""Support dump redaction and shape for panel / GitHub tickets."""
from __future__ import annotations

from types import SimpleNamespace
from unittest.mock import MagicMock

from custom_components.e3dc_maestro.support_dump import build_support_dump, redact_options


def test_redact_options_scrubs_secrets() -> None:
    out = redact_options(
        {
            "grid_power_sensor": "sensor.grid",
            "api_token": "secret",
            "tibber_password": "x",
            "notify_service": "notify.phone",
        }
    )
    assert out["grid_power_sensor"] == "sensor.grid"
    assert out["api_token"] == "**REDACTED**"
    assert out["tibber_password"] == "**REDACTED**"
    assert out["notify_service"] == "**REDACTED**"


def test_build_support_dump_includes_debug_log() -> None:
    hass = MagicMock()
    entry = SimpleNamespace(
        title="Maestro",
        entry_id="abc",
        version=4,
        domain="e3dc_maestro",
        options={"grid_power_sensor": "sensor.grid", "cloud_token": "nope"},
    )
    decision = SimpleNamespace(
        phase="corridor",
        reason="test",
        charge_power_limit=1000,
        discharge_power_limit=2000,
        power_mode="normal",
        target_soc=80,
        target_charge_power=500,
        feed_in_excess_w=0,
        battery_priority=False,
    )
    coordinator = SimpleNamespace(
        regelung_aktiv=True,
        last_phase="corridor",
        last_decision=decision,
        last_sent_charge_limit=1000,
        last_sent_discharge_limit=2000,
        effective_discharge_limit=2000,
        low_yield_coverage=1.0,
        debug_enabled=True,
        debug_log=["line-a", "line-b"],
        last_action_info={"phase": "corridor", "reason": "test"},
        _action_history=[{"phase": "idle"}],
        _forecast_pv_source="solcast",
        _params=SimpleNamespace(
            auto_mode_enabled=False,
            price_plan_active=False,
            price_plan_enabled=True,
        ),
        _auto_last_run=None,
        _auto_run_failed=False,
        _auto_result=None,
        _last_rscp_act_ok=True,
        _consecutive_failures=0,
        _consecutive_rscp_failures=0,
    )
    dump = build_support_dump(hass, entry, coordinator)
    assert dump["integration_version"]
    assert dump["ha_version"]  # from homeassistant.const
    assert dump["options"]["cloud_token"] == "**REDACTED**"
    assert dump["options"]["grid_power_sensor"] == "sensor.grid"
    assert dump["debug_log"] == ["line-a", "line-b"]
    assert dump["coordinator"]["last_decision"]["phase"] == "corridor"
    assert dump["action_history"] == [{"phase": "idle"}]


def test_price_plan_dump_has_rows_and_pv_sources() -> None:
    from datetime import datetime, timezone

    from custom_components.e3dc_maestro.price_plan_runner import PricePlanSnapshot
    from custom_components.e3dc_maestro.support_dump import price_plan_dump

    assert price_plan_dump(None, None) is None
    now = datetime(2026, 11, 13, 12, 0, tzinfo=timezone.utc)
    snap = PricePlanSnapshot(
        "ok", "Preisplan: 5.0 kWh Netzladung geplant", computed_at=now,
        rows=[{"start_local": "12:00", "pv_kwh": 0.2, "consumption_kwh": 0.3}],
        floor_pct=0.0, ceiling_pct=95.0, safety_factor=1.15,
    )
    out = price_plan_dump(snap, {"today": False, "tomorrow": False, "history": True})
    assert out["computed_at"] == now.isoformat()
    assert out["known_until"] is None
    assert out["pv_profile_found"] == {"today": False, "tomorrow": False, "history": True}
    assert out["rows"][0]["pv_kwh"] == 0.2
    assert out["ceiling_pct"] == 95.0
