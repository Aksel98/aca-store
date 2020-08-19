import React from "react";
import {BLACK, MyButton} from "../../../main/constants/Constants";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import {makeStyles} from "@material-ui/core/styles";
import {decrement, increment} from "../../../services/redux/actions/basketAction";
import {useDispatch} from "react-redux";

const useStyles = makeStyles({
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
    displayFlex: {
        display: 'flex',
    }
})
export default function DeviceCount(props) {
    const {count, id} = props
    const dispatch = useDispatch()
    const classes = useStyles()

    return (
        <div className={classes.displayFlex}>
            <MyButton onClick={() => dispatch(decrement(id))} maxwidth="fit-content">
                <RemoveRoundedIcon className={classes.rounded}/>
            </MyButton>
            <div className={classes.deviceCount}>{count}</div>
            <MyButton onClick={() => dispatch(increment(id))} maxwidth="fit-content">
                <AddRoundedIcon className={classes.rounded}/>
            </MyButton>
        </div>
    )
}
