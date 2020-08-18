import React, { useEffect, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
    mainWrapper: {

        display: 'flex',
        flexDirection: 'row',
        margin: '20px',
        marginTop: '80px',
        justifyContent: 'space-around',
        marginRight: '200px'
    }
})

const ConfirmAndPay = () => {
    const location = useLocation();
    const count = useSelector(state => state.counter)
    const [amount, setAmount] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const { t } = useTranslation()
    useEffect(() => {
        setAmount(count.reduce(function (acc, item) { return acc + item['price'] * item['quantity'] }, 0))
        setQuantity(count.map(item =>item['quantity'] ))
    }, [count])
    const classes = useStyles();

console.log(quantity)

    return (
        <div className={classes.mainWrapper} >
            <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'left', }}>
                <div>
                    {t('Order Summary')}
                </div>

                <Button style={{ padding: '0' }} >
                    <Link to={{
                        pathname: '/payment',
                        state: {
                            summary: amount,
                            quantity: quantity
                        }
                    }}>
                        {t('confirm and pay')}
                    </Link>
                </Button>

            </div>
            <div>
                {amount}
            </div>

        </div>
    )
}
export default ConfirmAndPay