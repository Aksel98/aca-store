import React from "react";
import { Button } from "@material-ui/core";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

export default function CheckoutItems(props) {
    const { image, model, price, id, parameters: info, decreaseCount, increaseCount, remove } = props;
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                <img src={image} alt="" />
                <div style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                    <div>{model}</div>
                    <div>{price}</div>
                </div>
                <div style={{ height: '2rem', display: 'flex', flexDirection: 'row', margin: '10px', alignSelf: 'bottom' }}>
                    <RemoveIcon onClick={decreaseCount}>order less</RemoveIcon >
                    <AddIcon onClick={increaseCount}>order more</AddIcon>
                    <RemoveShoppingCartIcon onClick={() => remove(id)}>remove items</RemoveShoppingCartIcon>
                </div>



            </div>
        </div>
    )

}