import Contact from "@/components/sections/Contact";
import CraftAesthetics from "@/components/sections/CraftAesthetics";
import Credentials from "@/components/sections/Credentials";
import Engagements from "@/components/sections/Engagements";
import Experience from "@/components/sections/Experience";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ImpactHighlights from "@/components/sections/ImpactHighlights";
import MainHero from "@/components/sections/MainHero";
import Process from "@/components/sections/Process";
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
								<span className="text-xl font-bold text-accent tracking-tighter">
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
				<FeaturedProjects />
				<Experience />
				<ImpactHighlights />
				<Process />
				<Engagements />
				<Credentials />
				<Contact />
			</main>
		</div>
	);
}
