import { FETCH_LOLJSON, FULFILLED } from "../actions/index.js";

export default function(
	state = {
		champion: null,
		item: null,
		summoner: null,
		rune: null
	},
	action
) {
	switch (action.type) {
		case FETCH_LOLJSON + FULFILLED:
			return {
				champion: action.payload[0].data,
				item: action.payload[1].data,
				summoner: action.payload[2].data,
				rune: action.payload[3].data
			};

		default:
			return state;
	}
}
