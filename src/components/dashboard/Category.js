import React from 'react';
import { Typography } from '@material-ui/core';
import { ORANGE, LIGHTGREY } from '../main/Styles';



export default function Category(props) {
    const handleClick = (event) => {
        console.log(event.target)
    }

    return (
        <div onClick={handleClick} style={{ backgroundColor: LIGHTGREY }} >
            <Typography style={{ textAlign: 'center', fontSize: '30px', color: ORANGE, }}>{props.name}</Typography>
            <div style={{ boxSizing: 'border-box' }} >
                <img style={{ borderRadius: '2px', margin: '5px', boxSizing: 'border-box' }} src={props.image} alt="wait a little" />
            </div>
        </div>
    )
}