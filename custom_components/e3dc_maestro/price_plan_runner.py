"""Glue between live data (price curve, profiles, params) and the price planner.

Pure Python (no Home Assistant imports) so it can be unit-tested.
"""
from __future__ import annotations

import datetime as _dt
import math
from dataclasses import dataclass, field
from typing import Any, Sequence

from .control_price_plan import PricePlan, plan_price_charging
from .price_curve import PriceHorizon

# Konservativer PV-Abschlag auf Prognosen (Wolken, Prognosefehler).
PV_SAFETY_FACTOR = 0.8
# Ohne Prognose für morgen wird das historische Mittel nochmals abgeschwächt.
PV_HISTORIC_FACTOR = 0.7
# Restwert am Horizontende: günstigster Preis der letzten Stunden der Kurve,
# Bedarf bis zur ersten PV-Deckung danach (höchstens einen Tag).
TERMINAL_PRICE_HOURS = 4.0
TERMINAL_STEP_H = 0.25
TERMINAL_MAX_H = 24.0

STATUS_OK = "ok"
STATUS_NO_PRICES = "no_prices"
STATUS_NO_PROFILE = "no_profile"
STATUS_NO_ROOM = "no_room"


@dataclass
class PricePlanSnapshot:
    status: str
    message: str
    computed_at: _dt.datetime | None = None
    plan: PricePlan | None = None
    rows: list[dict[str, Any]] = field(default_factory=list)
    known_until: _dt.datetime | None = None
    provider_until: _dt.datetime | None = None
    floor_pct: float | None = None
    ceiling_pct: float | None = None
    efficiency: float | None = None
    min_spread: float | None = None
    wear_eur_per_kwh: float | None = None
    safety_factor: float | None = None
    terminal_need_kwh: float | None = None
    terminal_price: float | None = None
    # Eingangs- und Bilanzwerte für den Support-Dump (Fehlersuche).
    diagnostics: dict[str, Any] = field(default_factory=dict)

    @property
    def summary(self) -> str:
        """Short state text for the sensor."""
        if self.status != STATUS_OK or self.plan is None:
            return {
                STATUS_NO_PRICES: "keine Preise",
                STATUS_NO_PROFILE: "keine Verbrauchsdaten",
                STATUS_NO_ROOM: "kein Spielraum",
            }.get(self.status, "unbekannt")
        plan = self.plan
        if plan.charge_now:
            return "Netzladung jetzt"
        first_charge = next((r for r in self.rows if r["grid_charge_kwh"] > 0), None)
        if first_charge is not None:
            return f"Netzladung ab {first_charge['start_local']}"
        if plan.hold_now:
            return "Entladung halten"
        first_hold = next((r for r in self.rows if r["hold"]), None)
        if first_hold is not None:
            return f"Halten ab {first_hold['start_local']}"
        return "kein Handlungsbedarf"


def profile_w_at(profile_w: Sequence[float] | None, when: _dt.datetime) -> float:
    """Mean power (W) at ``when`` from a profile in UTC buckets (24 / 48 / 96 values)."""
    if not profile_w:
        return 0.0
    utc = when.astimezone(_dt.timezone.utc)
    minutes = utc.hour * 60 + utc.minute
    idx = int(minutes / (1440.0 / len(profile_w)))
    return float(profile_w[min(idx, len(profile_w) - 1)])


def _slot_kwh(profile_w: Sequence[float] | None, start: _dt.datetime, hours: float) -> float:
    mid = start + _dt.timedelta(hours=hours / 2.0)
    return max(0.0, profile_w_at(profile_w, mid)) / 1000.0 * hours


def terminal_price(horizon: PriceHorizon) -> float:
    """Günstigster Preis in den letzten ``TERMINAL_PRICE_HOURS`` der Kurve."""
    tail: list[float] = []
    hours = 0.0
    for h, price in zip(reversed(horizon.slot_hours), reversed(horizon.prices)):
        if hours >= TERMINAL_PRICE_HOURS:
            break
        tail.append(price)
        hours += h
    return max(0.0, min(tail)) if tail else 0.0


