"""Warum-Abfrage: Entscheidungsweg, Warum-nicht-X und Was-wäre-wenn.

Pure helpers (no Home Assistant imports) so unit tests can call them directly.
The panel websocket handler builds the payload via ``build_warum_payload``.
"""
from __future__ import annotations

from dataclasses import fields, replace
from datetime import datetime
from typing import Any

from .const import ALL_PHASES
from .control_engine import MaestroDecision, MaestroParams, MaestroState, decide
from .explanation import _one_limit
from .gate_trace import Gate, GateTrace, Term

# phase → gate-name prefix (winning_gate should start with this)
PHASE_GATE_PREFIX: dict[str, str] = {
    "off": "1.off",
    "force_discharge": "1.5.force_discharge",
    "discharge_lock": "1.6.discharge_lock",
    "emergency": "2.emergency",
    "feed_in_limit": "3.feed_in",
    "reserve_protection": "4.reserve",
    "evcc_pause": "5.evcc_pause",
    "grid_charge": "6.97.grid_charge",  # also 5.5.price_plan_charge — see _gates_for_phase
    "grid_hold": "6.4.low_slot_hold",  # also 5.5.price_plan_hold
    "ht_protection": "6.ht_protection",
    "morning_discharge": "6.5.morning_discharge",
    "morning_cap": "6.7.morning_cap",
    "astro_wait": "6.75.astro_wait",
    "hard_soc_limit": "6.9.hard_soc_limit",
    "fast_floor": "6.95.fast_floor",
    "corridor": "7.corridor",
    "pv_delay": "7a.pv_delay",
    "spreading": "8.spreading",
    "curtailment_guard": "9.curtailment",
    "idle": "10.idle",
}

# Phases that can be produced by more than one gate family
_PHASE_GATE_ALIASES: dict[str, tuple[str, ...]] = {
    "grid_charge": ("6.97.grid_charge", "5.5.price_plan_charge"),
    "grid_hold": ("6.4.low_slot_hold", "5.5.price_plan_hold"),
    "idle": ("10.idle", "8.spreading.pause", "3.feed_in.battery_full", "7b.lower_corridor"),
    "corridor": ("7.corridor", "7d.post_charge_end", "7e.post_ceiling"),
}


def _jsonable(value: Any) -> Any:
    if value is None or isinstance(value, (bool, int, float, str)):
        return value
    return str(value)


def term_to_dict(t: Term) -> dict[str, Any]:
    return {
        "name": t.name,
        "actual": _jsonable(t.actual),
        "expected": _jsonable(t.expected),
        "setting_key": t.setting_key,
        "passed": t.passed,
    }


def gate_to_dict(g: Gate) -> dict[str, Any]:
    return {
        "name": g.name,
        "result": g.result,
        "terms": [term_to_dict(t) for t in g.terms],
    }


def path_from_trace(trace: GateTrace | None) -> list[dict[str, Any]]:
    if trace is None:
        return []
    return [gate_to_dict(g) for g in trace.gates]


def _prefixes_for_phase(phase: str) -> tuple[str, ...]:
    aliases = _PHASE_GATE_ALIASES.get(phase)
    if aliases:
        return aliases
    prefix = PHASE_GATE_PREFIX.get(phase)
    return (prefix,) if prefix else ()


def _gates_for_phase(trace: GateTrace, phase: str) -> list[Gate]:
    prefixes = _prefixes_for_phase(phase)
    if not prefixes:
        return []
    return [g for g in trace.gates if any(g.name.startswith(p) for p in prefixes)]


def explain_why_not(
    decision: MaestroDecision,
    phase: str,
) -> dict[str, Any]:
    """Explain why ``phase`` is not the current winning phase."""
    if phase not in ALL_PHASES and phase not in PHASE_GATE_PREFIX:
        return {
            "phase": phase,
            "status": "unknown_phase",
            "message": f"Unbekannte Phase „{phase}“.",
            "failed_terms": [],
            "blocking_gate": None,
        }
    if decision.phase == phase:
        return {
            "phase": phase,
            "status": "is_current",
            "message": f"Phase „{phase}“ ist gerade aktiv.",
            "failed_terms": [],
            "blocking_gate": decision.trace.winning_gate if decision.trace else None,
        }

    trace = decision.trace
    if trace is None:
        return {
            "phase": phase,
            "status": "higher_priority_won",
            "message": (
                f"Kein Gate-Protokoll vorhanden. Aktuell gewinnt „{decision.phase}“ "
                f"({decision.reason})."
            ),
            "failed_terms": [],
            "blocking_gate": None,
        }

    matching = _gates_for_phase(trace, phase)
    if not matching:
        return {
            "phase": phase,
            "status": "higher_priority_won",
            "message": (
                f"Phase „{phase}“ wurde nicht geprüft, weil eine höhere Priorität "
                f"gewonnen hat ({trace.winning_gate or decision.phase})."
            ),
            "failed_terms": [],
            "blocking_gate": trace.winning_gate,
        }

    # Prefer the most specific failed gate (last matching with result False)
    failed = [g for g in matching if not g.result]
    if failed:
        gate = failed[-1]
        failed_terms = [term_to_dict(t) for t in gate.terms if not t.passed]
        return {
            "phase": phase,
            "status": "evaluated_failed",
            "message": (
                f"Phase „{phase}“ wurde geprüft (Gate {gate.name}), "
                f"aber Bedingungen sind nicht erfüllt."
            ),
            "failed_terms": failed_terms,
            "blocking_gate": trace.winning_gate,
        }

    # Evaluated and passed but did not become the final winner (e.g. sub-gate)
    gate = matching[-1]
    return {
        "phase": phase,
        "status": "higher_priority_won",
        "message": (
            f"Gate {gate.name} war erfüllt, aber die Entscheidung endete bei "
            f"„{decision.phase}“ ({trace.winning_gate})."
        ),
        "failed_terms": [],
        "blocking_gate": trace.winning_gate,
    }


def energy_balance(
    state: MaestroState | None,
    decision: MaestroDecision | None,
) -> dict[str, Any]:
    pv = float(getattr(state, "pv_power", 0.0) or 0.0) if state else 0.0
    house = float(getattr(state, "house_power", 0.0) or 0.0) if state else 0.0
    battery = float(getattr(state, "battery_power", 0.0) or 0.0) if state else 0.0
    grid = float(getattr(state, "grid_power", 0.0) or 0.0) if state else 0.0
    residual = pv - house - battery
    return {
        "pv_w": pv,
        "house_w": house,
        "battery_w": battery,
        "grid_w": grid,
        "pv_minus_house_minus_battery_w": residual,
        "charge_power_limit": (
            None if decision is None else decision.charge_power_limit
        ),
        "discharge_power_limit": (
            None if decision is None else decision.discharge_power_limit
        ),
        "note": (
            "Bilanz: PV − Haus − Akku ≈ Netz. Positiver Akku = Laden, "
            "positives Netz = Einspeisung (Vorzeichen je nach Sensorik prüfen)."
        ),
    }


def _decision_summary(d: MaestroDecision) -> dict[str, Any]:
    return {
        "phase": d.phase,
        "reason": d.reason,
        "power_mode": d.power_mode,
        "charge_power_limit": d.charge_power_limit,
        "discharge_power_limit": d.discharge_power_limit,
        "target_soc": d.target_soc,
        "target_charge_power": d.target_charge_power,
        "battery_priority": d.battery_priority,
        "winning_gate": d.trace.winning_gate if d.trace else None,
    }


