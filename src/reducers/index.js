import { combineReducers } from "redux";

import PlayersReducer from "../reducers/reducer-players.js";
import MatchListReducer from "../reducers/reducer-player-match-list.js";
import PendingReducer from "./reducer-pending.js";
import championMatchListReducer from "./reducer-champion-match-list.js";
import activeChampionReducer from "./reducer-active-champion.js";
import homePageStatsReducer from "./reducer-home-page-stats.js";

import lolJsonReducer from "./reducer-LOLJson.js";

const rootReducer = combineReducers({
	players: PlayersReducer,
	matchList: MatchListReducer,
	isFetching: PendingReducer,
	championMatchList: championMatchListReducer,
	activeChampions: activeChampionReducer,
	homePageStats: homePageStatsReducer,
	lolJSON: lolJsonReducer
});

export default rootReducer;
