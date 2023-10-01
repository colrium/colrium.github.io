import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "next-export-i18n";

import Container from "../Container";
import NinjaIcon from "../NinjaIcon";

const textVariants = {
	initial: {
		opacity: 0,
		y: -60,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
};

const CitationOverlay = ({ citation }) => {
	const { t } = useTranslation();
	return (
		<AnimatePresence>
			<motion.div
				className="absolute flex items-center justify-center w-full h-full"
				variants={{
					initial: {
						opacity: 1,
						// height: "100%",
						y: 0,
						scale: 1,
					},
					invisible: {
						opacity: 0,
						y: -60,
						scale: 0,
					},
				}}
				transition={{
					duration: 0.1,
				}}
				initial="initial"
				animate={citation ? "initial" : "invisible"}
			>
				<Container>
					{citation && (
						<motion.div
							variants={{
								initial: {
									// opacity: 0,
									scale: 0.1,
								},
								visible: {
									// opacity: 1,
									scale: [1, 0.5, 1],
								},
							}}
							initial="initial"
							animate="visible"
							transition={{
								delay: 0.1,
								duration: 0.2,
							}}
							exit={{ opacity: 0, y: -200 }}
							className="flex flex-col items-center justify-center"
						>
							<NinjaIcon className="w-10" />
						</motion.div>
					)}
					<motion.p
						className="mt-4 mb-2 text-xl font-medium leading-none text-2xl text-black-900 my-0"
						variants={textVariants}
						initial="initial"
						animate="visible"
						transition={{
							delay: 0.1,
							duration: 0.1,
						}}
					>
						{t("citation.title")}
					</motion.p>
					<motion.p
						className="text-base text-center text-red-700"
						initial="initial"
						animate="visible"
						variants={textVariants}
						transition={{
							delay: 0,
							duration: 0.1,
						}}
					>
						{t("citation.subtitle")}
					</motion.p>
				</Container>
			</motion.div>
		</AnimatePresence>
	);
};
export default CitationOverlay;
