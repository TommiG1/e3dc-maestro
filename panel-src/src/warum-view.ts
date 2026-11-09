import { html, nothing, type TemplateResult } from "lit";
import type { I18n } from "./i18n";
import {
  hasActiveWhatIfOverrides,
  matchingWarumEntries,
  mergeTunableOverrides,
  settingGroupFor,
  warumCatalog,
  warumSuggestions,
  type WarumAnswer,
  type WarumCatalogEntry,
  type WarumGate,
  type WarumPayload,
  type WarumSuggestion,
  type WarumTerm,
  type WarumThreadItem,
  type WarumTopic,
  type WarumTunable,
} from "./warum";

export interface WarumViewCtx {
  i18n: I18n;
  phase?: string;
  soc?: number;
  chargeTarget?: number;
  thread: WarumThreadItem[];
  loading: boolean;
  error?: string;
  query: string;
  suggestIndex: number;
  whatIfOverrides: Record<string, Record<string, number>>;
  onQuery: (q: string) => void;
  onSuggestIndex: (idx: number) => void;
  onAsk: (opts: {
    query?: string;
    topic?: WarumTopic;
    whyNotPhase?: string;
    whatIfParams?: Record<string, unknown>;
    lookbackAt?: string;
    threadId?: string;
  }) => void;
  onWhatIf: (threadId: string, overrides: Record<string, number>) => void;
  onResetWhatIf: (threadId: string) => void;
  onDismiss: (id: string) => void;
  onOpenGroup: (id: string) => void;
}

function submitCatalogEntry(entry: WarumCatalogEntry, ctx: WarumViewCtx): void {
  ctx.onAsk({
    query: entry.haystack.split("\n")[0],
    topic: entry.topic,
    whyNotPhase: entry.whyNotPhase,
  });
}

function askSuggestion(s: WarumSuggestion, ctx: WarumViewCtx): void {
  if (s.id === "why_not_phase") {
    ctx.onAsk({ topic: "current", whyNotPhase: ctx.phase });
    return;
  }
  ctx.onAsk({
    query: ctx.i18n.t(s.labelKey),
    topic: s.topic,
    whyNotPhase: s.whyNotPhase,
    whatIfParams: s.whatIfParams,
  });
}

function visibleSuggestEntries(
  query: string,
  catalog: WarumCatalogEntry[],
): WarumCatalogEntry[] | undefined {
  const hits = matchingWarumEntries(query, catalog);
  if (hits !== undefined) return hits.slice(0, 8);
  if (!query.trim()) return catalog.slice(0, 6);
  return undefined;
}

function warumTermRow(
  term: WarumTerm,
  i18n: I18n,
  onOpenGroup: (id: string) => void,
): TemplateResult {
  const group = settingGroupFor(term.setting_key);
  return html`
    <li class=${term.passed ? "warum-term ok" : "warum-term fail"}>
      <span class="warum-check" aria-hidden="true">${term.passed ? "✓" : "✗"}</span>
      <span class="warum-term-body">
        <span class="warum-term-name">${term.name}</span>
        <span class="warum-term-vals">${String(term.actual)} / ${String(term.expected)}</span>
        ${group
          ? html`<button type="button" class="linkish" @click=${() => onOpenGroup(group)}>
              ${i18n.t("warumOpenSetting")}
            </button>`
          : nothing}
      </span>
    </li>
  `;
}

function warumGateBlock(
  gate: WarumGate,
  i18n: I18n,
  onOpenGroup: (id: string) => void,
): TemplateResult {
  const { t } = i18n;
  return html`
    <details class="warum-gate" ?open=${gate.result}>
      <summary>
        <span class=${gate.result ? "warum-gate-won" : "warum-gate-miss"}>${gate.name}</span>
        <span class="sub">${gate.result ? t("warumGateWon") : t("warumGateMiss")}</span>
      </summary>
      <ul class="warum-terms">
        ${gate.terms.map((term) => warumTermRow(term, i18n, onOpenGroup))}
      </ul>
    </details>
  `;
}

