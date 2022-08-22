import { useCallback, useEffect, useRef } from "react";
import _ from "lodash";
import useUpdate from "./useUpdate";

const useSetState = (initialState = {}) => {
	const [, update] = useUpdate();
	const state = useRef({ ...initialState });
	const isMountedRef = useRef(false);

	const prevState = useRef({});
	const stateChangesRef = useRef({});

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	}, []);

	const getState = useCallback(() => state.current, []);
	const getPreviousState = useCallback(() => prevState.current, []);
	const isJSON = (input) => {
		return input !== undefined && input !== null
			? input.constructor === {}.constructor
			: false;
	};
	const isFunction = (input) => {
		return input !== undefined && input !== null
			? input.constructor === Function || typeof input === "function"
			: false;
	};
	const setState = useCallback((patch, cb) => {
		if (!patch) {
			return;
		}
		try {
			const staleState = JSON.parse(JSON.stringify(state.current));
			if (isJSON(patch)) {
				Object.assign(state.current, staleState, patch);
				if (!_.isEqual(staleState, state.current)) {
					prevState.current = staleState;
					if (isMountedRef.current) {
						update();
					}
					if (isFunction(cb)) {
						cb(state.current);
					}
				}
			} else if (typeof patch === "function") {
				Promise.all([patch(staleState)]).then((patches) => {
					if (Array.isArray(patches)) {
						if (isJSON(patches[0])) {
							Object.assign(
								state.current,
								staleState,
								patches[0]
							);
						}
						if (!_.isEqual(staleState, state.current)) {
							prevState.current = staleState;
							if (isMountedRef.current) {
								update();
							}

							if (isFunction(cb)) {
								cb(state.current);
							}
						}
					}
				});
			}
		} catch (error) {
			console.error("useSetState error", error);
		}

	}, []);

	return [state.current, setState, getState, getPreviousState];
};

export default useSetState;
