<script lang="ts">
  import { workspace, type Page } from '../../lib/store/workspace.svelte';
  import { toExportDoc, withImages } from '../../lib/store/exporting.svelte';
  import type { ExportFormat } from '../../lib/export/types';
  import { downloadBlob, printHtml } from '../../lib/util/download';
  import Popover from './Popover.svelte';
  import MenuItem from './MenuItem.svelte';
  import Icon from './Icon.svelte';
  import { i18n, fmt } from '../../lib/i18n.svelte';
  const t = i18n.t.export;

  let {
    pages,
    title,
    label = t.download,
    preferred,
    placement = 'top',
    compact = false,
  }: { pages: Page[]; title: string; label?: string; preferred?: string; placement?: 'top' | 'bottom'; compact?: boolean } = $props();

  type Entry = { id: ExportFormat; label: string; hint: string; available: boolean; print?: boolean };
  /** Format names and hints in the UI language. */
  function localize(e: Entry): Entry {
    const f = (t.formats as Record<string, { label: string; hint: string; hintPrint?: string }>)[e.id];
    return f ? { ...e, label: f.label, hint: e.print && f.hintPrint ? f.hintPrint : f.hint } : e;
  }
  let entries = $state<Entry[]>([]);
  let open = $state(false);
  let working = $state(false);

  $effect(() => {
    if (!open) return;
    const doc = toExportDoc(title, pages);
    import('../../lib/export').then(({ formatsFor }) => {
      // Page images are attached only when exporting, so searchable PDF is
      // available whenever a page has word positions.
      const positioned = pages.some((p) => p.result?.hasGeometry && p.result.blocks.length);
      const list = (formatsFor(doc) as Entry[]).map((e) => localize(e.id === 'searchable-pdf' ? { ...e, available: positioned } : e));
      // The page's preset format goes first.
      entries = preferred ? [...list].sort((a, b) => (a.id === preferred ? -1 : b.id === preferred ? 1 : 0)) : list;
    });
  });

  async function run(format: ExportFormat, close: () => void) {
    close();
    working = true;
    try {
      const { exportDoc } = await import('../../lib/export');
      let doc = toExportDoc(title, pages);
      if (format === 'searchable-pdf') doc = await withImages(doc, pages);
      const res = await exportDoc(doc, format);
      if (res.kind === 'file') {
        downloadBlob(res.blob, res.filename);
        workspace.toast(fmt(t.downloaded, { file: res.filename }), 'success');
      } else {
        workspace.toast(t.printing, 'info');
        printHtml(res.html);
      }
    } catch (e) {
      console.error(e);
      workspace.toast(t.failed, 'error');
    } finally {
      working = false;
    }
  }
</script>

<Popover label={label} triggerClass={compact ? 'btn btn-icon' : 'btn'} {placement} align="end" bind:open disabled={!pages.length || working}>
  {#snippet trigger()}
    <Icon name="download" />{#if !compact}<span>{working ? t.preparing : label}</span>{/if}
  {/snippet}
  {#snippet children(close)}
    <div role="menu" aria-label={t.menuLabel}>
      {#if !entries.length}<p class="wait">{t.loading}</p>{/if}
      {#each entries.filter((e) => e.available) as e (e.id)}
        <MenuItem label={e.label} hint={e.hint} onclick={() => run(e.id, close)} />
      {/each}
    </div>
  {/snippet}
</Popover>

<style>
  .wait {
    padding: 10px;
    color: var(--ink-3);
    font-size: var(--t-sm);
  }
</style>
