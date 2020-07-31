import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCSEdI5JgD6ZHKf6pfLQLVd0cj60avjmzg",
    authDomain: "online-shop-6c690.firebaseapp.com",
    databaseURL: "https://online-shop-6c690.firebaseio.com",
    projectId: "online-shop-6c690",
    storageBucket: "online-shop-6c690.appspot.com",
    messagingSenderId: "310863986745",
    appId: "1:310863986745:web:f69a48f7cdaea09b148de8",
    measurementId: "G-ZEBECM4ES0"
});

const db = firebaseApp.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();
export { db, storageRef };