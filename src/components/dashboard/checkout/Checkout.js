import React, { useEffect, useState } from "react"
import { useContext } from "react";
import { BasketContext } from "../../main/context/BasketContext";
import { db } from "../../services/firebase/Firebase";
import CheckoutItems from "./CheckoutItems";
import Header from "../Header";
import Footer from "../Footer";
import uniqid from 'uniqid';
import ConfirmAndPay from "./ConfirmAndPay";

const Checkout = () => {
    const [basketItems, setBasketItems] = useContext(BasketContext);
    useEffect(() => setBasketItems(JSON.parse(localStorage.getItem('ItemsInBasket'))), []);
    const [choosenItems, setChoosenItems] = useState([]);
    const getCartItems = () => {
        if (!!basketItems) {
            try {
                db.collection('product').where('id', 'in', [...basketItems]).get()
                    .then(querySnapshot => {
                        const tempArr = [];
                        querySnapshot.docs.forEach(doc => {
                            let tempObj = doc.data();
                            tempArr.push({ ...tempObj });
                        })
                        setChoosenItems(tempArr);
                    })
                    .catch(err => console.log('error making basket info query', err));
            }
            catch (e) {
                console.log("can not  get basket items:", e);
            }
        }
    }
    useEffect(() => {
        getCartItems();
    }, []);
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

        <div>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '100px', justifyContent: 'space-between' }}>
                <div >
                    {!basketItems ? 'you have 0 items in your cart' : choosenItems.map(item => <CheckoutItems image={item.image} model={item.model} price={item.price} id={item.id} remove={removeItem} key={uniqid()} />)}
                </div>
                <ConfirmAndPay />
            </div>

            <Footer />
        </div>


    )
}
export default Checkout;