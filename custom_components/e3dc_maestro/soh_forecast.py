"""SOH degradation forecast from Home Assistant long-term statistics.

Uses monthly (or weekly) means of device-reported module SOH sensors to fit a
linear trend and estimate when each module reaches a target (default 80 %).

Long-term statistics survive recorder purge; short-term history and the states
table do not. This module never falls back to the History API.
"""
from __future__ import annotations

import logging
import math
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util

_LOGGER = logging.getLogger(__name__)

TARGET_SOH_PCT = 80.0
MIN_POINTS = 3
MIN_SPAN_DAYS = 90.0
LOOKBACK_DAYS = 3650  # ~10 years of long-term statistics
_REFRESH_INTERVAL = timedelta(days=1)
_DAYS_PER_YEAR = 365.25
_DAYS_PER_MONTH = 30.437
HISTORY_SOURCE = "long_term_statistics"


@dataclass(frozen=True)
class MonthPoint:
    """One aggregated SOH sample."""

    start: datetime
    mean: float


@dataclass(frozen=True)
class ModuleForecast:
    """Linear fit and ETA for one battery module."""

    entity_id: str
    name: str
    pack: str
    soh_pct: float
    rate_pct_per_year: float
    r_squared: float
    sample_count: int
    span_days: float
    months_to_80: float | None
    eta_80_iso: str | None
    insufficient_history: bool = False
    days_until_ready: int = 0


@dataclass
class SohForecastResult:
    """Aggregate forecast across all modules."""

    months_to_80: float | None = None
    eta_80_iso: str | None = None
    rate_pct_per_year: float | None = None
    r_squared: float | None = None
    modules: list[ModuleForecast] = field(default_factory=list)
    packs: list[dict[str, Any]] = field(default_factory=list)
    insufficient_history: bool = True
    days_until_ready: int = int(MIN_SPAN_DAYS)
    span_days: float = 0.0
    status: str = "collecting"  # ready | collecting | no_modules
    history_source: str = HISTORY_SOURCE
    target_soh_pct: float = TARGET_SOH_PCT
    computed_at: datetime | None = None

    def as_attributes(self) -> dict[str, Any]:
        """Panel- and diagnostics-friendly attribute payload."""
        return {
            "history_source": self.history_source,
            "target_soh_pct": self.target_soh_pct,
            "status": self.status,
            "eta_80_iso": self.eta_80_iso,
            "rate_pct_per_year": self.rate_pct_per_year,
            "r_squared": self.r_squared,
            "insufficient_history": self.insufficient_history,
            "days_until_ready": self.days_until_ready,
            "span_days": round(self.span_days, 1),
            "min_span_days": int(MIN_SPAN_DAYS),
            "computed_at": self.computed_at.isoformat() if self.computed_at else None,
            "modules": [
                {
                    "entity_id": m.entity_id,
                    "name": m.name,
                    "pack": m.pack,
                    "soh_pct": m.soh_pct,
                    "rate_pct_per_year": m.rate_pct_per_year,
                    "r_squared": m.r_squared,
                    "sample_count": m.sample_count,
                    "span_days": round(m.span_days, 1),
                    "months_to_80": m.months_to_80,
                    "eta_80_iso": m.eta_80_iso,
                    "insufficient_history": m.insufficient_history,
                    "days_until_ready": m.days_until_ready,
                }
                for m in self.modules
            ],
            "packs": list(self.packs),
        }


def days_until_ready(span_days: float, *, sample_count: int = 0) -> int:
    """Days left until span and sample gates are met (0 = ready for a fit)."""
    span_left = max(0.0, MIN_SPAN_DAYS - max(0.0, span_days))
    # With too few samples, keep waiting at least until the span gate would pass
    # even if weekly buckets are sparse at the start.
    if sample_count < MIN_POINTS and span_left <= 0:
        span_left = max(span_left, float(MIN_POINTS - sample_count) * 7.0)
    return int(math.ceil(span_left))


