import {combineReducers} from "redux"
import userReducer from "./userReducer";
import favouriteReducer from "./favouriteReducer";
import basketReducer from "./basketReducer";
import uiReducer from "./uiReducer";

export const initialState = {
    user: false,
    basketItems: JSON.parse(localStorage.getItem('basketItems')) || [],
    favourites: JSON.parse(localStorage.getItem('favourites')) || [],
    ui: {
        error: false,
        success: ''
    },
}

const allReducers = combineReducers({
    user: userReducer,
    basket: basketReducer,
    favourites: favouriteReducer,
    ui: uiReducer,
});

export default allReducers
