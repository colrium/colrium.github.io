import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`bg-surface-tint/5 backdrop-blur-md border border-accent/10 rounded-2xl md:rounded-3xl ${className}`}
    >
      {children}
    </div>
  );
}
