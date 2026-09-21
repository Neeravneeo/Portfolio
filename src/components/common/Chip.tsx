import React from 'react';
import { usePerspective } from '../../context/PerspectiveContext';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'category' | 'role' | 'status' | 'tech' | 'pill';
  active?: boolean;
  statusType?: 'production' | 'live' | 'prototype' | 'case-study' | 'draft' | 'archived';
  icon?: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'category',
  active = false,
  statusType,
  icon,
  className = '',
  ...props
}) => {
  const { isDesigner } = usePerspective();

  let styleClasses = 'px-3 py-1 text-xs font-mono rounded-full inline-flex items-center gap-1.5 transition-all';

  if (variant === 'status' && statusType) {
    switch (statusType) {
      case 'production':
      case 'live':
        styleClasses += ' bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
        break;
      case 'prototype':
      case 'case-study':
        styleClasses += ' bg-cyan-500/10 text-cyan-400 border border-cyan-500/30';
        break;
      case 'draft':
        styleClasses += ' bg-amber-500/10 text-amber-400 border border-amber-500/30';
        break;
      case 'archived':
        styleClasses += ' bg-slate-500/10 text-slate-400 border border-slate-500/30';
        break;
    }
  } else if (variant === 'role') {
    styleClasses += isDesigner
      ? ' bg-violet-500/15 text-violet-300 border border-violet-500/30'
      : ' bg-emerald-500/15 text-emerald-300 border border-emerald-500/30';
  } else if (variant === 'tech') {
    styleClasses += ' bg-white/5 text-slate-300 border border-white/10 hover:border-white/20';
  } else {
    // category / general pill
    styleClasses += active
      ? isDesigner
        ? ' bg-violet-600 text-white shadow-sm shadow-violet-500/30 border border-violet-400/40'
        : ' bg-emerald-600 text-white shadow-sm shadow-emerald-500/30 border border-emerald-400/40'
      : ' bg-space-900/60 text-slate-400 hover:text-slate-200 border border-white/10 hover:bg-white/5';
  }

  return (
    <span className={`${styleClasses} ${className}`} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
