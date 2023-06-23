import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import ReactDOM from "react-dom";
const noop = () => {};

const isSSR = typeof window === "undefined";
const useIsomorphicLayoutEffect = isSSR ? useEffect : useLayoutEffect;
const batch = ReactDOM.unstable_batchedUpdates || ((fn = noop) => fn());
const isPrimitive = (data) => typeof data !== "object";

let currentFlow = null;
const allFlows = new Set();

const runFlows = (flowSet) => {
	batch(() => {
		flowSet?.forEach((flow) => {
			if (allFlows.has(flow)) {
				return;
			}

			allFlows.add(flow);

			flow.deadDeps = flow.liveDeps;
			flow.liveDeps = new Map();
			flow.callback(true);
			flow.deadDeps.forEach((remove) => remove());
		});
	});

	setTimeout(() => allFlows.clear());
};

export function useSignal(initialValue) {
	const valRef = useRef(initialValue);
	const listeners = useRef([]);

	const hasUpdate = useRef(false);
	const flowSetArr = useRef([]);
	if (!flowSetArr.current) {
		flowSetArr.current = [new Set(), new Set(), new Set()];
	}

	const isFirst = useRef(true);
	useIsomorphicLayoutEffect(() => {
		if (isFirst.current) {
			isFirst.current = false;
		} else {
			runFlows(flowSetArr.current[0]);
		}
	}, []);

	const Render = ({ keyPath, mapCallback }) => {
		const [value, setValue] = useState(valRef.current);

		useIsomorphicLayoutEffect(() => {
			listeners.current.push(setValue);
			return () => {
				const index = listeners.current.indexOf(setValue);
				listeners.current.splice(index, 1);
			};
		}, []);

		useIsomorphicLayoutEffect(() => {
			if (hasUpdate.current) {
				hasUpdate.current = false;
				flowSetArr.current.forEach((flowSet) => runFlows(flowSet));
			}
		});

		if (!Array.isArray(keyPath)) {
			return value;
		}

		const subVal = keyPath.reduce((obj, key) => obj[key], value);

		return mapCallback ? subVal.map(mapCallback) : subVal;
	};
	

	const proxy = useCallback((obj, keyPath) => {
		return new Proxy(obj, {
			get: (target, key) => {
				const val = target[key];
				console.log("keyPath", keyPath);
				console.log("val", val);

				if (key === "map" && val === Array.prototype.map) {
					const fakeArrayMap = (mapCallback) => {
						/* return (
							<Render
								keyPath={keyPath}
								mapCallback={mapCallback}
							/>
						); */
						return Render({ keyPath, mapCallback });
					};
					console.log("fakeArrayMap", fakeArrayMap);
					return fakeArrayMap;
				}

				keyPath.push(key);
				

				if (isPrimitive(val)) {
					const retValue = Render({ keyPath });
					//return <Render keyPath={keyPath} />;
					
					return Render({keyPath});
				}
				

				return proxy(val, keyPath);
			},
		});
	}, []);

	return useMemo(() => {
		flowSetArr.current.forEach((flowSet) => flowSet.clear());
		const getValue = () => {
			try {
				if (currentFlow) {
					const flow = currentFlow;
					const flowSet = flowSetArr.current[flow.arrIndex];

					flowSet.add(flow);
					flow.deadDeps.delete(valRef);
					flow.liveDeps.set(valRef, () => flowSet.delete(flow));
					return valRef.current;
				}

				// eslint-disable-next-line react-hooks/rules-of-hooks
				useState();
				if (isPrimitive(valRef.current)) {
					return <Render />;
				}

				return proxy(valRef.current, []);
			} catch (e) {
				return valRef.current;
			}
		};
		const updateValue = (payload) => {
			const getVal = (prev) =>
				payload instanceof Function ? payload(prev) : payload;

			if (listeners.current.length === 0) {
				valRef.current = getVal(valRef.current);
				flowSetArr.current.forEach((flowSet) => runFlows(flowSet));
			} else {
				batch(() => {
					listeners.current.forEach((listener) => {
						listener((prev) => (valRef.current = getVal(prev)));
					});
				});
				hasUpdate.current = true;
			}
		};
		return [getValue(), updateValue];
	}, [proxy]);
}

export function useUpdate(fn = noop) {
	const fnRef = useRef(fn);
	fnRef.current = fn;

	useIsomorphicLayoutEffect(() => {
		const flow = {
			arrIndex: 1,
			liveDeps: new Map(),
			deadDeps: new Map(),
			callback: () => {
				currentFlow = flow;
				fnRef.current();
				currentFlow = null;
			},
		};

		flow.callback();
	}, []);
}

export const useAuto = (fn = noop) => {
	const fnRef = useRef(fn);
	fnRef.current = fn;
	const setter = useRef(() => undefined);

	const initVal = useMemo(() => {
		const flow = {
			arrIndex: 0,
			liveDeps: new Map(),
			deadDeps: new Map(),
			callback: (_isUpdate) => {
				currentFlow = flow;
				const val = fnRef.current();
				if (_isUpdate) {
					setter.current(val);
				}
				currentFlow = null;
				return val;
			},
		};

		return flow.callback(false);
	}, []);

	const [value, setValue] = useSignal(initVal);
	setter.current = setValue;

	return value;
};

export const useMount = (fn = noop) => {
	const fnRef = useRef(fn);
	fnRef.current = fn;
	useIsomorphicLayoutEffect(() => fnRef.current(), []);
};

export function useCleanup(fn = noop) {
	const fnRef = useRef(fn);
	fnRef.current = fn;

	useIsomorphicLayoutEffect(() => () => fnRef.current(), []);
}

export function Run(fn) {
	return useAuto(fn)();
}
