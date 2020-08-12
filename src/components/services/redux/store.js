import {applyMiddleware, createStore} from "redux";
import allReducers from "./reducer/reducers";
import {composeWithDevTools} from "redux-devtools-extension/index";
import logger from "redux-logger";
import thunk from "redux-thunk";

const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)))

export default store
