<script lang="ts">
  import { onMount } from 'svelte';
  import { workspace } from '../../lib/store/workspace.svelte';
  import { settings } from '../../lib/store/settings.svelte';
  import { localProvider } from '../../lib/ocr/registry';
  import { imageClient } from '../../lib/image/client';
  import type { ReadMode } from '../../lib/ocr/types';
  import { imagesFromTransfer } from '../../lib/util/clipboard';
  import { ACCEPT } from '../../lib/input/sniff';
  import { modKey, mod } from '../../lib/util/platform';
  import Icon from './Icon.svelte';
  import EmptyState from './EmptyState.svelte';
  import PageRail from './PageRail.svelte';
  import ImagePanel from './ImagePanel.svelte';
  import TextPanel from './TextPanel.svelte';
  import DocumentView from './DocumentView.svelte';
  import LanguagePicker from './LanguagePicker.svelte';
  import HistoryDrawer from './HistoryDrawer.svelte';
  import ShortcutsDialog from './ShortcutsDialog.svelte';
  import Toasts from './Toasts.svelte';
  import Popover from './Popover.svelte';
  import MenuItem from './MenuItem.svelte';
  import en, { type AppText } from '../../i18n/app/en';
  import type { Locale } from '../../i18n/config';
  import { setAppLocale, i18n, fmt, pl } from '../../lib/i18n.svelte';

  let {
    mode = 'auto',
    exportFormat,
    sample,
    camera = false,
    lang = 'en',
    text = en,
  }: { mode?: ReadMode | 'auto'; exportFormat?: string; sample?: string; camera?: boolean; lang?: Locale; text?: AppText } = $props();

  // Set the UI language before any child renders (server and browser alike).
  // svelte-ignore state_referenced_locally
  setAppLocale(lang, text);
  const t = i18n.t;

  let fileInput: HTMLInputElement;
  let dragging = $state(false);
  let historyOpen = $state(false);
  let shortcutsOpen = $state(false);
  let imageHidden = $state(false);
  let warmed = false;

  const page = $derived(workspace.active);
  const counts = $derived(workspace.counts);
  const multi = $derived(workspace.pages.length > 1);

  function warm() {
    if (warmed) return;
    warmed = true;
    // Start downloading the engine as soon as someone shows intent.
    localProvider().prepare(workspace.languages).catch(() => (warmed = false));
  }

  function isEditable(el: EventTarget | null): boolean {
    const e = el as HTMLElement | null;
    return !!e && (e.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.tagName) || !!e.closest?.('.cm-editor'));
  }

  onMount(() => {
    if (import.meta.env.DEV) (window as unknown as { __copyable: unknown }).__copyable = { workspace, imageClient, localProvider };
    settings.init();
    workspace.presetMode = mode;
    const params = new URLSearchParams(location.search);
    if (params.get('panel') === 'history') historyOpen = true;
    if (params.has('shared')) void receiveShared();

    let saveTimer: ReturnType<typeof setTimeout> | undefined;
    workspace.onDone = () => {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => workspace.saveHistory(), 600);
    };

    const onPaste = (e: ClipboardEvent) => {
      const files = imagesFromTransfer(e.clipboardData).filter((f) => f.type.startsWith('image/') || f.type === 'application/pdf');
      if (!files.length) return;
      // Rich text copied from a web page can carry an image too; while
      // typing in a text field, the text is what the user meant to paste.
      if (isEditable(e.target) && e.clipboardData?.types.includes('text/plain')) return;
      e.preventDefault();
      warm();
      workspace.addFiles(files, { names: files.map((f) => (f.name && f.name !== 'image.png' ? f.name : t.names.pastedImage)) });
    };
    const hasFiles = (e: DragEvent) => [...(e.dataTransfer?.types ?? [])].includes('Files');
    let depth = 0;
    const onDragEnter = (e: DragEvent) => {
      if (!hasFiles(e)) return;
      depth++;
      dragging = true;
      warm();
    };
    const onDragLeave = (e: DragEvent) => {
      if (!hasFiles(e)) return;
      depth = Math.max(0, depth - 1);
      if (!depth) dragging = false;
    };
    const onDragOver = (e: DragEvent) => {
      if (hasFiles(e)) e.preventDefault();
    };
    const onDrop = (e: DragEvent) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      depth = 0;
      dragging = false;
      const files = imagesFromTransfer(e.dataTransfer);
      if (files.length) workspace.addFiles(files);
    };
    const onKey = (e: KeyboardEvent) => {
      if (modKey(e) && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        fileInput.click();
      } else if (modKey(e) && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        workspace.actions.copy?.();
      } else if (modKey(e) && e.key === 'Enter' && !isEditable(e.target)) {
        // In the editor, Mod-Enter inserts a line; it must not wipe the page.
        e.preventDefault();
        const active = workspace.active;
        if (active && (!active.edited || confirm(t.workspace.confirmReread))) workspace.reread(active);
      } else if (modKey(e) && e.key.toLowerCase() === 'f' && workspace.active?.result && !isEditable(e.target)) {
        e.preventDefault();
        workspace.actions.find?.();
      } else if (e.key === '?' && !isEditable(e.target)) {
        e.preventDefault();
        shortcutsOpen = true;
      }
    };
    const onHistoryClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-open-history]')) historyOpen = true;
    };

    document.addEventListener('paste', onPaste);
    window.addEventListener('dragenter', onDragEnter);
    window.addEventListener('dragleave', onDragLeave);
    window.addEventListener('dragover', onDragOver);
    window.addEventListener('drop', onDrop);
    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onHistoryClick);
    return () => {
      document.removeEventListener('paste', onPaste);
      window.removeEventListener('dragenter', onDragEnter);
      window.removeEventListener('dragleave', onDragLeave);
      window.removeEventListener('dragover', onDragOver);
      window.removeEventListener('drop', onDrop);
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onHistoryClick);
      clearTimeout(saveTimer);
    };
  });

  // Keep history current while editing (only when history is on).
  $effect(() => {
    if (!settings.history) return;
    const sig = workspace.title + workspace.pages.map((p) => `${p.id}:${p.text.length}:${p.mode}:${p.status}`).join('|');
    if (!workspace.pages.some((p) => p.result)) return;
    void sig;
    const t = setTimeout(() => workspace.saveHistory(), 1500);
    return () => clearTimeout(t);
  });

  // Tell the page when reading starts and stops (the hero gradient listens).
  $effect(() => {
    const busy = workspace.busy;
    window.dispatchEvent(new CustomEvent('copyable:busy', { detail: { busy } }));
  });

  /** Files shared to the installed app from the phone's share sheet. */
  async function receiveShared() {
    try {
      const cache = await caches.open('copyable-share');
      const keys = await cache.keys();
      const files: Blob[] = [];
      const names: string[] = [];
      for (const req of keys) {
        const res = await cache.match(req);
        if (res) {
          files.push(await res.blob());
          names.push(decodeURIComponent(res.headers.get('x-name') ?? t.names.sharedImage));
        }
        await cache.delete(req);
      }
      history.replaceState(null, '', location.pathname);
      if (files.length) await workspace.addFiles(files, { names });
    } catch {
      // Nothing shared, or caches unavailable.
    }
  }

  /** Back to the start screen; the toast offers Undo for a few seconds. */
  function newDocument() {
    workspace.close();
  }

  const status = $derived.by(() => {
    if (workspace.busy) {
      const finished = counts.done + counts.errors;
      return counts.total > 1 ? fmt(t.workspace.statusReadingOf, { n: Math.min(counts.total, finished + 1), total: counts.total }) : t.workspace.statusReading;
    }
    if (counts.errors) return fmt(t.workspace.statusErrors, { done: counts.done, total: counts.total, errors: counts.errors });
    return pl(counts.total, t.common.pages);
  });
