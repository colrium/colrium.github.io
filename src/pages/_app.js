import React, { useMemo, useEffect, useCallback } from "react";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PropTypes from "prop-types";
import Router from "next/router";
import createEmotionCache from "@app/utility/createEmotionCache";
import { DefaultSeo } from "next-seo";
import "@app/styles/globals.css";
import Layout from "@app/Layout";
import SEO from "../../next-seo.config";
import { useDidMount, useSetState, useColorModeAwareTheme } from "@app/hooks";
const clientSideEmotionCache = createEmotionCache();

const NextApp = (props) => {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
	} = props;

	const [modeTheme, toggleModeTheme] = useColorModeAwareTheme();

	const [state, setState] = useSetState({
		loading: false,
	});

	useDidMount(() => {
		Router.onRouteChangeStart = (url) =>
			setState({ error: false, loading: true });

		Router.onRouteChangeComplete = () =>
			setState({ error: false, loading: false });

		Router.onRouteChangeError = () =>
			setState({ error: true, loading: false });
	});

	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={modeTheme}>
				<DefaultSeo {...SEO} />
				<CssBaseline />
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<Layout
						onToggleThemeMode={toggleModeTheme}
						themeMode={modeTheme.palette?.mode}
					>
						<Component {...pageProps} />
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