def compute_price_plan(
    *,
    horizon: PriceHorizon | None,
    now: _dt.datetime,
    soc_pct: float,
    capacity_kwh: float,
    floor_pct: float,
    ceiling_pct: float,
    max_charge_kw: float,
    max_discharge_kw: float | None,
    efficiency: float,
    min_spread: float,
    safety_factor: float,
    wear_eur_per_kwh: float,
    feed_in_price: float,
    cons_profile_w: Sequence[float] | None,
    house_power_w: float,
    pv_today_w: Sequence[float] | None,
    pv_tomorrow_w: Sequence[float] | None,
    pv_hist_w: Sequence[float] | None,
    provider_until: _dt.datetime | None = None,
) -> PricePlanSnapshot:
    def _snap(status: str, message: str, **extra: Any) -> PricePlanSnapshot:
        return PricePlanSnapshot(
            status,
            message,
            computed_at=now,
            floor_pct=floor_pct,
            ceiling_pct=ceiling_pct,
            efficiency=efficiency,
            min_spread=min_spread,
            wear_eur_per_kwh=wear_eur_per_kwh,
            safety_factor=safety_factor,
            **extra,
        )

    if horizon is None or not horizon.prices:
        return _snap(STATUS_NO_PRICES, "Keine gültige Preiskurve ab jetzt")
    if ceiling_pct <= floor_pct + 1.0 or capacity_kwh <= 0:
        return _snap(
            STATUS_NO_ROOM,
            f"Kein Spielraum zwischen Boden ({floor_pct:.0f} %) und Obergrenze ({ceiling_pct:.0f} %)",
        )
    cons_ok = cons_profile_w is not None and any(v > 0 for v in cons_profile_w)
    if not cons_ok and house_power_w <= 0:
        return _snap(STATUS_NO_PROFILE, "Noch keine Verbrauchsstatistik")

    local_today = now.date()

    def pv_profile(day_offset: int) -> tuple[Sequence[float] | None, float, str]:
        if day_offset <= 0 and pv_today_w:
            return pv_today_w, 1.0, "forecast_today"
        if day_offset == 1 and pv_tomorrow_w:
            return pv_tomorrow_w, 1.0, "forecast_tomorrow"
        return pv_hist_w, PV_HISTORIC_FACTOR, "history" if pv_hist_w else "none"

    def energy(start: _dt.datetime, hours: float) -> tuple[float, float]:
        if cons_ok:
            cons = _slot_kwh(cons_profile_w, start, hours)
        else:
            cons = max(0.0, house_power_w) / 1000.0 * hours
        day_offset = (start + _dt.timedelta(hours=hours / 2.0)).date() - local_today
        profile, factor, _ = pv_profile(day_offset.days)
        return cons, _slot_kwh(profile, start, hours) * factor

    consumption: list[float] = []
    pv: list[float] = []
    starts: list[_dt.datetime] = []
    cursor = now
    for hours in horizon.slot_hours:
        starts.append(cursor)
        cons, pv_kwh = energy(cursor, hours)
        consumption.append(cons)
        pv.append(pv_kwh)
        cursor = cursor + _dt.timedelta(hours=hours)

    terminal_need = 0.0
    elapsed = 0.0
    while elapsed < TERMINAL_MAX_H:
        cons, pv_kwh = energy(cursor, TERMINAL_STEP_H)
        deficit = cons * safety_factor - pv_kwh * PV_SAFETY_FACTOR
        if deficit <= 0.0:
            break
        terminal_need += deficit
        cursor = cursor + _dt.timedelta(hours=TERMINAL_STEP_H)
        elapsed += TERMINAL_STEP_H
    end_price = terminal_price(horizon)

    plan = plan_price_charging(
        slot_hours=horizon.slot_hours,
        prices=horizon.prices,
        consumption_kwh=consumption,
        pv_kwh=pv,
        soc_pct=soc_pct,
        capacity_kwh=capacity_kwh,
        floor_pct=floor_pct,
        ceiling_pct=ceiling_pct,
        max_charge_kw=max_charge_kw,
        budget_kwh=math.inf,
        max_discharge_kw=max_discharge_kw,
        efficiency=efficiency,
        min_spread=min_spread,
        wear_eur_per_kwh=wear_eur_per_kwh,
        feed_in_price=feed_in_price,
        consumption_safety_factor=safety_factor,
        pv_factor=PV_SAFETY_FACTOR,
        terminal_need_kwh=terminal_need,
        terminal_price=end_price,
    )

    rows = []
    for i, start in enumerate(starts):
        rows.append({
            "start": start.isoformat(),
            "start_local": start.strftime("%H:%M"),
            "hours": round(horizon.slot_hours[i], 3),
            "price": round(horizon.prices[i], 4),
            "grid_charge_kwh": round(plan.grid_charge_kwh[i], 3),
            "hold": bool(plan.hold_discharge[i]),
            "release": bool(plan.release[i]),
            "soc_pct": round(plan.soc_pct[i], 1),
            "soc_expected_pct": round(plan.expected_soc_pct[i], 1),
            "import_kwh": round(plan.planned_import_kwh[i], 3),
            "baseline_import_kwh": round(plan.baseline_import_kwh[i], 3),
            "consumption_kwh": round(consumption[i], 3),
            "pv_kwh": round(pv[i], 3),
            "forecast": bool(
                provider_until is not None and start >= provider_until
            ),
        })
    return _snap(
        STATUS_OK,
        plan.reason,
        plan=plan,
        rows=rows,
        known_until=horizon.known_until,
        provider_until=provider_until,
        terminal_need_kwh=terminal_need,
        terminal_price=end_price,
        diagnostics=_plan_diagnostics(
            now=now,
            starts=starts,
            horizon=horizon,
            plan=plan,
            consumption=consumption,
            pv=pv,
            safety_factor=safety_factor,
            cons_source="profile" if cons_ok else "house_power",
            pv_sources={
                "today": pv_profile(0)[2],
                "tomorrow": pv_profile(1)[2],
            },
            pv_rest_today_kwh=_rest_of_day_kwh(pv_today_w, now),
        ),
    )


