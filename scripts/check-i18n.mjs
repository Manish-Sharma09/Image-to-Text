// Checks one locale's translations against the English source:
//   node scripts/check-i18n.mjs es
// - every English tool/guide has a translation with the same frontmatter keys
// - schema limits (title ≤ 70, description 80–170, intro ≤ 260, navLabel ≤ 32,
//   3–5 steps, 3–8 FAQs) and untranslatable fields left unchanged
// - internal links in the body point at this locale (/es/…), not English pages
// - the site, app and legal dictionaries exist
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { load } from 'js-yaml';

const lang = process.argv[2];
const locales = ['es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];
if (!locales.includes(lang)) {
  console.error(`Usage: node scripts/check-i18n.mjs <${locales.join('|')}>`);
  process.exit(2);
}

const problems = [];
const warn = (file, msg) => problems.push(`${file}: ${msg}`);

function parse(file) {
  const src = readFileSync(file, 'utf8');
  const m = src.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: no frontmatter`);
  return { data: load(m[1]), body: m[2] };
}

const toolSlugs = new Set(readdirSync('src/content/tools/en').map((f) => f.replace(/\.md$/, '')));
const guideSlugs = new Set(readdirSync('src/content/guides/en').map((f) => f.replace(/\.md$/, '')));

function checkLinks(file, body) {
  for (const [, href] of body.matchAll(/\]\((\/[^)\s]*)\)/g)) {
    const path = href.split('#')[0];
    if (path === `/${lang}` || path.startsWith(`/${lang}/`)) {
      const rest = path.slice(lang.length + 1) || '/';
      const slug = rest.replace(/^\//, '');
      const ok = rest === '/' || ['/tools', '/guides', '/privacy', '/terms', '/about', '/contact'].includes(rest) || toolSlugs.has(slug) || (slug.startsWith('guides/') && guideSlugs.has(slug.slice(7)));
      if (!ok) warn(file, `link to a page that doesn't exist: ${href}`);
    } else if (!path.startsWith('/samples/')) {
      warn(file, `internal link should be localized: ${href} → /${lang}${path === '/' ? '' : path}`);
    }
  }
}

function checkCollection(kind, required, sameFields) {
  for (const f of readdirSync(`src/content/${kind}/en`)) {
    const enFile = `src/content/${kind}/en/${f}`;
    const file = `src/content/${kind}/${lang}/${f}`;
    if (!existsSync(file)) {
      warn(file, 'missing translation');
      continue;
    }
    let en, tr;
    try {
      en = parse(enFile);
      tr = parse(file);
    } catch (e) {
      warn(file, String(e.message ?? e));
      continue;
    }
    const d = tr.data ?? {};
    for (const k of Object.keys(en.data)) if (!(k in d)) warn(file, `missing frontmatter key "${k}"`);
    for (const k of sameFields) {
      if (JSON.stringify(d[k]) !== JSON.stringify(en.data[k])) warn(file, `"${k}" must stay exactly as in English (${JSON.stringify(en.data[k])})`);
    }
    for (const [k, rule] of Object.entries(required)) {
      const v = d[k];
      const err = rule(v);
      if (err) warn(file, `${k}: ${err}`);
    }
    if (tr.body.trim().length < en.body.trim().length * 0.3) warn(file, 'body looks much shorter than the English (missing sections?)');
    const enH2 = (en.body.match(/^## /gm) ?? []).length;
    const trH2 = (tr.body.match(/^## /gm) ?? []).length;
    if (enH2 !== trH2) warn(file, `has ${trH2} "## " headings; English has ${enH2}`);
    checkLinks(file, tr.body);
    if (/Copyable/.test(tr.body + JSON.stringify(d))) warn(file, 'mentions the old name "Copyable"');
  }
}

const len = (min, max) => (v) => (typeof v !== 'string' ? 'missing' : [...v].length < min ? `too short (${[...v].length} < ${min})` : [...v].length > max ? `too long (${[...v].length} > ${max})` : null);
const count = (min, max) => (v) => (!Array.isArray(v) ? 'missing' : v.length < min || v.length > max ? `needs ${min}–${max} items (has ${v.length})` : null);

checkCollection(
  'tools',
  { title: len(5, 70), description: len(80, 170), intro: len(10, 260), navLabel: len(2, 32), h1: len(2, 120), steps: count(3, 5), faq: count(3, 8) },
  ['order', 'preset', 'related'],
);
checkCollection('guides', { title: len(5, 80), description: len(80, 170), summary: len(10, 220) }, ['published', 'updated', 'tool', 'order']);

for (const f of [`src/i18n/ui/${lang}.ts`, `src/i18n/app/${lang}.ts`, `src/i18n/legal/${lang}.ts`]) {
  if (!existsSync(f)) warn(f, 'missing dictionary');
  else if (/Copyable/.test(readFileSync(f, 'utf8'))) warn(f, 'mentions the old name "Copyable"');
}

if (problems.length) {
  console.log(`${lang}: ${problems.length} problem(s)\n` + problems.map((p) => '  - ' + p).join('\n'));
  process.exit(1);
}
console.log(`${lang}: all translations present and valid.`);
