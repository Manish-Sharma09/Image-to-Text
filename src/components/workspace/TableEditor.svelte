<script lang="ts">
  import { tick, untrack } from 'svelte';
  import { workspace, type Page } from '../../lib/store/workspace.svelte';
  import type { TableCell, TableData } from '../../lib/layout/types';
  import { bboxUnion, type BBox } from '../../lib/ocr/types';
  import Icon from './Icon.svelte';
  import { i18n, fmt } from '../../lib/i18n.svelte';

  let { page }: { page: Page } = $props();
  const t = i18n.t.table;

  const table = $derived(page.table ?? { rows: [], header: false });
  const cols = $derived(Math.max(1, ...table.rows.map((r) => r.length)));
  let active = $state<{ r: number; c: number } | null>(null);
  let grid: HTMLTableElement | undefined = $state();

  const empty = (): TableCell => ({ text: '', bbox: null, conf: 100 });

  function commit(next: TableData) {
    page.setTable(next);
  }

  function clone(): TableCell[][] {
    return table.rows.map((r) => Array.from({ length: cols }, (_, c) => r[c] ?? empty()));
  }

  function setCell(r: number, c: number, text: string) {
    const rows = clone();
    rows[r][c] = { ...rows[r][c], text, conf: 100 };
    commit({ ...table, rows });
  }

  async function focusCell(r: number, c: number) {
    await tick();
    grid?.querySelector<HTMLInputElement>(`input[data-r="${r}"][data-c="${c}"]`)?.focus();
  }

  function insertRow(after: number) {
    const rows = clone();
    rows.splice(after + 1, 0, Array.from({ length: cols }, empty));
    commit({ ...table, rows });
    focusCell(after + 1, active?.c ?? 0);
  }

  function deleteRow(r: number) {
    if (table.rows.length <= 1) return;
    const rows = clone();
    rows.splice(r, 1);
    commit({ ...table, rows });
    active = null;
  }

  function insertCol(after: number) {
    const rows = clone().map((row) => {
      row.splice(after + 1, 0, empty());
      return row;
    });
    commit({ ...table, rows });
    focusCell(active?.r ?? 0, after + 1);
  }

  function deleteCol(c: number) {
    if (cols <= 1) return;
    const rows = clone().map((row) => row.filter((_, i) => i !== c));
    commit({ ...table, rows });
    active = null;
  }

  function onFocus(r: number, c: number) {
    active = { r, c };
    const row = table.rows[r] ?? [];
    const boxes = row.map((x) => x.bbox).filter((b): b is BBox => !!b);
    workspace.focus = { line: boxes.length ? bboxUnion(boxes) : null, word: row[c]?.bbox ?? null };
  }

  function onKey(e: KeyboardEvent, r: number, c: number) {
    if (e.key === 'Enter' || (e.key === 'ArrowDown' && !e.shiftKey)) {
      e.preventDefault();
      if (r + 1 >= table.rows.length && e.key === 'Enter') insertRow(r);
      else focusCell(Math.min(table.rows.length - 1, r + 1), c);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusCell(Math.max(0, r - 1), c);
    }
  }

  // Image click → focus the cell under that point. Each click is handled
  // once; editing cells must not re-trigger it.
  let handled = untrack(() => workspace.reveal?.n ?? 0);
  $effect(() => {
    const p = workspace.reveal;
    if (!p || p.n === handled) return;
    handled = p.n;
    untrack(() => {
      for (const [r, row] of table.rows.entries()) {
        for (const [c, cell] of row.entries()) {
          const b = cell.bbox;
          if (b && p.x >= b.x0 - 4 && p.x <= b.x1 + 4 && p.y >= b.y0 - 4 && p.y <= b.y1 + 4) {
            focusCell(r, c);
            return;
          }
        }
      }
    });
  });
</script>

