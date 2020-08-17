import { combineReducers } from "redux"
import currentUserReducer from "./currenUser";
import counterReducer from './counterReducer';

const allReducers = combineReducers({
    // currentUser: currentUserReducer,
    counter: counterReducer
});

export default allReducers
