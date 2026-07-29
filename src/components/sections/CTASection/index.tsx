import Reveal from "@/components/ui/Reveal";
import Link from "next/link";

export default function CTASection() {
	return (
		<section
			id="cta"
			className="w-full py-16 md:py-32"
			aria-labelledby="cta-heading"
		>
			<div className="mx-auto w-full max-w-4xl px-6 md:px-10">
				<Reveal direction="up" duration={800}>
					<div className="relative overflow-hidden rounded-3xl border border-accent/20  p-10 md:p-16 text-center">
						<span
							className="absolute right-5 top-5 text-[280px] font-display text-accent/10 pointer-events-none select-none leading-none"
							aria-hidden="true"
						>
							?
						</span>
						<span className="relative inline-flex rounded-full bg-surface border border-secondary/20 px-4 py-2 text-sm text-on-surface">
							Let&apos;s Build
						</span>
						<h2
							id="cta-heading"
							className="relative mt-8 text-3xl font-semibold tracking-tight text-on-surface sm:text-4xl md:text-5xl"
						>
							Have a project in mind or just exploring?
						</h2>
						<p className="relative mx-auto mt-6 max-w-2xl text-base leading-8 text-on-surface/70">
							I am always open to conversations about product
							work, AI automation, technical leadership, and
							remote engineering roles. If your team needs someone
							who can move from concept to shipping - let us talk.
						</p>
						<div className="relative mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
							<Link
								href="/contact"
								className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-surface shadow-lg transition-all duration-300 hover:bg-accent-light hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(255,153,28,0.3)]"
							>
								Get in Touch
								{/* <span
									className="material-symbols-outlined text-sm"
									aria-hidden="true"
								>
									arrow_forward
								</span> */}
							</Link>
							<Link
								href="/experience"
								className="inline-flex items-center gap-2 rounded-full bg-surface  px-8 py-3 shadow-lg text-sm font-semibold text-on-surface transition-all duration-300 hover:border-accent/40 hover:text-accent"
							>
								View Full Experience
							</Link>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}