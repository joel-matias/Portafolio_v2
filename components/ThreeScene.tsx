"use client";

import { useEffect, useRef } from "react";

export function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    if (window.innerWidth < 768) return;

    const el = mountRef.current;
    const size = 420;
    const particleCount = 1400;

    let animId: number;
    let initTimer: ReturnType<typeof setTimeout>;

    initTimer = setTimeout(() => {
    import("three").then((THREE) => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
      camera.position.z = 3.2;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(size, size);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const basePositions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const noise = (Math.random() - 0.5) * 0.25;
        const r = 1 + noise;

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        basePositions[i * 3] = x;
        basePositions[i * 3 + 1] = y;
        basePositions[i * 3 + 2] = z;

        const t = Math.random();
        colors[i * 3] = 0.78 + t * 0.22;
        colors[i * 3 + 1] = 1.0;
        colors[i * 3 + 2] = t * 0.05;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.016,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
      });

      const sphere = new THREE.Points(geometry, material);
      scene.add(sphere);

      let targetRotX = 0;
      let targetRotY = 0;
      let currentRotX = 0;
      let currentRotY = 0;

      // Cache rect to avoid forced reflow on every mousemove
      let cachedRect = el.getBoundingClientRect();
      const onResize = () => { cachedRect = el.getBoundingClientRect(); };
      window.addEventListener("resize", onResize, { passive: true });

      const onMouseMove = (e: MouseEvent) => {
        const cx = cachedRect.left + cachedRect.width / 2;
        const cy = cachedRect.top + cachedRect.height / 2;
        targetRotY = ((e.clientX - cx) / (cachedRect.width / 2)) * 0.5;
        targetRotX = -((e.clientY - cy) / (cachedRect.height / 2)) * 0.4;
      };

      window.addEventListener("mousemove", onMouseMove, { passive: true });

      let time = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        time += 0.008;

        currentRotX += (targetRotX - currentRotX) * 0.05;
        currentRotY += (targetRotY - currentRotY) * 0.05;

        sphere.rotation.x = currentRotX + time * 0.15;
        sphere.rotation.y = currentRotY + time * 0.2;

        const pulse = 1 + Math.sin(time * 0.8) * 0.02;
        sphere.scale.setScalar(pulse);

        renderer.render(scene, camera);
      };

      animate();

      const cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        if (el.contains(renderer.domElement)) {
          el.removeChild(renderer.domElement);
        }
      };

      (el as HTMLDivElement & { _cleanup?: () => void })._cleanup = cleanup;
    });
    }, 100);

    return () => {
      clearTimeout(initTimer);
      cancelAnimationFrame(animId);
      const cleanup = (el as HTMLDivElement & { _cleanup?: () => void })._cleanup;
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "clamp(260px, 40vw, 420px)",
        height: "clamp(260px, 40vw, 420px)",
        position: "relative",
      }}
      aria-hidden="true"
    />
  );
}
