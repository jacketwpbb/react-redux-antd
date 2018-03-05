import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchLOLJson } from "./actions/index.js";

import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AsyncComponent from "../src/component/AsyncComponent";

import Nav from "../src/component/Nav/index.js";
// import Home from "../src/component/Home/index.js";
// import PlayerList from "../src/component/PlayerList/index.js";
// import ChampionList from "../src/component/ChampionList/index.js";

// import PlayerDetail from "../src/component/PlayerDetail/index.js";
// import ChampionDetail from "../src/component/ChampionDetail/index.js";
//

const Home = props => (
  <AsyncComponent
    {...props}
    load={() => import("../src/component/Home/index.js")}
  />
);
const PlayerList = props => (
  <AsyncComponent
    {...props}
    load={() => import("../src/component/PlayerList/index.js")}
  />
);
const ChampionList = props => (
  <AsyncComponent
    {...props}
    load={() => import("../src/component/ChampionList/index.js")}
  />
);

const PlayerDetail = props => (
  <AsyncComponent
    {...props}
    load={() => import("../src/component/PlayerDetail/index.js")}
  />
);
const ChampionDetail = props => (
  <AsyncComponent
    {...props}
    load={() => import("../src/component/ChampionDetail/index.js")}
  />
);

class App extends Component {
  componentWillMount() {
    this.props.fetchLOLJson("8.4.1");
  }
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/" component={Nav} />
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/players/:MemberId" component={PlayerDetail} />
              <Route path="/players" component={PlayerList} />
              <Route
                path="/champions/:ChampionName"
                component={ChampionDetail}
              />
              <Route path="/champions" component={ChampionList} />

              <Route path="/" exact component={Home} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps({ lolJSON }) {
  return {
    lolJSON
  };
}

export default connect(mapStateToProps, { fetchLOLJson })(App);
