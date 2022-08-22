export const TOGGLE_PREFFERED_COLOR_MODE = "[UI]TOGGLE_PREFFERED_COLOR_MODE";
export const SET_PREFFERED_COLOR_MODE = "[UI]SET_PREFFERED_COLOR_MODE";

export function togglePreferedColorMode(mode) {
	return {
		type: TOGGLE_PREFFERED_COLOR_MODE,
		payload: mode,
	};
}
export function setPreferedColorMode(mode) {
	return {
		type: SET_PREFFERED_COLOR_MODE,
		payload: mode,
	};
}
