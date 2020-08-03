import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ORANGE, GREY } from '../main/Styles';

// import { db } from '../services/Firebase';
// import uniqid from 'uniqid'

const useStyles = makeStyles((theme) => ({
    root: {
        // '& > *': {
        //     margin: theme.spacing(1),
        // },
        width: '240px',
        height: '320px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(8, 1fr)',
        gridGap: '10px 5px',
        margin: '5px',
        border: `1px solid ${GREY}`,
        borderRadius: '3px'

    },
    modelImage: {
        gridColumnStart: '1/3',
        gridRow: '1/7',
    },
    modelName: {
        gridColumn: '3',
        gridRow: '1/2',
    },
    specInfo: {
        gridColumn: '3',
        gridRow: '2/5',
    },
    price: {
        gridColumn: '3',
        gridRow: '5/6',

    },
    addButton: {
        gridColumn: '2/5',
        gridRow: '8/9',
    },
    wishButton: {
        gridColumn: '1/2',
        gridRow: '8/9',
    }
}));

export default function Product(props) {
    const classes = useStyles();
    return (
        <div className={classes.root} >
            <div className={classes.modelImage}>
                <img src={props.image} alt="got nothing yet :)" />
            </div>
            <div className={classes.modelName}>{props.name}</div>
            <div className={classes.specInfo}>{props.info}</div>
            <div className={classes.price}>{props.price}</div>
            <Button className={classes.addButton} variant="outlined">Add </Button>
            <Button className={classes.wishButton} variant="outlined" >Wish</Button>
        </div>
    )

}