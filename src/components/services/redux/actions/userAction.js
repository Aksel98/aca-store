import {SET_USER} from "../types"
import {auth, db} from "../../firebase/Firebase";
import {HOME_URL} from "../../../main/constants/navigations";
import firebase from "firebase";
import {getError, getSuccess} from "./uiActions";

export const signInGoogle = (history, afterSuccessNavUrl = HOME_URL) => (dispatch) =>  {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
        history.push(afterSuccessNavUrl)
        dispatch(getSuccess('Success'))
    }).catch(err => {
        dispatch(getError(err.message))
    })
}

export const signInFacebook = (history, afterSuccessNavUrl = HOME_URL) => (dispatch) =>  {
    auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(() => {
        history.push(afterSuccessNavUrl)
        dispatch(getSuccess('Success'))
    }).catch(err => {
        dispatch(getError(err.message))
    })
}

export const signInGithub = (history, afterSuccessNavUrl = HOME_URL) => (dispatch) => {
    auth.signInWithPopup(new firebase.auth.GithubAuthProvider()).then(() => {
        history.push(afterSuccessNavUrl)
        dispatch(getSuccess('Success'))
    }).catch(err => {
        dispatch(getError(err.message))
    })
}

export const signInPhoneNumber = (history, afterSuccessNavUrl = HOME_URL) => (dispatch) => {
    auth.signInWithPopup(new firebase.auth.PhoneAuthProvider()).then(() => {
        history.push(afterSuccessNavUrl)
        dispatch(getSuccess('Success'))
    }).catch(err => {
        dispatch(getError(err.message))
    })
}

export const signInUser = (email, password, history, setPassword) => (dispatch) => {
    auth.signInWithEmailAndPassword(email, password).then(() => {
        dispatch(getUserData())
        dispatch(getSuccess('Success'))
        history.push(HOME_URL)
    }).catch(err => {
        dispatch(getError(err.message))
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
            dispatch(getSuccess('Success'))
        })
        .catch(err => {
            dispatch(getError(err.message))
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
    }).catch(err => {
        dispatch(getError(err.message))
    })
}
