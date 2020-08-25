import {ADD_TO_BASKET, DECREMENT, INCREMENT, REMOVE_FROM_BASKET, UPDATE_PRICE} from "../types";
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
        case ADD_TO_BASKET: {
            let newState = [...state];
            const {id, price, quantity, device} = action
            const currentIndex = newState.findIndex(item => item.id === id)
            currentIndex === -1 ? newState.push({
                id,
                price,
                quantity,
                device
            }) : newState[currentIndex].quantity = action.quantity
            localStorage.setItem('basketItems', JSON.stringify(newState))
            return newState
        }
        case REMOVE_FROM_BASKET: {
            let newState = [...state];
            newState = newState.filter(item => item.id !== action.id)
            localStorage.setItem('basketItems', JSON.stringify(newState))
            return newState
        }
        case UPDATE_PRICE: {
            let newState = [...state];
            const currentIndex = newState.findIndex(item => item?.id === action.payload.id)
            if (currentIndex !== -1) {
                newState[currentIndex].price = action.payload.price
                localStorage.setItem('basketItems', JSON.stringify(newState))
            }
            return newState
        }
        default:
            return state
    }
}
