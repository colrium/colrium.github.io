import CalendarBooking from "@app/components/CalendarBooking";
import Grid from "@mui/material/Grid";

const Calendar = (props) => {
	return (
		<Grid
			component="div"
			container
			className={"p-4 relative"}
			sx={{ padding: (theme) => theme.spacing(5) }}
		>
			<Grid item xs={12}>
				<CalendarBooking />
			</Grid>
		</Grid>
	);
};

export default Calendar;
