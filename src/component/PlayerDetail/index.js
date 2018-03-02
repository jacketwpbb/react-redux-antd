import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchPlayerMatchList } from "../../actions/index.js";

import { Collapse, Icon, Row, Col } from "antd";

import Search from "../CInput/index.js";

import "./PlayerDetail.css";

import Rune from "../Rune/index.js";

import ChampionStats from "../ChampionStats/index.js";

import { mapKey, positionArr } from "../../util/index.js";

import championJson from "../../lolJSON/champion.json";
import summonerJson from "../../lolJSON/summoner.json";
import itemJson from "../../lolJSON/item.json";

import LOLPopover from "../LOLPopover/index.js";

const championMap = mapKey(championJson.data, "key");
const summonerMap = mapKey(summonerJson.data, "key");

const positionObj = {};
positionArr.forEach(position => (positionObj[position.Place] = position));

const Panel = Collapse.Panel;

class PlayerDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchFilterValue: ""
		};
	}

	componentDidMount() {
		this.props.fetchPlayerMatchList(this.props.match.params.MemberId);
	}
	renderTabContent({ equip, heroInfo }) {
		const items = [];
		for (let key in equip) {
			items.push(equip[key]);
		}

		const lis = items.map((itemId, idx) => (
			<li className="item-img" key={idx}>
				{itemId ? (
					<LOLPopover
						title={
							itemJson.data[itemId]
								? itemJson.data[itemId].name
								: "暂无数据"
						}
						content={
							<div
								dangerouslySetInnerHTML={{
									__html: itemJson.data[itemId]
										? itemJson.data[itemId].description
										: ""
								}}
							/>
						}
					>
						<img
							src={
								itemJson.data[itemId]
									? `//lolstatic.tuwan.com/cdn/${
											itemJson.version
										}/img/item/${itemId}.png`
									: `//ossweb-img.qq.com/images/lol/img/item/${
											itemId
										}.png`
							}
							alt={
								itemJson.data[itemId]
									? itemJson.data[itemId].name
									: "暂无数据"
							}
						/>
					</LOLPopover>
				) : (
					<img
						src="https://static.tuwan.com/templet/lol/hd/hfzhcx/image/itemplaceholder.jpg"
						alt="空"
					/>
				)}
			</li>
		));

		// heroInfo.runes_info_.runes_list_

		const summonerdata = summonerJson.data;

		const spell1 = summonerMap[heroInfo.spells_info_.spells_list_[0]];
		const spell2 = summonerMap[heroInfo.spells_info_.spells_list_[1]];

		const spell1Title = summonerdata[spell1].name;
		const spell2Title = summonerdata[spell2].name;

		const spell1Content = summonerdata[spell1].description;
		const spell2Content = summonerdata[spell2].description;

		return (
			<div className="heroInfo">
				<Row className="heroInfo-items" type="flex" justify="center">
					<Col xs={20} md={4} className="heroInfo-title">
						召唤师技能
					</Col>
					<Col xs={20} md={12}>
						<ul className="items-box">
							<li className="item-img">
								<LOLPopover
									title={spell1Title}
									content={spell1Content}
								>
									<img
										src={`http://ossweb-img.qq.com/images/lol/img/spell/${
											spell1
										}.png`}
										alt=""
									/>
								</LOLPopover>
							</li>
							<li className="item-img">
								<LOLPopover
									title={spell2Title}
									content={spell2Content}
								>
									<img
										src={`http://ossweb-img.qq.com/images/lol/img/spell/${
											spell2
										}.png`}
										alt=""
									/>
								</LOLPopover>
							</li>
						</ul>
					</Col>
				</Row>
				<Row className="heroInfo-items" type="flex" justify="center">
					<Col xs={20} md={4} className="heroInfo-title">
						出装
					</Col>
					<Col xs={20} md={12}>
						<ul className="items-box">{lis}</ul>
					</Col>
				</Row>
				<Row
					className="heroInfo-items rune-item"
					type="flex"
					justify="center"
				>
					<Col xs={20} md={4} className="heroInfo-title">
						符文
					</Col>
					<Col xs={20} md={12}>
						<Rune runeList={heroInfo.runes_info_.runes_list_} />
					</Col>
				</Row>
			</div>
		);
	}
	renderHeader() {
		if (this.props.matchList.length > 0) {
			const {
				NickName,
				RealName,
				UserPhoto550,
				GamePlace
			} = this.props.matchList[0].BattlePlayer.memberInfo;

			return (
				<div className="imagesBox">
					<div className="left" />
					<div className="right" />
					<div
						className="player"
						style={{
							backgroundImage: `url(${
								this.props.isFetching ? "" : UserPhoto550
							})`
						}}
					>
						<div className="playerInfo">
							<p className="enName">
								{this.props.isFetching ? "" : NickName}
							</p>
							<p className="RealName">
								{this.props.isFetching ? "" : RealName}
							</p>
							<p className="player-position-icon-box">
								<svg className="player-position-icon">
									<use
										xlinkHref={`#icon-position-${
											this.props.isFetching
												? ""
												: positionObj[
														parseInt(GamePlace, 10)
													].ENName
										}`}
									/>
								</svg>
							</p>
						</div>
					</div>
				</div>
			);
		}
	}

	renderMatchList() {
		const searchFilterValue = this.state.searchFilterValue;

		const numMap = {
			第一场: " 1",
			第二场: " 2",
			第三场: " 3",
			第四场: " 4",
			第五场: " 5"
		};

		const filteredList = this.props.matchList.filter(match => {
			const { id, key, name, title } = championJson.data[
				championMap[match.ChampionId]
			];

			const championName = id + key + name + title;
			return (
				championName
					.toLowerCase()
					.search(searchFilterValue.toLowerCase()) !== -1
			);
		});

		if (filteredList.length === 0) {
			return (
				<Panel
					header={
						<div className="matchList-item no-stats">
							暂无数据或关键词错误
						</div>
					}
					disabled={true}
				/>
			);
		}

		return filteredList.map(
			(
				{
					ChampionId,
					bMatchName,
					sUpdated,
					Game_K,
					Game_D,
					Game_A,
					sMatchName,
					BattlePlayer
				},
				idx
			) => {
				return (
					<Panel
						header={
							<div className="matchList-item">
								<Icon type="down" className="down-icon" />
								<div
									className={`championImageBox ${
										BattlePlayer.win ? "win" : "loss"
									}`}
								>
									<div className="championImage">
										<img
											src={`//ossweb-img.qq.com/images/lol/img/champion/${
												championMap[ChampionId]
											}.png`}
											alt={championMap[ChampionId]}
										/>
									</div>
								</div>

								<div className="matchName">
									<span className="tinyText">对局</span>
									<span>
										{bMatchName}
										{numMap[sMatchName]}
									</span>
								</div>

								<div className="matchTime">
									<span className="tinyText">时间</span>
									<span>{sUpdated.split("T")[0]}</span>
								</div>

								<div className="KDA">
									<span className="tinyText">KDA</span>
									<span>{`${Game_K}/${Game_D}/${
										Game_A
									}`}</span>
								</div>
							</div>
						}
						className=""
						key={idx}
					>
						{this.renderTabContent(BattlePlayer)}
					</Panel>
				);
			}
		);
	}

	handleChange(event) {
		this.setState({ searchFilterValue: event.target.value });
	}

	render() {
		return (
			<div className="PlayerDetail">
				<div className="header">{this.renderHeader()}</div>
				{this.props.isFetching ? (
					<div className="loading">
						<Icon type="loading" style={{ fontSize: 50 }} spin />
						<div>loading...</div>
					</div>
				) : (
					<div>
						<h3 className="matchList-title">英雄数据</h3>
						<ChampionStats matchList={this.props.matchList} />
						<div className="searchBox">
							<h3 className="matchList-title">比赛记录</h3>
							<Search
								placeholder="输入英雄的中文/英文名称"
								onChange={this.handleChange.bind(this)}
								className="filterInput"
								enterButton
							/>
						</div>

						<Collapse
							className="matchList"
							bordered={false}
							defaultActiveKey={["0"]}
						>
							{this.renderMatchList()}
						</Collapse>
					</div>
				)}
			</div>
		);
	}
}

function mapStateToProps({ matchList, isFetching }) {
	return { matchList, isFetching: isFetching.matchListPending };
}

export default connect(mapStateToProps, { fetchPlayerMatchList })(PlayerDetail);
