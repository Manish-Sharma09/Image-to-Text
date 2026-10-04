<script lang="ts">
  import { untrack } from 'svelte';
  import type { Quad, Point } from '../../lib/image/types';
  import Icon from './Icon.svelte';
  import { i18n } from '../../lib/i18n.svelte';

  let {
    bitmap,
    initial,
    onApply,
    onCancel,
  }: {
    bitmap: ImageBitmap;
    initial: Quad | null;
    onApply: (q: Quad | null) => void;
    onCancel: () => void;
  } = $props();

  const FULL: Quad = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }];
  const isRect = (q: Quad) => Math.abs(q[0].y - q[1].y) < 0.002 && Math.abs(q[3].y - q[2].y) < 0.002 && Math.abs(q[0].x - q[3].x) < 0.002 && Math.abs(q[1].x - q[2].x) < 0.002;

  const start = untrack(() => initial);
  let quad = $state<Quad>(structuredClone(start ?? FULL));
  let freeform = $state(start ? !isRect(start) : false);
  let host: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let box = $state({ w: 0, h: 0, x: 0, y: 0 });
  let dragging = -1;

  $effect(() => {
    const ro = new ResizeObserver(() => layout());
    ro.observe(host);
    return () => ro.disconnect();
  });

  function layout() {
    const r = host.getBoundingClientRect();
    const pad = 24;
    const s = Math.min((r.width - pad * 2) / bitmap.width, (r.height - pad * 2) / bitmap.height);
    const w = bitmap.width * s, h = bitmap.height * s;
    box = { w, h, x: (r.width - w) / 2, y: (r.height - h) / 2 };
    const dpr = devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  }

  const clamp = (v: number) => Math.min(1, Math.max(0, v));

  function move(i: number, p: Point) {
    const q = quad.map((c) => ({ ...c })) as Quad;
    q[i] = { x: clamp(p.x), y: clamp(p.y) };
    if (!freeform) {
      // Keep a rectangle: the neighbours share one coordinate each.
      const [prev, next] = [(i + 3) % 4, (i + 1) % 4];
      if (i % 2 === 0) {
        q[prev].x = q[i].x;
        q[next].y = q[i].y;
      } else {
        q[prev].y = q[i].y;
        q[next].x = q[i].x;
      }
    }
    quad = q;
  }

  function toNorm(e: PointerEvent): Point {
    const r = host.getBoundingClientRect();
    return { x: (e.clientX - r.left - box.x) / box.w, y: (e.clientY - r.top - box.y) / box.h };
  }

  function down(i: number, e: PointerEvent) {
    dragging = i;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    e.preventDefault();
  }

  function key(i: number, e: KeyboardEvent) {
    const step = e.shiftKey ? 0.05 : 0.01;
    const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
    if (!d) return;
    e.preventDefault();
    move(i, { x: quad[i].x + d[0], y: quad[i].y + d[1] });
  }

  function setFreeform(on: boolean) {
    freeform = on;
    if (!on) {
      const xs = quad.map((p) => p.x), ys = quad.map((p) => p.y);
      const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
      quad = [{ x: x0, y: y0 }, { x: x1, y: y0 }, { x: x1, y: y1 }, { x: x0, y: y1 }];
    }
  }

  function apply() {
    const full = quad.every((p, i) => Math.abs(p.x - FULL[i].x) < 0.003 && Math.abs(p.y - FULL[i].y) < 0.003);
    onApply(full ? null : quad);
  }

  const pts = $derived(quad.map((p) => `${p.x * box.w},${p.y * box.h}`).join(' '));
  const t = i18n.t.crop;
  const cornerLabels = [t.corners.topLeft, t.corners.topRight, t.corners.bottomRight, t.corners.bottomLeft];
</script>

