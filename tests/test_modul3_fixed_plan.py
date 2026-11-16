"""Modul 3 mit Zeiten pro Quartal und Preisplan für feste Tarife.

Referenz: Stadtwerke Jena Netze 2026 (NT 22:15–06:15, HT 17–20, nur Q1+Q4).
Der Preisplan bekommt ohne Preis-Sensor eine Kurve aus Festpreis plus
Netzentgelt und darf nur laden, wenn die Prognose es verlangt.
"""
from __future__ import annotations

import asyncio
import datetime as dt
from types import SimpleNamespace
from zoneinfo import ZoneInfo

import pytest

from custom_components.e3dc_maestro.control_engine import MaestroParams, MaestroState
from custom_components.e3dc_maestro.control_tariff import (
    TARIFF_HIGH,
    TARIFF_LOW,
    TariffSlot,
    current_tariff_class,
    tariff_schedule_from_params,
)
from custom_components.e3dc_maestro.coordinator_helpers import _params_from_options
from custom_components.e3dc_maestro.coordinator_price_plan import CoordinatorPricePlanMixin
from custom_components.e3dc_maestro.modul3 import (
    ZONE_HT,
    ZONE_NT,
    ZONE_ST,
    clean_modul3_zones,
    derived_tariff_slots,
    fixed_price_horizon,
    gate_stored_modul3_slots,
    migrate_copied_modul3_slots,
    modul3_runtime_status,
    parse_modul3_profile,
    zone_at,
)
from custom_components.e3dc_maestro.price_plan_runner import compute_price_plan

BERLIN = ZoneInfo("Europe/Berlin")

JENA_ZONES = {
    "nt": {"price_ct_kwh": 2.32, "windows": [{"start_h": 22.25, "end_h": 6.25}]},
    "st": {"price_ct_kwh": 6.82, "windows": []},
    "ht": {"price_ct_kwh": 13.58, "windows": [{"start_h": 17.0, "end_h": 20.0}]},
}

# Q4 mit eigenen Zeiten: NT 23–05, HT 16–19. Q1 nutzt die gemeinsamen.
JENA_Q4_OWN = {
    "nt": {**JENA_ZONES["nt"], "quarter_windows": {"4": [{"start_h": 23.0, "end_h": 5.0}]}},
    "st": JENA_ZONES["st"],
    "ht": {**JENA_ZONES["ht"], "quarter_windows": {"4": [{"start_h": 16.0, "end_h": 19.0}]}},
}


def _options(zones=JENA_ZONES, quarters=(1, 4), **extra) -> dict:
    options = {
        "modul3_enabled": True,
        "modul3_add_to_curve": True,
        "modul3_vat": "off",
        "modul3_zones": zones,
        "modul3_tariff_slots": True,
        "modul3_quarters": list(quarters),
    }
    options.update(extra)
    return options


def _at(month: int, day: int, hour: int, minute: int = 0) -> dt.datetime:
    return dt.datetime(2026, month, day, hour, minute, tzinfo=BERLIN)


# ── Zeiten pro Quartal ─────────────────────────────────────────────────────


@pytest.mark.parametrize(
    ("when", "zone"),
    [
        (_at(1, 14, 22, 30), ZONE_NT),   # Q1: gemeinsames NT ab 22:15
        (_at(1, 14, 16, 30), ZONE_ST),
        (_at(1, 14, 17, 30), ZONE_HT),
        (_at(11, 16, 22, 30), ZONE_ST),  # Q4: eigenes NT erst ab 23:00
        (_at(11, 16, 23, 30), ZONE_NT),
        (_at(11, 16, 16, 30), ZONE_HT),  # Q4: eigenes HT ab 16:00
        (_at(11, 16, 19, 30), ZONE_ST),
        (_at(7, 15, 23, 30), ZONE_ST),   # Q3 nicht gewählt
    ],
)
def test_zone_uses_quarter_windows(when, zone):
    assert zone_at(when, parse_modul3_profile(_options(JENA_Q4_OWN))) == zone


