import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const HandWave = ({ className }) => {
	const [toRotated, setToRotated] = useState(false);

	useEffect(() => {
		const baseDelay = 3000;

		const timers = new Array(2)
			.fill(0)
			.map((_, i) =>
				setTimeout(() => setToRotated(i % 2 === 0), baseDelay + i * 100)
			);

		return () => timers.forEach((id) => clearTimeout(id));
	}, []);

	return (
		<motion.span
			className={clsx("block ml-3", className)}
			aria-hidden="true"
			role="img"
			variants={{
				initial: {
					rotate: -40,
				},
				rotated: {
					rotate: -60,
				},
			}}
			transition={{
				type: "spring",
				damping: 4,
				mass: 0.3,
				yoyo: Infinity,
				repeat: Infinity,
			}}
			initial="initial"
			animate={toRotated ? "rotated" : "initial"}
		>
			✋
		</motion.span>
	);
};
export default HandWave;
