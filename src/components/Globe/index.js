import { useApp } from "@app/pages/_app";
import { useTheme } from "@mui/styles";
import createGlobe from "cobe";
import { useEffect, useRef, memo, useLayoutEffect } from "react";

const Globe =({width=300, height=300, ...rest}) => {
    const canvasRef = useRef();
    const theme = useTheme();
	const {citationOpen} = useApp()
	
	const init = () => {
			let phi = 0;
			
			const globe = createGlobe(canvasRef.current, {
				devicePixelRatio: 1,
				width,
				height,
				phi: 0,
				theta: 0.1,
				dark: 0,
				diffuse: 1,
				mapSamples: 16000,
				mapBrightness: 10,
				baseColor: [0.5, 0.5, 0.5],
				markerColor: [0.235, 0.403, 0.89],
				glowColor: [0.098, 0.109, 0.16],
				markers: [{ location: [-1.286389, 36.817223], size: 0.2 }],
				onRender: (state) => {
					// Called on every animation frame.
					// `state` will be an empty object, return updated params.
					state.phi = phi;
					phi += 0.01;
				},
			});
			
		return () => {
			//globe?.destroy?.();
		};
	}
    useEffect(() => {
		if (!citationOpen) {
			init();
		}
		
	}, []);
    return (
		<canvas
			ref={canvasRef}
			style={{
				width,
				height,
				maxWidth: "100%",
				aspectRatio: 1,
			}}
		/>
	);
}
export default Globe