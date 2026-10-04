<script lang="ts">
  import { workspace, type Page } from '../../lib/store/workspace.svelte';
  import { imageClient, SupersededError } from '../../lib/image/client';
  import type { Quad } from '../../lib/image/types';
  import { allLines, allWords, type BBox } from '../../lib/ocr/types';
  import Icon from './Icon.svelte';
  import Popover from './Popover.svelte';
  import AdjustPanel from './AdjustPanel.svelte';
  import CropTool from './CropTool.svelte';
  import { i18n } from '../../lib/i18n.svelte';

  let { page }: { page: Page } = $props();
  const t = i18n.t.image;

  let host: HTMLDivElement;
  let canvas: HTMLCanvasElement | undefined = $state();
  let hostSize = $state({ w: 0, h: 0 });
  let zoom = $state(1);
  let tx = $state(0);
  let ty = $state(0);
  let enhancedView = $state(false);
  let adjustOpen = $state(false);
  let crop = $state<{ bitmap: ImageBitmap } | null>(null);
  let hover = $state<BBox | null>(null);
  let sweep = $state(0);

  // Show the photo as taken; switch to what the reader sees while adjusting.
  const processed = $derived(enhancedView || adjustOpen);
  const shown = $derived(processed ? (page.preview ?? page.original) : (page.original ?? page.preview));
  const fit = $derived(shown ? Math.min((hostSize.w - 24) / shown.width, (hostSize.h - 24) / shown.height) : 1);
  const dw = $derived(shown ? shown.width * fit * zoom : 0);
  const dh = $derived(shown ? shown.height * fit * zoom : 0);
  const baseW = $derived(shown?.baseWidth ?? page.width);
  const baseH = $derived(shown?.baseHeight ?? page.height);
  const busy = $derived(page.status === 'preparing' || page.status === 'reading' || page.status === 'queued');
  const showMarks = $derived(!!page.result?.hasGeometry && !page.outdated);
  const lines = $derived(showMarks && page.result ? allLines(page.result) : []);
  const unsure = $derived(showMarks && page.result ? allWords(page.result).filter((w) => w.conf < 70) : []);

  $effect(() => {
    const ro = new ResizeObserver(([e]) => (hostSize = { w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(host);
    return () => ro.disconnect();
  });

  // Draw whichever bitmap is shown at full resolution; CSS scales it.
  $effect(() => {
    if (!shown || !canvas) return;
    canvas.width = shown.width;
    canvas.height = shown.height;
    canvas.getContext('2d')!.drawImage(shown.bitmap, 0, 0);
  });

  // Re-render the preview when adjustments change.
  $effect(() => {
    const key = workspace.previewKeyOf(page);
    if (key === page.previewKey) return;
    const t = setTimeout(() => workspace.renderPreview(page), 40);
    return () => clearTimeout(t);
  });

  // Read again shortly after the image settings change (unless text was edited).
  $effect(() => {
    if (!page.outdated || page.edited || adjustOpen || crop) return;
    const t = setTimeout(() => workspace.reread(page), 900);
    return () => clearTimeout(t);
  });

  // One sweep of highlights over the lines when a fresh result lands.
  let lastResult: unknown = null;
  $effect(() => {
    if (page.result && page.result !== lastResult) {
      if (lastResult !== null || page.status === 'done') sweep++;
      lastResult = page.result;
    }
  });

  $effect(() => {
    // Reset zoom when switching pages.
    void page.id;
    zoom = 1;
    tx = ty = 0;
  });

  function toBase(e: MouseEvent): { x: number; y: number } | null {
    if (!canvas) return null;
    const r = canvas.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * baseW;
    const y = ((e.clientY - r.top) / r.height) * baseH;
    if (x < 0 || y < 0 || x > baseW || y > baseH) return null;
    return { x, y };
  }

  function zoomTo(z: number, cx = hostSize.w / 2, cy = hostSize.h / 2) {
    const nz = Math.min(8, Math.max(1, z));
    // Keep the point under the cursor fixed.
    const ox = cx - hostSize.w / 2 - tx, oy = cy - hostSize.h / 2 - ty;
    tx -= ox * (nz / zoom - 1);
    ty -= oy * (nz / zoom - 1);
    zoom = nz;
    if (nz === 1) tx = ty = 0;
  }

  function onWheel(e: WheelEvent) {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const r = host.getBoundingClientRect();
      zoomTo(zoom * Math.exp(-e.deltaY * 0.01), e.clientX - r.left, e.clientY - r.top);
    } else if (zoom > 1) {
      e.preventDefault();
      tx -= e.deltaX;
      ty -= e.deltaY;
    }
  }

  const pointers = new Map<number, { x: number; y: number }>();
  let dragStart: { x: number; y: number; tx: number; ty: number; moved: boolean } | null = null;
  let pinch: { d: number; z: number } | null = null;

  function onDown(e: PointerEvent) {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    host.setPointerCapture(e.pointerId);
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), z: zoom };
      dragStart = null;
    } else {
      dragStart = { x: e.clientX, y: e.clientY, tx, ty, moved: false };
    }
  }

  function onMove(e: PointerEvent) {
    if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch && pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      zoomTo(pinch.z * (Math.hypot(a.x - b.x, a.y - b.y) / pinch.d));
      return;
    }
    if (dragStart && pointers.size === 1) {
      const dx = e.clientX - dragStart.x, dy = e.clientY - dragStart.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) dragStart.moved = true;
      if (zoom > 1 && dragStart.moved) {
        tx = dragStart.tx + dx;
        ty = dragStart.ty + dy;
      }
      return;
    }
    const p = toBase(e);
    hover = p ? (lines.find((l) => p.x >= l.bbox.x0 && p.x <= l.bbox.x1 && p.y >= l.bbox.y0 - 2 && p.y <= l.bbox.y1 + 2)?.bbox ?? null) : null;
  }

  function onUp(e: PointerEvent) {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinch = null;
    if (dragStart && !dragStart.moved && e.button === 0) {
      const p = toBase(e);
      if (p && showMarks) workspace.reveal = { ...p, n: Date.now() };
    }
    dragStart = null;
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === '+' || e.key === '=') zoomTo(zoom * 1.25);
    else if (e.key === '-') zoomTo(zoom / 1.25);
    else if (e.key === '0') zoomTo(1);
    else if (zoom > 1 && e.key.startsWith('Arrow')) {
      const d = 40;
      if (e.key === 'ArrowLeft') tx += d;
      if (e.key === 'ArrowRight') tx -= d;
      if (e.key === 'ArrowUp') ty += d;
      if (e.key === 'ArrowDown') ty -= d;
    } else return;
    e.preventDefault();
  }

  function rotate(by: number) {
    page.adjust.rotate = (((page.adjust.rotate + by) % 360) + 360) % 360;
    page.adjust.crop = null;
    page.adjust.quad = null;
    page.adjust.angle = 0;
  }

  async function startCrop() {
    try {
      const r = await imageClient.process({
        pageId: page.id,
        blob: page.blob,
        adjust: { ...$state.snapshot(page.adjust), crop: null, quad: null, angle: 0, auto: false },
        mode: page.mode,
        target: 'preview',
        maxSide: 1600,
        tone: false,
        purpose: 'crop',
      });
      crop = { bitmap: r.bitmap! };
    } catch (e) {
      if (!(e instanceof SupersededError)) workspace.toast(t.cropFailed, 'error');
    }
  }

  function applyCrop(q: Quad | null) {
    page.adjust.quad = q;
    page.adjust.crop = null;
    page.adjust.angle = 0;
    crop?.bitmap.close();
    crop = null;
  }

  const pct = $derived(Math.round(fit * zoom * (shown ? shown.width / baseW : 1) * 100));
  const stroke = $derived(Math.max(1, baseW / Math.max(1, dw)) * 1.5);
