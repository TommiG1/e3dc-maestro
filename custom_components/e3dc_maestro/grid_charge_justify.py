"""Which grid→battery energy is intentional on a fixed tariff."""
from __future__ import annotations

from typing import Any

from .const import (
    PHASE_CURTAILMENT_GUARD,
    PHASE_EMERGENCY,
    PHASE_FEED_IN_LIMIT,
    PHASE_RESERVE_PROTECTION,
    TARIFF_MODE_FIXED,
    UNJUSTIFIED_GRID_CHARGE_THRESHOLD_KWH,
)

# Phases that may draw from the grid into the battery even with tariff_mode=fixed.
JUSTIFIED_GRID_CHARGE_PHASES: frozenset[str] = frozenset(
    {
        PHASE_RESERVE_PROTECTION,
        PHASE_EMERGENCY,
        PHASE_CURTAILMENT_GUARD,
        PHASE_FEED_IN_LIMIT,
    }
)

_PHASE_REASON: dict[str, str] = {
    PHASE_RESERVE_PROTECTION: "reserve",
    PHASE_EMERGENCY: "emergency",
    PHASE_CURTAILMENT_GUARD: "curtailment",
    PHASE_FEED_IN_LIMIT: "feed_in_limit",
}


def unjustified_grid_charge_kwh(*, total_kwh: float, justified_kwh: float) -> float:
    """Grid→battery energy that lacks a justified phase attribution."""
    return round(max(0.0, float(total_kwh) - float(justified_kwh)), 3)


def is_unjustified_grid_charge(
    *,
    tariff_mode: str,
    total_kwh: float,
    justified_kwh: float,
    last_phase: str | None,
    threshold_kwh: float = UNJUSTIFIED_GRID_CHARGE_THRESHOLD_KWH,
) -> bool:
    """True only for leftover grid→battery on a fixed tariff without a live justified phase."""
    if tariff_mode != TARIFF_MODE_FIXED:
        return False
    if last_phase in JUSTIFIED_GRID_CHARGE_PHASES:
        return False
    return unjustified_grid_charge_kwh(total_kwh=total_kwh, justified_kwh=justified_kwh) > threshold_kwh


def grid_to_battery_charge_attrs(
    *,
    total_kwh: float,
    justified_kwh: float,
    last_phase: str | None,
    tariff_mode: str,
    threshold_kwh: float = UNJUSTIFIED_GRID_CHARGE_THRESHOLD_KWH,
    fixed_reserve_enabled: bool = False,
    seasonal_reserve_enabled: bool = False,
) -> dict[str, Any]:
    """Attributes for the Netz→Akku sensor / problem binary sensor."""
    unjust = unjustified_grid_charge_kwh(total_kwh=total_kwh, justified_kwh=justified_kwh)
    if last_phase in _PHASE_REASON:
        reason: str | None = _PHASE_REASON[last_phase]
    elif is_unjustified_grid_charge(
        tariff_mode=tariff_mode,
        total_kwh=total_kwh,
        justified_kwh=justified_kwh,
        last_phase=last_phase,
        threshold_kwh=threshold_kwh,
    ):
        reason = "unjustified"
    elif justified_kwh > 0 and unjust <= threshold_kwh:
        # Prefer a concrete label once the day's G→B was intentional reserve.
        if fixed_reserve_enabled or seasonal_reserve_enabled:
            reason = "reserve"
        else:
            reason = "justified"
    else:
        reason = None
    return {
        "justified_kwh": round(float(justified_kwh), 3),
        "unjustified_kwh": round(unjust, 3),
        "charge_reason": reason,
    }