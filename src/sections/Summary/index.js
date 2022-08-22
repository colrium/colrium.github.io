import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import Link from "@app/components/Link";
import Image from "next/image";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import {
	mdiGithub,
	mdiTwitter,
	mdiLinkedin,
	mdiWhatsapp,
	mdiEmailVariant,
} from "@mdi/js";
import Icon from "@mdi/react";

export default function SummarySection() {
	const variants = {
		hidden: { opacity: 0, x: 0, y: -10 },
		enter: { opacity: 1, x: 0, y: 0 },
		exit: { opacity: 0, x: 0, y: -100 },
	};
	const theme = useTheme();
	return (
		<motion.div
			variants={variants} // Pass the variant object into Framer Motion
			initial="hidden" // Set the initial state to variants.hidden
			animate="enter" // Animated state to variants.enter
			exit="exit" // Exit state (used later) to variants.exit
			transition={{ type: "linear" }}
			className="flex flex-col items-center min-h-full"
		>
			<Grid component="div" container spacing={1}>
				<Grid
					item
					xs={12}
					className="text-center flex flex-row items-center justify-center "
				>
					<Link
						component={IconButton}
						className="m-4"
						href="https://github.com/colrium"
					>
						<Icon
							path={mdiGithub}
							title="Github"
							color={theme.palette.text.primary}
							size={1}
						/>
					</Link>
					<Link
						component={IconButton}
						className="m-4"
						href="https://twitter.com/mutugiriungu"
					>
						<Icon
							path={mdiTwitter}
							title="Twitter"
							color={"#1DA1F2"}
							size={1}
						/>
					</Link>

					<Link
						component={IconButton}
						className="m-4"
						href="https://www.linkedin.com/in/mutugiriungu/"
					>
						<Icon
							path={mdiLinkedin}
							title="LinkedIn"
							color={"#0077B5"}
							size={1}
						/>
					</Link>

					<Link
						component={IconButton}
						className="m-4"
						href="https://api.whatsapp.com/send/?phone=254724146857&text=Hey+Mutugi"
					>
						<Icon
							path={mdiWhatsapp}
							title="Whatsapp"
							color={"#25D366"}
							size={1}
						/>
					</Link>
				</Grid>

				<Grid
					item
					xs={12}
					sx={{
						display: "flex",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<Typography
						variant="h2"
						color="textSecondary"
						gutterBottom
						className="text-center"
					>
						Full Stack Developer
					</Typography>
				</Grid>

				<Grid
					item
					xs={12}
					sx={{
						display: "flex",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<Typography
						variant="body1"
						gutterBottom
						sx={{ width: "50vw", textAlign: "center" }}
					>
						Passionate Developer with 7+ years of experience in
						design, developent, testing, deployment and maintenance
						of software systems. Equipped with a diverse and
						up-to-date skill-set. Proficient in various platforms,
						languages, and embedded systems. Experienced with the
						latest development tools, paradigms and technologies.
						Able to effectively produce solutions for complex
						problems independently, as well as collaborate as part
						ofa productive team.
					</Typography>
				</Grid>

				<Grid
					item
					xs={12}
					className="text-center flex flex-row items-center justify-center "
				>
					<Link
						component={Button}
						className="lowercase px-4 rounded-full"
						color={"#BB001B"}
						variant="contained"
						href="mailto:colrium@gmail.com"
						startIcon={
							<Icon
								path={mdiEmailVariant}
								title="Gmail"
								color={"#BB001B"}
								size={0.7}
							/>
						}
					>
						colrium@gmail.com
					</Link>
				</Grid>
			</Grid>
		</motion.div>
	);
}
