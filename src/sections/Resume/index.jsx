import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Link from "@app/components/Link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { LazyMotion, domAnimation, useScroll, motion } from "framer-motion";
import { useTranslation } from "next-export-i18n";
const MotionGrid = motion(Grid);

export default function ResumeSection() {
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
				className="p-4 flex flex-col items-center"
				container
				spacing={1}
			>
				<Link
					className="p-2 rounded-full w-64 text-center uppercase"
					target="_blank"
    				rel="noopener noreferrer"
					sx={{
						color: theme.palette.background.paper,
						background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
						backgroundSize: "400%",
						animation: "glow 15s linear infinite"
					}}
					href={"/docs/cv.pdf"}
				>
					{t("resume.title")}
				</Link>
			</MotionGrid>
		</LazyMotion>
	);
}
