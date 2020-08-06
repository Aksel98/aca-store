import React from 'react';
import { LIGHTGREY } from '../../main/Styles';

export default function Category(props) {
    return (
        <div style={{ backgroundColor: LIGHTGREY }} >
            <div style={{ boxSizing: 'border-box' }} >
                <img style={{ borderRadius: '2px', margin: '5px', boxSizing: 'border-box' }} src={props.image} alt="wait a little" />
            </div>
        </div>
    )
}
