import { calendly } from "@app/config";
import Icon from "@mdi/react";
import { Box, Fab, Grid, Typography, Zoom } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useTranslation } from "next-export-i18n";
import { useEffect, useMemo, useRef, useState } from "react";
import { InlineWidget } from "react-calendly";

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
		<Box className={"relative z-50 pt-8"} id="schedule-a-meet" ref={ref}>
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
						<Box className="flex items-center justify-center w-full">
							<Box spacing={1} className="flex flex-col w-3/4">
								<Box className="flex items-center justify-center">
									<Box spacing={1} className="flex flex-col">
										<Box
											spacing={1}
											className="flex flex-1 flex-col items-center justify-center"
										>
											<Typography
												variant="h5"
												color="textSecondary"
												className="mb-4"
											>
												{t("schedule.title")}
											</Typography>

											<Typography
												textAlign={"center"}
												variant="body2"
											>
												{t("schedule.description")}
											</Typography>
										</Box>
									</Box>
								</Box>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<InlineWidget
							url={calendly.url}
							pageSettings={{
								backgroundColor: theme.palette.background.paper,
								hideEventTypeDetails: false,
								hideLandingPageDetails: false,
								primaryColor: calendly.color,
								textColor: theme.palette.text.primary,
							}}
							text={t(calendly.text)}
							styles={{
								height: 1000,
							}}
							backgroundColor={calendly.color}
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
						color="accent"
						className="fixed bottom-8 right-8"
						onClick={handleOnFabClick}
						size="medium"
						sx={{
							backgroundColor: `${theme.palette.error.main} !important`,
						}}
					>
						<Icon path={calendly.icon} size={1} className="mr-2" />
						{t("schedule.meet")}
					</Fab>
				</Zoom>
			</Box>
		</Box>
	);
};
export default CalendarBooking;
