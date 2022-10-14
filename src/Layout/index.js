

import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

import { CitationOverlay, Footer } from "@app/components";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Header from "./Header";

const Layout = React.forwardRef(
	({ children, sx, themeMode, onToggleThemeMode, ...rest }, ref) => {
		const [citation, setCitation] = useState(true);
		const [main, setMain] = useState(false);
		const { t } = useTranslation("common");

		useEffect(() => {
			const ids = [
				setTimeout(() => setCitation(false), 1500),
				setTimeout(() => setMain(true), 1700),
			];

			return () => ids.forEach((id) => clearTimeout(id));
		}, [setCitation]);
		return (
			<>
				<CitationOverlay citation={citation} />
				<motion.div
					variants={{
						initial: {
							opacity: 0,
							display: "none",
						},
						visible: {
							opacity: 1,
							display: "block",
						},
					}}
					initial="initial"
					animate={main ? "visible" : "initial"}
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
						<Header
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
