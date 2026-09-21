import React from 'react';
import { usePerspective } from '../../context/PerspectiveContext';
import { Palette, Terminal } from 'lucide-react';

export const PerspectiveToggle: React.FC = () => {
  const { perspective, togglePerspective, isDesigner } = usePerspective();

  return (
    <div className="relative inline-flex items-center p-1 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-inner">
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
        onClick={() => perspective !== 'designer' && togglePerspective()}
        className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
          isDesigner ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Palette className="w-3.5 h-3.5" />
        <span>Designer</span>
      </button>

      <button
        type="button"
        onClick={() => perspective !== 'engineer' && togglePerspective()}
        className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
          !isDesigner ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Terminal className="w-3.5 h-3.5" />
        <span>Engineer</span>
      </button>
    </div>
  );
};
