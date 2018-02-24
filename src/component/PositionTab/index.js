import React from "react";

import { connect } from "react-redux";

import { fetchPlayers } from "../../actions/index.js";

import { Tabs } from "antd";

import { Link } from "react-router-dom";

import "./PositionTab.css";

const { TabPane } = Tabs;

class SlidingTabsDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchPlayers();
  }

  renderPlayersByPosition(place) {
    const filteredPlayers = this.props.players.filter(
      ({ GamePlace }) => parseInt(GamePlace, 10) === place
    );
    console.log("filteredPlayers", this.props.players);
    return filteredPlayers.map(({ NickName, MemberId, UserIcon, RealName }) => {
      return (
        <li className="player" key={MemberId}>
          <Link to={`/players/${MemberId}`}>
            <img
              src={UserIcon}
              alt={RealName}
              title={RealName}
              className="playerImg"
            />
            <p className="playerName">{NickName}</p>
          </Link>
        </li>
      );
    });
  }
  renderTabs() {
    const positionArr = [
      { Place: 1, CNName: "上单" },
      { Place: 2, CNName: "中单" },
      { Place: 3, CNName: "ADC" },
      { Place: 4, CNName: "辅助" },
      { Place: 5, CNName: "打野" }
    ];

    return positionArr.map(({ Place, CNName }) => {
      return (
        <TabPane tab={CNName} key={Place}>
          <ul className="playerList">{this.renderPlayersByPosition(Place)}</ul>
        </TabPane>
      );
    });
  }
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" tabPosition="top">
          {this.renderTabs()}
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps({ players }) {
  return {
    players
  };
}

export default connect(mapStateToProps, { fetchPlayers })(SlidingTabsDemo);
