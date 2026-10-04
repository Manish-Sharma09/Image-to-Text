<script lang="ts">
  import type { Snippet } from 'svelte';
  import { tick } from 'svelte';

  let {
    trigger,
    children,
    label,
    align = 'start',
    placement = 'bottom',
    triggerClass = 'btn',
    open = $bindable(false),
    width,
    disabled = false,
  }: {
    trigger: Snippet;
    children: Snippet<[() => void]>;
    label: string;
    align?: 'start' | 'end';
    placement?: 'bottom' | 'top';
    triggerClass?: string;
    open?: boolean;
    width?: string;
    disabled?: boolean;
  } = $props();

  let root: HTMLDivElement;
  let panel: HTMLDivElement | undefined = $state();
  let button: HTMLButtonElement;
  const id = `pop-${Math.random().toString(36).slice(2, 8)}`;

  const close = () => {
    open = false;
  };

  async function toggle() {
    open = !open;
    if (open) {
      await tick();
      const first = panel?.querySelector<HTMLElement>('[data-autofocus], [role="menuitem"], [role="menuitemradio"], button, input, select, [tabindex]');
      first?.focus();
    }
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape' && open) {
      e.stopPropagation();
      open = false;
      button?.focus();
    }
  }

  $effect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.contains(e.target as Node)) open = false;
    };
    document.addEventListener('pointerdown', onDown, true);
    return () => document.removeEventListener('pointerdown', onDown, true);
  });
</script>

<div class="pop" bind:this={root} onkeydown={onKey} role="presentation">
  <button
    bind:this={button}
    type="button"
    class={triggerClass}
    aria-haspopup="true"
    aria-expanded={open}
    aria-controls={open ? id : undefined}
    aria-label={label}
    {disabled}
    onclick={toggle}
  >
    {@render trigger()}
  </button>
  {#if open}
    <div
      bind:this={panel}
      {id}
      class="panel"
      class:end={align === 'end'}
      class:top={placement === 'top'}
      style:width
      role="dialog"
      aria-label={label}
    >
      {@render children(close)}
    </div>
  {/if}
</div>

<style>
  .pop {
    position: relative;
    display: inline-flex;
  }
  .panel {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: 40;
    min-width: 220px;
    max-width: min(92vw, 420px);
    max-height: min(70vh, 560px);
    overflow: auto;
    background: var(--glass-strong);
    -webkit-backdrop-filter: var(--glass-blur);
    backdrop-filter: var(--glass-blur);
    border: 1px solid var(--rule);
    border-radius: var(--r-md);
    box-shadow: var(--shadow-pop);
    padding: 6px;
    transform-origin: top left;
    animation: pop-in 160ms var(--ease-out);
  }
  .panel.end {
    left: auto;
    right: 0;
    transform-origin: top right;
  }
  .panel.top {
    top: auto;
    bottom: calc(100% + 6px);
    transform-origin: bottom left;
  }
  .panel.top.end {
    transform-origin: bottom right;
  }
  @keyframes pop-in {
    from {
      opacity: 0;
      transform: translateY(-4px) scale(0.98);
    }
  }
  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    .panel {
      background: var(--sheet);
    }
  }
</style>
