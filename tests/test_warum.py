"""Tests for the Warum backend helpers (decision path / why-not / what-if)."""
from __future__ import annotations

from dataclasses import replace

from custom_components.e3dc_maestro.control_engine import MaestroParams, decide
from custom_components.e3dc_maestro.warum import (
    build_warum_payload,
    energy_balance,
    explain_why_not,
    run_what_if,
)
from test_decide_golden_master import _golden_cases


def _case(case_id: str):
    return next(c for c in _golden_cases() if c.case_id == case_id)


def test_path_and_winning_gate_from_emergency():
    c = _case("emergency_below_threshold")
    d = decide(c.state, c.params, c.now, **c.kwargs)
    payload = build_warum_payload(
        decision=d,
        state=c.state,
        params=c.params,
        now=c.now,
        decide_kwargs=c.kwargs,
        short_explanation="Kurz",
    )
    assert payload["phase"] == "emergency"
    assert payload["winning_gate"] == "2.emergency"
    assert payload["short_explanation"] == "Kurz"
    assert any(g["name"] == "2.emergency" for g in payload["path"])
    assert payload["energy_balance"]["pv_w"] == c.state.pv_power


def test_why_not_is_current():
    c = _case("emergency_below_threshold")
    d = decide(c.state, c.params, c.now, **c.kwargs)
    why = explain_why_not(d, "emergency")
    assert why["status"] == "is_current"


def test_why_not_higher_priority_when_emergency_wins():
    c = _case("emergency_below_threshold")
    d = decide(c.state, c.params, c.now, **c.kwargs)
    why = explain_why_not(d, "corridor")
    assert why["status"] == "higher_priority_won"
    assert why["blocking_gate"] == "2.emergency"


def test_why_not_evaluated_failed_for_off_when_active():
    c = _case("idle_at_charge_target")
    d = decide(c.state, c.params, c.now, **c.kwargs)
    # Gate 1.off is always evaluated first and fails when regelung_aktiv
    why = explain_why_not(d, "off")
    assert why["status"] == "evaluated_failed"
    assert why["failed_terms"]
    assert why["failed_terms"][0]["name"] == "regelung_aktiv"


def test_what_if_turns_off_regelung():
    c = _case("idle_at_charge_target")
    d = decide(c.state, c.params, c.now, **c.kwargs)
    assert d.phase != "off"
    result = run_what_if(
        c.state,
        c.params,
        c.now,
        decide_kwargs={**c.kwargs, "regelung_aktiv": False},
        baseline=d,
    )
    assert result["result_phase"] == "off"
    assert result["changed"] is True
    assert result["winning_gate"] == "1.off"


def test_what_if_param_override_via_payload():
    c = _case("hard_soc_limit_at_cap")
    d = decide(c.state, c.params, c.now, **c.kwargs)
    payload = build_warum_payload(
        decision=d,
        state=c.state,
        params=c.params,
        now=c.now,
        decide_kwargs=c.kwargs,
        what_if_params={"hard_soc_limit_enabled": False},
    )
    assert payload["what_if"] is not None
    assert payload["what_if"]["overrides"]["params"]["hard_soc_limit_enabled"] is False
    # Disabling the hard cap should leave the original phase or move elsewhere,
    # but must not crash and must report a concrete result phase.
    assert isinstance(payload["what_if"]["result_phase"], str)


def test_energy_balance_keys():
    c = _case("idle_at_charge_target")
    d = decide(c.state, c.params, c.now, **c.kwargs)
    bal = energy_balance(c.state, d)
    for key in (
        "pv_w",
        "house_w",
        "battery_w",
        "grid_w",
        "charge_power_limit",
        "discharge_power_limit",
        "note",
    ):
        assert key in bal


def test_build_payload_without_decision():
    payload = build_warum_payload(decision=None)
    assert payload["phase"] is None
    assert payload["path"] == []
    assert "Noch keine" in payload["short_explanation"]


