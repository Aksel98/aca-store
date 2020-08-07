import {auth} from "../services/Firebase";
import firebase from "firebase";
import {HOME_URL} from "./Navigations";
import {useHistory} from "react-router-dom";

export function signInGoogle(afterSuccessNavUrl = HOME_URL) {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
        useHistory().push(afterSuccessNavUrl)
    })
}

export function signInFacebook(afterSuccessNavUrl = HOME_URL) {
    auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(() => {
        useHistory().push(afterSuccessNavUrl)
    })
}

export function signInGithub(afterSuccessNavUrl = HOME_URL) {
    auth.signInWithPopup(new firebase.auth.GithubAuthProvider()).then(() => {
        useHistory().push(afterSuccessNavUrl)
    })
}

export function signInPhoneNumber(afterSuccessNavUrl = HOME_URL) {
    auth.signInWithPopup(new firebase.auth.PhoneAuthProvider()).then(() => {
        useHistory().push(afterSuccessNavUrl)
    })
}
