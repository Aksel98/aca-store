import React, { useContext } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { SummaryContext } from '../../main/context/SummaryContext';
const useStyles = makeStyles({
    mainWrapper: {

        display: 'flex',
        flexDirection: 'row',
        margin: '20px',
        justifyContent: 'space-around',
        marginRight: '200px'
    }
})
// const reducer = (sum, item) => { sum + item.price * item.quantity };
const ConfirmAndPay = (props) => {
    const [summary, setSummary] = useContext(SummaryContext);
    const classes = useStyles();
    // console.log(summary);
    return (
        <div className={classes.mainWrapper} >
            <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'left' }}>
                <div>
                    Order Summary
                </div>

                <Button style={{ padding: '0' }} > confirm and pay</Button>

            </div>
            <div>
                15424545
            </div>

        </div>
    )
}
export default ConfirmAndPay