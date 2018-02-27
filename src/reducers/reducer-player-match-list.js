import { FETCH_PLAYER_MATCH_LIST, FULFILLED } from "../actions/index.js";

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_PLAYER_MATCH_LIST + FULFILLED:
			return [...action.payload.data];

		default:
			return state;
	}
}
