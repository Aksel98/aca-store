import { auth } from "../../firebase/Firebase";

export const LOGGED_IN = 'LOGGED_IN'
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export function authChanged() {
    return function (dispatch) {
        auth.onAuthStateChanged(user => {
            dispatch({
                type: LOGGED_IN,
                currentUser: user
            })
        })
    }
}
export const increment = (id) => {
    return {
        type: INCREMENT,
        id
    }
}
export const decrement = (id) => {
    return {
        type: DECREMENT,
        id
    }
}
export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        id
    }
}