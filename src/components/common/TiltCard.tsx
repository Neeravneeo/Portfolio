import React, { useState, useRef, useEffect } from 'react';
import { usePerspective } from '../../context/PerspectiveContext';

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  maxTilt?: number;
  scale?: number;
  glowOnHover?: boolean;
  onImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allowUpload?: boolean;
  className?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  imageUrl,
  imageAlt = 'Card image',
  maxTilt = 15,
  scale = 1.02,
  glowOnHover = true,
  onImageChange,
  allowUpload = false,
  className = '',
  ...props
}) => {
  const { isDesigner } = usePerspective();
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const shadowX = tilt.y * 0.5;
  const shadowY = tilt.x * 0.5;
  const shadowBlur = 30 + Math.abs(tilt.x + tilt.y) * 0.5;

  const glowColor = isDesigner
    ? 'rgba(139, 92, 246, 0.4)'
    : 'rgba(16, 185, 129, 0.4)';

  const dynamicShadow = isHovered && glowOnHover
    ? `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.6), 0 0 25px -5px ${glowColor}`
    : shouldReduceMotion
    ? 'none'
    : `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.4)`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: shouldReduceMotion
          ? 'none'
          : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${
              isHovered ? scale : 1
            }, ${isHovered ? scale : 1}, 1)`,
        boxShadow: dynamicShadow,
        transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.5s ease-out, box-shadow 0.3s ease-out',
      }}
      className={`relative overflow-hidden rounded-2xl cursor-pointer select-none transition-colors duration-300 border ${
        isHovered
          ? isDesigner
            ? 'border-violet-500/50 bg-space-850/90'
            : 'border-emerald-500/50 bg-space-850/90'
          : 'border-white/10 bg-space-900/70 hover:border-white/20'
      } ${className}`}
      {...props}
    >
      {/* If imageUrl is provided, render media view */}
      {imageUrl ? (
        <div className="relative w-full h-full group">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-space-950/90 via-space-950/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Upload button if enabled */}
          {allowUpload && onImageChange && (
            <label
              className="absolute bottom-4 right-4 bg-white/90 hover:bg-white p-2.5 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 z-20"
              aria-label="Upload replacement image"
            >
              <svg className="w-4 h-4 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="hidden"
              />
            </label>
          )}

          {/* Child contents rendered over image */}
          {children && (
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              {children}
            </div>
          )}
        </div>
      ) : (
        // Standard children content wrapper
        children
      )}
    </div>
  );
};
