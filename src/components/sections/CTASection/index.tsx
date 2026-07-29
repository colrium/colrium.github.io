import { Card } from "@/components/ui/Card";
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
					<Card className="relative overflow-hidden p-10 md:p-16 text-center">
						<span
							className="hidden md:absolute right-4 top-4 text-[280px] font-display text-on-surface-mute opacity-10 pointer-events-none select-none leading-none"
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
								className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-surface shadow-lg transition-all duration-250 border border-accent/20 hover:bg-transparent hover:text-accent hover:border-accent/50 hover:shadow-none"
							>
								<span>Get in Touch</span>
								<span
									className="material-symbols-outlined text-sm!"
									aria-hidden="true"
								>
									chat_bubble
								</span>
							</Link>
							<Link
								href="/experience"
								className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-secondary  px-8 py-3 shadow-lg text-sm font-semibold text-surface transition-all duration-250 border border-secondary/20 hover:bg-transparent hover:text-secondary hover:border-secondary/50 hover:shadow-none"
							>
								<span>View Full Experience</span>
								<span
									className="material-symbols-outlined text-sm!"
									aria-hidden="true"
								>
									lab_profile
								</span>
							</Link>
						</div>
					</Card>
				</Reveal>
			</div>
		</section>
	);
}