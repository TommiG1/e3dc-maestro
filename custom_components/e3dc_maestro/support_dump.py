"""Build a redacted support dump for GitHub issues / panel download."""
from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import __version__ as HA_VERSION
from homeassistant.core import HomeAssistant

from .const import DOMAIN, VERSION


def redact_options(options: dict[str, Any]) -> dict[str, Any]:
    """Copy options and scrub tokens, passwords and service payloads."""
    redacted = dict(options)
    for key in list(redacted):
        lowered = key.lower()
        if "service" in lowered or lowered.endswith("_token") or "password" in lowered:
            redacted[key] = "**REDACTED**"
    return redacted


def build_support_dump(
    hass: HomeAssistant,
    entry: ConfigEntry,
    coordinator: Any | None,
) -> dict[str, Any]:
    """Assemble a JSON-serialisable support bundle (no secrets)."""
    data: dict[str, Any] = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "integration_version": VERSION,
        "ha_version": HA_VERSION,
        "domain": DOMAIN,
        "hint": (
            "Attach this file to a GitHub issue. Secrets are redacted; "
            "entity IDs stay for support. Enable Debug logging in the panel "
            "before reproducing if the debug_log section is empty."
        ),
        "entry": {
            "title": entry.title,
            "entry_id": entry.entry_id,
            "version": entry.version,
            "domain": entry.domain,
        },
        "options": redact_options(dict(entry.options)),
        "coordinator": None,
    }
    if coordinator is None:
        return data

    decision = getattr(coordinator, "last_decision", None)
    params = getattr(coordinator, "_params", None)
    auto_result = getattr(coordinator, "_auto_result", None)
    data["coordinator"] = {
        "regelung_aktiv": getattr(coordinator, "regelung_aktiv", None),
        "last_phase": getattr(coordinator, "last_phase", None),
        "forecast_pv_source": getattr(coordinator, "_forecast_pv_source", None),
        "auto_mode_enabled": getattr(params, "auto_mode_enabled", None) if params else None,
        "auto_last_run": (
            coordinator._auto_last_run.isoformat()
            if getattr(coordinator, "_auto_last_run", None)
            else None
        ),
        "auto_run_failed": getattr(coordinator, "_auto_run_failed", False),
        "horizon_hint": getattr(auto_result, "horizon_h", None) if auto_result else None,
        "last_decision": (
            {
                "phase": decision.phase,
                "reason": decision.reason,
                "charge_power_limit": decision.charge_power_limit,
                "discharge_power_limit": decision.discharge_power_limit,
                "power_mode": decision.power_mode,
                "target_soc": getattr(decision, "target_soc", None),
                "target_charge_power": getattr(decision, "target_charge_power", None),
                "feed_in_excess_w": getattr(decision, "feed_in_excess_w", None),
                "battery_priority": getattr(decision, "battery_priority", None),
            }
            if decision
            else None
        ),
        "sent_limits": {
            "charge": getattr(coordinator, "last_sent_charge_limit", None),
            "discharge": getattr(coordinator, "last_sent_discharge_limit", None),
        },
        "effective_discharge_limit": getattr(coordinator, "effective_discharge_limit", None),
        "low_yield_coverage": getattr(coordinator, "low_yield_coverage", None),
        "rscp_ok": getattr(coordinator, "_last_rscp_act_ok", None),
        "consecutive_failures": getattr(coordinator, "_consecutive_failures", None),
        "consecutive_rscp_failures": getattr(coordinator, "_consecutive_rscp_failures", None),
        "debug_enabled": bool(getattr(coordinator, "debug_enabled", False)),
        "price_plan_active": bool(getattr(params, "price_plan_active", False)) if params else None,
        "price_plan_enabled": bool(getattr(params, "price_plan_enabled", False)) if params else None,
    }
    data["debug_log"] = list(getattr(coordinator, "debug_log", []) or [])
    data["last_action"] = dict(getattr(coordinator, "last_action_info", {}) or {})
    data["action_history"] = list(getattr(coordinator, "_action_history", []) or [])
    return data
