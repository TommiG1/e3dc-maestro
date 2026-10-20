"""Format the debug-log sensor state (no Home Assistant dependencies).

Home Assistant rejects entity states longer than 255 characters. The panel
reads the full recent lines from the ``lines`` attribute instead.
"""
from __future__ import annotations

from typing import Any

HA_STATE_MAX_LEN = 255
DEBUG_LOG_MAX_LINES = 5


def format_debug_log_state(
    lines: Any,
    *,
    max_lines: int = DEBUG_LOG_MAX_LINES,
    limit: int = HA_STATE_MAX_LEN,
) -> str:
    """Join recent debug lines into an HA state string (≤ ``limit`` chars).

    Prefers the newest lines. A single line longer than ``limit`` is truncated.
    """
    if not lines:
        return ""
    recent = list(lines)[-max_lines:]
    kept: list[str] = []
    for line in reversed(recent):
        candidate = line if not kept else f"{line}\n" + "\n".join(kept)
        if len(candidate) > limit:
            if not kept:
                return line[:limit]
            break
        kept.insert(0, line)
    return "\n".join(kept)
