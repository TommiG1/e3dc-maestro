"""CSV history import: parsing, DST, aggregation, forward sums, cutoff, preview/apply."""
from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
from types import SimpleNamespace

import pytest

from custom_components.e3dc_maestro import csv_history_import as imp

FIX = Path(__file__).parent / "fixtures"
TZ = "Europe/Berlin"
UTC = timezone.utc
HEAD = '"Zeitstempel";"Solarproduktion [W]";"Netzbezug [W]";"Netzeinspeisung [W]";"Batterie Laden [W]";"Batterie Entladen [W]"'


def _utc(*args) -> datetime:
    return datetime(*args, tzinfo=UTC)


def _fixture(name: str):
    parsed = imp.parse_csv((FIX / name).read_text(encoding="utf-8-sig"), TZ)
    series, skipped = imp.hourly_series(parsed["quarters"])
    return parsed, series, skipped


def _hour_rows(day: str, hour: str, cells: str) -> str:
    return "".join(f"{day} {hour}:{m}:00;{cells}\n" for m in ("00", "15", "30", "45"))


def test_fixture_fronius_trailing_row_dst_and_incomplete_hour():
    parsed, series, skipped = _fixture("e3dc_portal_fronius.csv")
    assert _utc(2026, 10, 31, 8, 0) + (_utc(2026, 10, 31, 9, 0) - _utc(2026, 10, 31, 8, 0)) not in parsed["quarters"]
    assert parsed["rows_skipped"] == 0
    hours = sorted(series["solar"])
    # 29.03.: 02:00 does not exist -> 01:00 CET and 03:00 CEST are adjacent UTC hours
    assert _utc(2026, 3, 29, 0) in hours and _utc(2026, 3, 29, 1) in hours
    # 25.10.: only one 02:00 hour in this export -> 23:00Z, 00:00Z, 02:00Z (01:00Z missing, not invented)
    assert [h for h in hours if h.day in (24, 25) and h.month == 10] == [
        _utc(2026, 10, 24, 23), _utc(2026, 10, 25, 0), _utc(2026, 10, 25, 2)
    ]
    # still-running hour: 07:xx has one quarter only, 09:00 row is empty -> only 08:00 local (07:00Z) remains
    assert [h for h in hours if h.day == 31] == [_utc(2026, 10, 31, 7)]
    assert skipped == 1


def test_dst_fall_back_duplicate_hour_resolved_sequentially():
    text = HEAD + "\n" + _hour_rows("25.10.2026", "01", "100;0;0;0;0") + _hour_rows("25.10.2026", "02", "100;0;0;0;0")
    text += _hour_rows("25.10.2026", "02", "200;0;0;0;0") + _hour_rows("25.10.2026", "03", "300;0;0;0;0")
    series, skipped = imp.hourly_series(imp.parse_csv(text, TZ)["quarters"])
    assert skipped == 0
    assert series["solar"] == {
        _utc(2026, 10, 24, 23): pytest.approx(0.1),
        _utc(2026, 10, 25, 0): pytest.approx(0.1),
        _utc(2026, 10, 25, 1): pytest.approx(0.2),
        _utc(2026, 10, 25, 2): pytest.approx(0.3),
    }


def test_spring_gap_nonexistent_local_time_is_dropped():
    text = HEAD + "\n29.03.2026 01:45:00;100;0;0;0;0\n29.03.2026 02:30:00;100;0;0;0;0\n29.03.2026 03:00:00;100;0;0;0;0\n"
    parsed = imp.parse_csv(text, TZ)
    assert parsed["rows_skipped"] == 1
    assert sorted(parsed["quarters"]) == [_utc(2026, 3, 29, 0, 45), _utc(2026, 3, 29, 1, 0)]


def test_hourly_kwh_and_four_quarters_required():
    _, series, _ = _fixture("e3dc_portal_fronius.csv")
    # 15.06.2026 12:00 local = 10:00Z: 4160+7256+8896+8296 W
    assert series["solar"][_utc(2026, 6, 15, 10)] == pytest.approx((4160 + 7256 + 8896 + 8296) * 0.25 / 1000)
    text = HEAD + "\n" + "01.01.2026 00:00:00;100;0;0;0;0\n01.01.2026 00:15:00;100;0;0;0;0\n"
    assert imp.hourly_series(imp.parse_csv(text, TZ)["quarters"]) == ({}, 1)


