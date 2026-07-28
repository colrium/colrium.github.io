import Reveal from "@/components/ui/Reveal";

const quickFacts = [
	"BSc Computer Science, Kenyatta University",
	"Based in Nairobi, Kenya",
	"Remote-native across engineering and support teams",
	"Strong in communication, leadership, mentorship, and stakeholder management",
];

const principles = [
	"Secure, maintainable solutions over flashy complexity",
	"Documentation that reduces onboarding drag",
	"Pragmatic prototypes before expensive commitments",
	"Quality practices that make shipping calmer",
];

export default function Credentials() {
	return (
		<section
			id="credentials"
			className="w-full py-16 md:py-24"
			aria-labelledby="credentials-heading"
		>
			<div className="mx-auto grid w-full max-w-7xl gap-6 px-6 md:px-10 lg:grid-cols-2">
				<Reveal direction="up" duration={600} className="h-full">
					<div className="rounded-lg border border-on-surface/10 bg-surface p-6 md:p-8">
						<span className="inline-flex rounded-full border border-accent/20 px-4 py-2 text-sm text-on-surface">
							Credentials
						</span>
						<h2
							id="credentials-heading"
							className="mt-8 text-3xl font-semibold tracking-tight text-on-surface sm:text-4xl"
						>
							Computer science foundation, production-shaped
							judgment.
						</h2>
						<ul className="mt-10 flex flex-col gap-4">
							{quickFacts.map((fact) => (
								<li
									key={fact}
									className="flex gap-3 text-sm leading-7 text-on-surface/75"
								>
									<span
										className="mt-1 text-accent"
										aria-hidden="true"
									>
										-
									</span>
									<span>{fact}</span>
								</li>
							))}
						</ul>
					</div>
				</Reveal>

				<Reveal
					direction="up"
					duration={600}
					delay={150}
					className="h-full"
				>
					<div className="rounded-lg border border-on-surface/10 bg-surface p-6 md:p-8 h-full">
						<span className="inline-flex rounded-full border border-accent/20 px-4 py-2 text-sm text-on-surface">
							Operating Principles
						</span>
						<h3 className="mt-8 text-3xl font-semibold tracking-tight text-on-surface sm:text-4xl">
							The habits behind the work.
						</h3>
						<ul className="mt-10 flex flex-col gap-4">
							{principles.map((principle) => (
								<li
									key={principle}
									className="flex gap-3 text-sm leading-7 text-on-surface/75"
								>
									<span
										className="mt-1 text-secondary"
										aria-hidden="true"
									>
										-
									</span>
									<span>{principle}</span>
								</li>
							))}
						</ul>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
