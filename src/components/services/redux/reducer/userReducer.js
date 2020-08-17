import {LOGOUT, SET_USER} from "../types";
import {initialState} from "./reducers";

export default function (state = initialState.user, action) {
    switch (action.type) {
        case LOGOUT:
            return action.payload
        case SET_USER:
            return action.payload
        default:
            return state
    }
}
