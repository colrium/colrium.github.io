import type { Metadata } from "next";
import { Geist, Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/ui/PageLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
    variable: "--font-bebas-neue",
    weight: "400",
	subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
	variable: "--font-plus-jakarta-sans",
	subsets: ["latin"],
    weight: ["300", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mutugi",
  description: "Software Engineer Portfolio of Mutugi, a polyglot engineer with a passion for clean architecture and building impactful software. Based in Nairobi, fully remote-native.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html
			lang="en"
			className={`${bebasNeue.variable} ${plusJakartaSans.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col bg-surface-tint ">
				<PageLoader />
				{children}
			</body>
		</html>
  );
}
