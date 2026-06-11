import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const canHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Magnetic hover: the returned ref pulls toward the cursor while hovered, and an
 * optional inner element marked [data-magnetic-inner] trails with extra travel.
 * No-op on touch / coarse pointers / reduced motion.
 */
export function useMagnetic({ strength = 0.4 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) return;

    const inner = el.querySelector('[data-magnetic-inner]') || el;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
    const ixTo = gsap.quickTo(inner, 'x', { duration: 0.5, ease: 'power3.out' });
    const iyTo = gsap.quickTo(inner, 'y', { duration: 0.5, ease: 'power3.out' });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
      ixTo(dx * strength * 0.4);
      iyTo(dy * strength * 0.4);
    };
    const onLeave = () => {
      xTo(0); yTo(0); ixTo(0); iyTo(0);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return ref;
}
