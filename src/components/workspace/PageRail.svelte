<script lang="ts">
  import { workspace, type Page } from '../../lib/store/workspace.svelte';
  import Icon from './Icon.svelte';
  import { i18n, fmt } from '../../lib/i18n.svelte';

  let { onAdd }: { onAdd: () => void } = $props();
  const t = i18n.t.rail;
  let dragId = $state<string | null>(null);
  let overIndex = $state<number | null>(null);

  function onKey(e: KeyboardEvent, page: Page, i: number) {
    if (e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowLeft')) {
      e.preventDefault();
      workspace.move(page.id, i - 1);
      requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-page="${page.id}"]`)?.focus());
    } else if (e.altKey && (e.key === 'ArrowDown' || e.key === 'ArrowRight')) {
      e.preventDefault();
      workspace.move(page.id, i + 1);
      requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-page="${page.id}"]`)?.focus());
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      workspace.remove(page.id);
    }
  }

  function drop(i: number) {
    if (dragId) workspace.move(dragId, i);
    dragId = null;
    overIndex = null;
  }
</script>

<nav class="rail" aria-label={t.label}>
  <p class="hint visually-hidden" id="rail-hint">{t.hint}</p>
  <ol>
    {#each workspace.pages as page, i (page.id)}
      <li
        class:over={overIndex === i && dragId !== page.id}
        ondragover={(e) => {
          e.preventDefault();
          overIndex = i;
        }}
        ondrop={(e) => {
          e.preventDefault();
          drop(i);
        }}
      >
        <button
          type="button"
          class="thumb"
          class:active={workspace.view === 'page' && workspace.active?.id === page.id}
          data-page={page.id}
          draggable="true"
          aria-current={workspace.active?.id === page.id ? 'page' : undefined}
          aria-describedby="rail-hint"
          aria-label={fmt(t.pageLabel, { n: i + 1, name: page.name, status: page.status === 'done' ? t.statusRead : page.status === 'error' ? i18n.t.common.error : page.status === 'ready' ? t.statusNotRead : t.statusReading })}
          title={page.name}
          onclick={() => workspace.select(page.id)}
          onkeydown={(e) => onKey(e, page, i)}
          ondragstart={(e) => {
            dragId = page.id;
            e.dataTransfer?.setData('text/plain', page.id);
          }}
          ondragend={() => {
            dragId = null;
            overIndex = null;
          }}
        >
          <img src={page.thumb} alt="" draggable="false" />
          <span class="num">{i + 1}</span>
          <span class={`st ${page.status}`} aria-hidden="true">
            {#if page.status === 'done'}
              {#if page.outdated}<Icon name="refresh" size={12} />{:else}<Icon name="check" size={12} />{/if}
            {:else if page.status === 'error'}!{:else if page.status !== 'ready'}<span class="spin"></span>{/if}
          </span>
        </button>
      </li>
    {/each}
    <li>
      <button type="button" class="add" onclick={onAdd} aria-label={i18n.t.workspace.addImages}>
        <Icon name="plus" />
        <span>{t.add}</span>
      </button>
    </li>
  </ol>
</nav>

<style>
  .rail {
    height: 100%;
    overflow: auto;
    border-right: 1px solid var(--rule);
    background: var(--sheet);
    scrollbar-width: thin;
  }
  ol {
    list-style: none;
    margin: 0;
    padding: 10px;
    display: grid;
    gap: 10px;
  }
  li {
    position: relative;
  }
  li.over::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: -6px;
    height: 2px;
    border-radius: 1px;
    background: var(--accent);
    box-shadow: 0 0 0 2px var(--accent-soft);
  }
  .thumb {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 3 / 4;
    padding: 0;
    border: 1px solid var(--rule);
    border-radius: var(--r-sm);
    background: var(--well);
    overflow: hidden;
    transition: border-color 150ms var(--ease), box-shadow 150ms var(--ease);
  }
  .thumb:hover {
    border-color: var(--ink-4);
  }
  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }
  .thumb.active {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px var(--sheet), 0 0 0 4px var(--accent);
  }
  .num {
    position: absolute;
    left: 4px;
    bottom: 4px;
    min-width: 20px;
    padding: 1px 5px;
    border-radius: var(--r-pill);
    background: color-mix(in srgb, var(--ink) 82%, transparent);
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    color: var(--on-ink);
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 500;
    text-align: center;
  }
  .st {
    position: absolute;
    right: 4px;
    top: 4px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 12px;
    font-weight: 600;
    box-shadow: var(--shadow-1);
  }
  .st.done {
    background: var(--marker);
    color: var(--on-marker);
  }
  .st.error {
    background: var(--danger);
    color: #fff;
  }
  .st.queued,
  .st.preparing,
  .st.reading {
    background: var(--sheet);
    box-shadow: 0 0 0 1px var(--rule), var(--shadow-1);
  }
  .spin {
    width: 12px;
    height: 12px;
    border: 1.5px solid var(--rule-strong);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  .add {
    width: 100%;
    aspect-ratio: 3 / 2;
    display: grid;
    place-items: center;
    align-content: center;
    gap: 2px;
    border: 1px dashed var(--rule-strong);
    border-radius: var(--r-sm);
    background: none;
    color: var(--ink-2);
    font-size: var(--t-xs);
    font-weight: 500;
    transition: border-color 150ms var(--ease), color 150ms var(--ease), background-color 150ms var(--ease);
  }
  .add:hover {
    border-color: var(--ink-4);
    color: var(--ink);
    background: var(--paper);
  }
  @media (max-width: 860px) {
    .rail {
      border-right: 0;
      border-bottom: 1px solid var(--rule);
      overflow-x: auto;
      overflow-y: hidden;
    }
    ol {
      grid-auto-flow: column;
      grid-auto-columns: 56px;
      padding: 8px 10px;
    }
    .add {
      aspect-ratio: 3 / 4;
    }
    .add span {
      display: none;
    }
  }
</style>
