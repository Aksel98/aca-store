import React, {useContext} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Login from "../../auth/Login";
import {UserContext} from "../../main/context/UserContext";
import {BLACK} from "../../main/constants/Constants"
import {LOGIN_URL} from "../../services/api/Navigations";
import GeneralRoutes from "./generalRoutes";

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
    },
    mainContent: {
        minHeight: 640
    }
})

export default function Dashboard() {
    const currentUser = useContext(UserContext)
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
