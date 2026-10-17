import { LitElement, html, nothing } from "lit";

const opened = new Set<MaestroSettingTip>();

/** Small "i" beside a setting. A click shows that setting's short help. */
class MaestroSettingTip extends LitElement {
  text = "";
  label = "Hilfe";

  private open = false;

  static properties = {
    text: { type: String },
    label: { type: String },
  };

  createRenderRoot(): HTMLElement {
    return this;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.close();
  }

  private toggle(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.open) {
      this.close();
      return;
    }
    for (const other of opened) if (other !== this) other.close();
    this.open = true;
    opened.add(this);
    this.requestUpdate();
    window.addEventListener("pointerdown", this.onOutside, true);
    window.addEventListener("keydown", this.onKey);
  }

  private onOutside = (event: Event) => {
    if (event.composedPath().includes(this)) return;
    this.close();
  };

  private onKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") this.close();
  };

  private close(): void {
    window.removeEventListener("pointerdown", this.onOutside, true);
    window.removeEventListener("keydown", this.onKey);
    opened.delete(this);
    if (!this.open) return;
    this.open = false;
    this.requestUpdate();
  }

  protected updated(): void {
    const tip = this.querySelector(".tip");
    if (!(tip instanceof HTMLElement)) return;
    const margin = 12;
    const root = this.getRootNode();
    const frame = root instanceof ShadowRoot ? root.host.getBoundingClientRect() : { left: 0, right: window.innerWidth, width: window.innerWidth };
    tip.style.width = `${Math.min(280, frame.width - margin * 2)}px`;
    tip.style.transform = "translateY(-50%)";
    const box = tip.getBoundingClientRect();
    let dx = 0;
    if (box.right > frame.right - margin) dx = frame.right - margin - box.right;
    if (box.left + dx < frame.left + margin) dx = frame.left + margin - box.left;
    tip.style.transform = `translate(${dx}px, -50%)`;
  }

  protected render() {
    return html`<button
        type="button"
        class="info"
        aria-label=${this.label}
        aria-expanded=${this.open}
        @click=${this.toggle}
      >i</button>
      ${this.open ? html`<div class="tip" role="tooltip">${this.text}</div>` : nothing}`;
  }
}

if (!customElements.get("maestro-setting-tip")) {
  customElements.define("maestro-setting-tip", MaestroSettingTip);
}
