import React from 'react';
import { usePerspective } from '../../context/PerspectiveContext';
import { Palette, Terminal } from 'lucide-react';
import { trackEvent } from '../../lib/telemetry';

export const PerspectiveToggle: React.FC = () => {
  const { perspective, togglePerspective, isDesigner } = usePerspective();

  return (
    <div
      role="radiogroup"
      aria-label="Perspective View Mode"
      className="relative inline-flex items-center p-1 rounded-full bg-[#111111] border border-[#222222] backdrop-blur-md"
    >
      {/* Sliding indicator pill */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-out shadow-sm ${
          isDesigner
            ? 'left-1 bg-[#f59e0b] shadow-[#f59e0b]/30'
            : 'left-[calc(50%+2px)] bg-[#06b6d4] shadow-[#06b6d4]/30'
        }`}
      />

      <button
        type="button"
        role="radio"
        aria-checked={isDesigner}
        aria-label="Designer perspective"
        onClick={() => {
          if (perspective !== 'designer') {
            togglePerspective();
            trackEvent('designer_engineer_switch', { perspective: 'designer' });
          }
        }}
        className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-colors duration-200 focus-visible:outline-none ${
          isDesigner ? 'text-[#0a0a0a] font-semibold' : 'text-[#71717a] hover:text-[#fafafa]'
        }`}
      >
        <Palette className="w-3.5 h-3.5" />
        <span>Designer</span>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={!isDesigner}
        aria-label="Engineer perspective"
        onClick={() => {
          if (perspective !== 'engineer') {
            togglePerspective();
            trackEvent('designer_engineer_switch', { perspective: 'engineer' });
          }
        }}
        className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-colors duration-200 focus-visible:outline-none ${
          !isDesigner ? 'text-[#0a0a0a] font-semibold' : 'text-[#71717a] hover:text-[#fafafa]'
        }`}
      >
        <Terminal className="w-3.5 h-3.5" />
        <span>Engineer</span>
      </button>
    </div>
  );
};
