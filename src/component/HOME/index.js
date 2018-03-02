import React, { Component } from "react";

import { Row, Col, Icon } from "antd";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchHomePageStats } from "../../actions/index.js";

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
	componentWillMount() {
		console.log(this.props.fetchHomePageStats);
		this.props.fetchHomePageStats();
	}
	renderRuneList() {
		const runeArr = this.props.homePageStats.BestPerks;

		const runePathCount = {};
		const runePathArr = runeArr.filter(({ RuneId: runeId }) => {
			if (runePathCount[runeMap[runeId].treeName]) {
				return false;
			} else {
				runePathCount[runeMap[runeId].treeName] = true;
				return true;
			}
		});

		const runeFinalArr = runePathArr
			.map(({ RuneId: runeId, Champions: champions, Count }) => {
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
					runePath: tree,
					count: Count
				};
			})
			.sort((pre, next) => next.count - pre.count);

		return runeFinalArr.map(
			({ runeName, img, champions, background, runePath, count }) => (
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
							<span className="home-rune-count">{count}场</span>
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
										<Link to={`/champions/${champion}`}>
											<img
												src={`http://lolstatic.tuwan.com/cdn/${
													patchVersion
												}/img/champion/${champion}.png`}
												alt={champion}
											/>
										</Link>
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
		const championArr = this.props.homePageStats.BestChampions;

		return championArr.map(
			({ ChampionId: championId, WinRate: winRate, Place }) => (
				<Col
					xs={12}
					md={245}
					key={championId}
					className="home-list-item"
				>
					<Link
						className="home-link"
						to={`/champions/${
							championJson[championMap[championId]].id
						}`}
					>
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

								<span className="home-champion-winrate">
									{winRate * 100 + "%"}
								</span>
							</div>
							<div>
								<div className="home-rune-des">胜率</div>
								<div className="home-champion-name">
									{championJson[championMap[championId]].name}
								</div>
							</div>
						</div>
					</Link>
				</Col>
			)
		);
	}
	renderPlayerList() {
		const playerWeekly = this.props.homePageStats;

		const playerValueArr = [
			{
				key: "TopKill",
				valueName: "最高场均击杀"
			},
			{
				key: "TopAssist",
				valueName: "最高场均助攻"
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
			console.log(playerWeekly);

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
				playerId: Member.MemberId,
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
				playerImage,
				playerId
			}) => (
				<Col
					xs={12}
					md={245}
					key={valueName}
					className="home-list-item"
				>
					<Link className="home-link" to={`/players/${playerId}`}>
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
					</Link>
				</Col>
			)
		);
	}
	render() {
		console.log("fect", this.props.isFetching);
		if (Object.keys(this.props.homePageStats).length === 0) {
			return (
				<div className="home">
					<div className="loading">
						<Icon type="loading" style={{ fontSize: 50 }} spin />
						<div>loading...</div>
					</div>
				</div>
			);
		}
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
					<div className="home-stats-des">
						数据说明：仅统计一周内出场数大于3的英雄
					</div>
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
					<div className="home-stats-des">
						数据说明：仅统计一周内每个系出场数最多的基石符文
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ homePageStats, isFetching }) {
	return {
		homePageStats,
		isFetching: isFetching.homePagePending
	};
}

export default connect(mapStateToProps, { fetchHomePageStats })(Home);
