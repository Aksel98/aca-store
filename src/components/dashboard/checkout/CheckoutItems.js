import React, { useState } from "react";
import { Button } from "@material-ui/core";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { TextField } from '@material-ui/core';
import { GREY, ORANGE } from "../../main/constants/Constants";

export default function CheckoutItems(props) {
    const { image, model, price, id, parameters: info, remove } = props;
    const [count, setCount] = useState(1);
    const decreaseCount = () => {
        count > 1 ? setCount(count - 1) : setCount(1)
    }
    const increaseCount = () => {
        setCount(count + 1)
    }
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                <img src={image} alt="" />
                <div style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                    <div>{model}</div>
                    <div>{price}</div>
                </div>
                <div style={{ height: '2rem', display: 'flex', flexDirection: 'row', margin: '10px', alignSelf: 'bottom' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '20px', marginRight: '20px' }}>
                        <RemoveIcon onClick={decreaseCount}>order less</RemoveIcon >
                        <TextField
                            // style={{ width: '2rem', textAlign: 'center', height: '2rem' }}
                            value={count}
                            inputProps={{ style: { width: '2rem', height: '1.rem', textAlign: 'center', border: `1px solid ${ORANGE}`, borderRadius: '3px' } }}

                        />
                        <AddIcon onClick={increaseCount}>order more</AddIcon>
                    </div>

                    <RemoveShoppingCartIcon onClick={() => remove(id)}>remove items</RemoveShoppingCartIcon>
                </div>



            </div>
        </div>
    )

}