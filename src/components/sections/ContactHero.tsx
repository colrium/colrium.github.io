"use client";

export default function ContactHero() {
	return (
		<div className="relative w-full min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden ">
			<div className="absolute left-[30%] top-1/3 hidden md:block">
				<div
					className="w-[20dvw] h-[20dvw] opacity-50 bg-surface rounded-full"
					style={{
						animation: "morph-shape 8s ease-in-out infinite",
					}}
				/>
			</div>
			

			

			<div className="relative z-10 flex flex-col items-center text-center px-6">
				<span className="inline-flex rounded-full bg-surface  border border-secondary/20 px-4 py-2 text-sm text-on-surface mb-6">
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
