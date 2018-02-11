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
      ({ Place }) => Place === place
    );

    return filteredPlayers.map(({ GameName, MemberId }) => {
      return (
        <li className="player" key={MemberId}>
          <Link to={`/players/${MemberId}`}>
            <img
              src="http://img.crawler.qq.com/lolwebvideo/20180105043550/241a9804c113fe1db62d4ac135cc2675/0"
              alt=""
              className="playerImg"
            />
            <p className="playerName">{GameName}</p>
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
        <Tabs defaultActiveKey="1" tabPosition="left">
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
