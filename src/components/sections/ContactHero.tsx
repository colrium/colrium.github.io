"use client";

export default function ContactHero() {
	return (
		<div className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-surface">
			<div className="absolute left-[30%] top-1/3 hidden md:block">
				<div
					className="w-[30dvw] h-[30dvw] opacity-20 bg-primary/10"
					style={{
						animation: "morph-shape 8s ease-in-out infinite",
					}}
				/>
			</div>
			<div className="absolute inset-0 flex items-center justify-center">
				<div
					className="absolute w-lg h-128 rounded-full border border-accent/15"
					style={{ animation: "pulse-scale 4s ease-in-out infinite" }}
				/>
				<div
					className="absolute w-[24rem] h-96 rounded-full border border-primary/15"
					style={{
						animation: "pulse-scale 4s ease-in-out infinite",
						animationDelay: "1s",
					}}
				/>
				<div
					className="absolute w-[16rem] h-64 rounded-full border border-secondary/15"
					style={{
						animation: "pulse-scale 4s ease-in-out infinite",
						animationDelay: "2s",
					}}
				/>
			</div>

			{/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(12)].map((_, i) => (
					<span
						key={i}
						className="absolute w-1 h-1 rounded-full"
						style={{
							background: i % 3 === 0
								? "var(--accent)"
								: i % 3 === 1
									? "var(--primary)"
									: "var(--secondary)",
							top: `${20 + (i * 7) % 60}%`,
							left: `${10 + (i * 11) % 80}%`,
							opacity: 0.4,
							animation: `float-up ${3 + (i % 3) * 1.5}s ease-in-out infinite`,
							animationDelay: `${i * 0.4}s`,
						}}
					/>
				))}
			</div> */}

			<div className="relative z-10 flex flex-col items-center text-center px-6">
				<span className="inline-flex rounded-full border border-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-6">
					Get in Touch
				</span>
				<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-on-surface tracking-tight leading-[1.05] max-w-3xl">
					Let&apos;s Build
					<span className="text-primary"> Something</span> Worth
					Shipping
				</h1>
				<p className="mt-6 text-base md:text-lg text-on-surface/60 max-w-xl leading-relaxed">
					Open to remote software engineering roles, AI automation
					work, technical leadership, and focused product builds.
				</p>
			</div>
		</div>
	);
}
