import {auth} from "../../firebase/Firebase";

export const LOGGED_IN = 'LOGGED_IN'

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
