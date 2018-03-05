import React from "react";

import "./nav.css";
import { NavLink } from "react-router-dom";
import customPath from "../../route/routeLinkConfig.js";
const Nav = () => (
	<header>
		<div className="nav">
			<NavLink to={`${customPath}/home`}>每周排行</NavLink>
			<NavLink to={`${customPath}/players`}>选手库</NavLink>
			<NavLink to={`${customPath}/champions`}>英雄库</NavLink>
		</div>
	</header>
);

export default Nav;
