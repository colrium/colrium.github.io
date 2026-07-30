import Link from "next/link";
import { featuredProjects } from "./projects";
import Card from "@/components/ui/Card";

export default function MinimalFeaturedProjects() {
	return (
		<div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
			{featuredProjects.map((project) => (
				<Card key={project.id} className="p-5">
					<p className="text-sm capitalize text-on-surface-mute">
						{project.type}
					</p>
					<h4 className="mt-3 text-lg font-semibold text-on-surface">
						{project.title}
					</h4>
					<p className="mt-3 text-sm leading-6 text-on-surface/70">
						{project.shortDescription}
					</p>
					<Link
						href={`/projects#${project.id}`}
						className="mt-5 inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-accent"
					>
						View full story
						<span aria-hidden="true" className="ml-2">
							→
						</span>
					</Link>
				</Card>
			))}
		</div>
	);
}
