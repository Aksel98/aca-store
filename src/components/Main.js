import React from "react";
import Dashboard from "./dashboard/Dashboard";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {BLACK} from "./main/Styles";
import Login from "./auth/Login";

const useStyles = makeStyles({
    dashboardParent: {
        overflowX: 'hidden'
    },
    loginBg: {
        height: '100vh',
        backgroundColor: BLACK,
        opacity: '0.7'
    },
    loginContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '150px 10px',
        opacity: '0.6',
    },
})

export default function Main(props) {
    const classes = useStyles()

    return (
        <Router>
                <div className={classes.dashboardParent}>
                    <Route path='/dashboard' component={Dashboard}/>
                </div>
                <div className={classes.loginBg}>
                    <div className={classes.loginContainer}>
                        <Route path='/login' component={Login}/>
                    </div>
                </div>
            {/*<Redirect to="/dashboard"/>*/}
        </Router>
    )
}
