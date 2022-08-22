import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
	palette: {
		mode: "light",
		contrast: {
			main: "#FFFFFF",
		},
		primary: {
			contrastText: "#FFFFFF",
			// main: "#aa0000",
			main: "#005522",
			light: "#df0000",
			dark: "#700000",
		},
		secondary: {
			contrastText: "#FFFFFF",
			main: "#2e2e2e",
			light: "#5c5c5c",
			dark: "#000000",
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
