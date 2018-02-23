import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchPlayerMatchList } from "../../actions/index.js";

import { Collapse, Icon ,Spin , Row, Col} from "antd";

import "./PlayerDetail.css";

import Rune from "../Rune/index.js"

import ChampionStats from "../ChampionStats/index.js"

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
					src={itemId?`http://ossweb-img.qq.com/images/lol/img/item/${itemId}.png`:"https://game.gtimg.cn/images/lol/match/public/pic_none.png"}
					alt=""
				/>
				
			
			</li>
		));

		const summonerSepll = window.LOLsummonerjs.data;
		const summonerMap = {};
		for (let key in summonerSepll) {
			summonerMap[summonerSepll[key].key] = summonerSepll[key].id;
		}

		// heroInfo.runes_info_.runes_list_

		return (
			<div className="heroInfo">
				<Row className="heroInfo-items" type="flex" justify="center">
					<Col xs={20} md={4} className="heroInfo-title" >召唤师技能</Col>
					<Col xs={20} md={12} >
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
				<Row className="heroInfo-items rune-item" type="flex" justify="center">
					<Col xs={20} md={4} className="heroInfo-title">
						符文
					</Col>
					<Col xs={20} md={12}>
						<Rune runeList={heroInfo.runes_info_.runes_list_}></Rune>
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
								backgroundImage: `url(${UserPhoto550})`
							}}
						>
							<div className="playerInfo">
								<p className="enName">{NickName}</p>
								<p className="RealName">{RealName}</p>
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
									<div className={`championImageBox ${BattlePlayer.win?"win":"loss"}`}>
										<div className="championImage">
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
	}


	render() {
		const antIcon = <Icon type="loading" style={{ fontSize: 50 }} spin />;
		return (
			<div className="PlayerDetail">
				<Spin indicator={antIcon}  spinning={this.props.isFetching}>
					<div className="header">{this.renderHeader()}</div>
				</Spin>
				<h3 className="matchList-title">CHAMPION STATS</h3>
				<ChampionStats matchList={this.props.matchList}></ChampionStats>
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

function mapStateToProps({ matchList, isFetching }) {
	return { matchList, isFetching: isFetching.matchListPending };
}

export default connect(mapStateToProps, { fetchPlayerMatchList })(PlayerDetail);
