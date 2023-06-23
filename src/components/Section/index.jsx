import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";

import SectionHeader from "./SectionHeader";

const Section = (props) => {
	const { title, description, className, children } = props;
	const controls = useAnimation();

	useEffect(() => {
		controls.start("visible");
	}, []);

	return (
		<motion.div
			className={className}
			animate={controls}
			initial="hidden"
			variants={{
				hidden: {
					y: 30,
					opacity: 0,
				},
				visible: {
					y: 0,
					opacity: 1,
				},
			}}
			transition={{
				delay: 0.4,
				duration: 0.5,
				damping: 5,
				mass: 1,
			}}
		>
			<SectionHeader title={title} description={description} />
			{children}
		</motion.div>
	);
};
export default Section;
