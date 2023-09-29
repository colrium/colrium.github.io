import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useTranslation } from "next-export-i18n";
import { InlineWidget } from "react-calendly";
const CalendarBooking = () => {
    const theme = useTheme();
    const { t } = useTranslation();

	return (
		<Box className={"relative z-50"}>
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
								height: "1000px",
							}}
							backgroundColor={theme.palette.primary.main}
						/>
					</Grid>
				</Grid>

				{/* <Box
					className="calendly-inline-widget"
					data-url="https://calendly.com/colrium/30min"
					style={{ minWidth: "320px", height: "580px" }}
				/> */}
			</Box>
		</Box>
	);
};
export default CalendarBooking;
