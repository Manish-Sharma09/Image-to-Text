<script lang="ts">
  import { mod } from '../../lib/util/platform';
  import Dialog from './Dialog.svelte';
  import { i18n } from '../../lib/i18n.svelte';
  let { open = $bindable(false) }: { open?: boolean } = $props();
  const t = i18n.t.shortcuts;
  const rows: [string[], string][] = [
    [[mod, 'V'], t.paste],
    [[mod, 'O'], t.choose],
    [[mod, 'Shift', 'C'], t.copy],
    [[mod, 'F'], t.find],
    [[mod, 'Z'], t.undo],
    [[mod, 'Enter'], t.reread],
    [['Alt', '↑ / ↓'], t.move],
    [['+', '−', '0'], t.zoom],
    [['?'], t.help],
  ];
</script>

<Dialog bind:open title={t.title}>
  <table>
    <tbody>
      {#each rows as [keys, what] (what)}
        <tr>
          <td>{#each keys as k, i (i)}<kbd>{k}</kbd>{#if i < keys.length - 1}{' '}{/if}{/each}</td>
          <td>{what}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</Dialog>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--t-sm);
  }
  td {
    padding: 10px 4px;
    border-bottom: 1px solid var(--rule);
    vertical-align: middle;
    color: var(--ink-2);
  }
  tr:last-child td {
    border-bottom: 0;
  }
  td:first-child {
    white-space: nowrap;
    width: 1%;
    padding-right: 18px;
  }
</style>
