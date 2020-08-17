import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from "../constantsredux"

export const addToFav = (id) => {
    return {
        type: ADD_TO_FAVOURITES,
        id,
    }
}
export const removeFromFav = (id) => {
    return {
        type: REMOVE_FROM_FAVOURITES,
        id,
    }
}