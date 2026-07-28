import ShuffleText from "@/components/ui/ShuffleText";
import Reveal from "@/components/ui/Reveal";

const highlights = [
	{
		value: "95%",
		label: "CSAT",
		detail: "Consistently high customer satisfaction scores across all client engagements and projects.",
	},
	{
		value: "20+",
		label: "client products deployed",
		detail: "Delivered at Idea Kenya with a 100% on-time delivery rate.",
	},
	{
		value: "1m+",
		label: "mobile app downloads",
		detail: "Across two Tier-1 apps maintained with Java, Kotlin, and Swift.",
	},
	{
		value: "30%",
		label: "technical debt reduced",
		detail: "Through refactoring and performance tuning at Stream4Tech.",
	},
];

export default function ImpactHighlights() {
	return (
		<section
			id="impact"
			className="w-full py-16 md:py-24"
			aria-labelledby="impact-heading"
		>
			<div className="mx-auto w-full max-w-7xl px-6 md:px-10">
				<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<span className="inline-flex rounded-full border border-accent/20 px-4 py-2 text-sm text-on-surface">
							Impact
						</span>
						<ShuffleText
							component="h2"
							id="impact-heading"
							className="mt-8 text-3xl font-semibold tracking-tight text-on-surface sm:text-4xl md:text-5xl"
							sourceRandomCharacter={"_-"}
						>
							Numbers that point to reliable delivery.
						</ShuffleText>
					</div>
					<p className="max-w-md text-sm leading-7 text-on-surface/70 md:text-base">
						These are the quiet signals I like in a portfolio:
						shipped work, useful scale, and measurable improvements.
					</p>
				</div>

				<div className="mt-12 grid overflow-hidden rounded-xl border border-primary/10 bg-surface sm:grid-cols-2 lg:grid-cols-4">
					{highlights.map((item, i) => (
						<Reveal key={item.label} delay={i * 100} direction="up" duration={600}>
						<article className="p-6">
							<p className="font-display text-6xl text-primary">
								{item.value}
							</p>
							<h3 className="mt-6 text-lg font-semibold text-on-surface">
								{item.label}
							</h3>
							<p className="mt-4 text-sm leading-7 text-on-surface/70">
								{item.detail}
							</p>
						</article>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
