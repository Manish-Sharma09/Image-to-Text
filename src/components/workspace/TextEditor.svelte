<script lang="ts">
  import { onMount, untrack } from 'svelte';
  import { workspace, type Page } from '../../lib/store/workspace.svelte';
  import type { EditorHandle } from '../../lib/editor/cm';
  import { i18n } from '../../lib/i18n.svelte';

  let {
    page,
    handle = $bindable(null),
    unsure = $bindable(0),
  }: { page: Page; handle?: EditorHandle | null; unsure?: number } = $props();

  let host: HTMLDivElement;
  let ready = $state(false);
  let loadedKey = '';
  let applying = false;

  onMount(() => {
    let destroyed = false;
    import('../../lib/editor/cm').then(({ createEditor }) => {
      if (destroyed) return;
      handle = createEditor(host, {
        label: i18n.t.editor.label,
        onChange: (text) => {
          if (!applying) page.setText(text);
        },
        onCursor: (c) => (workspace.focus = c),
        onUnsure: (n) => (unsure = n),
      });
      ready = true;
    });
    return () => {
      destroyed = true;
      handle?.destroy();
      handle = null;
      workspace.focus = { line: null, word: null };
    };
  });

  // Load the page's text whenever the page, mode or formatted result changes.
  $effect(() => {
    if (!ready || !handle) return;
    const f = page.formatted;
    const key = `${page.id}|${page.key}|${page.resultKey}`;
    const text = page.text;
    const current = handle.view.state.doc.toString();
    if (key === loadedKey && current === text) return;
    if (key === loadedKey && page.edited) return;
    loadedKey = key;
    applying = true;
    handle.load(key, text, page.edited ? [] : (f?.segments ?? []), page.mode);
    applying = false;
  });

  // Clicking the image reveals the matching text (each click once, and not
  // a click that happened before this editor appeared).
  let handled = untrack(() => workspace.reveal?.n ?? 0);
  $effect(() => {
    const r = workspace.reveal;
    if (!r || !handle || r.n === handled) return;
    handled = r.n;
    untrack(() => handle?.reveal(r.x, r.y));
  });
</script>

<div class="editor" bind:this={host} class:loading={!ready}>
  {#if !ready}<p class="ph">{i18n.t.editor.loading}</p>{/if}
</div>

<style>
  .editor {
    height: 100%;
    min-height: 0;
    overflow: hidden;
    position: relative;
  }
  .editor :global(.cm-editor) {
    height: 100%;
  }
  .ph {
    padding: 16px 18px;
    color: var(--ink-3);
  }
</style>
