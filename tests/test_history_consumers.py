"""Consumers of the imported ``e3dc_maestro:history_*`` statistics: sizing + consumption."""
from __future__ import annotations

import sys
from datetime import datetime, timedelta, timezone
from types import SimpleNamespace

import pytest

from custom_components.e3dc_maestro import battery_sizing, consumption_stats
from custom_components.e3dc_maestro import statistic_ids as ids

UTC = timezone.utc
NOW = datetime(2026, 6, 10, 12, 0, tzinfo=UTC)


def _h(day: int, hour: int) -> datetime:
    return datetime(2026, 6, day, hour, tzinfo=UTC)


def _sum_rows(start: datetime, sums: list[float]) -> list[dict]:
    return [{"start": start + timedelta(hours=i), "sum": v} for i, v in enumerate(sums)]


def test_statistic_ids_are_shared_constants():
    assert ids.HISTORY_SOLAR == "e3dc_maestro:history_solar"
    assert ids.HISTORY_HOUSE_POWER == "e3dc_maestro:history_house_power"
    assert all(i.startswith(ids.HISTORY_PREFIX) for i in ids.ALL_HISTORY_IDS)
    assert len(set(ids.ALL_HISTORY_IDS)) == len(ids.HISTORY_ROLES) == 10


@pytest.fixture
def recorder(monkeypatch):
    """Fake recorder: ``env.stats`` maps statistic id -> rows; ``env.calls`` logs queried ids."""
    env = SimpleNamespace(stats={}, calls=[])

    class _Instance:
        async def async_add_executor_job(self, fn, *args):
            return fn(*args)

    def during_period(_hass, start, end, statistic_ids, period, units, types):
        env.calls.append((set(statistic_ids), start, end, types))
        return {i: list(env.stats[i]) for i in statistic_ids if i in env.stats}

    rec = sys.modules["homeassistant.components.recorder"]
    stat = sys.modules["homeassistant.components.recorder.statistics"]
    monkeypatch.setattr(rec, "get_instance", lambda _hass: _Instance(), raising=False)
    monkeypatch.setattr(stat, "statistics_during_period", during_period, raising=False)
    monkeypatch.setattr(battery_sizing.dt_util, "utcnow", lambda: NOW)
    monkeypatch.setattr(consumption_stats.dt_util, "utcnow", lambda: NOW)
    return env


OPTS = {
    "sizing_pv_energy_sensor": ["sensor.pv"],
    "sizing_grid_import_energy_sensor": "sensor.gin",
    "sizing_grid_export_energy_sensor": "sensor.gout",
    "sizing_battery_charge_energy_sensor": "sensor.bc",
    "sizing_battery_discharge_energy_sensor": "sensor.bd",
}


def _hass():
    return SimpleNamespace(states=SimpleNamespace(get=lambda _eid: None))


def _live(env, with_house=False):
    # live from 09.06. 10:00Z: deltas 1,2,3 kWh (row 09:00 is the predecessor)
    start = _h(9, 9)
    env.stats["sensor.pv"] = _sum_rows(start, [100.0, 101.0, 103.0, 106.0])
    env.stats["sensor.gin"] = _sum_rows(start, [50.0, 50.5, 51.0, 51.5])
    env.stats["sensor.gout"] = _sum_rows(start, [10.0, 10.0, 10.0, 10.0])
    env.stats["sensor.bc"] = _sum_rows(start, [5.0, 5.0, 5.0, 5.0])
    env.stats["sensor.bd"] = _sum_rows(start, [7.0, 7.0, 7.0, 7.0])
    return OPTS


async def test_sizing_unchanged_without_imported_series(recorder):
    opts = _live(recorder)
    records = await battery_sizing.SizingDataLoader(_hass(), opts).load_hourly_records(3)
    assert [r.timestamp for r in records] == [_h(9, 10), _h(9, 11), _h(9, 12)]
    assert [r.pv_kwh for r in records] == [1.0, 2.0, 3.0]
    assert [r.grid_in_kwh for r in records] == [0.5, 0.5, 0.5]
    queried = recorder.calls[0][0]
    assert {"sensor.pv", "sensor.gin"} <= queried and ids.HISTORY_SOLAR in queried


