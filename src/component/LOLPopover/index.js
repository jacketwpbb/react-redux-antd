import React from "react";
import { Popover } from "antd";
import "./LOLPopover.css";

const LOLPopover = ({ title, content, className, children }) => {
	const c = (
		<div>
			<div
				className={`text-title ${
					className && className.title ? className.title : ""
				}`}
			>
				{title}
			</div>
			<div
				className={`text-content ${
					className && className.content ? className.content : ""
				}`}
			>
				{content}
			</div>
		</div>
	);
	return (
		<Popover content={c} trigger="hover" overlayClassName="LOLPopover">
			{children}
		</Popover>
	);
};
export default LOLPopover;
