const roles = [
	{
		period: "Feb 2025 - Present",
		title: "Contractor",
		context: "Freelance, Remote",
		details:
			"Completed two AI automation short-term contracts at Toptal and delivered identity, visibility, brand assets, builds, and documentation for Raziya Group, Dial-a-Tea, and Halis Tea.",
	},
	{
		period: "Nov 2023 - Feb 2025",
		title: "Software Engineer L5",
		context: "Stream4Tech LLC, Remote",
		details:
			"Spearheaded implementation of roughly 10 major features from design to production, documented migrations and code flows to reduce onboarding time by 20%, mentored 5+ developers, and used AI-assisted prototyping to accelerate delivery.",
	},
	{
		period: "Nov 2022 - Nov 2023",
		title: "Software Engineer L4",
		context: "Stream4Tech LLC, Remote",
		details:
			"Refactored and performance-tuned legacy code, reducing technical debt by 20%, while collaborating with a cross-functional team of eight.",
	},
	{
		period: "Sep 2020 - Aug 2022",
		title: "Senior Developer",
		context: "Chalkstone Ltd, Remote",
		details:
			"Led a three-person team building Realfield's Android application in React Native and supported contractor sign-ups in the first two months after launch.",
	},
	{
		period: "Jul 2019 - Sep 2020",
		title: "Support Engineer",
		context: "Influx, Remote",
		details:
			"Provided SaaS technical support, reduced average response time from two hours to 30 minutes, and built knowledge-base content and diagnostic scripts to scale support operations.",
	},
	{
		period: "Apr 2019 - Nov 2019",
		title: "Part-Time Full Stack Developer",
		context: "Chalkstone Ltd, Remote",
		details:
			"Collaborated on three strategic initiatives to design, code, and test solutions, contributing to a 15% decrease in rollout time.",
	},
	{
		period: "Aug 2018 - Dec 2018",
		title: "Mobile Developer",
		context: "Church Blaze Group Limited",
		details:
			"Developed and maintained two Tier-1 mobile applications with Java, Kotlin, and Swift, reaching 100,000+ combined downloads and a 4.2-star app-store rating.",
	},
	{
		period: "May 2017 - Aug 2018",
		title: "Software Developer",
		context: "Idea Kenya Business Solutions",
		details:
			"Delivered 20+ client software products with a 100% on-time delivery rate and a 95% client satisfaction score.",
	},
];

const strengths = [
	"AI automation",
	"API design",
	"Mobile delivery",
	"Cloud workflows",
	"Security-minded reviews",
	"Mentorship",
];

export default function Experience() {
	return (
		<section
			id="experience"
			className="w-full bg-surface py-16 md:py-28"
			aria-labelledby="experience-heading"
		>
			<div className="mx-auto grid w-full max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[0.9fr_1.1fr]">
				<div>
					<span className="inline-flex rounded-full bg-surface border border-secondary/20 px-4 py-2 text-sm text-on-surface">
						Experience
					</span>
					<h2
						id="experience-heading"
						className="mt-8 text-3xl font-semibold tracking-tight text-on-surface sm:text-4xl md:text-5xl"
					>
						Nine-plus years turning user requirements into shipped
						software.
					</h2>
					<p className="mt-6 max-w-xl text-base leading-8 text-on-surface/70">
						From client platforms and SaaS support to remote product
						teams, technical leadership, mobile apps, and
						AI-assisted automation.
					</p>
					<div className="mt-10 flex flex-wrap gap-3">
						{strengths.map((strength) => (
							<span
								key={strength}
								className="inline-flex rounded-full bg-surface border border-secondary/20 px-4 py-2 text-sm text-on-surface"
							>
								{strength}
							</span>
						))}
					</div>
				</div>

				<div className="flex flex-col border-t border-on-surface/10">
					{roles.map((role) => (
						<article
							key={`${role.period}-${role.title}`}
							className="grid gap-5 border-b border-accent/10 py-8 md:grid-cols-[160px_1fr]"
						>
							<p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
								{role.period}
							</p>
							<div>
								<h3 className="text-2xl font-semibold text-on-surface">
									{role.title}
								</h3>
								<p className="mt-2 text-sm text-primary">
									{role.context}
								</p>
								<p className="mt-4 text-sm leading-7 text-on-surface/70">
									{role.details}
								</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
