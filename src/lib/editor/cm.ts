// CodeMirror setup for the result editor. Loaded lazily after the first read.
// Every recognised word is a decoration carrying its image box; CodeMirror
// maps decorations through edits, so text↔image linking survives editing.

import { EditorState, StateEffect, StateField, RangeSetBuilder, type Extension, type Range } from '@codemirror/state';
import {
  EditorView,
  Decoration,
  ViewPlugin,
  keymap,
  placeholder,
  drawSelection,
  type DecorationSet,
  type ViewUpdate,
} from '@codemirror/view';
import { history, defaultKeymap, historyKeymap, undo, redo, indentWithTab } from '@codemirror/commands';
import { search, searchKeymap, openSearchPanel, closeSearchPanel, searchPanelOpen, highlightSelectionMatches } from '@codemirror/search';
import type { BBox, ReadMode } from '../ocr/types';
import type { Segment } from '../layout/types';
import { i18n } from '../i18n.svelte';

export { undo, redo };

interface WordSpec {
  bbox: BBox;
  conf: number;
}

const setSegments = StateEffect.define<Segment[]>();
const UNSURE = 70;

function build(segs: Segment[], docLen: number, onlyUnsure: boolean): DecorationSet {
  const b = new RangeSetBuilder<Decoration>();
  const sorted = [...segs].sort((a, c) => a.from - c.from);
  for (const s of sorted) {
    if (s.to > docLen || s.from >= s.to) continue;
    if (onlyUnsure && s.conf >= UNSURE) continue;
    b.add(s.from, s.to, Decoration.mark(onlyUnsure ? { class: 'cm-unsure', attributes: { title: i18n.t.editor.checkWord } } : { bbox: s.bbox, conf: s.conf } as never));
  }
  return b.finish();
}

/** All words with their image boxes (unstyled). */
const words = StateField.define<DecorationSet>({
  create: () => Decoration.none,
  update(deco, tr) {
    for (const e of tr.effects) if (e.is(setSegments)) return build(e.value, tr.state.doc.length, false);
    return deco.map(tr.changes);
  },
});

/** Low-confidence words; editing a word counts as reviewing it. */
const unsure = StateField.define<DecorationSet>({
  create: () => Decoration.none,
  update(deco, tr) {
    for (const e of tr.effects) if (e.is(setSegments)) return build(e.value, tr.state.doc.length, true);
    if (!tr.docChanged) return deco;
    const touched: [number, number][] = [];
    tr.changes.iterChangedRanges((_fa, _ta, fromB, toB) => touched.push([fromB, toB]));
    return deco.map(tr.changes).update({
      filter: (from, to) => !touched.some(([a, b]) => from <= b && to >= a),
    });
  },
  provide: (f) => EditorView.decorations.from(f),
});

/** Light Markdown styling for document mode. */
const markdownLines = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;
    constructor(view: EditorView) {
      this.decorations = this.compute(view);
    }
    update(u: ViewUpdate) {
      if (u.docChanged || u.viewportChanged) this.decorations = this.compute(u.view);
    }
    compute(view: EditorView): DecorationSet {
      const out: Range<Decoration>[] = [];
      for (const { from, to } of view.visibleRanges) {
        for (let pos = from; pos <= to; ) {
          const line = view.state.doc.lineAt(pos);
          const m = line.text.match(/^(#{1,3}) /);
          if (m) out.push(Decoration.line({ class: `cm-h${m[1].length}` }).range(line.from));
          else if (/^(- |\d{1,3}[.)] |[a-z][.)] )/.test(line.text)) out.push(Decoration.line({ class: 'cm-li' }).range(line.from));
          pos = line.to + 1;
        }
      }
      return Decoration.set(out);
    }
  },
  { decorations: (v) => v.decorations },
);

