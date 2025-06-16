import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  animate?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  animate = true,
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-xl 
    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-purple 
    focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed
    ${animate ? 'transform hover:scale-105 active:scale-95' : ''}
  `;
  
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-brand-purple to-brand-blue text-white 
      hover:from-brand-purple-hover hover:to-brand-blue shadow-lg hover:shadow-glow
      border border-transparent
    `,
    secondary: `
      bg-gradient-to-r from-slate-800 to-slate-700 text-white 
      hover:from-slate-700 hover:to-slate-600 border border-slate-600
      shadow-lg hover:shadow-xl
    `,
    outline: `
      border-2 border-brand-purple text-brand-purple bg-transparent
      hover:bg-brand-purple hover:text-white hover:shadow-glow
    `,
    ghost: `
      text-gray-300 hover:text-white hover:bg-white/10 
      border border-transparent hover:border-white/20
    `,
    gradient: `
      bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan text-white
      hover:from-brand-purple-hover hover:via-brand-blue hover:to-brand-cyan
      shadow-lg hover:shadow-glow-lg animate-gradient-shift bg-[length:200%_200%]
    `,
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-10 py-5 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
}