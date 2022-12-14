import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
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
	mdiPhone,
} from "@mdi/js";
import Icon from "@mdi/react";
import { email, socialMedias } from "@app/config";
import { LazyMotion, domAnimation, useScroll, motion } from "framer-motion";

const MotionGrid = motion(Grid);

export default function SummarySection() {
	const { scrollYProgress } = useScroll();
	const theme = useTheme();
	return (
		<LazyMotion features={domAnimation}>
			<MotionGrid
				initial={{
					scale: 0.5,
					opacity: 0,
					x: 0,
					y: -40,
				}}
				whileInView={{ scale: 1, opacity: 1, y: 0 }}
				exit={{ scale: 0, opacity: 0, x: 0, y: -40 }}
				transition={{
					type: "spring",
					damping: 30,
					mass: 0.75,
					stiffness: 400,
					delay: 0.03,
					duration: 0.25,
				}}
				component="div"
				className="flex flex-col items-center"
				container
				spacing={1}
			>
				<Typography
					variant="body1"
					gutterBottom
					className="text-center  max-w-max lg:w-6/12"
				>
					Passionate Developer with 6+ years of experience in design,
					development, testing, deployment and maintenance of software
					systems. Equipped with a diverse and up-to-date skill-set.
					Proficient in various platforms, languages, and embedded
					systems. Experienced with the latest development tools,
					paradigms and technologies. Able to effectively produce
					solutions for complex problems independently, as well as
					collaborate as part ofa productive team.
				</Typography>
			</MotionGrid>
		</LazyMotion>
	);
}
