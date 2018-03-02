import React from "react";

import "./nav.css";
import { NavLink } from "react-router-dom";

const Nav = () => (
	<header>
		<div className="nav">
			<NavLink to="/home">每周排行</NavLink>
			<NavLink to="/players">选手库</NavLink>
			<NavLink to="/champions">英雄库</NavLink>
		</div>
	</header>
);

export default Nav;
