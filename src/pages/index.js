import CalendarBooking from "@app/components/CalendarBooking";
import Headline from "@app/sections/Headline";
import PrimaryContacts from "@app/sections/PrimaryContacts";
import ProficienciesSection from "@app/sections/Proficiencies";
import SocialIcons from "@app/sections/SocialIcons";
import SummarySection from "@app/sections/Summary";
import Grid from "@mui/material/Grid";

const Home = (props) => {
	return (
		<Grid
			component="div"
			container
			className={"p-4 relative"}
			sx={{ padding: (theme) => theme.spacing(5) }}
		>
			{/* <Grid item xs={12} className="mb-8">
				<Headline />
			</Grid> */}

			<Grid item xs={12}>
				<SummarySection />
			</Grid>
			<Grid item xs={12}>
				<PrimaryContacts />
			</Grid>

			<Grid item xs={12}>
				<SocialIcons />
			</Grid>
			<Grid item xs={12}>
				<ProficienciesSection />
			</Grid>
			{/* <Grid item xs={12}>
				<ResumeSection />
			</Grid> */}

			<Grid item xs={12}>
				<CalendarBooking />
			</Grid>
		</Grid>
	);
};

export default Home;
