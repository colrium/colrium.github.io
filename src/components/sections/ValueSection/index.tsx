import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

const valueProps = [
	{
		icon: "rocket-launch-outline",
		title: "Ship With Certainty",
		description:
			"You get a software engineer who treats requirements as a conversation, not a handoff. I clarify ambiguity early, prototype fast, and deliver maintainable systems - not just working code.",
	},
	{
		icon: "ray-start-end",
		title: "End-to-End Ownership",
		description:
			"From spec to deployment, I own the full lifecycle. Architecture, security, testing, documentation, and mentoring - you don't need a team of specialists when one engineer brings the whole stack.",
	},
	{
		icon: "sync",
		title: "Adapt Quickly, Deliver Faster",
		description:
			"Nine years across web, mobile, backend, and AI automation means I adapt to your stack, not the other way around. Less ramp-up time, more shipping momentum from day one.",
	},
];

export default function ValueSection() {
	return (
		<section
			id="value"
			className="w-full py-16 md:py-28"
			aria-labelledby="value-heading"
		>
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 md:px-10">
				<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<span className="inline-flex rounded-full border border-secondary/20  bg-surface px-4 py-2 text-sm text-on-surface">
							What You Get
						</span>
						<h2
							id="value-heading"
							className="mt-8 text-3xl font-semibold tracking-tight text-on-surface sm:text-4xl md:text-5xl"
						>
							Beyond code. A reliable engineering partner.
						</h2>
					</div>
					<p className="max-w-md text-sm leading-7 text-on-surface/70 md:text-base">
						Hiring a contractor is a bet on delivery. Here is what
						that bet actually buys you - clarity, ownership, and
						momentum that compounds.
					</p>
				</div>

				<div className="grid gap-4 md:grid-cols-3">
					{valueProps.map((item, i) => (
						<Reveal
							key={item.title}
							delay={i * 100}
							direction="up"
							duration={600}
						>
							<Card
								component={"article"}
								className="flex h-full flex-col p-8"
							>
								<span
									className={`mdi mdi-${item.icon} text-4xl text-primary`}
									aria-hidden="true"
								/>
								<h3 className="mt-8 text-xl font-semibold text-on-surface">
									{item.title}
								</h3>
								<p className="mt-4 text-sm leading-7 text-on-surface/70">
									{item.description}
								</p>
							</Card>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}