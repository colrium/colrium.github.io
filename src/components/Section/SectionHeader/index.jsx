import { Container } from "@app/components";
import React from "react";

const SectionHeader = (props) => {
	const { title, description, className } = props;
	return (
		<Container className={className}>
			<h2 className="mb-4 text-2xl font-bold md:text-sectionHeader dark:text-white-900 text-black-900">
				{title}
			</h2>
			<p className="text-base md:text-xl dark:text-white-700 text-black-700">
				{description}
			</p>
		</Container>
	);
};
export default SectionHeader;
