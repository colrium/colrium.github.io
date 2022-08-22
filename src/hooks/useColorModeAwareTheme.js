import usePrefereredColorScheme from "./usePrefereredColorScheme";
import lightTheme from "@app/styles/theme/light";
import darkTheme from "@app/styles/theme/dark";


const useColorModeAwareTheme = () => {
	const [theme, toggleTheme] = usePrefereredColorScheme();
	return [theme === "dark" ? darkTheme : lightTheme, toggleTheme];
};
export default useColorModeAwareTheme;
