"use client";

import { useEffect } from "react";
import ErrorPageShell from "@/components/ui/ErrorPageShell";

interface ErrorProps {
	error: Error & { digest?: string };
	unstable_retry: () => void;
}

export default function Error({ error, unstable_retry }: ErrorProps) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<ErrorPageShell
			status="500"
			eyebrow="Runtime error"
			title="Something misfired."
			description="A page-level exception interrupted the render. Give it another pass, or head back home while the stack trace cools down."
			primaryAction={
				<button
					type="button"
					onClick={() => unstable_retry()}
					className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-on-surface transition hover:bg-accent-dark active:scale-95"
				>
					<span className="material-symbols-outlined text-base">
						refresh
					</span>
					Try again
				</button>
			}
			secondaryLabel="Back home"
		/>
	);
}
