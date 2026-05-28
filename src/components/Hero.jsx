import React, { useEffect, useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '../lib/constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export function Hero({ time }) {
  const [heroRef, heroIntersecting] = useIntersectionObserver();
  const [counterRef, counterIntersecting] = useIntersectionObserver({ threshold: 0.5 });
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Only track if it's not a touch device
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (counterIntersecting) {
      let start = 0;
      const end = 20;
      const duration = 1500;
      const incrementTime = duration / end;
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
      
      return () => clearInterval(timer);
    }
  }, [counterIntersecting]);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div 
        className="hero-glow"
        style={{ left: mousePos.x, top: mousePos.y }}
        aria-hidden="true"
      />
      
      <div className={`hero-meta fade-up ${heroIntersecting ? "visible" : ""}`} style={{ transitionDelay: "100ms" }}>
        <div className="hero-meta-item mono-label">
          <span className="pulse-dot"></span> Studio Open · {time}
        </div>
        <div className="hero-meta-item mono-label">
          Wadgaon Sheri · Pune · 411014
        </div>
      </div>

      <div className={`hero-headline fade-up ${heroIntersecting ? "visible" : ""}`} style={{ transitionDelay: "300ms" }}>
        <div className="hero-eyebrow mono-label">A Private Training Studio</div>
        <h1 className="hero-title">
          <span className="stack">Train</span>
          <span className="stack indent"><em>with</em> intent.</span>
        </h1>
      </div>

      <div className={`hero-bottom fade-up ${heroIntersecting ? "visible" : ""}`} style={{ transitionDelay: "500ms" }}>
        <p className="hero-desc">
          DRC Fitness is a private, coach-led studio in Pune built around twenty years of experience,
          Technogym apparatus, and programming you won't get on a gym floor.
        </p>
        <div className="hero-stat" ref={counterRef}>
          <div className="hero-stat-num">{count}+</div>
          <div className="hero-stat-label">Years of Coaching</div>
        </div>
        <div className="hero-cta-group">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-primary btn-wa">
            <MessageCircle size={18} /> Book on WhatsApp <ArrowUpRight size={18} />
          </a>
          <span className="mono-label" style={{ opacity: 0.5 }}>No memberships. Just method.</span>
        </div>
      </div>
    </section>
  );
}
