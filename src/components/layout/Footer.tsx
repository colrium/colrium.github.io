import Link from "next/link";

const footerLinks = [
	{ label: "Skills", href: "/skills" },
	{ label: "Projects", href: "/projects" },
	{ label: "Experience", href: "/experience" },
	{ label: "Impact", href: "/impact" },
	{ label: "Contact", href: "/contact" },
];

const contactItems = [
	{
		label: "Email",
		href: "mailto:colrium@gmail.com",
		value: "colrium@gmail.com",
	},
	{
		label: "GitHub",
		href: "https://github.com/colrium",
		value: "github.com/colrium",
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/colrium",
		value: "linkedin.com/in/colrium",
	},
];

export default function Footer() {
	return (
		<footer className="w-full border-t border-on-surface/10 bg-surface/80 backdrop-blur-sm">
			<div className="mx-auto w-full max-w-7xl px-6 md:px-10 py-10 md:py-14">
				<div className="grid gap-10 md:grid-cols-3">
					<div>
						<Link
							href="/"
							className="text-lg font-bold tracking-tight text-primary uppercase"
						>
							Mutugi
						</Link>
						<p className="mt-3 text-sm text-on-surface/50 max-w-xs leading-relaxed">
							Polyglot engineer building impactful software from
							Nairobi, Kenya.
						</p>
					</div>

					<div>
						<h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-on-surface-mute mb-4">
							Pages
						</h4>
						<ul className="flex flex-col gap-2">
							{footerLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm text-on-surface/60 hover:text-accent transition-colors duration-200"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-on-surface-mute mb-4">
							Contact
						</h4>
						<ul className="flex flex-col gap-2">
							{contactItems.map((item) => (
								<li key={item.label}>
									<a
										href={item.href}
										target={
											item.href.startsWith("http")
												? "_blank"
												: undefined
										}
										rel={
											item.href.startsWith("http")
												? "noopener noreferrer"
												: undefined
										}
										className="text-sm text-on-surface/60 hover:text-accent transition-colors duration-200"
									>
										{item.value}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-10 pt-6 border-t border-on-surface/10 flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-xs text-on-surface/40">
						&copy; {new Date().getFullYear()} Mutugi. All rights
						reserved.
					</p>
					<p className="text-xs text-on-surface/40">
						Built with Next.js & Tailwind CSS
					</p>
				</div>
			</div>
		</footer>
	);
}
