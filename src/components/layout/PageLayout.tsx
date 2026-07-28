"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageLayout({
	children,
	showNavbar = true,
	alwaysShowFooter = false,
}: Readonly<{
	children: React.ReactNode;
	showNavbar?: boolean;
	alwaysShowFooter?: boolean;
}>) {
	const pathname = usePathname();
	const isHome = pathname === "/";
	const showFooter = alwaysShowFooter || !isHome;

	return (
		<>
			{showNavbar && <Navbar />}
			{children}
			{showFooter && <Footer />}
		</>
	);
}
