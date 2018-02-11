import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchPlayerMatchList } from "../../actions/index.js";

class PlayerDetail extends Component {
	componentDidMount() {
		this.props.fetchPlayerMatchList(this.props.match.params.MemberId);
	}
	render() {
		return (
			<div>
				<div>asdasasdasddaa</div>
				<div>PlayerDetail</div>
			</div>
		);
	}
}

function mapStateToProps({ players, matchList }) {
	const playerMap = {};
	players.forEach(player => {
		playerMap[player.MemberId] = player;
	});

	console.log("players", playerMap);
	return { playerMap, matchList };
}

export default connect(mapStateToProps, { fetchPlayerMatchList })(PlayerDetail);
