"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ActiveLink from "../ui/ActiveLink";

const NAV_LINKS = [
	{ label: "Skills", href: "/#skills" },
	{ label: "Aesthetics", href: "/#aesthetics" },
	{ label: "Experience", href: "/#experience" },
    { label: "Impact", href: "/#impact" },
    { label: "engagements", href: "/#engagements" },
	{
		label: "GitHub",
		href: "https://github.com/colrium",
		external: true,
	},
];

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
        const scrollToId =
                window?.location?.hash || null;
    
            if (scrollToId) {
                const element = document.getElementById(scrollToId.substring(1));
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                } 
            }
            
		const onScroll = () => setScrolled(window.scrollY > 32);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
    
	return (
		<header
			className={`
        fixed top-0 left-0 right-0 z-50 flex justify-center
        transition-all duration-500 ease-out
        ${scrolled ? "pt-3" : "pt-6"}
      `}
		>
			<nav
				className={`
          flex items-center justify-between border-transparent backdrop-blur-xl transition-all  duration-500 ease-out 
          ${
				scrolled
					? "border border-accent/10!  bg-on-surface/5 rounded-full w-[min(720px,calc(100vw-2rem))] px-5 py-2.5 shadow-[0_8px_48px_rgba(0,0,0,0.6)]"
					: "w-[min(1100px,calc(100vw-3rem))] px-8 py-4 shadow-[0_4px_32px_rgba(0,0,0,0.4)]"
			}
        `}
			>
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2.5 group">
					<div
						className={`
              rounded-xl 
              flex items-center justify-center
              transition-all duration-500
              ${scrolled ? "w-7 h-7" : "w-9 h-9"}
            `}
					>
						<Image
							src="/logo.svg"
							alt="Logo"
							width={scrolled ? 24 : 32}
							height={scrolled ? 24 : 32}
							className={`transition-all duration-500 ${scrolled ? "w-6 h-6" : "w-8 h-8"}`}
						/>
					</div>
					<span
						className={`
              font-bold tracking-tight text-primary uppercase transition-all duration-500
              ${scrolled ? "text-base" : "text-lg"}
            `}
					>
						Mutugi
					</span>
				</Link>

				{/* Center links — hidden when scrolled on small screens */}
				<ul
					className={`
            hidden md:flex items-center gap-1
            transition-all duration-500
            ${scrolled ? "gap-0.5" : "gap-1"}
          `}
				>
					{NAV_LINKS.map(({ label, href, external }) => (
						<li key={label}>
							<ActiveLink
								href={href}
								target={external ? "_blank" : undefined}
								rel={
									external ? "noopener noreferrer" : undefined
								}
								className={`
                  relative text-sm font-medium 
                  transition-all duration-200
                  px-3 py-1.5 rounded-lg hover:bg-surface/8
                  ${scrolled ? "text-xs" : "text-sm"}
                `}
								activeClassName="text-accent/70 hover:text-accent/90"
								inactiveClassName="text-on-surface/60 hover:text-on-surface/90"
								observe
							>
								{label}
							</ActiveLink>
						</li>
					))}
				</ul>

				{/* CTA */}
				<Link
					href="/Software-Engineer-Collins-Riungu-CV.pdf"
					className={`
            inline-flex items-center gap-1.5 font-semibold rounded-full
            bg-surface-tint
            text-accent 
            hover:scale-[1.03]
            active:scale-[0.97]
            transition-all duration-300
            ${scrolled ? "px-4 py-1.5 text-xs" : "px-5 py-2 text-sm"}
          `}
				>
					<svg
						viewBox="0 0 16 16"
						fill="none"
						className={`transition-all duration-500 ${scrolled ? "w-3 h-3" : "w-3.5 h-3.5"}`}
					>
						<path
							d="M8 2v8M5 7l3 3 3-3M3 12h10"
							stroke="currentColor"
							strokeWidth="1.8"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					Resume
				</Link>
			</nav>
		</header>
	);
}
