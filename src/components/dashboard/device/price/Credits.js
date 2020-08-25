import React from "react";
import {numberFormat} from "../../../main/format-numbers/NumberFormat";
import {makeStyles} from "@material-ui/core/styles";
import {BLACK, GREY} from "../../../main/constants/constants";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
    creditPrices: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    creditPrice: {
        fontSize: 16,
        fontWeight: 600,
        borderLeft: `1px solid ${GREY}`,
        borderRight: `1px solid ${GREY}`,
        width: 'fit-content',
        margin: '10px 0',
        padding: 10,
    },
    creditValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: BLACK
    },
    credit: {
        color: GREY,
    }
})

export default function Credits(props) {
    const {price, count} = props
    const classes = useStyles()
    const {t} = useTranslation()

    return (
        <div className={classes.creditPrices}>
            <div className={classes.creditPrice}>
                <div className={classes.creditValue}>{numberFormat((Math.ceil(price / 36)) * count, '֏')}</div>
                <div className={classes.credit}>{t('creditFor')} {36} {t('month')}</div>
            </div>
            <div className={classes.creditPrice}>
                <div className={classes.creditValue}>{numberFormat((Math.ceil(price / 24)) * count, '֏')}</div>
                <div className={classes.credit}>{t('creditFor')} {24} {t('month')}</div>
            </div>
            <div className={classes.creditPrice}>
                <div className={classes.creditValue}>{numberFormat((Math.ceil(price / 12)) * count, '֏')}</div>
                <div className={classes.credit}>{t('creditFor')} {12} {t('month')}</div>
            </div>
        </div>
    )
}
