<script lang="ts">
  import { workspace } from '../../lib/store/workspace.svelte';
  import { toExportDoc } from '../../lib/store/exporting.svelte';
  import { copyRich } from '../../lib/util/clipboard';
  import ExportMenu from './ExportMenu.svelte';
  import Icon from './Icon.svelte';
  import { i18n, fmt, pl, modeName } from '../../lib/i18n.svelte';

  const t = i18n.t.document;

  let query = $state('');
  const q = $derived(query.trim().toLowerCase());

  function displayText(i: number): string {
    const p = workspace.pages[i];
    if (p.mode === 'table' && p.table) return p.table.rows.map((r) => r.map((c) => c.text).join('   ')).join('\n');
    return p.text;
  }

  /** Splits text into plain and matching parts for highlighting. */
  function parts(text: string): { t: string; hit: boolean }[] {
    if (!q) return [{ t: text, hit: false }];
    const out: { t: string; hit: boolean }[] = [];
    const lower = text.toLowerCase();
    let i = 0;
    for (;;) {
      const j = lower.indexOf(q, i);
      if (j < 0) break;
      if (j > i) out.push({ t: text.slice(i, j), hit: false });
      out.push({ t: text.slice(j, j + q.length), hit: true });
      i = j + q.length;
    }
    out.push({ t: text.slice(i), hit: false });
    return out;
  }

  const hits = $derived(q ? workspace.pages.map((_, i) => displayText(i).toLowerCase().split(q).length - 1) : []);
  const total = $derived(hits.reduce((a, b) => a + b, 0));

  async function copyAll() {
    const { pageToPlainText, pageToHtml } = await import('../../lib/export');
    const doc = toExportDoc(workspace.title, workspace.pages);
    const plain = doc.pages.map(pageToPlainText).join('\n\n');
    const html = doc.pages.map((p) => `<h2>${p.title.replace(/</g, '&lt;')}</h2>${pageToHtml(p)}`).join('');
    if (await copyRich(plain, html)) workspace.toast(pl(workspace.pages.length, t.copied), 'success');
  }
</script>

<div class="doc">
  <div class="bar">
    <label class="search">
      <Icon name="search" />
      <span class="visually-hidden">{t.search}</span>
      <input type="search" placeholder={t.search} bind:value={query} />
    </label>
    {#if q}<span class="count" role="status">{fmt(t.matchesIn, { matches: pl(total, t.matches), pages: pl(hits.filter(Boolean).length, t.inPages) })}</span>{/if}
    <span class="spacer"></span>
    <button type="button" class="btn" onclick={copyAll}><Icon name="copy" /> {t.copyAll}</button>
    <ExportMenu pages={workspace.pages} title={workspace.title} label={t.downloadAll} placement="bottom" />
  </div>
  <div class="pages">
    {#each workspace.pages as page, i (page.id)}
      {#if !q || hits[i]}
        <article class="page" aria-labelledby={`dp-${page.id}`}>
          <header>
            <span class="n">{i + 1}</span>
            <h3 id={`dp-${page.id}`}>{page.name}</h3>
            <span class="m">{page.status === 'done' ? modeName(page.mode) : page.status === 'error' ? i18n.t.common.error : t.reading}</span>
            {#if q}<span class="m">{pl(hits[i], t.matches)}</span>{/if}
            <button type="button" class="btn btn-ghost" onclick={() => workspace.select(page.id)}>{t.openEdit}</button>
          </header>
          {#if page.status === 'done'}
            <pre class:code={page.mode === 'code'}>{#each parts(displayText(i)) as part, k (k)}{#if part.hit}<mark>{part.t}</mark>{:else}{part.t}{/if}{/each}</pre>
          {:else}
            <p class="wait">{page.stage || i18n.t.stages.waiting}…</p>
          {/if}
        </article>
      {/if}
    {/each}
    {#if q && !total}<p class="none">{fmt(t.noMatches, { query })}</p>{/if}
  </div>
</div>

<style>
  .doc {
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
    min-height: 0;
    background: var(--paper);
  }
  .bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 10px;
    padding: 10px 12px;
    border-bottom: 1px solid var(--rule);
    background: var(--sheet);
  }
  .search {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1 1 260px;
    max-width: 420px;
    min-height: 38px;
    padding: 0 10px;
    border: 1px solid var(--rule);
    border-radius: var(--r-sm);
    background: var(--sheet);
    color: var(--ink-3);
    transition: border-color 150ms var(--ease), box-shadow 150ms var(--ease);
  }
  .search input {
    flex: 1;
    border: 0;
    background: none;
    min-height: 36px;
    color: var(--ink);
    font-size: var(--t-sm);
  }
  .search input::placeholder {
    color: var(--ink-4);
  }
  .search input:focus {
    outline: none;
  }
  .search:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }
  .count {
    font-family: var(--mono);
    font-size: var(--t-xs);
    color: var(--ink-3);
  }
  .spacer {
    flex: 1;
  }
  .pages {
    overflow: auto;
    padding: 18px clamp(12px, 3vw, 32px) 40px;
    display: grid;
    gap: 16px;
    align-content: start;
  }
  .page {
    max-width: 820px;
    width: 100%;
    margin: 0 auto;
    background: var(--sheet);
    border: 1px solid var(--rule);
    border-radius: var(--r-md);
    box-shadow: var(--shadow-1);
  }
  header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px 10px;
    padding: 8px 8px 8px 14px;
    border-bottom: 1px solid var(--rule);
  }
  .n {
    font-family: var(--mono);
    font-weight: 500;
    font-size: var(--t-xs);
    line-height: 20px;
    background: var(--marker);
    color: var(--on-marker);
    border-radius: var(--r-pill);
    min-width: 24px;
    text-align: center;
    padding: 1px 6px;
  }
  h3 {
    font-size: var(--t-sm);
    font-weight: 600;
    letter-spacing: var(--track-sub);
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .m {
    font-family: var(--mono);
    font-size: var(--t-xs);
    color: var(--ink-3);
  }
  pre {
    margin: 0;
    padding: 16px 18px 20px;
    white-space: pre-wrap;
    word-break: break-word;
    font-family: var(--sans);
    font-size: var(--t-md);
    line-height: 1.6;
  }
  pre.code {
    font-family: var(--mono);
    font-size: var(--t-sm);
    white-space: pre;
    overflow-x: auto;
  }
  mark {
    background: var(--accent-soft);
    color: inherit;
    border-radius: 2px;
    box-shadow: 0 1.5px 0 var(--marker-line);
  }
  .wait,
  .none {
    padding: 16px 18px;
    color: var(--ink-3);
  }
</style>
