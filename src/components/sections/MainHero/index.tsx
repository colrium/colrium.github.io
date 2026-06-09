'use client';

import React, { useState, useEffect } from 'react';
import { HeroBadge } from '@/components/sections/MainHero/HeroBadge';
import { IconButton } from '@/components/sections/MainHero/IconButton';
import { StatsCard } from '@/components/sections/MainHero/StatsCard';
import { DocFooter } from '@/components/sections/MainHero/DocFooter';
import Image from 'next/image';
import ShuffleText from '@/lib/ShuffleText';
import ShuffleTextComponent from '@/components/ui/ShuffleText';

const SocialsStrip: React.FC = () => {
	const socials = [
		{
			href: 'https://github.com/colrium',
			label: 'GitHub',
			svg: (
				<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.28-1.72-1.28-1.72-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.97.1-.76.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.71 0-1.26.45-2.28 1.2-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.02 11.02 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.5 3.16-1.18 3.16-1.18.63 1.58.23 2.75.11 3.04.75.81 1.2 1.83 1.2 3.09 0 4.44-2.7 5.42-5.27 5.7.41.35.77 1.04.77 2.1 0 1.52-.01 2.75-.01 3.12 0 .31.2.68.8.56C20.21 21.44 23.5 17.12 23.5 12.02 23.5 5.73 18.27.5 12 .5z"/>
				</svg>
			),
		},
		{
			href: 'https://www.linkedin.com/in/colrium',
			label: 'LinkedIn',
			svg: (
				<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path d="M4.98 3.5C3.88 3.5 3 4.4 3 5.5s.88 2 1.98 2H5c1.1 0 2-.9 2-2s-.9-2-2-2h-.02zM3.5 8.98H6.5V21H3.5zM9.5 8.98h2.88v1.63h.04c.4-.75 1.38-1.54 2.85-1.54 3.05 0 3.61 2.01 3.61 4.62V21h-3V14.6c0-1.5-.03-3.43-2.09-3.43-2.09 0-2.41 1.63-2.41 3.32V21h-3V8.98z"/>
				</svg>
			),
		},
		{
			href: 'mailto:colrium@gmail.com',
			label: 'Email',
			svg: (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
					<path d="M4 4h16v16H4z" fill="none" />
					<path d="M22 6l-10 7L2 6" />
				</svg>
			),
		},
	];

	return (
		<div className="w-full mt-6">
			<div className="overflow-hidden">
				<div className="flex items-center justify-center space-x-8 marquee-inner gap-4" aria-hidden>
					{socials.map((s) => (
						<a
							key={s.label}
							href={s.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={s.label}
							className="text-on-surface/80 hover:text-primary transition-colors"
						>
							<span className="w-6 h-6 inline-block">{s.svg}</span>
						</a>
					))}
				</div>
			</div>
			{/* <style jsx>{`
				.marquee-inner {
					display: inline-flex;
					gap: 2rem;
					padding-left: 0.25rem;
					animation: marquee 10s linear infinite;
				}
				@keyframes marquee {
					0% { transform: translateX(0%); }
					100% { transform: translateX(-50%); }
				}
			`}</style> */}
		</div>
	);
};

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
    statsHref?: string;
    statsButtonIcon?: string;
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
    statsButtonIcon="phone",
    statsHref="/#contact",
    accessory = null,
    top,
    bgText,
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
			<section className="w-full max-w-7xl h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-none flex flex-col items-center bg-surface group relative">
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
					<div className="w-full md:h-4/5 md:py-50 flex flex-col  items-center   px-6  ">
						{
							<div
								className={`flex flex-col items-center  justify-center h-1/2 transition-all duration-1000 ${
									isLoaded
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-10"
								}`}
							>
								{accessory}
							</div>
						}
						<div
							className={` flex flex-col items-center md:px-6 lg:px-12  text-center `}
						>
							{/* Hero Badge */}
							<HeroBadge icon={badgeIcon} label={badgeLabel} />
							{tagline && (
								<h3 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-6 tracking-tight leading-[1.05] drop-shadow-sm">
									{tagline}
								</h3>
							)}
							{/* Heading */}
							<ShuffleTextComponent
								component="h1"
								className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-6 tracking-tight leading-[1.05] drop-shadow-sm"
								id="main-hero-title"
								replayOnClick
							>
								{title}
							</ShuffleTextComponent>
							<p
								className={`font-body-sm text-sm sm:text-base text-on-surface/70 opacity-80 mb-8 leading-relaxed max-w-xl mx-auto`}
							>
								{description}
							</p>

							<SocialsStrip />
						</div>
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
							buttonIcon={statsButtonIcon}
							href={statsHref}
							onButtonClick={onStatsButtonClick}
						/>
					</div>

					{/* Bottom Right Corner Decoration */}
					<DocFooter
						className={` transition-all duration-1000 ${
							isLoaded
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-10"
						}`}
						onDocumentationClick={onDocumentationClick}
					/>
				</div>
				{bgText ? (
					<span
						className={` layer-bg absolute left-4 md:left-auto md:right-10 md:right-12 lg:right-20 text-right bottom-4 md:bottom-16`}
						aria-hidden="true"
					>
						{bgText}
					</span>
				) : (
					<Image
						src="/logo.svg"
						alt="logo"
						width={420}
						height={420}
						className={` layer-bg absolute left-4 opacity-5 md:left-auto md:right-10 md:right-12 lg:right-20 bottom-4 md:bottom-16 transition-all duration-1000`}
					/>
				)}
			</section>
		</div>
  );
}
