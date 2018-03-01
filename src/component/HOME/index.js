import React, { Component } from "react";

import { Row, Col } from "antd";

import "./Home.css";

import {
	data as championJson,
	version as patchVersion
} from "../../lolJSON/champion.json";

import runeJson from "../../lolJSON/runes.json";
import { mapKey, positionArr } from "../../util/index.js";

const championMap = mapKey(championJson, "key");

const runeMap = {};
const runePathMap = {
	巫术: "SORCERY",
	精密: "PRECISION",
	坚决: "RESOLVE",
	启迪: "INSPIRATION",
	主宰: "DOMINATION"
};
runeJson.styles.forEach(({ slots, name }) => {
	slots.forEach(({ runes }) => {
		runes.forEach(rune => {
			runeMap[rune.runeId] = {
				...rune,
				tree: runePathMap[name],
				treeName: name
			};
		});
	});
});

class Home extends Component {
	renderRuneList() {
		const runeArr = [
			{
				champions: [103, 12, 136],
				runeId: 8437
			},
			{
				champions: [268, 432, 53],
				runeId: 8112
			},
			{
				champions: [103, 12, 136],
				runeId: 8005
			},
			{
				champions: [103, 12, 136],
				runeId: 8229
			},
			{
				champions: [103, 12, 136],
				runeId: 8326
			}
		];

		const runeFinalArr = runeArr.map(({ runeId, champions }) => {
			const { name, tree } = runeMap[runeId];
			return {
				runeName: name,
				img: `http://lol.qq.com/act/a20170926preseason/img/runeBuilder/runes/108x108/${
					runeId
				}.png`,
				champions: champions.map(id => championMap[id]),
				background: `//static.tuwan.com/templet/lol/hd/rune_of_pro/images/${
					tree
				}.jpg`,
				runePath: tree
			};
		});

		return runeFinalArr.map(
			({ runeName, img, champions, background, runePath }) => (
				<Col xs={12} md={245} key={runeName} className="home-list-item">
					<div className="home-list-item-box">
						<div
							className="rune-path-bg"
							style={{ backgroundImage: `url(${background})` }}
						/>
						<div className="home-rune-box">
							<div
								className={`home-list-item-rune-image-box ${
									runePath
								}`}
							>
								<img
									className="home-list-item-rune-image"
									src={img}
									alt={runeName}
								/>
							</div>

							<span className="home-rune-name">{runeName}</span>
						</div>
						<div>
							<div className="home-rune-des">
								最常使用该符文的英雄：
							</div>

							<ul className="home-rune-champions">
								{champions.map(champion => (
									<li
										className="home-rune-champions"
										key={champion}
									>
										<a href="javascript:;">
											<img
												src={`http://lolstatic.tuwan.com/cdn/8.3.1/img/champion/${
													champion
												}.png`}
												alt={champion}
											/>
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</Col>
			)
		);
	}
	renderChampionList() {
		const positionMap = {};
		const championArr = [
			{
				championId: 14,
				Place: 1,
				winRate: "80%"
			},
			{
				championId: 15,
				Place: 2,
				winRate: "80%"
			},
			{
				championId: 16,
				Place: 3,
				winRate: "80%"
			},
			{
				championId: 17,
				Place: 4,
				winRate: "80%"
			},
			{
				championId: 18,
				Place: 5,
				winRate: "80%"
			}
		];

		return championArr.map(({ championId, winRate, Place }) => (
			<Col xs={12} md={245} key={championId} className="home-list-item">
				<div className="home-list-item-box home-champion-list-item-box">
					<div
						className=" home-champion-bg"
						style={{
							backgroundImage: `url(//lolstatic.tuwan.com/cdn/img/champion/loading/${
								championMap[championId]
							}_0.jpg)`
						}}
					/>
					<div className="home-rune-box">
						<svg className="home-position-icon">
							<use
								xlinkHref={`#icon-position-${
									positionArr[Place - 1].ENName
								}`}
							/>
						</svg>

						<span className="home-champion-winrate">{winRate}</span>
					</div>
					<div>
						<div className="home-rune-des">胜率</div>
						<div className="home-champion-name">
							{championJson[championMap[championId]].name}
						</div>
					</div>
				</div>
			</Col>
		));
	}
	renderPlayerList() {
		const playerWeekly = {
			TopKDA: {
				Member: {
					MemberId: 63,
					GameName: "IGRookie",
					Place: 2
				},
				BMInfo: {
					MemberId: 63,
					EnName: "SONGUIJIN",
					RealName: "宋义进",
					NickName: "Rookie",
					UserIcon:
						"http://img.crawler.qq.com/lolwebvideo/20180103230241/88d4102b83981cd52d2fa377d2f7780f/0",
					sUrl: "",
					GameName: "IGRookie",
					GamePlace: "2,",
					GameHero: "112,105,61,245,157,7,245,7,1,",
					UserStatus: "1",
					UserPhoto550:
						"http://img.crawler.qq.com/lolwebvideo/20180103230633/c54b3c1fa007af3b0701385a96f276d5/0"
				},
				Value: 12.75
			},
			TopKill: {
				Member: {
					MemberId: 1534,
					GameName: "JDGYagao",
					Place: 2
				},
				BMInfo: {
					MemberId: 1534,
					EnName: "Yagao",
					RealName: "曾奇",
					NickName: "Yagao",
					UserIcon:
						"http://img.crawler.qq.com/lolwebvideo/20180104193802/55aca5459ab7f1c28502c4ff613a6473/0",
					sUrl: "",
					GameName: "JDGYagao",
					GamePlace: "2,",
					GameHero: "",
					UserStatus: "1",
					UserPhoto550:
						"http://img.crawler.qq.com/lolwebvideo/20180104194237/5d6b33f7de25ad3d653b600c5a7756bf/0"
				},
				Value: 7.3333
			},
			TopDeath: {
				Member: {
					MemberId: 1267,
					GameName: "FPXCrisp",
					Place: 4
				},
				BMInfo: {
					MemberId: 1267,
					EnName: "Crisp",
					RealName: "刘青松",
					NickName: "Crisp",
					UserIcon:
						"http://img.crawler.qq.com/lolwebvideo/20180106091512/2b8cd07f082d53ef2052f60128e2e370/0",
					sUrl: "",
					GameName: "FPXCrisp",
					GamePlace: "4,",
					GameHero: "",
					UserStatus: "1",
					UserPhoto550:
						"http://img.crawler.qq.com/lolwebvideo/20180106091704/46b5b3bd62d9294bd2c665ef3196c815/0"
				},
				Value: 4.6667
			},
			TopWards: {
				Member: {
					MemberId: 1397,
					GameName: "FPXPepper",
					Place: 5
				},
				BMInfo: {
					MemberId: 1397,
					EnName: "Pepper",
					RealName: "胡志威",
					NickName: "Pepper",
					UserIcon:
						"http://img.crawler.qq.com/lolwebvideo/20180106091048/bfaca9a9e2eeefb1cc288e5d3a9fa2a2/0",
					sUrl: "",
					GameName: "FPXPepper",
					GamePlace: "5,",
					GameHero: "",
					UserStatus: "1",
					UserPhoto550:
						"http://img.crawler.qq.com/lolwebvideo/20180106091229/5b7eea2e09d8e0e21fe5def7c8c9e2c8/0"
				},
				Value: 2.2524067547893836
			},
			TopTeamFight: {
				Member: {
					MemberId: 291,
					GameName: "BLGRoad",
					Place: 4
				},
				BMInfo: {
					MemberId: 291,
					EnName: "YOONHANKIL",
					RealName: "尹韩吉",
					NickName: "Road",
					UserIcon:
						"http://img.crawler.qq.com/lolwebvideo/20180104171422/b7b0303c2ea8b23eec07bb6e2c0bd0e7/0",
					sUrl: "",
					GameName: "BLGRoad",
					GamePlace: "4,",
					GameHero: "412,89,201,412,89,201,",
					UserStatus: "1",
					UserPhoto550:
						"http://img.crawler.qq.com/lolwebvideo/20180104171829/c701d1fdeda309931cff6eedabb0e7db/0"
				},
				Value: 0.7986111111111112
			}
		};

		const playerValueArr = [
			{
				key: "TopKill",
				valueName: "最高场均击杀"
			},
			{
				key: "TopDeath",
				valueName: "最高场均死亡"
			},
			{
				key: "TopKDA",
				valueName: "最高场均KDA"
			},
			{
				key: "TopWards",
				valueName: "最高分均插眼"
			},
			{
				key: "TopTeamFight",
				valueName: "最高场均参团率"
			}
		];

		const playerWeeklyArr = playerValueArr.map(({ key, valueName }) => {
			console.log(playerWeekly[key]);
			const { BMInfo, Value, Member } = playerWeekly[key];

			const nickNameIndex = BMInfo.GameName.indexOf(BMInfo.NickName);
			const teamName = BMInfo.GameName.slice(0, nickNameIndex);

			return {
				//如果是参团率，改成百分比
				value:
					key === "TopTeamFight"
						? Value.toFixed(3) * 100 + "%"
						: Value.toFixed(2),
				playerName: BMInfo.NickName,
				playerImage: BMInfo.UserIcon,
				Place: Member.Place,
				valueName,
				teamName
			};
		});

		return playerWeeklyArr.map(
			({
				valueName,
				value,
				playerName,
				teamName,
				Place,
				playerImage
			}) => (
				<Col
					xs={12}
					md={245}
					key={valueName}
					className="home-list-item"
				>
					<div className="home-list-item-box home-player-list-item-box">
						<div
							className=" home-player-bg"
							style={{
								backgroundImage: `url(//static.tuwan.com/templet/lol/hd/rune_of_pro/images/${
									teamName
								}.png?1)`
							}}
						/>

						<div
							className=" home-player-image-bg"
							style={{
								backgroundImage: `url(${playerImage})`
							}}
						/>
						<div className="home-rune-box">
							<div className="home-position-name">
								<span className="home-player-name">
									{playerName}
								</span>
								<svg className="home-position-icon">
									<use
										xlinkHref={`#icon-position-${
											positionArr[Place - 1].ENName
										}`}
									/>
								</svg>
							</div>

							<span className="home-champion-winrate">
								{value}
							</span>

							<div className="home-rune-des">{valueName}</div>
						</div>
					</div>
				</Col>
			)
		);
	}
	render() {
		return (
			<div className="home">
				<div className="best-player">
					<h2 className="section-title">
						<span className="section-title--accent accent-left" />
						<span className="section-title--text">
							各位置最强英雄
						</span>
						<span className="section-title--accent accent-right" />
					</h2>
					<Row type="flex">{this.renderChampionList()}</Row>
				</div>
				<div className="best-player">
					<h2 className="section-title">
						<span className="section-title--accent accent-left" />
						<span className="section-title--text">选手数据</span>
						<span className="section-title--accent accent-right" />
					</h2>
					<Row type="flex">{this.renderPlayerList()}</Row>
				</div>
				<div className="most-used-rune">
					<h2 className="section-title">
						<span className="section-title--accent accent-left" />
						<span className="section-title--text">
							最佳基石符文
						</span>
						<span className="section-title--accent accent-right" />
					</h2>
					<Row type="flex">{this.renderRuneList()}</Row>
				</div>
			</div>
		);
	}
}

export default Home;
