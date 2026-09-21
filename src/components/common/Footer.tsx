import React from 'react';
import { usePerspective } from '../../context/PerspectiveContext';

export const Footer: React.FC = () => {
  const { isDesigner } = usePerspective();

  return (
    <footer className="relative border-t border-[#222222] bg-[#0a0a0a] py-12 px-6 sm:px-10 lg:px-16 font-mono text-xs text-[#71717a] z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[#fafafa] font-medium tracking-widest">NEERAV</span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-[#10b981]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            ONLINE
          </span>
          <span>•</span>
          <span>REMOTE-FIRST</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className={isDesigner ? 'text-[#f59e0b]' : 'text-[#06b6d4]'}>
            PERSPECTIVE: {isDesigner ? 'HUMAN DESIGN CRAFT' : 'SYSTEM ARCHITECTURE'}
          </span>
          <span>•</span>
          <span>© {new Date().getFullYear()} NEERAV. CRAFTED WITH INTENTION.</span>
        </div>
      </div>
    </footer>
  );
};
