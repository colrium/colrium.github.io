import Head from "next/head";
import Grid from "@mui/material/Grid";
import Headline from "@app/sections/Headline";
import PrimaryContacts from "@app/sections/PrimaryContacts";
import SocialIcons from "@app/sections/SocialIcons";
import Summary from "@app/sections/Summary";
import ExperienceSection from "@app/sections/Experience";
import ProficienciesSection from "@app/sections/Proficiencies";
import RepositoriesSection from "@app/sections/Repositories";
import styles from "@app/styles/Home.module.css";
import { CalendarBooking } from "@app/components";

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
