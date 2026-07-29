"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
	threshold?: number;
	rootMargin?: string;
	once?: boolean;
}

export function useInView(
	ref: React.RefObject<HTMLElement | null>,
	{
		threshold = 0.1,
		rootMargin = "0px 0px -60px 0px",
		once = true,
	}: UseInViewOptions = {},
) {
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					if (once) observer.unobserve(el);
				} else if (!once) {
					setInView(false);
				}
			},
			{ threshold, rootMargin },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [threshold, rootMargin, once, ref]);

	return inView;
}