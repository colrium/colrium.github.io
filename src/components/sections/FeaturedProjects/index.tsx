import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import MinimalFeaturedProjects from "./MinimalFeaturedProjects";
import { featuredProjects } from "./projects";
import FullFeaturedProjects from "./FullFeaturedProjects";

export default function FeaturedProjects({minimal = false}: {minimal?: boolean}) {
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

				{minimal ? (
					<div className="mt-8">
						<MinimalFeaturedProjects />
					</div>
				) : (
					<FullFeaturedProjects />
				)}
			</div>
		</section>
	);
}
