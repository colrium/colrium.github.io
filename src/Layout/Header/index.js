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
import Icon from "@mdi/react";
import {
	mdiGithub,
	mdiTwitter,
	mdiLinkedin,
	mdiWhatsapp,
	mdiEmailVariant,
} from "@mdi/js";
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	alignItems: "flex-start",
	paddingTop: theme.spacing(1),
	paddingBottom: theme.spacing(2),
	// Override media queries injected by theme.mixins.toolbar
	"@media all": {
		minHeight: 128,
	},
}));
const Header = (props) => {
	const { onToggleThemeMode, themeMode } = props;
	const theme = useTheme();
	const router = useRouter();
	return (
		<Box sx={{ flexGrow: 1 }}>
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
						<Box
							className="rounded-full w-32 h-32 flex flex-col items-center justify-center rounded-full cursor-pointer duration-500 ease-in-out transition-colors "
							sx={{
								backgroundColor: (theme) =>
									theme.palette.action.hover,
								":hover": {
									backgroundColor: (theme) =>
										theme.palette.action.selected,
								},
							}}
							onClick={onToggleThemeMode}
						>
							<Image
								src="/img/logo.svg"
								alt="Mutugi Riungu"
								width={64}
								height={64}
							/>
						</Box>
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
									component={Typography}
									href="/"
									color="textSecondary"
									variant="h5"
									className="capitalize"
									activeClassName="font-extrabold "
								>
									Mutugi Riungu
								</Link>

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
		</Box>
	);
};

export default React.memo(Header);
