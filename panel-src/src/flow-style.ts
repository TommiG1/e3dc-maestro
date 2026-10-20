/** Live energy-flow layout. Stored in the browser like the theme. */
export const FLOW_STYLES = ["nodes", "blob", "city"] as const;
export type FlowStyleId = (typeof FLOW_STYLES)[number];

const STORAGE_KEY = "e3dc-maestro.flow-style.v1";

export function parseFlowStyle(raw: unknown): FlowStyleId {
  return raw === "blob" || raw === "city" ? raw : "nodes";
}

export function loadFlowStyle(): FlowStyleId {
  try {
    return parseFlowStyle(localStorage.getItem(STORAGE_KEY));
  } catch {
    return "nodes";
  }
}

export function saveFlowStyle(style: FlowStyleId): void {
  try {
    localStorage.setItem(STORAGE_KEY, style);
  } catch {
    // storage blocked: the choice still applies for this session
  }
}
