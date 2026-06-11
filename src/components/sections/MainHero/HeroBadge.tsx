import React from 'react';

interface HeroBadgeProps {
  icon: string;
  label: string;
  onToggleEasterEgg?: () => void;
}

export function HeroBadge({ icon, label, onToggleEasterEgg }: HeroBadgeProps) {
    const clicksRef = React.useRef(0);

    const handleClick = () => {
        clicksRef.current += 1;

        if (clicksRef.current === 3) {
            onToggleEasterEgg?.();
            clicksRef.current = 0; // reset after triggering
        }
    };

  return (
    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-transparent backdrop-blur-md border border-accent/20 mx-auto mb-6 w-fit shadow-sm animate-fade-in cursor-pointer" onClick={handleClick}>
      <span className="material-symbols-outlined text-sm text-accent">
        {icon}
      </span>
      <span className="text-sm font-thin text-on-surface">
        {label}
      </span>
    </button>
  );
}
