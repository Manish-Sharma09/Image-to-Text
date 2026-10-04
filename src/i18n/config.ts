// Locales the site is published in. English is the default and lives at the
// root (/jpg-to-text); every other locale is prefixed (/es/jpg-to-text).

export const locales = ['en', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const languages: Record<Locale, { label: string; english: string; hreflang: string; ogLocale: string }> = {
  en: { label: 'English', english: 'English', hreflang: 'en', ogLocale: 'en_US' },
  es: { label: 'Español', english: 'Spanish', hreflang: 'es', ogLocale: 'es_ES' },
  ja: { label: '日本語', english: 'Japanese', hreflang: 'ja', ogLocale: 'ja_JP' },
  fr: { label: 'Français', english: 'French', hreflang: 'fr', ogLocale: 'fr_FR' },
  de: { label: 'Deutsch', english: 'German', hreflang: 'de', ogLocale: 'de_DE' },
  pt: { label: 'Português', english: 'Portuguese', hreflang: 'pt', ogLocale: 'pt_BR' },
  ko: { label: '한국어', english: 'Korean', hreflang: 'ko', ogLocale: 'ko_KR' },
  it: { label: 'Italiano', english: 'Italian', hreflang: 'it', ogLocale: 'it_IT' },
};

export const isLocale = (v: unknown): v is Locale => typeof v === 'string' && (locales as readonly string[]).includes(v);

/** '/jpg-to-text' → '/es/jpg-to-text'; '/' → '/es'. English paths are unchanged. */
export function localizePath(path: string, lang: Locale): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  if (lang === defaultLocale) return clean || '/';
  return `/${lang}${clean}`;
}

/** The locale of a pathname, and the same path without its locale prefix. */
export function splitLocale(pathname: string): { lang: Locale; path: string } {
  const [, first, ...rest] = pathname.split('/');
  if (isLocale(first) && first !== defaultLocale) return { lang: first, path: '/' + rest.join('/') };
  return { lang: defaultLocale, path: pathname || '/' };
}

/** Fills {name} placeholders: fmt('Reading {n} of {total}', { n: 1, total: 3 }). */
export function fmt(text: string, vars: Record<string, string | number> = {}): string {
  return text.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

/** Picks a plural form: plural('en', 2, { one: '{n} page', other: '{n} pages' }). */
export function plural(lang: Locale, n: number, forms: { one?: string; other: string }): string {
  const rule = new Intl.PluralRules(lang).select(n);
  return fmt((rule === 'one' && forms.one) || forms.other, { n });
}
