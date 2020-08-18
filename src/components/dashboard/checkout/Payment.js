import React, { useEffect, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useHistory } from 'react-router-dom';

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

const Payment = () => {
    const location = useLocation();
    console.log(location)
    const [amount, setAmount] = useState(location.state.summary)
    const { t } = useTranslation()
    const hystory = useHistory()
    const classes = useStyles();


    return (
        <div className={classes.mainWrapper} >
            <Button onClick={() => hystory.goBack()}>
                back to cart
            </Button>
            <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'left', }}>
                <div>
                    {t('Order Summary')}
                </div>
            </div>
            <div>
                {amount}
            </div>
        </div>
    )
}
export default Payment