def test_derived_slots_carry_their_quarters():
    slots = derived_tariff_slots(parse_modul3_profile(_options(JENA_Q4_OWN)))
    got = {(s.class_, s.start_h, s.end_h): s.quarters for s in slots}
    assert got == {
        (TARIFF_LOW, 22.25, 6.25): frozenset({1}),
        (TARIFF_LOW, 23.0, 5.0): frozenset({4}),
        (TARIFF_HIGH, 17.0, 20.0): frozenset({1}),
        (TARIFF_HIGH, 16.0, 19.0): frozenset({4}),
    }


def test_derived_slots_unchanged_without_quarter_windows():
    slots = derived_tariff_slots(parse_modul3_profile(_options()))
    assert [(s.class_, s.start_h, s.end_h, s.quarters) for s in slots] == [
        (TARIFF_LOW, 22.25, 6.25, frozenset({1, 4})),
        (TARIFF_HIGH, 17.0, 20.0, frozenset({1, 4})),
    ]


def test_schedule_follows_quarter_windows():
    schedule = tariff_schedule_from_params(_params_from_options(_options(JENA_Q4_OWN)))
    assert current_tariff_class(_at(1, 14, 22, 30), schedule) == TARIFF_LOW
    assert current_tariff_class(_at(11, 16, 22, 30), schedule) != TARIFF_LOW
    assert current_tariff_class(_at(11, 16, 16, 30), schedule) == TARIFF_HIGH
    assert current_tariff_class(_at(7, 15, 23, 30), schedule) != TARIFF_LOW


def test_empty_quarter_override_means_no_window():
    zones = {**JENA_ZONES, "nt": {**JENA_ZONES["nt"], "quarter_windows": {"4": []}}}
    profile = parse_modul3_profile(_options(zones))
    assert zone_at(_at(11, 16, 23, 30), profile) == ZONE_ST
    assert zone_at(_at(1, 14, 23, 30), profile) == ZONE_NT


def test_stored_copy_of_common_window_skips_overridden_quarter():
    copy = TariffSlot(weekdays=frozenset(range(7)), start_h=22.25, end_h=6.25, class_=TARIFF_LOW)
    [gated] = gate_stored_modul3_slots([copy], parse_modul3_profile(_options(JENA_Q4_OWN)))
    assert gated.quarters == frozenset({1})


def test_stored_copy_never_active_when_all_quarters_override():
    zones = {
        **JENA_ZONES,
        "nt": {**JENA_ZONES["nt"], "quarter_windows": {"1": [], "4": []}},
    }
    copy = TariffSlot(weekdays=frozenset(range(7)), start_h=22.25, end_h=6.25, class_=TARIFF_LOW)
    [gated] = gate_stored_modul3_slots([copy], parse_modul3_profile(_options(zones)))
    assert gated.quarters == frozenset()


def test_clean_keeps_quarter_windows_and_drops_junk():
    raw = {
        "nt": {
            "price_ct_kwh": 2.32,
            "windows": [{"start_h": 22.25, "end_h": 6.25}],
            "quarter_windows": {"4": [{"start_h": 23, "end_h": 5}], "7": [], "x": []},
        },
        "st": {"price_ct_kwh": 6.82, "windows": [], "quarter_windows": {"1": []}},
        "ht": {"price_ct_kwh": 13.58, "windows": []},
    }
    cleaned, err = clean_modul3_zones(raw)
    assert err is None
    assert cleaned["nt"]["quarter_windows"] == {"4": [{"start_h": 23.0, "end_h": 5.0}]}
    assert "quarter_windows" not in cleaned["st"]
    assert "quarter_windows" not in cleaned["ht"]


def test_runtime_status_lists_slot_quarters():
    status = modul3_runtime_status(parse_modul3_profile(_options(JENA_Q4_OWN)), _at(11, 16, 23, 30))
    assert status["zone"] == ZONE_NT
    assert {"start_h": 23.0, "end_h": 5.0, "class_": "low", "quarters": [4]} in status["derived_slots"]


def test_migration_skips_profiles_with_quarter_windows():
    options = _options(JENA_Q4_OWN, quarters=(1, 2, 3, 4))
    options.pop("modul3_tariff_slots")
    options["tariff_slots"] = [
        {"weekdays": list(range(7)), "start_h": 22.25, "end_h": 6.25, "class_": "low"},
        {"weekdays": list(range(7)), "start_h": 17.0, "end_h": 20.0, "class_": "high"},
    ]
    assert migrate_copied_modul3_slots(options) is None


