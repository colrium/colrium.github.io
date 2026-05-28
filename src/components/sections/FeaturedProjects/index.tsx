const projects = [
	{
		title: "Grand Master Ledger",
		type: "Chess Analysis Platform",
		description:
			"Built a comprehensive chess analysis tool that integrates with chess.com and lichess to track skill progression, analyze games with Stockfish, and deliver personalized coaching recommendations based on performance patterns.",
		stack: ["Python", "Next.js", "Node.js", "Stockfish", "API Integration"],
		outcome:
			"Provides players with data-driven insights into their gameplay and targeted improvement strategies across multiple platforms.",
	},
	{
		title: "Creuse",
		type: "Cab Hailing Platform",
		description:
			"Built a Kenyan alternative to ride-hailing services, enabling seamless connections between drivers and passengers with real-time tracking and payment integration.",
		stack: [
			"PHP",
			"Laravel",
			"Kotlin",
			"Mobile Development",
			"Real-time Systems",
		],
		outcome:
			"Delivered a functional ride-hailing platform tailored to local market needs and user workflows.",
	},
	{
		title: "CAT (Connect Assure Technology)",
		type: "Data Export Software",
		description:
			"Developed data export software that promotes compliance by interfacing compatible STERIS products with leading instrument tracking systems.",
		stack: [
			"Data Integration",
			"Compliance",
			"API Development",
			"STERIS Systems",
		],
		outcome:
			"Enabled seamless data synchronization across facility management systems to streamline compliance workflows.",
	},
	{
		title: "Non-Profits CRM",
		type: "Custom Product Build",
		description:
			"Designed and implemented a custom CRM solution for ActionAid Kenya, shaped around non-profit operations and stakeholder workflows.",
		stack: [
			"Full-Stack Development",
			"Product Thinking",
			"API Design",
			"QA",
		],
		outcome:
			"Converted organization-specific requirements into a shipped operational tool.",
	},

	{
		title: "Fixed Assets Tracker",
		type: "Web and Mobile Platform",
		description:
			"Created a fixed-assets lifecycle tracker for custody, allocation, depreciation, and client-side asset visibility.",
		stack: ["Web", "Mobile", "Databases", "Automation"],
		outcome:
			"Shipped to roughly 30 clients and tracks more than 1 million assets.",
	},
	{
		title: "ECO Calc",
		type: "GHG Emissions and Projections Calculator",
		description:
			"Built a proof of concept for greenhouse gas emissions accounting and projection, turning environmental inputs into useful estimates.",
		stack: ["Prototyping", "Data Modeling", "Product Design", "Reporting"],
		outcome:
			"Explored climate-accounting workflows through a practical calculator interface.",
	},
];

export default function FeaturedProjects() {
	return (
		<section
			id="work"
			className="w-full py-16 md:py-28"
			aria-labelledby="featured-projects-heading"
		>
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 md:px-10">
				<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<span className="inline-flex rounded-full border border-accent/20 px-4 py-2 text-sm text-on-surface">
                            
							Selected Work
						</span>
						<h2
							id="featured-projects-heading"
							className="mt-8 text-3xl font-semibold tracking-tight text-on-surface sm:text-4xl md:text-5xl"
						>
							Practical systems shipped across organizations, assets, and climate data.
						</h2>
					</div>
					<p className="max-w-md text-sm leading-7 text-on-surface/70 md:text-base">
						A few examples from product work and personal experiments,
						grounded in real users, real constraints, and measurable outcomes.
					</p>
				</div>

				<div className="grid gap-4 lg:grid-cols-3">
					{projects.map((project) => (
						<article
							key={project.title}
							className="flex min-h-[360px] flex-col justify-between rounded-lg border border-on-surface/10 bg-surface p-6 transition hover:border-accent/40"
						>
							<div>
								<div className="mb-8 flex items-center justify-between gap-4">
									<span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
										{project.type}
									</span>
									{/* <span
										className="material-symbols-outlined text-primary"
										aria-hidden="true"
									>
										arrow_outward
									</span> */}
								</div>
								<h3 className="text-2xl font-semibold text-on-surface">
									{project.title}
								</h3>
								<p className="mt-5 text-sm leading-7 text-on-surface/70">
									{project.description}
								</p>
							</div>

							<div className="mt-10">
								<p className="border-l border-secondary pl-4 text-sm leading-6 text-on-surface">
									{project.outcome}
								</p>
								<div className="mt-6 flex flex-wrap gap-2">
									{project.stack.map((item) => (
										<span
											key={item}
											className="rounded-full border border-on-surface/15 px-3 py-1 text-xs text-on-surface-mute"
										>
											{item}
										</span>
									))}
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
