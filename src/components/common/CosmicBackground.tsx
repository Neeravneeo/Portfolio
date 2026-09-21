import React, { useEffect, useRef } from 'react';
import { usePerspective } from '../../context/PerspectiveContext';

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isDesigner } = usePerspective();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate stars
    const starCount = Math.floor((width * height) / 8000);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      velocity: Math.random() * 0.2 + 0.05,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleDir: 1,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Deep space base
      ctx.fillStyle = '#05070d';
      ctx.fillRect(0, 0, width, height);

      // Ambient radial glow following mouse softly
      const glowColor = isDesigner 
        ? 'rgba(139, 92, 246, 0.07)' 
        : 'rgba(16, 185, 129, 0.07)';
      const gradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        10,
        mouseX,
        mouseY,
        Math.max(width, height) * 0.45
      );
      gradient.addColorStop(0, glowColor);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      const starHue = isDesigner ? '210, 200, 255' : '180, 255, 220';
      stars.forEach((star) => {
        star.y -= star.velocity;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        star.alpha += star.twinkleSpeed * star.twinkleDir;
        if (star.alpha > 0.95) star.twinkleDir = -1;
        if (star.alpha < 0.2) star.twinkleDir = 1;

        // Subtle mouse parallax
        const parallaxX = (mouseX - width / 2) * (star.size * 0.015);
        const parallaxY = (mouseY - height / 2) * (star.size * 0.015);

        ctx.beginPath();
        ctx.arc(star.x + parallaxX, star.y + parallaxY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starHue}, ${star.alpha})`;
        ctx.shadowBlur = star.size > 1.2 ? 6 : 0;
        ctx.shadowColor = isDesigner ? '#8b5cf6' : '#10b981';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDesigner]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
