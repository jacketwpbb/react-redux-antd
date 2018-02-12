import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchPlayerMatchList } from "../../actions/index.js";

import { Collapse, Icon } from "antd";

import "./PlayerDetail.css";

import rune from "../../lolJSON/runes.json";

const Panel = Collapse.Panel;

class PlayerDetail extends Component {
	componentDidMount() {
		this.props.fetchPlayerMatchList(this.props.match.params.MemberId);
	}
	renderTabContent({ equip, heroInfo }) {
		const items = [];
		for (let key in equip) {
			items.push(equip[key]);
		}

		const lis = items.map(itemId => (
			<li className="item-img" key={itemId}>
				<img
					src={`http://ossweb-img.qq.com/images/lol/img/item/${
						itemId
					}.png`}
					alt=""
				/>
			</li>
		));

		const summonerSepll = window.LOLsummonerjs.data;
		const summonerMap = {};
		for (let key in summonerSepll) {
			summonerMap[summonerSepll[key].key] = summonerSepll[key].id;
		}

		const runeMap = {};
		const treeNameMap = {
			坚决: 4,
			巫术: 3,
			启迪: 5,
			精密: 1,
			主宰: 2
		};
		rune.styles.forEach(({ slots, name }) => {
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

		console.log(runeMap, runeMap[8359]);

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

		const runes = heroInfo.runes_info_.runes_list_.map(({ runes_id_ }) => (
			<li
				className={`rune-image ${getTreeClassName(
					runeMap[runes_id_].tree
				)}`}
				key={runes_id_}
			>
				<img
					src={`http://lol.qq.com/act/a20170926preseason/img/runeBuilder/runes/108x108/${
						runes_id_
					}.png`}
					alt={runes_id_}
				/>
			</li>
		));

		runes.splice(
			0,
			0,
			<li
				className={`rune-image ${getTreeClassName(
					runeMap[heroInfo.runes_info_.runes_list_[0].runes_id_].tree
				)}`}
				key="aa"
			>
				<img
					src={`http://lpl.qq.com/es/preseason/img/runeBuilder/runes/${getTreeClassName(
						runeMap[heroInfo.runes_info_.runes_list_[0].runes_id_]
							.tree
					).toLowerCase()}/icon-${getTreeClassName(
						runeMap[heroInfo.runes_info_.runes_list_[0].runes_id_]
							.tree
					)
						.toLowerCase()
						.slice(0, 1)}-36x36.png`}
					alt=""
				/>
			</li>
		);

		runes.splice(
			5,
			0,
			<li className="rune-image" key="bb">
				<img
					src={`http://lpl.qq.com/es/preseason/img/runeBuilder/runes/${getTreeClassName(
						runeMap[heroInfo.runes_info_.runes_list_[4].runes_id_]
							.tree
					).toLowerCase()}/icon-${getTreeClassName(
						runeMap[heroInfo.runes_info_.runes_list_[4].runes_id_]
							.tree
					)
						.toLowerCase()
						.slice(0, 1)}-36x36.png`}
					alt=""
				/>
			</li>
		);

		return (
			<div className="heroInfo">
				<div className="heroInfo-items">
					<div className="heroInfo-title">召唤师技能</div>
					<ul className="items-box">
						<li className="item-img">
							<img
								src={`http://ossweb-img.qq.com/images/lol/img/spell/${
									summonerMap[
										heroInfo.spells_info_.spells_list_[0]
									]
								}.png`}
								alt=""
							/>
						</li>
						<li className="item-img">
							<img
								src={`http://ossweb-img.qq.com/images/lol/img/spell/${
									summonerMap[
										heroInfo.spells_info_.spells_list_[1]
									]
								}.png`}
								alt=""
							/>
						</li>
					</ul>
				</div>
				<div className="heroInfo-items">
					<div className="heroInfo-title">出装</div>
					<ul className="items-box">{lis}</ul>
				</div>
				<div className="heroInfo-items">
					<div className="heroInfo-title">符文</div>
					<ul className="items-box">{runes}</ul>
				</div>
			</div>
		);
	}
	renderHeader() {
		if (this.props.matchList.length > 0) {
			const {
				EnName,
				RealName,
				UserPhoto550,
				GamePlace
			} = this.props.matchList[0].BattlePlayer.memberInfo;

			return (
				<div className="header">
					<div className="imagesBox">
						<div className="left" />
						<div className="right" />
						<div
							className="player"
							style={{
								backgroundImage: `url(${UserPhoto550})`
							}}
						>
							<div className="playerInfo">
								<p className="enName">{EnName}</p>
								<p className="RealName">{RealName}</p>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}

	renderMatchList() {
		if (this.props.matchList.length > 0) {
			const numMap = {
				第一场: " 1",
				第二场: " 2",
				第三场: " 3",
				第四场: " 4",
				第五场: " 5"
			};
			return this.props.matchList.map(
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
									<img
										src={`//ossweb-img.qq.com/images/lol/img/champion/${
											window.LOLherojs.champion.keys[
												ChampionId
											]
										}.png`}
										alt={
											window.LOLherojs.champion.keys[
												ChampionId
											]
										}
										className="championImage"
									/>

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
	}
	render() {
		return (
			<div className="PlayerDetail">
				{this.renderHeader()}
				<h3 className="matchList-title">MATCH HISTORY</h3>
				<Collapse
					className="matchList"
					bordered={false}
					defaultActiveKey={["0"]}
				>
					{this.renderMatchList()}
				</Collapse>
			</div>
		);
	}
}

function mapStateToProps({ matchList }) {
	return { matchList };
}

export default connect(mapStateToProps, { fetchPlayerMatchList })(PlayerDetail);
