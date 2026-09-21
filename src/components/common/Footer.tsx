import React, { useState, useEffect } from 'react';
import { usePerspective } from '../../context/PerspectiveContext';

export const Footer: React.FC = () => {
  const { isDesigner } = usePerspective();
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative border-t border-white/10 bg-space-950/80 backdrop-blur-md py-8 px-4 sm:px-6 lg:px-8 font-mono text-xs text-slate-500 z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-300">NEERAV.OS</span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            ONLINE
          </span>
          <span>•</span>
          <span>{timeStr}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className={isDesigner ? 'text-violet-400' : 'text-emerald-400'}>
            MODE: {isDesigner ? 'HUMAN DESIGN CRAFT' : 'SYSTEM ARCHITECTURE'}
          </span>
          <span>•</span>
          <span>© {new Date().getFullYear()} NEERAV</span>
        </div>
      </div>
    </footer>
  );
};
