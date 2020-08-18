import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import uniqId from 'uniqid';
import {useEffect} from 'react';
import {db} from '../../services/firebase/Firebase';
import FavItem from './FavItem';
import {useHistory} from 'react-router-dom';
import {Button, makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    main: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '80px',
        justifyContent: 'space-around',
    },
})
const FavItemList = () => {
    const classes = useStyles();
    const favIds = useSelector(state => state.favourites);
    const user = useSelector(state => state.user);
    const [favItems, setFavItems] = useState([]);
    const history = useHistory()
    useEffect(() => {
        if (favIds.length) {
            getFavItems()
        }
    }, [favIds.length])

    function getFavItems() {
        try {
            db.collection('product')
                .where('id', 'in', favIds).get()
                .then(querySnapchot => {
                    const tempArr = [];
                    querySnapchot.docs.forEach(doc => {
                        let tempObj = doc.data();
                        tempArr.push(tempObj)
                    })
                    setFavItems(tempArr)
                }).catch(err => console.log(err))
        } catch (error) {
            console.log('Sorry, could not get the Favourites data')
        }
    }

    return (
        <div className={classes.main}>
            <div>
                <Button onClick={() => history.goBack()}>back to cart</Button>
            </div>
            <div>{favItems?.length ? favItems.map(data =>
                <FavItem
                    key={uniqId()}
                    image={data.images[0]}
                    price={data.price}
                    model={data.model}
                    id={data.id}/>) : 'there are no favourites chosen'}
            </div>
        </div>
    )
}

export default FavItemList;
