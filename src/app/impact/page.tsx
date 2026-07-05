"use client";

import ImpactHero from "@/components/sections/ImpactHero";
import ImpactHighlights from "@/components/sections/ImpactHighlights";
import Process from "@/components/sections/Process";

export default function ImpactPage() {
	return (
		<main className="flex flex-1 w-full flex-col items-center justify-between sm:items-start">
			<ImpactHero />
			<ImpactHighlights />
			<Process />
		</main>
	);
}
