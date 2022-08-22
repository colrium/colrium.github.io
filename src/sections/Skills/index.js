import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import JavascriptRoundedIcon from "@mui/icons-material/JavascriptRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";

import Icon from "@mdi/react";
import {
	mdiServerSecurity,
	mdiCloud,
	mdiDatabase,
	mdiApplication,
	mdiApplicationBraces,
	mdiTabletCellphone,
	mdiMonitorDashboard,
} from "@mdi/js";

export default function SKillSetSection() {
	const theme = useTheme();
	return (
		<Grid
			component="div"
			container
			spacing={1}
			sx={{ marginTop: (theme) => theme.spacing(10) }}
		>
			<Grid
				item
				xs={12}
				sx={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				{/* <Typography
						variant="h6"
						component="span"
						color="textSecondary"
					>
						Skills
					</Typography> */}
			</Grid>

			<Grid
				container
				sx={{
					display: "flex",
					alignItems: "center",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<Grid item xs={12} md={6} xl={2}>
					<Box
						className="flex flex-col items-center justify-center p-8 rounded-lg m-4 h-auto md:h-56 lg:h-48"
						sx={{
							backgroundColor: (theme) =>
								theme.palette.background.paper,
						}}
					>
						<Icon
							path={mdiServerSecurity}
							title="Administration & Security"
							color={theme.palette.text.disabled}
							size={1.5}
						/>
						<Typography variant="body1" color="primary">
							Administration
						</Typography>
						<Typography variant="body2" className="text-center">
							Server setup, configuration and audits
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} md={6} xl={2}>
					<Box
						className="flex flex-col items-center justify-center p-8 rounded-lg m-4 h-auto md:h-56 lg:h-48"
						sx={{
							backgroundColor: (theme) =>
								theme.palette.background.paper,
						}}
					>
						<Icon
							path={mdiCloud}
							title="Cloud computing"
							color={theme.palette.text.disabled}
							size={1.5}
						/>
						<Typography variant="body1" color="primary">
							Cloud computing
						</Typography>
						<Typography variant="body2" className="text-center">
							AWS, Azure, GCP, Digital Ocean, Linode, etc.
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} md={6} xl={2}>
					<Box
						className="flex flex-col items-center justify-center p-8 rounded-lg m-4 h-auto md:h-56 lg:h-48"
						sx={{
							backgroundColor: (theme) =>
								theme.palette.background.paper,
						}}
					>
						<Icon
							path={mdiDatabase}
							title="Databases"
							color={theme.palette.text.disabled}
							size={1.5}
						/>
						<Typography variant="body1" color="primary">
							Databases
						</Typography>
						<Typography variant="body2" className="text-center">
							SQL, MySQL, SQLite, MongoDB & Realm, Room
						</Typography>
					</Box>
				</Grid>

				<Grid item xs={12} md={6} xl={2}>
					<Box
						className="flex flex-col items-center justify-center p-8 rounded-lg m-4 h-auto md:h-56 lg:h-48"
						sx={{
							backgroundColor: (theme) =>
								theme.palette.background.paper,
						}}
					>
						<Icon
							path={mdiApplicationBraces}
							title="Backend"
							color={theme.palette.text.disabled}
							size={1.5}
						/>
						<Typography variant="body1" color="primary">
							Backend
						</Typography>
						<Typography variant="body2" className="text-center">
							PHP, Node.js & Python.
						</Typography>
					</Box>
				</Grid>

				<Grid item xs={12} md={6} xl={2}>
					<Box
						className="flex flex-col items-center justify-center p-8 rounded-lg m-4 h-auto md:h-56 lg:h-48"
						sx={{
							backgroundColor: (theme) =>
								theme.palette.background.paper,
						}}
					>
						<Icon
							path={mdiMonitorDashboard}
							title="Frontend"
							color={theme.palette.text.disabled}
							size={1.5}
						/>
						<Typography variant="body1" color="primary">
							Frontend
						</Typography>
						<Typography variant="body2" className="text-center">
							HTML, CSS, Angular JS, React JS
						</Typography>
					</Box>
				</Grid>

				<Grid item xs={12} md={6} xl={2}>
					<Box
						className="flex flex-col items-center justify-center p-8 rounded-lg m-4 h-auto md:h-56 lg:h-48"
						sx={{
							backgroundColor: (theme) =>
								theme.palette.background.paper,
						}}
					>
						<Icon
							path={mdiTabletCellphone}
							title="Mobile"
							color={theme.palette.text.disabled}
							size={1.5}
						/>
						<Typography variant="body1" color="primary">
							Mobile
						</Typography>
						<Typography variant="body2" className="text-center">
							Java, Kotlin, Swift & React Native
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Grid>
	);
}