def test_summe_vs_solar_external_is_difference():
    _, series, _ = _fixture("e3dc_portal_fronius.csv")
    # 15.06. 12:00 quarter: Solar 4160 + Fronius 1922 = Summe 6082 -> solar stays Solar only
    assert series["external"][_utc(2026, 6, 15, 10)] == pytest.approx((1922 + 3440 + 4314 + 4347) * 0.25 / 1000)
    assert series["solar"][_utc(2026, 6, 15, 10)] < series["summe"][_utc(2026, 6, 15, 10)]
    assert imp.external_plausible(series)
    text = (
        '"Zeitstempel";"Solarproduktion [W]";"Summe Produktion [W]";"Fronius ext. Produktion [W]"\n'
        + _hour_rows("01.06.2026", "12", "496;684;188")
    )
    parsed = imp.parse_csv(text, TZ)
    s, _ = imp.hourly_series(parsed["quarters"])
    assert s["external"][_utc(2026, 6, 1, 10)] == pytest.approx(0.188)
    assert s["solar"][_utc(2026, 6, 1, 10)] == pytest.approx(0.496)
    assert imp.external_plausible(s)


def test_free_named_external_column_and_mismatch():
    ok = '"Zeitstempel";"Solarproduktion [W]";"Summe Produktion [W]";"Balkon ext. Produktion [W]"\n'
    s, _ = imp.hourly_series(imp.parse_csv(ok + _hour_rows("01.06.2026", "12", "400;500;100"), TZ)["quarters"])
    assert imp.external_plausible(s)
    assert s["others"][_utc(2026, 6, 1, 10)] == pytest.approx(0.1)
    bad = '"Zeitstempel";"Solarproduktion [W]";"Summe Produktion [W]";"Balkon ext. Produktion [W]"\n'
    s, _ = imp.hourly_series(imp.parse_csv(bad + _hour_rows("01.06.2026", "12", "400;900;100"), TZ)["quarters"])
    assert not imp.external_plausible(s)


def test_export_without_external_column():
    parsed, series, _ = _fixture("e3dc_portal_wallbox_wp.csv")
    assert "external" not in series and "summe" not in series
    assert parsed["columns"]["Wallbox Carport Laden [W]"] == "wallbox"
    assert "Abregelungsgrenze [W]" not in parsed["columns"]


def test_wallbox_sums_and_other_consumers_only_reported():
    _, series, _ = _fixture("e3dc_portal_wallbox_wp.csv")
    # 13.03.2026 15:00 local = 14:00Z, empty wallbox cells count as 0
    assert series["wallbox"][_utc(2026, 3, 13, 14)] > 5
    assert any(k.startswith("consumer:wp-heizung") for k in series)
    text = (
        '"Zeitstempel";"Wallbox A Laden [W]";"Wallbox B Laden [W]"\n'
        + _hour_rows("01.06.2026", "12", "1000;2000")
    )
    s, _ = imp.hourly_series(imp.parse_csv(text, TZ)["quarters"])
    assert s["wallbox"][_utc(2026, 6, 1, 10)] == pytest.approx(3.0)


# ---------------------------------------------------------------- forward sums

H = [_utc(2026, 1, 1, h) for h in range(5)]


def test_forward_sum_starts_at_first_change_and_never_decreases():
    rows = imp.plan_forward_sum({H[0]: 2.0, H[1]: 0.0, H[2]: 3.0, H[3]: -1.0, H[4]: 1.0}, _utc(2027, 1, 1))
    assert rows[0] == {"start": H[0], "state": 2.0, "sum": 2.0}
    sums = [r["sum"] for r in rows]
    assert sums == [2.0, 2.0, 5.0, 5.0, 6.0]
    assert all(b >= a >= 0 for a, b in zip(sums, sums[1:]))


