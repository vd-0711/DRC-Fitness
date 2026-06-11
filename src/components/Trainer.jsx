import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapReveal } from '../hooks/useGsapReveal';

gsap.registerPlugin(ScrollTrigger);

const IMG_CANDIDATES = ['/trainer-web.jpg', '/trainer.jpg', '/trainer.png'];

// Tries trainer.mp4 (video) → trainer.jpg/.png (photo) → monogram placeholder.
// Video is skipped under reduced motion so it never autoplays against preference.
function TrainerMedia() {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [videoOk, setVideoOk] = useState(!reduced);
  const [imgIdx, setImgIdx] = useState(0);

  if (videoOk) {
    return (
      <video
        className="trainer-vid"
        src="/trainer.mp4"
        poster="/trainer-poster.jpg"
        muted
        loop
        playsInline
        autoPlay
        onError={() => setVideoOk(false)}
      />
    );
  }
  if (imgIdx < IMG_CANDIDATES.length) {
    return (
      <img
        className="trainer-img"
        src={IMG_CANDIDATES[imgIdx]}
        alt="Durgesh — Founder and Head Coach at DRC Fitness"
        onError={() => setImgIdx((i) => i + 1)}
      />
    );
  }
  return <div className="trainer-ph" aria-hidden="true">DR</div>;
}

export function Trainer() {
  const ref = useGsapReveal();
  const mediaRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // Wipe the portrait in from the bottom.
      gsap.fromTo(
        mediaRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: mediaRef.current, start: 'top 78%' },
        }
      );
      // Slow parallax drift on the media inside its frame.
      gsap.to(innerRef.current, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: mediaRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [ref]);

  return (
    <section className="trainer" id="trainer" ref={ref}>
      <div className="trainer-stage">
        <div className="trainer-bigname chrome-text" aria-hidden="true">Durgesh</div>
        <div className="trainer-media" ref={mediaRef}>
          <div className="trainer-media-inner" ref={innerRef}>
            <TrainerMedia />
          </div>
          <div className="trainer-media-scan" aria-hidden="true" />
          <span className="trainer-photo-label">Founder · Head Coach</span>
          <div className="trainer-chip trainer-chip-1">
            <span className="trainer-chip-num chrome-text">20+</span>
            <span className="trainer-chip-label">Years coaching</span>
          </div>
          <div className="trainer-chip trainer-chip-2">
            <span className="trainer-chip-num chrome-text">1:1</span>
            <span className="trainer-chip-label">Coach-led</span>
          </div>
        </div>
      </div>

      <div className="trainer-content">
        <div className="section-kicker" style={{ marginBottom: 8 }}>
          <span className="section-ghost" aria-hidden="true">02</span>
          <span className="mono-label section-num" data-reveal>The Coach</span>
        </div>
        <h2 className="trainer-headline" data-reveal>
          Two decades on the floor. <em>Every session</em> still earned.
        </h2>
        <div className="trainer-body">
          <p data-reveal>
            DRC was built on a belief that personal training should be exactly that —
            <em> personal</em>. Not a script. Not a copy-pasted block from a coaching app.
            A program written for your body, your history, and the way you actually move.
          </p>
          <p data-reveal>
            Over twenty years of coaching has shaped a method that draws from Olympic
            variations, classical strength and conditioning, hypertrophy work, and the
            kind of corrective movement most facilities never get around to. Female
            athletic training is a particular focus — specialised, evidence-led, and rare
            in this city.
          </p>
        </div>
        <div className="creds-grid">
          <div className="cred-item" data-reveal>
            <div className="cred-label">Specialty</div>
            <div className="cred-val">Olympic <em>Variations</em></div>
          </div>
          <div className="cred-item" data-reveal>
            <div className="cred-label">Method</div>
            <div className="cred-val">GPS <em>Programming</em></div>
          </div>
          <div className="cred-item" data-reveal>
            <div className="cred-label">Focus</div>
            <div className="cred-val">Strength &amp; <em>Hypertrophy</em></div>
          </div>
          <div className="cred-item" data-reveal>
            <div className="cred-label">Recovery</div>
            <div className="cred-val">Theragun <em>Therapy</em></div>
          </div>
        </div>
      </div>
    </section>
  );
}