def test_lookback_picks_at_or_before():
    from custom_components.e3dc_maestro.warum import find_history_snapshot

    history = [
        {"phase": "idle", "timestamp": "2026-11-09T07:00:00+01:00", "warum_snapshot": {"winning_gate": "10.idle"}},
        {"phase": "corridor", "timestamp": "2026-11-09T06:30:00+01:00", "warum_snapshot": {"winning_gate": "7.corridor"}},
        {"phase": "astro_wait", "timestamp": "2026-11-09T05:00:00+01:00"},
    ]
    hit = find_history_snapshot(history, "2026-11-09T06:32:00+01:00")
    assert hit is not None
    assert hit["phase"] == "corridor"
    assert hit["warum_snapshot"]["winning_gate"] == "7.corridor"
    # Prefer the last change at/before the ask time, not a closer entry after it.
    hit_mid = find_history_snapshot(history, "2026-11-09T06:50:00+01:00")
    assert hit_mid is not None
    assert hit_mid["phase"] == "corridor"
    # Only future entries → fall back to nearest after.
    hit_early = find_history_snapshot(history, "2026-11-09T04:00:00+01:00")
    assert hit_early is not None
    assert hit_early["phase"] == "astro_wait"


def test_context_notes_include_hp():
    c = _case("emergency_below_threshold")
    d = decide(c.state, c.params, c.now, **c.kwargs)
    payload = build_warum_payload(
        decision=d,
        state=c.state,
        params=c.params,
        now=c.now,
        hp_explanation="12:00 Wärmepumpe eingeschaltet: Überschuss 800 W.",
    )
    assert any(n["id"] == "heat_pump" for n in payload["context_notes"])


def test_build_payload_lookback_from_history():
    c = _case("idle_at_charge_target")
    d = decide(c.state, c.params, c.now, **c.kwargs)
    history = [
        {
            "phase": "corridor",
            "timestamp": "2026-11-09T06:30:00+01:00",
            "warum_snapshot": {"winning_gate": "7.corridor", "terms": []},
        },
    ]
    payload = build_warum_payload(
        decision=d,
        state=c.state,
        params=c.params,
        now=c.now,
        lookback_at="2026-11-09T06:32:00+01:00",
        action_history=history,
    )
    assert payload["lookback"] is not None
    assert payload["lookback"]["phase"] == "corridor"
    assert payload["lookback"]["warum_snapshot"]["winning_gate"] == "7.corridor"


def test_answer_current_has_headline_and_bullets():
    c = _case("emergency_below_threshold")
    d = decide(c.state, c.params, c.now, **c.kwargs)
    payload = build_warum_payload(decision=d, state=c.state, params=c.params, now=c.now,
                                  decide_kwargs=c.kwargs, topic="current")
    ans = payload["answer"]
    assert ans["topic"] == "current"
    assert ans["headline"]
    assert ans["bullets"]
    assert "–" not in ans["headline"] and "—" not in ans["headline"]
    assert isinstance(ans["tunables"], list)


def _answer(case_id: str, topic: str, lang: str = "de"):
    c = _case(case_id)
    d = decide(c.state, c.params, c.now, **c.kwargs)
    payload = build_warum_payload(decision=d, state=c.state, params=c.params, now=c.now,
                                  decide_kwargs=c.kwargs, topic=topic, lang=lang)
    return d, payload["answer"]


def _no_dashes(ans):
    texts = [ans["headline"]] + [b["text"] for b in ans["bullets"]]
    assert all("–" not in t and "—" not in t for t in texts)


def test_no_discharge_zero_w_limit_is_a_lock():
    d, ans = _answer("discharge_lock_full", "no_discharge")
    assert d.discharge_power_limit == 0
    assert "gesperrt" in ans["headline"] and "0 W" in ans["headline"]
    assert "discharge_lock" in ans["headline"]
    assert any(not b["ok"] and "0 W gesperrt" in b["text"] for b in ans["bullets"])
    _no_dashes(ans)


def test_no_discharge_price_slot_hold_names_slot():
    _, ans = _answer("grid_hold_target_reached", "no_discharge")
    assert "0 W" in ans["headline"] and "Preis-Slot" in ans["headline"]


def test_no_discharge_free_limit_does_not_claim_lock():
    d, ans = _answer("idle_at_charge_target", "no_discharge")
    assert d.discharge_power_limit is None
    assert "gesperrt" not in ans["headline"]
    assert "frei" in ans["headline"] and "Force" in ans["headline"]
    limit_bullet = next(b for b in ans["bullets"] if "Entladen" in b["text"])
    assert limit_bullet["ok"] is True and "gesperrt" not in limit_bullet["text"]
    _no_dashes(ans)


def test_no_discharge_english():
    _, ans = _answer("discharge_lock_full", "no_discharge", "en")
    assert "blocked at 0 W" in ans["headline"]


