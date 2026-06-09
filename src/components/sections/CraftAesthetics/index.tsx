"use client";

import AirHockey from "@/components/ui/AirHockey";
import DotCube from "@/components/ui/DotCube";
import ShuffleTextComponent from "@/components/ui/ShuffleText";
import {useState} from "react";
const principles = [
	{
		id: "typography",
		title: "Type as a System",
		description:
			"Every heading scale, line height, and weight choice is intentional. Good typography communicates hierarchy before a word is read.",
	},
	{
		id: "spacing",
		title: "Consistent Spatial Rhythm",
		description:
			"An 8pt grid isn't a rule - it's a habit that makes interfaces feel coherent without conscious effort from the viewer.",
	},
	{
		id: "motion",
		title: "Motion With Purpose",
		description:
			"Micro-interactions confirm actions, guide attention, and add delight. Every animation earns its place or gets cut.",
	},
	{
		id: "color",
		title: "Colour With Intent",
		description:
			"Palettes built around accessibility contrast ratios first, then refined for personality. Beauty and usability are not trade-offs.",
	},
	{
		id: "components",
		title: "Reusable Component Thinking",
		description:
			"UI is designed as a system of composable parts - each component isolated, documented, and testable on its own.",
	},
];

const tools = ["Figma", "React", "Tailwind CSS", "Framer Motion", "Storybook"];

export default function CraftAesthetics() {
    const [showAdvancedUI, setShowAdvancedUI] = useState(false);
	return (
		<section className="w-full py-16 min-h-[80vh] flex flex-col items-center justify-center md:py-32">
			<div className="mx-auto max-w-6xl px-6 md:px-10">
				<div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
					{!showAdvancedUI && (
						<div className="flex-1 flex items-center justify-center w-full lg:w-2/5">
							<DotCube className="mt-16  w-200 h-200" />
						</div>
					)}

					<div className="px-8">
						<span className="inline-flex rounded-full bg-transparent px-4 py-2 text-sm  text-on-surface border border-accent/20">
							Craft & Aesthetics
						</span>
						<ShuffleTextComponent component="h2" className="my-16 text-3xl sm:text-4xl md:text-5xl font-semibold text-on-surface tracking-tight">
							Pixel-Perfect UI, Down to the Last Detail
						</ShuffleTextComponent>

						<p className="mt-6 text-base md:text-lg leading-8 text-on-surface/75">
							Great software deserves great interfaces. I treat UI
							work with the same rigor as backend architecture.
							deliberate and precise interactions that feel
							inevitable.
						</p>
					</div>
				</div>

				<div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
					{/*principles.map((item) => (
            <article
              key={item.id}
              className="rounded-[2rem] border border-outline/20 bg-white/80 p-6 shadow-sm transition hover:border-primary-container/40 hover:bg-white"
            >
              <h3 className="text-xl font-semibold text-primary mb-3">{item.title}</h3>
              <p className="text-sm leading-7 text-on-surface/75">{item.description}</p>
            </article>
          ))*/}
				</div>

				{showAdvancedUI && <AirHockey />}

				<div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
					<div>
						<div className="flex flex-wrap gap-3">
							{tools.map((tool) => (
								<span
									key={tool}
									className="rounded-full border border-on-surface/20 bg-transparent px-4 py-2 text-sm font-sm text-on-surface-mute"
								>
									{tool}
								</span>
							))}
						</div>
					</div>
					{/* <button
						onClick={() => setShowAdvancedUI(!showAdvancedUI)}
						className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-on-primary transition hover:bg-primary-container"
					>
						{showAdvancedUI ? "Hide" : "Show"} Advanced UI
					</button> */}
				</div>
			</div>
		</section>
	);
}
