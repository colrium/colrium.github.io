import Grid from "@mui/material/Grid";
import React from "react";
import { useTheme } from "@mui/material/styles";
import Link from "@app/components/Link";
import Image from "next/image";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import SettingsBrightnessRoundedIcon from "@mui/icons-material/SettingsBrightnessRounded";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";
import Icon from "@mdi/react";
import { useTranslation } from "next-export-i18n";
import {
	mdiGithub,
	mdiTwitter,
	mdiLinkedin,
	mdiWhatsapp,
	mdiEmailVariant,
} from "@mdi/js";
import { LazyMotion, domAnimation, useScroll, motion } from "framer-motion";

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
								exit={{ scale: 0, opacity: 0, x: 0, y: -40 }}
								transition={{
									type: "spring",
									damping: 30,
									mass: 0.75,
									stiffness: 400,
									delay: 0.03,
									duration: 0.25,
								}}
								onClick={onToggleThemeMode}
								src="/img/avatar.jpg"
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
									{/* <Link
									component={Typography}
									href="/"
									color="textSecondary"
									variant="h5"
									className="capitalize"
									activeClassName="font-extrabold "
								>
									Mutugi Riungu
								</Link> */}

									{/* <FormGroup sx={{ alignSelf: "flex-end" }}>
									<FormControlLabel
										control={
											<Checkbox
												checked={
													theme?.palette?.mode ===
													"dark"
												}
												color="contrast"
												icon={
													<SettingsBrightnessRoundedIcon />
												}
												checkedIcon={
													<SettingsBrightnessIcon />
												}
												onChange={onToggleThemeMode}
											/>
										}
									/>
								</FormGroup> */}
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
	);
};

export default React.memo(Header);
