import React, { useEffect, useRef, useState } from 'react';
import { usePerspective } from '../../context/PerspectiveContext';

interface ParticleNode {
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
  rotation: number;
  rotSpeed: number;
}

export const CosmicObject: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isDesigner } = usePerspective();
  const [isInteracting, setIsInteracting] = useState(false);
  const [contextError, setContextError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setContextError(true);
      return;
    }

    let animId: number;
    const width = (canvas.width = 460);
    const height = (canvas.height = 460);
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 135;

    // Chromatic palette from Dala Style Reference
    const chromaticColors = [
      '#8052ff', // Electric Iris Violet
      '#ffb829', // Saffron Spark
      '#15846e', // Deep Verdant
      '#06b6d4', // Cyan
      '#ec4899', // Magenta
      '#a855f7', // Vivid Purple
    ];

    // Generate organic neural constellation cloud of triangular particles
    const particleCount = 140;
    const particles: ParticleNode[] = [];

    // Core brain/constellation shape (two organic hemispheres)
    for (let i = 0; i < particleCount; i++) {
      const hemisphere = i % 2 === 0 ? 1 : -1;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      const r = (0.45 + 0.55 * Math.random()) * radius;
      // Offset left & right slightly for neural hemisphere anatomy
      const x = r * Math.cos(phi) * Math.sin(theta) + hemisphere * 22;
      const y = r * Math.sin(phi) * 0.85;
      const z = r * Math.cos(phi) * Math.cos(theta);

      particles.push({
        x,
        y,
        z,
        color: chromaticColors[Math.floor(Math.random() * chromaticColors.length)],
        size: 3 + Math.random() * 3.5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
      });
    }

    // Connect near neighbors with delicate neural filaments
    const maxConnectionDistance = 58;
    const connections: [number, number][] = [];
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dz = particles[i].z - particles[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < maxConnectionDistance) {
          connections.push([i, j]);
        }
      }
    }

    let rotX = 0.35;
    let rotY = 0.5;
    let velX = 0.003;
    let velY = 0.005;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      rotY += dx * 0.008;
      rotX += dy * 0.008;
      velX = dy * 0.001;
      velY = dx * 0.001;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 600);
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch handlers
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsInteracting(true);
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - lastMouseX;
        const dy = e.touches[0].clientY - lastMouseY;
        rotY += dx * 0.01;
        rotX += dy * 0.01;
        velX = dy * 0.001;
        velY = dx * 0.001;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 600);
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resilience Fix: Tab Visibility Guard (Pause animation loop in background tabs)
    let isTabVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Helper: Draw small outlined equilateral triangle glyph
    const drawTriangle = (cx: number, cy: number, size: number, rot: number, strokeColor: string, alpha: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.beginPath();
      const h = size * (Math.sqrt(3) / 2);
      ctx.moveTo(0, -h * 0.67);
      ctx.lineTo(-size / 2, h * 0.33);
      ctx.lineTo(size / 2, h * 0.33);
      ctx.closePath();

      ctx.strokeStyle = strokeColor;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = 1.3;
      ctx.stroke();

      // Subtle center point
      ctx.fillStyle = strokeColor;
      ctx.fillRect(-0.5, -0.5, 1, 1);
      ctx.restore();
    };

    let time = 0;

    const render = () => {
      if (isTabVisible) {
        time += 0.015;
        if (!isDragging) {
          rotX += velX;
          rotY += velY;
          velX *= 0.98;
          velY *= 0.98;
          if (Math.abs(velX) < 0.0015) velX = 0.0015;
          if (Math.abs(velY) < 0.0025) velY = 0.0025;
        }

        ctx.clearRect(0, 0, width, height);

        // Core ambient glow
        const coreGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius * 1.3);
        coreGrad.addColorStop(0, isDesigner ? 'rgba(128, 82, 255, 0.12)' : 'rgba(21, 132, 110, 0.12)');
        coreGrad.addColorStop(0.6, isDesigner ? 'rgba(128, 82, 255, 0.03)' : 'rgba(6, 182, 212, 0.03)');
        coreGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
        ctx.fill();

        // 3D projection of particle coordinates
        const projected = particles.map((p) => {
          p.rotation += p.rotSpeed;

          // Rotate Y
          let x1 = p.x * Math.cos(rotY) + p.z * Math.sin(rotY);
          let z1 = -p.x * Math.sin(rotY) + p.z * Math.cos(rotY);
          // Rotate X
          let y2 = p.y * Math.cos(rotX) - z1 * Math.sin(rotX);
          let z2 = p.y * Math.sin(rotX) + z1 * Math.cos(rotX);

          // Perspective distance
          const distance = 460;
          const scale = distance / (distance + z2);

          return {
            px: centerX + x1 * scale,
            py: centerY + y2 * scale,
            depth: z2,
            scale,
            color: p.color,
            size: p.size * scale,
            rotation: p.rotation,
          };
        });

        // 1. Draw connecting filaments with depth-based opacity
        connections.forEach(([i, j]) => {
          const p1 = projected[i];
          const p2 = projected[j];
          const avgDepth = (p1.depth + p2.depth) / 2;
          const depthAlpha = Math.max(0.04, Math.min(0.4, (avgDepth + radius) / (radius * 2.2)));

          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.strokeStyle = isDesigner ? 'rgba(128, 82, 255, 0.4)' : 'rgba(21, 132, 110, 0.4)';
          ctx.globalAlpha = depthAlpha * 0.65;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        });

        // 2. Draw signature triangular particle glyphs
        projected.forEach((p) => {
          const depthAlpha = Math.max(0.2, Math.min(1.0, (p.depth + radius) / (radius * 1.8)));
          drawTriangle(p.px, p.py, p.size, p.rotation, p.color, depthAlpha);
        });

        ctx.globalAlpha = 1.0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animId);
    };
  }, [isDesigner]);

  if (contextError) {
    return (
      <div className="w-[300px] h-[300px] flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-black text-center p-6 font-mono text-xs text-slate-400">
        <span className="text-violet-400 mb-2">NEURAL CONSTELLATION</span>
        <p>Hardware graphics fallback active.</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center select-none group">
      <div className="relative cursor-grab active:cursor-grabbing">
        <canvas
          ref={canvasRef}
          className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] transition-transform duration-300 group-hover:scale-105"
        />

        {/* Floating status tag */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full glass-pill text-[11px] font-mono flex items-center gap-2 border border-white/10 text-slate-300 pointer-events-none whitespace-nowrap shadow-lg">
          <span
            className={`w-1.5 h-1.5 rounded-full animate-ping ${
              isDesigner ? 'bg-electric-iris' : 'bg-emerald-400'
            }`}
          />
          <span className="text-white/80">
            {isInteracting ? 'CONSTELLATION DOCKED' : 'DRAG TO ROTATE CONSTELLATION'}
          </span>
        </div>
      </div>
    </div>
  );
};
