"use client";

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
			<div className="absolute inset-0 flex items-center justify-center">
				<div
					className="absolute w-80 h-80 rounded-full border border-secondary/10"
					style={{ animation: "pulse-scale-slow 6s ease-in-out infinite" }}
				/>
			</div>

			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-[15%] hidden lg:block">
					{[...Array(3)].map((_, i) => (
						<div
							key={i}
							className="absolute w-2 h-2 rounded-full"
							style={{
								background: "var(--secondary)",
								opacity: 0.3,
								animation: `orbit ${8 + i * 3}s linear infinite`,
								animationDelay: `${i * 0.5}s`,
							}}
						/>
					))}
				</div>
				<div className="absolute bottom-1/3 right-[15%] hidden lg:block">
					{[...Array(3)].map((_, i) => (
						<div
							key={i}
							className="absolute w-1.5 h-1.5 rounded-full"
							style={{
								background: "var(--primary)",
								opacity: 0.25,
								animation: `orbit-reverse ${10 + i * 4}s linear infinite`,
								animationDelay: `${i * 0.8}s`,
							}}
						/>
					))}
				</div>
			</div>

			<div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[60%] max-w-xl hidden md:block">
				<div className="relative h-px bg-gradient-to-r from-transparent via-on-surface/20 to-transparent">
					{milestones.map((m, i) => (
						<div
							key={m.year}
							className="absolute -top-3"
							style={{ left: `${i * 25}%` }}
						>
							<div className="w-1.5 h-1.5 rounded-full bg-secondary" />
							<span className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] text-on-surface-mute whitespace-nowrap">
								{m.year}
							</span>
						</div>
					))}
				</div>
			</div>

			<div className="relative z-10 flex flex-col items-center text-center px-6">
				<span className="inline-flex rounded-full border border-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-6">
					Experience
				</span>
				<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-on-surface tracking-tight leading-[1.05] max-w-4xl">
					Nine Years of{" "}
					<span className="text-secondary">Shipping</span> Software
				</h1>
				<p className="mt-6 text-base md:text-lg text-on-surface/60 max-w-xl leading-relaxed">
					From client platforms and SaaS support to remote product
					teams, technical leadership, mobile apps, and AI-assisted
					automation.
				</p>
			</div>
		</div>
	);
}
