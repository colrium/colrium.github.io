import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { LazyMotion, domAnimation, useScroll,  motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import JavascriptRoundedIcon from "@mui/icons-material/JavascriptRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import {useSetState, useDidMount} from "@app/hooks";
import Icon from "@mdi/react";
import {
	mdiServerSecurity,
	mdiCloud,
	mdiDatabase,
	mdiApplication,
	mdiApplicationBraces,
	mdiTabletCellphone,
	mdiMonitorDashboard,
} from "@mdi/js";


const MotionBox = motion(Box);
const MotionIcon = motion(Icon);


const GithubRepos = (props) => {

	const [state, setState] = useSetState({
		repos: [],
		loading: true,
		error: null,
	});
	const theme = useTheme();
	const { scrollYProgress } = useScroll();

	useDidMount(() => {
		fetch(`https://api.github.com/users/colrium/repos`).then(res => res.json()).then(data => {
			console.log("data", data);
			setState({
				repos: data,
				loading: false,
				error: null,
			});
		}).catch(error => {
			console.log("error", error);
			setState({
				loading: false,
				error: error,
			});
		});
	});
	return (
		<LazyMotion features={domAnimation}>
			<Grid
				component="div"
				container
				spacing={1}
				sx={{ marginTop: (theme) => theme.spacing(10) }}
			>
				<Grid
					item
					xs={12}
					sx={{
						display: "flex",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<Typography
						variant="h6"
						component="span"
						color="textSecondary"
					>
						Repositories
					</Typography>
				</Grid>

				<Grid
					container
				>
					{state.repos?.length > 0 &&
						state.repos.map((repo) => (
							!repo.fork && <Grid item xs={12} md={6} xl={2} key={repo.id}>
								<MotionBox
									className="flex flex-col items-center justify-center p-8 rounded-lg m-4 h-auto md:h-56 lg:h-48 overflow-hidden"
									initial={{
										scale: 0.5,
										opacity: 0,
										x: 0,
										y: -40,
									}}
									whileInView={{ scale: 1, opacity: 1, y: 0 }}
									exit={{
										scale: 0,
										opacity: 0,
										x: 0,
										y: -40,
									}}
									transition={{
										type: "anticipate",
										duration: 0.25,
									}}
									sx={{
										backgroundColor: (theme) =>
											theme.palette.background.paper,
									}}
								>
									<Typography
										variant="body1"
										color="primary"
										className="text-center flex-1"
									>
										{repo.name}
									</Typography>
									<Typography
										variant="body2"
										className="text-center flex-1"
									>
										{repo.description}
									</Typography>
								</MotionBox>
							</Grid>
						))}
				</Grid>
			</Grid>
		</LazyMotion>
	);
}


export default GithubRepos;
