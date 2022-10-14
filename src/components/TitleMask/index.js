import React from "react";
import Box from "@mui/material/Box";
import VideoMask from "./VideoMask";

const TitleMask = (props) => {
	return (
		<Box
			sx={{}}
			className={"overflow-hidden relative md:w-80 md:h-20 h-14 w-60"}
			{...props}
		>
			<VideoMask
				className={"z-10 absolute top-0 left-0 right-0 w-full"}
			/>
			{/* <Box
				component="video"
				autoPlay
				muted
				loop
				preload="auto"
				className={"z-0 absolute top-0 left-0 right-0 w-full"}
			>
				<source src="https://d33wubrfki0l68.cloudfront.net/ab4c4ea31f1543825102ebf15a35080cdc1397ce/b8c4f/static/images/frontpage/hero/gradient.mp4" />
			</Box> */}
		</Box>
	);
};

export default TitleMask;