def _linreg(xs: list[float], ys: list[float]) -> tuple[float, float, float]:
    """Return slope, intercept, R² for y = slope·x + intercept."""
    n = len(xs)
    if n < 2:
        return 0.0, ys[0] if ys else 0.0, 0.0
    mx = sum(xs) / n
    my = sum(ys) / n
    num = sum((x - mx) * (y - my) for x, y in zip(xs, ys, strict=True))
    den = sum((x - mx) ** 2 for x in xs)
    if den <= 0:
        return 0.0, my, 0.0
    slope = num / den
    intercept = my - slope * mx
    ss_tot = sum((y - my) ** 2 for y in ys)
    if ss_tot <= 0:
        return slope, intercept, 1.0
    ss_res = sum((y - (slope * x + intercept)) ** 2 for x, y in zip(xs, ys, strict=True))
    return slope, intercept, max(0.0, 1.0 - ss_res / ss_tot)


def fit_soh_series(
    points: list[MonthPoint],
    current_soh: float,
    now: datetime,
    *,
    target: float = TARGET_SOH_PCT,
) -> tuple[float, float, float, float | None, datetime | None, bool, float, int]:
    """Fit monthly points + live SOH.

    Returns
    ``(rate_per_year, r², soh_now, months_to_target, eta, insufficient, span_days, days_until)``.
    """
    if not math.isfinite(current_soh):
        return 0.0, 0.0, current_soh, None, None, True, 0.0, int(MIN_SPAN_DAYS)

    if not points:
        wait = days_until_ready(0.0, sample_count=1)
        return 0.0, 0.0, current_soh, None, None, True, 0.0, wait

    t0 = points[0].start
    xs: list[float] = []
    ys: list[float] = []
    for point in points:
        # Mid-period representative for monthly/weekly buckets.
        mid = point.start + timedelta(days=15)
        xs.append((mid - t0).total_seconds() / 86400.0)
        ys.append(point.mean)
    x_now = (now - t0).total_seconds() / 86400.0
    xs.append(x_now)
    ys.append(current_soh)

    span = x_now if x_now > 0 else (xs[-1] - xs[0] if len(xs) > 1 else 0.0)
    if len(xs) < MIN_POINTS or span < MIN_SPAN_DAYS:
        wait = days_until_ready(span, sample_count=len(xs))
        return 0.0, 0.0, current_soh, None, None, True, span, wait

    slope, _intercept, r2 = _linreg(xs, ys)
    rate_per_year = slope * _DAYS_PER_YEAR

    if current_soh <= target:
        return round(rate_per_year, 3), round(r2, 4), current_soh, 0.0, now, False, span, 0

    if slope >= 0:
        return round(rate_per_year, 3), round(r2, 4), current_soh, None, None, False, span, 0

    days_left = (target - current_soh) / slope
    months = days_left / _DAYS_PER_MONTH
    eta = now + timedelta(days=days_left)
    return (
        round(rate_per_year, 3),
        round(r2, 4),
        current_soh,
        round(months, 1),
        eta,
        False,
        span,
        0,
    )


def _eta_iso(eta: datetime | None) -> str | None:
    if eta is None:
        return None
    return f"{eta.year:04d}-{eta.month:02d}"


def _rows_to_points(rows: list[dict[str, Any]]) -> list[MonthPoint]:
    points: list[MonthPoint] = []
    for row in rows:
        mean = row.get("mean")
        start = row.get("start")
        if mean is None or start is None:
            continue
        try:
            value = float(mean)
        except (TypeError, ValueError):
            continue
        if not math.isfinite(value):
            continue
        if isinstance(start, datetime):
            stamp = start if start.tzinfo else dt_util.as_utc(start)
        else:
            # HA may return unix ms or seconds depending on version/path.
            raw = float(start)
            if raw > 1e12:
                raw /= 1000.0
            stamp = datetime.fromtimestamp(raw, tz=dt_util.UTC)
        points.append(MonthPoint(start=stamp, mean=value))
    points.sort(key=lambda p: p.start)
    return points


