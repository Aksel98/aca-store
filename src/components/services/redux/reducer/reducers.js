import {combineReducers} from "redux"
import currentUserReducer from "./currenUser";

const allReducers = combineReducers({
    currentUser: currentUserReducer
})

export default allReducers
