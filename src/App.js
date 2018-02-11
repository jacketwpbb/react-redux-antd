import React, { Component } from "react";

import "./App.css";
import Home from "../src/component/HOME/index.js";
import PlayerDetail from "../src/component/PlayerDetail/index.js";

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">header</header>

        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/players/:MemberId" component={PlayerDetail} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
