"use client";

export default function ProjectsHero() {
	return (
		<div className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-surface-tint">
			{/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div
					className="absolute inset-0 opacity-[0.02]"
					style={{
						backgroundImage:
							"linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
						backgroundSize: "60px 60px",
						animation: "grid-pulse 8s ease-in-out infinite",
					}}
				/>
			</div> */}

			<div className="absolute right-[8%] top-[15%] hidden lg:flex flex-col gap-3">
				{[...Array(3)].map((_, i) => (
					<div
						key={i}
						className="w-24 h-16 rounded-lg border border-primary/20 bg-primary/5"
						style={{
							animation: `float-up ${4 + i * 0.5}s ease-in-out infinite`,
							animationDelay: `${i * 0.3}s`,
							transform: `rotate(${(i - 1) * 3}deg)`,
						}}
					>
						<div className="p-2 space-y-1">
							<div className="h-1.5 w-16 rounded bg-primary/20" />
							<div className="h-1 w-10 rounded bg-primary/10" />
						</div>
					</div>
				))}
			</div>

			<div className="absolute left-[8%] bottom-[20%] hidden lg:flex flex-col gap-3">
				{[...Array(3)].map((_, i) => (
					<div
						key={i}
						className="w-20 h-14 rounded-lg border border-accent/20 bg-accent/5"
						style={{
							animation: `float-up ${5 + i * 0.7}s ease-in-out infinite`,
							animationDelay: `${i * 0.5}s`,
							transform: `rotate(${(i - 1) * -2}deg)`,
						}}
					>
						<div className="p-2 space-y-1">
							<div className="h-1.5 w-14 rounded bg-accent/20" />
							<div className="h-1 w-8 rounded bg-accent/10" />
						</div>
					</div>
				))}
			</div>

			<div className="absolute right-[12%] bottom-[25%] hidden lg:block">
				{[...Array(4)].map((_, i) => (
					<div
						key={i}
						className="absolute w-1 h-1 rounded-full"
						style={{
							background: "var(--accent)",
							opacity: 0.3,
							animation: `orbit ${12 + i * 2}s linear infinite`,
							animationDelay: `${i * 0.4}s`,
						}}
					/>
				))}
			</div>

			<div className="relative z-10 flex flex-col items-center text-center px-6">
				<span className="inline-flex rounded-full border border-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-6">
					Selected Work
				</span>
				<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-on-surface tracking-tight leading-[1.05] max-w-5xl">
					Practical Systems Shipped Across{" "}
					<span className="text-accent">Organizations</span>, Sports,
					Health, Transport, Finance, and Climate
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