function energyBalanceStrip(
  balance: Record<string, unknown>,
  i18n: I18n,
): TemplateResult {
  const { t } = i18n;
  const note = balance.note != null ? String(balance.note) : "";
  return html`
    <div class="warum-details-block">
      <h5>${t("warumBalanceTitle")}</h5>
      ${note ? html`<p class="sub">${note}</p>` : nothing}
      <div class="warum-balance">
        <span>${t("warumBalancePv")} ${Math.round(Number(balance.pv_w) || 0)} W</span>
        <span>${t("warumBalanceHouse")} ${Math.round(Number(balance.house_w) || 0)} W</span>
        <span>${t("warumBalanceBattery")} ${Math.round(Number(balance.battery_w) || 0)} W</span>
        <span>${t("warumBalanceGrid")} ${Math.round(Number(balance.grid_w) || 0)} W</span>
      </div>
    </div>
  `;
}

function lookbackBlock(
  payload: WarumPayload,
  i18n: I18n,
  phaseLabel: (id: string) => string,
  onOpenGroup: (id: string) => void,
): TemplateResult | typeof nothing {
  const { t } = i18n;
  const lb = payload.lookback;
  if (!lb) return nothing;
  const snap = lb.warum_snapshot;
  return html`
    <div class="warum-details-block">
      <h5>${t("warumLookbackTitle")}</h5>
      ${lb.timestamp || lb.timestamp_display
        ? html`<p class="sub">
            ${t("warumLookbackAt", { t: lb.timestamp_display || lb.timestamp || "—" })}
          </p>`
        : nothing}
      <p class="warum-phase">
        ${lb.phase ? phaseLabel(lb.phase) : "—"}
        ${snap?.winning_gate ? html`<span class="sub">(${snap.winning_gate})</span>` : nothing}
      </p>
      ${lb.reason ? html`<p class="sub">${lb.reason}</p>` : nothing}
      ${snap?.path?.length
        ? html`<div class="warum-path warum-path-compact">
            ${snap.path.map(
              (g) => html`
                <div class="warum-gate-flat">
                  <span class=${g.result ? "warum-gate-won" : "warum-gate-miss"}>${g.name}</span>
                  <span class="sub">${g.result ? t("warumGateWon") : t("warumGateMiss")}</span>
                </div>
              `,
            )}
          </div>`
        : nothing}
      ${snap?.terms?.length
        ? html`<ul class="warum-terms">
            ${snap.terms.map((term) => warumTermRow(term, i18n, onOpenGroup))}
          </ul>`
        : nothing}
    </div>
  `;
}

function cardDetails(
  payload: WarumPayload,
  i18n: I18n,
  onOpenGroup: (id: string) => void,
): TemplateResult | typeof nothing {
  const { t, phase: phaseLabel } = i18n;
  const hasPath = payload.path?.length > 0;
  const hasBalance = payload.energy_balance && Object.keys(payload.energy_balance).length > 0;
  const hasWhyNot = Boolean(payload.why_not?.message);
  const hasLookback = Boolean(payload.lookback);
  if (!hasPath && !hasBalance && !hasWhyNot && !hasLookback) return nothing;

  return html`
    <details class="warum-details">
      <summary>${t("warumDetailsTitle")}</summary>
      <div class="warum-details-inner">
        ${hasPath
          ? html`<div class="warum-details-block">
              <h5>${t("warumPathTitle")}</h5>
              <div class="warum-path">${payload.path.map((g) => warumGateBlock(g, i18n, onOpenGroup))}</div>
            </div>`
          : nothing}
        ${hasBalance ? energyBalanceStrip(payload.energy_balance, i18n) : nothing}
        ${hasWhyNot
          ? html`<div class="warum-details-block">
              <h5>${t("warumWhyNotTitle")}</h5>
              <p>${payload.why_not!.message}</p>
              ${payload.why_not!.failed_terms?.length
                ? html`<ul class="warum-terms">
                    ${payload.why_not!.failed_terms.map((term) => warumTermRow(term, i18n, onOpenGroup))}
                  </ul>`
                : nothing}
            </div>`
          : nothing}
        ${hasLookback ? lookbackBlock(payload, i18n, phaseLabel, onOpenGroup) : nothing}
      </div>
    </details>
  `;
}