def _apply_overrides(obj: Any, overrides: dict[str, Any]) -> Any:
    """Return a replaced dataclass keeping only known field names."""
    known = {f.name for f in fields(obj)}
    filtered = {k: v for k, v in overrides.items() if k in known}
    return replace(obj, **filtered) if filtered else obj


_PHASE_SHORT: dict[str, dict[str, str]] = {
    "de": {
        "off": "Aus",
        "corridor": "Korridor",
        "grid_charge": "Netzladung",
        "grid_hold": "Preis-Slot halten",
        "idle": "Ruhe (idle)",
        "emergency": "Notladung",
        "hard_soc_limit": "Harte SoC-Grenze",
        "pv_delay": "PV-Verzögerung",
        "spreading": "Ladeverteilung",
    },
    "en": {
        "off": "Off",
        "corridor": "Corridor",
        "grid_charge": "Grid charging",
        "grid_hold": "Holding cheap slot",
        "idle": "Idle",
        "emergency": "Emergency charge",
        "hard_soc_limit": "Hard SoC cap",
        "pv_delay": "PV delay",
        "spreading": "Spreading",
    },
}


def _limit_changed(before: float | None, after: float | None) -> bool:
    if before is None and after is None:
        return False
    if before is None or after is None:
        return True
    return abs(before - after) > 0.5


def _what_if_diff(
    baseline: MaestroDecision,
    result: MaestroDecision,
    lang: str,
) -> dict[str, Any]:
    diff = {
        "phase_before": baseline.phase,
        "phase_after": result.phase,
        "charge_limit_before": baseline.charge_power_limit,
        "charge_limit_after": result.charge_power_limit,
        "discharge_limit_before": baseline.discharge_power_limit,
        "discharge_limit_after": result.discharge_power_limit,
    }
    lang = lang if lang in WARUM_LANGS else "de"
    prefix = "Dann: " if lang == "de" else "Then: "
    labels = _PHASE_SHORT[lang]
    ch_lbl = "Laden" if lang == "de" else "Charging"
    dis_lbl = "Entladen" if lang == "de" else "Discharging"
    parts: list[str] = []
    if baseline.phase != result.phase:
        pa = labels.get(result.phase, result.phase)
        pb = labels.get(baseline.phase, baseline.phase)
        if lang == "de":
            parts.append(f"{pa} statt {pb}")
        else:
            parts.append(f"{pa} instead of {pb}")
    if _limit_changed(baseline.charge_power_limit, result.charge_power_limit):
        parts.append(_one_limit(ch_lbl, result.charge_power_limit))
    if _limit_changed(baseline.discharge_power_limit, result.discharge_power_limit):
        parts.append(_one_limit(dis_lbl, result.discharge_power_limit))
    if not parts:
        none_txt = (
            "Keine Änderung an Phase oder Limits."
            if lang == "de"
            else "No change to phase or limits."
        )
        diff_text = prefix + none_txt
    else:
        diff_text = prefix + ", ".join(parts) + "."
    diff["diff_text"] = diff_text
    return diff


def run_what_if(
    state: MaestroState,
    params: MaestroParams,
    now: datetime,
    *,
    decide_kwargs: dict[str, Any] | None = None,
    param_overrides: dict[str, Any] | None = None,
    state_overrides: dict[str, Any] | None = None,
    baseline: MaestroDecision | None = None,
    lang: str = "de",
) -> dict[str, Any]:
    """Re-run ``decide()`` with overrides; does not mutate inputs."""
    kwargs = dict(decide_kwargs or {})
    new_params = _apply_overrides(params, param_overrides or {})
    new_state = _apply_overrides(state, state_overrides or {})
    result = decide(new_state, new_params, now, **kwargs)
    base_phase = baseline.phase if baseline is not None else None
    out: dict[str, Any] = {
        "overrides": {
            "params": dict(param_overrides or {}),
            "state": dict(state_overrides or {}),
        },
        "baseline_phase": base_phase,
        "result_phase": result.phase,
        "result_reason": result.reason,
        "changed": base_phase is not None and result.phase != base_phase,
        "decision": _decision_summary(result),
        "winning_gate": result.trace.winning_gate if result.trace else None,
        "path": path_from_trace(result.trace),
    }
    if baseline is not None:
        out["diff"] = {
            "phase_before": baseline.phase,
            "phase_after": result.phase,
            "charge_limit_before": baseline.charge_power_limit,
            "charge_limit_after": result.charge_power_limit,
            "discharge_limit_before": baseline.discharge_power_limit,
            "discharge_limit_after": result.discharge_power_limit,
        }
        out["diff_text"] = _what_if_diff(baseline, result, lang)["diff_text"]
    return out


def _context_notes(
    decision: MaestroDecision | None,
    *,
    hp_explanation: str | None = None,
) -> list[dict[str, str]]:
    """Extra context for price plan, wallbox guard, heat pump (Stufe 7)."""
    notes: list[dict[str, str]] = []
    if decision is None:
        return notes
    reason = decision.reason or ""
    if reason.startswith("Preisplan") or decision.phase in ("grid_charge", "grid_hold"):
        phase_bit = ""
        if decision.phase == "grid_charge":
            phase_bit = " Aktuelle Phase: Netzladung (grid_charge)."
        elif decision.phase == "grid_hold":
            phase_bit = " Aktuelle Phase: Halten im günstigen Slot (grid_hold)."
        notes.append(
            {
                "id": "price_plan",
                "text": (
                    "Preisplan: Netzladung bzw. Halten nur bei ausreichender "
                    "Preisspanne nach Wirkungsgrad und Sicherheitsfaktor."
                    f"{phase_bit}"
                ),
            }
        )
    if "günstigen Slot" in reason.lower() or "guenstigen slot" in reason.lower() or "Netzladung im günstigen" in reason:
        notes.append(
            {
                "id": "grid_charge_window",
                "text": (
                    "Netzladung im günstigen Fenster: Ziel-SoC, Just-in-Time und "
                    "Tagesbudget begrenzen, wann und wie viel geladen wird."
                ),
            }
        )
    trace = decision.trace
    if trace is not None and any(g.name == "post.wallbox_discharge_guard" for g in trace.gates):
        notes.append(
            {
                "id": "wallbox_guard",
                "text": (
                    "Wallbox-Entladeschutz hat das Entladelimit geöffnet, "
                    "damit die Wallbox möglichst keinen Netzbezug verursacht."
                ),
            }
        )
    if hp_explanation:
        notes.append({"id": "heat_pump", "text": hp_explanation})
    return notes


def find_history_snapshot(
    history: list[dict[str, Any]] | None,
    at_iso: str,
) -> dict[str, Any] | None:
    """Nearest action_history entry at or before ``at_iso`` (ISO timestamp).

    If nothing is at/before the target, fall back to the nearest entry after it
    (short history window near the start of recording).
    """
    if not history or not at_iso:
        return None
    try:
        target = datetime.fromisoformat(at_iso.replace("Z", "+00:00"))
    except ValueError:
        return None

    best_before: dict[str, Any] | None = None
    best_before_delta: float | None = None
    best_after: dict[str, Any] | None = None
    best_after_delta: float | None = None
    for item in history:
        ts = item.get("timestamp")
        if not isinstance(ts, str):
            continue
        try:
            when = datetime.fromisoformat(ts.replace("Z", "+00:00"))
        except ValueError:
            continue
        if when.tzinfo is None and target.tzinfo is not None:
            when = when.replace(tzinfo=target.tzinfo)
        elif when.tzinfo is not None and target.tzinfo is None:
            target = target.replace(tzinfo=when.tzinfo)
        delta = (target - when).total_seconds()
        if delta >= 0:
            if best_before_delta is None or delta < best_before_delta:
                best_before = item
                best_before_delta = delta
        else:
            after_delta = -delta
            if best_after_delta is None or after_delta < best_after_delta:
                best_after = item
                best_after_delta = after_delta
    return best_before if best_before is not None else best_after


