import {initialState} from './reducers';
import {ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES, SET_FAVOURITES} from '../types';
import {db} from "../../firebase/Firebase";

const favouriteReducer = (state = initialState.favourites, action) => {
    switch (action.type) {
        case SET_FAVOURITES: {
            return action.state;
        }
        case ADD_TO_FAVOURITES: {
            const newState = [...state];
            newState.push(action.favId)
            if (action.uid) {
                db.collection('users').doc(action.uid).set({
                    favItems: newState
                }, {merge: true})
            }
            localStorage.setItem('favourites', JSON.stringify(newState))
            return newState;
        }

        case REMOVE_FROM_FAVOURITES: {
            const newState = [...state];
            newState.splice(newState.indexOf(action.favId), 1);
            if (action.uid) {
                db.collection('users').doc(action.uid).set({
                    favItems: newState
                }, {merge: true})
            }
            localStorage.setItem('favourites', JSON.stringify(newState))
            return newState;
        }
        default:
            return state
    }
}
export default favouriteReducer
