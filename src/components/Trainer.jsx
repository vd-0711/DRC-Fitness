import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export function Trainer() {
  const [ref, isIntersecting] = useIntersectionObserver();

  return (
    <section className="trainer" id="trainer" ref={ref}>
      <div className={`trainer-meta fade-up ${isIntersecting ? "visible" : ""}`}>
        <div className="trainer-photo-block">
          <span className="trainer-photo-label">Founder · Head Coach</span>
        </div>
        <div className="trainer-name">Durgesh</div>
        <div className="trainer-role">Founder · Head Coach · DRC Fitness</div>
      </div>
      <div className="trainer-content">
        <div className={`mono-label section-num fade-up ${isIntersecting ? "visible" : ""}`} style={{ transitionDelay: "100ms" }}>— 03 / The Coach</div>
        <h2 className={`trainer-headline fade-up ${isIntersecting ? "visible" : ""}`} style={{ transitionDelay: "200ms" }}>
          Two decades on the floor. <em>Every session</em> still earned.
        </h2>
        <div className={`trainer-body fade-up ${isIntersecting ? "visible" : ""}`} style={{ transitionDelay: "300ms" }}>
          <p>
            DRC was built on a belief that personal training should be exactly that —
            <em> personal</em>. Not a script. Not a copy-pasted block from a coaching app.
            A program written for your body, your history, and the way you actually move.
          </p>
          <p>
            Over twenty years of coaching has shaped a method that draws from Olympic
            variations, classical strength and conditioning, hypertrophy work, and the
            kind of corrective movement most facilities never get around to. Female
            athletic training is a particular focus — specialised, evidence-led, and rare
            in this city.
          </p>
        </div>
        <div className={`creds-grid fade-up ${isIntersecting ? "visible" : ""}`} style={{ transitionDelay: "400ms" }}>
          <div className="cred-item">
            <div className="cred-label">Specialty</div>
            <div className="cred-val">Olympic <em>Variations</em></div>
          </div>
          <div className="cred-item">
            <div className="cred-label">Method</div>
            <div className="cred-val">GPS <em>Programming</em></div>
          </div>
          <div className="cred-item">
            <div className="cred-label">Focus</div>
            <div className="cred-val">Strength &amp; <em>Hypertrophy</em></div>
          </div>
          <div className="cred-item">
            <div className="cred-label">Recovery</div>
            <div className="cred-val">Theragun <em>Therapy</em></div>
          </div>
        </div>
      </div>
    </section>
  );
}
