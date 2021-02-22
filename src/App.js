import React, { useContext, useEffect, useState } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AlertContext, AlertProvider } from "./context/alert";
import MyAlert from "./components/MyAlert/MyAlert";
const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});
	const { alert, setShowAlert } = useContext(AlertContext);
	const [order, setOrder] = useState({});
	const [errorMessage, setErrorMessage] = useState("");

	const fetchProducts = async () => {
		const { data } = await commerce.products.list();
		setProducts(data);
	};
	const fetchCart = async () => {
		setCart(await commerce.cart.retrieve());
	};
	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	const handleAddToCart = async (productId, quantity, alert) => {
		const { cart } = await commerce.cart.add(productId, quantity);
		setShowAlert(alert);
		setCart(cart);
	};

	const handleUpdateCartQuantity = async (productId, quantity, alert) => {
		const { cart } = await commerce.cart.update(productId, { quantity });
		setShowAlert(alert);
		setCart(cart);
	};

	const handleRemoveFromCart = async (productId, alert) => {
		const { cart } = await commerce.cart.remove(productId);
		setShowAlert(alert);
		setCart(cart);
	};

	const handleEmptyCart = async (alert) => {
		const { cart } = await commerce.cart.empty();
		setShowAlert(alert);
		setCart(cart);
	};

	const refreshCart = async () => {
		const newCart = await commerce.cart.refresh();
		setCart(newCart);
	};

	const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
		refreshCart();
		try {
			const incomingOrder = await commerce.checkout.capture(
				checkoutTokenId,
				newOrder
			);
			setOrder(incomingOrder);
		} catch (error) {
			setErrorMessage(error.data.error.message);
		}
	};
	return (
		<Router>
			<div>
				<Navbar totalItems={cart.total_items} />
				<div style={{ marginTop: "70px" }}>
					{alert.show && (
						<MyAlert message={alert.message} severity={alert.severity} />
					)}
				</div>
				<Switch>
					<Route exact path="/">
						<Products products={products} onAddToCart={handleAddToCart} />
					</Route>
					<Route exact path="/cart">
						<Cart
							cart={cart}
							handleUpdateCartQuantity={handleUpdateCartQuantity}
							handleRemoveFromCart={handleRemoveFromCart}
							handleEmptyCart={handleEmptyCart}
						/>
					</Route>
					<Route exact path="/checkout">
						<Checkout
							cart={cart}
							order={order}
							onCaptureCheckout={handleCaptureCheckout}
							error={errorMessage}
						/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
