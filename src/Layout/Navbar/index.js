import Globe from "@app/components/Globe";
import { usePrefereredColorScheme } from "@app/hooks";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Stack, Chip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import { LazyMotion, domAnimation, motion, useScroll } from "framer-motion";
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
	const [themeMode, toggleModeTheme] = usePrefereredColorScheme();
	const theme = useTheme();
	const router = useRouter();
	const colorToggleLottieRef = useRef();
	const { scrollYProgress } = useScroll();
	const { t } = useTranslation();
	const handleToggleColorMode = useCallback(() => {
		
		toggleModeTheme();
	}, [themeMode]);
	useEffect(() => {
		console.log("themeMode", themeMode);
		// colorToggleLottieRef.current.setDirection(themeMode==='dark'? -1 : 1);
		// colorToggleLottieRef.current.play();
	}, [themeMode])
	return (
		<>
			<Head>
				<title>{t("title")}</title>
				<meta name="description" content={t("meta.description")} />
			</Head>
			<Box sx={{ flexGrow: 1 }}>
				<LazyMotion features={domAnimation}>
					<MotionBox
						className="fixed top-0 left-0 right-0 z-10 origin-left"
						//style={{ scaleX: scrollYProgress }}
						sx={{
							//backgroundColor: theme.palette.primary.main,
							height: (theme) => theme.spacing(0.3),
						}}
					/>
					<AppBar
						position="static"
						sx={{
							backgroundColor: "transparent",
							color: theme.palette.text.primary,
						}}
						enableColorOnDark
						elevation={0}
					>
						<StyledToolbar className="items-center justify-center">
							<Box spacing={1} className="flex flex-col w-3/4">
								<Box className="flex w-full justify-end items-center">
									<Box
										className="w-24"
										onClick={handleToggleColorMode}
									></Box>
								</Box>

								<Box
									spacing={1}
									className="flex flex-1 flex-col items-center justify-center"
								>
									<Box className="relative h-72">
										<Box className="w-full flex items-center justify-center">
											<Globe />
										</Box>

										<Box className="flex gap-4 items-center justify-center">
											<Chip
												icon={
													<LocationOnIcon fontSize="inherit" />
												}
												label={`${t(
													"common.location"
												)} ${t("locale.location")}`}
												variant="outlined"
												color="secondary"
											/>

											<Chip
												icon={
													<TravelExploreIcon fontSize="inherit" />
												}
												label={`${t(
													"locale.timezone"
												)}`}
												variant="outlined"
												color="secondary"
											/>

											<Chip
												color="secondary"
												icon={
													<AccessTimeIcon fontSize="inherit" />
												}
												variant="outlined"
												label={`${t(
													"locale.localtime"
												)} : ${dayjs()
													.tz("Africa/Nairobi")
													.format("HH:mm A")}`}
											/>
										</Box>
									</Box>
								</Box>
							</Box>
						</StyledToolbar>
					</AppBar>
				</LazyMotion>
			</Box>
		</>
	);
};

export default React.memo(Header);
