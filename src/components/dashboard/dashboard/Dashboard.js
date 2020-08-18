import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Login from "../../auth/Login";
import {BLACK} from "../../main/constants/Constants"
import {LOGIN_URL} from "../../services/api/Navigations";
import GeneralRoutes from "./GeneralRoutes";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
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
    }
})

export default function Dashboard() {
    const currentUser = useSelector(state => state.user)
    const classes = useStyles()

    return (
        <Router>
            {currentUser ? <GeneralRoutes/> : (
                <Switch>
                    <Route path={LOGIN_URL}>
                        <div className={classes.loginBg}>
                            <div className={classes.loginContainer}>
                                <Login/>
                            </div>
                        </div>
                    </Route>
                    <GeneralRoutes/>
                </Switch>
            )}
        </Router>
    )
}
