import { initialState } from './reducers';
import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from '../types';
import { db } from '../../firebase/Firebase';



const favouriteReducer = (state = initialState.favourites, action) => {
    switch (action.type) {
        case ADD_TO_FAVOURITES: {
            let newState = [];
            let tempArr = [];
            db.collection('users').doc(action.uid).get()
                .then((info) => { if (info.data().favourites && info.data().favourites.length) { tempArr = [...info.data().favourites] }; return tempArr })
                .then((tempArr) => (tempArr.indexOf(action.id) < 0 ? tempArr.push(action.id) : null
                ))
                .then(() => { newState = [...tempArr]; return newState })
                .then((newState) => {
                    db.collection('users').doc(action.uid).set(
                        {
                            favourites: [...newState]
                        }, { merge: true }
                    )

                })
                .catch(e => console.log('issue with saving favourites'))

            return newState = [...newState];
        }

        case REMOVE_FROM_FAVOURITES: {
            let newState = [];
            let tempArr = [];
            db.collection('users').doc(action.uid).get()
                .then((info) => { if (info.data().favourites && info.data().favourites.length) { tempArr = [...info.data().favourites] }; return tempArr })
                .then((tempArr) => { let index = tempArr.indexOf(action.id); console.log(index); tempArr.splice(index, 1) }
                )
                .then(() => { newState = [...tempArr]; return newState })
                .then((newState) => {
                    db.collection('users').doc(action.uid).set(
                        {
                            favourites: [...newState]
                        }, { merge: true }
                    )

                })
                .catch(e => console.log('issue with deleting from favourites'))
            // const newState = [...state];
            // newState.splice(newState.indexOf(action.id), 1);
            // localStorage.setItem('favourites', JSON.stringify(newState))
            return newState;
        }
        default:
            return state
    }
}
export default favouriteReducer
