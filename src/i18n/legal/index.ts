// Legal documents (privacy policy, terms). Each `<locale>.ts` next to en.ts is
// picked up automatically; a document without a translation shows in English.
import en, { type Legal } from './en';
import { defaultLocale, type Locale } from '../config';
import { mergeOver } from '../merge';

export type { Legal };

const files = import.meta.glob<Legal>('./*.ts', { eager: true, import: 'default' });
const dicts = new Map<string, Legal>();
for (const [path, dict] of Object.entries(files)) {
  const code = path.replace(/^\.\/|\.ts$/g, '');
  if (code !== 'index' && code !== 'en') dicts.set(code, mergeOver(en, dict));
}

export function useLegal(lang: Locale): Legal {
  return lang === defaultLocale ? en : (dicts.get(lang) ?? en);
}

/** True when `lang` has its own translation of the legal documents. */
export function hasLegal(lang: Locale): boolean {
  return lang === defaultLocale || dicts.has(lang);
}
