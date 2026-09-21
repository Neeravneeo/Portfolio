import React from 'react';
import { usePerspective } from '../../context/PerspectiveContext';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'pill';
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
    sm: 'px-3.5 py-1.5 text-xs rounded-full gap-1.5',
    md: 'px-5 py-2.5 text-xs sm:text-sm rounded-full gap-2',
    lg: 'px-6 py-3.5 text-sm sm:text-base rounded-full gap-2.5',
  }[size];

  // Variant definitions
  let variantClasses = '';
  switch (variant) {
    case 'pill':
      variantClasses =
        'bg-[#8052ff] hover:bg-[#7040f5] text-white uppercase tracking-[0.025em] font-semibold shadow-lg shadow-[#8052ff]/30 hover:scale-[1.02] border-0';
      break;
    case 'primary':
      variantClasses = isDesigner
        ? 'bg-gradient-to-r from-[#8052ff] to-fuchsia-600 hover:from-[#7040f5] hover:to-fuchsia-500 text-white shadow-lg shadow-[#8052ff]/25 border border-[#8052ff]/30'
        : 'bg-gradient-to-r from-[#15846e] to-teal-600 hover:from-[#116e5c] hover:to-teal-500 text-white shadow-lg shadow-[#15846e]/25 border border-[#15846e]/30';
      break;
    case 'secondary':
      variantClasses = 'bg-white/10 hover:bg-white/15 text-white border border-white/15 backdrop-blur-md';
      break;
    case 'outline':
      variantClasses = isDesigner
        ? 'border border-[#8052ff]/40 text-violet-300 hover:bg-[#8052ff]/10 hover:border-[#8052ff]'
        : 'border border-[#15846e]/40 text-emerald-300 hover:bg-[#15846e]/10 hover:border-[#15846e]';
      break;
    case 'ghost':
      variantClasses = 'text-[#9a9a9a] hover:text-white hover:bg-white/5';
      break;
    case 'danger':
      variantClasses = 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30';
      break;
  }

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#8052ff] focus-visible:outline-none select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98] ${sizeClasses} ${variantClasses} ${
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
