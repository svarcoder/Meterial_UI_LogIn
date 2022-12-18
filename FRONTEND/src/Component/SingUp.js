import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Instance from "../Instance";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const SingUp = () => {
	const Copyright = () => {
		return (
			<Typography variant='body2' color='textSecondary' align='center'>
				{"Copyright © "}
				<Link color='inherit' href='https://material-ui.com/'>
					Your Website
				</Link>{" "}
				{new Date().getFullYear()}
				{"."}
			</Typography>
		);
	};

	const useStyles = makeStyles((theme) => ({
		paper: {
			marginTop: theme.spacing(8),
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
		avatar: {
			margin: theme.spacing(1),
			backgroundColor: theme.palette.secondary.main,
		},
		form: {
			width: "100%", // Fix IE 11 issue.
			marginTop: theme.spacing(3),
		},
		submit: {
			margin: theme.spacing(3, 0, 2),
		},
	}));
	const classes = useStyles();
	const history = useHistory();

	const [userDetails, setUserDetails] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		image: null,
	});

	const handelChange = (e) => {
		if (e.target.id === "photo") {
			let file = e.target.files[0];
			setUserDetails((prevState) => {
				return {
					...prevState,
					image: file,
				};
			});
		} else {
			setUserDetails({
				...userDetails,
				[e.target.id]: e.target.value,
			});
		}
	};

	const onSubmitSignIn = (e) => {
		e.preventDefault();
		let data = new FormData();

		data.append("profileImage", userDetails.image);
		data.append("firstName", userDetails.firstName);
		data.append("lastName", userDetails.lastName);
		data.append("email", userDetails.email);
		data.append("password", userDetails.password);
		data.append("confirmPassword", userDetails.confirmPassword);

		Instance.post("/api-user-singup", data)
			.then(({ data }) => {
				console.log("save", data);
				history.push("/");
			})
			.catch((err) => {
				console.log("Err", err?.response?.data?.messege);
			});
	};

	return (
		<>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign up
					</Typography>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete='fname'
									name='firstName'
									variant='outlined'
									required
									fullWidth
									id='firstName'
									value={userDetails.firstName}
									onChange={handelChange}
									label='First Name'
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant='outlined'
									required
									fullWidth
									id='lastName'
									value={userDetails.lastName}
									onChange={handelChange}
									label='Last Name'
									name='lastName'
									autoComplete='lname'
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant='outlined'
									required
									fullWidth
									id='email'
									value={userDetails.email}
									onChange={handelChange}
									label='Email Address'
									name='email'
									autoComplete='email'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant='outlined'
									required
									fullWidth
									name='password'
									label='Password'
									type='password'
									id='password'
									value={userDetails.password}
									onChange={handelChange}
									autoComplete='current-password'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant='outlined'
									required
									fullWidth
									name='password'
									label='Confirm Password'
									type='password'
									id='confirmPassword'
									value={userDetails.confirmPassword}
									onChange={handelChange}
									autoComplete='current-password'
								/>
							</Grid>
							<Grid item xs={12}>
								<Button variant='contained' component='label'>
									Upload Profile Pic
									<input
										type='file'
										hidden
										id='photo'
										onChange={handelChange}
									/>
								</Button>
							</Grid>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							onClick={(e) => onSubmitSignIn(e)}
							className={classes.submit}>
							Sign Up
						</Button>
						<Grid container justifyContent='flex-end'>
							<Grid item>
								<Link href='/' variant='body2'>
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={5}>
					<Copyright />
				</Box>
			</Container>
		</>
	);
};

export default SingUp;
