import React from 'react';
import { Button } from '@material-ui/core';
const ConfirmAndPay = () => {
    return (
        <div style={{ width: '30%', display: 'flex', flexDirection: 'column', margin: '20px', justifyContent: 'space-around' }}>
            <div style={{ textAlign: 'center' }}>
                info about purchase summary
            </div>
            <Button > confirm and pay</Button>
        </div>
    )
}
export default ConfirmAndPay