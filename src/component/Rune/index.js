import React from "react";
import runeJson from "../../lolJSON/runes.json";

import LOLPopover from "../LOLPopover/index.js";

import "./Rune.css";

const Rune = ({ runeList }) => {
	const runeMap = {};
	const treeNameMap = {
		坚决: 4,
		巫术: 3,
		启迪: 5,
		精密: 1,
		主宰: 2
	};
	runeJson.styles.forEach(({ slots, name }) => {
		slots.forEach(({ runes }) => {
			runes.forEach(rune => {
				runeMap[rune.runeId] = {
					...rune,
					tree: treeNameMap[name],
					treeName: name
				};
			});
		});
	});
	function getTreeClassName(tree) {
		switch (tree) {
			case 1:
				return "PRECISION";
			case 2:
				return "DOMINATION";
			case 3:
				return "SORCERY";
			case 4:
				return "RESOLVE";
			case 5:
				return "INSPIRATION";
			default:
				return "";
		}
	}

	const runes = runeList.map(({ runes_id_ }, idx) => {
		const treeName = getTreeClassName(runeMap[runes_id_].tree);
		return (
			<LOLPopover
				content={runeMap[runes_id_].shortDescription}
				title={runeMap[runes_id_].name}
				className={{ title: treeName }}
				key={runes_id_}
			>
				<div
					className={`rune-image ${treeName} ${
						idx === 0 ? "keyStone" : ""
					}`}
				>
					<img
						src={`http://lol.qq.com/act/a20170926preseason/img/runeBuilder/runes/108x108/${
							runes_id_
						}.png`}
						alt={runes_id_}
					/>
					<span>{runeMap[runes_id_].name}</span>
				</div>
			</LOLPopover>
		);
	});
	const rune1 = [],
		rune2 = [];

	rune1.push(
		<li
			className={`rune-image ${getTreeClassName(
				runeMap[runeList[0].runes_id_].tree
			)}`}
			key="aa"
		>
			<img
				src={`http://lpl.qq.com/es/preseason/img/runeBuilder/runes/${getTreeClassName(
					runeMap[runeList[0].runes_id_].tree
				).toLowerCase()}/icon-${getTreeClassName(
					runeMap[runeList[0].runes_id_].tree
				)
					.toLowerCase()
					.slice(0, 1)}-36x36.png`}
				alt=""
			/>
			<span>{runeMap[runeList[0].runes_id_].treeName}</span>
		</li>
	);
	rune1.push(runes.slice(0, 4));
	rune2.push(
		<li
			className={`rune-image ${getTreeClassName(
				runeMap[runeList[4].runes_id_].tree
			)}`}
			key="bb"
		>
			<img
				src={`http://lpl.qq.com/es/preseason/img/runeBuilder/runes/${getTreeClassName(
					runeMap[runeList[4].runes_id_].tree
				).toLowerCase()}/icon-${getTreeClassName(
					runeMap[runeList[4].runes_id_].tree
				)
					.toLowerCase()
					.slice(0, 1)}-36x36.png`}
				alt=""
			/>
			<span>{runeMap[runeList[4].runes_id_].treeName}</span>
		</li>
	);
	rune2.push(runes.slice(4));
	return (
		<div className="runeList">
			<div className="items-box">{rune1}</div>
			<div className="items-box">{rune2}</div>
		</div>
	);
};

export default Rune;
