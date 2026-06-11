import React from 'react';
import { MessageCircle, Phone, MapPin, Clock } from 'lucide-react';
import { WHATSAPP_URL, STUDIO_ADDRESS_LINK, STUDIO_PHONE, STUDIO_PHONE_LINK, INSTAGRAM_LINK } from '../lib/constants';
import { InstagramIcon } from './InstagramIcon';
import { useGsapReveal } from '../hooks/useGsapReveal';
import { useMagnetic } from '../hooks/useMagnetic';

export function Visit() {
  const ref = useGsapReveal();
  const waRef = useMagnetic({ strength: 0.4 });

  return (
    <section className="visit" id="visit" ref={ref}>
      <div>
        <div className="section-kicker" style={{ marginBottom: 28 }}>
          <span className="section-ghost" aria-hidden="true">05</span>
          <span className="mono-label section-num" data-reveal>Visit</span>
        </div>
        <h2 className="visit-headline" data-reveal>Come <em>train</em> with us.</h2>
        <p className="hero-desc" data-reveal style={{ maxWidth: 440, marginBottom: 32 }}>
          Book a trial session, take a tour of the studio, or just message to ask
          what we do. We'll walk you through how we'd build your program.
        </p>
        <div data-reveal style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a ref={waRef} href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-primary" data-cursor-label="Book">
            <span className="btn-inner" data-magnetic-inner><MessageCircle size={18} aria-hidden="true" /> Message on WhatsApp</span>
          </a>
          <a href={STUDIO_PHONE_LINK} className="btn-primary btn-ghost">
            <span className="btn-inner"><Phone size={16} aria-hidden="true" /> Call Us</span>
          </a>
        </div>
      </div>
      <div className="visit-info">
        <div className="visit-info-row" data-reveal>
          <MapPin size={20} className="visit-info-icon" strokeWidth={1.5} aria-hidden="true" />
          <div>
            <div className="visit-info-label">Studio</div>
            <div className="visit-info-val">
              <a href={STUDIO_ADDRESS_LINK} target="_blank" rel="noreferrer">
                Bramha Corp Business Park,<br />
                Digambar Nagar, Wadgaon Sheri,<br />
                Pune, Maharashtra 411014
              </a>
            </div>
          </div>
        </div>
        <div className="visit-info-row" data-reveal>
          <Clock size={20} className="visit-info-icon" strokeWidth={1.5} aria-hidden="true" />
          <div>
            <div className="visit-info-label">Hours</div>
            <div className="visit-info-val">
              Monday — Saturday<br />
              6:00 AM — 12:00 PM<br />
              5:00 PM — 10:00 PM<br />
              <span style={{ opacity: 0.5, fontSize: 16 }}>Sunday closed</span>
            </div>
          </div>
        </div>
        <div className="visit-info-row" data-reveal>
          <MessageCircle size={20} className="visit-info-icon" strokeWidth={1.5} aria-hidden="true" />
          <div>
            <div className="visit-info-label">Call &amp; WhatsApp</div>
            <div className="visit-info-val">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">{STUDIO_PHONE}</a>
            </div>
          </div>
        </div>
        <div className="visit-info-row" data-reveal>
          <InstagramIcon size={20} className="visit-info-icon" strokeWidth={1.5} />
          <div>
            <div className="visit-info-label">Follow</div>
            <div className="visit-info-val">
              <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer">@drcfitnesspune</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
