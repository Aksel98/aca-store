import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {numberFormat} from "../../main/format-numbers/NumberFormat";
import {MyButton, ORANGE} from "../../main/constants/Constants";

const useStyles = makeStyles({
    price: {
        fontSize: 20,
        margin: '10px 3px',
        "& :first-child": {
            marginRight: 5
        }
    },
    bold: {
        fontWeight: 'bold'
    },
    btn: {
        '&:disabled': {
            opacity: '0.5'
        }
    },
    link: {
        color: ORANGE,
        fontWeight: 'bold',
        textDecoration: 'none'
    }
})

const TotalPrice = () => {
    const [quantity, setQuantity] = useState(0)
    const basketItems = useSelector(state => state.basket)
    const currentUser = useSelector(state => state.user)
    const [amount, setAmount] = useState(0)
    const classes = useStyles();
    const {t} = useTranslation()

    useEffect(() => {
        setAmount(basketItems.reduce(function (acc, item) {
            return acc + item['price'] * item['quantity']
        }, 0))
        setQuantity(basketItems.map(item => item['quantity']))
    }, [basketItems])

    return (
        currentUser && <div className={classes.mainWrapper}>
            <div className={classes.price}>
                <span>Total price`</span>
                <span className={classes.bold}>{numberFormat(amount, '֏')}</span>
            </div>
            <MyButton className={classes.btn} disabled={!basketItems.length} variant="contained">
                <Link className={classes.link} to={{
                    pathname: '/payment', state: {
                        summary: amount,
                        quantity
                    }
                }}>{t('confirmAndPay')}</Link>
            </MyButton>
        </div>
    )
}
export default TotalPrice
