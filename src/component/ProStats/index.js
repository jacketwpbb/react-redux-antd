import React from "react";
import "./ProStats.css";

import { Row, Col } from "antd";

const ProStats = ({ matchList }) => {
	// console.log(matchList)

	const heroSatus = {};
	matchList.forEach(({ BattlePlayer, MemberId, Game_W }) => {
		if (!heroSatus[MemberId]) {
			heroSatus[MemberId] = {};

			heroSatus[MemberId].memberId = MemberId;
			heroSatus[MemberId].count = 1;
			heroSatus[MemberId].gameName = BattlePlayer.memberInfo.GameName;
			heroSatus[MemberId].url = BattlePlayer.memberInfo.UserIcon;
			heroSatus[MemberId].win = Game_W ? 1 : 0;
		} else {
			heroSatus[MemberId].count++;
			if (Game_W) {
				heroSatus[MemberId].win++;
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
		return <div className="proStats no-stats">暂无数据</div>;
	}

	return (
		<div className="proStats">
			<Row type="flex" justify="center">
				<Col xs={24} md={8}>
					<div className="championStats-title">胜率最高</div>

					<ul className="championBox">
						{winrateArr
							.slice(0, 3)
							.map(
								({
									memberId,
									url,
									winRate,
									count,
									gameName
								}) => (
									<li className="championItem" key={memberId}>
										<div className="champion-icon">
											<img src={url} alt={memberId} />
											<div className="player-game-name">
												{gameName}
											</div>
										</div>
										<div className="champion-des">
											{`${count}场${(
												winRate * 100
											).toFixed(1)}%`}
										</div>
									</li>
								)
							)}
					</ul>
				</Col>

				<Col xs={24} md={8}>
					<div className="championStats-title">胜率最低</div>

					<ul className="championBox">
						{winrateArr
							.reverse()
							.slice(0, 3)
							.map(
								({
									memberId,
									url,
									winRate,
									count,
									gameName
								}) => (
									<li className="championItem" key={memberId}>
										<div className="champion-icon">
											<img src={url} alt={memberId} />
											<div className="player-game-name">
												{gameName}
											</div>
										</div>
										<div className="champion-des">
											{`${count}场${(
												winRate * 100
											).toFixed(1)}%`}
										</div>
									</li>
								)
							)}
					</ul>
				</Col>
				<Col xs={24} md={8}>
					<div className="championStats-title">选用最多</div>

					<ul className="championBox">
						{countArr
							.slice(0, 3)
							.map(
								({
									memberId,
									url,
									winRate,
									count,
									gameName
								}) => (
									<li className="championItem" key={memberId}>
										<div className="champion-icon">
											<img src={url} alt={memberId} />
											<div className="player-game-name">
												{gameName}
											</div>
										</div>
										<div className="champion-des">
											{`${count}/${matchList.length}场`}
										</div>
									</li>
								)
							)}
					</ul>
				</Col>
			</Row>
		</div>
	);
};

export default ProStats;