def _pack_summaries(modules: list[ModuleForecast]) -> list[dict[str, Any]]:
    by_pack: dict[str, list[ModuleForecast]] = {}
    for mod in modules:
        by_pack.setdefault(mod.pack or mod.name, []).append(mod)
    packs: list[dict[str, Any]] = []
    for pack_name, rows in sorted(by_pack.items(), key=lambda item: item[0]):
        usable = [m for m in rows if not m.insufficient_history]
        if not usable:
            wait = max((m.days_until_ready for m in rows), default=int(MIN_SPAN_DAYS))
            span = max((m.span_days for m in rows), default=0.0)
            packs.append(
                {
                    "name": pack_name,
                    "insufficient_history": True,
                    "status": "collecting",
                    "soh_pct": None,
                    "rate_pct_per_year": None,
                    "months_to_80": None,
                    "eta_80_iso": None,
                    "days_until_ready": wait,
                    "span_days": round(span, 1),
                }
            )
            continue
        # Worst = soonest ETA, else lowest SOH.
        with_eta = [m for m in usable if m.months_to_80 is not None]
        worst = (
            min(with_eta, key=lambda m: m.months_to_80 or 0.0)
            if with_eta
            else min(usable, key=lambda m: m.soh_pct)
        )
        packs.append(
            {
                "name": pack_name,
                "insufficient_history": False,
                "status": "ready",
                "soh_pct": worst.soh_pct,
                "rate_pct_per_year": worst.rate_pct_per_year,
                "months_to_80": worst.months_to_80,
                "eta_80_iso": worst.eta_80_iso,
                "r_squared": worst.r_squared,
                "days_until_ready": 0,
                "span_days": round(worst.span_days, 1),
            }
        )
    return packs


def build_forecast(
    module_series: list[tuple[dict[str, str], list[MonthPoint], float]],
    now: datetime,
    *,
    target: float = TARGET_SOH_PCT,
) -> SohForecastResult:
    """Build aggregate forecast from ``(meta, points, current_soh)`` rows."""
    modules: list[ModuleForecast] = []
    for meta, points, current in module_series:
        rate, r2, soh, months, eta, insufficient, span, wait = fit_soh_series(
            points, current, now, target=target
        )
        modules.append(
            ModuleForecast(
                entity_id=meta.get("entity_id", ""),
                name=meta.get("name", ""),
                pack=meta.get("pack", ""),
                soh_pct=round(soh, 1) if math.isfinite(soh) else 0.0,
                rate_pct_per_year=rate,
                r_squared=r2,
                sample_count=len(points) + 1,
                span_days=span,
                months_to_80=months,
                eta_80_iso=_eta_iso(eta),
                insufficient_history=insufficient,
                days_until_ready=wait,
            )
        )

    packs = _pack_summaries(modules)
    if not modules:
        return SohForecastResult(
            insufficient_history=True,
            days_until_ready=int(MIN_SPAN_DAYS),
            status="no_modules",
            packs=packs,
            computed_at=now,
            target_soh_pct=target,
        )

    usable = [m for m in modules if not m.insufficient_history]
    if not usable:
        wait = max(m.days_until_ready for m in modules)
        span = max(m.span_days for m in modules)
        return SohForecastResult(
            insufficient_history=True,
            days_until_ready=wait,
            span_days=span,
            status="collecting",
            modules=modules,
            packs=packs,
            computed_at=now,
            target_soh_pct=target,
        )

    with_eta = [m for m in usable if m.months_to_80 is not None]
    worst = (
        min(with_eta, key=lambda m: m.months_to_80 or 0.0)
        if with_eta
        else min(usable, key=lambda m: m.soh_pct)
    )
    return SohForecastResult(
        months_to_80=worst.months_to_80,
        eta_80_iso=worst.eta_80_iso,
        rate_pct_per_year=worst.rate_pct_per_year,
        r_squared=worst.r_squared,
        modules=modules,
        packs=packs,
        insufficient_history=False,
        days_until_ready=0,
        span_days=worst.span_days,
        status="ready",
        computed_at=now,
        target_soh_pct=target,
    )


