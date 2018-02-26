import React, { Component } from "react";

import "./App.css";
import Nav from "../src/component/Nav/index.js";
import Home from "../src/component/Home/index.js";
import PlayerDetail from "../src/component/PlayerDetail/index.js";
import ChampionDetail from "../src/component/ChampionDetail/index.js";

import PositionTab from "../src/component/PositionTab/index.js";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ChampionList from "../src/component/ChampionList/index.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/" component={Nav} />
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/players/:MemberId" component={PlayerDetail} />
              <Route path="/players" component={PositionTab} />
              <Route
                path="/champions/:ChampionName"
                component={ChampionDetail}
              />
              <Route path="/champions" component={ChampionList} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
