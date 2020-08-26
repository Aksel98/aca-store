import { initialState } from './reducers';
import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from '../types';
import { db } from '../../firebase/Firebase';



const favouriteReducer = (state = initialState.favourites, action) => {
    switch (action.type) {
        case ADD_TO_FAVOURITES: {
            return action.payload
        }

        case REMOVE_FROM_FAVOURITES: {

            return action.payload
        }
        default:
            return state
    }
}
export default favouriteReducer
