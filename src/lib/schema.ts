// JSON-LD for the site's standalone pages (about, contact, privacy, terms):
// the page itself, linked to the site-wide WebSite and Organization from
// Base.astro, plus a Home › Page breadcrumb.
import { languages, localizePath, type Locale } from '../i18n/config';

interface PageSchema {
  type: 'WebPage' | 'AboutPage' | 'ContactPage';
  /** Route without a locale prefix, e.g. '/terms'. */
  path: string;
  name: string;
  description: string;
  lang: Locale;
  site: URL;
  /** Breadcrumb label for the home page. */
  homeName: string;
  /** ISO date the content last changed. */
  modified?: string;
}

export function pageSchema({ type, path, name, description, lang, site, homeName, modified }: PageSchema): Record<string, unknown>[] {
  const url = new URL(localizePath(path, lang), site).href;
  const org = { '@id': `${site.origin}/#org` };
  return [
    {
      '@type': type,
      '@id': `${url}#webpage`,
      url,
      name,
      description,
      inLanguage: languages[lang].hreflang,
      isPartOf: { '@id': `${site.origin}/#website` },
      ...(type === 'WebPage' ? { publisher: org } : { mainEntity: org }),
      ...(modified ? { dateModified: modified } : {}),
      breadcrumb: { '@id': `${url}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: homeName, item: new URL(localizePath('/', lang), site).href },
        { '@type': 'ListItem', position: 2, name, item: url },
      ],
    },
  ];
}
