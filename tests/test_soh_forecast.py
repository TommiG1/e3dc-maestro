"""Unit tests for SOH long-term forecast math."""
from __future__ import annotations

from datetime import datetime, timedelta, timezone

from custom_components.e3dc_maestro.soh_forecast import (
    MonthPoint,
    build_forecast,
    days_until_ready,
    fit_soh_series,
)


UTC = timezone.utc


def _months(start: datetime, values: list[float]) -> list[MonthPoint]:
    return [
        MonthPoint(start=start + timedelta(days=30 * i), mean=v) for i, v in enumerate(values)
    ]


def test_fit_reaches_80_in_expected_window() -> None:
    start = datetime(2026, 2, 1, tzinfo=UTC)
    # ~−0.28 %/month → from 89.5 to 80 takes ~34 months from Feb; with live 87.3 ~27 mo
    points = _months(start, [89.5, 89.2, 88.9, 88.6, 88.3, 88.0, 87.7, 87.4])
    now = datetime(2026, 10, 26, tzinfo=UTC)
    rate, r2, soh, months, eta, insufficient, _span, wait = fit_soh_series(points, 87.3, now)
    assert not insufficient
    assert wait == 0
    assert soh == 87.3
    assert rate < -2.0  # %/year
    assert r2 > 0.95
    assert months is not None and 20 < months < 35
    assert eta is not None and 2028 <= eta.year <= 2029


def test_insufficient_history_when_too_short() -> None:
    start = datetime(2026, 10, 1, tzinfo=UTC)
    points = _months(start, [88.0, 87.8])
    now = datetime(2026, 10, 26, tzinfo=UTC)
    _rate, _r2, _soh, months, eta, insufficient, span, wait = fit_soh_series(points, 87.5, now)
    assert insufficient
    assert months is None
    assert eta is None
    assert wait == days_until_ready(span, sample_count=3)
    assert wait > 0


def test_days_until_ready_counts_down() -> None:
    assert days_until_ready(0.0) == 90
    assert days_until_ready(30.0) == 60
    assert days_until_ready(89.1) == 1
    assert days_until_ready(90.0, sample_count=5) == 0


def test_already_at_or_below_target() -> None:
    start = datetime(2025, 1, 1, tzinfo=UTC)
    points = _months(start, [85.0, 83.0, 81.0, 79.5])
    now = datetime(2026, 10, 26, tzinfo=UTC)
    _rate, _r2, _soh, months, eta, insufficient, _span, wait = fit_soh_series(points, 79.0, now)
    assert not insufficient
    assert wait == 0
    assert months == 0.0
    assert eta == now


def test_non_negative_slope_has_no_eta() -> None:
    start = datetime(2026, 1, 1, tzinfo=UTC)
    points = _months(start, [87.0, 87.1, 87.2, 87.3])
    now = datetime(2026, 10, 26, tzinfo=UTC)
    rate, _r2, _soh, months, eta, insufficient, _span, wait = fit_soh_series(points, 87.4, now)
    assert not insufficient
    assert wait == 0
    assert rate >= 0
    assert months is None
    assert eta is None


def test_build_forecast_picks_worst_module() -> None:
    start = datetime(2026, 2, 1, tzinfo=UTC)
    now = datetime(2026, 10, 26, tzinfo=UTC)
    slow = _months(start, [89.5, 89.2, 89.0, 88.7, 88.5, 88.2, 88.0, 87.7])
    fast = _months(start, [89.3, 88.9, 88.5, 88.1, 87.8, 87.4, 87.1, 86.8])
    result = build_forecast(
        [
            (
                {"entity_id": "sensor.a", "name": "M1", "pack": "Pack 1"},
                slow,
                87.5,
            ),
            (
                {"entity_id": "sensor.b", "name": "M2", "pack": "Pack 1"},
                fast,
                86.5,
            ),
            (
                {"entity_id": "sensor.c", "name": "M1", "pack": "Pack 2"},
                fast,
                86.5,
            ),
        ],
        now,
    )
    assert not result.insufficient_history
    assert result.status == "ready"
    assert result.days_until_ready == 0
    assert result.months_to_80 is not None
    assert len(result.packs) == 2
    attrs = result.as_attributes()
    assert attrs["history_source"] == "long_term_statistics"
    assert attrs["target_soh_pct"] == 80.0
    assert attrs["status"] == "ready"
    assert len(attrs["modules"]) == 3
    pack1 = next(p for p in result.packs if p["name"] == "Pack 1")
    assert pack1["months_to_80"] is not None
    # Worst of Pack 1 should be the faster-aging module.
    assert pack1["soh_pct"] <= 87.5


def test_build_forecast_collecting_exposes_countdown() -> None:
    start = datetime(2026, 10, 1, tzinfo=UTC)
    now = datetime(2026, 10, 26, tzinfo=UTC)
    points = _months(start, [88.0, 87.8])
    result = build_forecast(
        [({"entity_id": "sensor.a", "name": "M1", "pack": "Pack 1"}, points, 87.5)],
        now,
    )
    assert result.insufficient_history
    assert result.status == "collecting"
    assert result.days_until_ready > 0
    assert result.packs[0]["days_until_ready"] == result.days_until_ready
    assert result.as_attributes()["days_until_ready"] == result.days_until_ready
