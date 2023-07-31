import Head from "next/head";
import Grid from "@mui/material/Grid";
import Headline from "@app/sections/Headline";
import PrimaryContacts from "@app/sections/PrimaryContacts";
import SocialIcons from "@app/sections/SocialIcons";
import Summary from "@app/sections/Summary";
import ExperienceSection from "@app/sections/Experience";
import SummarySection from "@app/sections/Summary";
import ResumeSection from "@app/sections/Resume";
import ProficienciesSection from "@app/sections/Proficiencies";
import RepositoriesSection from "@app/sections/Repositories";
import styles from "@app/styles/Home.module.css";
import { CalendarBooking } from "@app/components";

const Home = (props) => {
	return (
		<Grid
			component="div"
			container
			className={"p-4 relative"}
			sx={{ padding: (theme) => theme.spacing(5) }}
		>
			<Grid item xs={12}>
				<Headline />
			</Grid>

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
				<CalendarBooking />
			</Grid>
			{/* <Grid item xs={12}>
				<ProficienciesSection />
			</Grid> */}
			{/* <Grid item xs={12}>
				<RepositoriesSection />
			</Grid> */}
		</Grid>
	);
};

export default Home;
