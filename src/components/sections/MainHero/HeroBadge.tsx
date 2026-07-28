import React, { useState } from 'react';

interface HeroBadgeProps {
  icon: string;
  label: string;
  onToggleEasterEgg?: () => void;
}

export function HeroBadge({ icon, label, onToggleEasterEgg }: HeroBadgeProps) {
    const clicksRef = React.useRef(0);
    const [hint, setHint] = useState(false);

    const handleClick = () => {
        clicksRef.current += 1;

        if (clicksRef.current === 3) {
            onToggleEasterEgg?.();
            clicksRef.current = 0;
        }
    };

  return (
    <div className="relative mx-auto mb-6 w-fit">
      <button
        onClick={handleClick}
        onMouseEnter={() => setHint(true)}
        onMouseLeave={() => setHint(false)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-transparent backdrop-blur-md border border-accent/20 mx-auto w-fit shadow-sm cursor-pointer transition-all duration-500 hover:border-accent/60 hover:shadow-[0_0_20px_rgba(255,153,28,0.15)] animate-hero-badge-pulse"
      >
        <span className="material-symbols-outlined text-sm text-accent">
          {icon}
        </span>
        <span className="text-sm font-thin text-on-surface">
          {label}
        </span>
      </button>
      <span
        className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-accent/40 transition-all duration-500 whitespace-nowrap ${
          hint ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        }`}
      >
        click 3x
      </span>
    </div>
  );
}
