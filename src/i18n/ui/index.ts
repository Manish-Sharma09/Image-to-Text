// Site dictionaries. Each `<locale>.ts` next to en.ts is picked up
// automatically; missing keys fall back to English.
import en, { type UI } from './en';
import { defaultLocale, locales, localizePath, type Locale } from '../config';
import { mergeOver } from '../merge';

export type { UI };

const files = import.meta.glob<UI>('./*.ts', { eager: true, import: 'default' });
const dicts = new Map<string, UI>();
for (const [path, dict] of Object.entries(files)) {
  const code = path.replace(/^\.\/|\.ts$/g, '');
  if (code !== 'index' && code !== 'en') dicts.set(code, mergeOver(en, dict));
}

export function useTranslations(lang: Locale): UI {
  return lang === defaultLocale ? en : (dicts.get(lang) ?? en);
}

/** Locales that have a site dictionary (English always does). */
export function hasDictionary(lang: Locale): boolean {
  return lang === defaultLocale || dicts.has(lang);
}

/** Rewrites root-relative links in translated HTML to the page's locale. */
export function localizeHtml(html: string, lang: Locale): string {
  return html.replace(/href="(\/[^"]*)"/g, (_, path: string) => `href="${localizePath(path, lang)}"`);
}

/** Locales the site is published in: English plus every locale with a dictionary. */
export const siteLocales: Locale[] = locales.filter((l) => hasDictionary(l));
