import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { stopScroll, startScroll } from '../hooks/useLenis';

// Brief brushed-metal intro: "DRC" rises, an ember bar + counter fill to 100,
// then the curtain lifts to reveal the page. Instant under reduced motion.
export function Preloader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const pctRef = useRef(null);
  const letters = useRef([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true);
      return;
    }
    stopScroll();
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          window.scrollTo(0, 0);
          startScroll();
          setDone(true);
        },
      });
      tl.to(letters.current, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' }, 0.15);
      tl.to(counter, {
        v: 100, duration: 1.3, ease: 'power1.inOut',
        onUpdate: () => { if (pctRef.current) pctRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0'); },
      }, 0.15);
      tl.to(barRef.current, { scaleX: 1, duration: 1.3, ease: 'power1.inOut' }, 0.15);
      tl.to(letters.current, { yPercent: -120, opacity: 0, duration: 0.5, stagger: 0.05, ease: 'power2.in' }, '+=0.15');
      tl.to(rootRef.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.15');
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, []);

  if (done) return null;

  return (
    <div className="preloader" ref={rootRef}>
      <div className="preloader-mark chrome-text">
        {'DRC'.split('').map((c, i) => (
          <span key={i} ref={(el) => (letters.current[i] = el)}>{c}</span>
        ))}
      </div>
      <div className="preloader-bar"><i ref={barRef} /></div>
      <div className="preloader-pct" ref={pctRef}>000</div>
    </div>
  );
}
