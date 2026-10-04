<script lang="ts">
  import { workspace, type Page } from '../../lib/store/workspace.svelte';
  import type { ReceiptData, ReceiptField, ReceiptItem } from '../../lib/layout/types';
  import Icon from './Icon.svelte';
  import en from '../../i18n/app/en';
  import { i18n, fmt } from '../../lib/i18n.svelte';

  let { page }: { page: Page } = $props();
  const t = i18n.t.receipt;

  /**
   * Field names come from the reader in English; show the UI language's name
   * for a field the reader found, and leave names the user typed alone.
   */
  function fieldLabel(f: ReceiptField): string {
    const names = t.fields as Record<string, string>;
    const base = en.receipt.fields as Record<string, string>;
    const key = f.key === 'number' ? (f.label === base.invoiceNumber ? 'invoiceNumber' : 'receiptNumber') : f.key;
    return key in base && f.label === base[key] ? names[key] : f.label;
  }
  const r = $derived(page.receipt ?? { kind: 'receipt', currency: null, fields: [], items: [] } as ReceiptData);

  const commit = (next: Partial<ReceiptData>) => page.setReceipt({ ...r, ...next });

  function setField(i: number, value: string) {
    const fields = r.fields.map((f, j) => (j === i ? { ...f, value, conf: 100 } : f));
    commit({ fields });
  }

  function removeField(i: number) {
    commit({ fields: r.fields.filter((_, j) => j !== i) });
  }

  function addField() {
    const label = prompt(t.fieldPrompt);
    if (!label?.trim()) return;
    const f: ReceiptField = { key: `custom-${Date.now()}`, label: label.trim(), value: '', bbox: null, conf: 100 };
    commit({ fields: [...r.fields, f] });
  }

  function setItem(i: number, key: keyof ReceiptItem, value: string) {
    const items = r.items.map((it, j) => (j === i ? { ...it, [key]: value, conf: 100 } : it));
    commit({ items });
  }

  function addItem() {
    commit({ items: [...r.items, { description: '', qty: '', unitPrice: '', amount: '', bbox: null, conf: 100 }] });
  }

  function removeItem(i: number) {
    commit({ items: r.items.filter((_, j) => j !== i) });
  }

  /** Parses "1,234.50", "1.234,50", "$12.00" into a number. */
  function num(s: string): number | null {
    const t = s.replace(/[^\d.,-]/g, '');
    if (!t) return null;
    const lastSep = Math.max(t.lastIndexOf('.'), t.lastIndexOf(','));
    const normalized = lastSep >= 0 && t.length - lastSep - 1 === 2 ? t.slice(0, lastSep).replace(/[.,]/g, '') + '.' + t.slice(lastSep + 1) : t.replace(/[.,]/g, '');
    const n = Number(normalized);
    return Number.isFinite(n) ? n : null;
  }

  const check = $derived.by(() => {
    if (!r.items.length) return null;
    const amounts = r.items.map((i) => num(i.amount));
    if (amounts.some((a) => a === null)) return null;
    const sum = amounts.reduce((a, b) => a! + b!, 0)!;
    const sub = r.fields.find((f) => f.key === 'subtotal');
    const total = r.fields.find((f) => f.key === 'total');
    const target = sub ?? total;
    if (!target) return { sum, ok: null as boolean | null, against: '' };
    const t = num(target.value);
    // English has always lower-cased the field name mid-sentence; other languages show it as written.
    const name = fieldLabel(target);
    return { sum, ok: t !== null && Math.abs(t - sum) < 0.015, against: i18n.lang === 'en' ? name.toLowerCase() : name, value: target.value };
  });

  function focus(bbox: ReceiptField['bbox']) {
    workspace.focus = { line: bbox, word: null };
  }
</script>

