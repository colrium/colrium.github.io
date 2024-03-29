import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import { useTranslation } from "next-export-i18n";

const MotionGrid = motion(Grid);

export default function SummarySection() {
	const { t } = useTranslation();
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
					{t("meta.description")}
				</Typography>
			</MotionGrid>
		</LazyMotion>
	);
}
