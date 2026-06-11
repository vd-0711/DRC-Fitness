import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../lib/constants';
import { useGsapReveal } from '../hooks/useGsapReveal';

export function Services() {
  const ref = useGsapReveal();

  return (
    <section id="services" ref={ref}>
      <div className="section-head">
        <div className="section-kicker">
          <span className="section-ghost" aria-hidden="true">01</span>
          <span className="mono-label section-num" data-reveal>Training</span>
        </div>
        <h2 className="section-title" data-reveal>Programming, <em>not</em> programs.</h2>
      </div>
      <div className="services-list">
        {services.map((s) => (
          <div className="service-row" data-reveal key={s.id}>
            <span className="service-num">{s.n}</span>
            <h3 className="service-title">{s.t}</h3>
            <p className="service-desc">{s.d}</p>
            <ArrowUpRight size={28} strokeWidth={1.2} className="service-arrow" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}
