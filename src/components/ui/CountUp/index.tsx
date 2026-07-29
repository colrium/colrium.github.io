"use client";

import { useInView } from "@/lib/hooks/useInView";
import { useIsMounted } from "@/lib/hooks/useIsMounted";
import { AnyTag } from "@/lib/types";
import React, { ElementType, useCallback, useEffect, useRef } from "react";

type SlotProps = Record<string, React.ComponentPropsWithoutRef<React.ElementType>>;

type CountUpProps<T extends AnyTag = 'span'> = {
	from?: number;
	to: number;
	duration?: number;
	delay?: number;
    suffix?: string;
    component?: T;
    slotProps ?: SlotProps;
	decimals?: number;
} & React.HTMLAttributes<HTMLSpanElement>;

export default function CountUp({
	from = 0,
	to,
	duration = 2000,
	delay = 0,
	suffix = "",
    decimals = 0,
    component,
    slotProps = {},
	...rest
}: CountUpProps) {
    const { suffix: suffixProps = {} } = slotProps;
	const ref = useRef<HTMLElement | null>(null);
	const timeoutId = useRef<number | null>(null);
	const Tag = (component ?? "span") as ElementType;
	const hasPlayed = useRef(false);
	const displayValue = useRef(from);
    const isMounted = useIsMounted();
    const inView = useInView(ref, { threshold: 0.3 });

    const animate = useCallback(() => {
		const start = performance.now();
		const range = to - from;

		function tick(now: number) {
			const elapsed = now - start;
			const progress = Math.min(elapsed / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			const current = from + range * eased;

			displayValue.current = current;
			if (ref.current) {
				ref.current.textContent = current.toFixed(decimals);
			}

			if (progress < 1) {
				requestAnimationFrame(tick);
			}
		}

		requestAnimationFrame(tick);
    }, [duration, from, to, decimals, suffix]);
    
	useEffect(() => {
		if (!isMounted || !ref.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting && !hasPlayed.current) {
					hasPlayed.current = true;
					timeoutId.current = window.setTimeout(() => {
						animate();
					}, delay);
					observer.unobserve(ref.current!);
				}
			},
			{ threshold: 0.3 },
		);

		observer.observe(ref.current);
		return () => {
			observer.disconnect();
			if (timeoutId.current !== null) {
				window.clearTimeout(timeoutId.current);
			}
		};
	}, [animate, delay, inView, isMounted]);

	

	if (!isMounted) {
		return (
			<Tag
				aria-hidden="true"
				style={{ visibility: "hidden" }}
				{...rest}
			/>
		);
	}

    return (
		<Tag {...rest}>
            <span ref={ref} suppressHydrationWarning></span>
            <span {...suffixProps}>
                {suffix}
            </span>
		</Tag>
	);
}
