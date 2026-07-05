"use client";

import Credentials from "@/components/sections/Credentials";
import Experience from "@/components/sections/Experience";
import ExperienceHero from "@/components/sections/ExperienceHero";

export default function ExperiencePage() {
	return (
		<main className="flex flex-1 w-full flex-col items-center justify-between sm:items-start">
			<ExperienceHero />
			<Experience />
			<Credentials />
		</main>
	);
}
