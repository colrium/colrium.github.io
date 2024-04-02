/* eslint-disable react/display-name */


import { motion } from "framer-motion";
import { useTranslation } from "next-export-i18n";
import React, { useState } from "react";

import { CitationOverlay } from "@app/components";
import { Box, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import Navbar from "./Navbar";
import BouncingBlobs from "@app/components/BouncingBlobs";

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
			<Box
				sx={{
					// background: (theme) => theme.palette.background.default,
					// background: (theme) =>
					// 	`radial-gradient(to bottom,  ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
				}}
				id="main-wrapper"
			>

				<CitationOverlay
					// citation={citation}
					citation={showCitation}
				/>
				{!showCitation && <Box
				>
					<Stack
						className="relative"
						sx={{
							color: (theme) => theme.palette.text.primary,
							// backgroundColor: (theme) =>
							// 	theme.palette.background.default,
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
						<Grid container className="lg:px-16 px-4 relative">
							{/* <Divider orientation="vertical" variant="middle" flexItem>
						VERTICAL
					</Divider> */}
							<Grid item xs>
							<BouncingBlobs />
								{children}
							</Grid>
						</Grid>
					</Stack>
				</Box>}
			</Box>
		);
	}
);
export default React.memo(Layout);
