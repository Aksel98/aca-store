import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from "../types"
import { db } from "../../firebase/Firebase";

export const addToFav = (id, uid) => (dispatch) => {
    let newState = [];
    let tempArr = [];
    db.collection('users').doc(uid).get().then((info) => {
        if (info.data().favourites?.length) {
            tempArr = [...info.data().favourites]
        };
        return tempArr
    })
        .then((tempArr) => (tempArr.indexOf(id) < 0 ? tempArr.push(id) : null))
        .then((newState) => {
            db.collection('users').doc(uid).set({
                favourites: [...newState]
            },
                {
                    merge: true
                }
            )

        })
        .catch(e => console.log('issue with saving favourites'))
}

export const removeFromFav = (id, uid) => (dispatch) => {
    let newState = [];
    let tempArr = [];
    db.collection('users').doc(uid).get()
        .then((info) => {
            if (info.data().favourites && info.data().favourites.length) {
                tempArr = [...info.data().favourites]
            };
            return tempArr
        })
        .then((tempArr) => {
            let index = tempArr.indexOf(id);
            console.log(index);
            tempArr.splice(index, 1)
        })
        .then(() => {
            newState = [...tempArr];
            return newState
        })
        .then((newState) => {
            db.collection('users').doc(uid).set(
                {
                    favourites: [...newState]
                }, { merge: true }
            )

        })
        .catch(e => console.log('issue with deleting from favourites'))

}