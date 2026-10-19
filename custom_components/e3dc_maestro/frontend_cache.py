"""Cache-busting query strings for Maestro frontend assets."""
from __future__ import annotations

import hashlib
from pathlib import Path

from .const import VERSION


def asset_query(path: Path) -> str:
    """Cache-busting query for a frontend file.

    Uses the file content, not the mtime. Copies that keep the old timestamp
    and iPad/app caches that ignore a silent overwrite still get a new URL.
    """
    try:
        digest = hashlib.sha256(path.read_bytes()).hexdigest()[:12]
    except OSError:
        digest = "0"
    return f"v={VERSION}-{digest}"
