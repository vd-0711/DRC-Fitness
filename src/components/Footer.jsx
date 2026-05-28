import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { WHATSAPP_URL, STUDIO_PHONE_LINK, INSTAGRAM_LINK } from '../lib/constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

import { Marquee } from './Marquee';

export function Footer() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <footer className="footer" ref={ref}>
      <div className={`fade-up ${isIntersecting ? "visible" : ""}`} style={{ margin: '0 -40px 40px' }}>
        <Marquee />
      </div>
      <div className={`footer-bottom fade-up ${isIntersecting ? "visible" : ""}`} style={{ transitionDelay: "200ms" }}>
        <div>© {new Date().getFullYear()} DRC Fitness · Pune · All rights reserved</div>
        <div className="footer-social">
          <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer" aria-label="Instagram">
            <InstagramIcon size={18} />
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <MessageCircle size={18} aria-hidden="true" />
          </a>
          <a href={STUDIO_PHONE_LINK} aria-label="Phone">
            <Phone size={18} aria-hidden="true" />
          </a>
        </div>
        <div>The DRC Way</div>
      </div>
    </footer>
  );
}
