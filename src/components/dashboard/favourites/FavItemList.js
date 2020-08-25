import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import {getError} from "../../services/redux/actions/uiActions";

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
    emptyCart: {
        color: BLACK,
        textAlign: 'center'
    },
})
const FavItemList = () => {
    const [favItems, setFavItems] = useState([]);
    const [loader, setLoader] = useState(true);
    const favIds = useSelector(state => state.favourites);
    const dispatch = useDispatch()
    const history = useHistory()
    const {t} = useTranslation()
    const classes = useStyles();


    useEffect(() => {
        getFavItems()
    }, [])

    function getFavItems() {
        try {
            if (favIds.length) {
                db.collection('product')
                    .where('id', 'in', favIds).get()
                    .then(querySnapshot => {
                        const tempArr = [];
                        querySnapshot.docs.forEach(doc => {
                            let tempObj = doc.data();
                            tempArr.push(tempObj)
                        })
                        setFavItems(tempArr)
                        setLoader(false)
                    }).catch(err => dispatch(getError(err.message)))
            } else {
                setLoader(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        loader ? <Loader/> : <div className={classes.main}>
            <div onClick={() => history.goBack()} className={classes.backIcon}>
                <Fab color="primary"><KeyboardBackspaceIcon/></Fab>
            </div>
            {favItems.length ? <div className={classes.favItems}>{favItems.map(data =>
                <FavItem key={uniqId()}
                         image={data?.images[0]}
                         model={data.model}
                         id={data.id}
                         price={data.price}
                         device={data.device}
                         favItems={favItems}
                         setFavItems={setFavItems}/>)}
            </div> : <h1 className={classes.emptyCart}>{t('youHaveNoFavourites')}</h1>}
        </div>
    )
}

export default FavItemList;
