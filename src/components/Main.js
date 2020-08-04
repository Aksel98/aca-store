import React from "react";
import Login from "./auth/Login";
import Dashboard from "./dashboard/Dashboard";
import {makeStyles} from "@material-ui/core/styles";
import {BLACK} from "./main/Styles";

const useStyles = makeStyles({
    loginBg: {
        height: '100vh',
        backgroundColor: BLACK,
        opacity: '0.7'
    },
    loginContainer: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '150px',
        opacity: '0.6',
    }
})

export default function Main() {
    const classes = useStyles()

    return (
        <React.Fragment>
            <div className={classes.loginBg}>
                <div className={classes.loginContainer}>
                    <Login/>
                </div>
            </div>
            {/*<Dashboard/>*/}
        </React.Fragment>
    )
}
