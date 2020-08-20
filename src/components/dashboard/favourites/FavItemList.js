import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import uniqId from 'uniqid';
import {useEffect} from 'react';
import {db} from '../../services/firebase/Firebase';
import FavItem from './FavItem';
import {useHistory} from 'react-router-dom';
import {Button, makeStyles} from '@material-ui/core';
import Fab from "@material-ui/core/Fab";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {BLACK} from "../../main/constants/Constants";
import {useTranslation} from "react-i18next";
import Loader from "../../main/loader/Loader";

const useStyles = makeStyles({
    main: {
        marginTop: '80px',
    },
    backIcon: {
        margin: '10px 14px'
    },
    favItems: {
        height: 640,
        overflow: 'auto'
    },
    noFavourites: {
        textAlign: 'center',
        color: BLACK
    },
})
const FavItemList = () => {
    const classes = useStyles();
    const favIds = useSelector(state => state.favourites);
    const [favItems, setFavItems] = useState([]);
    const {t} = useTranslation()
    const history = useHistory()

    useEffect(() => {
        getFavItems()
    }, [])

    function getFavItems() {
        try {
            db.collection('product')
                .where('id', 'in', favIds).get()
                .then(querySnapshot => {
                    const tempArr = [];
                    querySnapshot.docs.forEach(doc => {
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
            <div onClick={() => history.goBack()} className={classes.backIcon}>
                <Fab color="primary"><KeyboardBackspaceIcon/></Fab>
            </div>
            <div className={classes.favItems}>{favItems.map(data =>
                <FavItem key={uniqId()}
                         image={data?.images[0]}
                         model={data.model}
                         id={data.id}
                         price={data.price}
                         device={data.device}
                         setFavItems={setFavItems}/>)}
            </div>
        </div>
    )
}

export default FavItemList;
