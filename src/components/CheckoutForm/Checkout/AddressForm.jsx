import React, { useEffect, useState } from "react";
import {
	InputLabel,
	Select,
	MenuItem,
	Button,
	Grid,
	Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import { commerce } from "../../../lib/commerce";
import { Link } from "react-router-dom";
const AddressForm = ({ checkoutToken, next }) => {
	const [shippingCountries, setShippingCountries] = useState([]);
	const [shippingCountry, setShippingCountry] = useState("");
	const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
	const [shippingSubdivision, setShippingSubdivision] = useState("");
	const [shippingOptions, setShippingOptions] = useState([]);
	const [shippingOption, setShippingOption] = useState("");

	const methods = useForm();
	const countries = Object.entries(shippingCountries).map(([code, name]) => ({
		id: code,
		label: name,
	}));
	const subdivisions = Object.entries(
		shippingSubdivisions
	).map(([code, name]) => ({ id: code, label: name }));
	const options = shippingOptions.map((sO) => ({
		id: sO.id,
		label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
	}));

	const fetchSubdivisions = async (countryCode) => {
		const { subdivisions } = await commerce.services.localeListSubdivisions(
			countryCode
		);
		setShippingSubdivisions(subdivisions);
		setShippingSubdivision(Object.keys(subdivisions)[0]);
	};

	const fetchShippingCountries = async (checkoutTokenId) => {
		const { countries } = await commerce.services.localeListShippingCountries(
			checkoutTokenId
		);

		setShippingCountries(countries);
		setShippingCountry(Object.keys(countries)[0]);
	};

	const fetchShippingOptions = async (
		checkoutTokenId,
		country,
		region = null
	) => {
		const options = await commerce.checkout.getShippingOptions(
			checkoutTokenId,
			{ country, region }
		);
		setShippingOptions(options);
		setShippingOption(options[0]?.id);
	};

	useEffect(() => {
		fetchShippingCountries(checkoutToken.id);
	}, []);

	useEffect(() => {
		setShippingSubdivisions("");
		setShippingSubdivision([]);
		if (shippingCountry) fetchSubdivisions(shippingCountry);
	}, [shippingCountry]);

	useEffect(() => {
		setShippingOption("");
		setShippingOptions([]);
		if (shippingSubdivision)
			fetchShippingOptions(
				checkoutToken.id,
				shippingCountry,
				shippingSubdivision
			);
	}, [shippingSubdivision]);
	return (
		<>
			<Typography variant="h6" gutterBottom>
				Shipping Address
			</Typography>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit((data) =>
						next({
							...data,
							shippingCountry,
							shippingSubdivision,
							shippingOption,
						})
					)}
				>
					<Grid container spacing={3}>
						<CustomTextField required name="firstName" label="First Name" />
						<CustomTextField required name="lastName" label="Last Name" />
						<CustomTextField required name="address1" label="Address" />
						<CustomTextField required name="email" label="Email" />
						<CustomTextField required name="city" label="City" />
						<CustomTextField
							required
							name="zip"
							label="ZIP Code / Postal Code"
						/>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select
								value={shippingCountry}
								fullWidth
								onChange={(e) => setShippingCountry(e.target.value)}
							>
								{countries.map(({ id, label }) => (
									<MenuItem key={id} value={id}>
										{label}
									</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Subdivision</InputLabel>
							<Select
								value={shippingSubdivision}
								fullWidth
								onChange={(e) => setShippingSubdivision(e.target.value)}
							>
								{subdivisions.map(({ id, label }) => (
									<MenuItem key={id} value={id}>
										{label}
									</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select
								value={shippingOption}
								fullWidth
								onChange={(e) => setShippingOptions(e.target.value)}
							>
								{options.map(({ id, label }) => (
									<MenuItem key={id} value={id}>
										{label}
									</MenuItem>
								))}
							</Select>
						</Grid>
					</Grid>
					<br />
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<Button variant="outlined" component={Link} to="/cart">
							Back to Cart
						</Button>
						<Button variant="contained" type="submit" color="primary">
							Next
						</Button>
					</div>
				</form>
			</FormProvider>
		</>
	);
};

export default AddressForm;
