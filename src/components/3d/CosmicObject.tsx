import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { usePerspective } from '../../context/PerspectiveContext';

export const CosmicObject: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isDesigner } = usePerspective();
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check WebGL availability gracefully
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL not available, falling back to 2D canvas', e);
      setHasWebGL(false);
      return;
    }

    const width = 480;
    const height = 480;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 280;

    // Ambient light & strategic Designer (amber) vs Engineer (cyan) lights
    const ambientLight = new THREE.AmbientLight(0x0a0a0a, 1.5);
    scene.add(ambientLight);

    const leftLight = new THREE.PointLight(0xf59e0b, 2.5, 300); // Amber
    leftLight.position.set(-100, 50, 100);
    scene.add(leftLight);

    const rightLight = new THREE.PointLight(0x06b6d4, 2.5, 300); // Cyan
    rightLight.position.set(100, -50, 100);
    scene.add(rightLight);

    // Generate 3,000 Spatial Particles forming neural constellation
    const particleCount = 3000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color('#8052ff'), // Electric Iris Violet
      new THREE.Color('#f59e0b'), // Saffron / Amber Spark
      new THREE.Color('#06b6d4'), // Cyan
      new THREE.Color('#15846e'), // Deep Verdant
      new THREE.Color('#ec4899'), // Magenta
      new THREE.Color('#fafafa'), // Bone White
    ];

    const radius = 70;
    for (let i = 0; i < particleCount; i++) {
      const hemisphere = i % 2 === 0 ? 1 : -1;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      // Two organic hemispheres of the mind (Design × Engineering)
      const r = (0.25 + 0.75 * Math.cbrt(Math.random())) * radius;
      const x = r * Math.cos(phi) * Math.sin(theta) + hemisphere * 18;
      const y = r * Math.sin(phi) * 0.85;
      const z = r * Math.cos(phi) * Math.cos(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = 1.5 + Math.random() * 2.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom circular soft glow particle texture
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 64;
    textureCanvas.height = 64;
    const ctx = textureCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();
    }
    const particleTexture = new THREE.CanvasTexture(textureCanvas);

    const material = new THREE.PointsMaterial({
      size: 3.5,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Glowing core orbital wireframe sphere for depth
    const coreGeo = new THREE.IcosahedronGeometry(22, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: isDesigner ? 0xf59e0b : 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Mouse interaction & gravitational pull
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0.3;
    let targetRotY = 0.5;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Normalized device coordinates (-1 to +1)
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotY += deltaX * 0.008;
        targetRotX += deltaY * 0.008;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 500);
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsInteracting(true);
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        targetRotY += deltaX * 0.01;
        targetRotX += deltaY * 0.01;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 500);
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Tab visibility guard: pause render loop when tab is in background (Resilience Fix #3)
    let isTabVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Gentle auto-rotation & inertia damping
      if (!isDragging) {
        targetRotY += 0.004;
      }

      points.rotation.y += (targetRotY - points.rotation.y) * 0.08;
      points.rotation.x += (targetRotX - points.rotation.x) * 0.08;
      coreMesh.rotation.y = -points.rotation.y * 0.6;
      coreMesh.rotation.x = points.rotation.x * 0.6;

      // Float camera oscillation (amplitude: 6px)
      camera.position.y = Math.sin(elapsedTime * 1.5) * 6;

      // Interactive gravitational attraction to mouse cursor
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      const gravX = mouseX * 80;
      const gravY = mouseY * 80;

      for (let i = 0; i < particleCount; i += 3) {
        const idx = i * 3;
        const ox = originalPositions[idx];
        const oy = originalPositions[idx + 1];
        const oz = originalPositions[idx + 2];

        // Displacement toward cursor if within influence radius
        const dx = gravX - ox;
        const dy = gravY - oy;
        const distSq = dx * dx + dy * dy;

        if (distSq < 10000) {
          const factor = (1 - distSq / 10000) * 8;
          posArr[idx] = ox + (dx / Math.sqrt(distSq)) * factor;
          posArr[idx + 1] = oy + (dy / Math.sqrt(distSq)) * factor;
        } else {
          // Spring back smoothly
          posArr[idx] += (ox - posArr[idx]) * 0.05;
          posArr[idx + 1] += (oy - posArr[idx + 1]) * 0.05;
          posArr[idx + 2] += (oz - posArr[idx + 2]) * 0.05;
        }
      }
      posAttr.needsUpdate = true;

      // Perspective color shift on core
      coreMat.color.setHex(isDesigner ? 0xf59e0b : 0x06b6d4);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      renderer.dispose();
    };
  }, [isDesigner]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center p-4 select-none"
    >
      {/* 3D WebGL Canvas */}
      <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] lg:w-[460px] lg:h-[460px] flex items-center justify-center">
        {hasWebGL ? (
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing rounded-full"
            style={{ touchAction: 'none' }}
          />
        ) : (
          /* Graceful Fallback */
          <div className="w-full h-full rounded-full border border-white/10 flex items-center justify-center bg-[#111111]/80">
            <span className="text-xs font-mono text-[#a1a1aa]">3D Constellation Active</span>
          </div>
        )}

        {/* Floating Interaction Beacon */}
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#111111]/90 backdrop-blur-md border border-[#262626] text-[10px] font-mono text-[#a1a1aa] pointer-events-none transition-opacity duration-300 ${
            isInteracting ? 'opacity-0' : 'opacity-80 hover:opacity-100'
          }`}
        >
          DRAG TO ROTATE • GRAVITATIONAL CURSOR
        </div>
      </div>
    </div>
  );
};
