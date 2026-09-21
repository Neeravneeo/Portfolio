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
      className="relative inline-flex items-center p-1 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-inner"
    >
      {/* Sliding indicator pill */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-out shadow-md ${
          isDesigner
            ? 'left-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-violet-500/30'
            : 'left-[calc(50%+2px)] bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-500/30'
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
        className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:outline-none ${
          isDesigner ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
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
        className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
          !isDesigner ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Terminal className="w-3.5 h-3.5" />
        <span>Engineer</span>
      </button>
    </div>
  );
};
