// Server-side loader for the app's UI text. Every <locale>.ts next to this
// file is picked up automatically; missing keys fall back to English.
import type { Locale } from '../config';
import en, { type AppText } from './en';

const files = import.meta.glob<AppText>('./*.ts', { eager: true, import: 'default' });

const dicts: Partial<Record<string, AppText>> = {};
for (const [path, dict] of Object.entries(files)) {
  const name = path.replace(/^\.\//, '').replace(/\.ts$/, '');
  if (name !== 'index' && dict) dicts[name] = dict;
}

const isObject = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);

function merge<T>(base: T, over: unknown): T {
  if (!isObject(base) || !isObject(over)) return (typeof over === typeof base ? over : base) as T;
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(over)) if (k in base) out[k] = merge((base as Record<string, unknown>)[k], v);
  return out as T;
}

const cache = new Map<string, AppText>();

/** The app's UI text for a locale, with English filling any gaps. */
export function getAppText(lang: Locale): AppText {
  if (lang === 'en') return en;
  let text = cache.get(lang);
  if (!text) {
    text = merge(en, dicts[lang] ?? {});
    cache.set(lang, text);
  }
  return text;
}

export type { AppText };
