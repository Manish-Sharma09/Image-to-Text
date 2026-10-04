// The app's current UI language and text, readable from components and from
// plain modules (store, errors, export). Workspace sets it once, synchronously,
// when it is created — on the server for the first render and again in the
// browser — and it never changes on a page, so it doesn't need to be reactive.
// (Plain state also keeps this importable from code that runs under tests.)
import en, { type AppText } from '../i18n/app/en';
import { fmt, plural, type Locale } from '../i18n/config';
import { getLanguage, languageName } from './ocr/languages';
import type { ReadMode } from './ocr/types';

const state: { lang: Locale; text: AppText } = { lang: 'en', text: en };

export function setAppLocale(lang: Locale, text: AppText = en): void {
  state.lang = lang;
  state.text = text;
}

export const i18n = {
  get lang(): Locale {
    return state.lang;
  },
  get t(): AppText {
    return state.text;
  },
};

export { fmt };

/** Plural form for the current language: pl(3, t.common.pages) → "3 pages". */
export function pl(n: number, forms: { one?: string; other: string }): string {
  return plural(state.lang, n, forms);
}

/** Locale for Intl formatting. English keeps the browser's own formatting, as before. */
export function intlLocale(): string | undefined {
  return state.lang === 'en' ? undefined : state.lang;
}

/** Formats a number for display in the UI language. */
export function num(n: number): string {
  return n.toLocaleString(intlLocale());
}

const displayNames = new Map<string, Intl.DisplayNames | null>();
function names(type: 'language' | 'script'): Intl.DisplayNames | null {
  const key = `${state.lang}:${type}`;
  if (!displayNames.has(key)) {
    try {
      displayNames.set(key, new Intl.DisplayNames([state.lang], { type, fallback: 'none' }));
    } catch {
      displayNames.set(key, null);
    }
  }
  return displayNames.get(key)!;
}

/** Name of an OCR language (Tesseract code) in the UI language. */
export function langName(code: string): string {
  if (state.lang === 'en') return languageName(code);
  const l = getLanguage(code);
  if (!l) return code;
  // Prefer a tag with a script subtag (zh-hans/zh-hant) so Chinese variants stay distinct.
  const tag = l.bcp47.find((t) => /-[a-z]{4}$/i.test(t)) ?? l.bcp47[0];
  let name: string | undefined;
  try {
    name = names('language')?.of(tag);
  } catch {
    name = undefined;
  }
  return name ? name.charAt(0).toLocaleUpperCase(state.lang) + name.slice(1) : l.name;
}

// Tesseract's script names → ISO 15924, for Intl.DisplayNames.
const SCRIPT_CODES: Record<string, string> = {
  Latin: 'Latn', Cyrillic: 'Cyrl', Arabic: 'Arab', Devanagari: 'Deva', Bengali: 'Beng', Tamil: 'Taml', Telugu: 'Telu',
  Gujarati: 'Gujr', Gurmukhi: 'Guru', Kannada: 'Knda', Malayalam: 'Mlym', Han: 'Hani', HanS: 'Hans', HanT: 'Hant',
  Japanese: 'Jpan', Katakana: 'Kana', Hiragana: 'Hira', Hangul: 'Hang', Thai: 'Thai', Greek: 'Grek', Hebrew: 'Hebr',
};

/** Name of a writing system (as reported by the engine) in the UI language. */
export function scriptName(script: string): string {
  if (state.lang === 'en') return script;
  const code = SCRIPT_CODES[script];
  try {
    return (code && names('script')?.of(code)) || script;
  } catch {
    return script;
  }
}

/** Reading mode name, e.g. "Table". */
export function modeName(mode: ReadMode): string {
  return state.text.modes[mode]?.label ?? mode;
}

/** The detection label, translated when it was stored as a key. */
export function detectionLabel(det: { label: string; key?: string; params?: Record<string, string | number> }): string {
  const text = det.key ? (state.text.detection as Record<string, string>)[det.key] : undefined;
  return text ? fmt(text, det.params) : det.label;
}

/** Splits a template around one placeholder: split('Press {keys} now', 'keys') → ['Press ', ' now']. */
export function split(text: string, name: string): [string, string] {
  const i = text.indexOf(`{${name}}`);
  return i < 0 ? [text, ''] : [text.slice(0, i), text.slice(i + name.length + 2)];
}
