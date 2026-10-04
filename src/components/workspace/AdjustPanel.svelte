<script lang="ts">
  import type { Page } from '../../lib/store/workspace.svelte';
  import { DEFAULT_ADJUSTMENTS, type Adjustments } from '../../lib/image/types';
  import { i18n, fmt } from '../../lib/i18n.svelte';

  let { page }: { page: Page } = $props();
  const t = i18n.t.adjust;

  const steps = $derived(page.steps);
  const a = $derived(page.adjust);

  /** Turning a manual control switches Auto off but keeps what Auto chose. */
  function manual(change: Partial<Adjustments>) {
    if (page.adjust.auto && steps) {
      Object.assign(page.adjust, {
        auto: false,
        grayscale: steps.grayscale,
        invert: steps.invert,
        flatten: steps.flatten,
        stretch: steps.stretch,
        sharpen: steps.sharpen,
        angle: page.adjust.angle || steps.angle,
      });
    }
    Object.assign(page.adjust, change);
  }

  function setAuto(on: boolean) {
    if (on) Object.assign(page.adjust, { ...DEFAULT_ADJUSTMENTS, auto: true, rotate: page.adjust.rotate, crop: page.adjust.crop, quad: page.adjust.quad });
    else manual({});
  }

  function reset() {
    Object.assign(page.adjust, { ...DEFAULT_ADJUSTMENTS, auto: true, rotate: page.adjust.rotate, crop: page.adjust.crop, quad: page.adjust.quad });
  }

  const autoSteps = $derived.by(() => {
    if (!a.auto || !steps) return [];
    const out: string[] = [];
    if (steps.invert) out.push(t.steps.inverted);
    if (steps.flatten) out.push(t.steps.flattened);
    if (steps.stretch) out.push(t.steps.contrast);
    if (steps.angle) out.push(fmt(t.steps.straightened, { deg: Math.abs(steps.angle).toFixed(1) }));
    if (steps.sharpen) out.push(t.steps.sharpened);
    if (steps.scale > 1.2) out.push(fmt(t.steps.enlarged, { x: steps.scale.toFixed(1) }));
    if (!out.length) out.push(t.steps.grayscale);
    return out;
  });

  const effective = $derived({
    grayscale: a.auto ? (steps?.grayscale ?? true) : a.grayscale,
    invert: a.auto ? (steps?.invert ?? false) : a.invert,
    flatten: a.auto ? (steps?.flatten ?? false) : a.flatten,
    stretch: a.auto ? (steps?.stretch ?? false) : a.stretch,
    sharpen: a.auto ? (steps?.sharpen ?? 0) : a.sharpen,
    angle: a.angle || (a.auto ? (steps?.angle ?? 0) : 0),
  });
</script>

<div class="adjust">
  <label class="switch auto">
    <input type="checkbox" checked={a.auto} onchange={(e) => setAuto((e.currentTarget as HTMLInputElement).checked)} />
    <span class="track" aria-hidden="true"></span>
    <span><strong>{t.auto}</strong><small>{t.autoHint}</small></span>
  </label>
  {#if autoSteps.length}
    <ul class="steps">
      {#each autoSteps as s (s)}<li>{s}</li>{/each}
    </ul>
  {/if}

  <div class="sliders">
    <label>
      <span>{t.brightness} <output>{a.brightness}</output></span>
      <input type="range" min="-100" max="100" step="1" value={a.brightness} oninput={(e) => manual({ brightness: +(e.currentTarget as HTMLInputElement).value })} />
    </label>
    <label>
      <span>{t.contrast} <output>{a.contrast}</output></span>
      <input type="range" min="-100" max="100" step="1" value={a.contrast} oninput={(e) => manual({ contrast: +(e.currentTarget as HTMLInputElement).value })} />
    </label>
    <label>
      <span>{t.sharpen} <output>{effective.sharpen}</output></span>
      <input type="range" min="0" max="100" step="1" value={effective.sharpen} oninput={(e) => manual({ sharpen: +(e.currentTarget as HTMLInputElement).value })} />
    </label>
    <label>
      <span>{t.straighten} <output>{effective.angle.toFixed(1)}°</output></span>
      <input type="range" min="-15" max="15" step="0.1" value={effective.angle} oninput={(e) => manual({ angle: +(e.currentTarget as HTMLInputElement).value })} />
    </label>
  </div>

  <div class="toggles">
    {#each (['grayscale', 'invert', 'stretch', 'flatten', 'bw', 'denoise'] as const).map((key) => ({ key, label: t.toggles[key] })) as tg (tg.key)}
      {@const on = tg.key in effective ? effective[tg.key as keyof typeof effective] : a[tg.key as keyof Adjustments]}
      <label class="check">
        <input type="checkbox" checked={!!on} onchange={(e) => manual({ [tg.key]: (e.currentTarget as HTMLInputElement).checked })} />
        {tg.label}
      </label>
    {/each}
  </div>

  <div class="foot">
    <button type="button" class="btn btn-ghost" onclick={reset}>{i18n.t.common.reset}</button>
  </div>
</div>

<style>
  .adjust {
    display: grid;
    gap: 14px;
    padding: 8px;
    width: min(340px, 86vw);
  }
  .switch {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }
  .switch input {
    position: absolute;
    opacity: 0;
  }
  .switch small {
    display: block;
    font-size: var(--t-xs);
    color: var(--ink-3);
  }
  .track {
    flex: none;
    width: 40px;
    height: 24px;
    border-radius: var(--r-pill);
    background: var(--rule-strong);
    position: relative;
    transition: background 150ms var(--ease);
  }
  .track::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--sheet);
    box-shadow: var(--shadow-1);
    transition: transform 140ms var(--ease);
  }
  .switch input:checked + .track {
    background: var(--accent);
  }
  .switch input:checked + .track::after {
    transform: translateX(16px);
    background: #fff;
  }
  .switch input:focus-visible + .track {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .steps {
    margin: -4px 0 0;
    padding: 10px 12px 10px 28px;
    background: var(--marker-soft);
    border: 1px solid color-mix(in srgb, var(--marker-line) 20%, transparent);
    border-radius: var(--r-md);
    font-size: var(--t-xs);
    color: var(--ink);
    display: grid;
    gap: 2px;
  }
  .sliders {
    display: grid;
    gap: 10px;
  }
  .sliders label {
    display: grid;
    gap: 4px;
    font-size: var(--t-sm);
    font-weight: 500;
  }
  .sliders span {
    display: flex;
    justify-content: space-between;
  }
  output {
    font-family: var(--mono);
    font-weight: 400;
    color: var(--ink-3);
  }
  input[type='range'] {
    width: 100%;
    accent-color: var(--accent);
    min-height: 28px;
  }
  .toggles {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px 12px;
  }
  .check {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--t-sm);
    min-height: 32px;
  }
  .check input {
    width: 16px;
    height: 16px;
    accent-color: var(--accent);
  }
  .foot {
    display: flex;
    justify-content: flex-end;
  }
</style>
