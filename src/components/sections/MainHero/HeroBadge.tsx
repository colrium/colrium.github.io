import React, { useState, useCallback, useRef } from 'react';

interface HeroBadgeProps {
  icon: string;
  label: string;
  startValue?: number;
  onToggleEasterEgg?: () => void;
}

export function HeroBadge({
	icon,
	label,
	onToggleEasterEgg,
	startValue = 3,
}: HeroBadgeProps) {

	const [count, setCount] = useState<number | null>(null);
	const [visible, setVisible] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const showNumber = useCallback((n: number) => {
		setCount(n);
		setVisible(true);
		timeoutRef.current = setTimeout(() => setVisible(false), 600);
	}, []);

	const handleClick = useCallback(() => {
		if (count === null) {
			showNumber(startValue);
			return;
		}
		if (count <= 1) {
			setVisible(false);
			timeoutRef.current = setTimeout(() => {
				onToggleEasterEgg?.();
				setCount(null);
			}, 600);
			return;
		}
		showNumber(count - 1);
	}, [count, startValue, showNumber, onToggleEasterEgg]);

	

	return (
		<div className="relative mx-auto mb-6 w-fit">
			<button
				onClick={handleClick}
				className="flex items-center gap-2 px-4 py-2 rounded-full bg-transparent backdrop-blur-md border border-accent/20 mx-auto w-fit shadow-sm cursor-pointer transition-all duration-500 hover:border-accent/60 hover:shadow-[0_0_20px_rgba(255,153,28,0.15)] animate-hero-badge-pulse"
			>
				<span className={`mdi mdi-${icon} text-sm text-accent`} />
				<span className="text-sm font-thin text-on-surface">
					{label}
				</span>
			</button>
			{count !== null && (
				<div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[9999]">
					<span
						key={count + "-" + visible}
						className={`text-[12rem] font-extrabold text-accent drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-600 ease-out ${
							visible
								? "opacity-100 scale-100"
								: "opacity-0 scale-50"
						}`}
					>
						{count}
					</span>
				</div>
			)}
		</div>
	);
}