# ---------------------------------------------------------------------------
# Klartext (Warum v2): Term-Name -> (nicht erfüllt, erfüllt) je Sprache.
# Platzhalter: {a} = actual, {e} = expected (bereits mit Einheit formatiert).
# Keine Gedankenstriche in Texten.
# ---------------------------------------------------------------------------
WARUM_TOPICS = (
    "current", "no_discharge", "no_charge", "no_grid_charge", "feed_in",
    "price_plan", "wallbox", "heat_pump", "lookback",
)
WARUM_LANGS = ("de", "en")

# Einheit je Term-Name (Standard: keine)
_TERM_UNITS: dict[str, str] = {
    "soc": "%", "morning_cap_soc": "%", "hard_soc_limit": "%",
    "fast_charge_floor_soc": "%", "delay_min_soc": "%", "fixed_reserve_soc": "%",
    "lower_corridor": "%", "morning_unload_start_soc": "%", "morning_unload_soc": "%",
    "min_charge_power": "W", "wallbox_discharge_guard_threshold_w": "W",
    "evcc_discharge_limit_w": "W", "morning_cap_until_h": "Uhr",
}

TERM_TEXT: dict[str, dict[str, tuple[str, str]]] = {
    "soc": {
        "de": ("SoC {a} liegt nicht im passenden Bereich (gefordert: {e})",
               "SoC {a} passt (gefordert: {e})"),
        "en": ("SoC {a} is not in the required range ({e})",
               "SoC {a} fits ({e})"),
    },
    "regelung_aktiv": {
        "de": ("Regelung ist aus", "Regelung ist aktiv"),
        "en": ("Control is off", "Control is active"),
    },
    "morning_cap_soc": {
        "de": ("SoC {a} liegt über der Morgengrenze von {e}", "SoC {a} liegt unter der Morgengrenze von {e}"),
        "en": ("SoC {a} is above the morning cap of {e}", "SoC {a} is below the morning cap of {e}"),
    },
    "morning_cap_until_h": {
        "de": ("Es ist {a}, die Morgengrenze gilt nur bis {e}", "Es ist {a}, die Morgengrenze gilt noch bis {e}"),
        "en": ("It is {a}, the morning cap only applies until {e}", "It is {a}, the morning cap still applies until {e}"),
    },
    "hard_soc_limit": {
        "de": ("SoC {a} hat die harte Obergrenze von {e} noch nicht erreicht", "SoC {a} hat die harte Obergrenze von {e} erreicht"),
        "en": ("SoC {a} has not reached the hard limit of {e}", "SoC {a} has reached the hard limit of {e}"),
    },
    "fast_charge_floor_soc": {
        "de": ("SoC {a} liegt über der Schnelllade-Untergrenze von {e}", "SoC {a} liegt unter der Schnelllade-Untergrenze von {e}"),
        "en": ("SoC {a} is above the fast charge floor of {e}", "SoC {a} is below the fast charge floor of {e}"),
    },
    "delay_min_soc": {
        "de": ("SoC {a} liegt über dem Mindest-SoC für die Ladeverzögerung von {e}", "SoC {a} liegt unter dem Mindest-SoC für die Ladeverzögerung von {e}"),
        "en": ("SoC {a} is above the minimum SoC for delayed charging ({e})", "SoC {a} is below the minimum SoC for delayed charging ({e})"),
    },
    "fixed_reserve_soc": {
        "de": ("SoC {a} liegt unter der festen Reserve von {e}", "SoC {a} liegt über der festen Reserve von {e}"),
        "en": ("SoC {a} is below the fixed reserve of {e}", "SoC {a} is above the fixed reserve of {e}"),
    },
    "lower_corridor": {
        "de": ("SoC {a} liegt nicht über dem unteren Korridor von {e}", "SoC {a} liegt über dem unteren Korridor von {e}"),
        "en": ("SoC {a} is not above the lower corridor of {e}", "SoC {a} is above the lower corridor of {e}"),
    },
    "min_charge_power": {
        "de": ("Die verfügbare Ladeleistung {a} liegt unter dem Minimum von {e}", "Die verfügbare Ladeleistung {a} reicht für das Minimum von {e}"),
        "en": ("Available charge power {a} is below the minimum of {e}", "Available charge power {a} meets the minimum of {e}"),
    },
    "wallbox_discharge_guard_threshold_w": {
        "de": ("Die Wallbox zieht {a}, der Entladeschutz greift erst ab {e}", "Die Wallbox zieht {a}, der Entladeschutz greift ab {e}"),
        "en": ("The wallbox draws {a}, the discharge guard only acts from {e}", "The wallbox draws {a}, the discharge guard acts from {e}"),
    },
    "morning_unload_start_soc": {
        "de": ("SoC {a} liegt unter dem Start-SoC fürs Morgenentladen von {e}", "SoC {a} erreicht den Start-SoC fürs Morgenentladen von {e}"),
        "en": ("SoC {a} is below the morning unload start of {e}", "SoC {a} reaches the morning unload start of {e}"),
    },
    "morning_unload_soc": {
        "de": ("SoC {a} liegt schon auf oder unter dem Morgen-Entladeziel von {e}", "SoC {a} liegt über dem Morgen-Entladeziel von {e}"),
        "en": ("SoC {a} is already at or below the morning unload target of {e}", "SoC {a} is above the morning unload target of {e}"),
    },
    "evcc_discharge_limit_w": {
        "de": ("Das EVCC-Entladelimit von {e} wird nicht überschritten (aktuell {a})", "Das EVCC-Entladelimit von {e} begrenzt die Entladung (aktuell {a})"),
        "en": ("The EVCC discharge limit of {e} is not exceeded (currently {a})", "The EVCC discharge limit of {e} caps discharging (currently {a})"),
    },
}

_GENERIC_TERM: dict[str, tuple[str, str]] = {
    "de": ("{n}: aktuell {a}, erwartet {e}", "{n}: aktuell {a}, erwartet {e}, passt"),
    "en": ("{n}: currently {a}, expected {e}", "{n}: currently {a}, expected {e}, fits"),
}


def _fmt_value(value: Any, unit: str, lang: str) -> str:
    if value is None:
        return "?"
    if isinstance(value, bool):
        return ("ja" if value else "nein") if lang == "de" else ("yes" if value else "no")
    if isinstance(value, (int, float)):
        num = f"{value:.1f}".rstrip("0").rstrip(".") if isinstance(value, float) else str(value)
        if lang == "de":
            num = num.replace(".", ",")
        if unit == "Uhr":
            return f"{num} Uhr" if lang == "de" else f"{num}:00"
        return f"{num} {unit}".strip()
    return str(value)


def format_term_text(term: Term | dict[str, Any], lang: str = "de") -> str:
    """Klartext for one gate term (Term or term_to_dict output)."""
    if isinstance(term, Term):
        term = term_to_dict(term)
    lang = lang if lang in WARUM_LANGS else "de"
    name = str(term.get("name") or "")
    unit = _TERM_UNITS.get(name, "")
    a = _fmt_value(term.get("actual"), unit, lang)
    e = _fmt_value(term.get("expected"), unit, lang)
    pair = (TERM_TEXT.get(name) or {}).get(lang) or _GENERIC_TERM[lang]
    template = pair[1] if term.get("passed") else pair[0]
    return template.format(a=a, e=e, n=name.replace("_", " "))


