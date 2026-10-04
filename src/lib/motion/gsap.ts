// One GSAP instance with the plugins the site uses, registered once.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Lets [data-intro] elements render normally (see .motion-pending in global.css). */
export function releaseIntro() {
  document.documentElement.classList.remove('motion-pending');
}

export { gsap, ScrollTrigger, SplitText };