function whatIfDiffLine(payload: WarumPayload, i18n: I18n): string {
  const wi = payload.what_if;
  if (!wi) return "";
  if (wi.diff_text) return wi.diff_text;
  const { t, phase: phaseLabel } = i18n;
  return t("warumWhatIfResult", {
    a: wi.baseline_phase ? phaseLabel(wi.baseline_phase) : "—",
    b: phaseLabel(wi.result_phase),
  });
}

function tunablesBlock(
  item: WarumThreadItem,
  answer: WarumAnswer,
  payload: WarumPayload,
  ctx: WarumViewCtx,
): TemplateResult | typeof nothing {
  if (!answer.tunables.length) return nothing;
  const { t } = ctx.i18n;
  const overrides = ctx.whatIfOverrides[item.id];
  const values = mergeTunableOverrides(answer.tunables, overrides);
  const showReset = hasActiveWhatIfOverrides(answer.tunables, overrides);
  const diff = whatIfDiffLine(payload, ctx.i18n);
  const changed = Boolean(payload.what_if?.changed);

  return html`
    <div class="warum-tunables">
      <div class="warum-tunables-head">
        <h5>${t("warumWhatIfTitle")}</h5>
        ${showReset
          ? html`<button type="button" class="linkish" @click=${() => ctx.onResetWhatIf(item.id)}>
              ${t("warumWhatIfReset")}
            </button>`
          : nothing}
      </div>
      ${answer.tunables.map((tun) => tunableRow(item.id, tun, values[tun.key], ctx))}
      ${item.whatIfPending ? html`<p class="sub warum-whatif-pending">${t("warumWhatIfLoading")}</p>` : nothing}
      ${item.whatIfError
        ? html`<p class="warn" role="alert">${t("warumWhatIfFailed")}</p>`
        : nothing}
      ${diff
        ? html`<p class="warum-diff ${changed ? "changed" : ""}">${diff}</p>
            ${payload.what_if?.result_reason
              ? html`<p class="sub">${payload.what_if.result_reason}</p>`
              : nothing}`
        : nothing}
    </div>
  `;
}

function tunableRow(
  threadId: string,
  tunable: WarumTunable,
  value: number,
  ctx: WarumViewCtx,
): TemplateResult {
  const label = tunable.label ?? tunable.key;
  return html`
    <label class="warum-tunable-row">
      <span class="warum-tunable-label">${label}</span>
      <input
        type="range"
        class="warum-tunable-range"
        min=${tunable.min}
        max=${tunable.max}
        step=${tunable.step}
        .value=${String(value)}
        @input=${(e: Event) => {
          const next = Number((e.target as HTMLInputElement).value);
          const tunables =
            ctx.thread.find((x) => x.id === threadId)?.payload?.answer?.tunables ?? [];
          const cardValues = mergeTunableOverrides(tunables, {
            ...ctx.whatIfOverrides[threadId],
            [tunable.key]: next,
          });
          ctx.onWhatIf(threadId, cardValues);
        }}
      />
      <span class="warum-tunable-val"
        >${Number.isInteger(value) ? value : value.toFixed(1)} ${tunable.unit}</span
      >
    </label>
  `;
}

