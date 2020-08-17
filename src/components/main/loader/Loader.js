import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles, styled} from "@material-ui/core/styles";
import {BLACK} from "../constants/Constants";

const useStyles = makeStyles(() => ({
    position: {
        position: 'fixed',
        left: '50%',
        top: '300px'
    }
}))

const MyCircularProgress = styled(CircularProgress)({
    color: BLACK,
});

export default function Loader() {
    const classes = useStyles()

    return (
        <div className={classes.position}>
            <MyCircularProgress/>
        </div>
    )
}