async def test_sizing_imported_fills_hours_without_live_data(recorder):
    opts = _live(recorder)
    # imported 08.06. 10..12: running sums start at 0 -> deltas 4, 1, 2
    start = _h(8, 10)
    recorder.stats[ids.HISTORY_SOLAR] = _sum_rows(start, [3.0, 4.0, 5.0])
    recorder.stats[ids.HISTORY_EXTERNAL] = _sum_rows(start, [1.0, 1.0, 2.0])
    recorder.stats[ids.HISTORY_GRID_IMPORT] = _sum_rows(start, [0.2, 0.4, 0.6])
    # overlap hour 09.06. 11:00Z: live (2.0) must win over imported
    recorder.stats[ids.HISTORY_SOLAR] += [{"start": _h(9, 11), "sum": 99.0}]
    records = await battery_sizing.SizingDataLoader(_hass(), opts).load_hourly_records(3)
    by_ts = {r.timestamp: r for r in records}
    assert by_ts[_h(8, 10)].pv_kwh == pytest.approx(3.0 + 1.0)  # solar + external
    assert by_ts[_h(8, 11)].pv_kwh == pytest.approx(1.0 + 0.0)
    assert by_ts[_h(8, 12)].pv_kwh == pytest.approx(1.0 + 1.0)
    assert by_ts[_h(8, 10)].grid_in_kwh == pytest.approx(0.2)
    assert by_ts[_h(9, 11)].pv_kwh == 2.0
    assert by_ts[_h(9, 12)].pv_kwh == 3.0
    # sorted, imported hours first
    assert [r.timestamp for r in records] == sorted(by_ts)


async def test_sizing_imported_house_used_when_house_sensor_absent(recorder):
    opts = _live(recorder)
    recorder.stats[ids.HISTORY_SOLAR] = _sum_rows(_h(8, 10), [1.0, 2.0])
    recorder.stats[ids.HISTORY_HOUSE] = _sum_rows(_h(8, 10), [0.7, 1.7])
    recorder.stats[ids.HISTORY_GRID_IMPORT] = _sum_rows(_h(8, 10), [0.1, 0.2])
    records = await battery_sizing.SizingDataLoader(_hass(), opts).load_hourly_records(3)
    by_ts = {r.timestamp: r for r in records}
    assert by_ts[_h(8, 10)].house_kwh == pytest.approx(0.7)  # imported house energy
    assert by_ts[_h(8, 11)].house_kwh == pytest.approx(1.0)
    # live hours without house sensor still derive from the balance:
    # pv 1 + grid_in 0.5 + discharge 0 - export 0 - charge 0
    assert by_ts[_h(9, 10)].house_kwh == pytest.approx(1.5)


# ---------------------------------------------------------------- consumption stats

def _mean_rows(start: datetime, values: list[float | None]) -> list[dict]:
    return [{"start": start + timedelta(hours=i), "mean": v} for i, v in enumerate(values)]


def _stats(unit: str = "W"):
    state = SimpleNamespace(attributes={"unit_of_measurement": unit})
    hass = SimpleNamespace(states=SimpleNamespace(get=lambda _eid: state))
    return consumption_stats.ConsumptionStats(hass, "sensor.house")


async def test_consumption_unchanged_without_history(recorder):
    recorder.stats["sensor.house"] = _mean_rows(_h(9, 0), [100.0, 300.0])
    stats = _stats()
    await stats.async_refresh(7, None)
    assert stats.avg_w_24h == pytest.approx(200.0)
    assert ids.HISTORY_HOUSE_POWER in recorder.calls[0][0]


async def test_consumption_history_fills_only_missing_hours_and_ignores_kw_scaling(recorder):
    recorder.stats["sensor.house"] = _mean_rows(_h(9, 10), [1.0, None])  # kW sensor
    recorder.stats[ids.HISTORY_HOUSE_POWER] = _mean_rows(_h(9, 9), [500.0, 9999.0, 700.0])
    stats = _stats("kW")
    await stats.async_refresh(7, None)
    # hours: 09:00 history 500, 10:00 live 1 kW -> 1000 W (history 9999 ignored), 11:00 live None -> history 700
    assert sorted(stats.hourly_profile_w[9:12]) == [500.0, 700.0, 1000.0]
    assert stats.hourly_profile_w[10] == pytest.approx(1000.0)
    assert stats.avg_w_24h == pytest.approx((500 + 1000 + 700) / 3)


async def test_consumption_history_respects_lookback_window(recorder):
    recorder.stats["sensor.house"] = _mean_rows(_h(9, 10), [400.0])
    recorder.stats[ids.HISTORY_HOUSE_POWER] = [
        {"start": NOW - timedelta(days=5), "mean": 800.0},
        {"start": NOW - timedelta(days=1, hours=-1), "mean": 600.0},
    ]
    stats = _stats()
    await stats.async_refresh(2, None, backfill_days=2)
    assert stats.avg_w_24h == pytest.approx(500.0)  # 5-day-old history row excluded


async def test_consumption_history_only(recorder):
    recorder.stats[ids.HISTORY_HOUSE_POWER] = _mean_rows(_h(9, 10), [400.0, 600.0])
    stats = _stats()
    await stats.async_refresh(7, None)
    assert stats.avg_w_24h == pytest.approx(500.0)
    assert stats.data_days == 1
