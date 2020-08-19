import React from "react";
import {makeStyles, useMediaQuery, Button} from "@material-ui/core";
import {GREY} from "../../main/constants/Constants";
import {useDispatch} from 'react-redux';
import {numberFormat} from "../../main/format-numbers/NumberFormat";
import {removeFromFav} from "../../services/redux/actions/favouriteActions";
import {addToBasket} from "../../services/redux/actions/basketAction";

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

export default function FavItem(props) {
    const {image, model, id, price, device} = props;
    const dispatch = useDispatch()
    const media = useMediaQuery('(max-width:600px)');
    const classes = useStyles(media);

    return (
        <div className={classes.container}>
            <img className={classes.image} src={image} alt=""/>
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
                <Button onClick={() => dispatch(addToBasket(id, price, device))}>add to basket</Button>
                <Button onClick={() => dispatch(removeFromFav(id))}>remove </Button>
            </div>
        </div>
    )
}