_STR = {
    "de": {
        "no_decision": "Noch keine Entscheidung getroffen.",
        "is_current": "Das ist gerade der Fall.",
        "not_checked": "Das wurde nicht geprüft, weil etwas Wichtigeres Vorrang hatte.",
        "failed": "Das passiert gerade nicht, weil nicht alle Bedingungen erfüllt sind.",
        "met_but": "Die Bedingungen wären erfüllt, aber eine andere Regel hatte Vorrang.",
        "no_lookback": "Für diesen Zeitpunkt gibt es keinen Eintrag im Verlauf.",
        "lookback": "Damals lief {phase}.",
        "fu_discharge": "Warum wird nicht entladen?",
        "fu_grid": "Warum wird nicht aus dem Netz geladen?",
        "fu_price": "Wie sieht der Preisplan aus?",
        "fu_feed_in": "Warum wird nicht eingespeist?",
        "fu_current": "Was macht Maestro gerade?",
    },
    "en": {
        "no_decision": "No decision yet.",
        "is_current": "This is happening right now.",
        "not_checked": "This was not checked because something more important took priority.",
        "failed": "This is not happening because not all conditions are met.",
        "met_but": "The conditions would be met, but another rule took priority.",
        "no_lookback": "There is no history entry for that time.",
        "lookback": "At that time {phase} was active.",
        "fu_discharge": "Why is it not discharging?",
        "fu_grid": "Why is it not charging from the grid?",
        "fu_price": "What does the price plan look like?",
        "fu_feed_in": "Why is it not feeding in?",
        "fu_current": "What is Maestro doing right now?",
    },
}

# Thema -> Phase für "warum nicht" (no_discharge / no_charge: eigene Zweige)
_TOPIC_WHY_NOT_PHASE: dict[str, str] = {
    "no_grid_charge": "grid_charge",
    "feed_in": "feed_in_limit",
}

# ---------------------------------------------------------------------------
# Entladen / Laden: Sperren und Limits (be-discharge)
# ---------------------------------------------------------------------------
# Phasen, die das Entladen immer sperren (Limit 0 W)
_DIS_LOCK_PHASES = (
    "discharge_lock", "grid_hold", "ht_protection", "reserve_protection", "evcc_pause",
)
# Phasen, die nur dann als Entladesperre zählen, wenn das Limit wirklich bei 0/1 W liegt
_DIS_COND_PHASES = ("emergency", "morning_cap", "hard_soc_limit")
# Trace-Gates, die (wenn sie gefeuert haben) das Entladen sperren, je Phase
_DIS_LOCK_GATES: dict[str, tuple[str, ...]] = {
    "discharge_lock": ("1.6.discharge_lock",),
    "grid_hold": ("6.4.low_slot_hold", "5.5.price_plan_hold"),
    "ht_protection": ("6.ht_protection",),
    "morning_cap": ("6.7.morning_cap",),
    "hard_soc_limit": ("6.9.hard_soc_limit",),
    "reserve_protection": ("4.reserve",),
    "evcc_pause": ("5.evcc_pause",),
}
# Phasen, die das Laden sperren oder begrenzen
_CH_PHASES = (
    "hard_soc_limit", "morning_cap", "astro_wait", "idle", "pv_delay", "feed_in_limit",
)

_LIM = {
    "de": {
        "free": "{what} ist frei, es ist kein Limit gesetzt.",
        "blocked": "{what} ist auf {w} W gesperrt.",
        "capped": "{what} ist auf max. {w} W begrenzt.",
        "dis": "Entladen", "ch": "Laden",
        "dis_hard": "Entladen ist auf {w} W gesperrt",
        "dis_free_nf": "Entladen ist frei, aber Force-Entladung ist nicht aktiv.",
        "dis_free": "Entladen ist frei, es liegt gerade nur kein Bedarf vor oder keine Regel verlangt es.",
        "dis_capped": "Entladen ist auf max. {w} W begrenzt.",
        "dis_active": "Der Akku wird gerade gezielt entladen ({phase}).",
        "guard": "Der Wallbox-Entladeschutz hat das Entladelimit geöffnet, damit kein Netzbezug entsteht.",
        "force_off": "Force-Entladung ist nicht aktiv.",
        "ch_hard": "Laden ist auf {w} W gesperrt",
        "ch_free": "Laden ist frei, aber gerade ist keine Regel aktiv, die den Akku lädt.",
        "ch_capped": "Laden ist auf max. {w} W begrenzt.",
        "ch_active": "Der Akku wird gerade geladen ({phase}).",
        "soc_target": "SoC {soc} hat das Ladeziel von {t} erreicht.",
        "soc_hard": "SoC {soc} hat die harte Obergrenze von {t} erreicht.",
        "soc_below": "SoC {soc} liegt unter dem Ladeziel von {t}.",
    },
    "en": {
        "free": "{what} is free, no limit is set.",
        "blocked": "{what} is blocked at {w} W.",
        "capped": "{what} is capped at {w} W.",
        "dis": "Discharging", "ch": "Charging",
        "dis_hard": "Discharging is blocked at {w} W",
        "dis_free_nf": "Discharging is free, but forced discharge is not active.",
        "dis_free": "Discharging is free, there is just no demand or no rule asking for it right now.",
        "dis_capped": "Discharging is capped at {w} W.",
        "dis_active": "The battery is being discharged on purpose right now ({phase}).",
        "guard": "The wallbox discharge guard opened the discharge limit to avoid grid import.",
        "force_off": "Forced discharge is not active.",
        "ch_hard": "Charging is blocked at {w} W",
        "ch_free": "Charging is free, but no rule is charging the battery right now.",
        "ch_capped": "Charging is capped at {w} W.",
        "ch_active": "The battery is charging right now ({phase}).",
        "soc_target": "SoC {soc} has reached the charge target of {t}.",
        "soc_hard": "SoC {soc} has reached the hard limit of {t}.",
        "soc_below": "SoC {soc} is below the charge target of {t}.",
    },
}

# Klartext je Phase: Grund der Sperre (wird an die Überschrift gehängt / als Bullet gezeigt)
_PHASE_WHY = {
    "de": {
        "discharge_lock": "der Entladeschutz (discharge_lock) aktiv ist",
        "grid_hold": "der günstige Preis-Slot gehalten wird",
        "ht_protection": "der Hochtarif-Schutz (ht_protection) den Akku für später schont",
        "reserve_protection": "die Reserve geschützt wird (reserve_protection)",
        "evcc_pause": "EVCC gerade eine Pause verlangt (evcc_pause)",
        "emergency": "die Notladung (emergency) Vorrang hat",
        "morning_cap": "die Morgengrenze (morning_cap) gilt",
        "hard_soc_limit": "die harte SoC-Obergrenze (hard_soc_limit) erreicht ist",
        "astro_wait": "Maestro auf den Sonnenaufgang wartet (astro_wait)",
        "idle": "das Ladeziel erreicht ist (idle)",
        "pv_delay": "das Laden auf PV Überschuss verzögert wird (pv_delay)",
        "feed_in_limit": "die Einspeisebegrenzung (feed_in_limit) greift",
    },
    "en": {
        "discharge_lock": "the discharge lock (discharge_lock) is active",
        "grid_hold": "the cheap price slot is being held",
        "ht_protection": "the high tariff protection (ht_protection) is saving the battery for later",
        "reserve_protection": "the reserve is being protected (reserve_protection)",
        "evcc_pause": "EVCC requests a pause (evcc_pause)",
        "emergency": "emergency charging (emergency) takes priority",
        "morning_cap": "the morning cap (morning_cap) applies",
        "hard_soc_limit": "the hard SoC limit (hard_soc_limit) is reached",
        "astro_wait": "Maestro is waiting for sunrise (astro_wait)",
        "idle": "the charge target is reached (idle)",
        "pv_delay": "charging is delayed until PV surplus (pv_delay)",
        "feed_in_limit": "the feed in limit (feed_in_limit) applies",
    },
}


