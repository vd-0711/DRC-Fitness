import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-choreographed reveal for a section. Returns a ref to put on the section;
 * any descendants marked [data-reveal] animate up + fade in, staggered, as they
 * enter the viewport. Progressive enhancement: if JS/GSAP never runs the content
 * is simply visible. Disabled under prefers-reduced-motion.
 */
export function useGsapReveal(options = {}) {
  const { y = 40, stagger = 0.09, start = 'top 82%', duration = 0.9 } = options;
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = root.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y });
      ScrollTrigger.batch(targets, {
        start,
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            ease: 'power3.out',
            overwrite: true,
          }),
      });
    }, root);

    return () => ctx.revert();
  }, [y, stagger, start, duration]);

  return ref;
}
