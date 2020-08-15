import React, {useState} from "react";
import {numberFormat} from "../../main/format-numbers/NumberFormat";
import uniqId from "uniqid";
import {BLACK, GREY, MyButton} from "../../main/constants/Constants";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
    creditPrice: {
        fontSize: 16,
        fontWeight: 600,
        borderLeft: `1px solid ${GREY}`,
        borderRight: `1px solid ${GREY}`,
        width: 'fit-content',
        margin: '10px 0',
        padding: 10,
    },
    credit: {
        color: GREY,
    },
    deviceCount: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 10
    },
    rounded: {
        display: 'flex',
        border: `2px solid ${BLACK}`,
        borderRadius: '50%'
    },
    creditPrices: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    displayFlex: {
        display: 'flex',
    }
})

export default function DevicePrice(props) {
    const {device} = props
    const [deviceCount, setDeviceCount] = useState(1)
    const classes = useStyles()
    const {t} = useTranslation()

    function addCount() {
        setDeviceCount(deviceCount + 1)
    }

    function reduceCount() {
        if (deviceCount > 1) {
            setDeviceCount(deviceCount - 1)
        }
    }

    return (
        <React.Fragment>
            <h2>{numberFormat(device.price, '֏')}</h2>
            <div className={classes.creditPrices}>
                {device.credits?.map(month => {
                    return <div key={uniqId()} className={classes.creditPrice}>
                        <div>{numberFormat((Math.ceil(device.price / month)), '֏')}</div>
                        <div className={classes.credit}>{t('creditFor')} {month} {t('month')}</div>
                    </div>
                })}
            </div>
            <div className={classes.displayFlex}>
                <MyButton onClick={reduceCount} maxwidth="fit-content">
                    <RemoveRoundedIcon className={classes.rounded}/>
                </MyButton>
                <div className={classes.deviceCount}>{deviceCount}</div>
                <MyButton onClick={addCount} maxwidth="fit-content">
                    <AddRoundedIcon className={classes.rounded}/>
                </MyButton>
            </div>
        </React.Fragment>
    )
}