<div class="wrap">
  <div class="bar">
    <label class="cap">
      <span class="visually-hidden">{t.titleLabel}</span>
      <input placeholder={t.titlePlaceholder} value={table.caption ?? ''} oninput={(e) => commit({ ...table, caption: (e.currentTarget as HTMLInputElement).value })} />
    </label>
    <label class="hdr">
      <input type="checkbox" checked={table.header} onchange={(e) => commit({ ...table, header: (e.currentTarget as HTMLInputElement).checked })} />
      {t.header}
    </label>
  </div>
  <div class="ops" role="toolbar" aria-label={t.opsLabel}>
    <button type="button" class="btn btn-ghost" disabled={!active} onclick={() => active && insertRow(active.r)}><Icon name="plus" size={16} /> {t.rowBelow}</button>
    <button type="button" class="btn btn-ghost" disabled={!active || table.rows.length <= 1} onclick={() => active && deleteRow(active.r)}><Icon name="minus" size={16} /> {t.row}</button>
    <button type="button" class="btn btn-ghost" disabled={!active} onclick={() => active && insertCol(active.c)}><Icon name="plus" size={16} /> {t.columnRight}</button>
    <button type="button" class="btn btn-ghost" disabled={!active || cols <= 1} onclick={() => active && deleteCol(active.c)}><Icon name="minus" size={16} /> {t.column}</button>
    <span class="size">{table.rows.length} × {cols}</span>
  </div>
  <div class="scroll">
    {#if table.rows.length}
      <table bind:this={grid}>
        <tbody>
          {#each table.rows as row, r (r)}
            <tr class:head={table.header && r === 0}>
              <th scope="row" class="rn">{r + 1}</th>
              {#each Array.from({ length: cols }, (_, c) => row[c] ?? empty()) as cell, c (c)}
                <td class:unsure={cell.text && cell.conf < 70} class:active={active?.r === r && active?.c === c}>
                  <input
                    data-r={r}
                    data-c={c}
                    value={cell.text}
                    aria-label={fmt(t.cell, { r: r + 1, c: c + 1 })}
                    title={cell.text && cell.conf < 70 ? t.checkCell : undefined}
                    onfocus={() => onFocus(r, c)}
                    oninput={(e) => setCell(r, c, (e.currentTarget as HTMLInputElement).value)}
                    onkeydown={(e) => onKey(e, r, c)}
                  />
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p class="none">{t.none}</p>
    {/if}
  </div>
</div>

<style>
  .wrap {
    display: grid;
    grid-template-rows: auto auto 1fr;
    height: 100%;
    min-height: 0;
  }
  .bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px 16px;
    padding: 10px 14px 4px;
  }
  .cap {
    flex: 1 1 220px;
  }
  .cap input {
    width: 100%;
    min-height: 36px;
    border: 1px solid transparent;
    border-radius: var(--r-xs);
    background: none;
    font-weight: 600;
    font-size: var(--t-md);
    letter-spacing: var(--track-sub);
    padding: 0 6px;
    transition: border-color 150ms var(--ease);
  }
  .cap input:hover {
    border-color: var(--rule);
  }
  .cap input:focus {
    border-color: var(--rule-strong);
    background: var(--sheet);
  }
  .hdr {
    display: inline-flex;
    gap: 8px;
    align-items: center;
    font-size: var(--t-sm);
  }
  .hdr input {
    width: 16px;
    height: 16px;
    accent-color: var(--accent);
  }
  .ops {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2px;
    padding: 0 8px 6px;
    border-bottom: 1px solid var(--rule);
  }
  .ops :global(.btn) {
    min-height: 34px;
    font-size: var(--t-xs);
  }
  .size {
    margin-left: auto;
    font-family: var(--mono);
    font-size: var(--t-xs);
    color: var(--ink-3);
    padding-right: 6px;
  }
  .scroll {
    overflow: auto;
    min-height: 0;
    padding: 10px 14px 24px;
  }
  table {
    border-collapse: collapse;
    font-size: var(--t-sm);
    min-width: 100%;
  }
  td,
  th {
    border: 1px solid var(--rule);
    padding: 0;
  }
  .rn {
    width: 34px;
    color: var(--ink-3);
    font-family: var(--mono);
    font-weight: 400;
    font-size: var(--t-xs);
    text-align: center;
    background: var(--paper);
  }
  td input {
    width: 100%;
    min-width: 90px;
    min-height: 34px;
    border: 0;
    background: none;
    padding: 0 8px;
    font-variant-numeric: tabular-nums;
  }
  td input:focus {
    outline: none;
  }
  td.active {
    box-shadow: inset 0 0 0 1.5px var(--marker-line);
    background: var(--marker-soft);
  }
  td.unsure input {
    text-decoration: underline wavy var(--query);
    text-underline-offset: 3px;
  }
  tr.head td {
    background: var(--well);
  }
  tr.head input {
    font-weight: 500;
  }
  .none {
    color: var(--ink-2);
    padding: 12px 4px;
  }
</style>
