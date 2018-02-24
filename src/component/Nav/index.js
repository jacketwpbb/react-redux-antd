import React from "react";

import "./nav.css";
import { NavLink } from "react-router-dom";

const Nav = () => (
	<header>
		<div className="nav">
			<NavLink to="/home">Home</NavLink>
			<NavLink to="/players">Players</NavLink>
			<NavLink to="/champions">Champions</NavLink>
		</div>
	</header>
);

export default Nav;
