import { combineReducers } from "redux";

import PlayersReducer from "../reducers/reducer-players.js";
import MatchListReducer from "../reducers/reducer-player-match-list.js";

const rootReducer = combineReducers({
	players: PlayersReducer,
	matchList: MatchListReducer
});

export default rootReducer;
