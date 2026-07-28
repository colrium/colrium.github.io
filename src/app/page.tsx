"use client";
import MainHero from "@/components/sections/MainHero";
import AirHockey from "@/components/ui/AirHockey";
import SpiderWeb from "@/components/ui/SpiderWeb";
import { useGameMode } from "@/lib/contexts/GameModeContext";
import ValueSection from "@/components/sections/ValueSection";
import Process from "@/components/sections/Process";
import Engagements from "@/components/sections/Engagements";
import ImpactHighlights from "@/components/sections/ImpactHighlights";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTASection";

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
						description="I build systems that scale. Polyglot engineer with 9+ years across web, mobile, and backend, turning specs into shipped, secure software."
					/>

					<ValueSection />
					<Process />
					<Engagements />
					{/* <ImpactHighlights /> */}
					{/* <FeaturedProjects /> */}
					<Testimonials />
					<CTASection />
				</main>
			) : (
				<AirHockey onCloseGame={() => setGameMode(false)} />
			)}
		</div>
	);
}