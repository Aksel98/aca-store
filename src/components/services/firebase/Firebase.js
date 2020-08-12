import firebase from "firebase";
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCSEdI5JgD6ZHKf6pfLQLVd0cj60avjmzg",
    authDomain: "online-shop-6c690.firebaseapp.com",
    databaseURL: "https://online-shop-6c690.firebaseio.com",
    projectId: "online-shop-6c690",
    storageBucket: "online-shop-6c690.appspot.com",
    messagingSenderId: "310863986745",
    appId: "1:310863986745:web:f69a48f7cdaea09b148de8",
    measurementId: "G-ZEBECM4ES0"
};

const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccess: () => false
    }
}

firebase.initializeApp(config)

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const storageRef = firebase.storage().ref();
export {db, auth, storage, storageRef};