# ── Preiskurve aus Festpreis + Modul 3 ──────────────────────────────────────


def test_fixed_horizon_flat_outside_quarters():
    profile = parse_modul3_profile(_options())
    horizon = fixed_price_horizon(profile, 0.32, _at(7, 15, 22, 0))
    assert horizon is not None
    assert horizon.total_hours == pytest.approx(48.0)
    assert horizon.prices == pytest.approx([0.32] * len(horizon.prices))


def test_fixed_horizon_shifts_nt_and_ht_against_st():
    profile = parse_modul3_profile(_options())
    now = _at(1, 14, 16, 7)
    horizon = fixed_price_horizon(profile, 0.32, now)
    assert horizon is not None
    # Erster Slot endet an der Viertelstunde (16:15).
    assert horizon.slot_hours[0] == pytest.approx(8 / 60)
    by_start = {}
    cursor = now
    for hours, price in zip(horizon.slot_hours, horizon.prices):
        by_start[cursor.astimezone(BERLIN).strftime("%H:%M")] = price
        cursor += dt.timedelta(hours=hours)
    assert by_start["16:45"] == pytest.approx(0.32)
    assert by_start["17:00"] == pytest.approx(0.32 + 0.1358 - 0.0682)
    assert by_start["22:00"] == pytest.approx(0.32)
    assert by_start["22:15"] == pytest.approx(0.32 + 0.0232 - 0.0682)


def test_fixed_horizon_ignores_add_to_curve_switch():
    """Ohne Preis-Sensor gibt es keine Kurve, die das Netzentgelt schon enthält."""
    profile = parse_modul3_profile(_options(modul3_add_to_curve=False))
    horizon = fixed_price_horizon(profile, 0.32, _at(1, 14, 16, 0))
    assert horizon is not None and max(horizon.prices) > 0.32


def test_fixed_horizon_none_when_modul3_off():
    profile = parse_modul3_profile(_options(modul3_enabled=False))
    assert fixed_price_horizon(profile, 0.32, _at(1, 14, 16, 0)) is None


def test_fixed_horizon_dst_fall_back():
    """25.10.2026: 03:00 CEST → 02:00 CET. 48 echte Stunden, NT-Grenze bleibt 22:15."""
    profile = parse_modul3_profile(_options(quarters=(1, 2, 3, 4)))
    now = _at(10, 24, 22, 0)
    horizon = fixed_price_horizon(profile, 0.32, now)
    assert horizon is not None
    assert horizon.total_hours == pytest.approx(48.0)
    cursor = now.astimezone(dt.timezone.utc)
    seen = {}
    for hours, price in zip(horizon.slot_hours, horizon.prices):
        seen[cursor.astimezone(BERLIN).replace(tzinfo=None)] = price
        cursor += dt.timedelta(hours=hours)
    assert seen[dt.datetime(2026, 10, 25, 22, 0)] == pytest.approx(0.32)
    assert seen[dt.datetime(2026, 10, 25, 22, 15)] == pytest.approx(0.32 + 0.0232 - 0.0682)


# ── Preisplan: prognosebasiert, kein blindes Laden ──────────────────────────


def _cons_profile() -> list[float]:
    """500 W Grundlast, abends (16–21 Uhr Ortszeit im Winter) 1,5 kW. UTC-Buckets."""
    cons = [500.0] * 24
    for hour_utc in range(15, 20):
        cons[hour_utc] = 1500.0
    return cons


def _plan(now: dt.datetime, soc: float, *, pv=None, quarters=(1, 4)):
    profile = parse_modul3_profile(_options(quarters=quarters, modul3_vat="de"))
    return compute_price_plan(
        horizon=fixed_price_horizon(profile, 0.32, now),
        now=now,
        soc_pct=soc,
        capacity_kwh=10.0,
        floor_pct=10.0,
        ceiling_pct=90.0,
        max_charge_kw=3.0,
        max_discharge_kw=6.0,
        efficiency=0.90,
        min_spread=0.03,
        safety_factor=1.15,
        wear_eur_per_kwh=0.0,
        feed_in_price=0.08,
        cons_profile_w=_cons_profile(),
        house_power_w=500.0,
        pv_today_w=pv,
        pv_tomorrow_w=pv,
        pv_hist_w=[0.0] * 24,
    )