class SohForecastService:
    """Loads long-term SOH statistics and caches a daily forecast."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._hass = hass
        self.result: SohForecastResult | None = None
        self._last_refresh: datetime | None = None

    async def async_refresh(self, *, force: bool = False) -> SohForecastResult:
        """Refresh at most once per day unless ``force``."""
        now = dt_util.utcnow()
        if (
            not force
            and self._last_refresh is not None
            and now - self._last_refresh < _REFRESH_INTERVAL
            and self.result is not None
        ):
            return self.result

        targets = self._module_targets()
        if not targets:
            self.result = SohForecastResult(
                insufficient_history=True,
                days_until_ready=int(MIN_SPAN_DAYS),
                status="no_modules",
                computed_at=now,
            )
            self._last_refresh = now
            return self.result

        try:
            from homeassistant.components.recorder import get_instance
            from homeassistant.components.recorder.statistics import (
                statistics_during_period,
            )
        except Exception as err:  # pragma: no cover
            _LOGGER.debug("Recorder not available for SOH forecast: %s", err)
            self.result = SohForecastResult(
                insufficient_history=True,
                days_until_ready=int(MIN_SPAN_DAYS),
                status="collecting",
                computed_at=now,
            )
            self._last_refresh = now
            return self.result

        entity_ids = {row["entity_id"] for row in targets}
        start = now - timedelta(days=LOOKBACK_DAYS)
        period = "month"
        try:
            stats: dict[str, list[dict[str, Any]]] = await get_instance(
                self._hass
            ).async_add_executor_job(
                statistics_during_period,
                self._hass,
                start,
                now,
                entity_ids,
                period,
                None,
                {"mean"},
            )
        except Exception as err:
            _LOGGER.warning("SOH-Prognose: Statistiken nicht lesbar: %s", err)
            self.result = SohForecastResult(
                insufficient_history=True,
                days_until_ready=int(MIN_SPAN_DAYS),
                status="collecting",
                computed_at=now,
            )
            self._last_refresh = now
            return self.result

        # Prefer month; if history is short, retry week for finer samples.
        series: list[tuple[dict[str, str], list[MonthPoint], float]] = []
        for meta in targets:
            eid = meta["entity_id"]
            points = _rows_to_points((stats or {}).get(eid) or [])
            current = self._current_soh(eid)
            if current is None:
                continue
            if len(points) < MIN_POINTS:
                # Lazy week fetch only for this entity set once if needed.
                pass
            series.append((meta, points, current))

        short = [
            meta["entity_id"]
            for meta, points, _ in series
            if len(points) < 6
        ]
        if short:
            try:
                week_stats: dict[str, list[dict[str, Any]]] = await get_instance(
                    self._hass
                ).async_add_executor_job(
                    statistics_during_period,
                    self._hass,
                    start,
                    now,
                    set(short),
                    "week",
                    None,
                    {"mean"},
                )
            except Exception as err:
                _LOGGER.debug("SOH week stats failed: %s", err)
                week_stats = {}
            rebuilt: list[tuple[dict[str, str], list[MonthPoint], float]] = []
            for meta, points, current in series:
                if meta["entity_id"] in short:
                    week_points = _rows_to_points(
                        (week_stats or {}).get(meta["entity_id"]) or []
                    )
                    if len(week_points) > len(points):
                        points = week_points
                rebuilt.append((meta, points, current))
            series = rebuilt

        self.result = build_forecast(series, now)
        self._last_refresh = now
        return self.result

    def _current_soh(self, entity_id: str) -> float | None:
        state = self._hass.states.get(entity_id)
        if state is None:
            return None
        try:
            value = float(state.state)
        except (TypeError, ValueError):
            return None
        return value if math.isfinite(value) else None

    def _module_targets(self) -> list[dict[str, str]]:
        """Resolve device-reported module SOH entities from the plant map."""
        try:
            from homeassistant.helpers import entity_registry as er

            from .panel import _rscp_plant
        except Exception as err:  # pragma: no cover
            _LOGGER.debug("SOH plant map unavailable: %s", err)
            return []

        plant = _rscp_plant(self._hass, er.async_get(self._hass))
        out: list[dict[str, str]] = []
        for pack in plant.get("packs") or []:
            pack_name = str(pack.get("name") or "")
            for mod in pack.get("modules") or []:
                entities = mod.get("entities") or {}
                eid = entities.get("sohReported")
                if not eid:
                    continue
                out.append(
                    {
                        "entity_id": str(eid),
                        "name": str(mod.get("name") or ""),
                        "pack": pack_name,
                    }
                )
        return out
