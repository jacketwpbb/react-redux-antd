import { combineReducers } from "redux";

import PlayersReducer from "../reducers/reducer-players.js";
import MatchListReducer from "../reducers/reducer-player-match-list.js";
import PendingReducer from "./reducer-pending.js";

const rootReducer = combineReducers({
	players: PlayersReducer,
	matchList: MatchListReducer,
	isFetching: PendingReducer
});

export default rootReducer;
