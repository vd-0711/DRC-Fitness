import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '../lib/constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useMagnetic } from '../hooks/useMagnetic';
import { enableParticles } from '../lib/capabilities';
import { ErrorBoundary } from './ErrorBoundary';
import { gsap } from 'gsap';

const ParticleField = lazy(() => import('../three/ParticleField'));

function HeroGlow() {
  return (
    <div
      className="hero-canvas"
      aria-hidden="true"
      style={{
        background:
          'radial-gradient(ellipse 50% 40% at 50% 42%, rgba(255,106,0,0.16) 0%, transparent 70%)',
      }}
    />
  );
}

export function Hero({ time }) {
  const sectionRef = useRef(null);
  const [counterRef, counterIntersecting] = useIntersectionObserver({ threshold: 0.5 });
  const [count, setCount] = useState(0);
  const [withParticles] = useState(() => enableParticles());
  const ctaRef = useMagnetic({ strength: 0.5 });

  // Count-up for the "years of coaching" stat.
  useEffect(() => {
    if (!counterIntersecting) return;
    let start = 0;
    const end = 20;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, 1500 / end);
    return () => clearInterval(timer);
  }, [counterIntersecting]);

  // Hero intro: stagger the framing text in; the particle mark is the headline.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.set('[data-hero-fade]', { opacity: 0, y: 24 });
      gsap.to('[data-hero-fade]', {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.4,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={sectionRef}>
      {withParticles ? (
        <ErrorBoundary fallback={<HeroGlow />}>
          <Suspense fallback={<HeroGlow />}>
            <ParticleField />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <HeroGlow />
      )}
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-meta" data-hero-fade>
        <div className="hero-meta-item">
          <span className="pulse-dot" aria-hidden="true" /> Pune · By appointment
        </div>
        <div className="hero-meta-item">IST&nbsp;{time}</div>
      </div>

      <div className="hero-bottom">
        <div className="hero-desc-col">
          <div className="hero-eyebrow mono-label" data-hero-fade>A Private Training Studio</div>
          <p className="hero-desc" data-hero-fade>
            DRC Fitness is a private, coach-led studio in Pune built around twenty years of
            experience, Technogym apparatus, and programming you won't get on a gym floor.
          </p>
        </div>
        <div className="hero-stat" ref={counterRef} data-hero-fade>
          <div className="hero-stat-num chrome-text">{count}+</div>
          <div className="hero-stat-label">Years of Coaching</div>
        </div>
        <div className="hero-cta-group" data-hero-fade>
          <a
            ref={ctaRef}
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            data-cursor-label="Book"
          >
            <span className="btn-inner" data-magnetic-inner>
              <MessageCircle size={18} /> Book a Trial <ArrowUpRight size={18} />
            </span>
          </a>
          <span className="mono-label" style={{ opacity: 0.5 }}>No memberships. Just method.</span>
        </div>
      </div>
    </section>
  );
}
