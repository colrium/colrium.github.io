import { Container, Section } from "@app/components";
import { useAnimation } from "framer-motion";
import { useTranslation } from "next-export-i18n";
import React, { useEffect, useMemo } from "react";
import { experience } from "@app/config";
import ExperienceItem from "./ExperienceItem";

const Experience = () => {
	const controls = useAnimation();
	const { t } = useTranslation();

	useEffect(() => {
		controls.start((i) => ({
			opacity: 1,
			transition: { delay: (i + 2) * 0.2 },
		}));
	}, []);

	return (
		<Section
			className="mt-20 mb-16 md:mt-28"
			title={t("experience.title")}
			description={t("experience.description")}
		>
			<Container className="mt-14">
				<div className="flex justify-between max-w-screen-sm">
					{experience.map((item, i) => (
						<ExperienceItem
							{...item}
							key={i}
							first={i === 0}
							last={i === experience.length - 1}
							controls={controls}
							custom={i}
						/>
					))}
				</div>
			</Container>
		</Section>
	);
};
export default Experience;
