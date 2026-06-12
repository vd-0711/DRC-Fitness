import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoopVideo } from './LoopVideo';
import { useGsapReveal } from '../hooks/useGsapReveal';

gsap.registerPlugin(ScrollTrigger);

// Cinematic closing moment: the main vertical "gym edit" video, centered in a
// chrome frame over a dark ember-lit stage so it fits seamlessly at any width.
export function Film() {
  const revealRef = useGsapReveal();
  const frameRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        frameRef.current,
        { yPercent: 6 },
        {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: { trigger: frameRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    }, revealRef);
    return () => ctx.revert();
  }, [revealRef]);

  return (
    <section className="film" id="film" ref={revealRef}>
      <div className="film-head">
        <span className="mono-label section-num" data-reveal>— Inside DRC</span>
        <h2 className="film-title chrome-text" data-reveal>The floor, <em>in motion.</em></h2>
      </div>
      <div className="film-frame" ref={frameRef} data-reveal>
        <LoopVideo
          src="/video/gym-edit.mp4"
          poster="/video/gym-edit-poster.jpg"
          aspectRatio="9 / 16"
          lazyPlay={true}
        />
        <span className="film-tag mono-label">DRC · Pune</span>
      </div>
      <a className="film-more" href="/gallery.html" data-reveal data-cursor-label="Open">
        <span className="film-more-inner">View more photos <ArrowUpRight size={15} /></span>
      </a>
    </section>
  );
}
