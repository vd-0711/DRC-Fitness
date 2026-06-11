import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { WHATSAPP_URL, STUDIO_PHONE_LINK, INSTAGRAM_LINK } from '../lib/constants';
import { useGsapReveal } from '../hooks/useGsapReveal';
import { Marquee } from './Marquee';

export function Footer() {
  const ref = useGsapReveal();

  return (
    <footer className="footer" ref={ref}>
      <div style={{ margin: '0 -40px 40px' }}>
        <Marquee />
      </div>
      <div className="footer-mega chrome-text" data-reveal>
        Train with <em>intent.</em>
      </div>
      <div className="footer-bottom" data-reveal>
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
