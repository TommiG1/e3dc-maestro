import { html, nothing, type TemplateResult } from "lit";
import { HELP, matchingSections, type HelpAction } from "./help-content";
import type { I18n } from "./i18n";
import { LADDER, LADDER_BANDS, ladderActive } from "./ladder";

const byId = new Map(LADDER.map((step) => [step.id, step]));

const trap = (e: KeyboardEvent) => {
  if (e.key !== "Tab") return;
  const root = e.currentTarget;
  if (!(root instanceof HTMLElement)) return;
  const items = [...root.querySelectorAll<HTMLElement>("button, input, summary")].filter((el) => !el.hidden && el.offsetParent !== null);
  const first = items[0];
  const last = items[items.length - 1];
  if (!first || !last) return;
  const active = (root.getRootNode() as Document | ShadowRoot).activeElement;
  if (e.shiftKey && active === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && active === last) {
    e.preventDefault();
    first.focus();
  }
};

export interface HelpCtx {
  i18n: I18n;
  query: string;
  phase?: string;
  planActive: boolean;
  lowYield: boolean;
  current: string;
  onQuery: (query: string) => void;
  onClose: () => void;
  onJump: (id: string) => void;
  onAction: (action: HelpAction) => void;
  onTop: () => void;
}

const paragraphs = (text: string, query: string): TemplateResult => {
  const needle = query.trim();
  const mark = (line: string) => {
    if (!needle) return line;
    const at = line.toLowerCase().indexOf(needle.toLowerCase());
    if (at < 0) return line;
    return html`${line.slice(0, at)}<mark>${line.slice(at, at + needle.length)}</mark>${line.slice(at + needle.length)}`;
  };
  return html`${text.split("\n").map((line) => html`<p>${mark(line)}</p>`)}`;
};

const toc = (ctx: HelpCtx, hits: Set<string> | undefined) => {
  const { t } = ctx.i18n;
  return HELP.map((chapter) => {
    const sections = chapter.sections.filter((item) => !hits || hits.has(item.id));
    if (!sections.length) return nothing;
    const here = chapter.id === ctx.current || sections.some((item) => item.id === ctx.current);
    const nested = sections.filter((item) => item.title !== chapter.title);
    return html`<div class="help-toc-ch">
      <button type="button" class=${here ? "on" : ""} aria-current=${here ? "true" : "false"} @click=${() => ctx.onJump(chapter.id)}>${t(chapter.title)}</button>
      ${nested.map((item) => html`<button
        type="button"
        class=${ctx.current === item.id ? "on" : ""}
        aria-current=${ctx.current === item.id ? "true" : "false"}
        @click=${() => ctx.onJump(item.id)}
      >${t(item.title)}</button>`)}
    </div>`;
  });
};

const ladder = (ctx: HelpCtx): TemplateResult => {
  const { t } = ctx.i18n;
  const active = ladderActive(ctx.phase, ctx.planActive, ctx.lowYield);
  const step = active ? byId.get(active) : undefined;
  return html`<div class="help-live">
    <p class="help-now">${step ? t("helpActive", { rule: t(step.label) }) : t("helpNoPhase")}</p>
    ${LADDER_BANDS.map((band) => html`<div class="ladder-band">
      <h4>${t(band.label)}</h4>
      <div class="ladder-steps">
        ${band.steps.map((id) => {
          const rung = byId.get(id);
          if (!rung) return nothing;
          return html`<button type="button" class="ladder-step ${id === active ? "on" : ""}" @click=${() => ctx.onJump(id)}>${t(rung.label)}</button>`;
        })}
      </div>
    </div>`)}
  </div>`;
};

export const helpOverlay = (ctx: HelpCtx): TemplateResult => {
  const { t } = ctx.i18n;
  const hits = matchingSections(ctx.query, t);
  const visible = HELP.flatMap((chapter) => chapter.sections).filter((item) => !hits || hits.has(item.id));
  return html`<div class="scrim open help-scrim" @click=${ctx.onClose}></div>
    <aside class="help" role="dialog" aria-modal="true" aria-labelledby="help-title" @keydown=${trap}>
      <div class="sheet-head">
        <div class="grow">
          <h2 id="help-title">${t("helpTitle")}</h2>
          <div class="sub">${t("helpSub")}</div>
        </div>
        <button class="btn" @click=${ctx.onClose}>${t("close")}</button>
      </div>
      <label class="help-search">
        <span class="sr">${t("helpSearch")}</span>
        <input
          class="help-query"
          type="search"
          placeholder=${t("helpSearch")}
          .value=${ctx.query}
          @input=${(e: Event) => ctx.onQuery((e.target as HTMLInputElement).value)}
        />
      </label>
      <details class="help-fold">
        <summary>${t("helpToc")}</summary>
        <nav class="help-toc" aria-label=${t("helpToc")}>${toc(ctx, hits)}</nav>
      </details>
      <div class="help-body">
        <nav class="help-toc" aria-label=${t("helpToc")}>${toc(ctx, hits)}</nav>
        <div class="help-doc">
          ${visible.length
            ? HELP.map((chapter) => {
                const sections = chapter.sections.filter((item) => !hits || hits.has(item.id));
                if (!sections.length) return nothing;
                return html`<article id=${`help-ch-${chapter.id}`} data-chapter=${chapter.id}>
                  <h3>${t(chapter.title)}</h3>
                  ${sections.map((item) => html`<section id=${`help-${item.id}`} data-help=${item.id}>
                    ${item.title === chapter.title ? nothing : html`<h4>${t(item.title)}</h4>`}
                    ${paragraphs(t(item.body), ctx.query)}
                    ${item.ladder ? ladder(ctx) : nothing}
                    ${item.links?.map((link) => html`<button type="button" class="help-link" @click=${() => ctx.onJump(link.id)}>${t(link.label)}</button>`)}
                    ${item.actions?.map((itemAction) => html`<button type="button" class="btn help-action" @click=${() => ctx.onAction(itemAction.action)}>${t(itemAction.label)}</button>`)}
                  </section>`)}
                </article>`;
              })
            : html`<p class="hint">${t("helpEmpty")}</p>`}
          <button type="button" class="btn help-top" @click=${ctx.onTop}>${t("helpTop")}</button>
        </div>
      </div>
    </aside>`;
};
