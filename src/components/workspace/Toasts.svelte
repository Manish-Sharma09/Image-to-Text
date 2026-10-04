<script lang="ts">
  import { workspace } from '../../lib/store/workspace.svelte';
  import Icon from './Icon.svelte';
  import { i18n } from '../../lib/i18n.svelte';
</script>

<div class="toasts" role="status" aria-live="polite">
  {#each workspace.toasts as t (t.id)}
    <div class="toast" class:error={t.kind === 'error'} class:success={t.kind === 'success'}>
      {#if t.kind === 'success'}<Icon name="check" size={18} />{:else if t.kind === 'error'}<Icon name="warn" size={18} />{/if}
      <span>{t.text}</span>
      {#if t.action}
        <button type="button" class="act" onclick={() => { t.action?.run(); workspace.dismiss(t.id); }}>{t.action.label}</button>
      {/if}
      <button type="button" class="x" aria-label={i18n.t.common.dismiss} onclick={() => workspace.dismiss(t.id)}><Icon name="close" size={16} /></button>
    </div>
  {/each}
</div>

<style>
  .toasts {
    position: fixed;
    left: 50%;
    bottom: max(20px, env(safe-area-inset-bottom));
    transform: translateX(-50%);
    z-index: 60;
    display: grid;
    gap: 8px;
    width: min(520px, calc(100vw - 24px));
    pointer-events: none;
  }
  .toast {
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 10px 10px 14px;
    border-radius: var(--r-md);
    background: color-mix(in srgb, var(--ink) 88%, transparent);
    -webkit-backdrop-filter: var(--glass-blur);
    backdrop-filter: var(--glass-blur);
    border: 1px solid color-mix(in srgb, var(--on-ink) 10%, transparent);
    color: var(--on-ink);
    box-shadow: var(--shadow-pop);
    font-size: var(--t-sm);
    animation: toast-in 220ms var(--ease-out);
  }
  .toast span {
    flex: 1;
  }
  .error {
    background: var(--danger);
    border-color: transparent;
    color: #fff;
  }
  .success :global(svg) {
    color: #50e3c2;
  }
  :global(:root[data-theme='dark']) .success :global(svg) {
    color: #0a8f74;
  }
  @media (prefers-color-scheme: dark) {
    :global(:root:not([data-theme='light'])) .success :global(svg) {
      color: #0a8f74;
    }
  }
  .act {
    border: 0;
    background: none;
    color: inherit;
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 3px;
    padding: 6px;
    border-radius: var(--r-xs);
  }
  .x {
    border: 0;
    background: none;
    color: inherit;
    opacity: 0.7;
    padding: 6px;
    display: inline-flex;
    border-radius: var(--r-xs);
  }
  .x:hover {
    opacity: 1;
  }
  @keyframes toast-in {
    from {
      opacity: 0;
      transform: translateY(8px) scale(0.98);
    }
  }
</style>
