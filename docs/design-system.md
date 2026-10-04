# Design system

Based on `DESIGN.md` (the Geist system): near-black ink on a near-white
canvas, 1px hairlines around every surface, and colour confined to one place
— the hero's mesh gradient. The product's own idea survives inside that: the
**blue highlight** ties a line of text to its place on the image, so blue is
reserved for that link, selection, focus and links, never for large fills.

## Palette (`src/styles/global.css`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#FAFAFA` | `#0A0A0A` | Page canvas |
| `--sheet` | `#FFFFFF` | `#111111` | Cards, the workspace, inputs |
| `--well` | `#F2F2F2` | `#1A1A1A` | Inset wells, toggle tracks, hovers |
| `--ink` | `#171717` | `#EDEDED` | Headings, text, primary buttons |
| `--ink-2` / `--ink-3` | `#4D4D4D` / `#666666` | `#A1A1A1` / `#8F8F8F` | Body / muted text (AA) |
| `--ink-4` | `#8F8F8F` | `#6B6B6B` | Non-text marks only |
| `--rule` | `#EBEBEB` | `#242424` | Hairlines |
| `--accent`, `--marker` | `#0070F3` | `#3291FF` / `#0070F3` | Highlights, selection, focus, links |
| `--marker-soft` | `#E6F0FF` | blue 16% | Current line, matches |
| `--query` | `#AB570A` | `#F5A623` | Wavy underline on words to check |
| `--g-*` | cyan `#00DFD8`, blue `#007CF0`, violet `#7928CA`, pink `#FF0080`, amber `#F9CB28` | | Hero mesh gradient only (plus the reading progress bar) |

Three theme modes: **System** (default — follows `prefers-color-scheme`,
live), **Light** and **Dark** (set `data-theme` on `<html>`). Choose from the
theme menu in the header or the switch in the footer; both use
`lib/theme.ts`, stay in sync (also across tabs), cross-fade with a view
transition, update `theme-color`, and store the choice in
`localStorage['copyable:theme']`, which Base.astro applies before first paint.

## Type

Geist (UI and display) and Geist Mono (eyebrows, keys, numbers, code mode).
Weights are 400 body, 500 labels/buttons, 600 headings — nothing heavier.
Display tracking tightens with size: −0.05em at 48–56px, −0.04em at 32px,
−0.02em at 20px. Scale: 12 / 14 / 16 / 18 / 20 / 24 / 32 / 48 / 64 px.
Uppercase mono `.eyebrow` labels introduce home sections like a spec sheet.

## Shape and depth

- Radius: 6px for app chrome (`.btn`, inputs, toggles), 12–16px for cards and
  panels, 22px for the hero bezel, full pills (`.btn-pill`) for marketing CTAs.
  Marketing and app contexts don't mix shapes.
- Depth is a hairline first; shadows are low-alpha layered stacks
  (`--shadow-1` whisper, `--shadow-2` floating, `--shadow-pop` menus).
- Grids of related content use shared hairlines (1px gaps over a `--rule`
  background) rather than separate shadowed cards.

## Glass

Backdrop blur only for chrome that floats over content: the sticky header,
the frosted bezel around the workspace, popovers, menus, dialogs, the
history drawer, toasts and the drop overlay. The bezel's blur sits on a
pseudo-element so it doesn't become the containing block for the
workspace's `position: fixed` children. Each glass surface falls back to a
solid one without `backdrop-filter`.

## Motion

- **Hero (Three.js):** `lib/motion/mesh.ts` renders the mesh gradient in a
  fragment shader on one quad — domain-warped noise across the five stops,
  leaning toward the pointer, with a soft scan line. It loads when the
  browser is idle (the CSS gradient underneath is the fallback), renders at
  half resolution, pauses off-screen and in hidden tabs, and gains energy
  and sweeps while the workspace is reading (`copyable:busy` event).
- **Entrance (GSAP):** one page-load sequence in `lib/motion/hero.ts` —
  headline words rise out of masked lines (SplitText), the intro and the
  workspace follow. `[data-intro]` elements are held by `.motion-pending`
  with a CSS failsafe so they can never stay hidden.
- **Sections (GSAP + ScrollTrigger):** each demonstrates its feature once on
  scroll-in or in answer to a click: the scan line and line-by-line output
  in "Read as", keys pressed in sequence in the shortcut steps, the
  highlight/underline, page stack and format chips in "After the text".
- `prefers-reduced-motion` turns all of it off: the gradient is drawn once,
  and everything is shown in its final state.

## Layout

- The workspace is the hero: a centred headline and intro over the mesh
  gradient, with the workspace in its frosted bezel directly below.
- Section rhythm is 128px on desktop, 96px on phones; content is left-aligned
  on a 1200px container, the hero and closing CTA are centred.
- Desktop workspace: page rail (2+ pages) · image · text. Phone: strip of
  pages, image (collapsible), text with a sticky glass action bar.

## Principles

- Plain, specific copy in sentence case; errors say what happened and what to
  do next.
- One decorative system: the mesh gradient. Everything else is ink on white.
- Focus is always visible: a 2px blue outline with a 2px offset.
- Touch targets ≥ 40px (46px for primary mobile actions).
