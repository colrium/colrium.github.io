import React from "react";

const Footer = () => {
	return (
		<div className={clsx("px-4 mx-auto max-w-screen-md", className)}>
			<p className="py-8 text-sm font-light text-center dark:text-white-700 text-black-700">
				<a
					href="https://github.com/colrium"
					target="_blank"
					className="hover:opacity-80 transition-opacity"
					rel="noreferrer"
				>
					Designed & Crafted by Colrium © 2022
				</a>
			</p>
		</div>
	);
};
export default Footer;
