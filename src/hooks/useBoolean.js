import { useState, useCallback } from "react";

const useBoolean = (initialState = () => false) => {
	const [value, setValue] = useState(initialState)

	const toggle = useCallback(() => {
		setValue((prev) => !prev);
	}, []);

	return [value, toggle];
};

export default useBoolean;
