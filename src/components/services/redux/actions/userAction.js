import {SET_USER} from "../types"
import {auth, db} from "../../firebase/Firebase";
import firebase from "firebase";
import {getError, getSuccess} from "./uiActions";
import {USER} from "../../../main/constants/types";
import {setFavourites} from "./favouriteActions";

export const signInGoogle = (history) => (dispatch) => {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => {
        putUserData(res)
        history.goBack()
        dispatch(getSuccess('Success'))
    }).catch(err => {
        dispatch(getError(err.message))
    })
}

export const signInFacebook = (history) => (dispatch) => {
    auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {
        putUserData(res)
        history.goBack()
        dispatch(getSuccess('Success'))
    }).catch(err => {
        dispatch(getError(err.message))
    })
}

export const signInGithub = (history) => (dispatch) => {
    auth.signInWithPopup(new firebase.auth.GithubAuthProvider()).then(res => {
        putUserData(res)
        history.goBack()
        dispatch(getSuccess('Success'))
    }).catch(err => {
        dispatch(getError(err.message))
    })
}

export const signInPhoneNumber = (history) => (dispatch) => {
    auth.signInWithPopup(new firebase.auth.PhoneAuthProvider()).then(res => {
        putUserData(res)
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
                favItems: [],
                type: USER
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
                localStorage.setItem('favourites', JSON.stringify(res.data()?.favItems || []))
                if (res.data()?.favItems) {
                    dispatch(setFavourites(res.data().favItems))
                }
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
        localStorage.removeItem('favourites')
        dispatch({
            type: SET_USER,
            payload: null
        })
    }).catch(err => {
        dispatch(getError(err.message))
    })
}

export const putUserData = (data) => {
    if (data.additionalUserInfo.isNewUser) {
        return db.collection('users').doc(data.user.uid).set({
            name: data.user.displayName?.split(' ')[0],
            surname: data.user.displayName?.split(' ')[1],
            email: data.user.email,
            favItems: [],
            type: USER
        })
    }
}
