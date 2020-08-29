import {ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES, SET_FAVOURITES} from "../types";

export const setFavourites = (state) => (dispatch) => {
    dispatch({
        type: SET_FAVOURITES,
        state
    })
}


export const addToFav = (favId, uid) => (dispatch) => {
    dispatch({
        type: ADD_TO_FAVOURITES,
        favId,
        uid
    })
}

export const removeFromFav = (favId, uid) => {
    return {
        type: REMOVE_FROM_FAVOURITES,
        favId,
        uid
    }
}
