import { createTheme } from "@mui/material/styles";
import { colors } from "@app/config";
const lightTheme = createTheme({
	palette: {
		mode: "light",
		contrast: {
			main: "#FFFFFF",
		},
		primary: {
			contrastText: "#FFFFFF",
			main: colors.primary || "#005522",
		},
		secondary: {
			contrastText: "#FFFFFF",
			main: colors.secondary || "#2e2e2e",
		},
		accent: {
			contrastText: "#FFFFFF",
			main: colors.accent || "#ff0000",
		},
		contrast: {
			main: "#FFFFFF",
			contrastText: "#4a4a4a",
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
			default: "#F2F2F2",
			paper: "#FFFFFF",
		},
		text: {
			primary: "#4a4a4a",
			contrast: "#FFFFFF",
			contrastDark: "#141414",
			secondary: "#737373",
			disabled: "#999999",
		},
	},
	typography: {
		fontSize: 16,
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

		htmlFontSize: 16,
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
export default lightTheme;