def _rows_local(snap):
    return {
        dt.datetime.fromisoformat(r["start"]).astimezone(BERLIN).strftime("%m-%d %H:%M"): r
        for r in snap.rows
    }


def test_plan_does_nothing_in_summer():
    snap = _plan(_at(7, 15, 13, 0), soc=15.0)
    assert snap.status == "ok"
    assert snap.plan.total_grid_charge_kwh == 0
    assert not any(r["hold"] for r in snap.rows)


def test_plan_charges_before_ht_when_battery_is_low():
    snap = _plan(_at(1, 14, 13, 0), soc=15.0)
    rows = _rows_local(snap)
    before_ht = sum(r["grid_charge_kwh"] for k, r in rows.items() if "01-14 13:00" <= k < "01-14 17:00")
    assert before_ht > 2.0
    assert all(r["grid_charge_kwh"] == 0 for k, r in rows.items() if "01-14 17:00" <= k < "01-14 20:00")


def test_plan_holds_instead_of_charging_when_reserve_suffices():
    snap = _plan(_at(1, 14, 13, 0), soc=60.0)
    rows = _rows_local(snap)
    assert all(r["grid_charge_kwh"] == 0 for k, r in rows.items() if k < "01-14 17:00")
    assert rows["01-14 16:00"]["hold"]


def test_plan_with_all_quarters_skips_charge_when_pv_covers():
    """Q2+Q3 gewählt (Bayernwerk-Fall), sonniger Tag: PV deckt, keine Netzladung tagsüber."""
    pv = [0.0] * 24
    for hour_utc in range(5, 16):
        pv[hour_utc] = 4000.0
    snap = _plan(_at(6, 15, 9, 0), soc=40.0, pv=pv, quarters=(2, 3))
    rows = _rows_local(snap)
    assert all(r["grid_charge_kwh"] == 0 for k, r in rows.items() if k < "06-15 20:00")


# ── Koordinator: Kurve nur ohne Preis-Sensor ────────────────────────────────


class _Fake(CoordinatorPricePlanMixin):
    def __init__(self, options):
        self._params = MaestroParams()
        self._params.price_plan_enabled = True
        self._params.grid_charge_strategy = "dynamic_auto"
        self._params.fixed_buy_price = 0.32
        self.entry = SimpleNamespace(options=options)
        self.hass = SimpleNamespace(
            states=SimpleNamespace(get=lambda _eid: None),
            async_add_executor_job=self._run,
        )
        self.stats = {}
        self._consumption_stats = SimpleNamespace(hourly_profile_w=_cons_profile())
        self._pv_stats = None

    async def _run(self, fn):
        return fn()

    def _read_pv_forecast_profile(self, now, days_ahead=0, ignore_enabled=False):
        return None


async def _update(c, now):
    horizon = await c._async_price_horizon(now)
    state = MaestroState(soc=15.0, pv_power=0.0, grid_power=0.0, battery_power=0.0, house_power=500.0)
    await c._async_update_price_plan(state, now, c._plan_horizon(now, horizon))


def test_coordinator_plans_from_fixed_price_without_sensor():
    c = _Fake(_options(modul3_vat="de"))
    asyncio.run(_update(c, _at(1, 14, 13, 0)))
    assert c.price_plan.status == "ok"
    assert c.price_plan.plan.total_grid_charge_kwh > 0


def test_coordinator_no_fallback_when_sensor_configured():
    c = _Fake(_options(price_sensor="sensor.preis"))
    asyncio.run(_update(c, _at(1, 14, 13, 0)))
    assert c.price_plan.status == "no_prices"


def test_coordinator_no_curve_without_modul3():
    c = _Fake(_options(modul3_enabled=False))
    asyncio.run(_update(c, _at(1, 14, 13, 0)))
    assert c.price_plan.status == "no_prices"
