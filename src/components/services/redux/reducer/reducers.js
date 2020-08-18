import { combineReducers } from "redux"
import counterReducer from './counterReducer';
import userReducer from "./userReducer";
import uiReducer from "./uiReducer";

export const initialState = {
    user: false,
    itemDetails: JSON.parse(localStorage.getItem('itemDetails')) || []
}

const allReducers = combineReducers({
    user: userReducer,
    counter: counterReducer,
    ui: uiReducer
});

export default allReducers
