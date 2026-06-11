import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { equipment } from '../lib/constants';
import { useGsapReveal } from '../hooks/useGsapReveal';

gsap.registerPlugin(ScrollTrigger);

function EquipCard({ e, i }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <article className={`equip-card ${imgOk ? 'has-photo' : ''}`}>
      {imgOk && (
        <div className="equip-media">
          <img src={e.img} alt={e.name} loading="lazy" onError={() => setImgOk(false)} />
        </div>
      )}
      <div className="equip-overlay" aria-hidden="true" />
      <div className="equip-card-content">
        <span className="equip-num">{String(i + 1).padStart(2, '0')}</span>
        <div>
          <div className="equip-name">{e.name}</div>
          <div className="equip-tag">{e.cat}</div>
        </div>
      </div>
    </article>
  );
}

export function Equipment() {
  const revealRef = useGsapReveal();
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const [pinned, setPinned] = useState(false);

  // Desktop: pin the section and scrub the track horizontally as you scroll.
  // Touch / reduced-motion / narrow: fall back to native horizontal scroll.
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced || window.innerWidth < 1024) return;

    setPinned(true);
    let ctx;
    // Defer one frame so images/layout settle before measuring scrollWidth.
    const id = requestAnimationFrame(() => {
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!pin || !track) return;
      ctx = gsap.context(() => {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);
        ScrollTrigger.create({
          trigger: pin,
          start: 'top top',
          end: () => '+=' + distance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          animation: gsap.to(track, { x: () => -distance(), ease: 'none' }),
        });
      });
    });
    return () => {
      cancelAnimationFrame(id);
      ctx?.revert();
      setPinned(false);
    };
  }, []);

  return (
    <section className="equipment" id="equipment" ref={revealRef}>
      <div className="section-head">
        <div className="section-kicker">
          <span className="section-ghost" aria-hidden="true">03</span>
          <span className="mono-label section-num" data-reveal>Equipment</span>
        </div>
        <h2 className="section-title" data-reveal>Apparatus that <em>earns</em> its floor space.</h2>
      </div>
      <p className="equip-note" data-reveal>
        Our studio features <em>Technogym</em> machines and specialised equipment — several
        introduced in Pune for the first time at DRC. Every piece was chosen because it lets
        you load, move, and recover with a precision the average gym floor doesn't allow.
      </p>

      <div className={`equip-pin ${pinned ? 'is-pinned' : ''}`} ref={pinRef}>
        <div className="equip-track" ref={trackRef}>
          {equipment.map((e, i) => (
            <EquipCard e={e} i={i} key={e.name} />
          ))}
          <div className="equip-end">
            <span className="equip-end-plus">+</span>
            <span className="equip-end-text serif">and many<br />more</span>
            <span className="mono-label" style={{ opacity: 0.6 }}>On the floor at DRC</span>
          </div>
        </div>
      </div>
    </section>
  );
}
