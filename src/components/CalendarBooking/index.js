import { useDidMount } from "@app/hooks";
import { Grid, Typography } from "@mui/icons-material";
import { useTheme } from "@mui/styles";
import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";
import { InlineWidget } from "react-calendly";
// import { useTranslation } from "next-export-i18n";
const CalendarBooking = ({ className }) => {
    const theme = useTheme();
    // const { t } = useTranslation();
    useDidMount(() => {
        const head = document.querySelector('head');
        const current = head.querySelector('#calendly-script')
        const script = document.createElement('script');
        script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
        script.setAttribute("id", "calendly-script");
        head.appendChild(script);
        console.log("current calendly-script", current);
    })
	return (
		<motion.div
			whileHover="hover"
			initial="initial"
			className={clsx("relative z-50", className)}
		>
			<motion.div
				variants={{
					initial: {
						rotate: 0,
						scale: 1,
					},
					hover: {
						// scale: 1.1,
					},
				}}
				className="text-black-900 dark:text-white-900"
			>
				<Grid container>
					<Grid item xs={12}>
						{/* <Typography>{t("sections.schedule.title")}</Typography> */}

					</Grid>
					<Grid item xs={12}>
						<InlineWidget
							url="https://calendly.com/colrium/30min"
							pageSettings={{
								backgroundColor: theme.palette.background.paper,
								hideEventTypeDetails: false,
								hideLandingPageDetails: false,
								primaryColor: theme.palette.primary.main,
								textColor: theme.palette.text.primary,
							}}
							text="Click here to schedule!"
							styles={{
								height: "1000px",
							}}
						/>
					</Grid>
				</Grid>

				{/* <Box
					className="calendly-inline-widget"
					data-url="https://calendly.com/username/15min"
					style={{ minWidth: "320px", height: "580px" }}
				/> */}
			</motion.div>
		</motion.div>
	);
};
export default CalendarBooking;
