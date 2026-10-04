<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from './Icon.svelte';
  import { i18n } from '../../lib/i18n.svelte';

  let {
    open = $bindable(false),
    title,
    children,
    footer,
    wide = false,
    side = false,
  }: { open?: boolean; title: string; children: Snippet; footer?: Snippet; wide?: boolean; side?: boolean } = $props();

  let dialog: HTMLDialogElement;
  const titleId = `dlg-${Math.random().toString(36).slice(2, 8)}`;

  $effect(() => {
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  });
</script>

<dialog
  bind:this={dialog}
  class:wide
  class:side
  aria-labelledby={titleId}
  onclose={() => (open = false)}
  onclick={(e) => {
    if (e.target === dialog) open = false;
  }}
>
  <!-- Rendered only while open, so closed dialogs add no headings or markup to the page. -->
  {#if open}
    <div class="inner">
      <header>
        <h2 id={titleId}>{title}</h2>
        <button type="button" class="btn btn-ghost btn-icon" aria-label={i18n.t.common.close} onclick={() => (open = false)}>
          <Icon name="close" />
        </button>
      </header>
      <div class="body">{@render children()}</div>
      {#if footer}<footer>{@render footer()}</footer>{/if}
    </div>
  {/if}
</dialog>

<style>
  dialog {
    width: min(560px, calc(100vw - 24px));
    max-height: min(86vh, 760px);
    padding: 0;
    border: 1px solid var(--rule);
    border-radius: var(--r-lg);
    background: var(--glass-strong);
    -webkit-backdrop-filter: var(--glass-blur);
    backdrop-filter: var(--glass-blur);
    color: var(--ink);
    box-shadow: var(--shadow-pop);
  }
  dialog.wide {
    width: min(820px, calc(100vw - 24px));
  }
  dialog.side {
    margin: 0 0 0 auto;
    height: 100dvh;
    max-height: none;
    width: min(440px, 100vw);
    border-radius: 0;
    border-width: 0 0 0 1px;
  }
  dialog::backdrop {
    background: var(--scrim);
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
  }
  dialog[open] {
    animation: dlg-in 200ms var(--ease-out);
  }
  dialog.side[open] {
    animation: side-in 240ms var(--ease-out);
  }
  dialog[open]::backdrop {
    animation: fade-in 200ms var(--ease-out);
  }
  @keyframes dlg-in {
    from {
      opacity: 0;
      transform: translateY(8px) scale(0.98);
    }
  }
  @keyframes side-in {
    from {
      transform: translateX(24px);
      opacity: 0;
    }
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }
  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    dialog {
      background: var(--sheet);
    }
  }
  .inner {
    display: flex;
    flex-direction: column;
    max-height: inherit;
    height: 100%;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 14px 10px 20px;
  }
  h2 {
    font-size: var(--t-xl);
    font-weight: 600;
    letter-spacing: var(--track-sub);
  }
  .body {
    padding: 4px 20px 20px;
    overflow: auto;
    overscroll-behavior: contain;
    flex: 1;
  }
  footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 12px 20px 16px;
    border-top: 1px solid var(--rule);
  }
</style>
