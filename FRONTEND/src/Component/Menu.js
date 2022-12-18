import React, { useContext, useEffect, useState } from "react";
import Context from "../Context/Context";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const Menu = () => {
	const { details } = useContext(Context);
	const [userDetails, setUserDetails] = useState(null);

	const useStyles = makeStyles({
		root: {
			maxWidth: 345,
			boxShadow: "0px 20px 20px rgba(0, 0, 0, 0.2)",
		},
		media: {
			height: 140,
		},
	});

	const classes = useStyles();
	const history = useHistory();
	useEffect(() => {
		if (!details) return;
		setUserDetails(details?.data?.data?.user);
	}, [details]);

	const HandleLogout = () => {
		localStorage.removeItem("token$");
		return history.push("/");
	};

	return (
		<>
			<div className='middle'>
				<Card className={classes.root}>
					<CardActionArea>
						<CardMedia
							className={classes.media}
							image={`http://localhost:5005/Images/${userDetails?.profileImage}`}
							title='Contemplative Reptile'
						/>
						<CardContent>
							<Typography gutterBottom variant='h5' component='h2'>
								{userDetails?.firstName}
							</Typography>
							<Typography gutterBottom variant='h5' component='h2'>
								{userDetails?.lastName}
							</Typography>
							<Typography gutterBottom variant='h5' component='h2'>
								{userDetails?.email}
							</Typography>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								onClick={(e) => HandleLogout(e)}
								className={classes.submit}>
								LogOut
							</Button>
						</CardContent>
					</CardActionArea>
				</Card>
			</div>
		</>
	);
};

export default Menu;
