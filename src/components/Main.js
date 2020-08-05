import React, {useEffect, useState} from "react";
import Dashboard from "./dashboard/Dashboard";
import {BrowserRouter as Router, Route, useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {BLACK} from "./main/Styles";
import Login from "./auth/Login";
import {auth} from "./services/Firebase";
import {UserContext} from "./main/context/UserContext";
import Loader from "./main/Loader";

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

export default function Main() {
    const [currentUser, setCurrentUser] = useState(null)
    const [loadingData, setLoadingData] = useState(true)
    const classes = useStyles()
    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            user ? setCurrentUser(user) : setCurrentUser(null)
            setLoadingData(false)
        })
    }, [])

    useEffect(() => {
        console.log(currentUser)
    }, [currentUser])

    return (
        <UserContext.Provider value={currentUser}>
            {loadingData ? <Loader/> : <Router>
                <div className={classes.dashboardParent}>
                    <Route path='/dashboard' component={Dashboard}/>
                </div>
                <Route path='/login'>
                    <div className={classes.loginBg}>
                        <div className={classes.loginContainer}>
                            <Login/>
                        </div>
                    </div>
                </Route>
            </Router>}
        </UserContext.Provider>
    )
}
