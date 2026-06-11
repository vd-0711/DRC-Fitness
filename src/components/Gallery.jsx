import React, { useCallback, useEffect, useState } from 'react';
import { X, ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import { useGsapReveal } from '../hooks/useGsapReveal';
import { stopScroll, startScroll } from '../hooks/useLenis';

// Auto-load every image in /src/gallery. To add or remove gallery photos, just
// drop files into that folder (or delete them) — no code changes needed.
const modules = import.meta.glob('../gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const IMAGES = Object.keys(modules).sort().map((k) => modules[k]);

const PREVIEW = 6;

export function Gallery() {
  const ref = useGsapReveal();
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % IMAGES.length), []);

  useEffect(() => {
    if (!open) return;
    stopScroll();
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      startScroll();
    };
  }, [open, close, prev, next]);

  if (!IMAGES.length) return null;

  const shown = showAll ? IMAGES : IMAGES.slice(0, PREVIEW);

  return (
    <section className="gallery" id="gallery" ref={ref}>
      <div className="section-head">
        <div><span className="mono-label section-num" data-reveal>— In Action</span></div>
        <h2 className="section-title" data-reveal>Real sessions. <em>Real people.</em></h2>
      </div>

      <div className="gallery-grid">
        {shown.map((src, i) => (
          <button
            className="gallery-tile"
            data-reveal
            key={src}
            onClick={() => { setIndex(i); setOpen(true); }}
            data-cursor-label="View"
            aria-label={`Open photo ${i + 1}`}
          >
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>

      {!showAll && IMAGES.length > PREVIEW && (
        <div className="gallery-more-wrap">
          <button className="btn-primary btn-ghost" onClick={() => setShowAll(true)}>
            <span className="btn-inner"><Plus size={16} /> View all {IMAGES.length} photos</span>
          </button>
        </div>
      )}

      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button className="lightbox-close" onClick={close} aria-label="Close gallery"><X size={24} /></button>
          {IMAGES.length > 1 && (
            <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous photo">
              <ArrowLeft size={26} />
            </button>
          )}
          <img className="lightbox-img" src={IMAGES[index]} alt="" onClick={(e) => e.stopPropagation()} />
          {IMAGES.length > 1 && (
            <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next photo">
              <ArrowRight size={26} />
            </button>
          )}
          <div className="lightbox-count mono-label">{index + 1} / {IMAGES.length}</div>
        </div>
      )}
    </section>
  );
}