def _bullet(term: dict[str, Any], lang: str) -> dict[str, Any]:
    return {
        "ok": bool(term.get("passed")),
        "text": format_term_text(term, lang),
        "setting_key": term.get("setting_key"),
    }


def _why_not_answer(why: dict[str, Any], lang: str) -> tuple[str, list[dict[str, Any]]]:
    s = _STR[lang]
    status = why.get("status")
    headline = {
        "is_current": s["is_current"],
        "evaluated_failed": s["failed"],
        "higher_priority_won": s["not_checked"],
    }.get(status, why.get("message") or s["not_checked"])
    return headline, [_bullet(t, lang) for t in why.get("failed_terms") or []]


def _follow_ups(topic: str, phase: str | None, lang: str) -> list[dict[str, Any]]:
    s = _STR[lang]
    ups: list[dict[str, Any]] = []
    if topic == "current":
        if phase != "force_discharge":
            ups.append({"topic": "no_discharge", "why_not_phase": None, "label": s["fu_discharge"]})
        if phase != "grid_charge":
            ups.append({"topic": "no_grid_charge", "why_not_phase": None, "label": s["fu_grid"]})
        ups.append({"topic": "price_plan", "why_not_phase": None, "label": s["fu_price"]})
    else:
        ups.append({"topic": "current", "why_not_phase": None, "label": s["fu_current"]})
    return ups


def _cap(text: str) -> str:
    return text[:1].upper() + text[1:]


def _limit_kind(value: float | None) -> str:
    """None = frei, <= 1 W = gesperrt (0 W), sonst echte Begrenzung (wie explanation._one_limit)."""
    if value is None:
        return "free"
    return "blocked" if value <= 1 else "capped"


def _limit_bullet(value: float | None, which: str, lang: str) -> dict[str, Any]:
    lim = _LIM[lang]
    kind = _limit_kind(value)
    text = lim[kind].format(what=lim[which], w=f"{value:.0f}" if value is not None else "")
    return {"ok": kind != "blocked", "text": text, "setting_key": None}


def _because(lang: str) -> str:
    return ", weil " if lang == "de" else ", because "


def _fired_gate_bullets(decision: MaestroDecision, lang: str) -> list[dict[str, Any]]:
    """One blocking bullet per fired lock gate (setting_key from its first keyed term)."""
    out: list[dict[str, Any]] = []
    if decision.trace is None:
        return out
    for phase, prefixes in _DIS_LOCK_GATES.items():
        gate = next(
            (g for g in decision.trace.gates
             if g.result and any(g.name.startswith(p) for p in prefixes)),
            None,
        )
        if gate is not None:
            key = next((t.setting_key for t in gate.terms if t.setting_key), None)
            out.append({"ok": False, "text": _cap(_PHASE_WHY[lang][phase]), "setting_key": key})
    return out


def _secondary_terms(decision: MaestroDecision, phase: str, lang: str) -> list[dict[str, Any]]:
    """Failed terms of ``phase`` as supporting evidence (only if it was evaluated)."""
    if decision.phase == phase:
        return []
    why = explain_why_not(decision, phase)
    if why.get("status") != "evaluated_failed":
        return []
    return [_bullet(t, lang) for t in why.get("failed_terms") or []]


def _answer_no_discharge(
    decision: MaestroDecision, lang: str,
) -> tuple[str, list[dict[str, Any]]]:
    lim = _LIM[lang]
    why_txt = _PHASE_WHY[lang]
    phase = decision.phase
    dis = decision.discharge_power_limit
    kind = _limit_kind(dis)
    hard = kind == "blocked"
    phase_blocks = phase in _DIS_LOCK_PHASES or (phase in _DIS_COND_PHASES and hard)
    w = f"{dis:.0f}" if dis is not None else "0"

    # Primäre Sperre: 1. sperrende Phase  2. hartes 0/1 W Limit  3. Aktiv entladen  4. Begrenzung  5. frei
    if phase_blocks or hard:
        headline = lim["dis_hard"].format(w=w) + _because(lang) + why_txt.get(
            phase, decision.reason or phase) + "."
    elif decision.power_mode == "discharge":
        headline = lim["dis_active"].format(phase=phase)
    elif kind == "capped":
        headline = lim["dis_capped"].format(w=w)
    else:
        headline = lim["dis_free_nf"] if phase != "force_discharge" else lim["dis_free"]

    bullets = _fired_gate_bullets(decision, lang)
    if not bullets and (phase_blocks or hard) and phase in why_txt:
        bullets.append({"ok": False, "text": _cap(why_txt[phase]), "setting_key": None})
    bullets.append(_limit_bullet(dis, "dis", lang))
    if decision.trace is not None and any(
        g.name == "post.wallbox_discharge_guard" and g.result for g in decision.trace.gates
    ):
        bullets.append({"ok": True, "text": lim["guard"], "setting_key": None})
    if phase != "force_discharge":
        bullets.extend(_secondary_terms(decision, "force_discharge", lang))
        bullets.extend(_secondary_terms(decision, "morning_discharge", lang))
    return headline, bullets


def _answer_no_charge(
    decision: MaestroDecision,
    state: MaestroState | None,
    params: MaestroParams | None,
    lang: str,
) -> tuple[str, list[dict[str, Any]]]:
    lim = _LIM[lang]
    why_txt = _PHASE_WHY[lang]
    phase = decision.phase
    ch = decision.charge_power_limit
    kind = _limit_kind(ch)
    bullets: list[dict[str, Any]] = []

    if kind == "blocked":
        headline = lim["ch_hard"].format(w=f"{ch:.0f}") + _because(lang) + why_txt.get(
            phase, decision.reason or phase) + "."
    elif decision.power_mode == "charge" or phase in ("grid_charge", "emergency"):
        headline = lim["ch_active"].format(phase=phase)
    elif kind == "capped":
        headline = lim["ch_capped"].format(w=f"{ch:.0f}")
        if phase in why_txt:
            headline = headline[:-1] + _because(lang) + why_txt[phase] + "."
    else:
        headline = lim["ch_free"]

    if phase in _CH_PHASES:
        bullets.append({"ok": False, "text": _cap(why_txt[phase]), "setting_key": None})
    bullets.append(_limit_bullet(ch, "ch", lang))

    if state is not None and params is not None:
        soc_txt = _fmt_value(float(state.soc), "%", lang)
        if params.hard_soc_limit_enabled and state.soc >= params.hard_soc_limit:
            bullets.append({"ok": False, "setting_key": "hard_soc_limit", "text": lim["soc_hard"].format(
                soc=soc_txt, t=_fmt_value(params.hard_soc_limit, "%", lang))})
        elif state.soc >= params.charge_target:
            bullets.append({"ok": False, "setting_key": "charge_target", "text": lim["soc_target"].format(
                soc=soc_txt, t=_fmt_value(params.charge_target, "%", lang))})
        else:
            bullets.append({"ok": True, "setting_key": "charge_target", "text": lim["soc_below"].format(
                soc=soc_txt, t=_fmt_value(params.charge_target, "%", lang))})

    for ph in ("corridor", "grid_charge"):
        bullets.extend(_secondary_terms(decision, ph, lang))
    return headline, bullets


