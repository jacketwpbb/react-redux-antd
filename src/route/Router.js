import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AsyncComponent from "../component/AsyncComponent";

import Nav from "../component/Nav/index.js";

import link from "./routeLinkConfig.js";

const Home = props => (
  <AsyncComponent
    {...props}
    load={() => import("../component/HOME/index.js")}
  />
);
const PlayerList = props => (
  <AsyncComponent
    {...props}
    load={() => import("../component/PlayerList/index.js")}
  />
);
const ChampionList = props => (
  <AsyncComponent
    {...props}
    load={() => import("../component/ChampionList/index.js")}
  />
);

const PlayerDetail = props => (
  <AsyncComponent
    {...props}
    load={() => import("../component/PlayerDetail/index.js")}
  />
);
const ChampionDetail = props => (
  <AsyncComponent
    {...props}
    load={() => import("../component/ChampionDetail/index.js")}
  />
);

export default props => {
  return (
    <Router>
      <div>
        <Route path={`${link}/`} component={Nav} />
        <Switch>
          <Route path={`${link}/home`} component={Home} />
          <Route path={`${link}/players/:MemberId`} component={PlayerDetail} />
          <Route path={`${link}/players`} component={PlayerList} />
          <Route
            path={`${link}/champions/:ChampionName`}
            component={ChampionDetail}
          />
          <Route path={`${link}/champions`} component={ChampionList} />

          <Route path={`${link}/`} exact component={Home} />
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    </Router>
  );
};
