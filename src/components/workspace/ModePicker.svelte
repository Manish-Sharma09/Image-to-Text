<script lang="ts">
  import { workspace, type Page } from '../../lib/store/workspace.svelte';
  import { MODES } from '../../lib/layout';
  import type { ReadMode } from '../../lib/ocr/types';
  import type { IconName } from '../../lib/util/icons';
  import Popover from './Popover.svelte';
  import MenuItem from './MenuItem.svelte';
  import Icon from './Icon.svelte';
  import { i18n, fmt, modeName } from '../../lib/i18n.svelte';

  let { page }: { page: Page } = $props();
  const ICON: Record<ReadMode, IconName> = {
    plain: 'text',
    document: 'document',
    table: 'table',
    receipt: 'receipt',
    code: 'code',
    handwriting: 'pen',
    math: 'sigma',
  };
  const t = i18n.t.modes;
  const current = $derived({ id: page.mode, label: modeName(page.mode) });
</script>

<Popover label={fmt(t.triggerLabel, { mode: current.label })} triggerClass="btn mode">
  {#snippet trigger()}
    <Icon name={ICON[page.mode]} />
    <span class="k">{t.readAs}</span>
    <strong>{current.label}</strong>
    <Icon name="chevronDown" size={16} />
  {/snippet}
  {#snippet children(close)}
    <div role="menu" aria-label={t.readAs}>
      {#each MODES as m (m.id)}
        <MenuItem
          label={page.detection?.mode === m.id ? fmt(page.modeLocked ? t.suggested : t.detected, { mode: t[m.id].label }) : t[m.id].label}
          hint={t[m.id].hint}
          checked={page.mode === m.id}
          onclick={() => {
            workspace.setMode(page, m.id);
            close();
          }}
        />
      {/each}
    </div>
  {/snippet}
</Popover>

<style>
  :global(.btn.mode) {
    gap: 8px;
  }
  .k {
    color: var(--ink-3);
    font-weight: 500;
  }
  @media (max-width: 420px) {
    .k {
      display: none;
    }
  }
</style>
