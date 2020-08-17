import React, {useState} from "react";
import {BLACK, MyButton} from "../../../main/constants/Constants";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import {makeStyles} from "@material-ui/core/styles";

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
    const {count, setCount} = props
    const classes = useStyles()

    function addCount() {
        setCount(count + 1)
    }

    function reduceCount() {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    return (
        <div className={classes.displayFlex}>
            <MyButton onClick={reduceCount} maxwidth="fit-content">
                <RemoveRoundedIcon className={classes.rounded}/>
            </MyButton>
            <div className={classes.deviceCount}>{count}</div>
            <MyButton onClick={addCount} maxwidth="fit-content">
                <AddRoundedIcon className={classes.rounded}/>
            </MyButton>
        </div>
    )
}
