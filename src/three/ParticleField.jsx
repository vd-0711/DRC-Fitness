import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getParticleCount } from '../lib/capabilities';

// Words the cloud snaps between. DRC = Drive · Rebuild · Conquer (the studio's
// own philosophy), so the mark literally spells out what it stands for.
const WORDS = ['DRC', 'DRIVE', 'REBUILD', 'CONQUER'];
const CYCLE = 2.7; // seconds a word holds before morphing
const MORPH_TIME = 1.25; // seconds to morph between words

/**
 * Render `text` to an offscreen canvas, then sample `count` particle target
 * positions from the opaque pixels. Returns a Float32Array of length count*3 in
 * a local space where x ~ [-1, 1] and y ~ [-0.5, 0.5].
 */
function sampleText(text, count) {
  const W = 1024;
  const H = 512;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  let fontSize = 380;
  ctx.font = `700 ${fontSize}px Fraunces, Georgia, serif`;
  const maxW = W * 0.84;
  const measured = ctx.measureText(text).width;
  if (measured > maxW) {
    fontSize *= maxW / measured;
    ctx.font = `700 ${fontSize}px Fraunces, Georgia, serif`;
  }
  ctx.fillText(text, W / 2, H / 2);

  const data = ctx.getImageData(0, 0, W, H).data;
  const pts = [];
  const step = 3;
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      if (data[(y * W + x) * 4 + 3] > 128) {
        pts.push((x - W / 2) / H, -(y - H / 2) / H);
      }
    }
  }

  const out = new Float32Array(count * 3);
  const n = pts.length / 2;
  if (n === 0) return out;
  for (let i = 0; i < count; i++) {
    const p = (Math.random() * n) | 0;
    out[i * 3] = pts[p * 2] + (Math.random() - 0.5) * 0.012;
    out[i * 3 + 1] = pts[p * 2 + 1] + (Math.random() - 0.5) * 0.012;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.06;
  }
  return out;
}

const VERT = /* glsl */ `
  attribute vec3 aTargetA;
  attribute vec3 aTargetB;
  attribute vec3 aRnd;
  uniform float uTime, uForm, uMix, uMouseStrength, uSize, uPixelRatio;
  uniform vec2 uMouse;
  varying float vMix;
  varying float vAlpha;
  void main() {
    vec3 drift = position;
    vec3 target = mix(aTargetA, aTargetB, uMix);
    vec3 pos = mix(drift, target, uForm);

    float idle = 1.0 - uForm * 0.6;
    pos.x += sin(uTime * 0.6 + aRnd.x * 6.2831) * 0.02 * idle;
    pos.y += cos(uTime * 0.5 + aRnd.y * 6.2831) * 0.02 * idle;
    pos.z += sin(uTime * 0.4 + aRnd.z * 6.2831) * 0.05 * idle;

    vec2 d = pos.xy - uMouse;
    float dist = length(d);
    float f = smoothstep(0.30, 0.0, dist) * uMouseStrength;
    pos.xy += (dist > 0.0001 ? normalize(d) : vec2(0.0)) * f;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.45 + aRnd.z) * uPixelRatio;

    vMix = smoothstep(0.80, 1.0, aRnd.y);
    vAlpha = 0.32 + 0.62 * uForm;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uEmber, uEmberBright, uChrome;
  varying float vMix;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float disc = smoothstep(0.5, 0.05, d);
    if (disc <= 0.0) discard;
    vec3 ember = mix(uEmber, uEmberBright, 0.5);
    vec3 col = mix(ember, uChrome, vMix);
    gl_FragColor = vec4(col, disc * vAlpha);
  }
`;

function Particles({ count }) {
  const { viewport } = useThree();
  const pointsRef = useRef();
  const matRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const anim = useRef({ form: 0, mix: 0, shapeIndex: 0, nextIndex: 0, morphing: false, timer: 0 });

  const { geometry, shapes } = useMemo(() => {
    const shapeBuffers = WORDS.map((w) => sampleText(w, count));
    const drift = new Float32Array(count * 3);
    const rnd = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      drift[i * 3] = (Math.random() * 2 - 1) * 1.4;
      drift[i * 3 + 1] = (Math.random() * 2 - 1) * 0.8;
      drift[i * 3 + 2] = (Math.random() * 2 - 1) * 0.4;
      rnd[i * 3] = Math.random();
      rnd[i * 3 + 1] = Math.random();
      rnd[i * 3 + 2] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(drift, 3));
    geo.setAttribute('aTargetA', new THREE.BufferAttribute(shapeBuffers[0].slice(), 3));
    geo.setAttribute('aTargetB', new THREE.BufferAttribute(shapeBuffers[0].slice(), 3));
    geo.setAttribute('aRnd', new THREE.BufferAttribute(rnd, 3));
    return { geometry: geo, shapes: shapeBuffers };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uForm: { value: 0 },
      uMix: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uMouseStrength: { value: 0.16 },
      uSize: { value: count > 7000 ? 2.8 : 3.2 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1.75) },
      uEmber: { value: new THREE.Color('#ff6a00') },
      uEmberBright: { value: new THREE.Color('#ff9a3c') },
      uChrome: { value: new THREE.Color('#f0f0f2') },
    }),
    [count]
  );

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    const mat = matRef.current;
    const pts = pointsRef.current;
    if (!mat || !pts) return;
    const a = anim.current;
    const u = mat.uniforms;
    const dt = Math.min(delta, 0.05);

    u.uTime.value += dt;

    // Intro: ease the drift cloud into the current word.
    a.form += (1 - a.form) * Math.min(1, dt * 1.6);
    u.uForm.value = a.form;

    // Scale the whole cloud to a stable fraction of the viewport width.
    const S = viewport.width * 0.42;
    pts.scale.setScalar(S);

    // Mouse, converted into the cloud's local space.
    u.uMouse.value.set(
      ((mouse.current.x * viewport.width) / 2) / S,
      ((mouse.current.y * viewport.height) / 2) / S
    );

    // Word morph cycle (only once the intro has formed).
    if (a.form > 0.95) {
      a.timer += dt;
      if (!a.morphing && a.timer > CYCLE) {
        a.timer = 0;
        a.morphing = true;
        a.mix = 0;
        a.nextIndex = (a.shapeIndex + 1) % shapes.length;
        const attrB = geometry.attributes.aTargetB;
        attrB.array.set(shapes[a.nextIndex]);
        attrB.needsUpdate = true;
      }
      if (a.morphing) {
        a.mix += dt / MORPH_TIME;
        if (a.mix >= 1) {
          a.mix = 0;
          a.morphing = false;
          a.shapeIndex = a.nextIndex;
          const attrA = geometry.attributes.aTargetA;
          attrA.array.set(shapes[a.shapeIndex]);
          attrA.needsUpdate = true;
        }
        u.uMix.value = a.mix;
      }
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleField() {
  const wrapRef = useRef(null);
  const [inView, setInView] = useState(true);
  const count = useMemo(() => getParticleCount(), []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '100px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="hero-canvas" aria-hidden="true">
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 500], near: 0.1, far: 2000 }}
        frameloop={inView ? 'always' : 'never'}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Particles count={count} />
      </Canvas>
    </div>
  );
}
