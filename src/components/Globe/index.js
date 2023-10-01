import { useTheme } from "@mui/styles";
import createGlobe from "cobe";
import { useEffect, useRef, memo } from "react";

const Globe =({width=250, height=250, ...rest}) => {
    const ref = useRef();
    const theme = useTheme()
    useEffect(() => {
		let phi = 0;
		const canvas = document.getElementById('globe');
		const globe = createGlobe(canvas, {
			devicePixelRatio: 1,
			width: width,
			height: height,
			phi: 0,
			theta: 0,
			dark: 1,
			diffuse: 1.2,
			scale: 1,
			mapSamples: 3000,
			mapBrightness: 9,
			baseColor: [1, 1, 1],
			markerColor: [1, 1, 1],
			glowColor: [0, 0, 0, 0],
			offset: [0, 0],
			markers: [{ location: [-1.286389, 36.817223], size: 0.2 }],
			onRender: (state) => {
				// Called on every animation frame.
				// `state` will be an empty object, return updated params.
				state.phi = phi;
				phi += 0.01;
			},
		});
	}, []);
    return (
		<canvas
			id={'globe'}
			width={width * 2}
			height={height * 2}
			style={{ width, height }}
			{...rest}
		></canvas>
	);
}
export default memo(Globe)