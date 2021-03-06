import {
	FETCH_PLAYER_MATCH_LIST,
	FETCH_CHAMPION_MATCH_LIST,
	FETCH_PLAYERS,
	FETCH_ACTIVE_CHAMPION,
	FETCH_HOMEPAGE_STATS,
	FETCH_LOLJSON,
	FULFILLED,
	PENDING,
	REJECTED
} from "../actions/index.js";

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_LOLJSON + PENDING:
			return { ...state, lolJsonPending: true };
		case FETCH_LOLJSON + FULFILLED:
		case FETCH_LOLJSON + REJECTED:
			return { ...state, lolJsonPending: false };

		case FETCH_HOMEPAGE_STATS + PENDING:
			return { ...state, homePagePending: true };
		case FETCH_HOMEPAGE_STATS + FULFILLED:
		case FETCH_HOMEPAGE_STATS + REJECTED:
			return { ...state, homePagePending: false };

		case FETCH_PLAYER_MATCH_LIST + PENDING:
			return { ...state, matchListPending: true };
		case FETCH_PLAYER_MATCH_LIST + FULFILLED:
		case FETCH_PLAYER_MATCH_LIST + REJECTED:
			return { ...state, matchListPending: false };

		case FETCH_ACTIVE_CHAMPION + PENDING:
			return { ...state, activeChampionPending: true };
		case FETCH_ACTIVE_CHAMPION + FULFILLED:
		case FETCH_ACTIVE_CHAMPION + REJECTED:
			return { ...state, activeChampionPending: false };

		case FETCH_CHAMPION_MATCH_LIST + PENDING:
			return { ...state, championMatchListPending: true };
		case FETCH_CHAMPION_MATCH_LIST + FULFILLED:
		case FETCH_CHAMPION_MATCH_LIST + REJECTED:
			return { ...state, championMatchListPending: false };

		case FETCH_PLAYERS + PENDING:
			return { ...state, playersPending: true };
		case FETCH_PLAYERS + FULFILLED:
		case FETCH_PLAYERS + REJECTED:
			return { ...state, playersPending: false };

		default:
			return state;
	}
}
