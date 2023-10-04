import Layout from "@app/Layout";
import { usePrefereredColorScheme, useSetState } from "@app/hooks";
import "@app/styles/globals.css";
import darkTheme from "@app/styles/theme/dark";
import createEmotionCache from "@app/utility/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AnimatePresence } from "framer-motion";
import { DefaultSeo } from "next-seo";
import Router from "next/router";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import SEO from "../../next-seo.config";
import { createContext } from "react";
import { useContext } from "react";
const clientSideEmotionCache = createEmotionCache();

const AppContext = createContext({
	citationOpen: true,
	themeMode: 'dark'
});
export const useApp = () => useContext(AppContext);
const NextApp = (props) => {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
	} = props;

	const [themeMode, toggleThemeMode] = usePrefereredColorScheme();
	const loaderTimeoutRef = useRef(null);

	const [state, setState] = useSetState({
		citationOpen: true,
	});
	useEffect(() => {
		const init = () => {
			loaderTimeoutRef.current = setTimeout(() => {
				setState({ citationOpen: false });
			}, 1500);
		};
		// Used for page transition
		const start = () => {
			//setState({ citationOpen: true });
		};
		const end = (err) => {
			loaderTimeoutRef.current = setTimeout(() => {
				//setState({ citationOpen: false });
			}, 500);
			
		};
		Router.events.on("routeChangeStart", start);
		Router.events.on("routeChangeComplete", end);
		Router.events.on("routeChangeError", end);

		init();

		return () => {
			clearTimeout(loaderTimeoutRef.current);
			loaderTimeoutRef.current = null;
			Router.events.off("routeChangeStart", start);
			Router.events.off("routeChangeComplete", end);
			Router.events.off("routeChangeError", end);
			
		};
	}, []);
	return (
		<CacheProvider value={emotionCache}>
			<AppContext.Provider value={{ ...state, themeMode, toggleThemeMode }}>
				<ThemeProvider
					theme={themeMode === "dark" ? darkTheme : darkTheme}
				>
					<DefaultSeo {...SEO} />
					<CssBaseline />
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<Layout
							onToggleThemeMode={toggleThemeMode}
							themeMode={themeMode.palette?.mode}
							showCitation={state.citationOpen}
						>
							<AnimatePresence mode="wait" initial={false}>
								<Component {...pageProps} />
							</AnimatePresence>
						</Layout>
					</LocalizationProvider>
				</ThemeProvider>
			</AppContext.Provider>
		</CacheProvider>
	);
};

NextApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired,
};

export default NextApp;
