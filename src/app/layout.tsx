import type { Metadata } from "next";
import localFont from "next/font/local";
import {  Epilogue } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/ui/PageLoader";
const googleSansFlex = localFont({
	src: [
		{
			path: "./fonts/google-sans-flex-latin-300-normal.woff2",
			style: "normal",
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
			className={`${googleSansFlex.variable} ${epilogue.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col bg-surface-tint ">
				<PageLoader />
				{children}
			</body>
		</html>
  );
}
