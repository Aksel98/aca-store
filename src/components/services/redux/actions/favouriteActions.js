import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from "../types"

export const addToFav = (id, user) => {
    return {
        type: ADD_TO_FAVOURITES,
        id,
        user
    }
}
export const removeFromFav = (id, user) => {
    return {
        type: REMOVE_FROM_FAVOURITES,
        id,
        user
    }
}