def _rest_of_day_kwh(profile_w: Sequence[float] | None, now: _dt.datetime) -> float | None:
    """Rohe PV-Restprognose (kWh) von ``now`` bis Mitternacht, ohne Abschläge."""
    if not profile_w:
        return None
    midnight = _dt.datetime.combine(now.date() + _dt.timedelta(days=1), _dt.time(), now.tzinfo)
    total = 0.0
    cursor = now
    while cursor < midnight:
        hours = min(TERMINAL_STEP_H, (midnight - cursor).total_seconds() / 3600.0)
        total += _slot_kwh(profile_w, cursor, hours)
        cursor += _dt.timedelta(hours=hours)
    return round(total, 2)


def _plan_diagnostics(
    *,
    now: _dt.datetime,
    starts: list[_dt.datetime],
    horizon: PriceHorizon,
    plan: PricePlan,
    consumption: list[float],
    pv: list[float],
    safety_factor: float,
    cons_source: str,
    pv_sources: dict[str, str],
    pv_rest_today_kwh: float | None,
) -> dict[str, Any]:
    """Summen je Kalendertag und bis zum Ende des teuersten Slots."""

    def balance(indices: list[int]) -> dict[str, float]:
        charge = sum(plan.grid_charge_kwh[i] for i in indices)
        charge_cost = sum(plan.grid_charge_kwh[i] * horizon.prices[i] for i in indices)
        return {
            "pv_kwh": round(sum(pv[i] for i in indices), 2),
            "pv_planned_kwh": round(sum(pv[i] for i in indices) * PV_SAFETY_FACTOR, 2),
            "consumption_kwh": round(sum(consumption[i] for i in indices), 2),
            "consumption_planned_kwh": round(
                sum(consumption[i] for i in indices) * safety_factor, 2
            ),
            "grid_charge_kwh": round(charge, 2),
            "grid_charge_avg_price": round(charge_cost / charge, 4) if charge > 0 else None,
            "import_planned_kwh": round(sum(plan.planned_import_kwh[i] for i in indices), 2),
            "import_baseline_kwh": round(sum(plan.baseline_import_kwh[i] for i in indices), 2),
        }

    by_day: dict[str, list[int]] = {}
    for i, start in enumerate(starts):
        by_day.setdefault(start.date().isoformat(), []).append(i)

    peak_price = max(horizon.prices)
    peak_last = max(i for i, p in enumerate(horizon.prices) if p >= peak_price - 1e-9)
    peak_end = starts[peak_last] + _dt.timedelta(hours=horizon.slot_hours[peak_last])

    return {
        "now": now.isoformat(),
        "consumption_source": cons_source,
        "pv_source": pv_sources,
        "pv_rest_today_raw_kwh": pv_rest_today_kwh,
        "pv_factor": PV_SAFETY_FACTOR,
        "consumption_safety_factor": safety_factor,
        "price_min": round(min(horizon.prices), 4),
        "price_max": round(peak_price, 4),
        "peak_end": peak_end.isoformat(),
        "until_peak_end": balance(list(range(peak_last + 1))),
        "by_day": {day: balance(idx) for day, idx in by_day.items()},
    }
