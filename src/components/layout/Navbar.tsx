"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import ActiveLink from "../ui/ActiveLink";
import { useGameMode } from "@/lib/contexts/GameModeContext";
import { useTheme } from "@/lib/contexts/ThemeContext";

const NAV_LINKS = [
	{ label: "Skills", href: "/skills" },
	{ label: "Impact", href: "/impact" },
	{ label: "Experience", href: "/experience" },
	{ label: "Projects", href: "/projects" },
	{ label: "Contact", href: "/contact" },
];

export default function Navbar() {
	const { gameMode } = useGameMode();
	const { theme, toggleTheme } = useTheme();
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const scrollToId = window?.location?.hash || null;

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

	const handleNavClick = useCallback(() => {
		setMenuOpen(false);
	}, []);

	useEffect(() => {
		if (!menuOpen) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setMenuOpen(false);
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [menuOpen]);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	if (gameMode) return null;

	return (
		<>
			<header
				className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out ${scrolled ? "pt-3" : "pt-6"}`}
			>
				<nav
					className={`flex items-center justify-between border-transparent transition-all duration-500 ease-out ${
						scrolled
							? "border border-accent/10! bg-on-surface/5 rounded-full backdrop-blur-xl w-[min(720px,calc(100vw-2rem))] px-5 py-2.5 shadow-[0_8px_48px_rgba(0,0,0,0.6)]"
							: "w-[min(1100px,calc(100vw-3rem))] px-8 py-4"
					}`}
				>
					{/* Hamburger - mobile only */}
					<button
						onClick={() => setMenuOpen(true)}
						className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl hover:bg-surface/8 transition-colors duration-200"
						aria-label="Open navigation menu"
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							className="w-5 h-5"
						>
							<path
								d="M4 6h16M4 12h16M4 18h16"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</button>

					{/* Logo - visible on md+ */}
					<Link
						href="/"
						className="hidden md:flex items-center gap-2.5 group"
					>
						<div
							className={`rounded-xl flex items-center justify-center transition-all duration-500 ${scrolled ? "w-7 h-7" : "w-9 h-9"}`}
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
							className={`font-bold tracking-tight text-primary uppercase transition-all duration-500 ${scrolled ? "text-base" : "text-lg"}`}
						>
							Mutugi
						</span>
					</Link>

					{/* Center links — md+ only */}
					<ul
						className={`hidden md:flex items-center transition-all duration-500 ${scrolled ? "gap-0.5" : "gap-1"}`}
					>
						{NAV_LINKS.map(({ label, href }) => (
							<li key={label}>
								<ActiveLink
									href={href}
									className={`relative text-sm font-thin transition-all duration-200 px-3 py-1.5 rounded-lg hover:bg-surface/8 ${scrolled ? "text-xs" : "text-sm"}`}
									activeClassName="text-accent/80 hover:text-accent/90"
									inactiveClassName="text-on-surface/70 hover:text-on-surface/90"
								>
									{label}
								</ActiveLink>
							</li>
						))}
					</ul>
					<div className="flex justify-end gap-4">
						{/* Theme toggle */}
						<button
							onClick={toggleTheme}
							className={`inline-flex items-center justify-center rounded-full hover:bg-surface/8 active:scale-[0.97] transition-all duration-300 ${scrolled ? "w-7 h-7" : "w-9 h-9"}`}
							aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
						>
							{theme === "dark" ? (
								<svg viewBox="0 0 24 24" fill="none" className={`transition-all duration-500 ${scrolled ? "w-4 h-4" : "w-5 h-5"}`}>
									<circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
									<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
								</svg>
							) : (
								<svg viewBox="0 0 24 24" fill="none" className={`transition-all duration-500 ${scrolled ? "w-4 h-4" : "w-5 h-5"}`}>
									<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
							)}
						</button>

						{/* GitHub icon */}
						<Link
							href="https://github.com/colrium"
							target="_blank"
							rel="noopener noreferrer"
							className={`inline-flex items-center justify-center rounded-full hover:bg-surface/8 active:scale-[0.97] transition-all duration-300 ${scrolled ? "w-7 h-7 mr-1" : "w-9 h-9 mr-1.5"}`}
						>
							<svg
								viewBox="0 0 24 24"
								fill="currentColor"
								className={`transition-all duration-500 ${scrolled ? "w-4 h-4" : "w-5 h-5"}`}
							>
								<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
							</svg>
						</Link>

						{/* CTA */}
						<Link
							href="/Software-Engineer-Collins-Riungu-resume.pdf"
							target="_blank"
							className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-accent text-surface hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 ${scrolled ? "px-4 py-1.5 text-xs" : "px-5 py-2 text-sm"}`}
						>
							<svg
								viewBox="0 0 16 16"
								fill="none"
								className={`text-surface transition-all duration-500 ${scrolled ? "w-3 h-3" : "w-3.5 h-3.5"}`}
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
					</div>
				</nav>
			</header>

			{/* Offcanvas Drawer - xs/sm only */}
			<div
				className={`fixed inset-0 z-[100] transition-all duration-300 md:hidden ${
					menuOpen ? "visible" : "invisible"
				}`}
			>
				<div
					className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
						menuOpen ? "opacity-100" : "opacity-0"
					}`}
					onClick={() => setMenuOpen(false)}
				/>

				<aside
					className={`absolute top-0 left-0 h-full w-72 max-w-[calc(100vw-3rem)] bg-surface/95 backdrop-blur-2xl border-r border-accent/10 shadow-2xl transition-transform duration-300 ease-out ${
						menuOpen ? "translate-x-0" : "-translate-x-full"
					}`}
				>
					<div className="flex items-center justify-between px-5 py-4 border-b border-accent/10">
						<Link
							href="/"
							className="flex items-center gap-2.5 group"
						>
							<div
								className={`rounded-xl flex items-center justify-center transition-all duration-500 ${scrolled ? "w-7 h-7" : "w-9 h-9"}`}
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
								className={`font-bold tracking-tight text-primary uppercase transition-all duration-500 ${scrolled ? "text-base" : "text-lg"}`}
							>
								Mutugi
							</span>
						</Link>
						<button
							onClick={() => setMenuOpen(false)}
							className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-surface/8 transition-colors duration-200"
							aria-label="Close navigation menu"
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								className="w-5 h-5"
							>
								<path
									d="M18 6L6 18M6 6l12 12"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
							</svg>
						</button>
					</div>

					<ul className="flex flex-col gap-1 p-3">
						{NAV_LINKS.map(({ label, href }) => (
							<li key={label}>
								<ActiveLink
									href={href}
									className="flex w-full text-sm font-thin transition-all duration-200 px-4 py-3 rounded-lg hover:bg-surface/8"
									activeClassName="text-accent/70 hover:text-accent/90"
									inactiveClassName="text-on-surface/40 hover:text-on-surface/90"
									onClick={handleNavClick}
								>
									{label}
								</ActiveLink>
							</li>
						))}
						<li className="mt-2 border-t border-accent/10 pt-2">
							<button
								onClick={() => { toggleTheme(); handleNavClick(); }}
								className="flex w-full text-sm font-thin transition-all duration-200 px-4 py-3 rounded-lg hover:bg-surface/8 text-on-surface/40 hover:text-on-surface/90"
							>
								{theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode"}
							</button>
						</li>
					</ul>
				</aside>
			</div>
		</>
	);
}
