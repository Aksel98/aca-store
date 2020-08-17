import React, { useState, useContext, useReducer } from "react";
import { Button, makeStyles } from "@material-ui/core";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { TextField } from '@material-ui/core';
import { GREY, ORANGE, PURPLE, RED, BLUE } from "../../main/constants/Constants";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, removeItem } from '../../services/redux/actions/counterActions'
import { useTranslation } from "react-i18next";
const useStyles = makeStyles({
    mainWrapper: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '10px',
        marginBottom: "10px",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderBottom: `1px solid ${GREY}`,
        padding: '5px',
    },
    itemInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '10px'
    },
    iconsWrapper: {
        height: '2rem',
        display: 'flex',
        flexDirection: 'row',

    },
    itemCount: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '20px',
        marginRight: '20px',

    },
    textField: {
        width: '4rem',
        height: '2rem',
        textAlign: 'center',
        border: `1px solid ${ORANGE}`,
        borderRadius: '3px',

    },
    countText: {
        width: '2rem',
        textAlign: 'center',
        border: `1px solid ${ORANGE}`,
    },
    cartIcon: {
        marginLeft: '10px',
        cursor: 'pointer',
        color: ORANGE,
        '&:hover': {
            color: BLUE,
        }


    }

})


export default function CheckoutItems(props) {

    const classes = useStyles();
    const { image, model, price, id, parameters: info, remove } = props;
    const count = useSelector(state => state.counter)
    const dispatch = useDispatch()
    const [itemData] = count.filter(item => item.id === id)


    return (
        <div>
            <div className={classes.mainWrapper}>
                <img width={'80px'} src={image} alt="" />
                <div className={classes.itemInfo}>
                    <div>{model}</div>

                </div>
                <div className={classes.textField}
                >{price + ' $'}</div>

                <div className={classes.iconsWrapper}>
                    <div className={classes.itemCount} >
                        <RemoveIcon
                            cursor='pointer'
                            onClick={() => dispatch(decrement(id))}
                        />
                        <div className={classes.countText}>
                            {!!itemData && itemData.quantity}
                        </div>

                        <AddIcon
                            cursor='pointer'
                            onClick={() => dispatch(increment(id))}

                        />
                    </div>
                    <div className={classes.textField}>
                        {!!itemData && itemData.quantity * itemData.price}
                    </div>


                    <RemoveShoppingCartIcon
                        className={classes.cartIcon}
                        onClick={() => { remove(id); dispatch(removeItem(id)) }}
                    />
                </div>
            </div>
        </div>
    )

}