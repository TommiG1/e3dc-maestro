import { css } from "lit";

export const styles = css`
  :host {
    --bg: #070b14;
    --glass: rgba(255, 255, 255, 0.045);
    --glass-strong: rgba(255, 255, 255, 0.08);
    --stroke: rgba(255, 255, 255, 0.08);
    --stroke-strong: rgba(255, 255, 255, 0.16);
    --text: #e8edf7;
    --muted: #8b96ad;
    --faint: #5a6580;
    --pv: #fbbf24;
    --pv-extra: #f59e0b;
    --house: #a78bfa;
    --grid-in: #f87171;
    --grid-out: #34d399;
    --bat: #22d3ee;
    --accent: #38bdf8;
    --accent-2: #818cf8;
    --accent-line: rgba(56, 189, 248, 0.6);
    --accent-wash: rgba(56, 189, 248, 0.16);
    --accent-glow: rgba(56, 189, 248, 0.35);
    --btn-primary-bg: linear-gradient(180deg, rgba(56, 189, 248, 0.35), rgba(56, 189, 248, 0.15));
    --btn-primary-border: rgba(56, 189, 248, 0.7);
    --btn-primary-color: var(--text);
    --ok: #34d399;
    --warn: #fbbf24;
    --radius: 20px;
    --radius-sm: 12px;
    --pad-card: 20px;
    --pad-main-y: 22px;
    --pad-main-x: 28px;
    --gap-block: 14px;
    --gap-topbar: 22px;
    --rail: rgba(7, 11, 20, 0.55);
    --rail-solid: rgba(7, 11, 20, 0.88);
    --btn: linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04));
    --card-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.025));
    --card-highlight: rgba(255, 255, 255, 0.05);
    --card-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
    --fill: rgba(255, 255, 255, 0.04);
    --field: rgba(0, 0, 0, 0.25);
    --switch-track: rgba(255, 255, 255, 0.12);
    --tip-bg: #0c1424;
    --float: linear-gradient(180deg, rgba(20, 28, 48, 0.94), rgba(12, 18, 32, 0.97));
    --float-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
    --scrim: rgba(3, 6, 12, 0.55);
    --tooltip: rgba(14, 20, 36, 0.95);
    color-scheme: dark;
    display: block;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
    box-sizing: border-box;
    color: var(--text);
    font-family: Inter, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    background:
      radial-gradient(1200px 600px at 10% -10%, rgba(56, 189, 248, 0.14), transparent 60%),
      radial-gradient(900px 500px at 100% 0%, rgba(129, 140, 248, 0.14), transparent 60%),
      radial-gradient(800px 600px at 50% 120%, rgba(34, 211, 238, 0.08), transparent 60%),
      var(--bg);
  }
  :host([theme="classic"]) {
    color-scheme: light;
    --bg: #e7eef5;
    --glass: rgba(21, 36, 56, 0.045);
    --glass-strong: rgba(21, 36, 56, 0.08);
    --stroke: rgba(21, 36, 56, 0.1);
    --stroke-strong: rgba(21, 36, 56, 0.16);
    --text: #152033;
    --muted: #526277;
    --faint: #8493a6;
    --rail: rgba(255, 255, 255, 0.82);
    --rail-solid: rgba(255, 255, 255, 0.94);
    --btn: linear-gradient(180deg, #ffffff, #f3f7fb);
    --card-bg: linear-gradient(180deg, #ffffff, #f6f9fc);
    --card-highlight: rgba(255, 255, 255, 0.9);
    --card-shadow: 0 14px 34px rgba(21, 32, 51, 0.08);
    --fill: rgba(21, 36, 56, 0.045);
    --field: #ffffff;
    --switch-track: rgba(21, 36, 56, 0.14);
    --tip-bg: #ffffff;
    --float: linear-gradient(180deg, #ffffff, #f4f7fb);
    --float-shadow: 0 24px 60px rgba(21, 32, 51, 0.16);
    --scrim: rgba(21, 32, 51, 0.32);
    --tooltip: rgba(255, 255, 255, 0.98);
    background:
      radial-gradient(1100px 560px at 8% -12%, rgba(2, 132, 199, 0.16), transparent 58%),
      radial-gradient(860px 480px at 100% 0%, rgba(14, 165, 164, 0.12), transparent 56%),
      radial-gradient(700px 520px at 50% 120%, rgba(217, 119, 6, 0.08), transparent 60%),
      var(--bg);
  }
  :host([theme="e3dc"]) {
    color-scheme: light;
    --bg: #f7f7f7;
    --glass: rgba(30, 37, 43, 0.04);
    --glass-strong: rgba(30, 37, 43, 0.07);
    --stroke: rgba(30, 37, 43, 0.1);
    --stroke-strong: rgba(30, 37, 43, 0.16);
    --text: #4a4a4a;
    --muted: #6e767c;
    --faint: #a4aaae;
    --accent: #5cc244;
    --accent-2: #3f9a32;
    --ok: #5cc244;
    --accent-line: rgba(92, 194, 68, 0.7);
    --accent-wash: rgba(92, 194, 68, 0.16);
    --accent-glow: rgba(92, 194, 68, 0.28);
    --btn-primary-bg: #5cc244;
    --btn-primary-border: #5cc244;
    --btn-primary-color: #ffffff;
    --radius: 12px;
    --radius-sm: 8px;
    --rail: #1e252b;
    --rail-solid: #1e252b;
    --btn: #ffffff;
    --card-bg: #ffffff;
    --card-highlight: #ffffff;
    --card-shadow: 0 1px 2px rgba(30, 37, 43, 0.08);
    --fill: #f3f4f5;
    --field: #ffffff;
    --switch-track: rgba(30, 37, 43, 0.16);
    --tip-bg: #ffffff;
    --float: #ffffff;
    --float-shadow: 0 16px 40px rgba(30, 37, 43, 0.14);
    --scrim: rgba(30, 37, 43, 0.4);
    --tooltip: #ffffff;
    font-family: Roboto, Inter, system-ui, sans-serif;
    background: var(--bg);
  }
  :host([theme="oled"]) {
    color-scheme: dark;
    --bg: #000000;
    --glass: rgba(255, 255, 255, 0.04);
    --glass-strong: rgba(255, 255, 255, 0.07);
    --stroke: rgba(255, 255, 255, 0.1);
    --stroke-strong: rgba(255, 255, 255, 0.18);
    --text: #e8e8e8;
    --muted: #9a9a9a;
    --faint: #5c5c5c;
    --accent: #38bdf8;
    --accent-2: #818cf8;
    --accent-line: rgba(56, 189, 248, 0.55);
    --accent-wash: rgba(56, 189, 248, 0.14);
    --accent-glow: rgba(56, 189, 248, 0.22);
    --btn-primary-bg: linear-gradient(180deg, rgba(56, 189, 248, 0.28), rgba(56, 189, 248, 0.12));
    --btn-primary-border: rgba(56, 189, 248, 0.65);
    --btn-primary-color: var(--text);
    --radius: 14px;
    --radius-sm: 8px;
    --rail: #000000;
    --rail-solid: #000000;
    --btn: #0a0a0a;
    --card-bg: #0a0a0a;
    --card-highlight: #111111;
    --card-shadow: none;
    --fill: rgba(255, 255, 255, 0.04);
    --field: #0a0a0a;
    --switch-track: rgba(255, 255, 255, 0.14);
    --tip-bg: #0a0a0a;
    --float: #0a0a0a;
    --float-shadow: 0 16px 40px rgba(0, 0, 0, 0.7);
    --scrim: rgba(0, 0, 0, 0.72);
    --tooltip: #111111;
    background: var(--bg);
  }
  :host([theme="amber"]) {
    color-scheme: dark;
    --bg: #140e0a;
    --glass: rgba(243, 231, 216, 0.05);
    --glass-strong: rgba(243, 231, 216, 0.09);
    --stroke: rgba(243, 231, 216, 0.1);
    --stroke-strong: rgba(243, 231, 216, 0.18);
    --text: #f3e7d8;
    --muted: #b39a80;
    --faint: #7a6450;
    --pv: #fbbf24;
    --pv-extra: #f59e0b;
    --house: #d4a574;
    --grid-in: #f87171;
    --grid-out: #86efac;
    --bat: #fcd34d;
    --accent: #f59e0b;
    --accent-2: #ea580c;
    --accent-line: rgba(245, 158, 11, 0.65);
    --accent-wash: rgba(245, 158, 11, 0.16);
    --accent-glow: rgba(245, 158, 11, 0.32);
    --btn-primary-bg: linear-gradient(180deg, rgba(245, 158, 11, 0.4), rgba(234, 88, 12, 0.18));
    --btn-primary-border: rgba(245, 158, 11, 0.75);
    --btn-primary-color: var(--text);
    --ok: #86efac;
    --warn: #fbbf24;
    --rail: rgba(20, 14, 10, 0.72);
    --rail-solid: rgba(20, 14, 10, 0.92);
    --btn: linear-gradient(180deg, rgba(243, 231, 216, 0.1), rgba(243, 231, 216, 0.04));
    --card-bg: linear-gradient(180deg, rgba(243, 231, 216, 0.07), rgba(243, 231, 216, 0.03));
    --card-highlight: rgba(243, 231, 216, 0.06);
    --card-shadow: 0 18px 44px rgba(0, 0, 0, 0.35);
    --fill: rgba(243, 231, 216, 0.05);
    --field: rgba(0, 0, 0, 0.28);
    --switch-track: rgba(243, 231, 216, 0.14);
    --tip-bg: #1c140f;
    --float: linear-gradient(180deg, rgba(36, 26, 18, 0.96), rgba(20, 14, 10, 0.98));
    --float-shadow: 0 28px 70px rgba(0, 0, 0, 0.55);
    --scrim: rgba(10, 6, 4, 0.6);
    --tooltip: rgba(28, 20, 15, 0.96);
    background:
      radial-gradient(1100px 560px at 8% -12%, rgba(245, 158, 11, 0.18), transparent 58%),
      radial-gradient(860px 480px at 100% 0%, rgba(234, 88, 12, 0.12), transparent 56%),
      radial-gradient(700px 520px at 50% 120%, rgba(252, 211, 77, 0.08), transparent 60%),
      var(--bg);
  }
  :host([theme="leitstand"]) {
    color-scheme: dark;
    --bg: #0a0e12;
    --glass: rgba(215, 224, 230, 0.04);
    --glass-strong: rgba(215, 224, 230, 0.08);
    --stroke: rgba(215, 224, 230, 0.14);
    --stroke-strong: rgba(215, 224, 230, 0.28);
    --text: #d7e0e6;
    --muted: #8a9aa6;
    --faint: #556570;
    --pv: #eab308;
    --pv-extra: #ca8a04;
    --house: #94a3b8;
    --grid-in: #ef4444;
    --grid-out: #22c55e;
    --bat: #38bdf8;
    --accent: #22c55e;
    --accent-2: #eab308;
    --accent-line: rgba(34, 197, 94, 0.7);
    --accent-wash: rgba(34, 197, 94, 0.14);
    --accent-glow: rgba(34, 197, 94, 0.28);
    --btn-primary-bg: #166534;
    --btn-primary-border: #22c55e;
    --btn-primary-color: #ecfdf5;
    --ok: #22c55e;
    --warn: #eab308;
    --radius: 4px;
    --radius-sm: 2px;
    --rail: #070a0d;
    --rail-solid: #070a0d;
    --btn: #11171c;
    --card-bg: #11171c;
    --card-highlight: #161d24;
    --card-shadow: none;
    --fill: rgba(215, 224, 230, 0.05);
    --field: #0e1318;
    --switch-track: rgba(215, 224, 230, 0.16);
    --tip-bg: #11171c;
    --float: #11171c;
    --float-shadow: 0 12px 32px rgba(0, 0, 0, 0.55);
    --scrim: rgba(0, 0, 0, 0.7);
    --tooltip: #161d24;
    font-family: "IBM Plex Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace;
    background:
      linear-gradient(180deg, rgba(34, 197, 94, 0.03), transparent 28%),
      var(--bg);
  }
  :host([theme="tibber"]) {
    color-scheme: dark;
    --bg: #0b1020;
    --glass: rgba(230, 238, 248, 0.045);
    --glass-strong: rgba(230, 238, 248, 0.08);
    --stroke: rgba(230, 238, 248, 0.09);
    --stroke-strong: rgba(230, 238, 248, 0.18);
    --text: #e6eef8;
    --muted: #8b9bb8;
    --faint: #5a6a88;
    --pv: #fbbf24;
    --pv-extra: #f59e0b;
    --house: #a78bfa;
    --grid-in: #f87171;
    --grid-out: #34d399;
    --bat: #24ccbf;
    --accent: #24ccbf;
    --accent-2: #6366f1;
    --accent-line: rgba(36, 204, 191, 0.65);
    --accent-wash: rgba(36, 204, 191, 0.16);
    --accent-glow: rgba(36, 204, 191, 0.35);
    --btn-primary-bg: linear-gradient(180deg, rgba(36, 204, 191, 0.38), rgba(36, 204, 191, 0.14));
    --btn-primary-border: rgba(36, 204, 191, 0.75);
    --btn-primary-color: var(--text);
    --ok: #24ccbf;
    --warn: #fbbf24;
    --rail: rgba(11, 16, 32, 0.62);
    --rail-solid: rgba(11, 16, 32, 0.9);
    --btn: linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04));
    --card-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.025));
    --card-highlight: rgba(255, 255, 255, 0.05);
    --card-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    --fill: rgba(255, 255, 255, 0.04);
    --field: rgba(0, 0, 0, 0.28);
    --switch-track: rgba(255, 255, 255, 0.12);
    --tip-bg: #12182c;
    --float: linear-gradient(180deg, rgba(22, 28, 52, 0.96), rgba(12, 16, 34, 0.98));
    --float-shadow: 0 30px 80px rgba(0, 0, 0, 0.55);
    --scrim: rgba(4, 6, 14, 0.6);
    --tooltip: rgba(18, 24, 44, 0.96);
    background:
      radial-gradient(1100px 560px at 10% -10%, rgba(36, 204, 191, 0.16), transparent 58%),
      radial-gradient(900px 500px at 100% 0%, rgba(99, 102, 241, 0.16), transparent 58%),
      radial-gradient(800px 600px at 50% 120%, rgba(36, 204, 191, 0.08), transparent 60%),
      var(--bg);
  }
  :host([density="compact"]) {
    --pad-card: 12px;
    --pad-main-y: 12px;
    --pad-main-x: 14px;
    --gap-block: 8px;
    --gap-topbar: 12px;
  }
  :host([density="airy"]) {
    --pad-card: 28px;
    --pad-main-y: 30px;
    --pad-main-x: 36px;
    --gap-block: 20px;
    --gap-topbar: 28px;
  }
  /* Force radii after theme tokens so the look page can override leitstand/e3dc defaults. */
  :host([corners="soft"]) {
    --radius: 24px;
    --radius-sm: 14px;
  }
  :host([corners="medium"]) {
    --radius: 14px;
    --radius-sm: 8px;
  }
  :host([corners="sharp"]) {
    --radius: 4px;
    --radius-sm: 2px;
  }
  * {
    box-sizing: border-box;
  }
  button {
    font-family: inherit;
  }
  button:focus-visible,
  a:focus-visible,
  input:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  maestro-chart {
    display: block;
  }

  .app {
    display: grid;
    grid-template-columns: 84px 1fr;
    height: 100%;
    min-height: 0;
    overflow: hidden;
  }

  /* Navigation */
  .rail {
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 20px 0;
    border-right: 1px solid var(--stroke);
    background: var(--rail);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  .logo-wrap {
    position: relative;
    margin-bottom: 18px;
    flex: none;
  }
  .logo {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
    background: none;
    box-shadow: none;
  }
  .logo-btn {
    display: block;
    padding: 0;
    border: 0;
    cursor: pointer;
    position: relative;
    overflow: visible;
  }
  .logo img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    border-radius: 50%;
  }
  .logo-badge {
    position: absolute;
    top: -1px;
    right: -1px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--accent-2, var(--accent));
    border: 2px solid var(--rail-bg, var(--float));
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--accent-2, var(--accent)) 35%, transparent);
  }
  .news-scrim {
    z-index: 55;
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  .news-tip {
    position: fixed;
    z-index: 60;
    width: min(320px, calc(100vw - 24px));
    max-height: min(70vh, 420px);
    overflow: auto;
    padding: 14px;
    border-radius: 16px;
    background: var(--float);
    border: 1px solid var(--stroke-strong);
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.45);
    transition: width 0.15s ease, max-height 0.15s ease;
  }
  .news-tip.expanded {
    width: min(380px, calc(100vw - 24px));
    max-height: min(78vh, 520px);
  }
  .news-tip-heading {
    margin: 0 0 10px;
    font: 650 13px inherit;
    color: var(--muted);
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
  .news-tip-list {
    list-style: none;
    margin: 0 0 12px;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .news-tip-list li {
    margin: 0;
    padding: 0;
  }
  .news-tip-list a {
    display: block;
    color: var(--accent-2, var(--accent));
    font: 650 14px inherit;
    text-decoration: none;
    line-height: 1.35;
  }
  .news-tip-list a:hover,
  .news-tip-list a:focus-visible {
    text-decoration: underline;
  }
  .news-tip-list .fresh a {
    color: var(--text);
  }
  .news-tip-teaser {
    display: block;
    margin-top: 4px;
    font-size: 12.5px;
    line-height: 1.4;
    color: var(--muted);
  }
  .news-tip-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .news-tip-actions .btn {
    text-decoration: none;
  }
  .nav-btn {
    width: 68px;
    padding: 10px 2px 8px;
    text-align: center;
    line-height: 1.15;
    border-radius: 14px;
    border: 0;
    cursor: pointer;
    background: transparent;
    color: var(--muted);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font: 500 10.5px Inter, system-ui, sans-serif;
    transition: all 0.2s ease;
  }
  .nav-btn svg {
    width: 22px;
    height: 22px;
  }
  .nav-btn:hover {
    color: var(--text);
    background: var(--glass);
  }
  .nav-btn.active {
    color: var(--text);
    background: var(--glass-strong);
    box-shadow: inset 0 0 0 1px var(--stroke-strong);
  }
  .nav-btn.active svg {
    color: var(--accent);
  }
  :host([theme="e3dc"]) .rail {
    color: #d7dee3;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  :host([theme="e3dc"]) .nav-btn {
    color: #c5ced4;
  }
  :host([theme="e3dc"]) .nav-btn:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.06);
  }
  :host([theme="e3dc"]) .nav-btn.active {
    color: #5cc244;
    background: transparent;
    box-shadow: inset 3px 0 0 #5cc244;
  }
  :host([theme="e3dc"]) .logo {
    border-radius: 50%;
    background: none;
    box-shadow: none;
  }
  .spacer {
    flex: 1;
  }

  main {
    padding: max(var(--pad-main-y), env(safe-area-inset-top)) var(--pad-main-x) calc(var(--pad-main-y) + 18px);
    max-width: 1480px;
    width: 100%;
    min-width: 0;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  .topbar {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: var(--gap-topbar);
  }
  .topbar h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.4px;
  }
  .topbar .title p {
    margin: 2px 0 0;
    color: var(--muted);
    font-size: 13px;
  }
  .facts {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 2px 14px;
    margin: 6px 0 0;
    color: var(--muted);
    font-size: 12.5px;
    line-height: 1.35;
  }
  .facts b {
    color: var(--text);
    font-weight: 650;
  }
  .grow {
    flex: 1;
    min-width: 0;
  }
  .menu {
    width: 40px;
    height: 40px;
    flex: none;
    border: 1px solid var(--stroke);
    border-radius: 12px;
    background: var(--glass);
    color: var(--text);
    cursor: pointer;
    display: grid;
    place-items: center;
  }
  .menu svg {
    width: 22px;
    height: 22px;
    fill: currentColor;
  }
  .help-menu svg,
  .help-menu svg * {
    fill: none;
    stroke: currentColor;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-radius: 999px;
    background: var(--glass);
    border: 1px solid var(--stroke);
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
    color: inherit;
    font-family: inherit;
    cursor: pointer;
  }
  button.pill:hover,
  button.pill:focus-visible {
    border-color: var(--accent);
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--ok);
    box-shadow: 0 0 12px var(--ok);
    animation: pulse 2s infinite;
  }
  .dot.off {
    background: var(--faint);
    box-shadow: none;
    animation: none;
  }
  @keyframes pulse {
    50% {
      opacity: 0.35;
    }
  }
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 9px 16px;
    border-radius: 12px;
    border: 1px solid var(--stroke-strong);
    background: var(--btn);
    color: var(--text);
    font: 600 13px Inter, system-ui, sans-serif;
  }
  .btn:hover {
    border-color: var(--accent-line);
  }
  .btn svg {
    width: 16px;
    height: 16px;
  }
  .btn.primary {
    border-color: var(--btn-primary-border);
    background: var(--btn-primary-bg);
    color: var(--btn-primary-color);
  }
  .btn:disabled {
    opacity: 0.6;
    cursor: default;
  }

  .card {
    position: relative;
    background: var(--card-bg);
    border: 1px solid var(--stroke);
    border-radius: var(--radius);
    padding: var(--pad-card);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow:
      0 1px 0 var(--card-highlight) inset,
      var(--card-shadow);
    min-width: 0;
  }
  .card h3 {
    margin: 0 0 4px;
    font-size: 13px;
    font-weight: 600;
    color: var(--muted);
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }
  .sub {
    color: var(--faint);
    font-size: 12px;
  }
  .live-state {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .live-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex: none;
  }
  .live-dot.ok {
    background: var(--ok);
    box-shadow: 0 0 8px 2px color-mix(in srgb, var(--ok) 55%, transparent);
  }
  .live-dot.bad {
    background: var(--grid-in);
    box-shadow: 0 0 8px 2px color-mix(in srgb, var(--grid-in) 55%, transparent);
  }
  .mode-line {
    margin-top: 2px;
  }
  .grid {
    display: grid;
    gap: 18px;
  }
  .screen {
    animation: fade 0.35s ease;
  }
  @keyframes fade {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  .empty {
    color: var(--muted);
    padding: 40px 0;
    text-align: center;
    margin: 0;
  }
  .plan-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 48px 20px;
  }
  .plan-empty p {
    margin: 0;
    max-width: 36em;
  }
  .plan-empty .sub {
    font-size: 13px;
    opacity: 0.85;
  }
  .spinner {
    width: 28px;
    height: 28px;
    border: 2px solid var(--stroke-strong);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  .err {
    color: #f87171;
    font-size: 13px;
    word-break: break-word;
  }
  .self-start {
    align-self: flex-start;
  }

  /* Live */
  .live-top {
    grid-template-columns: 1.55fr 1fr;
  }
  .flow-wrap {
    height: 380px;
    overflow: visible;
  }
  .flow-wrap svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  /* Haus: size to the SVG viewBox — no letterboxed band under the foundation. */
  .flow-wrap.city {
    height: auto;
  }
  .flow-wrap.city svg {
    height: auto;
    display: block;
  }
  .flow-day {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 4px 6px;
    margin: 10px 0 0;
    padding: 0;
    border: 0;
    background: none;
    color: var(--faint);
    font: inherit;
    font-size: 12px;
    line-height: 1.35;
    text-align: left;
    cursor: pointer;
  }
  .flow-day:hover,
  .flow-day:focus-visible {
    color: var(--muted);
  }
  .flow-day:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: 4px;
  }
  .flow-day-extra {
    margin-top: 4px;
    cursor: default;
  }
  .flow-day-label {
    font-weight: 700;
    letter-spacing: 0.02em;
    margin-right: 2px;
  }
  .flow-day-sep {
    opacity: 0.55;
  }
  .flow-day-unit {
    margin-left: 2px;
    opacity: 0.8;
  }
  .node-val {
    font: 700 22px Inter, system-ui, sans-serif;
    fill: var(--text);
    letter-spacing: -0.3px;
  }
  .node-lbl {
    font: 500 12px Inter, system-ui, sans-serif;
    fill: var(--muted);
  }
  .node-val-sm {
    font: 700 14px Inter, system-ui, sans-serif;
    fill: var(--text);
  }
  .node-lbl-sm {
    font: 500 11px Inter, system-ui, sans-serif;
    fill: var(--muted);
  }
  .card-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }
  .flow-head-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: none;
  }
  .flow-style {
    display: inline-flex;
    padding: 2px;
    border-radius: 10px;
    border: 1px solid var(--stroke-strong);
    background: var(--fill);
  }
  .flow-style-btn {
    border: 0;
    background: transparent;
    color: var(--muted);
    font: 600 11px Inter, system-ui, sans-serif;
    padding: 5px 8px;
    border-radius: 8px;
    cursor: pointer;
  }
  .flow-node:focus-visible .flow-city-roof,
  .flow-node:focus-visible .flow-city-body,
  .flow-node:focus-visible .flow-city-cellar {
    stroke-width: 3.2;
  }
  .flow-node:focus-visible .flow-city-mast line {
    stroke-width: 3.2;
  }
  .flow-style-btn.on {
    background: var(--accent-soft, rgba(56, 189, 248, 0.16));
    color: var(--text);
  }
  .flow-style-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 1px;
  }
  .arrange-btn {
    border: 1px solid var(--stroke-strong);
    background: var(--fill);
  }
  .flow-arrange-hint {
    margin: 0 0 8px;
    font-size: 12px;
    color: var(--muted);
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }
  .flow-arrange-hint .linkish {
    border: 0;
    background: none;
    padding: 0;
    color: var(--accent);
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
  }
  .flow-wrap.arrange .flow-node.arrange {
    cursor: grab;
    touch-action: none;
  }
  .flow-wrap.arrange .flow-node.arrange:active {
    cursor: grabbing;
  }
  .flow-blob.motion .flow-blob-shape {
    transform-box: fill-box;
    transform-origin: center;
    animation: blob-breathe var(--blob-period, 2.6s) ease-in-out infinite;
  }
  .flow-blob.motion .flow-blob-core {
    transform-box: fill-box;
    transform-origin: center;
    animation: blob-core-pulse var(--blob-period, 2.6s) ease-in-out infinite;
  }
  .flow-blob.motion .flow-blob-halo {
    transform-box: fill-box;
    transform-origin: center;
    animation: blob-halo-spin calc(var(--blob-period, 2.6s) * 2.4) linear infinite;
  }
  @keyframes blob-breathe {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.055);
    }
  }
  @keyframes blob-core-pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.12);
      opacity: 1;
    }
  }
  @keyframes blob-halo-spin {
    to {
      transform: rotate(360deg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .flow-blob.motion .flow-blob-shape,
    .flow-blob.motion .flow-blob-core,
    .flow-blob.motion .flow-blob-halo {
      animation: none;
    }
  }
  .look-flow-title {
    margin: 22px 0 6px;
  }
  .theme-choice .swatch.flow-nodes {
    background:
      radial-gradient(circle at 50% 22%, #38bdf8 0 18%, transparent 19%),
      radial-gradient(circle at 18% 55%, #f97316 0 14%, transparent 15%),
      radial-gradient(circle at 82% 55%, #a78bfa 0 14%, transparent 15%),
      radial-gradient(circle at 50% 82%, #22d3ee 0 14%, transparent 15%),
      #0f172a;
  }
  .theme-choice .swatch.flow-blob {
    background:
      radial-gradient(ellipse 58% 48% at 50% 42%, rgba(249, 115, 22, 0.85), rgba(34, 211, 238, 0.35) 55%, transparent 70%),
      #0f172a;
  }
  .theme-choice .swatch.flow-city {
    background:
      linear-gradient(180deg, rgba(249, 115, 22, 0.7) 18% 28%, transparent 29%),
      repeating-linear-gradient(
        90deg,
        transparent 0 10px,
        rgba(167, 139, 250, 0.55) 10px 14px,
        transparent 14px 18px
      ),
      linear-gradient(180deg, transparent 32%, rgba(15, 23, 42, 0.2) 33% 72%, transparent 73%),
      linear-gradient(180deg, transparent 74%, rgba(34, 211, 238, 0.65) 75% 82%, transparent 83%),
      linear-gradient(90deg, transparent 12%, rgba(52, 211, 153, 0.75) 13% 15%, transparent 16%),
      #0f172a;
  }
  .icon-btn {
    width: 36px;
    height: 36px;
    border-radius: 12px;
    border: 1px solid var(--stroke-strong);
    background: var(--fill);
    color: var(--muted);
    display: grid;
    place-items: center;
    cursor: pointer;
    flex: none;
  }
  .icon-btn svg {
    width: 16px;
    height: 16px;
  }
  .icon-btn:hover {
    color: var(--text);
    border-color: var(--accent-line);
  }
  .flow-node {
    cursor: pointer;
  }
  .flow-node:focus {
    outline: none;
  }
  .flow-node:focus-visible circle {
    stroke-width: 3;
  }
  .flow-line {
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    opacity: 0.22;
  }
  .electron {
    pointer-events: none;
  }
  .electron .halo {
    opacity: 0.22;
  }
  .soc-card {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  .soc-head {
    width: 100%;
    flex: none;
    align-items: center;
  }
  .soc-head h3 {
    margin: 0;
  }
  .soc-ctrl-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    margin-top: 14px;
    padding: 12px 14px;
    border-radius: 14px;
    border: 1px solid var(--stroke-strong);
    background: color-mix(in srgb, var(--fill) 88%, transparent);
    color: var(--text);
    cursor: pointer;
    text-align: left;
    transition: border-color 0.15s ease, background 0.15s ease;
  }
  .soc-ctrl-btn:hover {
    border-color: color-mix(in srgb, var(--accent) 45%, var(--stroke-strong));
    background: color-mix(in srgb, var(--accent-wash) 55%, var(--fill));
  }
  .soc-ctrl-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .soc-ctrl-copy {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }
  .soc-ctrl-label {
    font: 700 13px/1.2 Inter, system-ui, sans-serif;
    letter-spacing: 0.01em;
  }
  .soc-ctrl-meta {
    color: var(--muted);
    font: 550 11px/1.3 Inter, system-ui, sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .soc-ctrl-btn svg {
    width: 16px;
    height: 16px;
    flex: none;
    color: var(--muted);
  }
  .overlay.battery-ctrl {
    width: min(440px, calc(100% - 24px));
    max-height: min(720px, calc(100% - 24px));
  }
  .flow-opts-wrap {
    position: relative;
    flex: none;
  }
  .flow-opts-scrim {
    position: fixed;
    inset: 0;
    z-index: 30;
    background: transparent;
  }
  .flow-opts-menu {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    z-index: 31;
    width: min(340px, calc(100vw - 28px));
    max-height: min(70vh, 520px);
    overflow: auto;
    padding: 12px;
    border-radius: 16px;
    border: 1px solid var(--stroke-strong);
    /* Solid panel — --card-bg is translucent and lets the flow bleed through. */
    background: var(--bg);
    box-shadow: var(--card-shadow), 0 0 0 1px color-mix(in srgb, var(--bg) 80%, transparent);
  }
  .flow-opts-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .flow-opts-block {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .flow-opts-section {
    font-size: 12px;
    font-weight: 700;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .flow-opts-choices {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .flow-opts-choices .theme-choice {
    padding: 10px;
    gap: 12px;
  }
  .flow-opts-choices .theme-choice .swatch {
    width: 48px;
    height: 34px;
  }
  .flow-opts-action {
    width: 100%;
    justify-content: center;
  }
  .flow-opts-action + .flow-opts-action {
    margin-top: 6px;
  }
  .flow-arrange-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin: 0 0 10px;
  }
  .flow-arrange-bar .flow-arrange-hint {
    margin: 0;
  }
  .flow-consumers-done {
    width: 100%;
    justify-content: center;
    margin-top: 14px;
  }
  .icon-btn.on {
    color: var(--accent);
    border-color: color-mix(in srgb, var(--accent) 45%, var(--stroke-strong));
  }
  .battery-ctrl-body {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: 16px;
  }
  .battery-ctrl-block {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px;
    border-radius: 16px;
    border: 1px solid var(--stroke);
    background: color-mix(in srgb, var(--fill) 70%, transparent);
  }
  .battery-ctrl-block .force {
    margin: 0;
  }
  .battery-ctrl-block .grip-state {
    display: inline-flex;
    align-self: flex-start;
    margin-top: 4px;
  }
  .soc-visual {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: 0;
  }
  .soc-pack {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    align-items: center;
    column-gap: 18px;
    row-gap: 10px;
  }
  .soc-pack .batt {
    grid-column: 1;
    grid-row: 1;
  }
  .soc-pack-readout {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }
  .soc-pack .reserve-hint {
    grid-column: 1;
    grid-row: 2;
    justify-self: center;
    margin: 0;
  }
  .soc-pack-readout b {
    color: var(--text);
    font-size: 36px;
    font-weight: 800;
    letter-spacing: -0.5px;
    line-height: 1;
  }
  .soc-pack-readout span {
    color: var(--muted);
    font-size: 13px;
  }
  .ring {
    width: 100%;
  }
  .soc-gauge {
    position: relative;
    width: min(100%, 250px);
  }
  .soc-disc {
    box-sizing: border-box;
    width: 100%;
    aspect-ratio: 1;
    padding: 8%;
    border-radius: 50%;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
  }
  .soc-readout {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(-58%);
    pointer-events: none;
  }
  .soc-readout b {
    color: var(--text);
    font-family: inherit;
    font-size: 40px;
    font-weight: 800;
    line-height: 1;
  }
  .soc-readout span {
    margin-top: 4px;
    color: var(--muted);
    font-family: inherit;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.2;
  }
  .reserve-hint {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 12px;
    color: var(--text);
    font: 650 13px/1.2 Inter, system-ui, sans-serif;
  }
  .reserve-hint i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--warn);
    box-shadow: 0 0 8px var(--warn);
  }
  .soc-metrics {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
    margin-top: auto;
    padding-top: 10px;
  }
  .soc-metric-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 6px;
  }
  .soc-metric-head span {
    color: var(--muted);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }
  .soc-metric-head b {
    color: var(--text);
    font-size: 18px;
    font-weight: 750;
    letter-spacing: -0.3px;
    line-height: 1;
  }
  .soc-track {
    position: relative;
    height: 8px;
    border-radius: 999px;
    background: var(--switch-track, var(--fill));
    border: 1px solid var(--stroke);
  }
  .soc-track-fill,
  .soc-track-reserve {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    max-width: 100%;
    border-radius: inherit;
  }
  .soc-track-fill {
    background: linear-gradient(90deg, color-mix(in srgb, var(--bat) 70%, black), var(--bat));
    box-shadow: 0 0 10px color-mix(in srgb, var(--bat) 40%, transparent);
  }
  .soc-track-reserve {
    background: color-mix(in srgb, var(--warn) 40%, transparent);
  }
  .soc-track-mark {
    position: absolute;
    top: -3px;
    bottom: -3px;
    width: 2px;
    border-radius: 1px;
    background: var(--text);
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--bg) 55%, transparent);
    transform: translateX(-50%);
    z-index: 1;
  }
  .soc-metric-sub {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    column-gap: 5px;
    row-gap: 2px;
    margin-top: 6px;
    color: var(--muted);
    font-size: 11px;
    line-height: 1.35;
  }
  .soc-metric-sep {
    opacity: 0.6;
  }
  .meta {
    text-align: center;
    padding: 10px 6px;
    border-radius: var(--radius-sm);
    background: var(--fill);
    border: 1px solid var(--stroke);
  }
  .meta b {
    display: block;
    font-size: 17px;
    font-weight: 700;
  }
  .meta span {
    font-size: 11px;
    color: var(--muted);
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 18px 0;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 12px;
    border-radius: 999px;
    font-size: 12.5px;
    font-weight: 500;
    color: var(--muted);
    background: var(--fill);
    border: 1px solid var(--stroke);
  }
  .chip i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--faint);
  }
  .chip.on {
    color: var(--text);
    border-color: rgba(52, 211, 153, 0.35);
    background: rgba(52, 211, 153, 0.08);
  }
  .chip.on i {
    background: var(--ok);
    box-shadow: 0 0 10px var(--ok);
  }
  .chip.warn {
    color: var(--text);
    border-color: rgba(251, 191, 36, 0.4);
    background: rgba(251, 191, 36, 0.08);
  }
  .chip.warn i {
    background: var(--warn);
    box-shadow: 0 0 10px var(--warn);
  }
  .group {
    margin-top: 18px;
  }
  .range-bar {
    display: flex;
    justify-content: flex-end;
    margin: 18px 0 0;
  }
  .range-bar .day-nav {
    margin: 0;
  }
  .range-empty {
    margin: 8px 0 0;
    text-align: right;
  }
  .group-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin: 0 0 10px;
  }
  .group-bar .group-head {
    flex: 1;
    width: auto;
    min-width: 0;
    margin: 0;
  }
  .group-bar .seg.period {
    flex: none;
    margin: 0;
  }
  .group-bar .day-nav {
    flex: none;
    margin: 0;
  }
  .day-nav {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 2px;
    border-radius: 10px;
    background: var(--fill);
    border: 1px solid var(--stroke);
  }
  .day-nav-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--muted);
    cursor: pointer;
  }
  .day-nav-btn svg {
    width: 14px;
    height: 14px;
  }
  .day-nav-btn:hover:not(:disabled) {
    color: var(--text);
    background: var(--fill-strong, var(--stroke));
  }
  .day-nav-btn:disabled {
    opacity: 0.35;
    cursor: default;
  }
  .day-nav-btn:focus-visible,
  .day-nav-date:focus-visible,
  .day-nav-today:focus-visible {
    outline: 2px solid var(--accent, #38bdf8);
    outline-offset: 1px;
  }
  .day-nav-pick {
    position: relative;
    display: inline-flex;
    align-items: center;
  }
  .cal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 40;
    background: transparent;
  }
  .cal-pop {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    z-index: 41;
    width: min(320px, calc(100vw - 32px));
    padding: 12px;
    border-radius: 14px;
    border: 1px solid var(--stroke);
    background: var(--card, var(--fill-strong, #0f1522));
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
  }
  .cal-grains {
    width: 100%;
    margin-bottom: 10px;
  }
  .cal-grains button {
    flex: 1;
  }
  .cal-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    margin-bottom: 8px;
  }
  .cal-title {
    flex: 1;
    text-align: center;
    font: 650 13px Inter, system-ui, sans-serif;
    color: var(--text);
  }
  .cal-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
    margin-bottom: 4px;
  }
  .cal-weekdays span {
    text-align: center;
    font-size: 11px;
    font-weight: 650;
    color: var(--muted);
  }
  .cal-grid {
    display: grid;
    gap: 2px;
  }
  .cal-grid.days {
    grid-template-columns: repeat(7, 1fr);
  }
  .cal-grid.months,
  .cal-grid.years {
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }
  .cal-cell {
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--text);
    font: 600 12px Inter, system-ui, sans-serif;
    min-height: 32px;
    cursor: pointer;
  }
  .cal-grid.months .cal-cell,
  .cal-grid.years .cal-cell {
    min-height: 40px;
    background: var(--fill);
  }
  .cal-cell.muted {
    color: var(--faint, var(--muted));
    opacity: 0.55;
  }
  .cal-cell.today {
    box-shadow: inset 0 0 0 1px var(--accent, #38bdf8);
  }
  .cal-cell.in-week {
    background: color-mix(in srgb, var(--accent, #38bdf8) 14%, transparent);
  }
  .cal-cell.sel {
    background: var(--accent, #38bdf8);
    color: #041018;
  }
  .cal-cell:hover:not(:disabled):not(.sel) {
    background: var(--fill-strong, var(--stroke));
  }
  .cal-cell:disabled {
    opacity: 0.3;
    cursor: default;
  }
  .cal-today {
    display: block;
    width: 100%;
    margin-top: 10px;
    border: 1px solid var(--stroke);
    border-radius: 10px;
    background: var(--fill);
    color: var(--text);
    font: 650 12px Inter, system-ui, sans-serif;
    padding: 8px;
    cursor: pointer;
  }
  .cal-today:hover {
    border-color: var(--accent, #38bdf8);
  }
  .day-nav-date {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-width: 7.5rem;
    height: 28px;
    padding: 0 10px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--text);
    font: 650 12px Inter, system-ui, sans-serif;
    letter-spacing: 0.02em;
    cursor: pointer;
  }
  .day-nav-date svg {
    width: 14px;
    height: 14px;
    flex: none;
    color: var(--muted);
  }
  .day-nav-date:hover {
    background: var(--fill-strong, var(--stroke));
  }
  .day-nav-date:hover svg {
    color: var(--text);
  }
  .day-nav-label {
    white-space: nowrap;
  }
  /* Native picker host — kept for showPicker(), not for hit-testing. */
  .day-nav-pick input[type="date"] {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
    border: 0;
    font-size: 16px;
  }
  .day-nav-today {
    height: 28px;
    margin-right: 2px;
    padding: 0 10px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--accent, #38bdf8);
    font: 650 11px Inter, system-ui, sans-serif;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    cursor: pointer;
  }
  .day-nav-today:hover {
    background: var(--fill-strong, var(--stroke));
  }
  .group-head {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 8px;
    margin: 0 0 10px;
    padding: 6px 8px 6px 2px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--muted);
    font: 650 12px Inter, system-ui, sans-serif;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
  }
  .group-head:hover {
    color: var(--text);
  }
  .group-head:focus-visible {
    outline: 2px solid var(--accent, #38bdf8);
    outline-offset: 2px;
  }
  .group-head > span {
    flex: 1;
    text-align: left;
  }
  .group-sum {
    font-size: 13px;
    font-weight: 750;
    letter-spacing: 0;
    text-transform: none;
    color: var(--text);
  }
  .group-sum small {
    margin-left: 6px;
    font-size: 11px;
    font-weight: 650;
    color: var(--muted);
  }
  .group-sum.pos {
    color: var(--ok);
  }
  .group-sum.neg {
    color: var(--grid-in);
  }
  .pulse-body {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 2px 0 0;
  }
  .pulse-chart {
    width: 100%;
    min-height: 268px;
  }
  .pulse-chart .apexcharts-legend-series {
    display: inline-flex !important;
    align-items: center;
  }
  .pulse-chart .apexcharts-yaxis-title-text {
    letter-spacing: 0.02em;
  }
  .pulse-sum {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .pulse-spark {
    width: 72px;
    height: 28px;
    flex: none;
  }
  .group-head svg {
    width: 16px;
    height: 16px;
    transition: transform 0.15s ease;
  }
  .group-head.open svg {
    transform: rotate(90deg);
  }
  @media (prefers-reduced-motion: reduce) {
    .group-head svg,
    .grip-head svg,
    .gauge-arc {
      transition: none;
    }
  }
  .kpis {
    grid-template-columns: repeat(4, 1fr);
  }
  .plant-body {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .hero {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 18px;
    padding: 18px 18px 16px;
  }
  .hero-main {
    display: grid;
    grid-template-columns: minmax(160px, 0.7fr) 1.3fr;
    gap: 8px;
    align-items: center;
  }
  .hero-mode span,
  .hero-meta span {
    display: block;
    color: var(--muted);
    font-size: 12px;
    font-weight: 650;
  }
  .hero-mode b {
    display: block;
    margin-top: 4px;
    font-size: 40px;
    font-weight: 800;
    letter-spacing: -1px;
    line-height: 1;
  }
  .hero-mode[data-mode="2"] b {
    color: var(--warn);
  }
  .hero-mode[data-mode="3"] b {
    color: var(--bat);
  }
  .hero-mode[data-mode="4"] b {
    color: var(--grid-in);
  }
  .hero-gauges {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }
  .hero-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 22px;
    padding-top: 12px;
    border-top: 1px solid var(--stroke);
  }
  .hero-meta b {
    font-size: 14px;
  }
  .hero-fault {
    margin: 0;
    padding: 10px 12px;
    border-radius: 12px;
    color: var(--text);
    background: rgba(248, 113, 113, 0.12);
    border: 1px solid rgba(248, 113, 113, 0.35);
    font-size: 13px;
    font-weight: 650;
  }
  .phase-gauges h3 {
    margin: 0 0 4px;
  }
  .phase-gauge-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .phase-history {
    margin-top: 12px;
  }
  .phase-history .sub {
    margin-bottom: 4px;
  }
  .phase-legend {
    display: flex;
    gap: 14px;
    margin: 2px 0 6px;
    color: var(--muted);
    font-size: 12px;
    font-weight: 650;
  }
  .phase-legend i {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 6px;
    border-radius: 99px;
    background: var(--swatch);
  }
  .phase-chart {
    height: 220px;
  }
  .gauge.house .gauge-arc {
    stroke: var(--house);
  }
  .gauge.grid .gauge-arc {
    stroke: var(--grid-in);
  }
  .gauge.pvi .gauge-arc {
    stroke: var(--pv);
  }
  .gauge.grid.neg .gauge-arc,
  .gauge.pvi.neg .gauge-arc,
  .gauge.house.neg .gauge-arc {
    stroke: var(--grid-out);
  }
  .gauge {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    min-height: 0;
    min-width: 0;
    padding: 0;
    background: transparent;
    border: 0;
    box-shadow: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  .gauge-face {
    position: relative;
    width: min(124px, 100%);
    aspect-ratio: 1;
    display: grid;
    place-items: center;
  }
  .gauge-face svg {
    width: 100%;
    height: 100%;
  }
  .gauge-face b {
    position: absolute;
    max-width: 62%;
    text-align: center;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: -0.4px;
    line-height: 1.05;
    font-variant-numeric: tabular-nums;
  }
  .gauge > span {
    color: var(--muted);
    font-size: 12px;
    font-weight: 650;
    text-align: center;
  }
  .gauge-track,
  .gauge-arc {
    fill: none;
    stroke-width: 8;
  }
  .gauge-track {
    stroke: var(--stroke-strong);
  }
  .gauge-arc {
    stroke: var(--ok);
    stroke-linecap: round;
    transform: rotate(-90deg);
    transform-origin: 60px 60px;
    transition: stroke-dasharray 0.5s ease;
  }
  .gauge.self .gauge-arc {
    stroke: var(--pv);
  }
  .plant-flags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .plant-packs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 14px;
  }
  .pack {
    display: grid;
    grid-template-columns: 108px 1fr;
    gap: 16px;
    align-items: center;
  }
  .pack-visual {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    text-align: center;
  }
  .pack-visual > span {
    color: var(--muted);
    font-size: 11px;
  }
  .pack-soh {
    font-size: 16px;
    font-weight: 800;
    letter-spacing: -0.3px;
  }
  .batt {
    width: 78px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .batt-nub {
    width: 26px;
    height: 7px;
    border-radius: 4px 4px 1px 1px;
    background: var(--stroke-strong);
  }
  .batt-body {
    width: 78px;
    height: 118px;
    margin-top: -1px;
    border-radius: 14px;
    border: 2px solid var(--stroke-strong);
    background:
      linear-gradient(180deg, var(--card-highlight), transparent 28%),
      var(--field);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    box-shadow: inset 0 0 0 1px var(--stroke);
  }
  .batt-fill {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    /* Same --bat as the energy-flow battery, charge and discharge. */
    background: linear-gradient(180deg, color-mix(in srgb, var(--bat) 55%, white), var(--bat) 42%, color-mix(in srgb, var(--bat) 70%, black));
    box-shadow: 0 0 18px color-mix(in srgb, var(--bat) 45%, transparent);
  }
  .batt.idle .batt-fill:not(.batt-fill-reserve) {
    background: linear-gradient(180deg, color-mix(in srgb, var(--bat) 35%, var(--muted)), var(--bat));
    box-shadow: none;
  }
  .batt-fill-reserve {
    /* Same Notstrom-Sockel as the ring: filled warn, zone is translucent warn. */
    background: linear-gradient(180deg, color-mix(in srgb, var(--warn) 55%, white), var(--warn) 46%, color-mix(in srgb, var(--warn) 72%, black));
    box-shadow: 0 0 18px color-mix(in srgb, var(--warn) 40%, transparent);
    z-index: 1;
  }
  .batt-reserve-zone {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: color-mix(in srgb, var(--warn) 40%, transparent);
    box-shadow: inset 0 1px 0 color-mix(in srgb, var(--warn) 55%, transparent);
    pointer-events: none;
  }
  .batt-cells {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(to top, transparent 0 26px, color-mix(in srgb, var(--bg) 55%, transparent) 26px 28px);
    pointer-events: none;
    z-index: 2;
  }
  .batt.live {
    width: 112px;
  }
  .batt.live .batt-nub {
    width: 38px;
    height: 10px;
  }
  .batt.live .batt-body {
    width: 112px;
    height: 168px;
    border-radius: 18px;
  }
  .batt.live .batt-cells {
    background: repeating-linear-gradient(to top, transparent 0 36px, color-mix(in srgb, var(--bg) 55%, transparent) 36px 39px);
  }
  .pack-energy {
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.6px;
    margin-top: 2px;
  }
  .pack-share {
    color: var(--muted);
    font-size: 12px;
    margin-bottom: 10px;
  }
  .pack-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .pack-meta span,
  .temp-top span {
    display: block;
    color: var(--muted);
    font-size: 11px;
  }
  .pack-meta b {
    font-size: 14px;
  }
  .pack-meta b.charge {
    color: var(--bat);
  }
  .pack-meta b.discharge {
    color: var(--warn);
  }
  .pack-meta .soh-wait b {
    color: var(--muted);
    font-variant-numeric: tabular-nums;
  }
  .temp {
    margin-top: 12px;
  }
  .temp-top {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 6px;
  }
  .temp-top b {
    font-size: 12px;
  }
  .temp-track,
  .mix {
    height: 8px;
    border-radius: 99px;
    background: var(--fill);
    position: relative;
    overflow: hidden;
  }
  .temp-track i {
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: 99px;
    background: linear-gradient(90deg, var(--bat), var(--warn));
  }
  .budget {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .budget-row {
    display: grid;
    grid-template-columns: minmax(120px, 180px) 1fr auto;
    gap: 12px;
    align-items: center;
  }
  .budget-row span {
    color: var(--muted);
    font-size: 13px;
  }
  .budget-row .track {
    height: 8px;
    border-radius: 99px;
    background: var(--fill);
    overflow: hidden;
  }
  .budget-row i {
    display: block;
    height: 100%;
    border-radius: 99px;
    background: var(--accent);
  }
  .budget-row i.pv,
  .phase-bars i.pvi,
  .phase-legend i.pvi {
    background: var(--pv);
  }
  .budget-row i.house,
  .phase-bars i.house,
  .phase-legend i.house {
    background: var(--house);
  }
  .budget-row i.bat {
    background: var(--bat);
  }
  .budget-row i.warn {
    background: var(--warn);
  }
  .budget-row i.muted {
    background: var(--faint);
  }
  .budget-row b {
    font-size: 13px;
    min-width: 72px;
    text-align: right;
  }
  .phase-plot {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    height: 168px;
    align-items: end;
  }
  .phase-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    gap: 8px;
  }
  .phase-bars {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 7px;
  }
  .phase-bars i {
    width: 16px;
    min-height: 3px;
    border-radius: 6px 6px 2px 2px;
    background: var(--house);
  }
  .phase-bars i.grid,
  .phase-legend i.grid {
    background: var(--grid-in);
  }
  .phase-bars i.grid.neg {
    background: var(--grid-out);
  }
  .phase-col > span {
    color: var(--muted);
    font-size: 12px;
    font-weight: 650;
  }
  .phase-col > b {
    font-size: 13px;
    font-weight: 700;
    margin-top: -4px;
  }
  .phase-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 14px;
    color: var(--muted);
    font-size: 12px;
  }
  .phase-legend span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .phase-legend i {
    width: 8px;
    height: 8px;
    border-radius: 99px;
  }
  .mix {
    display: flex;
    margin-top: 8px;
  }
  .mix i {
    display: block;
    height: 100%;
  }
  .mix i.sun {
    background: var(--pv);
  }
  .mix i.net {
    background: var(--grid-in);
  }
  .pack.wall .rows {
    margin-top: 8px;
  }
  .cells {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    padding-top: 4px;
    border-top: 1px solid var(--stroke);
  }
  .cells-label {
    flex: 1 0 100%;
    color: var(--muted);
    font-size: 12px;
    font-weight: 650;
  }
  .cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: 92px;
    text-align: center;
  }
  .cell b {
    font-size: 13px;
  }
  .cell span {
    color: var(--muted);
    font-size: 11px;
    line-height: 1.25;
  }
  .batt.mini {
    width: 46px;
  }
  .batt.mini .batt-nub {
    width: 16px;
    height: 5px;
  }
  .batt.mini .batt-body {
    width: 46px;
    height: 68px;
    border-radius: 10px;
  }
  .batt.soh-good .batt-fill {
    background: linear-gradient(180deg, color-mix(in srgb, var(--ok) 55%, white), var(--ok));
    box-shadow: 0 0 14px color-mix(in srgb, var(--ok) 40%, transparent);
  }
  .batt.soh-mid .batt-fill {
    background: linear-gradient(180deg, color-mix(in srgb, var(--warn) 60%, white), var(--warn));
    box-shadow: 0 0 14px color-mix(in srgb, var(--warn) 35%, transparent);
  }
  .batt.soh-low .batt-fill {
    background: linear-gradient(180deg, color-mix(in srgb, var(--grid-in) 60%, white), var(--grid-in));
    box-shadow: 0 0 14px color-mix(in srgb, var(--grid-in) 35%, transparent);
  }
  .wall-stack {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .kpi.alert {
    border-color: rgba(251, 191, 36, 0.5);
    background: rgba(251, 191, 36, 0.06);
  }
  .kpi.alert .delta {
    color: var(--warn);
  }
  .kpi .v {
    font-size: 30px;
    font-weight: 800;
    letter-spacing: -0.8px;
    margin-top: 8px;
  }
  .v small {
    font-size: 15px;
    font-weight: 600;
    color: var(--muted);
    margin-left: 3px;
  }
  .kpi .v .sim-dyn {
    display: block;
    margin-top: 4px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.01em;
    color: var(--muted);
    line-height: 1.35;
  }
  .kpi .v .sim-dyn .sim-delta {
    display: inline;
    margin-left: 0.35em;
    font-weight: 700;
  }
  .kpi .v .sim-dyn .sim-delta.pos {
    color: var(--ok);
  }
  .kpi .v .sim-dyn .sim-delta.neg {
    color: var(--grid-in);
  }
  .kpi .v .sim-dyn .sim-delta.muted {
    font-weight: 600;
    color: var(--muted);
  }
  .kpi .delta {
    margin-top: 6px;
    font-size: 12px;
    color: var(--muted);
  }
  .kpi .spark {
    margin: 8px -8px -12px;
  }

  /* Forecast + plan */
  .chart-head {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 6px;
    flex-wrap: wrap;
  }
  .chart-tools {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }
  .forecast-badge {
    margin-top: 6px;
  }
  .forecast-badge-wrap {
    position: relative;
    display: inline-flex;
    margin-top: 6px;
  }
  .forecast-badge-wrap .forecast-badge {
    margin-top: 0;
    cursor: pointer;
    font: inherit;
  }
  .forecast-badge.dim {
    opacity: 0.55;
  }
  .forecast-badge-scrim {
    position: fixed;
    inset: 0;
    z-index: 40;
  }
  .forecast-badge-menu {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: 41;
    min-width: 220px;
    padding: 6px;
    border-radius: 12px;
    background: var(--glass-strong);
    border: 1px solid var(--stroke);
    box-shadow: var(--float-shadow);
  }
  .forecast-badge-menu button {
    display: block;
    width: 100%;
    border: 0;
    background: transparent;
    color: var(--text);
    text-align: left;
    font: 600 13px Inter, system-ui, sans-serif;
    padding: 10px 12px;
    border-radius: 9px;
    cursor: pointer;
  }
  .forecast-badge-menu button:hover,
  .forecast-badge-menu button:focus-visible {
    background: var(--fill);
  }
  .seg {
    display: inline-flex;
    padding: 3px;
    border-radius: 12px;
    background: var(--fill);
    border: 1px solid var(--stroke);
  }
  .seg button,
  .toggle {
    border: 0;
    background: transparent;
    color: var(--muted);
    font: 600 12px Inter, system-ui, sans-serif;
    padding: 7px 12px;
    border-radius: 9px;
    cursor: pointer;
  }
  .seg button.active,
  .toggle.active {
    background: var(--glass-strong);
    color: var(--text);
  }
  .toggle {
    border: 1px solid var(--stroke);
    border-radius: 12px;
    padding: 9px 12px;
  }
  .stat-row {
    grid-template-columns: repeat(5, 1fr);
    margin-top: 18px;
  }
  .stat {
    padding: 14px 16px;
  }
  .stat .v {
    font-size: 22px;
    font-weight: 700;
    margin-top: 4px;
    letter-spacing: -0.4px;
  }
  .force {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px 16px;
    align-items: center;
    margin-bottom: 14px;
  }
  .force .txt {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .force .txt span {
    color: var(--muted);
    font-size: 12px;
    font-weight: 500;
  }
  .force .slider-field {
    grid-column: 1 / -1;
  }
  .grip {
    padding: 0;
    margin-bottom: 14px;
  }
  .live-top + .grip {
    margin-top: 18px;
  }
  .grip-head {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;
    padding: 14px 16px;
    border: 0;
    background: transparent;
    color: var(--text);
    cursor: pointer;
    text-align: left;
  }
  .grip-head svg {
    width: 16px;
    height: 16px;
    flex: none;
    color: var(--muted);
    transition: transform 0.15s ease;
  }
  .grip-head.open svg {
    transform: rotate(90deg);
  }
  .grip-title {
    flex: none;
    font: 700 15px Inter, system-ui, sans-serif;
  }
  .grip-state {
    padding: 4px 10px;
    border-radius: 999px;
    background: var(--fill);
    color: var(--muted);
    font: 650 13px/1.2 Inter, system-ui, sans-serif;
  }
  .grip-state.on {
    color: var(--text);
    background: var(--accent-wash);
  }
  .grip-state.warn {
    color: var(--text);
    background: rgba(251, 191, 36, 0.16);
  }
  .auto-bar {
    display: flex;
    align-items: center;
  }
  .auto-bar .grip-head {
    flex: 1;
    min-width: 0;
  }
  .auto-bar .switch {
    flex: none;
    margin-right: 16px;
  }
  .grip-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 4px 16px 16px;
    border-top: 1px solid var(--stroke);
  }
  .grip-body .force {
    margin: 0;
    padding-top: 12px;
  }
  .seg.period {
    display: inline-flex;
    width: auto;
    max-width: 100%;
    grid-template-columns: none;
    gap: 0;
    margin: 22px 0 0;
    padding: 2px;
    border-radius: 10px;
  }
  .seg.period button {
    flex: none;
    padding: 5px 12px;
    white-space: nowrap;
  }
  .seg.period + .group {
    margin-top: 8px;
  }
  .debug-card {
    margin-top: 0;
  }
  .debug-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px 14px;
    margin: 4px 0 8px;
  }
  .debug-actions .sub {
    flex: 1 1 12rem;
    margin: 0;
  }
  .debug-log {
    margin: 12px 0 0;
    white-space: pre-wrap;
    font: 12px ui-monospace, monospace;
    color: var(--muted);
  }
  .hint.warn {
    color: var(--warn, #f59e0b);
  }
  .sheet select,
  .btn.action {
    border: 1px solid var(--stroke-strong);
    background: var(--fill);
    color: var(--text);
    border-radius: 10px;
    padding: 8px 10px;
    font: 600 13px Inter, system-ui, sans-serif;
  }
  .btn.action {
    cursor: pointer;
    text-align: left;
  }
  .btn.action:disabled,
  .sheet select:disabled {
    opacity: 0.45;
    cursor: default;
  }
  .release {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
  }
  .release .btn.action {
    width: 100%;
  }
  .banner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 12px;
    margin: 0 0 16px;
    padding: 10px 14px;
    border-radius: 12px;
    border: 1px solid rgba(251, 191, 36, 0.45);
    background: rgba(251, 191, 36, 0.1);
    color: var(--text);
    font-size: 13px;
    font-weight: 650;
  }
  .banner.bad {
    border-color: rgba(248, 113, 113, 0.5);
    background: rgba(248, 113, 113, 0.1);
  }
  .banner-notes {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 16px;
    flex: 1 1 auto;
    min-width: 0;
  }
  .banner-ack {
    appearance: none;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.08);
    color: var(--text);
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: 999px;
    cursor: pointer;
    flex: 0 0 auto;
    margin-left: auto;
  }
  .banner-ack:hover {
    background: rgba(255, 255, 255, 0.14);
  }
  .banner-ack:focus-visible {
    outline: 2px solid var(--accent, #38bdf8);
    outline-offset: 2px;
  }
  .look-banner {
    margin-top: 20px;
  }
  .look-sidebar {
    margin-top: 4px;
  }
  .look-sidebar input {
    width: 100%;
    max-width: 28rem;
    box-sizing: border-box;
    padding: 8px 10px;
    border-radius: 10px;
    border: 1px solid var(--stroke-strong);
    background: var(--field);
    color: var(--text);
    font: 600 14px Inter, system-ui, sans-serif;
  }
  .look-sidebar input:disabled {
    opacity: 0.55;
  }
  .dec-extra {
    grid-template-columns: repeat(3, 1fr);
  }
  .rows {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
  }
  .legend {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    align-items: center;
    font-size: 12px;
    color: var(--muted);
    margin-top: 6px;
  }
  .legend span,
  .legend-toggle,
  .legend-fixed {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .legend-toggle {
    border: 0;
    background: transparent;
    color: var(--muted);
    font: inherit;
    padding: 0;
    cursor: pointer;
  }
  .legend-toggle:hover {
    color: var(--text);
  }
  .legend-toggle.off {
    opacity: 0.38;
    text-decoration: line-through;
  }
  .legend-toggle.off i {
    filter: grayscale(0.7);
  }
  .legend i {
    width: 10px;
    height: 10px;
    border-radius: 3px;
  }
  .strategy-strip {
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid var(--stroke);
  }
  .strategy-strip .strip-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
  .strategy-strip h4 {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
  }
  .strategy-strip .legend {
    margin-top: 0;
  }
  .strategy-strip .strip-track {
    margin-top: 10px;
    box-sizing: border-box;
  }
  .strategy-strip .strip.timed {
    position: relative;
    display: block;
    height: 34px;
    margin-top: 0;
    width: 100%;
  }
  .strategy-strip .strip.timed .slot {
    position: absolute;
    top: 0;
    box-sizing: border-box;
    min-width: 2px;
  }
  .strategy-strip .strip-axis.timed {
    position: relative;
    display: block;
    height: 16px;
    margin-top: 6px;
    width: 100%;
  }
  .strategy-strip .strip-axis.timed span {
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    white-space: nowrap;
    font: 500 11px ui-monospace, monospace;
    color: var(--faint);
  }
  /* Price-plan page: slot strip under the chart, no title row. */
  .plan-slots-strip {
    padding-top: 0;
    border-top: 0;
  }
  .plan-slots-strip .strip-track {
    margin-top: 0;
  }
  /* Quiet mode tabs — sit with chart tools, not a second primary control. */
  .forecast-card .forecast-mode {
    display: inline-flex;
    align-items: center;
    gap: 0;
    margin: 0;
    padding: 0;
    background: transparent;
    border: 0;
  }
  .forecast-card .forecast-mode button {
    border: 0;
    background: transparent;
    color: var(--faint);
    font: 500 11px Inter, system-ui, sans-serif;
    padding: 3px 7px;
    border-radius: 0;
    cursor: pointer;
    letter-spacing: 0.01em;
  }
  .forecast-card .forecast-mode button + button {
    border-left: 1px solid var(--stroke);
  }
  .forecast-card .forecast-mode button:hover:not(:disabled),
  .forecast-card .forecast-mode button:focus-visible:not(:disabled) {
    color: var(--muted);
  }
  .forecast-card .forecast-mode button.active {
    color: var(--text);
    font-weight: 600;
    background: transparent;
  }
  .forecast-card .forecast-mode button:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
  .plan-top {
    grid-template-columns: 2fr 1fr;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 999px;
    font-size: 11.5px;
    font-weight: 600;
    background: rgba(129, 140, 248, 0.14);
    color: #c7d2fe;
    border: 1px solid rgba(129, 140, 248, 0.35);
  }
  .plan-kpi {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .plan-diag {
    margin-top: 4px;
    padding-top: 12px;
    border-top: 1px solid var(--stroke);
  }
  .plan-diag h4 {
    margin: 0 0 8px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .plan-empty + .plan-diag {
    margin: 0 16px 16px;
    padding-top: 12px;
    border-top: 1px solid var(--stroke);
  }
  .plan-tune {
    margin-top: 14px;
  }
  .plan-tune > .group-head {
    margin: 0;
  }
  .plan-tune h4 {
    margin: 18px 0 0;
    font-size: 15px;
  }
  .plan-tune > .settings-section > h3 {
    margin-top: 18px;
  }
  .strategy-summary {
    margin: 10px 0 4px;
    padding: 10px 12px;
    border-radius: 10px;
    border-left: 3px solid var(--accent);
    background: var(--accent-wash);
    font-size: 13px;
    line-height: 1.45;
  }
  .strategy-summary p {
    margin: 0;
  }
  .strategy-summary p + p {
    margin-top: 6px;
  }
  .plan-tune .sub {
    margin: 4px 0 2px;
  }
  .plan-tune .hint {
    margin: 6px 0 0;
  }
  .plan-state {
    font-size: 22px;
    font-weight: 700;
    margin-top: 6px;
  }
  .msg {
    margin-top: 6px;
    line-height: 1.5;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid var(--stroke);
  }
  .row:last-child {
    border-bottom: 0;
  }
  .row span {
    color: var(--muted);
    font-size: 13px;
  }
  .row b {
    font-size: 16px;
    text-align: right;
  }
  .strip {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: 3px;
    margin-top: 14px;
  }
  .slot {
    height: 34px;
    border-radius: 6px;
    background: var(--fill);
  }
  .slot.charge {
    background: linear-gradient(180deg, rgba(52, 211, 153, 0.9), rgba(52, 211, 153, 0.45));
  }
  .slot.hold {
    background: linear-gradient(180deg, rgba(251, 191, 36, 0.85), rgba(251, 191, 36, 0.4));
  }
  .slot.release {
    background: linear-gradient(180deg, rgba(34, 211, 238, 0.45), rgba(34, 211, 238, 0.15));
  }
  .slot.forecast {
    opacity: 0.55;
  }
  .strip-axis {
    display: flex;
    justify-content: space-between;
    font: 500 11px ui-monospace, monospace;
    color: var(--faint);
    margin-top: 6px;
  }

  /* Decision */
  .dec-top {
    grid-template-columns: 1.4fr 1fr;
  }
  .phase-hero {
    overflow: hidden;
  }
  .phase-hero::before {
    content: "";
    position: absolute;
    inset: -40% -20% auto auto;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--accent-glow), transparent 65%);
    pointer-events: none;
  }
  .phase-name {
    font-size: 34px;
    font-weight: 800;
    letter-spacing: -1px;
    margin: 10px 0 6px;
  }
  .phase-reason {
    font-size: 15px;
    line-height: 1.55;
    color: #c9d2e3;
    max-width: 640px;
  }
  .lim-sub {
    margin-bottom: 18px;
  }
  .limits {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .limit-row .lbl {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    font-size: 13px;
    color: var(--muted);
    margin-bottom: 8px;
    flex-wrap: wrap;
  }
  .bar {
    height: 10px;
    border-radius: 999px;
    background: var(--fill);
    position: relative;
    overflow: hidden;
  }
  .bar > div {
    position: absolute;
    inset: 0 auto 0 0;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--accent), var(--accent-2));
  }
  .bar .soll {
    opacity: 0.45;
  }
  .bar .sent {
    height: 4px;
    top: 3px;
    bottom: auto;
  }
  .tl-card {
    margin-top: 18px;
  }
  .phase-gantt {
    margin: 4px 0 18px;
  }
  .gantt-head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 8px 14px;
    margin-bottom: 10px;
  }
  .gantt-head h4 {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
  }
  .gantt-head .sub {
    margin: 0;
    font-size: 12px;
  }
  .gantt-track {
    position: relative;
    height: 36px;
    border-radius: 10px;
    background: var(--fill);
    border: 1px solid var(--stroke);
    overflow: hidden;
  }
  .gantt-seg {
    position: absolute;
    top: 5px;
    bottom: 5px;
    border-radius: 6px;
    opacity: 0.92;
    min-width: 2px;
  }
  .gantt-now {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    margin-left: -1px;
    background: var(--text);
    opacity: 0.75;
    z-index: 2;
    pointer-events: none;
  }
  .gantt-axis {
    display: flex;
    justify-content: space-between;
    font: 500 11px ui-monospace, monospace;
    color: var(--faint);
    margin-top: 6px;
  }
  .gantt-legend {
    margin-top: 10px;
  }
  .tl-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .timeline {
    position: relative;
    padding-left: 26px;
    margin-top: 8px;
  }
  .timeline::before {
    content: "";
    position: absolute;
    left: 8px;
    top: 6px;
    bottom: 6px;
    width: 2px;
    background: linear-gradient(var(--accent), transparent);
    opacity: 0.5;
  }
  .tl-item {
    position: relative;
    padding: 10px 0 18px;
  }
  .tl-item::before {
    content: "";
    position: absolute;
    left: -23px;
    top: 15px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--bg);
    border: 2px solid var(--accent);
  }
  .tl-time {
    font: 500 12px ui-monospace, monospace;
    color: var(--faint);
  }
  .tl-phase {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    margin: 3px 0;
  }
  .tl-reason {
    color: var(--muted);
    font-size: 13.5px;
    line-height: 1.5;
  }

  /* Controls sheet */
  .scrim {
    position: fixed;
    inset: 0;
    background: var(--scrim);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s;
    z-index: 20;
  }
  .scrim.open {
    opacity: 1;
    pointer-events: auto;
  }
  .sheet {
    position: fixed;
    top: 12px;
    right: 12px;
    bottom: 12px;
    width: 400px;
    z-index: 21;
    border-radius: 24px;
    padding: 22px;
    background: var(--float);
    border: 1px solid var(--stroke-strong);
    box-shadow: var(--float-shadow);
    transform: translateX(110%);
    transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
    overflow-y: auto;
  }
  .sheet.open {
    transform: none;
  }
  .hist-scrim {
    z-index: 30;
  }
  .overlay {
    position: fixed;
    z-index: 31;
    left: 50%;
    top: 50%;
    width: min(760px, calc(100% - 24px));
    max-height: min(560px, calc(100% - 24px));
    overflow: auto;
    transform: translate(-50%, -48%);
    border-radius: 24px;
    padding: 22px;
    background: var(--float);
    border: 1px solid var(--stroke-strong);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
  }
  .overlay maestro-chart {
    height: 280px;
    margin-top: 8px;
  }
  .sheet-head {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .sheet h2,
  .overlay h2,
  .pause-menu h2 {
    margin: 0 0 4px;
    font-size: 20px;
  }
  .pause-menu {
    position: fixed;
    z-index: 40;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: min(360px, calc(100% - 24px));
    padding: 18px;
    border-radius: 20px;
    background: var(--float);
    border: 1px solid var(--stroke-strong);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
  }
  .pause-options {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 14px 0;
  }
  .pause-choice {
    text-align: left;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid var(--stroke);
    background: var(--fill);
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
  .pause-choice:hover,
  .pause-choice:focus-visible {
    border-color: var(--accent);
  }
  .pause-choice.resume {
    margin-top: 14px;
    border-color: var(--accent);
    font-weight: 600;
  }
  .ctrl {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px;
    border-radius: 16px;
    background: var(--fill);
    border: 1px solid var(--stroke);
    margin-top: 10px;
  }
  .ctrl.wrap {
    flex-wrap: wrap;
  }
  .ctrl .txt {
    flex: 1;
    min-width: 0;
  }
  .ctrl .txt b {
    display: block;
    font-size: 14px;
    font-weight: 600;
  }
  .ctrl .txt span {
    font-size: 12px;
    color: var(--muted);
  }
  .phase-ladder-link {
    margin-top: 12px;
    border: 0;
    background: none;
    padding: 0;
    color: var(--accent);
    font: inherit;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .ladder {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 18px 0;
    padding: 16px 16px 8px;
    border: 1px solid var(--stroke);
    border-radius: var(--radius);
    background: var(--glass);
    scroll-margin-top: 12px;
  }
  .ladder.ladder-flash {
    animation: ladder-flash 1.1s ease;
  }
  @keyframes ladder-flash {
    0%,
    100% {
      box-shadow: none;
    }
    35% {
      box-shadow: 0 0 0 2px var(--accent-glow), 0 0 24px var(--accent-wash);
    }
  }
  .ladder-head h3 {
    margin: 0;
    font-size: 15px;
  }
  .ladder-head p {
    margin: 4px 0 0;
    color: var(--muted);
    font-size: 13px;
  }
  .ladder-band h4 {
    margin: 0 0 6px;
    font-size: 11px;
    font-weight: 650;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .ladder-steps {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .ladder-step {
    border: 1px solid var(--stroke);
    background: transparent;
    color: var(--text);
    border-radius: 999px;
    padding: 6px 10px;
    font-size: 13px;
    cursor: pointer;
  }
  .ladder-step.on {
    border-color: var(--accent);
    background: var(--glass-strong);
  }
  .settings-section h3 {
    margin: 16px 0 2px;
    font-size: 15px;
  }
  .settings-section .sub {
    margin: 0 0 8px;
  }
  .settings-fold > .group-head {
    margin: 8px 0 0;
    font-size: 15px;
    letter-spacing: 0;
    text-transform: none;
    color: var(--text);
  }
  .settings-fold details {
    margin: 0;
  }
  .settings-fold details > summary.group-head {
    list-style: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 8px 0 0;
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
  }
  .settings-fold details > summary.group-head::-webkit-details-marker {
    display: none;
  }
  .settings-fold details > summary.group-head svg {
    width: 14px;
    height: 14px;
    flex: 0 0 auto;
    transition: transform 0.15s ease;
  }
  .settings-fold details[open] > summary.group-head svg {
    transform: rotate(90deg);
  }
  .settings-section.tariff-focus {
    outline: 1px solid color-mix(in srgb, var(--accent, #3b82f6) 45%, transparent);
    outline-offset: 4px;
    border-radius: 12px;
  }
  .strategy-summary .text-link,
  button.text-link {
    appearance: none;
    border: 0;
    background: none;
    padding: 0;
    margin-left: 0.35em;
    color: var(--accent, #3b82f6);
    font: inherit;
    text-decoration: underline;
    cursor: pointer;
  }
  .setup-card {
    margin-bottom: 18px;
  }
  .setup-card h2 {
    margin: 0 0 4px;
    font-size: 18px;
  }
  .setup-progress {
    margin: 12px 0;
    color: var(--muted);
    font-size: 13px;
  }
  .setup-steps {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .setup-step {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 12px;
    align-items: center;
    padding: 12px 14px;
    border-radius: 14px;
    border: 1px solid var(--stroke);
    background: var(--glass);
  }
  .setup-step b {
    font-size: 15px;
  }
  .setup-step .tag {
    margin-left: 8px;
    color: var(--muted);
    font-size: 12px;
    font-weight: 600;
  }
  .setup-step p {
    margin: 4px 0 0;
    color: var(--muted);
    font-size: 13px;
    line-height: 1.4;
  }
  .setup-step .sub {
    color: var(--text);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .setup-mark {
    width: 28px;
    height: 28px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    font-weight: 700;
    font-size: 14px;
    color: var(--muted);
    border: 1px solid var(--stroke);
  }
  .setup-mark.done {
    color: var(--ok);
    border-color: color-mix(in srgb, var(--ok) 45%, transparent);
    background: color-mix(in srgb, var(--ok) 16%, transparent);
  }
  .setup-mark.todo {
    color: var(--warn);
    border-color: color-mix(in srgb, var(--warn) 50%, transparent);
    background: color-mix(in srgb, var(--warn) 16%, transparent);
  }
  .setup-done {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    margin: 0 0 18px;
    padding: 8px 12px 8px 8px;
    border-radius: 14px;
    border: 1px solid var(--stroke);
    background: var(--glass);
    color: var(--text);
  }
  .setup-done-open {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
    padding: 4px 6px;
    border: 0;
    background: transparent;
    color: inherit;
    text-align: left;
    cursor: pointer;
  }
  .setup-done .btn {
    flex: none;
  }
  .setup-done b,
  .setup-done span span {
    display: block;
  }
  .setup-done span span {
    color: var(--muted);
    font-size: 13px;
    margin-top: 2px;
  }
  .settings-search {
    display: block;
    margin: 0 0 14px;
  }
  .settings-query {
    width: 100%;
    box-sizing: border-box;
    border-radius: 12px;
    border: 1px solid var(--stroke-strong);
    background: var(--field);
    color: var(--text);
    font: 500 14px inherit;
    padding: 10px 12px;
  }
  .settings-hits {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .settings-hit {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    width: 100%;
    text-align: left;
    padding: 12px 14px;
    border-radius: 14px;
    border: 1px solid var(--stroke);
    background: var(--glass);
    color: var(--text);
    cursor: pointer;
  }
  .settings-hit:hover {
    background: var(--glass-strong);
    border-color: var(--stroke-strong);
  }
  .settings-hit b {
    font-size: 15px;
    font-weight: 700;
  }
  .settings-hit span {
    color: var(--muted);
    font-size: 12.5px;
    line-height: 1.35;
  }
  .settings-tiles {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: var(--gap-block);
  }
  .settings-tile {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    min-height: 148px;
    padding: 18px 18px 16px;
    border-radius: var(--radius);
    border: 1px solid var(--stroke);
    background: var(--glass);
    color: var(--text);
    text-align: left;
    cursor: pointer;
  }
  .settings-tile:hover {
    background: var(--glass-strong);
    border-color: var(--stroke-strong);
  }
  .settings-tile svg {
    width: 28px;
    height: 28px;
    color: var(--accent);
  }
  .settings-tile b {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.2px;
  }
  .settings-tile span {
    color: var(--muted);
    font-size: 13px;
    line-height: 1.4;
  }
  .settings-detail {
    display: flex;
    flex-direction: column;
  }
  .settings-tiles .hint {
    grid-column: 1 / -1;
    margin: 0;
  }
  .theme-choices {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: var(--gap-block);
  }
  .look-seg {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    gap: 4px;
    padding: 3px;
    border-radius: var(--radius-sm);
    background: var(--field);
    border: 1px solid var(--stroke);
  }
  .look-seg button {
    border: 0;
    border-radius: calc(var(--radius-sm) - 2px);
    background: transparent;
    color: var(--muted);
    font: 600 12.5px inherit;
    padding: 10px 8px;
    cursor: pointer;
  }
  .look-seg button.on {
    background: var(--accent-wash);
    color: var(--text);
    box-shadow: inset 0 0 0 1px var(--accent-line);
  }
  .look-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 0 4px;
  }
  .look-row .txt {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }
  .look-row .txt b {
    font-size: 15px;
  }
  .look-row .txt span {
    color: var(--muted);
    font-size: 12.5px;
    line-height: 1.35;
  }
  :host([corners="soft"]) .nav-btn,
  :host([corners="medium"]) .nav-btn,
  :host([corners="sharp"]) .nav-btn,
  :host([corners="soft"]) .theme-choice,
  :host([corners="medium"]) .theme-choice,
  :host([corners="sharp"]) .theme-choice,
  :host([corners="soft"]) .btn,
  :host([corners="medium"]) .btn,
  :host([corners="sharp"]) .btn,
  :host([corners="soft"]) .pill,
  :host([corners="medium"]) .pill,
  :host([corners="sharp"]) .pill,
  :host([corners="soft"]) .ctrl,
  :host([corners="medium"]) .ctrl,
  :host([corners="sharp"]) .ctrl,
  :host([corners="soft"]) .settings-hit,
  :host([corners="medium"]) .settings-hit,
  :host([corners="sharp"]) .settings-hit {
    border-radius: var(--radius-sm);
  }
  :host([corners="soft"]) .card,
  :host([corners="medium"]) .card,
  :host([corners="sharp"]) .card,
  :host([corners="soft"]) .settings-tile,
  :host([corners="medium"]) .settings-tile,
  :host([corners="sharp"]) .settings-tile,
  :host([corners="soft"]) .overlay,
  :host([corners="medium"]) .overlay,
  :host([corners="sharp"]) .overlay {
    border-radius: var(--radius);
  }
  :host([corners="sharp"]) .look-seg,
  :host([corners="sharp"]) .seg {
    border-radius: 4px;
  }
  :host([corners="sharp"]) .look-seg button,
  :host([corners="sharp"]) .seg button {
    border-radius: 2px;
  }
  :host([density="compact"]) .settings-tile {
    min-height: 120px;
    padding: 12px;
  }
  :host([density="airy"]) .settings-tile {
    min-height: 168px;
    padding: 22px;
  }
  .theme-choice {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px;
    border-radius: 16px;
    border: 1px solid var(--stroke);
    background: var(--card-bg);
    color: var(--text);
    text-align: left;
    cursor: pointer;
    box-shadow: var(--card-shadow);
  }
  .theme-choice.on {
    border-color: var(--accent);
    box-shadow: inset 0 0 0 1px var(--accent), var(--card-shadow);
  }
  .theme-preview-banner {
    min-height: 1.35em;
    margin: 0 0 10px;
    color: var(--accent);
    font-weight: 600;
    visibility: hidden;
  }
  .theme-preview-banner.on {
    visibility: visible;
  }
  .theme-choice .swatch {
    width: 72px;
    height: 48px;
    border-radius: 12px;
    flex: none;
    border: 1px solid rgba(21, 36, 56, 0.12);
    display: flex;
    overflow: hidden;
    position: relative;
  }
  .theme-choice .swatch-rail {
    width: 14px;
    flex: none;
  }
  .theme-choice .swatch-stage {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 6px 6px 6px 5px;
  }
  .theme-choice .swatch-card {
    flex: 1;
    border-radius: 5px;
    min-height: 0;
  }
  .theme-choice .swatch-bar {
    height: 5px;
    border-radius: 999px;
    width: 62%;
  }
  .theme-choice .swatch.dark {
    background: #070b14;
    border-color: rgba(148, 163, 184, 0.2);
  }
  .theme-choice .swatch.dark .swatch-rail {
    background: linear-gradient(180deg, #0f172a, #1e293b);
  }
  .theme-choice .swatch.dark .swatch-card {
    background: linear-gradient(180deg, #152033, #0f172a);
    box-shadow: inset 0 0 0 1px rgba(56, 189, 248, 0.18);
  }
  .theme-choice .swatch.dark .swatch-bar {
    background: #38bdf8;
  }
  .theme-choice .swatch.classic {
    background: #e7eef5;
    border-color: rgba(21, 36, 56, 0.12);
  }
  .theme-choice .swatch.classic .swatch-rail {
    background: rgba(255, 255, 255, 0.92);
  }
  .theme-choice .swatch.classic .swatch-card {
    background: #ffffff;
    box-shadow: 0 1px 2px rgba(21, 32, 51, 0.08);
  }
  .theme-choice .swatch.classic .swatch-bar {
    background: #0284c7;
  }
  .theme-choice .swatch.e3dc {
    background: #f7f7f7;
    border-color: rgba(30, 37, 43, 0.12);
  }
  .theme-choice .swatch.e3dc .swatch-rail {
    background: #1e252b;
  }
  .theme-choice .swatch.e3dc .swatch-card {
    background: #ffffff;
    box-shadow: 0 1px 2px rgba(30, 37, 43, 0.08);
  }
  .theme-choice .swatch.e3dc .swatch-bar {
    background: #5cc244;
  }
  .theme-choice .swatch.oled {
    background: #000000;
    border-color: rgba(255, 255, 255, 0.18);
  }
  .theme-choice .swatch.oled .swatch-rail {
    background: #000000;
  }
  .theme-choice .swatch.oled .swatch-card {
    background: #0a0a0a;
    box-shadow: inset 0 0 0 1px rgba(56, 189, 248, 0.22);
  }
  .theme-choice .swatch.oled .swatch-bar {
    background: #38bdf8;
  }
  .theme-choice .swatch.amber {
    background: #140e0a;
    border-color: rgba(243, 231, 216, 0.16);
  }
  .theme-choice .swatch.amber .swatch-rail {
    background: linear-gradient(180deg, #1c140f, #2a1c12);
  }
  .theme-choice .swatch.amber .swatch-card {
    background: linear-gradient(180deg, #2a1c12, #1c140f);
    box-shadow: inset 0 0 0 1px rgba(245, 158, 11, 0.22);
  }
  .theme-choice .swatch.amber .swatch-bar {
    background: #f59e0b;
  }
  .theme-choice .swatch.leitstand {
    background: #0a0e12;
    border-color: rgba(215, 224, 230, 0.2);
    border-radius: 4px;
  }
  .theme-choice .swatch.leitstand .swatch-rail {
    background: #070a0d;
  }
  .theme-choice .swatch.leitstand .swatch-card {
    background: #11171c;
    border-radius: 2px;
    box-shadow: inset 0 0 0 1px rgba(34, 197, 94, 0.28);
  }
  .theme-choice .swatch.leitstand .swatch-bar {
    background: #22c55e;
    border-radius: 1px;
  }
  .theme-choice .swatch.tibber {
    background: #0b1020;
    border-color: rgba(230, 238, 248, 0.16);
  }
  .theme-choice .swatch.tibber .swatch-rail {
    background: linear-gradient(180deg, #12182c, #1a2240);
  }
  .theme-choice .swatch.tibber .swatch-card {
    background: linear-gradient(180deg, #1a2240, #12182c);
    box-shadow: inset 0 0 0 1px rgba(36, 204, 191, 0.24);
  }
  .theme-choice .swatch.tibber .swatch-bar {
    background: #24ccbf;
  }
  .theme-choice .txt {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }
  .theme-choice .txt b {
    font-size: 15px;
  }
  .theme-choice .txt span {
    color: var(--muted);
    font-size: 12.5px;
    line-height: 1.35;
  }
  .guide p {
    margin: 0 0 14px;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.5;
  }
  .guide h3 {
    margin: 22px 0 10px;
    font-size: 13px;
    font-weight: 650;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text);
  }
  .guide ol {
    margin: 0 0 16px;
    padding-left: 1.2rem;
    color: var(--text);
    font-size: 14px;
    line-height: 1.5;
  }
  .guide li + li {
    margin-top: 8px;
  }
  .dep {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px;
    margin-top: 8px;
    border-radius: 16px;
    border: 1px solid var(--stroke);
    background: var(--glass);
  }
  .dep b {
    font-size: 14px;
  }
  .dep span {
    color: var(--muted);
    font-size: 13px;
  }
  .guide .btn {
    margin-top: 8px;
  }
  .guide .ok,
  .dep .ok {
    color: var(--ok);
  }
  .guide .bad,
  .dep .bad {
    color: #f87171;
  }
  .classic-action {
    margin-bottom: 18px;
  }
  .classic-action p {
    margin-bottom: 6px;
  }
  .guide details {
    margin-top: 18px;
    padding: 12px 16px;
    border-radius: 16px;
    border: 1px solid var(--stroke);
    background: var(--glass);
  }
  .guide summary {
    cursor: pointer;
    font-weight: 650;
    color: var(--text);
  }
  .guide details[open] summary {
    margin-bottom: 12px;
  }
  .grip-body select,
  .setting-row select,
  .setting-num input {
    border-radius: 10px;
    border: 1px solid var(--stroke-strong);
    background: var(--field);
    color: var(--text);
    font: 600 14px Inter, system-ui, sans-serif;
    padding: 8px 10px;
  }
  .setting-row select {
    max-width: 220px;
  }
  .setting-num {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: none;
  }
  .setting-num input {
    width: 7.5rem;
  }
  .setting-row {
    flex-wrap: wrap;
  }
  .setting-num.range {
    flex: 1 1 180px;
    min-width: 180px;
  }
  .setting-num.range input[type="range"] {
    width: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    accent-color: var(--accent);
  }
  .setting-num.range b {
    min-width: 5.5rem;
    text-align: right;
    font-size: 13px;
    font-weight: 650;
  }
  .setting-num span {
    color: var(--muted);
    font-size: 12px;
  }
  .setting-row .name {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  maestro-setting-tip {
    position: relative;
    display: inline-flex;
    flex: none;
  }
  .info {
    flex: none;
    width: 18px;
    height: 18px;
    padding: 0;
    border-radius: 50%;
    border: 1px solid var(--stroke-strong);
    background: transparent;
    color: var(--muted);
    font: 600 11px/16px Inter, system-ui, sans-serif;
    cursor: pointer;
  }
  .info[aria-expanded="true"] {
    color: var(--accent);
    border-color: var(--accent);
  }
  .tip {
    position: absolute;
    z-index: 30;
    left: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
    width: min(280px, 70vw);
    box-sizing: border-box;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--tip-bg);
    border: 1px solid var(--stroke-strong);
    color: var(--text);
    font: 500 13px/1.45 Inter, system-ui, sans-serif;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
    pointer-events: none;
  }
  .setting-row.locked,
  .setting-line.locked {
    opacity: 0.7;
  }
  .setting-bundle {
    flex-direction: column;
    align-items: stretch;
  }
  .setting-line {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    width: 100%;
  }
  .setting-line.stack {
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }
  .bundle-fields {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--stroke);
  }
  .bundle-fields.quiet {
    opacity: 0.55;
    pointer-events: none;
  }
  .bundle-fields.quiet input,
  .bundle-fields.quiet button,
  .bundle-fields.quiet select {
    pointer-events: none;
  }
  .bundle-fields .slider-field,
  .bundle-fields .setting-num,
  .bundle-fields select {
    width: 100%;
    max-width: none;
  }
  .switch {
    width: 46px;
    height: 28px;
    border-radius: 999px;
    background: var(--switch-track);
    border: 0;
    padding: 0;
    position: relative;
    cursor: pointer;
    transition: background 0.2s;
    flex: none;
  }
  .switch::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #fff;
    transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
  .switch.on {
    background: linear-gradient(90deg, var(--accent), var(--accent-2));
  }
  .switch.on::after {
    transform: translateX(18px);
  }
  .switch:disabled {
    opacity: 0.5;
    cursor: default;
  }
  input[type="range"] {
    width: 100%;
    accent-color: var(--accent);
    margin-top: 6px;
  }
  .link {
    display: block;
    margin-top: 18px;
    color: var(--accent);
    font-size: 13px;
    text-decoration: none;
  }
  .sheet .ctrl .slider-field {
    flex: 1 1 100%;
  }
  .slider-field {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    min-width: 0;
  }
  .slider-track {
    position: relative;
    flex: 1;
    min-width: 0;
  }
  .slider-field input[type="range"] {
    width: 100%;
    height: 44px;
    margin: 0;
    appearance: none;
    -webkit-appearance: none;
    background: transparent;
    accent-color: var(--accent);
  }
  .slider-scale {
    position: relative;
    height: 30px;
    margin: 2px 14px 0;
    pointer-events: none;
  }
  .slider-scale span {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateX(-50%);
    white-space: nowrap;
    color: var(--text);
    font: 650 11px/1.1 Inter, system-ui, sans-serif;
  }
  .slider-scale span::before {
    content: "";
    display: block;
    width: 2px;
    height: 8px;
    margin-bottom: 3px;
    border-radius: 1px;
    background: var(--accent);
  }
  .slider-field input[type="range"]::-webkit-slider-runnable-track {
    height: 8px;
    border-radius: 999px;
    background: var(--switch-track);
  }
  .slider-field input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    width: 28px;
    height: 28px;
    margin-top: -10px;
    border-radius: 50%;
    background: var(--accent);
    border: 2px solid var(--surface, #fff);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
  }
  .slider-field input[type="range"]::-moz-range-track {
    height: 8px;
    border: 0;
    border-radius: 999px;
    background: var(--switch-track);
  }
  .slider-field input[type="range"]::-moz-range-thumb {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--accent);
    border: 2px solid var(--surface, #fff);
  }
  .slider-field input[type="number"] {
    width: 6.5rem;
    flex: none;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid var(--stroke-strong);
    background: var(--field);
    color: var(--text);
    font: 600 14px Inter, system-ui, sans-serif;
    padding: 8px 10px;
  }
  .slider-field span {
    color: var(--muted);
    font-size: 12px;
    flex: none;
  }
  .sheet-section {
    margin-top: 22px;
    padding-top: 16px;
    border-top: 1px solid var(--stroke);
  }
  .sheet-section h3 {
    margin: 0 0 4px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    color: var(--muted);
  }
  .hint {
    color: var(--muted);
    font-size: 13px;
    line-height: 1.45;
    margin: 12px 0 0;
  }
  .consumer {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    border-radius: 16px;
    background: var(--fill);
    border: 1px solid var(--stroke);
    margin-top: 10px;
  }
  .consumer input,
  .picker input {
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid var(--stroke-strong);
    background: var(--field);
    color: var(--text);
    font: 600 14px Inter, system-ui, sans-serif;
    padding: 8px 10px;
  }
  .consumer .lbl {
    display: block;
    margin-bottom: 4px;
    color: var(--muted);
    font: 600 11px Inter, system-ui, sans-serif;
    letter-spacing: 0.2px;
  }
  .consumer .txt span:not(.lbl),
  .pick span {
    display: block;
    margin-top: 4px;
    color: var(--faint);
    font: 11px ui-monospace, monospace;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .icon-pick {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 4px;
  }
  .icon-pick button {
    height: 36px;
    border-radius: 10px;
    border: 1px solid var(--stroke);
    background: transparent;
    color: var(--muted);
    display: grid;
    place-items: center;
    cursor: pointer;
    padding: 0;
  }
  .icon-pick button.on {
    color: var(--text);
    border-color: var(--accent-line);
    background: var(--accent-wash);
  }
  .icon-pick svg {
    width: 18px;
    height: 18px;
  }
  .seg {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    padding: 3px;
    border-radius: 12px;
    background: var(--field);
  }
  .seg button {
    border: 0;
    border-radius: 9px;
    background: transparent;
    color: var(--muted);
    font: 600 12px Inter, system-ui, sans-serif;
    padding: 8px 6px;
    cursor: pointer;
  }
  .seg button.on {
    background: var(--accent-wash);
    color: var(--text);
  }
  :host([theme="e3dc"]) .seg button.on {
    background: #5cc244;
    color: #ffffff;
  }
  :host([theme="leitstand"]) .nav-btn {
    border-radius: 4px;
    font-family: inherit;
  }
  :host([theme="leitstand"]) .nav-btn.active {
    color: #22c55e;
    background: transparent;
    box-shadow: inset 3px 0 0 #22c55e;
  }
  :host([theme="leitstand"]) .seg {
    border-radius: 4px;
  }
  :host([theme="leitstand"]) .seg button {
    border-radius: 2px;
    font-family: inherit;
  }
  :host([theme="leitstand"]) .seg button.on {
    background: #166534;
    color: #ecfdf5;
  }
  :host([theme="oled"]) .rail,
  :host([theme="oled"]) .nav-btn.active {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  .btn.add,
  .btn.ghost {
    margin-top: 10px;
    width: 100%;
  }
  .btn.ghost {
    background: transparent;
  }
  .picker {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .pick {
    text-align: left;
    border-radius: 12px;
    border: 1px solid var(--stroke);
    background: var(--fill);
    color: var(--text);
    padding: 8px 10px;
    cursor: pointer;
  }
  .pick b {
    display: block;
    font-size: 13px;
    font-weight: 600;
  }

  /* ApexCharts overrides */
  .apexcharts-tooltip.apexcharts-theme-dark,
  .apexcharts-tooltip.apexcharts-theme-light {
    background: var(--tooltip) !important;
    border: 1px solid var(--stroke-strong) !important;
    border-radius: 12px !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4) !important;
  }
  .apexcharts-tooltip-title {
    background: transparent !important;
    border-bottom: 1px solid var(--stroke) !important;
  }
  .apexcharts-xaxistooltip {
    background: var(--tooltip) !important;
    border-color: var(--stroke-strong) !important;
    color: var(--text) !important;
  }

  footer.debug {
    margin-top: 16px;
    color: var(--faint);
    font: 12px ui-monospace, monospace;
  }

  @media (max-width: 960px) {
    .app {
      grid-template-columns: 1fr;
    }
    .rail {
      position: fixed;
      top: auto;
      bottom: 0;
      left: 0;
      right: 0;
      height: auto;
      z-index: 10;
      flex-direction: row;
      justify-content: space-around;
      padding: 8px 6px calc(8px + env(safe-area-inset-bottom));
      border-right: 0;
      border-top: 1px solid var(--stroke);
      background: var(--rail-solid);
    }
    .rail .logo-wrap,
    .rail .logo,
    .rail .spacer {
      display: none;
    }
    .nav-btn {
      flex: 1;
      max-width: 84px;
      width: auto;
    }
    main {
      padding: max(16px, env(safe-area-inset-top)) 14px calc(148px + env(safe-area-inset-bottom));
    }
    .live-top,
    .plan-top,
    .dec-top {
      grid-template-columns: 1fr;
    }
    .kpis,
    .plant-kpis,
    .stat-row,
    .dec-extra {
      grid-template-columns: repeat(2, 1fr);
    }
    .hero-main {
      grid-template-columns: 1fr;
    }
    .hero-mode b {
      font-size: 32px;
    }
    .pack-meta,
    .budget-row {
      grid-template-columns: 1fr;
    }
    .budget-row b {
      text-align: left;
    }
    .flow-wrap {
      height: auto;
      max-width: 420px;
      margin: 0 auto;
      overflow: visible;
    }
    .flow-wrap.blob {
      /* Keep PV watts / Haus captions inside the phone card. */
      padding: 6px 2px 2px;
    }
    .topbar {
      flex-wrap: wrap;
      row-gap: 10px;
    }
    .pill.hide-sm {
      display: inline-flex;
      flex-basis: 100%;
      width: max-content;
      max-width: 100%;
      white-space: normal;
    }
    .topbar .btn span {
      display: none;
    }
    .sheet {
      left: 8px;
      right: 8px;
      width: auto;
      top: auto;
      max-height: 85vh;
      transform: translateY(110%);
    }
    .sheet.open {
      transform: none;
    }
    .phase-name {
      font-size: 28px;
    }
    .forecast-card,
    .plan-card {
      padding: 14px 12px;
    }
    .forecast-card .chart-head,
    .plan-card .chart-head {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
    }
    .forecast-card .chart-head h3,
    .plan-card .chart-head h3 {
      font-size: 15px;
      line-height: 1.3;
    }
    .forecast-card .chart-tools {
      width: 100%;
    }
    .forecast-card .chart-tools .toggle {
      padding: 8px 10px;
      font-size: 11px;
    }
    .forecast-card .legend,
    .plan-card .legend {
      flex-wrap: nowrap;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      gap: 12px;
      padding-bottom: 2px;
      scrollbar-width: none;
    }
    .forecast-card .legend::-webkit-scrollbar,
    .plan-card .legend::-webkit-scrollbar {
      display: none;
    }
    .forecast-card .legend-toggle,
    .forecast-card .legend-fixed,
    .plan-card .legend span {
      flex-shrink: 0;
    }
    .plan-kpi {
      gap: 10px;
    }
    .plan-kpi .plan-state {
      font-size: 18px;
    }
    .plan-kpi .row b {
      font-size: 14px;
    }
    .strategy-strip .strip-head .legend {
      display: none;
    }
    .strategy-strip .slot {
      height: 28px;
    }
    .strategy-strip .strip-axis {
      font-size: 10px;
    }
    #fc-main,
    #plan-main {
      margin: 0 -2px;
    }
    .gantt-track {
      height: 32px;
    }
    .gantt-legend {
      flex-wrap: nowrap;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .gantt-legend::-webkit-scrollbar {
      display: none;
    }
    .gantt-legend span {
      flex-shrink: 0;
    }
  }
  .opt-entity,
  .opt-action,
  .opt-slot-fields,
  .opt-actions,
  .opt-top {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }
  .opt-choices {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 180px;
    overflow: auto;
    width: 100%;
  }
  .opt-choices button,
  .opt-days button {
    text-align: left;
    border: 1px solid var(--stroke);
    background: var(--glass);
    color: var(--text);
    border-radius: 10px;
    padding: 6px 8px;
    cursor: pointer;
  }
  .opt-days {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .opt-days button.on {
    border-color: var(--accent);
  }
  .opt-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .slot-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    border: 1px solid var(--stroke);
    border-radius: 16px;
    margin-bottom: 10px;
  }
  .opt-slot-fields label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
    color: var(--muted);
  }
  .opt-entity input,
  .opt-action input,
  .opt-slot-fields input,
  .opt-slot-fields select {
    min-width: 0;
  }
  .setting-row.wide {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  .setting-row.wide .txt {
    flex: none;
  }
  .setting-bundle > .setting-line + .setting-line {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--stroke);
  }
  .setting-row.wide .opt-entity,
  .setting-row.wide .opt-action,
  .setting-bundle > .setting-line .opt-entity,
  .setting-bundle > .setting-line .opt-action {
    width: 100%;
  }
  .setting-row.wide .opt-entity input,
  .setting-row.wide .opt-action input,
  .setting-bundle > .setting-line .opt-entity input,
  .setting-bundle > .setting-line .opt-action input {
    flex: 1 1 100%;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid var(--stroke-strong);
    background: var(--field);
    color: var(--text);
    font: 600 13px Inter, system-ui, sans-serif;
    padding: 8px 10px;
  }
  .setting-row.wide .opt-action input {
    flex: 1 1 14rem;
  }
  .opt-choices button,
  .opt-chips .chip {
    overflow-wrap: anywhere;
  }

  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  .topbar-corner {
    display: contents;
  }
  .help-menu,
  .news-menu {
    display: none;
  }
  .news-menu {
    position: relative;
    overflow: visible;
  }
  .news-menu img {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: block;
    object-fit: cover;
  }
  .news-menu .logo-badge {
    top: 2px;
    right: 2px;
  }
  .help-scrim {
    z-index: 40;
  }
  .help {
    position: fixed;
    z-index: 41;
    inset: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 22px;
    border-radius: 24px;
    background: var(--float);
    border: 1px solid var(--stroke-strong);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
    min-height: 0;
    overflow: hidden;
  }
  .help-search {
    display: block;
  }
  .help-query {
    width: 100%;
    box-sizing: border-box;
    border-radius: 12px;
    border: 1px solid var(--stroke-strong);
    background: var(--field);
    color: var(--text);
    font: 500 14px inherit;
    padding: 10px 12px;
  }
  .help-body {
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    gap: 18px;
    min-height: 0;
    flex: 1;
    overflow: hidden;
  }
  .help-toc,
  .help-doc {
    overflow: auto;
    min-height: 0;
    overscroll-behavior: contain;
  }
  .help-toc-ch {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 2px;
    margin-bottom: 12px;
  }
  .help-toc button {
    text-align: left;
    background: transparent;
    border: 0;
    color: var(--muted);
    font: 500 13px inherit;
    padding: 4px 8px;
    border-radius: 8px;
    cursor: pointer;
  }
  .help-toc-ch > button:first-child {
    color: var(--text);
    font-weight: 700;
  }
  .help-toc button.on,
  .help-toc button[aria-current="true"] {
    background: var(--accent-wash);
    color: var(--text);
  }
  .help-fold {
    display: none;
  }
  .help-doc article + article {
    margin-top: 22px;
  }
  .help-doc h3 {
    margin: 0 0 8px;
    font-size: 18px;
  }
  .help-doc h4 {
    margin: 14px 0 4px;
    font-size: 15px;
  }
  .help-doc p {
    margin: 0 0 8px;
    color: var(--muted);
    line-height: 1.5;
  }
  .help-doc mark {
    background: var(--accent-wash);
    color: inherit;
    border-radius: 3px;
  }
  .help-link,
  .help-action {
    margin: 4px 8px 4px 0;
  }
  .help-link {
    background: transparent;
    border: 0;
    padding: 0;
    color: var(--accent-2, var(--accent));
    font: 600 14px inherit;
    cursor: pointer;
    text-decoration: underline;
  }
  .help-live {
    margin: 8px 0 12px;
    padding: 12px;
    border: 1px solid var(--stroke);
    border-radius: var(--radius);
    background: var(--glass);
  }
  .help-now {
    margin: 0 0 8px;
    color: var(--text);
    font-weight: 650;
  }
  .help-news {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 11px 14px;
    border-radius: 12px;
    border: 1px solid color-mix(in srgb, var(--accent-2, var(--accent)) 45%, var(--stroke));
    background: color-mix(in srgb, var(--accent-2, var(--accent)) 14%, var(--field));
    color: var(--text);
    font: 650 14px inherit;
    text-decoration: none;
  }
  .help-news:hover,
  .help-news:focus-visible {
    border-color: var(--accent-2, var(--accent));
    background: color-mix(in srgb, var(--accent-2, var(--accent)) 22%, var(--field));
  }
  .help-top {
    margin-top: 16px;
  }
  @media (max-width: 960px) {
    .help {
      inset: 8px;
      padding: 16px;
    }
    .help-body {
      grid-template-columns: 1fr;
    }
    .help-body > .help-toc {
      display: none;
    }
    .topbar-corner {
      display: grid;
      grid-template-columns: 40px 40px;
      grid-template-rows: 40px;
      gap: 6px;
      align-items: center;
      justify-items: center;
      flex: none;
      align-self: start;
    }
    .topbar-corner .theme-toggle {
      grid-column: 1;
      grid-row: 1;
    }
    .topbar-corner .help-menu {
      grid-column: 2;
      grid-row: 1;
    }
    .topbar-corner.has-news {
      grid-template-rows: 40px 40px;
    }
    .topbar-corner.has-news .theme-toggle,
    .topbar-corner.has-news .help-menu {
      grid-row: 2;
    }
    .topbar-corner.has-news .news-menu {
      grid-column: 2;
      grid-row: 1;
    }
    .help-menu,
    .news-menu {
      display: grid;
    }
    .help-fold {
      display: block;
    }
    .help-fold nav {
      max-height: 40vh;
      overflow: auto;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .help,
    .help-scrim {
      transition: none;
    }
  }
`;
