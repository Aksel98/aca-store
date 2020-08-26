import {initialState} from './reducers';
import {ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES} from '../types';

const favouriteReducer = (state = initialState.favourites, action) => {
    switch (action.type) {
        case ADD_TO_FAVOURITES: {
            const newState = [...state];
            newState.push(action.id);
            localStorage.setItem('favourites', JSON.stringify(newState))
            return newState;
        }

        case REMOVE_FROM_FAVOURITES: {
            const newState = [...state];
            newState.splice(newState.indexOf(action.id), 1);
            localStorage.setItem('favourites', JSON.stringify(newState))
            return newState;
        }
        default:
            return state
    }
}
export default favouriteReducer
