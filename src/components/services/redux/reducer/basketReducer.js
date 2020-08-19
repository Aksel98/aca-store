import {ADD_TO_BASKET, DECREMENT, INCREMENT, REMOVE_FROM_BASKET} from "../types";
import {initialState} from "./reducers";

export default function (state = initialState.basketItems, action) {
    switch (action.type) {
        case INCREMENT: {
            let newState = [...state];
            newState.forEach(item => {
                if (item.id === action.id) {
                    item.quantity += 1;
                    item.subtotal = item.quantity * item.price
                }
            })
            localStorage.setItem('basketItems', JSON.stringify(newState))
            return newState
        }
        case DECREMENT: {
            let newState = [...state];
            newState.forEach(item => {
                if (item.id === action.id) {
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                        item.subtotal = item.quantity * item.price
                    }
                }
            })
            localStorage.setItem('basketItems', JSON.stringify(newState))
            return newState
        }
        case REMOVE_FROM_BASKET: {
            let newState = [...state];
            newState = newState.filter(item => item.id !== action.id)
            localStorage.setItem('basketItems', JSON.stringify(newState))
            return newState
        }
        case ADD_TO_BASKET: {
            let newState = [...state];
            newState.push({id: action.id, price: action.price, quantity: action.quantity, device: action.device});
            localStorage.setItem('basketItems', JSON.stringify(newState))
            return newState
        }
        default:
            return state
    }
}
