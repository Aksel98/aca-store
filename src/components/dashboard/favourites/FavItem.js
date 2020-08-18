import React from "react";
import { makeStyles, useMediaQuery, Button } from "@material-ui/core";
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { GREY } from "../../main/constants/Constants";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, removeItem, addItem } from '../../services/redux/actions/counterActions'
import DeviceCount from "../device/count/DeviceCount";
import { numberFormat } from "../../main/format-numbers/NumberFormat";
import { addToFav, removeFromFav } from "../../services/redux/actions/favouriteActions";
import { useContext } from "react";
import { BasketContext } from "../../main/context/BasketContext";

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
    display: {
        display: 'flex',
        justifyContent: 'center'
    },
    fullWidth: {
        width: '100%'
    }
})

export default function Checkout(props) {
    const { image, model, price, id, remove } = props;
    const count = useSelector(state => state.counter)
    const dispatch = useDispatch()
    const [itemData] = count.filter(item => item.id === id)
    const media = useMediaQuery('(max-width:600px)');
    const classes = useStyles(media);
    const [basket, setBasket] = useContext(BasketContext)
    const addToBasket = () => {
        let localArr = [];
        if (localStorage.getItem('ItemsInBasket')) {
            localArr = JSON.parse(localStorage.getItem('ItemsInBasket'));
            if (!localArr.includes(id)) { localArr.push(id) }
            localStorage.setItem('ItemsInBasket', JSON.stringify(localArr))
        }
        else {
            localArr.push(id);
            localStorage.setItem('ItemsInBasket', JSON.stringify(localArr))
        }
        setBasket(localArr);
        dispatch(addItem(id, price))
    }


    return (
        <div className={classes.container}>
            <img className={classes.image} src={image} alt="" />
            <div className={classes.main}>
                <div>
                    <div className={classes.infoName}>{model}</div>
                </div>
                <div className={classes.infoParent}>

                    <div className={classes.info}>
                        <div className={classes.price}>{numberFormat(price, '֏')}</div>
                    </div>

                </div>
            </div>
            <div>
                <Button onClick={() => addToBasket()}>add to basket</Button>
                <Button onClick={() => dispatch(removeFromFav(id))}>remove </Button>

            </div>

        </div>
    )
}