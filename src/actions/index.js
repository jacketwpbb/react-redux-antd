import axios from "axios";

export const FETCH_PLAYERS = "fetch_players";
export const FETCH_PLAYER_MATCH_LIST = "fetch_player_list";

const ROOT_URL = "/lolapi/api";

export function fetchPlayers() {
	const request = axios.get(`${ROOT_URL}/getLPLMemberInfo.ashx`);
	return {
		type: FETCH_PLAYERS,
		payload: request
	};
}

export function fetchPlayerMatchList(id) {
	const request = axios.get(
		`${ROOT_URL}/getLPLMatchResult.ashx?type=member&id=${id}`
	);
	return {
		type: FETCH_PLAYER_MATCH_LIST,
		payload: request
	};
}

// https://app.tuwan.com/lolapi/api/getLPLMatchResult.ashx?type=member&id=53

// export function createPost(values, callback) {
// 	const request = axios
// 		.post(`${ROOT_URL}/posts${API_KEY}`, values)
// 		.then(() => callback());
// 	return {
// 		type: CREATE_POST,
// 		payload: request
// 	};
// }
