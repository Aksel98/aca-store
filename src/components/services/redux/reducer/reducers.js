import { combineReducers } from "redux"
import counterReducer from './counterReducer';
import userReducer from "./userReducer";
import uiReducer from "./uiReducer";
import favouriteReducer from "./favouriteReducer";

export const initialState = {
    user: false,
    itemDetails: JSON.parse(localStorage.getItem('itemDetails')) || [],
    favourites: JSON.parse(localStorage.getItem('favourites')) || [],
}

const allReducers = combineReducers({
    user: userReducer,
    counter: counterReducer,
    ui: uiReducer,
    favourites: favouriteReducer,
});

export default allReducers
