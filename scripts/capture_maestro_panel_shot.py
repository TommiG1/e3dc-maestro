#!/usr/bin/env python3
"""Capture Chrome Maestro window and crop to e3dc-maestro-panel only (no browser chrome / HA sidebar)."""
from __future__ import annotations

import json
import subprocess
import time
from pathlib import Path

import numpy as np
from PIL import Image

OUT = Path(__file__).resolve().parents[1] / "Screenshots"
PREV = Path.home() / "Projects/maestro-readme-preview/Screenshots/cockpit_01_live.png"
GEO = Path("/tmp/maestro_panel_geo.json")


def focus_and_wid() -> int:
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
    time.sleep(0.4)
    listing = subprocess.check_output(
        ["swift", "/tmp/ListChromeWindows.swift"], text=True
    )
    for line in listing.splitlines():
        if "E3DC Maestro Cockpit" in line:
            return int(line.split("\t")[0])
    raise SystemExit(f"no window\n{listing}")


def capture(path: Path) -> Image.Image:
    wid = focus_and_wid()
    subprocess.run(
        ["screencapture", "-x", "-o", "-l", str(wid), str(path)], check=True
    )
    return Image.open(path).convert("RGB")


def crop_panel(im: Image.Image, left: int, chrome_h: int, width: int, height: int) -> Image.Image:
    return im.crop((left, chrome_h, left + width, chrome_h + height))


def main() -> None:
    meta = json.loads(GEO.read_text())
    left = int(round(meta["rect"]["left"]))
    chrome_h = int(round(meta["outer"][1] - meta["inner"][1]))
    pw = int(round(meta["rect"]["w"]))
    ph = int(round(meta["rect"]["h"]))
    print("geo", left, chrome_h, pw, ph)

    mode = "top"
    if len(__import__("sys").argv) > 1:
        mode = __import__("sys").argv[1]

    if mode == "top":
        top_full = capture(OUT / "_win_top.png")
        top = crop_panel(top_full, left, chrome_h, min(pw, top_full.size[0] - left), ph)
        top.save(OUT / "_panel_top.png")
        print("panel_top", top.size)
        return

    if mode == "bot":
        bot_full = capture(OUT / "_win_bot.png")
        bot = crop_panel(bot_full, left, chrome_h, min(pw, bot_full.size[0] - left), ph)
        bot.save(OUT / "_panel_bot.png")
        print("panel_bot", bot.size)
        return

    if mode == "stitch":
        top = Image.open(OUT / "_panel_top.png").convert("RGB")
        bot = Image.open(OUT / "_panel_bot.png").convert("RGB")
        w = min(top.size[0], bot.size[0])
        top = top.crop((0, 0, w, top.size[1]))
        bot = bot.crop((0, 0, w, bot.size[1]))
        band = 50
        y_top = top.size[1] - 120
        strip = np.asarray(
            top.crop((80, y_top, w - 40, y_top + band)), dtype=np.int16
        )
        best = (1e9, 0)
        for y2 in range(0, bot.size[1] - band):
            cand = np.asarray(
                bot.crop((80, y2, 80 + strip.shape[1], y2 + band)), dtype=np.int16
            )
            if cand.shape != strip.shape:
                continue
            d = float(np.abs(strip - cand).mean())
            if d < best[0]:
                best = (d, y2)
        print("overlap", best)
        _, y_bot = best
        part = bot.crop((0, y_bot, w, bot.size[1]))
        canvas = Image.new("RGB", (w, y_top + part.size[1]))
        canvas.paste(top.crop((0, 0, w, y_top)), (0, 0))
        canvas.paste(part, (0, y_top))
        dest = OUT / "cockpit_01_live.png"
        canvas.save(dest, "PNG", optimize=True)
        canvas.save(PREV, "PNG", optimize=True)
        print("saved", dest, canvas.size)
        return

    raise SystemExit(f"unknown mode {mode}")


if __name__ == "__main__":
    main()
