<script lang="ts">
  import { workspace } from '../../lib/store/workspace.svelte';
  import { readClipboardImages } from '../../lib/util/clipboard';
  import { ACCEPT } from '../../lib/input/sniff';
  import { mod, isTouch } from '../../lib/util/platform';
  import { SITE } from '../../config/site';
  import Icon from './Icon.svelte';
  import { i18n, fmt, split } from '../../lib/i18n.svelte';
  import { localizePath } from '../../i18n/config';

  let { sample, camera = false }: { sample?: string; camera?: boolean } = $props();

  let fileInput: HTMLInputElement;
  let cameraInput: HTMLInputElement;
  let showUrl = $state(false);
  let url = $state('');
  let urlInput: HTMLInputElement | undefined = $state();
  let pasteHint = $state(false);

  const t = i18n.t;
  const SAMPLES = (['receipt', 'table', 'code', 'handwriting', 'document', 'mixed-hindi'] as const).map((id) => ({ id, label: t.empty.samples[id] }));
  const [titleBefore, titleAfter] = split(t.empty.title, 'keys');
  const [hintBefore, hintAfter] = split(t.empty.pasteHint, 'keys');
  const samples = $derived(sample ? [...SAMPLES].sort((a, b) => (a.id === sample ? -1 : b.id === sample ? 1 : 0)) : SAMPLES);

  async function paste() {
    try {
      const images = await readClipboardImages();
      if (images.length) {
        await workspace.addFiles(images, { names: images.map(() => t.names.pastedImage) });
        return;
      }
      workspace.toast(t.empty.noClipboardImage, 'info');
    } catch {
      pasteHint = true;
    }
  }

  async function submitUrl(e: SubmitEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    if (await workspace.addUrl(url)) {
      url = '';
      showUrl = false;
    }
  }

  $effect(() => {
    if (showUrl) urlInput?.focus();
  });
</script>

