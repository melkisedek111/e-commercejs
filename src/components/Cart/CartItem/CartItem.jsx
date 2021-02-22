import React from "react";
import {
	Typography,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
} from "@material-ui/core";
import useStyles from "./styles";
const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
	const classes = useStyles();
	return (
		<Card>
			<CardMedia
				image={item.media.source}
				alt={item.name}
				className={classes.media}
			/>
			<CardContent className={classes.cardContent}>
				<Typography variant="subtitle1">{item.name}</Typography>
				<Typography variant="h5">
					{item.line_total.formatted_with_symbol}
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<div className={classes.buttons}>
					<Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity - 1, {show: true, message: `1 PCS ${item.name.toUpperCase()} has been removed to cart`, severity: "error"})}>
						-
					</Button>
					<Typography>{item.quantity}</Typography>
					<Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity + 1, {show: true, message: `1 PCS ${item.name.toUpperCase()} has been added to cart`, severity: "success"})}>
						+
					</Button>
				</div>
				<Button variant="contained" type="button" color="secondary" onClick={() => onRemoveFromCart(item.id, {show: true, message: `${item.name.toUpperCase()} has been removed to cart`, severity: "success"})}>
					Remove
				</Button>
			</CardActions>
		</Card>
	);
};

export default CartItem;
