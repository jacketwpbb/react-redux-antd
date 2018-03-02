import { FETCH_HOMEPAGE_STATS, FULFILLED } from "../actions/index.js";

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_HOMEPAGE_STATS + FULFILLED:
			return { ...action.payload.data };

		default:
			return state;
	}
}
