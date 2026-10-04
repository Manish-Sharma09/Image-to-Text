<script lang="ts">
  import { onMount } from 'svelte';
  import { workspace, type Page } from '../../lib/store/workspace.svelte';
  import { settings } from '../../lib/store/settings.svelte';
  import { toExportPage } from '../../lib/store/exporting.svelte';
  import { allWords } from '../../lib/ocr/types';
  import { enhancedStatus, type EnhancedStatus } from '../../lib/ocr/enhanced';
  import { copyRich } from '../../lib/util/clipboard';
  import { mod } from '../../lib/util/platform';
  import type { EditorHandle } from '../../lib/editor/cm';
  import Icon from './Icon.svelte';
  import ModePicker from './ModePicker.svelte';
  import TextEditor from './TextEditor.svelte';
  import TableEditor from './TableEditor.svelte';
  import ReceiptView from './ReceiptView.svelte';
  import ExportMenu from './ExportMenu.svelte';
  import SharePopover from './SharePopover.svelte';
  import Popover from './Popover.svelte';
  import MenuItem from './MenuItem.svelte';
  import Dialog from './Dialog.svelte';
  import en from '../../i18n/app/en';
  import { i18n, fmt, pl, num, split, detectionLabel } from '../../lib/i18n.svelte';

  let { page, preferredExport }: { page: Page; preferredExport?: string } = $props();
  const t = i18n.t.text;
  const [consentBefore, consentAfter] = split(t.consent.p3, 'link');

  // Layout notes arrive in English from the formatters; show them in the UI language.
  const NOTE_KEYS = Object.fromEntries(Object.entries(en.text.notes).map(([k, v]) => [v, k])) as Record<string, keyof typeof en.text.notes>;
  const noteText = (note: string) => (NOTE_KEYS[note] ? t.notes[NOTE_KEYS[note]] : note);

  let editor = $state<EditorHandle | null>(null);
  let unsure = $state(0);
  let tab = $state<'structured' | 'text'>('structured');
  let exp = $state<typeof import('../../lib/export') | null>(null);
  let enhanced = $state<EnhancedStatus>({ enabled: false });
  let consentOpen = $state(false);
  let copied = $state(false);

  const busy = $derived(page.status === 'queued' || page.status === 'preparing' || page.status === 'reading');
  const done = $derived(page.status === 'done' && !!page.result);
  const structured = $derived(page.mode === 'table' || page.mode === 'receipt');
  const showStructured = $derived(structured && tab === 'structured');

  const conf = $derived.by(() => {
    const r = page.result;
    if (!r?.hasGeometry) return null;
    const ws = allWords(r);
    if (!ws.length) return null;
    const mean = ws.reduce((a, w) => a + w.conf, 0) / ws.length;
    return mean >= 88 ? { label: t.confidence.high, level: 'high' } : mean >= 72 ? { label: t.confidence.fair, level: 'fair' } : { label: t.confidence.low, level: 'low' };
  });

  const structuredUnsure = $derived.by(() => {
    if (page.mode === 'table') return (page.table?.rows.flat() ?? []).filter((c) => c.text && c.conf < 70).length;
    if (page.mode === 'receipt') return (page.receipt?.fields ?? []).filter((f) => f.conf < 70).length + (page.receipt?.items ?? []).filter((i) => i.conf < 70).length;
    return 0;
  });
  const toCheck = $derived(showStructured ? structuredUnsure : unsure);

  const stats = $derived.by(() => {
    const t = page.text;
    const words = t.trim() ? t.trim().split(/\s+/).length : 0;
    const paragraphs = t.split(/\n\s*\n/).filter((p) => p.trim()).length;
    return { words, chars: t.length, lines: t ? t.split('\n').length : 0, paragraphs };
  });

  const suggestEnhanced = $derived(
    enhanced.enabled && done && page.provider === 'local' && (page.mode === 'handwriting' || page.mode === 'math' || conf?.level === 'low'),
  );

  onMount(() => {
    enhancedStatus().then((s) => (enhanced = s));
    workspace.actions = { copy: () => copy(), find: () => editor?.toggleSearch() };
    return () => (workspace.actions = {});
  });

  $effect(() => {
    if (done && !exp) import('../../lib/export').then((m) => (exp = m));
  });

  $effect(() => {
    void page.id;
    tab = 'structured';
  });

  async function copy() {
    if (!done) return;
    const ep = toExportPage(page);
    const view = showStructured ? ep : { ...ep, mode: structured ? ('plain' as const) : ep.mode, table: undefined, receipt: undefined };
    const plain = exp ? exp.pageToPlainText(view) : page.text;
    const html = exp ? exp.pageToHtml(view) : undefined;
    if (await copyRich(plain, html)) {
      copied = true;
      setTimeout(() => (copied = false), 1600);
    } else {
      workspace.toast(t.copyBlocked, 'error');
    }
  }

  function useEnhanced() {
    if (!settings.enhancedConsent) {
      consentOpen = true;
      return;
    }
    page.provider = 'enhanced';
    workspace.reread(page);
  }

  function acceptConsent() {
    settings.enhancedConsent = true;
    settings.save();
    consentOpen = false;
    useEnhanced();
  }
