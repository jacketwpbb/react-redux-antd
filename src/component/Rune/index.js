import React from "react";

import LOLPopover from "../LOLPopover/index.js";
import { removeTags } from "../../util/index.js";

import "./Rune.css";

const Rune = ({ runeList, runeJson, version }) => {
	const runeMap = {};
	const runePathMap = {
		巫术: "SORCERY",
		精密: "PRECISION",
		坚决: "RESOLVE",
		启迪: "INSPIRATION",
		主宰: "DOMINATION"
	};

	runeJson.forEach(({ slots, name }) => {
		slots.forEach(({ runes }) => {
			runes.forEach(rune => {
				runeMap[rune.id] = {
					...rune,
					tree: runePathMap[name],
					treeName: name
				};
			});
		});
	});

	const runes = runeList.map(({ runes_id_ }, idx) => {
		//如果符文不存在
		if (!runeMap[runes_id_]) {
			return (
				<LOLPopover
					title={`此符文在当前版本(${version})已经移除`}
					key={runes_id_}
				>
					<div
						className={`rune-image  ${idx === 0 ? "keyStone" : ""}`}
					>
						<img
							src={`//lol.qq.com/act/a20170926preseason/img/runeBuilder/runes/108x108/${runes_id_}.png`}
							alt={runes_id_}
						/>
						<span>{"暂无数据"}</span>
					</div>
				</LOLPopover>
			);
		}
		const treeName = runeMap[runes_id_].tree;
		return (
			<LOLPopover
				content={removeTags(runeMap[runes_id_].shortDesc).replace(
					/@.+@/,
					"X"
				)}
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
						src={`//lol.qq.com/act/a20170926preseason/img/runeBuilder/runes/108x108/${runes_id_}.png`}
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
			className={`rune-image ${runeMap[runeList[0].runes_id_].tree}`}
			key="aa"
		>
			<img
				src={`//lpl.qq.com/es/preseason/img/runeBuilder/runes/${runeMap[
					runeList[0].runes_id_
				].tree.toLowerCase()}/icon-${runeMap[runeList[0].runes_id_].tree
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
			className={`rune-image ${runeMap[runeList[4].runes_id_].tree}`}
			key="bb"
		>
			<img
				src={`//lpl.qq.com/es/preseason/img/runeBuilder/runes/${runeMap[
					runeList[4].runes_id_
				].tree.toLowerCase()}/icon-${runeMap[runeList[4].runes_id_].tree
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
