import React from 'react';
import { LoopVideo } from './LoopVideo';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export function ShowcaseVideo() {
  const [ref, isIntersecting] = useIntersectionObserver();

  return (
    <section className="showcase-video" id="showcase" ref={ref} style={{ padding: 0, height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div className={`fade-up ${isIntersecting ? "visible" : ""}`} style={{ width: '100%', height: '100%' }}>
        <LoopVideo 
          src="/video/showcase.mp4"
          poster="/video/showcase-poster.jpg"
          lazyPlay={true}
          style={{ width: '100%', height: '100%' }}
          aspectRatio="auto"
        />
      </div>
    </section>
  );
}
