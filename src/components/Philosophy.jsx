import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export function Philosophy() {
  const [ref, isIntersecting] = useIntersectionObserver();

  return (
    <section className="philosophy" id="philosophy" ref={ref}>
      <div className={`section-head fade-up ${isIntersecting ? "visible" : ""}`}>
        <div><div className="mono-label section-num">— 01 / Philosophy</div></div>
        <h2 className="section-title">Three words. <em>One way</em> to train.</h2>
      </div>
      <div className="philo-grid">
        <div className={`philo-card fade-up ${isIntersecting ? "visible" : ""}`} style={{ transitionDelay: "100ms" }}>
          <div className="philo-word">Drive<em>.</em></div>
          <p className="philo-text">The will to show up when no one's watching. We build it in the warm-up and demand it under the bar.</p>
        </div>
        <div className={`philo-card fade-up ${isIntersecting ? "visible" : ""}`} style={{ transitionDelay: "200ms" }}>
          <div className="philo-word"><em>Re</em>build<em>.</em></div>
          <p className="philo-text">Posture, alignment, recovery. We address the layers under the surface so the work you do compounds instead of breaking you.</p>
        </div>
        <div className={`philo-card fade-up ${isIntersecting ? "visible" : ""}`} style={{ transitionDelay: "300ms" }}>
          <div className="philo-word">Conquer<em>.</em></div>
          <p className="philo-text">Strength you carry off the floor. Hypertrophy that holds. Conditioning for the life you actually live.</p>
        </div>
      </div>
    </section>
  );
}
