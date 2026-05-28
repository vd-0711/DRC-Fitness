import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../lib/constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export function Services() {
  const [ref, isIntersecting] = useIntersectionObserver();

  return (
    <section id="services" ref={ref}>
      <div className={`section-head fade-up ${isIntersecting ? "visible" : ""}`}>
        <div><div className="mono-label section-num">— 02 / Training</div></div>
        <h2 className="section-title">Programming, <em>not</em> programs.</h2>
      </div>
      <div className="services-list">
        {services.map((s, idx) => (
          <div 
            className={`service-row fade-up ${isIntersecting ? "visible" : ""}`} 
            key={s.id}
            style={{ transitionDelay: `${(idx + 1) * 100}ms` }}
          >
            <span className="service-num mono-label">{s.n}</span>
            <h3 className="service-title">{s.t}</h3>
            <p className="service-desc">{s.d}</p>
            <ArrowUpRight size={28} strokeWidth={1.2} className="service-arrow" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}
