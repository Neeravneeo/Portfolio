import React from 'react';
import { usePerspective } from '../../context/PerspectiveContext';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'cosmic' | 'interactive' | 'subtle' | 'elevated';
  glowOnHover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'cosmic',
  glowOnHover = false,
  padding = 'md',
  className = '',
  ...props
}) => {
  const { isDesigner } = usePerspective();

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8 sm:p-10',
  }[padding];

  let variantClasses = '';
  switch (variant) {
    case 'cosmic':
      variantClasses = 'bg-space-900/70 border border-white/10 backdrop-blur-xl';
      break;
    case 'interactive':
      variantClasses = `bg-space-900/60 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-xl ${
        glowOnHover
          ? isDesigner
            ? 'hover:shadow-glow-designer hover:border-violet-500/40'
            : 'hover:shadow-glow-engineer hover:border-emerald-500/40'
          : ''
      }`;
      break;
    case 'subtle':
      variantClasses = 'bg-white/[0.02] border border-white/5 backdrop-blur-md';
      break;
    case 'elevated':
      variantClasses = 'bg-space-950/90 border border-white/15 shadow-2xl backdrop-blur-2xl';
      break;
  }

  return (
    <div
      className={`rounded-3xl relative overflow-hidden ${paddingClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
