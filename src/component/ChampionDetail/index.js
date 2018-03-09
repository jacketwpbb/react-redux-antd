import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchChampionMatchList } from "../../actions/index.js";

import { Collapse, Icon, Row, Col } from "antd";

import Search from "../CInput/index.js";

import "./ChampionDetail.css";

import Rune from "../Rune/index.js";

import ProStats from "../ProStats/index.js";

import { mapKey } from "../../util/index.js";

import LOLPopover from "../LOLPopover/index.js";

const Panel = Collapse.Panel;

class PlayerDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchFilterValue: ""
		};
	}

	componentDidMount() {
		let timer;
		timer = setInterval(() => {
			if (this.props.lolJSON.champion) {
				this.props.fetchChampionMatchList(
					this.props.lolJSON.champion.data[
						this.props.match.params.ChampionName
					].key
				);
				clearInterval(timer);
			}
		}, 300);
	}
	renderTabContent({ equip, heroInfo }) {
		const items = [];
		for (let key in equip) {
			items.push(equip[key]);
		}

		const itemJson = this.props.lolJSON.item;
		const lis = items.map((itemId, idx) => (
			<li className="item-img" key={idx}>
				{itemId ? (
					<LOLPopover
						title={
							itemJson.data[itemId]
								? itemJson.data[itemId].name
								: `此装备在${itemJson.version}版本已经移除`
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
									: `//ossweb-img.qq.com/images/lol/img/item/${itemId}.png`
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
						src="//static.tuwan.com/templet/lol/hd/hfzhcx/image/itemplaceholder.jpg"
						alt="空"
					/>
				)}
			</li>
		));

		// heroInfo.runes_info_.runes_list_

		const summonerdata = this.props.lolJSON.summoner.data;
		const summonerMap = mapKey(this.props.lolJSON.summoner.data, "key");

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
										src={`//ossweb-img.qq.com/images/lol/img/spell/${spell1}.png`}
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
										src={`//ossweb-img.qq.com/images/lol/img/spell/${spell2}.png`}
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
						<Rune
							runeList={heroInfo.runes_info_.runes_list_}
							runeJson={this.props.lolJSON.rune}
							version={this.props.lolJSON.champion.version}
						/>
					</Col>
				</Row>
			</div>
		);
	}
	renderHeader() {
		const championJson = this.props.lolJSON.champion;

		if (!championJson) {
			return (
				<div className="imagesBox">
					<div className="champion">
						<div className="champion-image-bg" />
						<div className="playerInfo">
							<p className="enName" />
							<p className="RealName" />
						</div>
					</div>
				</div>
			);
		}

		const { id, name, title } = championJson.data[
			this.props.match.params.ChampionName
		];

		return (
			<div className="imagesBox">
				<div className="champion">
					<div
						className="champion-image-bg"
						style={{
							backgroundImage: `url(//lolstatic.tuwan.com/cdn/img/champion/splash/${id}_0.jpg)`
						}}
					/>
					<div className="playerInfo">
						<p className="enName">{name}</p>
						<p className="RealName">{title}</p>
					</div>
				</div>
			</div>
		);
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
			const {
				EnName,
				GameName,
				RealName,
				MemberId
			} = match.BattlePlayer.memberInfo;

			const championName = EnName + GameName + RealName + MemberId;
			return (
				championName
					.toLowerCase()
					.indexOf(searchFilterValue.toLowerCase()) !== -1
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
											src={
												BattlePlayer.memberInfo.UserIcon
											}
											alt={
												this.props.match.params
													.ChampionName
											}
										/>
									</div>
									<div className="batttlePlayerName">
										{BattlePlayer.memberInfo.GameName}
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
									<span
									>{`${Game_K}/${Game_D}/${Game_A}`}</span>
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
			<div className="championDetail">
				<div className="header">{this.renderHeader()}</div>
				{this.props.isFetching ? (
					<div className="loading">
						<Icon type="loading" style={{ fontSize: 50 }} spin />
						<div>loading...</div>
					</div>
				) : (
					<div>
						<h3 className="matchList-title">选手数据</h3>
						<ProStats matchList={this.props.matchList} />
						<div className="searchBox">
							<h3 className="matchList-title">比赛记录</h3>
							<Search
								placeholder="输入选手的姓名/ID/战队"
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

function mapStateToProps({ championMatchList, lolJSON, isFetching }) {
	return {
		matchList: championMatchList,
		lolJSON,
		isFetching:
			isFetching.championMatchListPending || isFetching.lolJsonPending
	};
}

export default connect(mapStateToProps, { fetchChampionMatchList })(
	PlayerDetail
);
