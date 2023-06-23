import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { mdiCancel } from "@mdi/js";
import Icon from "@mdi/react";

const ExperienceItem = ({
	title,
	place,
	date,
	last,
	first,
	controls,
	custom,
	cancelled,
	className,
}) => {
	const theme = useTheme();
	return (
		<motion.div
			className={clsx(
				"relative bg-red flex items-center",
				!first && "mt-14",
				className
			)}
			initial="initial"
			variants={{
				initial: {
					opacity: 0,
				},
			}}
			animate={controls}
			custom={custom}
		>
			{!last && (
				<div
					className="absolute h-20 top-14 w-0.5 dark:bg-white-300 bg-white-700"
					style={{ left: "0.2rem" }}
				/>
			)}
			<div className="w-2 h-2 bg-gray-700 rounded-full dark:bg-white-700" />
			<div className="ml-8 dark:text-white-700 text-black-700">
				<p className="text-base font-medium">{title}</p>
				<p className="text-base">{place}</p>
				<p className="flex items-center text-sm mt-0.5 dark:text-white-500">
					{date}
					{cancelled && (
						<Icon
							path={mdiCancel}
							title="Cancelled"
							className="ml-1"
							color={theme.palette.text.disabled}
							size={1}
						/>
					)}
				</p>
			</div>
		</motion.div>
	);
};
export default ExperienceItem;