</script>

<div class="panel" aria-busy={busy}>
  <header class="head">
    <div class="row">
      <ModePicker {page} />
      {#if page.detection && done}
        <span class="detected" title={t.detectedTitle}>
          <span class="mark" aria-hidden="true"></span>{detectionLabel(page.detection)}
        </span>
      {/if}
    </div>
    {#if done}
      <div class="row meta">
        {#if page.provider === 'enhanced'}
          <span class="pill enh"><Icon name="sparkle" size={14} /> {t.enhanced}</span>
          <button type="button" class="link" onclick={() => { page.provider = 'local'; workspace.reread(page); }}>{t.readOnDevice}</button>
        {:else if page.textLayer && page.result === page.textLayer}
          <span class="pill high"><Icon name="check" size={14} /> {t.fromPdf}</span>
        {:else if conf}
          <span class={`pill ${conf.level}`}>{conf.label}</span>
        {/if}
        {#if toCheck > 0 && (showStructured || editor)}
          <span class="check">
            <span class="sq" aria-hidden="true"></span>
            {pl(toCheck, t.toCheck)}
            {#if !showStructured}
              <button type="button" class="btn btn-ghost btn-icon sm" aria-label={t.prevCheck} onclick={() => editor?.nextUnsure(-1)}><Icon name="chevronUp" size={16} /></button>
              <button type="button" class="btn btn-ghost btn-icon sm" aria-label={t.nextCheck} onclick={() => editor?.nextUnsure(1)}><Icon name="chevronDown" size={16} /></button>
            {/if}
          </span>
        {/if}
        {#if (page.mode === 'plain' || page.mode === 'document' || page.mode === 'handwriting') && page.result?.hasGeometry}
          <label class="opt"><input type="checkbox" checked={page.options.joinLines} onchange={(e) => workspace.setOptions(page, { joinLines: (e.currentTarget as HTMLInputElement).checked })} /> {t.joinLines}</label>
        {/if}
        {#if structured}
          <div class="tabs" role="tablist" aria-label={t.viewLabel}>
            <button type="button" role="tab" aria-selected={tab === 'structured'} onclick={() => (tab = 'structured')}>{page.mode === 'table' ? t.tabTable : t.tabFields}</button>
            <button type="button" role="tab" aria-selected={tab === 'text'} onclick={() => (tab = 'text')}>{t.tabText}</button>
          </div>
        {/if}
      </div>
    {/if}
  </header>

  {#if page.notices.length || suggestEnhanced || (page.formatted?.notes.length && done)}
    <div class="notices">
      {#each page.notices as n, i (i)}
        <div class={`notice ${n.kind}`} role={n.kind === 'error' ? 'alert' : 'status'}>
          <Icon name={n.kind === 'info' ? 'info' : 'warn'} size={18} />
          <div>
            <p><strong>{n.title}</strong>{#if n.hint}{' '}{n.hint}{/if}</p>
            {#if n.action}<button type="button" class="link" onclick={n.action.run}>{n.action.label}</button>{/if}
          </div>
        </div>
      {/each}
      {#each page.formatted?.notes ?? [] as note (note)}
        <div class="notice info"><Icon name="info" size={18} /><p>{noteText(note)}</p></div>
      {/each}
      {#if suggestEnhanced}
        <div class="notice enh">
          <Icon name="sparkle" size={18} />
          <div>
            <p><strong>{page.mode === 'handwriting' ? t.suggest.handwriting : page.mode === 'math' ? t.suggest.math : t.suggest.other}</strong> {t.suggest.body}</p>
            <button type="button" class="link" onclick={useEnhanced}>{enhanced.remaining !== undefined ? fmt(t.suggest.tryLeft, { n: enhanced.remaining }) : t.suggest.try}</button>
          </div>
        </div>
      {/if}
    </div>
  {/if}

  <div class="body">
    {#if busy}
      <div class="progress" role="status" aria-live="polite">
        <div class="bar"><span style:width="{Math.round((page.status === 'reading' ? 0.15 + page.progress * 0.85 : page.progress * 0.15) * 100)}%"></span></div>
        <p>{page.stage || i18n.t.common.working}…</p>
        <button type="button" class="btn btn-ghost" onclick={() => workspace.cancel(page)}>{i18n.t.common.cancel}</button>
      </div>
    {:else if page.status === 'error'}
      <div class="progress"><p>{t.stopped}</p></div>
    {:else if !page.result}
      <div class="progress"><p>{t.waiting}</p><button type="button" class="btn" onclick={() => workspace.reread(page)}>{t.readNow}</button></div>
    {:else if showStructured && page.mode === 'table'}
      <TableEditor {page} />
    {:else if showStructured && page.mode === 'receipt'}
      <ReceiptView {page} />
    {:else}
      <TextEditor {page} bind:handle={editor} bind:unsure />
    {/if}
  </div>

  <footer class="actions">
    <button type="button" class="btn btn-primary copy" onclick={copy} disabled={!done} aria-live="polite">
      <Icon name={copied ? 'check' : 'copy'} />{copied ? t.copied : page.mode === 'table' && showStructured ? t.copyTable : page.mode === 'code' ? t.copyCode : t.copyText}
    </button>
    <ExportMenu pages={[page]} title={page.name} preferred={preferredExport} />
    <SharePopover title={page.name} text={() => page.text} mode={page.mode} />
    <span class="spacer"></span>
    {#if done && !showStructured}
      <span class="stats">{fmt(t.stats, { words: num(stats.words), chars: num(stats.chars) })}</span>
    {/if}
    <Popover label={t.moreActions} triggerClass="btn btn-ghost btn-icon" placement="top" align="end">
      {#snippet trigger()}<Icon name="more" />{/snippet}
      {#snippet children(close)}
        <div role="menu" aria-label={t.moreActions}>
          {#if editor && !showStructured}
            <MenuItem icon="search" label={t.find} hint={`${mod} F`} onclick={() => { close(); editor?.toggleSearch(); }} />
            <MenuItem icon="undo" label={i18n.t.common.undo} onclick={() => { close(); if (editor) import('../../lib/editor/cm').then((m) => m.undo(editor!.view)); }} />
            <MenuItem icon="redo" label={t.redo} onclick={() => { close(); if (editor) import('../../lib/editor/cm').then((m) => m.redo(editor!.view)); }} />
          {/if}
          {#if page.mode === 'plain' || page.mode === 'document' || page.mode === 'handwriting'}
            <MenuItem label={t.dehyphenate} checked={page.options.dehyphenate} onclick={() => { close(); workspace.setOptions(page, { dehyphenate: !page.options.dehyphenate }); }} />
          {/if}
          <MenuItem icon="refresh" label={page.edited ? t.readAgainEdits : t.readAgain} hint={`${mod} Enter`} onclick={() => { close(); workspace.reread(page); }} />
          {#if enhanced.enabled && page.provider === 'local'}
            <MenuItem icon="sparkle" label={t.useEnhanced} hint={t.useEnhancedHint} onclick={() => { close(); useEnhanced(); }} />
          {/if}
          <MenuItem icon="trash" label={t.remove} danger onclick={() => { close(); workspace.remove(page.id); }} />
        </div>
      {/snippet}
    </Popover>
  </footer>
  {#if done && !showStructured}
    <p class="stats-mobile">{fmt(t.statsLong, { words: num(stats.words), chars: num(stats.chars), paragraphs: stats.paragraphs })}</p>
  {/if}
</div>

<Dialog bind:open={consentOpen} title={t.consent.title}>
  <div class="consent">
    <p>{t.consent.intro}</p>
    <ul>
      <li>{t.consent.p1}</li>
      <li>{t.consent.p2}</li>
      <li>{consentBefore}<a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener">{t.consent.privacyLink}</a>{consentAfter}</li>
      <li>{t.consent.p4}</li>
    </ul>
    <p>{t.consent.outro}</p>
  </div>
  {#snippet footer()}
    <button type="button" class="btn" onclick={() => (consentOpen = false)}>{t.consent.keep}</button>
    <button type="button" class="btn btn-primary" onclick={acceptConsent}>{t.consent.send}</button>
  {/snippet}
</Dialog>

<style>
  .panel {
    display: grid;
    grid-template-rows: auto auto 1fr auto auto;
    grid-template-columns: minmax(0, 1fr);
    height: 100%;
    min-height: 0;
    background: var(--sheet);
  }
  .head {
    display: grid;
    gap: 8px;
    padding: 10px 12px 8px;
    border-bottom: 1px solid var(--rule);
  }
  /* Pin rows so the editor keeps the flexible row when there are no notices. */
  @media (min-width: 861px) {
    .head {
      grid-row: 1;
    }
    .notices {
      grid-row: 2;
    }
    .body {
      grid-row: 3;
    }
    .actions {
      grid-row: 4;
    }
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 12px;
  }
  .meta {
    font-size: var(--t-sm);
  }
  .detected {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: var(--t-sm);
    color: var(--ink-2);
  }
  .mark {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--marker);
    box-shadow: 0 0 0 3px var(--marker-soft);
    flex: none;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 2px 9px;
    border-radius: var(--r-pill);
    font-family: var(--mono);
    font-size: var(--t-xs);
    font-weight: 500;
    line-height: 18px;
    border: 1px solid var(--rule);
    background: var(--sheet);
  }
  .pill.high {
    color: var(--accent);
    border-color: color-mix(in srgb, var(--accent) 35%, transparent);
  }
  .pill.fair {
    color: var(--ink-2);
  }
  .pill.low {
    color: var(--query);
    border-color: color-mix(in srgb, var(--query) 40%, transparent);
  }
  .pill.enh {
    background: var(--marker-soft);
    border-color: color-mix(in srgb, var(--marker-line) 35%, transparent);
  }
  .check {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--ink-2);
  }
  .sq {
    width: 16px;
    height: 6px;
    margin-right: 4px;
    background-image: radial-gradient(circle at 2px 3px, var(--query) 1.4px, transparent 1.6px);
    background-size: 4px 6px;
  }
  .sm {
    width: 30px;
    min-height: 30px;
  }
  .opt {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--ink-2);
  }
  .opt input {
    width: 16px;
    height: 16px;
    accent-color: var(--accent);
  }
  .tabs {
    display: inline-flex;
    gap: 2px;
    margin-left: auto;
    background: var(--well);
    border-radius: 8px;
    padding: 3px;
  }
  .tabs button {
    border: 0;
    background: none;
    min-height: 28px;
    padding: 0 12px;
    border-radius: var(--r-xs);
    font-weight: 500;
    font-size: var(--t-xs);
    color: var(--ink-3);
    transition: color 150ms var(--ease), background-color 150ms var(--ease);
  }
  .tabs button:hover {
    color: var(--ink);
  }
  .tabs [aria-selected='true'] {
    background: var(--sheet);
    color: var(--ink);
    box-shadow: var(--shadow-1), 0 0 0 1px var(--rule);
  }
  .link {
    border: 0;
    background: none;
    padding: 0;
    font-weight: 500;
    color: var(--accent);
    text-decoration: none;
    text-underline-offset: 3px;
    font-size: var(--t-sm);
  }
  .link:hover {
    text-decoration: underline;
  }
  .notices {
    display: grid;
    gap: 6px;
    padding: 8px 12px 0;
  }
  .notice {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: 10px 12px;
    border-radius: var(--r-md);
    border: 1px solid var(--rule);
    background: var(--info-soft);
    font-size: var(--t-sm);
    color: var(--ink-2);
  }
  .notice :global(svg) {
    margin-top: 1px;
    flex: none;
  }
  .notice strong {
    color: var(--ink);
    font-weight: 600;
  }
  .notice.warn {
    background: var(--warn-soft);
    border-color: color-mix(in srgb, var(--query) 30%, transparent);
  }
  .notice.warn :global(svg) {
    color: var(--query);
  }
  .notice.error {
    background: var(--danger-soft);
    border-color: color-mix(in srgb, var(--danger) 25%, transparent);
    color: var(--ink);
  }
  .notice.error :global(svg) {
    color: var(--danger);
  }
  .notice.enh {
    background: var(--paper);
    border: 1px dashed var(--rule-strong);
  }
  .notice div {
    display: grid;
    gap: 4px;
  }
  .body {
    min-height: 0;
    position: relative;
  }
  .progress {
    display: grid;
    justify-items: center;
    align-content: center;
    gap: 12px;
    height: 100%;
    min-height: 200px;
    padding: 24px;
    text-align: center;
    color: var(--ink-2);
    font-size: var(--t-sm);
  }
  .bar {
    width: min(280px, 70%);
    height: 4px;
    border-radius: 2px;
    background: var(--well);
    overflow: hidden;
  }
  .bar span {
    display: block;
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--g-blue), var(--g-cyan));
    transition: width 200ms var(--ease);
  }
  .actions {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-top: 1px solid var(--rule);
    background: var(--sheet);
  }
  .copy {
    min-width: 128px;
  }
  .spacer {
    flex: 1;
  }
  .stats {
    font-family: var(--mono);
    font-size: var(--t-xs);
    color: var(--ink-3);
    white-space: nowrap;
  }
  .stats-mobile {
    display: none;
  }
  .consent {
    display: grid;
    gap: 12px;
    color: var(--ink-2);
  }
  .consent ul {
    margin: 0;
    padding-left: 1.2em;
    display: grid;
    gap: 6px;
  }
  @media (max-width: 1100px) {
    .stats {
      display: none;
    }
  }
  @media (max-width: 860px) {
    .actions {
      position: sticky;
      bottom: 0;
      z-index: 4;
      padding-bottom: max(8px, env(safe-area-inset-bottom));
      background: var(--glass-strong);
      -webkit-backdrop-filter: var(--glass-blur);
      backdrop-filter: var(--glass-blur);
      box-shadow: 0 -8px 20px -18px rgb(0 0 0 / 0.3);
    }
    .copy {
      flex: 1;
      min-height: 46px;
    }
    .actions :global(.pop .btn:not(.btn-icon) > span) {
      display: none;
    }
    .actions :global(.pop .btn:not(.btn-icon)) {
      padding: 0;
      width: 46px;
      min-height: 46px;
    }
    .stats-mobile {
      display: block;
      font-family: var(--mono);
      font-size: var(--t-xs);
      color: var(--ink-3);
      padding: 0 12px 10px;
      order: -1;
    }
  }
</style>