def price_plan_info_from_snapshot(
    snap: Any | None,
    params: MaestroParams | None,
) -> dict[str, Any] | None:
    """Serialize coordinator price plan snapshot + param flags for Warum."""
    if snap is None and params is None:
        return None
    info: dict[str, Any] = {}
    if snap is not None:
        info["status"] = getattr(snap, "status", None)
        info["message"] = getattr(snap, "message", None) or ""
        summary = getattr(snap, "summary", None)
        if callable(summary):
            info["summary"] = summary()
        elif summary is not None:
            info["summary"] = str(summary)
        else:
            info["summary"] = ""
        for key in (
            "efficiency", "min_spread", "safety_factor", "terminal_need_kwh",
            "floor_pct", "ceiling_pct",
        ):
            val = getattr(snap, key, None)
            if val is not None:
                info[key] = val
        rows = list(getattr(snap, "rows", None) or [])
        charge = next((r for r in rows if (r.get("grid_charge_kwh") or 0) > 0), None)
        if charge is not None:
            info["next_charge"] = {
                "start_local": charge.get("start_local"),
                "grid_charge_kwh": charge.get("grid_charge_kwh"),
            }
    if params is not None:
        info["price_plan_enabled"] = bool(params.price_plan_enabled)
        info["price_plan_active"] = bool(params.price_plan_active)
        info["max_grid_charge_kwh"] = float(params.max_grid_charge_kwh)
        info["low_slot_grid_charge_jit"] = bool(params.low_slot_grid_charge_jit)
    return info if info else None


TUNABLE_META: dict[str, dict[str, Any]] = {
    "charge_threshold": {
        "min": 0, "max": 50, "step": 1, "unit": "%",
        "label_de": "Ladeschwelle (Notladung)", "label_en": "Charge threshold (emergency)",
    },
    "charge_target": {
        "min": 50, "max": 100, "step": 1, "unit": "%",
        "label_de": "Ladeziel", "label_en": "Charge target",
    },
    "hard_soc_limit": {
        "min": 50, "max": 100, "step": 1, "unit": "%",
        "label_de": "Harte SoC-Obergrenze", "label_en": "Hard SoC limit",
    },
    "morning_cap_soc": {
        "min": 10, "max": 80, "step": 1, "unit": "%",
        "label_de": "Morgengrenze SoC", "label_en": "Morning cap SoC",
    },
    "morning_cap_until_h": {
        "min": 0, "max": 14, "step": 1, "unit": "Uhr",
        "label_de": "Morgengrenze bis", "label_en": "Morning cap until",
    },
    "delay_min_soc": {
        "min": 0, "max": 80, "step": 1, "unit": "%",
        "label_de": "Mindest-SoC Ladeverzögerung", "label_en": "Delay min SoC",
    },
    "fast_charge_floor_soc": {
        "min": 0, "max": 80, "step": 1, "unit": "%",
        "label_de": "Schnelllade-Untergrenze", "label_en": "Fast charge floor SoC",
    },
    "morning_unload_start_soc": {
        "min": 0, "max": 100, "step": 1, "unit": "%",
        "label_de": "Morgenentladen Start-SoC", "label_en": "Morning unload start SoC",
    },
    "morning_unload_soc": {
        "min": 0, "max": 100, "step": 1, "unit": "%",
        "label_de": "Morgenentlade-Ziel", "label_en": "Morning unload target SoC",
    },
    "fixed_reserve_soc": {
        "min": 0, "max": 80, "step": 1, "unit": "%",
        "label_de": "Feste Reserve", "label_en": "Fixed reserve SoC",
    },
    "lower_corridor": {
        "min": 0, "max": 5000, "step": 50, "unit": "W",
        "label_de": "Unterer Korridor", "label_en": "Lower corridor",
    },
    "min_charge_power": {
        "min": 50, "max": 5000, "step": 50, "unit": "W",
        "label_de": "Mindest-Ladeleistung", "label_en": "Minimum charge power",
    },
    "wallbox_discharge_guard_threshold_w": {
        "min": 0, "max": 15000, "step": 100, "unit": "W",
        "label_de": "Wallbox Entladeschutz Schwelle", "label_en": "Wallbox discharge guard threshold",
    },
    "price_plan_min_spread": {
        "min": 0, "max": 0.5, "step": 0.01, "unit": "€/kWh",
        "label_de": "Preisplan Mindestspanne", "label_en": "Price plan min spread",
    },
    "price_plan_efficiency": {
        "min": 0.5, "max": 1.0, "step": 0.01, "unit": "",
        "label_de": "Preisplan Wirkungsgrad", "label_en": "Price plan efficiency",
    },
    "price_plan_safety_factor": {
        "min": 1.0, "max": 2.0, "step": 0.05, "unit": "",
        "label_de": "Preisplan Sicherheitsfaktor", "label_en": "Price plan safety factor",
    },
    "max_grid_charge_kwh": {
        "min": 0, "max": 150, "step": 0.5, "unit": "kWh",
        "label_de": "Tagesbudget Netzladung", "label_en": "Daily grid charge budget",
    },
}


def build_tunables(
    setting_keys: list[str],
    params: MaestroParams | None,
    lang: str = "de",
) -> list[dict[str, Any]]:
    """Up to four whitelisted settings referenced in the answer."""
    if params is None:
        return []
    lang = lang if lang in WARUM_LANGS else "de"
    label_key = f"label_{lang}"
    out: list[dict[str, Any]] = []
    for key in setting_keys:
        if key not in TUNABLE_META or len(out) >= 4:
            continue
        if not hasattr(params, key):
            continue
        meta = TUNABLE_META[key]
        val = getattr(params, key)
        if not isinstance(val, (int, float)):
            continue
        out.append({
            "key": key,
            "value": float(val),
            "min": meta["min"],
            "max": meta["max"],
            "step": meta["step"],
            "unit": meta["unit"],
            "label": meta.get(label_key) or meta.get("label_de") or key,
        })
    return out


