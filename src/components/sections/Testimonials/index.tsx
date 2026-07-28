import Reveal from "@/components/ui/Reveal";

const testimonials = [
	{
		quote:
			"Collins consistently delivers high-quality work with minimal supervision. His ability to grasp complex requirements and translate them into robust, maintainable code is remarkable. A true asset to any engineering team.",
		author: "Engineering Lead",
		role: "Stream4Tech LLC",
	},
	{
		quote:
			"Working with Collins felt like having a whole product team in one person. He owned the architecture, the code, the deployment - and still found time to document everything and upskill the rest of us.",
		author: "Product Manager",
		role: "Chalkstone Ltd",
	},
	{
		quote:
			"Collins brought both technical depth and calm leadership to every engagement. He asks the right questions early, ships on time, and leaves the codebase cleaner than he found it.",
		author: "CTO",
		role: "Previous Collaboration",
	},
];

export default function Testimonials() {
	return (
		<section
			id="testimonials"
			className="w-full py-16 md:py-28"
			aria-labelledby="testimonials-heading"
		>
			<div className="mx-auto w-full max-w-7xl px-6 md:px-10">
				<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<span className="inline-flex rounded-full border border-accent/20 px-4 py-2 text-sm text-on-surface">
							What People Say
						</span>
						<h2
							id="testimonials-heading"
							className="mt-8 text-3xl font-semibold tracking-tight text-on-surface sm:text-4xl md:text-5xl"
						>
							Reputation earned through delivery.
						</h2>
					</div>
					<p className="max-w-md text-sm leading-7 text-on-surface/70 md:text-base">
						The best signal of what it is like to work with someone comes
						from the people who have done it.
					</p>
				</div>

				<div className="mt-12 grid gap-6 md:grid-cols-3">
					{testimonials.map((item, i) => (
						<Reveal
							key={i}
							delay={i * 100}
							direction="up"
							duration={600}
						>
							<blockquote className="flex h-full flex-col justify-between rounded-xl border border-on-surface/10 bg-surface-tint p-8 transition-all duration-400 hover:-translate-y-1 hover:border-accent/20">
								<p className="text-sm leading-7 text-on-surface/70 italic">
									&ldquo;{item.quote}&rdquo;
								</p>
								<footer className="mt-8 border-t border-on-surface/10 pt-6">
									<strong className="block text-sm font-semibold text-on-surface">
										{item.author}
									</strong>
									<span className="text-xs text-on-surface-mute">
										{item.role}
									</span>
								</footer>
							</blockquote>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}