def test_forward_sum_respects_cutoff_strictly():
    rows = imp.plan_forward_sum({h: 1.0 for h in H}, H[3])
    assert [r["start"] for r in rows] == H[:3]
    assert rows[-1]["sum"] == 3.0


def test_power_mean_rows():
    rows = imp.plan_mean({H[0]: 500.0, H[1]: 700.0, H[2]: 9.0}, H[2])
    assert rows == [{"start": H[0], "mean": 500.0}, {"start": H[1], "mean": 700.0}]


def test_house_power_mean_needs_four_quarters():
    text = '"Zeitstempel";"Hausverbrauch [W]"\n' + _hour_rows("01.06.2026", "12", "400")
    text += "01.06.2026 13:00:00;900\n01.06.2026 13:15:00;900\n"
    series, skipped = imp.hourly_series(imp.parse_csv(text, TZ)["quarters"])
    assert skipped == 1
    assert series["house"] == {_utc(2026, 6, 1, 10): pytest.approx(0.4)}


def test_role_series_heat_pump_and_external_guard():
    _, series, _ = _fixture("e3dc_portal_wallbox_wp.csv")
    warnings: list[str] = []
    roles = imp.role_series(series, warnings)
    assert {"heat_pump", "wallbox", "house", "grid_import", "battery_charge"} <= set(roles)
    _, fronius, _ = _fixture("e3dc_portal_fronius.csv")
    assert "external" in imp.role_series(fronius, [])


def test_metadata_is_external_and_german():
    meta = imp._metadata("solar")
    assert meta["source"] == "e3dc_maestro" and meta["statistic_id"] == "e3dc_maestro:history_solar"
    assert meta["has_sum"] and not meta["has_mean"] and meta["unit_of_measurement"] == "kWh"
    assert meta["name"] == "E3DC Maestro Verlauf Solar"
    power = imp._metadata("house_power")
    assert power["has_mean"] and not power["has_sum"] and power["unit_of_measurement"] == "W"


# ---------------------------------------------------------------- preview / apply with fake recorder

def _hass():
    return SimpleNamespace(config=SimpleNamespace(time_zone=TZ))


NOW = _utc(2026, 11, 1, 12, 30)


@pytest.fixture
def fake(monkeypatch):
    env = SimpleNamespace(first={}, history=set(), written=[], cleared=[], extra=[], options={}, rows={})

    async def dash(_hass):
        return {
            "sensors": {
                "solar": {"entity_id": "sensor.pv", "origin": "rscp"},
                "grid_from": {"entity_id": "sensor.grid_in", "origin": "maestro"},
            },
            "extra_solar": env.extra,
        }

    async def first_starts(_hass, ids, _types):
        return {i: env.first.get(i) for i in ids}

    async def existing(_hass):
        return set(env.history) | set(env.rows)

    async def read_existing(_hass, ids):
        return {i: env.rows.get(i, (None, {})) for i in ids}

    async def write(_hass, meta, rows):
        env.written.append((meta, rows))

    async def clear(_hass, ids):
        env.cleared.extend(ids)

    async def flush(_hass):
        return None

    monkeypatch.setattr(imp, "async_energy_dashboard_preview", dash)
    monkeypatch.setattr(imp, "_read_first_starts", first_starts)
    monkeypatch.setattr(imp, "_existing_history_ids", existing)
    monkeypatch.setattr(imp, "_read_existing", read_existing)
    monkeypatch.setattr(imp, "_write", write)
    monkeypatch.setattr(imp, "_clear", clear)
    monkeypatch.setattr(imp, "_flush", flush)
    monkeypatch.setattr(imp, "_now", lambda: NOW)
    monkeypatch.setattr(imp, "_options", lambda _hass: env.options)
    return env


CSV = (FIX / "e3dc_portal_fronius.csv").read_text(encoding="utf-8-sig")


