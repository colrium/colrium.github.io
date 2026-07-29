"use client";

import ShuffleText from "../ui/ShuffleText";
import CountUp from "../ui/CountUp";

const milestones = [
	{ year: "2017", label: "Started" },
	{ year: "2019", label: "Support Lead" },
	{ year: "2021", label: "Senior Dev" },
	{ year: "2023", label: "L5 Engineer" },
	{ year: "2025", label: "AI Automation" },
];

export default function ExperienceHero() {
	return (
		<div className="relative w-full min-h-[80vh] md:min-h-[90vh] py-16 pt-48 md:pt-24 flex flex-col items-center justify-center overflow-hidden">
			<div
				className="w-80 h-80 bg-surface my-8 flex items-center justify-center "
				style={{
					animation: "morph-shape 8s ease-in-out infinite",
				}}
			>
				<div className="flex flex-col items-center">
					<CountUp
						from={0}
						to={9}
						suffix="+"
						className="text-9xl font-bold text-secondary leading-none select-none"
					/>
					<span className="text-sm text-on-surface-mute tracking-widest uppercase mt-2">
						Years
					</span>
				</div>
			</div>
			<div className="flex flex-col relative items-center justify-center gap-12 md:gap-16 ">
				<div className="relative z-10 flex flex-col items-center text-center px-6">
					
					<ShuffleText
						component="h1"
						className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-on-surface tracking-tight leading-[1.05] max-w-4xl"
						sourceRandomCharacter={"_-"}
					>
						Nine Years of Shipping Software
					</ShuffleText>
					<p className="mt-6 text-base md:text-lg text-on-surface/60 max-w-xl leading-relaxed">
						From client platforms and SaaS support to remote product
						teams, technical leadership, mobile apps, and
						AI-assisted automation.
					</p>
				</div>
				<div className="relative w-[60%] max-w-xl hidden md:block">
					<div className="relative h-px bg-linear-to-r from-transparent via-on-surface/20 to-transparent">
						{milestones.map((m, i) => (
							<div
								key={m.year}
								className="absolute -top-0.5 -translate-x-1/2 flex flex-col items-center gap-1"
								style={{ left: `${i * 25}%` }}
							>
								<div className="w-1.5 h-1.5 rounded-full bg-secondary" />
								<span className="absolute top-3 left-1/2 -translate-x-1/2 text-sm text-on-surface-mute whitespace-nowrap">
									{m.year}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
