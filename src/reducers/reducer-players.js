import { FETCH_PLAYERS, FULFILLED } from "../actions/index.js";

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_PLAYERS + FULFILLED:
			return [...action.payload.data];

		default:
			return state;
	}
}
