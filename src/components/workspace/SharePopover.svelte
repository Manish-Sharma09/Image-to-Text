<script lang="ts">
  import { workspace } from '../../lib/store/workspace.svelte';
  import { encodeShare } from '../../lib/util/share';
  import { copyRich } from '../../lib/util/clipboard';
  import Popover from './Popover.svelte';
  import MenuItem from './MenuItem.svelte';
  import Icon from './Icon.svelte';
  import { i18n } from '../../lib/i18n.svelte';

  let { title, text, mode, compact = false }: { title: string; text: () => string; mode: string; compact?: boolean } = $props();
  const canShare = typeof navigator !== 'undefined' && 'share' in navigator;
  const t = i18n.t.share;

  async function systemShare(close: () => void) {
    close();
    try {
      await navigator.share({ title, text: text() });
    } catch {
      // Cancelled.
    }
  }

  async function copyLink(close: () => void) {
    close();
    const link = await encodeShare({ title, text: text(), mode });
    if (!link) {
      workspace.toast(t.tooLong, 'error');
      return;
    }
    if (await copyRich(link)) workspace.toast(t.linkCopied, 'success');
  }
</script>

<Popover label={t.label} triggerClass={compact ? 'btn btn-icon' : 'btn'} placement="top" align="end">
  {#snippet trigger()}<Icon name="share" />{#if !compact}<span>{t.label}</span>{/if}{/snippet}
  {#snippet children(close)}
    <div role="menu" aria-label={t.label}>
      {#if canShare}<MenuItem icon="share" label={t.system} hint={t.systemHint} onclick={() => systemShare(close)} />{/if}
      <MenuItem icon="link" label={t.copyLink} hint={t.copyLinkHint} onclick={() => copyLink(close)} />
    </div>
  {/snippet}
</Popover>
