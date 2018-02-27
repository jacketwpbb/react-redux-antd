import { FETCH_ACTIVE_CHAMPION, FULFILLED } from "../actions/index.js";

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_ACTIVE_CHAMPION + FULFILLED:
			return [...action.payload.data];

		default:
			return state;
	}
}
