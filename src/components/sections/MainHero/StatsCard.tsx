import React from 'react';
import Card from '../../ui/Card';
import { IconButton } from './IconButton';

interface StatsCardProps {
  value: string;
  label: string;
  buttonLabel: string;
  buttonIcon: string;
  onButtonClick?: () => void;
  href?: string;
}

export function StatsCard({
  value,
  label,
  buttonLabel,
  buttonIcon,
    onButtonClick,
  href
}: StatsCardProps) {
  return (
    <Card className="p-4 md:p-6 lg:p-8 hidden md:flex md:flex-col gap-4 min-w-40 md:min-w-50">
      <div>
        <div className="text-3xl md:text-4xl font-normal text-secondary tracking-tight">
          {value}
        </div>
        <div className="text-xs font-thin text-on-surface/60 uppercase tracking-widest">
          {label}
        </div>
          </div>
          
      <IconButton
        icon={buttonIcon}
        label={buttonLabel}
        variant="accent"
        onClick={onButtonClick}
        href={href}
        className="self-start"
      />
    </Card>
  );
}
