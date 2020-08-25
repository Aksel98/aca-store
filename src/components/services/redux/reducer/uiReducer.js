import {SET_ERROR, SET_SUCCESS} from "../types";
import {initialState} from "./reducers";

export default function (state = initialState.ui, action) {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
            case SET_SUCCESS:
            return {
                ...state,
                success: action.payload
            }
        default:
            return state
    }
}
