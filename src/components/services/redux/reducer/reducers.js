import { combineReducers } from "redux"
import userReducer from "./userReducer";
import uiReducer from "./uiReducer";
import favouriteReducer from "./favouriteReducer";
import basketReducer from "./basketReducer";

export const initialState = {
    user: false,
    basketItems: JSON.parse(localStorage.getItem('basketItems')) || [],
    favourites: JSON.parse(localStorage.getItem('favourites')) || [],
}

const allReducers = combineReducers({
    user: userReducer,
    basket: basketReducer,
    ui: uiReducer,
    favourites: favouriteReducer,
});

export default allReducers
