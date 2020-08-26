import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from "../types"

export const addToFav = (id, uid) => {
    return {
        type: ADD_TO_FAVOURITES,
        id,
        uid
    }
}
export const removeFromFav = (id, uid) => {
    return {
        type: REMOVE_FROM_FAVOURITES,
        id,
        uid
    }
}