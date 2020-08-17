import React, { useEffect, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    mainWrapper: {

        display: 'flex',
        flexDirection: 'row',
        margin: '20px',
        justifyContent: 'space-around',
        marginRight: '200px'
    }
})

const ConfirmAndPay = () => {

    const count = useSelector(state => state.counter)
    const [amount, setAmount] = useState(0)
    const { t } = useTranslation()
    useEffect(() => {
        setAmount(count.reduce(function (acc, item) { return acc + item['price'] * item['quantity'] }, 0))
    }, [count])
    const classes = useStyles();


    return (
        <div className={classes.mainWrapper} >
            <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'left' }}>
                <div>
                    {t('Order Summary')}
                </div>

                <Button style={{ padding: '0' }} >{t('confirm and pay')} </Button>

            </div>
            <div>
                {amount}
            </div>

        </div>
    )
}
export default ConfirmAndPay