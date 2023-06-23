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
import { useTranslation } from "next-export-i18n";
import { email, socialMedias } from "@app/config";
import { LazyMotion, domAnimation, useScroll, motion } from "framer-motion";

const MotionGrid = motion(Grid);
export default function PrimaryContacts() {
	const { scrollYProgress } = useScroll();
	const theme = useTheme();
	const { t } = useTranslation();
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
				<Grid
					item
					xs={12}
					className="text-center flex  flex-col mt-8 items-center justify-center "
				>
					<Typography
						variant="h5"
						color="textSecondary"
						className="mb-4"
					>
						{t("sections.contact.title")}
					</Typography>

					<Typography variant="body2">
						{t("sections.contact.description")}
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					className="text-center flex  flex-col lg:flex-row mt-8 items-center justify-center "
				>
					<Link
						component={Button}
						className="lowercase px-8 mx-4 mb-8 rounded-full backlight "
						variant="text"
						href="mailto:colrium@gmail.com"
						sx={{
							backgroundColor: theme.palette.contrast.main,
						}}
						startIcon={
							<Icon
								path={mdiEmailVariant}
								title="Gmail"
								size={0.7}
							/>
						}
						disableRipple
					>
						colrium@gmail.com
					</Link>

					<Link
						component={Button}
						className="lowercase px-8 mx-4 mb-8 rounded-full"
						variant="text"
						href="tel:+254724146857"
						sx={{
							backgroundColor: theme.palette.contrast.main,
						}}
						startIcon={
							<Icon path={mdiPhone} title="Phone" size={0.7} />
						}
					>
						+254 724 146 857
					</Link>
				</Grid>
			</MotionGrid>
		</LazyMotion>
	);
}
