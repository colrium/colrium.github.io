import { useCallback } from "react";
import useBoolean from "./useBoolean";
import useDidMount from "./useDidMount";

const usePrefereredColorScheme = () => {
	const [isLightMode, toggle] = useBoolean(() => typeof window !== "undefined" && window?.prefersDarkMode ? false : true);

	const colorSchemeMe = useCallback(
		(e) => {
			if (isLightMode !== e.matches) {
				toggle();
			}
		},
		[isLightMode]
	);

	const addColorSchemeChangeListener = useCallback(() => {
		if (
			typeof window !== "undefined" &&
			typeof window.matchMedia === "function"
		) {
			window
				.matchMedia("(prefers-color-scheme: dark)")
				.addEventListener("change", colorSchemeMe);
			return () =>
				window
					.matchMedia("(prefers-color-scheme: dark)")
					.removeListener(colorSchemeMe);
		}
		return () => {};
	}, [isLightMode]);
	useDidMount(() => {
		const removeColorSchemeChangeListener = addColorSchemeChangeListener();
		return () => {
			removeColorSchemeChangeListener();
		};
	});
	const toggleTheme = useCallback(() => {
		toggle();
	}, [isLightMode]);

	return [isLightMode ? "light" : "dark", toggleTheme];
}
export default usePrefereredColorScheme;
