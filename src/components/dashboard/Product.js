import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { GREY } from '../main/Styles';
import Button from '../main/Button'
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';




const useStyles = makeStyles(() => ({
    root: {
        width: '240px',
        height: '320px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '5px',
        border: `1px solid ${GREY}`,
        borderRadius: '3px'

    },
    modelInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    infoWithImage: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    btnWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        '&hover': {
            transition: '1s all ease-out'

        }
    }



}));

export default function Product(props) {
    const classes = useStyles();
    const [hover, setHover] = useState(false);
    return (
        <div className={classes.root} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className={classes.infoWithImage}>
                <img src={props.image} alt="got nothing yet :)" />
                <div className={classes.modelInfo}>
                    <div >{props.name}</div>
                    <div >{props.info}</div>
                    <div >{props.price}</div>
                </div>
            </div>
            {hover && (
                <div className={classes.btnWrapper}>
                    <Button ><FavoriteTwoToneIcon /></Button>
                    <Button width='10rem'>ADD TO CARD</Button>
                </div>
            )}

        </div >
    )

}