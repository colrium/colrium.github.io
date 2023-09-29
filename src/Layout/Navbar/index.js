import Link from "@app/components/Link";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import { LazyMotion, domAnimation, motion, useScroll } from "framer-motion";
import { useTranslation } from "next-export-i18n";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

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
	const { onToggleThemeMode, themeMode } = props;
	const theme = useTheme();
	const router = useRouter();
	const { scrollYProgress } = useScroll();
	const { t } = useTranslation();
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
						style={{ scaleX: scrollYProgress }}
						sx={{
							backgroundColor: theme.palette.primary.main,
							height: (theme) => theme.spacing(0.3),
						}}
					/>
					<AppBar
						position="static"
						sx={{
							backgroundColor: theme.palette.background.paper,
							color: theme.palette.text.primary,
						}}
						enableColorOnDark
						elevation={0}
						className="magic-card"
					>
						<StyledToolbar>
							<Box
								spacing={1}
								className="flex flex-1 flex-col items-center justify-center"
							>
								<MotionAvatar
									className="w-32 h-32 my-8 cursor-pointer"
									initial={{
										scale: 0.5,
										opacity: 0,
										x: 0,
										y: -40,
									}}
									whileInView={{ scale: 1, opacity: 1, y: 0 }}
									whileHover={{ scale: 1.05 }}
									exit={{
										scale: 0,
										opacity: 0,
										x: 0,
										y: -40,
									}}
									transition={{
										type: "spring",
										damping: 30,
										mass: 0.75,
										stiffness: 400,
										delay: 0.03,
										duration: 0.25,
									}}
									onClick={onToggleThemeMode}
									src="/img/avatar.png"
									alt="Mutugi Riungu"
								/>
								<Box
									sx={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
									}}
								>
									<Box
										sx={{
											alignSelf: "center",
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "center",
										}}
										className="my-2"
									>
										<Link
											component={MotionTypography}
											href="/"
											color="textSecondary"
											variant="h5"
											className="capitalize"
											activeClassName="font-extrabold "
											initial={{
												scale: 0,
												opacity: 0,
												y: -20,
											}}
											whileInView={{
												scale: 1,
												opacity: 1,
												y: 0,
											}}
											transition={{
												type: "anticipate",
											}}
											onClick={onToggleThemeMode}
										>
											{t("tagline")}
										</Link>
									</Box>
									<Box
										sx={{
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "flex-end",
										}}
									></Box>
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
