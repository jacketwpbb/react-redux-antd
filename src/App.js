import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchLOLJson } from "./actions/index.js";
import axios from "axios";
import "./App.css";
import Router from "./route/Router.js";

class App extends Component {
  componentWillMount() {
    axios
      .get("http://app.tuwan.com/lolapi/api/getBuildConfig.ashx")
      .then(res => {
        console.log(res);
        this.props.fetchLOLJson(res.data.BuildNumber);
      });

    // this.props.fetchLOLJson("8.4.1");
  }
  render() {
    return (
      <div className="App">
        <Router />
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
