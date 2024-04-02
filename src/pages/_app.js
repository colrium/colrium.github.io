import Layout from "@app/Layout";
import { usePrefereredColorScheme, useSetState } from "@app/hooks";
import "@app/styles/globals.css";
import darkTheme from "@app/styles/theme/dark";
import createEmotionCache from "@app/utility/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { alpha } from '@mui/material/styles';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AnimatePresence } from "framer-motion";
import { DefaultSeo } from "next-seo";
import Router from "next/router";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useRef } from "react";
import SEO from "../../next-seo.config";
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

	const theme = themeMode === 'dark' ? darkTheme : darkTheme;
	return (
		<CacheProvider value={emotionCache}>
			<AppContext.Provider value={{ ...state, themeMode, toggleThemeMode }}>
				<ThemeProvider theme={theme}>
					<DefaultSeo {...SEO} />
					<style
						global
						jsx
					>{`
						.surface,
						.Surface {
							background-color: ${theme.palette.background.surface} !important;
						}
						.fill-primary {
							fill: ${theme.palette.primary.main};
						}
						.fill-background {
							fill: ${theme.palette.background.main};
						}
						.fill-background-surface {
							fill: ${theme.palette.background.surface};
						}
						.fill-background-dark {
							fill: ${theme.palette.background.dark};
						}
						.fill-primary {
							fill: ${theme.palette.primary.main};
						}
						.fill-primary-dark {
							fill: ${theme.palette.primary.dark};
						}
						.fill-secondary {
							fill: ${theme.palette.secondary.main};
						}
						.fill-secondary-dark {
							fill: ${theme.palette.secondary.dark};
						}
						.fill-tertiary {
							fill: ${theme.palette.tertiary.main};
						}
						.fill-tertiary-dark {
							fill: ${theme.palette.tertiary.dark};
						}
						.blur-surface {
							background-color: ${alpha(theme.palette.background.dark, 0.25)} !important;
							--webkit-backdrop-filter: [blur(${theme.spacing()}), blur(${theme.spacing()})];
							backdrop-filter: blur(${theme.spacing()});
							background-image: linear-gradient(
								${alpha(theme.palette.background.main, 0.15)},
								${alpha(theme.palette.background.dark, 0.25)}
							);
						}
						.devices {
							--hue: 223;
							--bg: ${theme.palette.text.primary} !important;
							--fg: ${theme.palette.primary.main} !important;
							--trans-dur: 0.65s;
						}
						
						
					`}</style>
					<CssBaseline />
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<Layout
							onToggleThemeMode={toggleThemeMode}
							themeMode={themeMode.palette?.mode}
							showCitation={state.citationOpen}
						>
							<AnimatePresence
								mode="wait"
								initial={false}
							>
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
