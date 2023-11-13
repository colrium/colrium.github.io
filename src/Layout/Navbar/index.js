import Globe from "@app/components/Globe";
import { useSignal } from "@app/hooks";
import { useApp } from "@app/pages/_app";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import { motion, useScroll } from "framer-motion";
import { useTranslation } from "next-export-i18n";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef } from "react";
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin

dayjs.extend(utc);
dayjs.extend(timezone);
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	alignItems: "flex-start",
	paddingTop: theme.spacing(1),
	paddingBottom: theme.spacing(2),
	// Override media queries injected by theme.mixins.toolbar
	"@media all": {
		minHeight: 128,
	},
}));

const MotionTypography = motion(Typography);
const MotionAvatar = motion(Avatar);
const MotionBox = motion(Box);

const Header = (props) => {
	const {themeMode, toggleThemeMode} = useApp()
	const theme = useTheme();
	const router = useRouter();
	const colorToggleLottieRef = useRef();
	const { scrollYProgress } = useScroll();
	const { t } = useTranslation();
	const handleToggleColorMode = useCallback(() => {
		toggleThemeMode();
	}, [themeMode]);
	const [localTime, setLocalTime] = useSignal(
		`${t("locale.localtime")} : ${dayjs()
			.tz("Africa/Nairobi")
			.format("hh:mm:ss A")}`
	);

	useEffect(() => {
		let interval = setInterval(() => {
			setLocalTime(
				`${t("locale.localtime")} : ${dayjs()
					.tz("Africa/Nairobi")
					.format("hh:mm:ss A")}`
			);
			
		}, 1000);

		

		return () => {
			clearInterval(interval);
		}
	}, [])
	
	return (
		<>
			<Head>
				<title>{t("title")}</title>
				<meta name="description" content={t("meta.description")} />
			</Head>
			<Box sx={{ flexGrow: 1 }}>
				<MotionBox
					className="fixed top-0 left-0 right-0 z-10 origin-left"
					//style={{ scaleX: scrollYProgress }}
					sx={{
						//backgroundColor: theme.palette.primary.main,
						height: (theme) => theme.spacing(0.3),
					}}
				/>
				<Box
					sx={{
						backgroundColor: "transparent",
						color: theme.palette.text.primary,
					}}
				>
					<Box className="flex items-center justify-center">
						<Box spacing={1} className="flex flex-col w-3/4">
							

							<Box
								spacing={1}
								className="flex flex-1 flex-col items-center justify-center"
							>
								<Box item xs={12} className="flex item-center justify-center my-8">
									<Box className="flex flex-col gap-2">
										<Typography variant="h2" textAlign={'center'}>
											{t("title")}
										</Typography>

										<Typography color="textSecondary" variant="h5" textAlign={'right'}>
											{t("tagline")}
										</Typography>
									</Box>
								</Box>
								<Box>
									<Box className="w-full flex items-center justify-center">
										<Globe />
									</Box>

									<Box className="flex gap-4 items-center justify-center flex-col md:flex-row mb-8">
										<Chip
											icon={
												<LocationOnIcon fontSize="inherit" />
											}
											label={`${t("common.location")} ${t(
												"locale.location"
											)}`}											
											
										/>

										<Chip
											icon={
												<TravelExploreIcon fontSize="inherit" />
											}
											label={`${t("locale.timezone")}`}
											
										/>

										<Chip
											// color="primary"
											icon={
												<AccessTimeIcon fontSize="inherit" />
											}
											//variant="outlined"
											label={localTime}
										/>
									</Box>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default React.memo(Header);
