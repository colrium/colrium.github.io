import React, { useRef, useEffect, useCallback } from "react";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PropTypes from "prop-types";
import Router from "next/router";
import createEmotionCache from "@app/utility/createEmotionCache";
import { DefaultSeo } from "next-seo";
import "@app/styles/globals.css";
import Layout from "@app/Layout";
import SEO from "../../next-seo.config";
import { AnimatePresence } from "framer-motion";
import lightTheme from "@app/styles/theme/light";
import darkTheme from "@app/styles/theme/dark";
import { useDidMount, useSetState, usePrefereredColorScheme } from "@app/hooks";
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

	console.log("modeTheme", modeTheme);

	
	useEffect(() => {
		const init = () => {
			loaderTimeoutRef.current = setTimeout(() => {
				setState({ loading: false });
			}, 500);
		};
		// Used for page transition
		const start = () => {
			console.log('start loading')
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
