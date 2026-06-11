import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Chrome dot + trailing ring. The ring grows over interactive elements and can
// show a label via [data-cursor-label]. Disabled on touch / reduced motion.
export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const root = document.querySelector('.drc-root');
    root?.classList.add('has-cursor');

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });

    const move = (e) => {
      dotX(e.clientX); dotY(e.clientY);
      ringX(e.clientX); ringY(e.clientY);
    };
    const over = (e) => {
      const t = e.target.closest?.('a, button, [data-cursor]');
      if (!t) return;
      ring.classList.add('hover');
      const label = t.getAttribute('data-cursor-label');
      if (label) { ring.classList.add('label'); ring.setAttribute('data-label', label); }
    };
    const out = (e) => {
      const t = e.target.closest?.('a, button, [data-cursor]');
      if (!t) return;
      ring.classList.remove('hover', 'label');
      ring.removeAttribute('data-label');
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      root?.classList.remove('has-cursor');
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
