import React, { Component } from "react";

import { Row, Col, Icon } from "antd";

import CInput from "../CInput/index.js";
import { Link } from "react-router-dom";
import customPath from "../../route/routeLinkConfig.js";
import { connect } from "react-redux";

import { fetchPlayers } from "../../actions/index.js";

import { positionArr } from ".././../util/index.js";

import "../ChampionList/ChampionList.css";
import "./PlayerList.css";

class PlayerList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterStr: "",
			positionFilter: ""
		};
	}
	componentDidMount() {
		this.props.fetchPlayers();
	}
	handleSearchFilter(e) {
		this.setState({
			filterStr: e.target.value
		});
	}
	handlePositionBtnClicked(e) {
		function getParentNodeByTag(node, tagName) {
			if (node.parentNode && node.parentNode.tagName) {
				if (
					node.parentNode.tagName.toLowerCase() ===
					tagName.toLowerCase()
				) {
					return node.parentNode;
				} else {
					return getParentNodeByTag(node.parentNode, tagName);
				}
			} else {
				return null;
			}
		}

		const button = getParentNodeByTag(e.target, "button");
		if (button) {
			if (button.classList.contains("active")) {
				button.classList.remove("active");

				this.setState({
					positionFilter: ""
				});
			} else {
				const child = button.parentNode.childNodes;
				for (let i = 0; i < child.length; i++) {
					child[i].classList.remove("active");
				}

				button.classList.add("active");

				this.setState({
					positionFilter: button.dataset.filter
				});
			}
		}
	}
	renderFilteredList() {
		const searchFilterValue = this.state.filterStr;

		//有输入关键字按关键过滤

		const filteredKeyWordList = this.props.players
			? this.props.players.filter(
					({ MemberId, GameName, RealName, EnName }) => {
						const playerName =
							GameName + MemberId + RealName + EnName;
						return (
							playerName
								.toLowerCase()
								.indexOf(searchFilterValue.toLowerCase()) !== -1
						);
					}
			  )
			: [];

		//按位置过滤
		const filteredList = filteredKeyWordList.filter(({ GamePlace }) => {
			if (!this.state.positionFilter) {
				return true;
			}
			return (
				positionArr[parseInt(GamePlace, 10) - 1].ENName ===
				this.state.positionFilter
			);
		});

		if (filteredList.length === 0) {
			if (this.props.isFetching) {
				return (
					<div className="loading">
						<Icon type="loading" style={{ fontSize: 50 }} spin />
						<div>loading...</div>
					</div>
				);
			}
			return (
				<div
					style={{
						textAlign: "center",
						width: "100%",
						marginTop: "50px",
						fontSize: "20px"
					}}
				>
					您输入的选手在本赛季暂未登场<br />
					请确认输入正确的关键词、战队简称 或 选择了正确的位置
				</div>
			);
		}
		return filteredList.map(({ NickName, UserIcon, MemberId }) => (
			<Col
				className="championLinkItem"
				key={MemberId}
				xs={6}
				sm={4}
				md={4}
				lg={3}
			>
				<Link to={`${customPath}/players/${MemberId}`}>
					<div className="champion-thumbnail-frame">
						<div
							className="champion-thumbnail"
							style={{
								backgroundColor: "",
								backgroundImage: `url(${UserIcon})`
							}}
						/>
						<div className="champion-thumbnail--accents accent-top" />
						<div className="champion-thumbnail--accents accent-bottom" />
					</div>
					<span className="champion-name">{NickName}</span>
				</Link>
			</Col>
		));
	}
	render() {
		return (
			<div className="championList playerList">
				<div className="champion-grid--controls">
					<Row
						className="champion-grid--controls_inner"
						type="flex"
						justify="space-between"
					>
						<Col
							className="champion-grid--filters"
							md={8}
							sm={24}
							xs={24}
						>
							<div
								className="filter-button-group filter-button-group--playstyle"
								data-filter-group="playstyle"
							>
								<button
									className="filter-button"
									data-filter="top"
									title="上单"
									onClick={this.handlePositionBtnClicked.bind(
										this
									)}
								>
									<svg
										className="filter-button--icon"
										height="30"
										width="30"
									>
										<use xlinkHref="#icon-position-top" />
									</svg>
								</button>
								<button
									className="filter-button"
									data-filter="jungle"
									title="打野"
									onClick={this.handlePositionBtnClicked.bind(
										this
									)}
								>
									<svg
										className="filter-button--icon"
										height="30"
										width="30"
									>
										<use xlinkHref="#icon-position-jungle" />
									</svg>
								</button>
								<button
									className="filter-button"
									data-filter="middle"
									title="中单"
									onClick={this.handlePositionBtnClicked.bind(
										this
									)}
								>
									<svg
										className="filter-button--icon"
										height="30"
										width="30"
									>
										<use xlinkHref="#icon-position-middle" />
									</svg>
								</button>
								<button
									className="filter-button"
									data-filter="bottom"
									title="ADC"
									onClick={this.handlePositionBtnClicked.bind(
										this
									)}
								>
									<svg
										className="filter-button--icon"
										height="30"
										width="30"
									>
										<use xlinkHref="#icon-position-bottom" />
									</svg>
								</button>
								<button
									className="filter-button"
									data-filter="support"
									title="辅助"
									onClick={this.handlePositionBtnClicked.bind(
										this
									)}
								>
									<svg
										className="filter-button--icon"
										height="30"
										width="30"
									>
										<use xlinkHref="#icon-position-support" />
									</svg>
								</button>
							</div>
						</Col>
						<Col
							className="champion-grid--title"
							md={8}
							sm={24}
							xs={24}
						>
							<h1>选择一位职业选手！</h1>
						</Col>
						<Col
							className="champion-grid--search"
							md={8}
							sm={24}
							xs={24}
						>
							<CInput
								type="text"
								className="quicksearch"
								placeholder="输入选手ID/姓名/战队简称"
								onChange={this.handleSearchFilter.bind(this)}
								enterButton
							/>
						</Col>
					</Row>
				</div>
				<div className="champion-grid--frame">
					<Row
						className="champion-grid list scroll"
						type="flex"
						justify="start"
						align="top"
					>
						{this.renderFilteredList()}
					</Row>
					<div className="champion-grid--dial">
						<div className="mask-frame frame-left">
							<div className="dial-frame">
								<div className="dial-frame--inner">
									<svg height="900" width="900">
										<use xlinkHref="#champion-grid-dial" />
									</svg>
								</div>
							</div>
						</div>
						<div className="mask-frame frame-right">
							<div className="dial-frame">
								<div className="dial-frame--inner">
									<svg height="900" width="900">
										<use xlinkHref="#champion-grid-dial" />
									</svg>
								</div>
							</div>
						</div>
					</div>
					<div className="champion-grid--bg">
						<img
							src="//static.tuwan.com/templet/lol/hd/rune_of_pro/images/map-bg--full-sm.jpg"
							alt="bg"
						/>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ players, isFetching }) {
	return {
		players,
		isFetching: isFetching.playersPending
	};
}

export default connect(mapStateToProps, { fetchPlayers })(PlayerList);
