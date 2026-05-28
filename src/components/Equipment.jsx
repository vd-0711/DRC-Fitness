import React, { useRef, useState, useEffect } from 'react';
import { equipment } from '../lib/constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

function EquipCard({ e, i }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("none");
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches);
  }, []);

  const handleMouseMove = (e) => {
    if (!isDesktop || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max rotation 6deg
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform("none");
  };

  return (
    <div 
      className="equip-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: isHovered ? 'none' : 'transform 0.5s ease' }}
    >
      <div className="equip-card-content">
        <div className="equip-num">{String(i + 1).padStart(2, "0")}</div>
        <div>
          <div className="equip-name">{e}</div>
          <div className="equip-tag" style={{ marginTop: 12 }}>
            {i < 3 ? "Performance Suite" : i < 6 ? "Strength Suite" : "Recovery & Support"}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Equipment() {
  const [ref, isIntersecting] = useIntersectionObserver();

  return (
    <section className="equipment" id="equipment" ref={ref}>
      <div className={`section-head fade-up ${isIntersecting ? "visible" : ""}`}>
        <div><div className="mono-label section-num">— 04 / Equipment</div></div>
        <h2 className="section-title">Apparatus that <em>earns</em> its floor space.</h2>
      </div>
      <p className={`equip-note fade-up ${isIntersecting ? "visible" : ""}`} style={{ transitionDelay: "100ms" }}>
        Our studio features <em>Technogym</em> machines and specialised equipment — several
        introduced in Pune for the first time at DRC. Every piece was chosen because it lets
        you load, move, and recover with a precision the average gym floor doesn't allow.
      </p>
      <div className="equip-grid" style={{ marginTop: 60 }}>
        {equipment.map((e, i) => (
          <div className={`fade-up ${isIntersecting ? "visible" : ""}`} style={{ transitionDelay: `${200 + (i % 3) * 100}ms` }} key={e}>
            <EquipCard e={e} i={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
