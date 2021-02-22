import React from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Badge,
	MenuItem,
	Menu,
	Typography,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "@material-ui/icons";
import Logo from "../../assets/shop.svg";
import useStyles from "./styles";
const Navbar = ({ totalItems }) => {
	const classes = useStyles();
	const location = useLocation();
	return (
		<>
			<AppBar position="fixed" className={classes.appBar} color="inherit">
				<Toolbar>
					<Typography variant="h6" className={classes.title} color="inherit">
						<Link to="/" style={{ textDecoration: "none", color: "black" }}>
							<img
								src={Logo}
								alt="commerce.js"
								height="25px"
								className={classes.image}
							/>
							LOFTI E-Commerce
						</Link>
					</Typography>
					<div className={classes.grow} />
					{location.pathname === "/" && (
						<div className={classes.button}>
							<Link
								to="/cart"
								style={{
									textDecoration: "none",
									color: "black",
								}}
							>
								<IconButton aria-label="Show cart items" color="inherit">
									<Badge badgeContent={totalItems} color="secondary">
										<ShoppingCart />
									</Badge>
								</IconButton>
							</Link>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navbar;
