import { INCREMENT, DECREMENT, REMOVE_ITEM, ADD_ITEM } from "../constantsredux"

export const increment = (id) => {
    return {
        type: INCREMENT,
        id
    }
}
export const decrement = (id) => {
    return {
        type: DECREMENT,
        id
    }
}
export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        id
    }
}
export const addItem = (id, price, quantity = 1) => {
    return {
        type: ADD_ITEM,
        id,
        price,
        quantity
    }
}