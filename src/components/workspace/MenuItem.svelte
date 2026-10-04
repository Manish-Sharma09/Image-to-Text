<script lang="ts">
  import type { IconName } from '../../lib/util/icons';
  import Icon from './Icon.svelte';

  let {
    label,
    hint,
    icon,
    checked,
    disabled = false,
    danger = false,
    onclick,
  }: {
    label: string;
    hint?: string;
    icon?: IconName;
    checked?: boolean;
    disabled?: boolean;
    danger?: boolean;
    onclick: () => void;
  } = $props();

  function onKey(e: KeyboardEvent) {
    const items = [...((e.currentTarget as HTMLElement).closest('[role="dialog"]')?.querySelectorAll<HTMLElement>('.mi:not([disabled])') ?? [])];
    const i = items.indexOf(e.currentTarget as HTMLElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[(i + 1) % items.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[(i - 1 + items.length) % items.length]?.focus();
    }
  }
</script>

<button
  type="button"
  class="mi"
  class:danger
  role={checked === undefined ? 'menuitem' : 'menuitemradio'}
  aria-checked={checked}
  {disabled}
  {onclick}
  onkeydown={onKey}
>
  {#if checked !== undefined}
    <span class="tick">{#if checked}<Icon name="check" size={16} />{/if}</span>
  {:else if icon}
    <Icon name={icon} size={18} />
  {/if}
  <span class="txt">
    <span class="label">{label}</span>
    {#if hint}<span class="hint">{hint}</span>{/if}
  </span>
</button>

<style>
  .mi {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    min-height: 40px;
    padding: 7px 10px;
    border: 0;
    background: none;
    border-radius: var(--r-xs);
    text-align: left;
    color: var(--ink);
    transition: background-color 120ms var(--ease);
  }
  .mi :global(svg) {
    color: var(--ink-3);
    flex: none;
  }
  .mi:hover:not([disabled]),
  .mi:focus-visible {
    background: color-mix(in srgb, var(--ink) 6%, transparent);
    outline: none;
  }
  .mi:hover:not([disabled]) :global(svg),
  .mi:focus-visible :global(svg) {
    color: var(--ink);
  }
  .mi[disabled] {
    opacity: 0.45;
    cursor: not-allowed;
  }
  .danger,
  .danger :global(svg) {
    color: var(--danger);
  }
  .tick {
    width: 16px;
    display: inline-flex;
  }
  .tick :global(svg) {
    color: var(--accent);
  }
  .txt {
    display: grid;
    gap: 1px;
  }
  .label {
    font-weight: 500;
    font-size: var(--t-sm);
  }
  .hint {
    font-size: var(--t-xs);
    color: var(--ink-3);
  }
</style>
