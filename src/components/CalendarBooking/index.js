import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useTranslation } from "next-export-i18n";
import { InlineWidget, PopupWidget } from "react-calendly";
import { Fab, Zoom } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { useEffect, useRef, useState, useMemo } from "react";

function useIsInViewport(ref) {
	const [isIntersecting, setIsIntersecting] = useState(false);

	const observer = useMemo(
		() =>
			new IntersectionObserver(([entry]) =>
				setIsIntersecting(entry.isIntersecting)
			),
		[]
	);

	useEffect(() => {
		observer.observe(ref.current);

		return () => {
			observer.disconnect();
		};
	}, [ref, observer]);

	return isIntersecting;
}
const CalendarBooking = () => {
    const theme = useTheme();
    const { t } = useTranslation();
	const ref = useRef();
	const isInViewport = useIsInViewport(ref);
	const transitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen,
	};
	const [showButton, setShowButton] = useState(true);

	const handleOnFabClick = () => {
		ref.current?.scrollIntoView?.({ behavior: "smooth", block: "end", inline: "nearest" });
	}

	const handleOnScroll = (e) => {
		// console.log(
		// 	"window.scrollY",
		// 	window.scrollY,
		// 	"ref.current?.offsetTop",
		// 	ref.current
		// );
	};

	useEffect(() => {
		window.addEventListener("scroll", handleOnScroll);

		return () => {
			window.removeEventListener("scroll", handleOnScroll);
		};
	}, [])


	return (
		<Box className={"relative z-50"} id="schedule-a-meet" ref={ref}>
			<Box className="text-black-900 dark:text-white-900">
				<Grid container>
					<Grid
						item
						xs={12}
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography>{t("schedule.title")}</Typography>
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
								height: 800,
							}}
							backgroundColor={theme.palette.primary.main}
						/>
					</Grid>
				</Grid>
				<Zoom
					in={!isInViewport}
					timeout={transitionDuration}
					style={{
						transitionDelay: `${
							!isInViewport ? transitionDuration.exit : 0
						}ms`,
					}}
					unmountOnExit
				>
					<Fab
						variant="extended"
						color="primary"
						className="fixed bottom-8 right-8"
						onClick={handleOnFabClick}
						size="medium"
						sx={{
							backgroundColor: `${theme.palette.primary.main} !important`,
						}}
					>
						<EventIcon fontSize="inherit" sx={{ mr: 1 }} />
						{t("schedule.title")}
					</Fab>
				</Zoom>
			</Box>
		</Box>
	);
};
export default CalendarBooking;
