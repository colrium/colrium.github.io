import Reveal from "@/components/ui/Reveal";

const steps = [
	{
		number: "01",
		title: "Translate requirements",
		copy:
			"Convert user needs, stakeholder goals, and business constraints into pragmatic, testable product direction.",
	},
	{
		number: "02",
		title: "Prototype fast",
		copy:
			"Use broad-stack fluency and AI-assisted workflows to explore options quickly before committing to the right build path.",
	},
	{
		number: "03",
		title: "Build securely",
		copy:
			"Design maintainable APIs, components, data flows, security configuration, and deployment paths that can survive production.",
	},
	{
		number: "04",
		title: "Document and mentor",
		copy:
			"Leave the team stronger through migration notes, architecture docs, code review, testing habits, and knowledge sharing.",
	},
];

export default function Process() {
	return (
		<section
			id="process"
			className="w-full py-16 md:py-28"
			aria-labelledby="process-heading"
		>
			<div className="mx-auto w-full max-w-7xl px-6 md:px-10">
				<div className="max-w-3xl">
					<span className="inline-flex rounded-full border border-accent/20 px-4 py-2 text-sm text-on-surface">
						How I Work
					</span>
					<h2
						id="process-heading"
						className="mt-8 text-3xl font-semibold tracking-tight text-on-surface sm:text-4xl md:text-5xl"
					>
						Fast adaptation, clear delivery, durable handoff.
					</h2>
				</div>

				<div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-primary/10 bg-surface md:grid-cols-2 lg:grid-cols-4">
					{steps.map((step, i) => (
						<Reveal key={step.number} delay={i * 120} direction="up" duration={600}>
						<article
							className="min-h-[280px] p-6"
						>
							<p className="font-display text-6xl text-accent/30">
								{step.number}
							</p>
							<h3 className="mt-8 text-xl font-semibold text-on-surface">
								{step.title}
							</h3>
							<p className="mt-4 text-sm leading-7 text-on-surface/70">
								{step.copy}
							</p>
						</article>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