def test_no_charge_has_headline_and_bullets():
    d, ans = _answer("hard_soc_limit_at_cap", "no_charge")
    assert ans["topic"] == "no_charge"
    assert "gesperrt" in ans["headline"] and "hard_soc_limit" in ans["headline"]
    assert ans["bullets"]
    _no_dashes(ans)


def test_no_charge_free_limit_not_blocked():
    _, ans = _answer("pv_delay_cooldown_after_feed_in", "no_charge")
    assert "gesperrt" not in ans["headline"]
    assert ans["bullets"]


def test_answer_price_plan_topic():
    c = _case("idle_at_charge_target")
    d = decide(c.state, c.params, c.now, **c.kwargs)
    info = {
        "price_plan_enabled": True,
        "price_plan_active": False,
        "status": "ok",
        "message": "Plan berechnet",
        "summary": "Netzladung ab 02:00",
        "min_spread": 0.03,
        "efficiency": 0.9,
        "safety_factor": 1.15,
        "terminal_need_kwh": 4.5,
        "max_grid_charge_kwh": 12.0,
        "low_slot_grid_charge_jit": True,
        "next_charge": {"start_local": "02:00", "grid_charge_kwh": 3.2},
    }
    payload = build_warum_payload(
        decision=d,
        state=c.state,
        params=c.params,
        now=c.now,
        price_plan_info=info,
        topic="price_plan",
    )
    ans = payload["answer"]
    texts = " ".join([ans["headline"]] + [b["text"] for b in ans["bullets"]])
    assert "Netzladung" in texts
    assert "0,03" in texts or "0.03" in texts or "Mindestspanne" in texts
    assert "Schattenmodus" in texts or "aktiv" in texts


def test_answer_wallbox_guard_topic():
    c = _case("idle_at_charge_target")
    params = replace(
        c.params,
        wallbox_discharge_guard_enabled=True,
        wallbox_discharge_guard_threshold_w=1000.0,
    )
    state = replace(c.state, wallbox_power=4000.0)
    d = decide(state, params, c.now, **c.kwargs)
    payload = build_warum_payload(
        decision=d,
        state=state,
        params=params,
        now=c.now,
        topic="wallbox",
    )
    ans = payload["answer"]
    joined = ans["headline"] + " " + " ".join(b["text"] for b in ans["bullets"])
    assert "Wallbox" in joined
    assert "Schutz" in joined or "Schwelle" in joined or "Entladeschutz" in joined


def test_answer_heat_pump_topic():
    c = _case("emergency_below_threshold")
    params = replace(c.params, hp_enabled=True)
    hp_text = "12:00 Wärmepumpe eingeschaltet: Überschuss 800 W."
    payload = build_warum_payload(
        decision=decide(c.state, params, c.now, **c.kwargs),
        state=c.state,
        params=params,
        now=c.now,
        hp_explanation=hp_text,
        topic="heat_pump",
    )
    ans = payload["answer"]
    assert hp_text in ans["headline"] or any(hp_text in b["text"] for b in ans["bullets"])


def test_tunables_charge_target_key():
    from custom_components.e3dc_maestro.warum import build_tunables

    c = _case("idle_at_charge_target")
    tun = build_tunables(["charge_target", "unknown_key"], c.params)
    assert len(tun) == 1
    assert tun[0]["key"] == "charge_target"
    assert tun[0]["value"] == c.params.charge_target


def test_tunables_from_setting_keys():
    c = _case("hard_soc_limit_at_cap")
    d = decide(c.state, c.params, c.now, **c.kwargs)
    payload = build_warum_payload(
        decision=d,
        state=c.state,
        params=c.params,
        now=c.now,
        topic="no_charge",
    )
    tun = payload["answer"]["tunables"]
    assert tun
    assert any(t["key"] == "hard_soc_limit" for t in tun)


def test_what_if_includes_diff_when_override_changes_outcome():
    c = _case("hard_soc_limit_at_cap")
    d = decide(c.state, c.params, c.now, **c.kwargs)
    payload = build_warum_payload(
        decision=d,
        state=c.state,
        params=c.params,
        now=c.now,
        decide_kwargs=c.kwargs,
        what_if_params={"hard_soc_limit_enabled": False},
    )
    wi = payload["what_if"]
    assert wi is not None
    assert "diff_text" in wi
    assert wi["diff_text"].startswith("Dann:")
    assert wi["diff"]["phase_before"] == d.phase
    assert wi["diff"]["charge_limit_before"] == 1.0
    assert wi["diff"]["charge_limit_after"] != wi["diff"]["charge_limit_before"]
