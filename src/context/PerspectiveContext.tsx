import React, { createContext, useContext, useState, useEffect } from 'react';
import { Perspective } from '../types';

interface PerspectiveContextType {
  perspective: Perspective;
  togglePerspective: () => void;
  setPerspective: (perspective: Perspective) => void;
  isDesigner: boolean;
  isEngineer: boolean;
  accentClass: string;
  glowClass: string;
}

const PerspectiveContext = createContext<PerspectiveContextType | undefined>(undefined);

export const PerspectiveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [perspective, setPerspectiveState] = useState<Perspective>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('neerav_os_perspective');
      if (saved === 'designer' || saved === 'engineer') return saved;
    }
    return 'designer';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('neerav_os_perspective', perspective);
      const root = document.documentElement;
      if (perspective === 'designer') {
        root.classList.add('perspective-designer');
        root.classList.remove('perspective-engineer');
      } else {
        root.classList.add('perspective-engineer');
        root.classList.remove('perspective-designer');
      }
    }
  }, [perspective]);

  const togglePerspective = () => {
    setPerspectiveState(prev => (prev === 'designer' ? 'engineer' : 'designer'));
  };

  const setPerspective = (newPerspective: Perspective) => {
    setPerspectiveState(newPerspective);
  };

  const isDesigner = perspective === 'designer';
  const isEngineer = perspective === 'engineer';

  const accentClass = isDesigner ? 'text-violet-400' : 'text-emerald-400';
  const glowClass = isDesigner ? 'shadow-glow-designer' : 'shadow-glow-engineer';

  return (
    <PerspectiveContext.Provider
      value={{
        perspective,
        togglePerspective,
        setPerspective,
        isDesigner,
        isEngineer,
        accentClass,
        glowClass,
      }}
    >
      {children}
    </PerspectiveContext.Provider>
  );
};

export const usePerspective = (): PerspectiveContextType => {
  const context = useContext(PerspectiveContext);
  if (!context) {
    throw new Error('usePerspective must be used within a PerspectiveProvider');
  }
  return context;
};
