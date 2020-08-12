import React from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
const useStyles = makeStyles({
    mainWrapper: {

        display: 'flex',
        flexDirection: 'row',
        margin: '20px',
        justifyContent: 'space-around',
        marginRight: '200px'
    }
})
const ConfirmAndPay = (props) => {

    const classes = useStyles();
    return (
        <div className={classes.mainWrapper} >
            <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'left' }}>
                <div>
                    Order Summary
                </div>

                <Button style={{ padding: '0' }} > confirm and pay</Button>

            </div>
            <div>
                AMOUNT
            </div>

        </div>
    )
}
export default ConfirmAndPay