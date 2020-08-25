import { combineReducers } from "redux"
import userReducer from "./userReducer";
import favouriteReducer from "./favouriteReducer";
import basketReducer from "./basketReducer";
import errorReducer from "./errorReducer";

export const initialState = {
    user: false,
    basketItems: JSON.parse(localStorage.getItem('basketItems')) || [],
    favourites: JSON.parse(localStorage.getItem('favourites')) || [],
    error: false,
}

const allReducers = combineReducers({
    user: userReducer,
    basket: basketReducer,
    favourites: favouriteReducer,
    error: errorReducer,
});

export default allReducers
