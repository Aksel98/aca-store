import React, { useState } from "react";
import { Button } from "@material-ui/core";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { TextField } from '@material-ui/core';
import { GREY, ORANGE, PURPLE, RED, BLUE } from "../../main/constants/Constants";

export default function CheckoutItems(props) {
    const { image, model, price, id, parameters: info, remove } = props;
    const [count, setCount] = useState(1);
    const [hoverColor, setHoverColor] = useState();
    const decreaseCount = () => {
        count > 1 ? setCount(count - 1) : setCount(1)
    }
    const increaseCount = () => {
        setCount(count + 1)
    }
    const onEnter = () => {
        setHoverColor(BLUE)
    }
    const onLeave = () => {
        setHoverColor(ORANGE)
    }
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                <img src={image} alt="" />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '10px' }}>
                    <div>{model}</div>
                    <TextField value={'Total price is ' + price * count + ' $'}></TextField>
                </div>
                <div style={{ height: '2rem', display: 'flex', flexDirection: 'row', margin: '10px', alignSelf: 'bottom' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '20px', marginRight: '20px' }}>
                        <RemoveIcon cursor='pointer' onClick={decreaseCount}>order less</RemoveIcon >
                        <TextField
                            // style={{ width: '2rem', textAlign: 'center', height: '2rem' }}
                            value={count}
                            inputProps={{ style: { width: '2rem', height: '1.rem', textAlign: 'center', border: `1px solid ${ORANGE}`, borderRadius: '3px' } }}

                        />
                        <AddIcon cursor='pointer' onClick={increaseCount}>order more</AddIcon>
                    </div>

                    <RemoveShoppingCartIcon cursor='pointer' style={{ color: hoverColor }} onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ color: hoverColor }} onClick={() => remove(id)}>remove items</RemoveShoppingCartIcon>
                </div>



            </div>
        </div>
    )

}