const theme = EditorView.theme({
  '&': { height: '100%', fontSize: '16px', backgroundColor: 'var(--sheet)', color: 'var(--ink)' },
  '&.cm-focused': { outline: 'none' },
  '.cm-scroller': { fontFamily: 'var(--sans)', lineHeight: '1.6', padding: '14px 0 40px' },
  '.cm-content': { padding: '0 18px', caretColor: 'var(--ink)', maxWidth: '78ch' },
  '.cm-line': { padding: '0' },
  '&.code .cm-scroller': { fontFamily: 'var(--mono)', fontSize: '14px', lineHeight: '1.55' },
  '&.code .cm-content': { maxWidth: 'none' },
  '.cm-cursor': { borderLeftColor: 'var(--accent)', borderLeftWidth: '2px' },
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection': { backgroundColor: 'var(--accent-soft) !important', color: 'inherit' },
  '.cm-unsure': {
    textDecoration: 'underline wavy var(--query)',
    textDecorationThickness: '1.5px',
    textUnderlineOffset: '3px',
    textDecorationSkipInk: 'none',
  },
  '.cm-h1': { fontSize: '1.45em', fontWeight: '600', lineHeight: '1.3', letterSpacing: '-0.03em' },
  '.cm-h2': { fontSize: '1.25em', fontWeight: '600', lineHeight: '1.35', letterSpacing: '-0.02em' },
  '.cm-h3': { fontSize: '1.1em', fontWeight: '600', letterSpacing: '-0.01em' },
  '.cm-li': { paddingLeft: '0.2em' },
  '.cm-searchMatch': { backgroundColor: 'var(--marker-soft)', outline: '1px solid var(--marker-line)' },
  '.cm-searchMatch-selected': { backgroundColor: 'var(--accent-soft)' },
  '.cm-selectionMatch': { backgroundColor: 'var(--marker-soft)' },
  '.cm-placeholder': { color: 'var(--ink-3)' },
  '.cm-panels': { backgroundColor: 'var(--paper)', color: 'var(--ink)', borderColor: 'var(--rule)' },
  '.cm-panels.cm-panels-top': { borderBottom: '1px solid var(--rule)' },
  '.cm-search': { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', padding: '8px 10px', fontSize: '14px' },
  '.cm-search label': { display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '13px' },
  '.cm-textfield': { minHeight: '34px', padding: '0 8px', border: '1px solid var(--rule)', borderRadius: '6px', background: 'var(--sheet)', color: 'var(--ink)', fontSize: '14px' },
  '.cm-textfield:focus': { outline: 'none', borderColor: 'var(--accent)', boxShadow: '0 0 0 3px var(--accent-soft)' },
  '.cm-search input[type=checkbox]': { accentColor: 'var(--accent)' },
  '.cm-button': { minHeight: '34px', padding: '0 10px', border: '1px solid var(--rule)', borderRadius: '6px', background: 'var(--sheet)', backgroundImage: 'none', color: 'var(--ink)', fontWeight: '500', fontSize: '13px', textTransform: 'none', boxShadow: 'var(--shadow-1)' },
  '.cm-button:hover': { background: 'var(--well)' },
  '.cm-search [name=close]': { marginLeft: 'auto', fontSize: '20px', background: 'none', border: '0', color: 'var(--ink-2)', cursor: 'pointer' },
});

export interface Cursor {
  word: BBox | null;
  line: BBox | null;
}

export interface EditorHandle {
  view: EditorView;
  load(key: string, doc: string, segments: Segment[], mode: ReadMode): void;
  /** Selects the word nearest an image point and scrolls to it. */
  reveal(x: number, y: number): boolean;
  nextUnsure(dir?: 1 | -1): boolean;
  unsureCount(): number;
  toggleSearch(): void;
  destroy(): void;
}

export function createEditor(
  parent: HTMLElement,
  opts: { onChange: (text: string) => void; onCursor: (c: Cursor) => void; onUnsure: (n: number) => void; label: string },
): EditorHandle {
  const states = new Map<string, EditorState>();
  let currentKey = '';

  const cursorInfo = (state: EditorState): Cursor => {
    const pos = state.selection.main.head;
    const field = state.field(words);
    let word: BBox | null = null;
    field.between(pos, pos, (_f, _t, d) => {
      word = (d.spec as WordSpec).bbox;
      return false;
    });
    const line = state.doc.lineAt(pos);
    const boxes: BBox[] = [];
    field.between(line.from, line.to, (_f, _t, d) => {
      boxes.push((d.spec as WordSpec).bbox);
    });
    if (!boxes.length) return { word, line: null };
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const b of boxes) {
      x0 = Math.min(x0, b.x0);
      y0 = Math.min(y0, b.y0);
      x1 = Math.max(x1, b.x1);
      y1 = Math.max(y1, b.y1);
    }
    return { word, line: { x0, y0, x1, y1 } };
  };

  // Code keeps its long lines (indentation matters); everything else wraps.
  const extensions = (m: ReadMode = 'plain'): Extension[] => [
    history(),
    drawSelection(),
    m === 'code' || m === 'math' ? [] : EditorView.lineWrapping,
    EditorView.perLineTextDirection.of(true),
    EditorView.contentAttributes.of({ 'aria-label': opts.label, spellcheck: 'true', autocorrect: 'off', autocapitalize: 'off' }),
    placeholder(i18n.t.editor.placeholder),
    // CodeMirror's own labels (find and replace bar) in the UI language.
    i18n.lang === 'en' ? [] : EditorState.phrases.of(i18n.t.editor.phrases),
    search({ top: true }),
    highlightSelectionMatches(),
    keymap.of([...defaultKeymap, ...historyKeymap, ...searchKeymap, indentWithTab]),
    words,
    unsure,
    markdownLines,
    theme,
    EditorView.updateListener.of((u) => {
      if (u.docChanged) {
        opts.onChange(u.state.doc.toString());
        opts.onUnsure(u.state.field(unsure).size);
      }
      if (u.selectionSet || u.focusChanged) opts.onCursor(u.view.hasFocus || u.selectionSet ? cursorInfo(u.state) : { word: null, line: null });
    }),
  ];

  const view = new EditorView({ parent, state: EditorState.create({ doc: '', extensions: extensions() }) });

  const handle: EditorHandle = {
    view,
    load(key, doc, segments, m) {
      view.dom.classList.toggle('code', m === 'code' || m === 'math');
      if (currentKey) states.set(currentKey, view.state);
      currentKey = key;
      const saved = states.get(key);
      if (saved && saved.doc.toString() === doc) {
        view.setState(saved);
      } else {
        const state = EditorState.create({ doc, extensions: extensions(m) });
        view.setState(state);
        view.dispatch({ effects: setSegments.of(segments) });
      }
      opts.onUnsure(view.state.field(unsure).size);
      opts.onCursor({ word: null, line: null });
    },
    reveal(x, y) {
      let best: { from: number; to: number; d: number } | null = null;
      view.state.field(words).between(0, view.state.doc.length, (from, to, d) => {
        const b = (d.spec as WordSpec).bbox;
        const dx = x < b.x0 ? b.x0 - x : x > b.x1 ? x - b.x1 : 0;
        const dy = y < b.y0 ? b.y0 - y : y > b.y1 ? y - b.y1 : 0;
        const dist = dx + dy * 3;
        if (!best || dist < best.d) best = { from, to, d: dist };
      });
      if (!best) return false;
      const { from, to } = best;
      view.dispatch({ selection: { anchor: from, head: to }, effects: EditorView.scrollIntoView(from, { y: 'center' }) });
      view.focus();
      return true;
    },
    nextUnsure(dir = 1) {
      const field = view.state.field(unsure);
      const pos = view.state.selection.main;
      const ranges: [number, number][] = [];
      field.between(0, view.state.doc.length, (f, t) => {
        ranges.push([f, t]);
      });
      if (!ranges.length) return false;
      const next =
        dir === 1
          ? (ranges.find(([f]) => f > pos.from) ?? ranges[0])
          : ([...ranges].reverse().find(([f]) => f < pos.from) ?? ranges[ranges.length - 1]);
      view.dispatch({ selection: { anchor: next[0], head: next[1] }, effects: EditorView.scrollIntoView(next[0], { y: 'center' }) });
      view.focus();
      return true;
    },
    unsureCount: () => view.state.field(unsure).size,
    toggleSearch() {
      if (searchPanelOpen(view.state)) closeSearchPanel(view);
      else openSearchPanel(view);
    },
    destroy() {
      view.destroy();
    },
  };
  return handle;
}