<div class="receipt">
  <section aria-labelledby="fields-h">
    <h3 id="fields-h">{r.kind === 'invoice' ? t.invoiceDetails : t.receiptDetails}{#if r.currency}<span class="cur">{r.currency}</span>{/if}</h3>
    {#if r.fields.length}
      <dl>
        {#each r.fields as f, i (f.key)}
          <div class="row" class:unsure={f.conf < 70}>
            <dt><label for={`f-${f.key}`}>{fieldLabel(f)}</label></dt>
            <dd>
              <input id={`f-${f.key}`} value={f.value} onfocus={() => focus(f.bbox)} oninput={(e) => setField(i, (e.currentTarget as HTMLInputElement).value)} />
              <button type="button" class="x" aria-label={fmt(t.removeField, { label: fieldLabel(f) })} onclick={() => removeField(i)}><Icon name="close" size={14} /></button>
            </dd>
          </div>
        {/each}
      </dl>
    {:else}
      <p class="none">{t.noFields}</p>
    {/if}
    <button type="button" class="btn btn-ghost add" onclick={addField}><Icon name="plus" size={16} /> {t.addField}</button>
  </section>

  <section aria-labelledby="items-h">
    <h3 id="items-h">{t.items}</h3>
    {#if r.items.length}
      <div class="items-scroll">
        <table>
          <thead>
            <tr><th>{t.description}</th><th class="n">{t.qty}</th><th class="n">{t.unitPrice}</th><th class="n">{t.amount}</th><th><span class="visually-hidden">{t.remove}</span></th></tr>
          </thead>
          <tbody>
            {#each r.items as it, i (i)}
              <tr class:unsure={it.conf < 70}>
                <td><input aria-label={fmt(t.itemDescription, { n: i + 1 })} value={it.description} onfocus={() => focus(it.bbox)} oninput={(e) => setItem(i, 'description', (e.currentTarget as HTMLInputElement).value)} /></td>
                <td class="n"><input aria-label={fmt(t.itemQty, { n: i + 1 })} value={it.qty} onfocus={() => focus(it.bbox)} oninput={(e) => setItem(i, 'qty', (e.currentTarget as HTMLInputElement).value)} /></td>
                <td class="n"><input aria-label={fmt(t.itemUnitPrice, { n: i + 1 })} value={it.unitPrice} onfocus={() => focus(it.bbox)} oninput={(e) => setItem(i, 'unitPrice', (e.currentTarget as HTMLInputElement).value)} /></td>
                <td class="n"><input aria-label={fmt(t.itemAmount, { n: i + 1 })} value={it.amount} onfocus={() => focus(it.bbox)} oninput={(e) => setItem(i, 'amount', (e.currentTarget as HTMLInputElement).value)} /></td>
                <td><button type="button" class="x" aria-label={fmt(t.removeItem, { n: i + 1 })} onclick={() => removeItem(i)}><Icon name="close" size={14} /></button></td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <p class="none">{t.noItems}</p>
    {/if}
    <button type="button" class="btn btn-ghost add" onclick={addItem}><Icon name="plus" size={16} /> {t.addItem}</button>
    {#if check}
      <p class="check" class:ok={check.ok === true} class:bad={check.ok === false} role="status">
        {#if check.ok === true}
          <Icon name="check" size={16} /> {fmt(t.checkOk, { sum: check.sum.toFixed(2), against: check.against })}
        {:else if check.ok === false}
          <Icon name="warn" size={16} /> {fmt(t.checkBad, { sum: check.sum.toFixed(2), against: check.against, value: check.value ?? '' })}
        {:else}
          {fmt(t.checkSum, { sum: check.sum.toFixed(2) })}
        {/if}
      </p>
    {/if}
  </section>
</div>

<style>
  .receipt {
    height: 100%;
    overflow: auto;
    padding: 12px 16px 28px;
    display: grid;
    align-content: start;
    gap: 22px;
  }
  h3 {
    font-size: var(--t-sm);
    font-weight: 600;
    letter-spacing: var(--track-sub);
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  .cur {
    font-family: var(--mono);
    font-size: var(--t-xs);
    font-weight: 400;
    border: 1px solid var(--rule);
    padding: 1px 8px;
    border-radius: var(--r-pill);
    color: var(--ink-2);
  }
  dl {
    margin: 0;
    display: grid;
    gap: 2px;
  }
  .row {
    display: grid;
    grid-template-columns: minmax(110px, 34%) 1fr;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid var(--rule);
  }
  dt {
    font-size: var(--t-sm);
    color: var(--ink-2);
  }
  dd {
    margin: 0;
    display: flex;
    align-items: center;
  }
  input {
    width: 100%;
    min-height: 36px;
    border: 1px solid transparent;
    border-radius: var(--r-xs);
    background: none;
    padding: 0 8px;
    font-variant-numeric: tabular-nums;
  }
  input:hover {
    border-color: var(--rule);
  }
  input:focus {
    outline: none;
    border-color: var(--marker-line);
    background: var(--marker-soft);
  }
  .unsure input {
    text-decoration: underline wavy var(--query);
    text-underline-offset: 3px;
  }
  .x {
    border: 0;
    background: none;
    color: var(--ink-3);
    padding: 8px;
    display: inline-flex;
    border-radius: var(--r-xs);
  }
  .x:hover {
    color: var(--danger);
    background: var(--danger-soft);
  }
  .items-scroll {
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--t-sm);
  }
  th {
    text-align: left;
    font-size: var(--t-xs);
    color: var(--ink-3);
    font-weight: 500;
    padding: 4px 8px;
  }
  td {
    border-top: 1px solid var(--rule);
    padding: 0;
  }
  .n {
    width: 16%;
    text-align: right;
  }
  .n input {
    text-align: right;
    min-width: 64px;
  }
  .add {
    margin-top: 6px;
    font-size: var(--t-sm);
  }
  .check {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--t-sm);
    padding: 8px 12px;
    border-radius: var(--r-md);
    border: 1px solid var(--rule);
    background: var(--paper);
  }
  .check.ok {
    color: var(--ok);
    background: var(--marker-soft);
    border-color: color-mix(in srgb, var(--marker-line) 20%, transparent);
  }
  .check.bad {
    color: var(--danger);
    background: var(--danger-soft);
    border-color: color-mix(in srgb, var(--danger) 20%, transparent);
  }
  .none {
    color: var(--ink-3);
    font-size: var(--t-sm);
  }
</style>
