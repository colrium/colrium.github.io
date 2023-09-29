/* eslint-disable react/display-name */


import { motion } from "framer-motion";
import { useTranslation } from "next-export-i18n";
import React, { useState } from "react";

import { CitationOverlay } from "@app/components";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Navbar from "./Navbar";

const Layout = React.forwardRef(
	({ children, sx, themeMode, onToggleThemeMode, showCitation, ...rest }, ref) => {
		const [citation, setCitation] = useState(true);
		const [main, setMain] = useState(false);
		useTranslation("common");

		// useEffect(() => {
		// 	const ids = [
		// 		setTimeout(() => setCitation(false), 1500),
		// 		setTimeout(() => setMain(true), 1700),
		// 	];

		// 	return () => ids.forEach((id) => clearTimeout(id));
		// }, [setCitation]);

		return (
			<>
				<CitationOverlay
					// citation={citation}
					citation={showCitation}
				/>
				<motion.div
					variants={{
						hidden: {
							opacity: 0,
							display: "none",
						},
						visible: {
							opacity: 1,
							display: "block",
						},
					}}
					initial="hidden"
					//animate={main ? "visible" : "hidden"}
					animate={showCitation ? "hidden" : "visible"}
					transition={{
						duration: 1.0,
					}}
				>
					<Stack
						className="relative"
						sx={{
							color: (theme) => theme.palette.text.primary,
							backgroundColor: (theme) =>
								theme.palette.background.default,
							...sx,
						}}
						direction="column"
						{...rest}
						ref={ref}
					>
						<Navbar
							themeMode={themeMode}
							onToggleThemeMode={onToggleThemeMode}
						/>
						<Grid container className="lg:px-16 px-4">
							{/* <Divider orientation="vertical" variant="middle" flexItem>
						VERTICAL
					</Divider> */}
							<Grid item xs>
								{children}
							</Grid>
						</Grid>
					</Stack>
				</motion.div>
			</>
		);
	}
);
export default React.memo(Layout);
