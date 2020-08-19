import React, {useEffect, useState} from "react"
import {db} from "../../services/firebase/Firebase";
import Checkout from "./Checkout";
import Header from "../Header";
import Footer from "../Footer";
import uniqId from 'uniqid';
import TotalPrice from "./TotalPrice";
import {ORANGE, BLUE, BLACK} from "../../main/constants/Constants";
import {makeStyles, useMediaQuery} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
    mainWrapper: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 70,
        justifyContent: 'space-between',
        height: props => props ? 720 : 678,
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
        top: 80,
        right: 40,
        zIndex: 1
    },
    emptyCart: {
        textAlign: 'center',
        color: BLACK
    },
    backIcon: {
        marginLeft: 20
    },
    fullHeight: {
        height: '100%'
    }
})

const CheckoutItems = () => {
    const [chosenItems, setChosenItems] = useState([]);
    const basketItems = useSelector(state => state.basket);
    const {t} = useTranslation()
    const media = useMediaQuery('(min-width:600px)');
    const classes = useStyles(media);
    const history = useHistory();

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
                    })
                    .then((data) => {
                            localStorage.setItem('basketItems', JSON.stringify(data.map(function (item) {
                                return {'id': item.id, 'quantity': 1, 'price': item.price}
                            })))
                        }
                    )
                    .catch(err => console.log('error making basket info query', err));
            }
        } catch (e) {
            console.log("can not  get basket items:", e);
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
                <div onClick={() => history.goBack()} className={classes.backIcon}>
                    <Fab color="primary"><KeyboardBackspaceIcon/></Fab>
                </div>
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
