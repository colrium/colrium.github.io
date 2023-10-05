import { createTheme } from "@mui/material/styles";
import { colors } from "@app/config";
const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			contrastText: "#dedede",
			// main: "#aa0000",
			main: colors.primary || "#005522",
		},
		secondary: {
			contrastText: "#dedede",
			main: colors.secondary || "#2e2e2e",
			light: "#5c5c5c",
			dark: "#000000",
		},
		accent: {
			contrastText: "#dedede",
			main: colors.accent || "#ff0000",
		},
		inverse: {
			main: "#dedede",
			contrastText: "#000000",
		},
		contrast: {
			main: "#dedede",
			contrastText: "#000000",
		},
		default: {
			main: "inherit",
		},
		white: {
			main: "#dedede",
		},
		success: {
			main: "#00AF41",
		},
		facebook: {
			main: "#3B5998",
		},
		google: {
			main: "#DD4B39",
		},
		github: {
			main: "#333333",
		},
		linkedin: {
			main: "#0e76a8",
		},
		background: {
			default: "#191c29",
			paper: "#0b0d13",
		},
		text: {
			primary: "#dedede",
			contrast: "#8c8c8c",
			contrastDark: "#ffffff",
			secondary: "#8c8c8c",
			disabled: "#999999",
		},
	},
	typography: {
		fontSize: 16,
		htmlFontSize: 16,
		fontFamily: [
			"TT Commons Light",
			"-apple-system",
			"BlinkMacSystemFont",
			"Segoe UI",
			"Roboto",
			"Helvetica Neue",
			"Arial",
			"sans-serif",
			"Apple Color Emoji",
			"Segoe UI Emoji",
			"Segoe UI Symbol",
		].join(","),
	},
	appDrawer: {
		width: 280,
	},
	components: {
		// Name of the component
		MuiTypography: {
			defaultProps: {
				component: "span", // No more p abuse Hydration Errors 💣!
			},
		},
	},
});
export default darkTheme;
