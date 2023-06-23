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

export default function SocialIconsSection() {
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
				container
				spacing={1}
			>
				{socialMedias?.length > 0 && (
					<Grid
						item
						xs={12}
						className="text-center flex flex-row flex-wrap items-center justify-center "
					>
						{socialMedias.map((socialMedia) => (
							<Link
								component={IconButton}
								className="m-4"
								href={socialMedia.url}
								sx={{
									"&.MuiIconButton-root": {
										color: theme.palette.text.secondary,
										fill: theme.palette.text.secondary,
									},
								}}
								key={socialMedia.name}
							>
								<Icon
									path={socialMedia.mdiIcon}
									title={socialMedia.name}
									color={socialMedia.color}
									size={1}
								/>
							</Link>
						))}
					</Grid>
				)}
			</MotionGrid>
		</LazyMotion>
	);
}
