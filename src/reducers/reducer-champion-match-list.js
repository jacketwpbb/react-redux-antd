import {
	FETCH_CHAMPION_MATCH_LIST,
	FULFILLED,
	PENDING
} from "../actions/index.js";

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_CHAMPION_MATCH_LIST + FULFILLED:
			return [...action.payload.data];

		default:
			return state;
	}
}
