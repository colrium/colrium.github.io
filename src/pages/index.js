import Head from "next/head";
import Grid from "@mui/material/Grid";
import SummarySection from "@app/sections/Summary";
import ProficienciesSection from "@app/sections/Proficiencies";
import RepositoriesSection from "@app/sections/Repositories";
import styles from "@app/styles/Home.module.css";

const Home = (props) => {
	console.log("Home Props", props);
	return (
		<Grid
			component="div"
			container
			sx={{ padding: (theme) => theme.spacing(5) }}
		>
			<Grid item xs={12}>
				<SummarySection />
			</Grid>

			<Grid item xs={12}>
				<ProficienciesSection />
			</Grid>

			<Grid item xs={12}>
				<RepositoriesSection />
			</Grid>
		</Grid>
	);
}


export default Home;
