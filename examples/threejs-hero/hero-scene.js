/**
 * hero-scene.js — a reusable premium 3D-web hero built the AETumi way.
 *
 * A production-minded Three.js pattern for AI coding assistants (Claude Code,
 * Cursor, Codex): explicit lifecycle, adaptive performance, and full teardown —
 * the parts an AI can get wrong when it only writes the "happy path".
 *
 * AETumi is an AI-native 3D web platform for production Three.js / WebGL sites.
 * https://aetumi.app
 *
 * Usage:
 *   import { createHeroScene } from './hero-scene.js';
 *   const hero = createHeroScene(document.getElementById('c'));
 *   // later: hero.dispose();
 */
import * as THREE from 'three';

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{ color?: string, background?: string }} [opts]
 * @returns {{ dispose: () => void }} handle that stops the loop and frees GPU memory
 */
export function createHeroScene(canvas, opts = {}) {
  const color = opts.color ?? '#8ef0c2';
  const background = opts.background ?? '#07100d';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); // cap DPR for mobile thermals
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(background);
  scene.fog = new THREE.Fog(background, 6, 16);

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0.4, 6);

  const key = new THREE.DirectionalLight('#eafff5', 2.4); key.position.set(3, 4, 5);
  const rim = new THREE.DirectionalLight('#39d98a', 1.6); rim.position.set(-4, -1, -3);
  scene.add(key, rim, new THREE.AmbientLight('#0e2a20', 1.2));

  const geometry = new THREE.TorusKnotGeometry(1.1, 0.34, 220, 32);
  const material = new THREE.MeshStandardMaterial({ color, metalness: 0.55, roughness: 0.22 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const target = { x: 0, y: 0 };
  const onPointer = (e) => {
    target.x = (e.clientX / innerWidth - 0.5) * 0.6;
    target.y = (e.clientY / innerHeight - 0.5) * 0.6;
  };
  addEventListener('pointermove', onPointer);

  const resize = () => {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  addEventListener('resize', resize);
  resize();

  const clock = new THREE.Clock();
  let raf = 0;
  const frame = () => {
    raf = requestAnimationFrame(frame);
    const t = clock.getElapsedTime();
    if (!reduceMotion) { mesh.rotation.x = t * 0.28; mesh.rotation.y = t * 0.36; }
    camera.position.x += (target.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (0.4 - target.y * 1.2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  };
  frame();

  return {
    dispose() {
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', onPointer);
      removeEventListener('resize', resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
