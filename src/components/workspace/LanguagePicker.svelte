<script lang="ts">
  import { settings } from '../../lib/store/settings.svelte';
  import { workspace } from '../../lib/store/workspace.svelte';
  import { LANGUAGES } from '../../lib/ocr/languages';
  import { i18n, fmt, langName } from '../../lib/i18n.svelte';
  import Popover from './Popover.svelte';
  import Icon from './Icon.svelte';

  let open = $state(false);
  let query = $state('');
  let before = '';

  const MAX = 4;
  const t = i18n.t.languages;
  // Names in the UI language (English keeps the registry's names).
  const named = LANGUAGES.map((x) => ({ ...x, name: langName(x.code) }));
  const l = $derived(settings.languages);
  const summary = $derived(l.auto ? t.auto : l.codes.map(langName).join(' + ') || t.auto);
  const list = $derived.by(() => {
    const q = query.trim().toLowerCase();
    const items = q
      ? named.filter((x) => x.name.toLowerCase().includes(q) || x.native.toLowerCase().includes(q) || LANGUAGES.find((y) => y.code === x.code)!.name.toLowerCase().includes(q))
      : named;
    return [...items].sort((a, b) => Number(!!b.popular) - Number(!!a.popular));
  });

  // Read pages again once the picker closes with a different selection.
  $effect(() => {
    if (open) {
      before = JSON.stringify(settings.languages);
      return;
    }
    if (before && before !== JSON.stringify(settings.languages)) {
      settings.save();
      if (workspace.pages.length) workspace.rereadAll();
    }
    before = '';
  });

  function toggle(code: string, on: boolean) {
    const codes = on ? [...l.codes.filter((c) => c !== code), code].slice(-MAX) : l.codes.filter((c) => c !== code);
    settings.languages = { auto: codes.length === 0, codes };
  }
</script>

<Popover label={fmt(t.label, { summary })} triggerClass="btn btn-ghost" align="end" bind:open width="320px">
  {#snippet trigger()}<Icon name="globe" /> <span class="sum">{summary}</span> <Icon name="chevronDown" size={16} />{/snippet}
  {#snippet children()}
    <div class="lang">
      <label class="auto">
        <input type="radio" name="lang-mode" checked={l.auto} onchange={() => (settings.languages = { auto: true, codes: l.codes })} />
        <span><strong>{t.auto}</strong><small>{t.autoHint}</small></span>
      </label>
      <label class="auto">
        <input type="radio" name="lang-mode" checked={!l.auto} onchange={() => (settings.languages = { auto: false, codes: l.codes.length ? l.codes : ['eng'] })} />
        <span><strong>{t.choose}</strong><small>{fmt(t.chooseHint, { max: MAX })}</small></span>
      </label>
      {#if !l.auto}
        <input class="search" type="search" placeholder={fmt(t.search, { n: LANGUAGES.length })} bind:value={query} aria-label={t.searchLabel} data-autofocus />
        <ul>
          {#each list as lang (lang.code)}
            <li>
              <label>
                <input type="checkbox" checked={l.codes.includes(lang.code)} onchange={(e) => toggle(lang.code, (e.currentTarget as HTMLInputElement).checked)} />
                <span>{lang.name}</span>
                {#if lang.native !== lang.name}<span class="native" lang={lang.bcp47[0]}>{lang.native}</span>{/if}
              </label>
            </li>
          {/each}
        </ul>
      {/if}
      <p class="note">{t.note}</p>
    </div>
  {/snippet}
</Popover>

<style>
  .sum {
    max-width: 18ch;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .lang {
    display: grid;
    gap: 8px;
    padding: 6px;
  }
  .auto {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: 6px;
    border-radius: var(--r-xs);
  }
  .auto:hover {
    background: color-mix(in srgb, var(--ink) 6%, transparent);
  }
  .auto input {
    margin-top: 4px;
    accent-color: var(--accent);
  }
  .auto small {
    display: block;
    color: var(--ink-3);
    font-size: var(--t-xs);
  }
  .search {
    min-height: 36px;
    padding: 0 10px;
    border: 1px solid var(--rule);
    border-radius: var(--r-sm);
    background: var(--sheet);
    font-size: var(--t-sm);
    transition: border-color 150ms var(--ease), box-shadow 150ms var(--ease);
  }
  .search:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 260px;
    overflow: auto;
  }
  ul label {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 36px;
    padding: 0 6px;
    border-radius: var(--r-xs);
    font-size: var(--t-sm);
  }
  ul label:hover {
    background: color-mix(in srgb, var(--ink) 6%, transparent);
  }
  ul input {
    width: 16px;
    height: 16px;
    accent-color: var(--accent);
  }
  .native {
    margin-left: auto;
    color: var(--ink-3);
  }
  .note {
    font-size: var(--t-xs);
    color: var(--ink-3);
    padding: 0 6px;
  }
  @media (max-width: 640px) {
    .sum {
      display: none;
    }
  }
</style>