async def test_preview_per_role_without_live_statistics(fake):
    res = await imp.preview(_hass(), CSV)
    assert res["ok"], res
    series = res["series"]
    assert {"solar", "external", "grid_import", "grid_export", "battery_charge",
            "battery_discharge", "house", "house_power"} <= set(series)
    solar = series["solar"]
    assert solar["statistic_id"] == "e3dc_maestro:history_solar"
    assert solar["hours"] == 8 and solar["cutoff"] == _utc(2026, 11, 1, 11).isoformat()
    assert solar["cutoff_source"] == "now_minus_margin" and solar["total_kwh"] > 0
    assert "no_live_entity" in series["grid_export"]["warnings"]
    assert fake.written == []


async def test_apply_writes_only_e3dc_maestro_ids_with_forward_sums(fake):
    res = await imp.apply(_hass(), CSV)
    assert res["ok"], res
    ids = {m["statistic_id"] for m, _ in fake.written}
    assert ids and all(i.startswith("e3dc_maestro:history_") for i in ids)
    assert "sensor.pv" not in ids and "sensor.grid_in" not in ids
    for meta, rows in fake.written:
        assert meta["source"] == "e3dc_maestro"
        if meta["has_sum"]:
            sums = [r["sum"] for r in rows]
            assert rows[0]["sum"] == rows[0]["state"] >= 0
            assert all(b >= a >= 0 for a, b in zip(sums, sums[1:]))
        else:
            assert meta["has_mean"] and all("mean" in r and "sum" not in r for r in rows)
    assert res["written"]["e3dc_maestro:history_house_power"] == 8
    assert fake.cleared == []


async def test_cutoff_is_earliest_live_statistics_row(fake):
    fake.first = {"sensor.pv": _utc(2026, 6, 15, 10)}
    res = await imp.apply(_hass(), CSV)
    solar_rows = dict((m["statistic_id"], r) for m, r in fake.written)["e3dc_maestro:history_solar"]
    assert all(r["start"] < _utc(2026, 6, 15, 10) for r in solar_rows)
    assert res["series"]["solar"]["cutoff_source"] == "live_statistics"
    assert res["series"]["solar"]["hours_skipped_cutoff"] > 0
    # roles without live entity still use now - margin
    assert res["series"]["grid_export"]["cutoff_source"] == "now_minus_margin"


async def test_house_power_cutoff_uses_live_house_power_sensor(fake):
    fake.options = {"house_power_sensor": "sensor.house_w"}
    fake.first = {"sensor.house_w": _utc(2026, 6, 15, 10)}
    res = await imp.preview(_hass(), CSV)
    assert res["series"]["house_power"]["cutoff"] == _utc(2026, 6, 15, 10).isoformat()


async def test_replace_clears_only_rewritten_series(fake):
    fake.history = {"e3dc_maestro:history_solar", "e3dc_maestro:history_unrelated_x"}
    res = await imp.apply(_hass(), CSV, mode="replace")
    assert res["ok"], res
    assert fake.cleared == ["e3dc_maestro:history_solar"]  # only the series being rewritten
    assert fake.written
    res = await imp.apply(_hass(), CSV, None, True)  # legacy bool still means replace
    assert res["ok"] and res["mode"] == "replace"


async def test_apply_aborts_when_live_statistics_changed(fake):
    pre = await imp.preview(_hass(), CSV)
    fake.first = {"sensor.pv": _utc(2026, 6, 15, 10)}
    res = await imp.apply(_hass(), CSV, expected_hash=pre["plan_hash"])
    assert not res["ok"] and "plan_changed" in res["errors"] and fake.written == []


async def test_external_cutoff_uses_extra_solar_meters(fake):
    fake.extra = ["sensor.fronius_a", "sensor.fronius_b"]
    fake.first = {"sensor.fronius_a": _utc(2026, 6, 15, 10), "sensor.fronius_b": _utc(2026, 6, 15, 11)}
    res = await imp.preview(_hass(), CSV)
    assert res["series"]["external"]["cutoff"] == _utc(2026, 6, 15, 10).isoformat()


