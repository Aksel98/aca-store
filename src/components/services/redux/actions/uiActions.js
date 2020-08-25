import {SET_ERROR, SET_SUCCESS} from "../types";

export const getError = (errorMessage) => (dispatch) => {
    dispatch({
        type: SET_ERROR,
        payload: errorMessage
    })
}

export const getSuccess = (successMessage) => (dispatch) => {
    dispatch({
        type: SET_SUCCESS,
        payload: successMessage
    })
}
