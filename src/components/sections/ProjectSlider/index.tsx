"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const slides = [
	{
		src: "/media/gran-master-ledger.png",
		alt: "Grand Master Ledger",
		title: "Grand Master Ledger",
	},
	{
		src: "/media/ecocalc.png",
		alt: "ECO Calc",
		title: "ECO Calc",
	},
	{
		src: "/media/ecocalce-2.png",
		alt: "ECO Calc 2",
		title: "ECO Calc 2",
	},
	{
		src: "/media/afrigold-hub.png",
		alt: "Afrigold Hub",
		title: "Afrigold Hub",
	},
	{
		src: "/media/anthropodata.png",
		alt: "Anthropodata",
		title: "Anthropodata",
	},
];

export default function ProjectSlider() {
	const [current, setCurrent] = useState(0);

	const next = useCallback(() => {
		setCurrent((prev) => (prev + 1) % slides.length);
	}, []);

	useEffect(() => {
		const timer = setInterval(next, 4000);
		return () => clearInterval(timer);
	}, [next]);

	return (
		<section className="w-full py-16 md:py-28">
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 md:px-10">
				<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<span className="inline-flex rounded-full bg-surface border border-secondary/20 px-4 py-2 text-sm text-on-surface">
							Screenshots
						</span>
						<h2 className="mt-8 text-3xl font-semibold tracking-tight text-on-surface sm:text-4xl md:text-5xl">
							A look at the work
						</h2>
					</div>
					<p className="max-w-md text-sm leading-7 text-on-surface/70 md:text-base">
						Project screenshots and interfaces from recent builds.
					</p>
				</div>

				<div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-surface">
					<div className="relative aspect-video w-full">
						{slides.map((slide, i) => (
							<div
								key={slide.src}
								className={`absolute inset-0 transition-opacity duration-700 ${
									i === current
										? "opacity-100"
										: "opacity-0"
								}`}
							>
								<Image
									src={slide.src}
									alt={slide.alt}
									fill
									className="object-cover"
									sizes="(max-width: 1280px) 100vw, 1280px"
									priority={i === 0}
								/>
								<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-20">
									<h3 className="text-xl font-semibold text-white">
										{slide.title}
									</h3>
								</div>
							</div>
						))}
					</div>

					<div className="absolute bottom-4 right-6 flex gap-2">
						{slides.map((_, i) => (
							<button
								key={i}
								type="button"
								onClick={() => setCurrent(i)}
								className={`h-2 rounded-full transition-all duration-300 ${
									i === current
										? "w-8 bg-accent"
										: "w-2 bg-white/40 hover:bg-white/70"
								}`}
								aria-label={`Go to slide ${i + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
