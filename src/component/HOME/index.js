import React, { Component } from "react";

import { Row, Col, Icon, Select } from "antd";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import customPath from "../../route/routeLinkConfig.js";

import { fetchHomePageStats } from "../../actions/index.js";

import "./home.css";

import runeJson from "../../lolJSON/runes.json";
import { mapKey, positionArr } from "../../util/index.js";
const Option = Select.Option;

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
	constructor(props) {
		super(props);
		this.state = {
			week: 0
		};
	}
	handleWeekChange(value) {
		this.props.fetchHomePageStats(value);
		this.setState({
			week: value
		});
	}
	componentWillMount() {
		console.log(this.props.location);
		this.props.fetchHomePageStats();
	}
	renderRuneList() {
		if (!this.props.lolJSON.champion) {
			return;
		}
		const {
			data: championJson,
			version: patchVersion
		} = this.props.lolJSON.champion;
		const championMap = mapKey(championJson, "key");

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
					img: `//lol.qq.com/act/a20170926preseason/img/runeBuilder/runes/108x108/${runeId}.png`,
					champions: champions.map(id => championMap[id]),
					background: `//static.tuwan.com/templet/lol/hd/rune_of_pro/images/${tree}.jpg`,
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
								className={`home-list-item-rune-image-box ${runePath}`}
							>
								<img
									className="home-list-item-rune-image"
									src={img}
									alt={runeName}
								/>
							</div>

							<span className="home-rune-name">{runeName}</span>
							<span className="home-rune-count">{count}次</span>
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
										<Link
											to={`${customPath}/champions/${champion}`}
										>
											<img
												src={`//lolstatic.tuwan.com/cdn/${patchVersion}/img/champion/${champion}.png`}
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
		if (!this.props.lolJSON.champion) {
			return;
		}
		const { data: championJson } = this.props.lolJSON.champion;

		const championMap = mapKey(championJson, "key");

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
						to={`${customPath}/champions/${
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
									{(winRate * 100).toFixed(1) + "%"}
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
						? (Value * 100).toFixed(1) + "%"
						: Value.toFixed(1),
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
					<Link
						className="home-link"
						to={`${customPath}/players/${playerId}`}
					>
						<div className="home-list-item-box home-player-list-item-box">
							<div
								className=" home-player-bg"
								style={{
									backgroundImage: `url(//static.tuwan.com/templet/lol/hd/rune_of_pro/images/${teamName}.png?1)`
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
		if (
			Object.keys(this.props.homePageStats).length === 0 ||
			this.props.isFetching
		) {
			return (
				<div className="home">
					<div className="loading">
						<Icon type="loading" style={{ fontSize: 50 }} spin />
						<div>loading...</div>
					</div>
				</div>
			);
		}

		const weekMap = {
			1: "一",
			2: "二",
			3: "三",
			4: "四",
			5: "五",
			6: "六",
			7: "七",
			8: "八",
			9: "九",
			10: "十",
			11: "十一",
			12: "十二",
			13: "十三",
			14: "十四",
			15: "十五"
		};
		const lastWeek =
			this.state.week ||
			(this.props.homePageStats.currentProcId - 100) / 10 - 1;

		const allWeekCount =
			(this.props.homePageStats.currentProcId - 100) / 10;

		const options = [];

		for (let i = 0; i < allWeekCount; i++) {
			options.push(
				<Option key={i + 1} value={i + 1}>
					第{weekMap[i + 1]}周{allWeekCount === i + 1
						? "（进行中）"
						: ""}
				</Option>
			);
		}

		const select = (
			<Select
				placeholder={"选择周数"}
				defaultValue={
					this.state.week === 0 ? allWeekCount - 1 : this.state.week
				}
				onChange={this.handleWeekChange.bind(this)}
				className="home-week-select"
				dropdownClassName="home-week-dropdown"
			>
				{options}
			</Select>
		);
		return (
			<div className="home">
				<div className="chooseWeek">{select}</div>
				<div className="best-player">
					<h2 className="section-title">
						<span className="section-title--accent accent-left" />
						<span className="section-title--text">
							第{weekMap[lastWeek]}周各位置最强英雄
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
						<span className="section-title--text">
							第{weekMap[lastWeek]}周选手数据
						</span>
						<span className="section-title--accent accent-right" />
					</h2>
					<Row type="flex">{this.renderPlayerList()}</Row>
				</div>
				<div className="most-used-rune">
					<h2 className="section-title">
						<span className="section-title--accent accent-left" />
						<span className="section-title--text">
							第{weekMap[lastWeek]}周最佳基石符文
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

function mapStateToProps({ homePageStats, lolJSON, isFetching }) {
	return {
		homePageStats,
		lolJSON,
		isFetching: isFetching.homePagePending || isFetching.lolJsonPending
	};
}

export default connect(mapStateToProps, { fetchHomePageStats })(Home);
