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
						description="Polyglot engineer with an unreasonable fondness for clean architecture. Based in Nairobi, fully remote-native, and always building something worth shipping."
					/>
				</main>
			) : (
				<AirHockey onCloseGame={() => setGameMode(false)} />
			)}
		</div>
	);
}
