// Content collections are stored per locale: tools/en/jpg-to-text.md,
// tools/es/jpg-to-text.md … The slug is the file name; the folder is the
// locale. A page exists in a locale only when its translation exists.
import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, isLocale, locales, type Locale } from './config';

type Kind = 'tools' | 'guides';

export interface Localized<K extends Kind> {
  entry: CollectionEntry<K>;
  slug: string;
  /** Locale the content is written in (English when no translation exists). */
  lang: Locale;
}

function parse(id: string): { lang: Locale; slug: string } | null {
  const [lang, ...rest] = id.split('/');
  return isLocale(lang) && rest.length ? { lang, slug: rest.join('/') } : null;
}

async function all<K extends Kind>(kind: K): Promise<Localized<K>[]> {
  const entries = (await getCollection(kind)) as CollectionEntry<K>[];
  return entries.flatMap((entry) => {
    const p = parse(entry.id);
    return p ? [{ entry, ...p }] : [];
  });
}

const byOrder = <K extends Kind>(a: Localized<K>, b: Localized<K>) => a.entry.data.order - b.entry.data.order;

/** Every entry in `lang`, falling back to English for untranslated slugs. */
export async function listLocalized<K extends Kind>(kind: K, lang: Locale): Promise<Localized<K>[]> {
  const items = await all(kind);
  const english = items.filter((i) => i.lang === defaultLocale);
  return english.map((en) => items.find((i) => i.slug === en.slug && i.lang === lang) ?? en).sort(byOrder);
}

/** Only the entries actually written in `lang` (used to generate its pages). */
export async function listTranslated<K extends Kind>(kind: K, lang: Locale): Promise<Localized<K>[]> {
  return (await all(kind)).filter((i) => i.lang === lang).sort(byOrder);
}

/** Locales in which a given slug exists — for hreflang alternates. */
export async function localesOf(kind: Kind, slug: string): Promise<Locale[]> {
  const have = new Set((await all(kind)).filter((i) => i.slug === slug).map((i) => i.lang));
  return locales.filter((l) => have.has(l));
}
