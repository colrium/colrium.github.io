import {
	mdiApplicationBraces,
	mdiCloud,
	mdiDatabase,
	mdiMonitorDashboard,
	mdiServerSecurity,
	mdiTabletCellphone
} from "@mdi/js";
import Icon from "@mdi/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import { useTranslation } from "next-export-i18n";

const MotionBox = motion(Box);
const MotionIcon = motion(Icon);

export default function ProficienciesSection() {
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<LazyMotion features={domAnimation}>
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
					<Grid
						item
						xs={12}
						className="text-center flex  flex-col my-4 items-center justify-center "
					>
						<Typography
							variant="h5"
							color="textSecondary"
							className="mb-4"
						>
							{t("skills.title")}
						</Typography>

						{/* <Typography variant="body2">
							{t("skills.description")}
						</Typography> */}
					</Grid>
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
						<MotionBox
							className="flex flex-col items-center justify-center p-8 rounded-lg m-4 h-auto md:h-56 lg:h-48"
							initial={{ scale: 0.5, opacity: 0, x: 0, y: -40 }}
							whileInView={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0, opacity: 0, x: 0, y: -40 }}
							transition={{
								type: "anticipate",
								duration: 0.25,
							}}
							sx={{
								backgroundColor: (theme) =>
									theme.palette.background.paper,
							}}
						>
							<MotionIcon
								initial={{
									scale: 0.5,
									opacity: 0,
									x: 0,
									y: -10,
								}}
								animate={{ scale: 1, opacity: 1, y: 0 }}
								exit={{ scale: 0, opacity: 0, x: 0, y: -40 }}
								transition={{
									type: "anticipate",
									duration: 0.25,
									delay: 0.25,
								}}
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
						</MotionBox>
					</Grid>
					<Grid item xs={12} md={6} xl={2}>
						<MotionBox
							className="flex flex-col items-center justify-center p-8 rounded-lg m-4 h-auto md:h-56 lg:h-48"
							initial={{ scale: 0.5, opacity: 0, x: 0, y: -40 }}
							whileInView={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0, opacity: 0, x: 0, y: -40 }}
							transition={{
								type: "anticipate",
								duration: 0.25,
							}}
							sx={{
								backgroundColor: (theme) =>
									theme.palette.background.paper,
							}}
						>
							<MotionIcon
								initial={{
									scale: 0.5,
									opacity: 0,
									x: 0,
									y: -10,
								}}
								animate={{ scale: 1, opacity: 1, y: 0 }}
								exit={{ scale: 0, opacity: 0, x: 0, y: -40 }}
								transition={{
									type: "anticipate",
									duration: 0.25,
									delay: 0.25,
								}}
								path={mdiCloud}
								title="Cloud computing"
								color={theme.palette.text.disabled}
								size={1.5}
							/>
							<Typography variant="body1" color="primary">
								Cloud
							</Typography>
							<Typography variant="body2" className="text-center">
								AWS, Azure, GCP, Digital Ocean, etc.
							</Typography>
						</MotionBox>
					</Grid>
					<Grid item xs={12} md={6} xl={2}>
						<MotionBox
							className="flex flex-col items-center justify-center p-8 rounded-lg m-4 h-auto md:h-56 lg:h-48"
							initial={{ scale: 0.5, opacity: 0, x: 0, y: -40 }}
							whileInView={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0, opacity: 0, x: 0, y: -40 }}
							transition={{
								type: "anticipate",
								duration: 0.25,
							}}
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
								PostgreSQL, MySQL, SQLite, MongoDB & Realm, ES
							</Typography>
						</MotionBox>
					</Grid>

					<Grid item xs={12} md={6} xl={2}>
						<MotionBox
							className="flex flex-col items-center justify-center p-8 rounded-lg m-4 h-auto md:h-56 lg:h-48"
							initial={{ scale: 0.5, opacity: 0, x: 0, y: -40 }}
							whileInView={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0, opacity: 0, x: 0, y: -40 }}
							transition={{
								type: "anticipate",
								duration: 0.25,
							}}
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
								Node, ExpressJS, NextJS, PHP & JAVA.
							</Typography>
						</MotionBox>
					</Grid>

					<Grid item xs={12} md={6} xl={2}>
						<MotionBox
							className="flex flex-col items-center justify-center p-8 rounded-lg m-4 h-auto md:h-56 lg:h-48"
							initial={{ scale: 0.5, opacity: 0, x: 0, y: -40 }}
							whileInView={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0, opacity: 0, x: 0, y: -40 }}
							transition={{
								type: "anticipate",
								duration: 0.25,
							}}
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
								Angular JS, React JS, Next JS
							</Typography>
						</MotionBox>
					</Grid>

					<Grid item xs={12} md={6} xl={2}>
						<MotionBox
							className="flex flex-col items-center justify-center p-8 rounded-lg m-4 h-auto md:h-56 lg:h-48"
							initial={{ scale: 0.5, opacity: 0, x: 0, y: -40 }}
							whileInView={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0, opacity: 0, x: 0, y: -40 }}
							transition={{
								type: "anticipate",
								duration: 0.25,
							}}
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
								TV & Mobile
							</Typography>
							<Typography variant="body2" className="text-center">
								Kotlin, Swift & React Native & WebOs
							</Typography>
						</MotionBox>
					</Grid>
				</Grid>
			</Grid>
		</LazyMotion>
	);
}
