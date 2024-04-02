import CircularParticles from "@app/components/CircularParticles";
import Devices from "@app/components/Devices";
import Link from "@app/components/Link";
import { contacts } from "@app/config";
import {
	mdiEmailVariant,
	mdiPhone
} from "@mdi/js";
import Icon from "@mdi/react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { LazyMotion, domAnimation, motion, useScroll } from "framer-motion";
import { useTranslation } from "next-export-i18n";

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
					y: -40
				}}
				whileInView={{ scale: 1, opacity: 1, y: 0 }}
				exit={{ scale: 0, opacity: 0, x: 0, y: -40 }}
				transition={{
					type: 'spring',
					damping: 30,
					mass: 0.75,
					stiffness: 400,
					delay: 0.03,
					duration: 0.25
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
						{t('contact.title')}
					</Typography>

					<Typography variant="body2">{t('contact.description')}</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					className="text-center flex  flex-col lg:flex-row mt-8 items-center justify-center "
					sx={{
						'& .contact-btn': {
							backgroundColor: alpha(theme.palette.primary.main, 0.05),
							'&:hover': {
								backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
							}
						}
					}}
				>
					<Link
						component={Button}
						className="lowercase px-8 mx-4 mb-8 rounded-full backlight contact-btn"
						variant="text"
						href={`mailto:${contacts.email}`}
						startIcon={
							<Icon
								path={mdiEmailVariant}
								title="Gmail"
								size={0.7}
							/>
						}
						disableRipple
					>
						{contacts.email}
					</Link>

					<Link
						component={Button}
						className="lowercase px-8 mx-4 mb-8 rounded-full contact-btn"
						variant="text"
						href={`tel:${contacts.phone}`}
						startIcon={
							<Icon
								path={mdiPhone}
								title="Phone"
								size={0.7}
							/>
						}
					>
						{contacts.phone}
					</Link>
				</Grid>
				
			</MotionGrid>
		</LazyMotion>
	);
}
