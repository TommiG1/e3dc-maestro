"""Buy-price selection for daily cost / PV-savings counters.

Real counters use the fixed buy price unless the installation is fully on a
dynamic tariff (``tariff_mode == dynamic`` and dynamic evaluation enabled with
a live price). In the fixed / simulation case a live dynamic price is returned
separately so the panel can show both.
"""
from __future__ import annotations

from .const import DEFAULT_FIXED_BUY_PRICE, TARIFF_MODE_DYNAMIC


def buy_prices_for_stats(
    *,
    tariff_mode: str,
    dynamic_tariff_enabled: bool,
    fixed_buy_price: float,
    current_price: float | None,
) -> tuple[float, float | None]:
    """Return ``(billing_price, simulation_price_or_none)``.

    ``simulation_price`` is set only while billing stays on the fixed price and
    a dynamic price is available — i.e. dynamic-tariff simulation.
    """
    fixed = float(fixed_buy_price) if fixed_buy_price is not None else DEFAULT_FIXED_BUY_PRICE
    has_dynamic = isinstance(current_price, (int, float)) and float(current_price) == float(current_price)
    dynamic = float(current_price) if has_dynamic else None
    bill_dynamic = bool(dynamic_tariff_enabled) and tariff_mode == TARIFF_MODE_DYNAMIC and dynamic is not None
    if bill_dynamic:
        return dynamic, None
    return fixed, dynamic


def simulation_comparable(real: float, sim: float) -> bool:
    """True once sim and real cover a comparable stretch of the day.

    After a mid-day deploy the sim counters start at 0 while restored real
    counters already hold the full day — a delta would be meaningless.
    """
    if abs(real) < 0.05 and abs(sim) < 0.05:
        return True
    if abs(real) < 0.05:
        return abs(sim) >= 0.01
    return abs(sim) >= 0.25 * abs(real)
