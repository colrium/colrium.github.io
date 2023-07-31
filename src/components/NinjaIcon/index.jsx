/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
const leftEyeVariants = {
	visible: {
		scale: 1,
	},
	invisible: {
		scale: 0,
	},
};
const NinjaIcon =(props) => {
	const theme = useTheme();
	return (
		<div className="relative ">
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 512 512"
			
				{...props}
			>
				<motion.path
					fill={theme.palette.primary.main}
					style={{
						originX: 0.5,
						originY: 0.5,
						transform: "scale(0, 0)",
					}}
					variants={{
						initial: {
							scale: 0,
						},
						visible: {
							// opacity: 1,
							scale: 1,
						},
					}}
					initial="initial"
					animate="visible"
					transition={{
						delay: 0.1,
						duration: 0.2,
						// repeat: Infinity,
					}}
					d="m 471,256 A 215,215 0 0 1 256.00609,471 215,215 0 0 1 41,256.01218 215,215 0 0 1 255.98173,41.000001 215,215 0 0 1 471,255.97564"
				/>
				<motion.path
					fill={theme.palette.background.paper}
					variants={{
						initial: {
							// scaleY: 0,
							d: "m 89.030792,255.12427 L 424.720642,255.12427 z",
						},
						visible: {
							// opacity: 1,
							// scaleY: 1,
							d: "m 86.928033,227.63081 c 0,0 -2.386611,32.77819 0,48.9038 2.493507,16.84788 14.799827,48.9038 14.799827,48.9038 0,0 59.96954,-7.075 90.08595,-9.0086 22.48438,-1.44359 45.03396,-1.8385 67.56445,-1.93041 21.02426,-0.0858 42.08798,-0.19436 63.06017,1.28694 28.44908,2.0094 84.93817,10.29554 84.93817,10.29554 0,0 9.83325,-20.15431 12.86942,-30.88661 3.36934,-11.90999 5.10354,-24.31956 5.79124,-36.67785 0.5249,-9.43272 -1.28694,-28.31272 -1.28694,-28.31272 0,0 -29.47706,-15.46975 -45.04297,-21.23455 -20.44611,-7.57216 -41.55193,-13.79924 -63.06016,-17.37372 -27.9809,-4.65018 -56.61854,-6.74546 -84.93818,-5.14776 -26.08851,1.47183 -52.11115,6.26742 -77.21652,13.51289 -23.38255,6.74825 -44.7201,19.2529 -67.564457,27.66925 z",
						},
					}}
					initial="initial"
					animate="visible"
					transition={{
						delay: 0.2,
						duration: 0.2,
						// repeat: Infinity,
					}}
					// exit={{ scaleY: 0 }}
					d="m 89.030792,255.12427 L 424.720642,255.12427 z"
				/>
				<motion.path
					fill={theme.palette.primary.main}
					style={{
						transform: "scale(0, 0)",
					}}
					variants={{
						invisible: {
							scale: 0,
						},
						visible: {
							scale: 1,
						},
					}}
					initial="invisible"
					animate="visible"
					transition={{
						delay: 0.35,
						duration: 0.1,
						//repeat: Infinity,
					}}
					d="m 211.04175,287.19512 a 27.669254,26.382313 0 0 1 -32.32537,14.31535 27.669254,26.382313 0 0 1 -20.30084,-27.93274 27.669254,26.382313 0 0 1 25.40887,-23.83204"
				/>
				<motion.path
					fill={theme.palette.primary.main}
					style={{
						transform: "scale(0, 0)",
					}}
					variants={{
						invisible: {
							scale: 0,
						},
						visible: {
							scale: 1,
						},
					}}
					initial="invisible"
					animate="visible"
					transition={{
						delay: 0.35,
						duration: 0.1,
						//repeat: Infinity,
					}}
					d="m 290.2138,287.15567 c 7.90697,17.3154 33.99634,20.43237 46.13451,5.96998 11.7255,-12.01853 6.88964,-33.94515 -8.34604,-40.55028 l -5.13464,-1.94009 -5.43648,-0.92905 v 0"
					// transform="scale(-1,1)"
				/>
			</motion.svg>
		</div>
	);
};
export default NinjaIcon;
