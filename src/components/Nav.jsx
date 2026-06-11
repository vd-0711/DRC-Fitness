import React, { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '../lib/constants';
import { scrollToSection } from '../hooks/useLenis';
import { useMagnetic } from '../hooks/useMagnetic';

const LINKS = [
  { id: 'services', label: 'Training' },
  { id: 'trainer', label: 'Trainer' },
  { id: 'equipment', label: 'Equipment' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'visit', label: 'Visit' },
];

export function Nav({ scrolled, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ctaRef = useMagnetic({ strength: 0.4 });

  const go = (id) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <div
        className={`mobile-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <button className="nav-logo" onClick={() => go('top')}>
          <img
            src="/logo.png"
            alt="DRC Fitness Logo"
            className="nav-logo-img"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span className="nav-logo-text chrome-text">DRC<span className="dot">.</span>Fitness</span>
        </button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {LINKS.map((l) => (
            <button
              key={l.id}
              className={`nav-link ${activeSection === l.id ? 'active' : ''}`}
              onClick={() => go(l.id)}
            >
              {l.label}
            </button>
          ))}
          <a
            ref={ctaRef}
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="nav-cta desktop-only"
            data-cursor-label="Book"
          >
            <span className="nav-cta-inner" data-magnetic-inner>
              <MessageCircle size={14} /> Book a Session
            </span>
          </a>
        </div>
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
    </>
  );
}
