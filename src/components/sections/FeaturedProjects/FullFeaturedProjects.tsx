import Link from "next/link";
import { featuredProjects } from "./projects";
import Reveal from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";

export default function FullFeaturedProjects() {
	return (
		<div className="grid gap-4 lg:grid-cols-3">
			{featuredProjects.map((project, i) => (
				<Reveal
					key={project.id}
					delay={i * 80}
					direction="up"
					duration={600}
				>
					<Card
						component={"article"}
						id={project.id}
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
							<ul className="mt-4 space-y-2">
								{project.details.map((detail) => (
									<li
										key={detail}
										className="flex gap-2 text-sm leading-6 text-on-surface/70"
									>
										<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
										<span>{detail}</span>
									</li>
								))}
							</ul>
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
	);
}
