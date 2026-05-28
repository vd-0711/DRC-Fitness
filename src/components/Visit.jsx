import React from 'react';
import { MessageCircle, Phone, MapPin, Clock } from 'lucide-react';
import { WHATSAPP_URL, STUDIO_ADDRESS_LINK, STUDIO_PHONE, STUDIO_PHONE_LINK, INSTAGRAM_LINK } from '../lib/constants';
import { InstagramIcon } from './InstagramIcon';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export function Visit() {
  const [ref, isIntersecting] = useIntersectionObserver();

  return (
    <section className="visit" id="visit" ref={ref}>
      <div className={`fade-up ${isIntersecting ? "visible" : ""}`}>
        <div className="mono-label section-num" style={{ marginBottom: 24 }}>— 06 / Visit</div>
        <h2 className="visit-headline">Come <em>train</em> with us.</h2>
        <p className="hero-desc" style={{ maxWidth: 440, marginBottom: 32 }}>
          Book a trial session, take a tour of the studio, or just message to ask
          what we do. We'll walk you through how we'd build your program.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-primary btn-wa">
            <MessageCircle size={18} aria-hidden="true" /> WhatsApp Us
          </a>
          <a href={STUDIO_PHONE_LINK} className="btn-primary" style={{ background: "transparent", color: "var(--paper)", border: "1px solid var(--line-strong)" }}>
            <Phone size={16} aria-hidden="true" /> Call Studio
          </a>
        </div>
      </div>
      <div className={`visit-info fade-up ${isIntersecting ? "visible" : ""}`} style={{ transitionDelay: "200ms" }}>
        <div className="visit-info-row">
          <MapPin size={20} className="visit-info-icon" strokeWidth={1.5} aria-hidden="true" />
          <div>
            <div className="visit-info-label">Studio</div>
            <div className="visit-info-val">
              <a
                href={STUDIO_ADDRESS_LINK}
                target="_blank"
                rel="noreferrer"
              >
                Bramha Corp Business Park,<br />
                Digambar Nagar, Wadgaon Sheri,<br />
                Pune, Maharashtra 411014
              </a>
            </div>
          </div>
        </div>
        <div className="visit-info-row">
          <Clock size={20} className="visit-info-icon" strokeWidth={1.5} aria-hidden="true" />
          <div>
            <div className="visit-info-label">Hours</div>
            <div className="visit-info-val">
              Monday — Saturday<br />
              7:00 AM — 8:30 PM<br />
              <span style={{ opacity: 0.5, fontSize: 16 }}>Sunday closed</span>
            </div>
          </div>
        </div>
        <div className="visit-info-row">
          <MessageCircle size={20} className="visit-info-icon" strokeWidth={1.5} aria-hidden="true" />
          <div>
            <div className="visit-info-label">WhatsApp</div>
            <div className="visit-info-val">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">+91 89833 85345</a>
            </div>
          </div>
        </div>
        <div className="visit-info-row">
          <Phone size={20} className="visit-info-icon" strokeWidth={1.5} aria-hidden="true" />
          <div>
            <div className="visit-info-label">Studio line</div>
            <div className="visit-info-val">
              <a href={STUDIO_PHONE_LINK}>{STUDIO_PHONE}</a>
            </div>
          </div>
        </div>
        <div className="visit-info-row">
          <InstagramIcon size={20} className="visit-info-icon" strokeWidth={1.5} />
          <div>
            <div className="visit-info-label">Follow</div>
            <div className="visit-info-val">
              <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer">
                @drcfitnesspune
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
