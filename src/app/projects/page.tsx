"use client";

import Engagements from "@/components/sections/Engagements";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ProjectSlider from "@/components/sections/ProjectSlider";
import ProjectsHero from "@/components/sections/ProjectsHero";

export default function ProjectsPage() {
	return (
		<main className="flex flex-1 w-full flex-col items-center justify-between sm:items-start">
			<ProjectsHero />
			<ProjectSlider />
			<FeaturedProjects />
			<Engagements />
		</main>
	);
}