<div class="empty">
  <div class="drop">
    <div class="art" aria-hidden="true">
      <span class="sheet"></span>
      <span class="line l1"></span>
      <span class="line l2"></span>
      <span class="line l3"></span>
    </div>
    <h2 class="title">{titleBefore}<kbd>{mod}</kbd>&nbsp;<kbd>V</kbd>{titleAfter}</h2>
    <div class="actions">
      {#if camera && isTouch}
        <button type="button" class="btn btn-primary btn-lg btn-pill" onclick={() => cameraInput.click()}>
          <Icon name="camera" /> {t.empty.takePhoto}
        </button>
        <button type="button" class="btn btn-lg btn-pill" onclick={() => fileInput.click()}>
          <Icon name="upload" /> {t.empty.chooseImages}
        </button>
      {:else}
        <button type="button" class="btn btn-primary btn-lg btn-pill" onclick={() => fileInput.click()}>
          <Icon name="upload" /> {t.empty.chooseImages}
        </button>
        {#if isTouch}
          <button type="button" class="btn btn-lg btn-pill" onclick={() => cameraInput.click()}>
            <Icon name="camera" /> {t.empty.takePhoto}
          </button>
        {/if}
      {/if}
      <button type="button" class="btn btn-lg btn-pill" onclick={paste}>
        <Icon name="paste" /> {t.empty.paste}
      </button>
      <button type="button" class="btn btn-lg btn-pill" aria-expanded={showUrl} onclick={() => (showUrl = !showUrl)}>
        <Icon name="link" /> {t.empty.useLink}
      </button>
    </div>

    {#if pasteHint}
      <p class="note" role="status">{hintBefore}<kbd>{mod}</kbd>&nbsp;<kbd>V</kbd>{hintAfter}</p>
    {/if}

    {#if showUrl}
      <form class="url" onsubmit={submitUrl}>
        <label class="visually-hidden" for="img-url">{t.empty.imageLink}</label>
        <input id="img-url" bind:this={urlInput} type="url" inputmode="url" placeholder={t.empty.urlPlaceholder} bind:value={url} required />
        <button class="btn btn-primary btn-pill" type="submit" disabled={workspace.adding}>{workspace.adding ? t.empty.loading : t.empty.readImage}</button>
      </form>
    {/if}

    <p class="meta">
      {fmt(t.empty.meta, { mb: SITE.maxFileMB, max: SITE.maxPages })}
    </p>
    <p class="private">
      <Icon name="lock" size={16} />
      <span>{t.empty.private} <a href={localizePath('/privacy', i18n.lang)}>{t.empty.howItWorks}</a></span>
    </p>
  </div>

  <div class="samples">
    <p id="samples-label" class="eyebrow">{t.empty.samplesLabel}</p>
    <ul aria-labelledby="samples-label">
      {#each samples as s (s.id)}
        <li>
          <button type="button" class="sample" onclick={() => workspace.addSample(s.id)}>
            <img src={`/samples/${s.id}.png`} alt="" loading="lazy" decoding="async" width="120" height="80" />
            <span>{s.label}</span>
          </button>
        </li>
      {/each}
    </ul>
  </div>

  <input bind:this={fileInput} type="file" accept={ACCEPT} multiple hidden onchange={(e) => { const f = (e.currentTarget as HTMLInputElement).files; if (f) workspace.addFiles(f); (e.currentTarget as HTMLInputElement).value = ''; }} />
  <input bind:this={cameraInput} type="file" accept="image/*" capture="environment" hidden onchange={(e) => { const f = (e.currentTarget as HTMLInputElement).files; if (f) workspace.addFiles(f, { names: [t.names.photo] }); (e.currentTarget as HTMLInputElement).value = ''; }} />
</div>

<style>
  .empty {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: minmax(0, 1fr);
    min-height: 100%;
  }
  .drop {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 18px;
    padding: clamp(28px, 6vw, 56px) 20px 28px;
    margin: 12px;
    border: 1px dashed var(--rule-strong);
    border-radius: var(--r-md);
    background: var(--paper);
  }
  .art {
    position: relative;
    width: 64px;
    height: 76px;
    margin-bottom: 4px;
  }
  .sheet {
    position: absolute;
    inset: 0;
    border: 1px solid var(--rule-strong);
    border-radius: 10px;
    background: var(--sheet);
    box-shadow: var(--shadow-2);
  }
  .line {
    position: absolute;
    left: 13px;
    height: 3px;
    border-radius: 2px;
    background: var(--ink-4);
  }
  .l1 {
    top: 22px;
    width: 38px;
  }
  .l2 {
    top: 36px;
    width: 38px;
    background: var(--marker-line);
    box-shadow:
      0 0 0 5px var(--marker-soft),
      -6px 0 0 4px var(--marker-soft);
  }
  .l3 {
    top: 50px;
    width: 24px;
  }
  .title {
    font-size: clamp(var(--t-xl), 2.6vw, var(--t-2xl));
    font-weight: 600;
    letter-spacing: var(--track-heading);
    max-width: 24ch;
  }
  .title kbd {
    font-size: 0.66em;
    vertical-align: 0.2em;
    letter-spacing: 0;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  .note {
    font-size: var(--t-sm);
    color: var(--ink-2);
  }
  .url {
    display: flex;
    gap: 8px;
    width: min(520px, 100%);
  }
  .url input {
    flex: 1;
    min-width: 0;
    min-height: 44px;
    padding: 0 16px;
    border: 1px solid var(--rule);
    border-radius: var(--r-pill);
    background: var(--sheet);
    font-size: var(--t-sm);
    box-shadow: var(--shadow-1);
    transition: border-color 150ms var(--ease), box-shadow 150ms var(--ease);
  }
  .url input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
    outline: none;
  }
  .url input::placeholder {
    color: var(--ink-4);
  }
  .meta {
    font-size: var(--t-sm);
    color: var(--ink-3);
    max-width: 52ch;
  }
  .private {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: var(--t-xs);
    color: var(--ink-2);
    padding: 5px 12px 5px 10px;
    border-radius: var(--r-pill);
    background: var(--sheet);
    border: 1px solid var(--rule);
    box-shadow: var(--shadow-1);
  }
  .private :global(svg) {
    color: var(--ink-3);
    flex: none;
  }
  .private a {
    color: var(--accent);
    font-weight: 500;
    text-decoration: none;
  }
  .private a:hover {
    text-decoration: underline;
  }
  .samples {
    min-width: 0;
    padding: 4px 12px 16px;
  }
  .samples p {
    margin: 0 0 10px 2px;
  }
  .samples ul {
    list-style: none;
    margin: 0;
    padding: 0 0 4px;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(132px, 1fr);
    gap: 10px;
    overflow-x: auto;
    scrollbar-width: thin;
  }
  .sample {
    display: grid;
    gap: 6px;
    width: 100%;
    padding: 6px;
    border: 1px solid var(--rule);
    border-radius: var(--r-md);
    background: var(--sheet);
    text-align: left;
    font-size: var(--t-sm);
    font-weight: 500;
    color: var(--ink);
    transition: border-color 200ms var(--ease), box-shadow 200ms var(--ease);
  }
  .sample:hover {
    border-color: var(--ink-4);
    box-shadow: var(--shadow-2);
  }
  .sample img {
    width: 100%;
    height: 78px;
    object-fit: cover;
    object-position: top center;
    border-radius: var(--r-xs);
    background: var(--well);
    transition: transform 200ms var(--ease);
  }
  .sample:hover img {
    transform: scale(1.03);
  }
  .sample span {
    padding: 0 2px 2px;
  }
  /* Keeps the image's scale inside its rounded frame. */
  .sample {
    overflow: hidden;
  }
  @media (max-width: 560px) {
    .actions .btn {
      flex: 1 1 calc(50% - 10px);
    }
  }
</style>
