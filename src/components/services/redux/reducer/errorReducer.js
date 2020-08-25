import {SET_ERRORS} from "../types";
import {initialState} from "./reducers";

export default function (state = initialState.error, action) {
    switch (action.type) {
        case SET_ERRORS:
            return action.payload
        default:
            return state
    }
}
