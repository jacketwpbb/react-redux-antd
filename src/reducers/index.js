import { combineReducers } from "redux";

import PlayersReducer from "../reducers/reducer-players.js";
import MatchListReducer from "../reducers/reducer-player-match-list.js";
import PendingReducer from "./reducer-pending.js";
import championMatchListReducer from "./reducer-champion-match-list.js";

const rootReducer = combineReducers({
	players: PlayersReducer,
	matchList: MatchListReducer,
	isFetching: PendingReducer,
	championMatchList: championMatchListReducer
});

export default rootReducer;
