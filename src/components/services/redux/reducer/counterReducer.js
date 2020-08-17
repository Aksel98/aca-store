import { INCREMENT, DECREMENT, REMOVE_ITEM, ADD_ITEM } from "../constantsredux";

const initialState = JSON.parse(localStorage.getItem('itemDetails')) || []

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            {
                let newState = [...state];
                newState.forEach(item => {
                    if (item.id === action.id) {
                        item.quantity += 1; item.subtotal = item.quantity * item.price
                    }
                })
                localStorage.setItem('itemDetails', JSON.stringify(newState))
                return newState
            }
        case DECREMENT:
            {
                let newState = [...state];
                newState.forEach(item => {
                    if (item.id === action.id) {
                        if (item.quantity > 1) { item.quantity -= 1; item.subtotal = item.quantity * item.price }
                    }
                })
                localStorage.setItem('itemDetails', JSON.stringify(newState))
                return newState
            }
        case REMOVE_ITEM:
            {
                let newState = [...state];
                newState = newState.filter(item => item.id !== action.id)
                localStorage.setItem('itemDetails', JSON.stringify(newState))
                return newState
            }
        case ADD_ITEM:
            {
                let newState = [...state];
                newState.push({ id: action.id, price: action.price, quantity: action.quantity });
                localStorage.setItem('itemDetails', JSON.stringify(newState))
                return newState
            }
        default:
            return state
    }
}

export default counterReducer;