</script>

<div
  class="ws"
  class:has-pages={workspace.pages.length > 0}
  class:multi
  role="region"
  aria-label={t.workspace.regionLabel}
  onpointerdown={warm}
  onfocusin={warm}
>
  {#if !workspace.pages.length}
    <EmptyState {sample} {camera} />
  {:else}
    <div class="top">
      <button type="button" class="btn btn-ghost back" aria-label={t.workspace.backLabel} title={t.workspace.backLabel} onclick={newDocument}>
        <Icon name="arrowLeft" size={18} /> <span>{t.workspace.back}</span>
      </button>
      <span class="divider" aria-hidden="true"></span>
      <label class="title">
        <span class="visually-hidden">{t.workspace.documentName}</span>
        <input bind:value={workspace.title} placeholder={t.workspace.untitled} maxlength="120" />
      </label>
      <span class="status" role="status" aria-live="polite">
        {#if workspace.busy}<span class="spin" aria-hidden="true"></span>{/if}{status}
      </span>
      {#if multi}
        <div class="seg" role="tablist" aria-label={t.workspace.viewLabel}>
          <button type="button" role="tab" aria-selected={workspace.view === 'page'} onclick={() => (workspace.view = 'page')}><Icon name="image" size={16} /> {t.workspace.viewPage}</button>
          <button type="button" role="tab" aria-selected={workspace.view === 'document'} onclick={() => (workspace.view = 'document')}><Icon name="pages" size={16} /> {t.workspace.viewDocument}</button>
        </div>
      {/if}
      <span class="spacer"></span>
      <LanguagePicker />
      <button type="button" class="btn btn-ghost add" onclick={() => fileInput.click()}><Icon name="plus" /> <span>{t.workspace.addImages}</span></button>
      <Popover label={t.workspace.menuLabel} triggerClass="btn btn-ghost btn-icon" align="end">
        {#snippet trigger()}<Icon name="more" />{/snippet}
        {#snippet children(close)}
          <div role="menu" aria-label={t.workspace.menuAria}>
            <MenuItem icon="document" label={t.workspace.newDocument} hint={t.workspace.newDocumentHint} onclick={() => { close(); newDocument(); }} />
            {#if multi}<MenuItem icon="refresh" label={t.workspace.readAllAgain} onclick={() => { close(); workspace.rereadAll(); }} />{/if}
            <MenuItem icon="history" label={t.workspace.history} onclick={() => { close(); historyOpen = true; }} />
            <MenuItem icon="keyboard" label={t.workspace.shortcuts} hint="?" onclick={() => { close(); shortcutsOpen = true; }} />
          </div>
        {/snippet}
      </Popover>
    </div>

    <div class="body" class:doc={workspace.view === 'document'}>
      {#if multi}<PageRail onAdd={() => fileInput.click()} />{/if}
      {#if workspace.view === 'document' && multi}
        <DocumentView />
      {:else if page}
        <section class="image" class:hidden={imageHidden} aria-label={t.workspace.imageRegion}>
          {#key page.id}<ImagePanel {page} />{/key}
        </section>
        <button type="button" class="collapse" aria-expanded={!imageHidden} onclick={() => (imageHidden = !imageHidden)}>
          <Icon name={imageHidden ? 'chevronDown' : 'chevronUp'} size={16} /> {imageHidden ? t.workspace.showImage : t.workspace.hideImage}
        </button>
        <section class="text" aria-label={t.workspace.textRegion}>
          {#key page.id}<TextPanel {page} preferredExport={exportFormat} />{/key}
        </section>
      {/if}
    </div>
  {/if}
</div>

<input bind:this={fileInput} type="file" accept={ACCEPT} multiple hidden onchange={(e) => { const f = (e.currentTarget as HTMLInputElement).files; if (f) workspace.addFiles(f); (e.currentTarget as HTMLInputElement).value = ''; }} />

{#if dragging}
  <div class="dropzone" aria-hidden="true">
    <div><Icon name="upload" size={32} /><p>{t.workspace.dropToAdd}</p></div>
  </div>
{/if}

<HistoryDrawer bind:open={historyOpen} />
<ShortcutsDialog bind:open={shortcutsOpen} />
<Toasts />
<p class="visually-hidden" aria-live="polite">{workspace.busy ? '' : counts.done ? fmt(pl(counts.done, t.workspace.announceDone), { mod }) : ''}</p>

<style>
  .ws {
    position: relative;
    background: var(--sheet);
    border: 1px solid var(--rule);
    border-radius: var(--r-lg);
    overflow: hidden;
    min-height: 420px;
  }
  .ws.has-pages {
    display: grid;
    grid-template-rows: auto 1fr;
    height: clamp(560px, calc(100dvh - 200px), 900px);
  }
  .top {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px 10px;
    min-height: 52px;
    padding: 6px 8px 6px 10px;
    border-bottom: 1px solid var(--rule);
  }
  .back {
    min-height: 36px;
    padding: 0 10px 0 8px;
    gap: 6px;
    color: var(--ink-2);
  }
  .back:hover {
    color: var(--ink);
  }
  .divider {
    width: 1px;
    height: 20px;
    background: var(--rule);
  }
  .title input {
    min-width: 0;
    width: clamp(140px, 22vw, 320px);
    min-height: 36px;
    padding: 0 8px;
    border: 1px solid transparent;
    border-radius: var(--r-xs);
    background: none;
    font-weight: 600;
    font-size: var(--t-md);
    letter-spacing: var(--track-sub);
    text-overflow: ellipsis;
    transition: border-color 150ms var(--ease), background-color 150ms var(--ease);
  }
  .title input:hover {
    border-color: var(--rule);
  }
  .title input:focus {
    border-color: var(--rule-strong);
    background: var(--sheet);
  }
  .title input::placeholder {
    color: var(--ink-3);
  }
  .status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--mono);
    font-size: var(--t-xs);
    color: var(--ink-3);
  }
  .spin {
    width: 12px;
    height: 12px;
    border: 1.5px solid var(--rule-strong);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  .seg {
    display: inline-flex;
    gap: 2px;
    background: var(--well);
    border-radius: 8px;
    padding: 3px;
  }
  .seg button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 0;
    background: none;
    padding: 0 10px;
    min-height: 30px;
    border-radius: var(--r-xs);
    font-size: var(--t-sm);
    font-weight: 500;
    color: var(--ink-3);
    transition: color 150ms var(--ease), background-color 150ms var(--ease);
  }
  .seg button:hover {
    color: var(--ink);
  }
  .seg [aria-selected='true'] {
    background: var(--sheet);
    color: var(--ink);
    box-shadow: var(--shadow-1), 0 0 0 1px var(--rule);
  }
  .spacer {
    flex: 1;
  }
  .body {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    min-height: 0;
  }
  .multi .body {
    grid-template-columns: 104px minmax(0, 1fr) minmax(0, 1fr);
  }
  .multi .body.doc {
    grid-template-columns: 104px minmax(0, 1fr);
  }
  .image,
  .text {
    min-height: 0;
    min-width: 0;
  }
  .image {
    border-right: 1px solid var(--rule);
  }
  .collapse {
    display: none;
  }
  .dropzone {
    position: fixed;
    inset: 0;
    z-index: 70;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--paper) 55%, transparent);
    -webkit-backdrop-filter: var(--glass-blur);
    backdrop-filter: var(--glass-blur);
    pointer-events: none;
    animation: drop-in 160ms var(--ease-out);
  }
  .dropzone div {
    display: grid;
    justify-items: center;
    gap: 12px;
    padding: 40px 56px;
    border: 2px dashed var(--accent);
    border-radius: var(--r-lg);
    background: var(--sheet);
    box-shadow: 0 0 0 6px var(--accent-soft), var(--shadow-pop);
    color: var(--ink);
    font-weight: 600;
    font-size: var(--t-xl);
    letter-spacing: var(--track-sub);
  }
  .dropzone div :global(svg) {
    color: var(--accent);
  }
  @keyframes drop-in {
    from {
      opacity: 0;
    }
  }

  @media (max-width: 860px) {
    .ws.has-pages {
      height: auto;
      display: block;
    }
    .body,
    .multi .body,
    .multi .body.doc {
      display: flex;
      flex-direction: column;
    }
    .image {
      height: 46vh;
      min-height: 260px;
      border-right: 0;
      border-bottom: 1px solid var(--rule);
    }
    .image.hidden {
      display: none;
    }
    .collapse {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      min-height: 36px;
      border: 0;
      border-bottom: 1px solid var(--rule);
      background: var(--paper);
      font-size: var(--t-xs);
      font-weight: 500;
      color: var(--ink-2);
    }
    .text {
      min-height: 60vh;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }
    .text > :global(.panel) {
      flex: 1;
      height: auto;
      min-height: 60vh;
    }
    .doc :global(.doc) {
      min-height: 70vh;
    }
    .add span,
    .back span {
      display: none;
    }
    .back {
      width: 36px;
      padding: 0;
    }
    .divider {
      display: none;
    }
    .title input {
      width: 100%;
    }
    .title {
      flex: 1 1 60%;
    }
  }
</style>
