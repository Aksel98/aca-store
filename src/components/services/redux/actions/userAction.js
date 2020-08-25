import {SET_ERROR, SET_SUCCESS, SET_USER} from "../types"
import {auth, db} from "../../firebase/Firebase";
import {HOME_URL} from "../../../main/constants/navigations";
import firebase from "firebase";

export const signInGoogle = (history, afterSuccessNavUrl = HOME_URL) => (dispatch) =>  {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
        history.push(afterSuccessNavUrl)
        dispatch({
            type: SET_SUCCESS,
            payload: "Success"
        })
    }).catch(err => {
        dispatch({
            type: SET_ERROR,
            payload: err.message
        })
    })
}

export const signInFacebook = (history, afterSuccessNavUrl = HOME_URL) => (dispatch) =>  {
    auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(() => {
        history.push(afterSuccessNavUrl)
        dispatch({
            type: SET_SUCCESS,
            payload: "Success"
        })
    }).catch(err => {
        dispatch({
            type: SET_ERROR,
            payload: err.message
        })
    })
}

export const signInGithub = (history, afterSuccessNavUrl = HOME_URL) => (dispatch) => {
    auth.signInWithPopup(new firebase.auth.GithubAuthProvider()).then(() => {
        history.push(afterSuccessNavUrl)
        dispatch({
            type: SET_SUCCESS,
            payload: "Success"
        })
    }).catch(err => {
        dispatch({
            type: SET_ERROR,
            payload: err.message
        })
    })
}

export const signInPhoneNumber = (history, afterSuccessNavUrl = HOME_URL) => (dispatch) => {
    auth.signInWithPopup(new firebase.auth.PhoneAuthProvider()).then(() => {
        history.push(afterSuccessNavUrl)
        dispatch({
            type: SET_SUCCESS,
            payload: "Success"
        })
    }).catch(err => {
        dispatch({
            type: SET_ERROR,
            payload: err.message
        })
    })
}

export const signInUser = (email, password, history, setPassword) => (dispatch) => {
    auth.signInWithEmailAndPassword(email, password).then(() => {
        dispatch(getUserData())
        dispatch({
            type: SET_SUCCESS,
            payload: "Success"
        })
        history.push(HOME_URL)
    }).catch(err => {
        dispatch({
            type: SET_ERROR,
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
            history.push(HOME_URL)
            dispatch({
                type: SET_SUCCESS,
                payload: "Success"
            })
        })
        .catch(err => {
            dispatch({
                type: SET_ERROR,
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
