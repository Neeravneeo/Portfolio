import React, { useEffect, useRef, useState } from 'react';
import { usePerspective } from '../../context/PerspectiveContext';

export const CosmicObject: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isDesigner } = usePerspective();
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = 460);
    const height = (canvas.height = 460);
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 140;

    // 3D Icosahedron vertices definition
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices = [
      [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
      [0, -1,  phi], [0,  1,  phi], [0, -1, -phi], [0,  1, -phi],
      [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1],
    ];

    // Normalize and scale
    const vertices = rawVertices.map(v => {
      const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      return [ (v[0] / len) * radius, (v[1] / len) * radius, (v[2] / len) * radius ];
    });

    // Outer and inner edges
    const edges: [number, number][] = [
      [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
      [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
      [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
      [4, 9], [9, 8], [8, 6], [6, 2], [2, 4],
      [5, 4], [5, 9], [1, 9], [1, 8], [7, 8],
      [7, 6], [10, 6], [10, 2], [11, 2], [11, 4]
    ];

    let rotX = 0.4;
    let rotY = 0.6;
    let rotZ = 0.1;
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
      setTimeout(() => setIsInteracting(false), 800);
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support
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
      setTimeout(() => setIsInteracting(false), 800);
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    let time = 0;

    const render = () => {
      time += 0.02;
      if (!isDragging) {
        rotX += velX;
        rotY += velY;
        velX *= 0.98;
        velY *= 0.98;
        if (Math.abs(velX) < 0.002) velX = 0.002;
        if (Math.abs(velY) < 0.003) velY = 0.003;
      }

      ctx.clearRect(0, 0, width, height);

      // Core glow
      const coreRadius = 38 + Math.sin(time * 2) * 5;
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, coreRadius * 2.2);
      if (isDesigner) {
        coreGrad.addColorStop(0, 'rgba(168, 85, 247, 0.9)');
        coreGrad.addColorStop(0.4, 'rgba(139, 92, 246, 0.4)');
        coreGrad.addColorStop(1, 'transparent');
      } else {
        coreGrad.addColorStop(0, 'rgba(16, 185, 129, 0.9)');
        coreGrad.addColorStop(0.4, 'rgba(6, 182, 212, 0.4)');
        coreGrad.addColorStop(1, 'transparent');
      }
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Rotating orbital telemetry rings (Engineer mode emphasis or cosmic rings for designer)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotY * 0.5);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.35, radius * 0.45, rotX * 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = isDesigner ? 'rgba(236, 72, 153, 0.25)' : 'rgba(6, 182, 212, 0.25)';
      ctx.setLineDash([4, 6]);
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Transform 3D vertices
      const transformed = vertices.map(([x, y, z]) => {
        // Rotate Y
        let x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
        let z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);
        // Rotate X
        let y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
        // Perspective factor
        const distance = 420;
        const scale = distance / (distance + z2);
        return {
          px: centerX + x1 * scale,
          py: centerY + y2 * scale,
          depth: z2,
          scale
        };
      });

      // Draw edges with depth shading
      edges.forEach(([i, j]) => {
        const v1 = transformed[i];
        const v2 = transformed[j];
        const avgDepth = (v1.depth + v2.depth) / 2;
        const depthAlpha = Math.max(0.12, Math.min(0.85, (avgDepth + radius) / (radius * 2)));

        ctx.beginPath();
        ctx.moveTo(v1.px, v1.py);
        ctx.lineTo(v2.px, v2.py);

        if (isDesigner) {
          ctx.strokeStyle = `rgba(168, 85, 247, ${depthAlpha * 0.7})`;
        } else {
          ctx.strokeStyle = `rgba(16, 185, 129, ${depthAlpha * 0.7})`;
        }
        ctx.lineWidth = 1.4;
        ctx.stroke();
      });

      // Draw vertex nodes
      transformed.forEach((v) => {
        const nodeAlpha = Math.max(0.2, (v.depth + radius) / (radius * 2));
        ctx.beginPath();
        ctx.arc(v.px, v.py, 3.5 * v.scale, 0, Math.PI * 2);
        ctx.fillStyle = isDesigner
          ? `rgba(244, 114, 182, ${nodeAlpha})`
          : `rgba(52, 211, 153, ${nodeAlpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = isDesigner ? '#ec4899' : '#10b981';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

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
      cancelAnimationFrame(animId);
    };
  }, [isDesigner]);

  return (
    <div className="relative flex flex-col items-center justify-center select-none group">
      <div className="relative cursor-grab active:cursor-grabbing">
        <canvas
          ref={canvasRef}
          className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Floating status tag */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full glass-pill text-[11px] font-mono flex items-center gap-2 border border-white/10 text-slate-400 pointer-events-none whitespace-nowrap">
          <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isDesigner ? 'bg-violet-400' : 'bg-emerald-400'}`} />
          {isInteracting ? 'SPATIAL CORE ACTIVE' : 'DRAG TO ROTATE 3D CORE'}
        </div>
      </div>
    </div>
  );
};
