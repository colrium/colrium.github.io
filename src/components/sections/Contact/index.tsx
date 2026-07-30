import Reveal from "@/components/ui/Reveal";

const contactLinks = [
	{
		label: "Email",
		value: "colrium@gmail.com",
		href: "mailto:colrium@gmail.com",
		icon: "gmail",
	},
	{
		label: "Phone",
		value: "+254 724 146 857",
		href: "tel:+254724146857",
		icon: "phone",
	},
	{
		label: "GitHub",
		value: "github.com/colrium",
		href: "https://github.com/colrium",
		icon: "github",
	},
	{
		label: "LinkedIn",
		value: "linkedin.com/in/colrium",
		href: "https://www.linkedin.com/in/colrium",
		icon: "linkedin",
	},
	{
		label: "Resume",
		value: "Download CV",
		href: "/Software-Engineer-Collins-Riungu-resume.pdf",
		icon: "download",
	},
];

export default function Contact() {
	return (
		<section
			id="contact"
			className="w-full  py-16 md:py-28"
			aria-labelledby="contact-heading"
		>
			<div className="mx-auto grid w-full max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
				<div>
					<span className="inline-flex rounded-full bg-surface border border-secondary/20 px-4 py-2 text-sm text-on-surface">
						Contact
					</span>
					<h2
						id="contact-heading"
						className="mt-8 max-w-3xl text-4xl font-semibold tracking-tight text-on-surface sm:text-5xl md:text-6xl"
					>
						Need a software engineer who can move from concept to
						shipping?
					</h2>
					<p className="mt-6 max-w-2xl text-base leading-8 text-on-surface/70">
						I am based in Nairobi, Kenya and open to remote software
						engineering roles, AI automation work, technical
						leadership, and focused product builds.
					</p>
				</div>

				<div className="flex flex-col gap-3">
					{contactLinks.map((link, i) => (
						<Reveal
							key={link.label}
							delay={i * 80}
							direction="left"
							duration={500}
						>
							<a
								href={link.href}
								className="group flex items-center justify-between gap-4 rounded-3xl border border-accent/10 bg-surface p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(255,153,28,0.06)]"
							>
								<span>
									<span className="block text-sm font-semibold uppercase tracking-[0.18em] text-accent">
										{link.label}
									</span>
									<span className="mt-2 block text-sm text-on-surface/70">
										{link.value}
									</span>
								</span>
								<span
									className={`mdi mdi-${link.icon} text-xl text-primary transition group-hover:translate-x-1`}
								/>
							</a>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
