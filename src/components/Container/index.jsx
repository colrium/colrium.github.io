import clsx from "clsx";
import React from "react";

const Container = ({ className, children }) => {
	return (
		<div className={clsx("px-4 mx-auto max-w-screen-md", className)}>
			{children}
		</div>
	);
};
export default Container;
