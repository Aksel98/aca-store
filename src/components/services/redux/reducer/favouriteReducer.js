const initialState = []
const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_FAVOURITES:
            let newState = [...state];
            newState.push(action.id);
            return newState;

        case REMOVE_FROM_FAVORITES:
            let newState = [...state];
            newState.splice(newState.indexOf(action.id), 1);
            return newState;
        default:
            return state
    }
}