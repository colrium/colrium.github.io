import type { Metadata } from "next";
import ErrorPageShell from "@/components/ui/ErrorPageShell";

export const metadata: Metadata = {
	title: "404 | Mutugi",
	description: "The page you are looking for could not be found.",
};

export default function NotFound() {
	return (
		<ErrorPageShell
			status="404"
			eyebrow="Route not found"
			title="This page wandered off."
			description="The link is stale, the route moved, or the URL picked up an extra character somewhere. The work is still here, just not at this address."
			secondaryLabel="Return to portfolio"
		/>
	);
}
