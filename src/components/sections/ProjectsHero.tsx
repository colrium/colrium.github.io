"use client";

export default function ProjectsHero() {
	return (
		<div className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-surface-tint">
			<div className="relative z-10 flex flex-col items-center text-center px-6">
				<span className="inline-flex rounded-full border border-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-6">
					Selected Work
				</span>
				<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-on-surface tracking-tight leading-[1.05] max-w-5xl">
					<span className="text-accent">{`Practical `}</span>
					<span>
						Systems Shipped Across Organizations, Sports, Health,
						Transport, Finance, and Climate
					</span>
				</h1>
				<p className="mt-6 text-base md:text-lg text-on-surface/60 max-w-xl leading-relaxed">
					A few examples from product work and personal experiments,
					grounded in real users, real constraints, and measurable
					outcomes.
				</p>
			</div>
		</div>
	);
}
