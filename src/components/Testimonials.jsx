import React from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import { testimonials, REVIEWS_LINK } from '../lib/constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export function Testimonials() {
  const [ref, isIntersecting] = useIntersectionObserver();

  return (
    <section className="testimonials" ref={ref}>
      <div className={`section-head fade-up ${isIntersecting ? "visible" : ""}`}>
        <div><div className="mono-label section-num">— 05 / Voices</div></div>
        <h2 className="section-title">What members <em>actually</em> say.</h2>
      </div>
      <div className="test-grid">
        {testimonials.map((t, i) => (
          <div className={`test-card fade-up ${isIntersecting ? "visible" : ""}`} style={{ transitionDelay: `${i * 100}ms` }} key={i}>
            <div className="test-quote-mark" aria-hidden="true">"</div>
            <p className="test-quote">{t.q}</p>
            <div className="test-author">{t.a}</div>
          </div>
        ))}
      </div>

      {/* GOOGLE REVIEWS LIVE WIDGET SLOT */}
      <div className={`reviews-summary fade-up ${isIntersecting ? "visible" : ""}`} style={{ marginTop: 60, transitionDelay: "400ms" }}>
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
          <div style={{ fontFamily: "Fraunces, serif", fontSize: 22, lineHeight: 1.4 }}>
            See live reviews from our members on Google.
          </div>
          <div className="widget-slot-note">
            {/* ▼▼▼ WIDGET SLOT: replace this block with your Elfsight / EmbedSocial / Trustmary script tag for live Google reviews ▼▼▼ */}
            ↓ Live Google reviews widget loads here once installed
          </div>
        </div>
        <a
          href={REVIEWS_LINK}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
        >
          Read on Google <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
