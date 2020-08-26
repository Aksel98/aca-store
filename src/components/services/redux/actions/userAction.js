import {SET_USER} from "../types"
import {auth, db} from "../../firebase/Firebase";
import firebase from "firebase";
import {getError, getSuccess} from "./uiActions";

export const signInGoogle = (history) => (dispatch) =>  {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
        history.goBack()
        dispatch(getSuccess('Success'))
    }).catch(err => {
        dispatch(getError(err.message))
    })
}

export const signInFacebook = (history) => (dispatch) =>  {
    auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(() => {
        history.goBack()
        dispatch(getSuccess('Success'))
    }).catch(err => {
        dispatch(getError(err.message))
    })
}

export const signInGithub = (history) => (dispatch) => {
    auth.signInWithPopup(new firebase.auth.GithubAuthProvider()).then(() => {
        history.goBack()
        dispatch(getSuccess('Success'))
    }).catch(err => {
        dispatch(getError(err.message))
    })
}

export const signInPhoneNumber = (history) => (dispatch) => {
    auth.signInWithPopup(new firebase.auth.PhoneAuthProvider()).then(() => {
        history.goBack()
        dispatch(getSuccess('Success'))
    }).catch(err => {
        dispatch(getError(err.message))
    })
}

export const signInUser = (email, password, history, setPassword) => (dispatch) => {
    auth.signInWithEmailAndPassword(email, password).then(() => {
        dispatch(getUserData())
        dispatch(getSuccess('Success'))
        history.goBack()
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
                email: email,
                type: 'user'
            })
        })
        .then(() => {
            dispatch(getUserData())
            history.goBack()
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
        if (user) {
            db.collection('users').doc(user.uid).get().then(res => {
                return res.data()?.type
            }).then(userType => {
                dispatch({
                    type: SET_USER,
                    payload: {...user, type: userType}
                })
            })
        } else {
            dispatch({
                type: SET_USER,
                payload: user
            })
        }
    })
}

export const logoutUser = () => (dispatch) => {
    auth.signOut().then(() => {
        window.location.reload()
        dispatch({
            type: SET_USER,
            payload: null
        })
    }).catch(err => {
        dispatch(getError(err.message))
    })
}
