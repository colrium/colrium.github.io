import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Link, TitleMask, HandWave, NinjaIcon } from "@app/components";
import Image from "next/image";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useTranslation } from "next-export-i18n";
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
import { useSignal, useAuto } from "@app/hooks";
import { useEffect, useRef } from "react";

const MotionGrid = motion(Grid);

export default function Headline() {
	const { scrollYProgress } = useScroll();
	const theme = useTheme();
	
	const [count, setCount] = useSignal(0);
	const startDate = new Date();
	/* const counter = useAuto(() => {
		const lowerNumber = parseInt(1);
		const higherNumber = parseInt(100);
		let numbers = [];
		
		// looping from lowerNumber to higherNumber
		for (let i = lowerNumber; i <= higherNumber; i++) {
			let flag = 0;

			// looping through 2 to user input number
			for (let j = 2; j < i; j++) {
				if (i % j == 0) {
					flag = 1;
					break;
				}
			}

			// if number greater than 1 and not divisible by other numbers
			if (i > 1 && flag == 0) {
				numbers.push(i);
			}
		}

		const endDate = new Date();
		const seconds = (endDate.getTime() - startDate.getTime());
		console.log("endDate.getTime()", endDate.getTime());
		console.log("startDate.getTime()", startDate.getTime());
		return `${
			numbers.length
		} Prime numbers found between ${lowerNumber} and ${higherNumber}. Took: ${
			new Date().getTime() - startDate.getTime()
		} ms `;
	}); */


	const rerendersRef = useRef(0)
	useEffect(() => {
		rerendersRef.current++;
	})

	useEffect(() => {
		let i = 0;
		const updateInterval = setInterval(() => {
			setCount(i);
			i++
		}, 1000);
		return () => clearInterval(updateInterval);
	}, []);
	
	const { t } = useTranslation();

	console.log('count', count)
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
				//whileInView={{ opacity: [0, 1] }}
				//transition={{ duration: 0.5 }}
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
						{t("sections.hero.title")}
					</Typography>

					<Typography variant="h5" color="accent">
						Updates
					</Typography>
					<Typography variant="h5" color="accent">
						{count}
					</Typography>
					
					<Typography variant="h5" color="accent">
						{`Rerenders ${rerendersRef.current}`}
					</Typography>

					<TitleMask />
				</Grid>
			</MotionGrid>
		</LazyMotion>
	);
}
