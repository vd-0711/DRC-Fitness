// Lightweight runtime capability checks used to decide whether to mount the
// WebGL particle hero or fall back to a static treatment.

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function supportsWebGL() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

// Particle budget tiered by viewport width (proxy for GPU headroom).
export function getParticleCount() {
  if (typeof window === 'undefined') return 6000;
  const w = window.innerWidth;
  if (w < 768) return 3500;
  if (w < 1280) return 6500;
  return 9000;
}

// Whether to render the live particle field at all.
export function enableParticles() {
  return supportsWebGL() && !prefersReducedMotion();
}
