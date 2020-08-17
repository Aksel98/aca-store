import {auth} from "../firebase/Firebase";
import firebase from "firebase";
import {HOME_URL} from "./Navigations";

export function signInGoogle(history, afterSuccessNavUrl = HOME_URL) {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
        history.push(afterSuccessNavUrl)
    })
}

export function signInFacebook(history, afterSuccessNavUrl = HOME_URL) {
    auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(() => {
        history.push(afterSuccessNavUrl)
    })
}

export function signInGithub(history, afterSuccessNavUrl = HOME_URL) {
    auth.signInWithPopup(new firebase.auth.GithubAuthProvider()).then(() => {
        history.push(afterSuccessNavUrl)
    })
}

export function signInPhoneNumber(history, afterSuccessNavUrl = HOME_URL) {
    auth.signInWithPopup(new firebase.auth.PhoneAuthProvider()).then(() => {
        history.push(afterSuccessNavUrl)
    })
}
