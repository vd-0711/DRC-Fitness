import React, { useCallback, useEffect, useState } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { LOCAL_IMAGES, fetchDriveImages } from '../lib/galleryImages';

// Standalone gallery page (served at /gallery.html). Uses Drive photos when
// configured, otherwise the local src/gallery folder.
export function GalleryPage() {
  const [images, setImages] = useState(LOCAL_IMAGES);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let alive = true;
    fetchDriveImages().then((urls) => {
      if (alive && urls && urls.length) setImages(urls);
    });
    return () => { alive = false; };
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!open) return;
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
    };
  }, [open, close, prev, next]);

  return (
    <div className="drc-root">
      <header className="gallerypage-nav">
        <a className="nav-logo" href="/">
          <img src="/logo.png" alt="DRC Fitness" className="nav-logo-img" onError={(e) => { e.target.style.display = 'none'; }} />
          <span className="nav-logo-text chrome-text">DRC<span className="dot">.</span>Fitness</span>
        </a>
        <a className="gallerypage-back" href="/"><ArrowLeft size={16} /> Back to site</a>
      </header>

      <main className="gallerypage">
        <div className="gallerypage-head">
          <span className="mono-label section-num">— In Action</span>
          <h1 className="section-title">Real sessions. <em>Real people.</em></h1>
        </div>

        {images.length === 0 ? (
          <p className="gallerypage-empty">Photos coming soon.</p>
        ) : (
          <div className="gallerypage-grid">
            {images.map((src, i) => (
              <button
                className="gallery-tile"
                key={src + i}
                onClick={() => { setIndex(i); setOpen(true); }}
                aria-label={`Open photo ${i + 1}`}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </main>

      {open && images.length > 0 && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button className="lightbox-close" onClick={close} aria-label="Close"><X size={24} /></button>
          {images.length > 1 && (
            <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">
              <ArrowLeft size={26} />
            </button>
          )}
          <img className="lightbox-img" src={images[index]} alt="" onClick={(e) => e.stopPropagation()} />
          {images.length > 1 && (
            <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">
              <ArrowRight size={26} />
            </button>
          )}
          <div className="lightbox-count mono-label">{index + 1} / {images.length}</div>
        </div>
      )}
    </div>
  );
}
