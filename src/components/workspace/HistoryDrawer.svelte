<script lang="ts">
  import { workspace } from '../../lib/store/workspace.svelte';
  import { settings } from '../../lib/store/settings.svelte';
  import { history, type DocSummary } from '../../lib/store/history';
  import { downloadBlob } from '../../lib/util/download';
  import Dialog from './Dialog.svelte';
  import Icon from './Icon.svelte';
  import { i18n, fmt, pl, num, intlLocale, modeName, langName } from '../../lib/i18n.svelte';

  let { open = $bindable(false) }: { open?: boolean } = $props();
  const t = i18n.t.history;
  let items = $state<DocSummary[]>([]);
  let thumbs = $state<Record<string, string>>({});
  let editing = $state<string | null>(null);
  let failed = $state(false);

  async function load() {
    try {
      items = await history.list();
      for (const url of Object.values(thumbs)) URL.revokeObjectURL(url);
      thumbs = Object.fromEntries(items.filter((i) => i.thumb).map((i) => [i.id, URL.createObjectURL(i.thumb!)]));
      failed = false;
    } catch {
      failed = true;
    }
  }

  $effect(() => {
    if (open) load();
  });

  function setEnabled(on: boolean) {
    settings.history = on;
    settings.save();
    if (on) workspace.saveHistory().then(load);
  }

  async function openDoc(id: string) {
    await workspace.openHistory(id);
    open = false;
  }

  async function rename(id: string, title: string) {
    editing = null;
    if (title.trim()) await history.rename(id, title.trim());
    if (id === workspace.docId) workspace.title = title.trim();
    load();
  }

  async function download(id: string) {
    const doc = await history.get(id);
    if (!doc) return;
    const { exportDoc } = await import('../../lib/export');
    const res = await exportDoc(
      { title: doc.title, createdAt: new Date(doc.createdAt), pages: doc.pages.map((p) => ({ title: p.name, mode: p.mode, text: p.text, table: p.table ?? undefined, receipt: p.receipt ?? undefined })) },
      'txt',
    );
    if (res.kind === 'file') downloadBlob(res.blob, res.filename);
  }

  async function remove(id: string) {
    await history.remove(id);
    load();
  }

  async function clearAll() {
    if (!confirm(t.confirmClear)) return;
    await history.clear();
    load();
  }

  const dates = new Intl.DateTimeFormat(intlLocale(), { dateStyle: 'medium', timeStyle: 'short' });
</script>

<Dialog bind:open title={t.title} side>
  <div class="hist">
    <label class="toggle">
      <input type="checkbox" checked={settings.history} onchange={(e) => setEnabled((e.currentTarget as HTMLInputElement).checked)} />
      <span>
        <strong>{t.keep}</strong>
        <small>{t.keepHint}</small>
      </span>
    </label>

    {#if failed}
      <p class="empty">{t.unavailable}</p>
    {:else if !items.length}
      <p class="empty">{settings.history ? t.emptyOn : t.emptyOff}</p>
    {:else}
      <ul>
        {#each items as it (it.id)}
          <li class:current={it.id === workspace.docId}>
            {#if thumbs[it.id]}<img src={thumbs[it.id]} alt="" />{:else}<span class="ph"></span>{/if}
            <div class="info">
              {#if editing === it.id}
                <input
                  class="rn"
                  value={it.title}
                  aria-label={i18n.t.workspace.documentName}
                  onkeydown={(e) => {
                    if (e.key === 'Enter') rename(it.id, (e.currentTarget as HTMLInputElement).value);
                    if (e.key === 'Escape') editing = null;
                  }}
                  onblur={(e) => rename(it.id, (e.currentTarget as HTMLInputElement).value)}
                />
              {:else}
                <button type="button" class="title" onclick={() => openDoc(it.id)}>{it.title}</button>
              {/if}
              <p class="meta">
                {dates.format(it.updatedAt)}<br />
                {pl(it.pageCount, i18n.t.common.pages)}, {fmt(i18n.t.common.words, { n: num(it.words) })}, {it.modes.map(modeName).join(', ')}{#if it.languages.length}, {it.languages.map(langName).join(' + ')}{/if}
              </p>
              <div class="acts">
                <button type="button" class="btn btn-ghost" onclick={() => openDoc(it.id)}>{t.open}</button>
                <button type="button" class="btn btn-ghost" onclick={() => (editing = it.id)}>{t.rename}</button>
                <button type="button" class="btn btn-ghost" onclick={() => download(it.id)}>{t.download}</button>
                <button type="button" class="btn btn-ghost del" aria-label={fmt(t.deleteDoc, { title: it.title })} onclick={() => remove(it.id)}><Icon name="trash" size={16} /></button>
              </div>
            </div>
          </li>
        {/each}
      </ul>
      <button type="button" class="btn clear" onclick={clearAll}><Icon name="trash" size={16} /> {t.clearAll}</button>
    {/if}
  </div>
</Dialog>

<style>
  .hist {
    display: grid;
    gap: 16px;
  }
  .toggle {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 12px;
    border: 1px solid var(--rule);
    border-radius: var(--r-md);
    background: var(--sheet);
  }
  .toggle input {
    width: 18px;
    height: 18px;
    margin-top: 2px;
    accent-color: var(--accent);
  }
  .toggle small {
    display: block;
    color: var(--ink-2);
    font-size: var(--t-xs);
    margin-top: 2px;
  }
  .empty {
    color: var(--ink-3);
    font-size: var(--t-sm);
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 10px;
  }
  li {
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: 12px;
    padding: 10px;
    border: 1px solid var(--rule);
    border-radius: var(--r-md);
    background: var(--sheet);
    transition: border-color 150ms var(--ease);
  }
  li:hover {
    border-color: var(--rule-strong);
  }
  li.current {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }
  img,
  .ph {
    width: 64px;
    height: 80px;
    object-fit: cover;
    object-position: top;
    border-radius: var(--r-xs);
    background: var(--well);
    box-shadow: 0 0 0 1px var(--rule);
  }
  .info {
    min-width: 0;
  }
  .title {
    border: 0;
    background: none;
    padding: 0;
    font-weight: 600;
    letter-spacing: var(--track-sub);
    text-align: left;
    overflow-wrap: anywhere;
  }
  .rn {
    width: 100%;
    min-height: 34px;
    border: 1px solid var(--accent);
    border-radius: var(--r-xs);
    background: var(--sheet);
    box-shadow: 0 0 0 3px var(--accent-soft);
    padding: 0 8px;
  }
  .meta {
    font-family: var(--mono);
    font-size: var(--t-xs);
    color: var(--ink-3);
    margin-top: 4px;
  }
  .acts {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    margin: 6px 0 0 -10px;
  }
  .acts :global(.btn) {
    min-height: 32px;
    font-size: var(--t-xs);
  }
  .del {
    color: var(--danger);
  }
  .clear {
    justify-self: start;
    color: var(--danger);
  }
</style>
