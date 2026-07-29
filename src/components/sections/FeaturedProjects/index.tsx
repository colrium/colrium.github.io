import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

	const projects = [
	{
		title: "Grand Master Ledger",
		type: "Chess Analysis Platform",
		description:
			"Built a comprehensive chess analysis tool that integrates with chess.com and lichess to track skill progression, analyze games with Stockfish, and deliver personalized coaching recommendations based on performance patterns.",
		stack: ["Python", "Next.js", "Node.js", "Stockfish", "API Integration"],
		outcome:
			"Provides players with data-driven insights into their gameplay and targeted improvement strategies across multiple platforms.",
		github: "https://github.com/colrium/gm-ledger",
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
            "M-PESA"
		],
		outcome:
			"Delivered a functional ride-hailing platform tailored to local market needs and user workflows.",
		github: "https://github.com/colrium/creuse-user",
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
		github: "https://github.com/colrium/fixedassets-legacy",
	},
	{
		title: "ECO Calc",
		type: "GHG Emissions and Projections Calculator",
		description:
			"Built a proof of concept for greenhouse gas emissions accounting and projection, turning environmental inputs into useful estimates.",
		stack: ["Prototyping", "Data Modeling", "Product Design", "Reporting"],
		outcome:
			"Explored climate-accounting workflows through a practical calculator interface.",
		github: "https://github.com/colrium/co2-calc-fe",
    },

    
];

export default function FeaturedProjects() {
	return (
		<section
			id="projects"
			className="w-full py-16 md:py-28"
			aria-labelledby="featured-projects-heading"
		>
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 md:px-10">
				<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<span className="inline-flex rounded-full bg-surface border border-secondary/20 px-4 py-2 text-sm text-on-surface">
							Selected Work
						</span>
						<h2
							id="featured-projects-heading"
							className="mt-8 text-3xl font-semibold tracking-tight text-on-surface sm:text-4xl md:text-5xl"
						>
							Practical systems shipped across organizations,
							sports, health, transport, finance, and climate
							sectors.
						</h2>
					</div>
					<p className="max-w-md text-sm leading-7 text-on-surface/70 md:text-base">
						A few examples from product work and personal
						experiments, grounded in real users, real constraints,
						and measurable outcomes.
					</p>
				</div>

				<div className="grid gap-4 lg:grid-cols-3">
					{projects.map((project, i) => (
						<Reveal
							key={project.title}
							delay={i * 80}
							direction="up"
							duration={600}
						>
							<Card
								component={"article"}
								className="flex min-h-90 h-full flex-col justify-between p-6 transition-all duration-400 hover:border-accent/50 group/card"
							>
								<div>
									<div className="mb-8 flex items-center justify-between gap-4">
										<span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
											{project.type}
										</span>
										{project.github && (
											<a
												href={project.github}
												target="_blank"
												rel="noopener noreferrer"
												className="opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 text-on-surface/50 hover:text-primary"
												aria-label={`${project.title} repository`}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
												</svg>
											</a>
										)}
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
												className="rounded-full border border-secondary/20 px-3 py-1 text-xs text-on-surface transition-colors duration-300 group-hover/card:border-secondary/30 group-hover/card:text-primary/80"
											>
												{item}
											</span>
										))}
									</div>
								</div>
							</Card>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
