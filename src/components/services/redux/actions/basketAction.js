import {ADD_TO_BASKET, DECREMENT, INCREMENT, REMOVE_BASKET, REMOVE_FROM_BASKET, UPDATE_PRICE} from "../types";

export const addToBasket = (id, price, device, model, quantity = 1) => (dispatch) => {
    dispatch({
        type: ADD_TO_BASKET,
        id,
        price,
        device,
        model,
        quantity,
    })
}

export const removeFromBasket = (id) => (dispatch) => {
    dispatch({
        type: REMOVE_FROM_BASKET,
        id
    })
}

export const updatePrice = (price, id) => (dispatch) => {
    dispatch({
        type: UPDATE_PRICE,
        payload: {price, id}
    })
}

export const removeBasket = () => (dispatch) => {
    dispatch({
        type: REMOVE_BASKET,
    })
}

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
