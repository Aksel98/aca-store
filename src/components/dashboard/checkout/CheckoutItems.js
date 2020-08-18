import React, {useEffect, useState} from "react"
import {useContext} from "react";
import {BasketContext} from "../../main/context/BasketContext";
import {db} from "../../services/firebase/Firebase";
import Checkout from "./Checkout";
import Header from "../Header";
import Footer from "../Footer";
import uniqId from 'uniqid';
import TotalPrice from "./TotalPrice";
import {ORANGE, BLUE} from "../../main/constants/Constants";
import {makeStyles, useMediaQuery} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {useHistory} from "react-router-dom";

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
    backIcon: {
        marginLeft: 20
    },
    fullHeight: {
        height: '100%'
    }
})

const CheckoutItems = () => {
    const [choosenItems, setChoosenItems] = useState([]);
    const [basketItems, setBasketItems] = useContext(BasketContext);
    const media = useMediaQuery('(min-width:600px)');
    const classes = useStyles(media);
    const history = useHistory();

    useEffect(() => {
        getCartItems();
    }, []);

    const getCartItems = () => {
        try {
            if (basketItems.length) {
                db.collection('product')
                    .where('id', 'in', basketItems)
                    .get()
                    .then(querySnapshot => {
                        const tempArr = [];
                        querySnapshot.docs.forEach(doc => {
                            let tempObj = doc.data();
                            tempArr.push({...tempObj});
                        })
                        setChoosenItems(tempArr);
                        return tempArr
                    })
                    .then((data) => {
                            localStorage.setItem('itemDetails', JSON.stringify(data.map(function (item) {
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
        let tempArr = [...choosenItems];
        tempArr = tempArr.filter(objItem => (objItem.id !== itemID))
        setChoosenItems(tempArr);
        setBasketItems(tempArr.map(item => item.id));
        let localArr = JSON.parse(localStorage.getItem('ItemsInBasket'));
        localArr.splice(localArr.indexOf(itemID), 1);
        localStorage.setItem('ItemsInBasket', JSON.stringify(localArr));
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
                    {basketItems?.length ? choosenItems.map(item => <Checkout
                        image={item.images[0]}
                        price={item.price}
                        model={item.model}
                        id={item.id}
                        remove={removeItem}
                        key={uniqId()}/>) : 'you have 0 items in your cart'}
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}
export default CheckoutItems;
