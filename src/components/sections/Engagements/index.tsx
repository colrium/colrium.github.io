import Reveal from "@/components/ui/Reveal";

const engagements = [
	{
		title: "Remote Product Engineering",
		icon: "terminal",
		copy:
			"Feature delivery, refactoring, code review, API work, and frontend systems inside distributed teams.",
	},
	{
		title: "AI Automation Contracts",
		icon: "auto_awesome",
		copy:
			"Short, focused automation builds for documentation, testing, prototyping, search, and productivity workflows.",
	},
	{
		title: "Mobile and Field Tools",
		icon: "smartphone",
		copy:
			"React Native, Android, and iOS delivery for teams that need reliable mobile workflows in production.",
	},
	{
		title: "Technical Leadership",
		icon: "hub",
		copy:
			"Architecture notes, migration planning, mentoring, delivery hygiene, and maintainable team practices.",
	},
];

export default function Engagements() {
	return (
		<section
			id="engagements"
			className="w-full bg-surface py-16 md:py-24"
			aria-labelledby="engagements-heading"
		>
			<div className="mx-auto grid w-full max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
				<div>
					<span className="inline-flex rounded-full border border-accent/20 px-4 py-2 text-sm text-on-surface">
						Best Fit
					</span>
					<h2
						id="engagements-heading"
						className="mt-8 text-3xl font-semibold tracking-tight text-on-surface sm:text-4xl md:text-5xl"
					>
						Where I can plug in and create momentum.
					</h2>
					<p className="mt-6 text-base leading-8 text-on-surface/70">
						Useful for recruiters, founders, and teams who need to quickly
						understand the kind of work that matches my background.
					</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-2">
					{engagements.map((item, i) => (
						<Reveal key={item.title} delay={i * 100} direction="up" duration={600}>
						<article
							className="rounded-lg border border-on-surface/10 bg-surface-tint p-6 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(255,153,28,0.06)] hover:border-accent/20"
						>
							<span
								className="material-symbols-outlined text-accent"
								aria-hidden="true"
							>
								{item.icon}
							</span>
							<h3 className="mt-8 text-xl font-semibold text-on-surface">
								{item.title}
							</h3>
							<p className="mt-4 text-sm leading-7 text-on-surface/70">
								{item.copy}
							</p>
						</article>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
