import React from 'react';

interface IconButtonProps {
  icon: string;
  label?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function IconButton({
  icon,
  label,
  onClick,
  variant = 'primary',
  className = '',
}: IconButtonProps) {
  const baseClasses = 'flex items-center rounded-full gap-2 transition-all active:scale-95';

  const variantClasses = {
    primary: 'bg-primary text-on-surface pl-2 pr-4 md:pr-6 py-1.5 md:py-2 hover:bg-primary-dark',
    secondary: 'bg-secondary text-on-surface pl-1.5 pr-5 py-1.5 hover:bg-secondary-dark',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <div className="bg-surface/20 p-1 md:p-1 rounded-full flex items-center justify-center">
        <span className="material-symbols-outlined text-sm md:text-base">
          {icon}
        </span>
      </div>
      {label && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
}