async def test_dst_fall_back_import_sums_all_four_hours(fake):
    text = HEAD + "\n" + _hour_rows("25.10.2026", "01", "100;0;0;0;0") + _hour_rows("25.10.2026", "02", "100;0;0;0;0")
    text += _hour_rows("25.10.2026", "02", "200;0;0;0;0") + _hour_rows("25.10.2026", "03", "300;0;0;0;0")
    res = await imp.apply(_hass(), text)
    assert res["ok"], res
    rows = dict((m["statistic_id"], r) for m, r in fake.written)["e3dc_maestro:history_solar"]
    assert [r["start"] for r in rows] == [
        _utc(2026, 10, 24, 23), _utc(2026, 10, 25, 0), _utc(2026, 10, 25, 1), _utc(2026, 10, 25, 2)]
    assert [r["sum"] for r in rows] == pytest.approx([0.1, 0.2, 0.4, 0.7])


async def test_remove_history_clears_only_history_series(monkeypatch):
    cleared = []

    async def existing(_hass):
        return {"e3dc_maestro:history_b", "e3dc_maestro:history_a"}

    async def clear(_hass, ids):
        cleared.extend(ids)

    async def flush(_hass):
        return None

    monkeypatch.setattr(imp, "_existing_history_ids", existing)
    monkeypatch.setattr(imp, "_clear", clear)
    monkeypatch.setattr(imp, "_flush", flush)
    res = await imp.remove_history(_hass())
    assert res["ok"] and cleared == ["e3dc_maestro:history_a", "e3dc_maestro:history_b"]


# ---------------------------------------------------------------- multi file / extend

SID = "e3dc_maestro:history_solar"


def _csv(*days_watts: tuple[str, int]) -> str:
    """One CSV with solar W per (dd.mm.yyyy, W); two local hours per day (12h, 13h = 11Z, 12Z in winter)."""
    text = HEAD + "\n"
    for day, watts in days_watts:
        text += _hour_rows(day, "12", f"{watts};0;0;0;0") + _hour_rows(day, "13", f"{watts};0;0;0;0")
    return text


Y24, Y25, Y26 = ("10.01.2024", 1000), ("10.01.2025", 2000), ("10.01.2026", 3000)


def _solar(fake):
    return dict((m["statistic_id"], r) for m, r in fake.written)[SID]


def _existing(*days_watts):
    """Existing solar series as the fake recorder returns it: (metadata, {hour: kWh})."""
    values = {}
    for day, watts in days_watts:
        d, m, y = (int(x) for x in day.split("."))
        for h in (11, 12):
            values[_utc(y, m, d, h)] = watts / 1000.0
    return ({"source": "e3dc_maestro", "statistic_id": SID, "name": "kept"}, values)


def _sums(rows):
    return [r["sum"] for r in rows]


async def test_extend_appends_later_year_with_continuous_sums(fake):
    fake.rows = {SID: _existing(Y24)}
    res = await imp.apply(_hass(), [_csv(Y25)])
    assert res["ok"], res
    assert res["series"]["solar"]["hours_existing"] == 2 and res["series"]["solar"]["hours_new"] == 2
    assert res["series"]["solar"]["hours_total"] == 4
    assert _sums(_solar(fake)) == pytest.approx([1.0, 2.0, 4.0, 6.0])
    assert res["series"]["solar"]["first"] == _utc(2024, 1, 10, 11).isoformat()
    assert res["series"]["solar"]["last"] == _utc(2025, 1, 10, 12).isoformat()


async def test_extend_prepends_earlier_year_and_shifts_sums(fake):
    fake.rows = {SID: _existing(Y25)}
    res = await imp.apply(_hass(), _csv(Y24))
    assert res["ok"], res
    rows = _solar(fake)
    assert [r["start"] for r in rows][0] == _utc(2024, 1, 10, 11) and len(rows) == 4
    assert _sums(rows) == pytest.approx([1.0, 2.0, 4.0, 6.0])
    assert rows[0]["sum"] == rows[0]["state"]
    assert all(b >= a for a, b in zip(_sums(rows), _sums(rows)[1:]))
    assert fake.cleared == []


async def test_extend_keeps_gap_between_years(fake):
    fake.rows = {SID: _existing(Y24)}
    await imp.apply(_hass(), _csv(Y26))
    rows = _solar(fake)
    assert [r["start"].year for r in rows] == [2024, 2024, 2026, 2026]
    assert _sums(rows) == pytest.approx([1.0, 2.0, 5.0, 8.0])


