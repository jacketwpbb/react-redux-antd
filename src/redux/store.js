import { createStore, applyMiddleware } from "redux";

import promiseMiddleware from "redux-promise-middleware";

import reducers from "../reducers";

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware())(
	createStore
);

let store = createStoreWithMiddleware(reducers);

export default store;