def _answer_price_plan(
    info: dict[str, Any] | None,
    decision: MaestroDecision | None,
    lang: str,
) -> tuple[str, list[dict[str, Any]]]:
    bullets: list[dict[str, Any]] = []
    if info is None or not info.get("price_plan_enabled"):
        if lang == "de":
            headline = "Der dynamische Preisplan ist nicht aktiviert."
        else:
            headline = "The dynamic price plan is not enabled."
        return headline, bullets

    summary = str(info.get("summary") or "").strip()
    message = str(info.get("message") or "").strip()
    status = str(info.get("status") or "").strip()
    if summary:
        headline = f"Preisplan: {summary}" if lang == "de" else f"Price plan: {summary}"
    elif message:
        headline = message
    else:
        headline = "Preisplan" if lang == "de" else "Price plan"

    if status or message:
        if lang == "de":
            st_txt = f"Status {status}: {message}".strip(": ")
        else:
            st_txt = f"Status {status}: {message}".strip(": ")
        bullets.append({"ok": status == "ok", "text": st_txt, "setting_key": None})

    nxt = info.get("next_charge")
    if isinstance(nxt, dict) and nxt.get("start_local"):
        kwh = nxt.get("grid_charge_kwh")
        if lang == "de":
            txt = (
                f"Nächster Ladetermin ab {nxt['start_local']}"
                + (f", geplant ca. {kwh:.1f} kWh".replace(".", ",") if isinstance(kwh, (int, float)) else "")
            )
        else:
            txt = f"Next charge slot from {nxt['start_local']}"
            if isinstance(kwh, (int, float)):
                txt += f", about {kwh:.1f} kWh planned"
        bullets.append({"ok": True, "text": txt, "setting_key": None})

    spread = info.get("min_spread")
    eff = info.get("efficiency")
    safety = info.get("safety_factor")
    terminal = info.get("terminal_need_kwh")
    metrics: list[str] = []
    if spread is not None:
        metrics.append(
            f"Mindestspanne {_fmt_value(spread, '€/kWh', lang)}"
            if lang == "de"
            else f"Min spread {_fmt_value(spread, '€/kWh', lang)}"
        )
    if eff is not None:
        metrics.append(
            f"Wirkungsgrad {_fmt_value(eff, '', lang)}"
            if lang == "de"
            else f"Efficiency {_fmt_value(eff, '', lang)}"
        )
    if safety is not None:
        metrics.append(
            f"Sicherheitsfaktor {_fmt_value(safety, '', lang)}"
            if lang == "de"
            else f"Safety factor {_fmt_value(safety, '', lang)}"
        )
    if terminal is not None:
        metrics.append(
            f"Restbedarf bis Horizontende {_fmt_value(terminal, 'kWh', lang)}"
            if lang == "de"
            else f"Terminal need {_fmt_value(terminal, 'kWh', lang)}"
        )
    if metrics:
        bullets.append({"ok": True, "text": ", ".join(metrics) + ".", "setting_key": "price_plan_min_spread"})

    active = bool(info.get("price_plan_active"))
    if lang == "de":
        mode = "aktiv: der Plan steuert Netzladung und Halten." if active else (
            "Schattenmodus: der Plan wird nur angezeigt, steuert noch nicht."
        )
    else:
        mode = "active: the plan controls grid charging and hold." if active else (
            "Shadow mode: the plan is shown only and does not control the battery yet."
        )
    bullets.append({"ok": active, "text": mode, "setting_key": "price_plan_active"})

    budget = info.get("max_grid_charge_kwh")
    if budget is not None and float(budget) > 0:
        if lang == "de":
            bullets.append({
                "ok": True,
                "text": f"Tagesbudget Netzladung maximal {_fmt_value(budget, 'kWh', lang)}.",
                "setting_key": "max_grid_charge_kwh",
            })
        else:
            bullets.append({
                "ok": True,
                "text": f"Daily grid charge budget at most {_fmt_value(budget, 'kWh', lang)}.",
                "setting_key": "max_grid_charge_kwh",
            })

    jit = info.get("low_slot_grid_charge_jit")
    if jit is not None:
        if lang == "de":
            jit_txt = "Just-in-Time Netzladung ist eingeschaltet." if jit else (
                "Just-in-Time Netzladung ist aus."
            )
        else:
            jit_txt = "Just-in-time grid charging is on." if jit else (
                "Just-in-time grid charging is off."
            )
        bullets.append({"ok": bool(jit), "text": jit_txt, "setting_key": "low_slot_grid_charge_jit"})

    if decision is not None and decision.phase in ("grid_charge", "grid_hold"):
        phase_txt = (
            f"Aktuelle Steuerung: Phase {decision.phase}."
            if lang == "de"
            else f"Current control: phase {decision.phase}."
        )
        bullets.append({"ok": True, "text": phase_txt, "setting_key": None})

    return headline, bullets


def _answer_wallbox(
    decision: MaestroDecision,
    state: MaestroState | None,
    params: MaestroParams | None,
    lang: str,
) -> tuple[str, list[dict[str, Any]]]:
    bullets: list[dict[str, Any]] = []
    enabled = bool(params.wallbox_discharge_guard_enabled) if params else False
    threshold = float(params.wallbox_discharge_guard_threshold_w) if params else 0.0
    power = float(state.wallbox_power) if state else 0.0
    guard_fired = False
    if decision.trace is not None:
        guard_fired = any(
            g.name == "post.wallbox_discharge_guard" and g.result for g in decision.trace.gates
        )

    above = enabled and power > threshold
    if lang == "de":
        if guard_fired:
            headline = "Der Wallbox-Entladeschutz ist aktiv und hält die Entladung offen."
        elif above:
            headline = "Die Wallbox lädt mit hoher Leistung, der Schutz müsste greifen."
        elif not enabled:
            headline = "Der Wallbox-Entladeschutz ist deaktiviert."
        else:
            headline = "Die Wallbox zieht gerade wenig, der Entladeschutz greift nicht."
    else:
        if guard_fired:
            headline = "The wallbox discharge guard is active and keeps discharging open."
        elif above:
            headline = "The wallbox draws high power; the guard should engage."
        elif not enabled:
            headline = "The wallbox discharge guard is disabled."
        else:
            headline = "Wallbox draw is low; the discharge guard is not active."

    p_txt = _fmt_value(power, "W", lang)
    t_txt = _fmt_value(threshold, "W", lang)
    if lang == "de":
        bullets.append({
            "ok": not above,
            "text": f"Wallbox-Leistung {p_txt}, Schwelle {t_txt}.",
            "setting_key": "wallbox_discharge_guard_threshold_w",
        })
        bullets.append({
            "ok": enabled,
            "text": "Entladeschutz eingeschaltet." if enabled else "Entladeschutz ausgeschaltet.",
            "setting_key": "wallbox_discharge_guard_enabled",
        })
    else:
        bullets.append({
            "ok": not above,
            "text": f"Wallbox power {p_txt}, threshold {t_txt}.",
            "setting_key": "wallbox_discharge_guard_threshold_w",
        })
        bullets.append({
            "ok": enabled,
            "text": "Discharge guard enabled." if enabled else "Discharge guard disabled.",
            "setting_key": None,
        })

    if guard_fired:
        reason = _LIM[lang]["guard"]
        bullets.append({"ok": True, "text": reason, "setting_key": None})
    elif above and enabled and lang == "de":
        bullets.append({
            "ok": True,
            "text": "Leistung liegt über der Schwelle, Entladen sollte für die Wallbox offen bleiben.",
            "setting_key": None,
        })
    elif above and enabled:
        bullets.append({
            "ok": True,
            "text": "Power is above threshold; discharge should stay open for the wallbox.",
            "setting_key": None,
        })

    return headline, bullets


def _answer_heat_pump(
    hp_explanation: str | None,
    hp_history: list[dict[str, Any]] | None,
    params: MaestroParams | None,
    lang: str,
) -> tuple[str, list[dict[str, Any]]]:
    bullets: list[dict[str, Any]] = []
    if params is None or not params.hp_enabled:
        if lang == "de":
            headline = "Wärmepumpe ist nicht aktiv konfiguriert."
        else:
            headline = "Heat pump is not enabled."
        return headline, bullets

    headline = (hp_explanation or "").strip()
    if not headline:
        headline = "Wärmepumpe" if lang == "de" else "Heat pump"

    if hp_explanation:
        bullets.append({"ok": True, "text": hp_explanation, "setting_key": None})

    if params is not None:
        surplus = _fmt_value(params.hp_min_surplus, "W", lang)
        delay_n = f"{params.hp_surplus_delay_minutes:.0f}".replace(".", ",") if lang == "de" else f"{params.hp_surplus_delay_minutes:.0f}"
        delay = f"{delay_n} min"
        window = f"{params.hp_time_start} bis {params.hp_time_end}"
        price = _fmt_value(params.hp_max_price, "€/kWh", lang)
        if lang == "de":
            cfg = (
                f"Schwellen: Mindestüberschuss {surplus}, Verzögerung {delay}, "
                f"Zeitfenster {window}, Maximalpreis {price}."
            )
            if params.hp_shadow:
                cfg += " Schattenmodus: nur protokollieren, nicht schalten."
        else:
            cfg = (
                f"Thresholds: min surplus {surplus}, delay {delay}, "
                f"time window {window}, max price {price}."
            )
            if params.hp_shadow:
                cfg += " Shadow mode: log only, no switching."
        bullets.append({"ok": True, "text": cfg, "setting_key": "hp_min_surplus"})

    for entry in list(hp_history or [])[:3]:
        text = entry.get("text")
        if text:
            bullets.append({"ok": True, "text": str(text), "setting_key": None})

    return headline, bullets