<div class="crop">
  <div class="stage" bind:this={host}>
    <div class="frame" style:left="{box.x}px" style:top="{box.y}px" style:width="{box.w}px" style:height="{box.h}px">
      <canvas bind:this={canvas} style:width="{box.w}px" style:height="{box.h}px"></canvas>
      <svg width={box.w} height={box.h} class="overlay" aria-hidden="true">
        <defs>
          <mask id="crop-mask">
            <rect width="100%" height="100%" fill="white" />
            <polygon points={pts} fill="black" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgb(0 0 0 / 0.5)" mask="url(#crop-mask)" />
        <polygon points={pts} fill="none" stroke="var(--accent)" stroke-width="2" />
      </svg>
      {#each quad as p, i (i)}
        <button
          type="button"
          class="handle"
          style:left="{p.x * box.w}px"
          style:top="{p.y * box.h}px"
          aria-label={cornerLabels[i]}
          onpointerdown={(e) => down(i, e)}
          onpointermove={(e) => dragging === i && move(i, toNorm(e))}
          onpointerup={() => (dragging = -1)}
          onkeydown={(e) => key(i, e)}
        ></button>
      {/each}
    </div>
  </div>
  <div class="bar">
    <div class="seg" role="radiogroup" aria-label={t.shape}>
      <button type="button" role="radio" aria-checked={!freeform} class:on={!freeform} onclick={() => setFreeform(false)}><Icon name="crop" size={16} /> {t.rectangle}</button>
      <button type="button" role="radio" aria-checked={freeform} class:on={freeform} onclick={() => setFreeform(true)}><Icon name="perspective" size={16} /> {t.fourCorners}</button>
    </div>
    <p class="tip">{freeform ? t.tipFree : t.tipRect}</p>
    <div class="end">
      <button type="button" class="btn btn-ghost" onclick={() => (quad = structuredClone(FULL))}>{i18n.t.common.reset}</button>
      <button type="button" class="btn" onclick={onCancel}>{i18n.t.common.cancel}</button>
      <button type="button" class="btn btn-primary" onclick={apply}>{t.apply}</button>
    </div>
  </div>
</div>

<style>
  .crop {
    position: absolute;
    inset: 0;
    z-index: 5;
    display: grid;
    grid-template-rows: 1fr auto;
    background: var(--well);
  }
  .stage {
    position: relative;
    overflow: hidden;
    touch-action: none;
  }
  .frame {
    position: absolute;
  }
  canvas {
    display: block;
  }
  .overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  /* 28px hit area around a 14px visible handle. */
  .handle {
    position: absolute;
    width: 28px;
    height: 28px;
    margin: -14px 0 0 -14px;
    border-radius: 50%;
    border: 0;
    background: transparent;
    touch-action: none;
    cursor: grab;
    padding: 0;
  }
  .handle::after {
    content: '';
    position: absolute;
    inset: 7px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid var(--accent);
    box-shadow: var(--shadow-1), 0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent);
    transition: transform 120ms var(--ease);
  }
  .handle:hover::after,
  .handle:active::after {
    transform: scale(1.2);
  }
  .handle:active {
    cursor: grabbing;
  }
  .bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-top: 1px solid var(--rule);
    background: var(--sheet);
  }
  .seg {
    display: inline-flex;
    gap: 2px;
    background: var(--well);
    border-radius: 8px;
    padding: 3px;
  }
  .seg button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 0;
    background: none;
    padding: 4px 10px;
    border-radius: var(--r-xs);
    font-size: var(--t-sm);
    font-weight: 500;
    color: var(--ink-3);
    min-height: 32px;
    transition: color 150ms var(--ease), background-color 150ms var(--ease);
  }
  .seg button:hover {
    color: var(--ink);
  }
  .seg .on {
    background: var(--sheet);
    color: var(--ink);
    box-shadow: var(--shadow-1), 0 0 0 1px var(--rule);
  }
  .tip {
    flex: 1 1 220px;
    font-size: var(--t-xs);
    color: var(--ink-3);
  }
  .end {
    display: flex;
    gap: 8px;
    margin-left: auto;
  }
</style>
