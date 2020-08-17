const initialState = []
const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_FAVOURITES:
            return
        case REMOVE_FROM_FAVORITES:
            return
        default:
            return state
    }
}