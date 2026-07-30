"use client";

import React, { useState, useEffect } from "react";
import { HeroBadge } from "@/components/sections/MainHero/HeroBadge";
import { StatsCard } from "@/components/sections/MainHero/StatsCard";
import { DocFooter } from "@/components/sections/MainHero/DocFooter";
import Image from "next/image";
import ShuffleText from "@/components/ui/ShuffleText";

const SocialsStrip: React.FC = () => {
	const socials = [
		{
			href: "https://github.com/colrium",
			label: "GitHub",
			svg: (
				<svg
					viewBox="0 0 24 24"
					fill="currentColor"
					height="100%"
					width="100%"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.28-1.72-1.28-1.72-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.97.1-.76.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.71 0-1.26.45-2.28 1.2-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.02 11.02 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.5 3.16-1.18 3.16-1.18.63 1.58.23 2.75.11 3.04.75.81 1.2 1.83 1.2 3.09 0 4.44-2.7 5.42-5.27 5.7.41.35.77 1.04.77 2.1 0 1.52-.01 2.75-.01 3.12 0 .31.2.68.8.56C20.21 21.44 23.5 17.12 23.5 12.02 23.5 5.73 18.27.5 12 .5z" />
				</svg>
			),
		},
		{
			href: "https://www.linkedin.com/in/colrium",
			label: "LinkedIn",
			svg: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="100%"
					viewBox="0 0 72 72"
					width="100%"
				>
					<g fill="none" fillRule="evenodd">
						<path
							d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z"
							fill="#007EBB"
						/>
						<path
							d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z"
							fill="#FFF"
						/>
					</g>
				</svg>
			),
		},
		{
			href: "mailto:colrium@gmail.com",
			label: "Email",
			svg: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					viewBox="0 0 24 19"
					version="1.1"
				>
					<defs>
						<linearGradient
							id="linear0"
							gradientUnits="userSpaceOnUse"
							x1="165"
							y1="44"
							x2="165"
							y2="166"
							gradientTransform="matrix(0.132102,0,0,0.135791,-0.681791,-3.530542)"
						>
							<stop
								offset="0"
								stopColor="rgb(37.647059%,83.921569%,45.098039%)"
								stopOpacity="1"
							/>
							<stop
								offset="0.17"
								stopColor="rgb(25.882353%,78.431373%,40.784314%)"
								stopOpacity="1"
							/>
							<stop
								offset="0.39"
								stopColor="rgb(5.490196%,73.72549%,37.254902%)"
								stopOpacity="1"
							/>
							<stop
								offset="0.62"
								stopColor="rgb(0%,66.27451%,73.333333%)"
								stopOpacity="1"
							/>
							<stop
								offset="0.86"
								stopColor="rgb(23.529412%,56.470588%,100%)"
								stopOpacity="1"
							/>
							<stop
								offset="1"
								stopColor="rgb(19.215686%,52.54902%,100%)"
								stopOpacity="1"
							/>
						</linearGradient>
						<linearGradient
							id="linear1"
							gradientUnits="userSpaceOnUse"
							x1="8"
							y1="46.130001"
							x2="184"
							y2="46.130001"
							gradientTransform="matrix(0.132102,0,0,0.135791,-0.681791,-3.530542)"
						>
							<stop
								offset="0.08"
								stopColor="rgb(100%,38.823529%,62.745098%)"
								stopOpacity="1"
							/>
							<stop
								offset="0.3"
								stopColor="rgb(98.823529%,25.490196%,23.921569%)"
								stopOpacity="1"
							/>
							<stop
								offset="0.5"
								stopColor="rgb(98.823529%,25.490196%,23.921569%)"
								stopOpacity="1"
							/>
							<stop
								offset="0.65"
								stopColor="rgb(98.823529%,25.490196%,23.921569%)"
								stopOpacity="1"
							/>
							<stop
								offset="0.72"
								stopColor="rgb(98.823529%,36.078431%,18.823529%)"
								stopOpacity="1"
							/>
							<stop
								offset="0.86"
								stopColor="rgb(99.607843%,69.411765%,4.705882%)"
								stopOpacity="1"
							/>
							<stop
								offset="0.91"
								stopColor="rgb(99.607843%,78.039216%,0%)"
								stopOpacity="1"
							/>
							<stop
								offset="0.96"
								stopColor="rgb(100%,85.882353%,5.882353%)"
								stopOpacity="1"
							/>
						</linearGradient>
					</defs>
					<g id="surface1">
						<path
							stroke="none"
							fillRule="nonzero"
							fill="url(#linear0)"
							d="M 18.605469 2.441406 L 23.625 2.441406 L 23.625 17.382812 C 23.625 18.28125 22.917969 19.011719 22.039062 19.011719 L 19.398438 19.011719 C 18.960938 19.011719 18.605469 18.648438 18.605469 18.195312 Z M 18.605469 2.441406 "
						/>
						<path
							stroke="none"
							fillRule="nonzero"
							fill="rgb(98.823529%,25.490198%,23.921569%)"
							fillOpacity="1"
							d="M 5.394531 2.441406 L 0.375 2.441406 L 0.375 17.382812 C 0.375 18.28125 1.082031 19.011719 1.960938 19.011719 L 4.601562 19.011719 C 5.039062 19.011719 5.394531 18.648438 5.394531 18.195312 Z M 5.394531 2.441406 "
						/>
						<path
							stroke="none"
							fillRule="nonzero"
							fill="url(#linear1)"
							d="M 4.5 0.605469 C 3.441406 -0.3125 1.855469 -0.171875 0.964844 0.921875 C 0.0703125 2.011719 0.207031 3.636719 1.269531 4.554688 L 11.320312 13.238281 C 11.714844 13.578125 12.285156 13.578125 12.679688 13.238281 L 22.730469 4.554688 C 23.792969 3.636719 23.929688 2.011719 23.035156 0.921875 C 22.144531 -0.171875 20.558594 -0.3125 19.5 0.605469 L 12 7.085938 Z M 4.5 0.605469 "
						/>
					</g>
				</svg>
			),
		},
	];

	return (
		<div className="w-full mt-6">
			<div className="overflow-hidden">
				<div
					className="flex items-center justify-center space-x-8 marquee-inner gap-4"
					aria-hidden
				>
					{socials.map((s) => (
						<a
							key={s.label}
							href={s.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={s.label}
							className={`text-on-surface/80 hover:text-on-surface transition-colors`}
						>
							<span className="w-6 h-6 rounded-full hover:bg-surface-tint/10 inline-block">
								{s.svg}
							</span>
						</a>
					))}
				</div>
			</div>
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
	onToggleEasterEgg?: () => void;
}

export default function MainHero({
	// videosrc = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260428_193507_4286c423-2fd9-4efd-92bd-91a939453fc1.mp4',
	videosrc,
	tagline,
	badgeLabel = "SWE",
	badgeIcon = "code-tags",
	title = "Fluid Asset Streams",
	description = "Polyglot engineer with an unreasonable fondness for clean architecture. Based in Nairobi, fully remote-native, and always building something worth shipping.",
	statsValue = "9+",
	statsLabel = "Years of Experience",
	statsButtonLabel = "Engage",
	statsButtonIcon = "phone",
	statsHref = "/contact",
	accessory = null,
	top,
	bgText,
	onStatsButtonClick,
	onDocumentationClick,
	onToggleEasterEgg
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
				{videosrc && (
					<video
						autoPlay
						className="absolute inset-0 w-full h-full object-cover object-[65%] lg:object-center z-0 scale-105 group-hover:scale-100 transition-transform duration-2000ms"
						loop
						muted
						playsInline
						src={videosrc}
					/>
				)}

				{/* Content Layer */}
				<div className=" w-full h-full flex flex-col ">
					{top && (
						<div className="w-full pt-6 px-6 md:px-10 lg:px-16">
							{top}
						</div>
					)}
					<div className="w-full h-4/5 flex flex-col justify-center items-center   px-6  ">
						{
							<div
								className={`flex flex-col items-center justify-center pt-12 transition-all duration-1000`}
							>
								{accessory}
							</div>
						}
						<div
							className={`-mt-8 md:-mt-20 flex flex-col items-center md:px-6 lg:px-12  text-center `}
						>
							{/* Hero Badge */}
							<HeroBadge icon={badgeIcon} label={badgeLabel} onToggleEasterEgg={onToggleEasterEgg} />
							{tagline && (
								<h3 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-6 tracking-tight leading-[1.05] drop-shadow-sm">
									{tagline}
								</h3>
							)}
							{/* Heading */}
							<ShuffleText
								component="h1"
								className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-6 tracking-tight leading-[1.05] drop-shadow-sm"
								id="main-hero-title"
								replayOnClick
							>
								{title}
							</ShuffleText>
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
