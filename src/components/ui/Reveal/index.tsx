"use client";

import { useInView } from "@/lib/hooks/useInView";
import { useRef, type ReactNode } from "react";

interface RevealProps {
	children: ReactNode;
	className?: string;
	delay?: number;
	direction?: "up" | "down" | "left" | "right" | "none";
	duration?: number;
}

export default function Reveal({
	children,
	className = "",
	delay = 0,
	direction = "up",
	duration = 700,
}: RevealProps) {
    const ref = useRef<HTMLDivElement | null>(null);
	const inView = useInView(ref, { threshold: 0.05 });

	const getTransform = () => {
		if (inView) return "translate(0,0)";
		switch (direction) {
			case "up": return "translate(0, 40px)";
			case "down": return "translate(0, -40px)";
			case "left": return "translate(40px, 0)";
			case "right": return "translate(-40px, 0)";
			default: return "translate(0,0)";
		}
	};

	return (
		<div
			ref={ref}
			className={className}
			style={{
				opacity: inView ? 1 : 0,
				transform: getTransform(),
				transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
				transitionDelay: `${delay}ms`,
				willChange: "opacity, transform",
			}}
		>
			{children}
		</div>
	);
}