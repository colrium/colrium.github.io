import type { Metadata } from "next";
import localFont from "next/font/local";
import { Epilogue } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import PageLoader from "@/components/layout/PageLoader";
import { GameModeProvider } from "@/lib/contexts/GameModeContext";

export const dynamic = "force-dynamic";

const googleSansFlex = localFont({
	src: [
		{
			path: "./fonts/google-sans-flex-latin-300-normal.woff2",
			style: "normal",
			weight: "100",
		},
		{
			path: "./fonts/google-sans-flex-latin-300-normal.woff2",
			style: "normal",
			weight: "200",
		},
		{
			path: "./fonts/google-sans-flex-latin-300-normal.woff2",
			style: "normal",
			weight: "300",
		},
		{
			path: "./fonts/google-sans-flex-latin-400-normal.woff2",
			style: "normal",
			weight: "400",
		},
		{
			path: "./fonts/google-sans-flex-latin-500-normal.woff2",
			style: "normal",
			weight: "500",
		},
		{
			path: "./fonts/google-sans-flex-latin-600-normal.woff2",
			style: "normal",
			weight: "600",
		},
		{
			path: "./fonts/google-sans-flex-latin-700-normal.woff2",
			style: "normal",
			weight: "700",
		},
		{
			path: "./fonts/google-sans-flex-latin-800-normal.woff2",
			style: "normal",
			weight: "800",
		},
		{
			path: "./fonts/google-sans-flex-latin-900-normal.woff2",
			style: "normal",
			weight: "900",
		},
	],
	variable: "--font-google-sans-flex", // Define the custom CSS variable
});

const epilogue = Epilogue({
	variable: "--font-epilogue",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "Mutugi",
	description:
		"Software Engineer Portfolio of Mutugi, a polyglot engineer with a passion for clean architecture and building impactful software. Based in Nairobi, fully remote-native.",
};

export default function RootLayout({
	children,
	showNavbar = true,
	showFooter = true,
}: Readonly<{
	children: React.ReactNode;
	showNavbar?: boolean;
    showFooter?: boolean;
}>) {
	return (
		<html
			lang="en"
			className={`${googleSansFlex.variable} ${epilogue.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col bg-surface-tint ">
				<GameModeProvider>
					<PageLoader />
					{showNavbar && <Navbar />}
					{children}
					{showFooter && <Footer />}
				</GameModeProvider>
			</body>
		</html>
	);
}
