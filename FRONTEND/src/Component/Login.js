import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
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
import Context from "../Context/Context";
import { TASK_DETAILS } from "../Context/action.type";

const Login = () => {
	const { dispatchDetails } = useContext(Context);
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
			marginTop: theme.spacing(1),
		},
		submit: {
			margin: theme.spacing(3, 0, 2),
		},
	}));

	const classes = useStyles();
	const history = useHistory();

	const [userDetails, setUserDetails] = useState({
		email: "",
		password: "",
	});

	const handelChange = (e) => {
		setUserDetails({
			...userDetails,
			[e.target.id]: e.target.value,
		});
	};

	const onLogIn = (e) => {
		e.preventDefault();
		Instance.post("/api-user-login", {
			email: userDetails.email,
			password: userDetails.password,
		})
			.then(({ data }) => {
				console.log("save", data);
				sessionStorage.setItem("token$", data?.data?.token);
				dispatchDetails({
					type: TASK_DETAILS,
					payload: { data },
				});
				history.push("/menu");
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
						Sign in
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
							value={userDetails.email}
							onChange={handelChange}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							value={userDetails.password}
							onChange={handelChange}
						/>

						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							onClick={(e) => onLogIn(e)}
							className={classes.submit}>
							Sign In
						</Button>
						<Grid container>
							<Grid item>
								<Link href='/singUp' variant='body2'>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>
		</>
	);
};

export default Login;
