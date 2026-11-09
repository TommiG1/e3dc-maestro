"""Gate trace: records which decision gates were evaluated and why one won.

The same ``Gate.result`` that explains a decision also drives the control flow
(``if gate.result: return ...``), so code and explanation cannot diverge.
"""
from __future__ import annotations

import operator
from collections.abc import Callable
from dataclasses import dataclass, field
from typing import Any

TermValue = bool | float | int | str | None

_UNSET: Any = object()


@dataclass(frozen=True)
class Term:
    """One evaluated condition of a gate."""
    name: str
    actual: TermValue
    expected: TermValue
    setting_key: str | None = None
    passed: bool = False


@dataclass(frozen=True)
class Gate:
    """A decision gate: all terms passed → ``result`` True (the gate fired)."""
    name: str                   # e.g. "1.off", "1.5.force_discharge"
    terms: tuple[Term, ...]
    result: bool


@dataclass
class GateTrace:
    """Ordered gates evaluated this tick; ``winning_gate`` is the one that fired."""
    gates: list[Gate] = field(default_factory=list)
    winning_gate: str | None = None

    def record(self, gate: Gate) -> None:
        self.gates.append(gate)
        if gate.result:
            self.winning_gate = gate.name


# Common comparisons. Binary ops take (actual, expected), unary ops (actual,).
eq = operator.eq
lt = operator.lt
le = operator.le
gt = operator.gt
ge = operator.ge


def is_true(actual: Any) -> bool:
    return bool(actual)


def is_false(actual: Any) -> bool:
    return not actual


def not_gt(actual: Any, expected: Any) -> bool:
    """``not actual > expected`` (differs from ``<=`` only for NaN)."""
    return not actual > expected


def not_lt(actual: Any, expected: Any) -> bool:
    """``not actual < expected`` (differs from ``>=`` only for NaN)."""
    return not actual < expected


def not_le(actual: Any, expected: Any) -> bool:
    """``not actual <= expected`` (differs from ``>`` only for NaN)."""
    return not actual <= expected


def not_ge(actual: Any, expected: Any) -> bool:
    """``not actual >= expected`` (differs from ``<`` only for NaN)."""
    return not actual >= expected


def term(
    name: str,
    actual: TermValue,
    *,
    op: Callable[..., bool],
    expected: TermValue = _UNSET,
    setting_key: str | None = None,
) -> Term:
    """Evaluate one term.

    With ``expected`` the comparison is ``op(actual, expected)``; without it
    ``op`` is unary and called as ``op(actual)`` (``expected`` is stored as None).
    """
    if expected is _UNSET:
        passed = bool(op(actual))
        expected = None
    else:
        passed = bool(op(actual, expected))
    return Term(name, actual, expected, setting_key, passed)


def eval_gate(name: str, *terms: Term) -> Gate:
    """Build a gate from evaluated terms; ``result`` is True if all passed."""
    return Gate(name, terms, all(t.passed for t in terms))
