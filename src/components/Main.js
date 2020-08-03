import React from "react";
import Login from "./auth/Login";
import Dashboard from "./dashboard/Dashboard";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    loginContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '150px',
        opacity: '0.6',
    }
}))

export default function Main() {
    const classes = useStyles()

    return (
        <React.Fragment>
            <div className={classes.loginContainer}>
                {/*<Login/>*/}
            </div>
            <Dashboard/>
        </React.Fragment>
    )
}
