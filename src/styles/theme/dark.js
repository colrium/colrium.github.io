import { createTheme } from "@mui/material/styles";
import { colors } from "@app/config";
const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			contrastText: "#FFFFFF",
			// main: "#aa0000",
			main: colors.primary || "#005522",
		},
		secondary: {
			contrastText: "#FFFFFF",
			main: colors.secondary || "#2e2e2e",
			light: "#5c5c5c",
			dark: "#000000",
		},
		inverse: {
			main: "#FFFFFF",
			contrastText: "#000000",
		},
		contrast: {
			main: "#FFFFFF",
			contrastText: "#000000",
		},
		default: {
			main: "inherit",
		},
		white: {
			main: "#FFFFFF",
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
			default: "#161616",
			paper: "#000000",
		},
		text: {
			primary: "#ffffff",
			contrast: "#1a1a1a",
			contrastDark: "#ffffff",
			secondary: "#d4d4d4",
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
