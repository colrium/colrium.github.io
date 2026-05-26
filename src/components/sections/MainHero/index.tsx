'use client';

import React, { useState, useEffect } from 'react';
import { HeroBadge } from '@/components/sections/MainHero/HeroBadge';
import { IconButton } from '@/components/sections/MainHero/IconButton';
import { StatsCard } from '@/components/sections/MainHero/StatsCard';
import { DocFooter } from '@/components/sections/MainHero/DocFooter';
import SpiderWeb from '@/components/ui/SpiderWeb';

interface MainHeroProps {
	videosrc?: string;
	badgeLabel?: string;
	badgeIcon?: string;
	title?: string;
	tagline?: string;
    top?: React.ReactNode;
    accessory: React.ReactNode;
	description?: string;
	statsValue?: string;
    statsLabel?: string;
    bgText?: string;
	statsButtonLabel?: string;
	onStatsButtonClick?: () => void;
	onDocumentationClick?: () => void;
}

export default function MainHero({
    videosrc = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260428_193507_4286c423-2fd9-4efd-92bd-91a939453fc1.mp4',
    tagline,
  badgeLabel = 'SWE',
  badgeIcon = 'code',
  title = 'Fluid Asset Streams',
  description = 'Polyglot engineer with an unreasonable fondness for clean architecture. Based in Nairobi, fully remote-native, and always building something worth shipping.',
  statsValue = '9+',
  statsLabel = 'Years of Experience',
    statsButtonLabel = 'Engage',
    accessory = null,
    top,
    bgText = 'SWE',
  onStatsButtonClick,
  onDocumentationClick,
}: MainHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoaded(true);
  }, []);

  return (
		<div className="w-full h-screen flex items-center justify-center p-3 md:p-5 ">
			<section className="relative w-full max-w-7xl h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-none flex flex-col items-center bg-surface group relative">
				{/* Video Background */}
				{/* <video
          autoPlay
          className="absolute inset-0 w-full h-full object-cover object-[65%] lg:object-center z-0 scale-105 group-hover:scale-100 transition-transform duration-[2000ms]"
          loop
          muted
          playsInline
          src={videosrc}
        /> */}

				{/* Content Layer */}
				<div className=" w-full h-full flex flex-col ">
					{top && (
						<div className="w-full pt-6 px-6 md:px-10 lg:px-16">
							{top}
						</div>
					)}
					<div className="w-full md:h-3/5 md:py-50 flex flex-col-reverse md:flex-row items-center   px-6  ">
						<div
							className={` flex flex-col items-center md:px-6 lg:px-12  text-center transition-all duration-1000 ${
								isLoaded
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-10"
							}`}
						>
							{/* Hero Badge */}
							<HeroBadge icon={badgeIcon} label={badgeLabel} />
							{tagline && (
								<h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-6 tracking-tight leading-[1.05] drop-shadow-sm">
									{tagline}
								</h2>
							)}
							{/* Heading */}
							<h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-6 tracking-tight leading-[1.05] drop-shadow-sm">
								{title}
							</h1>

							{/* Subheading */}
							<p className="font-body-sm text-sm sm:text-base text-on-surface/70 opacity-80 leading-relaxed max-w-xl mx-auto">
								{description}
							</p>
						</div>
						{
							<div
								className={`flex flex-col items-center  justify-center h-full transition-all duration-1000 ${
									isLoaded
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-10"
								}`}
							>
								{accessory}
							</div>
						}
					</div>
					{/* Hero Text Container */}

					{/* Bottom Left Card */}
					<div
						className={`absolute bottom-32 right-6 md:bottom-10 md:left-10 md:right-auto transition-all duration-1000 ${
							isLoaded
								? "opacity-100 translate-x-0"
								: "opacity-0 -translate-x-10"
						}`}
					>
						<StatsCard
							value={statsValue}
							label={statsLabel}
							buttonLabel={statsButtonLabel}
							buttonIcon="arrow_outward"
							onButtonClick={onStatsButtonClick}
						/>
					</div>

					{/* Bottom Right Corner Decoration */}
					<DocFooter onDocumentationClick={onDocumentationClick} />
				</div>
				{bgText && (
					<span
						className={` layer-bg absolute left-4 md:left-auto md:right-10 md:right-12 lg:right-20 text-right bottom-4 md:bottom-16`}
						aria-hidden="true"
					>
						{bgText}
					</span>
				)}
			</section>
		</div>
  );
}
