"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Tracks whether the component using this hook is currently mounted.
 */
export function useIsMounted() {
	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;

		return () => {
			isMounted.current = false;
		};
	}, []);

	return useCallback(() => isMounted.current, []);
}
