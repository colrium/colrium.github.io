import Grid from "@mui/material/Grid";

import React from "react";
import Divider from "@mui/material/Divider";

import Header from "./Header";

const Layout = React.forwardRef(({ children, sx, themeMode, onToggleThemeMode, ...rest }, ref) => {

	return (
		<Grid
			container
			sx={{
				color: (theme) => theme.palette.text.primary,
				backgroundColor: (theme) => theme.palette.background.default,
				...sx,
				flexDirection: "column",
				minHeight: "100vh",
				display: "flex",
			}}
			{...rest}
			ref={ref}
		>
			<Grid item xs={12}>
				<Header
					themeMode={themeMode}
					onToggleThemeMode={onToggleThemeMode}
				/>
			</Grid>

			<Grid item xs={12} sx={{flex: 1}} >
				<Grid container className="lg:px-16 px-4">
					{/* <Divider orientation="vertical" variant="middle" flexItem>
						VERTICAL
					</Divider> */}
					<Grid item xs>
						{children}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
});

export default React.memo(Layout);
