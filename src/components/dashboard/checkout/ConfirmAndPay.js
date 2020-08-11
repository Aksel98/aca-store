import React from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
const useStyles = makeStyles({
    mainWrapper: {
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        margin: '20px',
        justifyContent: 'space-around'

    }
})
const ConfirmAndPay = (props) => {

    const classes = useStyles();
    return (
        <div className={classes.mainWrapper} >
            <div style={{ textAlign: 'center' }}>
                Order Summary
                <div>
                    {props.summary}
                </div>
            </div>
            {/* <TextField value={} /> */}
            <Button > confirm and pay</Button>
        </div>
    )
}
export default ConfirmAndPay