#!/usr/bin/env python3
"""Capture mobile Maestro Live view: panel only, full scroll, Bilanzpuls month."""
from __future__ import annotations

import subprocess
import time
from pathlib import Path

import numpy as np
from PIL import Image

OUT = Path(__file__).resolve().parents[1] / "Screenshots"
PREV = Path.home() / "Projects/maestro-readme-preview/Screenshots/cockpit_06_mobil.png"
DEST = OUT / "cockpit_06_mobil.png"


def focus_maestro() -> int:
    subprocess.run(
        [
            "osascript",
            "-e",
            'tell application "Google Chrome"\n'
            "  activate\n"
            "  repeat with w in windows\n"
            "    set i to 0\n"
            "    repeat with t in tabs of w\n"
            "      set i to i + 1\n"
            "      try\n"
            '        if (URL of t as string) contains "maestro-cockpit" then\n'
            "          set active tab index of w to i\n"
            "          set index of w to 1\n"
            '          return "ok"\n'
            "        end if\n"
            "      end try\n"
            "    end repeat\n"
            "  end repeat\n"
            "end tell",
        ],
        check=False,
    )
    time.sleep(0.35)
    listing = subprocess.check_output(["swift", "/tmp/ListAllChrome.swift"], text=True)
    for line in listing.splitlines():
        if "E3DC Maestro Cockpit" in line:
            return int(line.split("\t")[0])
    raise SystemExit(f"no window\n{listing}")


def js(expr: str) -> str:
    # Escape for AppleScript string
    esc = expr.replace("\\", "\\\\").replace('"', '\\"')
    script = (
        'tell application "Google Chrome"\n'
        "  repeat with w in windows\n"
        "    set i to 0\n"
        "    repeat with t in tabs of w\n"
        "      set i to i + 1\n"
        "      try\n"
        '        if (URL of t as string) contains "maestro-cockpit" then\n'
        "          tell t\n"
        f'            return execute javascript "{esc}"\n'
        "          end tell\n"
        "        end if\n"
        "      end try\n"
        "    end repeat\n"
        "  end repeat\n"
        "end tell"
    )
    r = subprocess.run(["osascript", "-e", script], capture_output=True, text=True)
    return (r.stdout or "").strip()


SETUP_JS = r"""(() => {
  function find(root, name, d=0) {
    if (!root || d>30) return null;
    const x = root.querySelector?.(name);
    if (x) return x;
    for (const el of root.querySelectorAll?.('*') || []) {
      if (el.shadowRoot) {
        const h = find(el.shadowRoot, name, d+1);
        if (h) return h;
      }
    }
    return null;
  }
  try {
    const drawer = document.querySelector('home-assistant')
      ?.shadowRoot?.querySelector('home-assistant-main')
      ?.shadowRoot?.querySelector('ha-drawer');
    if (drawer) drawer.open = false;
  } catch (e) {}
  localStorage.setItem('e3dc-maestro.theme.v1', 'e3dc');
  localStorage.setItem('e3dc-maestro.groups.v3', '[]');
  const panel = find(document, 'e3dc-maestro-panel');
  const main = panel.shadowRoot.querySelector('main');
  main.scrollTop = 0;
  const monat = [...panel.shadowRoot.querySelectorAll('button')]
    .find(b => b.textContent?.trim() === 'Monat');
  if (monat && monat.getAttribute('aria-pressed') !== 'true') monat.click();
  const r = panel.getBoundingClientRect();
  return JSON.stringify({
    left: r.left, top: r.top, w: r.width, h: r.height,
    outerH: window.outerHeight, innerH: window.innerHeight,
    mainSH: main.scrollHeight, mainCH: main.clientHeight,
    maxScroll: main.scrollHeight - main.clientHeight
  });
})()"""

SCROLL_JS = r"""((y) => {
  function find(root, name, d=0) {
    if (!root || d>30) return null;
    const x = root.querySelector?.(name);
    if (x) return x;
    for (const el of root.querySelectorAll?.('*') || []) {
      if (el.shadowRoot) {
        const h = find(el.shadowRoot, name, d+1);
        if (h) return h;
      }
    }
    return null;
  }
  const panel = find(document, 'e3dc-maestro-panel');
  const main = panel.shadowRoot.querySelector('main');
  main.scrollTop = y;
  return String(main.scrollTop);
})"""


def capture_window(path: Path) -> Image.Image:
    wid = focus_maestro()
    subprocess.run(
        ["screencapture", "-x", "-o", "-l", str(wid), str(path)], check=True
    )
    return Image.open(path).convert("RGB")


def crop_panel(im: Image.Image, left: int, chrome_h: int, w: int, h: int) -> Image.Image:
    left = max(0, left)
    return im.crop((left, chrome_h, left + w, chrome_h + h))


def stitch(panels: list[Image.Image]) -> Image.Image:
    canvas = panels[0]
    for nxt in panels[1:]:
        w = min(canvas.size[0], nxt.size[0])
        canvas = canvas.crop((0, 0, w, canvas.size[1]))
        nxt = nxt.crop((0, 0, w, nxt.size[1]))
        band = 40
        y_top = canvas.size[1] - 100
        strip = np.asarray(
            canvas.crop((20, y_top, w - 20, y_top + band)), dtype=np.int16
        )
        best = (1e9, 0)
        for y2 in range(0, nxt.size[1] - band):
            cand = np.asarray(
                nxt.crop((20, y2, 20 + strip.shape[1], y2 + band)), dtype=np.int16
            )
            if cand.shape != strip.shape:
                continue
            d = float(np.abs(strip - cand).mean())
            if d < best[0]:
                best = (d, y2)
        print("overlap", best)
        part = nxt.crop((0, best[1], w, nxt.size[1]))
        out = Image.new("RGB", (w, y_top + part.size[1]))
        out.paste(canvas.crop((0, 0, w, y_top)), (0, 0))
        out.paste(part, (0, y_top))
        canvas = out
    return canvas


def main() -> None:
    raw = js(SETUP_JS)
    print("setup", raw)
    import json

    meta = json.loads(raw)
    left = int(round(meta["left"]))
    chrome_h = int(round(meta["outerH"] - meta["innerH"]))
    pw = int(round(meta["w"]))
    ph = int(round(meta["h"]))
    max_scroll = int(meta["maxScroll"])
    step = max(ph - 80, 400)
    print("geo", left, chrome_h, pw, ph, "maxScroll", max_scroll, "step", step)

    panels: list[Image.Image] = []
    y = 0
    idx = 0
    while True:
        js(f"{SCROLL_JS}({y})")
        time.sleep(0.45)
        full = capture_window(OUT / f"_mob_win_{idx}.png")
        panel = crop_panel(full, left, chrome_h, min(pw, full.size[0] - left), ph)
        panel.save(OUT / f"_mob_panel_{idx}.png")
        panels.append(panel)
        print(f"frame {idx} y={y} panel={panel.size}")
        if y >= max_scroll:
            break
        y = min(y + step, max_scroll)
        idx += 1
        if idx > 12:
            break

    canvas = stitch(panels)
    # Match historic width ~390 if wider
    if canvas.size[0] > 390:
        ratio = 390 / canvas.size[0]
        canvas = canvas.resize(
            (390, int(round(canvas.size[1] * ratio))), Image.Resampling.LANCZOS
        )
    canvas.save(DEST, "PNG", optimize=True)
    canvas.save(PREV, "PNG", optimize=True)
    print("saved", DEST, canvas.size)

    # cleanup temps
    for p in OUT.glob("_mob_*.png"):
        p.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
