import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { db } from '../services/Firebase';
import uniqid from 'uniqid'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
// (async function getDocList() {
//     const doclist = await db.collection('product').get();

// const tempObj = Object.assign({}, ...doclist.docs.map(doc => (doc.data())));
//     for (let i = 0; i < 10; i++) {
//         const collRef = db.collection('product');
//         collRef.doc(uniqid()).set(
//             {
//                 brand: 'apple',
//                 device: 'mobile',
//                 model: 'iphone6',
//                 parameters: {
//                     color: "black",
//                     memory: '64 GB',
//                     screen: '4.7 inch'
//                 }
//             }
//         )
//     }
// })()

export default function Product(props) {

    const classes = useStyles();
    return (
        <div className={classes.root} >
            <img src={props.image} alt="got nothing yet :)" />
            <h3 className='name'>{props.name}</h3>
            <div className='info'>{props.info}</div>
            <div className='price'>{props.price}</div>
            <div className='starsRating'>{props.stars}</div>
            <Button variant="outlined" color="primary">Add to Card</Button>
            <Button variant="outlined" color="secondary">Add to wishes</Button>
        </div>
    )

}