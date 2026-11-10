"""Guards for daily energy counters that reset around midnight.

Home Assistant treats a drop on ``state_class=total_increasing`` as a meter
reset and *adds* the new value to long-term statistics. Maestro's combined
PV-today sensor (main RSCP day counter + additional producers) must therefore
never publish a partial drop such as ``main+extra → main`` while the native
day counters still hold yesterday's totals.
"""
from __future__ import annotations

from datetime import timedelta

# Wait this long after the local date change for the main PV day meter to fall.
PV_NATIVE_RESET_GRACE = timedelta(minutes=15)
# Main day counter must fall by more than this to count as a real reset.
PV_NATIVE_RESET_EPS_KWH = 0.05
# Single coordinator tick: reject wallbox "today" jumps above this (kWh).
WALLBOX_ENERGY_JUMP_KWH = 500.0


def pv_main_has_reset(
    main_now: float | None,
    main_end: float | None,
    *,
    eps: float = PV_NATIVE_RESET_EPS_KWH,
) -> bool:
    """True when there is nothing to wait for, or the day counter has reset."""
    if main_end is None or main_end <= eps:
        return True
    if main_now is None:
        return False
    return main_now < main_end - eps


def clamp_wallbox_today_kwh(
    prev: float,
    new: float,
    *,
    max_jump: float = WALLBOX_ENERGY_JUMP_KWH,
) -> float:
    """Keep the previous today value when a single tick jumps impossibly far."""
    if new - prev > max_jump:
        return max(0.0, prev)
    return max(0.0, new)
