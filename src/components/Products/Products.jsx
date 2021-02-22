import React, { useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";
import { AlertContext } from "../../context/alert";
const Products = ({ products, onAddToCart }) => {
	const classes = useStyles();
	const {setShowAlert} = useContext(AlertContext);

    useEffect(() => {
        setShowAlert({show: false, message: '',  severity: ''});
    }, []); 
    
	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			<Grid container justify="center" spacing={4}>
				{products.map((product) => (
					<Grid item key={product.id} xs={12} md={4} large={3}>
						<Product product={product} onAddToCart={onAddToCart} />
					</Grid>
				))}
			</Grid>
		</main>
	);
};

export default Products;
