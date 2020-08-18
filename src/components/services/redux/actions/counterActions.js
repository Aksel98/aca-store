import {ADD_ITEM, DECREMENT, INCREMENT, REMOVE_ITEM} from "../types";

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
export const addItem = (id, price, device, quantity = 1) => {
    return {
        type: ADD_ITEM,
        id,
        price,
        quantity,
        device
    }
}
