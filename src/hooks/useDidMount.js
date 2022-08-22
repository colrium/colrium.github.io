import { useEffect, useRef } from 'react';

const useDidMount = (callback = () => {}, useEffectHabitCurb=[]) => {
    const isMountedRef = useRef(false);
	const isFunction = (input) => {
		return input !== undefined && input !== null
			? input.constructor === Function || typeof input === "function"
			: false;
	};
    useEffect(() => {
		isMountedRef.current = true
		let res = null
		if (isFunction(callback)) {
			res = callback()
		}
		return () => {
			isMountedRef.current = false
			if (isFunction(res)) {
				res()
			}
		}
	}, [])
    return isMountedRef.current;
};

export default useDidMount;
