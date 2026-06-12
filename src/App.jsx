import React from 'react';
import './index.css';

// Hooks
import { useIstClock } from './hooks/useIstClock';
import { useScrolled } from './hooks/useScrolled';
import { useLenis } from './hooks/useLenis';

// Experience layer
import { Preloader } from './components/Preloader';
import { GrainOverlay } from './components/GrainOverlay';
import { CustomCursor } from './components/CustomCursor';

// Components
import { ProgressBar } from './components/ProgressBar';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Services } from './components/Services';
import { Trainer } from './components/Trainer';
import { Equipment } from './components/Equipment';
import { Testimonials } from './components/Testimonials';
import { Community } from './components/Community';
import { Film } from './components/Film';
import { Visit } from './components/Visit';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';

export default function DRCFitness() {
  useLenis();
  const { scrolled, scrollProgress, activeSection } = useScrolled(40);
  const time = useIstClock();

  return (
    <div className="drc-root">
      <Preloader />
      <GrainOverlay />
      <CustomCursor />
      <ProgressBar progress={scrollProgress} />

      <header>
        <Nav scrolled={scrolled} activeSection={activeSection} />
      </header>

      <main>
        <Hero time={time} />
        <Marquee />
        <Services />
        <Trainer />
        <Equipment />
        <Film />
        <Testimonials />
        <Community />
        <Visit />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
