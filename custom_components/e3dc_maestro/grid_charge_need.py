"""Netzlade-Bedarf bis zum nächsten günstigen Fenster.

Ein günstiges Fenster (Tarif-Klasse ``low``) muss so viel laden, dass der
Akku nach dessen Ende bis zum Beginn des nächsten günstigen Fensters nicht
unter den Boden fällt. Gerechnet wird rückwärts in Viertelstunden, damit
PV-Überschuss am Nachmittag den Abend deckt, ein Defizit am Abend aber nicht
von einem Überschuss am Vormittag.

Pure Python (no Home Assistant imports) so it can be unit-tested.
"""
from __future__ import annotations

import datetime as _dt
from typing import Callable, Sequence

from .control_tariff import TARIFF_LOW, TariffSchedule, TariffSlot, current_tariff_class
from .price_curve import PriceHorizon
from .price_plan_runner import PV_HISTORIC_FACTOR, PV_SAFETY_FACTOR, profile_w_at

STEP = _dt.timedelta(minutes=15)
_STEP_H = STEP.total_seconds() / 3600.0
# Ohne nächstes günstiges Fenster in Sicht zählt höchstens ein Tag.
MAX_WINDOW = _dt.timedelta(hours=24)
# Just-in-Time-Netzladung: Puffer, damit Rampe/Regeltakt das Fensterende nicht verpassen.
JIT_SLACK_H = 0.25


def grid_charge_jit_due(
    need_kwh: float,
    max_charge_kw: float,
    hours_left: float | None,
    *,
    slack_h: float = JIT_SLACK_H,
) -> bool:
    """True wenn die Netzladung jetzt starten muss, um das Ziel noch zu schaffen.

    Wartet, solange die Restzeit im günstigen Fenster länger ist als die
    Volllast-Ladedauer (``need_kwh / max_charge_kw``) plus ``slack_h``. Ohne
    bekannte Restzeit oder ohne Ladeleistung: sofort (fail-safe).
    """
    if need_kwh <= 0.0:
        return False
    if hours_left is None or max_charge_kw <= 0.0:
        return True
    return hours_left <= need_kwh / max_charge_kw + max(0.0, slack_h)


def low_slot_hours_left(now: _dt.datetime, slot: TariffSlot | None) -> float | None:
    """Reststunden bis ``slot.end_h``, oder ``None`` wenn kein aktives Fenster."""
    if slot is None:
        return None
    hour = now.hour + now.minute / 60.0
    if slot.start_h <= slot.end_h:
        if not (slot.start_h <= hour < slot.end_h):
            return None
        return max(0.0, slot.end_h - hour)
    # Über Mitternacht: aktiv ab start_h oder vor end_h am Folgetag.
    if hour >= slot.start_h:
        return (24.0 - hour) + slot.end_h
    if hour < slot.end_h:
        return max(0.0, slot.end_h - hour)
    return None


PowerFn = Callable[[_dt.datetime], float]
LowFn = Callable[[_dt.datetime], bool]
PriceFn = Callable[[_dt.datetime], "float | None"]
NeedFn = Callable[[_dt.datetime], float]


def bridge_window(now: _dt.datetime, is_low: LowFn) -> tuple[_dt.datetime, _dt.datetime]:
    """(Ende des laufenden günstigen Fensters, Beginn des nächsten), im Viertelstundenraster."""
    start = now.replace(minute=now.minute - now.minute % 15, second=0, microsecond=0)
    limit = start + MAX_WINDOW
    while start < limit and is_low(start):
        start += STEP
    end = start
    limit = start + MAX_WINDOW
    while end < limit and not is_low(end):
        end += STEP
    return start, end


def _need_between(
    start: _dt.datetime, end: _dt.datetime, load_w: PowerFn, pv_w: PowerFn
) -> float:
    steps: list[_dt.datetime] = []
    t = start
    while t < end:
        steps.append(t)
        t += STEP
    need = 0.0
    for t in reversed(steps):
        need = max(0.0, need + (load_w(t) - pv_w(t)) * _STEP_H / 1000.0)
    return need


def bridge_need_kwh(
    now: _dt.datetime, *, is_low: LowFn, load_w: PowerFn, pv_w: PowerFn
) -> float:
    """Energie (kWh), die am Ende des laufenden günstigen Fensters im Akku sein muss."""
    return _need_between(*bridge_window(now, is_low), load_w, pv_w)


def horizon_price_fn(horizon: PriceHorizon | None) -> PriceFn | None:
    """Preis zum Zeitpunkt aus der Preiskurve, ``None`` außerhalb."""
    if horizon is None or not horizon.prices:
        return None
    bounds: list[tuple[_dt.datetime, _dt.datetime, float]] = []
    cursor = horizon.start
    for hours, price in zip(horizon.slot_hours, horizon.prices):
        end = cursor + _dt.timedelta(hours=hours)
        bounds.append((cursor, end, price))
        cursor = end

    def price_at(when: _dt.datetime) -> float | None:
        for start, end, price in bounds:
            if start <= when < end:
                return price
        return None

    return price_at


def low_fn(schedule: TariffSchedule, price_at: PriceFn | None) -> LowFn:
    def is_low(when: _dt.datetime) -> bool:
        price = price_at(when) if price_at is not None else None
        return current_tariff_class(when, schedule, price) == TARIFF_LOW

    return is_low


def load_fn(
    weekday_w: Sequence[Sequence[float]] | None,
    hourly_w: Sequence[float] | None,
    safety_factor: float,
) -> PowerFn | None:
    """Hausverbrauch aus dem Wochentagsprofil (UTC), sonst aus dem 24-h-Profil."""
    has_weekday = bool(weekday_w) and any(sum(day) > 0 for day in weekday_w)
    has_hourly = bool(hourly_w) and any(v > 0 for v in hourly_w)
    if not (has_weekday or has_hourly):
        return None

    def load_at(when: _dt.datetime) -> float:
        profile: Sequence[float] | None = hourly_w
        if has_weekday:
            day = weekday_w[when.astimezone(_dt.timezone.utc).weekday()]
            if sum(day) > 0:
                profile = day
        return max(0.0, profile_w_at(profile, when)) * safety_factor

    return load_at


def pv_fn(
    today: _dt.date,
    pv_today_w: Sequence[float] | None,
    pv_tomorrow_w: Sequence[float] | None,
    pv_hist_w: Sequence[float] | None,
) -> PowerFn:
    """PV aus der Tagesprognose, sonst abgeschwächt aus dem historischen Mittel."""

    def pv_at(when: _dt.datetime) -> float:
        offset = (when.date() - today).days
        profile = pv_today_w if offset <= 0 else pv_tomorrow_w if offset == 1 else None
        factor = PV_SAFETY_FACTOR
        if not profile:
            profile, factor = pv_hist_w, PV_SAFETY_FACTOR * PV_HISTORIC_FACTOR
        return max(0.0, profile_w_at(profile, when)) * factor

    return pv_at


def need_fn(is_low: LowFn, load_w: PowerFn, pv_w: PowerFn) -> NeedFn:
    """Bedarf je Zeitpunkt; innerhalb desselben Fensters nur einmal gerechnet."""
    cache: dict[tuple[_dt.datetime, _dt.datetime], float] = {}

    def need_at(when: _dt.datetime) -> float:
        window = bridge_window(when, is_low)
        if window not in cache:
            cache[window] = _need_between(*window, load_w, pv_w)
        return cache[window]

    return need_at
