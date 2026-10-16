// Chart options must keep their identity between renders unless their inputs changed:
// <maestro-chart> re-applies options on every new object, which would reset zoom and cost frames.
const cache = new Map<string, { deps: readonly unknown[]; value: unknown }>();

export function memo<T>(key: string, deps: readonly unknown[], build: () => T): T {
  const hit = cache.get(key);
  if (hit && hit.deps.length === deps.length && hit.deps.every((d, i) => Object.is(d, deps[i]))) {
    return hit.value as T;
  }
  const value = build();
  cache.set(key, { deps, value });
  return value;
}
