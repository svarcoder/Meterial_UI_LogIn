import React from "react";
import { Route, Switch } from "react-router";
import Login from "../Component/Login";
import Menu from "../Component/Menu";
import SingUp from "../Component/SingUp";

const HomeRoute = () => {
	return (
		<>
			<Switch>
				<Route exact path='/' component={Login}></Route>
				<Route exact path='/menu' component={Menu}></Route>
				<Route exact path='/singUp' component={SingUp}></Route>
			</Switch>
		</>
	);
};

export default HomeRoute;
