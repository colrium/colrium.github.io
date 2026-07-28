"use client";

import CraftAesthetics from "@/components/sections/CraftAesthetics";
import Skills from "@/components/sections/Skills";

export default function SkillsPage() {
	return (
		<main className="flex flex-1 w-full flex-col items-center justify-between sm:items-start bg-surface">
			<Skills />
			<CraftAesthetics />
		</main>
	);
}
