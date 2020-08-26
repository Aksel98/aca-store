import React, {useEffect, useState} from "react"
import {db} from "../../services/firebase/Firebase";
import Checkout from "./Checkout";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import uniqId from 'uniqid';
import TotalPrice from "./TotalPrice";
import {ORANGE, BLUE} from "../../main/constants/constants";
import {makeStyles, useMediaQuery} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getError} from "../../services/redux/actions/uiActions";
import BackRouter from "../../main/BackRouter";

const useStyles = makeStyles({
    mainWrapper: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: props =>  props.mediaMobile ? 130 : 110,
        justifyContent: 'space-between',
        height: props =>  props.media ? (props.mediaMobile ? 'calc(100vh - 420px)' : 'calc(100vh - 400px)') : 'calc(100vh - 285px)',
        overflow: 'auto',
    },
    cartIcon: {
        cursor: 'pointer',
        color: ORANGE,
        '&:hover': {
            color: BLUE,
        }
    },
    totalPrice: {
        position: 'fixed',
        top: props => props.media ? (props.mediaMobile ? 140 : 100) : 55,
        right: 40,
        zIndex: 1
    },
    emptyCart: {
        textAlign: 'center',
        color: BLUE
    },
    fullHeight: {
        height: '100%'
    }
})

const CheckoutItems = () => {
    const [chosenItems, setChosenItems] = useState([]);
    const basketItems = useSelector(state => state.basket);
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const media = useMediaQuery('(max-width:600px)');
    const mediaMobile = useMediaQuery('(max-width:400px)');
    const classes = useStyles({media, mediaMobile});

    useEffect(() => {
        getCartItems();
    }, []);

    const getCartItems = () => {
        const basketIds = basketItems.map(item => item.id)
        try {
            if (basketItems.length) {
                db.collection('product')
                    .where('id', 'in', basketIds)
                    .get()
                    .then(querySnapshot => {
                        const tempArr = [];
                        querySnapshot.docs.forEach(doc => {
                            let tempObj = doc.data();
                            tempArr.push({...tempObj});
                        })
                        setChosenItems(tempArr);
                        return tempArr
                    }).catch(err => dispatch(getError(err.message)));
            }
        } catch (e) {
            console.log(e);
        }
    }

    const removeItem = (itemID) => {
        let tempArr = [...chosenItems];
        tempArr = tempArr.filter(objItem => (objItem.id !== itemID))
        setChosenItems(tempArr);
    }

    return (
        <React.Fragment>
            <Header/>
            <div className={classes.mainWrapper}>
                <BackRouter/>
                <div className={classes.totalPrice}>
                    <TotalPrice/>
                </div>
                <div className={classes.fullHeight}>
                    {basketItems?.length ? chosenItems.map(item => <Checkout
                        image={item.images[0]}
                        price={item.price}
                        model={item.model}
                        id={item.id}
                        remove={removeItem}
                        key={uniqId()}/>) : <h1 className={classes.emptyCart}>{t('yourCartIsEmpty')}</h1>}
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}
export default CheckoutItems;