</script>

<div class="panel">
  <!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
  <div
    class="viewer"
    class:zoomed={zoom > 1}
    bind:this={host}
    role="application"
    aria-label={t.viewerLabel}
    tabindex="0"
    onwheel={onWheel}
    onpointerdown={onDown}
    onpointermove={onMove}
    onpointerup={onUp}
    onpointercancel={onUp}
    onpointerleave={() => (hover = null)}
    onkeydown={onKey}
  >
    {#if shown}
      <div class="stage" style:width="{dw}px" style:height="{dh}px" style:transform="translate({tx}px, {ty}px)">
        <canvas bind:this={canvas} style:width="{dw}px" style:height="{dh}px"></canvas>
        <svg class="marks" viewBox="0 0 {baseW} {baseH}" preserveAspectRatio="none" aria-hidden="true">
          {#each unsure as w, i (i)}
            <line class="unsure" x1={w.bbox.x0} x2={w.bbox.x1} y1={w.bbox.y1 + stroke} y2={w.bbox.y1 + stroke} stroke-width={stroke * 1.4} />
          {/each}
          {#if hover && !workspace.focus.line}
            <rect class="hover" x={hover.x0 - stroke * 2} y={hover.y0 - stroke * 2} width={hover.x1 - hover.x0 + stroke * 4} height={hover.y1 - hover.y0 + stroke * 4} stroke-width={stroke} rx={stroke * 2} />
          {/if}
          {#if showMarks && workspace.focus.line}
            {@const b = workspace.focus.line}
            <rect class="line" x={b.x0 - stroke * 3} y={b.y0 - stroke * 2} width={b.x1 - b.x0 + stroke * 6} height={b.y1 - b.y0 + stroke * 4} rx={stroke * 2} />
          {/if}
          {#if showMarks && workspace.focus.word}
            {@const b = workspace.focus.word}
            <rect class="word" x={b.x0 - stroke * 2} y={b.y0 - stroke * 2} width={b.x1 - b.x0 + stroke * 4} height={b.y1 - b.y0 + stroke * 4} stroke-width={stroke * 1.4} rx={stroke * 2} />
          {/if}
          {#key sweep}
            {#if sweep && showMarks}
              {#each lines.slice(0, 60) as l, i (i)}
                <rect class="sweep" style:animation-delay="{i * 22}ms" x={l.bbox.x0} y={l.bbox.y0} width={l.bbox.x1 - l.bbox.x0} height={l.bbox.y1 - l.bbox.y0} />
              {/each}
            {/if}
          {/key}
        </svg>
        {#if busy}<div class="scan" aria-hidden="true"></div>{/if}
      </div>
    {:else}
      <div class="loading">{t.opening}</div>
    {/if}
    {#if processed}<span class="badge">{t.readerSees}</span>{/if}
  </div>
  {#if crop}
    <!-- Outside the viewer, whose pointer capture would swallow these clicks. -->
    <CropTool bitmap={crop.bitmap} initial={page.adjust.quad} onApply={applyCrop} onCancel={() => { crop?.bitmap.close(); crop = null; }} />
  {/if}

  <div class="tools" role="toolbar" aria-label={t.toolsLabel}>
    <button type="button" class="btn btn-ghost btn-icon" aria-label={t.rotateLeft} title={t.rotateLeft} onclick={() => rotate(-90)}><Icon name="rotateLeft" /></button>
    <button type="button" class="btn btn-ghost btn-icon" aria-label={t.rotateRight} title={t.rotateRight} onclick={() => rotate(90)}><Icon name="rotateRight" /></button>
    <button type="button" class="btn btn-ghost" onclick={startCrop}><Icon name="crop" /> <span class="lbl">{t.crop}</span></button>
    <Popover label={t.adjustLabel} triggerClass="btn btn-ghost" placement="top" bind:open={adjustOpen}>
      {#snippet trigger()}<Icon name="sliders" /> <span class="lbl">{t.adjust}</span>{#if page.adjust.auto}<span class="dot" title={t.autoOn}></span>{/if}{/snippet}
      {#snippet children()}<AdjustPanel {page} />{/snippet}
    </Popover>
    <button
      type="button"
      class="btn btn-ghost"
      aria-pressed={enhancedView}
      title={t.cleanedTitle}
      onclick={() => (enhancedView = !enhancedView)}
    ><Icon name="eye" /> <span class="lbl">{enhancedView ? t.showPhoto : t.showCleaned}</span></button>
    <span class="spacer"></span>
    <button type="button" class="btn btn-ghost btn-icon" aria-label={t.zoomOut} onclick={() => zoomTo(zoom / 1.25)} disabled={zoom <= 1}><Icon name="zoomOut" /></button>
    <button type="button" class="btn btn-ghost zoom" aria-label={t.fitLabel} title={t.fitTitle} onclick={() => zoomTo(1)}>{pct}%</button>
    <button type="button" class="btn btn-ghost btn-icon" aria-label={t.zoomIn} onclick={() => zoomTo(zoom * 1.25)} disabled={zoom >= 8}><Icon name="zoomIn" /></button>
  </div>
</div>

<style>
  .panel {
    position: relative;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: minmax(0, 1fr);
    min-height: 0;
    height: 100%;
    background: var(--well);
  }
  .viewer {
    position: relative;
    overflow: hidden;
    display: grid;
    place-items: center;
    min-height: 0;
    touch-action: pan-y;
    cursor: default;
    background-image: radial-gradient(circle, var(--rule-strong) 1px, transparent 1px);
    background-size: 16px 16px;
  }
  .viewer.zoomed {
    cursor: grab;
    touch-action: none;
  }
  .viewer:focus-visible {
    outline-offset: -3px;
    box-shadow: none;
  }
  .stage {
    position: relative;
    border-radius: 2px;
    box-shadow: 0 0 0 1px var(--rule), var(--shadow-pop);
    background: #fff;
    will-change: transform;
  }
  canvas {
    display: block;
    image-rendering: auto;
  }
  .marks {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: visible;
  }
  .unsure {
    stroke: var(--query);
    stroke-dasharray: 2 2;
    opacity: 0.85;
  }
  .hover {
    fill: none;
    stroke: var(--accent);
    stroke-dasharray: 4 3;
    opacity: 0.7;
  }
  .line {
    fill: var(--marker);
    opacity: 0.22;
    mix-blend-mode: multiply;
  }
  .word {
    fill: var(--marker);
    fill-opacity: 0.28;
    stroke: var(--marker-line);
    mix-blend-mode: multiply;
  }
  .sweep {
    fill: var(--marker);
    opacity: 0;
    mix-blend-mode: multiply;
    animation: sweep 900ms var(--ease) both;
  }
  @keyframes sweep {
    25% {
      opacity: 0.3;
    }
    100% {
      opacity: 0;
    }
  }
  /* The image stays on white in dark mode, so multiply still reads; keep the
     highlight a touch lighter so dark glyphs stay legible. */
  @media (prefers-color-scheme: dark) {
    :global(:root:not([data-theme='light'])) .line,
    :global(:root:not([data-theme='light'])) .word {
      mix-blend-mode: normal;
      opacity: 0.36;
    }
  }
  :global(:root[data-theme='dark']) .line,
  :global(:root[data-theme='dark']) .word {
    mix-blend-mode: normal;
    opacity: 0.36;
  }
  .scan {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--accent);
    box-shadow: 0 0 16px 2px color-mix(in srgb, var(--accent) 60%, transparent);
    animation: scan 1.6s ease-in-out infinite alternate;
  }
  .scan::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 2px;
    height: 48px;
    background: linear-gradient(to top, color-mix(in srgb, var(--accent) 18%, transparent), transparent);
    pointer-events: none;
  }
  @keyframes scan {
    from {
      top: 0;
    }
    to {
      top: calc(100% - 2px);
    }
  }
  .loading {
    color: var(--ink-3);
    font-family: var(--mono);
    font-size: var(--t-xs);
  }
  .badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: var(--glass-strong);
    -webkit-backdrop-filter: var(--glass-blur);
    backdrop-filter: var(--glass-blur);
    border: 1px solid var(--rule);
    color: var(--ink);
    font-family: var(--mono);
    font-size: var(--t-xs);
    font-weight: 500;
    padding: 3px 10px;
    border-radius: var(--r-pill);
    box-shadow: var(--shadow-1);
  }
  .tools {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 6px 8px;
    border-top: 1px solid var(--rule);
    background: var(--sheet);
    /* Wrap rather than scroll: a scrolling bar would clip the Adjust popover
       that opens upward from it. */
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
  }
  .tools :global(.btn) {
    min-height: 36px;
  }
  .spacer {
    flex: 1;
  }
  .zoom {
    font-family: var(--mono);
    font-size: var(--t-xs);
    min-width: 58px;
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }
  @media (max-width: 720px) {
    .lbl {
      display: none;
    }
    .tools {
      padding: 6px 4px;
    }
    .tools :global(.btn) {
      padding-inline: 8px;
    }
    .tools :global(.btn-icon) {
      width: 36px;
      padding: 0;
    }
    .zoom {
      min-width: 44px;
    }
  }
</style>
