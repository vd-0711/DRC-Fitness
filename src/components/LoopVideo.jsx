import React, { useRef, useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/*
 * RECOMMENDED ENCODING SETTINGS:
 * - Codec: H.264 (MP4 container)
 * - Resolution: 1080px on the longest edge
 * - Bitrate: ~2 Mbps
 * - Target File Size: 1-4MB per clip
 * 
 * Recommended Tool: Handbrake (https://handbrake.fr/)
 * Preset: Fast 1080p30, then adjust Video tab -> Avg Bitrate to 2000 kbps
 */

export function LoopVideo({ 
  src, 
  srcMobile, 
  poster, 
  aspectRatio = "auto", 
  lazyPlay = true, 
  className = "", 
  overlay 
}) {
  const [targetRef, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const videoRef = useRef(null);
  const [error, setError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && videoRef.current) {
        videoRef.current.pause();
      } else if (!document.hidden && videoRef.current && isIntersecting && !prefersReducedMotion) {
        videoRef.current.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isIntersecting, prefersReducedMotion]);

  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isIntersecting && !prefersReducedMotion && !error) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isIntersecting, prefersReducedMotion, error]);

  const handleError = () => {
    setError(true);
  };

  return (
    <div 
      ref={targetRef} 
      className={`loop-video-wrapper ${className}`} 
      style={{ aspectRatio, position: 'relative', overflow: 'hidden' }}
    >
      {!error && (
        <video
          ref={videoRef}
          className="loop-video-element"
          autoPlay={!lazyPlay && !prefersReducedMotion}
          muted
          loop
          playsInline
          preload={lazyPlay ? "none" : "metadata"}
          poster={poster}
          onError={handleError}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          {srcMobile && <source src={srcMobile} media="(max-width: 768px)" type="video/mp4" />}
          <source src={src} type="video/mp4" />
        </video>
      )}
      
      {(error || prefersReducedMotion) && poster && (
        <img 
          src={poster} 
          alt="Video poster fallback" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} 
        />
      )}
      
      {overlay && (
        <div className="loop-video-overlay" style={{ position: 'absolute', inset: 0 }}>
          {overlay}
        </div>
      )}
    </div>
  );
}
