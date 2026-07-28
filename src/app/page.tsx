"use client";
import MainHero from "@/components/sections/MainHero";
import AirHockey from "@/components/ui/AirHockey";
import SpiderWeb from "@/components/ui/SpiderWeb";
import { useGameMode } from "@/lib/contexts/GameModeContext";

export default function Home() {
	const { gameMode, setGameMode } = useGameMode();
	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-background font-sans dark:bg-background">
			{!gameMode ? (
				<main className="flex flex-1 w-full flex-col items-center justify-between sm:items-start">
					<MainHero
						title="The Web Guy"
						badgeLabel="Software Engineer"
						statsValue="9+"
						accessory={
							<div className="flex items-center gap-4 h-full my-16">
								<SpiderWeb
									className="w-70 h-70 md:w-80 md:h-80 lg:w-120 lg:h-120"
									onSpiderOffWeb={(isOffWeb) => {
										if (isOffWeb) {
											setGameMode(true);
										}
									}}
								/>
							</div>
						}
						onToggleEasterEgg={() => {
							setGameMode((prev) => !prev);
						}}
						statsLabel="Years of Experience"
						// description="Remote-native polyglot engineer with 9+ years designing and owning system architecture, from spec to shipping through scalable, secure implementation. Skilled at evaluating tradeoffs across stacks, structuring solutions for maintainability at scale, and integrating up-to-date workflows to boost delivery velocity. Drives technical excellence end-to-end, aligning architectural decisions with business objectives."
						description="I build systems that scale. Polyglot engineer with 9+ years across web, mobile, and backend, turning specs into shipped, secure software."
					/>
				</main>
			) : (
				<AirHockey onCloseGame={() => setGameMode(false)} />
			)}
		</div>
	);
}
