"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

let clickTime = 0;
let pathWhenClicked = "";


const toURL = (url: string | URL | null) => {
	try {
		if (url) return new URL(url);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {}
	return null;
};


const useOnNavigate = (): boolean => {
	const curPath = usePathname();

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		clickTime = 0;
		if (curPath !== pathWhenClicked) {
			// defer to avoid synchronous setState inside effect
			queueMicrotask(() => setLoading(false));
		}
	}, [curPath]);

	useEffect(() => {
		if (typeof navigator === "undefined") return;

		const onMessage = (event: MessageEvent) => {
			const data = event.data as { fetchUrl?: string; dest?: string } | undefined;
			if (Date.now() - clickTime > 1000) return;

			const url = toURL(data?.fetchUrl ?? null);
			if (url?.search.startsWith("?_rsc=") && data?.dest === "") {
				clickTime = 0;
				setLoading(true);
			}
		};

		const sw: ServiceWorkerContainer | undefined = navigator.serviceWorker;
		sw?.addEventListener("message", onMessage);

		const onClick = () => {
			clickTime = Date.now();
			pathWhenClicked = location.pathname;
		};

		addEventListener("click", onClick, true);

		return () => {
			sw?.removeEventListener("message", onMessage);
			removeEventListener("click", onClick, true);
		};
	}, []);

	return loading;
}

export default useOnNavigate;