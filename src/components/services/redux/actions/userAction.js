import {CLEAR_ERRORS, SET_ERRORS, SET_USER} from "../types"
import {auth, db} from "../../firebase/Firebase";
import {HOME_URL} from "../../api/Navigations";
import firebase from "firebase";

export const signInUser = (email, password, history, setPassword) => (dispatch) => {
    auth.signInWithEmailAndPassword(email, password).then(() => {
        dispatch(getUserData())
        dispatch({type: CLEAR_ERRORS})
        history.push(HOME_URL)
    }).catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.message
        })
    }).finally(() => {
        setPassword('')
    })
}

export const signUpUser = (email, password, name, surname, history, setPassword) => (dispatch) => {
    auth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
            return result.user.updateProfile({
                displayName: name + ' ' + surname
            })
        })
        .then(() => {
            const user = firebase.auth().currentUser
            return db.collection('users').doc(user.uid).set({
                name: name,
                surname: surname,
                email: email
            })
        })
        .then(() => {
            dispatch(getUserData())
            dispatch({type: CLEAR_ERRORS})
            history.push(HOME_URL)
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.message
            })
        }).finally(() => {
        setPassword('')
    })
}

export const getUserData = () => (dispatch) => {
    auth.onAuthStateChanged(user => {
        dispatch({
            type: SET_USER,
            payload: user
        })
    })
}

export const logoutUser = () => (dispatch) => {
    auth.signOut().then(() => {
        dispatch({
            type: SET_USER,
            payload: null
        })
    })
}