async def test_three_files_at_once_equal_single_combined_csv(fake):
    res = await imp.apply(_hass(), [_csv(Y25), _csv(Y24), _csv(Y26)])
    assert res["ok"], res
    multi = _solar(fake)
    assert [f["hours"] for f in res["files"]] == [2, 2, 2] and res["files"][1]["index"] == 2
    assert res["files"][0]["period"]["first"] == _utc(2025, 1, 10, 11).isoformat()
    fake.written.clear()
    await imp.apply(_hass(), _csv(Y24, Y25, Y26))
    assert _solar(fake) == multi
    assert _sums(multi) == pytest.approx([1.0, 2.0, 4.0, 6.0, 9.0, 12.0])


async def test_overlapping_files_first_wins_and_mismatch_warns(fake):
    res = await imp.preview(_hass(), [_csv(Y24, Y25), _csv(("10.01.2025", 2000), Y26)])
    assert res["ok"] and "overlap_mismatch:solar" not in res["warnings"]
    assert res["files"][1]["overlap_hours"] == 2 and res["files"][0]["overlap_hours"] == 0
    res = await imp.apply(_hass(), [_csv(Y24, Y25), _csv(("10.01.2025", 2500), Y26)])
    assert res["warnings"].count("overlap_mismatch:solar") == 1
    assert _sums(_solar(fake)) == pytest.approx([1.0, 2.0, 4.0, 6.0, 9.0, 12.0])  # first file's 2000 W wins


async def test_existing_hours_win_over_new_data(fake):
    fake.rows = {SID: _existing(Y24, Y25)}
    res = await imp.apply(_hass(), [_csv(("10.01.2025", 9000), Y26)])
    assert res["ok"], res
    assert "existing_hours_kept:solar:2" in res["warnings"]
    assert _sums(_solar(fake)) == pytest.approx([1.0, 2.0, 4.0, 6.0, 9.0, 12.0])
    assert _solar(fake) and dict((m["statistic_id"], m) for m, _ in fake.written)[SID]["name"] == "kept"


async def test_nothing_to_import_when_identical(fake):
    fake.rows = {SID: _existing(Y24, Y25)}
    solar_only = "\"Zeitstempel\";\"Solarproduktion [W]\"\n" + "".join(
        _hour_rows(d, h, str(w)) for d, w in (Y24, Y25) for h in ("12", "13"))
    res = await imp.apply(_hass(), solar_only)
    assert not res["ok"] and "nothing_to_import" in res["errors"] and fake.written == []
    assert "history_exists" not in res["errors"] and res["existing_history"] == [SID]


async def test_per_file_error_writes_nothing(fake):
    res = await imp.apply(_hass(), [_csv(Y24), "foo;bar\n1;2\n"])
    assert not res["ok"] and "file_2:no_timestamp" in res["errors"]
    assert fake.written == [] and fake.cleared == []


async def test_extend_writes_only_history_ids(fake):
    fake.rows = {SID: _existing(Y24)}
    await imp.apply(_hass(), _csv(Y25))
    assert fake.written and all(m["statistic_id"].startswith("e3dc_maestro:history_") for m, _ in fake.written)


async def test_replace_drops_old_years(fake):
    fake.rows = {SID: _existing(Y24)}
    res = await imp.apply(_hass(), _csv(Y25), mode="replace")
    assert res["ok"] and fake.cleared == [SID]
    assert _sums(_solar(fake)) == pytest.approx([2.0, 4.0])


async def test_plan_hash_changes_with_existing_history_and_mode(fake):
    fake.rows = {SID: _existing(Y24)}
    pre = await imp.preview(_hass(), _csv(Y25))
    fake.rows = {SID: _existing(Y24, Y26)}
    res = await imp.apply(_hass(), _csv(Y25), expected_hash=pre["plan_hash"])
    assert not res["ok"] and "plan_changed" in res["errors"] and fake.written == []
    assert (await imp.preview(_hass(), _csv(Y25), "replace"))["plan_hash"] != (
        await imp.preview(_hass(), _csv(Y25)))["plan_hash"]
