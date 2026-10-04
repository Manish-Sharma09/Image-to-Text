// Home-page motion. Each piece demonstrates the feature it sits next to and
// plays once when it scrolls into view, or again in answer to a click — never
// on a loop. With reduced motion everything is shown in its final state.
import { gsap, ScrollTrigger, reducedMotion } from './gsap';

const OUTPUT_ITEMS = '.label, thead tr, tbody tr, .fields > div, .check, pre, .doc > p, .doc li, .note';

/** "Read as" specimens: a scan line passes over the image, then the output arrives line by line. */
export function initReadAs(root: HTMLElement) {
  if (reducedMotion()) return { play: () => {} };
  let seen = false;

  const play = (panel: HTMLElement | null) => {
    if (!panel) return;
    const items = panel.querySelectorAll(OUTPUT_ITEMS);
    const scan = panel.querySelector<HTMLElement>('.scan');
    const src = panel.querySelector<HTMLElement>('.src');
    gsap.killTweensOf([items, scan]);
    const tl = gsap.timeline();
    if (scan && src) {
      tl.fromTo(scan, { y: 0, opacity: 1 }, { y: () => src.clientHeight, duration: 1.1, ease: 'power2.inOut' }, 0).to(scan, { opacity: 0, duration: 0.25 }, '>-0.15');
    }
    tl.fromTo(items, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.045, clearProps: 'transform' }, 0.18);
  };

  const first = root.querySelector<HTMLElement>('[role="tabpanel"]:not([hidden])');
  if (first) gsap.set(first.querySelectorAll(OUTPUT_ITEMS), { opacity: 0 });
  ScrollTrigger.create({
    trigger: root.querySelector('.stage') ?? root,
    start: 'top 75%',
    once: true,
    onEnter: () => {
      seen = true;
      play(root.querySelector<HTMLElement>('[role="tabpanel"]:not([hidden])'));
    },
  });

  return { play: (panel: HTMLElement) => seen && play(panel) };
}

/** Shortcut steps: each key is pressed in turn, step by step. */
export function initShortcut(root: HTMLElement) {
  if (reducedMotion()) return { play: () => {} };
  let tl: gsap.core.Timeline | undefined;

  const play = () => {
    tl?.progress(1).kill();
    const steps = [...root.querySelectorAll<HTMLElement>('.steps')].find((s) => s.offsetParent !== null);
    if (!steps) return;
    tl = gsap.timeline();
    steps.querySelectorAll<HTMLElement>('li').forEach((li, i) => {
      const at = i * 0.7;
      tl!.call(() => li.classList.add('is-active'), undefined, at);
      li.querySelectorAll('kbd').forEach((k, j) => {
        tl!.call(() => k.classList.add('is-down'), undefined, at + 0.12 + j * 0.08);
      });
      tl!.call(() => li.querySelectorAll('kbd').forEach((k) => k.classList.remove('is-down')), undefined, at + 0.5);
      tl!.call(() => li.classList.remove('is-active'), undefined, at + 0.66);
    });
  };

  ScrollTrigger.create({ trigger: root, start: 'top 65%', once: true, onEnter: play });
  return { play };
}

/** "After the text appears" mocks: each one acts out its feature once. */
export function initAfterText(root: HTMLElement) {
  if (reducedMotion()) return;

  const review = root.querySelector<HTMLElement>('.review .mock');
  const pages = root.querySelector<HTMLElement>('.pages .mock');
  const out = root.querySelector<HTMLElement>('.out .mock');

  if (review) {
    const hl = review.querySelectorAll('.hl-wash, .cur-wash');
    const squiggle = review.querySelector('.sq');
    gsap.set(hl, { scaleX: 0, transformOrigin: 'left center' });
    if (squiggle) gsap.set(squiggle, { clipPath: 'inset(0 100% 0 0)' });
    const tl = gsap.timeline({ paused: true });
    tl.to(hl, { scaleX: 1, duration: 0.7, ease: 'expo.out', stagger: 0.08 });
    if (squiggle) tl.to(squiggle, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power2.out' }, '-=0.2');
    ScrollTrigger.create({ trigger: review, start: 'top 80%', once: true, onEnter: () => tl.play() });
  }

  if (pages) {
    const sheets = pages.querySelectorAll('.stack span');
    const fill = pages.querySelector('.fill');
    const count = pages.querySelector<HTMLElement>('[data-count]');
    // Final angles match the CSS so the resting state is the same with or without motion.
    const angle = [-6, 3, 0];
    gsap.set(sheets, { x: (i: number) => [-28, 0, 28][i] ?? 0, rotation: (i: number) => (angle[i] ?? 0) * -1.5, opacity: 0 });
    if (fill) gsap.set(fill, { scaleX: 0 });
    const n = { v: 1 };
    if (count) count.textContent = '1';
    const tl = gsap.timeline({ paused: true });
    tl.to(sheets, { x: 0, rotation: (i: number) => angle[i] ?? 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.09 });
    if (fill) tl.to(fill, { scaleX: 0.6, duration: 1.6, ease: 'power2.inOut' }, 0.2);
    if (count) tl.to(n, { v: 12, duration: 1.6, ease: 'power2.inOut', onUpdate: () => void (count.textContent = String(Math.round(n.v))) }, 0.2);
    ScrollTrigger.create({ trigger: pages, start: 'top 80%', once: true, onEnter: () => tl.play() });
  }

  if (out) {
    const chips = out.querySelectorAll('li');
    gsap.set(chips, { opacity: 0, y: 6 });
    ScrollTrigger.create({
      trigger: out,
      start: 'top 80%',
      once: true,
      onEnter: () => gsap.to(chips, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', stagger: 0.05, clearProps: 'transform' }),
    });
  }
}
