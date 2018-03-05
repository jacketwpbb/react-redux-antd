import React from "react";

import { connect } from "react-redux";

import { fetchPlayers } from "../../actions/index.js";

import { Tabs, Icon } from "antd";

import { Link } from "react-router-dom";
import customPath from "../../route/routeLinkConfig.js";
import { positionArr } from ".././../util/index.js";

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
    return filteredPlayers.map(({ NickName, MemberId, UserIcon, RealName }) => {
      return (
        <li className="player" key={MemberId}>
          <Link to={`${customPath}/players/${MemberId}`}>
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
    return positionArr.map(({ Place, CNName, ENName }) => {
      return (
        <TabPane
          tab={
            <span className="tabTitle">
              <svg className="filter-button--icon">
                <use xlinkHref={`#icon-position-${ENName}`} />
              </svg>
              {CNName}
            </span>
          }
          key={Place}
        >
          <ul className="playerList">{this.renderPlayersByPosition(Place)}</ul>
        </TabPane>
      );
    });
  }
  render() {
    return (
      <div className="positionTab">
        {this.props.isFetching ? (
          <div className="loading">
            <Icon type="loading" style={{ fontSize: 50 }} spin />
            <div>loading...</div>
          </div>
        ) : (
          <Tabs defaultActiveKey="1" tabPosition="top">
            {this.renderTabs()}
          </Tabs>
        )}
      </div>
    );
  }
}

function mapStateToProps({ players, playersPending }) {
  return {
    players,
    isFetching: playersPending
  };
}

export default connect(mapStateToProps, { fetchPlayers })(SlidingTabsDemo);
