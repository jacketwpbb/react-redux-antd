import React, { Component } from "react";

import { Row, Col, message, Icon } from "antd";

import CInput from "../CInput/index.js";
import { Link } from "react-router-dom";
import customPath from "../../route/routeLinkConfig.js";

import { mapKey } from "../../util/index.js";

import positionJson from "../../lolJSON/position.json";

import { fetchActiveChampion } from "../../actions/index.js";

import { connect } from "react-redux";

import "./ChampionList.css";

//配置提示消息
message.config({
	top: 100,
	duration: 2
});

class ChampionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterStr: "",
			positionFilter: ""
		};
	}
	componentWillMount() {
		if (this.props.activeChampions.length === 0) {
			this.props.fetchActiveChampion();
		}
	}
	showchampionMessage() {
		message.warning("暂时没有选手使用这个英雄哦");
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

		const championJson = this.props.lolJSON.champion;
		const championMap = mapKey(this.props.lolJSON.champion.data, "key");
		const championList = Object.keys(
			mapKey(this.props.lolJSON.champion.data, "key")
		);
		//有输入关键字按关键过滤
		const filteredKeyWordList = championList.filter(ChampionId => {
			const { id, key, name, title } = championJson.data[
				championMap[ChampionId]
			];

			const championName = id + key + name + title;
			return (
				championName
					.toLowerCase()
					.indexOf(searchFilterValue.toLowerCase()) !== -1
			);
		});

		//按位置过滤
		const filteredList = filteredKeyWordList.filter(ChampionId => {
			const { key } = championJson.data[championMap[ChampionId]];

			const championArr = positionJson[this.state.positionFilter];
			if (championArr) {
				return championArr.indexOf(+key) !== -1;
			}
			return true;
		});

		if (filteredList.length === 0) {
			return (
				<div
					style={{
						textAlign: "center",
						width: "100%",
						marginTop: "50px",
						fontSize: "20px"
					}}
				>
					关键词错误 或 位置错误
				</div>
			);
		}

		const activeChampions = this.props.activeChampions;
		const activeChampionPending = this.props.activeChampionPending;

		if (activeChampionPending) {
			return (
				<div className="loading">
					<Icon type="loading" style={{ fontSize: 50 }} spin />
					<div>loading...</div>
				</div>
			);
		}
		return filteredList.map(championId => (
			<Col
				className="championLinkItem"
				key={championId}
				xs={6}
				sm={4}
				md={4}
				lg={3}
				order={activeChampions.indexOf(+championId) === -1 ? 10 : 0}
			>
				<Link
					to={
						activeChampions.indexOf(+championId) === -1
							? `${customPath}/champions`
							: `${customPath}/champions/${
									championMap[championId]
							  }`
					}
					onClick={
						activeChampions.indexOf(+championId) === -1
							? this.showchampionMessage
							: () => ""
					}
				>
					<div className="champion-thumbnail-frame">
						<div
							className={`champion-thumbnail ${
								activeChampions.indexOf(+championId) === -1
									? "disabled"
									: ""
							}`}
							style={{
								backgroundImage: `url('//lolstatic.tuwan.com/cdn/${
									championJson.version
								}/img/champion/${championMap[championId]}.png')`
							}}
						/>
						<div className="champion-thumbnail--accents accent-top" />
						<div className="champion-thumbnail--accents accent-bottom" />
					</div>
					<span className="champion-name">
						{championJson.data[championMap[championId]].name}
					</span>
				</Link>
			</Col>
		));
	}
	render() {
		return (
			<div className="championList">
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
									<svg className="filter-button--icon">
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
									<svg className="filter-button--icon">
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
									<svg className="filter-button--icon">
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
									<svg className="filter-button--icon">
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
									<svg className="filter-button--icon">
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
							<h1>选择一个英雄！</h1>
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
								placeholder="输入英雄的中文/英文名称"
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

function mapStateToProps({ activeChampions, lolJSON, isFetching }) {
	return {
		activeChampions,
		lolJSON,
		activeChampionPending:
			isFetching.activeChampionPending || isFetching.lolJsonPending
	};
}

export default connect(mapStateToProps, { fetchActiveChampion })(ChampionList);
