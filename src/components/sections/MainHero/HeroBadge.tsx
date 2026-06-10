import React from 'react';

interface HeroBadgeProps {
  icon: string;
  label: string;
}

export function HeroBadge({ icon, label }: HeroBadgeProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-transparent backdrop-blur-md border border-accent/20 mx-auto mb-6 w-fit shadow-sm animate-fade-in">
      <span className="material-symbols-outlined text-sm text-accent">
        {icon}
      </span>
      <span className="text-sm font-thin text-on-surface">
        {label}
      </span>
    </div>
  );
}
