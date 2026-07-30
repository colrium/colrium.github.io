export type FeaturedProject = {
	id: string;
	title: string;
	type: string;
	shortDescription: string;
	description: string;
	details: string[];
	stack: string[];
	outcome: string;
	github?: string;
};

const createId = (value: string) =>
	value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");

export const featuredProjects: FeaturedProject[] = [
	{
		id: createId("Grand Master Ledger"),
		title: "Grand Master Ledger",
		type: "Chess Analysis Platform",
		shortDescription:
			"A coaching-first chess platform that blends game analysis, progress tracking, and smart recommendations.",
		description:
			"Built a comprehensive chess analysis experience that connects with chess.com and Lichess to track improvement over time, surface key patterns in gameplay, and bring Stockfish-powered insight into a personal coaching workflow.",
		details: [
			"Integrated multiple chess platforms through custom APIs and data pipelines.",
			"Combined engine analysis with performance history to generate tailored improvement suggestions.",
			"Designed the experience around practical coaching use cases rather than raw data dumps.",
		],
		stack: ["Python", "Next.js", "Node.js", "Stockfish", "API Integration"],
		outcome:
			"Gives players a clearer view of their growth and helps them focus on the areas that matter most.",
		github: "https://github.com/colrium/gm-ledger",
	},
	{
		id: createId("Creuse"),
		title: "Creuse",
		type: "Cab Hailing Platform",
		shortDescription:
			"A locally grounded ride-hailing product designed for practical transport needs and simple onboarding.",
		description:
			"Built a Kenyan alternative to ride-hailing services that made it easier for drivers and riders to connect, coordinate journeys, and complete payments with familiar local methods.",
		details: [
			"Shaped the platform around local user behavior, taxi workflows, and mobile-first access.",
			"Supported real-time request flows and transaction handling in a constrained environment.",
			"Balanced a strong product experience with operational reliability and fast iteration.",
		],
		stack: ["PHP", "Laravel", "Kotlin", "Mobile Development", "Real-time Systems", "M-PESA"],
		outcome:
			"Delivered a functional transport platform tailored to local market needs and practical user workflows.",
		github: "https://github.com/colrium/creuse-user",
	},
	{
		id: createId("CAT (Connect Assure Technology)"),
		title: "CAT (Connect Assure Technology)",
		type: "Data Export Software",
		shortDescription:
			"Compliance-focused export tooling that connects instruments with broader facility systems.",
		description:
			"Developed software that enables compliant data export across compatible STERIS products and leading instrument-tracking systems, helping teams keep records synchronized without manual friction.",
		details: [
			"Built integrations that aligned with healthcare and compliance requirements.",
			"Simplified cross-system handoffs for teams managing regulated operational data.",
			"Improved consistency and traceability in workflows that previously relied on manual exports.",
		],
		stack: ["Data Integration", "Compliance", "API Development", "STERIS Systems"],
		outcome:
			"Enabled reliable data synchronization across facility management environments and strengthened workflow confidence.",
	},
	{
		id: createId("Non-Profits CRM"),
		title: "Non-Profits CRM",
		type: "Custom Product Build",
		shortDescription:
			"A tailored CRM built around the realities of nonprofit operations and stakeholder collaboration.",
		description:
			"Designed and implemented a custom CRM solution for ActionAid Kenya, translating organizational processes into a product that could be used day to day by staff and partners.",
		details: [
			"Worked from operational requirements rather than generic business templates.",
			"Structured the system around nonprofit workflows, reporting needs, and team collaboration.",
			"Focused on making the tool useful in the field rather than only polished in theory.",
		],
		stack: ["Full-Stack Development", "Product Thinking", "API Design", "QA"],
		outcome:
			"Turned organization-specific requirements into a shipped operational tool that matched real needs.",
	},
	{
		id: createId("Fixed Assets Tracker"),
		title: "Fixed Assets Tracker",
		type: "Web and Mobile Platform",
		shortDescription:
			"A lifecycle tracking platform for custody, allocation, depreciation, and client-side asset visibility.",
		description:
			"Created a fixed-assets platform that helps teams manage asset movement, allocation, depreciation schedules, and visibility across multiple stakeholders in one place.",
		details: [
			"Supported both web and mobile experiences for different operational contexts.",
			"Built around data accuracy, traceability, and recurring reporting needs.",
			"Scaled to support a large installed client base with over one million tracked assets.",
		],
		stack: ["Web", "Mobile", "Databases", "Automation"],
		outcome:
			"Shipped to roughly 30 clients and continues to support more than one million assets in active use.",
		github: "https://github.com/colrium/fixedassets-legacy",
	},
	{
		id: createId("ECO Calc"),
		title: "ECO Calc",
		type: "GHG Emissions and Projections Calculator",
		shortDescription:
			"A prototype for turning emissions inputs into practical forecasts and reporting-ready insights.",
		description:
			"Built a proof of concept for greenhouse gas emissions accounting and projection, turning environmental inputs into understandable estimates and a clear user experience for exploration.",
		details: [
			"Explored climate-accounting workflows through a practical calculator interface.",
			"Focused on turning abstract sustainability metrics into user-friendly output.",
			"Used the prototype to test assumptions and surface the next steps for a fuller product direction.",
		],
		stack: ["Prototyping", "Data Modeling", "Product Design", "Reporting"],
		outcome:
			"Opened a useful path for exploring climate-accounting workflows in an accessible way.",
		github: "https://github.com/colrium/co2-calc-fe",
	},
];
