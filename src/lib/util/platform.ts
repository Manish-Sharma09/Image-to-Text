export const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
export const mod = isMac ? '⌘' : 'Ctrl';
export const isTouch = typeof window !== 'undefined' && matchMedia('(pointer: coarse)').matches;

/** True when the event's platform modifier (⌘ on Mac, Ctrl elsewhere) is held. */
export function modKey(e: KeyboardEvent | MouseEvent): boolean {
  return isMac ? e.metaKey : e.ctrlKey;
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}
