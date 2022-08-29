

import React from "react";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Header from "./Header";

const Layout = React.forwardRef(({ children, sx, themeMode, onToggleThemeMode, ...rest }, ref) => {

	return (
		<Stack
			className="relative"
			sx={{
				color: (theme) => theme.palette.text.primary,
				backgroundColor: (theme) => theme.palette.background.default,
				...sx,
			}}
			direction="column"
			{...rest}
			ref={ref}
		>
			<Header
					themeMode={themeMode}
					onToggleThemeMode={onToggleThemeMode}
				/>
				<Grid container className="lg:px-16 px-4">
					{/* <Divider orientation="vertical" variant="middle" flexItem>
						VERTICAL
					</Divider> */}
					<Grid item xs>
						{children}
					</Grid>
				</Grid>
		</Stack>
	);
});

export default React.memo(Layout);
