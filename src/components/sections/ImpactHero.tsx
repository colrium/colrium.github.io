"use client";

const bars = [
	{ height: "40%", delay: "0.2s", color: "var(--primary)" },
	{ height: "65%", delay: "0.4s", color: "var(--primary)" },
	{ height: "50%", delay: "0.6s", color: "var(--accent)" },
	{ height: "80%", delay: "0.8s", color: "var(--primary)" },
	{ height: "55%", delay: "1s", color: "var(--primary)" },
	{ height: "90%", delay: "1.2s", color: "var(--accent)" },
	{ height: "45%", delay: "0.3s", color: "var(--primary)" },
	{ height: "70%", delay: "0.5s", color: "var(--primary)" },
	{ height: "60%", delay: "0.7s", color: "var(--accent)" },
];

export default function ImpactHero() {
	return (
		<div className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-surface-tint">
			<div className="absolute inset-0 flex items-center justify-center">
				<div
					className="absolute w-120 h-120 opacity-[0.03]"
					style={{
						background:
							"conic-gradient(from 0deg, var(--primary), var(--accent), var(--secondary), var(--primary))",
						animation: "spin-slow 30s linear infinite",
					}}
				/>
			</div>

			

			

			<div className="relative z-10 flex flex-col items-center text-center px-6">
				<span className="inline-flex rounded-full border border-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-6">
					Impact
				</span>
				<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-on-surface tracking-tight leading-[1.05] max-w-4xl">
					Numbers That{" "}
					<span className="text-accent">Speak</span> to Reliable
					Delivery
				</h1>
				<p className="mt-6 text-base md:text-lg text-on-surface/60 max-w-xl leading-relaxed">
					Shipped work, useful scale, and measurable improvements
					across every engagement.
				</p>
			</div>
		</div>
	);
}
