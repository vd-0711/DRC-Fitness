import React from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import { testimonials, REVIEWS_LINK } from '../lib/constants';
import { useGsapReveal } from '../hooks/useGsapReveal';

export function Testimonials() {
  const ref = useGsapReveal();

  return (
    <section className="testimonials" ref={ref}>
      <div className="section-head">
        <div className="section-kicker">
          <span className="section-ghost" aria-hidden="true">04</span>
          <span className="mono-label section-num" data-reveal>Voices</span>
        </div>
        <h2 className="section-title" data-reveal>What members <em>actually</em> say.</h2>
      </div>
      <div className="test-grid">
        {testimonials.map((t, i) => (
          <div className="test-card" data-reveal key={i}>
            <div className="test-quote-mark" aria-hidden="true">"</div>
            <p className="test-quote">{t.q}</p>
            <div className="test-author">{t.a}</div>
          </div>
        ))}
      </div>

      {/* GOOGLE REVIEWS LIVE WIDGET SLOT */}
      <div className="reviews-summary" data-reveal style={{ marginTop: 60 }}>
        <div>
          <div className="reviews-rating">5.0</div>
          <div className="reviews-stars" aria-label="5 out of 5 stars">
            {[1, 2, 3, 4, 5].map((n) => <Star key={n} size={16} aria-hidden="true" />)}
          </div>
          <div className="mono-label" style={{ opacity: 0.6, marginTop: 4 }}>
            Verified Google Rating
          </div>
        </div>
        <div className="reviews-text">
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, lineHeight: 1.4 }}>
            See live reviews from our members on Google.
          </div>
          <div className="widget-slot-note">
            {/* ▼▼▼ WIDGET SLOT: replace this block with your Elfsight / EmbedSocial / Trustmary script tag for live Google reviews ▼▼▼ */}
            ↓ Live Google reviews widget loads here once installed
          </div>
        </div>
        <a href={REVIEWS_LINK} target="_blank" rel="noreferrer" className="btn-primary">
          <span className="btn-inner">Read on Google <ArrowUpRight size={16} aria-hidden="true" /></span>
        </a>
      </div>
    </section>
  );
}
