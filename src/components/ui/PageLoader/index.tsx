"use client";

import { useEffect, useState, useRef } from "react";
import ShuffleTextComponent from "../ShuffleText";

export default function PageLoader() {
	const [progress, setProgress] = useState(0);
	const [exiting, setExiting] = useState(false);
	const [gone, setGone] = useState(false);
	const rafRef = useRef<number>(0);
	const loadedRef = useRef(false);
	const overlayRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const phases = [
			{ limit: 15, speed: 35 },
			{ limit: 35, speed: 18 },
			{ limit: 55, speed: 8 },
			{ limit: 75, speed: 4 },
			{ limit: 90, speed: 1.5 },
		];
		let currentPhase = 0;

		const tick = () => {
			if (loadedRef.current) return;
			setProgress((prev) => {
				if (prev >= 99) return 99;
				const phase = phases[Math.min(currentPhase, phases.length - 1)];
				const next = prev + phase.speed * (0.8 + Math.random() * 0.4);
				if (next >= phase.limit && currentPhase < phases.length - 1) {
					currentPhase++;
				}
				return Math.min(next, 99);
			});
			rafRef.current = requestAnimationFrame(tick);
		};

		rafRef.current = requestAnimationFrame(tick);

		const finish = () => {
			if (loadedRef.current) return;
			loadedRef.current = true;
			cancelAnimationFrame(rafRef.current);

			let p = 0;
			setProgress((prev) => {
				p = prev;
				return prev;
			});

			const fill = () => {
				p += (100 - p) * 0.25;
				setProgress(Math.min(p, 100));

				// KEY FIX: exit condition with a real threshold, not asymptotic check
				if (100 - p > 0.5) {
					rafRef.current = requestAnimationFrame(fill);
				} else {
					setProgress(100);
					rafRef.current = requestAnimationFrame(() => {
						setExiting(true);

						const el = overlayRef.current;
						if (!el) {
							setTimeout(() => setGone(true), 750);
							return;
						}

						// prefer transitionend over a blind timeout
						const onEnd = () => {
							el.removeEventListener("transitionend", onEnd);
							setGone(true);
						};
						el.addEventListener("transitionend", onEnd);
						// fallback in case transitionend never fires
						setTimeout(onEnd, 900);
					});
				}
			};

			rafRef.current = requestAnimationFrame(fill);
		};

		if (document.readyState === "complete") {
			finish();
		} else {
			window.addEventListener("load", finish, { once: true });
		}

		return () => {
			cancelAnimationFrame(rafRef.current);
			window.removeEventListener("load", finish);
		};
	}, []);

	if (gone) return null;

	return (
		<div
			ref={overlayRef}
			className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none transition-opacity duration-700
        ${exiting ? "opacity-0 pointer-events-none" : "opacity-100"}`}
			style={{ backgroundColor: "var(--surface-tint)" }}
		>
			<div className="flex flex-col items-center gap-10">
				<ShuffleTextComponent
					className="uppercase text-5xl tracking-tighter text-primary"
                    
				>
					Mutugi
				</ShuffleTextComponent>

				<div
					className="w-48 h-px rounded-full overflow-hidden"
					style={{
						backgroundColor:
							"color-mix(in srgb, var(--on-surface-mute) 20%, transparent)",
					}}
				>
					<div
						className="h-full rounded-full transition-[width] duration-150 ease-out"
						style={{
							width: `${progress}%`,
							backgroundColor: "var(--accent)",
						}}
					/>
				</div>

				<div className="flex items-baseline gap-1">
					<span
						className="text-5xl font-bold tabular-nums tracking-tighter"
						style={{ color: "var(--on-surface)" }}
					>
						{Math.round(progress)}
					</span>
					<span
						className="font-[family-name:var(--font-plus-jakarta-sans)] text-5xl font-bold tracking-tighter"
						style={{ color: "var(--accent)" }}
					>
						%
					</span>
				</div>
			</div>
		</div>
	);
}
