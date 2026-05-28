import React from 'react';
import './index.css';

// Hooks
import { useIstClock } from './hooks/useIstClock';
import { useScrolled } from './hooks/useScrolled';

// Components
import { ProgressBar } from './components/ProgressBar';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { ShowcaseVideo } from './components/ShowcaseVideo';
import { Marquee } from './components/Marquee';
import { Philosophy } from './components/Philosophy';
import { Services } from './components/Services';
import { Trainer } from './components/Trainer';
import { Equipment } from './components/Equipment';
import { Testimonials } from './components/Testimonials';
import { Visit } from './components/Visit';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';

export default function DRCFitness() {
  const { scrolled, scrollProgress, activeSection } = useScrolled(40);
  const time = useIstClock();

  return (
    <div className="drc-root">
      <ProgressBar progress={scrollProgress} />
      
      <header>
        <Nav scrolled={scrolled} activeSection={activeSection} />
      </header>

      <main>
        <Hero time={time} />
        <ShowcaseVideo />
        <Marquee />
        <Philosophy />
        <Services />
        <Trainer />
        <Equipment />
        <Testimonials />
        <Visit />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}