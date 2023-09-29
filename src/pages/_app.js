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
const clientSideEmotionCache = createEmotionCache();

const NextApp = (props) => {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
	} = props;

	const [modeTheme, toggleModeTheme] = usePrefereredColorScheme();
	const loaderTimeoutRef = useRef(null);

	const [state, setState] = useSetState({
		loading: true,
	});
	
	useEffect(() => {
		const init = () => {
			loaderTimeoutRef.current = setTimeout(() => {
				setState({ loading: false });
			}, 1500);
		};
		// Used for page transition
		const start = () => {
			setState({ loading: true });
		};
		const end = (err) => {
			loaderTimeoutRef.current = setTimeout(() => {
				setState({ loading: false });
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
			<ThemeProvider theme={modeTheme === "dark" ? darkTheme : darkTheme}>
				<DefaultSeo {...SEO} />
				<CssBaseline />
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<Layout
						onToggleThemeMode={toggleModeTheme}
						themeMode={modeTheme.palette?.mode}
						showCitation={state.loading}
					>
						<AnimatePresence mode="wait" initial={false}>
							<Component {...pageProps} />
						</AnimatePresence>
					</Layout>
				</LocalizationProvider>
			</ThemeProvider>
		</CacheProvider>
	);
};

NextApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired,
};

export default NextApp;