def build_answer(
    payload: dict[str, Any],
    decision: MaestroDecision | None,
    topic: str | None,
    lang: str = "de",
    state: MaestroState | None = None,
    params: MaestroParams | None = None,
) -> dict[str, Any]:
    """Klartext answer block for ``topic`` (stubs for most topics, see TODOs)."""
    lang = lang if lang in WARUM_LANGS else "de"
    topic = topic if topic in WARUM_TOPICS else "current"
    s = _STR[lang]
    headline = payload.get("short_explanation") or s["no_decision"]
    bullets: list[dict[str, Any]] = []

    if decision is not None and topic == "current":
        headline = payload.get("short_explanation") or decision.reason or headline
        if decision.trace is not None:
            win = next(
                (g for g in decision.trace.gates
                 if g.name == decision.trace.winning_gate and g.result),
                None,
            ) or next((g for g in reversed(decision.trace.gates) if g.result), None)
            if win is not None:
                bullets = [_bullet(term_to_dict(t), lang) for t in win.terms]
    elif decision is not None and topic == "no_discharge":
        headline, bullets = _answer_no_discharge(decision, lang)
    elif decision is not None and topic == "no_charge":
        headline, bullets = _answer_no_charge(decision, state, params, lang)
    elif decision is not None and topic in _TOPIC_WHY_NOT_PHASE:
        why = payload.get("why_not")
        if not why or why.get("phase") != _TOPIC_WHY_NOT_PHASE[topic]:
            why = explain_why_not(decision, _TOPIC_WHY_NOT_PHASE[topic])
        headline, bullets = _why_not_answer(why, lang)
    elif topic == "price_plan":
        headline, bullets = _answer_price_plan(
            payload.get("price_plan_info"), decision, lang,
        )
    elif decision is not None and topic == "wallbox":
        headline, bullets = _answer_wallbox(decision, state, params, lang)
    elif topic == "heat_pump":
        headline, bullets = _answer_heat_pump(
            payload.get("hp_explanation"),
            payload.get("hp_history"),
            params,
            lang,
        )
    elif topic == "lookback":
        snap = payload.get("lookback")
        if snap:
            headline = s["lookback"].format(phase=snap.get("phase") or "?")
            if snap.get("reason"):
                bullets = [{"ok": True, "text": str(snap["reason"]), "setting_key": None}]
        else:
            headline = s["no_lookback"]

    keys: list[str] = []
    for b in bullets:
        k = b.get("setting_key")
        if k and k not in keys:
            keys.append(k)

    return {
        "topic": topic,
        "headline": headline,
        "bullets": bullets,
        "setting_keys": keys,
        "follow_ups": _follow_ups(topic, payload.get("phase"), lang),
        "tunables": build_tunables(keys, params, lang),
    }


def build_warum_payload(
    *,
    decision: MaestroDecision | None,
    state: MaestroState | None = None,
    params: MaestroParams | None = None,
    now: datetime | None = None,
    decide_kwargs: dict[str, Any] | None = None,
    short_explanation: str | None = None,
    why_not_phase: str | None = None,
    what_if_params: dict[str, Any] | None = None,
    what_if_state: dict[str, Any] | None = None,
    hp_explanation: str | None = None,
    hp_history: list[dict[str, Any]] | None = None,
    price_plan_info: dict[str, Any] | None = None,
    lookback_at: str | None = None,
    action_history: list[dict[str, Any]] | None = None,
    topic: str | None = None,
    lang: str = "de",
) -> dict[str, Any]:
    """Build the websocket/UI payload for the Warum feature."""
    payload = _build_base_payload(
        decision=decision, state=state, params=params, now=now,
        decide_kwargs=decide_kwargs, short_explanation=short_explanation,
        why_not_phase=why_not_phase, what_if_params=what_if_params,
        what_if_state=what_if_state, hp_explanation=hp_explanation,
        hp_history=hp_history, price_plan_info=price_plan_info,
        lookback_at=lookback_at, action_history=action_history,
        lang=lang,
    )
    payload["answer"] = build_answer(payload, decision, topic, lang, state=state, params=params)
    return payload


def _build_base_payload(
    *,
    decision: MaestroDecision | None,
    state: MaestroState | None = None,
    params: MaestroParams | None = None,
    now: datetime | None = None,
    decide_kwargs: dict[str, Any] | None = None,
    short_explanation: str | None = None,
    why_not_phase: str | None = None,
    what_if_params: dict[str, Any] | None = None,
    what_if_state: dict[str, Any] | None = None,
    hp_explanation: str | None = None,
    hp_history: list[dict[str, Any]] | None = None,
    price_plan_info: dict[str, Any] | None = None,
    lookback_at: str | None = None,
    action_history: list[dict[str, Any]] | None = None,
    lang: str = "de",
) -> dict[str, Any]:
    if decision is None:
        payload: dict[str, Any] = {
            "phase": None,
            "reason": None,
            "short_explanation": short_explanation or "Noch keine Entscheidung getroffen.",
            "winning_gate": None,
            "path": [],
            "why_not": None,
            "energy_balance": energy_balance(state, None),
            "what_if": None,
            "context_notes": [],
            "lookback": None,
            "price_plan_info": price_plan_info,
            "hp_explanation": hp_explanation,
            "hp_history": list(hp_history or []),
        }
        return payload

    payload = {
        "phase": decision.phase,
        "reason": decision.reason,
        "short_explanation": short_explanation or decision.reason,
        "winning_gate": decision.trace.winning_gate if decision.trace else None,
        "path": path_from_trace(decision.trace),
        "why_not": None,
        "energy_balance": energy_balance(state, decision),
        "what_if": None,
        "context_notes": _context_notes(decision, hp_explanation=hp_explanation),
        "lookback": None,
        "price_plan_info": price_plan_info,
        "hp_explanation": hp_explanation,
        "hp_history": list(hp_history or []),
    }

    if why_not_phase:
        payload["why_not"] = explain_why_not(decision, why_not_phase)

    if (what_if_params or what_if_state) and state is not None and params is not None and now is not None:
        payload["what_if"] = run_what_if(
            state,
            params,
            now,
            decide_kwargs=decide_kwargs,
            param_overrides=what_if_params,
            state_overrides=what_if_state,
            baseline=decision,
            lang=lang,
        )

    if lookback_at:
        snap = find_history_snapshot(action_history, lookback_at)
        payload["lookback"] = snap

    return payload


def decide_kwargs_from_coordinator(coord: Any) -> dict[str, Any]:
    """Rebuild the kwargs the coordinator passes into ``decide()``."""
    previous_battery_priority = False
    if getattr(coord, "last_decision", None) is not None:
        previous_battery_priority = bool(coord.last_decision.battery_priority)
    return {
        "regelung_aktiv": getattr(coord, "regelung_aktiv", True),
        "curtailment_guard_active": getattr(coord, "_curtailment_guard_active", False),
        "current_price": getattr(coord, "current_price", None),
        "grid_charged_today_kwh": float(
            (getattr(coord, "stats", None) or {}).get("grid_to_battery_today_kwh", 0.0)
        ),
        "force_discharge": getattr(coord, "force_discharge", False),
        "discharge_lock": getattr(coord, "discharge_lock", False),
        "previous_phase": getattr(coord, "last_phase", None),
        "previous_phase_since": getattr(coord, "_last_phase_changed_at", None),
        "previous_battery_priority": previous_battery_priority,
    }
