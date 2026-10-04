// Light / dark / system theme. "system" removes data-theme so the CSS follows
// prefers-color-scheme live; light and dark pin it. The choice is stored per
// browser and first applied by the inline script in Base.astro before paint.

export type ThemeChoice = 'system' | 'light' | 'dark';

export const THEMES: { value: ThemeChoice; label: string; icon: string }[] = [
  { value: 'system', label: 'System', icon: 'M3 5h18v11H3zM8 20h8M12 16v4' },
  { value: 'light', label: 'Light', icon: 'M12 3v2M12 19v2M5 12H3M21 12h-2M6.3 6.3 4.9 4.9M19.1 19.1l-1.4-1.4M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
  { value: 'dark', label: 'Dark', icon: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z' },
];

const KEY = 'copyable:theme';
const EVENT = 'copyable:theme';

const isChoice = (v: unknown): v is ThemeChoice => v === 'system' || v === 'light' || v === 'dark';

export function getTheme(): ThemeChoice {
  const t = document.documentElement.dataset.theme;
  return t === 'light' || t === 'dark' ? t : 'system';
}

function apply(choice: ThemeChoice) {
  const root = document.documentElement;
  if (choice === 'system') delete root.dataset.theme;
  else root.dataset.theme = choice;
  // Browser chrome follows a pinned theme; with "system" each meta keeps its media query.
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => {
    const dark = choice === 'dark' || (choice === 'system' && (m.getAttribute('media') ?? '').includes('dark'));
    m.setAttribute('content', dark ? '#0a0a0a' : '#fafafa');
  });
  window.dispatchEvent(new CustomEvent<ThemeChoice>(EVENT, { detail: choice }));
}

export function setTheme(choice: ThemeChoice) {
  if (choice === getTheme()) return;
  try {
    if (choice === 'system') localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, choice);
  } catch {
    // Storage blocked: the choice lasts for this page only.
  }
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (doc.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) doc.startViewTransition(() => apply(choice));
  else apply(choice);
}

/** Calls `fn` whenever the theme changes here or in another tab. */
export function onThemeChange(fn: (choice: ThemeChoice) => void) {
  window.addEventListener(EVENT, (e) => fn((e as CustomEvent<ThemeChoice>).detail));
  window.addEventListener('storage', (e) => {
    if (e.key !== KEY) return;
    const next = isChoice(e.newValue) ? e.newValue : 'system';
    if (next !== getTheme()) apply(next);
  });
}
