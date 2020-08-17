import {combineReducers} from "redux"
import userReducer from "./userReducer";
import uiReducer from "./uiReducer";

export const initialState = {
    user: false
}

const allReducers = combineReducers({
    user: userReducer,
    ui: uiReducer
})

export default allReducers
