import React from "react";
import TextField from "@material-ui/core/TextField";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import {numberFormat} from "../../main/format-numbers/NumberFormat";
import {BLUE} from "../../main/constants/Constants";

const useStyles = makeStyles({
    filters: {
        minWidth: 100,
        padding: props => !props && '0 10px',
    },
    subFilters: {
        display: props => !props && 'flex',
    },
    filterType: {
        padding: 10
    },
    filtersTitle: {
        fontSize: 19,
        fontWeight: 700,
        lineHeight: '30px',
        fontStyle: 'italic',
    },
    filtersSubtitle: {
        fontSize: 15,
        fontWeight: 500,
        lineHeight: '25px',
        fontStyle: 'italic',
    },
    orders: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px 0 0',
    },
    formatNums: {
        fontSize: 14,
        fontWeight: 700,
        color: BLUE
    }
})

export default function Filters(props) {
    const { name, orderBy, price, onSearch, onOrder, onPrice } = props
    const classes = useStyles();
    const { t } = useTranslation()

    return (
        <div className={classes.filters}>
            <div className={classes.subFilters}>
                <div className={classes.filterType}>
                    <div className={classes.filtersTitle}>{t('search')}</div>
                    <TextField value={name}
                        onChange={onSearch}
                        autoComplete="on" />
                </div>
                <div className={classes.filterType}>
                    <div className={classes.filtersTitle}>{t('orderBy')}</div>
                    <div onClick={() => onOrder('asc')} className={classes.orders}>
                        {orderBy === 'asc' ? <CheckBoxIcon color="primary" cursor="pointer" /> :
                            <CheckBoxOutlineBlankIcon color="primary" cursor="pointer" />}
                        <div className={classes.filtersSubtitle}>{t('ascending')}</div>
                    </div>
                    <div onClick={() => onOrder('desc')} className={classes.orders}>
                        {orderBy === 'desc' ? <CheckBoxIcon color="primary" cursor="pointer" /> :
                            <CheckBoxOutlineBlankIcon color="primary" cursor="pointer" />}
                        <div className={classes.filtersSubtitle}>{t('descending')}</div>
                    </div>
                </div>
                <div className={classes.filterType}>
                    <div className={classes.filtersTitle}>{t('price')}</div>
                    <Slider
                        min={0}
                        max={1000000}
                        step={50000}
                        value={price}
                        onChange={onPrice}
                        aria-labelledby="range-slider"
                    />
                    <div className={classes.formatNums}>{numberFormat(price[0], '֏')} - {numberFormat(price[1], '֏')}</div>
                </div>
            </div>
        </div>
    )
}
