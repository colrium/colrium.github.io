import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Link, TitleMask, HandWave, NinjaIcon } from "@app/components";
import Image from "next/image";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useTranslation } from "next-i18next";
import {
	mdiGithub,
	mdiTwitter,
	mdiLinkedin,
	mdiWhatsapp,
	mdiEmailVariant,
	mdiPhone,
} from "@mdi/js";
import Icon from "@mdi/react";
import { email, socialMedias } from "@app/config";
import { LazyMotion, domAnimation, useScroll, motion } from "framer-motion";

const MotionGrid = motion(Grid);

export default function Headline() {
	const { scrollYProgress } = useScroll();
	const theme = useTheme();
	const { t } = useTranslation();
	return (
		<LazyMotion features={domAnimation}>
			<MotionGrid
				// initial={{
				// 	scale: 0.5,
				// 	opacity: 0,
				// 	x: 0,
				// 	y: -40,
				// }}
				whileInView={{ scale: 1, opacity: 1, y: 0 }}
				exit={{ scale: 0, opacity: 0, x: 0 }}
				transition={{
					delay: 0.35,
					duration: 0.25,
				}}
				whileInView={{ opacity: [0, 1] }}
				transition={{ duration: 0.5 }}
				component="div"
				container
				spacing={1}
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
					<HandWave className="text-2xl" />
					{/*<NinjaIcon width="50px" height="50px" /> */}
					<Typography
						variant="h5"
						color="accent"
						gutterBottom
						className="text-center"
					>
						{t("hero.title")}
					</Typography>

					<TitleMask />
				</Grid>
			</MotionGrid>
		</LazyMotion>
	);
}