function answerBody(
  item: WarumThreadItem,
  answer: WarumAnswer,
  payload: WarumPayload,
  ctx: WarumViewCtx,
): TemplateResult {
  const { t } = ctx.i18n;
  return html`
    <h4 class="warum-card-headline">${answer.headline}</h4>
    <ul class="warum-answer-bullets">
      ${answer.bullets.map(
        (b) => html`<li class=${b.ok ? "ok" : "fail"}>
          <span class="warum-check" aria-hidden="true">${b.ok ? "✓" : "✗"}</span>
          <span>${b.text}</span>
          ${b.setting_key && settingGroupFor(b.setting_key)
            ? html`<button
                type="button"
                class="linkish"
                @click=${() => ctx.onOpenGroup(settingGroupFor(b.setting_key)!)}
              >
                ${t("warumOpenSetting")}
              </button>`
            : nothing}
        </li>`,
      )}
    </ul>
    ${tunablesBlock(item, answer, payload, ctx)}
    ${answer.follow_ups.length
      ? html`<div class="warum-follow-ups">
          ${answer.follow_ups.map(
            (f) => html`<button
              type="button"
              class="chip warum-ask"
              @click=${() =>
                ctx.onAsk({
                  query: f.label,
                  topic: f.topic ?? undefined,
                  whyNotPhase: f.why_not_phase ?? undefined,
                })}
            >
              ${f.label}
            </button>`,
          )}
        </div>`
      : nothing}
    ${cardDetails(payload, ctx.i18n, ctx.onOpenGroup)}
  `;
}

function fallbackBody(
  item: WarumThreadItem,
  payload: WarumPayload,
  i18n: I18n,
  phaseLabel: (id: string) => string,
  onOpenGroup: (id: string) => void,
): TemplateResult {
  return html`
    <p class="warum-phase">
      ${payload.phase ? phaseLabel(payload.phase) : "—"}
      ${payload.winning_gate ? html`<span class="sub">(${payload.winning_gate})</span>` : nothing}
    </p>
    <p>${payload.short_explanation || payload.reason || ""}</p>
    ${cardDetails(payload, i18n, onOpenGroup)}
  `;
}

function threadCard(item: WarumThreadItem, ctx: WarumViewCtx): TemplateResult {
  const { t, phase: phaseLabel } = ctx.i18n;
  const payload = item.payload;
  return html`
    <article class="warum-card-item ${item.pending ? "is-pending" : ""}" data-id=${item.id}>
      <header class="warum-card-item-head">
        <span class="warum-card-query">${item.query ?? t("warumWhyCurrent")}</span>
        <div class="warum-card-actions">
          <button
            type="button"
            class="linkish"
            title=${t("warumReAsk")}
            @click=${() =>
              ctx.onAsk({
                query: item.query,
                topic: item.topic ?? (payload?.answer?.topic as WarumTopic | undefined),
                whyNotPhase: item.whyNotPhase,
                lookbackAt: item.lookbackAt,
              })}
          >
            ${t("warumReAsk")}
          </button>
          <button
            type="button"
            class="linkish warum-dismiss"
            title=${t("warumDismiss")}
            aria-label=${t("warumDismiss")}
            @click=${() => ctx.onDismiss(item.id)}
          >
            ×
          </button>
        </div>
      </header>
      ${item.pending
        ? html`<div class="warum-card-body warum-card-loading"><p class="sub">${t("warumLoading")}</p></div>`
        : item.error
          ? html`<p class="warn">${item.error}</p>`
          : payload
            ? html`<div class="warum-card-body">
                ${payload.answer
                  ? answerBody(item, payload.answer, payload, ctx)
                  : fallbackBody(item, payload, ctx.i18n, phaseLabel, ctx.onOpenGroup)}
              </div>`
            : nothing}
    </article>
  `;
}

