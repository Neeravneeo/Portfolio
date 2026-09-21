import React from 'react';
import { usePerspective } from '../../context/PerspectiveContext';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled = false,
  ...props
}) => {
  const { isDesigner } = usePerspective();

  // Size definitions
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-4 py-2 text-xs sm:text-sm rounded-xl gap-2',
    lg: 'px-6 py-3 text-sm sm:text-base rounded-2xl gap-2.5',
  }[size];

  // Variant definitions
  let variantClasses = '';
  switch (variant) {
    case 'primary':
      variantClasses = isDesigner
        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-violet-600/25 border border-violet-400/30'
        : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/25 border border-emerald-400/30';
      break;
    case 'secondary':
      variantClasses = 'bg-white/10 hover:bg-white/15 text-white border border-white/15 backdrop-blur-md';
      break;
    case 'outline':
      variantClasses = isDesigner
        ? 'border border-violet-500/40 text-violet-300 hover:bg-violet-600/10 hover:border-violet-400'
        : 'border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/10 hover:border-emerald-400';
      break;
    case 'ghost':
      variantClasses = 'text-slate-300 hover:text-white hover:bg-white/5';
      break;
    case 'danger':
      variantClasses = 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30';
      break;
  }

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center font-medium font-mono transition-all duration-200 focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:outline-none select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98] ${sizeClasses} ${variantClasses} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
