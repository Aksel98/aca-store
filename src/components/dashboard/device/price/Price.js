import React, {createRef} from "react";
import NumberFormat from "react-number-format";
import EditIcon from "@material-ui/icons/Edit";
import {makeStyles} from "@material-ui/core/styles";
import {BLACK} from "../../../main/constants/Constants";
import {db} from "../../../services/firebase/Firebase";
import {useParams} from "react-router-dom";

const useStyles = makeStyles({
    display: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        fontSize: 22,
        fontWeight: 'bold',
        color: BLACK,
        border: 'none',
        padding: 7
    },
    hiddenInput: {
        position: 'absolute',
        left: -1,
        height: '100%',
        width: '100%',
        top: -1,
        zIndex: -1,
        border: 'none'
    },
    editIcon: {
        cursor: 'pointer'
    },
    relative: {
        position: 'relative'
    }
})

export default function Price(props) {
    const {price, setPrice, count} = props
    const classes = useStyles()
    const {id} = useParams()
    const ref = createRef()

    function onFocus() {
        ref.current.focus()
    }

    function onBlur(key, e) {
        const devPrice = Number((e.target.value).slice(0, -1).split(',').join(''))

        db.collection('product').doc(id).update({
            price: devPrice
        })
            .then(() => setPrice(devPrice))
            .catch(err => console.log(err))
    }

    return (
        <div className={classes.display}>
            <h2 className={classes.relative}>
                <NumberFormat value={price * count}
                              displayType={'input'}
                              thousandSeparator={true}
                              suffix={'֏'}
                              className={classes.input}
                              onBlur={(e) => onBlur('price', e)}/>
                <input className={classes.hiddenInput} ref={ref}/>
            </h2>
            <EditIcon onClick={onFocus} className={classes.editIcon}/>
        </div>
    )
}
