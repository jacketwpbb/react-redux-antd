import React from "react";
import "./ChampionStats.css";

import { Row, Col } from "antd";

import { Link } from "react-router-dom";
import { mapKey } from "../../util/index.js";

import championJson from "../../lolJSON/champion.json";

const keys = mapKey(championJson.data, "key");

const ChampionStats = ({ matchList }) => {
	// console.log(matchList)

	const heroSatus = {};
	matchList.forEach(({ ChampionId, Game_W }) => {
		if (!heroSatus[ChampionId]) {
			heroSatus[ChampionId] = {};

			heroSatus[ChampionId].championId = ChampionId;
			heroSatus[ChampionId].count = 1;

			heroSatus[ChampionId].win = Game_W ? 1 : 0;
		} else {
			heroSatus[ChampionId].count++;
			if (Game_W) {
				heroSatus[ChampionId].win++;
			}
		}
	});

	const heroArr = [];
	for (let key in heroSatus) {
		heroSatus[key].winRate = heroSatus[key].win / heroSatus[key].count;
		heroArr.push(heroSatus[key]);
	}

	const winrateArr = [...heroArr],
		countArr = [...heroArr];

	winrateArr.sort((pre, next) => {
		if (next.winRate === pre.winRate) {
			return next.count - pre.count;
		}

		return next.winRate - pre.winRate;
	});
	countArr.sort((pre, next) => {
		return next.count - pre.count;
	});

	if (!matchList || matchList.length === 0) {
		return <div className="championStats no-stats">暂无数据</div>;
	}

	return (
		<div className="championStats">
			<Row type="flex" justify="center">
				<Col xs={24} md={8}>
					<div className="championStats-title">胜率最高</div>

					<ul className="championBox">
						{winrateArr
							.slice(0, 3)
							.map(({ championId, winRate, count }) => (
								<li className="championItem" key={championId}>
									<div className="champion-icon">
										<Link
											to={`/champions/${
												keys[championId]
											}`}
										>
											<img
												src={`//ossweb-img.qq.com/images/lol/img/champion/${
													keys[championId]
												}.png`}
												alt="championId"
											/>
										</Link>
									</div>
									<div className="champion-des">
										{`${count}场${(winRate * 100).toFixed(
											1
										)}%`}
									</div>
								</li>
							))}
					</ul>
				</Col>

				<Col xs={24} md={8}>
					<div className="championStats-title">胜率最低</div>

					<ul className="championBox">
						{winrateArr
							.reverse()
							.sort((pre, next) => {
								return pre.winRate === next.winRate
									? next.count - pre.count
									: pre.winRate - next.winRate;
							})
							.slice(0, 3)
							.map(({ championId, winRate, count }) => (
								<li className="championItem" key={championId}>
									<div className="champion-icon">
										<Link
											to={`/champions/${
												keys[championId]
											}`}
										>
											<img
												src={`//ossweb-img.qq.com/images/lol/img/champion/${
													keys[championId]
												}.png`}
												alt="championId"
											/>
										</Link>
									</div>
									<div className="champion-des">
										{`${count}场${(winRate * 100).toFixed(
											1
										)}%`}
									</div>
								</li>
							))}
					</ul>
				</Col>
				<Col xs={24} md={8}>
					<div className="championStats-title">登场最多</div>

					<ul className="championBox">
						{countArr
							.slice(0, 3)
							.map(({ championId, winRate, count }) => (
								<li className="championItem" key={championId}>
									<div className="champion-icon">
										<Link
											to={`/champions/${
												keys[championId]
											}`}
										>
											<img
												src={`//ossweb-img.qq.com/images/lol/img/champion/${
													keys[championId]
												}.png`}
												alt="championId"
											/>
										</Link>
									</div>
									<div className="champion-des">
										{`${count}/${matchList.length}场`}
									</div>
								</li>
							))}
					</ul>
				</Col>
			</Row>
		</div>
	);
};

export default ChampionStats;
