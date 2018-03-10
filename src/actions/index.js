import axios from "axios";

export const FETCH_HOMEPAGE_STATS = "fetch_homepage_stats";
export const FETCH_PLAYERS = "fetch_players";
export const FETCH_PLAYER_MATCH_LIST = "fetch_player_list";
export const FETCH_CHAMPION_MATCH_LIST = "fetch_champion_list";
export const FETCH_ACTIVE_CHAMPION = "fetch_active_champion";

export const FETCH_LOLJSON = "fetch_loljson";

export const PENDING = "_PENDING";
export const FULFILLED = "_FULFILLED";
export const REJECTED = "_REJECTED";

const ROOT_URL = "//app.tuwan.com/lolapi/api/";

const LOLJSON_ROOT_URL = "//lolstatic.tuwan.com/cdn/";
// 8.4.1/data/zh_CN/runesReforged.json

function getChampion(patch) {
	return axios.get(`${LOLJSON_ROOT_URL}${patch}/data/zh_CN/champion.json`);
}

function getItem(patch) {
	return axios.get(`${LOLJSON_ROOT_URL}${patch}/data/zh_CN/item.json`);
}
function getSummoner(patch) {
	return axios.get(`${LOLJSON_ROOT_URL}${patch}/data/zh_CN/summoner.json`);
}

function getRunesReforged(patch) {
	return axios.get(
		`${LOLJSON_ROOT_URL}${patch}/data/zh_CN/runesReforged.json`
	);
}

export function fetchLOLJson(patch) {
	const request = axios.all([
		getChampion(patch),
		getItem(patch),
		getSummoner(patch),
		getRunesReforged(patch)
	]);

	return {
		type: FETCH_LOLJSON,
		payload: request
	};
}

export function fetchHomePageStats(week) {
	const url = !week
		? `${ROOT_URL}/getLPLWeeklyData.ashx?t=${Date.now()}`
		: `${ROOT_URL}/getLPLWeeklyData.ashx?&procid=${100 + week * 10}`;

	const request = axios.get(url);
	// https://app.tuwan.com/lolapi/api/getLPLWeeklyData.ashx
	return {
		type: FETCH_HOMEPAGE_STATS,
		payload: request
	};
}

export function fetchPlayers() {
	const request = axios.get(
		`${ROOT_URL}/getLPLMemberInfo.ashx?&t=${Date.now()}`
	);
	return {
		type: FETCH_PLAYERS,
		payload: request
	};
}

export function fetchActiveChampion() {
	const request = axios.get(
		`${ROOT_URL}/getLPLChampionList.ashx?&t=${Date.now()}`
	);
	return {
		type: FETCH_ACTIVE_CHAMPION,
		payload: request
	};
}

export function fetchPlayerMatchList(id) {
	const request = axios.get(
		`${ROOT_URL}/getLPLMatchResult.ashx?type=member&id=${id}&t=${Date.now()}`
	);
	return {
		type: FETCH_PLAYER_MATCH_LIST,
		payload: request
	};
}

export function fetchChampionMatchList(id) {
	const request = axios.get(
		`${ROOT_URL}/getLPLMatchResult.ashx?type=champion&id=${id}&t=${Date.now()}`
	);
	return {
		type: FETCH_CHAMPION_MATCH_LIST,
		payload: request
	};
}

// https://app.tuwan.com/lolapi/api/getLPLMatchResult.ashx?type=champion&id=121
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
