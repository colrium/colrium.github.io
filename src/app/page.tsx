import CraftAesthetics from "@/components/sections/CraftAesthetics";
import MainHero from "@/components/sections/MainHero";
import Panel from "@/components/sections/Panel";
import Skills from "@/components/sections/Skills";
import SpiderWeb from "@/components/ui/SpiderWeb";
import Image from "next/image";

export default function Home() {
	
	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-background font-sans dark:bg-background">
			<main className="flex flex-1 w-full  flex-col items-center justify-between sm:items-start">
				<MainHero
					title="The Web Guy"
					badgeLabel="Software Engineer"
					statsValue="9+"
					top={
						<nav className="flex justify-between items-center px-6 md:px-10 h-20 w-full relative z-10">
							<div className="flex items-center gap-2">
								<Image
									src="/logo.svg"
									alt="Logo"
									width={32}
									height={32}
								/>
								<span className="font-display text-xl font-bold text-accent tracking-tighter">
									Mutugi
								</span>
							</div>
						</nav>
					}
					accessory={<div className="flex items-center gap-4 h-full my-16 ">                        
                        <SpiderWeb className="w-70 h-70 md:w-80 md:h-80 lg:w-120 lg:h-120" />
                    </div>}
					statsLabel="Years of Experience"
					description="Polyglot engineer with an unreasonable fondness for clean architecture. Based in Nairobi, fully remote-native, and always building something worth shipping."
				/>
				<div className="relative w-full">
					<CraftAesthetics />
				</div>

				<Skills /> 
				{/* <Panel
					bgText="SWE"
					bgTextClassName="right-20"
					innerClassName="w-full justify-center items-center text-right"
					copyClassName="w-full "
				>
					<p className="layer-tag">Software Engineer</p>

					<div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
						<div className="flex-1">
							<h2 className="text-3x lg:text-7xl uppercase l font-bold text-primary text-center">
								The Web Guy
							</h2>
						</div>
						<div>
							<SpiderWeb />
						</div>
                    </div>
                    <p className="layer-line text-on-surface">Polyglot engineer with an unreasonable fondness for clean architecture. Based in Nairobi, fully remote-native, and always building something worth shipping.</p>
					
				</Panel> */}
			</main>
		</div>
	);
}
