"use client";

import Contact from "@/components/sections/Contact";
import ContactHero from "@/components/sections/ContactHero";

export default function ContactPage() {
	return (
		<main className="flex flex-1 w-full flex-col items-center justify-between sm:items-start">
			<ContactHero />
			<Contact />
		</main>
	);
}
