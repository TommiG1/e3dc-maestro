"""Netzladung-Strategie: eine Auswahl, abgebildet auf die bestehenden Schalter.

Pure Python (no Home Assistant imports) so it can be unit-tested.
"""
from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from .const import (
    CONF_DYNAMIC_TARIFF_ENABLED,
    CONF_GRID_CHARGE_STRATEGY,
    CONF_LOW_SLOT_GRID_CHARGE_ENABLED,
    CONF_PRICE_PLAN_ACTIVE,
    CONF_PRICE_PLAN_ENABLED,
    GRID_CHARGE_OFF,
    GRID_CHARGE_PLAN_AUTO,
    GRID_CHARGE_PLAN_EXPERT,
    GRID_CHARGE_SLOTS,
    GRID_CHARGE_STRATEGIES,
    GRID_CHARGE_THRESHOLD,
)

_PLAN = (GRID_CHARGE_PLAN_AUTO, GRID_CHARGE_PLAN_EXPERT)

# Feste Werte im automatischen Modus. Der Wirkungsgrad bleibt drin: ohne ihn
# lädt der Plan für 30 ct, um später 31 ct zu sparen.
AUTO_EFFICIENCY = 0.90
AUTO_MIN_SPREAD = 0.03
AUTO_SAFETY_FACTOR = 1.15


@dataclass(frozen=True)
class PlanTuning:
    efficiency: float
    min_spread: float
    safety_factor: float
    wear_eur_per_kwh: float | None  # None = aus Anschaffungskosten und Zyklen


def current_strategy(params: Any) -> str:
    """Strategie aus den Schaltern. Der Preisplan hat Vorrang vor der Slot-Regel."""
    if getattr(params, "price_plan_enabled", False):
        stored = getattr(params, "grid_charge_strategy", "")
        return GRID_CHARGE_PLAN_AUTO if stored == GRID_CHARGE_PLAN_AUTO else GRID_CHARGE_PLAN_EXPERT
    if getattr(params, "low_slot_grid_charge_enabled", False):
        if getattr(params, "dynamic_tariff_enabled", False):
            return GRID_CHARGE_THRESHOLD
        return GRID_CHARGE_SLOTS
    return GRID_CHARGE_OFF


def strategy_updates(strategy: str, params: Any) -> dict[str, Any]:
    """Options, die für ``strategy`` gesetzt werden. Unbekannte Werte ergeben ``{}``."""
    if strategy not in GRID_CHARGE_STRATEGIES:
        return {}
    plan = strategy in _PLAN
    # tariff_mode stays with the user: it is the real contract (fixed vs dynamic)
    # and drives cost accounting. Strategies must not overwrite it.
    updates: dict[str, Any] = {
        CONF_GRID_CHARGE_STRATEGY: strategy,
        CONF_LOW_SLOT_GRID_CHARGE_ENABLED: strategy in (GRID_CHARGE_SLOTS, GRID_CHARGE_THRESHOLD),
        CONF_PRICE_PLAN_ENABLED: plan,
    }
    # Beim Wechsel in den Preisplan erst einmal nur anzeigen; zwischen den
    # beiden Plan-Stufen bleibt die Steuerung, wie sie war.
    if not plan or current_strategy(params) not in _PLAN:
        updates[CONF_PRICE_PLAN_ACTIVE] = False
    if strategy == GRID_CHARGE_SLOTS:
        updates[CONF_DYNAMIC_TARIFF_ENABLED] = False
    elif strategy != GRID_CHARGE_OFF:
        updates[CONF_DYNAMIC_TARIFF_ENABLED] = True
    return updates


def plan_tuning(params: Any) -> PlanTuning:
    """Werte, mit denen der Preisplan rechnet."""
    if current_strategy(params) == GRID_CHARGE_PLAN_AUTO:
        return PlanTuning(AUTO_EFFICIENCY, AUTO_MIN_SPREAD, AUTO_SAFETY_FACTOR, 0.0)
    return PlanTuning(
        float(params.price_plan_efficiency),
        float(params.price_plan_min_spread),
        float(params.price_plan_safety_factor),
        None,
    )
