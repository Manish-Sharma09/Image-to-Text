/** Deep-merges a (possibly partial) translation over the English source, so a
 *  missing key shows English instead of breaking the page. Arrays are taken
 *  whole from the translation when present. */
export function mergeOver<T>(base: T, over: unknown): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base)) return (Array.isArray(over) ? over : base) as T;
  if (typeof base === 'object' && base !== null && typeof over === 'object') {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [k, v] of Object.entries(over as Record<string, unknown>)) {
      out[k] = k in out ? mergeOver(out[k], v) : v;
    }
    return out as T;
  }
  return (typeof over === typeof base ? over : base) as T;
}
