import React, { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '../lib/constants';

export function Nav({ scrolled, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div 
        className={`mobile-overlay ${menuOpen ? "open" : ""}`} 
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <button className="nav-logo" onClick={(e) => scrollTo(e, "top")}>DRC<span className="dot">.</span>Fitness</button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <button className={`nav-link ${activeSection === "philosophy" ? "active" : ""}`} onClick={(e) => scrollTo(e, "philosophy")}>Philosophy</button>
          <button className={`nav-link ${activeSection === "services" ? "active" : ""}`} onClick={(e) => scrollTo(e, "services")}>Training</button>
          <button className={`nav-link ${activeSection === "trainer" ? "active" : ""}`} onClick={(e) => scrollTo(e, "trainer")}>Trainer</button>
          <button className={`nav-link ${activeSection === "equipment" ? "active" : ""}`} onClick={(e) => scrollTo(e, "equipment")}>Equipment</button>
          <button className={`nav-link ${activeSection === "visit" ? "active" : ""}`} onClick={(e) => scrollTo(e, "visit")}>Visit</button>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="nav-cta">
            <MessageCircle size={14} /> Book a Session
          </a>
        </div>
        <button 
          className="menu-btn" 
          onClick={() => setMenuOpen(!menuOpen)} 
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
    </>
  );
}
