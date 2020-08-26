import React from "react";
import Fab from "@material-ui/core/Fab";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import {useMediaQuery} from "@material-ui/core";

const useStyles = makeStyles({
    backIcon: {
        position: 'fixed',
        zIndex: 1,
        top: props => props ? 120 : 60,
        left: 10
    },
})

export default function BackRouter() {
    const media = useMediaQuery('(max-width:600px)')
    const classes = useStyles(media)
    const history = useHistory()

    return (
            <div onClick={() => history.goBack()} className={classes.backIcon}>
                <Fab color="primary"><KeyboardBackspaceIcon/></Fab>
            </div>
        )
}
