// Hero choreography: one entrance (headline words rise out of their lines,
// the intro follows, the workspace settles into place), then the WebGL mesh
// loads when the browser is idle. While the workspace reads, the mesh gains
// energy and sweeps a scan line; scrolling away drifts it up and out.
import { gsap, ScrollTrigger, SplitText, reducedMotion, releaseIntro } from './gsap';
import type { MeshControls } from './mesh';

export function initHero(root: HTMLElement) {
  const reduced = reducedMotion();
  intro(root, reduced);

  const host = root.querySelector<HTMLElement>('[data-mesh]');
  const canvas = host?.querySelector('canvas');
  if (!host || !canvas) return;

  const idle = (fn: () => void) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 300));
  idle(async () => {
    let mesh: MeshControls | null = null;
    try {
      const { mountMesh } = await import('./mesh');
      mesh = mountMesh(host, canvas, { animate: !reduced });
    } catch {
      mesh = null;
    }
    if (!mesh) return; // The CSS gradient underneath stays as the fallback.
    host.dataset.mesh = 'ready';
    gsap.to(canvas, { opacity: 1, duration: reduced ? 0 : 1.6, ease: 'power2.out' });
    if (reduced) return;

    mesh.scan(2.8);
    let reading = false;
    window.addEventListener('copyable:busy', (e) => {
      const busy = !!(e as CustomEvent<{ busy: boolean }>).detail?.busy;
      if (busy === reading) return;
      reading = busy;
      mesh!.energy(busy ? 1 : 0, busy ? 0.8 : 2.2);
      if (busy) loopScan(mesh!, () => reading);
      else mesh!.scan(1.6);
    });

    gsap.to(host, {
      yPercent: -12,
      opacity: 0.35,
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 },
    });
  });
}

function loopScan(mesh: MeshControls, active: () => boolean) {
  mesh.scan(1.4, () => {
    if (active()) gsap.delayedCall(0.2, () => loopScan(mesh, active));
  });
}

function intro(root: HTMLElement, reduced: boolean) {
  const items = [...root.querySelectorAll<HTMLElement>('[data-intro]')];
  if (reduced || !items.length) {
    releaseIntro();
    return;
  }
  // Take over from the CSS hold: hide inline first so nothing flashes.
  gsap.set(items, { opacity: 0 });
  releaseIntro();

  const h1 = root.querySelector<HTMLElement>('[data-split]');
  const crumb = root.querySelector<HTMLElement>('[data-intro="crumb"]');
  const lede = root.querySelector<HTMLElement>('[data-intro="lede"]');
  const frame = root.querySelector<HTMLElement>('[data-intro="frame"]');

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  if (crumb) tl.fromTo(crumb, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.7 }, 0);
  if (h1) {
    const split = SplitText.create(h1, { type: 'lines,words', mask: 'lines', linesClass: 'split-line' });
    tl.set(h1, { opacity: 1 }, 0)
      .from(split.words, { yPercent: 115, duration: 1, stagger: 0.045 }, 0.05)
      .call(() => split.revert(), undefined, '>');
  }
  if (lede) tl.fromTo(lede, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.9 }, 0.28);
  if (frame) {
    tl.fromTo(
      frame,
      { opacity: 0, y: 40, scale: 0.985 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, clearProps: 'transform' },
      0.38,
    );
  }
  ScrollTrigger.refresh();
}
