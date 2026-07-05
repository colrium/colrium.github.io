"use client";

import ShuffleText from "../ui/ShuffleText";

const milestones = [
	{ year: "2017", label: "Started" },
	{ year: "2019", label: "Support Lead" },
	{ year: "2021", label: "Senior Dev" },
	{ year: "2023", label: "L5 Engineer" },
	{ year: "2025", label: "AI Automation" },
];

export default function ExperienceHero() {
	return (
		<div className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-surface">
			<div className="absolute left-[10%] top-1/3 hidden md:block">
				<div
					className="w-120 h-120  bg-primary/3"
					style={{
						animation: "morph-shape 8s ease-in-out infinite",
					}}
				/>
			</div>

			<div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[60%] max-w-xl hidden md:block">
				<div className="relative h-px bg-linear-to-r from-transparent via-on-surface/20 to-transparent">
					{milestones.map((m, i) => (
						<div
							key={m.year}
							className="absolute -top-2 -translate-x-1/2 flex flex-col items-center gap-1"
							style={{ left: `${i * 25}%` }}
						>
							<div className="w-1.5 h-1.5 rounded-full bg-secondary" />
							<span className="absolute top-3 left-1/2 -translate-x-1/2 text-sm text-on-surface-mute whitespace-nowrap">
								{m.year}
							</span>
						</div>
					))}
				</div>
			</div>

			<div className="relative z-10 flex flex-col items-center text-center px-6">
				<span className="inline-flex rounded-full border border-secondary/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-6">
					Experience
				</span>
				<ShuffleText
					component="h1"
					className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-on-surface tracking-tight leading-[1.05] max-w-4xl"
				>
					Nine Years of Shipping Software
				</ShuffleText>
				<p className="mt-6 text-base md:text-lg text-on-surface/60 max-w-xl leading-relaxed">
					From client platforms and SaaS support to remote product
					teams, technical leadership, mobile apps, and AI-assisted
					automation.
				</p>
			</div>
		</div>
	);
}