function onAskKeydown(
  e: KeyboardEvent,
  ctx: WarumViewCtx,
  entries: WarumCatalogEntry[] | undefined,
): void {
  if (!entries?.length) return;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    ctx.onSuggestIndex(Math.min(ctx.suggestIndex + 1, entries.length - 1));
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    ctx.onSuggestIndex(Math.max(ctx.suggestIndex - 1, 0));
  } else if (e.key === "Escape") {
    e.preventDefault();
    ctx.onQuery("");
    ctx.onSuggestIndex(0);
  }
}

function submitQuery(ctx: WarumViewCtx, entries: WarumCatalogEntry[] | undefined): void {
  const q = ctx.query.trim();
  if (!q) return;
  const pick = entries?.[ctx.suggestIndex];
  if (pick) {
    submitCatalogEntry(pick, ctx);
    ctx.onQuery("");
    ctx.onSuggestIndex(0);
    return;
  }
  ctx.onAsk({ query: q });
  ctx.onQuery("");
  ctx.onSuggestIndex(0);
}

export function warumView(ctx: WarumViewCtx): TemplateResult {
  const { t, phase: phaseLabel } = ctx.i18n;
  const suggestions = warumSuggestions({
    phase: ctx.phase,
    soc: ctx.soc,
    chargeTarget: ctx.chargeTarget,
  });
  const catalog = warumCatalog(phaseLabel, t);
  const suggestEntries = visibleSuggestEntries(ctx.query, catalog);
  const showSuggestList = Boolean(suggestEntries?.length && ctx.query.trim());

  return html`
    <div class="card warum-card warum-chat" id="warum">
      <div class="card-head">
        <h3>${t("warumTitle")}</h3>
        <span class="sub">${t("warumHint")}</span>
      </div>

      <div class="warum-ask-row">
        <input
          type="search"
          class="warum-ask-input"
          enterkeyhint="send"
          aria-label=${t("warumAskPlaceholder")}
          aria-controls="warum-suggest"
          aria-expanded=${showSuggestList ? "true" : "false"}
          .value=${ctx.query}
          placeholder=${t("warumAskPlaceholder")}
          autocomplete="off"
          @input=${(e: Event) => {
            ctx.onQuery((e.target as HTMLInputElement).value);
            ctx.onSuggestIndex(0);
          }}
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submitQuery(ctx, suggestEntries);
              return;
            }
            onAskKeydown(e, ctx, suggestEntries);
          }}
        />
        <button
          type="button"
          class="btn"
          ?disabled=${!ctx.query.trim() || ctx.loading}
          @click=${() => submitQuery(ctx, suggestEntries)}
        >
          ${t("warumAskButton")}
        </button>
      </div>

      ${showSuggestList
        ? html`<ul class="warum-suggest-list" id="warum-suggest" role="listbox">
            ${suggestEntries!.map(
              (entry, i) => html`<li role="option" aria-selected=${i === ctx.suggestIndex}>
                <button
                  type="button"
                  class=${i === ctx.suggestIndex ? "active" : ""}
                  @click=${() => {
                    submitCatalogEntry(entry, ctx);
                    ctx.onQuery("");
                    ctx.onSuggestIndex(0);
                  }}
                >
                  ${entry.haystack.split("\n")[0]}
                </button>
              </li>`,
            )}
          </ul>`
        : nothing}

      <div class="warum-suggestions">
        ${suggestions.map(
          (s) => html`<button type="button" class="chip on warum-ask" @click=${() => askSuggestion(s, ctx)}>
            ${t(s.labelKey)}
          </button>`,
        )}
      </div>

      ${ctx.loading && !ctx.thread.some((x) => x.pending)
        ? html`<p class="sub" role="status">${t("warumLoading")}</p>`
        : nothing}
      ${ctx.error && !ctx.thread.length ? html`<p class="warn">${ctx.error}</p>` : nothing}

      <div class="warum-thread">
        ${ctx.thread.length
          ? ctx.thread.map((item) => threadCard(item, ctx))
          : html`<p class="sub">${t("warumThreadEmpty")}</p>`}
      </div>
    </div>
  `;
}
