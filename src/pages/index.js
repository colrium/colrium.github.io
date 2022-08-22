import Head from "next/head";
import Grid from "@mui/material/Grid";
import SummarySection from "@app/sections/Summary";
import SkillsSection from "@app/sections/Skills";
import styles from "@app/styles/Home.module.css";

export default function Home() {
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
				<SkillsSection />
			</Grid>
		</Grid>
	);
}
