// hooks/usePathnameWithHash.ts
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function usePathnameWithHash() {
	const pathname = usePathname();
	const searchParams = useSearchParams(); // Triggers re-render on query changes
	const [hash, setHash] = useState("");

	useEffect(() => {
		// Set initial hash value
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setHash(window.location.hash);

		const handleHashChange = () => {
			setHash(window.location.hash);
		};

		// Listen for manual anchor clicks or browser back/forward changes
		window.addEventListener("hashchange", handleHashChange);

		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, [pathname, searchParams]); // Re-run when the main path or query params shift

	// Construct the full string
	return {pathname, hash, full:`${pathname}${hash}`};
}
