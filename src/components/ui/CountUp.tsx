"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
	from?: number;
	to: number;
	duration?: number;
	suffix?: string;
	decimals?: number;
} & React.HTMLAttributes<HTMLSpanElement>;

export default function CountUp({
	from = 0,
	to,
	duration = 2000,
	suffix = "",
	decimals = 0,
	...rest
}: CountUpProps) {
	const ref = useRef<HTMLSpanElement | null>(null);
	const [isMounted, setIsMounted] = useState(false);
	const hasPlayed = useRef(false);
	const displayValue = useRef(from);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (!isMounted || !ref.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting && !hasPlayed.current) {
					hasPlayed.current = true;
					animate();
					observer.unobserve(ref.current!);
				}
			},
			{ threshold: 0.3 },
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [isMounted]);

	function animate() {
		const start = performance.now();
		const range = to - from;

		function tick(now: number) {
			const elapsed = now - start;
			const progress = Math.min(elapsed / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			const current = from + range * eased;

			displayValue.current = current;
			if (ref.current) {
				ref.current.textContent = current.toFixed(decimals) + suffix;
			}

			if (progress < 1) {
				requestAnimationFrame(tick);
			}
		}

		requestAnimationFrame(tick);
	}

	if (!isMounted) {
		return (
			<span aria-hidden="true" style={{ visibility: "hidden" }} {...rest} />
		);
	}

	return (
		<span
			ref={ref}
			suppressHydrationWarning
			{...rest}
		/>
	);
}
