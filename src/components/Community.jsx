import React from 'react';
import { useGsapReveal } from '../hooks/useGsapReveal';

// Full-bleed group photo band — the human counterweight to the chrome.
export function Community() {
  const ref = useGsapReveal();
  return (
    <section className="community" id="community" ref={ref}>
      <img
        className="community-img"
        src="/community.jpg"
        alt="The DRC Fitness community"
        loading="lazy"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      <div className="community-overlay" aria-hidden="true" />
      <div className="community-content">
        <span className="mono-label section-num" data-reveal>— The people</span>
        <h2 className="community-title chrome-text" data-reveal>
          Private doesn't mean <em>alone.</em>
        </h2>
        <p className="community-lead" data-reveal>
          It means the room knows your name, your goals, and exactly where you left
          off last week. A small, serious community — not a crowd.
        </p>
      </div>
    </section>
  );
}
