import React from "react";
import {makeStyles, useMediaQuery} from "@material-ui/core";
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import {GREY, MyButton, ORANGE} from "../../main/constants/Constants";
import {useSelector, useDispatch} from 'react-redux';
import DeviceCount from "../device/count/DeviceCount";
import {numberFormat} from "../../main/format-numbers/NumberFormat";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {decrement, increment, removeFromBasket} from "../../services/redux/actions/basketAction";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        borderBottom: `1px solid ${GREY}`,
        margin: '0 20px',
        padding: '20px 0'
    },
    main: {
        fontSize: props => props ? 18 : 20,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'space-evenly',
        marginLeft: 10
    },
    image: {
        width: 100,
        height: 100
    },
    deviceTotalPrice: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        "& :first-child": {
            paddingRight: 5
        }
    },
    infoName: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        flex: 2,
        marginLeft: 10
    },
    infoParent: {
        width: '100%',
        display: props => props ? 'block' : 'flex'
    },
    price: {
        fontSize: 15,
        fontStyle: 'italic',
        color: GREY
    },
    info: {
        flex: 1,
        marginLeft: 10
    },
    removeIconParent: {
        color: ORANGE,
        width: 'fit-content',
        cursor: 'pointer'
    },
    display: {
        display: 'flex',
        justifyContent: 'center',
    },
    fullWidth: {
        width: '100%'
    },
    link: {
        textDecoration: 'none'
    }
})

export default function Checkout(props) {
    const {image, model, price, id, remove} = props;
    const [basket] = useSelector(state => state.basket).filter(item => item.id === id)
    const dispatch = useDispatch()
    const media = useMediaQuery('(max-width:600px)')
    const {t} = useTranslation();
    const classes = useStyles(media);

    function removeList() {
        remove(id)
        dispatch(removeFromBasket(id))
    }

    function addCount() {
        dispatch(increment(id))
    }

    function reduceCount() {
        dispatch(decrement(id))
    }

    return (
        <div className={classes.container}>
            <div>
                <img className={classes.image} src={image} alt=""/>
                <Link className={classes.link} to={`/categories/${basket.device}/${basket.id}`}>
                    <MyButton color="primary" variant="contained">{t('view')}</MyButton>
                </Link>
            </div>
            <div className={classes.main}>
                <div className={classes.infoName}>{model}</div>
                <div className={classes.infoParent}>
                    <div className={classes.info}>
                        <div className={classes.display}>
                            <DeviceCount count={basket.quantity} add={addCount} reduce={reduceCount} />
                        </div>
                        <div className={classes.price}>{numberFormat(price, '֏')}</div>
                    </div>
                    <div className={`${classes.deviceTotalPrice} ${classes.info}`}>
                        <div>{numberFormat(basket.quantity * basket.price, '֏')}</div>
                        <MyButton onClick={removeList} className={classes.removeIconParent}>
                            <RemoveShoppingCartIcon/>
                        </MyButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
